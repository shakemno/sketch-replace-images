var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console, global) {/* globals log */
if (!console._skpmEnabled) {
  if (true) {
    var sketchDebugger = __webpack_require__(3)
    var actions = __webpack_require__(5)

    function getStack() {
      return sketchDebugger.prepareStackTrace(new Error().stack)
    }
  }

  console._skpmPrefix = 'console> '

  function logEverywhere(type, args) {
    var values = Array.prototype.slice.call(args)

    // log to the System logs
    values.forEach(function(v) {
      try {
        log(console._skpmPrefix + indentString() + v)
      } catch (e) {
        log(v)
      }
    })

    if (true) {
      if (!sketchDebugger.isDebuggerPresent()) {
        return
      }

      var payload = {
        ts: Date.now(),
        type: type,
        plugin: String(context.scriptPath),
        values: values.map(sketchDebugger.prepareValue),
        stack: getStack(),
      }

      sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
    }
  }

  var indentLevel = 0
  function indentString() {
    var indent = ''
    for (var i = 0; i < indentLevel; i++) {
      indent += '  '
    }
    if (indentLevel > 0) {
      indent += '| '
    }
    return indent
  }

  var oldGroup = console.group

  console.group = function() {
    // log to the JS context
    oldGroup && oldGroup.apply(this, arguments)
    indentLevel += 1
    if (true) {
      sketchDebugger.sendToDebugger(actions.GROUP, {
        plugin: String(context.scriptPath),
        collapsed: false,
      })
    }
  }

  var oldGroupCollapsed = console.groupCollapsed

  console.groupCollapsed = function() {
    // log to the JS context
    oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
    indentLevel += 1
    if (true) {
      sketchDebugger.sendToDebugger(actions.GROUP, {
        plugin: String(context.scriptPath),
        collapsed: true
      })
    }
  }

  var oldGroupEnd = console.groupEnd

  console.groupEnd = function() {
    // log to the JS context
    oldGroupEnd && oldGroupEnd.apply(this, arguments)
    indentLevel -= 1
    if (indentLevel < 0) {
      indentLevel = 0
    }
    if (true) {
      sketchDebugger.sendToDebugger(actions.GROUP_END, {
        plugin: context.scriptPath,
      })
    }
  }

  var counts = {}
  var oldCount = console.count

  console.count = function(label) {
    label = typeof label !== 'undefined' ? label : 'Global'
    counts[label] = (counts[label] || 0) + 1

    // log to the JS context
    oldCount && oldCount.apply(this, arguments)
    return logEverywhere('log', [label + ': ' + counts[label]])
  }

  var timers = {}
  var oldTime = console.time

  console.time = function(label) {
    // log to the JS context
    oldTime && oldTime.apply(this, arguments)

    label = typeof label !== 'undefined' ? label : 'default'
    if (timers[label]) {
      return logEverywhere('warn', ['Timer "' + label + '" already exists'])
    }

    timers[label] = Date.now()
    return
  }

  var oldTimeEnd = console.timeEnd

  console.timeEnd = function(label) {
    // log to the JS context
    oldTimeEnd && oldTimeEnd.apply(this, arguments)

    label = typeof label !== 'undefined' ? label : 'default'
    if (!timers[label]) {
      return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
    }

    var duration = Date.now() - timers[label]
    delete timers[label]
    return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
  }

  var oldLog = console.log

  console.log = function() {
    // log to the JS context
    oldLog && oldLog.apply(this, arguments)
    return logEverywhere('log', arguments)
  }

  var oldWarn = console.warn

  console.warn = function() {
    // log to the JS context
    oldWarn && oldWarn.apply(this, arguments)
    return logEverywhere('warn', arguments)
  }

  var oldError = console.error

  console.error = function() {
    // log to the JS context
    oldError && oldError.apply(this, arguments)
    return logEverywhere('error', arguments)
  }

  var oldAssert = console.assert

  console.assert = function(condition, text) {
    // log to the JS context
    oldAssert && oldAssert.apply(this, arguments)
    if (!condition) {
      return logEverywhere('assert', [text])
    }
    return undefined
  }

  var oldInfo = console.info

  console.info = function() {
    // log to the JS context
    oldInfo && oldInfo.apply(this, arguments)
    return logEverywhere('info', arguments)
  }

  var oldClear = console.clear

  console.clear = function() {
    oldClear && oldClear()
    if (true) {
      return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
    }
  }

  console._skpmEnabled = true

  // polyfill the global object
  var commonjsGlobal = typeof global !== 'undefined' ? global : this

  commonjsGlobal.console = console
}

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (context) {
  var fileManager = NSFileManager.defaultManager();
  var doc = context.document;
  var doc_folder = doc.fileURL().toString().stringByDeletingLastPathComponent();

  log("SketchReplaceImages - trying to update images...");

  var relativePath = doc_folder;
  if (!/\/$/.test(relativePath)) {
    relativePath = relativePath + "/";
  }

  var url = NSURL.URLWithString_relativeToURL(relativePath, doc.fileURL());

  var defaults = SketchReplaceImagesDefaults.loadDefaults();
  if (defaults) {
    relativePath = defaults;
    url = NSURL.URLWithString(relativePath);
  }

  var isValidPath = fileManager.fileExistsAtPath(url.path());
  console.log("isValidPath: " + isValidPath);

  if (isValidPath === 0) {
    doc.showMessage("Sorry, can't find a valid directory. Try (re-)setting the path url.");
    return;
  }

  console.log("url: " + url);

  var direnum = fileManager.enumeratorAtPath(url.path());
  var filename;
  var fileURL;

  var page = doc.currentPage();
  var layers = page.children();

  var imageTypes = NSArray.arrayWithArray(["png", "jpg", "jpeg"]);
  var images_available = NSMutableDictionary.dictionary();
  var images_replaced = [];

  console.log("collecting available images...");

  while (filename = direnum.nextObject()) {
    var basefileName = filename.toString().lastPathComponent();
    var pathExtension = basefileName.pathExtension();

    if (imageTypes.containsObject(pathExtension)) {
      images_available.setObject_forKey(filename, basefileName);
    }
  }

  console.log("updating images...");

  var images_available_keys = images_available.allKeys();
  for (var i = 0; i < layers.count(); i++) {
    var layer = layers[i];
    if (layer["class"]().toString() == "MSBitmapLayer") {
      // loop through image types
      for (var j = 0; j < imageTypes.count(); j++) {
        var type = imageTypes.objectAtIndex(j);
        var imageName = layer.name() + "." + type;

        if (images_available_keys.containsObject(imageName)) {
          // Do URL escaping on imageName
          var imageNameForUrl = images_available.objectForKey(imageName);
          imageNameForUrl = imageNameForUrl.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding);

          if (defaults) {
            fileURL = NSURL.URLWithString(relativePath + imageNameForUrl);
          } else {
            fileURL = NSURL.URLWithString_relativeToURL(imageNameForUrl, url);
          }

          if (fileManager.fileExistsAtPath(fileURL.path())) {
            var srcImage = NSImage.alloc().initByReferencingFile(fileURL.path());
            if (srcImage.isValid()) {
              var old_width = layer.frame().width();
              var old_height = layer.frame().height();

              var replaceAction = MSReplaceImageAction.alloc().init();
              if (true) //([replaceAction validate])
                {
                  replaceAction.applyImage_tolayer(srcImage, layer);
                  layer.frame().setWidth(old_width);
                  layer.frame().setHeight(old_height);
                  images_replaced.push(imageName);
                  break; // we'll only pick the first match...
                }
            }
          }
        }
      }
    }
  }

  // check if we updated any images, report accordingly
  if (images_replaced.length > 0) {
    doc.showMessage("" + images_replaced.length + " images updated.");
  } else {
    doc.showMessage("Sorry, couldn't update images...");
  }
};

