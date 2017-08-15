

import type {Request, Response} from '../../types';

module.exports = {
  /*
   * Redirects the user to /user/:theirId
   */
  getMe: async (req: Request, res: Response) => {
    res.redirect(`/api/nominations/users/${req.user.id}`);
  }
};
