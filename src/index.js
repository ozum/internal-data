// @flow

type getInternalFunction<T> = (object: Object) => T

/**
 * Returns a function to get private data.
 * @returns {Function} - Function to get private properties of given object.
 */
function internalDataFunction<T>() : getInternalFunction<T> {
  const internalData = new WeakMap();

  if (arguments.length > 0) {
    throw new Error("This function must be called without arguments. Maybe you forget () in require. require('internal-data')()");
  }

  /**
   * Returns an object which contains private data of given object.
   * @param   {Object} object - Object to get private data of.
   * @returns {Object}        - Object which contains private data of given object.
   */
  function getInternal(object: Object) : T {
    let internal = internalData.get(object);

    if (!internal) {
      internal = {};
      internalData.set(object, internal);
    }

    return ((internal : any) : T);
  }

  return getInternal;
}

module.exports = internalDataFunction;
