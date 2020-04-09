const templates = require("../template");
const db = require("../db/connection.js");
const model = require("../model.js");

function userPageHandler(request, response) {
  model
    .getUserPosts()
    .then(result => result.rows)
    .then(posts => {
      response.end(templates.displayUserPosts(posts));
    })
    .catch(console.error);
}

module.exports = userPageHandler;