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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (context) {
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

  log("url: " + url);

  var fileManager = NSFileManager.defaultManager();
  var direnum = fileManager.enumeratorAtPath(url.path());
  var filename;
  var fileURL;

  var page = doc.currentPage();
  var layers = page.children();

  var imageTypes = NSArray.arrayWithArray(["png", "jpg", "jpeg"]);
  var images_available = NSMutableDictionary.dictionary();
  var images_replaced = [];

  log("collecting available images...");

  while (filename = direnum.nextObject()) {
    var basefileName = filename.toString().lastPathComponent();
    var pathExtension = basefileName.pathExtension();

    if (imageTypes.containsObject(pathExtension)) {
      images_available.setObject_forKey(filename, basefileName);
    }
  }

  log("updating images...");

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

var SketchReplaceImagesDefaults = __webpack_require__(1);

;

/***/ }),
/* 1 */
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
