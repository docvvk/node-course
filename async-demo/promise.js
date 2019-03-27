// PROMISE - Object that holds the eventual result of the asynchronous operation
//  results in value or error
// initially PENDING stage ----> async operation----> FULFILLED / ERROR

// Create a Promise
const p = new Promise((resolve, reject) => {
  // Async work
  // value / error
  // returns value to consumer of Promise - we get in resolve function
  setTimeout(() => {
    // resolve(1);
    reject(new Error('message'))
  }, 2000);
});

// Consume the Promise
p.then(result => console.log("Result", result))
 .catch(err => console.log('Error', err.message ))

// Anythind including asynchronous operations should be conv into Promises