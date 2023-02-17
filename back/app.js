var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var indexRouter = require('./v1/index');
const path = require('path');
const apiLimiter = require('./v1/config/middleware');
const rateLimit = require('express-rate-limit');

var app = express();

var corOptions = {
    origin: "http://localhost:3000",
};

const limiter = rateLimit({
  max: 9, // limit each IP to 100 requests
  onLimitReached: (req, res, options) => {
    // Reset the calling count for the current IP address
    limiter.resetKey(req.ip);
  },
  handler: function (req, res, next) {
		res.status(400).send("You requested 10 times. Try it later again please.");
  }
});

app.use(limiter);
app.use("/", indexRouter);
// app.use('/', (req, res) => {
//   if (req.rateLimit.remaining >= 0) {
//     res.send('OK');
//   }
// },indexRouter);
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("port", 3000);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
