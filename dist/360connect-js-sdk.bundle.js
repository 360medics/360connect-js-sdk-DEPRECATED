var Connect =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(34)
var ieee754 = __webpack_require__(35)
var isArray = __webpack_require__(12)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

var Readable = __webpack_require__(15);
var Writable = __webpack_require__(19);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(26));
__export(__webpack_require__(31));
__export(__webpack_require__(32));
__export(__webpack_require__(61));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(2)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * @fileoverview Extend node util module
 * @author douzi <liaowei08@gmail.com> 
 */
var util = __webpack_require__(53);
var toString = Object.prototype.toString;
var isWindows = process.platform === 'win32';

function isObject(value) {
  return toString.call(value) === '[object Object]';
}

// And type check method: isFunction, isString, isNumber, isDate, isRegExp, isObject
['Function', 'String', 'Number', 'Date', 'RegExp'].forEach(function(item) {
  exports['is' + item]  = function(value) {
    return toString.call(value) === '[object ' + item + ']';
  };
});

/**
 * @description
 * Deep extend
 * @example
 * extend({ key: { k1: 'v1'} }, { key: { k2: 'v2' }, none: { k: 'v' } });
 * extend({ arr: [] }, { arr: [ {}, {} ] });
 */
function extend(target, source) {
  var value;

  for (var key in source) {
    value = source[key];

    if (Array.isArray(value)) {
      if (!Array.isArray(target[key])) {
        target[key] = [];
      }

      extend(target[key], value);
    } else if (isObject(value)) {
      if (!isObject(target[key])) {
        target[key]  = {};
      }

      extend(target[key], value);
    } else {
      target[key] = value;
    }
  }

  return target;
}

extend(exports, util);

// fixed util.isObject 
exports.isObject = isObject;

exports.extend = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var target = args.shift();

  args.forEach(function(item) {
    extend(target, item);
  });

  return target;
};

exports.isArray = Array.isArray;

exports.isUndefined = function(value) {
  return typeof value == 'undefined';
};

exports.noop = function() {};

exports.unique = function(array) {
  var result = [];

  array.forEach(function(item) {
    if (result.indexOf(item) == -1) {
      result.push(item);
    }
  });

  return result;
};

exports.escape = function(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

exports.unescape = function(value) {
  return String(value)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
};

exports.hrtime = function(time) {
  if (time) {
    var spend = process.hrtime(time);
    
    spend = (spend[0] + spend[1] / 1e9) * 1000 + 'ms';

    return spend;
  } else {
    return process.hrtime();
  }
};

/**
 * @description
 * Return a copy of the object with list keys
 * @example
 * util.pick({ key: 'value' }, 'key', 'key1');
 * util.pick(obj, function(value, key, object) { });
 */
exports.pick = function(obj, iteratee) {
  var result = {};

  if (exports.isFunction(iteratee)) {
    for (var key in obj) {
      var value = obj[key];
      if (iteratee(value, key, obj)) {
        result[key] = value;
      }
    }
  } else {
    var keys = Array.prototype.slice.call(arguments, 1);

    keys.forEach(function(key) {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
  }

  return result;
};

exports.path = {};

if (isWindows) {
  // Regex to split a windows path into three parts: [*, device, slash,
  // tail] windows-only
  var splitDeviceRe =
      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

  exports.path.isAbsolute = function(filepath) {
    var result = splitDeviceRe.exec(filepath),
        device = result[1] || '',
        isUnc = !!device && device.charAt(1) !== ':';
    // UNC paths are always absolute
    return !!result[2] || isUnc;
  };

  // Normalize \\ paths to / paths.
  exports.path.unixifyPath = function(filepath) {
    return filepath.replace(/\\/g, '/');
  };

} else {
  exports.path.isAbsolute = function(filepath) {
    return filepath.charAt(0) === '/';
  };

  exports.path.unixifyPath = function(filepath) {
    return filepath;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(59));
__export(__webpack_require__(60));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Config = {
    DEBUG: false,
    LIB_VERSION: '2.11.1'
};

// since es6 imports are static and we run unit tests from the console, window won't be defined when importing this file
var win;
if (typeof(window) === 'undefined') {
    win = {
        navigator: {}
    };
} else {
    win = window;
}



/*
 * Saved references to long variable names, so that closure compiler can
 * minimize file size.
 */

var ArrayProto = Array.prototype;
var FuncProto = Function.prototype;
var ObjProto = Object.prototype;
var slice = ArrayProto.slice;
var toString = ObjProto.toString;
var hasOwnProperty = ObjProto.hasOwnProperty;
var windowConsole = win.console;
var navigator$1 = win.navigator;
var document$1 = win.document;
var userAgent = navigator$1.userAgent;
var nativeBind = FuncProto.bind;
var nativeForEach = ArrayProto.forEach;
var nativeIndexOf = ArrayProto.indexOf;
var nativeIsArray = Array.isArray;
var breaker = {};
var _ = {
    trim: function(str) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
};

// Console override
var console$1 = {
    /** @type {function(...[*])} */
    log: function() {
        if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
            try {
                windowConsole.log.apply(windowConsole, arguments);
            } catch (err) {
                _.each(arguments, function(arg) {
                    windowConsole.log(arg);
                });
            }
        }
    },
    /** @type {function(...[*])} */
    error: function() {
        if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
            var args = ['Mixpanel error:'].concat(_.toArray(arguments));
            try {
                windowConsole.error.apply(windowConsole, args);
            } catch (err) {
                _.each(args, function(arg) {
                    windowConsole.error(arg);
                });
            }
        }
    },
    /** @type {function(...[*])} */
    critical: function() {
        if (!_.isUndefined(windowConsole) && windowConsole) {
            var args = ['Mixpanel error:'].concat(_.toArray(arguments));
            try {
                windowConsole.error.apply(windowConsole, args);
            } catch (err) {
                _.each(args, function(arg) {
                    windowConsole.error(arg);
                });
            }
        }
    }
};


// UNDERSCORE
// Embed part of the Underscore Library
_.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1));
    }
    if (!_.isFunction(func)) {
        throw new TypeError();
    }
    args = slice.call(arguments, 2);
    bound = function() {
        if (!(this instanceof bound)) {
            return func.apply(context, args.concat(slice.call(arguments)));
        }
        var ctor = {};
        ctor.prototype = func.prototype;
        var self = new ctor();
        ctor.prototype = null;
        var result = func.apply(self, args.concat(slice.call(arguments)));
        if (Object(result) === result) {
            return result;
        }
        return self;
    };
    return bound;
};

_.bind_instance_methods = function(obj) {
    for (var func in obj) {
        if (typeof(obj[func]) === 'function') {
            obj[func] = _.bind(obj[func], obj);
        }
    }
};

/**
 * @param {*=} obj
 * @param {function(...[*])=} iterator
 * @param {Object=} context
 */
_.each = function(obj, iterator, context) {
    if (obj === null || obj === undefined) {
        return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                return;
            }
        }
    } else {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                if (iterator.call(context, obj[key], key, obj) === breaker) {
                    return;
                }
            }
        }
    }
};

_.escapeHTML = function(s) {
    var escaped = s;
    if (escaped && _.isString(escaped)) {
        escaped = escaped
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    return escaped;
};

_.extend = function(obj) {
    _.each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
            if (source[prop] !== void 0) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

_.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

// from a comment on http://dbj.org/dbj/?p=286
// fails on only one very rare and deliberate custom object:
// var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};
_.isFunction = function(f) {
    try {
        return /^\s*\bfunction\b/.test(f);
    } catch (x) {
        return false;
    }
};

_.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
};

_.toArray = function(iterable) {
    if (!iterable) {
        return [];
    }
    if (iterable.toArray) {
        return iterable.toArray();
    }
    if (_.isArray(iterable)) {
        return slice.call(iterable);
    }
    if (_.isArguments(iterable)) {
        return slice.call(iterable);
    }
    return _.values(iterable);
};

_.values = function(obj) {
    var results = [];
    if (obj === null) {
        return results;
    }
    _.each(obj, function(value) {
        results[results.length] = value;
    });
    return results;
};

_.identity = function(value) {
    return value;
};

_.include = function(obj, target) {
    var found = false;
    if (obj === null) {
        return found;
    }
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
        return obj.indexOf(target) != -1;
    }
    _.each(obj, function(value) {
        if (found || (found = (value === target))) {
            return breaker;
        }
    });
    return found;
};

_.includes = function(str, needle) {
    return str.indexOf(needle) !== -1;
};

// Underscore Addons
_.inherit = function(subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
};

_.isObject = function(obj) {
    return (obj === Object(obj) && !_.isArray(obj));
};

_.isEmptyObject = function(obj) {
    if (_.isObject(obj)) {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

_.isUndefined = function(obj) {
    return obj === void 0;
};

_.isString = function(obj) {
    return toString.call(obj) == '[object String]';
};

_.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
};

_.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
};

_.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};

_.encodeDates = function(obj) {
    _.each(obj, function(v, k) {
        if (_.isDate(v)) {
            obj[k] = _.formatDate(v);
        } else if (_.isObject(v)) {
            obj[k] = _.encodeDates(v); // recurse
        }
    });
    return obj;
};

_.timestamp = function() {
    Date.now = Date.now || function() {
        return +new Date;
    };
    return Date.now();
};

_.formatDate = function(d) {
    // YYYY-MM-DDTHH:MM:SS in UTC
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }
    return d.getUTCFullYear() + '-' +
        pad(d.getUTCMonth() + 1) + '-' +
        pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds());
};

_.safewrap = function(f) {
    return function() {
        try {
            return f.apply(this, arguments);
        } catch (e) {
            console$1.critical('Implementation error. Please contact support@mixpanel.com.');
        }
    };
};

_.safewrap_class = function(klass, functions) {
    for (var i = 0; i < functions.length; i++) {
        klass.prototype[functions[i]] = _.safewrap(klass.prototype[functions[i]]);
    }
};

_.safewrap_instance_methods = function(obj) {
    for (var func in obj) {
        if (typeof(obj[func]) === 'function') {
            obj[func] = _.safewrap(obj[func]);
        }
    }
};

_.strip_empty_properties = function(p) {
    var ret = {};
    _.each(p, function(v, k) {
        if (_.isString(v) && v.length > 0) {
            ret[k] = v;
        }
    });
    return ret;
};

/*
 * this function returns a copy of object after truncating it.  If
 * passed an Array or Object it will iterate through obj and
 * truncate all the values recursively.
 */
_.truncate = function(obj, length) {
    var ret;

    if (typeof(obj) === 'string') {
        ret = obj.slice(0, length);
    } else if (_.isArray(obj)) {
        ret = [];
        _.each(obj, function(val) {
            ret.push(_.truncate(val, length));
        });
    } else if (_.isObject(obj)) {
        ret = {};
        _.each(obj, function(val, key) {
            ret[key] = _.truncate(val, length);
        });
    } else {
        ret = obj;
    }

    return ret;
};

_.JSONEncode = (function() {
    return function(mixed_val) {
        var value = mixed_val;
        var quote = function(string) {
            var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; // eslint-disable-line no-control-regex
            var meta = { // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };

            escapable.lastIndex = 0;
            return escapable.test(string) ?
                '"' + string.replace(escapable, function(a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c :
                        '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' :
                '"' + string + '"';
        };

        var str = function(key, holder) {
            var gap = '';
            var indent = '    ';
            var i = 0; // The loop counter.
            var k = ''; // The member key.
            var v = ''; // The member value.
            var length = 0;
            var mind = gap;
            var partial = [];
            var value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':
                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.

                    return String(value);

                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null';
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent;
                    partial = [];

                    // Is the value an array?
                    if (toString.apply(value) === '[object Array]') {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.

                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' :
                            gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                            mind + ']' :
                            '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // Iterate through all of the keys in the object.
                    for (k in value) {
                        if (hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' :
                        gap ? '{' + partial.join(',') + '' +
                        mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        };

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {
            '': value
        });
    };
})();

_.JSONDecode = (function() { // https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
    var at, // The index of the current character
        ch, // The current character
        escapee = {
            '"': '"',
            '\\': '\\',
            '/': '/',
            'b': '\b',
            'f': '\f',
            'n': '\n',
            'r': '\r',
            't': '\t'
        },
        text,
        error = function(m) {
            throw {
                name: 'SyntaxError',
                message: m,
                at: at,
                text: text
            };
        },
        next = function(c) {
            // If a c parameter is provided, verify that it matches the current character.
            if (c && c !== ch) {
                error('Expected \'' + c + '\' instead of \'' + ch + '\'');
            }
            // Get the next character. When there are no more characters,
            // return the empty string.
            ch = text.charAt(at);
            at += 1;
            return ch;
        },
        number = function() {
            // Parse a number value.
            var number,
                string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (!isFinite(number)) {
                error('Bad number');
            } else {
                return number;
            }
        },

        string = function() {
            // Parse a string value.
            var hex,
                i,
                string = '',
                uffff;
            // When parsing for string values, we must look for " and \ characters.
            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    }
                    if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error('Bad string');
        },
        white = function() {
            // Skip whitespace.
            while (ch && ch <= ' ') {
                next();
            }
        },
        word = function() {
            // true, false, or null.
            switch (ch) {
                case 't':
                    next('t');
                    next('r');
                    next('u');
                    next('e');
                    return true;
                case 'f':
                    next('f');
                    next('a');
                    next('l');
                    next('s');
                    next('e');
                    return false;
                case 'n':
                    next('n');
                    next('u');
                    next('l');
                    next('l');
                    return null;
            }
            error('Unexpected "' + ch + '"');
        },
        value, // Placeholder for the value function.
        array = function() {
            // Parse an array value.
            var array = [];

            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    return array; // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error('Bad array');
        },
        object = function() {
            // Parse an object value.
            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    return object; // empty object
                }
                while (ch) {
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error('Bad object');
        };

    value = function() {
        // Parse a JSON value. It could be an object, an array, a string,
        // a number, or a word.
        white();
        switch (ch) {
            case '{':
                return object();
            case '[':
                return array();
            case '"':
                return string();
            case '-':
                return number();
            default:
                return ch >= '0' && ch <= '9' ? number() : word();
        }
    };

    // Return the json_parse function. It will have access to all of the
    // above functions and variables.
    return function(source) {
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error('Syntax error');
        }

        return result;
    };
})();

_.base64Encode = function(data) {
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data = _.utf8Encode(data);

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
            break;
        case 2:
            enc = enc.slice(0, -1) + '=';
            break;
    }

    return enc;
};

_.utf8Encode = function(string) {
    string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    var utftext = '',
        start,
        end;
    var stringl = 0,
        n;

    start = end = 0;
    stringl = string.length;

    for (n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if ((c1 > 127) && (c1 < 2048)) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
};

_.UUID = (function() {

    // Time/ticks information
    // 1*new Date() is a cross browser version of Date.now()
    var T = function() {
        var d = 1 * new Date(),
            i = 0;

        // this while loop figures how many browser ticks go by
        // before 1*new Date() returns a new number, ie the amount
        // of ticks that go by per millisecond
        while (d == 1 * new Date()) {
            i++;
        }

        return d.toString(16) + i.toString(16);
    };

    // Math.Random entropy
    var R = function() {
        return Math.random().toString(16).replace('.', '');
    };

    // User agent entropy
    // This function takes the user agent string, and then xors
    // together each sequence of 8 bytes.  This produces a final
    // sequence of 8 bytes which it returns as hex.
    var UA = function() {
        var ua = userAgent,
            i, ch, buffer = [],
            ret = 0;

        function xor(result, byte_array) {
            var j, tmp = 0;
            for (j = 0; j < byte_array.length; j++) {
                tmp |= (buffer[j] << j * 8);
            }
            return result ^ tmp;
        }

        for (i = 0; i < ua.length; i++) {
            ch = ua.charCodeAt(i);
            buffer.unshift(ch & 0xFF);
            if (buffer.length >= 4) {
                ret = xor(ret, buffer);
                buffer = [];
            }
        }

        if (buffer.length > 0) {
            ret = xor(ret, buffer);
        }

        return ret.toString(16);
    };

    return function() {
        var se = (screen.height * screen.width).toString(16);
        return (T() + '-' + R() + '-' + UA() + '-' + se + '-' + T());
    };
})();

// _.isBlockedUA()
// This is to block various web spiders from executing our JS and
// sending false tracking data
_.isBlockedUA = function(ua) {
    if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(ua)) {
        return true;
    }
    return false;
};

/**
 * @param {Object=} formdata
 * @param {string=} arg_separator
 */
_.HTTPBuildQuery = function(formdata, arg_separator) {
    var use_val, use_key, tmp_arr = [];

    if (_.isUndefined(arg_separator)) {
        arg_separator = '&';
    }

    _.each(formdata, function(val, key) {
        use_val = encodeURIComponent(val.toString());
        use_key = encodeURIComponent(key);
        tmp_arr[tmp_arr.length] = use_key + '=' + use_val;
    });

    return tmp_arr.join(arg_separator);
};

_.getQueryParam = function(url, param) {
    // Expects a raw URL

    param = param.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regexS = '[\\?&]' + param + '=([^&#]*)',
        regex = new RegExp(regexS),
        results = regex.exec(url);
    if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
        return '';
    } else {
        return decodeURIComponent(results[1]).replace(/\+/g, ' ');
    }
};

_.getHashParam = function(hash, param) {
    var matches = hash.match(new RegExp(param + '=([^&]*)'));
    return matches ? matches[1] : null;
};

// _.cookie
// Methods partially borrowed from quirksmode.org/js/cookies.html
_.cookie = {
    get: function(name) {
        var nameEQ = name + '=';
        var ca = document$1.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    },

    parse: function(name) {
        var cookie;
        try {
            cookie = _.JSONDecode(_.cookie.get(name)) || {};
        } catch (err) {
            // noop
        }
        return cookie;
    },

    set_seconds: function(name, value, seconds, cross_subdomain, is_secure) {
        var cdomain = '',
            expires = '',
            secure = '';

        if (cross_subdomain) {
            var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                domain = matches ? matches[0] : '';

            cdomain = ((domain) ? '; domain=.' + domain : '');
        }

        if (seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = '; expires=' + date.toGMTString();
        }

        if (is_secure) {
            secure = '; secure';
        }

        document$1.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
    },

    set: function(name, value, days, cross_subdomain, is_secure) {
        var cdomain = '', expires = '', secure = '';

        if (cross_subdomain) {
            var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                domain = matches ? matches[0] : '';

            cdomain   = ((domain) ? '; domain=.' + domain : '');
        }

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        }

        if (is_secure) {
            secure = '; secure';
        }

        var new_cookie_val = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
        document$1.cookie = new_cookie_val;
        return new_cookie_val;
    },

    remove: function(name, cross_subdomain) {
        _.cookie.set(name, '', -1, cross_subdomain);
    }
};

// _.localStorage
_.localStorage = {
    error: function(msg) {
        console$1.error('localStorage error: ' + msg);
    },

    get: function(name) {
        try {
            return window.localStorage.getItem(name);
        } catch (err) {
            _.localStorage.error(err);
        }
        return null;
    },

    parse: function(name) {
        try {
            return _.JSONDecode(_.localStorage.get(name)) || {};
        } catch (err) {
            // noop
        }
        return null;
    },

    set: function(name, value) {
        try {
            window.localStorage.setItem(name, value);
        } catch (err) {
            _.localStorage.error(err);
        }
    },

    remove: function(name) {
        try {
            window.localStorage.removeItem(name);
        } catch (err) {
            _.localStorage.error(err);
        }
    }
};

_.register_event = (function() {
    // written by Dean Edwards, 2005
    // with input from Tino Zijdel - crisp@xs4all.nl
    // with input from Carl Sverre - mail@carlsverre.com
    // with input from Mixpanel
    // http://dean.edwards.name/weblog/2005/10/add-event/
    // https://gist.github.com/1930440

    /**
     * @param {Object} element
     * @param {string} type
     * @param {function(...[*])} handler
     * @param {boolean=} oldSchool
     * @param {boolean=} useCapture
     */
    var register_event = function(element, type, handler, oldSchool, useCapture) {
        if (!element) {
            console$1.error('No valid element provided to register_event');
            return;
        }

        if (element.addEventListener && !oldSchool) {
            element.addEventListener(type, handler, !!useCapture);
        } else {
            var ontype = 'on' + type;
            var old_handler = element[ontype]; // can be undefined
            element[ontype] = makeHandler(element, handler, old_handler);
        }
    };

    function makeHandler(element, new_handler, old_handlers) {
        var handler = function(event) {
            event = event || fixEvent(window.event);

            // this basically happens in firefox whenever another script
            // overwrites the onload callback and doesn't pass the event
            // object to previously defined callbacks.  All the browsers
            // that don't define window.event implement addEventListener
            // so the dom_loaded handler will still be fired as usual.
            if (!event) {
                return undefined;
            }

            var ret = true;
            var old_result, new_result;

            if (_.isFunction(old_handlers)) {
                old_result = old_handlers(event);
            }
            new_result = new_handler.call(element, event);

            if ((false === old_result) || (false === new_result)) {
                ret = false;
            }

            return ret;
        };

        return handler;
    }

    function fixEvent(event) {
        if (event) {
            event.preventDefault = fixEvent.preventDefault;
            event.stopPropagation = fixEvent.stopPropagation;
        }
        return event;
    }
    fixEvent.preventDefault = function() {
        this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
        this.cancelBubble = true;
    };

    return register_event;
})();

_.dom_query = (function() {
    /* document.getElementsBySelector(selector)
    - returns an array of element objects from the current document
    matching the CSS selector. Selectors can contain element names,
    class names and ids and can be nested. For example:

    elements = document.getElementsBySelector('div#main p a.external')

    Will return an array of all 'a' elements with 'external' in their
    class attribute that are contained inside 'p' elements that are
    contained inside the 'div' element which has id="main"

    New in version 0.4: Support for CSS2 and CSS3 attribute selectors:
    See http://www.w3.org/TR/css3-selectors/#attribute-selectors

    Version 0.4 - Simon Willison, March 25th 2003
    -- Works in Phoenix 0.5, Mozilla 1.3, Opera 7, Internet Explorer 6, Internet Explorer 5 on Windows
    -- Opera 7 fails

    Version 0.5 - Carl Sverre, Jan 7th 2013
    -- Now uses jQuery-esque `hasClass` for testing class name
    equality.  This fixes a bug related to '-' characters being
    considered not part of a 'word' in regex.
    */

    function getAllChildren(e) {
        // Returns all children of element. Workaround required for IE5/Windows. Ugh.
        return e.all ? e.all : e.getElementsByTagName('*');
    }

    var bad_whitespace = /[\t\r\n]/g;

    function hasClass(elem, selector) {
        var className = ' ' + selector + ' ';
        return ((' ' + elem.className + ' ').replace(bad_whitespace, ' ').indexOf(className) >= 0);
    }

    function getElementsBySelector(selector) {
        // Attempt to fail gracefully in lesser browsers
        if (!document$1.getElementsByTagName) {
            return [];
        }
        // Split selector in to tokens
        var tokens = selector.split(' ');
        var token, bits, tagName, found, foundCount, i, j, k, elements, currentContextIndex;
        var currentContext = [document$1];
        for (i = 0; i < tokens.length; i++) {
            token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '');
            if (token.indexOf('#') > -1) {
                // Token is an ID selector
                bits = token.split('#');
                tagName = bits[0];
                var id = bits[1];
                var element = document$1.getElementById(id);
                if (!element || (tagName && element.nodeName.toLowerCase() != tagName)) {
                    // element not found or tag with that ID not found, return false
                    return [];
                }
                // Set currentContext to contain just this element
                currentContext = [element];
                continue; // Skip to next token
            }
            if (token.indexOf('.') > -1) {
                // Token contains a class selector
                bits = token.split('.');
                tagName = bits[0];
                var className = bits[1];
                if (!tagName) {
                    tagName = '*';
                }
                // Get elements matching tag, filter them for class selector
                found = [];
                foundCount = 0;
                for (j = 0; j < currentContext.length; j++) {
                    if (tagName == '*') {
                        elements = getAllChildren(currentContext[j]);
                    } else {
                        elements = currentContext[j].getElementsByTagName(tagName);
                    }
                    for (k = 0; k < elements.length; k++) {
                        found[foundCount++] = elements[k];
                    }
                }
                currentContext = [];
                currentContextIndex = 0;
                for (j = 0; j < found.length; j++) {
                    if (found[j].className &&
                        _.isString(found[j].className) && // some SVG elements have classNames which are not strings
                        hasClass(found[j], className)
                    ) {
                        currentContext[currentContextIndex++] = found[j];
                    }
                }
                continue; // Skip to next token
            }
            // Code to deal with attribute selectors
            var token_match = token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/);
            if (token_match) {
                tagName = token_match[1];
                var attrName = token_match[2];
                var attrOperator = token_match[3];
                var attrValue = token_match[4];
                if (!tagName) {
                    tagName = '*';
                }
                // Grab all of the tagName elements within current context
                found = [];
                foundCount = 0;
                for (j = 0; j < currentContext.length; j++) {
                    if (tagName == '*') {
                        elements = getAllChildren(currentContext[j]);
                    } else {
                        elements = currentContext[j].getElementsByTagName(tagName);
                    }
                    for (k = 0; k < elements.length; k++) {
                        found[foundCount++] = elements[k];
                    }
                }
                currentContext = [];
                currentContextIndex = 0;
                var checkFunction; // This function will be used to filter the elements
                switch (attrOperator) {
                    case '=': // Equality
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName) == attrValue);
                        };
                        break;
                    case '~': // Match one of space seperated words
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).match(new RegExp('\\b' + attrValue + '\\b')));
                        };
                        break;
                    case '|': // Match start with value followed by optional hyphen
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?')));
                        };
                        break;
                    case '^': // Match starts with value
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).indexOf(attrValue) === 0);
                        };
                        break;
                    case '$': // Match ends with value - fails with "Warning" in Opera 7
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length);
                        };
                        break;
                    case '*': // Match ends with value
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).indexOf(attrValue) > -1);
                        };
                        break;
                    default:
                        // Just test for existence of attribute
                        checkFunction = function(e) {
                            return e.getAttribute(attrName);
                        };
                }
                currentContext = [];
                currentContextIndex = 0;
                for (j = 0; j < found.length; j++) {
                    if (checkFunction(found[j])) {
                        currentContext[currentContextIndex++] = found[j];
                    }
                }
                // alert('Attribute Selector: '+tagName+' '+attrName+' '+attrOperator+' '+attrValue);
                continue; // Skip to next token
            }
            // If we get here, token is JUST an element (not a class or ID selector)
            tagName = token;
            found = [];
            foundCount = 0;
            for (j = 0; j < currentContext.length; j++) {
                elements = currentContext[j].getElementsByTagName(tagName);
                for (k = 0; k < elements.length; k++) {
                    found[foundCount++] = elements[k];
                }
            }
            currentContext = found;
        }
        return currentContext;
    }

    return function(query) {
        if (_.isElement(query)) {
            return [query];
        } else if (_.isObject(query) && !_.isUndefined(query.length)) {
            return query;
        } else {
            return getElementsBySelector.call(this, query);
        }
    };
})();

