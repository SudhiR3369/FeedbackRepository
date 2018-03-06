var RecycleBin;

(function ($) {

    $.RecycleBin = function (p) {
        p = $.extend({
            modulePath: '', DataObj: '', portalID: 0, userModuleID: ''
        }, p);
        RecycleBin = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/RecycleBin.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                portalID: p.portalID
            },
            init: function () {
                RecycleBin.BindEvents();
            },

            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: RecycleBin.config.type,
                    contentType: RecycleBin.config.contentType,
                    async: RecycleBin.config.async,
                    cache: RecycleBin.config.cache,
                    url: RecycleBin.config.url,
                    data: RecycleBin.config.data,
                    dataType: RecycleBin.config.dataType,
                    success: RecycleBin.config.ajaxCallMode,
                    error: RecycleBin.ajaxFailure
                });
            },

            BindEvents: function () {

            },

        };
        RecycleBin.init();
    }
    $.fn.RecycleBin = function (p) {
        $.RecycleBin(p);
    };
})(jQuery);

var PerformRestoreOperation = function (caller) {

    var returnValue = false;

    var tr = $(caller.parentNode.parentNode);
    var isDeletedByRole = $(tr).find("td").find(".spxItem").find("input").val();
    if (isDeletedByRole) {
        var returnPotin = ConfirmDialog(caller, 'Confirmation', 'Restoring this user will also restore the role(s) that this user was assigned to. Do you wish to proceed?');
        dialogConfirmed = false;
        return returnPotin;

    } else {
        var returnPotin = ConfirmDialog(caller, 'Do you wish to restore this user?');
        dialogConfirmed = false;
        return returnPotin;

    }

    return returnValue;
}
