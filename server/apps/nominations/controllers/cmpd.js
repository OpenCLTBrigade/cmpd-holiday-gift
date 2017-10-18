// @flow

const addressTool = require('../../lib/cmpdAddress'); 
const geoData = require('../../data/CharlotteMecklenburg_Police_Response_Areas.json');
const logger = require('../../lib/logger');


module.exports = {
  getAddressInfo: async (req: any, res: any): Promise<void> => {
    const { lat, lng } = req.body;

    try {
      if (!lat || !lng) {
        throw new Error('Missing information.');
      }


      const result = addressTool.findFeature(geoData, [lng, lat]);

    } catch (err) {
      logger.info('cmpd getAddressInfo failed', err);
      res.json({ data: false });
    }
  }
};
