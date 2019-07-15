const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(morgan());

app.post('/price', (req, res) => {
  console.log(req.body);
  axios
    .get('https://api.coindesk.com/v1/bpi/historical/close.json', {
      params: {
        start: req.body.start,
        end: req.body.end,
      },
    })
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
