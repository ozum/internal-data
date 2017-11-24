import InternalData from '../../src/index';

const internalData = new InternalData();

/**
 * Test class
 */
class TestClass {
  /**
   * Creates test object
   * @param {string} name     - Name to store in public property.
   * @param {string} password - Password to store in private property.
   */
  constructor(name, password) {
    const internal = internalData.get(this);
    this.name = name;
    internal.password = password;
  }

  /**
   * Checks if given password is true.
   * @param   {string}  password  - Password to check.
   * @returns {boolean}           - Whether given password is correct.
   */
  checkPassword(password) {
    const internal = internalData.get(this);
    return internal.password === password;
  }
}

module.exports = TestClass;
