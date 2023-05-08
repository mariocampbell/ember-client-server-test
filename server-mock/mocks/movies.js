/* eslint-disable no-undef */
'use strict';

module.exports = function (app) {
  const express = require('express');
  let moviesRouter = express.Router();

  moviesRouter.get('/', function (req, res) {
    res.send({
      movies: [],
    });
  });

  moviesRouter.post('/', function (req, res) {
    res.status(201).end();
  });

  moviesRouter.get('/:id', function (req, res) {
    res.send({
      movies: {
        id: req.params.id,
      },
    });
  });

  moviesRouter.put('/:id', function (req, res) {
    res.send({
      movies: {
        id: req.params.id,
      },
    });
  });

  moviesRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/movies', require('body-parser').json());
  app.use('/api/movies', moviesRouter);
};
