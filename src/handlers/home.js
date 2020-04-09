const templates = require("../template");

function homeHandler(request, response) {
  response.writeHead(200, {
    "content-type": "text/html"
  });
  response.end(templates.home());
}

module.exports = homeHandler;