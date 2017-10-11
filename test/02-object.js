const Code        = require('code');
const TestClass   = require('./utility/test-class');

const { expect }  = Code;

const testObject = new TestClass('George', '1234');

describe('Object', () => {
  it('should have public property accessible.', (done) => {
    expect(testObject.name).to.equal('George');
    done();
  });

  it('should have private property hidden.', (done) => {
    expect(testObject.password).to.be.undefined();
    done();
  });

  it('should access it\'s private property.', (done) => {
    expect(testObject.checkPassword('1234')).to.be.true();
    done();
  });
});
