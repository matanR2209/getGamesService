module.exports = (filters, matchesList) => {
  if(filters.length === 0 ) {
    return gamesList;
  }
  let filteredResults = [];
  matchesList.forEach (match  => {
    if(match.isMatchingFilters(filters)) {
      filteredResults.push(match);
    }
  });
  return filteredResults;
}