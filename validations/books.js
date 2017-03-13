'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    author: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    genre: Joi.string()
      .alphanum()
      .min(3)
      .max(20),

    description: Joi.string()
    .alphanum()
    .min(10)
    .max(100),

    cover_url: Joi.string()
      .min(3)
      .max(40)
      .required()
  }
};
