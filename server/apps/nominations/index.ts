import * as express from 'express';
import auth from '../lib/auth';
import routes from './routes'

import config from '../../config'

const app = express();

// Add authentication
app.use(auth.authMiddleware(config.jwtSecrets.nominations));
app.use(auth.sessionMiddleware);

// Load the routess
app.use(routes);

module.exports = app;
