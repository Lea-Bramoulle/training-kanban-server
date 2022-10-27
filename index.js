const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sanitizer = require('./app/middlewares/bodySanitizer');

const app = express();

const router = require('./app/routers/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer();
app.use(upload.none());

app.use(sanitizer);

// app.use(cors({
//     origin:"http://localhost:5000"
// }));
app.use(cors('*'));

app.use(router);

app.use(express.static('public'));

// Start app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
