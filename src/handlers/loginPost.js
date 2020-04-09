const templates = require("../template");
const model = require("../model");
const bcrypt = require("bcryptjs")
const secret = 'couvebrocolis';

function loginPostHandler(req, res) {
  let body = "";
  req.on("data", chunk => (body += chunk));
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
      .then(match => {
          if(!match) throw new Error('Password mismatch');
          res.writeHead(302, { location: "/user_page" });
          res.end();
        })
        .catch(error => {
            console.error(error);
            response.writeHead(401, { "content-type": "text/html" });
            response.end(`
              <h1>Something went wrong, sorry</h1>
              <p>User not found</p>
            `);
        });
})
}

module.exports = loginPostHandler;

// 'POST /login':
//     const cookie = sign(userDetails, SECRET);
//     res.writeHead(
//       302,
//       {
//         'Location': '/',
//         'Set-Cookie': `jwt=${cookie}; HttpOnly`
//       }
//     );
//     return res.end();

// function post(request, response) {
//     getBody(request)
//       .then(body => {
//         const user = new URLSearchParams(body);
//         const email = user.get("email");
//         const password = user.get("password");
//         model
//           .getUser(email)
//           .then(dbUser => bcrypt.compare(password, dbUser.password))
//           .then(match => {
//             if (!match) throw new Error("Password mismatch");
//             response.writeHead(200, { "content-type": "text/html" });
//             response.end(`
//               <h1>Welcome back, ${email}</h1>
//             `);
//           })
//           .catch(error => {
//             console.error(error);
//             response.writeHead(401, { "content-type": "text/html" });
//             response.end(`
//               <h1>Something went wrong, sorry</h1>
//               <p>User not found</p>
//             `);
//           });
//       })
//       .catch(error => {
//         console.error(error);
//         response.writeHead(500, { "content-type": "text/html" });
//         response.end(`
//           <h1>Something went wrong, sorry</h1>
//         `);
//       });
//   }