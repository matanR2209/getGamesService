const Statuses = require('../model/MatchStatuses');
const Config   = require('../env/Config');

module.exports = {
  statuses: {
    UPCOMING : Statuses.UPCOMING,
    PLAYED : Statuses.PLAYED,
  },
  files: {
    PLAYED_GAME_FILE : Config.PLAYED_GAMES_FILE,
    UPCOMING_GAME_FILE : Config.UPCOMING_GAMES_FILE,
  },
  tournaments: {
    tournamentA : 'fa',
    tournamentB : 'premier-league'
  },
  teamName : 'Arsenal',
  stubMatchesData : [
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
  ]
};
