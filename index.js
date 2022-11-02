const express = require('express');
const cors = require('cors');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const sanitizer = require('./app/middlewares/bodySanitizer');

const app = express();

const router = require('./app/routers/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer();
app.use(upload.none());

app.use(sanitizer);

// Add rate limit policy
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // Limit each IP to 100K requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cors('*'));

app.use(router);

app.use(express.static('public'));

// Start app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
