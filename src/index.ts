/**
 * Class which provides private data storage.
 * @hideconstructor
 */
class InternalData<T extends Object, I> {
  data: WeakMap<T, I>;

  /**
   * Constructor
   * @return {InternalData} - Object
   */
  constructor() {
    this.data = new WeakMap();
  }

  /**
   * Returns a function to access private data object.
   * @return  {GetInternalFn} - Function to get private properties of given object.
   */
  static getFunction<T, I>(): (object: T) => I {
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
      internal = {} as I;
      this.data.set(object, internal);
    }
    return internal;
  }
}

export default InternalData;
