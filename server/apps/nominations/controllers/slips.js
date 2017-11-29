// @flow

const db = require('../../../models');

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AdminRole } from '../../lib/auth';

async function packing(req: UserRequest<AdminRole>, res: Response): Promise<void> {

  const whereClause = { approved: true, deleted: false };
  console.info('The query params:', req.query);

  if (req.query && req.query.household_id) {
    whereClause['id'] = req.query.household_id;
  }
  
  const households = await db.household.findAll({
    where: whereClause,
    include: [
      { model: db.household_address, as: 'address' },
      { model: db.household_phone, as: 'phones' },
      { model: db.child, as: 'children' },
      { model: db.user, as: 'nominator', include: [{ model: db.affiliation }] }
    ]
  });
  const assistance = {
    // TODO
    phone: 'N/A',
    radio: 'N/A'
  };
  res.json({ households, assistance });
}

module.exports = { packing };
