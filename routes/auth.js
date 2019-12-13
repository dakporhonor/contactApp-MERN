// jshint esversion: 9
const router = require("express").Router();

router.post("/", (req, res) => {
  res.send("Testing");
});
module.exports = router;