_.info = {
    campaignParams: function() {
        var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
            kw = '',
            params = {};
        _.each(campaign_keywords, function(kwkey) {
            kw = _.getQueryParam(document$1.URL, kwkey);
            if (kw.length) {
                params[kwkey] = kw;
            }
        });

        return params;
    },

    searchEngine: function(referrer) {
        if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
            return 'google';
        } else if (referrer.search('https?://(.*)bing.com') === 0) {
            return 'bing';
        } else if (referrer.search('https?://(.*)yahoo.com') === 0) {
            return 'yahoo';
        } else if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
            return 'duckduckgo';
        } else {
            return null;
        }
    },

    searchInfo: function(referrer) {
        var search = _.info.searchEngine(referrer),
            param = (search != 'yahoo') ? 'q' : 'p',
            ret = {};

        if (search !== null) {
            ret['$search_engine'] = search;

            var keyword = _.getQueryParam(referrer, param);
            if (keyword.length) {
                ret['mp_keyword'] = keyword;
            }
        }

        return ret;
    },

    /**
     * This function detects which browser is running this script.
     * The order of the checks are important since many user agents
     * include key words used in later checks.
     */
    browser: function(user_agent, vendor, opera) {
        vendor = vendor || ''; // vendor is undefined for at least IE9
        if (opera || _.includes(user_agent, ' OPR/')) {
            if (_.includes(user_agent, 'Mini')) {
                return 'Opera Mini';
            }
            return 'Opera';
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
            return 'BlackBerry';
        } else if (_.includes(user_agent, 'IEMobile') || _.includes(user_agent, 'WPDesktop')) {
            return 'Internet Explorer Mobile';
        } else if (_.includes(user_agent, 'Edge')) {
            return 'Microsoft Edge';
        } else if (_.includes(user_agent, 'FBIOS')) {
            return 'Facebook Mobile';
        } else if (_.includes(user_agent, 'Chrome')) {
            return 'Chrome';
        } else if (_.includes(user_agent, 'CriOS')) {
            return 'Chrome iOS';
        } else if (_.includes(user_agent, 'UCWEB') || _.includes(user_agent, 'UCBrowser')) {
            return 'UC Browser';
        } else if (_.includes(user_agent, 'FxiOS')) {
            return 'Firefox iOS';
        } else if (_.includes(vendor, 'Apple')) {
            if (_.includes(user_agent, 'Mobile')) {
                return 'Mobile Safari';
            }
            return 'Safari';
        } else if (_.includes(user_agent, 'Android')) {
            return 'Android Mobile';
        } else if (_.includes(user_agent, 'Konqueror')) {
            return 'Konqueror';
        } else if (_.includes(user_agent, 'Firefox')) {
            return 'Firefox';
        } else if (_.includes(user_agent, 'MSIE') || _.includes(user_agent, 'Trident/')) {
            return 'Internet Explorer';
        } else if (_.includes(user_agent, 'Gecko')) {
            return 'Mozilla';
        } else {
            return '';
        }
    },

    /**
     * This function detects which browser version is running this script,
     * parsing major and minor version (e.g., 42.1). User agent strings from:
     * http://www.useragentstring.com/pages/useragentstring.php
     */
    browserVersion: function(userAgent, vendor, opera) {
        var browser = _.info.browser(userAgent, vendor, opera);
        var versionRegexs = {
            'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
            'Microsoft Edge': /Edge\/(\d+(\.\d+)?)/,
            'Chrome': /Chrome\/(\d+(\.\d+)?)/,
            'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
            'UC Browser' : /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
            'Safari': /Version\/(\d+(\.\d+)?)/,
            'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
            'Opera': /(Opera|OPR)\/(\d+(\.\d+)?)/,
            'Firefox': /Firefox\/(\d+(\.\d+)?)/,
            'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
            'Konqueror': /Konqueror:(\d+(\.\d+)?)/,
            'BlackBerry': /BlackBerry (\d+(\.\d+)?)/,
            'Android Mobile': /android\s(\d+(\.\d+)?)/,
            'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
            'Mozilla': /rv:(\d+(\.\d+)?)/
        };
        var regex = versionRegexs[browser];
        if (regex === undefined) {
            return null;
        }
        var matches = userAgent.match(regex);
        if (!matches) {
            return null;
        }
        return parseFloat(matches[matches.length - 2]);
    },

    os: function() {
        var a = userAgent;
        if (/Windows/i.test(a)) {
            if (/Phone/.test(a) || /WPDesktop/.test(a)) {
                return 'Windows Phone';
            }
            return 'Windows';
        } else if (/(iPhone|iPad|iPod)/.test(a)) {
            return 'iOS';
        } else if (/Android/.test(a)) {
            return 'Android';
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
            return 'BlackBerry';
        } else if (/Mac/i.test(a)) {
            return 'Mac OS X';
        } else if (/Linux/.test(a)) {
            return 'Linux';
        } else {
            return '';
        }
    },

    device: function(user_agent) {
        if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
            return 'Windows Phone';
        } else if (/iPad/.test(user_agent)) {
            return 'iPad';
        } else if (/iPod/.test(user_agent)) {
            return 'iPod Touch';
        } else if (/iPhone/.test(user_agent)) {
            return 'iPhone';
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
            return 'BlackBerry';
        } else if (/Android/.test(user_agent)) {
            return 'Android';
        } else {
            return '';
        }
    },

    referringDomain: function(referrer) {
        var split = referrer.split('/');
        if (split.length >= 3) {
            return split[2];
        }
        return '';
    },

    properties: function() {
        return _.extend(_.strip_empty_properties({
            '$os': _.info.os(),
            '$browser': _.info.browser(userAgent, navigator$1.vendor, window.opera),
            '$referrer': document$1.referrer,
            '$referring_domain': _.info.referringDomain(document$1.referrer),
            '$device': _.info.device(userAgent)
        }), {
            '$current_url': window.location.href,
            '$browser_version': _.info.browserVersion(userAgent, navigator$1.vendor, window.opera),
            '$screen_height': screen.height,
            '$screen_width': screen.width,
            'mp_lib': 'web',
            '$lib_version': Config.LIB_VERSION
        });
    },

    people_properties: function() {
        return _.extend(_.strip_empty_properties({
            '$os': _.info.os(),
            '$browser': _.info.browser(userAgent, navigator$1.vendor, window.opera)
        }), {
            '$browser_version': _.info.browserVersion(userAgent, navigator$1.vendor, window.opera)
        });
    },

    pageviewInfo: function(page) {
        return _.strip_empty_properties({
            'mp_page': page,
            'mp_referrer': document$1.referrer,
            'mp_browser': _.info.browser(userAgent, navigator$1.vendor, window.opera),
            'mp_platform': _.info.os()
        });
    }
};

// EXPORTS (for closure compiler)
_['toArray']            = _.toArray;
_['isObject']           = _.isObject;
_['JSONEncode']         = _.JSONEncode;
_['JSONDecode']         = _.JSONDecode;
_['isBlockedUA']        = _.isBlockedUA;
_['isEmptyObject']      = _.isEmptyObject;
_['info']               = _.info;
_['info']['device']     = _.info.device;
_['info']['browser']    = _.info.browser;
_['info']['properties'] = _.info.properties;

// specifying these locally here since some websites override the global Node var
// ex: https://www.codingame.com/
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;

var autotrack = {
    _initializedTokens: [],

    _previousElementSibling: function(el) {
        if (el.previousElementSibling) {
            return el.previousElementSibling;
        } else {
            do {
                el = el.previousSibling;
            } while (el && el.nodeType !== ELEMENT_NODE);
            return el;
        }
    },

    _loadScript: function(scriptUrlToLoad, callback) {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = scriptUrlToLoad;
        scriptTag.onload = callback;

        var scripts = document.getElementsByTagName('script');
        if (scripts.length > 0) {
            scripts[0].parentNode.insertBefore(scriptTag, scripts[0]);
        } else {
            document.body.appendChild(scriptTag);
        }
    },

    _getClassName: function(elem) {
        switch(typeof elem.className) {
            case 'string':
                return elem.className;
            case 'object': // handle cases where className might be SVGAnimatedString or some other type
                return elem.className.baseVal || elem.getAttribute('class') || '';
            default: // future proof
                return '';
        }
    },

    _getPropertiesFromElement: function(elem) {
        var props = {
            'classes': this._getClassName(elem).split(' '),
            'tag_name': elem.tagName.toLowerCase()
        };

        if (_.includes(['input', 'select', 'textarea'], elem.tagName.toLowerCase())) {
            var formFieldValue = this._getFormFieldValue(elem);
            if (this._includeProperty(elem, formFieldValue)) {
                props['value'] = formFieldValue;
            }
        }

        _.each(elem.attributes, function(attr) {
            props['attr__' + attr.name] = attr.value;
        });

        var nthChild = 1;
        var nthOfType = 1;
        var currentElem = elem;
        while (currentElem = this._previousElementSibling(currentElem)) { // eslint-disable-line no-cond-assign
            nthChild++;
            if (currentElem.tagName === elem.tagName) {
                nthOfType++;
            }
        }
        props['nth_child'] = nthChild;
        props['nth_of_type'] = nthOfType;

        return props;
    },

    /*
     * Due to potential reference discrepancies (such as the webcomponents.js polyfill)
     * We want to match tagNames instead of specific reference because something like element === document.body
     * won't always work because element might not be a native element.
     */
    _isTag: function(el, tag) {
        return el && el.tagName && el.tagName.toLowerCase() === tag.toLowerCase();
    },

    _shouldTrackDomEvent: function(element, event) {
        if (!element || this._isTag(element, 'html') || element.nodeType !== ELEMENT_NODE) {
            return false;
        }
        var tag = element.tagName.toLowerCase();
        switch (tag) {
            case 'html':
                return false;
            case 'form':
                return event.type === 'submit';
            case 'input':
                if (['button', 'submit'].indexOf(element.getAttribute('type')) === -1) {
                    return event.type === 'change';
                } else {
                    return event.type === 'click';
                }
            case 'select':
            case 'textarea':
                return event.type === 'change';
            default:
                return event.type === 'click';
        }
    },

    _getDefaultProperties: function(eventType) {
        return {
            '$event_type': eventType,
            '$ce_version': 1,
            '$host': window.location.host,
            '$pathname': window.location.pathname
        };
    },

    _getInputValue: function(input) {
        var value = null;
        var type = input.type.toLowerCase();
        switch(type) {
            case 'checkbox':
                if (input.checked) {
                    value = [input.value];
                }
                break;
            case 'radio':
                if (input.checked) {
                    value = input.value;
                }
                break;
            default:
                value = input.value;
                break;
        }
        return value;
    },

    _getSelectValue: function(select) {
        var value;
        if (select.multiple) {
            var values = [];
            _.each(select.querySelectorAll('[selected]'), function(option) {
                values.push(option.value);
            });
            value = values;
        } else {
            value = select.value;
        }
        return value;
    },

    _includeProperty: function(input, value) {
        for (var curEl = input; curEl.parentNode && !this._isTag(curEl, 'body'); curEl = curEl.parentNode) {
            var classes = this._getClassName(curEl).split(' ');
            if (_.includes(classes, 'mp-sensitive') || _.includes(classes, 'mp-no-track')) {
                return false;
            }
        }

        if (_.includes(this._getClassName(input).split(' '), 'mp-include')) {
            return true;
        }

        if (value === null) {
            return false;
        }

        // don't include hidden or password fields
        var type = input.type || '';
        switch(type.toLowerCase()) {
            case 'hidden':
                return false;
            case 'password':
                return false;
        }

        // filter out data from fields that look like sensitive fields
        var name = input.name || input.id || '';
        var sensitiveNameRegex = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|seccode|securitycode|securitynum|socialsec|socsec|ssn/i;
        if (sensitiveNameRegex.test(name.replace(/[^a-zA-Z0-9]/g, ''))) {
            return false;
        }

        if (typeof value === 'string') {
            // check to see if input value looks like a credit card number
            // see: https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s20.html
            var ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
            if (ccRegex.test((value || '').replace(/[\- ]/g, ''))) {
                return false;
            }

            // check to see if input value looks like a social security number
            var ssnRegex = /(^\d{3}-?\d{2}-?\d{4}$)/;
            if (ssnRegex.test(value)) {
                return false;
            }
        }

        return true;
    },

    _getFormFieldValue: function(field) {
        var val;
        switch(field.tagName.toLowerCase()) {
            case 'input':
                val = this._getInputValue(field);
                break;
            case 'select':
                val = this._getSelectValue(field);
                break;
            default:
                val = field.value || field.textContent;
                break;
        }
        return this._includeProperty(field, val) ? val : null;
    },

    _getFormFieldProperties: function(form) {
        var formFieldProps = {};
        _.each(form.elements, function(field) {
            var name = field.getAttribute('name') || field.getAttribute('id');
            if (name !== null) {
                name = '$form_field__' + name;
                var val = this._getFormFieldValue(field);
                if (this._includeProperty(field, val)) {
                    var prevFieldVal = formFieldProps[name];
                    if (prevFieldVal !== undefined) { // combine values for inputs of same name
                        formFieldProps[name] = [].concat(prevFieldVal, val);
                    } else {
                        formFieldProps[name] = val;
                    }
                }
            }
        }, this);
        return formFieldProps;
    },

    _extractCustomPropertyValue: function(customProperty) {
        var propValues = [];
        _.each(document.querySelectorAll(customProperty['css_selector']), function(matchedElem) {
            if (['input', 'select'].indexOf(matchedElem.tagName.toLowerCase()) > -1) {
                propValues.push(matchedElem['value']);
            } else if (matchedElem['textContent']) {
                propValues.push(matchedElem['textContent']);
            }
        });
        return propValues.join(', ');
    },

    _getCustomProperties: function(targetElementList) {
        var props = {};
        _.each(this._customProperties, function(customProperty) {
            _.each(customProperty['event_selectors'], function(eventSelector) {
                var eventElements = document.querySelectorAll(eventSelector);
                _.each(eventElements, function(eventElement) {
                    if (_.includes(targetElementList, eventElement)) {
                        props[customProperty['name']] = this._extractCustomPropertyValue(customProperty);
                    }
                }, this);
            }, this);
        }, this);
        return props;
    },

    _getEventTarget: function(e) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
        if (typeof e.target === 'undefined') {
            return e.srcElement;
        } else {
            return e.target;
        }
    },

    _trackEvent: function(e, instance) {
        /*** Don't mess with this code without running IE8 tests on it ***/
        var target = this._getEventTarget(e);
        if (target.nodeType === TEXT_NODE) { // defeat Safari bug (see: http://www.quirksmode.org/js/events_properties.html)
            target = target.parentNode;
        }

        if (this._shouldTrackDomEvent(target, e)) {
            var targetElementList = [target];
            var curEl = target;
            while (curEl.parentNode && !this._isTag(curEl, 'body')) {
                targetElementList.push(curEl.parentNode);
                curEl = curEl.parentNode;
            }

            var elementsJson = [];
            var href, elementText, form, explicitNoTrack = false;
            _.each(targetElementList, function(el, idx) {
                // if the element or a parent element is an anchor tag
                // include the href as a property
                if (el.tagName.toLowerCase() === 'a') {
                    href = el.getAttribute('href');
                } else if (el.tagName.toLowerCase() === 'form') {
                    form = el;
                }
                // crawl up to max of 5 nodes to populate text content
                if (!elementText && idx < 5 && el.textContent) {
                    var textContent = _.trim(el.textContent);
                    if (textContent) {
                        elementText = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
                    }
                }

                // allow users to programatically prevent tracking of elements by adding class 'mp-no-track'
                var classes = this._getClassName(el).split(' ');
                if (_.includes(classes, 'mp-no-track')) {
                    explicitNoTrack = true;
                }

                elementsJson.push(this._getPropertiesFromElement(el));
            }, this);

            if (explicitNoTrack) {
                return false;
            }

            var props = _.extend(
                this._getDefaultProperties(e.type),
                {
                    '$elements':  elementsJson,
                    '$el_attr__href': href,
                    '$el_text': elementText
                },
                this._getCustomProperties(targetElementList)
            );

            if (form && (e.type === 'submit' || e.type === 'click')) {
                _.extend(props, this._getFormFieldProperties(form));
            }
            instance.track('$web_event', props);
            return true;
        }
    },

    // only reason is to stub for unit tests
    // since you can't override window.location props
    _navigate: function(href) {
        window.location.href = href;
    },

    _addDomEventHandlers: function(instance) {
        var handler = _.bind(function(e) {
            e = e || window.event;
            this._trackEvent(e, instance);
        }, this);
        _.register_event(document, 'submit', handler, false, true);
        _.register_event(document, 'change', handler, false, true);
        _.register_event(document, 'click', handler, false, true);
    },

    _customProperties: {},
    init: function(instance) {
        if (!(document && document.body)) {
            console.log('document not ready yet, trying again in 500 milliseconds...');
            var that = this;
            setTimeout(function() { that.init(instance); }, 500);
            return;
        }

        var token = instance.get_config('token');
        if (this._initializedTokens.indexOf(token) > -1) {
            console.log('autotrack already initialized for token "' + token + '"');
            return;
        }
        this._initializedTokens.push(token);

        if (!this._maybeLoadEditor(instance)) { // don't autotrack actions when the editor is enabled
            var parseDecideResponse = _.bind(function(response) {
                if (response && response['config'] && response['config']['enable_collect_everything'] === true) {

                    if (response['custom_properties']) {
                        this._customProperties = response['custom_properties'];
                    }

                    instance.track('$web_event', _.extend({
                        '$title': document.title
                    }, this._getDefaultProperties('pageview')));

                    this._addDomEventHandlers(instance);

                } else {
                    instance['__autotrack_enabled'] = false;
                }
            }, this);

            instance._send_request(
                instance.get_config('decide_host') + '/decide/', {
                    'verbose': true,
                    'version': '1',
                    'lib': 'web',
                    'token': token
                },
                instance._prepare_callback(parseDecideResponse)
            );
        }
    },

    _editorParamsFromHash: function(instance, hash) {
        var editorParams;
        try {
            var state = _.getHashParam(hash, 'state');
            state = JSON.parse(decodeURIComponent(state));
            var expiresInSeconds = _.getHashParam(hash, 'expires_in');
            editorParams = {
                'accessToken': _.getHashParam(hash, 'access_token'),
                'accessTokenExpiresAt': (new Date()).getTime() + (Number(expiresInSeconds) * 1000),
                'bookmarkletMode': !!state['bookmarkletMode'],
                'projectId': state['projectId'],
                'projectOwnerId': state['projectOwnerId'],
                'projectToken': state['token'],
                'readOnly': state['readOnly'],
                'userFlags': state['userFlags'],
                'userId': state['userId']
            };
            window.sessionStorage.setItem('editorParams', JSON.stringify(editorParams));

            if (state['desiredHash']) {
                window.location.hash = state['desiredHash'];
            } else if (window.history) {
                history.replaceState('', document.title, window.location.pathname + window.location.search); // completely remove hash
            } else {
                window.location.hash = ''; // clear hash (but leaves # unfortunately)
            }
        } catch (e) {
            console.error('Unable to parse data from hash', e);
        }
        return editorParams;
    },

    /**
     * To load the visual editor, we need an access token and other state. That state comes from one of three places:
     * 1. In the URL hash params if the customer is using an old snippet
     * 2. From session storage under the key `_mpcehash` if the snippet already parsed the hash
     * 3. From session storage under the key `editorParams` if the editor was initialized on a previous page
     */
    _maybeLoadEditor: function(instance) {
        try {
            var parseFromUrl = false;
            if (_.getHashParam(window.location.hash, 'state')) {
                var state = _.getHashParam(window.location.hash, 'state');
                state = JSON.parse(decodeURIComponent(state));
                parseFromUrl = state['action'] === 'mpeditor';
            }
            var parseFromStorage = !!window.sessionStorage.getItem('_mpcehash');
            var editorParams;

            if (parseFromUrl) { // happens if they are initializing the editor using an old snippet
                editorParams = this._editorParamsFromHash(instance, window.location.hash);
            } else if (parseFromStorage) { // happens if they are initialized the editor and using the new snippet
                editorParams = this._editorParamsFromHash(instance, window.sessionStorage.getItem('_mpcehash'));
                window.sessionStorage.removeItem('_mpcehash');
            } else { // get credentials from sessionStorage from a previous initialzation
                editorParams = JSON.parse(window.sessionStorage.getItem('editorParams') || '{}');
            }

            if (editorParams['projectToken'] && instance.get_config('token') === editorParams['projectToken']) {
                this._loadEditor(instance, editorParams);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    },

    _loadEditor: function(instance, editorParams) {
        if (!window['_mpEditorLoaded']) { // only load the codeless event editor once, even if there are multiple instances of MixpanelLib
            window['_mpEditorLoaded'] = true;
            var editorUrl;
            var cacheBuster = '?_ts=' + (new Date()).getTime();
            var siteMedia = instance.get_config('app_host') + '/site_media';
            if (Config.DEBUG) {
                editorUrl = siteMedia + '/compiled/reports/collect-everything/editor.js' + cacheBuster;
            } else {
                editorUrl = siteMedia + '/bundle-webpack/reports/collect-everything/editor.min.js' + cacheBuster;
            }
            this._loadScript(editorUrl, function() {
                window['mp_load_editor'](editorParams);
            });
            return true;
        }
        return false;
    },

    // this is a mechanism to ramp up CE with no server-side interaction.
    // when CE is active, every page load results in a decide request. we
    // need to gently ramp this up so we don't overload decide. this decides
    // deterministically if CE is enabled for this project by modding the char
    // value of the project token.
    enabledForProject: function(token, numBuckets, numEnabledBuckets) {
        numBuckets = !_.isUndefined(numBuckets) ? numBuckets : 10;
        numEnabledBuckets = !_.isUndefined(numEnabledBuckets) ? numEnabledBuckets : 10;
        var charCodeSum = 0;
        for (var i = 0; i < token.length; i++) {
            charCodeSum += token.charCodeAt(i);
        }
        return (charCodeSum % numBuckets) < numEnabledBuckets;
    },

    isBrowserSupported: function() {
        return _.isFunction(document.querySelectorAll);
    }
};

_.bind_instance_methods(autotrack);
_.safewrap_instance_methods(autotrack);

/*
 * Mixpanel JS Library
 *
 * Copyright 2012, Mixpanel, Inc. All Rights Reserved
 * http://mixpanel.com/
 *
 * Includes portions of Underscore.js
 * http://documentcloud.github.com/underscore/
 * (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
 * Released under the MIT License.
 */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name mixpanel-2.8.min.js
// ==/ClosureCompiler==

/*
SIMPLE STYLE GUIDE:

this.x === public function
this._x === internal - only use within this file
this.__x === private - only use within the class

Globals should be all caps
*/

var init_type;       // MODULE or SNIPPET loader
var mixpanel_master; // main mixpanel instance / object
var INIT_MODULE  = 0;
var INIT_SNIPPET = 1;

/*
 * Constants
 */
/** @const */   var PRIMARY_INSTANCE_NAME     = 'mixpanel';
/** @const */   var SET_QUEUE_KEY             = '__mps';
/** @const */   var SET_ONCE_QUEUE_KEY        = '__mpso';
/** @const */   var ADD_QUEUE_KEY             = '__mpa';
/** @const */   var APPEND_QUEUE_KEY          = '__mpap';
/** @const */   var UNION_QUEUE_KEY           = '__mpu';
/** @const */   var SET_ACTION                = '$set';
/** @const */   var SET_ONCE_ACTION           = '$set_once';
/** @const */   var ADD_ACTION                = '$add';
/** @const */   var APPEND_ACTION             = '$append';
/** @const */   var UNION_ACTION              = '$union';
// This key is deprecated, but we want to check for it to see whether aliasing is allowed.
/** @const */   var PEOPLE_DISTINCT_ID_KEY    = '$people_distinct_id';
/** @const */   var ALIAS_ID_KEY              = '__alias';
/** @const */   var CAMPAIGN_IDS_KEY          = '__cmpns';
/** @const */   var EVENT_TIMERS_KEY          = '__timers';
/** @const */   var RESERVED_PROPERTIES       = [
    SET_QUEUE_KEY,
    SET_ONCE_QUEUE_KEY,
    ADD_QUEUE_KEY,
    APPEND_QUEUE_KEY,
    UNION_QUEUE_KEY,
    PEOPLE_DISTINCT_ID_KEY,
    ALIAS_ID_KEY,
    CAMPAIGN_IDS_KEY,
    EVENT_TIMERS_KEY
];

/*
 * Dynamic... constants? Is that an oxymoron?
 */
var HTTP_PROTOCOL = (('https:' === document.location.protocol) ? 'https://' : 'http://');

    // http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
    // https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#withCredentials
var USE_XHR = (window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest());

    // IE<10 does not support cross-origin XHR's but script tags
    // with defer won't block window.onload; ENQUEUE_REQUESTS
    // should only be true for Opera<12
var ENQUEUE_REQUESTS = !USE_XHR && (userAgent.indexOf('MSIE') === -1) && (userAgent.indexOf('Mozilla') === -1);

/*
 * Module-level globals
 */
var DEFAULT_CONFIG = {
    'api_host':               HTTP_PROTOCOL + 'api.mixpanel.com',
    'app_host':               HTTP_PROTOCOL + 'mixpanel.com',
    'autotrack':              true,
    'cdn':                    HTTP_PROTOCOL + 'cdn.mxpnl.com',
    'cross_subdomain_cookie': true,
    'persistence':            'cookie',
    'persistence_name':       '',
    'cookie_name':            '',
    'loaded':                 function() {},
    'store_google':           true,
    'save_referrer':          true,
    'test':                   false,
    'verbose':                false,
    'img':                    false,
    'track_pageview':         true,
    'debug':                  false,
    'track_links_timeout':    300,
    'cookie_expiration':      365,
    'upgrade':                false,
    'disable_persistence':    false,
    'disable_cookie':         false,
    'secure_cookie':          false,
    'ip':                     true,
    'property_blacklist':     []
};
DEFAULT_CONFIG['decide_host'] = DEFAULT_CONFIG['api_host'];

var DOM_LOADED = false;

/**
 * DomTracker Object
 * @constructor
 */
var DomTracker = function() {};

// interface
DomTracker.prototype.create_properties = function() {};
DomTracker.prototype.event_handler = function() {};
DomTracker.prototype.after_track_handler = function() {};

DomTracker.prototype.init = function(mixpanel_instance) {
    this.mp = mixpanel_instance;
    return this;
};

/**
 * @param {Object|string} query
 * @param {string} event_name
 * @param {Object=} properties
 * @param {function(...[*])=} user_callback
 */
DomTracker.prototype.track = function(query, event_name, properties, user_callback) {
    var that = this;
    var elements = _.dom_query(query);

    if (elements.length === 0) {
        console$1.error('The DOM query (' + query + ') returned 0 elements');
        return;
    }

    _.each(elements, function(element) {
        _.register_event(element, this.override_event, function(e) {
            var options = {};
            var props = that.create_properties(properties, this);
            var timeout = that.mp.get_config('track_links_timeout');

            that.event_handler(e, this, options);

            // in case the mixpanel servers don't get back to us in time
            window.setTimeout(that.track_callback(user_callback, props, options, true), timeout);

            // fire the tracking event
            that.mp.track(event_name, props, that.track_callback(user_callback, props, options));
        });
    }, this);

    return true;
};

/**
 * @param {function(...[*])} user_callback
 * @param {Object} props
 * @param {boolean=} timeout_occured
 */
DomTracker.prototype.track_callback = function(user_callback, props, options, timeout_occured) {
    timeout_occured = timeout_occured || false;
    var that = this;

    return function() {
        // options is referenced from both callbacks, so we can have
        // a 'lock' of sorts to ensure only one fires
        if (options.callback_fired) { return; }
        options.callback_fired = true;

        if (user_callback && user_callback(timeout_occured, props) === false) {
            // user can prevent the default functionality by
            // returning false from their callback
            return;
        }

        that.after_track_handler(props, options, timeout_occured);
    };
};

DomTracker.prototype.create_properties = function(properties, element) {
    var props;

    if (typeof(properties) === 'function') {
        props = properties(element);
    } else {
        props = _.extend({}, properties);
    }

    return props;
};

/**
 * LinkTracker Object
 * @constructor
 * @extends DomTracker
 */
var LinkTracker = function() {
    this.override_event = 'click';
};
_.inherit(LinkTracker, DomTracker);

LinkTracker.prototype.create_properties = function(properties, element) {
    var props = LinkTracker.superclass.create_properties.apply(this, arguments);

    if (element.href) { props['url'] = element.href; }

    return props;
};

LinkTracker.prototype.event_handler = function(evt, element, options) {
    options.new_tab = (
        evt.which === 2 ||
        evt.metaKey ||
        evt.ctrlKey ||
        element.target === '_blank'
    );
    options.href = element.href;

    if (!options.new_tab) {
        evt.preventDefault();
    }
};

LinkTracker.prototype.after_track_handler = function(props, options) {
    if (options.new_tab) { return; }

    setTimeout(function() {
        window.location = options.href;
    }, 0);
};

/**
 * FormTracker Object
 * @constructor
 * @extends DomTracker
 */
var FormTracker = function() {
    this.override_event = 'submit';
};
_.inherit(FormTracker, DomTracker);

FormTracker.prototype.event_handler = function(evt, element, options) {
    options.element = element;
    evt.preventDefault();
};

FormTracker.prototype.after_track_handler = function(props, options) {
    setTimeout(function() {
        options.element.submit();
    }, 0);
};

/**
 * Mixpanel Persistence Object
 * @constructor
 */
var MixpanelPersistence = function(config) {
    this['props'] = {};
    this.campaign_params_saved = false;

    if (config['persistence_name']) {
        this.name = 'mp_' + config['persistence_name'];
    } else {
        this.name = 'mp_' + config['token'] + '_mixpanel';
    }

    var storage_type = config['persistence'];
    if (storage_type !== 'cookie' && storage_type !== 'localStorage') {
        console$1.critical('Unknown persistence type ' + storage_type + '; falling back to cookie');
        storage_type = config['persistence'] = 'cookie';
    }

    var localStorage_supported = function() {
        var supported = true;
        try {
            var key = '__mplssupport__',
                val = 'xyz';
            _.localStorage.set(key, val);
            if (_.localStorage.get(key) !== val) {
                supported = false;
            }
            _.localStorage.remove(key);
        } catch (err) {
            supported = false;
        }
        if (!supported) {
            console$1.error('localStorage unsupported; falling back to cookie store');
        }
        return supported;
    };
    if (storage_type === 'localStorage' && localStorage_supported()) {
        this.storage = _.localStorage;
    } else {
        this.storage = _.cookie;
    }

    this.load();
    this.update_config(config);
    this.upgrade(config);
    this.save();
};

MixpanelPersistence.prototype.properties = function() {
    var p = {};
    // Filter out reserved properties
    _.each(this['props'], function(v, k) {
        if (!_.include(RESERVED_PROPERTIES, k)) {
            p[k] = v;
        }
    });
    return p;
};

MixpanelPersistence.prototype.load = function() {
    if (this.disabled) { return; }

    var entry = this.storage.parse(this.name);

    if (entry) {
        this['props'] = _.extend({}, entry);
    }
};

MixpanelPersistence.prototype.upgrade = function(config) {
    var upgrade_from_old_lib = config['upgrade'],
        old_cookie_name,
        old_cookie;

    if (upgrade_from_old_lib) {
        old_cookie_name = 'mp_super_properties';
        // Case where they had a custom cookie name before.
        if (typeof(upgrade_from_old_lib) === 'string') {
            old_cookie_name = upgrade_from_old_lib;
        }

        old_cookie = this.storage.parse(old_cookie_name);

        // remove the cookie
        this.storage.remove(old_cookie_name);
        this.storage.remove(old_cookie_name, true);

        if (old_cookie) {
            this['props'] = _.extend(
                this['props'],
                old_cookie['all'],
                old_cookie['events']
            );
        }
    }

    if (!config['cookie_name'] && config['name'] !== 'mixpanel') {
        // special case to handle people with cookies of the form
        // mp_TOKEN_INSTANCENAME from the first release of this library
        old_cookie_name = 'mp_' + config['token'] + '_' + config['name'];
        old_cookie = this.storage.parse(old_cookie_name);

        if (old_cookie) {
            this.storage.remove(old_cookie_name);
            this.storage.remove(old_cookie_name, true);

            // Save the prop values that were in the cookie from before -
            // this should only happen once as we delete the old one.
            this.register_once(old_cookie);
        }
    }

    if (this.storage === _.localStorage) {
        old_cookie = _.cookie.parse(this.name);

        _.cookie.remove(this.name);
        _.cookie.remove(this.name, true);

        if (old_cookie) {
            this.register_once(old_cookie);
        }
    }
};

MixpanelPersistence.prototype.save = function() {
    if (this.disabled) { return; }
    this._expire_notification_campaigns();
    this.storage.set(
        this.name,
        _.JSONEncode(this['props']),
        this.expire_days,
        this.cross_subdomain,
        this.secure
    );
};

MixpanelPersistence.prototype.remove = function() {
    // remove both domain and subdomain cookies
    this.storage.remove(this.name, false);
    this.storage.remove(this.name, true);
};

// removes the storage entry and deletes all loaded data
// forced name for tests
MixpanelPersistence.prototype.clear = function() {
    this.remove();
    this['props'] = {};
};

/**
 * @param {Object} props
 * @param {*=} default_value
 * @param {number=} days
 */
MixpanelPersistence.prototype.register_once = function(props, default_value, days) {
    if (_.isObject(props)) {
        if (typeof(default_value) === 'undefined') { default_value = 'None'; }
        this.expire_days = (typeof(days) === 'undefined') ? this.default_expiry : days;

        _.each(props, function(val, prop) {
            if (!this['props'][prop] || this['props'][prop] === default_value) {
                this['props'][prop] = val;
            }
        }, this);

        this.save();

        return true;
    }
    return false;
};

/**
 * @param {Object} props
 * @param {number=} days
 */
MixpanelPersistence.prototype.register = function(props, days) {
    if (_.isObject(props)) {
        this.expire_days = (typeof(days) === 'undefined') ? this.default_expiry : days;

        _.extend(this['props'], props);

        this.save();

        return true;
    }
    return false;
};

MixpanelPersistence.prototype.unregister = function(prop) {
    if (prop in this['props']) {
        delete this['props'][prop];
        this.save();
    }
};

MixpanelPersistence.prototype._expire_notification_campaigns = _.safewrap(function() {
    var campaigns_shown = this['props'][CAMPAIGN_IDS_KEY],
        EXPIRY_TIME = Config.DEBUG ? 60 * 1000 : 60 * 60 * 1000; // 1 minute (Config.DEBUG) / 1 hour (PDXN)
    if (!campaigns_shown) {
        return;
    }
    for (var campaign_id in campaigns_shown) {
        if (1 * new Date() - campaigns_shown[campaign_id] > EXPIRY_TIME) {
            delete campaigns_shown[campaign_id];
        }
    }
    if (_.isEmptyObject(campaigns_shown)) {
        delete this['props'][CAMPAIGN_IDS_KEY];
    }
});

MixpanelPersistence.prototype.update_campaign_params = function() {
    if (!this.campaign_params_saved) {
        this.register_once(_.info.campaignParams());
        this.campaign_params_saved = true;
    }
};

MixpanelPersistence.prototype.update_search_keyword = function(referrer) {
    this.register(_.info.searchInfo(referrer));
};

// EXPORTED METHOD, we test this directly.
MixpanelPersistence.prototype.update_referrer_info = function(referrer) {
    // If referrer doesn't exist, we want to note the fact that it was type-in traffic.
    this.register_once({
        '$initial_referrer': referrer || '$direct',
        '$initial_referring_domain': _.info.referringDomain(referrer) || '$direct'
    }, '');
};

MixpanelPersistence.prototype.get_referrer_info = function() {
    return _.strip_empty_properties({
        '$initial_referrer': this['props']['$initial_referrer'],
        '$initial_referring_domain': this['props']['$initial_referring_domain']
    });
};

// safely fills the passed in object with stored properties,
// does not override any properties defined in both
// returns the passed in object
MixpanelPersistence.prototype.safe_merge = function(props) {
    _.each(this['props'], function(val, prop) {
        if (!(prop in props)) {
            props[prop] = val;
        }
    });

    return props;
};

MixpanelPersistence.prototype.update_config = function(config) {
    this.default_expiry = this.expire_days = config['cookie_expiration'];
    this.set_disabled(config['disable_persistence']);
    this.set_cross_subdomain(config['cross_subdomain_cookie']);
    this.set_secure(config['secure_cookie']);
};

MixpanelPersistence.prototype.set_disabled = function(disabled) {
    this.disabled = disabled;
    if (this.disabled) {
        this.remove();
    }
};

MixpanelPersistence.prototype.set_cross_subdomain = function(cross_subdomain) {
    if (cross_subdomain !== this.cross_subdomain) {
        this.cross_subdomain = cross_subdomain;
        this.remove();
        this.save();
    }
};

MixpanelPersistence.prototype.get_cross_subdomain = function() {
    return this.cross_subdomain;
};

MixpanelPersistence.prototype.set_secure = function(secure) {
    if (secure !== this.secure) {
        this.secure = secure ? true : false;
        this.remove();
        this.save();
    }
};

MixpanelPersistence.prototype._add_to_people_queue = function(queue, data) {
    var q_key = this._get_queue_key(queue),
        q_data = data[queue],
        set_q = this._get_or_create_queue(SET_ACTION),
        set_once_q = this._get_or_create_queue(SET_ONCE_ACTION),
        add_q = this._get_or_create_queue(ADD_ACTION),
        union_q = this._get_or_create_queue(UNION_ACTION),
        append_q = this._get_or_create_queue(APPEND_ACTION, []);

    if (q_key === SET_QUEUE_KEY) {
        // Update the set queue - we can override any existing values
        _.extend(set_q, q_data);
        // if there was a pending increment, override it
        // with the set.
        this._pop_from_people_queue(ADD_ACTION, q_data);
        // if there was a pending union, override it
        // with the set.
        this._pop_from_people_queue(UNION_ACTION, q_data);
    } else if (q_key === SET_ONCE_QUEUE_KEY) {
        // only queue the data if there is not already a set_once call for it.
        _.each(q_data, function(v, k) {
            if (!(k in set_once_q)) {
                set_once_q[k] = v;
            }
        });
    } else if (q_key === ADD_QUEUE_KEY) {
        _.each(q_data, function(v, k) {
            // If it exists in the set queue, increment
            // the value
            if (k in set_q) {
                set_q[k] += v;
            } else {
                // If it doesn't exist, update the add
                // queue
                if (!(k in add_q)) {
                    add_q[k] = 0;
                }
                add_q[k] += v;
            }
        }, this);
    } else if (q_key === UNION_QUEUE_KEY) {
        _.each(q_data, function(v, k) {
            if (_.isArray(v)) {
                if (!(k in union_q)) {
                    union_q[k] = [];
                }
                // We may send duplicates, the server will dedup them.
                union_q[k] = union_q[k].concat(v);
            }
        });
    } else if (q_key === APPEND_QUEUE_KEY) {
        append_q.push(q_data);
    }

    console$1.log('MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):');
    console$1.log(data);

    this.save();
};

MixpanelPersistence.prototype._pop_from_people_queue = function(queue, data) {
    var q = this._get_queue(queue);
    if (!_.isUndefined(q)) {
        _.each(data, function(v, k) {
            delete q[k];
        }, this);

        this.save();
    }
};

MixpanelPersistence.prototype._get_queue_key = function(queue) {
    if (queue === SET_ACTION) {
        return SET_QUEUE_KEY;
    } else if (queue === SET_ONCE_ACTION) {
        return SET_ONCE_QUEUE_KEY;
    } else if (queue === ADD_ACTION) {
        return ADD_QUEUE_KEY;
    } else if (queue === APPEND_ACTION) {
        return APPEND_QUEUE_KEY;
    } else if (queue === UNION_ACTION) {
        return UNION_QUEUE_KEY;
    } else {
        console$1.error('Invalid queue:', queue);
    }
};

MixpanelPersistence.prototype._get_queue = function(queue) {
    return this['props'][this._get_queue_key(queue)];
};
MixpanelPersistence.prototype._get_or_create_queue = function(queue, default_val) {
    var key = this._get_queue_key(queue);
    default_val = _.isUndefined(default_val) ? {} : default_val;

    return this['props'][key] || (this['props'][key] = default_val);
};

MixpanelPersistence.prototype.set_event_timer = function(event_name, timestamp) {
    var timers = this['props'][EVENT_TIMERS_KEY] || {};
    timers[event_name] = timestamp;
    this['props'][EVENT_TIMERS_KEY] = timers;
    this.save();
};

MixpanelPersistence.prototype.remove_event_timer = function(event_name) {
    var timers = this['props'][EVENT_TIMERS_KEY] || {};
    var timestamp = timers[event_name];
    if (!_.isUndefined(timestamp)) {
        delete this['props'][EVENT_TIMERS_KEY][event_name];
        this.save();
    }
    return timestamp;
};

/**
 * Mixpanel Library Object
 * @constructor
 */
var MixpanelLib = function() {};

/**
 * Mixpanel People Object
 * @constructor
 */
var MixpanelPeople = function() {};

var MPNotif;

/**
 * create_mplib(token:string, config:object, name:string)
 *
 * This function is used by the init method of MixpanelLib objects
 * as well as the main initializer at the end of the JSLib (that
 * initializes document.mixpanel as well as any additional instances
 * declared before this file has loaded).
 */
var create_mplib = function(token, config, name) {
    var instance,
        target = (name === PRIMARY_INSTANCE_NAME) ? mixpanel_master : mixpanel_master[name];

    if (target && init_type === INIT_MODULE) {
        instance = target;
    } else {
        if (target && !_.isArray(target)) {
            console$1.error('You have already initialized ' + name);
            return;
        }
        instance = new MixpanelLib();
    }

    instance._init(token, config, name);

    instance['people'] = new MixpanelPeople();
    instance['people']._init(instance);

    // if any instance on the page has debug = true, we set the
    // global debug to be true
    Config.DEBUG = Config.DEBUG || instance.get_config('debug');

    instance['__autotrack_enabled'] = instance.get_config('autotrack');
    if (instance.get_config('autotrack')) {
        var num_buckets = 100;
        var num_enabled_buckets = 100;
        if (!autotrack.enabledForProject(instance.get_config('token'), num_buckets, num_enabled_buckets)) {
            instance['__autotrack_enabled'] = false;
            console$1.log('Not in active bucket: disabling Automatic Event Collection.');
        } else if (!autotrack.isBrowserSupported()) {
            instance['__autotrack_enabled'] = false;
            console$1.log('Disabling Automatic Event Collection because this browser is not supported');
        } else {
            autotrack.init(instance);
        }

        try {
            add_dom_event_counting_handlers(instance);
        } catch (e) {
            console$1.error(e);
        }
    }

    // if target is not defined, we called init after the lib already
    // loaded, so there won't be an array of things to execute
    if (!_.isUndefined(target) && _.isArray(target)) {
        // Crunch through the people queue first - we queue this data up &
        // flush on identify, so it's better to do all these operations first
        instance._execute_array.call(instance['people'], target['people']);
        instance._execute_array(target);
    }

    return instance;
};

// Initialization methods

/**
 * This function initializes a new instance of the Mixpanel tracking object.
 * All new instances are added to the main mixpanel object as sub properties (such as
 * mixpanel.library_name) and also returned by this function. To define a
 * second instance on the page, you would call:
 *
 *     mixpanel.init('new token', { your: 'config' }, 'library_name');
 *
 * and use it like so:
 *
 *     mixpanel.library_name.track(...);
 *
 * @param {String} token   Your Mixpanel API token
 * @param {Object} [config]  A dictionary of config options to override
 * @param {String} [name]    The name for the new mixpanel instance that you want created
 */
MixpanelLib.prototype.init = function (token, config, name) {
    if (_.isUndefined(name)) {
        console$1.error('You must name your new library: init(token, config, name)');
        return;
    }
    if (name === PRIMARY_INSTANCE_NAME) {
        console$1.error('You must initialize the main mixpanel object right after you include the Mixpanel js snippet');
        return;
    }

    var instance = create_mplib(token, config, name);
    mixpanel_master[name] = instance;
    instance._loaded();

    return instance;
};

// mixpanel._init(token:string, config:object, name:string)
//
// This function sets up the current instance of the mixpanel
// library.  The difference between this method and the init(...)
// method is this one initializes the actual instance, whereas the
// init(...) method sets up a new library and calls _init on it.
//
MixpanelLib.prototype._init = function(token, config, name) {
    this['__loaded'] = true;
    this['config'] = {};

    this.set_config(_.extend({}, DEFAULT_CONFIG, config, {
        'name': name,
        'token': token,
        'callback_fn': ((name === PRIMARY_INSTANCE_NAME) ? name : PRIMARY_INSTANCE_NAME + '.' + name) + '._jsc'
    }));

    this['_jsc'] = function() {};

    this.__dom_loaded_queue = [];
    this.__request_queue = [];
    this.__disabled_events = [];
    this._flags = {
        'disable_all_events': false,
        'identify_called': false
    };

    this['persistence'] = this['cookie'] = new MixpanelPersistence(this['config']);
    this.register_once({'distinct_id': _.UUID()}, '');
};

// Private methods

MixpanelLib.prototype._loaded = function() {
    this.get_config('loaded')(this);

    // this happens after so a user can call identify/name_tag in
    // the loaded callback
    if (this.get_config('track_pageview')) {
        this.track_pageview();
    }
};

MixpanelLib.prototype._dom_loaded = function() {
    _.each(this.__dom_loaded_queue, function(item) {
        this._track_dom.apply(this, item);
    }, this);
    _.each(this.__request_queue, function(item) {
        this._send_request.apply(this, item);
    }, this);
    delete this.__dom_loaded_queue;
    delete this.__request_queue;
};

MixpanelLib.prototype._track_dom = function(DomClass, args) {
    if (this.get_config('img')) {
        console$1.error('You can\'t use DOM tracking functions with img = true.');
        return false;
    }

    if (!DOM_LOADED) {
        this.__dom_loaded_queue.push([DomClass, args]);
        return false;
    }

    var dt = new DomClass().init(this);
    return dt.track.apply(dt, args);
};

/**
 * _prepare_callback() should be called by callers of _send_request for use
 * as the callback argument.
 *
 * If there is no callback, this returns null.
 * If we are going to make XHR/XDR requests, this returns a function.
 * If we are going to use script tags, this returns a string to use as the
 * callback GET param.
 */
MixpanelLib.prototype._prepare_callback = function(callback, data) {
    if (_.isUndefined(callback)) {
        return null;
    }

    if (USE_XHR) {
        var callback_function = function(response) {
            callback(response, data);
        };
        return callback_function;
    } else {
        // if the user gives us a callback, we store as a random
        // property on this instances jsc function and update our
        // callback string to reflect that.
        var jsc = this['_jsc'];
        var randomized_cb = '' + Math.floor(Math.random() * 100000000);
        var callback_string = this.get_config('callback_fn') + '[' + randomized_cb + ']';
        jsc[randomized_cb] = function(response) {
            delete jsc[randomized_cb];
            callback(response, data);
        };
        return callback_string;
    }
};

MixpanelLib.prototype._send_request = function(url, data, callback) {
    if (ENQUEUE_REQUESTS) {
        this.__request_queue.push(arguments);
        return;
    }

    // needed to correctly format responses
    var verbose_mode = this.get_config('verbose');
    if (data['verbose']) { verbose_mode = true; }

    if (this.get_config('test')) { data['test'] = 1; }
    if (verbose_mode) { data['verbose'] = 1; }
    if (this.get_config('img')) { data['img'] = 1; }
    if (!USE_XHR) {
        if (callback) {
            data['callback'] = callback;
        } else if (verbose_mode || this.get_config('test')) {
            // Verbose output (from verbose mode, or an error in test mode) is a json blob,
            // which by itself is not valid javascript. Without a callback, this verbose output will
            // cause an error when returned via jsonp, so we force a no-op callback param.
            // See the ECMA script spec: http://www.ecma-international.org/ecma-262/5.1/#sec-12.4
            data['callback'] = '(function(){})';
        }
    }

    data['ip'] = this.get_config('ip')?1:0;
    data['_'] = new Date().getTime().toString();
    url += '?' + _.HTTPBuildQuery(data);

    if ('img' in data) {
        var img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img);
    } else if (USE_XHR) {
        try {
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            // send the mp_optout cookie
            // withCredentials cannot be modified until after calling .open on Android and Mobile Safari
            req.withCredentials = true;
            req.onreadystatechange = function () {
                if (req.readyState === 4) { // XMLHttpRequest.DONE == 4, except in safari 4
                    if (req.status === 200) {
                        if (callback) {
                            if (verbose_mode) {
                                callback(_.JSONDecode(req.responseText));
                            } else {
                                callback(Number(req.responseText));
                            }
                        }
                    } else {
                        var error = 'Bad HTTP status: ' + req.status + ' ' + req.statusText;
                        console$1.error(error);
                        if (callback) {
                            if (verbose_mode) {
                                callback({status: 0, error: error});
                            } else {
                                callback(0);
                            }
                        }
                    }
                }
            };
            req.send(null);
        } catch (e) {
            console$1.error(e);
        }
    } else {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = url;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    }
};

