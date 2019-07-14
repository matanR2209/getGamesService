emitter = require('../../utils/Emitter');

const assert = require('chai').assert;
let cb = (dataParam) => {
  return(dataParam);
};
let eventName = 'testEvent';


describe('Emitter [correct functionality]', function () {
  it('should create property with the event name, and attach array with callback to it',  () => {
    emitter.subscribe(eventName, cb);
    assert.isDefined(emitter.events[eventName]);
    assert.equal(emitter.events[eventName].length, 1);
    assert.deepEqual(emitter.events[eventName][0], cb);
  });

  it('should remove all functions associated with the event name',  () => {
    const emitterResult = emitter.subscribe(eventName, cb);
    emitterResult.unsubscribe();
    assert.equal(emitter.events[eventName].length, 0);
  });
});