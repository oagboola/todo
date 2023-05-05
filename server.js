const express = require("express");
const env = process.env.NODE_ENV || "development";
const config = require("./config/env")[env];
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

const app = express();
const port = config.PORT || 3000;

app.use(
  cors({
    allowedHeaders: ["Access-Control-Allow-Credentials", "Content-Type"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new SequelizeStore({
  db: sequelize,
});

app.use(cookieParser());
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "client/build")));

routes(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

store.sync();

const server = app.listen(
  process.env.PORT || 3000,
  process.env.HOST || "0.0.0.0",
  () => {
    console.log(`server running on port: ${port}`);
  }
);

module.exports = server;
