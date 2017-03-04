'use strict';

const express = require('express');
const env = process.env.node_env || 'test';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/books', function(req, res){
  knex('books').then(function(books){
    res.status(200).json(books);
  })
})

module.exports = router;
