const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_KEY);
  User.findById(user.userId)
    .then((u) => {
      req.user = u;
      return next();
    })
    .catch((err) => {
      throw new Error(err);
    })
    .catch((err) => {
      return res.status(401).json({ success: false });
    });
};

module.exports = { authenticate };
