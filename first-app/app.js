// NODE MODULE SYSTEM
// NPM - NODE PACKAGE MANAGER
// BUILDING RESTFUL APIS WITH EXPRESS
// ASYNCHRONOUS JAVASCRIPT // CALLBACKS, PROMISES, ASYNC - AWAIT
// STORING DATA IN MONGO-DB // MONGOOSE
// AUTHENTICATION AND AUTHORIZATION // ROLE MANAGEMENT - JSON WEB TOKENS//
// HANDLING AND LOGGING ERRORS 
// UNIT AND INTEGRATION TESTING
// TEST DRIVEN DEVELOPMENT (TDD) // BUILD WRITING TEST FIRST
// DEPLOYMENT -- HEROKU




const log = require('./logger');
const path = require('path');

let pathObj = path.parse(__filename);

console.log(pathObj);

// log ('Hey I\'m being imported from log :)')

const hello = name => console.log("hello " + name);

hello("vvk");

const os = require('os');

let totalMemory = os.totalmem();
let freeMemory = os.freemem();



// console.log( totalMemory , freeMemory)

const fs = require('fs');

fs.readdir('./',function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files)
});

// console.log(files)


// const EventE mitter = require('events');
// const emitter = new EventEmitter;

// Listener calls when event is raised 

const Logger  = require('./logger');
const logger = new Logger();

logger.on('messageLogged', arg => { // e
    console.log('Listener Called', arg)
})

logger.log('messageLogged')
// log('messageLogged')

// emitter.on('logging', e => console.log('Logging', e))

// // Raised an event here
// emitter.emit('messageLogged', { id: 1 });

// emitter.emit('logging', { data: 'message'});


// HTTP MODULE  !imp

const http = require('http');

// Raising an event
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3,4]));
        res.end();
    }
});

server.listen(3000);

console.log('Server is listening at http://localhost:3000')




// node's base functionality is based on event emittors




// setTimeout()
// clearTimeout()

// setInterval()
// clearInterval()

// console.log(Object.keys(global)) 


// 1. NODE MODULE SYSTEM

// windows object 
// window.console.log

// GLOBAL OBJECT
// In node no window object - it has global object
// variables are not added into global object
// 
// module.id = 0001;
// // module.filename
// console.log(module.filename);
// module.id


