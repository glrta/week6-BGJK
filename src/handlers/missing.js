const templates = require("../template");

function missingHandler(request, response) {
  response.writeHead(404, { "content-type": "text/html" });
  response.end(templates.missingPage());
}

module.exports = missingHandler;
