const Code        = require('code');
const TestClassFn   = require('./utility/test-class-func');
const TestClassOO   = require('./utility/test-class-oo');

const { expect }  = Code;


describe('Function Interface', () => {
  const testObject = new TestClassFn('George', '1234');

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


describe('Object Oriented Interface', () => {
  const testObject = new TestClassOO('George', '1234');

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
