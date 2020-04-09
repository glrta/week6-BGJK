const templates = require("../template");

function homeHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<h1>You're home</h1>");
}

module.exports = homeHandler;