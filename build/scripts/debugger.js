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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 174);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(45)('wks');
var uid = __webpack_require__(32);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(10);
var hide = __webpack_require__(12);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(63);
var toPrimitive = __webpack_require__(47);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(64);
var defined = __webpack_require__(38);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(19)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(53);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(26);
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
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(74);
var enumBugKeys = __webpack_require__(40);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ObjectStore = undefined;

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectStore = exports.ObjectStore = function () {
    function ObjectStore() {
        (0, _classCallCheck3.default)(this, ObjectStore);

        this.objects = [];
    }

    (0, _createClass3.default)(ObjectStore, [{
        key: "get",
        value: function get(id) {
            var object = this.objects[id];

            if (!object) {
                return;
            }

            return object;
        }
    }, {
        key: "getByObjectId",
        value: function getByObjectId(objectId) {
            var id = JSON.parse(objectId).id;
            return this.get(id);
        }
    }, {
        key: "getLastObject",
        value: function getLastObject() {
            return this.get(this.getLastScriptId());
        }
    }, {
        key: "getLastScriptId",
        value: function getLastScriptId() {
            return this.size - 1;
        }
    }, {
        key: "push",
        value: function push(object) {
            var id = this.size;
            this.objects.push(object);
            return id;
        }
    }, {
        key: "size",
        get: function get() {
            return this.objects.length;
        }
    }]);
    return ObjectStore;
}();

