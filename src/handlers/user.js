const templates = require("../template");
const db = require("../db/connection.js");
const model = require("../model.js");

const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
const secret = "couvebrocolis";

function userPageHandler(req, res) {
  const send401 = () => {
    const message = "Not Authorised!";
    res.writeHead(401, {
      "Content-Type": "text/html"
    });
    return res.end(templates.errorPage(message));
  };

  if (!req.headers.cookie) return send401();

  const { jwt } = parse(req.headers.cookie);

  if (!jwt) return send401();

  return verify(jwt, secret, (err, jwt) => {
    // console.log(jwt)
    if (err) {
      return send401();
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end();
      // model
      // .getUserPosts(jwt.username)
      // .then(result => result.rows)
      // .then(posts => {
      //   res.end(templates.displayUserPosts(posts));
      // })
      // .catch(console.error);
    }
  });
}

module.exports = userPageHandler;
