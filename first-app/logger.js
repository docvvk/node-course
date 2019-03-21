var url = "http://mylogger.io/log";

const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    // HTTP Request
    console.log(message);
    // Raised an event here
    this.emit("messageLogged", { id: 1 });
  }
}

module.exports = Logger;