exports.default = new ObjectStore();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(38);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(141)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(68)(String, 'String', function (iterated) {
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(57);

var _promise2 = _interopRequireDefault(_promise);

exports.getAttributes = getAttributes;
exports.getDriverOrigin = getDriverOrigin;
exports.getTitle = getTitle;
exports.getDescription = getDescription;
exports.request = request;

var _xhr = __webpack_require__(169);

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flatten = function flatten(arr) {
    return arr.reduce(function (acc, val) {
        return acc.concat(Array.isArray(val) ? flatten(val) : val);
    }, []);
};

function getAttributes(namedNodeMap) {
    /**
     * ensure text nodes aren't accidentely being parsed for attributes
     */
    if (!namedNodeMap) {
        return;
    }

    var attributes = namedNodeMap.toArray().map(function (attr) {
        return [attr.name, attr.value];
    });
    return flatten(attributes);
}

/**
 * get origin of backend depending on whether scripts get injected or referenced
 * by launcher
 */
function getDriverOrigin() {
    /**
     * check if executed by launcher script
     */
    if (document.currentScript && document.currentScript.src) {
        return 'http://' + document.currentScript.src.split('/').slice(2, 3)[0];
    }

    if (document.currentScript && document.currentScript.getAttribute('data-proxy-host')) {
        return 'http://' + document.currentScript.getAttribute('data-proxy-host');
    }

    if (window._proxyHost) {
        return window._proxyHost;
    }

    return 'http://localhost:9222';
}

function getTitle() {
    /**
     * get document title
     */
    var title = '';
    var titleTag = document.querySelector('title');
    if (titleTag) {
        title = titleTag.text;
    }

    return title;
}

function getDescription() {
    /**
     * get document description
     */
    var description = '';
    var metaTags = document.querySelectorAll('meta');
    for (var i = 0; i < metaTags.length; ++i) {
        var tag = metaTags[i];
        if (tag.getAttribute('name') !== 'description') {
            continue;
        }

        description = tag.getAttribute('content');
    }

    return description;
}

/**
 * simple wrapper to do POST request with xhr
 */
function request(url, json) {
    return new _promise2.default(function (resolve, reject) {
        _xhr2.default.post({
            url: url,
            json: json,
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        }, function (err, res) {
            if (err) {
                return reject(err);
            }

            return resolve(res);
        });
    });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDomNodes = getDomNodes;
exports.setNodeIds = setNodeIds;
exports.getColorFormatted = getColorFormatted;
/**
 * parses through root children to create Node objects
 * @param  {NodeElement} root   element to start with
 * @param  {number}      depth  number of child depth to parse through
 * @param  {Object}      pierce unknown
 * @return {Node}               root element with children elements
 */
function getDomNodes(root, depth, pierce) {
    for (var i = 0; i < root.node.childNodes.length; ++i) {
        var node = root.node.childNodes[i];

        /**
         * ignore line break nodes
         */
        if (node.nodeName === '#text' && node.nodeValue.trim() === '') {
            continue;
        }

        /**
         * Check if node id is available and if not assign new node ids to them.
         * This can happen if a node was replaced or a text node changed between we
         * initially assigned a node id via `setNodeIds` and we created a node object
         * via `getDomNodes` (which have listeners for these changes)
         */
        if (typeof node._nodeId !== 'number') {
            setNodeIds(node);
        }

        var child = root.addChild(node);

        if (depth && child && node.childNodes.length) {
            getDomNodes(child, depth - 1, pierce);
            continue;
        }

        /**
         * get child node if it is only a text node
         */
        if (child && node.childNodes.length === 1 && node.childNodes[0].nodeName === '#text') {
            getDomNodes(child, 0, pierce);
        }
    }
}

var nodes = 0;
function setNodeIds(root) {
    if (!root || root._nodeId) {
        return;
    }

    root._nodeId = nodes++;
    for (var i = 0; i < root.childNodes.length; ++i) {
        setNodeIds(root.childNodes[i]);
    }
}

/**
 * parses rgba color object to css string
 * @param  {Object} color  object with r, g, b and a property
 * @return {String}        css value for e.g. background-color property
 */
function getColorFormatted(color) {
    if (!color) {
        return 'rgba(0, 0, 0, 0)';
    }
    return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(19);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(46);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(147);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HIGHLIGHT_NODE_ID = exports.name = exports.enabled = undefined;
exports.getDocument = getDocument;
exports.requestChildNodes = requestChildNodes;
exports.getOuterHTML = getOuterHTML;
exports.setOuterHTML = setOuterHTML;
exports.removeAttribute = removeAttribute;
exports.removeNode = removeNode;
exports.hideHighlight = hideHighlight;
exports.highlightNode = highlightNode;
exports.setNodeValue = setNodeValue;
exports.setInspectedNode = setInspectedNode;
exports.setAttributesAsText = setAttributesAsText;
exports.markUndoableState = markUndoableState;
exports.requestNode = requestNode;
exports.resolveNode = resolveNode;
exports.getAttributes = getAttributes;
exports.documentUpdated = documentUpdated;

var _Node = __webpack_require__(35);

var _Node2 = _interopRequireDefault(_Node);

var _ObjectStore = __webpack_require__(16);

var _ObjectStore2 = _interopRequireDefault(_ObjectStore);

var _PropertyObject = __webpack_require__(52);

var _dom = __webpack_require__(24);

var _common = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enabled = false;
var name = 'DOM';
var HIGHLIGHT_NODE_ID = '_highlightedNode';
var inspectedNodes = [];

/**
 * Returns the root DOM node (and optionally the subtree) to the caller.
 *
 * @param  {integer} depth   The maximum depth at which children should be retrieved, defaults to 1.
 *                           Use -1 for the entire subtree or provide an integer larger than 0.
 *                           (experimental)
 * @param  {boolean} pierce  Whether or not iframes and shadow roots should be traversed when returning
 *                           the subtree (default is false). (experimental)
 * @return {root}            Resulting node.
 */
function getDocument(_ref) {
    var _ref$depth = _ref.depth,
        depth = _ref$depth === undefined ? 1 : _ref$depth,
        pierce = _ref.pierce;

    var root = new _Node2.default(document);
    (0, _dom.getDomNodes)(root, depth, pierce);
    return { root: root };
}

/**
 * Requests that children of the node with given id are returned to the caller in form of setChildNodes
 * events where not only immediate children are retrieved, but all children down to the specified depth.
 *
 * @param  {NodeId} nodeId   Id of the node to get children for.
 * @param  {integer} depth   The maximum depth at which children should be retrieved, defaults to 1.
 *                           Use -1 for the entire subtree or provide an integer larger than 0.
 *                           (experimental)
 * @param  {boolean} pierce  Whether or not iframes and shadow roots should be traversed when returning
 *                           the subtree (default is false). (experimental)
 */
function requestChildNodes(_ref2) {
    var nodeId = _ref2.nodeId,
        _ref2$depth = _ref2.depth,
        depth = _ref2$depth === undefined ? 1 : _ref2$depth,
        pierce = _ref2.pierce;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    (0, _dom.getDomNodes)(root, depth, pierce);
    this.execute('DOM.setChildNodes', {
        parentId: nodeId,
        nodes: root.children
    });

    return {};
}

/**
 * Returns node's HTML markup.
 * @param  {NodeId} nodeId  Id of the node to get markup for.
 * @return {String}         Outer HTML markup.
 */
function getOuterHTML(_ref3) {
    var nodeId = _ref3.nodeId;

    var node = _Node2.default.getNode(nodeId);

    if (!node) {
        return {};
    }

    var outerHTML = node.node.outerHTML;
    return { outerHTML: outerHTML };
}

/**
 * Sets node HTML markup, returns new node id.
 * @param {NodeId} nodeId    Id of the node to set markup for.
 * @param {String} outerHTML Outer HTML markup to set.
 */
function setOuterHTML(_ref4) {
    var nodeId = _ref4.nodeId,
        outerHTML = _ref4.outerHTML;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        return {};
    }

    var elem = root.node;
    var dp = new DOMParser();
    var dom = dp.parseFromString('<div>' + outerHTML + '</div>', 'text/xml');

    /**
     * remove origin node
     */
    this.execute('DOM.childNodeRemoved', {
        nodeId: root.nodeId,
        parentNodeId: elem.parentNode._nodeId
    });

    var lastNodeId = elem.previousElementSibling ? elem.previousElementSibling._nodeId : elem.parentNode._nodeId;
    for (var i = 0; i < dom.documentElement.childNodes.length; i++) {
        var el = dom.documentElement.childNodes[i];

        (0, _dom.setNodeIds)(el);
        var node = new _Node2.default(el);

        elem.parentNode.insertBefore(el.cloneNode(), elem);
        this.execute('DOM.childNodeInserted', {
            node: {
                attributes: node.getFlattenedAttributes(),
                childNodeCount: node.childNodeCount,
                localName: node.localName,
                nodeId: node.nodeId,
                nodeName: node.nodeName,
                nodeType: node.nodeType,
                nodeValue: node.nodeValue
            },
            parentNodeId: elem.parentNode._nodeId,
            previousNodeId: lastNodeId
        });
        lastNodeId = el._nodeId;
    }

    elem.remove();
    return {};
}

/**
 * Removes attribute with given name from an element with given id.
 * @param  {nodeId} nodeId Id of the element to remove attribute from.
 * @param  {String} name   Name of the attribute to remove.
 */
function removeAttribute(_ref5) {
    var nodeId = _ref5.nodeId,
        name = _ref5.name;

    var node = _Node2.default.getNode(nodeId);

    if (!node) {
        return {};
    }

    var elem = node.node;
    elem.removeAttribute(name);
    return {};
}

/**
 * Removes node with given id.
 * @param  {NodeId} nodeId  Id of the node to remove.
 */
function removeNode(_ref6) {
    var nodeId = _ref6.nodeId;

    var node = _Node2.default.getNode(nodeId);

    if (!node) {
        return {};
    }

    var elem = node.node;
    elem.remove();

    return {};
}

/**
 * Hides DOM node highlight.
 */
function hideHighlight() {
    var highlightNode = document.getElementById(HIGHLIGHT_NODE_ID);

    if (highlightNode) {
        highlightNode.remove();
    }

    return {};
}

/**
 * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified.
 *
 * @param  {highlightConfig}        highlightConfig  A descriptor for the highlight appearance.
 * @param  {NodeId}                 nodeId           Identifier of the node to highlight.
 */
function highlightNode(_ref7) {
    var highlightConfig = _ref7.highlightConfig,
        nodeId = _ref7.nodeId,
        objectId = _ref7.objectId;

    var node = void 0;

    if (typeof nodeId === 'number') {
        /**
         * get node by node id
         */
        node = _Node2.default.getNode(nodeId).node;
    } else if (typeof objectId === 'string') {
        /**
         * get node from object store
         */
        node = _ObjectStore2.default.getByObjectId(objectId);
    } else {
        throw new Error('Neither nodeId nor objectId was given to get the node');
    }

    /**
     * remove highlighted node if existing
     */
    hideHighlight();

    /**
     * check if node is visible
     */
    if (!(node.offsetWidth || node.offsetHeight)) {
        return {};
    }

    /**
     * highlight container node
     */
    var container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.position = 'absolute';
    container.style.left = '0px';
    container.style.top = '0px';
    container.id = HIGHLIGHT_NODE_ID;
    container.setAttribute('data-origin', 'debugger');
    document.body.appendChild(container);

    var computedStyle = window.getComputedStyle(node);
    var rect = node.getBoundingClientRect();
    var contentColor = highlightConfig.contentColor,
        paddingColor = highlightConfig.paddingColor,
        marginColor = highlightConfig.marginColor;

    /**
     * node to highlight element
     */

    var elemNode = document.createElement('div');
    elemNode.style.backgroundColor = (0, _dom.getColorFormatted)(contentColor);
    elemNode.style.width = rect.width - parseInt(computedStyle.paddingRight, 10) - parseInt(computedStyle.paddingLeft, 10) + 'px';
    elemNode.style.height = rect.height - parseInt(computedStyle.paddingTop, 10) - parseInt(computedStyle.paddingBottom, 10) + 'px';

    /**
     * node to highlight padding
     */
    var paddingNode = document.createElement('div');
    paddingNode.style.borderColor = (0, _dom.getColorFormatted)(paddingColor);
    paddingNode.style.borderStyle = 'solid';
    paddingNode.style.borderWidth = computedStyle.paddingTop + ' ' + computedStyle.paddingRight + ' ' + computedStyle.paddingLeft + ' ' + computedStyle.paddingBottom;
    paddingNode.style.position = 'absolute';
    paddingNode.style.left = rect.left + window.scrollX + 'px';
    paddingNode.style.top = rect.top + window.scrollY + 'px';
    paddingNode.style.zIndex = 10001;
    paddingNode.appendChild(elemNode);
    container.appendChild(paddingNode);

    /**
     * node to highlight margin
     */
    var marginNode = document.createElement('div');
    var paddingNodeRect = paddingNode.getBoundingClientRect();
    marginNode.style.borderColor = (0, _dom.getColorFormatted)(marginColor);
    marginNode.style.backgroundColor = (0, _dom.getColorFormatted)(marginColor);
    marginNode.style.borderStyle = 'solid';
    marginNode.style.borderWidth = computedStyle.marginTop + ' ' + computedStyle.marginRight + ' ' + computedStyle.marginLeft + ' ' + computedStyle.marginBottom;
    marginNode.style.width = paddingNodeRect.width + 'px';
    marginNode.style.height = paddingNodeRect.height + 'px';

    /**
     * set position styles
     */
    marginNode.style.position = 'absolute';
    marginNode.style.left = rect.left - parseInt(computedStyle.marginLeft, 10) + window.scrollX + 'px';
    marginNode.style.top = rect.top - parseInt(computedStyle.marginTop, 10) + window.scrollY + 'px';
    marginNode.style.zIndex = 10000;
    container.appendChild(marginNode);

    return {};
}

/**
 * Sets node value for a node with given id.
 *
 * @param {NodeId} nodeId  Id of the node to set value for.
 * @param {String} value   New node's value.
 */
function setNodeValue(_ref8) {
    var nodeId = _ref8.nodeId,
        value = _ref8.value;

    var root = _Node2.default.getNode(nodeId);

    /**
     * set characterDataModified flag so the node object doesn't send update event
     * to the frontend again
     */
    root.node._characterDataModified = true;

    root.node.nodeValue = value;
    this.execute('DOM.characterDataModified', { nodeId: nodeId, value: value });
    return {};
}

/**
 * Enables console to refer to the node with given id via $x (see Command Line API for more
 * details $x functions).
 * ToDo: NYI
 *
 * @param  {NodeId} nodeId   DOM node id to be accessible by means of $x command line API.
 */
function setInspectedNode(_ref9) {
    var nodeId = _ref9.nodeId;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        return;
    }

    inspectedNodes.unshift(root.node);

    if (inspectedNodes.length > 4) {
        inspectedNodes.pop();
    }

    /**
     * for some reasons Webpack can't deal with having $ (surrounded by single quotes) in
     * interpreted code that is why we ignore eslint in that line
     */
    inspectedNodes.forEach(function (elem, i) {
        return window["$" + i] = elem;
    }); // eslint-disable-line quotes

    return {};
}

/**
 * Sets attributes on element with given id. This method is useful when user edits some existing attribute
 * value and types in several attribute name/value pairs.
 *
 * @param {NodeId} nodeId  Id of the element to set attributes for.
 * @param {String} name    Text with a number of attributes. Will parse this text using HTML parser.
 * @param {String} text    Attribute name to replace with new attributes derived from text in case text
 *                         parsed successfully.
 */
function setAttributesAsText(_ref10) {
    var nodeId = _ref10.nodeId,
        name = _ref10.name,
        text = _ref10.text;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    /**
     * create a fake element and apply the attribute string to a sub element
     * so that the browser parses it and we can use the JS native API to
     * access their values
     */
    var fakeElem = document.createElement('div');
    var nodeName = root.node.nodeName;
    fakeElem.innerHTML = '<' + nodeName + ' ' + text + ' />';

    if (name.trim()) {
        root.node.removeAttribute(name);
    }

    fakeElem.childNodes[0].attributes.toArray().forEach(function (attr) {
        return root.node.setAttribute(attr.name, attr.value);
    });

    return {};
}

/**
 * Marks last undoable state. (EXPERIMENTAL)
 */
function markUndoableState() {
    return {};
}

/**
 * Requests that the node is sent to the caller given the JavaScript node object reference.
 * All nodes that form the path from the node to the root are also sent to the client as a
 * series of setChildNodes notifications.
 * @return {Runtime.RemoteObjectId}  object id where node is stored
 */
function requestNode(_ref11) {
    var objectId = _ref11.objectId;

    var node = _ObjectStore2.default.getByObjectId(objectId);
    var root = new _Node2.default(node);

    this.execute('DOM.setChildNodes', {
        parentId: root.nodeId,
        nodes: root.children
    });

    return { nodeId: root.nodeId };
}

/**
 * Resolves JavaScript node object for given node id.
 *
 * @param {NodeId} nodeId          Id of the node to resolve.
 * @param {String} objectGroup     Symbolic group name that can be used to release multiple objects.
 * @return {Runtime.RemoteObject}  JavaScript object wrapper for given node.
 */
function resolveNode(_ref12) {
    var nodeId = _ref12.nodeId;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    var nodeProperty = new _PropertyObject.PropertyObject(root.node);
    var className = nodeProperty.className,
        description = nodeProperty.description,
        objectId = nodeProperty.objectId,
        subtype = nodeProperty.subtype,
        type = nodeProperty.type;

    return { object: { className: className, description: description, objectId: objectId, subtype: subtype, type: type } };
}

/**
 * Returns attributes for the specified node.
 * @param  {nodeId}   nodeId  Id of the node to retrieve attibutes for.
 * @return {String[]}         An interleaved array of node attribute names and values.
 */
function getAttributes(_ref13) {
    var nodeId = _ref13.nodeId;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    return { attributes: (0, _common.getAttributes)(root.node.attributes) };
}

/**
 * Events
 */

/**
 * Fired when Document has been totally updated. Node ids are no longer valid.
 */
function documentUpdated() {
    this.execute('DOM.documentUpdated', {});
}

exports.enabled = enabled;
exports.name = name;
exports.HIGHLIGHT_NODE_ID = HIGHLIGHT_NODE_ID;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _common = __webpack_require__(23);

var _dom = __webpack_require__(34);

var _dom2 = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeCount = 0;
var nodes = {};
var elements = {};

var Node = function () {
    function Node(node) {
        (0, _classCallCheck3.default)(this, Node);
        this.nodeId = nodeCount++;

        this.nodeId = node._nodeId;
        this.childNodeCount = node.childNodes.length;
        this.localName = node.localName || '';
        this.nodeName = node.nodeName;
        this.nodeType = node.nodeType;
        this.nodeValue = node.nodeValue || '';

        if (node.attributes) {
            this.attributes = Array.prototype.slice.call(node.attributes).map(function (item) {
                return [item.nodeName, item.nodeValue];
            }).reduce(function (list, item) {
                return list.concat(item);
            }, []);
        }

        if (this.isDocumentNode()) {
            this.documentURL = node.documentURI;
            this.xmlVersion = node.xmlVersion;
            this.baseURL = node.baseURI;
        }

        if (this.isDoctypeDeclaration()) {
            this.publicId = node.publicId;
            this.systemId = node.systemId;
        }

        /**
         * register mutation observer if available
         */
        if (typeof MutationObserver === 'function') {
            this.registerMutationObserver(node);
        }

        nodes[this.nodeId] = this;
        elements[this.nodeId] = node;
    }

    (0, _createClass3.default)(Node, [{
        key: 'handleAttributeChange',
        value: function handleAttributeChange(mutation) {
            var attribute = mutation.target.attributes.getNamedItem(mutation.attributeName);
            var attributeValue = (attribute || {}).value;

            /**
             * attribute modified
             */
            if (mutation.oldValue && attributeValue) {
                return window.remoteDebugger.execute('DOM.attributeModified', {
                    nodeId: this.nodeId,
                    name: mutation.attributeName,
                    value: attributeValue
                });
            }

            /**
             * attribute removed
             */
            if (mutation.oldValue && !attributeValue) {
                window.remoteDebugger.execute('DOM.attributeRemoved', {
                    nodeId: this.nodeId,
                    name: mutation.attributeName
                });
            }

            /**
             * attribute added
             */
            if (!mutation.oldValue) {
                window.remoteDebugger.execute('DOM.attributeModified', {
                    nodeId: this.nodeId,
                    name: mutation.attributeName,
                    value: attributeValue
                });
            }
        }
    }, {
        key: 'handleCharacterDataMutations',
        value: function handleCharacterDataMutations(mutation) {
            /**
             * update text node value
             */
            this.nodeValue = mutation.target.nodeValue || '';

            /**
             * don't resend update event if change was triggered by frontend
             */
            if (mutation.target._characterDataModified) {
                /**
                 * enable update for future changes scripts
                 */
                mutation.target._characterDataModified = false;

                return;
            }

            /**
             * don't send event if text hasn't changed
             */
            if (mutation.oldValue === mutation.target.nodeValue) {
                return;
            }

            /**
             * remove node in devtools frontend
             */
            window.remoteDebugger.execute('DOM.childNodeRemoved', {
                nodeId: this.nodeId,
                parentNodeId: this.parentId
            });

            /**
             * add node in devtools frontend with new value
             */
            window.remoteDebugger.execute('DOM.childNodeInserted', {
                node: {
                    localName: this.localName,
                    nodeId: this.nodeId,
                    nodeName: this.nodeName,
                    nodeType: this.nodeType,
                    nodeValue: this.nodeValue
                },
                parentNodeId: this.parentId,
                previousNodeId: 0
            });
        }
    }, {
        key: 'handleChildListMutations',
        value: function handleChildListMutations(mutation) {
            if (mutation.addedNodes.length) {
                for (var i = 0; i < mutation.addedNodes.length; ++i) {
                    /**
                     * prevent highlighted node from being displayed in the devtools
                     */
                    if (mutation.addedNodes[i].id === _dom.HIGHLIGHT_NODE_ID) {
                        continue;
                    }

                    (0, _dom2.setNodeIds)(mutation.addedNodes[i]);
                    var node = new Node(mutation.addedNodes[i]);

                    /**
                     * in case node is the first child there is no previous element sibling
                     * so use the parent node
                     */
                    var previousNode = node.node.previousElementSibling;
                    if (!previousNode) {
                        previousNode = node.node.parentElement;
                    }

                    window.remoteDebugger.execute('DOM.childNodeInserted', {
                        node: {
                            attributes: node.getFlattenedAttributes(),
                            childNodeCount: node.childNodeCount,
                            localName: node.localName,
                            nodeId: node.nodeId,
                            nodeName: node.nodeName,
                            nodeType: node.nodeType,
                            nodeValue: node.nodeValue
                        },
                        parentNodeId: this.nodeId,
                        previousNodeId: previousNode._nodeId
                    });
                }
            }

            if (mutation.removedNodes.length) {
                for (var _i = 0; _i < mutation.removedNodes.length; ++_i) {
                    /**
                     * event not need to be thrown for highlighted node
                     */
                    if (mutation.removedNodes[_i].id === _dom.HIGHLIGHT_NODE_ID) {
                        continue;
                    }

                    var _node = mutation.removedNodes[_i];
                    window.remoteDebugger.execute('DOM.childNodeRemoved', {
                        nodeId: _node._nodeId,
                        parentNodeId: this.nodeId
                    });
                }
            }
        }
    }, {
        key: 'isDocumentNode',
        value: function isDocumentNode() {
            return this.nodeName === '#document';
        }
    }, {
        key: 'isDoctypeDeclaration',
        value: function isDoctypeDeclaration() {
            return this.nodeName === 'html';
        }
    }, {
        key: 'getFlattenedAttributes',
        value: function getFlattenedAttributes() {
            return (0, _common.getAttributes)(this.node.attributes);
        }
    }, {
        key: 'addChild',
        value: function addChild(node) {
            if (!this.children) {
                this.children = [];
            }

            /**
             * check if node is injected script tag
             */
            if (node.nodeName.toLowerCase() === 'script' && node.getAttribute('data-origin') === 'debugger') {
                return;
            }

            var child = new Node(node);
            child.parentId = this.nodeId;
            this.children.push(child);
            return child;
        }
    }, {
        key: 'registerMutationObserver',
        value: function registerMutationObserver(node) {
            var _this = this;

            var observer = new MutationObserver(function (mutations) {
                var attributeMutations = mutations.filter(function (m) {
                    return m.type === 'attributes';
                });
                var childListMutations = mutations.filter(function (m) {
                    return m.type === 'childList';
                });
                var characterDataMutations = mutations.filter(function (m) {
                    return m.type === 'characterData';
                });
                attributeMutations.forEach(_this.handleAttributeChange.bind(_this));
                childListMutations.forEach(_this.handleChildListMutations.bind(_this));
                characterDataMutations.forEach(_this.handleCharacterDataMutations.bind(_this));
            });

            return observer.observe(node, {
                attributes: true,
                attributeOldValue: true,
                childList: true,
                characterData: true,
                characterDataOldValue: true
            });
        }
    }, {
        key: 'node',
        get: function get() {
            return elements[this.nodeId];
        }
    }], [{
        key: 'getNode',
        value: function getNode(nodeId) {
            return nodes[nodeId];
        }
    }]);
    return Node;
}();

exports.default = Node;
module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(26);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4);
var dPs = __webpack_require__(136);
var enumBugKeys = __webpack_require__(40);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(62).appendChild(iframe);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(28);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(47);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(63);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(32);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(13);
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(27);
var wksExt = __webpack_require__(49);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(37);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = __webpack_require__(17);

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.setPauseOnExceptions = setPauseOnExceptions;
exports.setAsyncCallStackDepth = setAsyncCallStackDepth;
exports.setBlackboxPatterns = setBlackboxPatterns;
exports.getScriptSource = getScriptSource;
exports.scriptParsed = scriptParsed;
exports.scriptFailedToParse = scriptFailedToParse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Methods
 */

/**
 * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions
 * or no exceptions. Initial pause on exceptions state is `none`.
 *
 * @param  {String} state  Pause on exceptions mode. Allowed values: none, uncaught, all.
 */
function setPauseOnExceptions() {
    return {};
}

/**
 * Enables or disables async call stacks tracking.
 *
 * @param  {Integer} maxDepth  Maximum depth of async call stacks. Setting to 0 will effectively
 *                             disable collecting async call stacks (default).
 */
function setAsyncCallStackDepth() {
    return {};
}

/**
 * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing
 * in scripts with url matching one of the patterns. VM will try to leave blackboxed script by
 * performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
 *
 * @param  {String[]} patterns  Array of regexps that will be used to check script url for
 *                              blackbox state.
 */
function setBlackboxPatterns() {
    return {};
}

function getScriptSource(_ref) {
    var scriptId = _ref.scriptId;

    var script = [].slice.apply(document.querySelectorAll('script')).filter(function (node) {
        return node._nodeId && scriptId === node._nodeId.toString();
    })[0];

    if (!script) {
        return { scriptSource: '', error: 'no script found with id ' + scriptId };
    }

    /**
     * return script when inline
     */
    if (script.textContent.length) {
        return { scriptSource: script.textContent };
    }

    /**
     * otherwise return src and let middleware handle it
     */
    return { scriptSource: '', src: script.getAttribute('src') };
}

/**
 * Events
 */

/**
 * Fired when virtual machine parses script. This event is also fired for all known and
 * uncollected scripts upon enabling debugger.
 *
 * @param {String} script  script that was executed (e.g. by console)
 */
function scriptParsed(script) {
    if (!script) {
        var scripts = document.querySelectorAll('script');

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(scripts), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _script = _step.value;

                var hasSourceURL = Boolean(_script.attributes && _script.attributes.src && _script.attributes.src.nodeValue);
                this.execute('Debugger.scriptParsed', {
                    startColumn: 0,
                    startLine: 0,
                    executionContextId: this.executionContextId,
                    executionContextAuxData: {
                        frameId: this.frameId,
                        isDefault: true
                    },
                    hasSourceURL: hasSourceURL,
                    isLiveEdit: false,
                    scriptId: _script._nodeId ? _script._nodeId.toString() : null,
                    sourceMapURL: '',
                    url: hasSourceURL ? _script.attributes.src.nodeValue : ''
                });
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return;
    }

    this.execute('Debugger.scriptParsed', {
        startColumn: 0,
        endColumn: 0,
        startLine: 0,
        endLine: 0,
        executionContextId: this.executionContextId,
        executionContextAuxData: {
            frameId: this.frameId,
            isDefault: true
        },
        scriptId: script.scriptId.toString(),
        hasSourceURL: false,
        isLiveEdit: false,
        sourceMapURL: '',
        url: ''
    });
}

/**
 * Fired when virtual machine fails to parse the script.
 */
function scriptFailedToParse(_ref2) {
    var scriptId = _ref2.scriptId,
        expression = _ref2.expression;

    this.execute('Debugger.scriptParsed', {
        startColumn: 0,
        endColumn: expression.length,
        startLine: 0,
        endLine: 0,
        executionContextId: this.executionContextId,
        executionContextAuxData: {
            frameId: this.frameId,
            isDefault: true
        },
        scriptId: scriptId.toString(),
        hasSourceURL: false,
        isLiveEdit: false,
        sourceMapURL: '',
        url: ''
    });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PropertyObject = exports.SUB_TYPES = undefined;

var _stringify = __webpack_require__(36);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(56);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(106);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(105);

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = __webpack_require__(57);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _ObjectStore = __webpack_require__(16);

var _ObjectStore2 = _interopRequireDefault(_ObjectStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUB_TYPES = exports.SUB_TYPES = ['array', 'null', 'node', 'regexp', 'date', 'map', 'set', 'iterator', 'generator', 'error', 'promise', 'typedarray'];

/**
 * Facade for subtype property
 */

var PropertyObject = exports.PropertyObject = function () {
    function PropertyObject(object) {
        (0, _classCallCheck3.default)(this, PropertyObject);

        var subtype = PropertyObject.getSubType(object);
        var type = typeof object;

        if (type.match(/^(number|string|undefined|boolean)$/) || subtype === 'null') {
            return new PrimitiveObject(object, subtype);
        }

        return PropertyObject.createPropertyInstance(object, subtype);
    }

    (0, _createClass3.default)(PropertyObject, null, [{
        key: 'createPropertyInstance',
        value: function createPropertyInstance(object, subtype) {
            if (subtype === 'array') return new ArrayObject(object, subtype);
            if (subtype === 'null') return new PrimitiveObject(object, subtype);
            if (subtype === 'undefined') return new PrimitiveObject(object, subtype);
            if (subtype === 'node') return new NodeObject(object, subtype);
            if (subtype === 'regexp') return new CompositeObject(object, subtype);
            if (subtype === 'date') return new CompositeObject(object, subtype);
            if (subtype === 'map') return new CompositeObject(object, subtype);
            if (subtype === 'set') return new CompositeObject(object, subtype);
            if (subtype === 'iterator') return new CompositeObject(object, subtype);
            if (subtype === 'generator') return new CompositeObject(object, subtype);
            if (subtype === 'error') return new ErrorObject(object, subtype);
            if (subtype === 'promise') return new PromiseObject(object, subtype);
            if (subtype === 'typedarray') return new TypedarrayObject(object, subtype);
            return new CompositeObject(object);
        }

        /**
         * returns subtype of object
         */

    }, {
        key: 'getSubType',
        value: function getSubType(object) {
            /**
             * null
             */
            if (object === null) {
                return 'null';
            }

            /**
             * undefined
             */
            if (typeof object === 'undefined') {
                return 'undefined';
            }

            /**
             * objects can have cases where constructor is null
             */
            if (!object.constructor) {
                return 'map';
            }

            var constructorName = object.constructor.name;

            /**
             * error
             */
            if (object instanceof Error || constructorName.match(/Error$/)) {
                return 'error';
            }

            /**
             * node
             */
            if (typeof object.nodeType === 'number') {
                return 'node';
            }

            /**
             * iterator
             */
            if (object.iterator) {
                return 'iterator';
            }

            /**
             * generator
             */
            if (constructorName === 'GeneratorFunction') {
                return 'generator';
            }

            /**
             * promise
             */
            if (object instanceof _promise2.default) {
                return 'promise';
            }

            /**
             * array
             */
            if (Array.isArray(object) || typeof object.length === 'number' && object.constructor.name !== 'object') {
                return 'array';
            }

            /**
             * typedarray
             */
            if (constructorName.match(/^Float(\d+)Array$/)) {
                return 'typedarray';
            }

            /**
             * constructorName check
             */
            if (SUB_TYPES.indexOf(constructorName.toLowerCase()) > -1) {
                return constructorName.toLowerCase;
            }
        }
    }]);
    return PropertyObject;
}();

var PrimitiveObject = function () {
    function PrimitiveObject(object, subtype) {
        (0, _classCallCheck3.default)(this, PrimitiveObject);
        this.isPrimitive = true;

        this.object = object;
        this.subtype = subtype || this.subtype;
        this.type = typeof object;
        this.value = this.object;
        this.className = this.object ? this.object.constructor.name : undefined;
    }

    (0, _createClass3.default)(PrimitiveObject, [{
        key: 'get',
        value: function get() {
            var value = this.value,
                subtype = this.subtype,
                type = this.type,
                description = this.description;

            return { value: value, subtype: subtype, type: type, description: description };
        }

        /**
         * for primitives the origin is the actual value except for 'null' and 'undefined'
         */

    }, {
        key: 'description',
        get: function get() {
            return this.object ? this.value.toString() : this.subtype;
        }
    }]);
    return PrimitiveObject;
}();

var CompositeObject = function (_PrimitiveObject) {
    (0, _inherits3.default)(CompositeObject, _PrimitiveObject);

    function CompositeObject(object, subtype) {
        (0, _classCallCheck3.default)(this, CompositeObject);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CompositeObject.__proto__ || (0, _getPrototypeOf2.default)(CompositeObject)).call(this, object, subtype));

        _this.isPrimitive = false;

        var id = _ObjectStore2.default.push(_this.object);
        _this.objectId = (0, _stringify2.default)({ injectedScriptId: 1, id: id });
        return _this;
    }

    (0, _createClass3.default)(CompositeObject, [{
        key: 'get',
        value: function get() {
            var className = this.className,
                description = this.description,
                objectId = this.objectId,
                subtype = this.subtype,
                type = this.type;

            return { className: className, description: description, objectId: objectId, subtype: subtype, type: type };
        }
    }, {
        key: 'description',
        get: function get() {
            return this.object.constructor.name || this.object.toString();
        }
    }]);
    return CompositeObject;
}(PrimitiveObject);

var ArrayObject = function (_CompositeObject) {
    (0, _inherits3.default)(ArrayObject, _CompositeObject);

    function ArrayObject() {
        (0, _classCallCheck3.default)(this, ArrayObject);
        return (0, _possibleConstructorReturn3.default)(this, (ArrayObject.__proto__ || (0, _getPrototypeOf2.default)(ArrayObject)).apply(this, arguments));
    }

    (0, _createClass3.default)(ArrayObject, [{
        key: 'description',
        get: function get() {
            return this.className + '(' + this.object.length + ')';
        }
    }]);
    return ArrayObject;
}(CompositeObject);

var NodeObject = function (_CompositeObject2) {
    (0, _inherits3.default)(NodeObject, _CompositeObject2);

    function NodeObject(object, subtype) {
        (0, _classCallCheck3.default)(this, NodeObject);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (NodeObject.__proto__ || (0, _getPrototypeOf2.default)(NodeObject)).call(this, object, subtype));

        _this3.value = _this3.getValue();
        _this3.className = _this3.object.constructor.name;
        return _this3;
    }

    (0, _createClass3.default)(NodeObject, [{
        key: 'getValue',
        value: function getValue() {
            var value = this.object.nodeName.toLowerCase();

            if (this.object.id) {
                value += '#' + this.object.id;
            }

            if (this.object.className) {
                value += '.' + this.object.className.replace(' ', '.');
            }

            return value;
        }
    }, {
        key: 'description',
        get: function get() {
            return this.object.nodeName.toLowerCase();
        }
    }]);
    return NodeObject;
}(CompositeObject);

