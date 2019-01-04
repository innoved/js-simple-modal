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
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/simple-modal.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/simple-modal.js":
/*!*****************************!*\
  !*** ./src/simple-modal.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _readOnlyError(name) { throw new Error(\"\\\"\" + name + \"\\\" is read-only\"); }\n\n(function ($) {\n  'use strict';\n\n  var InnovedSimpleModal = function InnovedSimpleModal() {\n    var version = document.head.querySelector(\"[property~=version][content]\").content;\n    var simpleModal = '#simpleModal'; //store the default modal content in a variable so that we can reset the modal if it gets closed.\n\n    var simpleModalContent = '';\n    /**\n     * Private Methods\n     */\n\n    var updateFormElements = function updateFormElements(version) {\n      if (version == 'bs3') {\n        vleForms.bootstrapDatePicker();\n        vleForms.bootstrapSelectPicker();\n      } else {\n        emsForms.bootstrapDatePicker();\n        emsForms.bootstrapSelectPicker();\n      }\n    };\n\n    var storeSimpleModalTemplate = function storeSimpleModalTemplate() {\n      if (simpleModalContent == '') {\n        simpleModalContent = $('#simpleModal .modal-content').html();\n      }\n    };\n\n    var modalEvents = function modalEvents() {\n      // change the default bootstrap behaviour to remove any data that was attached to the modal\n      $('body').on('hidden.bs.modal', '.modal', function (e) {\n        $(this).removeData('bs.modal');\n      });\n      $(simpleModal).on('show.bs.modal', function (e) {\n        storeSimpleModalTemplate();\n      });\n      $(simpleModal).on('loaded.bs.modal', function (e) {\n        storeSimpleModalTemplate();\n        closeModalButton();\n        resizeModal();\n        updateFormElements(version);\n      });\n      $(simpleModal).on('hidden.bs.modal', function (e) {\n        $(simpleModal + ' .modal-dialog').removeClass().addClass('modal-dialog');\n        $(simpleModal + ' .modal-content').html(simpleModalContent);\n      });\n    };\n    /**\n     * Load the simple modal manually rather than using the automatic bootstrap method\n     * * Usage: Add a class of js-simple-modal to any link / button \n     */\n\n\n    var manualModal = function manualModal() {\n      $('body').on('click', '.js-simple-modal', function (e) {\n        e.preventDefault();\n        storeSimpleModalTemplate();\n        var ajaxUrl = $(this).data('url');\n\n        if (ajaxUrl === undefined) {\n          ajaxUrl = $(this).attr('href');\n        }\n\n        var dataType = $(this).data('type');\n\n        if (dataType === undefined) {\n          dataType = 'json';\n        }\n\n        var videoPlayer = $(this).data('video-player'); // Get the contents of the specified page and update the modal content\n\n        emsGlobalActions.getJqXHR(ajaxUrl, 'GET', '', dataType).done(function (response) {\n          if (response.html > '') {\n            $(simpleModal + ' .modal-content').html(response.html);\n            closeModalButton();\n            resizeModal();\n            updateFormElements(version);\n\n            if (videoPlayer !== undefined) {\n              var $modal = $(simpleModal);\n              $modal.find('.modal-footer').remove();\n              $modal.find('.modal-body > .row.margin-top').removeClass('row margin-top');\n              $modal.addClass('kaltura-video-player-modal');\n            }\n          }\n        }).fail(function (response, xhr, textStatus, errorThrown) {\n          showError('GET', response);\n          innovedFlashMessage.create('error', 'Something went wrong', \"Please try again\");\n          $.error('Request Failed: ' + textStatus);\n          console.log(errorThrown);\n        });\n        $('#simpleModal').modal({\n          'show': true,\n          'backdrop': 'static',\n          'keyboard': true\n        });\n      });\n    };\n    /**\n     * Submit a form loaded within the simple modal without having to add any js to the file\n     * * Usage: Add a class of js-simple-modal-form-submit to the form\n     */\n\n\n    var submitModalForm = function submitModalForm() {\n      $(simpleModal).on('submit', '.js-simple-modal-form-submit', function (e) {\n        e.preventDefault();\n        var originalSubmitHtml = $(simpleModal + ' .modal-footer button:submit').html();\n        $(simpleModal + ' .modal-footer button:submit').prop('disabled', true);\n        $(simpleModal + ' .modal-footer button:submit').html('<i class=\"fas fa-circle-notch fa-spin\" aria-hidden=\"true\"></i> Saving...');\n        emsGlobalActions.getJqXHR($(this).attr('action'), 'POST', $(this).serialize(), 'json').done(function (response) {\n          if (response.reload !== undefined) {\n            $(simpleModal + ' .modal-content').html('');\n            window.location.reload();\n          } else if (response.redirect !== undefined) {\n            window.location.replace(response.redirect);\n\n            if (response.redirect.indexOf(\"#\") != -1) {\n              window.location.reload();\n            }\n          } else if (response.location !== undefined) {\n            window.location.replace(response.location);\n          } else if (response.html > '') {\n            $(simpleModal + ' .modal-content').html(response.html);\n          }\n\n          resizeModal();\n          updateFormElements(version);\n        }).fail(function (response, xhr, textStatus, errorThrown) {\n          showError('POST', response, originalSubmitHtml);\n          innovedFlashMessage.create('error', 'Something went wrong', \"Please try again\");\n          $.error('Request Failed: ' + textStatus);\n          console.log(errorThrown);\n        });\n      });\n    };\n\n    var closeModalButton = function closeModalButton() {\n      if ($(simpleModal + ' .modal-header').find('button.close').length == 0) {\n        var button = \"<button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\" aria-label=\\\"Close\\\">\\n          <span aria-hidden=\\\"true\\\">&times;</span>\\n          </button>\";\n        $(simpleModal + ' .modal-header').prepend(button);\n      }\n    };\n\n    var resizeModal = function resizeModal() {\n      if ($(simpleModal + ' .modal-content-inner').attr('data-modal-size')) {\n        $(simpleModal + ' .modal-dialog').addClass('modal-' + $(simpleModal + ' .modal-content-inner').data('modal-size'));\n      }\n    };\n\n    var showError = function showError() {\n      var text = method.toUpperCase() == 'GET' ? 'loading' : 'saving';\n      $(simpleModal + ' .modal-body .alert.alert-danger').remove();\n      $(simpleModal + ' .modal-body').prepend(\"<div class=\\\"alert alert-danger\\\">\\n          <p><strong>Ooops!</strong> Something went wrong when \".concat(text, \" the page. Please try again.</p>\\n        </div>\"));\n      $(simpleModal + ' .modal-body .overlay').remove();\n      $(simpleModal + ' .modal-footer button').removeClass('disabled');\n      $(simpleModal + ' .modal-footer button:submit').prop('disabled', false).html(originalSubmitHtml);\n    };\n    /**\n     * Public Methods\n     */\n\n\n    this.init = function () {\n      modalEvents();\n      manualModal();\n      submitModalForm();\n    };\n    /**\n     *\n     * * Usage Example 1\n     * \n     * $('.simple-modal-confirm').on('click', function (e) {\n     *   e.preventDefault();\n     *   var params = {\n     *     modalTitle: 'Modal title',\n     *     modalBody: 'Modal body confirmation Message'\n     *   };\n     *   emsSimpleModals.displayConfirmationModal($(this), '', params);\n     * });\n     *\n     * Alternatively add data attributes to the referring element e.g. data-modaltitle\n     *\n     */\n\n\n    this.displayConfirmationModal = function (el, callback, params) {\n      storeSimpleModalTemplate();\n      var url = el.data('url');\n\n      if (url === undefined) {\n        url = (_readOnlyError(\"url\"), el.attr('href'));\n      }\n\n      var modaltitle = el.data('modaltitle');\n\n      if (modaltitle !== undefined) {\n        $(simpleModal + ' .modal-title').html(modaltitle);\n      } else {\n        $(simpleModal + ' .modal-title').html(params.modalTitle);\n      }\n\n      var modalbody = el.data('modalbody');\n\n      if (modalbody !== undefined) {\n        $(simpleModal + ' .modal-body').html('<p>' + modalbody + '</p>');\n      } else {\n        $(simpleModal + ' .modal-body').html('<p>' + params.modalBody + '</p>');\n      }\n\n      if (params.okButtonLabel === undefined) {\n        params.okButtonLabel = 'Ok';\n      }\n\n      if (params.cancelButtonLabel === undefined) {\n        params.cancelButtonLabel = 'Cancel';\n      }\n\n      var okButton = '<button type=\"button\" class=\"btn btn-primary confirm-yes\" data-url=\"' + url + '\">' + params.okButtonLabel + '</button>';\n      var cancelButton = '<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">' + params.cancelButtonLabel + '</button>';\n      $(simpleModal + ' .modal-footer').removeClass('hidden').html(cancelButton + okButton);\n      $(simpleModal).modal({\n        'show': true,\n        'backdrop': 'static'\n      });\n      $('body').on('click', simpleModal + ' .confirm-yes', function ($e) {\n        if (callback && typeof callback === 'function') {\n          callback();\n        } else {\n          window.location.href = url;\n        }\n      });\n    };\n\n    this.displayAlertModal = function (el, params) {\n      storeSimpleModalTemplate();\n      var title = el.data('modaltitle');\n\n      if (modaltitle !== undefined) {\n        $(simpleModal + ' .modal-title').html(modaltitle);\n      } else {\n        $(simpleModal + ' .modal-title').html(params.modalTitle);\n      }\n\n      var modalbody = el.data('modalbody');\n\n      if (modalbody !== undefined) {\n        $(simpleModal + ' .modal-body').html('<p>' + modalbody + '</p>');\n      } else {\n        $(simpleModal + ' .modal-body').html('<p>' + params.modalBody + '</p>');\n      }\n\n      if (params.okButtonLabel === undefined) {\n        params.okButtonLabel = 'Ok';\n      }\n\n      var okButton = '<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">' + params.okButtonLabel + '</button>';\n      $(simpleModal + ' .modal-footer').removeClass('hidden').html(okButton);\n      $(simpleModal).modal({\n        'show': true,\n        'backdrop': 'static'\n      });\n    };\n\n    this.resizeModal = function () {\n      resizeModal();\n    };\n\n    this.closeModalButton = function () {\n      closeModalButton();\n    };\n\n    this.showError = function (method, response, originalSubmitHtml) {\n      showError();\n    };\n  }; //return the object for global use\n\n\n  $.innovedSimpleModal = function () {\n    return new InnovedSimpleModal();\n  };\n})(jQuery); //export for package\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ($.innovedSimpleModal());\n\n//# sourceURL=webpack:///./src/simple-modal.js?");

/***/ })

/******/ });