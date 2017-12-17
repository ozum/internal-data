import InternalData from '../../src/index';

type Internal = { password: string };

const getInternal = InternalData.getFunction<TestClass, Internal>();

/**
 * Test class
 */
class TestClass {
  name: string;
  password: string;

  /**
   * Creates test object
   * @param {string} name     - Name to store in public property.
   * @param {string} password - Password to store in private property.
   * @return {TestClass}      - Object
   */
  constructor(name: string, password: string) {
    const internal = getInternal(this);
    this.name = name;
    internal.password = password;
  }

  /**
   * Checks if given password is true.
   * @param   {string}  password  - Password to check.
   * @returns {boolean}           - Whether given password is correct.
   */
  checkPassword(password: string): boolean {
    const internal = getInternal(this);
    return internal.password === password;
  }
}

export default TestClass;
