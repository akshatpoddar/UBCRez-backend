const User = require("../models/user.model");
const { createSecretToken } = require("../utils/secretToken");
const router = require("express").Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Register new user
signup = async (req, res) => {
  try {
    const {name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create(req.body);
    const token = createSecretToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
  }
};

// Login existing user
login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.status(401).json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({message:'User with that email does not exist' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(401).json({message:'Incorrect password or email' }) 
    }
    const token = createSecretToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
  }
}

// Verify user token
userVerification = (req, res) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.json({ user: null })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ user: null })
    } else {
      const user = await User.findById(data.id)
      return res.json({user: user})
    }
  })
}

// Logout user
logout = (req, res) => {
  res.cookie("jwt", '', {maxAge: 1} )
  res.clearCookie("jwt")
  res.redirect('/')
}

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout',logout);
router.get('/whoami', userVerification);

module.exports = router;