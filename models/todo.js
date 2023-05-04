module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define(
    "todo",
    {
      item: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("done", "pending"),
        allowNull: false,
      },
    },
    {
      timeStamps: true,
    }
  );
  return Todo;
};
