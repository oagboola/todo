module.exports = (req, res, next) => {
  if (!req.isAuthenticated())
    return res
      .status(401)
      .json({ statu: "error", message: "You need to log in" });

  next();
};
