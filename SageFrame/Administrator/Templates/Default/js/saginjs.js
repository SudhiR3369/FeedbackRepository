String.Format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}
//TO  be call from serverside for confirmation
var dialogConfirmed = false;
function ConfirmDialog(obj, title, dialogText) {
    var def = $.Deferred();
    if (!dialogConfirmed) {
        $('body').append(String.Format("<div id='dialog-confirm' title='{0}'><p>{1}</p></div>",
                    title, dialogText));
        $('#dialog-confirm').dialog
                ({
                    height: 110,
                    modal: true,
                    resizable: false,
                    draggable: false,
                    close: function (event, ui) { $('body').find('#dialog-confirm').remove(); },
                    buttons:
                    {
                        "Yes": {
                            click: function () {
                                $(this).dialog('close');
                                dialogConfirmed = true;
                                if (obj) obj.click();
                            },
                            text: 'Yes',
                            class: 'smlbtn-succ icon-update'
                        },
                        "No": {
                            click: function () {
                                $(this).dialog("close");
                            },
                            text: 'No',
                            class: 'smlbtn-danger icon-close'
                        }
                    },
                    open: function (event, ui) {
                        $('.ui-dialog-title').before('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
                    }
                });
    }
    return dialogConfirmed;
}
//TO  be call from cientSide to alert message with title
function SageAlertDialog(dialogText, title) {
    if (typeof (title) == 'undefined' || title.length == 0) {
        title = 'Alert';
    }
    $('body').append(String.Format("<div id='dialog-confirm' title='{0}'><p>{1}</p></div>",
                title, dialogText));
    $('#dialog-confirm').dialog
            ({
                height: 110,
                modal: true,
                resizable: false,
                draggable: false,
                close: function (event, ui) { $('body').find('#dialog-confirm').remove(); },
                buttons:
                {
                    "OK": {
                        click: function () {
                            $(this).dialog('close');
                        },
                        text: 'OK',
                        class: 'smlbtn-succ icon-update'
                    },
                },
                open: function (event, ui) {
                    $('.ui-dialog-title').before('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>');
                }
            });
}
//TO  be call from cientSide to confirm
function SageConfirmDialog(dialogText, title, closeCallback) {
    if (typeof (title) === 'undefined' || title.length === 0) {
        title = 'Confirmation';
    }
    var def = $.Deferred();
    $('body').append(String.Format("<div id='dialog-confirm' title='{0}'><p>{1}</p></div>",
                title, dialogText));
    $('#dialog-confirm').dialog
            ({
                height: 110,
                modal: true,
                resizable: false,
                draggable: false,
                close: function (event, ui) {
                    $('body').find('#dialog-confirm').remove();
                    if (typeof closeCallback !== "undefined")
                        closeCallback();
                },
                buttons:
                {
                    "Yes": {
                        click: function () {
                            def.resolve();
                            $(this).dialog('close');
                        },
                        text: 'Yes',
                        class: 'fa smlbtn-succ icon-update'
                    },
                    "No": {
                        click: function () {
                            def.reject();
                            $(this).dialog("close");
                        },
                        text: 'No',
                        class: 'fa smlbtn-danger icon-close'
                    }
                },
                open: function (event, ui) {
                    $('.ui-dialog-title').before('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
                }
            });
    return def.promise();
}
//To be call when default Dialog box is needed
$.fn.SimpleDialog = function (option, dialogExtendOptions) {
    var screen_res = screen.width;
    var align = (screen_res - 800) / 2;
    var options = $.extend(
        {
            "title": "title",
            "width": 400,
            "height": 600,
            "resizable": false,
            "modal": true,
            "position": [align, 150],
            "z-index": 500,
            "close": function () {

            },
            "appendTo": "form",
            "open": function () {
            }
        }, option);

    var dialogOptions = {
        "title": options.title,
        "width": options.width,
        "height": options.height,
        "modal": options.modal,
        "resizable": options.resizable,
        //"position": options.position,
        "z-index": options["z-index"],
        "close": options.close,
        "appendTo": options.appendTo
    };
    //dialog-extend options
    //var dialogExtendOptions = {
    //    "maximize": true,
    //    "minimize": false
    //};
    //open dialog
    if (typeof (dialogExtendOptions) !== 'undefined' && dialogExtendOptions.length > 0) {
        $(this).dialog(dialogOptions).dialogExtend(dialogExtendOptions);
    }
    else {
        $(this).dialog(dialogOptions);
    }
    //$('div.ui-dialog').css("z-index", "3000");
    //$('div.ui-dialog').resizable('destroy');
}

function pageLoad(sender, args) {
    if (args.get_isPartialLoad()) {
        String.Format = function () {
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                s = s.replace(reg, arguments[i + 1]);
            }
            return s;
        }
        var dialogConfirmed = false;
        function ConfirmDialog(obj, title, dialogText) {
            if (!dialogConfirmed) {
                $('body').append(String.Format("<div id='dialog-confirm' title='{0}'><p>{1}</p></div>",
                    title, dialogText));
                if (title == "message") {
                    $('#dialog-confirm').dialog
                    ({
                        height: 110,
                        modal: true,
                        resizable: false,
                        draggable: false,
                        close: function (event, ui) { $('body').find('#dialog-confirm').remove(); },
                        buttons:
                        {
                            'OK': function () {
                                $(this).dialog('close');
                            }
                        }
                    });
                }
                else {
                    $('#dialog-confirm').dialog
                    ({
                        height: 110,
                        modal: true,
                        resizable: false,
                        draggable: false,
                        close: function (event, ui) { $('body').find('#dialog-confirm').remove(); },
                        buttons:
                        {
                            'Yes': function () {
                                $(this).dialog('close');
                                dialogConfirmed = true;
                                if (obj) obj.click();
                            },
                            'No': function () {
                                $(this).dialog('close');
                            }
                        }
                    });
                }
            }
            return dialogConfirmed;
        }
    }
}
$(function () {
    $('.ajax__tab_tab').off().on("click", function () {
        var index = $('span.ajax__tab_active').index();
        $('.ajax__tab_body').find('.ajax__tab_panel').eq(index).find('div.sfCollapsewrapper div.sfCollapsecontent').eq(0).show();
        //$('.ajax__tab_body').find('.ajax__tab_panel').eq(index).find('div.sfCollapsewrapper div.sfAccordianholder').removeClass("Active");
        //$('.ajax__tab_body').find('.ajax__tab_panel').eq(index).find('div.sfCollapsewrapper div.sfAccordianholder').eq(0).addClass("Active");
    });
});
$(function () {
    $('div.sfCollapsecontent').hide();
    //$('div.sfCollapsewrapper div.sfCollapsecontent').show();
    $('div.sfCollapsewrapper div.sfCollapsecontent').eq(0).show();
    $('div.sfCollapsewrapper div.sfAccordianholder').eq(0).addClass("Active");
    $('div.sfAccordianholder').off().on("click", function () {
        if (!$(this).hasClass("Active")) {

            $(this).addClass("Active");
            $(this).parent().next("div").slideDown("fast");
        }
        else {
            $(this).removeClass("Active");
            $(this).parent().next("div").slideUp("fast");
        }
    });

    $('div.sfInformationcontent:first').show();
    $('div.sfInformationholder:first').addClass("Active");
    $('div.sfInformationheader').on("click", function () {
        $(this).next("div").slideToggle("fast", function () {
            if (!$(this).closest("div.sfInformationholder").hasClass("Active")) {
                $(this).closest("div.sfInformationholder").addClass("Active");
            }
            else if ($(this).closest("div.sfInformationholder").hasClass("Active")) {
                $(this).closest("div.sfInformationholder").removeClass("Active");
            }
            $("div.sfInformationholder").not($(this).closest("div.sfInformationholder")).removeClass("Active");
        });
        $('div.sfInformationcontent').not($(this).next("div")).slideUp("fast");
    });   
    $('.ChangeSmallLogo').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        $('#fileUploadWrap').SimpleDialog({
            "title": "Change  small logo",
            "width": 400,
        });
    });
    $('.chkShowVersion').find('input').on("click", function () {
        var checked = $(this).is(':checked');
        $('.hdnVersionShow').val("");
        $('.hdnVersionShow').val(checked);
    });
});
function ScrollToTop() {
    $(document).scrollTop(0);
}
function ClearClientCache() {
    window.applicationCache.swapCache();
    //window.addEventListener('load', function (e) {
    //    window.applicationCache.addEventListener('updateready', function (e) {
    //        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    //            // Browser downloaded a new app cache.
    //            // Swap it in and reload the page to get the new hotness.
    //            window.applicationCache.swapCache();                
    //        } else {

    //        }
    //    }, false);

    //}, false);
}

