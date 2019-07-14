const express = require('express');
const app = express();
const fs = require('fs');
const logger = require('morgan');
const responseParseHandler = require('./utils/ResponseHandler');
const config = require('./env/Config');
const emitter = require('./utils/Emitter');
const teamController = require('./controllers/teamController');
const tournamentController = require('./controllers/tournamentController');
const LOGS_FOLDER = './logs/';
const LOGS_FILE = config.LOGS.MORGAN_LOGS_FILE;


app.use(logger('combined', {
  stream: fs.createWriteStream(LOGS_FOLDER + LOGS_FILE, {flags: 'a'})
}));


// '/team/:teamName/:status?/:tournamentName?'
app.get('/teams/:teamName/:status?', (req, res) => {
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

// '/tournament/:tournamentName/:status?/:teamName'
app.get('/tournaments/:tournamentName/:status?', (req, res) => {
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

app.get('*', function(req, res){
  let error = {
    error: '404',
    errorMsg: 'Wrong route'
  }
  res.status(404).send(responseParseHandler.createResponse('error',[] ,req , error));
});

app.listen(process.env.PORT || 4000);