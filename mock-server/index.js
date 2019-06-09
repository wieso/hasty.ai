const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();

app.use(cors());

app.get('/v1/cryptocurrency/listings/latest', (req, res) => {
  if (parseInt(req.query.limit, 10) > 0) {
    res.send({
      ...data,
      data: data.data.slice(0, req.query.limit),
    });
  } else {
    res.send(data);
  }
});

app.listen(3000, () => {
  console.log('Mock server listening on port 3000!');
});