var ErrorObject = function (_CompositeObject3) {
    (0, _inherits3.default)(ErrorObject, _CompositeObject3);

    function ErrorObject() {
        var _ref;

        var _temp, _this4, _ret;

        (0, _classCallCheck3.default)(this, ErrorObject);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this4 = (0, _possibleConstructorReturn3.default)(this, (_ref = ErrorObject.__proto__ || (0, _getPrototypeOf2.default)(ErrorObject)).call.apply(_ref, [this].concat(args))), _this4), _this4.className = 'Error', _temp), (0, _possibleConstructorReturn3.default)(_this4, _ret);
    }

    (0, _createClass3.default)(ErrorObject, [{
        key: 'description',
        get: function get() {
            return this.object.stack;
        }
    }]);
    return ErrorObject;
}(CompositeObject);

var PromiseObject = function (_CompositeObject4) {
    (0, _inherits3.default)(PromiseObject, _CompositeObject4);

    function PromiseObject() {
        var _ref2;

        var _temp2, _this5, _ret2;

        (0, _classCallCheck3.default)(this, PromiseObject);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this5 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = PromiseObject.__proto__ || (0, _getPrototypeOf2.default)(PromiseObject)).call.apply(_ref2, [this].concat(args))), _this5), _this5.className = 'Promise', _this5.description = 'Promise', _temp2), (0, _possibleConstructorReturn3.default)(_this5, _ret2);
    }

    return PromiseObject;
}(CompositeObject);

