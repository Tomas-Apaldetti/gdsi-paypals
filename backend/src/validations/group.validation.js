const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGroup = {
  body: Joi.object().keys({
    name: Joi.string().required().max(255),
    description: Joi.string().allow(null, '').max(255),
    category: Joi.string().required().max(128),
    members: Joi.array().required().min(1).items(
      Joi.string().custom(objectId)
    ).unique()
  })
}

const groupIdParam = {
  params: Joi.object().keys({
    groupId: Joi.required().custom(objectId)
  })
}

const addMembers = {
  body: Joi.object().keys({
    members: Joi.array().required().min(1).items(
      Joi.string().custom(objectId)
    ).unique()
  })
}

const inviteResponse = {
  params: {
    ...groupIdParam.params,
    inviteId: Joi.required().custom(objectId)
  },
  body: {
    answer: Joi.string().required().valid('ACCEPT', 'DENY')
  }
}

const getMembers = {
  ...groupIdParam
}

module.exports = {
  groupIdParam,
  getMembers,
  createGroup,
  addMembers,
  inviteResponse
}
