const assert = require('chai').assert;
const Team = require('../../model/Team');


describe('Team', function () {
  let teamName = 'Arsenal';
  let team = new Team(teamName)
  it('should have correct team id',  () => {
    assert.equal(team._id, '_' + teamName);
  });
})
