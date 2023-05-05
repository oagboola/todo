const Joi = require("joi");

const create = (req, res, next) => {
  const { error } = Joi.object({
    description: Joi.string().required(),
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

const updateStatus = (req, res, next) => {
  const { error } = Joi.object({
    status: Joi.string().valid("pending", "done").required(),
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

module.exports = { create, updateStatus };
