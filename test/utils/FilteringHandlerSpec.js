const expect = require('chai').expect;
const assert = require('chai').assert;

const Match = require('../../model/Match');
const filteringHandler = require('../../utils/FilteringHandler');
const testingData = require('../testindData');

let testFiltersA = [
  { queryParamName: 'tournamentName',
    inDataKey: [ 'tournament' ],
    searchValue: testingData.tournaments.tournamentB },
  { queryParamName: 'status',
    inDataKey: [ 'status' ],
    searchValue: testingData.statuses.UPCOMING }
]

let testFiltersB = [
  { queryParamName: 'teamName',
    inDataKey: [ 'home_team', 'away_team' ],
    searchValue: testingData.teamName },
  { queryParamName: 'status',
    inDataKey: [ 'status' ],
    searchValue: testingData.statuses.UPCOMING }
]

let stubMatchesObj = [];
testingData.stubMatchesData.forEach(match => {
  if(match.kickoff) {
    let matchObj = new Match(match, testingData.files.UPCOMING_GAME_FILE);
    stubMatchesObj.push(matchObj);
  }else {
    let matchObj = new Match(match, testingData.files.PLAYED_GAME_FILE)
    stubMatchesObj.push(matchObj);
  }
});


describe('filteringHandler [data validity]', function () {
  it('should return array',  () => {
    let filteredResultsA = filteringHandler.filterMatches(testFiltersA, stubMatchesObj);
    assert.typeOf(filteredResultsA, 'array');

    let filteredResultsB = filteringHandler.filterMatches(testFiltersA, stubMatchesObj);
    assert.typeOf(filteredResultsB, 'array');
  });

  it('should return empty array',  () => {
    let filteredResultsB = filteringHandler.filterMatches(testFiltersA, []);
    assert.equal(filteredResultsB.length, 0);
  });

  it('should return array size of the input when no filters provided',  () => {
    let filteredResultsB = filteringHandler.filterMatches([], stubMatchesObj);
    assert.equal(filteredResultsB.length, stubMatchesObj.length);
  });
});



describe('filteringHandler [data correctness]', function () {
  it('should return array of filtered matches by the filters provided',  () => {
    let filteredResultsA = filteringHandler.filterMatches(testFiltersA, stubMatchesObj);
    let filteredResultsB = filteringHandler.filterMatches(testFiltersB, stubMatchesObj);

    filteredResultsA.forEach(match => {
      expect(match.isMatchingFilters(testFiltersA)).to.equal(true);
    });

    filteredResultsB.forEach(match => {
      expect(match.isMatchingFilters(testFiltersB)).to.equal(true);
    });
  });

  it('should return unfiltered matches',  () => {
      let results = filteringHandler.filterMatches([], stubMatchesObj);
      assert.deepEqual(results, stubMatchesObj);
  });
});