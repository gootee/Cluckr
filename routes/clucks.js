const express = require("express");
const knex = require("../db/client");
const router = express.Router();

router.get("/new", (req, res) => {
  if (res.locals.username && res.locals.username.length > 0) {
    res.render("./clucks/new", {});
  }
});

router.post("/new", (req, res) => {
  const cluckParams = {
    image_url: req.body.imageUrl,
    content: req.body.content,
    username: res.locals.username
  };

  knex("clucks")
    .insert(cluckParams)
    .returning("*")
    .then((data) => {
      res.redirect('/clucks/');
  });
});

router.get("/", (req, res) => {
  knex("clucks")
    .select("*")
    .then((data) => {
      data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

      res.render("clucks/index",{
        clucks: data,
      });
    });
});

module.exports = router;