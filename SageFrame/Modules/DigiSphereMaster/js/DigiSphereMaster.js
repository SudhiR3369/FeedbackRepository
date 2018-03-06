/// <reference path="../../../../js/jquery-1.9.1.js" />

var DigiSphereMaster;
(function ($) {

    $.DigiSphereMaster = function (p) {
        p = $.extend(
            {
                modulePath: '', DataObj: '', portalID: 0, userModuleID: ''
            }, p);
        DigiSphereMaster = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/DigiSphereMaster.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                masterDomain: p.MasterDomain
            },
            init: function () {

            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: DigiSphereMaster.config.type,
                    contentType: DigiSphereMaster.config.contentType,
                    async: DigiSphereMaster.config.async,
                    cache: DigiSphereMaster.config.cache,
                    url: DigiSphereMaster.config.url,
                    data: DigiSphereMaster.config.data,
                    dataType: DigiSphereMaster.config.dataType,
                    success: DigiSphereMaster.config.ajaxCallMode,
                    error: DigiSphereMaster.ajaxFailure
                });
            },

            BindEvents: function () {

                $('#btnAddSector').on('click', function () {

                });

                $('#btnAddSitetype').on('click', function () {
                  
                });

            },

        };

        DigiSphereMaster.init();
    }

    $.fn.DigiSphereMaster = function (p) {
        $.DigiSphereMaster(p);
    };

})(jQuery);