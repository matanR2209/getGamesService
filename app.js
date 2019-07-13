const express = require('express');
const app = express();

const teamController = require('./controllers/teamController');
const tournamentController = require('./controllers/tournamentController');

const responseHanlder = require('./utils/ResponseHandler');

// '/team/:teamName/:status?/:tournamentName?'
app.get('/teams/:teamName/:status?', (req, res) => {
    teamController.getTeams(req, res);
});

// '/tournament/:tournamentName/:status?/:teamName'
app.get('/tournaments/:tournamentName/:status?', (req, res) => {
  tournamentController.getTeams(req, res);
});

app.get('*', function(req, res){
  let error = {
    error: '404',
    errorMsg: 'Wrong route'
  }
  res.send(responseHanlder('error',[] , error));
});

app.listen(process.env.PORT || 4000);