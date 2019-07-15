const Config = require('../env/Config');
module.exports = (queryParams) => {
  let filters = [];
  // Filtering options will allow us to :
  // A. add as much filters as we want to the data, we just need to make sure that the queryParamName will match the query param name at the end point,
  //   and add the value in the data file to the inDataKey
  // B. with inDataKey being array of options, we allow the filtering option to be more flexible
  // (for example if in the future we change/add another data provider, which gives other names to the properties,
  // the only change needed is to add the new key to the inDataKey array)

  let filteringOptions = [
    {
      queryParamName: 'teamName',
      inDataKey: Config.DATA_ORIGIN_PARAMETERS.teams,
    },
    {
      queryParamName: 'tournamentName',
      inDataKey: Config.DATA_ORIGIN_PARAMETERS.tournament,
    },
    {
      queryParamName: 'status',
      inDataKey: Config.DATA_ORIGIN_PARAMETERS.status,
    },
    {
      queryParamName: 'kickoff',
      inDataKey: Config.DATA_ORIGIN_PARAMETERS.kickoff,
    },
    {
      queryParamName: 'startTime',
      inDataKey: Config.DATA_ORIGIN_PARAMETERS.startTime,
    },
  ];
  filteringOptions.forEach((tempFilter) => {
    let returnedFilter = tempFilter;
    const tempFilterName = tempFilter.queryParamName;
    if (queryParams[tempFilterName]) {
      returnedFilter.searchValue = queryParams[tempFilter.queryParamName];
      filters.push(tempFilter);
    }
  });
  return filters;
};
