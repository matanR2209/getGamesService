const Match = require('../model/Match')
const responseParseHandler  = require('../utils/ResponseHandler');

const DataTransformer =require('./DataTransformingHandler')
const Emitter = require('./Emitter')

module.exports = {

  getMatches: (searchBy, value, cb) => {
    DataTransformer.transform();
    let emitter = Emitter.subscribe('matchesLoaded', (totalMatches) => {
      switch ( searchBy ) {
        case 'teams': {
          let matchesByTeam =  filterMatchesByTeam(totalMatches, value);
          cb(matchesByTeam);
          break;
        }
        case 'tournaments': {
          let matchesByTournament  =  filterMatchesByTournament(totalMatches, value);
          cb(matchesByTournament);
          break;
        }
        default:
          cb([]);
      }
      emitter.unsubscribe();
    });
  },
}

filterMatchesByTeam = (matches, teamName) => {
  let resultMatchesByTeam = []
  matches.forEach( match => {
    if ( match.data.home_team === teamName || match.data.away_team === teamName ) {
      resultMatchesByTeam.push(new Match(match.data, match.file));
    }
  });
  return resultMatchesByTeam;
}

filterMatchesByTournament = (matches, tournament) => {
  let resultMatchesByTournament = []
  matches.forEach( match => {
    if ( match.data.tournament === tournament ) {
      resultMatchesByTournament.push(new Match(match.data, match.file));
    }
  });
  return resultMatchesByTournament;
}