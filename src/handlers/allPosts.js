const templates = require("../template");
const db = require("../db/connection.js");
const model = require("../model.js");

function allPostsHandler(request, response) {
  model
    .getPosts()
    .then(result => result.rows)
    .then(posts => {
      response.end(templates.allPosts(posts));
    })
    .catch(console.error);
}

module.exports = allPostsHandler;
