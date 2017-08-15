// @flow

var TableApi = require('../../lib/tableApi');
const db = require('../../../models');

const guestWhiteList = ['id', 'type', 'name'];

import type { Response } from '../../lib/typed-express';
import type { TableRequest } from '../../lib/tableApi';
import type { UserRequest, AnyRole } from '../../lib/auth';

type ListRequest = {|
  ...$Exact<TableRequest>,
  search: string;
|};
module.exports = {
  list: async (req: UserRequest<>, res: Response): Promise<void> => {
    const query: ListRequest = (req.query: any);
    let api = new TableApi(req, query, 1000);
    try {
      // Limit fields shown to guests
      const whiteList = req.user != null ? null : guestWhiteList;
      // Filter by name
      let whereClause = {};
      if (query.search) {
        whereClause = { name: { $like: `${query.search}%` } };
      }
      let result = await api.fetchAndParse(db.affiliation, whereClause, null, '', whiteList);
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  getAffiliation: async (req: UserRequest<AnyRole, {id: string}>, res: Response): Promise<void> => {
    let id: number = parseInt(req.params.id);
    let affiliation = await db.affiliation.findFirst(id);

    if (!affiliation) {
      res.status(404);
    }

    res.json(affiliation);
  }
};
