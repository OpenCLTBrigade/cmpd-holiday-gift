module.exports = {
    list: async (req, res) => {
    // TODO: table api
    // let apiClient = new VuetableApi(req);

        var resultSet = await apiClient.fetch('user');

        res.json(resultSet);
    }
};
