require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "Invalid Token" });

  try {
    let validToken = token.split(" ")[1];
    const decoded = jwt.verify(validToken, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
