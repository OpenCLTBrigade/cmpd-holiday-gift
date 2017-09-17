// @flow

const db = require('../../../models');
const TableApi = require('../../lib/tableApi');
const sequelize = require('sequelize');

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
  },

  createHousehold: async (req: any, res: any): Promise<void> => {
    // TODO: Check if user has reached nomination limit and reject if so
    // TODO: Validation?
    return sequelize.transaction((t) => {
      db.household.create({
        
      });
      // Create household record
      // Create address record (from address{})
      // Create phone numbers (from phoneNumbers[])
      // Create child records (from nominations[])
    }).then((result) => {
      // Success. Committed.
    }).catch((error) => {
      // Error. Rolled back.
    });;
  }


  // async function register(req: Request<>, res: Response): Promise<void> {
  //   const body: RegisterRequest = (req.body: any);
  //   const error = await registration.steps.register(rootUrl(req), {
  //     name_first: body.firstname,
  //     name_last: body.lastname,
  //     rank: body.rank,
  //     phone: body.phone,
  //     affiliation_id: body.affiliation,
  //     email: body.email,
  //     raw_password: body.password
  //   });
  //   if (error) {
  //     res.json(error);
  //   } else {
  //     res.json({ success: true });
  //   }
  // }
};
