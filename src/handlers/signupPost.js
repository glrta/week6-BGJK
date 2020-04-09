const templates = require("../template");

function signUpPostHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<h1>You're home</h1>");
}

module.exports = signUpPostHandler;

// check user doesn't exist already in users
// hash password
// insert to database

