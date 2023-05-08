/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

// const { URI, DB, COLLECTION, APIKEY } = process.env;
const URI = process.env.MONGO_URI;
const DB = process.env.MONGO_DB;
const COLLECTION = process.env.MONGO_COLLECTION;
const APIKEY = process.env.APIKEY;
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

router.get('/', async (req, res) => {
  try {
    const query = req.query;

    await client.connect();
    const coll = client.db(DB).collection(COLLECTION);
    const totals = await coll.countDocuments(query);
    const data = await coll
      .find(query)
      .project({ _id: 0, title: 1, cast: 1 })
      .sort({ year: 1 })
      .limit(10)
      .toArray();

    res.json({
      totals,
      data,
    });
  } finally {
    await client.close();
  }
});

router.get('/search-api', async (req, res) => {
  const body = JSON.stringify({
    database: DB,
    collection: COLLECTION,
    dataSource: 'ClusterEmber',
    // filter: { title: 'back to the future' },
    projection: {
      _id: 0,
      title: 1,
      year: 1,
    },
    sort: { year: 1 },
    limit: 10,
  });

  const config = {
    method: 'post',
    url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-rfsqy/endpoint/data/v1/action/find',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': APIKEY,
    },
    data: body,
  };

  const { data } = await axios(config);

  res.json({
    totals: data.documents.length,
    data: data.documents,
  });
});

module.exports = router;