/**
 * _execute_array() deals with processing any mixpanel function
 * calls that were called before the Mixpanel library were loaded
 * (and are thus stored in an array so they can be called later)
 *
 * Note: we fire off all the mixpanel function calls && user defined
 * functions BEFORE we fire off mixpanel tracking calls. This is so
 * identify/register/set_config calls can properly modify early
 * tracking calls.
 *
 * @param {Array} array
 */
MixpanelLib.prototype._execute_array = function(array) {
    var fn_name, alias_calls = [], other_calls = [], tracking_calls = [];
    _.each(array, function(item) {
        if (item) {
            fn_name = item[0];
            if (typeof(item) === 'function') {
                item.call(this);
            } else if (_.isArray(item) && fn_name === 'alias') {
                alias_calls.push(item);
            } else if (_.isArray(item) && fn_name.indexOf('track') !== -1 && typeof(this[fn_name]) === 'function') {
                tracking_calls.push(item);
            } else {
                other_calls.push(item);
            }
        }
    }, this);

    var execute = function(calls, context) {
        _.each(calls, function(item) {
            this[item[0]].apply(this, item.slice(1));
        }, context);
    };

    execute(alias_calls, this);
    execute(other_calls, this);
    execute(tracking_calls, this);
};

/**
 * push() keeps the standard async-array-push
 * behavior around after the lib is loaded.
 * This is only useful for external integrations that
 * do not wish to rely on our convenience methods
 * (created in the snippet).
 *
 * ### Usage:
 *     mixpanel.push(['register', { a: 'b' }]);
 *
 * @param {Array} item A [function_name, args...] array to be executed
 */
MixpanelLib.prototype.push = function(item) {
    this._execute_array([item]);
};

/**
 * Disable events on the Mixpanel object. If passed no arguments,
 * this function disables tracking of any event. If passed an
 * array of event names, those events will be disabled, but other
 * events will continue to be tracked.
 *
 * Note: this function does not stop other mixpanel functions from
 * firing, such as register() or people.set().
 *
 * @param {Array} [events] An array of event names to disable
 */
MixpanelLib.prototype.disable = function(events) {
    if (typeof(events) === 'undefined') {
        this._flags.disable_all_events = true;
    } else {
        this.__disabled_events = this.__disabled_events.concat(events);
    }
};

/**
 * Track an event. This is the most important and
 * frequently used Mixpanel function.
 *
 * ### Usage:
 *
 *     // track an event named 'Registered'
 *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
 *
 * To track link clicks or form submissions, see track_links() or track_forms().
 *
 * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
 * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
 * @param {Function} [callback] If provided, the callback function will be called after tracking the event.
 */
MixpanelLib.prototype.track = function(event_name, properties, callback) {
    if (typeof(callback) !== 'function') {
        callback = function() {};
    }

    if (_.isUndefined(event_name)) {
        console$1.error('No event name provided to mixpanel.track');
        return;
    }

    if (this._event_is_disabled(event_name)) {
        callback(0);
        return;
    }

    // set defaults
    properties = properties || {};
    properties['token'] = this.get_config('token');

    // set $duration if time_event was previously called for this event
    var start_timestamp = this['persistence'].remove_event_timer(event_name);
    if (!_.isUndefined(start_timestamp)) {
        var duration_in_ms = new Date().getTime() - start_timestamp;
        properties['$duration'] = parseFloat((duration_in_ms / 1000).toFixed(3));
    }

    // update persistence
    this['persistence'].update_search_keyword(document.referrer);

    if (this.get_config('store_google')) { this['persistence'].update_campaign_params(); }
    if (this.get_config('save_referrer')) { this['persistence'].update_referrer_info(document.referrer); }

    // note: extend writes to the first object, so lets make sure we
    // don't write to the persistence properties object and info
    // properties object by passing in a new object

    // update properties with pageview info and super-properties
    properties = _.extend(
        {},
        _.info.properties(),
        this['persistence'].properties(),
        properties
    );

    try {
        if (this.get_config('autotrack') && event_name !== 'mp_page_view' && event_name !== '$create_alias') {
            // The point of $__c is to count how many clicks occur per tracked event. Since we're
            // tracking an event in this function, we need to reset the $__c value.
            properties = _.extend({}, properties, this.mp_counts);
            this.mp_counts = {'$__c': 0};
            _.cookie.set('mp_' + this.get_config('name') + '__c', 0, 1, true);
        }
    } catch (e) {
        console$1.error(e);
    }

    var property_blacklist = this.get_config('property_blacklist');
    if (_.isArray(property_blacklist)) {
        _.each(property_blacklist, function(blacklisted_prop) {
            delete properties[blacklisted_prop];
        });
    } else {
        console$1.error('Invalid value for property_blacklist config: ' + property_blacklist);
    }

    var data = {
        'event': event_name,
        'properties': properties
    };

    var truncated_data = _.truncate(data, 255);
    var json_data      = _.JSONEncode(truncated_data);
    var encoded_data   = _.base64Encode(json_data);

    console$1.log('MIXPANEL REQUEST:');
    console$1.log(truncated_data);

    this._send_request(
        this.get_config('api_host') + '/track/',
        { 'data': encoded_data },
        this._prepare_callback(callback, truncated_data)
    );

    return truncated_data;
};

/**
 * Track a page view event, which is currently ignored by the server.
 * This function is called by default on page load unless the
 * track_pageview configuration variable is false.
 *
 * @param {String} [page] The url of the page to record. If you don't include this, it defaults to the current url.
 * @api private
 */
MixpanelLib.prototype.track_pageview = function(page) {
    if (_.isUndefined(page)) {
        page = document.location.href;
    }
    this.track('mp_page_view', _.info.pageviewInfo(page));
};

/**
 * Track clicks on a set of document elements. Selector must be a
 * valid query. Elements must exist on the page at the time track_links is called.
 *
 * ### Usage:
 *
 *     // track click for link id #nav
 *     mixpanel.track_links('#nav', 'Clicked Nav Link');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the Mixpanel
 * servers to respond. If they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been tracked.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to mixpanel as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to track
 * @param {Object|Function} [properties] A properties object or function that returns a dictionary of properties when passed a DOMElement
 */
MixpanelLib.prototype.track_links = function() {
    return this._track_dom.call(this, LinkTracker, arguments);
};

/**
 * Track form submissions. Selector must be a valid query.
 *
 * ### Usage:
 *
 *     // track submission for form id 'register'
 *     mixpanel.track_forms('#register', 'Created Account');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the mixpanel
 * servers to respond, if they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been tracked.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to mixpanel as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to track
 * @param {Object|Function} [properties] This can be a set of properties, or a function that returns a set of properties after being passed a DOMElement
 */
MixpanelLib.prototype.track_forms = function() {
    return this._track_dom.call(this, FormTracker, arguments);
};

/**
 * Time an event by including the time between this call and a
 * later 'track' call for the same event in the properties sent
 * with the event.
 *
 * ### Usage:
 *
 *     // time an event named 'Registered'
 *     mixpanel.time_event('Registered');
 *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
 *
 * When called for a particular event name, the next track call for that event
 * name will include the elapsed time between the 'time_event' and 'track'
 * calls. This value is stored as seconds in the '$duration' property.
 *
 * @param {String} event_name The name of the event.
 */
MixpanelLib.prototype.time_event = function(event_name) {
    if (_.isUndefined(event_name)) {
        console$1.error('No event name provided to mixpanel.time_event');
        return;
    }

    if (this._event_is_disabled(event_name)) {
        return;
    }

    this['persistence'].set_event_timer(event_name,  new Date().getTime());
};

/**
 * Register a set of super properties, which are included with all
 * events. This will overwrite previous super property values.
 *
 * ### Usage:
 *
 *     // register 'Gender' as a super property
 *     mixpanel.register({'Gender': 'Female'});
 *
 *     // register several super properties when a user signs up
 *     mixpanel.register({
 *         'Email': 'jdoe@example.com',
 *         'Account Type': 'Free'
 *     });
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {Number} [days] How many days since the user's last visit to store the super properties
 */
MixpanelLib.prototype.register = function(props, days) {
    this['persistence'].register(props, days);
};

/**
 * Register a set of super properties only once. This will not
 * overwrite previous super property values, unlike register().
 *
 * ### Usage:
 *
 *     // register a super property for the first time only
 *     mixpanel.register_once({
 *         'First Login Date': new Date().toISOString()
 *     });
 *
 * ### Notes:
 *
 * If default_value is specified, current super properties
 * with that value will be overwritten.
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
 * @param {Number} [days] How many days since the users last visit to store the super properties
 */
MixpanelLib.prototype.register_once = function(props, default_value, days) {
    this['persistence'].register_once(props, default_value, days);
};

/**
 * Delete a super property stored with the current user.
 *
 * @param {String} property The name of the super property to remove
 */
