'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string()
      .required()
      .email()
      .trim(),

    password: Joi.string()
      .required()
      .trim()
      .min(6)
  }
};
