const express = require("express");
const env = process.env.NODE_ENV || "development";
const config = require("./config/env")[env];
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");

const app = express();
const port = config.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 1 month
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
routes(app);

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
