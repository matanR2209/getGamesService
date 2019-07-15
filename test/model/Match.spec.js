const assert = require('chai').assert;

const Match = require('../../model/Match');
const testingData = require('../testindData')


stubPlayedMatch =
  { home_team: 'Blackburn Rovers',
    home_score: '1',
    away_team: 'Manchester United',
    away_score: '1',
    tournament: 'fa',
    start_time: 'Sunday 19th February 2017' }

stubUpcomngMatch =  { home_team: 'Chelsea',
  away_team: 'Manchester United',
  tournament: 'fa',
  start_time: 'Monday 13th March 2017',
  kickoff: '19:45' }

describe('Match played', function () {
  it('should return match score',  () => {
    let match = new Match(stubPlayedMatch, testingData.files.PLAYED_GAME_FILE);
    assert.equal(match._score, stubPlayedMatch.home_score + ' - ' + stubPlayedMatch.home_score);
  });

  it('should contain the match score in the response',  () => {
    let match = new Match(stubPlayedMatch, testingData.files.PLAYED_GAME_FILE);
    let matchResponse = match.createItemResponse();
    assert.isDefined(matchResponse.score);
  });

  it('should contain the correct match status',  () => {
    let match = new Match(stubPlayedMatch, testingData.files.PLAYED_GAME_FILE);
    assert.equal(match.status, testingData.statuses.PLAYED);
  });
})

describe('Upcoming match', function () {
  it('should return the match starting time',  () => {
    let match = new Match(stubUpcomngMatch, testingData.files.UPCOMING_GAME_FILE);
    assert.equal(match._kickoff, stubUpcomngMatch.kickoff);
  });

  it('should contain the kickoff time in the response',  () => {
    let match = new Match(stubUpcomngMatch, testingData.files.UPCOMING_GAME_FILE);
    let matchResponse = match.createItemResponse();
    assert.isDefined(matchResponse.kickoff);
  });

  it('should contain the correct match status',  () => {
    let match = new Match(stubUpcomngMatch, testingData.files.UPCOMING_GAME_FILE);

    assert.equal(match._status, testingData.statuses.UPCOMING);
  });
})

describe('Unknown match', function () {
  it('should contain the correct match status',  () => {
    let match = new Match(stubUpcomngMatch, null);
    assert.equal(match._status, null);
  });
})