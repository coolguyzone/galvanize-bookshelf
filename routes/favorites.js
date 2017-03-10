'use strict';

const express = require('express');
const app = express;
const knex = require('../knex.js')

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/favorites/check', (req, res) => {
  knex('favorites')
    .then((favorites) =>{
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id.toString() === req.query.bookId) {
          res.set('Content-Type', 'match/json');
          res.status(200).send('true');
        }
        else {
          res.status(200).send('false');
        }
      }
      // res.send(idExists);
    })
})

module.exports = router;
