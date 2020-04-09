const templates = require("../template");

function logoutHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<h1>You're logged out</h1>");
}

module.exports = logoutHandler;