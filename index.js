require('dotenv').config();

const express = require('express');
const app = express();

app.use('/', express.static('coverage/lcov-report'));

app.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
})