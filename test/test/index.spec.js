const chai = require('chai');
const axios = require('axios');

const Redis = require('ioredis');

const key = 42;
const value = 'whole question';

const url = `http://nginx:${process.env.WEB_PORT}/${key}`;

let storage;

describe('positive case', async () => {
  it('create Redis cli instance', async () => {
    storage = await new Redis(
      process.env.REDIS_HOST,
      process.env.REDIS_PORT,
      { lazyConnect: true },
    );


    chai.assert.notEqual(storage, null);
  });

  it('connect to Redis', async () => {
    const connect = await storage.connect();
    chai.assert.equal(connect, undefined);
  });

  it('set a key', async () => {
    const result = await storage.set(key, value);

    chai.assert.equal(result, 'OK');
  });

  it('get key from Redis', async () => {
    const result = await storage.get(key);

    chai.assert.equal(result, value);
  });

  it('cache key by requesting it', async () => {
    const result = await axios.get(url);

    chai.assert.equal(result.data, value);
  });

  it('get key from Proxy', async () => {
    const result = await axios.get(url);

    chai.assert.equal(result.data, value);
  });

  it('delete key from Redis', async () => {
    const result = await storage.del(key);

    chai.assert.equal(result, 1);
  });

  it('ensure that key can be got from Proxy cache', async () => {
    const result = await axios.get(url);

    chai.assert.equal(result.data, value);
  });
});
