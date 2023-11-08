const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3500, () => {
  console.log("app running on port 3500");
});