MixpanelLib.prototype.unregister = function(property) {
    this['persistence'].unregister(property);
};

MixpanelLib.prototype._register_single = function(prop, value) {
    var props = {};
    props[prop] = value;
    this.register(props);
};

/**
 * Identify a user with a unique ID. All subsequent
 * actions caused by this user will be tied to this unique ID. This
 * property is used to track unique visitors. If the method is
 * never called, then unique visitors will be identified by a UUID
 * generated the first time they visit the site.
 *
 * ### Notes:
 *
 * You can call this function to overwrite a previously set
 * unique ID for the current user. Mixpanel cannot translate
 * between IDs at this time, so when you change a user's ID
 * they will appear to be a new user.
 *
 * identify() should not be called to link anonymous activity to
 * subsequent activity when a unique ID is first assigned.
 * Use alias() when a unique ID is first assigned (registration), and
 * use identify() to identify the user with that unique ID on an ongoing
 * basis (e.g., each time a user logs in after registering).
 * Do not call identify() at the same time as alias().
 *
 * @param {String} [unique_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
 */
MixpanelLib.prototype.identify = function(unique_id, _set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback) {
    // Optional Parameters
    //  _set_callback:function  A callback to be run if and when the People set queue is flushed
    //  _add_callback:function  A callback to be run if and when the People add queue is flushed
    //  _append_callback:function  A callback to be run if and when the People append queue is flushed
    //  _set_once_callback:function  A callback to be run if and when the People set_once queue is flushed
    //  _union_callback:function  A callback to be run if and when the People union queue is flushed

    // identify only changes the distinct id if it doesn't match either the existing or the alias;
    // if it's new, blow away the alias as well.
    if (unique_id !== this.get_distinct_id() && unique_id !== this.get_property(ALIAS_ID_KEY)) {
        this.unregister(ALIAS_ID_KEY);
        this._register_single('distinct_id', unique_id);
    }
    this._check_and_handle_notifications(this.get_distinct_id());
    this._flags.identify_called = true;
    // Flush any queued up people requests
    this['people']._flush(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback);
};

/**
 * Clears super properties and generates a new random distinct_id for this instance.
 * Useful for clearing data when a user logs out.
 */
MixpanelLib.prototype.reset = function() {
    this['persistence'].clear();
    this._flags.identify_called = false;
    this.register_once({'distinct_id': _.UUID()}, '');
};

/**
 * Returns the current distinct id of the user. This is either the id automatically
 * generated by the library or the id that has been passed by a call to identify().
 *
 * ### Notes:
 *
 * get_distinct_id() can only be called after the Mixpanel library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // set distinct_id after the mixpanel library has loaded
 *     mixpanel.init('YOUR PROJECT TOKEN', {
 *         loaded: function(mixpanel) {
 *             distinct_id = mixpanel.get_distinct_id();
 *         }
 *     });
 */
MixpanelLib.prototype.get_distinct_id = function() {
    return this.get_property('distinct_id');
};

/**
 * Create an alias, which Mixpanel will use to link two distinct_ids going forward (not retroactively).
 * Multiple aliases can map to the same original ID, but not vice-versa. Aliases can also be chained - the
 * following is a valid scenario:
 *
 *     mixpanel.alias('new_id', 'existing_id');
 *     ...
 *     mixpanel.alias('newer_id', 'new_id');
 *
 * If the original ID is not passed in, we will use the current distinct_id - probably the auto-generated GUID.
 *
 * ### Notes:
 *
 * The best practice is to call alias() when a unique ID is first created for a user
 * (e.g., when a user first registers for an account and provides an email address).
 * alias() should never be called more than once for a given user, except to
 * chain a newer ID to a previously new ID, as described above.
 *
 * @param {String} alias A unique identifier that you want to use for this user in the future.
 * @param {String} [original] The current identifier being used for this user.
 */
MixpanelLib.prototype.alias = function(alias, original) {
    // If the $people_distinct_id key exists in persistence, there has been a previous
    // mixpanel.people.identify() call made for this user. It is VERY BAD to make an alias with
    // this ID, as it will duplicate users.
    if (alias === this.get_property(PEOPLE_DISTINCT_ID_KEY)) {
        console$1.critical('Attempting to create alias for existing People user - aborting.');
        return -2;
    }

    var _this = this;
    if (_.isUndefined(original)) {
        original = this.get_distinct_id();
    }
    if (alias !== original) {
        this._register_single(ALIAS_ID_KEY, alias);
        return this.track('$create_alias', { 'alias': alias, 'distinct_id': original }, function() {
            // Flush the people queue
            _this.identify(alias);
        });
    } else {
        console$1.error('alias matches current distinct_id - skipping api call.');
        this.identify(alias);
        return -1;
    }
};

/**
 * Provide a string to recognize the user by. The string passed to
 * this method will appear in the Mixpanel Streams product rather
 * than an automatically generated name. Name tags do not have to
 * be unique.
 *
 * This value will only be included in Streams data.
 *
 * @param {String} name_tag A human readable name for the user
 * @api private
 */
MixpanelLib.prototype.name_tag = function(name_tag) {
    this._register_single('mp_name_tag', name_tag);
};

/**
 * Update the configuration of a mixpanel library instance.
 *
 * The default config is:
 *
 *     {
 *       // super properties cookie expiration (in days)
 *       cookie_expiration:          365
 *
 *       // super properties span subdomains
 *       cross_subdomain_cookie:     true
 *
 *       // if this is true, the mixpanel cookie or localStorage entry
 *       // will be deleted, and no user persistence will take place
 *       disable_persistence:        false
 *
 *       // type of persistent store for super properties (cookie/
 *       // localStorage) if set to 'localStorage', any existing
 *       // mixpanel cookie value with the same persistence_name
 *       // will be transferred to localStorage and deleted
 *       persistence:                'cookie'
 *
 *       // name for super properties persistent store
 *       persistence_name:           ''
 *
 *       // names of properties/superproperties which should never
 *       // be sent with track() calls
 *       property_blacklist:         []
 *
 *       // if this is true, mixpanel cookies will be marked as
 *       // secure, meaning they will only be transmitted over https
 *       secure_cookie:              false
 *
 *       // the amount of time track_links will
 *       // wait for Mixpanel's servers to respond
 *       track_links_timeout:        300
 *
 *       // should we track a page view on page load
 *       track_pageview:             true
 *
 *       // if you set upgrade to be true, the library will check for
 *       // a cookie from our old js library and import super
 *       // properties from it, then the old cookie is deleted
 *       // The upgrade config option only works in the initialization,
 *       // so make sure you set it when you create the library.
 *       upgrade:                    false
 *     }
 *
 *
 * @param {Object} config A dictionary of new configuration values to update
 */
MixpanelLib.prototype.set_config = function(config) {
    if (_.isObject(config)) {
        _.extend(this['config'], config);

        if (!this.get_config('persistence_name')) {
            this['config']['persistence_name'] = this['config']['cookie_name'];
        }
        if (!this.get_config('disable_persistence')) {
            this['config']['disable_persistence'] = this['config']['disable_cookie'];
        }

        if (this['persistence']) {
            this['persistence'].update_config(this['config']);
        }
        Config.DEBUG = Config.DEBUG || this.get_config('debug');
    }
};

/**
 * returns the current config object for the library.
 */
MixpanelLib.prototype.get_config = function(prop_name) {
    return this['config'][prop_name];
};

/**
 * Returns the value of the super property named property_name. If no such
 * property is set, get_property() will return the undefined value.
 *
 * ### Notes:
 *
 * get_property() can only be called after the Mixpanel library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // grab value for 'user_id' after the mixpanel library has loaded
 *     mixpanel.init('YOUR PROJECT TOKEN', {
 *         loaded: function(mixpanel) {
 *             user_id = mixpanel.get_property('user_id');
 *         }
 *     });
 *
 * @param {String} property_name The name of the super property you want to retrieve
 */
MixpanelLib.prototype.get_property = function(property_name) {
    return this['persistence']['props'][property_name];
};

MixpanelLib.prototype.toString = function() {
    var name = this.get_config('name');
    if (name !== PRIMARY_INSTANCE_NAME) {
        name = PRIMARY_INSTANCE_NAME + '.' + name;
    }
    return name;
};

MixpanelLib.prototype._event_is_disabled = function(event_name) {
    return _.isBlockedUA(userAgent) ||
        this._flags.disable_all_events ||
        _.include(this.__disabled_events, event_name);
};

MixpanelLib.prototype._check_and_handle_notifications = function(distinct_id) {
    if (!distinct_id || this._flags.identify_called || this.get_config('disable_notifications')) {
        return;
    }

    console$1.log('MIXPANEL NOTIFICATION CHECK');

    var data = {
        'verbose':     true,
        'version':     '2',
        'lib':         'web',
        'token':       this.get_config('token'),
        'distinct_id': distinct_id
    };
    var self = this;
    this._send_request(
        this.get_config('decide_host') + '/decide/',
        data,
        this._prepare_callback(function(r) {
            if (r['notifications'] && r['notifications'].length > 0) {
                self._show_notification.call(self, r['notifications'][0]);
            }
        })
    );
};

MixpanelLib.prototype._show_notification = function(notification_data) {
    var notification = new MPNotif(notification_data, this);
    notification.show();
};

MixpanelPeople.prototype._init = function(mixpanel_instance) {
    this._mixpanel = mixpanel_instance;
};

/*
 * Set properties on a user record.
 *
 * ### Usage:
 *
 *     mixpanel.people.set('gender', 'm');
 *
 *     // or set multiple properties at once
 *     mixpanel.people.set({
 *         'Company': 'Acme',
 *         'Plan': 'Premium',
 *         'Upgrade date': new Date()
 *     });
 *     // properties can be strings, integers, dates, or lists
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.set = function(prop, to, callback) {
    var data = {};
    var $set = {};
    if (_.isObject(prop)) {
        _.each(prop, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $set[k] = v;
            }
        }, this);
        callback = to;
    } else {
        $set[prop] = to;
    }

    // make sure that the referrer info has been updated and saved
    if (this._get_config('save_referrer')) {
        this._mixpanel['persistence'].update_referrer_info(document.referrer);
    }

    // update $set object with default people properties
    $set = _.extend(
        {},
        _.info.people_properties(),
        this._mixpanel['persistence'].get_referrer_info(),
        $set
    );

    data[SET_ACTION] = $set;

    return this._send_request(data, callback);
};

/*
 * Set properties on a user record, only if they do not yet exist.
 * This will not overwrite previous people property values, unlike
 * people.set().
 *
 * ### Usage:
 *
 *     mixpanel.people.set_once('First Login Date', new Date());
 *
 *     // or set multiple properties at once
 *     mixpanel.people.set_once({
 *         'First Login Date': new Date(),
 *         'Starting Plan': 'Premium'
 *     });
 *
 *     // properties can be strings, integers or dates
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.set_once = function(prop, to, callback) {
    var data = {};
    var $set_once = {};
    if (_.isObject(prop)) {
        _.each(prop, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $set_once[k] = v;
            }
        }, this);
        callback = to;
    } else {
        $set_once[prop] = to;
    }
    data[SET_ONCE_ACTION] = $set_once;
    return this._send_request(data, callback);
};

/*
 * Increment/decrement numeric people analytics properties.
 *
 * ### Usage:
 *
 *     mixpanel.people.increment('page_views', 1);
 *
 *     // or, for convenience, if you're just incrementing a counter by
 *     // 1, you can simply do
 *     mixpanel.people.increment('page_views');
 *
 *     // to decrement a counter, pass a negative number
 *     mixpanel.people.increment('credits_left', -1);
 *
 *     // like mixpanel.people.set(), you can increment multiple
 *     // properties at once:
 *     mixpanel.people.increment({
 *         counter1: 1,
 *         counter2: 6
 *     });
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and numeric values.
 * @param {Number} [by] An amount to increment the given property
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.increment = function(prop, by, callback) {
    var data = {};
    var $add = {};
    if (_.isObject(prop)) {
        _.each(prop, function(v, k) {
            if (!this._is_reserved_property(k)) {
                if (isNaN(parseFloat(v))) {
                    console$1.error('Invalid increment value passed to mixpanel.people.increment - must be a number');
                    return;
                } else {
                    $add[k] = v;
                }
            }
        }, this);
        callback = by;
    } else {
        // convenience: mixpanel.people.increment('property'); will
        // increment 'property' by 1
        if (_.isUndefined(by)) {
            by = 1;
        }
        $add[prop] = by;
    }
    data[ADD_ACTION] = $add;

    return this._send_request(data, callback);
};

/*
 * Append a value to a list-valued people analytics property.
 *
 * ### Usage:
 *
 *     // append a value to a list, creating it if needed
 *     mixpanel.people.append('pages_visited', 'homepage');
 *
 *     // like mixpanel.people.set(), you can append multiple
 *     // properties at once:
 *     mixpanel.people.append({
 *         list1: 'bob',
 *         list2: 123
 *     });
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [value] An item to append to the list
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.append = function(list_name, value, callback) {
    var data = {};
    var $append = {};
    if (_.isObject(list_name)) {
        _.each(list_name, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $append[k] = v;
            }
        }, this);
        callback = value;
    } else {
        $append[list_name] = value;
    }
    data[APPEND_ACTION] = $append;

    return this._send_request(data, callback);
};

/*
 * Merge a given list with a list-valued people analytics property,
 * excluding duplicate values.
 *
 * ### Usage:
 *
 *     // merge a value to a list, creating it if needed
 *     mixpanel.people.union('pages_visited', 'homepage');
 *
 *     // like mixpanel.people.set(), you can append multiple
 *     // properties at once:
 *     mixpanel.people.union({
 *         list1: 'bob',
 *         list2: 123
 *     });
 *
 *     // like mixpanel.people.append(), you can append multiple
 *     // values to the same list:
 *     mixpanel.people.union({
 *         list1: ['bob', 'billy']
 *     });
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [value] Value / values to merge with the given property
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.union = function(list_name, values, callback) {
    var data = {};
    var $union = {};
    if (_.isObject(list_name)) {
        _.each(list_name, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $union[k] = _.isArray(v) ? v : [v];
            }
        }, this);
        callback = values;
    } else {
        $union[list_name] = _.isArray(values) ? values : [values];
    }
    data[UNION_ACTION] = $union;

    return this._send_request(data, callback);
};

/*
 * Record that you have charged the current user a certain amount
 * of money. Charges recorded with track_charge() will appear in the
 * Mixpanel revenue report.
 *
 * ### Usage:
 *
 *     // charge a user $50
 *     mixpanel.people.track_charge(50);
 *
 *     // charge a user $30.50 on the 2nd of january
 *     mixpanel.people.track_charge(30.50, {
 *         '$time': new Date('jan 1 2012')
 *     });
 *
 * @param {Number} amount The amount of money charged to the current user
 * @param {Object} [properties] An associative array of properties associated with the charge
 * @param {Function} [callback] If provided, the callback will be called when the server responds
 */
MixpanelPeople.prototype.track_charge = function(amount, properties, callback) {
    if (!_.isNumber(amount)) {
        amount = parseFloat(amount);
        if (isNaN(amount)) {
            console$1.error('Invalid value passed to mixpanel.people.track_charge - must be a number');
            return;
        }
    }

    return this.append('$transactions', _.extend({
        '$amount': amount
    }, properties), callback);
};

/*
 * Permanently clear all revenue report transactions from the
 * current user's people analytics profile.
 *
 * ### Usage:
 *
 *     mixpanel.people.clear_charges();
 *
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.clear_charges = function(callback) {
    return this.set('$transactions', [], callback);
};

/*
 * Permanently deletes the current people analytics profile from
 * Mixpanel (using the current distinct_id).
 *
 * ### Usage:
 *
 *     // remove the all data you have stored about the current user
 *     mixpanel.people.delete_user();
 *
 */
MixpanelPeople.prototype.delete_user = function() {
    if (!this._identify_called()) {
        console$1.error('mixpanel.people.delete_user() requires you to call identify() first');
        return;
    }
    var data = {'$delete': this._mixpanel.get_distinct_id()};
    return this._send_request(data);
};

MixpanelPeople.prototype.toString = function() {
    return this._mixpanel.toString() + '.people';
};

MixpanelPeople.prototype._send_request = function(data, callback) {
    data['$token'] = this._get_config('token');
    data['$distinct_id'] = this._mixpanel.get_distinct_id();

    var date_encoded_data = _.encodeDates(data);
    var truncated_data    = _.truncate(date_encoded_data, 255);
    var json_data         = _.JSONEncode(date_encoded_data);
    var encoded_data      = _.base64Encode(json_data);

    if (!this._identify_called()) {
        this._enqueue(data);
        if (!_.isUndefined(callback)) {
            if (this._get_config('verbose')) {
                callback({status: -1, error: null});
            } else {
                callback(-1);
            }
        }
        return truncated_data;
    }

    console$1.log('MIXPANEL PEOPLE REQUEST:');
    console$1.log(truncated_data);

    this._mixpanel._send_request(
        this._get_config('api_host') + '/engage/',
        {'data': encoded_data},
        this._mixpanel._prepare_callback(callback, truncated_data)
    );

    return truncated_data;
};

MixpanelPeople.prototype._get_config = function(conf_var) {
    return this._mixpanel.get_config(conf_var);
};

MixpanelPeople.prototype._identify_called = function() {
    return this._mixpanel._flags.identify_called === true;
};

// Queue up engage operations if identify hasn't been called yet.
MixpanelPeople.prototype._enqueue = function(data) {
    if (SET_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(SET_ACTION, data);
    } else if (SET_ONCE_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(SET_ONCE_ACTION, data);
    } else if (ADD_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(ADD_ACTION, data);
    } else if (APPEND_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(APPEND_ACTION, data);
    } else if (UNION_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(UNION_ACTION, data);
    } else {
        console$1.error('Invalid call to _enqueue():', data);
    }
};

// Flush queued engage operations - order does not matter,
// and there are network level race conditions anyway
MixpanelPeople.prototype._flush = function(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback) {
    var _this = this;
    var $set_queue = _.extend({}, this._mixpanel['persistence']._get_queue(SET_ACTION));
    var $set_once_queue = _.extend({}, this._mixpanel['persistence']._get_queue(SET_ONCE_ACTION));
    var $add_queue = _.extend({}, this._mixpanel['persistence']._get_queue(ADD_ACTION));
    var $append_queue = this._mixpanel['persistence']._get_queue(APPEND_ACTION);
    var $union_queue = _.extend({}, this._mixpanel['persistence']._get_queue(UNION_ACTION));

    if (!_.isUndefined($set_queue) && _.isObject($set_queue) && !_.isEmptyObject($set_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(SET_ACTION, $set_queue);
        this.set($set_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(SET_ACTION, $set_queue);
            }
            if (!_.isUndefined(_set_callback)) {
                _set_callback(response, data);
            }
        });
    }

    if (!_.isUndefined($set_once_queue) && _.isObject($set_once_queue) && !_.isEmptyObject($set_once_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(SET_ONCE_ACTION, $set_once_queue);
        this.set_once($set_once_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(SET_ONCE_ACTION, $set_once_queue);
            }
            if (!_.isUndefined(_set_once_callback)) {
                _set_once_callback(response, data);
            }
        });
    }

    if (!_.isUndefined($add_queue) && _.isObject($add_queue) && !_.isEmptyObject($add_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(ADD_ACTION, $add_queue);
        this.increment($add_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(ADD_ACTION, $add_queue);
            }
            if (!_.isUndefined(_add_callback)) {
                _add_callback(response, data);
            }
        });
    }

    if (!_.isUndefined($union_queue) && _.isObject($union_queue) && !_.isEmptyObject($union_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(UNION_ACTION, $union_queue);
        this.union($union_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(UNION_ACTION, $union_queue);
            }
            if (!_.isUndefined(_union_callback)) {
                _union_callback(response, data);
            }
        });
    }

    // we have to fire off each $append individually since there is
    // no concat method server side
    if (!_.isUndefined($append_queue) && _.isArray($append_queue) && $append_queue.length) {
        var $append_item;
        var callback = function(response, data) {
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(APPEND_ACTION, $append_item);
            }
            if (!_.isUndefined(_append_callback)) {
                _append_callback(response, data);
            }
        };
        for (var i = $append_queue.length - 1; i >= 0; i--) {
            $append_item = $append_queue.pop();
            _this.append($append_item, callback);
        }
        // Save the shortened append queue
        _this._mixpanel['persistence'].save();
    }
};

MixpanelPeople.prototype._is_reserved_property = function(prop) {
    return prop === '$distinct_id' || prop === '$token';
};


// Internal class for notification display
MixpanelLib._Notification = function(notif_data, mixpanel_instance) {
    _.bind_instance_methods(this);

    this.mixpanel    = mixpanel_instance;
    this.persistence = this.mixpanel['persistence'];

    this.campaign_id = _.escapeHTML(notif_data['id']);
    this.message_id  = _.escapeHTML(notif_data['message_id']);

    this.body            = (_.escapeHTML(notif_data['body']) || '').replace(/\n/g, '<br/>');
    this.cta             = _.escapeHTML(notif_data['cta']) || 'Close';
    this.notif_type      = _.escapeHTML(notif_data['type']) || 'takeover';
    this.style           = _.escapeHTML(notif_data['style']) || 'light';
    this.title           = _.escapeHTML(notif_data['title']) || '';
    this.video_width     = MPNotif.VIDEO_WIDTH;
    this.video_height    = MPNotif.VIDEO_HEIGHT;

    // These fields are url-sanitized in the backend already.
    this.dest_url        = notif_data['cta_url'] || null;
    this.image_url       = notif_data['image_url'] || null;
    this.thumb_image_url = notif_data['thumb_image_url'] || null;
    this.video_url       = notif_data['video_url'] || null;

    this.clickthrough = true;
    if (!this.dest_url) {
        this.dest_url = '#dismiss';
        this.clickthrough = false;
    }

    this.mini = this.notif_type === 'mini';
    if (!this.mini) {
        this.notif_type = 'takeover';
    }
    this.notif_width = !this.mini ? MPNotif.NOTIF_WIDTH : MPNotif.NOTIF_WIDTH_MINI;

    this._set_client_config();
    this.imgs_to_preload = this._init_image_html();
    this._init_video();
};

MPNotif = MixpanelLib._Notification;

MPNotif.ANIM_TIME         = 200;
MPNotif.MARKUP_PREFIX     = 'mixpanel-notification';
MPNotif.BG_OPACITY        = 0.6;
MPNotif.NOTIF_TOP         = 25;
MPNotif.NOTIF_START_TOP   = 200;
MPNotif.NOTIF_WIDTH       = 388;
MPNotif.NOTIF_WIDTH_MINI  = 420;
MPNotif.NOTIF_HEIGHT_MINI = 85;
MPNotif.THUMB_BORDER_SIZE = 5;
MPNotif.THUMB_IMG_SIZE    = 60;
MPNotif.THUMB_OFFSET      = Math.round(MPNotif.THUMB_IMG_SIZE / 2);
MPNotif.VIDEO_WIDTH       = 595;
MPNotif.VIDEO_HEIGHT      = 334;

MPNotif.prototype.show = function() {
    var self = this;
    this._set_client_config();

    // don't display until HTML body exists
    if (!this.body_el) {
        setTimeout(function() { self.show(); }, 300);
        return;
    }

    this._init_styles();
    this._init_notification_el();

    // wait for any images to load before showing notification
    this._preload_images(this._attach_and_animate);
};

MPNotif.prototype.dismiss = _.safewrap(function() {
    if (!this.marked_as_shown) {
        // unexpected condition: user interacted with notif even though we didn't consider it
        // visible (see _mark_as_shown()); send tracking signals to mark delivery
        this._mark_delivery({'invisible': true});
    }

    var exiting_el = this.showing_video ? this._get_el('video') : this._get_notification_display_el();
    if (this.use_transitions) {
        this._remove_class('bg', 'visible');
        this._add_class(exiting_el, 'exiting');
        setTimeout(this._remove_notification_el, MPNotif.ANIM_TIME);
    } else {
        var notif_attr, notif_start, notif_goal;
        if (this.mini) {
            notif_attr  = 'right';
            notif_start = 20;
            notif_goal  = -100;
        } else {
            notif_attr  = 'top';
            notif_start = MPNotif.NOTIF_TOP;
            notif_goal  = MPNotif.NOTIF_START_TOP + MPNotif.NOTIF_TOP;
        }
        this._animate_els([
            {
                el:    this._get_el('bg'),
                attr:  'opacity',
                start: MPNotif.BG_OPACITY,
                goal:  0.0
            },
            {
                el:    exiting_el,
                attr:  'opacity',
                start: 1.0,
                goal:  0.0
            },
            {
                el:    exiting_el,
                attr:  notif_attr,
                start: notif_start,
                goal:  notif_goal
            }
        ], MPNotif.ANIM_TIME, this._remove_notification_el);
    }
});

MPNotif.prototype._add_class = _.safewrap(function(el, class_name) {
    class_name = MPNotif.MARKUP_PREFIX + '-' + class_name;
    if (typeof el === 'string') {
        el = this._get_el(el);
    }
    if (!el.className) {
        el.className = class_name;
    } else if (!~(' ' + el.className + ' ').indexOf(' ' + class_name + ' ')) {
        el.className += ' ' + class_name;
    }
});
MPNotif.prototype._remove_class = _.safewrap(function(el, class_name) {
    class_name = MPNotif.MARKUP_PREFIX + '-' + class_name;
    if (typeof el === 'string') {
        el = this._get_el(el);
    }
    if (el.className) {
        el.className = (' ' + el.className + ' ')
                .replace(' ' + class_name + ' ', '')
                .replace(/^[\s\xA0]+/, '')
                .replace(/[\s\xA0]+$/, '');
    }
});

MPNotif.prototype._animate_els = _.safewrap(function(anims, mss, done_cb, start_time) {
    var self = this,
        in_progress = false,
        ai, anim,
        cur_time = 1 * new Date(), time_diff;

    start_time = start_time || cur_time;
    time_diff = cur_time - start_time;

    for (ai = 0; ai < anims.length; ai++) {
        anim = anims[ai];
        if (typeof anim.val === 'undefined') {
            anim.val = anim.start;
        }
        if (anim.val !== anim.goal) {
            in_progress = true;
            var anim_diff = anim.goal - anim.start,
                anim_dir = anim.goal >= anim.start ? 1 : -1;
            anim.val = anim.start + anim_diff * time_diff / mss;
            if (anim.attr !== 'opacity') {
                anim.val = Math.round(anim.val);
            }
            if ((anim_dir > 0 && anim.val >= anim.goal) || (anim_dir < 0 && anim.val <= anim.goal)) {
                anim.val = anim.goal;
            }
        }
    }
    if (!in_progress) {
        if (done_cb) {
            done_cb();
        }
        return;
    }

    for (ai = 0; ai < anims.length; ai++) {
        anim = anims[ai];
        if (anim.el) {
            var suffix = anim.attr === 'opacity' ? '' : 'px';
            anim.el.style[anim.attr] = String(anim.val) + suffix;
        }
    }
    setTimeout(function() { self._animate_els(anims, mss, done_cb, start_time); }, 10);
});

MPNotif.prototype._attach_and_animate = _.safewrap(function() {
    var self = this;

    // no possibility to double-display
    if (this.shown || this._get_shown_campaigns()[this.campaign_id]) {
        return;
    }
    this.shown = true;

    this.body_el.appendChild(this.notification_el);
    setTimeout(function() {
        var notif_el = self._get_notification_display_el();
        if (self.use_transitions) {
            if (!self.mini) {
                self._add_class('bg', 'visible');
            }
            self._add_class(notif_el, 'visible');
            self._mark_as_shown();
        } else {
            var notif_attr, notif_start, notif_goal;
            if (self.mini) {
                notif_attr  = 'right';
                notif_start = -100;
                notif_goal  = 20;
            } else {
                notif_attr  = 'top';
                notif_start = MPNotif.NOTIF_START_TOP + MPNotif.NOTIF_TOP;
                notif_goal  = MPNotif.NOTIF_TOP;
            }
            self._animate_els([
                {
                    el:    self._get_el('bg'),
                    attr:  'opacity',
                    start: 0.0,
                    goal:  MPNotif.BG_OPACITY
                },
                {
                    el:    notif_el,
                    attr:  'opacity',
                    start: 0.0,
                    goal:  1.0
                },
                {
                    el:    notif_el,
                    attr:  notif_attr,
                    start: notif_start,
                    goal:  notif_goal
                }
            ], MPNotif.ANIM_TIME, self._mark_as_shown);
        }
    }, 100);
    _.register_event(self._get_el('cancel'), 'click', function(e) {
        e.preventDefault();
        self.dismiss();
    });
    var click_el = self._get_el('button') ||
                       self._get_el('mini-content');
    _.register_event(click_el, 'click', function(e) {
        e.preventDefault();
        if (self.show_video) {
            self._track_event('$campaign_open', {'$resource_type': 'video'});
            self._switch_to_video();
        } else {
            self.dismiss();
            if (self.clickthrough) {
                self._track_event('$campaign_open', {'$resource_type': 'link'}, function() {
                    window.location.href = self.dest_url;
                });
            }
        }
    });
});

