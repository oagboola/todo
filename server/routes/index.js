const userRoutes = require("./user");
const todoRoutes = require("./todo");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/todos", todoRoutes);
};
