const templates = require("../template");

function userPageHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end('<h1>User Page</h1>');
}

module.exports = userPageHandler;