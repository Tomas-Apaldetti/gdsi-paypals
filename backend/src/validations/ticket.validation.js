const Joi = require('joi');


const createTicket = Joi.object().keys({
    name: Joi.string().required().max(255),
    category: Joi.string().required().max(25),
    amount: Joi.number().required().min(0.01),
    debtors: Joi.array().items(Joi.object().keys({
        id: Joi.string().required(),
        cut: Joi.number().required().min(0.01)
    })),
    split_type: Joi.string().valid('PERCENTAGE').required(),
    category: Joi.string().required(),
    description: Joi.string().max(255)
})

module.exports = {
    createTicket
}