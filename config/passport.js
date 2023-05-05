const passport = require("passport");
const { User, Todo } = require("../models");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({
          where: { email: username },
          include: {
            model: Todo,
            order: [[Todo, "createdAt", "ASC"]],
          },
        });
        if (!user) return done("Invalid credentials");
        const confirmPassword = await verifyPassword(password, user.password);
        if (!confirmPassword) return done("Invalid credentials");
        return done(null, {
          id: user.id,
          email: user.email,
          name: user.name,
          todos: user.Todos,
        });
      } catch (e) {
        return done(e);
      }
    }
  )
);

const verifyPassword = async (password, passwordHash) => {
  const match = await bcrypt.compare(password, passwordHash);
  return match;
};

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user.id);
  });
});

passport.deserializeUser(async function (id, cb) {
  const user = await User.findByPk(id);
  return cb(null, user);
});

module.exports = passport;
