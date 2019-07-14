const assert = require('chai').assert;
const expect = require('chai').expect;

const Match = require('../../model/Match');

const dataReadingHandler = require('../../utils/DataReadingHandler');
const testingData = require('../testindData');
const emitter = require('../../utils/Emitter');


let tournamentsCB = ( matchesList ) => {
  let resultMatchesByTournament = []
  matchesList.forEach( match => {
    if ( match.tournament === testingData.tournaments.tournamentA) {
      resultMatchesByTournament.push(new Match(match, testingData.PLAYED_GAME_FILE));
    }
  });
  emitter.emit('getMatchesByTournament', resultMatchesByTournament);
}


describe('DataTransformingHandler [data validity]', function () {
  it('should return an array',  () => {
    dataReadingHandler.getMatches('tournaments', testingData.tournaments.tournamentA, tournamentsCB);
    emitter.subscribe('getMatchesByTournament', ( results ) => {
      assert.isArray(results);
    });
  });
});