var TypedarrayObject = function (_CompositeObject5) {
    (0, _inherits3.default)(TypedarrayObject, _CompositeObject5);

    function TypedarrayObject() {
        var _ref3;

        var _temp3, _this6, _ret3;

        (0, _classCallCheck3.default)(this, TypedarrayObject);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this6 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = TypedarrayObject.__proto__ || (0, _getPrototypeOf2.default)(TypedarrayObject)).call.apply(_ref3, [this].concat(args))), _this6), _this6.className = 'TypedarrayObject', _this6.description = 'TypedarrayObject', _temp3), (0, _possibleConstructorReturn3.default)(_this6, _ret3);
    }

    return TypedarrayObject;
}(CompositeObject);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(98);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(17);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(103);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(102);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(145);
module.exports = __webpack_require__(0).Array.find;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(19)(function () {
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(77);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(131);
var setToStringTag = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(73);
var ITERATOR = __webpack_require__(1)('iterator');
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
  var $default = $native || getMethod(DEFAULT);
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6);
var gOPN = __webpack_require__(71).f;
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(74);
var hiddenKeys = __webpack_require__(40).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(21);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(6);
var arrayIndexOf = __webpack_require__(123)(false);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');

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
/* 75 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var newPromiseCapability = __webpack_require__(41);

module.exports = function (C, x) {
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(4);
var aFunction = __webpack_require__(26);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(10);
var invoke = __webpack_require__(130);
var html = __webpack_require__(62);
var cel = __webpack_require__(39);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(18)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {



/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = __webpack_require__(97);

var _from2 = _interopRequireDefault(_from);

var _getOwnPropertyDescriptor = __webpack_require__(100);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getOwnPropertyNames = __webpack_require__(55);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

exports.getConsoleArg = getConsoleArg;
exports.getObjectProperties = getObjectProperties;
exports.getError = getError;
exports.getFakeError = getFakeError;
exports.getStacktrace = getStacktrace;
exports.callFn = callFn;

var _ObjectStore = __webpack_require__(16);

var _ObjectStore2 = _interopRequireDefault(_ObjectStore);

var _PropertyObject = __webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * parse console properties properly
 * @param  {*}             arg  any kind of primitive or object
 * @return {RemoteObject}       Mirror object referencing original JavaScript object.
 */
function getConsoleArg(arg) {
    var scriptId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var returnByValue = arguments[2];

    var property = new _PropertyObject.PropertyObject(arg);

    if (property.type === 'undefined') {
        return { type: property.type };
    }

    /**
     * return primitives right away
     */
    if (property.isPrimitive || property.subtype === 'array' && returnByValue) {
        return { type: property.type, value: arg };
    }

    var result = property.get();

    if (property.subtype !== 'node') {
        /**
         * apply preview for raw objects only
         */
        result.preview = {
            description: property.description,
            overflow: false,
            properties: getObjectProperties(property.object),
            type: property.type,
            subtype: property.subtype
        };
    }

    return result;
}

function getObjectProperties(obj) {
    var includeDescriptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return (0, _getOwnPropertyNames2.default)(obj).map(function (propertyName) {
        /**
         * ignore accessor and hide internal properties (_nodeId)
         */
        if (propertyName === 'length' || propertyName === 'constructor' || propertyName === '_nodeId') {
            return;
        }

        var descriptor = (0, _getOwnPropertyDescriptor2.default)(obj, propertyName);
        var property = new _PropertyObject.PropertyObject(descriptor.value);

        /**
         * only return a subset of properties
         */
        if (!includeDescriptors) {
            var result = property.get();
            result.name = propertyName;
            result.value = result.description;
            delete result.description;
            delete result.objectId;
            delete result.className;
            return result;
        }

        return {
            configurable: descriptor.configurable,
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            name: propertyName,
            value: property.get(),
            isOwn: obj.hasOwnProperty(propertyName)
        };
    }).filter(function (prop) {
        return Boolean(prop);
    });
}

/**
 * generates an error object
 * @param  {String} [message='fake']  error message (optional)
 * @return {Object}                   error object
 */
function getError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fake';
    var fakeStack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    try {
        throw new Error(message);
    } catch (err) {
        /**
         * fake stack if none existing
         * TV browser doesn't allow to modify error object (readonly) so we need to
         * fake the error object
         */
        if (!err.stack || fakeStack) {
            return getFakeError(err);
        }

        return err;
    }
}

/**
 * generates a fake error object since we can't modify the stack and eval errors come without
 */
function getFakeError(err) {
    var newError = {
        message: err.message,
        stack: err.constructor.name + ': ' + err.message + '\n\tat <anonymous>:1:1'
    };
    newError.constructor = err.constructor;
    return newError;
}

/**
 * returns stacktrace data for console.log event
 */
function getStacktrace(err) {
    var error = err || getError();

    if (!error) {
        return [];
    }

    var splittedStack = error.stack.split('\n');
    return splittedStack.filter(function (line) {
        /**
         * filter out own functions
         */
        return !line.match(/^__(getStacktrace|fakeConsole)/);
    }).map(function (line) {
        var stackData = line.trim().match(/^(.*@)*(.*):(\d+):(\d+)$/);

        if (!stackData) {
            return null;
        }

        /**
         * ToDo assign _nodeId to each element on the page to get this working
         */
        var url = stackData[2];
        var script = (0, _from2.default)(document.querySelectorAll('script')).filter(function (script) {
            return script.src === url;
        })[0];

        return {
            columnNumber: stackData[4],
            lineNumber: stackData[3],
            scriptId: script ? script._nodeId : 0,
            url: stackData[2],
            functionName: stackData[1] ? stackData[1].slice(0, 1) : ''
        };
    }).filter(function (stackData) {
        return Boolean(stackData);
    });
}

/**
 * executes a given expressions safely and returns its value or error
 * @param  {String} expression  javascript you want to execute
 * @return {Object}             result containing the expression value or error and objectId from store
 */
function callFn(expression) {
    var result = { value: null, error: null, scriptId: null };

    try {
        result.value = eval(expression); // eslint-disable-line no-eval
    } catch (e) {
        result.error = e;
        result.error.wasThrown = true;

        /**
         * trigger scriptFailedToParse event when script can't be parsed
         */
        // scriptFailedToParse.call(this, script)
    } finally {
        result.scriptId = _ObjectStore2.default.push(result.value || result.error);
    }

    return result;
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(36);

var _stringify2 = _interopRequireDefault(_stringify);

var _entries = __webpack_require__(54);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(17);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(58);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = __webpack_require__(25);

var _keys2 = _interopRequireDefault(_keys);

var _domains = __webpack_require__(86);

var _domains2 = _interopRequireDefault(_domains);

var _CSSStore = __webpack_require__(95);

var _CSSStore2 = _interopRequireDefault(_CSSStore);

var _dom = __webpack_require__(24);

var _common = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUPPORTED_DOMAINS = (0, _keys2.default)(_domains2.default);

/**
 * Pure implementation of the Chrome Remote Debugger Protocol (tip-of-tree) in JavaScript
 */

var RemoteDebugger = function () {
    function RemoteDebugger(uuid) {
        var _this = this;

        (0, _classCallCheck3.default)(this, RemoteDebugger);

        this.uuid = uuid;
        this.host = (0, _common.getDriverOrigin)();
        this.domains = {};
        this.requestId = this.getCookie('requestId') || '1.1'; // set to 1.1 in case Network domain is disabled
        this.executionContextId = parseInt(this.requestId.split('.')[0]);
        this.frameId = this.getCookie('frameId') || '1.0'; // set to 1.0 in case Network domain is disabled
        this.socket = window.io(this.host + '/page/' + uuid);
        this.readyStateComplete = false;

        var _navigator = navigator,
            appName = _navigator.appName,
            appCodeName = _navigator.appCodeName,
            appVersion = _navigator.appVersion,
            product = _navigator.product,
            platform = _navigator.platform,
            vendor = _navigator.vendor,
            userAgent = _navigator.userAgent;

        var description = (0, _common.getDescription)();
        var title = (0, _common.getTitle)();
        this.emit('connection', {
            status: 'established',
            supportedDomains: SUPPORTED_DOMAINS,
            info: {
                url: document.location.href,
                description: description,
                title: title,
                frameId: this.frameId,
                metadata: { appName: appName, appCodeName: appCodeName, appVersion: appVersion, product: product, platform: platform, vendor: vendor, userAgent: userAgent }
            }
        });

        var _loop = function _loop(name, domain) {
            _this.domains[name] = domain;
            _this.socket.on(name, function (args) {
                return _this.dispatchEvent(domain, args);
            });
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(_domains2.default)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;

                var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

                var name = _ref2[0];
                var domain = _ref2[1];

                _loop(name, domain);
            }

            /**
             * overwrite console object
             */
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        window.console = _domains2.default.Runtime.overwriteConsole.call(this, window.console);
        this.cssStore = new _CSSStore2.default(this.requestId);
    }

    (0, _createClass3.default)(RemoteDebugger, [{
        key: 'emit',
        value: function emit(event, payload) {
            return this.socket.emit(event, payload);
        }
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(target, args) {
            this.emit('debug', 'received: ' + (0, _stringify2.default)(args).slice(0, 1000));

            var result = void 0;
            var method = target[args.method];

            if (!method) {
                return this.emit('result', {
                    id: args.id,
                    error: 'Method "' + args.method + '" not found'
                });
            }

            try {
                result = method.call(this, args.params, args.id);
            } catch (e) {
                this.emit('debug', { message: e.message, stack: e.stack.slice(0, 1000) });
                return;
            }

            if (!result) {
                this.emit('debug', 'no result for method "' + method.name + '"');
                return;
            }

            this.emit('result', {
                id: args.id,
                result: result,
                _method: args.method,
                _domain: args.domain
            });
        }
    }, {
        key: 'execute',
        value: function execute(method, params) {
            this.emit('result', { method: method, params: params });
        }
    }, {
        key: 'getCookie',
        value: function getCookie(n) {
            var a = ('; ' + document.cookie).match(';\\s*' + n + '=([^;]+)');
            return a ? a[1] : '';
        }
    }, {
        key: 'loadHandler',
        value: function loadHandler() {
            this.readyStateComplete = true;
            this.domains.Runtime.executionContextCreated.call(this);
            this.domains.Debugger.scriptParsed.call(this);
            this.domains.Page.frameStoppedLoading.call(this);
            this.domains.Page.loadEventFired.call(this);
            this.domains.DOM.documentUpdated.call(this);

            /**
             * assign nodeIds to elements
             */
            (0, _dom.setNodeIds)(document);
        }
    }]);
    return RemoteDebugger;
}();

exports.default = RemoteDebugger;
module.exports = exports['default'];

/***/ }),
/* 84 */
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enabled = exports.name = undefined;
exports.getComputedStyleForNode = getComputedStyleForNode;
exports.getPlatformFontsForNode = getPlatformFontsForNode;
exports.getMatchedStylesForNode = getMatchedStylesForNode;
exports.getInlineStylesForNode = getInlineStylesForNode;
exports.getStyleSheetText = getStyleSheetText;
exports.setStyleText = setStyleText;
exports.setStyleTexts = setStyleTexts;
exports.styleSheetRegistered = styleSheetRegistered;

var _Node = __webpack_require__(35);

var _Node2 = _interopRequireDefault(_Node);

var _find = __webpack_require__(60);

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enabled = false;
var name = 'CSS';

/**
 * Returns the computed style for a DOM node identified by nodeId.
 *
 * @param {NodeId} nodeId                   Id of the element to get computed styles from
 * @return {[CSSComputedStyleProperty]}     Computed style for the specified DOM node.
 */
function getComputedStyleForNode(_ref) {
    var nodeId = _ref.nodeId;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    var computedStyle = [];
    var computedStyleOrig = window.getComputedStyle(root.node);
    for (var i = 0; i < computedStyleOrig.length; ++i) {
        computedStyle.push({
            name: computedStyleOrig[i],
            value: computedStyleOrig[computedStyleOrig[i]]
        });
    }

    return { computedStyle: computedStyle };
}

/**
 * Requests information about platform fonts which we used to render child TextNodes in the given node.
 */
function getPlatformFontsForNode(_ref2) {
    var nodeId = _ref2.nodeId;

    /**
     * this is not traceable therefor return always a standard font
     */
    return {
        familyName: 'Arial',
        isCustomFont: false,
        glyphCount: 0
    };
}

/**
 * Returns requested styles for a DOM node identified by nodeId.
 *
 * @param  {nodeId} nodeId  desired node id
 */
function getMatchedStylesForNode(_ref3) {
    var _this = this;

    var nodeId = _ref3.nodeId;

    var _Node$getNode = _Node2.default.getNode(nodeId),
        node = _Node$getNode.node;

    var ruleList = window.getMatchedCSSRules(node);
    var matchedCSSRules = [].slice.call(ruleList || []).map(function (rule) {
        return {
            matchingSelectors: [0],
            rule: _this.cssStore.getRuleByCssText(rule.selectorText, rule.cssText)
        };
    });

    return {
        matchedCSSRules: matchedCSSRules,
        cssKeyframesRules: [],
        pseudoElements: [],
        inherited: [],
        inlineStyle: getInlineStylesForNode.call(this, { nodeId: nodeId }).inlineStyle
    };
}

/**
 * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using
 * DOM attributes) for a DOM node identified by nodeId.
 *
 * @param  {nodeId} nodeId  desired node id
 */
function getInlineStylesForNode(_ref4) {
    var nodeId = _ref4.nodeId;

    var _Node$getNode2 = _Node2.default.getNode(nodeId),
        node = _Node$getNode2.node;

    var cssStyle = void 0;

    if (node._styleSheetId) {
        cssStyle = this.cssStore.get(node._styleSheetId);
    } else {
        cssStyle = this.cssStore.addInlineStyleSheet(node);
    }

    return { inlineStyle: cssStyle.rules.length ? cssStyle.rules[0].style : {} };
}

/**
 * Returns the current textual content and the URL for a stylesheet.
 * @param  {styleSheetId} styleSheetId  id of stylesheet
 * @return {String}                     The stylesheet text
 */
function getStyleSheetText(_ref5) {
    var styleSheetId = _ref5.styleSheetId;

    var styleSheet = this.cssStore.get(styleSheetId);
    return styleSheet.getStyleSheetText();
}

/**
 * Sets the new stylesheet text.
 * @param {StyleSheetId} styleSheetId  if of style style
 * @param {String}       text          changed css style
 */
function setStyleText(_ref6) {
    var styleSheetId = _ref6.styleSheetId,
        range = _ref6.range,
        text = _ref6.text;

    var styleSheet = this.cssStore.get(styleSheetId);
    return styleSheet.setStyleText(range, text);
}

/**
 * Sets the new stylesheet text.
 * @param {Array} edits  list of stylesheet changes
 */
function setStyleTexts(_ref7) {
    var _this2 = this;

    var edits = _ref7.edits;

    var styles = [];

    edits.forEach(function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        styles.push(setStyleText.apply(_this2, args));
    });

    return { styles: styles };
}

function styleSheetRegistered(_ref8) {
    var _this3 = this;

    var cssText = _ref8.cssText,
        url = _ref8.url,
        ownerNode = _ref8.ownerNode;

    /**
     * wait until document ready so `document.styleSheets` is not empty
     */
    if (!this.readyStateComplete) {
        return setTimeout(function () {
            return styleSheetRegistered.call(_this3, { cssText: cssText, url: url });
        }, 100);
    }

    /**
     * check if stylesheet was already registered
     */
    var registeredStyleSheet = this.cssStore.getByUrl(url);
    if (registeredStyleSheet) {
        return this.execute('CSS.styleSheetAdded', { header: registeredStyleSheet.header });
    }

    var cssStyleSheets = [].slice.call(document.styleSheets);
    var styleSheetElement = (0, _find2.default)(cssStyleSheets, function (cssStyleSheet) {
        return cssStyleSheet.href && cssStyleSheet.href.indexOf(url) > -1;
    });

    if (!styleSheetElement) {
        return this.emit('debug', 'Couldn\'t register stylesheet, url not found ' + url);
    }

    var styleSheet = this.cssStore.add({
        href: styleSheetElement.href,
        cssRules: [].slice.call(styleSheetElement.cssRules),
        ownerNode: styleSheetElement.ownerNode,
        cssText: cssText
    });
    this.execute('CSS.styleSheetAdded', { header: styleSheet.header });
}

