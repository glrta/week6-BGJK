const templates = require("../template");
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');

const secret = "couvebrocolis";

function submitGetHandler(req, res) {
  const send401 = () => {
    const message = 'Not Authorised!';
    res.writeHead(
      401,
      {
        'Content-Type': 'text/html',
      }
    );
    return res.end(`<h2>${message}</h2>`);
  }

    if (!req.headers.cookie) return send401();

    const { jwt } = parse(req.headers.cookie)

    if (!jwt) return send401();

    return verify(jwt, secret, (err, jwt) => {
      console.log(jwt)
      if (err) {
        return send401();
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(templates.submitPage());
      }
    });
}

module.exports = submitGetHandler