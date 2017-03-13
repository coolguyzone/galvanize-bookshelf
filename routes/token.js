'use strict';

const express = require('express');
const app = express();
const knex = require('../knex.js');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validations = require('../validations/token')

// eslint-disable-next-line new-cap

// YOUR CODE HERE

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'match/json');
      res.status(200).send('false');
    }
    else {
      res.set('Content-Type', 'match/json');
      res.status(200).send('true');
    }

  });

});

router.post('/token', ev(validations.post), (req, res) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      // console.log(user);
      // if (!user) {
      //   return next();
      // } else {
      let password = user.hashed_password;
      bcrypt.compare(req.body.password, password)
        .then((arg) => {
          const claim = { userId: user.id};
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '7 days'
          });
          res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            secure: router.get('env') === 'production'
          })
          res.set('Content-Type', 'application/json');
          delete user.hashed_password;
          delete user.created_at;
          delete user.updated_at;

					res.status(200).send(user);


        })
        .catch(bcrypt.MISMATCH_ERROR, () => {
          res.set('Content-Type', 'match/plain');
          res.status(400).send('Bad email or password');
        })
    })
    .catch((err) => {
      res.set('Content-Type', 'match/plain')
      res.status(400).send('Bad email or password');
    });
  // .catch(bcrypt.MISMATCH_ERROR, )
});

router.delete('/token', (req, res) => {
  const token = '';
  res.cookie('token', token);
  res.end();
})

module.exports = router;
