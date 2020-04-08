const db = require("./db/connection.js");

// createUser + hash password

function getPosts() {
  return db
    .query(
      `
        SELECT *
        FROM users
        INNER JOIN blog_posts ON users.id = blog_posts.author_id; `
    )
    .catch(err => {
      console.log("Here be error   ", err);
    });
}

// review this function: create new post only
function newPost(message) {
  return db
    .query("INSERT INTO users(username) VALUES($1)", [message.username])
    .then(() => {
      return db
        .query(`SELECT id FROM users where username=($1)`, [message.username])
        .then(item => {
          return item.rows.map(obj => obj.id);
        })
        .then(idArr => {
          return db.query(
            "INSERT INTO blog_posts(author_id, post) VALUES($1, $2)",
            [idArr[0], message.post_text]
          );
        });
    });
}

function deletePost(postId, res) {
  db.query("DELETE FROM blog_posts WHERE ($1)=id", [postId])
  .then(() => {
    res.writeHead(302, {"location": "/"});
    // res.writeHead(200);
    res.end();
  })
  .catch(console.log);
 
}

module.exports = { newPost, getPosts, deletePost };
