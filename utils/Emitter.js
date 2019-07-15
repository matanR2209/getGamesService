module.exports = {
  events: [],
  subscribe(eventName, cb) {
    if (this.events[eventName]) {
      if (cb !== this.events[eventName][0]) {
        this.events[eventName].push(cb);
      }
    }
    else {
      this.events[eventName] = [cb];
    }
    return {
      unsubscribe: () => {
        this.events[eventName] = [];
      },
    };
  },

  emit(eventName, value) {
    const cbs = this.events[eventName];
    try {
      cbs.forEach((cb) => {
        cb(value);
      });
    } catch (e) {
      return null;
    }
  },
};
