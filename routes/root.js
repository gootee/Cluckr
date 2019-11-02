const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect('/clucks/');
})

router.get("/contact_us", (req, res) => {
  res.render('contactUs');
})

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post("/sign_in", (req, res) => {
  res.cookie('username', req.body.username, { maxAge: new Date(COOKIE_MAX_AGE)})
  res.redirect('/');
})

router.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
})

module.exports = router;