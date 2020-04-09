const templates = require("../template");
const model = require("../model");
const bcrypt = require("bcryptjs");
const secret = "couvebrocolis";

function loginPostHandler(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const loginDetails = new URLSearchParams(body);
    const loginObject = Object.fromEntries(loginDetails);
    model
      .getUser(loginObject.username)
      .then((userObj) => {
        return bcrypt.compare(loginObject.password, userObj.password);
      })
      .then((match) => {
        if (!match) {
          res.writeHead(200, { "content-type": "text/html" });
          res.end(templates.login("Login failed!"));
        } else {
          res.writeHead(302, { location: "/user_page" });
          res.end();
        }
      })
      .catch((error) => {
        console.error(error);
        response.writeHead(401, { "content-type": "text/html" });
        response.end(`
              <h1>Something went wrong, sorry</h1>
              <p>User not found</p>
            `);
      });
  });
}

module.exports = loginPostHandler;
