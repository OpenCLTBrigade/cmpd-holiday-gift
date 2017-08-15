

var db = require('../../../models');
var TableApi = require('../../lib/tableApi');

const related = [{ model: db.child, as: 'children' }, { model: db.user, as: 'nominator' }];

import type { Request, RequestWithParams, Response } from '../../types';
import type {TableRequest} from '../../lib/tableApi';

type ListRequest = {
  ...TableRequest,
  search: string
};
module.exports = {
  list: async (req: Request, res: Response, _next: *): Promise<void> => {
    const query: ListRequest = (req.query: any);
    let api = new TableApi(req, query);
    try {
      let whereClause = {};
      if (query.search) {
        whereClause = { name_last: { $like: `${query.search}%` } };
      }
      let result = await api.fetchAndParse(db.household, whereClause, related, { method: ['filteredByUser', req.user] });
      res.json(result);
    } catch (err) {
      // TODO: properly log error
      console.log(err);
      res.json({ error: 'error fetching data' });
    }
  },
  getHousehold: async (req: RequestWithParams<{id: string}>, res: Response): Promise<void> => {
    let household = null;
    try {
      household = await db.household.findById(req.params.id, { include: related });
      if (!household) {
        throw new Error('Household not found');
      }
    } catch (err) {
      household = null;
      res.status(404);
    }
    // var schools = await db.affiliation.findAll({
    //   attributes: ['id', 'name'],
    //   where: { type: 'cms' }
    // });
    res.json(household);
  }
};
