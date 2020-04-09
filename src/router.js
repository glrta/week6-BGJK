const deleteHandler = require("./handlers/delete.js");
const homeHandler = require("./handlers/allPosts.js");
const missingHandler = require("./handlers/missing.js");
const publicHandler = require("./handlers/public.js");
const submitGetHandler = require("./handlers/submitGet.js");
const submitPostHandler = require("./handlers/submitPost.js");

function router(request, response) {
  const url = request.url;
  const method = request.method;

  //console.log({url, method})
  if (url.includes("/delete-post")) {
    //console.log("delete stuff");
    deleteHandler(request, response);
  } else if (url === "/") {
    homeHandler(request, response);
  } else if (url === "/login" && method === "GET") {
    loginGetHandler(request, response);
  } else if (url === "/login" && method === "POST") {
    loginPostHandler(request, response);
  } else if (url === "/signup" && method === "GET") {
    signupGetHandler(request, response);
  } else if (url === "/signup" && method === "POST") {
    signupPostHandler(request, response);
  } else if (url === "/user_page" && method === "GET") {
    userHandler(request, response);
  } else if (url === "/all_posts") {
    allPostsHandler(request, response);
  } else if (url === "/logout" && method === "POST") {
    logoutHandler(request, response);
  } else if (url === "/submit" && method === "GET") {
    //console.log("submitget");
    submitGetHandler(request, response);
  } else if (url === "/submit" && method === "POST") {
    //console.log("submitpost");
    submitPostHandler(request, response);
  } else if (url.includes("public")) {
    publicHandler(request, response);
  } else {
    missingHandler(request, response);
  }
}

module.exports = router;
