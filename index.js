process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but
  // in child mode
  cluster.fork();
} else {
  // I'm a child, I'm going to act like a server
  // and do nothing else
  const express = require('express');
  const crypto = require('crypto');
  const app = express();

  const start = Date.now();
  const num = 100000;

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  function doHash() {
    crypto.pbkdf2('a', 'b', num, 512, 'sha512', () => {
      console.log('Hash:', Date.now() - start, 'milliseconds');
    });
  }

  app.get('/', (req, res) => {
    doHash();
    res.send('Hi buddy');
  });
  app.get('/fast', (req, res) => {
    doHash();
    res.send('This was fast!');
  });

  app.listen(3000);
}

