const winston = require("winston");
const { createLogger, transports } = winston;

module.exports = function(err, req, res, next) {
  winston.error(err.message);

//   console.log(err);

//   const logger = createLogger({
//     transports: [new transports.Console()]
//   });
//   logger.log({ level: "error", message: err });
  
  res.status(500).send("Something failed.");
};

// error
// warn
// info
// verbose
// debug
// silly
