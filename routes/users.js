// jshint esversion: 9
const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// Register User
router.post(
  "/",
  [
    check("name", "Name is requied")
      .not()
      .isEmpty(),
    check("email", "Email is requied").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is requied"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(401).json({ msg: "User already registerd" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = await jwt.sign(payload, config.get("jwtsecret"), {
        expiresIn: 3600
      });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
