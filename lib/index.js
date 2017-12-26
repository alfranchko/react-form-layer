(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-form-Layer"] = factory();
	else
		root["react-form-Layer"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(41);
var defined = __webpack_require__(16);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(46);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(43);
var toPrimitive = __webpack_require__(18);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(21)('wks');
var uid = __webpack_require__(15);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(48);
var enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(12);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(2);
var toPrimitive = __webpack_require__(18);
var has = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(43);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(21)('keys');
var uid = __webpack_require__(15);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(68);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(29);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(71);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(82);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(76);
var enumBugKeys = __webpack_require__(22);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(44)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(77).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(3);
var TAG = __webpack_require__(10)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(10);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(34);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(92);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(96);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(29);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(99);
} else {
  module.exports = require('./cjs/react.development.js');
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(102)();
}


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_autobind_decorator__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_autobind_decorator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__FormError__ = __webpack_require__(105);
/* unused harmony reexport FormError */








var _desc, _value, _class, _class2, _temp2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}






var Form = (_class = (_temp2 = _class2 = function (_Component) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(Form, _Component);

    function Form() {
        var _ref;

        var _temp, _this, _ret;

        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Form);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Form.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(Form)).call.apply(_ref, [this].concat(args))), _this), _this._inputs = {}, _this.state = {
            values: {},
            errors: {},
            hasChanged: false,
            hasMistake: false
        }, _temp), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var onChange = this.onChange,
                registerInput = this.registerInput,
                unregisterInput = this.unregisterInput;


            return {
                onChange: onChange,
                registerInput: registerInput,
                unregisterInput: unregisterInput,
                formData: this.state
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._initialOnChange();

            this._isMounted = true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
        }

        /**
         * Метод, который инпуты ловят через контекст и если он есть то инпуты записывают ссылки на себя в форму
         * @public
         * @param {Object} inputInstanse - ссылка на экземляр инпута
         * @param {Object} inputProps - пропсы инпута отдельно так как в момент инициализации они не в экземпляре
         * */

    }, {
        key: 'registerInput',
        value: function registerInput(inputInstanse, inputProps) {
            var name = inputProps.name;


            this._inputs[name] = inputInstanse;

            if (this._isMounted) {
                this._updateForm(this._inputs);
            }
        }

        /**
         * В момент размонтирования инпуты стирают о себе запись
         * @public
         * @param {String} inputName - ссылка на экземляр инпута
         * */

    }, {
        key: 'unregisterInput',
        value: function unregisterInput(inputName) {
            delete this._inputs[inputName];

            if (this._isMounted) {
                this._updateForm(this._inputs);
            }
        }

        /**
         * Хандлер который срабатывает при изменении любого инпута
         * Ловится инпутом через контекст
         * @public
         * @param {Object} inputState - value, error, focus and hasChanged
         * @param {String} name - props.name из инпута
         * */

    }, {
        key: 'onChange',
        value: function onChange(inputState, name) {
            var lastChanged = { state: inputState, name: name };

            this._updateForm(this._inputs, lastChanged);
        }

        /**
         * Возвращает state (=formData)
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'getValues',
        value: function getValues() {
            return this.state;
        }

        /**
         * Устанавливает в state инпутов переданные значения
         * Использует публичный метод инпута setValue
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'setValues',
        value: function setValues() {
            var inputsNeedUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var updateWorkerFunc = function updateWorkerFunc(input, name) {
                return input.setValue(inputsNeedUpdate[name]);
            };
            var updatedInputs = this._updateInputs(inputsNeedUpdate, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Сбрасывает значения всех инпутов в текущие deafultValue
         * Использует публичный метод инпута resetValue
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'resetValues',
        value: function resetValues() {
            var updateWorkerFunc = function updateWorkerFunc(input) {
                return input.resetValue();
            };
            var updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Сбрасывает значения всех инпутов в нулину initialValue
         * Использует публичный метод инпута dropValue
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'dropValues',
        value: function dropValues() {
            var updateWorkerFunc = function updateWorkerFunc(input) {
                return input.dropValue();
            };
            var updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Запускает валидацию всех инпутов принудительно
         * Использует публичный метод инпута verify
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'validate',
        value: function validate() {
            var updateWorkerFunc = function updateWorkerFunc(input) {
                return input.verify();
            };
            var updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Хэндлер события onSubmit, инициализируется только кнопкой submit
         * @private
         * */

    }, {
        key: '_onSubmit',
        value: function _onSubmit(e) {
            e.preventDefault();
            var formData = this.validate();

            if (formData.hasMistake) return;

            if (this.props.onSubmit) this.props.onSubmit(formData);
        }

        /**
         * Хэндлер события onReset, инициализируется только кнопкой reset
         * @private
         * */

    }, {
        key: '_onReset',
        value: function _onReset(e) {
            e.preventDefault();
            var formData = this.resetValues();

            if (this.props.onReset) this.props.onReset(formData);
        }

        /**
         * Первоначальная запись в state после регистрации всех инпутов
         * @private
         * */

    }, {
        key: '_initialOnChange',
        value: function _initialOnChange() {
            this._updateForm(this._inputs);
        }

        /**
         * Переиспользуемый метод для обновления формы и вызова хандлера
         * @private
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: '_updateForm',
        value: function _updateForm(inputs, lastChanged) {
            var formData = this._createFormData(inputs, lastChanged);

            this.setState(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, formData));

            if (this.props.onChange) this.props.onChange(formData);

            return formData;
        }

        /**
         * Переиспользуемый метод для вызова публичного метода инпута
         * @private
         * @param {Object} inputsNeedUpdate {field:..., field2:....}
         * @param {Function} updateWorkerFunc (input) => input.resetValue()
         * @return {Object} {field:..., field2:....}
         * */

    }, {
        key: '_updateInputs',
        value: function _updateInputs(inputsNeedUpdate, updateWorkerFunc) {
            var updatedInputs = {};

            for (var name in inputsNeedUpdate) {
                var input = this._inputs[name];
                var state = updateWorkerFunc(input, name);

                updatedInputs[name] = { state: state };
            }

            return updatedInputs;
        }

        /**
         * Переиспользуемый создания formData values, errors, hasMistake, hasChanged
         * @private
         * @param {Object} inputs {field:..., field2:....}
         * @param {Object} lastChanged {state: ..., name: ...}
         * @return {Object} formData values, errors, hasMistake, hasChanged
         * */

    }, {
        key: '_createFormData',
        value: function _createFormData(inputs, lastChanged) {
            var values = {};
            var errors = {};
            var hasChanged = false;
            var hasMistake = false;

            for (var name in inputs) {
                var inputState = lastChanged && lastChanged.name === name ? lastChanged.state : inputs[name].state;

                var field = {
                    name: name,
                    value: inputState.value,
                    error: inputState.error,
                    hasChanged: inputState.hasChanged
                };
                values[name] = field;

                if (field.hasChanged) hasChanged = true;

                if (field.error) {
                    errors[name] = field.error;
                    hasMistake = true;
                }
            }

            return { values: values, errors: errors, hasChanged: hasChanged, hasMistake: hasMistake };
        }
    }, {
        key: 'render',
        value: function render() {
            var className = this.props.className;


            return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'form',
                {
                    className: className,
                    onSubmit: this._onSubmit,
                    onReset: this._onReset
                },
                this.props.children
            );
        }
    }]);

    return Form;
}(__WEBPACK_IMPORTED_MODULE_7_react__["Component"]), _class2.propTypes = {
    className: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
    children: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node,
    // событие которое срабатывает только по нажатию по кнопке action=submit
    onSubmit: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
    // событие которое срабатывает только по нажатию по кнопке action=reset
    onReset: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
    // если передать хандлер onChange в форму, все инпуты начнут вещать в форму о своем изменении
    // и форма будет передавать на верх карту всех значений инпутов при любом изменении
    onChange: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func
}, _class2.childContextTypes = {
    onChange: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
    registerInput: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func.isRequired,
    unregisterInput: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func.isRequired,
    formData: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object.isRequired
}, _temp2), (_applyDecoratedDescriptor(_class.prototype, 'registerInput', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'registerInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unregisterInput', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'unregisterInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onChange', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'onChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getValues', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'getValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setValues', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'setValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetValues', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'resetValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dropValues', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'dropValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validate', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'validate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onSubmit', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_onSubmit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onReset', [__WEBPACK_IMPORTED_MODULE_9_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_onReset'), _class.prototype)), _class);



