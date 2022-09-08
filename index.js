const express = require("express");
const app = express();

const router = require("./app/routers/index");

app.use(router);

app.use(express.urlencoded({ extended: true })); // On parse les body de type `x-www-form-url-encoded` et on les ajoute au req.body
app.use(express.json());

app.use(express.static("public"));

// Start app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
