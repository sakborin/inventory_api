const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Make a login token that lasts 7 days
function makeToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/v1/auth/register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ success: false, message: "This email is already registered" });
    }

    // Save the password scrambled, never as plain text
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.status(201).json({ success: true, token: makeToken(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// POST /api/v1/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    const match = user && (await bcrypt.compare(password, user.password));

    if (!match) {
      return res.status(401).json({ success: false, message: "Wrong email or password" });
    }

    res.status(200).json({ success: true, token: makeToken(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
