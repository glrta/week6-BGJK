const templates = require("../template");

function signUpGetHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(templates.signup());
}

module.exports = signUpGetHandler;