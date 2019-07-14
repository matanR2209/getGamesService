const dataHandler       = require('../utils/DataReadingHandler');
const createFiltersHandler = require('../utils/ConvertParamsToFilters')
const filteringHandler = require('../utils/FilteringHandler')
const responseParseHandler = require('../utils/ResponseHandler');

module.exports = {
  getTeams: (req, res) => {
    let filters = createFiltersHandler(req.params);
    dataHandler.getMatches('tournaments', req.params.tournamentName, (matchesList) => {
        let filteredResults = filteringHandler.filterMatches(filters, matchesList);
        res.send(responseParseHandler.createResponse('done', filteredResults, req));
    });
  },
}

