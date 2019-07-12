module.exports = class Team {
  constructor (teamName) {
    this.name =  teamName;
    this.id   = '_' +teamName;
  }

  get _name() {
    return this.name
  }

  get _id() {
    return this.id
  }
}
