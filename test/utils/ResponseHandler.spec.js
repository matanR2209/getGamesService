const assert = require('chai').assert;


const Match = require('../../model/Match');
const responseHandler = require('../../utils/ResponseHandler');
const testingData = require('../testindData');


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

let req = {url : 'testing/url'};
let stubMatchesResponseObjects = [];
let stubMatchesObj = [];
stubMatchesData.forEach(match => {
  if(match.kickoff) {
    let matchObj = new Match(match, testingData.files.UPCOMING_GAME_FILE);
    stubMatchesObj.push(matchObj);
    stubMatchesResponseObjects.push(matchObj.createItemResponse());
  }else {
    let matchObj = new Match(match, testingData.files.PLAYED_GAME_FILE)
    stubMatchesObj.push(matchObj);
    stubMatchesResponseObjects.push(matchObj.createItemResponse());
  }
});

describe('ResponseHandler', function () {
  it('should have the expected  structure for succeed response',  () => {
    let results = {
      status: 'done',
      data: stubMatchesResponseObjects
    }
    assert.deepEqual(responseHandler.createResponse('done', stubMatchesObj, req), results);
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
    assert.deepEqual(responseHandler.createResponse('error', [], req, errorObj), results);
  });
});