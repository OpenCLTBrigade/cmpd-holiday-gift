// @flow

import type { Response } from '../../lib/typed-express';
import type { UserRequest, AnyRole } from '../../lib/auth';

module.exports = {
  /*
   * Redirects the user to /user/:theirId
   */
  getMe: async (req: UserRequest<AnyRole>, res: Response) => {
    res.redirect(`/api/nominations/users/${req.user.id}`);
  }
};
