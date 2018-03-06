(function ($) {
    $.CreateArticleSetting = function (p) {
        p = $.extend({
            UserModuleID: '1',
            SiteID: 0
        }, p);

        var ArticleSetting = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/ArticleAdmin/ArticleSetting/Services/ArticleSetting.asmx/",
                method: "",
                ajaxCallMode: 0,
                successMethod: "",
                failureMethod: "",
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken },
            },
            init: function () {
                ArticleSetting.onSaveSetting();
                ArticleSetting.getActivePortalPage();
                ArticleSetting.setDateFormat();
                ArticleSetting.getArticleSettings();
            },

            ajaxCall: function () {
                $.ajax({
                    type: ArticleSetting.config.type,
                    contentType: ArticleSetting.config.contentType,
                    cache: ArticleSetting.config.cache,
                    url: ArticleSetting.config.baseURL + ArticleSetting.config.method,
                    data: ArticleSetting.config.data,
                    dataType: ArticleSetting.config.dataType,
                    success: ArticleSetting.config.successMethod,
                    error: ArticleSetting.config.failureMethod,
                    async: ArticleSetting.config.async
                });
            },

            addUpdateSetting: function (settingValue) {
                ArticleSetting.config.method = "AddUpdateSetting";
                ArticleSetting.config.data = JSON.stringify({
                    authParam: ArticleSetting.config.authParam,
                    settingValue: settingValue,
                    siteID: p.SiteID,
                    isBlog: false
                });
                ArticleSetting.config.successMethod = ArticleSetting.addUpdateSettingSuccess;
                ArticleSetting.config.failureMethod = ArticleSetting.addUpdateSettingFailure;
                ArticleSetting.ajaxCall(ArticleSetting.config);
            },

            addUpdateSettingSuccess: function (data) {
                SageFrame.messaging.show("Setting saved successfully.", "success");
            },

            addUpdateSettingFailure: function () {
                SageFrame.messaging.show("Error occured while saving setting.", "error");
            },

            onSaveSetting: function () {
                $("#btnSaveSetting").click(function () {
                    var dateSettingValue = $("#dateSetting").val();
                    var nameSettingValue = $("#nameSetting").val();
                    var detailsPage = $("#detailsPage").val();
                    var userProfilePage = $("#userProfilePage").val();
                    var settingXml = "<articleSetting>";
                    settingXml += "<setting>";
                    settingXml += "<key>dateSetting</key>";
                    settingXml += "<value>" + dateSettingValue + "</value>";
                    settingXml += "</setting>";
                    settingXml += "<setting>";
                    settingXml += "<key>nameSetting</key>";
                    settingXml += "<value>" + nameSettingValue + "</value>";
                    settingXml += "</setting>";
                    settingXml += "<setting>";
                    settingXml += "<key>detailPageSetting</key>";
                    settingXml += "<value>" + detailsPage + "</value>";
                    settingXml += "</setting>";
                    settingXml += "<setting>";
                    settingXml += "<key>authorProfilePage</key>";
                    settingXml += "<value>" + userProfilePage + "</value>";
                    settingXml += "</setting>";
                    settingXml += "</articleSetting>";

                    ArticleSetting.addUpdateSetting(settingXml);
                });
            },

            getActivePortalPage: function () {
                ArticleSetting.config.method = "GetActivePortalPages";
                ArticleSetting.config.data = JSON.stringify({
                    authParam: ArticleSetting.config.authParam,
                    siteID: GetSiteID,
                });
                ArticleSetting.config.successMethod = ArticleSetting.getActivePortalPageSuccess;
                ArticleSetting.config.failureMethod = ArticleSetting.getActivePortalPageFailure;
                ArticleSetting.ajaxCall(ArticleSetting.config);
            },

            getActivePortalPageSuccess: function (data) {
                var pageList = data.d;
                var html = '';
                if (pageList != null) {
                    $.each(pageList, function (key, value) {
                        html += '<option value="' + value.PageName + '">' + value.PageName.replace(/-/g, ' ') + '</option>';
                    });
                } else {
                    html += '<option value="0">Page Not Available</option>';
                }
                $("#detailsPage, #userProfilePage").html(html);
            },

            getActivePortalPageFailure: function () {
                SageFrame.messaging.show("Error occured while loading pages.", "error");
            },

            setDateFormat: function () {
                formats = [
                    { dateValue: "yy-mm-dd", dateName: "2017-11-01" },
                    { dateValue: "mm/dd/yy", dateName: "11/01/2017" },
                    { dateValue: "dd MM, yy", dateName: "01 November, 2017" },
                    { dateValue: "DD, dd MM, yy ", dateName: "Wednesday, 01 November, 2017" }
                ];

                $.each(formats, function (key, value) {
                    $("#dateSetting").append($("<option></option>").val(value.dateValue).html(value.dateName));
                });

            },

            getArticleSettings: function () {
                ArticleSetting.config.method = "GetArticleSettings";
                ArticleSetting.config.data = JSON.stringify({
                    authParam: ArticleSetting.config.authParam,
                    siteID: p.SiteID
                });
                ArticleSetting.config.successMethod = ArticleSetting.getArticleSettingsSuccess;
                ArticleSetting.config.failureMethod = ArticleSetting.getArticleSettingsFailure;
                ArticleSetting.ajaxCall(ArticleSetting.config);
            },

            getArticleSettingsSuccess: function (data) {
                var settings = data.d;
                $.each(settings, function (key, value) {
                    switch (value.SettingKey) {
                        case 'dateSetting':
                            $("#dateSetting").val(value.SettingValue);
                            break;

                        case 'nameSetting':
                            $("#nameSetting").val(value.SettingValue);
                            break;

                        case 'detailPageSetting':
                            $("#detailsPage").val(value.SettingValue);
                            break;
                        case 'authorProfilePage':
                            $("#userProfilePage").val(value.SettingValue);
                    }
                });
            },

            getArticleSettingsFailure: function () {
                SageFrame.messaging.show("Error occured while loading settings.", "error");
            }
        };
        ArticleSetting.init();
    };
    $.fn.CallArticleSetting = function (p) {
        $.CreateArticleSetting(p);
    };
})(jQuery);