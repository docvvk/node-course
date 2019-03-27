// import { rejects } from "assert";

// Synchronous / Blocking

console.log("Before");

// Callback function - when the result of asyn call is ready it executes
// getUser(1, displayUser);
// console.log("After");

// function displayCommits(commits) {
//     console.log(commits);
// }
// function displayRepositories(repositories) {
//     getCommits(repositories, displayCommits);
// }
// function displayUser(username) {
//     getRepositories(username, displayRepositories);
// }

// getUser(1, user => {
//   getRepositories(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       console.log(commits);
//     });
//   });
// });

// PROMISE BASED IMPLEMENTATION

// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log("Commits", commits))
//   .catch(err => console.log("Error", err.message));

// Async and Await -- helps you write asynchronous code like synchronous code
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch (err) {
      console.log('Error', err.message);
  }
}

displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    // Async work
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "Vivek" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
    //   resolve(["repo1", "repo2", "repo3"]);
      reject(new Error('No Repos'))
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit1", "commit2"]);
    }, 2000);
  });
}
// Patterns for dealing with Asynchronous Code :-
// Callbacks
// Promises
// Async/Await

// In next lecture I'll show you how to consume these promises
