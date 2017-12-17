<!-- DO NOT EDIT README.md (It will be overridden by README.hbs) -->


# internal-data

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Synopsis](#synopsis)
  - [TypeScript with Object Interface](#typescript-with-object-interface)
  - [TypeScript with Function Interface](#typescript-with-function-interface)
  - [JavaScript with Object Interface](#javascript-with-object-interface)
- [Details](#details)
- [API](#api)
  - [InternalData](#internaldata)
    - [new InternalData()](#new-internaldata)
    - [internalData.get(object) ⇒ <code>Object</code>](#internaldatagetobject-%E2%87%92-codeobjectcode)
    - [InternalData.getFunction() ⇒ <code>GetInternalFn</code>](#internaldatagetfunction-%E2%87%92-codegetinternalfncode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Description

Private properties implementation using WeakMap as described on [MDN - Private Properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties).

# Synopsis

## TypeScript with Object Interface
```js
import InternalData from 'internal-data';

const internalData: InternalData<MyClass, Internal> = new InternalData();

type Internal = { password: string };

class MyClass {
  name: string;

  constructor(name: string, password: string) {
    const internal = internalData.get(this);
    this.name = name;
    internal.password = password;
  }

  checkPassword(password: string): boolean {
    const internal = internalData.get(this);
    return internal.password === password;
  }
}

const object = new MyClass('George', '1234');

const name     = object.name;                  // -> George
const password = object.password;              // -> TYPESCRIPT ERROR
const isValid  = object.checkPassword('1234'); // -> true
```

## TypeScript with Function Interface
```js
import InternalData from 'internal-data';

const getInternal = InternalData.getFunction<MyClass, Internal>();

type Internal = { password: string };

class MyClass {
  name: string;

  constructor(name: string, password: string) {
    const internal = getInternal(this);
    this.name = name;
    internal.password = password;
  }

  checkPassword(password: string): boolean {
    const internal = getInternal(this);
    return internal.password === password;
  }
}

const object = new MyClass('George', '1234');

const name     = object.name;                  // -> George
const password = object.password;              // -> TYPESCRIPT ERROR
const isValid  = object.checkPassword('1234'); // -> true

console.log(object.checkPassword('1234'));
```

## JavaScript with Object Interface

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
<a name="InternalData"></a>

## InternalData
<p>Class which provides private data storage.</p>

**Kind**: global class  
**Hideconstructor**:   

* [InternalData](#InternalData)
    * [new InternalData()](#new_InternalData_new)
    * _instance_
        * [.get(object)](#InternalData+get) ⇒ <code>Object</code>
    * _static_
        * [.getFunction()](#InternalData.getFunction) ⇒ <code>GetInternalFn</code>

<a name="new_InternalData_new"></a>

### new InternalData()
<p>Constructor</p>

<a name="InternalData+get"></a>

### internalData.get(object) ⇒ <code>Object</code>
<p>Returns private data object for given object.</p>

**Kind**: instance method of [<code>InternalData</code>](#InternalData)  
**Returns**: <code>Object</code> - <p>Private data of given object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | <p>Object to get private data for.</p> |

<a name="InternalData.getFunction"></a>

### InternalData.getFunction() ⇒ <code>GetInternalFn</code>
<p>Returns a function to access private data object.</p>

**Kind**: static method of [<code>InternalData</code>](#InternalData)  
**Returns**: <code>GetInternalFn</code> - <ul>
<li>Function to get private properties of given object.</li>
</ul>  
