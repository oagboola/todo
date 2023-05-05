const { Router } = require("express");
const Todo = require("../controllers/todo");
const validation = require("./validation/todo");

const router = Router();

router.get("/", Todo.list);
router.post("/", validation.create, Todo.create);
router.put("/:id", validation.create, Todo.update);
router.put("/:id/status", validation.updateStatus, Todo.updateStatus);
router.delete("/:id", Todo.remove);

module.exports = router;
