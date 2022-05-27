const express = require("express");
const app = express();
const port = 5000;

const url =
  "mongodb+srv://admin:qwer123@cluster0.an3js.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongoose = require("mongoose");
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    usefindAndModify: false,
  })
  .then(() => console.log("MongoDB Connectied"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Listening on port ${port}`));
