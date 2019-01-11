"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

(function ($) {
  'use strict';

  var InnovedSimpleModal = function InnovedSimpleModal() {
    var version = document.head.querySelector("[property~=version][content]").content;
    var simpleModal = '#simpleModal'; //store the default modal content in a variable so that we can reset the modal if it gets closed.

    var simpleModalContent = '';
    /**
     * Private Methods
     */

    var updateFormElements = function updateFormElements(version) {
      if (version == 'bs3') {
        vleForms.bootstrapDatePicker();
        vleForms.bootstrapSelectPicker();
      } else {
        emsForms.bootstrapDatePicker();
        emsForms.bootstrapSelectPicker();
      }
    };

    var storeSimpleModalTemplate = function storeSimpleModalTemplate() {
      if (simpleModalContent == '') {
        simpleModalContent = $('#simpleModal .modal-content').html();
      }
    };

    var modalEvents = function modalEvents() {
      // change the default bootstrap behaviour to remove any data that was attached to the modal
      $('body').on('hidden.bs.modal', '.modal', function (e) {
        $(this).removeData('bs.modal');
      });
      $(simpleModal).on('show.bs.modal', function (e) {
        storeSimpleModalTemplate();
      });
      $(simpleModal).on('loaded.bs.modal', function (e) {
        storeSimpleModalTemplate();
        closeModalButton();
        resizeModal();
        updateFormElements(version);
      });
      $(simpleModal).on('hidden.bs.modal', function (e) {
        $(simpleModal + ' .modal-dialog').removeClass().addClass('modal-dialog');
        $(simpleModal + ' .modal-content').html(simpleModalContent);
      });
    };

    this.openModal = function ($element) {
      storeSimpleModalTemplate();
      var ajaxUrl = $element.data('url');

      if (ajaxUrl === undefined) {
        ajaxUrl = $element.attr('href');
      }

      var dataType = $element.data('type');

      if (dataType === undefined) {
        dataType = 'json';
      }

      var videoPlayer = $element.data('video-player'); // Get the contents of the specified page and update the modal content

      $.ajax({
        url: ajaxUrl,
        method: 'GET',
        dataType: dataType
      }).done(function (response) {
        if (response.html > '') {
          $(simpleModal + ' .modal-content').html(response.html);
          closeModalButton();
          resizeModal();
          updateFormElements(version);

          if (videoPlayer !== undefined) {
            var $modal = $(simpleModal);
            $modal.find('.modal-footer').remove();
            $modal.find('.modal-body > .row.margin-top').removeClass('row margin-top');
            $modal.addClass('kaltura-video-player-modal');
          }
        }
      }).fail(function (response, xhr, textStatus, errorThrown) {
        showError('GET', response);
        innovedFlashMessage.create('error', 'Something went wrong', "Please try again");
        $.error('Request Failed: ' + textStatus);
        console.log(errorThrown);
      });
      $('#simpleModal').modal({
        'show': true,
        'backdrop': 'static',
        'keyboard': true
      });
    };
    /**
     * Load the simple modal manually rather than using the automatic bootstrap method
     * * Usage: Add a class of js-simple-modal to any link / button 
     */


    var manualModal = function manualModal() {
      $('body').on('click', '.js-simple-modal', function (e) {
        e.preventDefault();
        innovedSimpleModal.openModal($(this));
      });
    };
    /**
     * Submit a form loaded within the simple modal without having to add any js to the file
     * * Usage: Add a class of js-simple-modal-form-submit to the form
     */


    var submitModalForm = function submitModalForm() {
      $(simpleModal).on('submit', '.js-simple-modal-form-submit', function (e) {
        e.preventDefault();
        var originalSubmitHtml = $(simpleModal + ' .modal-footer button:submit').html();
        $(simpleModal + ' .modal-footer button:submit').prop('disabled', true);
        $(simpleModal + ' .modal-footer button:submit').html('<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i> Saving...');
        emsGlobalActions.getJqXHR($(this).attr('action'), 'POST', $(this).serialize(), 'json').done(function (response) {
          if (response.reload !== undefined) {
            $(simpleModal + ' .modal-content').html('');
            window.location.reload();
          } else if (response.redirect !== undefined) {
            window.location.replace(response.redirect);

            if (response.redirect.indexOf("#") != -1) {
              window.location.reload();
            }
          } else if (response.location !== undefined) {
            window.location.replace(response.location);
          } else if (response.html > '') {
            $(simpleModal + ' .modal-content').html(response.html);
          }

          resizeModal();
          updateFormElements(version);
        }).fail(function (response, xhr, textStatus, errorThrown) {
          showError('POST', response, originalSubmitHtml);
          innovedFlashMessage.create('error', 'Something went wrong', "Please try again");
          $.error('Request Failed: ' + textStatus);
          console.log(errorThrown);
        });
      });
    };

    var closeModalButton = function closeModalButton() {
      if ($(simpleModal + ' .modal-header').find('button.close').length == 0) {
        var button = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n          </button>";
        $(simpleModal + ' .modal-header').prepend(button);
      }
    };

    var resizeModal = function resizeModal() {
      if ($(simpleModal + ' .modal-content-inner').attr('data-modal-size')) {
        $(simpleModal + ' .modal-dialog').addClass('modal-' + $(simpleModal + ' .modal-content-inner').data('modal-size'));
      }
    };

    var showError = function showError(method, response, originalSubmitHtml) {
      var text = method.toUpperCase() == 'GET' ? 'loading' : 'saving';
      $(simpleModal + ' .modal-body .alert.alert-danger').remove();
      $(simpleModal + ' .modal-body').prepend("<div class=\"alert alert-danger\">\n          <p><strong>Ooops!</strong> Something went wrong when ".concat(text, " the page. Please try again.</p>\n        </div>"));
      $(simpleModal + ' .modal-body .overlay').remove();
      $(simpleModal + ' .modal-footer button').removeClass('disabled');
      $(simpleModal + ' .modal-footer button:submit').prop('disabled', false).html(originalSubmitHtml);
    };
    /**
     * Public Methods
     */


    this.init = function () {
      modalEvents();
      manualModal();
      submitModalForm();
    };
    /**
     *
     * * Usage Example 1
     * 
     * $('.simple-modal-confirm').on('click', function (e) {
     *   e.preventDefault();
     *   var params = {
     *     modalTitle: 'Modal title',
     *     modalBody: 'Modal body confirmation Message'
     *   };
     *   emsSimpleModals.displayConfirmationModal($(this), '', params);
     * });
     *
     * Alternatively add data attributes to the referring element e.g. data-modaltitle
     *
     */


    this.displayConfirmationModal = function (el, callback, params) {
      storeSimpleModalTemplate();
      var url = el.data('url');

      if (url === undefined) {
        url = (_readOnlyError("url"), el.attr('href'));
      }

      var modaltitle = el.data('modaltitle');

      if (modaltitle !== undefined) {
        $(simpleModal + ' .modal-title').html(modaltitle);
      } else {
        $(simpleModal + ' .modal-title').html(params.modalTitle);
      }

      var modalbody = el.data('modalbody');

      if (modalbody !== undefined) {
        $(simpleModal + ' .modal-body').html('<p>' + modalbody + '</p>');
      } else {
        $(simpleModal + ' .modal-body').html('<p>' + params.modalBody + '</p>');
      }

      if (params.okButtonLabel === undefined) {
        params.okButtonLabel = 'Ok';
      }

      if (params.cancelButtonLabel === undefined) {
        params.cancelButtonLabel = 'Cancel';
      }

      var okButton = '<button type="button" class="btn btn-primary confirm-yes" data-url="' + url + '">' + params.okButtonLabel + '</button>';
      var cancelButton = '<button type="button" class="btn btn-default" data-dismiss="modal">' + params.cancelButtonLabel + '</button>';
      $(simpleModal + ' .modal-footer').removeClass('hidden').html(cancelButton + okButton);
      $(simpleModal).modal({
        'show': true,
        'backdrop': 'static'
      });
      $('body').on('click', simpleModal + ' .confirm-yes', function ($e) {
        if (callback && typeof callback === 'function') {
          callback();
        } else {
          window.location.href = url;
        }
      });
    };

    this.displayAlertModal = function (el, params) {
      storeSimpleModalTemplate();
      var title = el.data('modaltitle');

      if (modaltitle !== undefined) {
        $(simpleModal + ' .modal-title').html(modaltitle);
      } else {
        $(simpleModal + ' .modal-title').html(params.modalTitle);
      }

      var modalbody = el.data('modalbody');

      if (modalbody !== undefined) {
        $(simpleModal + ' .modal-body').html('<p>' + modalbody + '</p>');
      } else {
        $(simpleModal + ' .modal-body').html('<p>' + params.modalBody + '</p>');
      }

      if (params.okButtonLabel === undefined) {
        params.okButtonLabel = 'Ok';
      }

      var okButton = '<button type="button" class="btn btn-default" data-dismiss="modal">' + params.okButtonLabel + '</button>';
      $(simpleModal + ' .modal-footer').removeClass('hidden').html(okButton);
      $(simpleModal).modal({
        'show': true,
        'backdrop': 'static'
      });
    };

    this.resizeModal = function () {
      resizeModal();
    };

    this.closeModalButton = function () {
      closeModalButton();
    };

    this.showError = function (method, response, originalSubmitHtml) {
      showError();
    };
  }; //return the object for global use


  $.innovedSimpleModal = function () {
    return new InnovedSimpleModal();
  };
})(jQuery); //export for package


var _default = $.innovedSimpleModal();

exports.default = _default;
