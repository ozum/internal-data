<!-- DO NOT EDIT README.md (It will be overridden by README.hbs) -->


# internal-data

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Synopsis](#synopsis)
  - [Flow with Object Interface](#flow-with-object-interface)
  - [Flow with Function Interface](#flow-with-function-interface)
  - [Vanilla JS with Object Interface](#vanilla-js-with-object-interface)
- [Details](#details)
- [API](#api)
  - [Classes](#classes)
  - [Members](#members)
  - [InternalData](#internaldata)
    - [new InternalData()](#new-internaldata)
    - [internalData.get(object) ⇒ <code>Object</code>](#internaldatagetobject-%E2%87%92-codeobjectcode)
    - [InternalData.getFunction() ⇒ <code>getInternalFn</code>](#internaldatagetfunction-%E2%87%92-codegetinternalfncode)
  - [getInternalFn ⇒ <code>Object</code>](#getinternalfn-%E2%87%92-codeobjectcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Description

Private properties implementation using WeakMap as described on [MDN - Private Properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties).

# Synopsis

## Flow with Object Interface
```js
// @flow
import InternalData from 'internal-data';

const internalData: <MyClass, Internal> = new InternalData(); // eslint-disable-line no-use-before-define

type Internal = {|
  password: string
|};

class MyClass {
  name: string;

  constructor(name, password) {
    const internal = internalData.get(this);
    this.name = name;
    internal.password = password;
  }

  checkPassword(password) {
    const internal = internalData.get(this);
    return internal.password === password;
  }

  methodWithFlowError() {
    const internal = internalData.get(this);
    return internal.salary;  // -> FLOW ERROR
  }
}

const object = new MyClass('George', '1234');

const name     = object.name;                  // -> George
const password = object.password;              // -> FLOW ERROR
const isValid  = object.checkPassword('1234'); // -> true
```

## Flow with Function Interface
```js
// @flow
import InternalData from 'internal-data';

const getInternal: (MyClass) => Internal = InternalData.getFunction(); // eslint-disable-line no-use-before-define

type Internal = {|
  password: string
|};

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

## Vanilla JS with Object Interface

```js
import InternalData from 'internal-data';

const internalData = new InternalData(); // eslint-disable-line no-use-before-define

class MyClass {
  constructor(name, password) {
    const internal = internalData.get(this);
    this.name = name;
    internal.password = password;
  }

  checkPassword(password) {
    const internal = internalData.get(this);
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
## Classes

<dl>
<dt><a href="#InternalData">InternalData</a></dt>
<dd><p>Class which provides private data storage.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#getInternalFn">getInternalFn</a> ⇒ <code>Object</code></dt>
<dd><p>Returns an object which contains private data of given object.</p>
</dd>
</dl>

<a name="InternalData"></a>

## InternalData
Class which provides private data storage.

**Kind**: global class  
**Hideconstructor**:   

* [InternalData](#InternalData)
    * [new InternalData()](#new_InternalData_new)
    * _instance_
        * [.get(object)](#InternalData+get) ⇒ <code>Object</code>
    * _static_
        * [.getFunction()](#InternalData.getFunction) ⇒ [<code>getInternalFn</code>](#getInternalFn)

<a name="new_InternalData_new"></a>

### new InternalData()
Constructor

<a name="InternalData+get"></a>

### internalData.get(object) ⇒ <code>Object</code>
Returns private data object for given object.

**Kind**: instance method of [<code>InternalData</code>](#InternalData)  
**Returns**: <code>Object</code> - Private data of given object.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Object to get private data for. |

<a name="InternalData.getFunction"></a>

### InternalData.getFunction() ⇒ [<code>getInternalFn</code>](#getInternalFn)
Returns a function to access priavte data object.

**Kind**: static method of [<code>InternalData</code>](#InternalData)  
**Returns**: [<code>getInternalFn</code>](#getInternalFn) - - Function to get private properties of given object.  
<a name="getInternalFn"></a>

## getInternalFn ⇒ <code>Object</code>
Returns an object which contains private data of given object.

**Kind**: global variable  
**Returns**: <code>Object</code> - - Object which contains private data of given object.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Object to get private data of. |

