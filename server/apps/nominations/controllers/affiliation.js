// @flow

const TableApi = require('../../lib/tableApi');
const db = require('../../../models');

const guestWhiteList = ['id', 'type', 'name'];

import type { Response } from '../../lib/typed-express';
import type { TableRequest } from '../../lib/tableApi';
import type { UserRequest, AnyRole } from '../../lib/auth';

type ListRequest = {|
  ...$Exact<TableRequest>,
  search: string
|};
module.exports = {
  list: async (req: UserRequest<>, res: Response): Promise<void> => {
    const query: ListRequest = (req.query: any);
    const api = new TableApi(req, query, 1000);
    try {
      // Limit fields shown to guests
      const whiteList = req.user != null ? null : guestWhiteList;
      // Filter by name
      const whereClause = {};
      if (query.search) {
        whereClause.name = { $like: `${query.search}%` };
      }

      if (query.type) {
        whereClause.type = query.type;
      }

      const result = await api.fetchAndParse(db.affiliation, whereClause, null, '', whiteList);
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  getAffiliation: async (req: UserRequest<AnyRole, { id: string }>, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const affiliation = await db.affiliation.findById(id);

    if (!affiliation) {
      res.status(404);
    }

    res.json(affiliation);
  }
};
