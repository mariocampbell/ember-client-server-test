/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4500;
const morgan = require('morgan');

const routerApi = require('./routes');

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// handlers routers
routerApi(app);

// listen server
app.listen(port, () => console.log(`Server listening in port ${port}`));
