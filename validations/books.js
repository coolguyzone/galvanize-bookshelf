'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string()
      .min(3)
      .max(30)
      .required(),

    author: Joi.string()
      .min(3)
      .max(30)
      .required(),

    genre: Joi.string()
      .min(3)
      .max(20),

    description: Joi.string()
    .min(10)
    .max(10000),

    cover_url: Joi.string()
      .min(3)
      .max(400)
      .required()
  }
};