exports.name = name;
exports.enabled = enabled;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = __webpack_require__(85);

var CSS = _interopRequireWildcard(_css);

var _dom = __webpack_require__(34);

var DOM = _interopRequireWildcard(_dom);

var _debugger = __webpack_require__(51);

var Debugger = _interopRequireWildcard(_debugger);

var _input = __webpack_require__(87);

var Input = _interopRequireWildcard(_input);

var _network = __webpack_require__(88);

var Network = _interopRequireWildcard(_network);

var _overlay = __webpack_require__(89);

var Overlay = _interopRequireWildcard(_overlay);

var _page = __webpack_require__(90);

var Page = _interopRequireWildcard(_page);

var _runtime = __webpack_require__(91);

var Runtime = _interopRequireWildcard(_runtime);

var _target = __webpack_require__(92);

var Target = _interopRequireWildcard(_target);

var _webdriver = __webpack_require__(93);

var Webdriver = _interopRequireWildcard(_webdriver);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    CSS: CSS,
    DOM: DOM,
    Debugger: Debugger,
    Input: Input,
    Network: Network,
    Overlay: Overlay,
    Page: Page,
    Runtime: Runtime,
    Target: Target,
    Webdriver: Webdriver
};
module.exports = exports['default'];

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dispatchKeyEvent = dispatchKeyEvent;

var _BitField = __webpack_require__(94);

