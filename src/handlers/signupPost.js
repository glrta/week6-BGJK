const templates = require("../template");
const model = require("../model"); //we need the model to check if for the password
const bcrypt = require("bcryptjs");

function signUpPostHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const loginDetails = new URLSearchParams(body);
    const loginObject = Object.fromEntries(loginDetails);
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(loginObject.password, salt))
      .then((hash) =>
        model.createUser({
          username: [...loginObject.username], //have a think about refactoring to remove the spread operator
          password: hash,
        })
      )
      .then(() => {
        response.writeHead(302, { location: "/user_page" });
        response.end();
      })
      .catch((error) => {
        console.error(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`
        <h1>Something went wrong, sorry</h1>
        <p>${error}</p> 
      `);
      });
  });
}

// 1. check user doesn't exist already in users in our request parameter which will be sent from our post request
// 2. Access the username from the object and check it against our user's table.
// 2a. If user is new, hash password, add user/password to users table and send to displayUsersPost 200, else
// 2b. throw an error message stating 'user already exists'
// 3. Celebrate!

module.exports = signUpPostHandler;
