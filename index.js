const express = require('express');

const app = express();

const router = require('./app/routers/index');

app.use(router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Start app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
