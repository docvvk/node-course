// getCustomers(1, customer => {
//   console.log("Customer", customer);
//   if (customer.isGold) {
//     getMovies(movies => {
//       console.log("Movies", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

// getCustomers(1)
//   .then(customer => {
//     console.log("Customer", customer);
//     getMovies();
//   })
//   // if (customer.isGold)
//   .then(movies => {
//     console.log("Movies", movies);
//     sendEmail(customer.email, movies);
//   })
//   .then(console.log("Email sent..."))
//     .catch(err => console.log("Error", err.message));


async function emailSent() {
  try {
    const customer = await getCustomers(1);
    console.log("Customer", customer);
    if (customer.isGold) {
      const movies = await getMovies();
      console.log("Movies", movies);
      const email = await sendEmail(customer.email, movies);
      console.log('Email Sent...');
    }
  } catch (err) {
    console.log("Error", err.message);
  }
}

emailSent();

function getCustomers(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "Vivek Malhan",
        isGold: true,
        email: "email"
      });
    }, 2000);
  });
}

function getMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