var _BitField2 = _interopRequireDefault(_BitField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * helper method to emulate key event on page
 *
 * @param  {Number} keyCode key code to be simulated
 */
function triggerKeyboardEvent(keyCode) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'keydown';
    var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var altKeyArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var ctrlKeyArg = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var metaKeyArg = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var shiftKeyArg = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    var eventObj = document.createEventObject ? document.createEventObject() : document.createEvent('Events');

    if (eventObj.initEvent) {
        eventObj.initEvent(type, bubbles, cancelable);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    eventObj.altKey = altKeyArg;
    eventObj.shiftKey = ctrlKeyArg;
    eventObj.ctrlKey = metaKeyArg;
    eventObj.metaKey = shiftKeyArg;

    document.body.dispatchEvent ? document.body.dispatchEvent(eventObj) : document.body.fireEvent('onkeydown', eventObj);
}

/**
 * Dispatches a key event to the page.
 *
 * @param  {String}   type            Type of the key event. Allowed values: keyDown, keyUp, rawKeyDown, char.
 * @param  {Integer}  modifiers       Bit field representing pressed modifier keys.
 *                                    (Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0))
 * @param  {String}   value           Text as generated by processing a virtual key code with a keyboard layout.
 */
function dispatchKeyEvent(_ref) {
    var type = _ref.type,
        modifiers = _ref.modifiers,
        value = _ref.value;

    var bitModifiers = new _BitField2.default(modifiers);
    var altKeyArg = bitModifiers.get(1);
    var ctrlKeyArg = bitModifiers.get(2);
    var metaKeyArg = bitModifiers.get(4);
    var shiftKeyArg = bitModifiers.get(8);

    var args = [type, 'keydown', true, true, altKeyArg, ctrlKeyArg, metaKeyArg, shiftKeyArg];

    /**
     * simplification for HbbTV supported devices
     */
    if (window.KeyEvent) {
        if (Array.isArray(value)) {
            value = value.join('');
        }

        var key = value.slice(0, 3).toUpperCase() === 'VK_' ? value.toUpperCase() : 'VK_' + value.toUpperCase();
        triggerKeyboardEvent.apply(undefined, [window.KeyEvent[key], type].concat(args));
        return { success: true };
    }

    value.forEach(function (char) {
        return triggerKeyboardEvent.apply(undefined, [char.charCodeAt(0), type].concat(args));
    });
    return { success: true };
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = __webpack_require__(17);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = __webpack_require__(25);

var _keys2 = _interopRequireDefault(_keys);

exports.getCookies = getCookies;
exports.setCookie = setCookie;
exports.deleteCookie = deleteCookie;
exports.clearBrowserCookies = clearBrowserCookies;

var _jsCookie = __webpack_require__(165);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns all browser cookies for the current URL. Depending on the backend support, will return detailed
 * cookie information in the cookies field. (EXPERIMENTAL)
 */
function getCookies(_ref) {
    var urls = _ref.urls;

    var cookies = _jsCookie2.default.get();
    return (0, _keys2.default)(cookies).map(function (name) {
        return { name: name, value: cookies[name] };
    });
}

/**
 * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist. (EXPERIMENTAL)
 * @param {String}         url            The request-URI to associate with the setting of the cookie. This
 *                                        value can affect the default domain and path values of the created cookie.
 * @param {String}         name           The name of the cookie.
 * @param {String}         value          The value of the cookie.
 * @param {String}         domain         If omitted, the cookie becomes a host-only cookie.
 * @param {String}         path           Defaults to the path portion of the url parameter.
 * @param {Boolean}        secure         Defaults ot false.
 * @param {Boolean}        httpOnly       Defaults ot false.
 * @param {CookieSameSite} sameSite       Defaults to browser default behavior.
 * @param {Timestamp}      expirationDate If omitted, the cookie becomes a session cookie.
 *
 * @return {Boolean}                      True if successfully set cookie.
 */
function setCookie(cookie) {
    /**
     * make sure secure and httpOnly are boolean
     */
    cookie.secure = Boolean(cookie.secure);
    cookie.httpOnly = Boolean(cookie.httpOnly);
    cookie.expires = cookie.expirationDate;

    /**
     * set cookie
     */
    var domain = cookie.domain,
        path = cookie.path,
        expires = cookie.expires,
        secure = cookie.secure,
        httpOnly = cookie.httpOnly;

    _jsCookie2.default.set(cookie.name, cookie.value, { domain: domain, path: path, expires: expires, secure: secure, httpOnly: httpOnly });
    return { success: true };
}

/**
 * Deletes browser cookie with given name, domain and path. (EXPERIMENTAL)
 * @param  {String} cookieName Name of the cookie to remove.
 * @param  {String} url        URL to match cooke domain and path.
 *
 * @return {Boolean}           True if successfully removed cookie.
 */
function deleteCookie(_ref2) {
    var cookieName = _ref2.cookieName,
        url = _ref2.url;

    _jsCookie2.default.remove(name);
    return { success: true };
}

/**
 * Clears browser cookies.
 *
 * @return {Boolean}           True if successfully removed cookies.
 */
function clearBrowserCookies() {
    var cookies = _jsCookie2.default.get();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(cookies)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cookie = _step.value;

            _jsCookie2.default.remove(cookie);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return { success: true };
}

exports.default = {
    getAllCookie: getCookies // same functionality
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideHighlight = exports.highlightNode = undefined;
exports.setShowViewportSizeOnResize = setShowViewportSizeOnResize;
exports.setPausedInDebuggerMessage = setPausedInDebuggerMessage;

var _dom = __webpack_require__(34);

/**
 * Paints viewport size upon main frame resize.
 * @param {Boolean} show Whether to paint size or not.
 */
function setShowViewportSizeOnResize(_ref) {
    var show = _ref.show;

    // NYI
    return {};
} /**
   * contains some methods that have been moved to this new domain according to latest
   * devtools developments
   */

function setPausedInDebuggerMessage() {
    // NYI
    return {};
}

exports.highlightNode = _dom.highlightNode;
exports.hideHighlight = _dom.hideHighlight;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reload = reload;
exports.navigate = navigate;
exports.navigateToHistoryEntry = navigateToHistoryEntry;
exports.getResourceTree = getResourceTree;
exports.setAutoAttachToCreatedPages = setAutoAttachToCreatedPages;
exports.frameStoppedLoading = frameStoppedLoading;
exports.loadEventFired = loadEventFired;
var enabled = false;
var name = 'Page';

/**
 * Reloads given page optionally ignoring the cache.
 *
 * @param  {Boolean} ignoreCache If true, browser cache is ignored (as if the user pressed Shift+refresh).
 */
function reload(_ref) {
    var ignoreCache = _ref.ignoreCache;

    window.location.reload(Boolean(ignoreCache));
    return {};
}

/**
 * Navigates current page to the given URL.
 *
 * @param  {String} url  URL to navigate the page to.
 */
function navigate(_ref2) {
    var url = _ref2.url;

    if (typeof url !== 'string') {
        return;
    }

    window.location.assign(url);
    return {};
}

/**
 * Navigates current page to the given history entry.
 *
 * @param  {Integer}  Unique id of the entry to navigate to.
 */
function navigateToHistoryEntry(_ref3) {
    var entryId = _ref3.entryId;

    window.history.go(entryId);
    return {};
}

/**
 * Information about the Frame hierarchy along with their cached resources.
 * @return {Object} frame tree
 */
function getResourceTree() {
    return {
        frameTree: {
            childFrames: [],
            frame: {
                id: this.frameId,
                loaderId: this.frameId + '0', // ToDo add loader
                mimeType: 'text/html',
                securityOrigin: document.location.origin,
                url: document.location.origin
            }
        }
    };
}

/**
 * Controls whether browser will open a new inspector window for connected pages.
 *
 * @param {Boolean} autoAttach  If true, browser will open a new inspector window for
 *                              every page created from this one.
 */
function setAutoAttachToCreatedPages(_ref4) {
    var autoAttach = _ref4.autoAttach;

    return {};
}

/**
 * Events
 */

/**
 * Fired when frame has stopped loading.
 */
function frameStoppedLoading() {
    this.execute('Page.frameStoppedLoading', { frameId: this.frameId });
}

function loadEventFired() {
    this.execute('Page.loadEventFired', { timestamp: 649314.52695 });
}

exports.name = name;
exports.enabled = enabled;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scripts = undefined;

var _stringify = __webpack_require__(36);

var _stringify2 = _interopRequireDefault(_stringify);

var _getOwnPropertyNames = __webpack_require__(55);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getPrototypeOf = __webpack_require__(56);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _keys = __webpack_require__(25);

var _keys2 = _interopRequireDefault(_keys);

exports.overwriteConsole = overwriteConsole;
exports.runIfWaitingForDebugger = runIfWaitingForDebugger;
exports.compileScript = compileScript;
exports.evaluate = evaluate;
exports.awaitPromise = awaitPromise;
exports.callFunctionOn = callFunctionOn;
exports.releaseObjectGroup = releaseObjectGroup;
exports.getProperties = getProperties;
exports.releaseObject = releaseObject;
exports.executionContextCreated = executionContextCreated;

var _debugger = __webpack_require__(51);

var _ObjectStore = __webpack_require__(16);

var _ObjectStore2 = _interopRequireDefault(_ObjectStore);

var _runtime = __webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scripts = exports.scripts = [];

/**
 * internal methods
 */

/**
 * overwrite console
 */
function overwriteConsole(console) {
    var _this = this;

    var consoleMethods = (0, _keys2.default)((0, _getPrototypeOf2.default)(console));

    /**
     * try different way to grab console methods
     * (more supported by newer browser)
     */
    if (consoleMethods.length === 0) {
        consoleMethods = (0, _getOwnPropertyNames2.default)(console);
    }

    /**
     * if no methods were found return original object instead of null
     */
    if (consoleMethods.length === 0) {
        return console;
    }

    return consoleMethods.reduce(function (con, type) {
        if (typeof console[type] !== 'function') {
            con[type] = console[type];
            return con;
        }

        var origFn = console[type].bind(console);
        var self = _this;
        con[type] = function __fakeConsole() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            self.execute('Runtime.consoleAPICalled', {
                args: args.map(_runtime.getConsoleArg),
                executionContext: self.executionContextId,
                stackTrace: { callFrames: (0, _runtime.getStacktrace)() },
                timestamp: new Date().getTime(),
                type: type
            });
            origFn.apply(self, args);
        };
        return con;
    }, {});
}

/**
 * Methods
 */

/**
 * Tells inspected instance to run if it was waiting for debugger to attach.
 */
function runIfWaitingForDebugger() {
    return {}; // NYI
}

/**
 * Compiles expression.
 * @param  {String}           expression Expression to compile.
 * @param  {*}                context    scope to call expression on
 * @return {ScriptId}                    Id of the script.
 * @return {ExceptionDetails}            Exception details
 */
function compileScript(_ref) {
    var expression = _ref.expression;
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

    var _callFn$call = _runtime.callFn.call(context, expression),
        error = _callFn$call.error,
        scriptId = _callFn$call.scriptId;

    if (error && error.wasThrown) {
        var exceptionDetails = {
            columnNumber: 0,
            exception: (0, _runtime.getConsoleArg)(error, scriptId),
            exceptionId: scriptId,
            lineNumber: 0,
            scriptId: scriptId.toString(),
            text: 'Uncaught'
        };
        return { exceptionDetails: exceptionDetails };
    }

    _debugger.scriptParsed.call(this, { scriptId: scriptId });
    return { scriptId: scriptId.toString() };
}

/**
 * Evaluates expression on global object.
 *
 * @param  {Boolean}            awaitPromise          Whether execution should wait for promise to be
 *                                                    resolved. If the result of evaluation is not a
 *                                                    Promise, it's considered to be an error.
 * @param  {ExecutionContextId} contextId             Specifies in which execution context to perform
 *                                                    evaluation. If the parameter is omitted the
 *                                                    evaluation will be performed in the context of
 *                                                    the inspected page.
 * @param  {String}             expression            Expression to evaluate.
 * @param  {Boolean}            generatePreview       Whether preview should be generated for the result.
 * @param  {Boolean}            includeCommandLineAPI Determines whether Command Line API should be
 *                                                    available during the evaluation.
 * @param  {String}             objectGroup           Symbolic group name that can be used to release
 *                                                    multiple objects.
 * @param  {Boolean}            returnByValue         Whether the result is expected to be a JSON object
 *                                                    that should be sent by value.
 * @param  {Boolean}            silent                In silent mode exceptions thrown during evaluation
 *                                                    are not reported and do not pause execution.
 *                                                    Overrides setPauseOnException state.
 * @param  {Boolean}            userGesture           Whether execution should be treated as initiated
 *                                                    by user in the UI.
 * @return {RemoteObject|ExceptionDetails}                       Evauluation result or exception details
 */
function evaluate(_ref2) {
    var awaitPromise = _ref2.awaitPromise,
        contextId = _ref2.contextId,
        expression = _ref2.expression,
        generatePreview = _ref2.generatePreview,
        includeCommandLineAPI = _ref2.includeCommandLineAPI,
        objectGroup = _ref2.objectGroup,
        returnByValue = _ref2.returnByValue,
        silent = _ref2.silent,
        userGesture = _ref2.userGesture;

    /**
     * evaluate is only supported for console executions
     */
    if (['console', 'completion'].indexOf(objectGroup) === -1) {
        return {};
    }

    /**
     * If a variable gets assigned no compileScript method is triggered but `generatePreview`
     * will be passed into evaluate with true.
     * Also in case when `objectGroup` is set to completion we need to call compileScript
     * to return the result of the pass in function to get the preview for the scope.
     */
    if (generatePreview || objectGroup === 'completion') {
        compileScript.call(this, { expression: expression });
    }

    var result = _ObjectStore2.default.getLastObject();
    var scriptId = _ObjectStore2.default.getLastScriptId();

    if (result instanceof Error && result.wasThrown) {
        var newError = (0, _runtime.getFakeError)(result);
        var errorResult = (0, _runtime.getConsoleArg)(newError, scriptId, returnByValue);

        return {
            result: errorResult,
            exceptionDetails: {
                columnNumber: 0,
                lineNumber: 0,
                scriptId: scriptId.toString(),
                exception: errorResult,
                exceptionId: scriptId,
                stackTrace: { callFrames: (0, _runtime.getStacktrace)(newError) },
                text: newError.constructor.name
            }
        };
    }

    if (objectGroup === 'completion' && !returnByValue) {
        var constructorName = result && result.constructor ? result.constructor.name : undefined;
        return {
            result: {
                className: constructorName,
                description: constructorName,
                objectId: (0, _stringify2.default)({ injectedScriptId: 1, id: scriptId }),
                type: typeof result
            }
        };
    }

    /**
     * in case evaluate throws an error or returns one we need to fake the stack
     * in order to not send debugger stacktraces
     */
    if (result instanceof Error) {
        return { result: (0, _runtime.getConsoleArg)((0, _runtime.getFakeError)(result), scriptId, returnByValue) };
    }

    return { result: (0, _runtime.getConsoleArg)(result, scriptId, returnByValue) };
}

function awaitPromise(_ref3, id) {
    var _this2 = this;

    var promiseObjectId = _ref3.promiseObjectId,
        returnByValue = _ref3.returnByValue,
        generatePreview = _ref3.generatePreview;

    var promise = _ObjectStore2.default.getByObjectId(promiseObjectId);

    if (typeof promise.then !== 'function') {
        var err = new Error('RemoteObject is not a promise');
        var errorResult = (0, _runtime.getConsoleArg)(err, null, returnByValue);
        return { result: errorResult };
    }

    promise.then(function (payload) {
        var result = { result: (0, _runtime.getConsoleArg)(payload, promiseObjectId, returnByValue) };
        _this2.emit('result', { id: id, result: result });
    }, function (e) {
        var errorResult = (0, _runtime.getConsoleArg)(e, null, returnByValue);
        _this2.emit('result', {
            id: id,
            result: {
                result: errorResult,
                exceptionDetails: {
                    columnNumber: 0,
                    lineNumber: 0,
                    scriptId: promiseObjectId,
                    exception: errorResult,
                    exceptionId: promiseObjectId,
                    stackTrace: { callFrames: (0, _runtime.getStacktrace)(e) },
                    text: e.constructor.name
                }
            }
        });
    });
}

/**
 * Calls function with given declaration on the given object. Object group of the result
 * is inherited from the target object.
 *
 * @param  {CallArgument[]}  arguments            Call arguments. All call arguments must belong
 *                                                to the same JavaScript world as the target object.
 * @param  {String}          functionDeclaration  Declaration of the function to call.
 * @return {RemoteObject}                         evelalutaion result
 * @return {ExceptionDetails}                     exception details
 */
function callFunctionOn(_ref4) {
    var args = _ref4.arguments,
        functionDeclaration = _ref4.functionDeclaration,
        objectId = _ref4.objectId;

    var scope = _ObjectStore2.default.getByObjectId(objectId);

    compileScript.call(this, {
        expression: '(' + functionDeclaration + ').apply(this)'
    }, scope);

    var result = _ObjectStore2.default.getLastObject();
    var scriptId = _ObjectStore2.default.getLastScriptId();

    if (result instanceof Error) {
        return {
            exceptionDetails: {
                columnNumber: 0,
                lineNumber: 0,
                scriptId: scriptId.toString(),
                exception: result,
                exceptionId: scriptId,
                stackTrace: { callFrames: (0, _runtime.getStacktrace)(result) },
                text: result.constructor.name
            }
        };
    }

    return { result: {
            type: typeof result,
            value: result
        } };
}

/**
 * Releases all remote objects that belong to a given group.
 *
 * @param  {String} objectGroup  Symbolic object group name.
 */
function releaseObjectGroup(_ref5) {
    var objectGroup = _ref5.objectGroup;

    return {};
}

/**
 * Returns properties of a given object. Object group of the result is inherited from the
 * target object.
 *
 * @param  {RemoteObjectId} objectId                Identifier of the object to return properties for.
 * @param  {Boolean}        ownProperties           If true, returns properties belonging only to the
 *                                                 element itself, not to its prototype chain.
 * @param  {Boolean}        accessorPropertiesOnly  If true, returns accessor properties (with
 *                                                 getter/setter) only; internal properties are not
 *                                                 returned either.
 * @param  {Boolean}        generatePreview        Whether preview should be generated for the results.
 *
 * @return {RemoteObject}      evelalutaion result
 * @return {ExceptionDetails}  exception details
 */
function getProperties(_ref6) {
    var accessorPropertiesOnly = _ref6.accessorPropertiesOnly,
        objectId = _ref6.objectId;

    /**
     * not able to detect accessors via JS yet
     */
    if (accessorPropertiesOnly) {
        return { result: [] };
    }

    var result = _ObjectStore2.default.getByObjectId(objectId);

    if (!result) {
        return { result: [] };
    }

    return { result: (0, _runtime.getObjectProperties)(result, true) };
}

/**
 * Releases remote object with given id.
 *
 * @param {RemoteObjectId} objectId  Identifier of the object to release.
 */
function releaseObject(_ref7) {
    var objectId = _ref7.objectId;

    return {}; // NYI
}

/**
 * Events
 */

/**
 * Issued when new execution context is created (e.g. when page load event gets triggered).
 *
 * @return {ExecutionContextDescription} A newly created execution contex.
 */
function executionContextCreated() {
    this.execute('Runtime.executionContextCreated', {
        context: {
            auxData: {
                frameId: this.frameId,
                isDefault: true
            },
            id: this.executionContextId,
            name: document.title,
            origin: window.location.origin
        }
    });
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRemoteLocations = setRemoteLocations;
exports.setDiscoverTargets = setDiscoverTargets;
exports.setAutoAttach = setAutoAttach;
/**
 * Methods
 */

/**
 * Enables target discovery for the specified locations, when setDiscoverTargets was
 * set to true.
 *
 * @param {RemoteLocation[]} locations  List of remote locations.
 */
function setRemoteLocations() {
  return {};
}

/**
 * Controls whether to discover available targets and notify via
 * targetCreated/targetDestroyed events.
 *
 * @param {Boolean} discover  Whether to discover available targets.
 */
function setDiscoverTargets() {
  return {};
}

/**
 * Controls whether to automatically attach to new targets which are considered to be related
 * to this one. When turned on, attaches to all existing related targets as well. When turned
 * off, automatically detaches from all currently attached targets.
 *
 * @param {Boolean} autoAttach              Whether to auto-attach to related targets.
 * @param {Boolean} waitForDebuggerOnStart  Whether to pause new targets when attaching to them. Use
 *                                          Runtime.runIfWaitingForDebugger to run paused targets.
 */
function setAutoAttach(_ref) {
  var autoAttach = _ref.autoAttach,
      waitForDebuggerOnStart = _ref.waitForDebuggerOnStart;

  return {};
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(104);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.findElement = findElement;
exports.findElements = findElements;
exports.findElementFromElement = findElementFromElement;
exports.findElementsFromElement = findElementsFromElement;
exports.transformElementObject = transformElementObject;
exports.getText = getText;
exports.getElementRect = getElementRect;
exports.getElementProperty = getElementProperty;
exports.title = title;

var _Node = __webpack_require__(35);

var _Node2 = _interopRequireDefault(_Node);

var _ObjectStore = __webpack_require__(16);

var _ObjectStore2 = _interopRequireDefault(_ObjectStore);

var _common = __webpack_require__(23);

var _dom = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var W3C_ELEMENT_ID = 'element-6066-11e4-a52e-4f735466cecf';
var elementCache = [];

/**
 * Helper
 */

/**
* find elements by css selector
* @param  {String} selector   css selector
* @param  {HTMLElement} root  context node
* @return {HTMLElement[]}     list if elements matching xpath
*/
function findByCssSelector(selector, root) {
    return root.querySelectorAll(selector);
}

/**
* find element by xpath
* @param  {String} selector   xpath selector
* @param  {HTMLElement} root  context node
* @return {HTMLElement[]}     list of elements matching xpath
*/
function findByXPath(selector, root) {
    var result = document.evaluate(selector, root, null, 0, null);
    var elements = [];

    var value = result.iterateNext();
    while (value) {
        elements.push(value);
        value = result.iterateNext();
    }

    return elements;
}

function formatElements(using, value, element) {
    /**
     * check if element is already in cache
     */
    var cachedElement = elementCache.filter(function (e) {
        return e.element === element;
    })[0];
    if (cachedElement) {
        return cachedElement;
    }

    /**
     * make sure element has nodeId
     */
    if (!element._nodeId) {
        (0, _dom.setNodeIds)(element);
    }

    /**
     * make sure node is available in node store
     */
    var node = _Node2.default.getNode(element._nodeId);
    if (!node) {
        node = new _Node2.default(element);
    }

    return {
        uuid: node.nodeId, // ToDo have check if nodeId exists
        using: using,
        value: value,
        element: element
    };
}

function find(_ref, fromElement) {
    var using = _ref.using,
        value = _ref.value;

    var root = fromElement instanceof HTMLElement ? fromElement : document;
    var elements;

    switch (using) {
        case 'id':
            elements = findByCssSelector('#' + value, root);
            break;
        case 'css selector':
            elements = findByCssSelector(value, root);
            break;
        case 'link text':
            elements = findByXPath('//a[text()[normalize-space()]="' + value + '"]', root);
            break;
        case 'partial link text':
            elements = findByXPath('//a[contains(text()[normalize-space()],"' + value + '")]', root);
            break;
        case 'xpath':
            elements = findByXPath(value, root);
    }

    var result = [].slice.call(elements)
    /**
     * format
     */
    .map(function (element) {
        return formatElements(using, value, element);
    })
    /**
     * don't append empty (filtered) entries
     */
    .filter(function (e) {
        return Boolean(e);
    });

    /**
     * cache element
     */
    elementCache = elementCache.concat(result);
    return result.map(function (result) {
        return (0, _defineProperty3.default)({}, W3C_ELEMENT_ID, result.uuid);
    });
}

/**
 * returns cached HTMLElement
 * @param  {String} uuid  id of cached element
 * @return {HTMLElement}  cached element
 */
function get(uuid) {
    var element = elementCache.filter(function (e) {
        return e.uuid === uuid;
    })[0];
    return element ? element.element : undefined;
}

/**
 * methods
 */

/**
 * The Find Element command is used to find an element in the current browsing context
 * that can be used for future commands.
 *
 * @param {String}  using  selector strategy
 * @param {Srting}  value  selector
 * @return {Object}        element
 */
function findElement(_ref3) {
    var using = _ref3.using,
        value = _ref3.value;

    var element = find({ using: using, value: value })[0];

    if (!element) {
        return { error: 'NoSuchElementError' };
    }

    return element;
}

/**
 * The Find Elements command is used to find elements in the current browsing context
 * that can be used for future commands.
 *
 * @param {String}  using  selector strategy
 * @param {Srting}  value  selector
 * @return {Object[]}      elements
 */
function findElements(_ref4) {
    var using = _ref4.using,
        value = _ref4.value;

    return find({ using: using, value: value });
}

/**
 * The Find Element From Element command is used to find an element from a web element
 * in the current browsing context that can be used for future commands.
 *
 * @param  {String} elementId  element uuid
 * @param  {String} using      selector strategy
 * @param  {Srting} value      selector
 * @return {Object}            element
 */
function findElementFromElement(_ref5) {
    var elementId = _ref5.elementId,
        using = _ref5.using,
        value = _ref5.value;

    var nodeContext = get(elementId);
    return find({ using: using, value: value }, nodeContext)[0];
}

/**
 * The Find Elements From Element command is used to find elements from a web element
 * in the current browsing context that can be used for future commands.
 *
 * @param  {String} elementId  element uuid
 * @param  {String} using      selector strategy
 * @param  {Srting} value      selector
 * @return {Object}            elements
 */
function findElementsFromElement(_ref6) {
    var elementId = _ref6.elementId,
        using = _ref6.using,
        value = _ref6.value;

    var nodeContext = get(elementId);
    return find({ using: using, value: value }, nodeContext);
}

/**
 * Transforms an object to an element result (usually executed when user accesses and
 * element via execute script command)
 *
 * @param  {String} objectId  the object id returned by Runtime.evaluate
 * @param  {String} value     function that was executed
 * @return {Object}           element
 */
function transformElementObject(_ref7) {
    var objectId = _ref7.objectId;

    var element = _ObjectStore2.default.getByObjectId(objectId);
    var result = formatElements('script', null, element);
    elementCache = elementCache.concat(result);

    return (0, _defineProperty3.default)({}, W3C_ELEMENT_ID, result.uuid);
}

/**
 * The Get Element Text command intends to return an element’s text “as rendered”.
 * This is approximately equivalent to calling element.innerText. An element’s rendered
 * text is also used for locating a elements by their link text and partial link text.
 *
 * @param  {NodeId} nodeId  node to get text content from
 * @return {String}         text content
 */
function getText(_ref9) {
    var nodeId = _ref9.nodeId;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    return { text: root.node.innerText };
}

/**
 * The Get Element Rect command returns the dimensions and coordinates of the given
 * web element.
 *
 * @param  {NodeId} nodeId  node to get text content from
 * @return {Object}         object with x, y, width and height properties
 */
function getElementRect(_ref10) {
    var nodeId = _ref10.nodeId;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    var rect = root.node.getBoundingClientRect();

    /**
     * The returned value is a dictionary with the following members:
     */
    return {
        /**
         * X axis position of the top-left corner of the web element relative to
         * the current browsing context’s document element in CSS reference pixels.
         * @type {Number}
         */
        x: rect.left,
        /**
         * Y axis position of the top-left corner of the web element relative to
         * the current browsing context’s document element in CSS reference pixels.
         * @type {Number}
         */
        y: rect.top,
        /**
         * Height of the web element’s bounding rectangle in CSS reference pixels.
         * @type {Number}
         */
        width: rect.width,
        /**
         * Width of the web element’s bounding rectangle in CSS reference pixels.
         * @type {Number}
         */
        height: rect.height
    };
}

/**
 * The Get Element Property command will return the result of getting a property of an element.
 *
 * @param  {NodeId} nodeId  node to get property from
 * @return {String}         property value
 */
function getElementProperty(_ref11) {
    var nodeId = _ref11.nodeId,
        property = _ref11.property;

    var root = _Node2.default.getNode(nodeId);

    if (!root) {
        throw new Error('Couldn\'t find node with nodeId ' + nodeId);
    }

    return { value: root.node[property] };
}

function title() {
    return { value: (0, _common.getTitle)() };
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BitField = function () {
    function BitField(value) {
        (0, _classCallCheck3.default)(this, BitField);

        this.values = [value];
    }

    (0, _createClass3.default)(BitField, [{
        key: "get",
        value: function get(i) {
            var index = i / 32 | 0; // | 0 converts to an int. Math.floor works too.
            var bit = i % 32;
            return (this.values[index] & 1 << bit) !== 0;
        }
    }, {
        key: "set",
        value: function set(i) {
            var index = i / 32 | 0;
            var bit = i % 32;
            this.values[index] |= 1 << bit;
        }
    }, {
        key: "unset",
        value: function unset(i) {
            var index = i / 32 | 0;
            var bit = i % 32;
            this.values[index] &= ~(1 << bit);
        }
    }]);
    return BitField;
}();

exports.default = BitField;
module.exports = exports["default"];

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _entries = __webpack_require__(54);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(17);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(58);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = __webpack_require__(25);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _find = __webpack_require__(60);

var _find2 = _interopRequireDefault(_find);

var _StyleSheet = __webpack_require__(96);

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSSStore = function () {
    function CSSStore(requestId) {
        (0, _classCallCheck3.default)(this, CSSStore);

        this.requestId = requestId;
        this.styleSheets = {};
    }

    (0, _createClass3.default)(CSSStore, [{
        key: 'add',
        value: function add(cssStyleSheet) {
            var id = this.requestId.split('.');
            id = id[0] + '.' + (parseInt(id[1]) + ((0, _keys2.default)(this.styleSheets).length + 1) * 10);
            this.styleSheets[id] = new _StyleSheet2.default(id, cssStyleSheet);
            cssStyleSheet.ownerNode._styleSheetId = id;
            return this.styleSheets[id];
        }
    }, {
        key: 'addInlineStyleSheet',
        value: function addInlineStyleSheet(node) {
            var style = node.getAttribute('style') || '';
            var cssText = node.tagName.toLowerCase() + ' { ' + style + ' }';

            /**
             * add inline css to store
             */
            return this.add({
                ownerNode: node,
                cssRules: style.length ? [{
                    cssText: cssText,
                    selectorText: node.tagName.toLowerCase(),
                    type: 1
                }] : [],
                cssText: cssText
            });
        }
    }, {
        key: 'get',
        value: function get(styleSheetId) {
            var styleSheet = this.styleSheets[styleSheetId];

            if (!styleSheet) {
                throw new Error('Can\'t find StyleSheet model with id ' + styleSheetId);
            }

            return styleSheet;
        }

        /**
         * find registered stylesheet by url
         * @param  {String} url  url of stylesheet
         * @return {StyleSheet}  stylesheet object if found otherwise null
         */

    }, {
        key: 'getByUrl',
        value: function getByUrl(url) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(this.styleSheets)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;

                    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

                    var styleSheet = _ref2[1];

                    if (styleSheet.header.sourceURL.indexOf(url) === -1) {
                        continue;
                    }

                    return styleSheet;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }

        /**
         * more computing but low lever support for getting a stylesheet based on a CSS rule
         */

    }, {
        key: 'getRuleByCssText',
        value: function getRuleByCssText(selectorText, cssText) {
            var _this = this;

            var rule = void 0;

            /**
             * try to find rule with same selector and text in one of the
             * registered stylesheets
             */

            var _loop = function _loop(id) {
                /**
                 * there are two ways to find the rule of given css text:
                 * 1. generate a css text based on the css properties of all css rules and
                 *    compare with given css text (without its selectors, selector check
                 *    happens seperately)
                 * 2. compare parsed css text (from document.stylesheets) with given css text
                 */
                rule = (0, _find2.default)(_this.styleSheets[id].rules, function (rule, i) {
                    var ruleCssText = _StyleSheet2.default.sanitizeCssUnits(cssText.slice(cssText.indexOf('{') + 1, cssText.lastIndexOf('}')).trim());
                    var expectedRuleCssText = _StyleSheet2.default.sanitizeCssUnits(rule.style.cssProperties.map(function (prop) {
                        return prop.text;
                    }).join('; ') + ';');

                    var matchesRawCssText = expectedRuleCssText === ruleCssText && rule.selectorList.text === selectorText;
                    var matchesParsedCssText = _this.styleSheets[id].parsedCssRules[i] === cssText;
                    return matchesParsedCssText || matchesRawCssText;
                });

                if (rule) {
                    return 'break';
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(this.styleSheets)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var id = _step2.value;

                    var _ret = _loop(id);

                    if (_ret === 'break') break;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (!rule) {
                window.remoteDebugger.emit('debug', 'Couldn\'t find stylesheet with css text: ' + cssText);
            }

            return rule;
        }
    }]);
    return CSSStore;
}();

exports.default = CSSStore;
module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _parse = __webpack_require__(162);

var _parse2 = _interopRequireDefault(_parse);

var _lodash = __webpack_require__(166);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleSheet = function () {
    function StyleSheet(id, styleSheet) {
        var _this = this;

        (0, _classCallCheck3.default)(this, StyleSheet);

        this.media = []; // ToDo: figure out media usage
        this.origin = styleSheet.origin || 'regular';
        this.styleSheetId = id;
        this.cssText = styleSheet.cssText;
        this.ownerNode = styleSheet.ownerNode;
        this.parsedCssRules = styleSheet.cssRules.map(function (rule) {
            return rule.cssText;
        });

        this.header = {
            disabled: false,
            frameId: window.remoteDebugger.frameId,
            hasSourceURL: Boolean(styleSheet.href),
            isInline: styleSheet.ownerNode.tagName.toLowerCase() === 'style',
            origin: 'regular',
            ownerNode: styleSheet.ownerNode._nodeId,
            sourceURL: styleSheet.href,
            startColumn: 0,
            startLine: 0,
            styleSheetId: this.styleSheetId,
            title: ''
        };

        var cssTextLines = this.cssText.split('\n');
        this.rules = (0, _parse2.default)(this.cssText).stylesheet.rules.filter(function (rule) {
            return rule.type === 'rule';
        }).map(function (rule) {
            var rulePos = rule.position;
            var start = rule.declarations.length ? (0, _lodash2.default)(rule.declarations).position.start : 0;
            var lines = cssTextLines.slice(rulePos.start.line - 1, rulePos.end.line);
            var cssText = '';

            if (lines.length === 0) {
                cssText = cssTextLines[start.line - 1];
            } else {
                var linesJoined = lines.join('\n');
                cssText = linesJoined.slice(linesJoined.indexOf('{') + 1, linesJoined.indexOf('}'));
            }

            var cssProperties = StyleSheet.getCssProperties(rule, cssTextLines);
            var range = cssProperties.length ? StyleSheet.getRange(rulePos.start.line, rulePos.end.line - 1, rulePos.start.column, rulePos.end.column - 2) : StyleSheet.getRange(0, 0, 0, 0);

            return {
                media: _this.media,
                origin: _this.origin,
                styleSheetId: _this.styleSheetId,
                selectorList: {
                    text: rule.selectors.join(', '),
                    selectors: rule.selectors.map(function (selector, i) {
                        return {
                            text: selector,
                            range: StyleSheet.getRange(rulePos.start.line + i - 1, rulePos.start.line + i - 1, 0, selector.length)
                        };
                    })
                },
                style: {
                    cssProperties: cssProperties,
                    cssText: cssText,
                    range: range,
                    shorthandEntries: [],
                    styleSheetId: _this.styleSheetId
                }
            };
        });
    }

    (0, _createClass3.default)(StyleSheet, [{
        key: 'getStyleSheetText',
        value: function getStyleSheetText() {
            /**
             * return style content if inline
             */
            if (this.ownerNode.nodeName.toLowerCase() === 'style') {
                return { text: this.styleSheet.ownerNode.textContent };
            }

            /**
             * generate stylesheet text based of css rules
             */
            return { text: this.cssText };
        }
    }, {
        key: 'setStyleText',
        value: function setStyleText(range, text) {
            // const rule = this.cssRules[range.startColumn]
            //
            // if (!rule) {
            //     throw new Error(`Can't find rule for column ${range.startColumn}`)
            // }
            //
            // rule.cssText = text
            // return {
            //     cssProperties: [],
            //     cssText: text,
            //     shorthandEntries: [],
            //     styleSheetId: this.styleSheetId
            // }
        }
    }], [{
        key: 'getCssProperties',
        value: function getCssProperties(rule, cssTextLines) {
            return rule.declarations.filter(function (declaration) {
                return declaration.type === 'declaration';
            }).map(function (declaration) {
                var declarationPos = declaration.position;
                var declarationLine = cssTextLines[declarationPos.start.line - 1];
                var text = declarationLine.slice(declarationPos.start.column - 1, declarationPos.end.column - 1);

                return {
                    disabled: false,
                    implicit: false,
                    important: Boolean(text.match(/!important/)),
                    name: declaration.property,
                    range: StyleSheet.getRange(declarationPos.start.line - 1, declarationPos.end.line - 1, declarationPos.start.column - 1, declarationPos.start.column + text.length),
                    text: text,
                    value: declaration.value
                };
            });
        }
    }, {
        key: 'getRange',
        value: function getRange() {
            var startLine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var endLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var startColumn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var endColumn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            return { startLine: startLine, endLine: endLine, endColumn: endColumn, startColumn: startColumn };
        }
    }, {
        key: 'sanitizeCssUnits',
        value: function sanitizeCssUnits(cssText) {
            return cssText.replace(/(\s|:|,)0(%|cm|em|ex|in|mm|pc|pt|px|vh|vw|vmin|vmax)/gi, '$10');
        }
    }]);
    return StyleSheet;
}();

exports.default = StyleSheet;
module.exports = exports['default'];

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(53);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(101);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(99);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(59);

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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(59);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(146);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(22);
module.exports = __webpack_require__(143);


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(22);
module.exports = __webpack_require__(144);


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(157);
module.exports = __webpack_require__(0).Object.entries;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(152);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(153);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(154);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
__webpack_require__(22);
__webpack_require__(33);
__webpack_require__(155);
__webpack_require__(158);
__webpack_require__(159);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
__webpack_require__(80);
__webpack_require__(160);
__webpack_require__(161);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(33);
module.exports = __webpack_require__(49).f('iterator');


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6);
var toLength = __webpack_require__(31);
var toAbsoluteIndex = __webpack_require__(142);
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(10);
var IObject = __webpack_require__(64);
var toObject = __webpack_require__(21);
var toLength = __webpack_require__(31);
var asc = __webpack_require__(126);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var isArray = __webpack_require__(66);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(125);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(20);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(72);
var pIE = __webpack_require__(28);
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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(10);
var call = __webpack_require__(67);
var isArrayIter = __webpack_require__(65);
var anObject = __webpack_require__(4);
var toLength = __webpack_require__(31);
var getIterFn = __webpack_require__(50);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(42);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(30);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(15);
var toIObject = __webpack_require__(6);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(32)('meta');
var isObject = __webpack_require__(13);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(19)(function () {
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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(79).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(18)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(4);
var getKeys = __webpack_require__(15);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(15);
var toIObject = __webpack_require__(6);
var isEnum = __webpack_require__(28).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(12);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(13);
var anObject = __webpack_require__(4);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(10)(Function.call, __webpack_require__(43).f(Object.prototype, '__proto__').set, 2);
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
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var defined = __webpack_require__(38);
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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var get = __webpack_require__(50);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(37);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(3);
var $find = __webpack_require__(124)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(61)(KEY);


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(10);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(21);
var call = __webpack_require__(67);
var isArrayIter = __webpack_require__(65);
var toLength = __webpack_require__(31);
var createProperty = __webpack_require__(127);
var getIterFn = __webpack_require__(50);

$export($export.S + $export.F * !__webpack_require__(69)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(61);
var step = __webpack_require__(132);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(68)(Array, 'Array', function (iterated, kind) {
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
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(42) });


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(6);
var $getOwnPropertyDescriptor = __webpack_require__(43).f;

__webpack_require__(29)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(29)('getOwnPropertyNames', function () {
  return __webpack_require__(70).f;
});


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(21);
var $getPrototypeOf = __webpack_require__(73);

__webpack_require__(29)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21);
var $keys = __webpack_require__(15);

__webpack_require__(29)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(139).set });


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var global = __webpack_require__(2);
var ctx = __webpack_require__(10);
var classof = __webpack_require__(37);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(13);
var aFunction = __webpack_require__(26);
var anInstance = __webpack_require__(122);
var forOf = __webpack_require__(129);
var speciesConstructor = __webpack_require__(78);
var task = __webpack_require__(79).set;
var microtask = __webpack_require__(135)();
var newPromiseCapabilityModule = __webpack_require__(41);
var perform = __webpack_require__(75);
var promiseResolve = __webpack_require__(76);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var sameConstructor = LIBRARY ? function (a, b) {
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
} : function (a, b) {
  return a === b;
};
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(138)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return sameConstructor($Promise, C)
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(30)($Promise, PROMISE);
__webpack_require__(140)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
    return promiseResolve(this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(69)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(77);
var META = __webpack_require__(134).KEY;
var $fails = __webpack_require__(19);
var shared = __webpack_require__(45);
var setToStringTag = __webpack_require__(30);
var uid = __webpack_require__(32);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(49);
var wksDefine = __webpack_require__(48);
var keyOf = __webpack_require__(133);
var enumKeys = __webpack_require__(128);
var isArray = __webpack_require__(66);
var anObject = __webpack_require__(4);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(47);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(42);
var gOPNExt = __webpack_require__(70);
var $GOPD = __webpack_require__(43);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(15);
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
  __webpack_require__(71).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(28).f = $propertyIsEnumerable;
  __webpack_require__(72).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(27)) {
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
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
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
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(3);
var $entries = __webpack_require__(137)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(78);
var promiseResolve = __webpack_require__(76);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(41);
var perform = __webpack_require__(75);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('asyncIterator');


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('observable');


/***/ }),
/* 162 */
/***/ (function(module, exports) {

// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g

module.exports = function(css, options){
  options = options || {};

  /**
   * Positional.
   */

  var lineno = 1;
  var column = 1;

  /**
   * Update lineno and column based on `str`.
   */

  function updatePosition(str) {
    var lines = str.match(/\n/g);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf('\n');
    column = ~i ? str.length - i : column + str.length;
  }

  /**
   * Mark position and patch `node.position`.
   */

  function position() {
    var start = { line: lineno, column: column };
    return function(node){
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }

  /**
   * Store position information for a node
   */

  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column: column };
    this.source = options.source;
  }

  /**
   * Non-enumerable source string
   */

  Position.prototype.content = css;

  /**
   * Error `msg`.
   */

  var errorsList = [];

  function error(msg) {
    var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = css;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }

  /**
   * Parse stylesheet.
   */

  function stylesheet() {
    var rulesList = rules();

    return {
      type: 'stylesheet',
      stylesheet: {
        rules: rulesList,
        parsingErrors: errorsList
      }
    };
  }

  /**
   * Opening brace.
   */

  function open() {
    return match(/^{\s*/);
  }

  /**
   * Closing brace.
   */

  function close() {
    return match(/^}/);
  }

  /**
   * Parse ruleset.
   */

  function rules() {
    var node;
    var rules = [];
    whitespace();
    comments(rules);
    while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
      if (node !== false) {
        rules.push(node);
        comments(rules);
      }
    }
    return rules;
  }

  /**
   * Match `re` and return captures.
   */

  function match(re) {
    var m = re.exec(css);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }

  /**
   * Parse whitespace.
   */

  function whitespace() {
    match(/^\s*/);
  }

  /**
   * Parse comments;
   */

  function comments(rules) {
    var c;
    rules = rules || [];
    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }

  /**
   * Parse comment.
   */

  function comment() {
    var pos = position();
    if ('/' != css.charAt(0) || '*' != css.charAt(1)) return;

    var i = 2;
    while ("" != css.charAt(i) && ('*' != css.charAt(i) || '/' != css.charAt(i + 1))) ++i;
    i += 2;

    if ("" === css.charAt(i-1)) {
      return error('End of comment missing');
    }

    var str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;

    return pos({
      type: 'comment',
      comment: str
    });
  }

  /**
   * Parse selector.
   */

  function selector() {
    var m = match(/^([^{]+)/);
    if (!m) return;
    /* @fix Remove all comments from selectors
     * http://ostermiller.org/findcomment.html */
    return trim(m[0])
      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
      .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(m) {
        return m.replace(/,/g, '\u200C');
      })
      .split(/\s*(?![^(]*\)),\s*/)
      .map(function(s) {
        return s.replace(/\u200C/g, ',');
      });
  }

  /**
   * Parse declaration.
   */

  function declaration() {
    var pos = position();

    // prop
    var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop) return;
    prop = trim(prop[0]);

    // :
    if (!match(/^:\s*/)) return error("property missing ':'");

    // val
    var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);

    var ret = pos({
      type: 'declaration',
      property: prop.replace(commentre, ''),
      value: val ? trim(val[0]).replace(commentre, '') : ''
    });

    // ;
    match(/^[;\s]*/);

    return ret;
  }

  /**
   * Parse declarations.
   */

  function declarations() {
    var decls = [];

    if (!open()) return error("missing '{'");
    comments(decls);

    // declarations
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    if (!close()) return error("missing '}'");
    return decls;
  }

  /**
   * Parse keyframe.
   */

  function keyframe() {
    var m;
    var vals = [];
    var pos = position();

    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }

    if (!vals.length) return;

    return pos({
      type: 'keyframe',
      values: vals,
      declarations: declarations()
    });
  }

  /**
   * Parse keyframes.
   */

  function atkeyframes() {
    var pos = position();
    var m = match(/^@([-\w]+)?keyframes\s*/);

    if (!m) return;
    var vendor = m[1];

    // identifier
    var m = match(/^([-\w]+)\s*/);
    if (!m) return error("@keyframes missing name");
    var name = m[1];

    if (!open()) return error("@keyframes missing '{'");

    var frame;
    var frames = comments();
    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }

    if (!close()) return error("@keyframes missing '}'");

    return pos({
      type: 'keyframes',
      name: name,
      vendor: vendor,
      keyframes: frames
    });
  }

  /**
   * Parse supports.
   */

  function atsupports() {
    var pos = position();
    var m = match(/^@supports *([^{]+)/);

    if (!m) return;
    var supports = trim(m[1]);

    if (!open()) return error("@supports missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@supports missing '}'");

    return pos({
      type: 'supports',
      supports: supports,
      rules: style
    });
  }

  /**
   * Parse host.
   */

  function athost() {
    var pos = position();
    var m = match(/^@host\s*/);

    if (!m) return;

    if (!open()) return error("@host missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@host missing '}'");

    return pos({
      type: 'host',
      rules: style
    });
  }

  /**
   * Parse media.
   */

  function atmedia() {
    var pos = position();
    var m = match(/^@media *([^{]+)/);

    if (!m) return;
    var media = trim(m[1]);

    if (!open()) return error("@media missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@media missing '}'");

    return pos({
      type: 'media',
      media: media,
      rules: style
    });
  }


  /**
   * Parse custom-media.
   */

  function atcustommedia() {
    var pos = position();
    var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m) return;

    return pos({
      type: 'custom-media',
      name: trim(m[1]),
      media: trim(m[2])
    });
  }

  /**
   * Parse paged media.
   */

  function atpage() {
    var pos = position();
    var m = match(/^@page */);
    if (!m) return;

    var sel = selector() || [];

    if (!open()) return error("@page missing '{'");
    var decls = comments();

    // declarations
    var decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@page missing '}'");

    return pos({
      type: 'page',
      selectors: sel,
      declarations: decls
    });
  }

  /**
   * Parse document.
   */

  function atdocument() {
    var pos = position();
    var m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) return;

    var vendor = trim(m[1]);
    var doc = trim(m[2]);

    if (!open()) return error("@document missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@document missing '}'");

    return pos({
      type: 'document',
      document: doc,
      vendor: vendor,
      rules: style
    });
  }

  /**
   * Parse font-face.
   */

  function atfontface() {
    var pos = position();
    var m = match(/^@font-face\s*/);
    if (!m) return;

    if (!open()) return error("@font-face missing '{'");
    var decls = comments();

    // declarations
    var decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@font-face missing '}'");

    return pos({
      type: 'font-face',
      declarations: decls
    });
  }

  /**
   * Parse import
   */

  var atimport = _compileAtrule('import');

  /**
   * Parse charset
   */

  var atcharset = _compileAtrule('charset');

  /**
   * Parse namespace
   */

  var atnamespace = _compileAtrule('namespace');

  /**
   * Parse non-block at-rules
   */


  function _compileAtrule(name) {
    var re = new RegExp('^@' + name + '\\s*([^;]+);');
    return function() {
      var pos = position();
      var m = match(re);
      if (!m) return;
      var ret = { type: name };
      ret[name] = m[1].trim();
      return pos(ret);
    }
  }

  /**
   * Parse at rule.
   */

  function atrule() {
    if (css[0] != '@') return;

    return atkeyframes()
      || atmedia()
      || atcustommedia()
      || atsupports()
      || atimport()
      || atcharset()
      || atnamespace()
      || atdocument()
      || atpage()
      || athost()
      || atfontface();
  }

  /**
   * Parse rule.
   */

  function rule() {
    var pos = position();
    var sel = selector();

    if (!sel) return error('selector missing');
    comments();

    return pos({
      type: 'rule',
      selectors: sel,
      declarations: declarations()
    });
  }

  return addParent(stylesheet());
};

