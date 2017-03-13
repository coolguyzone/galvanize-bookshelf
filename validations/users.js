'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    first_name: Joi.string()
      .required()
      .alphanum()
      .max(20)
      .trim(),

    last_name: Joi.string()
      .required()
      .alphanum()
      .max(20)
      .trim(),

    email: Joi.string()
      .required()
      .email()
      .trim(),

    password: Joi.string()
      .required()
      .trim()
      .min(8)
  }
};
