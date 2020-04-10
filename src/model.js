const db = require("./db/connection.js");

// createUser function:
// check user doesn't exist already in users
// hash password
// insert to database

function createUser(newUser) {
  return db.query("INSERT INTO users(username, password) VALUES (($1),($2))", [
    newUser.username,
    newUser.password,
  ]);
  // .then(() => {
  //   return db
  //   .query(`SELECT username, password FROM users WHERE username = ($1)`, [newUser.username])
  // });
}

function getUser(username) {
  return db
    .query(
      `
      SELECT *
      FROM USERS
      WHERE users.username=($1)
      `,
      [username]
    )
    .then((result) => {
      return result.rows[0]; //check if this all works
    })
    .catch((err) => {
      console.log("Here be error   ", err);
    });
}

function getPosts() {
  return db
    .query(
      `
        SELECT *
        FROM users
        INNER JOIN blog_posts ON users.id = blog_posts.author_id; `
    )
    .catch((err) => {
      console.log("Here be error   ", err);
    });
}

function getUserPosts(user) {
  return db
  .query(`SELECT id FROM users where username=($1)`, [user])
  .then((userId) => {
    //console.log("userid", userId.rows[0].id);
    return db.query(
        `
          SELECT *
          FROM blog_posts
          INNER JOIN users ON users.id = blog_posts.author_id
          WHERE users.id=($1)`,
          [userId.rows[0].id]
    ).catch(console.err)
  })
    .catch((err) => {
      console.log("Here be error   ", err);
    });
}


function newPost(username, message) {
  console.log(username)
  return db.query(`SELECT id FROM users WHERE username=($1)`, [username])
    .then((item) => {
      console.log(item.rows);
      return item.rows[0].id
    })
    .then((id) => {
      return db.query(
        "INSERT INTO blog_posts(author_id, post) VALUES($1, $2)",
          [id, message.post_text]
        );
    })
}


function deletePost(postId, res) {
  db.query("DELETE FROM blog_posts WHERE ($1)=id", [postId])
    .then(() => {
      res.writeHead(302, {
        location: "/"
      });
      // res.writeHead(200
      res.end();
    })
    .catch(console.log);
}

module.exports = {
  newPost,
  getPosts,
  deletePost,
  getUser,
  createUser,
  getUserPosts
};