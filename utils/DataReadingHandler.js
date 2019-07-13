const Match = require('../model/Match');
const Tournament = require('../model/Tournament');

const DataTransformer =require('./DataTransformingHandler');
const emitter = require('./Emitter');

module.exports = {
  getMatches: (searchBy, value, cb) => {
    try{
      DataTransformer.transform();
      const matchesLoadedSubscription = emitter.subscribe('matchesLoaded', (totalMatches) => {
        switch ( searchBy ) {
          case 'teams': {
            let matchesByTeam = filterMatchesByTeam(totalMatches, value);
            cb(matchesByTeam);
            break;
          }
          case 'tournaments': {
            let matchesByTournament  =  filterMatchesByTournament(totalMatches, value);
            let newTournament = new Tournament(value, matchesByTournament);
            cb(newTournament.matchesList);
            break;
          }
          default:
            cb([]);
        }
        matchesLoadedSubscription.unsubscribe();
      });
    } catch (e) {
      emitter.emit('errorEmitter', e);
    }
  }
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