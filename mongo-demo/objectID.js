// _id: 5ca94461f68b2e3a5245491e

// 12 butes
    // 4 bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter

// 1 byte = 8 bits
// 2 ^ 8 = 256
// 

// mongoDb DRiver --> generates ID 

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

console.log(id.getTimestamp());
console.log(id.getTimestamp());

mocngoose.Types.ObjectId.isValid('1234')