//Append Element

function AjaxLoadingShow() {
    $('#ajaxBusy').css({
        "opacity": 1,
        "z-index": 99999
    });
}
function AjaxLoadingHide() {
    $('#ajaxBusy').css({
        "opacity": 0,
        "z-index": -1
    });
}


function LabelAfterCheckBox() {
    var $checkboxList = $("body input[type='checkbox']");
    $checkboxList.each(function () {
        var $this = $(this);
        var $labelNext = $this.next();
        if (typeof ($labelNext) === 'undefined') {
            $this.after('<label></label>');
        }
        else if ($labelNext == null) {
            $this.after('<label></label>');
        }
        else if (typeof ($labelNext[0]) === 'undefined') {
            $this.after('<label></label>');
        }
        else if ($labelNext[0].tagName.toLowerCase() != 'label') {
            $this.after('<label></label>');
        }
    });
}


LabelAfterCheckBox();

//ajax ajax busy control added and called on ajax loading and ending
$('body').append('<div id="ajaxBusy" style="opacity:0;z-index:-1;"><img align="absmiddle"  src="' + SageFrameAppPath + '/Administrator/Templates/Default/images/ajax-loader.gif"></div>');
$(document).ajaxStart(function () {
    AjaxLoadingShow();
}).ajaxStop(function () {
    AjaxLoadingHide();
});
$(document).ajaxComplete(function () {
    AjaxLoadingHide();
});
$(function () {


    $('.formKey').on('click', '.sfFormlabel', function () {
        $(this).parent().next().children('input[type="text"],input[type="password"],textarea').focus();
    });

    $('.formValue input[type="text"] ,input[type="password"], textarea').focusin(function () {
        $(this).parent().parent().addClass('fieldActive');

    });
    $('.formValue input[type="text"],input[type="password"],textarea').focusout(function () {
        var ThatInput = this;
        setTimeout(function () {
            if ($(ThatInput).val() != "")
                $(ThatInput).parent().parent().addClass('fieldComplete');
            else {
                $(ThatInput).parent().parent().removeClass('fieldComplete');
                $(ThatInput).parent().parent().removeClass('fieldActive');
            }
        }, 200);
    });
    IsMaterialFrom = false;
    FormFieldComplete();
})
function FormFieldComplete() {
    $('.sfFormwrapper .formValue select').each(function () {
        var isMultiple = $(this).attr('multiple');
        if (isMultiple == null || isMultiple == undefined || isMultiple != 'multiple')
            $(this).parent().parent().children('.formKey').addClass('selectKey');
    });
    $('.sfFormwrapper .formValue input[type="text"]').each(function () {
        AddFormCompleteClass(this);
    });
    $('.sfFormwrapper .formValue input[type="password"]').each(function () {
        AddFormCompleteClass(this);
    });
    $('.sfFormwrapper .formValue textarea').each(function () {
        AddFormCompleteClass(this);
    });
    function AddFormCompleteClass(ThatInput) {
        $(ThatInput).parent().parent().children('.formKey').addClass('textType');
        if ($(ThatInput).val() != "") {
            $(ThatInput).parent().parent().addClass('fieldComplete');
        }
        else if ($(ThatInput).is(":focus")) {
            $(ThatInput).parent().parent().addClass('fieldActive');
        }
        else {
            $(ThatInput).parent().parent().removeClass('fieldActive fieldComplete');
        }
    };
    $("input[type='file']").change(function () {
        var path = $(this).val();
        if (path != '' && path != null) {
            var name = path.substring(path.lastIndexOf('\\') + 1);
            $(this).next('label').attr('data-content', name);
        }
    });
}
