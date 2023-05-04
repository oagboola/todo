const { Router } = require("express");
const User = require("../controllers/user");
const validation = require("./validation/user");

const router = Router();

router.post("/register", validation.create, User.create);
router.post("/login", validation.login, User.login);

module.exports = router;
