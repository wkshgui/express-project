const express = require("express");
const logger = require("morgan");
const cors = require("cors")
const routers = require('./routes/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(logger('dev'));
app.use('/api/v1', routers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("404 Not Found!");
  next();
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
})
