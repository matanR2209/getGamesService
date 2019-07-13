module.exports = Object.freeze({
  FILE_TYPE: "csv",
  PLAYED_GAMES_FILE_NAME   : 'result_played.csv',
  UPCOMING_GAMES_FILE_NAME : 'result_upcoming.csv',

  DATA_ORIGIN_PARAMETERS: {
    teams : ['home_team', 'away_team'],
    tournament : ['tournament'],
    status : ['status'],
    kickoff : ['kickoff'],
    startTime : ['start_time']
  }
});
