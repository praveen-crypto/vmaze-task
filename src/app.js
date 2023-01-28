const express = require('express');
const path = require("path")
const app = express();

const port = process.env.PORT || 8000;

app.use( "/css", express.static(path.join(__dirname, "css")))
app.use( "/js", express.static(path.join(__dirname, "js")))
app.use( "/js", express.static(path.join(path.resolve(), "node_modules/bootstrap/dist/js")))
app.use("/js", express.static(path.join(path.resolve(), "node_modules/jquery/dist")))

app.listen(port, () => {
  console.log("Listening on port "+ port);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});