/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(42);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(44)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(5);
var core = __webpack_require__(0);
var fails = __webpack_require__(8);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(58);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(59);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(3);
var toIObject = __webpack_require__(2);
var arrayIndexOf = __webpack_require__(63)(false);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(3);
var toObject = __webpack_require__(24);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(51);
var hide = __webpack_require__(9);
var has = __webpack_require__(3);
var Iterators = __webpack_require__(31);
var $iterCreate = __webpack_require__(75);
var setToStringTag = __webpack_require__(33);
var getPrototypeOf = __webpack_require__(49);
var ITERATOR = __webpack_require__(10)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(48);
var hiddenKeys = __webpack_require__(22).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = autobind;
/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */
function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(undefined, arguments);
  } else {
    return boundMethod.apply(undefined, arguments);
  }
}

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys = void 0;
  // Use Reflect if exists
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error('@autobind decorator can only be applied to methods not: ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  var definingProperty = false;

  return {
    configurable: true,
    get: function get() {
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormInput__ = __webpack_require__(107);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "formInput", function() { return __WEBPACK_IMPORTED_MODULE_1__FormInput__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FormError", function() { return __WEBPACK_IMPORTED_MODULE_0__Form__["a"]; });





/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Form__["a" /* default */]);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(2);
var $getOwnPropertyDescriptor = __webpack_require__(17).f;

__webpack_require__(45)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(62) });


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(14);
var gOPS = __webpack_require__(23);
var pIE = __webpack_require__(12);
var toObject = __webpack_require__(24);
var IObject = __webpack_require__(41);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(8)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(2);
var toLength = __webpack_require__(64);
var toAbsoluteIndex = __webpack_require__(65);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(24);
var $getPrototypeOf = __webpack_require__(49);

__webpack_require__(45)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);
__webpack_require__(78);
module.exports = __webpack_require__(34).f('iterator');


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(74)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(50)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var defined = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(32);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(33);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(10)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(14);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
var global = __webpack_require__(1);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(31);
var TO_STRING_TAG = __webpack_require__(10)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(80);
var step = __webpack_require__(81);
var Iterators = __webpack_require__(31);
var toIObject = __webpack_require__(2);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(50)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
__webpack_require__(89);
__webpack_require__(90);
__webpack_require__(91);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(51);
var META = __webpack_require__(85).KEY;
var $fails = __webpack_require__(8);
var shared = __webpack_require__(21);
var setToStringTag = __webpack_require__(33);
var uid = __webpack_require__(15);
var wks = __webpack_require__(10);
var wksExt = __webpack_require__(34);
var wksDefine = __webpack_require__(35);
var enumKeys = __webpack_require__(86);
var isArray = __webpack_require__(87);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(7);
var toIObject = __webpack_require__(2);
var toPrimitive = __webpack_require__(18);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(32);
var gOPNExt = __webpack_require__(88);
var $GOPD = __webpack_require__(17);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(14);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(52).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(12).f = $propertyIsEnumerable;
  __webpack_require__(23).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(15)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(3);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(8)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(14);
