module.exports = Object.freeze({
  FILE_TYPE: "csv",
  PLAYED_GAMES_FILE_NAME   : 'result_played.csv',
  UPCOMING_GAMES_FILE_NAME : 'result_upcoming.csv',

  LOGS: {
    RESPONSE_LOGGER_CONTROL: true,
    GENERAL_LOGS_FILE: 'general_logs.log',
    MORGAN_LOGS_FILE: 'morgan_access.log'
  },

  DATA_ORIGIN_PARAMETERS: {
    teams : ['home_team', 'away_team'],
    tournament : ['tournament'],
    status : ['status'],
    kickoff : ['kickoff'],
    startTime : ['start_time']
  },

  MESSAGES: {
     GAMES_ERROR : 'Error getting matches, please try again',
  }
});
