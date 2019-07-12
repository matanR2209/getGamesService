const csv = require('fast-csv');
const fs = require('fs');
const dataFolder = './data/';

const Config = require('../env/Config');
const Emitter = require('./Emitter')

module.exports = {
  transform: ( ) => {
    let filesCounter = 0;
    fs.readdirSync( dataFolder ).forEach( file => {
      filesCounter++;
    } );
    switch ( Config.FILE_TYPE ) {
      case 'csv':
        return  transformCSVToArray(filesCounter);
      // case 'http' :
      //   transformHTTPToArray();
      //   return
      // case 'json':
      //   transformJSONToArray();
      //   return;
      default:
        Emitter.emit('matchesLoaded', []);
    }
  }
}

transformCSVToArray = ( filesCounter ) => {
  let filesScanned = 0;
  let transformedArray = [];
  fs.readdirSync( dataFolder ).forEach( file => {
    csv.parseFile( dataFolder + file, {headers: true} )
      .on( "data", dataRow => {
        transformedArray.push({data: dataRow, file: file});
      } ).on( "end", function () {
      filesScanned++;
      if ( filesScanned === filesCounter ) {
        Emitter.emit('matchesLoaded', transformedArray);
      }
    } );
  } );
}