/**
 * Trim `str`.
 */

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/g, '') : '';
}

/**
 * Adds non-enumerable parent node reference to each node.
 */

function addParent(obj, parent) {
  var isNode = obj && typeof obj.type === 'string';
  var childParent = isNode ? obj : parent;

  for (var k in obj) {
    var value = obj[k];
    if (Array.isArray(value)) {
      value.forEach(function(v) { addParent(v, childParent); });
    } else if (value && typeof value === 'object') {
      addParent(value, childParent);
    }
  }

  if (isNode) {
    Object.defineProperty(obj, 'parent', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: parent || null
    });
  }

  return obj;
}


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(81)

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(84)))

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),
/* 166 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @alias head
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.first([1, 2, 3]);
 * // => 1
 *
 * _.first([]);
 * // => undefined
 */
function first(array) {
  return array ? array[0] : undefined;
}

module.exports = first;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(168)
  , forEach = __webpack_require__(163)
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}

/***/ }),
/* 168 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var window = __webpack_require__(164)
var isFunction = __webpack_require__(81)
var parseHeaders = __webpack_require__(167)
var xtend = __webpack_require__(170)

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}


/***/ }),
/* 170 */
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
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            this.parentNode.removeChild(this);
        };
    }

    window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    /**
     * Helper for CSSRuleList to easily iterate over their values
     */
    CSSRuleList.prototype.toArray = function () {
        var returnValue = [];
        for (var i = 0; i < this.length; ++i) {
            returnValue.push(this[i]);
        }
        return returnValue;
    };

    /**
     * Helper for NamedNodeMap to easily iterate over their values
     */
    NamedNodeMap.prototype.toArray = function () {
        var returnValue = [];
        for (var i = 0; i < this.length; ++i) {
            returnValue.push({ name: this[i].name, value: this[i].nodeValue });
        }
        return returnValue;
    };
};

module.exports = exports['default'];

/***/ }),
/* 172 */,
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _remoteDebugger = __webpack_require__(83);

var _remoteDebugger2 = _interopRequireDefault(_remoteDebugger);

var _polyfills = __webpack_require__(171);

var _polyfills2 = _interopRequireDefault(_polyfills);

var _runtime = __webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _polyfills2.default)();

var uuid = document.currentScript ? document.currentScript.getAttribute('data-uuid') : window._uuid;
var remoteDebugger = window.remoteDebugger = new _remoteDebugger2.default(uuid);

/**
 * trigger executionContextCreated event
 */
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        remoteDebugger.loadHandler();
    }
};

window.onerror = function (errorMsg, url, lineNumber) {
    var err = new Error(errorMsg);
    err.stack = errorMsg + '\n\tat ' + url + ':' + lineNumber + ':1';
    remoteDebugger.execute('Runtime.consoleAPICalled', {
        args: [errorMsg],
        executionContext: remoteDebugger.executionContextId,
        stackTrace: { callFrames: (0, _runtime.getStacktrace)(err) },
        timestamp: new Date().getTime(),
        type: 'error'
    });
};

/***/ })
/******/ ]);