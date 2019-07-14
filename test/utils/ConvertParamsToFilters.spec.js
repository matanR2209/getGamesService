const assert = require('chai').assert;

const converParamsToFilters = require('../../utils/ConvertParamsToFilters');
const testingData = require('../testindData')

let testData = [
  {
    params : { teamName: testingData.teamName, status: undefined },
    expectedFilters : [
      { queryParamName: 'teamName',
        inDataKey: [ 'home_team', 'away_team' ],
        searchValue: testingData.teamName }
    ]
  },
  {
    params: { teamName: testingData.teamName, status: testingData.statuses.UPCOMING},
    expectedFilters: [
      { queryParamName: 'teamName',
        inDataKey: [ 'home_team', 'away_team' ],
        searchValue: testingData.teamName },
      { queryParamName: 'status',
        inDataKey: [ 'status' ],
        searchValue: testingData.statuses.UPCOMING }
    ]
  },
  {
    params: { tournamentName: testingData.tournaments.tournamentA, status: undefined },
    expectedFilters: [
      { queryParamName: 'tournamentName',
        inDataKey: [ 'tournament' ],
        searchValue: testingData.tournaments.tournamentA }]
  },
  {
    params: { tournamentName: testingData.tournaments.tournamentB, status: testingData.statuses.PLAYED },
    expectedFilters: [
      { queryParamName: 'tournamentName',
        inDataKey: [ 'tournament' ],
        searchValue: testingData.tournaments.tournamentB },
      { queryParamName: 'status',
        inDataKey: [ 'status' ],
        searchValue: testingData.statuses.PLAYED }
    ]
  }
];

describe('ConvertParamsToFilters [data validity]', function () {
  it('should return an array',  () => {
    testData.forEach( testingParam => {
      assert.typeOf(converParamsToFilters(testingParam.params), 'array')
    });
  });

  it('Filters array should match the number of the query params',  () => {
    testData.forEach( testingParam => {
      let queryParamsEntries = Object.entries(testingParam.params);
      let queryParamsLength = 0;
      queryParamsEntries.forEach( entry => {
          if(entry[1]) {
            queryParamsLength++
          }
      });
      assert.equal(queryParamsLength, testingParam.expectedFilters.length);
    });
  });
});

describe('ConvertParamsToFilters [data correctness]', function () {
  it('should return array of filters that matches the query params',  () => {
    testData.forEach( testingParam => {
      assert.deepEqual(converParamsToFilters(testingParam.params), testingParam.expectedFilters);
    });
  });
});