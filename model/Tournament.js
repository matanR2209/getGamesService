const Match = require('./Match');

module.exports = class Tournament {

  constructor (tourName) {
    this.name =  tourName;
    this.id   = '_' +tourName;
    this.matchesList = [];
  }
  get _name() {
    return this.name
  }

  get _id() {
    return this.id
  }

  addMatch(matches) {
    if(Array.isArray(matches)) {
      this.matchesList = matches;
    }else {
      this.matchesList.push(match);
    }
  }
};
