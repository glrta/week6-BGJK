const templates = require("../template");
const model = require("../model"); //we need the model to check if for the password
const bcrypt = require("bcryptjs");
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const secret = 'couvebrocolis'

function signUpPostHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const signupDetails = new URLSearchParams(body);
    const signupObject = Object.fromEntries(signupDetails);
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(signupObject.password, salt))
      .then((hash) =>
        model.createUser({
          username: signupObject.username, //have a think about refactoring to remove the spread operator
          password: hash,
        })
      )
      .then(() => {
        const cookie = sign(signupObject, secret)
        response.writeHead(302, { 
          location: "/user_page",
          'Set-Cookie': `jwt=${cookie}; HttpOnly`
        });
        response.end()
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
