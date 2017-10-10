// @flow

type getInteralFunction = (Object) => Object;

/**
 * Returns a function to get private data.
 * @returns {Function} - Function to get private properties of given object.
 */
function internalDataFunction() : getInteralFunction {
  const internalData = new WeakMap();

  if (arguments.length > 0) {
    throw new Error("This function must be called without arguments. Maybe you forget () in require. require('internal-data')()");
  }

  /**
   * Returns an object which contains private data of given object.
   * @param   {Object} object - Object to get private data of.
   * @returns {Object}        - Object which contains private data of given object.
   */
  function getInternal(object: Object) : Object {
    let internal = internalData.get(object);

    if (!internal) {
      internal = {};
      internalData.set(object, internal);
    }

    return internal;
  }

  return getInternal;
}

module.exports = internalDataFunction;
