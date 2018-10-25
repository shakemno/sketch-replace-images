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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sketch-replace-images-settings.js");
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

/***/ "./src/sketch-replace-images-settings.js":
/*!***********************************************!*\
  !*** ./src/sketch-replace-images-settings.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var SketchReplaceImagesDefaults = __webpack_require__(/*! ./sketch-replace-images-defaults */ "./src/sketch-replace-images-defaults.js");

function createPanel(msg, default_path) {
  var openPanel;
  var okButton = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 100, 30));
  okButton.setTitle("Restore default");
  okButton.setCOSJSTargetFunction(function (sender) {
    NSApp.stopModal();
  });
  okButton.setBezelStyle(NSRoundedBezelStyle);
  openPanel = NSOpenPanel.openPanel();
  openPanel.setCanChooseDirectories(true);
  openPanel.setCanChooseFiles(false);
  openPanel.setCanCreateDirectories(true);
  if (default_path !== null) openPanel.setDirectoryURL(NSURL.fileURLWithPath(default_path));else openPanel.setDirectoryURL(NSURL.fileURLWithPath(NSHomeDirectory().stringByAppendingString("/Documents/")));
  openPanel.setPrompt("Set path");
  openPanel.setMessage(msg);
  openPanel.setAccessoryView(okButton);
  var responseCode = openPanel.runModal();
  var url = openPanel.URL().absoluteString();
  return {
    "responseCode": responseCode,
    "selection": url
  };
}

function present_error(doc) {
  doc.showMessage("There seems to be an issue with the path. Please make sure you know what you're doing.");
}

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var documentName = context.document.displayName();
  var doc = context.document;
  var defaults = SketchReplaceImagesDefaults.loadDefaults();
  var choice = createPanel('Select a custom look-up directory...', defaults);

  switch (choice.responseCode) {
    case -1000:
      SketchReplaceImagesDefaults.clearDefaults();
      doc.showMessage("Restored default.");
      break;

    case 1:
      if (choice.selection.length() < 1) {
        present_error(doc);
        return;
      }

      var relativePath = choice.selection;

      if (!/\/$/.test(relativePath)) {
        relativePath = relativePath + "/";
      }

      var url = NSURL.URLWithString(relativePath);

      if (url) {
        SketchReplaceImagesDefaults.saveDefaults(relativePath);
        doc.showMessage('Set path to: "' + relativePath + '"');
      } else {
        present_error(doc);
      }

      break;

    default:
      doc.showMessage("Cancelled");
      break;
  }
});
;

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=sketch-replace-images-settings.js.map