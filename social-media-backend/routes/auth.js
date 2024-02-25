const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const verifyToken = require("../utils/jwt-auth.js");
const jwt = require("jsonwebtoken");
//REGISTER
router.get("/register", (req, res) => {
  res.send('Welcome')
})

router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // Send token in response
    res.header("auth-token", token).json({ user, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});


module.exports = router;
