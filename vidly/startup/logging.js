const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");


module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: "uncaughtExceptions.log" })
      );
      // winston.Promise.reject.handle(new winston.transports.File({ filename: 'unhandledRejection.log' }));
      process.on("unhandledRejection", ex => {
        throw ex;
      });
      
      // winston is not working

      // process.on('uncaughtException', (ex) => {
      //     winston.error(ex.message, ex);
      //     process.exit(1);
      // })
      // process.on('unhandledRejection', (ex) => {
      //     winston.error(ex.message, ex);
      //     process.exit(1);
      // })
      
      winston.add(new winston.transports.File({ filename: "logfile.log" }));
      winston.add(
        new winston.transports.MongoDB({
          db: "mongodb://localhost/vidly",
          level: "info"
        })
      );
      
      // const p = Promise.reject(new Error('Something failed miserably'))
      
      // p.then(() => console.log('Done'));
      
      // throw new Error('Something failed during setup !!')
      
}