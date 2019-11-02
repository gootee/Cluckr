const knex = require("./db/client");
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const cookieParser = require('cookie-parser');

const cluckRouter = require("./routes/clucks")
const rootRouter = require("./routes/root");

//  -= MIDDLEWARE =-

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method
    return method;
  }
}))

app.use(express.static(path.join(__dirname, 'public')));
function getUsernameMiddleware(request, response, next) {
  response.locals.username = request.cookies.username;
  next();
}

app.use(logger('dev'));

app.use(cookieParser());
app.use(getUsernameMiddleware);
app.use("/clucks", cluckRouter);
app.use(rootRouter);

app.set('view engine', 'ejs');

const PORT = 4545;
const ADDRESS = 'localhost';

app.listen(PORT, ADDRESS, () => {
  console.log(`Express Server started on ${ADDRESS}:${PORT}`);
});