// @flow

const db = require('../../../models');
const TableApi = require('../../lib/tableApi');

const related = [{ model: db.child, as: 'children' }, { model: db.user, as: 'nominator' }];

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AnyRole } from '../../lib/auth';
import type { TableRequest } from '../../lib/tableApi';

type ListRequest = {
  ...TableRequest,
  search: string
};
module.exports = {
  list: async (req: UserRequest<>, res: Response): Promise<void> => {
    const query: ListRequest = (req.query: any);
    const api = new TableApi(req, query);
    try {
      let whereClause = {};
      if (query.search) {
        whereClause = { name_last: { $like: `${query.search}%` } };
      }
      const result = await api.fetchAndParse(
        db.household,
        whereClause,
        related,
        { method: ['filteredByUser', req.user] });
      res.json(result);
    } catch (err) {
      // TODO: properly log error
      console.error(err);
      res.json({ error: 'error fetching data' });
    }
  },
  getHousehold: async (req: UserRequest<AnyRole, {id: string}>, res: Response): Promise<void> => {
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
