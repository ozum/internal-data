// @flow

/**
 * Returns an object which contains private data of given object.
 * @type    {Function}
 * @name    getInternalFn
 * @param   {Object} object - Object to get private data of.
 * @return  {Object}        - Object which contains private data of given object.
 */
type getInternalFn<T, I> = (object: T) => I

/**
 * Class which provides private data storage.
 * @hideconstructor
 */
class InternalData<T, I> {
  data: WeakMap<T, I>;

  /**
   * Constructor
   */
  constructor() {
    this.data = new WeakMap();
  }

  /**
   * Returns a function to access priavte data object.
   * @return  {getInternalFn} - Function to get private properties of given object.
   */
  static getFunction(): getInternalFn<T, I> {
    const internalData: InternalData<T, I> = new InternalData();
    return object => internalData.get(object);
  }

  /**
   * Returns private data object for given object.
   * @param   {Object} object Object to get private data for.
   * @return  {Object}        Private data of given object.
   */
  get(object: T): I {
    let internal = this.data.get(object);

    if (!internal) {
      internal = (({}: any): I);
      this.data.set(object, internal);
    }
    return internal;
  }
}


export default InternalData;
