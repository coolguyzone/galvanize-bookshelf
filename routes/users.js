'use strict';

const express = require('express');
const app = express();
// const env = process.env.node_env || 'test';
// const config = require('../knexfile.js')[env];
// const knex = require('../knex.js')(config);
const knex = require('../knex.js');
// eslint-disable-next-line new-cap
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validations = require('../validations/users');

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/users', ev(validations.post), (req, res) => {
  bcrypt.hash(req.body.password, 12)
  .then((hashed) => {
      const newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          hashed_password: hashed
      }
      return knex('users').insert(newUser, '*');
    })
    .then((users) => {
      const user = users[0];

        delete user.hashed_password;
        delete user.created_at;
        delete user.updated_at;
        res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

// YOUR CODE HERE

module.exports = router;
