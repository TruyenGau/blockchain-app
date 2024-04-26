const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send(`Hello world  chirac from the auth.js`);
});

router.post("/signup", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: " All Fields are required " });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: " User already exist " });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password does not match" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User registered succesfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "pls fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      
      let token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires:new Date(Date.now() + 25892000000),
        httpOnly: true
      })
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "user signin successfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});


router.get('/product', authenticate, (req, res) => {
  console.log(`hello from products page`);
  res.send(req.rootUser);
});

module.exports = router;
