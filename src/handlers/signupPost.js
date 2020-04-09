const templates = require("../template");
const model = require("../model"); //we need the model to check if for the password

function signupPostHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const loginDetails = new URLSearchParams(body);
    const loginObject = Object.fromEntries(loginDetails);
    model.getUser(loginObject.username).then((userObj) => {
      
      // return db.query(
      //   `SELECT username from users WHERE username = ${loginObject.username}`
      );
    });
  });

  //   response.writeHead(200, { "content-type": "text/html" });
  //   response.end(template.displayUserPost);

// 1. check user doesn't exist already in users in our request parameter which will be sent from our post request
// 2. Access the username from the object and check it against our user's table.
// 2a. If user is new, hash password, add user/password to users table and send to displayUsersPost 200, else
// 2b. throw an error message stating 'user already exists'
// 3. Celebrate!

module.export = signupPostHandler;

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

function loginPostHandler(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const loginDetails = new URLSearchParams(body);
    const loginObject = Object.fromEntries(loginDetails);
    model
      .getUser(loginObject.username)
      .then((userObj) => {
        console.log(userObj[0].password);
        console.log(loginObject.password);
        return bcrypt.compare(loginObject.password, userObj[0].password);
      })
      .then((match) => {
        if (!match) throw new Error("Password mismatch");
        res.writeHead(302, { location: "/user_page" });
        res.end();
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
