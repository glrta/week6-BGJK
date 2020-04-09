const templates = require("../template");
const model = require("../model");
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const secret = "couvebrocolis";

function submitPostHandler(req, res) {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    const message = new URLSearchParams(body);
    const messageObject = Object.fromEntries(message);
    const { jwt } = parse(req.headers.cookie);
    verify(jwt, secret, (err, jwt) => {
      console.log(jwt)
      if (err) {
        return send401();
      } else {
        model
          .newPost(jwt.username, messageObject)
          .then(() => {
            res.writeHead(302, { location: "/all_posts" });
            res.end();
          })
          .catch(err => console.error(err));
      }
    });
  });
}

module.exports = submitPostHandler;
