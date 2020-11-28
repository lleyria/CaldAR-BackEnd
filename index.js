const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models");
const router = require("./app/routes");
const app = express();
const PORT = process.env.PORT || 5000;

//parser requests of content-type -application/json
app.use(bodyParser.json());

//parser requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database CaldAR");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
