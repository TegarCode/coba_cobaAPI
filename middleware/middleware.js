const { SECRET_KEY } = require("../items");
const jwt = require("jsonwebtoken");
const { userModel } = require('../models');

const protect = async (req, res, next) => {
  const token = req.headers['x-api-key']; // Menggunakan "x-api-key" sebagai nama header

  if (token) {
    try {
      const verify = jwt.verify(token, SECRET_KEY);
      const user = await userModel.findOne({ where: { user_id: verify.user_id } });

      if (user) {
        delete user.password;
        req.user = user;
        next();
      } else {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Token is invalid" });
    }
  } else {
    return res.status(401).json({ message: "Token not found" });
  }
};

module.exports = { protect };
