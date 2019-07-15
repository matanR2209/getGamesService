const responseLogger = require('./ResponseLogger');
const Config = require('../env/Config');

module.exports = {
  createResponse: (status, data, req, error = null) => {
    let response = {
      status,
      data: data.map((item) => { return item.createItemResponse(); }),
    };
    if (error) {
      response.error = error;
    }
    if (Config.LOGS.RESPONSE_LOGGER_CONTROL) {
      responseLogger.logResponse(response, req);
    }
    return response;
  },
};
