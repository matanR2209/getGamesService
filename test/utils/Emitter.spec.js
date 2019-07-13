emitter = require('../../utils/Emitter');

const assert = require('chai').assert;


describe('Emitter', function () {
  let data = ['testString1', 'testString1'];
  let cb = (dataParam) => {
    return(dataParam);
  };
  let eventName = 'testEvent';

  it('should create property with the event name, and attach array with callback to it',  () => {
    emitter.subscribe(eventName, cb);
    assert.isDefined(emitter.events[eventName]);
    assert.equal(emitter.events[eventName].length, 1);
    assert.deepEqual(emitter.events[eventName][0], cb);
  });

  //TODO
  // it('should evoke all the functions that related to the event name that was triggered, with the data passed to the callback',  () => {
  //
  // });

  it('should remove all functions asccocieted with the event name',  () => {
    const emitterResult = emitter.subscribe(eventName, cb);
    emitterResult.unsubscribe();
    assert.equal(emitter.events[eventName].length, 0);
  });

});