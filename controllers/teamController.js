const dataHandler           = require('../utils/DataReadingHandler');
const createFiltersHandler  = require('../utils/ConvertParamsToFilters');
const filteringHandler      = require('../utils/FilteringHandler');
const responseParseHandler  = require('../utils/ResponseHandler');

// by exporting the functions as modules, i allow the controller to expend,
// if say in the feature we will want to add more endpoints
module.exports = {
  getTeams: (req, res) => {
    let filters = createFiltersHandler(req.params);
    dataHandler.getMatches('teams', req.params.teamName, (matchesList) => {
      let filteredResults = filteringHandler(filters, matchesList);
      res.send(responseParseHandler('done', filteredResults));
    });
  },
}








