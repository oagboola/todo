const Joi = require("joi");

const create = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (error) {
    res.status(406);
    res.json({
      message: "Invalid request: " + error,
    });
  } else {
    next();
  }
};

const login = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (error) {
    res.status(406);
    res.json({
      message: "Invalid request: " + error,
    });
  } else {
    next();
  }
};

module.exports = { create, login };