var SketchReplaceImagesDefaults = __webpack_require__(6);

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(4)

module.exports.identifier = 'skpm.debugger'

function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < object.count(); j += 1) {
    arr.push(object.objectAtIndex(j))
  }
  return arr
}

module.exports.prepareStackTrace = function(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function(s) {
    return s.replace(/\sg/, '')
  })

  // pop the last 2 frames as it's ours here
  stack.splice(0, 2)

  stack = stack.map(function(entry) {
    var line = null
    var column = null
    var file = null
    var split = entry.split('@')
    var fn = split[0]
    var filePath = split[1]

    if (filePath) {
      split = filePath.split(':')
      filePath = split[0]
      line = split[1]
      column = split[2]
      file = filePath.split('/')
      file = file[file.length - 1]
    }
    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: line,
      column: column,
    }
  })

  return stack
}

function prepareArray(array, skipMocha) {
  return array.map(function(i) {
    return module.exports.prepareValue(i, skipMocha)
  })
}

module.exports.prepareObject = function(object, skipMocha) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = module.exports.prepareValue(object[key], skipMocha)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value) {
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(mocha.propertiesWithAncestors()).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(mocha.classMethodsWithAncestors()).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(mocha.instanceMethodsWithAncestors()).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(mocha.protocolsWithAncestors()).map(getName),
    },
  }
  // if (mocha.treeAsDictionary) {
  //   introspection.treeAsDictionary = mocha.treeAsDictionary()
  // }
  return introspection
}

module.exports.prepareValue = function prepareValue(value, skipMocha) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: module.exports.prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, skipMocha)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = module.exports.prepareObject(Object(value), skipMocha)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), skipMocha)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = module.exports.prepareValue(value[k], skipMocha)
          return prev
        }, {})
      } else if (value.class().mocha && !skipMocha) {
        primitive = 'Mocha'
        value = introspectMochaObject(value)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = module.exports.prepareObject(value, skipMocha)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var kDefaultsKey = "de.shakemno.sketch-replace-images.defaultsKey";

module.exports = {
  loadDefaults: function () {
    function loadDefaults() {
      return NSUserDefaults.standardUserDefaults().objectForKey(kDefaultsKey);
    }

    return loadDefaults;
  }(),
  saveDefaults: function () {
    function saveDefaults(path) {
      NSUserDefaults.standardUserDefaults().setObject_forKey(path, kDefaultsKey);
      NSUserDefaults.standardUserDefaults().synchronize();
    }

    return saveDefaults;
  }(),

  clearDefaults: function () {
    function clearDefaults() {
      NSUserDefaults.standardUserDefaults().removeObjectForKey(kDefaultsKey);
      NSUserDefaults.standardUserDefaults().synchronize();
    }

    return clearDefaults;
  }()
};

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