MPNotif.prototype._get_el = function(id) {
    return document.getElementById(MPNotif.MARKUP_PREFIX + '-' + id);
};

MPNotif.prototype._get_notification_display_el = function() {
    return this._get_el(this.notif_type);
};

MPNotif.prototype._get_shown_campaigns = function() {
    return this.persistence['props'][CAMPAIGN_IDS_KEY] || (this.persistence['props'][CAMPAIGN_IDS_KEY] = {});
};

MPNotif.prototype._browser_lte = function(browser, version) {
    return this.browser_versions[browser] && this.browser_versions[browser] <= version;
};

MPNotif.prototype._init_image_html = function() {
    var imgs_to_preload = [];

    if (!this.mini) {
        if (this.image_url) {
            imgs_to_preload.push(this.image_url);
            this.img_html = '<img id="img" src="' + this.image_url + '"/>';
        } else {
            this.img_html = '';
        }
        if (this.thumb_image_url) {
            imgs_to_preload.push(this.thumb_image_url);
            this.thumb_img_html =
                    '<div id="thumbborder-wrapper"><div id="thumbborder"></div></div>' +
                    '<img id="thumbnail"' +
                        ' src="' + this.thumb_image_url + '"' +
                        ' width="' + MPNotif.THUMB_IMG_SIZE + '"' +
                        ' height="' + MPNotif.THUMB_IMG_SIZE + '"' +
                    '/>' +
                    '<div id="thumbspacer"></div>';
        } else {
            this.thumb_img_html = '';
        }
    } else {
        this.thumb_image_url = this.thumb_image_url || '//cdn.mxpnl.com/site_media/images/icons/notifications/mini-news-dark.png';
        imgs_to_preload.push(this.thumb_image_url);
    }

    return imgs_to_preload;
};

