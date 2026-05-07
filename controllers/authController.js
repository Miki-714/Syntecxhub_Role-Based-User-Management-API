const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ _id: user._id, token: generateToken(user._id) });
  } catch (err) {
    const msg = err.code === 11000 ? "User already exists" : err.message;
    res.status(400).json({ message: msg });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // 1. Check if user exists and password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // 2. Check if the user is blocked before giving them a token
      if (user.isBlocked) {
        return res.status(403).json({
          message: "Your account has been blocked. Please contact support.",
        });
      }

      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