var gOPS = __webpack_require__(23);
var pIE = __webpack_require__(12);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(42);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(2);
var gOPN = __webpack_require__(52).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 89 */
/***/ (function(module, exports) {



/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('asyncIterator');


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('observable');


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(95).set });


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(11);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(46)(Function.call, __webpack_require__(17).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(32) });


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m=__webpack_require__(100),n=__webpack_require__(101),p=__webpack_require__(53),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(53);
var invariant = __webpack_require__(103);
var ReactPropTypesSecret = __webpack_require__(104);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);






var _class, _temp;





var FormError = (_temp = _class = function (_Component) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(FormError, _Component);

    function FormError() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, FormError);

        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (FormError.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(FormError)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(FormError, [{
        key: 'renderFirstError',
        value: function renderFirstError(errors) {
            var first = void 0;

            for (first in errors) {
                break;
            }return errors[first];
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children;
            var _context$formData = this.context.formData,
                errors = _context$formData.errors,
                hasMistake = _context$formData.hasMistake;

            var _classname = __WEBPACK_IMPORTED_MODULE_7_classnames___default()('form--globalError', className);

            return hasMistake ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                { className: _classname },
                children ? children(errors, hasMistake) : this.renderFirstError(errors)
            ) : null;
        }
    }]);

    return FormError;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]), _class.propTypes = {
    className: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
    // Интересный прием передавать функцию как children чтобы переопределить render. Так же мы делаем в AsyncBundle
    children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func
}, _class.contextTypes = {
    formData: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object.isRequired
}, _temp);


