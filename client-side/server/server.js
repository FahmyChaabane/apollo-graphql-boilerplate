const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..");
const port = process.env.PORT || 4000;

app.use(express.static(publicPath));

app.get("*", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("the server is up");
});
