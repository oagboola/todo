const userRoutes = require("./user");

module.exports = (app) => {
  app.use("/users", userRoutes);
};
