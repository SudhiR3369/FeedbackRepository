(function ($) {
    $.MessageTemplate = function (p) {
        p = $.extend
                ({
                    UserModuleID: '1'
                }, p);

        var MessageTemplate = {

            init: function () {
                var Editor;
                CKEDITOR.on("instanceReady", function (event) {
                     Editor = CKEDITOR.instances.txtBody;
                    MessageTemplate.LoadEditorDragDropEvent(Editor);
                });
                $('#btnPreviewMessage').on('click', function () { 
                    var RawMessage = Editor.getData();
                    MessageTemplate.ReplaceAllToken(RawMessage);
                });
            },
          
            LoadEditorDragDropEvent: function (Editor) {
                var CurDom = null;
                Editor.widgets.add('messageTemplate', {
                    upcast: function (element) {
                        // Defines which elements will become widgets.
                        if (element.hasClass('messageTemplate'))
                            return true;
                    },
                    editables: {
                        content: {
                            selector: '.content'
                        }
                    },
                    init: function () {
                        // ...
                    }
                });

                if (Editor != null && Editor != 'undefined') {
                   $('.component').on('dragstart', function drag($evt) {
                        CurDom = this;
                        if (navigator.userAgent.indexOf("Firefox") != -1)
                            $evt.originalEvent.dataTransfer.setData('text/plain', '');
                                     
                        var evt = { data: { $: $evt } };
                        CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
                        evt.data.dataTransfer.setData('text/plain', 'x')
                    });
                    editor.on('paste', function (evt) {
                        var rtf = evt.data.dataTransfer.getData('text/html');
                        
                        if (rtf) {
                            evt.data.dataValue = rtf;
                        }
                    });
                    Editor.on('drop', function (evt) {
                        var dataTransfer = evt.data.dataTransfer;
                        var DropContnentID = $(CurDom).data('dropid');
                        var ContentType = $(CurDom).data('content');
                        if (CurDom != null) {
                            if (DropContnentID == "ImagePopUp") {
                                $('.imageUploader').trigger('click');
                            }
                            else {
                                var NewHtml='';
                                if (ContentType == "component")
                                    NewHtml =$('#' + DropContnentID).html();
                                else                                  
                                     NewHtml = '<div class="messageTemplate" style="display:inline-bock;"><div class="content" style="display:inline-bock;">' + $('#' + DropContnentID).html() + '</div></div>';
                                dataTransfer.setData('text/html', NewHtml);
                                }
                            }
                            CurDom = null;
                        
                    });
                }
            },
            ShowPopUp: function (popupid, headertext) {             
                var options = {
                    modal: true,
                    title: headertext,
                  //  minHeight: 125,
                    minWidth: 750,
                    //maxWidth: 1000,
                    //maxHeight: 1000,
                    dialogClass: "sfMessagePreview",
                    resizable: true,
                    close: function (event, ui) {
                        $('div.sfUnsavedmodule').fadeOut();
                    }
                };
                dlg = $('#' + popupid).dialog(options);
                dlg.parent().appendTo($('form:first'));
            },
            ReplaceAllToken: function (RawMessage) {
                $.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    cache: false,
                    async: false,
                    url: SageFrameAppPath + '/Modules/Admin/MessageManagement/MessageTemplateWebService.asmx/ReplaceAllToken',
                    data: JSON2.stringify({
                        RawMessage: RawMessage,
                        sageFrameUser: SageFrameUserName,
                        PortalID:SageFramePortalID
                    }),
                    dataType: 'json',
                    success: function (data) {
                        var data = data.d
                        $('#divMessagePreview').html(data)
                        MessageTemplate.ShowPopUp('divMessagePreview', 'Message Preview')
                    },
                    error: function () {
                        alert('Server Error!!!');
                    }
                });
            },
                    
        }

        MessageTemplate.init();
    }

    $.fn.MessageTemplate = function (p) {
        $.MessageTemplate(p);
    };
})(jQuery);




