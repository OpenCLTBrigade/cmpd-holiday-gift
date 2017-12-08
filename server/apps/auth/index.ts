import * as express from 'express';
import routes from './routes';
import auth from '../lib/auth';

import config from '../../config'

const app = express();

// Add authentication
app.use(auth.authMiddleware(config.jwtSecrets.auth));
app.use((auth.sessionMiddleware));

// Load the routess
app.use(routes);

module.exports = app;
