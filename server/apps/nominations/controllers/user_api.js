const VuetableApi = require('../../lib/vuetable-api');

module.exports = {
  list: async (req, res) => {
    let apiClient = new VuetableApi(req);

    var resultSet = await apiClient.fetch('user');

    res.json(resultSet);
  }
};
