const express = require('express');
const app = express();
const https = require('https');
const crypto = require('crypto');
const start = Date.now();
const num = 100000;

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', num, 512, 'sha512', () => {
    //console.log('Hash:', Date.now() - start, 'milliseconds');
    res.send('Hi buddy');
  });
});
app.get('/fast', (req, res) => {
  res.send('This was fast!');
});

app.listen(3000);

