const assert = require('chai').assert;

const config = require('../../env/Config');

const Match = require('../../model/Match');
const responseHandler = require('../../utils/ResponseHandler');
const testingData = require('../testindData');

let req = {url : 'testing/url'};
let stubMatchesResponseObjects = [];
let stubMatchesObj = [];
testingData.stubMatchesData.forEach(match => {
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

describe('ResponseHandler [data validity]', function () {
  it('should have the expected  structure for succeed response',  () => {
    let output = responseHandler.createResponse('done', stubMatchesObj, req);
    assert.typeOf(output.data,'array');
    assert.typeOf(output.status,'string');
  });

  it('should have the expected  structure for failed response',  () => {
    let tempError = new Error('Temporary error');
    let errorObj = {
      error: tempError.toString(),
      errorMsg: config.MESSAGES.GAMES_ERROR
    }

    let output = responseHandler.createResponse('error', [], req, errorObj);
    assert.typeOf(output.data,'array');
    assert.typeOf(output.status,'string');
    assert.typeOf(output.error,'object');
    assert.typeOf(output.error.errorMsg,'string');
    assert.typeOf(output.error.error,'string');
  });
});

describe('ResponseHandler [data correctness]', function () {
  it('should return correct data for the given input (no errors)',  () => {
    let output = responseHandler.createResponse('done', stubMatchesObj, req);
    let expectedResults = {
      status: 'done',
      data: stubMatchesResponseObjects
    }
    assert.deepEqual(output, expectedResults);
  });

  it('should return correct data in case of error passed as parameter',  () => {
    let tempError = new Error('Temporary test error');
    let errorObj = {
      error: tempError.toString(),
      errorMsg: config.MESSAGES.GAMES_ERROR
    }
    let expectedResults = {
      status: 'error',
      data: [],
      error: errorObj
    }
    let output = responseHandler.createResponse('error', [], req, errorObj);
    assert.deepEqual(output, expectedResults);

  });
});