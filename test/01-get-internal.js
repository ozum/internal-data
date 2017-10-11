const Code             = require('code');
const getInternal      = require('../src/index')();
const getInternalWrong = require('../src/index');

const { expect }  = Code;

const object = {};

describe('getInternal', () => {
  it('should behave normal when imported correctly.', (done) => {
    expect(getInternal(object)).to.be.empty();
    done();
  });

  it('should have private property hidden.', (done) => {
    expect(() => getInternalWrong(object)).throw(/^This function must be called without arguments/);
    done();
  });
});
