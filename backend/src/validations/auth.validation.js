const Joi = require('joi');
const { password } = require('./custom.validation');
const { countries } = require('../config/constants');

const maxDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 13);
  return date;
}

const minDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 100);
  return date
}

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().custom(password),
    username: Joi.string().max(30).required(),
    fullName: Joi.string().max(255).required(),
    birthDate: Joi.date().max(maxDate()).min(minDate()).required(),
    country: Joi.string().valid(...countries).required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
