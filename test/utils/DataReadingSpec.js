const assert = require('chai').assert;
const expect = require('chai').expect;

const Match = require('../../model/Match');

const dataReadingHandler = require('../../utils/DataReadingHandler');
const testingData = require('../testindData');
const emitter = require('../../utils/Emitter');

let teamsCB = ( matchesList ) => {
  let resultMatchesByTeam = []
  matchesList.forEach( match => {
    if ( match.home_team === testingData.teamName || match.away_team === testingData.teamName ) {
      resultMatchesByTeam.push(new Match(match, testingData.PLAYED_GAME_FILE));
    }
  });
  if(resultMatchesByTeam.length === 0) {
    emitter.emit('emptyMatches', resultMatchesByTeam);

  } else {
    emitter.emit('getMatchesByTeams', resultMatchesByTeam);
  }

}

let tournamentsCB = ( matchesList ) => {
  let resultMatchesByTournament = []
  matchesList.forEach( match => {
    if ( match.tournament === testingData.tournaments.tournamentA) {
      resultMatchesByTournament.push(new Match(match, testingData.PLAYED_GAME_FILE));
    }
  });

  if(resultMatchesByTournament.length === 0) {
    emitter.emit('emptyMatches', resultMatchesByTournament);
  } else {
    emitter.emit('getMatchesByTournament', resultMatchesByTournament);
  }

}

describe('DataReadingHandler [data validity]', function () {
  it('should return array',  () => {
    dataReadingHandler.getMatches( 'teams', testingData.teamName, teamsCB );

    let teamEmitterVal = emitter.subscribe('getMatchesByTeams', ( results ) => {
      results.forEach( match => {
        expect([match.home_team, match.away_team]).to.contain(testingData.teamName);
      });
      teamEmitterVal.unsubscribe();
    })
  });

  it('should return array of Matche object',  () => {
    dataReadingHandler.getMatches( 'teams', testingData.teamName, teamsCB );

    let teamEmitterVal = emitter.subscribe('getMatchesByTeams', ( results ) => {
      results.forEach( match => {
        assert.typeOf(match, 'Match');
      });
      teamEmitterVal.unsubscribe();
    })
  });

  it('should return empty array',  () => {
    dataReadingHandler.getMatches( ' ', testingData.teamName, teamsCB );

    let emprtTeamsEmitter = emitter.subscribe('emptyMatches', ( results ) => {
      assert.equal(results.length, 0);
      emprtTeamsEmitter.unsubscribe();
    })
  });
});


describe('DataReadingHandler [data correctness]', function () {
  it('should return array of matches filtered by team',  () => {
    dataReadingHandler.getMatches( 'teams', testingData.teamName, teamsCB );

    let teamEmitterVal = emitter.subscribe('getMatchesByTeams', ( results ) => {
      results.forEach( match => {
        expect([match.home_team, match.away_team]).to.contain(testingData.teamName);
      });
      teamEmitterVal.unsubscribe();
    })
  });

  it('should return array of matches filtered by tournament',  () => {
    dataReadingHandler.getMatches('tournaments', testingData.tournaments.tournamentA, tournamentsCB);
    emitter.subscribe('getMatchesByTournament', ( results ) => {
      results.forEach( match => {
        assert.equal(match.tournament, testingData.tournaments.tournamentA);
      });
    });

    emitter.subscribe('getMatchesByTeam', ( results ) => {
      results.forEach( match => {
        expect([match.home_team, match.away_team]).to.contain(testingData.teamName);
      });
    })
  });

  it('should return empty array',  () => {
    dataReadingHandler.getMatches( ' ', testingData.teamName, teamsCB );

    let emprtTeamsEmitter = emitter.subscribe('emptyMatches', ( results ) => {
      assert.equal(results.length, 0);
      emprtTeamsEmitter.unsubscribe();
    })
  });
});
