const http = require("http");
const router = require("./router");
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "localhost";

http
  .createServer(router)
  .listen(PORT, () => console.log(`listening on ${HOST}:${PORT}`));
