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

module.exports = { create };
