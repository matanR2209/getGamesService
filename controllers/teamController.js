const createFiltersHandler = require('../utils/ConvertParamsToFilters');
const dataHandler = require('../utils/DataReadingHandler');
const filteringHandler = require('../utils/FilteringHandler');
const responseParseHandler = require('../utils/ResponseHandler');

const Config = require('../env/Config');

// by exporting the functions as modules, i allow the controller to expend,
// if say in the feature we will want to add more endpoints
module.exports = {
  getTeams: (req, res) => {
    const filters = createFiltersHandler(req.params);
    try {
      dataHandler.getMatches('teams', req.params.teamName, (matchesList) => {
        const filteredResults = filteringHandler.filterMatches(filters, matchesList);
        res.send(responseParseHandler.createResponse('done', filteredResults, req));
      });
    } catch (e) {
      const error = {
        error: e.toString(),
        errorMsg: Config.MESSAGES.GAMES_ERROR,
      };
      res.send(responseParseHandler.createResponse('error', [], req, error));
    }
  },
};
