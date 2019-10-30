const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen('9002');
console.info('http://localhost:9002/');

module.exports = app;
