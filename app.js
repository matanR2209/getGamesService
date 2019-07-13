const express = require('express');
const app = express();
const morgan  = require('morgan')

const responseParseHandler = require('./utils/ResponseHandler');
const config = require('./env/Config');
const emitter = require('./utils/Emitter');
const teamController = require('./controllers/teamController');
const tournamentController = require('./controllers/tournamentController');

// '/team/:teamName/:status?/:tournamentName?'
app.get('/teams/:teamName/:status?', (req, res) => {
    let errorsSubscription = emitter.subscribe('errorEmitter', (e) => {
      let errorObj = {
        error: e.toString(),
        errorMsg: config.MESSAGES.GAMES_ERROR
      }
      errorsSubscription.unsubscribe();
      res.send(responseParseHandler('error',[] , errorObj));
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
    res.send(responseParseHandler('error',[] , errorObj));
  });
  tournamentController.getTeams(req, res);
});

app.get('*', function(req, res){
  let error = {
    error: '404',
    errorMsg: 'Wrong route'
  }
  res.send(responseParseHandler('error',[] , error));
});

app.use(morgan('combined'))
app.listen(process.env.PORT || 4000);