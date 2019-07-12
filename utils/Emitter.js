module.exports = {
  events: [],
  subscribe(eventName,cb) {
    if(this.events[eventName]) {
      if(cb !== this.events[eventName][0]) {
        this.events[eventName].push(cb)
      }
    }
    else {
      this.events[eventName] = [cb];
    }
    return {
      unsubscribe: () => {
        this.events[eventName] = [];
      }
    };
  },

  emit(eventName, value){
    let cbs = this.events[eventName];
    cbs.forEach((cb)=> {
      cb(value)
    });
  }
}