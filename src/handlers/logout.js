const templates = require("../template");

function logoutHandler(request, response) {
  response.writeHead(302, { 
    location: "/",
    'Set-Cookie': 'jwt=0; HttpOnly; max-age=0' 
  });
  response.end("<h1>You're logged out</h1>");
}

module.exports = logoutHandler;