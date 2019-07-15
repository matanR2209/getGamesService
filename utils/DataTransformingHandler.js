const csv = require('fast-csv');
const fs = require('fs');

const dataFolder = './data/';

const Config = require('../env/Config');
const emitter = require('./Emitter');

transformCSVToArray = (filesCounter) => {
  let filesScanned = 0;
  const transformedArray = [];
  fs.readdirSync(dataFolder).forEach((file) => {
    csv.parseFile(dataFolder + file, { headers: true })
      .on('data', (dataRow) => {
        transformedArray.push({ data: dataRow, file });
      }).on('end', () => {
      filesScanned++;
      if (filesScanned === filesCounter) {
        emitter.emit('matchesLoaded', transformedArray);
      }
    });
  });
};

module.exports = {
  transform: () => {
    try {
      let filesCounter = 0;
      fs.readdirSync(dataFolder).forEach((file) => {
        filesCounter++;
      });
      switch (Config.FILE_TYPE) {
        case 'csv':
          return transformCSVToArray(filesCounter);
        // case 'http' :
        //   transformHTTPToArray();
        //   return
        // case 'json':
        //   transformJSONToArray();
        //   return;
        default:
          emitter.emit('matchesLoaded', []);
      }
    } catch (e) {
      emitter.emit('errorEmitter', e);
    }
    return [];
  },
};
