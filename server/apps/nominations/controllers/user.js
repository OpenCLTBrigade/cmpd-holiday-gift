

var db = require('../../../models');
var TableApi = require('../../lib/tableApi');

import type {Request, Response, Next, RequestWithParams} from '../../types';
import type {TableRequest} from '../../lib/tableApi';

const RELATED_MODELS = [{ model: db.affiliation, as: 'affiliation' }];

// TODO: Criteria that determines whether or not a user account is pending approval
const criteria = {
  PENDING: { active: 'Y', approved: 'N' },
  APPROVED: { active: 'Y', approved: 'Y' } // TODO: rename
};

const scope = {
  FILTERED_BY_USER: user => ['filteredByUser', user]
};

// TODO: move user endpoints to auth app

type ListRequest = {|
  ...$Exact<TableRequest>,
  search?: string
|};

module.exports = {
  list: async (req: Request, res: Response, next: Next) => {
    const query: ListRequest = (req.query: any);
    let api = new TableApi(req, query);
    try {
      let whereClause = {};
      if (query.search != null) {
        // TODO: why search only approved users?
        whereClause = Object.assign({}, { name_last: { $like: `${query.search}%` } }, criteria.APPROVED);
      }
      let result = await api.fetchAndParse(db.user, whereClause, RELATED_MODELS, scope.FILTERED_BY_USER(req.user));
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  listPendingUsers: async (req: Request, res: Response) => {
    let query: ListRequest = (req.query: any);
    let api = new TableApi(req, query);
    try {
      // TODO: Confirm criteria for what makes a pending user
      let whereClause = criteria.PENDING;
      if (query.search) {
        whereClause = Object.assign({}, whereClause, { name_last: { $like: `${query.search}%` } });
      }
      let result = await api.fetchAndParse(db.user, whereClause, RELATED_MODELS, scope.FILTERED_BY_USER(req.user));
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  getUser: async (req: RequestWithParams<{id: string}>, res: Response, next: Next): Promise<void> => {
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
  }
};
