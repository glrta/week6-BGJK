
const templates = require("../template");

function signUpPostHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<h1>You're home</h1>");
}

module.exports = signUpPostHandler;