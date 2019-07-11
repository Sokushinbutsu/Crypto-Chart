const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');
const axios = require('axios');

// app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/price', (req, res) => {
  axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(({ data }) => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
});

app.listen(port, () =>
  console.log(`CryptoChart is listening on port ${port}!`)
);
