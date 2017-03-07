'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_test'
    // pool: {
    //   min: 1,
    //   max: 7
    // }
  },

  production: {}
};
