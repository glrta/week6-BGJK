const templates = require("../template");
const model = require("../model"); //we need the model to check if for the password
const bcrypt = require("bcryptjs");
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
const secret = "couvebrocolis";

function signUpPostHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const signupDetails = new URLSearchParams(body);
    const signupObject = Object.fromEntries(signupDetails);
   
    model
      .getUser(signupObject.username)
      .then((user) => {
        if (user) {
          response.writeHead(200, { "content-type": "text/html" });
          response.end(templates.signup("User already exists!"));
        } else {
          createNewUser();
        }
      })
      .catch((error) => {
        console.error(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`
      <h1>Something went wrong, sorry</h1>
      <p>${error}</p> 
      `);
      });

    function createNewUser() {
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
          const cookie = sign(signupObject, secret);
          response.writeHead(302, {
            location: "/user_page",
            "Set-Cookie": `jwt=${cookie}; HttpOnly`,
          });
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
    }
  });
}

module.exports = signUpPostHandler;
