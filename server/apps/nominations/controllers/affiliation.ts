
import * as affiliationService from '../service/affiliation.service'

export default {
  list: async (req, res) => {
    const query = req.query
    const whitelist = req.user != null ? null : ['id', 'type', 'name'];

    try {
      const affilations = await affiliationService.query({ search: query.search, page: query.page, whitelist })
      
      res.json(affilations);
    } catch (err) {

      res.json(404);
    }
  },

  getAffiliation: async (req, res) => {
    const id: number = parseInt(req.params.id);
    const affiliation = await affiliationService.getAffiliation(id)

    if (affiliation) {
      return res.json(affiliation);
    }

    res.sendStatus(404);
  }
}