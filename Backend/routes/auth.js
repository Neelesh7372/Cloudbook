const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetfchUser");

const JWT_SECRET = "Neelesh%";

//Route-1: Create a user using: POST "/api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({min: 5,}),
    body("city", "Enter a valid city").isLength({min: 5}),
    body("state", "Enter a valid State"),
    body("pin", "Enter a valid pin").isLength({min: 6}),
    body("address", "Enter a valid address").isLength({min: 8})
  ],
  async (req, res) => {
    let success=false;
    //If there are errors,return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //Checking whether the user with this email exists already
      let user = await User.findOne({email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry! a user with this email exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Creating a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        city: req.body.city,
        pin: req.body.pin,
        address: req.body.address,
        state: req.body.state
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      success=true;
      res.json({ success, authtoken });

      //catch errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unknown error occured");
    }
  }
);

//Route-2: Authenticate a user using: POST "/api/auth/login".No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    let success=false;
    //If there are errors,return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ error: "Wrong email! Try logging in again" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({success, error: "Wrong password! Try logging in again" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route-3: Get user login details using: POST "/api/auth/getuser".login required
router.post("/getuser", fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
