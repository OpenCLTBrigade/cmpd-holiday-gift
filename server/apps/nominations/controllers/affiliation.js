// @flow

var TableApi = require('../../lib/tableApi');
const db = require('../../../models');

const guestWhiteList = ['id', 'type', 'name'];

import type { $Request, $Response } from 'express';

module.exports = {
  list: async (req: $Request, res: $Response): Promise<void> => {
    let api = new TableApi(req, 1000);
    try {
      // Limit fields shown to guests
      const whiteList = req.user != null ? null : guestWhiteList;
      // Filter by name
      let whereClause = {};
      if (req.query.search) {
        whereClause = { name: { $like: `${req.query.search}%` } };
      }
      let result = await api.fetchAndParse(db.affiliation, whereClause, null, '', whiteList);
      res.json(result);
    } catch (err) {
      res.json({ error: 'error fetching data' });
    }
  },

  getAffiliation: async (req: $Request, res: $Response): Promise<void> => {
    let id = parseInt(req.params.id);
    let affiliation = await db.affiliation.findFirst(id);

    if (!affiliation) {
      res.status(404);
    }

    res.json(affiliation);
  }
};
