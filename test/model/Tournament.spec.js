const assert = require('chai').assert;

const Config = require('../../env/Config');
const Match = require('../../model/Match');
const Tournament = require('../../model/Tournament');
const PLAYED_GAME_FILE = Config.PLAYED_GAMES_FILE_NAME;
const UPCOMING_GAME_FILE = Config.UPCOMING_GAMES_FILE_NAME;

let stubMatchesData = [
  { home_team: 'Manchester United',
    away_team: 'Bournemouth',
    tournament: 'premier-league',
    start_time: 'Saturday 4th March 2017',
    kickoff: '12:30' },
  { home_team: 'Chelsea',
    away_team: 'Manchester United',
    tournament: 'fa',
    start_time: 'Monday 13th March 2017',
    kickoff: '19:45' },
  { home_team: 'Blackburn Rovers',
    home_score: '1',
    away_team: 'Manchester United',
    away_score: '1',
    tournament: 'fa',
    start_time: 'Sunday 19th February 2017' }
];


describe('Tournament', function () {
  let tournamentName = 'fa';
  let tournament = new Tournament(tournamentName);

  it('should return an tournament object',  () => {
    let tournamentObj = { name: 'fa', id: '_fa', matchesList: [] };
    assert.equal(tournamentObj.id, tournament._id);
    assert.equal(tournamentObj.name, tournament._name);
    assert.deepEqual(tournamentObj, tournament);
  });

  it('should contains only matches played in this tournament ',  () => {
    let stubMatchesObj = [];
    let testFiltersA = [
      { queryParamName: 'tournamentName',
        inDataKey: [ 'tournament' ],
        searchValue: tournamentName }
    ]

    stubMatchesData.forEach(match => {
      if(match.kickoff) {
        let matchObj = new Match(match, UPCOMING_GAME_FILE);
        if ( matchObj.isMatchingFilters(testFiltersA) ) {
          stubMatchesObj.push(matchObj);
        }
      }else {
        let matchObj = new Match(match, PLAYED_GAME_FILE)
        if ( matchObj.isMatchingFilters(testFiltersA) ) {
          stubMatchesObj.push(matchObj);
        }
      }
      tournament.addMatches(stubMatchesObj);

      tournament.matchesList.forEach( match => {
        assert.equal(match.tournament, tournamentName);
      });

    });
  });

  it('should allow adding one match to the tournament',  () => {
      let match = new Match(stubMatchesData[1], UPCOMING_GAME_FILE);
      tournament.resetTournamnetMatches();
      tournament.addMatches(match);
      assert.equal(tournament.matchesList.length, 1);
  });
})