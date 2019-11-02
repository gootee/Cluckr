const knex = require("./db/client");
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const cookieParser = require('cookie-parser');



const cluckRouter = require("./routes/clucks")
// const cohortRouter = require("./routes/cohorts")
// // const rootRouter = require("./routes/root");
// // const articlesRouter = require("./routes/articles");



//  -= MIDDLEWARE =-

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method
    return method;
  }
}))

// console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
// custom middleware to get username
function getUsernameMiddleware(request, response, next) {
  // response.locals is an object that allows us to set global
  // variables that are accessible within any template

  response.locals.username = request.cookies.username;
  next();
}

app.use(logger('dev'));

app.use(cookieParser()); // cookie-parser middleware will look for cookies sent through the headers of
// a request and create a req.cookies object that houses the cookie data
app.use(getUsernameMiddleware);
app.use("/clucks", cluckRouter);
// // app.set allows us to change settings in our express app

// // app.use(function(req, res, next) {
// //   const url = req.url;

// //   // check to see if user is trying to go to /contact_us
// //   if(url === '/contact_us') {
// //     // check to see if user is logged in
// //     if(res.locals.username) {
// //       next(); // if the user is logged in then they can visit /contact_us
// //     } else {
// //       res.redirect('/'); //otherwise they get redirected to the root path
// //     }
// //   }
// //   next();
// // })



app.set('view engine', 'ejs'); // here we are telling express to render tempaltes using ejs

// // app.use(rootRouter);
// // app.use("/articles", articlesRouter);


app.get("/", (req, res) => {
  // res.render('./clucks/index');
  res.redirect('/clucks/');
})

// app.get("/", (req, res) => {
//   res.render('./clucks/welcome');
// })

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
app.post("/sign_in", (req, res) => {
  // res.cookie is used to set the SET-COOKIE header telling a browser to store a cookie with information
  res.cookie('username', req.body.username, { maxAge: new Date(COOKIE_MAX_AGE)})
  res.redirect('/');
})

app.get("/sign_in_page", (req, res) => {
  // res.cookie is used to set the SET-COOKIE header telling a browser to store a cookie with information
  // res.cookie('username', req.body.username, { maxAge: new Date(COOKIE_MAX_AGE)})
  // res.redirect('/sign_in_page');
  res.render('./sign_in_page');
})

// const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
app.post("/sign_in_page", (req, res) => {
  // res.cookie is used to set the SET-COOKIE header telling a browser to store a cookie with information
  // res.cookie('username', req.body.username, { maxAge: new Date(COOKIE_MAX_AGE)})
  // res.redirect('/sign_in_page');
})

app.post("/sign_out", (req, res) => {
  res.clearCookie("username"); // will remove the cookie
  res.redirect("/");
})



const PORT = 4545;
const ADDRESS = 'localhost';

app.listen(PORT, ADDRESS, () => {
  console.log(`Express Server started on ${ADDRESS}:${PORT}`);
});