// @flow

const db = require('../../../models');
const TableApi = require('../../lib/tableApi');

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AdminRole } from '../../lib/auth';
import type { TableRequest } from '../../lib/tableApi';

const RELATED_MODELS = [{ model: db.affiliation, as: 'affiliation' }];

// TODO: Criteria that determines whether or not a user account is pending approval
const criteria = {
  PENDING: { active: true, approved: false },
  LIVE: { active: true, approved: true }
};

const scope = { FILTERED_BY_USER: user => ({ method: ['filteredByUser', user] }) };

// TODO: move user endpoints to auth app

type ListRequest = {|
  ...$Exact<TableRequest>,
  search?: string
|};

module.exports = {
  list: async (req: UserRequest<AdminRole>, res: Response) => {
    const query: ListRequest = (req.query: any);
    const api = new TableApi(req, query);
    try {
      const whereClause = {};
      if (query.search != null && query.search.length > 0) {
        // TODO: why search only live users?
        Object.assign(whereClause, { name_last: { $like: `${query.search}%` } }, criteria.LIVE);
      }
      if (query.affiliation_id != null) {
        Object.assign(whereClause, { affiliation_id: query.affiliation_id });
      }
      const result = await api.fetchAndParse(db.user, whereClause, RELATED_MODELS, scope.FILTERED_BY_USER(req.user));
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  listPendingUsers: async (req: UserRequest<AdminRole>, res: Response) => {
    const query: ListRequest = (req.query: any);
    const api = new TableApi(req, query);
    try {
      // TODO: Confirm criteria for what makes a pending user
      let whereClause = criteria.PENDING;
      if (query.search != null) {
        whereClause = Object.assign({}, whereClause, { name_last: { $like: `${query.search}%` } });
      }
      const result = await api.fetchAndParse(db.user, whereClause, RELATED_MODELS, scope.FILTERED_BY_USER(req.user));
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  getUser: async (req: UserRequest<AdminRole, { id: string }>, res: Response): Promise<void> => {
    let user = null;
    try {
      if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
        throw new Error('User not found');
      }
      user = await db.user.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: db.affiliation,
            as: 'affiliation'
          }
        ]
      });
    } catch (err) {
      user = null;
    }
    if (user == null) {
      res.status(404);
    }
    res.json({ data: user });
  },

  createUser: async (req: any, res: any): Promise<void> => {
    // Must be an administrator
    if (req.user.role !== 'admin') {
      res.status(401);
      res.json({ data: null });
    }

    const { user } = req.body;

    if (user.password !== user.password_confirmation) {
      res.status(401);
      res.json({ data: null });
    }

    // Find existing user with that email address
    const existingUser = await db.user.findOne({ where: { email: user.email } });
    if (existingUser) {
      res.status(400);
      res.json({
        data: null,
        message: 'User already exists'
      });
    }

    db.user.create({
      active: user.active,
      affiliation_id: user.affiliation_id,
      approved: user.approved,
      email: user.email,
      email_verifed: user.email_verifed,
      name_first: user.name_first,
      name_last: user.name_last,
      nomination_limit: user.nomination_limit,
      password: user.password,
      phone: user.phone,
      rank: user.rank,
      role: user.role
    }).then((createdUser: $TODO) => {
      res.json({ data: { user: { id: createdUser.id } } });
    }).catch(() => {
      res.status(500);
      res.json({
        // TODO: log error
        data: null,
        message: 'Could not create user. Unknown error.'
      });
    });
  }
};
