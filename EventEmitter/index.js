class EventEmitter {
	constructor() {
	  this.repository = {};
    }
    on(event, func) {
  	  let handlers = this.repository[event];
      if ( handlers ) {
      	handlers.push(func);
      } else {
    	this.repository[event] = [func];
      }
	  return this;
    }
    off(event, func) {
  	  let handlers = this.repository[event];
      if ( handlers ) {
    	handlers.splice(handlers.indexOf(func));
      }
	  return this;
    }
    emit(event, args, context) {
  	  context = context ? context : this;
      args = args ? args : []
  	  let handlers = this.repository[event];
      if (handlers) {
    	for (let i = 0, length = handlers.length; i < length; i++)
    		handlers[i].apply(context, args);
      }
	  return this;
    }
    get allEvents() {
  	  let allEvents = [];
      for (let key in this.repository) {
    	allEvents.push(key);
      }
  	  return allEvents;
    }
}

module.exports = EventEmitter;
/*
var emiter = new EventEmitter();
emiter.on("isLoad", function(data) {
	alert("Отправить данные на сервер! Данные " + data);
});


setTimeout(function() {
	emiter.emit("isLoad", ["Мои данные!!!!"])
}, 2000);
*/