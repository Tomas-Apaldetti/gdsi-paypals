const Joi = require('joi');
const { objectId } = require('./custom.validation');

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
    split_type: Joi.string().valid('PERCENTAGE', 'FIXED', 'EQUALLY').required(),
    comment: Joi.string().allow(null, '').max(255),
  }),
};

const editTicket = {
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
    split_type: Joi.string().valid('PERCENTAGE', 'FIXED', 'EQUALLY').required(),
    comment: Joi.string().allow(null, '').max(255),
  }),
  params: Joi.object().keys({
    ticketId: Joi.required().custom(objectId)
  }).unknown(true)
};

module.exports = {
  createTicket,
  editTicket
};
