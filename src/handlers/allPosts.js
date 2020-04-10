const templates = require("../template");
const db = require("../db/connection.js");
const model = require("../model.js");

function allPostsHandler(request, response) {
  model
    .getPosts()
    .then(result => result.rows)
    .then(posts => {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(templates.allPosts(posts));
    })
    .catch(error => {
      console.error(error);
      res.writeHead(401, { "content-type": "text/html" });
      res.end(`
            <h1>Something went wrong, sorry</h1>
            <p>User not found</p>
          `);
    });
}

module.exports = allPostsHandler;
