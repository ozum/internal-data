<!-- DO NOT EDIT README.md (It will be overridden by README.hbs) -->


# internal-data

# Description

Private properties implementation using WeakMap as described on [MDN - Private Properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties).

# Synopsis

## Flow

```js
// @flow

//                                     Don't forget parentheses () ↴
const getInternal: (MyClass) => Internal = require('internal-data')(); // eslint-disable-line no-use-before-define

type Internal = {
  password: string
};

class MyClass {
  name: string;

  constructor(name, password) {
    const internal = getInternal(this);
    this.name = name;
    internal.password = password;
  }

  checkPassword(password) {
    const internal = getInternal(this);
    return internal.password === password;
  }

  methodWithFlowError() {
    const internal = getInternal(this);
    return internal.salary;  // -> FLOW ERROR
  }
}

const object = new MyClass('George', '1234');

const name     = object.name;                  // -> George
const password = object.password;              // -> FLOW ERROR
const isValid  = object.checkPassword('1234'); // -> true
```

## Vanilla JS

```js
//              Don't forget parentheses () ↴
const getInternal = require('internal-data')();

class MyClass {
  constructor(name, password) {
    const internal = getInternal(this);
    this.name = name;
    internal.password = password;
  }

  checkPassword(password) {
    const internal = getInternal(this);
    return internal.password === password;
  }
}

const object = new MyClass('George', '1234');

const name     = object.name;                  // -> George
const password = object.password;              // -> undefined
const isValid  = object.checkPassword('1234'); // -> true
```

# Details

To access private properties of the object use `getInternal(this)` method. It returns an object to store private attributes
of given object (In this case it is It is `this`)

# API
<a name="internalDataFunction"></a>

## internalDataFunction() ⇒ <code>function</code>
Returns a function to get private data.

**Kind**: global function  
**Returns**: <code>function</code> - - Function to get private properties of given object.  
<a name="internalDataFunction..getInternal"></a>

### internalDataFunction~getInternal(object) ⇒ <code>Object</code>
Returns an object which contains private data of given object.

**Kind**: inner method of [<code>internalDataFunction</code>](#internalDataFunction)  
**Returns**: <code>Object</code> - - Object which contains private data of given object.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Object to get private data of. |

