const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();
const num = 100000;

function doRequest() {
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('Do Request:', Date.now() - start, 'milliseconds');
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', num, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start, 'milliseconds');
  });
}

function readDrive() {
  fs.readFile('multitask.js', 'utf8', () => {
      console.log('FS:', Date.now() - start, 'milliseconds');
  });
}

doRequest();
readDrive();

doHash();
doHash();
doHash();
