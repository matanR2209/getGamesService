const assert = require('chai').assert;

const converParamsToFilters = require('../../utils/ConvertParamsToFilters');
const Statuses = require('../../model/MatchStatuses')

describe('ConvertParamsToFilters', function () {
  let teamName = 'Arsenal';
  let statusA = Statuses.UPCOMING;
  let statusB = Statuses.PLAYED;
  let tournamnetA = 'fa';
  let tournamentB = 'premier-league';

  let testData = [
    {
      params : { teamName: teamName, status: undefined },
      expectedFilters : [
        { queryParamName: 'teamName',
          inDataKey: [ 'home_team', 'away_team' ],
          searchValue: teamName }
      ]
    },
    {
      params: { teamName: teamName, status: statusA},
      expectedFilters: [
        { queryParamName: 'teamName',
          inDataKey: [ 'home_team', 'away_team' ],
          searchValue: teamName },
        { queryParamName: 'status',
          inDataKey: [ 'status' ],
          searchValue: statusA }
      ]
    },
    {
      params: { tournamentName: tournamnetA, status: undefined },
      expectedFilters: [
        { queryParamName: 'tournamentName',
        inDataKey: [ 'tournament' ],
        searchValue: tournamnetA }]
    },
    {
      params: { tournamentName: tournamentB, status: statusB },
      expectedFilters: [
        { queryParamName: 'tournamentName',
        inDataKey: [ 'tournament' ],
        searchValue: tournamentB },
        { queryParamName: 'status',
          inDataKey: [ 'status' ],
          searchValue: statusB } ]
    }
  ];
  it('should return array of filters by that matches the query params',  () => {

    testData.forEach( testingParam => {
      assert.deepEqual(converParamsToFilters(testingParam.params), testingParam.expectedFilters);
    });
  });

});