MPNotif.prototype._init_notification_el = function() {
    var notification_html = '';
    var video_src         = '';
    var video_html        = '';
    var cancel_html       = '<div id="cancel">' +
                                    '<div id="cancel-icon"></div>' +
                                '</div>';

    this.notification_el = document.createElement('div');
    this.notification_el.id = MPNotif.MARKUP_PREFIX + '-wrapper';
    if (!this.mini) {
        // TAKEOVER notification
        var close_html  = (this.clickthrough || this.show_video) ? '' : '<div id="button-close"></div>',
            play_html   = this.show_video ? '<div id="button-play"></div>' : '';
        if (this._browser_lte('ie', 7)) {
            close_html = '';
            play_html = '';
        }
        notification_html =
                '<div id="takeover">' +
                    this.thumb_img_html +
                    '<div id="mainbox">' +
                        cancel_html +
                        '<div id="content">' +
                            this.img_html +
                            '<div id="title">' + this.title + '</div>' +
                            '<div id="body">' + this.body + '</div>' +
                            '<div id="tagline">' +
                                '<a href="http://mixpanel.com?from=inapp" target="_blank">POWERED BY MIXPANEL</a>' +
                            '</div>' +
                        '</div>' +
                        '<div id="button">' +
                            close_html +
                            '<a id="button-link" href="' + this.dest_url + '">' + this.cta + '</a>' +
                            play_html +
                        '</div>' +
                    '</div>' +
                '</div>';
    } else {
        // MINI notification
        notification_html =
                '<div id="mini">' +
                    '<div id="mainbox">' +
                        cancel_html +
                        '<div id="mini-content">' +
                            '<div id="mini-icon">' +
                                '<div id="mini-icon-img"></div>' +
                            '</div>' +
                            '<div id="body">' +
                                '<div id="body-text"><div>' + this.body + '</div></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div id="mini-border"></div>' +
                '</div>';
    }
    if (this.youtube_video) {
        video_src = '//www.youtube.com/embed/' + this.youtube_video +
                '?wmode=transparent&showinfo=0&modestbranding=0&rel=0&autoplay=1&loop=0&vq=hd1080';
        if (this.yt_custom) {
            video_src += '&enablejsapi=1&html5=1&controls=0';
            video_html =
                    '<div id="video-controls">' +
                        '<div id="video-progress" class="video-progress-el">' +
                            '<div id="video-progress-total" class="video-progress-el"></div>' +
                            '<div id="video-elapsed" class="video-progress-el"></div>' +
                        '</div>' +
                        '<div id="video-time" class="video-progress-el"></div>' +
                    '</div>';
        }
    } else if (this.vimeo_video) {
        video_src = '//player.vimeo.com/video/' + this.vimeo_video + '?autoplay=1&title=0&byline=0&portrait=0';
    }
    if (this.show_video) {
        this.video_iframe =
                '<iframe id="' + MPNotif.MARKUP_PREFIX + '-video-frame" ' +
                    'width="' + this.video_width + '" height="' + this.video_height + '" ' +
                    ' src="' + video_src + '"' +
                    ' frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen="1" scrolling="no"' +
                '></iframe>';
        video_html =
                '<div id="video-' + (this.flip_animate ? '' : 'no') + 'flip">' +
                    '<div id="video">' +
                        '<div id="video-holder"></div>' +
                        video_html +
                    '</div>' +
                '</div>';
    }
    var main_html = video_html + notification_html;
    if (this.flip_animate) {
        main_html =
                (this.mini ? notification_html : '') +
                '<div id="flipcontainer"><div id="flipper">' +
                    (this.mini ? video_html : main_html) +
                '</div></div>';
    }

    this.notification_el.innerHTML =
            ('<div id="overlay" class="' + this.notif_type + '">' +
                '<div id="campaignid-' + this.campaign_id + '">' +
                    '<div id="bgwrapper">' +
                        '<div id="bg"></div>' +
                        main_html +
                    '</div>' +
                '</div>' +
            '</div>')
            .replace(/class=\"/g, 'class="' + MPNotif.MARKUP_PREFIX + '-')
            .replace(/id=\"/g, 'id="' + MPNotif.MARKUP_PREFIX + '-');
};

MPNotif.prototype._init_styles = function() {
    if (this.style === 'dark') {
        this.style_vals = {
            bg:             '#1d1f25',
            bg_actions:     '#282b32',
            bg_hover:       '#3a4147',
            bg_light:       '#4a5157',
            border_gray:    '#32353c',
            cancel_opacity: '0.4',
            mini_hover:     '#2a3137',
            text_title:     '#fff',
            text_main:      '#9498a3',
            text_tagline:   '#464851',
            text_hover:     '#ddd'
        };
    } else {
        this.style_vals = {
            bg:             '#fff',
            bg_actions:     '#e7eaee',
            bg_hover:       '#eceff3',
            bg_light:       '#f5f5f5',
            border_gray:    '#e4ecf2',
            cancel_opacity: '1.0',
            mini_hover:     '#fafafa',
            text_title:     '#5c6578',
            text_main:      '#8b949b',
            text_tagline:   '#ced9e6',
            text_hover:     '#7c8598'
        };
    }
    var shadow = '0px 0px 35px 0px rgba(45, 49, 56, 0.7)',
        video_shadow = shadow,
        mini_shadow = shadow,
        thumb_total_size = MPNotif.THUMB_IMG_SIZE + MPNotif.THUMB_BORDER_SIZE * 2,
        anim_seconds = (MPNotif.ANIM_TIME / 1000) + 's';
    if (this.mini) {
        shadow = 'none';
    }

    // don't display on small viewports
    var notif_media_queries = {},
        min_width = MPNotif.NOTIF_WIDTH_MINI + 20;
    notif_media_queries['@media only screen and (max-width: ' + (min_width - 1) + 'px)'] = {
        '#overlay': {
            'display': 'none'
        }
    };
    var notif_styles = {
        '.flipped': {
            'transform': 'rotateY(180deg)'
        },
        '#overlay': {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'overflow': 'auto',
            'text-align': 'center',
            'z-index': '10000',
            'font-family': '"Helvetica", "Arial", sans-serif',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale'
        },
        '#overlay.mini': {
            'height': '0',
            'overflow': 'visible'
        },
        '#overlay a': {
            'width': 'initial',
            'padding': '0',
            'text-decoration': 'none',
            'text-transform': 'none',
            'color': 'inherit'
        },
        '#bgwrapper': {
            'position': 'relative',
            'width': '100%',
            'height': '100%'
        },
        '#bg': {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'min-width': this.doc_width * 4 + 'px',
            'min-height': this.doc_height * 4 + 'px',
            'background-color': 'black',
            'opacity': '0.0',
            '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)', // IE8
            'filter': 'alpha(opacity=60)', // IE5-7
            'transition': 'opacity ' + anim_seconds
        },
        '#bg.visible': {
            'opacity': MPNotif.BG_OPACITY
        },
        '.mini #bg': {
            'width': '0',
            'height': '0',
            'min-width': '0'
        },
        '#flipcontainer': {
            'perspective': '1000px',
            'position': 'absolute',
            'width': '100%'
        },
        '#flipper': {
            'position': 'relative',
            'transform-style': 'preserve-3d',
            'transition': '0.3s'
        },
        '#takeover': {
            'position': 'absolute',
            'left': '50%',
            'width': MPNotif.NOTIF_WIDTH + 'px',
            'margin-left': Math.round(-MPNotif.NOTIF_WIDTH / 2) + 'px',
            'backface-visibility': 'hidden',
            'transform': 'rotateY(0deg)',
            'opacity': '0.0',
            'top': MPNotif.NOTIF_START_TOP + 'px',
            'transition': 'opacity ' + anim_seconds + ', top ' + anim_seconds
        },
        '#takeover.visible': {
            'opacity': '1.0',
            'top': MPNotif.NOTIF_TOP + 'px'
        },
        '#takeover.exiting': {
            'opacity': '0.0',
            'top': MPNotif.NOTIF_START_TOP + 'px'
        },
        '#thumbspacer': {
            'height': MPNotif.THUMB_OFFSET + 'px'
        },
        '#thumbborder-wrapper': {
            'position': 'absolute',
            'top': (-MPNotif.THUMB_BORDER_SIZE) + 'px',
            'left': (MPNotif.NOTIF_WIDTH / 2 - MPNotif.THUMB_OFFSET - MPNotif.THUMB_BORDER_SIZE) + 'px',
            'width': thumb_total_size + 'px',
            'height': (thumb_total_size / 2) + 'px',
            'overflow': 'hidden'
        },
        '#thumbborder': {
            'position': 'absolute',
            'width': thumb_total_size + 'px',
            'height': thumb_total_size + 'px',
            'border-radius': thumb_total_size + 'px',
            'background-color': this.style_vals.bg_actions,
            'opacity': '0.5'
        },
        '#thumbnail': {
            'position': 'absolute',
            'top': '0px',
            'left': (MPNotif.NOTIF_WIDTH / 2 - MPNotif.THUMB_OFFSET) + 'px',
            'width': MPNotif.THUMB_IMG_SIZE + 'px',
            'height': MPNotif.THUMB_IMG_SIZE + 'px',
            'overflow': 'hidden',
            'z-index': '100',
            'border-radius': MPNotif.THUMB_IMG_SIZE + 'px'
        },
        '#mini': {
            'position': 'absolute',
            'right': '20px',
            'top': MPNotif.NOTIF_TOP + 'px',
            'width': this.notif_width + 'px',
            'height': MPNotif.NOTIF_HEIGHT_MINI * 2 + 'px',
            'margin-top': 20 - MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'backface-visibility': 'hidden',
            'opacity': '0.0',
            'transform': 'rotateX(90deg)',
            'transition': 'opacity 0.3s, transform 0.3s, right 0.3s'
        },
        '#mini.visible': {
            'opacity': '1.0',
            'transform': 'rotateX(0deg)'
        },
        '#mini.exiting': {
            'opacity': '0.0',
            'right': '-150px'
        },
        '#mainbox': {
            'border-radius': '4px',
            'box-shadow': shadow,
            'text-align': 'center',
            'background-color': this.style_vals.bg,
            'font-size': '14px',
            'color': this.style_vals.text_main
        },
        '#mini #mainbox': {
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'margin-top': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'border-radius': '3px',
            'transition': 'background-color ' + anim_seconds
        },
        '#mini-border': {
            'height': (MPNotif.NOTIF_HEIGHT_MINI + 6) + 'px',
            'width': (MPNotif.NOTIF_WIDTH_MINI + 6) + 'px',
            'position': 'absolute',
            'top': '-3px',
            'left': '-3px',
            'margin-top': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'border-radius': '6px',
            'opacity': '0.25',
            'background-color': '#fff',
            'z-index': '-1',
            'box-shadow': mini_shadow
        },
        '#mini-icon': {
            'position': 'relative',
            'display': 'inline-block',
            'width': '75px',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'border-radius': '3px 0 0 3px',
            'background-color': this.style_vals.bg_actions,
            'background': 'linear-gradient(135deg, ' + this.style_vals.bg_light + ' 0%, ' + this.style_vals.bg_actions + ' 100%)',
            'transition': 'background-color ' + anim_seconds
        },
        '#mini:hover #mini-icon': {
            'background-color': this.style_vals.mini_hover
        },
        '#mini:hover #mainbox': {
            'background-color': this.style_vals.mini_hover
        },
        '#mini-icon-img': {
            'position': 'absolute',
            'background-image': 'url(' + this.thumb_image_url + ')',
            'width': '48px',
            'height': '48px',
            'top': '20px',
            'left': '12px'
        },
        '#content': {
            'padding': '30px 20px 0px 20px'
        },
        '#mini-content': {
            'text-align': 'left',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'cursor': 'pointer'
        },
        '#img': {
            'width': '328px',
            'margin-top': '30px',
            'border-radius': '5px'
        },
        '#title': {
            'max-height': '600px',
            'overflow': 'hidden',
            'word-wrap': 'break-word',
            'padding': '25px 0px 20px 0px',
            'font-size': '19px',
            'font-weight': 'bold',
            'color': this.style_vals.text_title
        },
        '#body': {
            'max-height': '600px',
            'margin-bottom': '25px',
            'overflow': 'hidden',
            'word-wrap': 'break-word',
            'line-height': '21px',
            'font-size': '15px',
            'font-weight': 'normal',
            'text-align': 'left'
        },
        '#mini #body': {
            'display': 'inline-block',
            'max-width': '250px',
            'margin': '0 0 0 30px',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'font-size': '16px',
            'letter-spacing': '0.8px',
            'color': this.style_vals.text_title
        },
        '#mini #body-text': {
            'display': 'table',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px'
        },
        '#mini #body-text div': {
            'display': 'table-cell',
            'vertical-align': 'middle'
        },
        '#tagline': {
            'margin-bottom': '15px',
            'font-size': '10px',
            'font-weight': '600',
            'letter-spacing': '0.8px',
            'color': '#ccd7e0',
            'text-align': 'left'
        },
        '#tagline a': {
            'color': this.style_vals.text_tagline,
            'transition': 'color ' + anim_seconds
        },
        '#tagline a:hover': {
            'color': this.style_vals.text_hover
        },
        '#cancel': {
            'position': 'absolute',
            'right': '0',
            'width': '8px',
            'height': '8px',
            'padding': '10px',
            'border-radius': '20px',
            'margin': '12px 12px 0 0',
            'box-sizing': 'content-box',
            'cursor': 'pointer',
            'transition': 'background-color ' + anim_seconds
        },
        '#mini #cancel': {
            'margin': '7px 7px 0 0'
        },
        '#cancel-icon': {
            'width': '8px',
            'height': '8px',
            'overflow': 'hidden',
            'background-image': 'url(//cdn.mxpnl.com/site_media/images/icons/notifications/cancel-x.png)',
            'opacity': this.style_vals.cancel_opacity
        },
        '#cancel:hover': {
            'background-color': this.style_vals.bg_hover
        },
        '#button': {
            'display': 'block',
            'height': '60px',
            'line-height': '60px',
            'text-align': 'center',
            'background-color': this.style_vals.bg_actions,
            'border-radius': '0 0 4px 4px',
            'overflow': 'hidden',
            'cursor': 'pointer',
            'transition': 'background-color ' + anim_seconds
        },
        '#button-close': {
            'display': 'inline-block',
            'width': '9px',
            'height': '60px',
            'margin-right': '8px',
            'vertical-align': 'top',
            'background-image': 'url(//cdn.mxpnl.com/site_media/images/icons/notifications/close-x-' + this.style + '.png)',
            'background-repeat': 'no-repeat',
            'background-position': '0px 25px'
        },
        '#button-play': {
            'display': 'inline-block',
            'width': '30px',
            'height': '60px',
            'margin-left': '15px',
            'background-image': 'url(//cdn.mxpnl.com/site_media/images/icons/notifications/play-' + this.style + '-small.png)',
            'background-repeat': 'no-repeat',
            'background-position': '0px 15px'
        },
        'a#button-link': {
            'display': 'inline-block',
            'vertical-align': 'top',
            'text-align': 'center',
            'font-size': '17px',
            'font-weight': 'bold',
            'overflow': 'hidden',
            'word-wrap': 'break-word',
            'color': this.style_vals.text_title,
            'transition': 'color ' + anim_seconds
        },
        '#button:hover': {
            'background-color': this.style_vals.bg_hover,
            'color': this.style_vals.text_hover
        },
        '#button:hover a': {
            'color': this.style_vals.text_hover
        },

        '#video-noflip': {
            'position': 'relative',
            'top': (-this.video_height * 2) + 'px'
        },
        '#video-flip': {
            'backface-visibility': 'hidden',
            'transform': 'rotateY(180deg)'
        },
        '#video': {
            'position': 'absolute',
            'width': (this.video_width - 1) + 'px',
            'height': this.video_height + 'px',
            'top': MPNotif.NOTIF_TOP + 'px',
            'margin-top': '100px',
            'left': '50%',
            'margin-left': Math.round(-this.video_width / 2) + 'px',
            'overflow': 'hidden',
            'border-radius': '5px',
            'box-shadow': video_shadow,
            'transform': 'translateZ(1px)', // webkit rendering bug http://stackoverflow.com/questions/18167981/clickable-link-area-unexpectedly-smaller-after-css-transform
            'transition': 'opacity ' + anim_seconds + ', top ' + anim_seconds
        },
        '#video.exiting': {
            'opacity': '0.0',
            'top': this.video_height + 'px'
        },
        '#video-holder': {
            'position': 'absolute',
            'width': (this.video_width - 1) + 'px',
            'height': this.video_height + 'px',
            'overflow': 'hidden',
            'border-radius': '5px'
        },
        '#video-frame': {
            'margin-left': '-1px',
            'width': this.video_width + 'px'
        },
        '#video-controls': {
            'opacity': '0',
            'transition': 'opacity 0.5s'
        },
        '#video:hover #video-controls': {
            'opacity': '1.0'
        },
        '#video .video-progress-el': {
            'position': 'absolute',
            'bottom': '0',
            'height': '25px',
            'border-radius': '0 0 0 5px'
        },
        '#video-progress': {
            'width': '90%'
        },
        '#video-progress-total': {
            'width': '100%',
            'background-color': this.style_vals.bg,
            'opacity': '0.7'
        },
        '#video-elapsed': {
            'width': '0',
            'background-color': '#6cb6f5',
            'opacity': '0.9'
        },
        '#video #video-time': {
            'width': '10%',
            'right': '0',
            'font-size': '11px',
            'line-height': '25px',
            'color': this.style_vals.text_main,
            'background-color': '#666',
            'border-radius': '0 0 5px 0'
        }
    };

    // IE hacks
    if (this._browser_lte('ie', 8)) {
        _.extend(notif_styles, {
            '* html #overlay': {
                'position': 'absolute'
            },
            '* html #bg': {
                'position': 'absolute'
            },
            'html, body': {
                'height': '100%'
            }
        });
    }
    if (this._browser_lte('ie', 7)) {
        _.extend(notif_styles, {
            '#mini #body': {
                'display': 'inline',
                'zoom': '1',
                'border': '1px solid ' + this.style_vals.bg_hover
            },
            '#mini #body-text': {
                'padding': '20px'
            },
            '#mini #mini-icon': {
                'display': 'none'
            }
        });
    }

    // add vendor-prefixed style rules
    var VENDOR_STYLES   = ['backface-visibility', 'border-radius', 'box-shadow', 'opacity',
                               'perspective', 'transform', 'transform-style', 'transition'],
        VENDOR_PREFIXES = ['khtml', 'moz', 'ms', 'o', 'webkit'];
    for (var selector in notif_styles) {
        for (var si = 0; si < VENDOR_STYLES.length; si++) {
            var prop = VENDOR_STYLES[si];
            if (prop in notif_styles[selector]) {
                var val = notif_styles[selector][prop];
                for (var pi = 0; pi < VENDOR_PREFIXES.length; pi++) {
                    notif_styles[selector]['-' + VENDOR_PREFIXES[pi] + '-' + prop] = val;
                }
            }
        }
    }

    var inject_styles = function(styles, media_queries) {
        var create_style_text = function(style_defs) {
            var st = '';
            for (var selector in style_defs) {
                var mp_selector = selector
                        .replace(/#/g, '#' + MPNotif.MARKUP_PREFIX + '-')
                        .replace(/\./g, '.' + MPNotif.MARKUP_PREFIX + '-');
                st += '\n' + mp_selector + ' {';
                var props = style_defs[selector];
                for (var k in props) {
                    st += k + ':' + props[k] + ';';
                }
                st += '}';
            }
            return st;
        };
        var create_media_query_text = function(mq_defs) {
            var mqt = '';
            for (var mq in mq_defs) {
                mqt += '\n' + mq + ' {' + create_style_text(mq_defs[mq]) + '\n}';
            }
            return mqt;
        };

        var style_text = create_style_text(styles) + create_media_query_text(media_queries),
            head_el = document.head || document.getElementsByTagName('head')[0] || document.documentElement,
            style_el = document.createElement('style');
        head_el.appendChild(style_el);
        style_el.setAttribute('type', 'text/css');
        if (style_el.styleSheet) { // IE
            style_el.styleSheet.cssText = style_text;
        } else {
            style_el.textContent = style_text;
        }
    };
    inject_styles(notif_styles, notif_media_queries);
};

MPNotif.prototype._init_video = _.safewrap(function() {
    if (!this.video_url) {
        return;
    }
    var self = this;

    // Youtube iframe API compatibility
    self.yt_custom = 'postMessage' in window;

    self.dest_url = self.video_url;
    var youtube_match = self.video_url.match(
                // http://stackoverflow.com/questions/2936467/parse-youtube-video-id-using-preg-match
                /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i
            ),
        vimeo_match = self.video_url.match(
                /vimeo\.com\/.*?(\d+)/i
            );
    if (youtube_match) {
        self.show_video = true;
        self.youtube_video = youtube_match[1];

        if (self.yt_custom) {
            window['onYouTubeIframeAPIReady'] = function() {
                if (self._get_el('video-frame')) {
                    self._yt_video_ready();
                }
            };

            // load Youtube iframe API; see https://developers.google.com/youtube/iframe_api_reference
            var tag = document.createElement('script');
            tag.src = '//www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    } else if (vimeo_match) {
        self.show_video = true;
        self.vimeo_video = vimeo_match[1];
    }

    // IE <= 7, FF <= 3: fall through to video link rather than embedded player
    if (self._browser_lte('ie', 7) || self._browser_lte('firefox', 3)) {
        self.show_video = false;
        self.clickthrough = true;
    }
});

MPNotif.prototype._mark_as_shown = _.safewrap(function() {
    // click on background to dismiss
    var self = this;
    _.register_event(self._get_el('bg'), 'click', function() {
        self.dismiss();
    });

    var get_style = function(el, style_name) {
        var styles = {};
        if (document.defaultView && document.defaultView.getComputedStyle) {
            styles = document.defaultView.getComputedStyle(el, null); // FF3 requires both args
        } else if (el.currentStyle) { // IE
            styles = el.currentStyle;
        }
        return styles[style_name];
    };

    if (this.campaign_id) {
        var notif_el = this._get_el('overlay');
        if (notif_el && get_style(notif_el, 'visibility') !== 'hidden' && get_style(notif_el, 'display') !== 'none') {
            this._mark_delivery();
        }
    }
});

MPNotif.prototype._mark_delivery = _.safewrap(function(extra_props) {
    if (!this.marked_as_shown) {
        this.marked_as_shown = true;

        if (this.campaign_id) {
            // mark notification shown (local cache)
            this._get_shown_campaigns()[this.campaign_id] = 1 * new Date();
            this.persistence.save();
        }

        // track delivery
        this._track_event('$campaign_delivery', extra_props);

        // mark notification shown (mixpanel property)
        this.mixpanel['people']['append']({
            '$campaigns': this.campaign_id,
            '$notifications': {
                'campaign_id': this.campaign_id,
                'message_id':  this.message_id,
                'type':        'web',
                'time':        new Date()
            }
        });
    }
});

MPNotif.prototype._preload_images = function(all_loaded_cb) {
    var self = this;
    if (this.imgs_to_preload.length === 0) {
        all_loaded_cb();
        return;
    }

    var preloaded_imgs = 0;
    var img_objs = [];
    var onload = function() {
        preloaded_imgs++;
        if (preloaded_imgs === self.imgs_to_preload.length && all_loaded_cb) {
            all_loaded_cb();
            all_loaded_cb = null;
        }
    };
    for (var i = 0; i < this.imgs_to_preload.length; i++) {
        var img = new Image();
        img.onload = onload;
        img.src = this.imgs_to_preload[i];
        if (img.complete) {
            onload();
        }
        img_objs.push(img);
    }

    // IE6/7 doesn't fire onload reliably
    if (this._browser_lte('ie', 7)) {
        setTimeout(function() {
            var imgs_loaded = true;
            for (i = 0; i < img_objs.length; i++) {
                if (!img_objs[i].complete) {
                    imgs_loaded = false;
                }
            }
            if (imgs_loaded && all_loaded_cb) {
                all_loaded_cb();
                all_loaded_cb = null;
            }
        }, 500);
    }
};

MPNotif.prototype._remove_notification_el = _.safewrap(function() {
    window.clearInterval(this._video_progress_checker);
    this.notification_el.style.visibility = 'hidden';
    this.body_el.removeChild(this.notification_el);
});

MPNotif.prototype._set_client_config = function() {
    var get_browser_version = function(browser_ex) {
        var match = navigator.userAgent.match(browser_ex);
        return match && match[1];
    };
    this.browser_versions = {};
    this.browser_versions['chrome']  = get_browser_version(/Chrome\/(\d+)/);
    this.browser_versions['firefox'] = get_browser_version(/Firefox\/(\d+)/);
    this.browser_versions['ie']      = get_browser_version(/MSIE (\d+).+/);
    if (!this.browser_versions['ie'] && !(window.ActiveXObject) && 'ActiveXObject' in window) {
        this.browser_versions['ie'] = 11;
    }

    this.body_el = document.body || document.getElementsByTagName('body')[0];
    if (this.body_el) {
        this.doc_width = Math.max(
                this.body_el.scrollWidth, document.documentElement.scrollWidth,
                this.body_el.offsetWidth, document.documentElement.offsetWidth,
                this.body_el.clientWidth, document.documentElement.clientWidth
            );
        this.doc_height = Math.max(
                this.body_el.scrollHeight, document.documentElement.scrollHeight,
                this.body_el.offsetHeight, document.documentElement.offsetHeight,
                this.body_el.clientHeight, document.documentElement.clientHeight
            );
    }

    // detect CSS compatibility
    var ie_ver = this.browser_versions['ie'];
    var sample_styles = document.createElement('div').style,
        is_css_compatible = function(rule) {
            if (rule in sample_styles) {
                return true;
            }
            if (!ie_ver) {
                rule = rule[0].toUpperCase() + rule.slice(1);
                var props = ['O' + rule, 'Webkit' + rule, 'Moz' + rule];
                for (var i = 0; i < props.length; i++) {
                    if (props[i] in sample_styles) {
                        return true;
                    }
                }
            }
            return false;
        };
    this.use_transitions = this.body_el &&
        is_css_compatible('transition') &&
        is_css_compatible('transform');
    this.flip_animate = (this.browser_versions['chrome'] >= 33 || this.browser_versions['firefox'] >= 15) &&
        this.body_el &&
        is_css_compatible('backfaceVisibility') &&
        is_css_compatible('perspective') &&
        is_css_compatible('transform');
};

MPNotif.prototype._switch_to_video = _.safewrap(function() {
    var self = this,
        anims = [
            {
                el:    self._get_notification_display_el(),
                attr:  'opacity',
                start: 1.0,
                goal:  0.0
            },
            {
                el:    self._get_notification_display_el(),
                attr:  'top',
                start: MPNotif.NOTIF_TOP,
                goal:  -500
            },
            {
                el:    self._get_el('video-noflip'),
                attr:  'opacity',
                start: 0.0,
                goal:  1.0
            },
            {
                el:    self._get_el('video-noflip'),
                attr:  'top',
                start: -self.video_height * 2,
                goal:  0
            }
        ];

    if (self.mini) {
        var bg = self._get_el('bg'),
            overlay = self._get_el('overlay');
        bg.style.width = '100%';
        bg.style.height = '100%';
        overlay.style.width = '100%';

        self._add_class(self._get_notification_display_el(), 'exiting');
        self._add_class(bg, 'visible');

        anims.push({
            el:    self._get_el('bg'),
            attr:  'opacity',
            start: 0.0,
            goal:  MPNotif.BG_OPACITY
        });
    }

    var video_el = self._get_el('video-holder');
    video_el.innerHTML = self.video_iframe;

    var video_ready = function() {
        if (window['YT'] && window['YT']['loaded']) {
            self._yt_video_ready();
        }
        self.showing_video = true;
        self._get_notification_display_el().style.visibility = 'hidden';
    };
    if (self.flip_animate) {
        self._add_class('flipper', 'flipped');
        setTimeout(video_ready, MPNotif.ANIM_TIME);
    } else {
        self._animate_els(anims, MPNotif.ANIM_TIME, video_ready);
    }
});

MPNotif.prototype._track_event = function(event_name, properties, cb) {
    if (this.campaign_id) {
        properties = properties || {};
        properties = _.extend(properties, {
            'campaign_id':     this.campaign_id,
            'message_id':      this.message_id,
            'message_type':    'web_inapp',
            'message_subtype': this.notif_type
        });
        this.mixpanel['track'](event_name, properties, cb);
    } else if (cb) {
        cb.call();
    }
};

MPNotif.prototype._yt_video_ready = _.safewrap(function() {
    var self = this;
    if (self.video_inited) {
        return;
    }
    self.video_inited = true;

    var progress_bar  = self._get_el('video-elapsed'),
        progress_time = self._get_el('video-time'),
        progress_el   = self._get_el('video-progress');

    new window['YT']['Player'](MPNotif.MARKUP_PREFIX + '-video-frame', {
        'events': {
            'onReady': function(event) {
                var ytplayer = event['target'],
                    video_duration = ytplayer['getDuration'](),
                    pad = function(i) {
                        return ('00' + i).slice(-2);
                    },
                    update_video_time = function(current_time) {
                        var secs = Math.round(video_duration - current_time),
                            mins = Math.floor(secs / 60),
                            hours = Math.floor(mins / 60);
                        secs -= mins * 60;
                        mins -= hours * 60;
                        progress_time.innerHTML = '-' + (hours ? hours + ':' : '') + pad(mins) + ':' + pad(secs);
                    };
                update_video_time(0);
                self._video_progress_checker = window.setInterval(function() {
                    var current_time = ytplayer['getCurrentTime']();
                    progress_bar.style.width = (current_time / video_duration * 100) + '%';
                    update_video_time(current_time);
                }, 250);
                _.register_event(progress_el, 'click', function(e) {
                    var clickx = Math.max(0, e.pageX - progress_el.getBoundingClientRect().left);
                    ytplayer['seekTo'](video_duration * clickx / progress_el.clientWidth, true);
                });
            }
        }
    });
});

// EXPORTS (for closure compiler)

// MixpanelLib Exports
MixpanelLib.prototype['init']                            = MixpanelLib.prototype.init;
MixpanelLib.prototype['reset']                           = MixpanelLib.prototype.reset;
MixpanelLib.prototype['disable']                         = MixpanelLib.prototype.disable;
MixpanelLib.prototype['time_event']                      = MixpanelLib.prototype.time_event;
MixpanelLib.prototype['track']                           = MixpanelLib.prototype.track;
MixpanelLib.prototype['track_links']                     = MixpanelLib.prototype.track_links;
MixpanelLib.prototype['track_forms']                     = MixpanelLib.prototype.track_forms;
MixpanelLib.prototype['track_pageview']                  = MixpanelLib.prototype.track_pageview;
MixpanelLib.prototype['register']                        = MixpanelLib.prototype.register;
MixpanelLib.prototype['register_once']                   = MixpanelLib.prototype.register_once;
MixpanelLib.prototype['unregister']                      = MixpanelLib.prototype.unregister;
MixpanelLib.prototype['identify']                        = MixpanelLib.prototype.identify;
MixpanelLib.prototype['alias']                           = MixpanelLib.prototype.alias;
MixpanelLib.prototype['name_tag']                        = MixpanelLib.prototype.name_tag;
MixpanelLib.prototype['set_config']                      = MixpanelLib.prototype.set_config;
MixpanelLib.prototype['get_config']                      = MixpanelLib.prototype.get_config;
MixpanelLib.prototype['get_property']                    = MixpanelLib.prototype.get_property;
MixpanelLib.prototype['get_distinct_id']                 = MixpanelLib.prototype.get_distinct_id;
MixpanelLib.prototype['toString']                        = MixpanelLib.prototype.toString;
MixpanelLib.prototype['_check_and_handle_notifications'] = MixpanelLib.prototype._check_and_handle_notifications;
MixpanelLib.prototype['_show_notification']              = MixpanelLib.prototype._show_notification;

// MixpanelPersistence Exports
MixpanelPersistence.prototype['properties']            = MixpanelPersistence.prototype.properties;
MixpanelPersistence.prototype['update_search_keyword'] = MixpanelPersistence.prototype.update_search_keyword;
MixpanelPersistence.prototype['update_referrer_info']  = MixpanelPersistence.prototype.update_referrer_info;
MixpanelPersistence.prototype['get_cross_subdomain']   = MixpanelPersistence.prototype.get_cross_subdomain;
MixpanelPersistence.prototype['clear']                 = MixpanelPersistence.prototype.clear;

// MixpanelPeople Exports
MixpanelPeople.prototype['set']           = MixpanelPeople.prototype.set;
MixpanelPeople.prototype['set_once']      = MixpanelPeople.prototype.set_once;
MixpanelPeople.prototype['increment']     = MixpanelPeople.prototype.increment;
MixpanelPeople.prototype['append']        = MixpanelPeople.prototype.append;
MixpanelPeople.prototype['union']         = MixpanelPeople.prototype.union;
MixpanelPeople.prototype['track_charge']  = MixpanelPeople.prototype.track_charge;
MixpanelPeople.prototype['clear_charges'] = MixpanelPeople.prototype.clear_charges;
MixpanelPeople.prototype['delete_user']   = MixpanelPeople.prototype.delete_user;
MixpanelPeople.prototype['toString']      = MixpanelPeople.prototype.toString;

_.safewrap_class(MixpanelLib, ['identify', '_check_and_handle_notifications', '_show_notification']);

var instances = {};
var extend_mp = function() {
    // add all the sub mixpanel instances
    _.each(instances, function(instance, name) {
        if (name !== PRIMARY_INSTANCE_NAME) { mixpanel_master[name] = instance; }
    });

    // add private functions as _
    mixpanel_master['_'] = _;
};

var override_mp_init_func = function() {
    // we override the snippets init function to handle the case where a
    // user initializes the mixpanel library after the script loads & runs
    mixpanel_master['init'] = function(token, config, name) {
        if (name) {
            // initialize a sub library
            if (!mixpanel_master[name]) {
                mixpanel_master[name] = instances[name] = create_mplib(token, config, name);
                mixpanel_master[name]._loaded();
            }
            return mixpanel_master[name];
        } else {
            var instance = mixpanel_master;

            if (instances[PRIMARY_INSTANCE_NAME]) {
                // main mixpanel lib already initialized
                instance = instances[PRIMARY_INSTANCE_NAME];
            } else if (token) {
                // intialize the main mixpanel lib
                instance = create_mplib(token, config, PRIMARY_INSTANCE_NAME);
                instance._loaded();
                instances[PRIMARY_INSTANCE_NAME] = instance;
            }

            mixpanel_master = instance;
            if (init_type === INIT_SNIPPET) {
                window[PRIMARY_INSTANCE_NAME] = mixpanel_master;
            }
            extend_mp();
        }
    };
};

var add_dom_loaded_handler = function() {
    // Cross browser DOM Loaded support
    function dom_loaded_handler() {
        // function flag since we only want to execute this once
        if (dom_loaded_handler.done) { return; }
        dom_loaded_handler.done = true;

        DOM_LOADED = true;
        ENQUEUE_REQUESTS = false;

        _.each(instances, function(inst) {
            inst._dom_loaded();
        });
    }

    function do_scroll_check() {
        try {
            document.documentElement.doScroll('left');
        } catch(e) {
            setTimeout(do_scroll_check, 1);
            return;
        }

        dom_loaded_handler();
    }

    if (document.addEventListener) {
        if (document.readyState === 'complete') {
            // safari 4 can fire the DOMContentLoaded event before loading all
            // external JS (including this file). you will see some copypasta
            // on the internet that checks for 'complete' and 'loaded', but
            // 'loaded' is an IE thing
            dom_loaded_handler();
        } else {
            document.addEventListener('DOMContentLoaded', dom_loaded_handler, false);
        }
    } else if (document.attachEvent) {
        // IE
        document.attachEvent('onreadystatechange', dom_loaded_handler);

        // check to make sure we arn't in a frame
        var toplevel = false;
        try {
            toplevel = window.frameElement === null;
        } catch(e) {
            // noop
        }

        if (document.documentElement.doScroll && toplevel) {
            do_scroll_check();
        }
    }

    // fallback handler, always will work
    _.register_event(window, 'load', dom_loaded_handler, true);
};

var add_dom_event_counting_handlers = function(instance) {
    var name = instance.get_config('name');

    instance.mp_counts = instance.mp_counts || {};
    instance.mp_counts['$__c'] = parseInt(_.cookie.get('mp_' + name + '__c')) || 0;

    var increment_count = function() {
        instance.mp_counts['$__c'] = (instance.mp_counts['$__c'] || 0) + 1;
        _.cookie.set('mp_' + name + '__c', instance.mp_counts['$__c'], 1, true);
    };

    var evtCallback = function() {
        try {
            instance.mp_counts = instance.mp_counts || {};
            increment_count();
        } catch (e) {
            console$1.error(e);
        }
    };
    _.register_event(document, 'submit', evtCallback);
    _.register_event(document, 'change', evtCallback);
    var mousedownTarget = null;
    _.register_event(document, 'mousedown', function(e) {
        mousedownTarget = e.target;
    });
    _.register_event(document, 'mouseup', function(e) {
        if (e.target === mousedownTarget) {
            evtCallback(e);
        }
    });
};

function init_as_module() {
    init_type = INIT_MODULE;
    mixpanel_master = new MixpanelLib();

    override_mp_init_func();
    mixpanel_master['init']();
    add_dom_loaded_handler();

    return mixpanel_master;
}

var mixpanel = init_as_module();

module.exports = mixpanel;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(19);
exports.Duplex = __webpack_require__(4);
exports.Transform = __webpack_require__(21);
exports.PassThrough = __webpack_require__(44);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(12);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(16).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(17);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(8).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(39);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(40);
var destroyImpl = __webpack_require__(18);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(4);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(20).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(4);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(20).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).EventEmitter;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(43)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(17);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(8).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(18);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(4);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(4);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(41).setImmediate, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(2).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(4);

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(48);
var util = __webpack_require__(50);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(23);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(51);
exports.encode = exports.stringify = __webpack_require__(52);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __webpack_require__(6);
const dom_1 = __webpack_require__(62);
const connect = new sdk_1.Connect();
// document.addEventListener('DOMContentLoaded', function(e) {
//     // ? good idea ?
// });
// create custom shadow DOM elements
// customElements.define('x-foo', XFooDOMElement);
customElements.define('login-button', dom_1.LoginButton);
window.addEventListener('message', (e) => {
    connect.OAuth().afterPopup(e);
});
connect.IMPLICIT_FLOW = sdk_1.OAuthFlows.IMPLICIT_FLOW;
connect.PASSWORD_FLOW = sdk_1.OAuthFlows.PASSWORD_FLOW;
connect.CLIENT_CREDENTIALS_FLOW = sdk_1.OAuthFlows.CLIENT_CREDENTIALS_FLOW;
connect.AUTHORIZATION_FLOW = sdk_1.OAuthFlows.AUTHORIZATION_FLOW;
// export full module
module.exports = connect;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Configuration helper
 */
class ConfigModule {
    constructor() {
    }
    getEnv() {
        return this.environment;
    }
    getConfig() {
        return this.config;
    }
    init(environment) {
        if (environment == null
            || ['dev', 'staging', 'prod'].indexOf(environment) === -1) {
            throw new Error('@360connect: parameter "environment" is required when initializing app and must be "dev|staging|prod"');
        }
        if (environment === 'dev') {
            console.warn(`@360connect: you are using the "dev" environment which is meant to be for local development only. If you are a developer use "staging" instead.`);
        }
        this.environment = environment;
        this.config = __webpack_require__(27)(`./environment.${environment}.json`);
    }
}
exports.ConfigModule = ConfigModule;
exports.Config = new ConfigModule();


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./environment.dev.json": 28,
	"./environment.prod.json": 29,
	"./environment.staging.json": 30
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 27;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {
	"api": {
		"PROTOCOL": "http",
		"DOMAIN": "360medics.dev"
	},
	"mixpanel": {
		"token": "da6b24675562342ee90f37a0a67d0ae4"
	}
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = {
	"api": {
		"PROTOCOL": "https",
		"DOMAIN": "360medics.com"
	},
	"mixpanel": {
		"token": ""
	}
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {
	"api": {
		"PROTOCOL": "https",
		"DOMAIN": "beta.360medics.com"
	},
	"mixpanel": {
		"token": ""
	}
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Local storage helper class.
 */
class LocalModule {
    constructor() {
    }
    is(key) {
        const value = localStorage.getItem(key);
        return (value == null) ? false : true;
    }
    erase(key) {
        localStorage.removeItem(key);
    }
    retrieve(key) {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
    save(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
}
exports.Local = new LocalModule();


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mixpanel = __webpack_require__(11);
const request = __webpack_require__(33);
const sdk_1 = __webpack_require__(6);
const oauth_http_1 = __webpack_require__(10);
const oauth_http_2 = __webpack_require__(10);
const GET = 'GET';
const POST = 'POST';
exports.OAuthFlows = {
    IMPLICIT_FLOW: 'implicit',
    PASSWORD_FLOW: 'password',
    CLIENT_CREDENTIALS_FLOW: 'client_credentials',
    AUTHORIZATION_FLOW: 'authorization_code',
};
/**
 * Main wrapper 360 connect class.
 */
class OAuth {
    constructor() {
        this.requiredOAuthParams = [];
        this.popup = null;
        this.onLogin = () => { };
        this.userApiKey = null;
    }
    initialize(clientConfig) {
        this.config = sdk_1.Config.getConfig()['api'];
        this.clientConfig = clientConfig;
        this.clientConfig.flow = (typeof this.clientConfig.flow === 'undefined') ? exports.OAuthFlows.AUTHORIZATION_FLOW : this.clientConfig.flow;
        return this;
    }
    getEnv() {
        return this.clientConfig.environment;
    }
    /**
     * The login url can vary from a classic authorization mode (client secret is not needed)
     * and a implicit mode where client secret is neede (see FOSOAuthServerBundle requires it)
     *
     * A few more params for the backend are also passed (oauth to 1), and an optional
     * user api key to skip login if valid (using the symfony api key guard authenticator)
     */
    getLoginUrl(params = null) {
        // least requirements
        this.require(['scope']);
        // ever needed parameters
        params.is_oauth = 1; // always add a usefull for symfony backend
        params.clientId = this.clientConfig.clientId;
        params.clientSecret = this.clientConfig.clientSecret;
        // response type varies depending on oauth mode
        if (this.clientConfig.flow === exports.OAuthFlows.AUTHORIZATION_FLOW) {
            params.response_type = 'code';
        }
        else if (this.clientConfig.flow === exports.OAuthFlows.IMPLICIT_FLOW) {
            params.response_type = 'token';
        }
        else {
            throw new Error(`@360connect: invalid value for flow when building login url`);
        }
        // optional skip login window using our
        // backend guard api key authenticator
        if (null !== this.userApiKey) {
            params.api_key = this.userApiKey;
        }
        return this.endpoint(OAuth.LOGIN_PATH, params);
    }
    setUserApiKey(apiKey) {
        this.userApiKey = apiKey;
        return this;
    }
    loading(bool) {
        if (true === bool) {
            this.dispatchStatusChangeEvent('loading');
        }
        else {
        }
    }
    logout() {
        sdk_1.Local.erase('time');
        sdk_1.Local.erase('loginStatus');
        sdk_1.Local.erase('authorizationTokens');
        this.dispatchStatusChangeEvent('logout');
    }
    /**
     * Show either a loggin popup or redirect to authorization
     * depending if normal auth is used or implicit grants.
     * When implicit grant are used the auth window will redirect to redirect_uri
     * with access_token (and rest of response) in a hash tag.
     * This is why we must parse this hash and simulate the "afterLogin" trigger
     * otherwised normaly listened to in index.ts manually
     */
    login(params) {
        // a different url will be build depending on the oauth
        // grant mode chosen (can be authorization code or implicit at this point)
        const loginUrl = this.getLoginUrl(params);
        // if we are using a normal popup mode (for the web)
        // just trigger a popup with the authorization page
        // else redirect when using implicit grants
        if (this.clientConfig.flow === exports.OAuthFlows.IMPLICIT_FLOW) {
            window.location.href = this.getLoginUrl(params);
        }
        else {
            this.popup = window.open(this.getLoginUrl(params), '_blank', 'status=0,toolbar=0,height=610,width=540');
        }
        return this;
    }
    afterLogin(method) {
        this.onLogin = method;
        if (this.clientConfig.flow === exports.OAuthFlows.IMPLICIT_FLOW) {
            // when using implicit grants access token is returned as a query string (probably behind
            // a hashtag url) (implicit flow is specificaly designed for single page web apps)
            if (window.location.hash) {
                // then its a hash response !
                let data = oauth_http_1.QueryParams.getHashQueryParams();
                if (typeof (data.token_type !== 'undefined') && data.token_type === 'bearer') {
                    // save local data and blahblah blah
                    sdk_1.Local.save('authorizationTokens', data);
                    this.dispatchStatusChangeEvent('authorized');
                    data.origin = '_360connect';
                    this.afterPopup({ data: data });
                    window.location.hash = null;
                }
            }
            else {
                // case when there is not hashtag but still return query params after login
                const data = oauth_http_1.QueryParams.getQueryParams();
                if (typeof data.code !== 'undefined') {
                    sdk_1.Local.save('authorizationTokens', data);
                    sdk_1.Local.save('authorizationTokens', data);
                    this.dispatchStatusChangeEvent('authorized');
                    data.origin = '_360connect';
                    this.afterPopup({ data: data });
                    window.location.search = '';
                }
            }
        }
        return this;
    }
    afterPopup(e) {
        // @todo Popup on close does not trigger the next event
        if (this.popup !== null) {
            this.popup.close();
            this.popup = null;
        }
        if (e.data.origin != null && e.data.origin === '_360connect') {
            if (typeof this.onLogin === 'function') {
                this.onLogin(e.data);
            }
        }
    }
    getAccessToken() {
        const data = sdk_1.Local.retrieve('authorizationTokens');
        return (data == null) ? null : data.access_token;
    }
    setAccessToken(token) {
        // @todo
    }
    getUser() {
        const data = sdk_1.Local.retrieve('loginStatus');
        return (data === null) ? null : data.user;
    }
    getRefreshToken() {
        const data = sdk_1.Local.retrieve('authorizationTokens');
        return (data == null) ? null : data.refresh_token;
    }
    setRefreshToken(token) {
        // @todo
    }
    /**
     * Authorization code grants, the classic way for OAuth with a popup or redirection.
     * http://oauthlib.readthedocs.io/en/latest/oauth2/grants/authcode.html
     */
    requestAuthorizationCode(params) {
        params.grant_type = 'authorization_code';
        params.client_id = this.clientConfig.clientId;
        params.client_secret = this.clientConfig.clientSecret;
        this.require(['scope', 'grant_type']);
        const url = this.endpoint(OAuth.TOKEN_PATH, params);
        this.dispatchStatusChangeEvent('loading');
        sdk_1.Local.erase('authorizationTokens');
        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                const data = JSON.parse(body);
                if (res.statusCode === 200) {
                    sdk_1.Local.save('authorizationTokens', data);
                    this.dispatchStatusChangeEvent('authorized');
                    resolve(new oauth_http_2.TokenResponse(data, res));
                }
                else {
                    this.dispatchStatusChangeEvent('unauthorized');
                    resolve(new oauth_http_2.TokenResponse(data, res));
                }
            });
        });
    }
    /**
     * Request password grant type for use in mobile apps mainly.
     *
     * http://oauthlib.readthedocs.io/en/latest/oauth2/grants/password.html
     */
    requestPasswordGrants(params) {
        console.warn(`@360connect: OAuth flow with password grants requests is NOT STABLE yet and should NOT BE USED IN PRODUCTION`);
        params.grant_type = 'password';
        params.client_id = this.clientConfig.clientId;
        params.client_secret = this.clientConfig.clientSecret;
        this.require(['username', 'password', 'scope', 'grant_type']);
        const url = this.endpoint(OAuth.TOKEN_PATH, params);
        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                const data = JSON.parse(body);
                if (res.statusCode === 200) {
                    this.dispatchStatusChangeEvent('authorized');
                    resolve(new oauth_http_2.TokenResponse(data, res));
                }
                else {
                    this.dispatchStatusChangeEvent('unauthorized');
                    resolve(new oauth_http_2.TokenResponse(data, res));
                }
            });
        });
    }
    /**
     * Get login status from Oauth protected API endpoint.
     */
    getLoginStatus(refresh = false) {
        const url = this.endpoint(['api', 'user', 'status']);
        const headers = this.authHeaders();
        // if we skip cached responses
        if (refresh === false) {
            const data = sdk_1.Local.retrieve('loginStatus');
            if (data != null) {
                // dispatch change on the user, the LoginButton listens to this
                this.tryToIdentifyProfile(data.user);
                return Promise.resolve(new oauth_http_2.TokenResponse(data, { statusCode: 200 }));
            }
        }
        else {
            sdk_1.Local.erase('loginStatus');
        }
        this.loading(true);
        return new Promise((resolve, reject) => {
            request({ url: url, method: POST, headers: headers }, (err, res, body) => {
                let data;
                if (res.statusCode === 200) {
                    data = JSON.parse(body);
                    this.tryToIdentifyProfile(data.user);
                }
                else {
                    // see APi endpoints server side
                    data = { status: 'unkown', user: null };
                }
                sdk_1.Local.save('loginStatus', data);
                // dispatch change on the user, the LoginButton listens to this
                this.dispatchStatusChangeEvent('login');
                resolve(new oauth_http_2.TokenResponse(data, res));
            });
        });
    }
    endpoint(path, params = null) {
        params = this.configureOAuthParams(params);
        const url = `${this.config.PROTOCOL}://${this.config.DOMAIN}/${path.join('/')}`;
        let uris = [];
        for (let key in params) {
            if (params.hasOwnProperty(key) && params[key] != null) {
                uris.push(`${this.toSnakeCase(key)}=${params[key]}`);
            }
        }
        const uri = (uris.length > 0) ? `?${uris.join('&')}` : '';
        return `${url}${uri}`;
    }
    /**
     * Save access token and refresh token in the cache after success
     * Dispatch change status event for login/button or other UI stuff.
     */
    onAuthSuccess(eventName, jsonAuthResData) {
        sdk_1.Local.save('authorizationTokens', jsonAuthResData);
        this.dispatchStatusChangeEvent('authorized');
    }
    configureOAuthParams(params) {
        if (typeof params === 'undefined') {
            params = { redirectUri: null, scope: null };
        }
        for (let key of this.requiredOAuthParams) {
            if (typeof params[key] === 'undefined' || params[key] == null) {
                throw new Error(`OAuth parameter ${key} is required`);
            }
        }
        this.requiredOAuthParams = [];
        return params;
    }
    dispatchStatusChangeEvent(status) {
        const event = new CustomEvent('status:change', { detail: { status: status, user: this.getUser() } });
        window.dispatchEvent(event);
    }
    require(keys) {
        this.requiredOAuthParams = keys;
        return this;
    }
    toSnakeCase(str) {
        return str.split(/(?=[A-Z])/).join('_').toLowerCase();
    }
    authHeaders() {
        return {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${this.getAccessToken()}`,
        };
    }
    jsonHeaders() {
        return {
            'Content-Type': 'application/json; charset=utf-8',
        };
    }
    tryToIdentifyProfile(userData) {
        if (null == userData) {
            return;
        }
        // full or reduced scopes
        if (typeof userData.email !== 'undefined') {
            mixpanel.identify(userData.email);
        }
        else {
            // anonymous scope, no one to identify oralias
        }
    }
}
OAuth.AUTH_PATH = ['oauth', 'v2', 'auth']; // rest/oauth/v2/auth
OAuth.TOKEN_PATH = ['oauth', 'v2', 'token']; // rest/oauth/v2/token
OAuth.LOGIN_PATH = ['oauth', 'v2', 'auth'];
OAuth.ANON_SCOPE = 'anon_scope';
OAuth.REDUCED_SCOPE = 'reduced_scope';
OAuth.FULL_SCOPE = 'full_scope';
OAuth.DEFAULT_SCOPE = 'anon_scope';
exports.OAuth = OAuth;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * @fileoverview Http request in node.js
 * @author douzi <liaowei08@gmail.com> 
 */
var http = __webpack_require__(36);
var util = __webpack_require__(9);
var url = __webpack_require__(22);
var path = __webpack_require__(24);
var querystring = __webpack_require__(23);
var file = __webpack_require__(56);

/**
 * @description
 * http request
 * @param {object|string} [options]
 * @param {function} [callback]
 * @example
 * request('url', function(err, res, body) { });
 * request({url: '', headers: {}, method: 'POST'}, function(err, res, body) { });
 */
function request(options, callback) {
  var opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    encoding: 'utf8',
    // If the callback body is buffer, it can hanlder document pipe simply
    isBuffer: false,
    json: false
  };

  if (util.isString(options)) {
    opts.url = options;
  } else {
    util.extend(opts, options);
  }

  // Append request data
  if (opts.data) {
    if (opts.method === 'GET') {
      opts.url += '?' + querystring.stringify(opts.data);
    } else {
      opts.data = JSON.stringify(opts.data);
      opts.headers['Content-Length'] = new Buffer(opts.data).length;
    }
  }

  // Extend request url object
  util.extend(opts, util.pick(url.parse(opts.url), 'hostname', 'port', 'path', 'auth'));
  delete opts.url;

  var req = http.request(opts, function(res) {
    var body = [];
    var size = 0;

    res.on('data', function(chunk) {
      body.push(chunk);
      size += chunk.length;
    });

    res.on('end', function() {
      var result = '';

      // Buffer
      if (opts.isBuffer) {
        result =  Buffer.concat(body, size);
      } else {
        var buffer = new Buffer(size);
        for (var i = 0, pos = 0, l = body.length; i < l; i++) {
          var chunk = body[i];
          chunk.copy(buffer, pos);
          pos += chunk.length;
        }
        result = buffer.toString(opts.encoding);

        if (opts.json) {
          result = JSON.parse(result);
        }
      }

      callback(null, res, result);
    });
  });

  req.on('error', callback);

  if (opts.method !== 'GET' && opts.data) {
    req.write(opts.data);
  }

  req.end();
}

/**
 * @description
 * @example
 * request.post('url', function() {});
 * request.post({ url: 'url', data: { q1: 'v1' }}, function() {});
 */
request.post = function(options, callback) {
  if (util.isString(options)) {
    options = {
      url: options
    };
  }

  options.method = 'POST';
  request(options, callback);
};

/**
 * @description
 * Download remote resurce to local file
 * @example
 * request.download({ url: 'path.png' }, function(err, res, body, filepath) {})
 * request.download({ 
    url: 'path.png',
    rootPath: 'dest/path' 
   }, function(err, res, body, filepath) {
    
   });
 */
request.download = function(options, callback) {
  var opts = util.extend({
    rootPath: '',
    ignore: false
  }, options);

  request({
    url: opts.url,
    isBuffer: true
  }, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) return callback(err, res, body);
    var destPath;
    var pathname = url.parse(options.url).pathname.replace(/^\//, '');

    if (opts.destPath) {
      if (util.isFunction(opts.destPath)) {
        destPath = opts.destPath(path.basename(pathname));
      } else {
        destPath = opts.destPath;
      }
    } else {
      destPath = path.join(
        options.rootPath,
        pathname
      );
    }

    if (opts.ignore) {
      destPath = destPath.toLowerCase();
    }

    file.writeFile(destPath, body, function(err) {
      if (err) return callback(err);

      callback(null, res, body, destPath);
    });
  });
};

module.exports = request;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(37)
var extend = __webpack_require__(46)
var statusCodes = __webpack_require__(47)
var url = __webpack_require__(22)

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(13)
var inherits = __webpack_require__(3)
var response = __webpack_require__(38)
var stream = __webpack_require__(14)
var toArrayBuffer = __webpack_require__(45)

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || 'timeout' in opts) {
		// If the use of XHR should be preferred and includes preserving the 'content-type' header.
		// Force XHR to be used since the Fetch API does not yet support timeouts.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
		if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin'
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('timeout' in opts) {
			xhr.timeout = opts.timeout
			xhr.ontimeout = function () {
				self.emit('timeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	// Currently, there isn't a way to truly abort a fetch.
	// If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'user-agent',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(13)
var inherits = __webpack_require__(3)
var stream = __webpack_require__(14)

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function(header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})


		// TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function(err) {
				self.emit('error', err)
			})
		}
		read()

	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2).Buffer, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(8).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(42);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(21);

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(2).Buffer

module.exports = function (buf) {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)(module), __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(54);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(55);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 55 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview Strengthen the ability of file system
 * @author wliao <wliao@Ctrip.com> 
 */
var fs = __webpack_require__(57);
var util = __webpack_require__(9);
var path = __webpack_require__(24);
var fileMatch = __webpack_require__(58);

function checkCbAndOpts(options, callback) {
  if (util.isFunction(options)) {
    return {
      options: null,
      callback: options
    };
  } else if (util.isObject(options)) {
    return {
      options: options,
      callback: callback
    };
  } else {
    return {
      options: null,
      callback: util.noop
    };
  }
}

function getExists(filepath) {
  var exists = fs.existsSync(filepath);

  if (exists) {
    return filepath;
  } else {
    return getExists(path.dirname(filepath));
  }
}

util.extend(exports, fs);

/**
 * @description
 * Assign node origin methods to fs
 */
exports.fs = fs;

exports.fileMatch = fileMatch;

/**
 * @description
 * Create dir, if dir exist, it will only invoke callback.
 *
 * @example
 * ```js
 *   fs.mkdir('1/2/3/4/5', 511);
 *   fs.mkdir('path/2/3', function() {});
 * ```
 */
exports.mkdir = function(filepath, mode, callback) {
  var root = getExists(filepath);
  var children  = path.relative(root, filepath);

  if (util.isFunction(mode)) {
    callback = mode;
    mode = null;
  }

  if (!util.isFunction(callback)) {
    callback = util.noop;
  }

  mode = mode || 511;

  if (!children) return callback();

  children = children.split(path.sep);

  function create(filepath) {
    if (create.count === children.length) {
      return callback();
    }

    filepath = path.join(filepath, children[create.count]);

    fs.mkdir(filepath, mode, function(err) {
      create.count++;
      create(filepath);
    });
  }

  create.count = 0;
  create(root);
};

/**
 * @description
 * Same as mkdir, but it is synchronous
 */
exports.mkdirSync = function(filepath, mode) {
  var root = getExists(filepath);
  var children  = path.relative(root, filepath);

  if (!children) return;

  children = children.split(path.sep);

  children.forEach(function(item) {
    root = path.join(root, item);
    fs.mkdirSync(root, mode);
  });
};

/**
 * @description 
 * Create file, if path don't exists, it will not throw error.
 * And will mkdir for path, it is asynchronous
 * 
 * @example
 * ```js
 *   fs.writeFile('path/filename.txt', 'something')
 *   fs.writeFile('path/filename.txt', 'something', {})
 * ```
 */
exports.writeFile = function(filename, data, options, callback) {
  var result = checkCbAndOpts(options, callback);
  var dirname = path.dirname(filename);
  options = result.options;
  callback = result.callback;

  // Create dir first
  exports.mkdir(dirname, function() {
    fs.writeFile(filename, data, options, callback);
  });
};

/**
 * @description
 * Same as writeFile, but it is synchronous
 */
exports.writeFileSync = function(filename, data, options) {
  var dirname = path.dirname(filename);

  exports.mkdirSync(dirname);
  fs.writeFileSync(filename, data, options);
};

/**
 * @description
 * Asynchronously copy a file
 * @example
 * file.copyFile('demo.txt', 'demo.dest.txt', { done: function(err) { }})
 */
exports.copyFile = function(srcpath, destpath, options) {
  options = util.extend({
    encoding: 'utf8',
    done: util.noop
  }, options || {});

  if (!options.process) {
    options.encoding = null;
  }

  fs.readFile(srcpath, {
    encoding: options.encoding
  }, function(err, contents) {
    if (err) return options.done(err);

    if (options.process) {
      contents = options.process(contents);
    }

    exports.writeFile(destpath, contents, options, options.done);
  });
};

/**
 * @description
 * Copy file to dest, if no process options, it will only copy file to dest
 * @example
 * file.copyFileSync('demo.txt', 'demo.dest.txt' { process: function(contents) { }});
 * file.copyFileSync('demo.png', 'dest.png');
 */
exports.copyFileSync = function(srcpath, destpath, options) {
  options = util.extend({
    encoding: 'utf8' 
  }, options || {});
  var contents;

  if (options.process) {
    contents = fs.readFileSync(srcpath, options);
    contents = options.process(contents, srcpath, options.relative);

    if (util.isObject(contents) && contents.filepath) {
      destpath = contents.filepath;
      contents = contents.contents;
    }

    exports.writeFileSync(destpath, contents, options);    
  } else {
    contents = fs.readFileSync(srcpath);
    exports.writeFileSync(destpath, contents);
  }
};

/**
 * @description
 * Recurse into a directory, executing callback for each file and folder
 * if the filename is undefiend, the callback is for folder, otherwise for file.
 * and it is asynchronous
 * @example
 * file.recurse('path', function(filepath, filename) { });
 * file.recurse('path', ['*.js', 'path/**\/*.html'], function(filepath, relative, filename) { });
 */
exports.recurse = function(dirpath, filter, callback) {
  if (util.isFunction(filter)) {
    callback = filter;
    filter = null;
  }
  var filterCb = fileMatch(filter);
  var rootpath = dirpath;

  function recurse(dirpath) {
    fs.readdir(dirpath, function(err, files) {
      if (err) return callback(err);

      files.forEach(function(filename) {
        var filepath = path.join(dirpath, filename);

        fs.stat(filepath, function(err, stats) {
            var relative = path.relative(rootpath, filepath);
            var flag = filterCb(relative);

            if (stats.isDirectory()) {
              recurse(filepath);
              if (flag) callback(filepath, relative);
            } else {
              if (flag) callback(filepath, relative, filename);
            }
          });
        });
    });
  }

  recurse(dirpath);
};

/**
 * @description
 * Same as recurse, but it is synchronous
 * @example
 * file.recurseSync('path', function(filepath, filename) {});
 * file.recurseSync('path', ['*.js', 'path/**\/*.html'], function(filepath, relative, filename) {});
 */
exports.recurseSync = function(dirpath, filter, callback) {
  if (util.isFunction(filter)) {
    callback = filter;
    filter = null;
  }
  var filterCb = fileMatch(filter);
  var rootpath = dirpath;

  function recurse(dirpath) {
    fs.readdirSync(dirpath).forEach(function(filename) {
      var filepath = path.join(dirpath, filename);
      var stats = fs.statSync(filepath);
      var relative = path.relative(rootpath, filepath);
      var flag = filterCb(relative);

      if (stats.isDirectory()) {
        recurse(filepath);
        if (flag) callback(filepath, relative);
      } else {
        if (flag) callback(filepath, relative, filename);
      }
    });
  }

  recurse(dirpath);
};

/**
 * @description
 * Remove folder and files in folder, but it's synchronous
 * @example
 * file.rmdirSync('path');
 */
exports.rmdirSync = function(dirpath) {
  exports.recurseSync(dirpath, function(filepath, relative, filename) {
    // it is file, otherwise it's folder
    if (filename) {
      fs.unlinkSync(filepath);
    } else {
      fs.rmdirSync(filepath);
    }
  });

  fs.rmdirSync(dirpath);
};

/**
 * @description
 * Copy dirpath to destpath, pass process callback for each file hanlder
 * if you want to change the dest filepath, process callback return { contents: '', filepath: ''}
 * otherwise only change contents
 * @example
 * file.copySync('path', 'dest');
 * file.copySync('src', 'dest/src');
 * file.copySync('path', 'dest', { process: function(contents, filepath) {} });
 * file.copySync('path', 'dest', { process: function(contents, filepath) {} }, noProcess: ['']);
 */
exports.copySync = function(dirpath, destpath, options) {
  options = util.extend({
    encoding: 'utf8',
    filter: null,
    noProcess: ''
  }, options || {});
  var noProcessCb = fileMatch(options.noProcess);

  // Make sure dest root
  exports.mkdirSync(destpath);
  exports.recurseSync(dirpath, options.filter, function(filepath, relative, filename) {
    if (!filename) return;
    var newpath = path.join(destpath, relative);
    var opts = {
      relative: relative
    };

    if (options.process && !noProcessCb(relative)) {
      opts.encoding = options.encoding;
      opts.process = options.process;
    }

    exports.copyFileSync(filepath, newpath, opts);
  });
};

/***/ }),
/* 57 */
/***/ (function(module, exports) {



/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(9);
/**
 * @description
 * @example
 * `**\/*` match all files
 * `*.js`  only match current dir files
 * '**\/*.js' match all js files
 * 'path/*.js' match js files in path
 * '!*.js' exclude js files 
 */
function fileMatch(filter, ignore) {
  if (filter === null) {
    return function() {
      return true;
    };
  } else if (filter === '' || (util.isArray(filter) && !filter.length)) {
    return function() {
      return false;
    };
  }

  if (util.isString(filter)) {
    filter = [filter];
  }

  var match = [];
  var negate = [];
  var isIgnore = ignore ? 'i' : '';

  filter.forEach(function(item) {
    var isNegate = item.indexOf('!') === 0;
    item = item
      .replace(/^!/, '')
      .replace(/\*(?![\/*])/, '[^/]*?')
      .replace('**\/', '([^/]+\/)*')
      .replace(/\{([^\}]+)\}/g, function($1, $2) {
        var collection = $2.split(',');
        var length = collection.length;
        var result = '(?:';

        collection.forEach(function(item, index) {
          result += '(' + item.trim() + ')';

          if (index + 1 !== length) {
            result += '|';
          }
        });

        result += ')';

        return result;
      })
      .replace(/([\/\.])/g, '\\$1');

    item = '(^' + item + '$)';

    if (isNegate) {
      negate.push(item);
    } else {
      match.push(item);
    }
  });

  match = match.length ?  new RegExp(match.join('|'), isIgnore) : null;
  negate = negate.length ? new RegExp(negate.join('|'), isIgnore) : null;

  return function(filepath) {
    // Normalize \\ paths to / paths.
    filepath = util.path.unixifyPath(filepath);

    if (negate && negate.test(filepath)) {
      return false;
    }

    if (match && match.test(filepath)) {
      return true;
    }

    return false;
  };
}

module.exports = fileMatch;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get, find, handles GET query parameters or hash params.
 */
class QueryParamsModule {
    constructor() {
        this.queryParams = {};
        this.hashQueryParams = {};
        if (window.location.search) {
            const uriString = location.search.replace('?', ''); // remove the "?"
            this.queryParams = this.extractParams(uriString);
        }
        if (window.location.hash) {
            const uriString = location.hash.replace('#', ''); // remove the "#"
            this.hashQueryParams = this.extractParams(uriString);
        }
    }
    extractParams(stringUri) {
        let params = {};
        const queryParts = stringUri.split('&');
        for (let part of queryParts) {
            let pair = part.split('=');
            if (pair.length === 2) {
                params[pair[0]] = pair[1];
            }
        }
        return params;
    }
    getQueryParams() {
        return this.queryParams;
    }
    getQueryParam(name) {
        return (typeof this.queryParams[name] === 'undefined') ? null : this.queryParams[name];
    }
    getHashQueryParams() {
        return this.hashQueryParams;
    }
    getHashQueryParam(name) {
        return (typeof this.hashQueryParams[name] === 'undefined') ? null : this.hashQueryParams[name];
    }
}
exports.QueryParamsModule = QueryParamsModule;
exports.QueryParams = new QueryParamsModule();


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse {
    constructor(data, response) {
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        }
        if (response) {
            this.statusCode = response.statusCode;
        }
    }
    has(prop) {
        return this[prop] !== 'undefined' ? true : false;
    }
    isSuccessful() {
        return (this.error == null) ? true : false;
    }
}
exports.ErrorResponse = ErrorResponse;
class TokenResponse extends ErrorResponse {
    constructor(data, response) {
        super(data, response);
    }
}
exports.TokenResponse = TokenResponse;
class AuthorizationResponse extends ErrorResponse {
    constructor(data) {
        super(data);
    }
}
exports.AuthorizationResponse = AuthorizationResponse;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mixpanel = __webpack_require__(11);
const sdk_1 = __webpack_require__(6);
const oauth_http_1 = __webpack_require__(10);
/**
 * Main wrapper 360 connect class.
 */
class Connect {
    constructor() {
        this.trackingEnabled = false;
        // for tracking anx mixpanel who does what
        this.package = null;
        this.version = null;
        this.IMPLICIT_FLOW = null;
        this.PASSWORD_FLOW = null;
        this.CLIENT_CREDENTIALS_FLOW = null;
        this.AUTHORIZATION_FLOW = null;
    }
    initialize(clientConfig) {
        sdk_1.Config.init(clientConfig.environment);
        this.mixpanelConfig = sdk_1.Config.getConfig()['mixpanel'];
        this.oauth = new sdk_1.OAuth();
        this.oauth.initialize(clientConfig);
        this.package = clientConfig.package || null;
        this.version = clientConfig.version || null;
        return this;
    }
    QueryParams() {
        return oauth_http_1.QueryParams;
    }
    OAuth() {
        return this.oauth;
    }
    enableTracking() {
        const reg = /^[a-z]{3}\.[a-z]+\.[a-z]+$/;
        const reg2 = /^[0-9]{1}\.[0-9]{1}\.[0-9]{0,1}$/;
        if (reg.test(this.package) !== true || reg2.test(this.version) !== true) {
            // @todo Check that package name is a valid package name like "com.myapp.vendor"
            throw new Error(`@360connect: analytics tracking API requires a valid package name like "com.myapp.vendor" and a valid version number "x.x.x" or "x.x"`);
        }
        if (typeof this.mixpanelConfig['token'] === 'undefined' || this.mixpanelConfig['token'] == null) {
            this.trackingEnabled = false;
        }
        else {
            this.trackingEnabled = true;
            mixpanel.init(this.mixpanelConfig['token']);
        }
    }
    track(eventName, eventData = {}) {
        // a few safeguards
        if (this.oauth.getUser() === null || parseInt(this.oauth.getUser().id) === 0) {
            throw new Error(`@360connect: tracking an event failed because not user id was provided\nYou should consider tracking events after successfull login`);
        }
        if (false === this.trackingEnabled) {
            console.warn(`@360connect: Tracking is disabled by default. You should explicitely use Connect.enableTracking()`);
            return;
        }
        eventName = `webapp.${eventName}`;
        eventData.uid = parseInt(this.oauth.getUser().id);
        eventData.version = (this.version === null) ? 'unkown' : this.version;
        eventData.package = this.package;
        if (typeof eventData.barrel !== 'object') {
            eventData.barrels = [];
        }
        eventData.barrels.push('webapp');
        eventData.barrels.push('360connect-js-sdk');
        mixpanel.track(eventName, eventData);
    }
}
exports.Connect = Connect;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(63));


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __webpack_require__(6);
// import * as LogoSvg from '../../assets/ripple.svg';
// import txt from 'raw-loader!./../../assets/ripple-data-uri.txt';
/**
 * Custom HTML element button.
 */
class LoginButton extends HTMLElement {
    // monitor the "user" attribute for changes.
    static get observedAttributes() { return ['username']; }
    constructor() {
        super();
        const config = sdk_1.Config.getConfig()['api'];
        const domain = `${config.PROTOCOL}://${config.DOMAIN}`;
        const data = sdk_1.Local.retrieve('loginStatus');
        const user = (data === null) ? null : data.user;
        let imgSrc = this.logoUri();
        let btnText = '360 Connect';
        if (user !== null) {
            imgSrc = `${domain}${user.avatar}`;
            btnText = user.surname;
        }
        this.loaderDataUri = __webpack_require__(64);
        // slot is a placeholder for user custom text inside the custom element markup
        // slot can also be replaced by text using "this.textContent"
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>${this.cssStyles()}</style>
            <div class="connect-btn">
                <div class="inner">
                    <span class="logo">
                        <img src="${imgSrc}" height="23" width="23" />
                    </span>
                <span class="text"><slot>${btnText}</slot></span>
                </div>
            </div>
        `;
        // this relies/depends uniquely on HTML markup above
        let imgNode = shadowRoot.childNodes[2].childNodes[1].childNodes[1].childNodes[1];
        window.addEventListener('status:change', (e) => {
            // e.detail.status is "login|loading"
            this.updateButton(e.detail.status, e.detail.user, imgNode);
        });
        this.addEventListener('click', e => {
            this.onClick(e);
        });
    }
    get username() {
        return this.getAttribute('username');
    }
    set username(username) {
        this.setAttribute('username', username);
    }
    // called whenever the custom element is removed from the DOM.
    connectedCallback() {
        // const data = Local.retrieve('getLoginStatus');
        // const user = (data === null) ? null : data.user;
        // this.textContent = (user === null) ? '360 Connect' : `Bonjour ${user.surname}`;
    }
    // called whenever an attribute is added, removed or updated
    // only attributes listed in the observedAttributes property are affected.
    attributeChangedCallback(attr, oldValue, newValue) {
        // if (attr === 'username') {
        //     // console.log(newValue);
        //     this.textContent = `Bonjour ${newValue}`;
        // }
        // console.log(this.childNodes[2].childNodes[1].childNodes[1].childNodes[1]);
    }
    updateButton(status, user, imgNode) {
        const config = sdk_1.Config.getConfig()['api'];
        const domain = `${config.PROTOCOL}://${config.DOMAIN}`;
        if (status === 'loading') {
            imgNode.src = this.loaderDataUri;
        }
        else {
            if (user === null) {
                this.textContent = '360 Connect';
                imgNode.src = this.logoUri();
            }
            else {
                this.textContent = user.surname;
                imgNode.src = `${domain}${user.avatar}`;
            }
        }
    }
    onClick(e) {
    }
    changeAppearance() {
        console.log("Changin' that!");
    }
    cssStyles() {
        return `
            :host {
                display: inline-block;
            }

            :host > .connect-btn {
                display: flex;
                flex-direction: column;

                cursor: pointer;
                color: #f1f1f1;
                font-size: 16px;
                line-height: 1em;
                letter-spacing: .25px;
                font-family: Helevetica, Arial, sans-serif;
                background-color: #CC2B18;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;

                border-radius: 4px;
                -moz-border-radius: 4px;
                -webkit-border-radius: 4px;
            }

            :host > .connect-btn > .inner {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 6px 12px 6px 6px;
            }

            :host > .connect-btn > .inner > span {

            }
            :host > .connect-btn  > .inner > span.logo {
                background: #fff;
                padding: 3px 3px 1px 3px;
                border-radius: 2px;
                -moz-border-radius: 2px;
                -webkit-border-radius: 2px;
                margin-right: 8px;
            }
            :host > .connect-btn  > .inner > span.text {

            }
        `;
    }
    logoUri() {
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRjk2QUU3RDU4NUQxMUU0QjAwREFEQTk2QkFDNDlFOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRjk2QUU3RTU4NUQxMUU0QjAwREFEQTk2QkFDNDlFOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNGOTZBRTdCNTg1RDExRTRCMDBEQURBOTZCQUM0OUU5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNGOTZBRTdDNTg1RDExRTRCMDBEQURBOTZCQUM0OUU5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Fk4zYwAAK71JREFUeNrsfQecXVWd/++c219/02cyk0oySQiBhGqQziaAqMgqiotYkI6LCtZ1EVFkcV3XXf3bkCog1YDKIiAGQVogvZNM2mQyvb1677v3nvP/nfvKvDeZnkkI7t587szLm/duOd9f+f7KOZdwzoEQAodxI7md5v7PcrvYZIkQNUKpqhIqSdnPMZdzN8ZZJsmYVfTZv5tNYJDf5MMIAi0CwRXvVUlyeTmV6t+nG/PnKNqCBapW76dSRUiiAY1KOqUg4Te5S8BKAk8lgfXud52W9Za5bVUqvabZyuzcY2VaM/zvByNyiDVEHFjK7WLUyFRJmbpENU5aZgSWHa8bx5VJUoNPlsKEEmoDZ5wAY0JoEAghPHgE8Q8oJYTiJklEUmQKFoU07vt32va2P/b1P7c6lnjhld74Foux97SGHCpA8kDIHhAEjDNk44SLjdAl5xmBf6jQlAYugZyhkEFVsflYzBAvOrL4hQARmciKJquGIVNbpT2bLevNR9u77/tje8+zu1Nm/P8AKQVCvFYvVANnfk4PX7nE5ztT1iW/ScF0KTg4wPzg72TgrEShkuZXdF9YIy3E3fS7tp6f/aSp5cFWMxP/3woIzQGhiHOcIOuLvqBFvnReIHAhGLJiSZAW5mgSYBgeHJ69AgWBCVT4lL2Erft9e8/td2zZ83jcdv5XASK0QhW/ZSDBryrRqz4fiNwQCCgVaZUkDykQQ20MTyYR0CKa4a8OSK+nUo9/fV3TN9b0xHb+vQOSN1GaeD2HqvN/oJbfviQcODftl9Isa5revU14JpWSYK0/kInozd/buufLP9+69wn+dwoIyZkoXby+QPYvu0Or+PfqqD4trdM4HCl3zbO3LJdpenhqhDzZ2XvHDa9vvjXpOPzvCZA8GIbQkMul4Cdv81fcLkVVn63QtEdWj7QNzRjxy7RsVpl/RSp135V/23BtZ9oy/x4AyYPhE2BcKYeuuMVfcZtbpgKTiQ0cjtzNM2GERI8qC6zizpOXrVh7eVvKTL2XASkB47Ny6HLUjH9zylXmSsQhRzIYhZvP3kHZ7PLgG8x57JIX3v5UwnYy71VA8mDI6DMu/JlR9f9YhSoxmTrwHgCjRFOQnEcbK4NvMudn17+89vpdsdRgwePvBiB0nNRWsCn5aEk77nat/A6IqqqLYIjjcXgP7XjX3Abo3tGVWOIzrrt+4awvleYB3j3xGquGkBwYfj+lFY9qNfceGw2cjNQ2Sd5LmgEDqWXBsWzHBdcvy8acSvfmNdsu29ob27C4KjpdU+QySoiOAyP4ScphvHtte09LV9rsiFl2zJnkfNl4TVbebwSES/y2Vv4vVwajX0hFlfh7xUzxHAguvrLwRRoH1CFAlIBC/VFdCtaGNSXkS8uynIgaekCSJAUHhRJKxXcZJ8Tuy9jppMuaW5Ppbatbu9cs37L7xTf2tq9N2bZ9uAGRcvRWP1HWT3/QV3MvqdBlLhH3vQCIyPMLB2ciEEnGCFMIiVQacqQmJAfKglTWNYSGchx88dsVeOUGiOfE0RsdmgVIVmRJVlWF2oSmmhPp1b/fuvvph9a88/C61s79hwMQkkuJBGS8j0f0ml8fXxY83fJJySMdjIJG4O3FcJhtCUhFrU+pqo/KRjRIQVY5Ey60eOypyFKSVA7Hkc0GAqSoiubz6XKa0OYnNu964M4Vb/33to7ejkMJiNAOv/AfH1UCH/9BsPo/rTLVfDed3li1QgRECTQ2cTRPwTJFnjojqgYqo5QrOt4xHfoWxECgecKf6dEAKXb9VJaUQCig9xPS9PM3Nn33l6+uu7+lPz7pgOS1IyRiqceN2geOjgaPtw0pfaTCITKYLl618BP9aJ5Mysi0qX6tZkalTAIhzomUC0RG2NBv4HikPUsH48s4SKgxobKwui2WfuSyB5/54uq9be2TCUjed/g+pAQu+lGw6qdWRLOOVO0QF4WOGkwc9h4HEdG41DgnrEUaaihTfWO/Zk9LwM6BQsZ9EfhFIxwImJqx8fOPPnf58rXb1kxGHJLP4uqi2vcByX8haLIkyqpHZFxBsmCgNyadCAbxgbTg6DItPK2euJp/fNfsjQ5BVkmkgX6MMe5ZweapvnhcTSbnP3TZB5699MQFZ4wHUzoK1aWNkjb3RM1YYmnULPzlCNoFGIJ3pgQY6LypweQFjRHdN6WOMFXLDvN4jyuOSvD+SS5NOl5ckByYyWTC6e0tv+fSZU/808nHvH88qZDhgBKVP3qmZLwvpCrRtEyPSGYlHLhnplwOTGF04VFhzaivAw8MxsdtdbKWh4gCMxJLMuEcFxFfTpkpTnojv770/IdTtrNs+eotWyaqIXlAjBMk/RRXpVx0KrCiSPeI2NFEmJkMdMfiPJ6Ok8ZK0JBJgSvJOXs+wT2rVTS3T/w4GLzYqXQKNaX+nk9deM+JM6aEJ5I6IZAtOgXrJKXxcX/dI6EyX5TJ5IhLIMYsC+LT62V9/lwSNrjc0FAuQ1kll7rbwG3ehV5QgoORcAwEhZnOTEjNihy9ULdgVUVwXdz879PvvOdGa1B9f7RGubxDp8dI2qywLEddjMr5EQYGc1zYoFJ56c9/os9acAwpun/S9+NvcY7xBzkIQCaQfB3WGwuHlOjuTZ0wdcrVV5154lM/eeH1FeM5Ic0BQqaANEOWqcqOMHYlLnBbop/M+NIX1GIwxJZ86n5uv7MRiKpmWc8Ed+FHRKtELliEg94Zc5NdPco3znv/d+uiIW08gBS6DWtkeRqXKeVAjhgwxMV1J5MQX3KSetZVV5eoQGbbOkiteAaIbkwChSvhlJOQVyeQSaZS1QpdcuPSUy+WJTouQMT7eiNVGxya5SpHys7QFG3VJOnM225VNKEFeVOVTkHiyXu5J9eETsb4ZX9OlobkYhQ0XeyKU4+7rjoclMcFCH5fMwitZBT9R67NcCw7DDWIhaxr6e7mdjaGY/Cc2u6K9UPdVVeos49bVGqq/vQYuC27PVM1OWOX1w8PED4pB6UUHMtKRyRy4mlzpi8ZSxxS0NmALPsMSfIhtWRj1VoBWzEtdXOFIMEIWC6ihtL75YQX9Z/iXySSc2CFz5DChSVNEzqPnqN88gs3lFx3ZvtGSL/8J050X9HRJ6+IN6m9zwz5RiqlXbbkuEsee3P9y2wQWxqOZUGIEdVAniKSdWwMQPAcABkueCIXGkA45USWQNIloDoyegVHV0KPJHkSk21tF7GEUMGMC65pA0s7nFMXmNeTihGvlGuAF//f5lj0hK9/VQ0GQwPntkzPkYOYkiApoycP3+0N7zsVT2TeP6t+yczqcn1HW5c5lkhdWGERCQqTnE3v8OErccL8WPgZEwXepUA1BeSQTKQAchRDAIHv0wGp9wLhLB8U6sGJV4eQCcbZlGfQPJgOYfGk66RS3CUOZz78cnciDvKFS5XF519QYmZTLz7Nnead4GlHif5NjiOGnPBM5jFdx8mEJdJ4WuOM+QjI6rEAAjbC4Yj5Glz4SXIAIIxkgUijZKZxiF0ZpIBGlajMpSBqhoq6SQuB0QBtHqgj8JLQyQu/UMdUVB8d44touSxblZT1JbgT77LsbQGdXvSVm5XisXHQZ6RfQlalGjCZo1Y4EkOd9yYD5dRO2C70A0APMr7BQZVc19dYW3kS/m9sgPRy14xz5pSLFG+R1PGiSlwSL9ZEIHwIRC1qRYQwruQyQXyCeXqO9stN4Y+0CzLarClBVd1hW/K0iy6HaXPnDVwIsq3EE3dxnrGAaPokmCocayF3rgMZ9FW2rIBUXoWqHqVU0xRRXScZFL1YH2f9PcyLVBQtC9AEzm2lTThxZn2jqByPBog3lpbLTJT+GJ6M8lybEsvVp1OiEoemBnSi1mhErqIMdHFVvJQpHayI8gxqX3uc7w9FydJrryu58tTzT4K1diUGS/UeOAdjqrIlEAaxWBxSkWowTlkKZYvfR3x1DSBphlY4tCAniRiayCY3s/5N296y2uHpJJoDPUuNxwEMmi1eHfRVS5SOCAgvIklWD7BW5FiLuFeE455VEY0CMYlIhkHV6WieosiKCT80VSsZpWdHIgXlV1xHohVVA2D0dPOWu3/Co5VRUspTx1dLEj8Fv2d2BvbGTdDO+CDM/OBHia+INAy2/1IwTKT5i2UNd6et2U0/91gms2mVXQBlzGxLSJFUNtjUUhjeV2e2OFYzQQCEVqTxm6Is2q0QOein2lx0weUiZjxEYIjLzGQy0FpXDyd+9nMlf9t2109Jummr16HArTRwHFDP3pc44gGHzA/ckUiIVBcljm2RzSlGyq78Glnwyc8ND8ZQAlPTIAU/fZPhW/YxjYtuID72FHPWnoA/x/JHNVlevIZ+ZE/GZQ4yKBJDQPtUolSjZsxBXqrlYosRrQ5+h7tu9rcwCyLZN8aEn/jUnmQKKj57NQlHooX3u9atgp3PPc8XLLuYSIsWI7VGYtzXDbxjPxe/Ac+Xz2NxyAc/hbiOFDDDfy4Cub7fhrk33QYNc+eXmhQc4NjGVZDcsZlb8ZjXRmQHolC5+BQyZU5jyWeNcz6igaKS1DO/NbOaMmarTMdSoMozWf4Ot/fEgVkx16XdGqU1CEYjgqGOAIbXz4GSbQqJiURAqqgEydCBiv/3dIPb3Z2dWKvrI9tYlPj90TI4++OXlkY8ugHLHn+KBMorSy/aTBF77w4w3/gLtza85TEhIQCEZgO7wWMkfOnq1l6ov+YbB4CR3roW4s/8FljLLi4ciI57EO85YWVgx/NP8g2Ni8nJn7seopUD12Cc/gHV7Wpj1psrMkQzRofEc+bkgHn38ggmC7Y71p4drtWKJGpm1JDpXGqPCIaQ6ngiAfHpM6H6058jlaedAVp1Dcg4iNzJgNvZCSZKeOw393HzrbeAGoaXThgK1O5kGuRzzyDV9Q0lclXZOH/o+8M4RJuzUOzEXPsaTzx1PxAzSTxtGWRTZYnAntZO4CedA/OWnFYKxsq/QHL5PSCLOlEgUPDT4prK/AGoLAdo3rmaP/uNf4azvvV9Ujt9RuG7/vM/obk7tzisr5t7QepIGkIlioYjxgcxATqCyRIOPPEqz6z1+VVpHnXISGZKINuKLKXnoo/Cgid+T2Zc9hkITJsBCoLhJcdkFZTaKRA870NQ98BjpOxLN6Htt7IMaQhAWvAqZl908ajl26H8l37cEhL5/NcIDYRQEJyB4C7nVlzHhe0mgYUXfwIOyBYvvxdlBEVL1bMF9SJ/JK5UzOFuqKuG4zULXrjjFkigOSsMsuEn+vvPU9FM8+JzDrmjA0MP3MkHMTM6AgnhouHYHw1UzpYZhDBGHFYzSBaMvosvgff9+49JIBwZWTokGaLXfpGUf+XrBMn1AbbVQT/QV1YBDYsWD/n9/W++Dmu/fTNs/9a18PYd34SVv/k1dOzbVyog9TMhcMk1Wb/FWWFQKWpke28M9AUnQlXdlJIUTOrZh7OmTZZHHEwbhWhKDV5foo2/9ujDJedV5h+vklBEETH1SIlGDc3427v2NTsuG3M9xDm+vPyciyLB08u4LeK1YZ2TZWZg59QZ8L5/vZUU20AXB7v9d4/Bxu/fBqvvuxv60YcUb+HPXguBZecDSyZLjhczLaBHzSbR6upSKXFs2P29W/jKj3+Utzz4AK/csRpm9jdD9I3/gVf/5QZY8+fnSgcHTZh+0lkggscB001gfzwNFfMXlmYmmjaC246gFlL6ZMR2FQcHZN7UWtj/8vMQ7+8fOH4oKmIjg7m2NkJbClBNZbs6e1ePJf3ulW8DilLzsZqqz07ntsj/2V7WKZcDKd4xaoSdKRMaPn81CYUGavhuIgYtV3+G9335n7ly9y+4ecs3+fKPfIjvb9pecrLI1TcQgr6Eo6Tw3BD0oPOsOunkXIfBwNb5n3fy3l/9AoL4+YwWhJTpiDZOqKqqhNPqQrD15/8Om19/reQ72vvPBxoMZy82x7z68G7Kp80oBWT7hsJnxrKLuMyHUh6wErxl+zul2jllOgfH1jBA04bK6xNZUkxO9q/Y0rRqNEDy/VhwakXFRSep8hwfdwXjc4cLQ8WbtqJCBh12rLen8H7f3b+AzEsvgYJMS0FuP7W8DBp3N8ELt3wLHGegyK81zgN15izg+a5+PGAczUzZ7DmlqYZN6yF+/72ghcOgyRSEpsf60dylU55t19BXnTK1At5+4C7IWAMaIUUrPfMlUiIkN5A4GGAEg6UsLdbjzbIvSSiOuGdrV0FVhmTRfXuDGgiDV0MBroIHSul3VUNX9/Yl1m5ubmsdDRCvnu5XlLpzy8surfYirhIqPKRjne/XwffTH/PXL1zGX/7Xb/LOv74IqWf+wAVLKThMxLM2HAJrzRre2VJk72UFlBJAMAhFgP2VVSXnSb30IvB0GsSiTWqui60zjpcX6/VuUkzjqoyGQe/aB7s2bihV+dqpA37EK0cP0T7rqXtBksdWkBLlAS8Bxg7MxdB8P5EABZTiY/qCQfrYyvXP9qXSo1YMhbnic4Kh0xao0mwfuBleSJkLQIaPyWsCPmjs74XIbx+Azmuu4HZ7BxBFOeA6VTyGbVqDKJpS4EuiYJNBQIxQacSc2dnk3ZC3ZATelx+ZRJ+JsUFnF/7RyhUMCER1Gbqa95TeZDhaMFeEZo9hpUon39JgZEjGN2qSEH23Hixtt+JmqsBmvYicc28qoHhFFUUxidT85MqNy0cr4XprleC9GkvKoh+uAVfK1ZByhb68lvBhKShDdhJErTBE1+AgCfScPwaMvLwcyupqS4ye09KMbEgpiUzJ4Pgkdzyvgw9fBiUUOfxgeycSgv7ugnST3D7Yrubfl5DSimp2V/PeUpmY1pgNWIko0AwcZ7idZusaEKca1KCGl4xF216PSebL8dlkDRd90mjNgvr/bNyxfNO+A83VYEA8fY5qWsMCn35ckLsWG3xbxGujHTF7lW1+PjBQlVD6mhJJmHf1tSRQlC+yUZoz27Zl0x05LVIQuGRvb8n3VWRdPJcAUtHb+yQxi4jC/pgLqf2tQERMg99NOGi6Bjlszz/kQBXSVR3QoX3rptLjNx4LFKk2jvKYCu4Sms6Wzh6ILDqFlBexQZ5OgtOKgMgl/khoCaWybDiK3vZfz//tJ7brjth1kqe6vNYw5k6RabUCrLD2BCnWEgKj9rt6yIoTCr8gtAJp7U4EI3jjTeTkyz5d8tn+xx7mbh8Ofq4tRpiUkJWGti2lA+Y/61wgGCmLXBXiIJYwgRDuLiPQ3NoPtLsN+jAWYnUzYPr8owdJbHPWYYvXIrCrLIOu1a8jKRigq8QfAuPMD3nUerQ0uvBjFlL6HY4Kx3/snwbR503A+nsK5yvKXPFAJCg99tb6h17esnPHWPqyvCX4ZgUCx5cB18gQapADxRnJdHkfQLuaweDQbWgAd+5cSJ59LtT99Jfw/pu/VkJkzc3rIPbQb4B6fVQDvnWKpkHT0095AeKABM+H6NXXACT7gTDXM1uitBtBw9oWY9CxrQm2NLfBsZd9HpSi9iAXgRKVRZIbIKFlfp8ODTwFK59+spQiH38m6GdciHGLOVBjGbRjgA02Mrv13WlYcPXNpHJKfXGRA8zX/sSHyjhTTSfpTArq+J5ZAU2iYwVEm6rr8/yFXHaJCS+a5uOZLlboIxnECnbGExC/4UYy65kXycwn/0gW/vJeMueCC0s+a+/fBx1f+TLngmkUZYDFictwwHzr1vI1zz1bcuzy6zC6v+mrXms6xGOgoHkImGgi+mPwqhWAmdd9E2YdVxrdm3971jMjxWVXITDHzqiD1j/9DvaguSzefP9wCfF98HIA3SeccxYcsdADEk6R6u/u6YUmtQIa//kWMmvRCaV5sFefBWffTiQz6gGZCdB13rbhZXNRyD3vylOmDTs9QS4Wfl2SA1WqUqlxxvjQ9RmemzEh1ka08LWenYY/MFudZGcxQQYHgI6Qare2bASno31IZiNOcayuwKvf/Q6fdtwiUkhxIJOKXn8z+M5eBnGMylPNKPmyCo2oPfXnfwiiVVWDzrEKrLWvZUu8ZEDHPT+EWrRkShhe+fHtELjtP6C8KHOrn3QOURqPA2vzKsg0N3EbqbWL8mqHKogyfS4sWnQyqIMYpLX5bUj/9fecaFppzUlE5YEQ6d35tuV0NGVcqSr0kfkVV//s1d0vW86B957vfvdmSwUVZeqtjXOeuFBxZ+nAMmzYGn0BAdGlo+XyAVmERVq7px+q/+un5H0X/eOItthu2Qsd37iJp197DS+6NFATPVoiP7Zl/jHwwXvuJ+WD4pLRNnvXVog/9jMgYsEfWR6SfYjFNPe1d/F1bgDOuPnbpKahYYTq4vBtFObGNyH9h/u5RwjyviPXQSkhGLH92+zE1r+aGg6OpKqyMXV639LfbD5xbUt/S96MDhmHIJXT0FnqdJQi4CAnn5t3mH1LqFaVzwBz+ZN8853f42v+7Xa+6fFHoHPvngMOqkyZCrU/v5f4zjwTWCJRcssi0KsNBWHe5g3w7KUf49tXvjm2yiiepX35g9D/w5sRDDSHg8xH0Z1zGw1BfU0FnKib8Mb3v8bX/+UFGGoVreEafF00afEXHuep5XdzQTZKHDlaCMkfJPHW7XZ86yumKlOvTMls21GsdO2VJzd8YMixLdaQiKrO/f7cOU8ulZxqGb86WmmW88L0FprTFJqdaY/sJ22Cg3ZXdC1imASxSBTMY4+DWVdcTeaedvogWtoHLZ/+BM9s2VpSuPLaR/FYcfQzuxWZ+D7wQZh9ySehvHEe+DDeIUVxi93TDYk1b8GeB+6Fva++AvV16FPmTwc6ZTrGytqBprHIJ4pGA5Fu2d7WC6namTD1rAtI9fyFEIhGD4icXZeB09eFhORtcNa+yqGnFaiqD8RdQjHQVFPNB/0tW+z49tcsXQIvy5yVWwZGOBJo9lc9ftYv3/p4wnKGnIXrARJW1cbb58554jzJqUXaa48lbi0CRdyimvVLpFS6BMvAG0ngwL6DB5Uvu5wsveVWUOUBO2yuXw0tl1/KRdZaFK3cLM0jbs4Y+nDYE0ifY8IfTGkAGU2YHPCBgp9XEnGQ2vYj/98PGfx/XNGhL6BBOMThqIow+GYcBSwQKqwuN1zniQA/hefoTphg+cLAw2WglVURHECQxNfivVxO9YOc6AEpnQBJ+BGp1BxSRSciTdqzc5VltWyydTmXXikaMIoOTJk6Y8e59204ZVNbLDHshB0mgmnOLTaOrjNhvjjPNcFkHT3z8jdFYijOx3CQfQE/HI8Ssv7uX/E/mCb5yJ0/9CJez5EuXAyBiz8KXQ/eT0BU6mBg+kG2MY9AMBiAkCiS7d8LrHln9sTin7hhHBjZMLx5eDKCr/tUaIY072veQ+YmE1CBwSKprOFc0QZS1YNSWcJMaj4/1Pv9Xi+Am+4EtrcNT8O88wiSQpCxElHHz3dKFny3jGCoJBXrcHu3r7Qg3ubqquzVig7sPXNsxbWn+zVJhPjrhs1lOYylU4wn7XH21ZBsLx0neUpMRDOjlyE+sFiPdnQhBmaphx/kb//h6ZK/Bz98MeG6VlC7/KJV+TZUr4FbnAglU8wBoYYPROoehNbkHLe3hhQCFNZlqNGFC2FsS6zT2rJlfSa+ZT0nXW2EiOCPkEL+a1BTIQabCLooxqP/EeVnxfCDJM4lTJ+Ub4zNNdchEJKqE8cxeQcC0bnmT2kp2e7qmjIkGN5g4QlU5vjOnFU+bzja6/VLmq6T7MzY3bamSoS7E2g4G6DF+NMUREasP5kt6Q9QTgdfH21osOrXv+KLMD5RcoNpHL0Q9NlzIL11K9pgbcKriAnTQzUJNDQeVQY3bU7c/oxJNrbuccp7uuSq8ko5VFlNpFCEcM3gnEpwwJplvJRhlbSKCLAoFeaem8kYj3fszqTadziynWA+oRVUKnZRQ9p5N5Mhs8uNmSN1nQjhSLdY5vZkUF9aPo7+KVG5YpaZNf+GUQgmRLUT1UYQF5nngMmaIQIhBAT27iYiFV83bXqucKOANnMWpDdthOzyXAOzh8YMjjftX0g39bpfULQ0P+GWXwI36QCL2/FMb2vS9ne1SuFASIpEyiVDNL/5AmjbNeL5BG/S2EARnuR8reh0Zkht01aap/o7nXRfu2P3t7kyM7lPkUDW5IJDHe0anYwNs6LhMkqGbyUVKkG3J5JreyuiTsPo2gDEccFMpcD0+Qk9+VS56qhZJPX4I7bXgkMGFhMvAkbELZJLuMxlSuREEuIdHQA5QDzpFvX4g+nTFeYOB8ahzMtLUZlKjGCcLDNLk7gdVAi1kPqlnLTTGUs7Hf2d+HGVaqqOeOhE7AqaIAmFQ2ScRTnAdW3uOBnuZEzmWknmWHEmsQxHJYQggi9RZZyt3jg4yPowLjHIMIDkW39Iu2lubHF511xKQ7J4dMdw+Srbhc5wVKq46nq5/uylcnje0ZT0dfPmPzxlc6S8kHv6B4EBp++5qewyGLIkagPUm3p8YKEIyFA5tDFv1FAh6aZFK5zQRi48HPouXaMuVyhzNLRpftmTEOLgiNvMQjdruskMh0Rs4KweOxTtpsLuotKI1lYNL9ev4A0gMaUHs5weL8S/w2qI50c6TXPPdtPacpJPPr0cWModJgGWQHPwzpRp8inXf2kg8gpHiTJjlmStX+sgFyeDTi8uX7JFjUq0NjOxvF6QR2vrSi7J7e46uCkegnH5VbCdHq6QgWQJR0nIUMnQiJtS0EEqUrYlOTvZIDvNmA9h+T12lWu084p+JQmYg9tyk8uGTS7ybNzD4q/29P6xg8iUjwCuX8Obfmcr62jdX5K3MU49TeKDK4K5Fg4BhpA7IQV9aOrUBcdAee1AsYqlk2Bt28qRPnrrVOZbcfNpgFF3/KSkK+Cooscg6Ul0UTetZ81sLulQlNnKTqXDWAbvVsVdG7SL98TfkeUAhcmbhUKRPqdtlmIj9GXxfN18ayy2YpvDmtPI8YbrpFNlCcq6O92Nz/2pJH4MfeJTqjxtKuWmWRI44oEVfOmpjaif75Q1WPLFm0mxU0u99QZYe3ZnizuDUhZjlUca0iHtpDjl7oCDLcw+5aK5RbIZ1WA8M1kPwS6Sk6v2xXpHa5TzpiL0WtbOFb19T7UTDDuH6xoUnYU+nTU9/qhj2QM1K6mimlR+9wc6wSCOxeNcpCzwoBQtBqoc5w4Gae/gqMz73r+RmYMa4XoeeXCgFWe8/kMgj5ST+SQw7Riyq2G6APEaXAzhmLcE07u0WIgwgYrME7bbNFqTg5cWEr//1tX10AaX70/hxdMhk3gAUUOHyo3r7Jfu+mWJqzFOPVOuve+3PuPcpYqLZsNKpxQrlSJ9GP32nnQqHHPvw2TxP15Scry+5Y9C4i9/5sXFqhI/PwbmIocNSEKKE2ZlJ5YOY9oEdgIUgHdpjXpKqUPl5Ma2xJbhkouDQRJ2Vl5WV3vTTTVVtzTydJwNE4MwlPZXLFc+5qe/0Bedu/SAGzSb3mGpvbupx3nr6qFs7vwDRiH59uvQfN0VHMzMAany/HRETSwcSoZ3atRQgFUb0G23cZ26Xhlg5DERDs1NETjMTxQTfk5VNWlK/fazHth0ytbORGK0FeW8yTriqyvaO+5bkbLe6AbFLw3jS0RJcwnS/s03Xp9eufyJA25OnzWHlp21FKrOXgrlQ4ARW/E8NH/hagwMhq5bFHJZI8yVE0jRiAH9Tj9Gn06WOo5iw4UcMi4mCB9+X6IamrI77mza05dOjGayioPETMZ1Ox/ct+/bq7nUJ0yXNAx6qqbAEsrcjq9+Kf0/X/mi3bZ756hGxmpvhZbb/5W33Hgtkv+kiJKHXm2kkMcahvQLzROmSraQIsa9PBbN9rCNuJNsylAmhfa5w7frAT95vqnvxbTtwlhMVnF53KOIp1ZVfu6m+rr/OBb5rOzFmEObL5Gi7oonoCNSJiknnyJXn362XLngGCr7/FnkzTSktm2G1N/+yu2VrwNrawfJ5xtyjshQPkSYLTIoupECGmTCEvSxTu6TmNeRMmbfKswWuGmR7jtc5ooqsqzVTek9+5FtJ29oi+8bXDEcbZnYPCjKRxoavnFlZdlX5nIzKQ0DSj4uA8clKYzWk4zLtqFrsuHLdnBbJlAERWR8qChEjWV6W1GSD+MBT6TziS3JhzFHWIFe6OGqmExExzf/U0ytUggzKbDMYXHwONa+aCi4iQUfPv+hDf+UymnIWJ/0mZ+440V5T+3b9wOdUuPy8sj1c7iZlr1+9SFMmLDPVALN7xe1Ccq8KomVm+6HI+YLDFpAYOybWIJDJtlwWkIn7gYRDN7LFQRDmKrxRvi52Yf0sJEtZBJGKGTetaL1VynbHbHrZCRQnDyKj+zde6vJ3OSnK8q+PB8yVAdmuyN8kWUXzhiyrXSi6R9RZNH8Ksn4CPTlNEOTiJdzGn9UkW9jPzzmygj6/Zti7NlntnW/MtzH5DGOQwGU5c37vt9mmnuuqqu77QTJLQtxO5l37kPf8SSt/yUETGRWUTNSqgMJiHNVckGnuYkrEz9wPkV1iLVDov5I2PrRn1vu6DWHr46P5wk7xY/I4w0B/0mX19ffusynnVHLM6aaa4rIlWxJTpp1nmUyEx6xbMe6SDVIJI1O5Ol+05Zomlw8hStiHY+DW2uGiIqsI6FjP7TKwXmkIhp6oQd+cenT26/NDDL2B/tQsPxDJPFmaOSc6qrLPlZRfu0ihU6PchtZGMt4HD+rVnpWCyeWpxZAIA7EpZS/47ruS3Ers9tyGJonelU912ZHOc3QgwNErCkmH0JAxPhqhq6ngpGd5zy+/Yym3nT7UJ85GEDy2qLkTB6P6vrMcysqLr0gGv7EfIXOiKBuKKJ7nnPvM3zw+j+jqaE3bYCISdx8D2PuGsux9znMyRVaSb/DICIz6coGV0dGPeGnV3orwRKhISx9iNDwaG6gshyue7n1ogc3dT0/HGgHC0hxdVXO/eYRVW1YFA6ffXokfPGxhrqwViJVOvdSq1yC4vR1aS8gydEd8S7G6zyGMdteh7m7XNfpYZzJlHA9N9fCzT4hx1twv9HHlI9PcTUxC4iRiSGCh87gtZmTT3u9diZaXhn1/3J78os3/mXPf42kRZMByGBgpKLX5RWa1rgoErz4/IroVWV42348h4F/FysjKMALNXIXLwdtHBdzjrqY6/YiACkcX8GmVDF9OL8GZZFPsZlYkQhBsTk5PugoF9S4qquScSelhIZIhIvA0J5cQLw2UlpWEfI/vMe885oX937dZhwOFyCDUzECGDG5MBhS5YVXzqy5NwCKaGJiucYbIEXDW9QhxUVQqQjARNfIKHmdLCjeoynI8SFH+YcqV2EqATYuHyWmt7FJTzAiFjRSFvL/dnf6R1etaL7ZYSPTwLEGhhPZ8guMCpusJWxnp+m478wwtJPEwnOs6NyFVVhz0b33m8PA1OFRmJeobeP4oxZR2BBXbJcRfm6Vo8oa8R5dMVrgSbIrDLLJBEMIl6zIWjDkl+7Zkfj2ja/sv81h4/Nvkw1Icdwiujr7t8fTf14c8J1C8u3ZZBTjN9aTiAmkwqQB4xreRVNSdtL7CT+n0lHL/JxkRtV6YRe4A6UNkgdx0wT8hoq6qnZ+f33fl7+3quPBCWnXJJusYtMlzFSoUlPmfmt23UMVRBFTVSf3Ec2iRRXFXIRZ4pEVfY6ofzPp5Kgjzwm7suCB7jBj7aXs0VzBJGiILEtqyKdpq/vcF25Z033zn1uS62E8rWSH0IcUy7r3/CrcjU/VV3zrwxXhK7lL4nwST1C86LLrLXsnHgLGIelyMsVw5MUITIWPSww9NyuOTonny2yapbtkoleA1FwNaLLWbsOue3amfviTzb1392WYBeN8dOvhACQfQAotCdboSuN3Z9f9ppoo5Xg6Gw6RnRTm2kZNEY3FMW89bkYafK7cGHLlqCFmwYqAFW/ZS7cI7YBxaweGR5IqEV2jlHTavOnJfen7f7Ujfu+2mN0yhKwcUYDkg0ehJdoHq8Ofv6a24hbJ9Z4TeMiWOxYweI9V5dlnUiW8lm9OyjVXmhpw5ZogyBGVo3RzwXVdx2tE8RoUi1c8H1hkXPTVIwgKFaUWwlD72rfE3LVPtKQffbbVfL4pYbcWmekJmb/DBUj+IkX6JIzRd/CbM6v/8+yA/wLuQvxQt3vklzq3xequYtIQBjyyXw3uJ84rb7S13rUkqpyyOCLPq9al6qBCwij1AeI9bd3TbFHvyaCSJVMu7+2wWMfmmLPt1W7rbyt77Le2xO1dyJ7yNRQyUSDeDUBIkenyhxV5+o9m1941V9HmMcYTcIgLEQNPVACu+BR/zK/s+eKanR95pz8puj1UND++ao0GQjINq9Sb9i6mg1OedUlp1LT+pMP72izWb7ksUaQ9FIpW3puMfNfhAqTYdHlPDJ3t1xfeMaP651OpPB35TRLgkDdHcR3BcINq+w3rd1/8emfszRzhgKLYc7gHPRT7hMEPb5jUBOThBCR/43lQlLl+/djvTK/68VxZmeei+Tpk6iEao31KsF+Xmm7cuPfS17vjbw1yumSYCIgP8/qQZYQPNyDFoAjzpdRoyox/aaj8ztkBYxl3OPrfoZd/mjAWEpFDAdXY5rp/uWnrvqvW96eaJsKADsf2bgECRdlh4ejFFOzgZ2qin/lMRfiaKqCV6ChT4nG2ExZLkk3g+lTJ7yq07/Ge+I/v3N3+g+6Mkz5SwXi3ASl29FoOGIIm7OhPV4avPD/oOz9KaJnr8gzzWOkYnaZYo5kQVRcPMKMk9mrK/OPP2np/+FJfYs1EY4P/TYAAlNZStBxAyjy/Pv/D0cCHlgZ9506V5RkGQEBMt7HFZOmBOCFfqKcaFXNfxdRpkup03F0vJlLP/a4v8du/xlOrBrwIMDjCtyMBkKGAKTQ/h2SpfI6uHHWC31h0nE9buEBXa4IYx0hA1NykrIyFlHSzZbevT5nrXk+kVzZZ9ub9ttM1yElzeA9sBwDyf9uRs/1/AQYAoEA/Vx4S50kAAAAASUVORK5CYII=
        `;
    }
}
exports.LoginButton = LoginButton;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzBweCIgIGhlaWdodD0iMzBweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJpcHBsZSI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzNS40MjE0IiBmaWxsPSJub25lIiBuZy1hdHRyLXN0cm9rZT0ie3tjb25maWcuYzF9fSIgbmctYXR0ci1zdHJva2Utd2lkdGg9Int7Y29uZmlnLndpZHRofX0iIHN0cm9rZT0iI2Q1MjEwYSIgc3Ryb2tlLXdpZHRoPSI0Ij4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzQwIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjEuNSIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGJlZ2luPSItMC43NXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMTswIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjEuNSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGJlZ2luPSItMC43NXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICA8L2NpcmNsZT4KICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjE2LjgwNzYiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMn19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjZjE4ZDAxIiBzdHJva2Utd2lkdGg9IjQiPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7NDAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMS41IiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxLjUiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICA8L2NpcmNsZT4KICA8L3N2Zz4=\n"

/***/ })
/******/ ]);