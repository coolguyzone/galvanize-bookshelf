'use strict';

const express = require('express');
const app = express;
const knex = require('../knex.js');
const humps = require('humps');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/favorites/check', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
     res.set('Content-Type', 'text/plain');
     res.status(401).send('Unauthorized');
    }
   else {
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
     })
     .catch(() =>{
       res.set('Content-Type', 'match/plain');
       res.status(401);
     })
 }
 })
})

router.get('/favorites', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'text/plain');
      res.status(401).send('Unauthorized');
    }
    else {
      knex.from('favorites').innerJoin('books', 'favorites.book_id', 'books.id')
      .then((favorites) => {
        res.send(humps.camelizeKeys(favorites));
      })
      .catch(() => {
        res.set('Content-Type', 'match/plain');
        res.status(401);
      });
    }
  });
});

router.post('/favorites', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'text/plain');
      res.status(401).send('Unauthorized');
    }
    else {
      knex('favorites')
        .insert({
          book_id: req.body.bookId,
          user_id: payload.userId
        }, '*')
        .then ((favorites) => {
          let favorite = favorites[0];
          delete favorite.created_at;
          delete favorite.updated_at;
          res.status(200).send(humps.camelizeKeys(favorite));
        })
    }
  })
})

router.delete('/favorites', (req, res) =>{
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'text/plain');
      res.status(401).send('Unauthorized');
    }
    else {
      let favorite;

      knex('favorites')
        .where('book_id', req.body.bookId)
        .first()
        .then((row) =>{
          if (!row) {
            return next();
          }

          favorite = row;

          return knex('favorites')
            .del()
            .where('book_id', req.body.bookId);
        })
        .then(() => {
          delete favorite.created_at;
          delete favorite.updated_at;
          delete favorite.id;
          res.status(200).send(humps.camelizeKeys(favorite));
        })


    }
  })
})

module.exports = router;
