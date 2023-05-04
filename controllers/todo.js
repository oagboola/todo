const { Todo } = require("../models");

const create = async (req, res) => {
  const { description } = req.body;
  const todo = await Todo.create({
    description,
    status: "pending",
    UserId: req.user.id,
  });
  res.json(todo);
};

const list = async (req, res) => {
  const todos = await Todo.findAll({ where: { UserId: req.user.id } });
  res.json(todos);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const [_, todo] = await Todo.update(
    { description },
    { where: { id }, returning: true }
  );
  res.json(...todo);
};

const markAsDone = async (req, res) => {
  const { id } = req.params;
  const [_, todo] = await Todo.update(
    { status: "done" },
    { where: { id }, returning: true }
  );
  res.json(...todo);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });
  res.json({ message: "success" });
};

module.exports = { create, list, update, markAsDone, remove };
