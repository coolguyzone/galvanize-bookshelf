'use strict';

const express = require('express');
const app = express;
const knex = require('../knex.js');
const humps = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/favorites/check', (req, res) => {
  knex('favorites')
    .then((favorites) =>{
      console.log(req.cookies);
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
    .catch(() =>{
      res.set('Content-Type', 'match/plain');
      res.status(401);
    })
})

router.get('/favorites', (req, res) => {
  knex.from('favorites').innerJoin('books', 'favorites.book_id', 'books.id')
  .then((favorites) => {
    res.send(humps.camelizeKeys(favorites));
  })
  .catch(() =>{
    res.set('Content-Type', 'match/plain');
    res.status(401);
  })
});

module.exports = router;
