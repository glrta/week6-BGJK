const templates = require("../template");
const db = require("../db/connection.js");
const model = require("../model.js");

function homeHandler(request, response) {
  model
    .getPosts()
    .then(result => result.rows)
    .then(posts => {
      response.end(templates.home(posts));
    })
    .catch(console.error);
}

module.exports = homeHandler;
