const assert = require('chai').assert;
const expect = require('chai').expect;

const Match = require('../model/Match');
const Config = require('../env/Config')
const responseHandler = require('../utils/ResponseHandler');
let upcomigGameFile = Config.UPCOMING_GAMES_FILE;
let playedGameFile = Config.PLAYED_GAMES_FILE;

let stubMatchesData = [
  { home_team: 'Chelsea',
    away_team: 'Manchester United',
    tournament: 'fa',
    start_time: 'Monday 13th March 2017',
    kickoff: '19:45' },
  { home_team: 'Manchester United',
    away_team: 'Bournemouth',
    tournament: 'premier-league',
    start_time: 'Saturday 4th March 2017',
    kickoff: '12:30' },
  { home_team: 'Blackburn Rovers',
    home_score: '1',
    away_team: 'Manchester United',
    away_score: '1',
    tournament: 'fa',
    start_time: 'Sunday 19th February 2017' }
];

let stubMatchesObjects = [];
stubMatchesData.forEach(match => {
  if(match.kickoff) {
    stubMatchesObjects.push(new Match(match, upcomigGameFile));
  }else {
    stubMatchesObjects.push(new Match(match, playedGameFile));
  }
});

describe('ResponseHandler', function () {
  it('should have the expected  structure for succeed response',  () => {
    let results = {
      status: 'done',
      data: stubMatchesObjects
    }
    assert.deepEqual(responseHandler('done', stubMatchesObjects), results);
  });

  it('should have the expected  structure for failed response',  () => {
    let tempError = new Error('Temporary error');
    let  errorObj = {
      errorMsg: 'error message',
        error: tempError.e
    }

    let results = {
      status: 'error',
      data: [],
      error: errorObj
    }
    assert.deepEqual(responseHandler('error', [], errorObj), results);
  });
});