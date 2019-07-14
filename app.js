const express = require('express');
const app = express();
const fs = require('fs');
const logger = require('morgan');

const Config = require('./env/Config');
const routes = require('./routes/Routes');

const responseParseHandler = require('./utils/ResponseHandler');
const emitter = require('./utils/Emitter');
const teamController = require('./controllers/teamController');
const tournamentController = require('./controllers/tournamentController');

const LOGS_FOLDER = './logs/';
const LOGS_FILE = Config.LOGS.MORGAN_LOGS_FILE;

//morgan logger for general request-response information
app.use(logger('combined', {
  stream: fs.createWriteStream(LOGS_FOLDER + LOGS_FILE, {flags: 'a'})
}));


//possible endpoint for farther filtering
// '/team/:teamName/:status?/:tournamentName?'

app.get(routes.TEAMS_ROUTE, (req, res) => {
  //general error handling for this endpoint
    let errorsSubscription = emitter.subscribe('errorEmitter', (e) => {
      let errorObj = {
        error: e.toString(),
        errorMsg: config.MESSAGES.GAMES_ERROR
      }
      errorsSubscription.unsubscribe();
      res.send(responseParseHandler.createResponse('error',[], req , errorObj));
    });

  teamController.getTeams(req, res);
});

//possible endpoint for farther filtering
// '/tournament/:tournamentName/:status?/:teamName'

app.get(routes.TOURNAMENTS_ROUTE, (req, res) => {
  //general error handling for this endpoint
  let errorsSubscription = emitter.subscribe('errorEmitter', (e) => {
    let errorObj = {
      error: e.toString(),
      errorMsg: config.MESSAGES.GAMES_ERROR
    }
    errorsSubscription.unsubscribe();
    res.send(responseParseHandler.createResponse('error', [], req, errorObj));
  });

  tournamentController.getTeams(req, res);
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Games service is listening on port 4000 ')
});