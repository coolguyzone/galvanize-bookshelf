'use strict';

const express = require('express');
const app = express();
const env = process.env.node_env || 'test';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

// eslint-disable-next-line new-cap
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.hashed_password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          id: 2,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      res.json({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      })
      delete user.hashed_password;

    })
    .catch((err) => {
      next(err);
    });
})

// YOUR CODE HERE

module.exports = router;
