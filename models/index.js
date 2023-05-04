const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./user");
const Todo = require("./todo");
const env = require("../config/env");

const sequelize = new Sequelize(env.DB_URI, {
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const user = User(sequelize, Sequelize);
const todo = Todo(sequelize, Sequelize);

todo.belongsTo(user);
user.hasMany(todo);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = user;
db.todo = todo;

module.exports = db;
