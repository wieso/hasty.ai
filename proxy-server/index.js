const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mcache = require('memory-cache');

const API = process.env.API || 'https://pro-api.coinmarketcap.com';
const API_KEY = process.env.API_KEY || 'ebcccc1c-6e5b-4016-a005-ef950b7febe0';

const app = express();

app.use(cors());

// https://pro-api.coinmarketcap.com has limits. I want to reduce queries to coinmarketcap.
const cache = duration => (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedBody = mcache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};

app.get('/v1/cryptocurrency/listings/latest', cache(60), async (req, res) => {
  try {
    const result = await axios.get(
      `${API}/v1/cryptocurrency/listings/latest`,
      {
        params: req.query,
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY,
        },
      },
    );
    res.send(result.data);
  } catch (e) {
    res.send(e);
  }
});

app.listen(3000, () => {
  console.log('Proxy server listening on port 3000!');
});
