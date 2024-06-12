const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { debtSplitTypes } = require('../config/constants');

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
    split_type: Joi.string()
      .valid(...Object.values(debtSplitTypes))
      .required(),
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
    split_type: Joi.string()
      .valid(...Object.values(debtSplitTypes))
      .required(),
    comment: Joi.string().allow(null, '').max(255),
  }),
  params: Joi.object()
    .keys({
      ticketId: Joi.required().custom(objectId),
    })
    .unknown(true),
};

const debtPayment = {
  params: Joi.object()
    .keys({
      ticketId: Joi.required().custom(objectId),
    })
    .unknown(true),
  body: Joi.object().keys({
    amount: Joi.number().required().min(0.01),
    note: Joi.string().optional().max(255).allow(''),
  }),
};

const debtWaiver = {
  params: Joi.object()
    .keys({
      ticketId: Joi.required().custom(objectId),
    })
    .unknown(true),
  body: Joi.object().keys({
    for: Joi.required().custom(objectId),
    note: Joi.string().optional().max(255).allow(''),
  }),
};

module.exports = {
  createTicket,
  editTicket,
  debtPayment,
  debtWaiver,
};
