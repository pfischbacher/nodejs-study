// Change the Threadpool size
process.env.UV_THREADPOOL_SIZE = 5;

const crypto = require('crypto');

const start = Date.now();
const num = 100000;
const max = 8;

for (let i = 0; i < max; i++) {
  crypto.pbkdf2('a', 'b', num, 512, 'sha512', () => {
    let index = i + 1;
    console.log(index+':', Date.now() - start, 'milliseconds');
  });
}