/* unused harmony default export */ var _unused_webpack_default_export = (FormError);

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export extractValue */
/* unused harmony export formInput */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_prop_types__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_autobind_decorator__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_autobind_decorator__);










function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}





/*
 * formInput - самодостаточный HOC компонент, который может обварачивать BaseInput, Radio, Checkbox и др
 * Все значения берутся из state, все что зависит от пропсов при изменении обновляют state в componentWillReceiveProps
 *
 * В данный момент formInput может использоваться в полном "ручном режиме" когда мы передаем value error и onChange от родителя
 * Но предпочтительный вариант использования совместно с компонентом <Form />
 * */

function extractValue(value) {
    return value instanceof Object && !(value instanceof Array) ? value.value : value;
}

function formInput() {
    var initialOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultName = initialOptions.defaultName,
        defaultValue = initialOptions.defaultValue,
        defaultVerification = initialOptions.defaultVerification;


    return function (Input) {
        var _desc, _value, _class, _class2, _temp;

        var initialDefValue = defaultValue;

        var FormInput = (_class = (_temp = _class2 = function (_Component) {
            __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default()(FormInput, _Component);

            function FormInput(props, context) {
                __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, FormInput);

                var _this = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_possibleConstructorReturn___default()(this, (FormInput.__proto__ || __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_get_prototype_of___default()(FormInput)).call(this));

                _this.state = {
                    value: props.value || props.defaultValue,
                    defaultValue: props.defaultValue,
                    error: props.error || '',
                    focus: !!props.focus,
                    hasChanged: _this._checkHasChanged(props.value, props.defaultValue)
                };

                if (context.registerInput) context.registerInput(_this, props);
                return _this;
            }

            __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(FormInput, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    if (this.props.focus) this.focus();
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    if (this.context.unregisterInput) this.context.unregisterInput(this.props.name);
                }
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(next) {
                    var defaultValue = next.defaultValue,
                        value = next.value,
                        error = next.error;


                    if (this._checkHasChanged(defaultValue, this.props.defaultValue) || this._checkHasChanged(value, this.props.value)) {
                        var hasChanged = this._checkHasChanged(value, defaultValue);
                        var state = {
                            value: value,
                            defaultValue: defaultValue,
                            hasChanged: hasChanged
                        };

                        this.setState(state);

                        // Этот кейс необходим для "контролируемых инпутов" (когда value или defaultValue приходят меняются сверху)
                        // Вызов _callAllHandlers здесь позволяет синхронизировать инпуты с Form или другими компонентами
                        this._callAllHandlers(state);
                    }

                    if (error !== this.props.error) {
                        this.setState({ error: error });
                    }
                }

                /**
                 * @private
                 * @param {object} update - ключи и значения для записи в state например {value: '123'}
                 * @return {Object} возвращает полный state смерженный с обновленными ключами
                 * */
                /* eslint no-restricted-syntax: off */

            }, {
                key: '_completeState',
                value: function _completeState() {
                    var update = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    var state = {};

                    for (var key in this.state) {
                        if (update[key] === undefined) {
                            state[key] = this.state[key];
                        } else {
                            state[key] = update[key];
                        }
                    }

                    return state;
                }

                /**
                 * @private
                 * @return {Object} {hasMitake: Boolean, mes: String}
                 * */

            }, {
                key: '_callVerification',
                value: function _callVerification() {
                    return this.props.verification(this.state, this.props);
                }

                /**
                 * @private
                 * @param {(string|number|object|array, undefined)} value
                 * @param {(string|number|object|array)} defValue
                 * @return {Boolean}
                 * */

            }, {
                key: '_checkHasChanged',
                value: function _checkHasChanged(value, defValue) {
                    var extractedValue = this._extractActualValue(value);

                    // При сравнивании с неизвестным значением считается что нет изменения
                    if (extractedValue === undefined) return false;

                    // Для значений типа Array
                    if (extractedValue instanceof Array) {
                        return this._isArrayValuesChanged(value, defValue);
                    }

                    // Для простых значений и значений {value: ...}
                    return extractedValue !== this._extractActualValue(defValue);
                }

                /**
                 * @private
                 * @param {array} value
                 * @param {array, undefined} defValue
                 * @return {Boolean}
                 * */

            }, {
                key: '_isArrayValuesChanged',
                value: function _isArrayValuesChanged(value) {
                    var defValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                    // Если длинна не совпадает это не одинаковые значения
                    if (value.length !== defValue.length) return true;

                    var isEqual = false;

                    for (var i = 0; i < value.length; i += 1) {
                        var val1 = this._extractActualValue(value[i]);
                        var val2 = this._extractActualValue(defValue[i]);

                        if (val1 !== val2 || (typeof val1 === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof___default()(val1)) !== (typeof val2 === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof___default()(val2))) {
                            isEqual = true;
                            break;
                        }
                    }

                    return isEqual;
                }

                /**
                 * @private
                 * @param {(string|number|object)} value
                 * @return {string|number|object}
                 * */

            }, {
                key: '_extractActualValue',
                value: function _extractActualValue(value) {
                    // Если приходит value как объект необходимо вытащить истинное value
                    // Функция выносенна отдельно так как в других частях приложения она тоже используется
                    return extractValue(value);
                }

                /**
                 * Мержет state с обновленными ключами и дергает только родительский хэндлер props.onChange
                 * @private
                 * @param {object} toUpdate - ключи и значения для записи в state например {value: '123'}
                 * @return {object} возвращает обновленный state
                 * */

            }, {
                key: '_callOnlyParentHandler',
                value: function _callOnlyParentHandler(toUpdate) {
                    var state = this._completeState(toUpdate);

                    if (this.props.onChange) this.props.onChange(state);

                    return state;
                }

                /**
                 * Мержет state с обновленными ключами и дергает и родительский и из контеста onChange
                 * @private
                 * @param {object} toUpdate - ключи и значения для записи в state например {value: '123'}
                 * @return {object} возвращает обновленный state
                 * */

            }, {
                key: '_callAllHandlers',
                value: function _callAllHandlers(toUpdate) {
                    var state = this._completeState(toUpdate);

                    if (this.props.onChange) this.props.onChange(state);
                    if (this.context.onChange) this.context.onChange(state, this.props.name);

                    return state;
                }

                /**
                 * Хэндлер в input на фокус
                 * @private
                 * */

            }, {
                key: '_onFocus',
                value: function _onFocus(e) {
                    this.setState({ focus: true });

                    if (this.props.onFocus) this.props.onFocus(e);
                }

                /**
                 * Хэндлер в input на блюр. Вызывает верификацию! Если есть ошибка обновляет state и все хандлеры
                 * @private
                 * */

            }, {
                key: '_onBlur',
                value: function _onBlur(e) {
                    // Пока блюр проверят ошибки только в base, возможно вообще нужно отключить это!
                    // Поговорил с Женей - решили пока отключить это
                    /* const error = this._callVerification()
                       if (targetType === 'base' && error.mes !== this.state.error) {
                     // Важно! Так как маска зараза скидывает пустую маску в пустую строку важно взять именно оттуда
                     const value = e.target.value || ''
                     const toUpdate = {error: error.mes, focus: false, value}
                       this.setState(toUpdate)
                       this._callAllHandlers(toUpdate)
                     } else {
                     this.setState({focus: false})
                     }*/

                    this.setState({ focus: false });

                    if (this.props.onBlur) this.props.onBlur(e);
                }

                /**
                 * Хэндлер в input на onChange. Блокирует ввод данных если не удолетворяет regexp
                 * @param {any} value - любое значение подымающеся из обвернутого инпута
                 * @param {String} error - ошибка - возможность устанавливать ошибки через onChange
                 * @private
                 * */

            }, {
                key: '_onChange',
                value: function _onChange(value) {
                    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                    if (this.props.disabled || this.props.readOnly) return;

                    // Проверяем допустимые символы
                    // Проверка на regexp данных живет теперь только в BaseInput
                    // deprecated
                    //if (this.props.regexp && this.props.regexp.test(value)) return

                    var toUpdate = {
                        value: value,
                        error: error,
                        hasChanged: this._checkHasChanged(value, this.props.defaultValue)
                    };

                    this.setState(toUpdate);

                    this._callAllHandlers(toUpdate);
                }

                /**
                 * Хэндлер в input на mouseDown
                 * @private
                 * */

            }, {
                key: '_onMouseDown',
                value: function _onMouseDown(e) {
                    if (this.props.onMouseDown) this.props.onMouseDown(e);
                }

                /**
                 * Хэндлер в input на keyDown
                 * @private
                 * */

            }, {
                key: '_onKeyDown',
                value: function _onKeyDown(e) {
                    if (this.props.disabled || this.props.readOnly) return;

                    if (e.keyCode === 13 && this.props.onEnter) this.props.onEnter(e);
                }

                /**
                 * Запись ссылки на input
                 * @private
                 * */

            }, {
                key: '_saveRefToNodeWillFocus',
                value: function _saveRefToNodeWillFocus(i) {
                    this.input = i;
                }

                /**
                 * @public
                 * */

            }, {
                key: 'focus',
                value: function focus() {
                    if (this.input) this.input.focus();
                }

                /**
                 * Публичный метод для установки любых значений в state инпута c вызовом родительского хэндлера
                 * например this.input.setValue({value: 123, error: 'someError'})
                 * @public
                 * @param {object} needUpdate - ключи и значения которые нужно обновить
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'setValue',
                value: function setValue(needUpdate) {
                    var _needUpdate$value = needUpdate.value,
                        value = _needUpdate$value === undefined ? this.state.value : _needUpdate$value,
                        _needUpdate$defaultVa = needUpdate.defaultValue,
                        defaultValue = _needUpdate$defaultVa === undefined ? this.state.defaultValue : _needUpdate$defaultVa,
                        _needUpdate$error = needUpdate.error,
                        error = _needUpdate$error === undefined ? '' : _needUpdate$error,
                        other = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties___default()(needUpdate, ['value', 'defaultValue', 'error']);

                    var hasChanged = this._checkHasChanged(value, defaultValue);

                    var toUpdate = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({ value: value, defaultValue: defaultValue, hasChanged: hasChanged, error: error }, other);

                    this.setState(toUpdate);

                    return this._callOnlyParentHandler(toUpdate);
                }

                /**
                 * this.input.resetValue()
                 * Публичный метод для сброса значения value в state на дефолтный defaultValue
                 * Обнуляет error, hasChanged
                 * @public
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'resetValue',
                value: function resetValue() {
                    var toUpdate = {
                        error: '',
                        value: this.props.defaultValue,
                        hasChanged: false
                    };

                    this.setState(toUpdate);

                    return this._callOnlyParentHandler(toUpdate);
                }

                /**
                 * this.input.dropValue()
                 * Публичный метод для сброса значения value в state на initialDefValue (обнуление значения)
                 * Обнуляет error, hasChanged
                 * @public
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'dropValue',
                value: function dropValue() {
                    var toUpdate = {
                        error: '',
                        value: initialDefValue,
                        hasChanged: this._checkHasChanged(initialDefValue, this.state.defaultValue)
                    };

                    this.setState(toUpdate);

                    return this._callOnlyParentHandler(toUpdate);
                }

                /**
                 * this.input.verify()
                 * Публичный метод для вызова верификации. Если есть ошибка обноляет state и вызывает родительский OnChange
                 * @public
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'verify',
                value: function verify() {
                    var error = this._callVerification();

                    if (error.hasMistake) {
                        var toUpdate = { error: error.mes };

                        this.setState(toUpdate);

                        return this._callOnlyParentHandler(toUpdate);
                    }

                    return this.state;
                }
            }, {
                key: '_completeProps',
                value: function _completeProps() {
                    var _state = this.state,
                        value = _state.value,
                        error = _state.error,
                        focus = _state.focus;

                    var other = this.props;

                    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, other, {
                        onChange: this._onChange,
                        onKeyDown: this._onKeyDown,
                        onBlur: this._onBlur,
                        onFocus: this._onFocus,
                        onMouseDown: this._onMouseDown,
                        saveRefToNodeWillFocus: this._saveRefToNodeWillFocus,
                        value: value,
                        error: error,
                        focus: focus
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    var props = this._completeProps();

                    return __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(Input, props);
                }
            }]);

            return FormInput;
        }(__WEBPACK_IMPORTED_MODULE_9_react__["Component"]), _class2.contextTypes = {
            onChange: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func,
            registerInput: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func,
            unregisterInput: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func
        }, _class2.propTypes = {
            // main
            disabled: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.bool, // Блочит любые действия и меняет стили как явно недоступный инпут
            error: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.string,
            focus: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.bool, // переданное значение фокусирует инпут при маунте
            name: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.string.isRequired,
            readOnly: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.bool, // Инпут который нельзя редактировать но выглядит как обычный
            value: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.any,
            defaultValue: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.any,

            // onHandlers
            onChange: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func,
            onMouseDown: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func,
            onBlur: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func,
            onFocus: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func,
            onEnter: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func,

            // Verify
            verification: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func.isRequired, // функция проверки введенного значения на onBlur
            regexp: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.object, // блокирует ввод недопустимых символов в onChange
            required: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.bool
        }, _class2.defaultProps = {
            value: undefined,
            error: '',
            name: defaultName,
            verification: defaultVerification,
            defaultValue: defaultValue
        }, _temp), (_applyDecoratedDescriptor(_class.prototype, '_onFocus', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_onFocus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onBlur', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_onBlur'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onChange', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_onChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onMouseDown', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_onMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onKeyDown', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_onKeyDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_saveRefToNodeWillFocus', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, '_saveRefToNodeWillFocus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'focus', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'focus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setValue', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'setValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetValue', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'resetValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dropValue', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'dropValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'verify', [__WEBPACK_IMPORTED_MODULE_11_autobind_decorator___default.a], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(_class.prototype, 'verify'), _class.prototype)), _class);


        return FormInput;
    };
}

/* harmony default export */ __webpack_exports__["a"] = (formInput);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ })
/******/ ]);
});