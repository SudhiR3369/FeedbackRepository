/**
 * @file Plugin for setting images to LazyLoad
 */

(function () {
    var TRANS_IMAGE_PATH = "/img/trans.png";
    var LAZY_CLASS_NAME = "lazy";

    CKEDITOR.plugins.add('lazyload',
      {
          requires: ['image', 'dialog'],
          afterInit: function (editor) {
              editor.dataProcessor.htmlFilter.addRules({
                  elements: {
                      img: function (element) {
                          if (element.attributes.class) {
                              if (element.attributes.class.indexOf(LAZY_CLASS_NAME) > -1) {
                                  element.attributes.src = TRANS_IMAGE_PATH;
                              }
                          }
                      }
                  }
              });
              editor.dataProcessor.dataFilter.addRules({
                  elements: {
                      img: function (element) {
                          if (element.attributes.class) {
                              if (element.attributes.class.indexOf(LAZY_CLASS_NAME) > -1) {
                                  element.attributes.src = element.attributes['data-original'];
                              }
                          }
                      }
                  }
              });

          }
      }
    );

    // When opening a dialog, its "definition" is created for it, for
    // each editor instance. The "dialogDefinition" event is then
    // fired. We should use this event to make customizations to the
    // definition of existing dialogs.
    CKEDITOR.on('dialogDefinition', function (ev) {
        // Take the dialog name and its definition from the event
        // data.
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;

        // Check if the definition is from the dialog we're
        // interested on (the "Link" dialog).
        if (dialogName == 'image') {
            // Add a new tab to the "Link" dialog.
            dialogDefinition.addContents({
                id: 'lazyLoad',
                label: 'LazyLoad',
                accessKey: 'M',
                elements: [
					{
					    id: 'lazyLoadCheck',
					    type: 'checkbox',
					    label: 'Controls whether the image is lazy loaded.',
					    setup: function (type, element) {
					        var field = this;
					        field.setValue((element.getAttribute('data-original') !== null));
					    },
					    onChange: function () {
					        var dialog = this.getDialog();
					        var element = dialog.getSelectedElement();
					        var blnChecked = this.getValue();
					        var original = dialog.originalElement;
					        dialog.dontResetSize = true;
					        dialog.setValueOf('info', 'txtHeight', parseInt(element.getStyle('height'), 10));
					        dialog.setValueOf('info', 'txtWidth', parseInt(element.getStyle('width'), 10));
					        if (blnChecked) {
					            dialog.setValueOf('lazyLoad', 'lazyLoadDataOrig', original.getAttribute('src'));
					            dialog.setValueOf('info', 'txtUrl', TRANS_IMAGE_PATH);
					        } else {
					            dialog.setValueOf('lazyLoad', 'lazyLoadDataOrig', "");
					            if (element.hasAttribute('data-original')) {
					                dialog.setValueOf('info', 'txtUrl', original.getAttribute('data-original'));
					            } else {
					                dialog.setValueOf('info', 'txtUrl', original.getAttribute('src'));
					            }
					        }
					    },
					    commit: function (type, element) {
					        if (type == 1) {
					            //If LazyLoad checkbox is set and if the image doesn't have an attribute of data-original
					            if (this.getValue() && !element.hasAttribute('data-original')) {
					                var dialog = this.getDialog();
					                var parentDialog = dialog.getParentEditor();
					                var original = dialog.originalElement;
					                var div = new CKEDITOR.dom.element('div');
					                var noScript = new CKEDITOR.dom.element('noscript');
					                var noScriptImg = new CKEDITOR.dom.element('img');
					                noScriptImg.copyAttributes(original);

					                element.setAttribute('data-original', dialog.getValueOf('lazyLoad', 'lazyLoadDataOrig'));
					                noScriptImg.setAttribute('src', dialog.getValueOf('lazyLoad', 'lazyLoadDataOrig'));

					                if (element.hasAttribute('title')) {
					                    noScriptImg.setAttribute('title', element.getAttribute("title"));
					                }
					                if (element.hasAttribute('alt')) {
					                    noScriptImg.setAttribute('alt', element.getAttribute("alt"));
					                }
					                if (element.hasAttribute('style')) {
					                    noScriptImg.setAttribute('style', element.getAttribute("style"));
					                }
					                if (element.hasAttribute('align')) {
					                    noScriptImg.setAttribute('align', element.getAttribute("align"));
					                }

					                noScript.append(noScriptImg);

					                element.removeAttribute('src');
					                element.setAttribute('src', TRANS_IMAGE_PATH);
					                original.setAttribute('src', TRANS_IMAGE_PATH);
					                element.addClass(LAZY_CLASS_NAME);
					                div.addClass(LAZY_CLASS_NAME);
					                div.insertAfter(element);
					                element.appendTo(div);
					                noScript.insertAfter(element);
					            }
					            //If LazyLoad checkbox has been unchecked and the data-original attribute is set
					            if (!this.getValue() && element.hasAttribute('data-original')) {
					                element.setAttribute('src', element.getAttribute('data-original'));
					                element.removeAttribute('data-original');
					                element.removeClass(LAZY_CLASS_NAME);
					                element.getNext().remove();

					                element.getParent().remove(true);
					            }
					        }
					    }
					},
          {
              id: 'lazyLoadDataOrig',
              type: 'text',
              label: 'The destination image file for lazy load (attribute data-original).',
              setup: function (type, element) {
                  var field = this;
                  field.setValue((element.getAttribute('data-original') !== null) ? element.getAttribute('data-original') : "");
              }
          }
                ]
            });
        }
    });

})();
