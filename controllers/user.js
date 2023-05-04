const bcrypt = require("bcrypt");
const db = require("../models");
const passport = require("../config/passport");

const { User } = db;

const create = async (req, res) => {
  const { password: pwd, ...rest } = req.body;
  try {
    const password = await encryptPassword(pwd);
    const { id, name, email } = await User.create({ password, ...rest });
    res.json({ id, name, email });
  } catch (error) {
    const err = error.errors || [{ message: error }];
    res.status(500).json({ error: err[0].message, status: "error" });
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(401).json({ message: err, status: "error" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: err });
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

const encryptPassword = async (pwd) => {
  const hash = await bcrypt.hashSync(pwd, 10);
  return hash;
};

module.exports = { create, login };
