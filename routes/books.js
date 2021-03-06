'use strict';

const express = require('express');
const app = express();
// const env = process.env.node_env || 'test';
// const config = require('../knexfile.js')[env];
// const knex = require('knex')(config);
const knex = require('../knex.js');

// eslint-disable-next-line new-cap
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// YOUR CODE HERE
router.get('/books', (req, res) => {
  knex('books').orderBy('title').then((books) => {
    res.status(200).json(books);
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
  });
});

router.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  knex('books')
  .where('id', bookId)
  .first()
  .then((books) => {
    res.status(200).json(books);
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
  });
});

router.post('/books', (req, res) => {
  knex('books')
    .insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.cover_url
    }, '*')
    .then((items) => {
      res.send(items[0])
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
      process.exit(1);
    });
});

router.patch('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  knex('books')
  .where('id', bookId)
  .update(req.body)
  .then(() => {
    knex('books')
    .where('id', bookId)
    .then((updated) => {
      const book = updated[0];

      res.status(200).json(book);
    });
  });
});

router.delete('/books/:id', (req, res) => {
  let book;

  knex('books')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      book = row;

      return knex('books')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete book.id;
      res.send(book);
    })
    .catch((err) => {
      res.sendStatus(500)
    });
});

module.exports = router;
