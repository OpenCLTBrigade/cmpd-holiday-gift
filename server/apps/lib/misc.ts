// Quick and dirty fix for GIFT-206 / GIFT-205
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export const rootUrl = req => `${protocol}://${req.get('host')}`;

export const baseUrl = req =>
  `${protocol}://${req.get('host')}${req.path || ''}`;
