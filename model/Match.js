const Team = require('./Team');
const Tournament = require('./Tournament');
const Statuses = require('./MatchStatuses');
const Config = require('../env/Config');

module.exports = class Match {
  constructor(match, file){
    Object.assign(this, { home_team: match.home_team,
      away_team: match.away_team,
      tournament: match.tournament,
      start_time: match.start_time} );

    //Create instance of Team for both home and away, but still keep the home_team and away_team
    // as parameters for more convince in the filtering options
    this.homeTeam = new Team(this.home_team);
    this.awayTeam = new Team(this.away_team);
    this.tournamentobj = new Tournament(this.tournament)
    this.status = this.setMatchStatus(match, file);
  }


  //method that gets unknown filtering options and returns trur or false if the match stands for the filters applied
  isMatchingFilters (filters) {
    let filterFlag = true;
    filters.forEach (tempFilter => {
      if (filterFlag) {
        filterFlag = this.checkMatchWithCurrentFilter(tempFilter);
      }
    });
    return filterFlag;
  }

  //check each filter with few possibilities - this allows flexible filtering
  checkMatchWithCurrentFilter (filter) {
    let filterStatus = false;
    filter.inDataKey.forEach (tempDataKey => {
      if (this[tempDataKey] === filter.searchValue && !filterStatus) {
        filterStatus = true;
      }

    });
    return filterStatus;
  }

  setMatchStatus(matchData, file ) {
    if(file === Config.PLAYED_GAMES_FILE) {
      this.score = matchData.home_score + ' - ' + matchData.away_score;
      return Statuses.PLAYED;
    }
    else if ( file === Config.UPCOMING_GAMES_FILE) {
      this.kickoff = matchData.kickoff;
      return Statuses.UPCOMING;
    }
  }
  get _score() {
    return this.score;
  }

  createResponse() {
    let matchJSON = {
      "home_team"  : this.homeTeam._name,
      "away_team"  : this.awayTeam._name,
      "tournament" : this.tournament,
      "start_time" : this.start_time,
    }
    if(this.status === Statuses.PLAYED) {
      matchJSON.score = this.score;
    } else if (this.status === Statuses.UPCOMING) {
      matchJSON.kicloff = this.kickoff;
    }
    return matchJSON
  }
};

