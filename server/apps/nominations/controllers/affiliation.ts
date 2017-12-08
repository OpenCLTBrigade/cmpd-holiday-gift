const TableApi = require('../../lib/tableApi');

import * as db from '../../../models'
const guestWhiteList = ['id', 'type', 'name'];

export default {
  list: async (req, res) => {
    const query = req.query
    const api = new TableApi(req, query, 1000);
    try {
      // Limit fields shown to guests
      const whiteList = req.user != null ? null : guestWhiteList;
      // Filter by name
      const whereClause: any = {};
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

  getAffiliation: async (req, res) => {
    const id: number = parseInt(req.params.id);
    const affiliation = await  db.affiliation.findById(id);

    if (!affiliation) {
      res.status(404);
    }

    res.json(affiliation);
  }
}