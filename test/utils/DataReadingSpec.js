const assert = require('chai').assert;
const expect = require('chai').expect;

const dataReadingHandler = require('../../utils/DataReadingHandler');
const Match = require('../../model/Match');
const Config = require('../../env/Config')
const PLAYED_GAME_FILE = Config.PLAYED_GAMES_FILE;

let emitter = require('../../utils/Emitter');



describe('DataReadingHandler', function () {
  let teamName = 'Arsenal';
  let tournamentName = 'fa';
  let teamsCB = ( matchesList ) => {
    let resultMatchesByTeam = []
    matchesList.forEach( match => {
      if ( match.home_team === teamName || match.away_team === teamName ) {
        resultMatchesByTeam.push(new Match(match, PLAYED_GAME_FILE));
      }
    });
    emitter.emit('getMatchesByTeams', resultMatchesByTeam);

  }

  let tournamentsCB = ( matchesList ) => {
    let resultMatchesByTournament = []
    matchesList.forEach( match => {
      if ( match.tournament === tournamentName) {
        resultMatchesByTournament.push(new Match(match, PLAYED_GAME_FILE));
      }
    });
    emitter.emit('getMatchesByTournament', resultMatchesByTournament);
  }

  it('should return array of matches filtered by team',  () => {
    dataReadingHandler.getMatches( 'teams', teamName, teamsCB );

    let teamEmitterVal = emitter.subscribe('getMatchesByTeams', ( results ) => {
      results.forEach( match => {
        expect([match.home_team, match.away_team]).to.contain(teamName);
      });
      teamEmitterVal.unsubscribe();
    })
  });

  it('should return array of matches filtered by tournament',  () => {
    dataReadingHandler.getMatches('tournaments', tournamentName, tournamentsCB);
    emitter.subscribe('getMatchesByTournament', ( results ) => {
      results.forEach( match => {
        assert.equal(match.tournament, tournamentName);
      });
    });

    emitter.subscribe('getMatchesByTeam', ( results ) => {
      results.forEach( match => {
        expect([match.home_team, match.away_team]).to.contain(teamName);
      });
    })
  });
});

describe('DataTransformingHandler', function () {
  it('should return an array',  () => {
    let tournamentName = 'fa';
    let tournamentsCB = ( matchesList ) => {
      let resultMatchesByTournament = []
      matchesList.forEach( match => {
        if ( match.tournament === tournamentName) {
          resultMatchesByTournament.push(new Match(match, PLAYED_GAME_FILE));
        }
      });
      emitter.emit('getMatchesByTournament', resultMatchesByTournament);
    }


    dataReadingHandler.getMatches('tournaments', tournamentName, tournamentsCB);
    emitter.subscribe('getMatchesByTournament', ( results ) => {
      assert.isArray(results);
    });
  });
})
