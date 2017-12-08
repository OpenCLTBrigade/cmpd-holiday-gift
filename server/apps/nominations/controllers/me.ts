
import db from '../../../models'

export default {
    /*
   * Redirects the user to /user/:theirId
   */
  getMe: async (req, res) => {
    let user = null;
    try {
      user = await db['user'].findOne({
        where: { id: req.user.id },
        include: [
          {
            model: db['affiliation'],
            as: 'affiliation'
          }
        ]
      });
    } catch (err) {
      user = null;
    }

    const nomination_count = await db['household'].count({ where: { 'nominator_id': user.id } });
    
    user = user.toJSON();
    // delete user.password; // No longer needed courtesy GIFT-210
    user.nomination_count = nomination_count;
    res.json({ data: user });
    // res.redirect(`/api/nominations/users/${req.user.id}`);
  },

  async getNominationsStatus(req, res) {
    const nominator = Object.assign({}, req.user);
    const { id, nomination_limit: limit } = nominator.dataValues;

    const count = await db['household'].count({ where: { nominator_id: id, deleted: false } });

    return res.json({ count, limit });
  }
}