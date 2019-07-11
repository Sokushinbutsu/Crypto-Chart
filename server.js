const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('dist'));

app.listen(port, () =>
  console.log(`CryptoChart is listening on port ${port}!`)
);
