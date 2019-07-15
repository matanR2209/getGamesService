const fs = require('fs');
const url = require('url');

const Config = require('../env/Config');

const LOGS_FOLDER = './logs/';
const LOGS_FILE = Config.LOGS.GENERAL_LOGS_FILE;

module.exports = {
  logResponse: (response, request) => {
    const { path } = url.parse(request.url, true);
    const responseSummery = 'Path: ' + path
      + ', Response status: ' + response.status + ', matches found: ' + response.data.length + '\r\n';
    fs.appendFile(LOGS_FOLDER + LOGS_FILE, responseSummery, (err) => {
      if (err) {
        return false;
      }
    });
  },
};
