const { Router } = require("express");
const User = require("../controllers/user");
const validation = require("./validation/user");
const auth = require("./auth.middleware");

const router = Router();

router.post("/register", validation.create, User.create);
router.post("/login", validation.login, User.login);
router.get("/", auth, User.get);
router.get("/logout", User.logout);

module.exports = router;
