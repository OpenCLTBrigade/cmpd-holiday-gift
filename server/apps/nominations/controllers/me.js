// @flow
const db = require('../../../models');

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AnyRole } from '../../lib/auth';

module.exports = {
  /*
   * Redirects the user to /user/:theirId
   */
  getMe: async (req: UserRequest<AnyRole>, res: Response) => {
    res.redirect(`/api/nominations/users/${req.user.id}`);
  },

  async getNominationsStatus(req: any, res: any) {
    const nominator = Object.assign({}, req.user);
    const { id, nomination_limit: limit } = nominator.dataValues;

    const count = await db.household.count({ where: { nominator_id: id } });

    return res.json({ count, limit });
  },
};
