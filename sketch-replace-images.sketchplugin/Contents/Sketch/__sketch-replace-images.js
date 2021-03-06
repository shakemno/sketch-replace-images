var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sketch-replace-images.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sketch-replace-images-defaults.js":
/*!***********************************************!*\
  !*** ./src/sketch-replace-images-defaults.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var kDefaultsKey = "de.shakemno.sketch-replace-images.defaultsKey";
module.exports = {
  loadDefaults: function loadDefaults() {
    return NSUserDefaults.standardUserDefaults().objectForKey(kDefaultsKey);
  },
  saveDefaults: function saveDefaults(path) {
    NSUserDefaults.standardUserDefaults().setObject_forKey(path, kDefaultsKey);
    NSUserDefaults.standardUserDefaults().synchronize();
  },
  clearDefaults: function clearDefaults() {
    NSUserDefaults.standardUserDefaults().removeObjectForKey(kDefaultsKey);
    NSUserDefaults.standardUserDefaults().synchronize();
  }
};

/***/ }),

/***/ "./src/sketch-replace-images.js":
/*!**************************************!*\
  !*** ./src/sketch-replace-images.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var SketchReplaceImagesDefaults = __webpack_require__(/*! ./sketch-replace-images-defaults */ "./src/sketch-replace-images-defaults.js");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
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

    if (layer.class().toString() == "MSBitmapLayer") {
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
  } // check if we updated any images, report accordingly


  if (images_replaced.length > 0) {
    doc.showMessage("" + images_replaced.length + " images updated.");
  } else {
    doc.showMessage("Sorry, couldn't update images...");
  }
});
;

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__sketch-replace-images.js.map