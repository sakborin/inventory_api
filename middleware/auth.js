const jwt = require("jsonwebtoken");

// Blocks the request if the user is not logged in
module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Please log in" });
  }
};
