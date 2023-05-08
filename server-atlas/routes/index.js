/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

// routers
const moviesRouter = require('./movies.routes');

const routerApi = (app) => {
  app.use('/api/v1', router);
  router.use('/movies', moviesRouter);
};

module.exports = routerApi;
