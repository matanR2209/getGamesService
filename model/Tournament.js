const Match = require('./Match');

module.exports = class Tournament {

  constructor (tourName, games =[]) {
    this.name =  tourName;
    this.id   = '_' +tourName;
    this.matchesList = games;
  }
  get _name() {
    return this.name
  }

  get _id() {
    return this.id
  }

  resetTournamnetMatches() {
    this.matchesList = [];
  }

  addMatches(matches) {
    if(Array.isArray(matches)) {
      this.matchesList = matches;
    }else {
      this.matchesList.push(matches);
    }
  }
};
