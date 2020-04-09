const templates = require("../template");
const model = require("../model"); //we need the model to check if for the password

// check user doesn't exist already in users
// hash password
// insert to database
function signupPostHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(template.displayUserPost);
}

module.export = signupPostHandler;
