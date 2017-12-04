// @flow
const db = require('../../../models');

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AnyRole } from '../../lib/auth';

module.exports = {
  /*
   * Redirects the user to /user/:theirId
   */
  getMe: async (req: UserRequest<AnyRole>, res: Response) => {
    let user = null;
    try {
      user = await db.user.findOne({
        where: { id: req.user.id },
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

    const nomination_count = await db.household.count({
      where: { nominator_id: user.id }
    });

    user = user.toJSON();
    // delete user.password; // No longer needed courtesy GIFT-210
    user.nomination_count = nomination_count;
    res.json({ data: user });
    // res.redirect(`/api/nominations/users/${req.user.id}`);
  },

  async getNominationsStatus(req: any, res: any) {
    const nominator = Object.assign({}, req.user);
    const { id, nomination_limit: limit } = nominator.dataValues;

    const count = await db.household.count({
      where: { nominator_id: id, deleted: false }
    });

    return res.json({ count, limit });
  }
};
