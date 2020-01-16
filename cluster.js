process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but
  // in child mode
  cluster.fork();
  cluster.fork();
} else {
  // I'm a child, I'm going to act like a server
  // and do nothing else
  const express = require('express');
  const app = express();
  const https = require('https');
  const crypto = require('crypto');
  const start = Date.now();
  const num = 100000;

  function doHash() {
  }

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
}

