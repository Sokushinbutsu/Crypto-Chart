const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');

app.use(express.static('dist'));

app.get('/price', (req, res) => {
  axios
    .get(
      'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-20',
    )
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/error', (req, res) => {
  // Going to store errors in sqlite later.
  res.send(200);
});

app.listen(port, () => console.log('Server is running on port 3000!'));
