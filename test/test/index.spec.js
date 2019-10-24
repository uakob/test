process.env.NODE_ENV = 'test';

let chai = require('chai');
let should = chai.should();

//Наш основной блок
describe('first', () => {
  it('should be a true', () => {
    chai.assert.equal(42, 42);
  });
});
