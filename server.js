const express = require("express");
const env = require("./config/env");

const app = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
