const addressTool = require('../../lib/cmpdAddress');
const geoData = require('../../data/CharlotteMecklenburg_Police_Response_Areas');
const logger = require('../../lib/logger');

async function getAddressInfo(req, res) {

  const { lat, long } = req.query;

  try {
    if (!lat || !long) {
      throw new Error('Missing information.');
    }

    const result = addressTool(geoData, [long, lat]);
    res.json({ data: result });

  } catch (err) {
    logger.info('cmpd getAddressInfo failed', err);
    res.json({ data: false });
  }
}

export default {
  getAddressInfo
}