const bcrypt = require("bcrypt");
const { User, Todo } = require("../models");
const passport = require("../config/passport");

const create = async (req, res) => {
  const { password: pwd, ...rest } = req.body;
  try {
    const password = await encryptPassword(pwd);
    const newUser = await User.create({ password, ...rest });
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: err });
      }
      res.json({ id: newUser.id, name: newUser.name, email: newUser.email });
    });
  } catch (error) {
    const err = error.errors || [{ message: error }];
    res.status(500).json({ message: err[0].message, status: "error" });
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
      res.json(user);
    });
  })(req, res, next);
};

const get = async (req, res) => {
  const { id, email, name, Todos } = await User.findOne({
    where: { id: req.user.id },
    include: Todo,
    order: [[Todo, "createdAt", "ASC"]],
  });
  res.json({ id, email, name, todos: Todos });
};

const logout = async (req, res) => {
  req.logout((err) => {
    if (err)
      res.status(500).json({ status: err, message: "Error logging user out" });
    res.redirect("/");
  });
};

const encryptPassword = async (pwd) => {
  const hash = await bcrypt.hashSync(pwd, 10);
  return hash;
};

module.exports = { create, login, get, logout, encryptPassword };
