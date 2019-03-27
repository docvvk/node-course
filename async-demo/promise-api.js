// const p = Promise.reject(new Error('reason for rejection...'));
// p.catch(error => console.log(error));

// Running Promises in Parallel

const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async Operation 1...");
    // reject(new Error('Something failed'))
    resolve(1);
  }, 2000);
});
const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async Operation 2...");
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2]) 
  .then(result => console.log(result))
  .catch(err => console.log("Error", err.message));

Promise.race([p1, p2])  // 1st fulfilled logged
  .then(result => console.log(result))
  .catch(err => console.log("Error", err.message));

// still dealing with single thread doing multiple async ops
// result ll be available in an Array
