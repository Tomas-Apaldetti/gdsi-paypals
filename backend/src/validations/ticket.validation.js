const Joi = require('joi');

const createTicket = {
  body: Joi.object().keys({
    name: Joi.string().required().max(255),
    category: Joi.string().required().max(25),
    amount: Joi.number().required().min(0.01),
    debtors: Joi.array().items(
      Joi.object().keys({
        _id: Joi.string().required(),
        cut: Joi.number().required().min(0.01),
      }),
    ),
    split_type: Joi.string().valid('PERCENTAGE').required(),
    comment: Joi.string().allow(null, '').max(255),
  }),
};

module.exports = {
  createTicket,
};
