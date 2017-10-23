// @flow

const db = require('../../../models');
const TableApi = require('../../lib/tableApi');
const auth = require('../../lib/auth');
const path = require('path');
const sendMail = require('../../lib/mail')(path.join(__dirname, '../mail-templates'));

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AdminRole } from '../../lib/auth';
import type { TableRequest } from '../../lib/tableApi';


const RELATED_MODELS = [{ model: db.affiliation, as: 'affiliation' }];

// TODO: Criteria that determines whether or not a user account is pending approval
const criteria = {
  PENDING: { email_verified: true, approved: false },
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
      const whereClause = criteria.LIVE;
      if (query.search != null && query.search.length > 0) {
        // TODO: why search only live users?
        Object.assign(whereClause, { name_last: { $like: `${query.search}%` } });
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

    const nomination_count = await db.household.count({ where: { 'nominator_id': user.id } });
    
    user = user.toJSON();
    // delete user.password; // No longer needed courtesy GIFT-210
    user.nomination_count = nomination_count;
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
    console.log('start');
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
      name_first: user.name_first,
      name_last: user.name_last,
      role: user.role,
      rank: user.rank,
      phone: user.phone,
      email: user.email,
      active: user.active,
      nomination_limit: user.nomination_limit,
      email_verifed: user.email_verifed,
      approved: true,
      password: auth.hashPassword(user.password),
      affiliation_id: user.affiliation_id,
    }).then((createdUser) => {
      console.log('made a user!', createdUser);
      res.json({ data: { user: { id: createdUser.id } } });
    }).catch(() => {
      res.status(500);
      res.json({
        // TODO: log error
        data: null,
        message: 'Could not create user. Unknown error.'
      });
    });
  },

  /**
   * Edit / Update user
   */
  updateUser: async (req: any, res: any): Promise<void> => {
    // Must be an administrator OR the current logged in user (editing themselves)
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      res.status(401);
      res.json({ data: null });
    }

    const { user } = req.body;

    if (user.password && user.password !== user.password_confirmation) {
      res.status(401);
      res.json({ data: null, message: 'Passwords do not match' });
    }

    // Find existing user with that id
    const existingUser = await db.user.findOne({ where: { id: req.params.id } });
    if (!existingUser) {
      res.status(404);
      res.json({
        data: null,
        message: 'User not found'
      });
    }

    let newData = {
      name_first: user.name_first,
      name_last: user.name_last,
      role: user.role,
      rank: user.rank,
      phone: user.phone,
      email: user.email,
      active: user.active,
      nomination_limit: user.nomination_limit,
      email_verifed: user.email_verifed,
      approved: user.approved,
      affiliation_id: user.affiliation_id
    };

    if (user.password && user.password != null) {
      newData.password = auth.hashPassword(user.password);
    }

    existingUser.update(newData).then(() => {
      res.json({ data: true });
    }).catch((err) => {
      res.status(500);
      res.json({
        data: null,
        message: 'Could not update user. Unknown error.',
        error: err
      });
    });
  },

  approveUser: async (req: any, res: any): Promise<void> => {
    // Must be an administrator
    if (req.user.role !== 'admin') {
      res.status(401);
      res.json({ data: null });
    }

    // Find existing user with that id
    const existingUser = await db.user.findOne({ where: { id: req.params.id } });
    if (!existingUser) {
      res.status(404);
      res.json({
        data: null,
        message: 'User not found'
      });
    }

    existingUser.update({
      active: true,
      approved: true,
      email_verifed: true
    }).then(() => {
      sendMail('user-account-approved', { to: existingUser.email }).then(() => {
        res.json({
          data: true,
          message: '',
          error: null
        });
      });
    }).catch((err) => {
      res.json({
        data: false,
        message: 'Could not update user.',
        error: err
      });
    });
  },

  declineUser: async (req: any, res: any): Promise<void> => {
    // Must be an administrator
    if (req.user.role !== 'admin') {
      res.status(401);
      res.json({ data: null });
    }

    // Find existing user with that id
    const existingUser = await db.user.findOne({ where: { id: req.params.id } });
    if (!existingUser) {
      res.status(404);
      res.json({
        data: false,
        message: 'User not found'
      });
    }

    existingUser.update({
      active: false,
      approved: false,
      email_verified: false,
      confirmation_email: false
    }).then(() => {
      res.json({
        data: true,
        message: '',
        error: null
      });
    }).catch((err) => {
      res.json({
        data: false,
        message: 'Could not update user.',
        error: err
      });
    });
  }
};
