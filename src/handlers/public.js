const fs = require("fs");
const path = require("path");

const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  jpg: "image/jpeg",
  ico: "image/x-icon"
};

function publicHandler(request, response) {
  const url = request.url;
  const urlArray = url.split(".");
  const extension = urlArray[1];
  const type = types[extension];
  //console.log(path.join(__dirname, "..", "..", url));
  fs.readFile(path.join(__dirname, "..", "..", url), (error, file) => {
   // console.log("publicHandler -> file", file);
    if (error) {
      //console.log(error);
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1>File not found</h1>");
    } else {
      response.writeHead(200, { "content-type": type });
      response.end(file);
    }
  });
}

module.exports = publicHandler;
