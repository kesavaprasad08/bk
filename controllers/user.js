const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, name: name }, process.env.JWT_KEY);
}

exports.addUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const check = await User.findOne({ email: email });
    if (!check) {
      bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS),
        async (err, hash) => {
          const user = new User({
            email: email,
            password: hash,
          });
          await user.save();
          res.status(200).json({ success: true, token: generateAccessToken(user._id) });
        }
      );
    } else {
      res.status(500).json({ message: "user Exist" });
    }
  } catch (err) {
    res.status(500).json({ success: "false" });
    console.log(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {

    let email = req.body.email;
    let password = req.body.password;
    let check = await User.findOne({ email: email });
    if (check) {
      bcrypt.compare(password, check.password, (err, result) => {
        if (!result) {
          return res.status(404).json({ message: "Invalid Credentials" });
        } else {
          return res.status(200).json({
            message: "User Authorized",
            token: generateAccessToken(check._id),
          });
        }
      });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};
