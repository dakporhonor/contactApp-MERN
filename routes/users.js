// jshint esversion: 9
const router = require("express").Router();
// Register User
router.post("/", (req, res) => {
  res.send("Register User");
});
module.exports = router;
