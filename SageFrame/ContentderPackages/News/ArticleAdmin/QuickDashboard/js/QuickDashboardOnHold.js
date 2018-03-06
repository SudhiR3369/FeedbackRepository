(function ($) {
    $.QDashboardOnHoldSingleton = function (p) {

        p = $.extend({
            UserModuleID: '1',
            roleID: '',
            SiteID: 0
        }, p);

        var QDboardOnHold = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/ArticleAdmin/QuickDashboard/Services/QuickDashboardService.asmx/",
                method: "",
                successMethod: "",
                failureMethod: "",
                ajaxCallMode: 0,
                onhoStateld: 7,
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken, CultureCode: SageFrameCurrentCulture },
                adminRoles: ["228f0ad3-76b3-4585-a008-091ae667ad57", "910f0c31-e1dd-42d2-988b-545fe8621544"],
                roles: p.roleID.split(",")
            },
            init: function () {
                var addedBy = QDboardOnHold.checkRoles() ? "" : SageFrameUserName;
                QDboardOnHold.getOnHoldNews(addedBy);
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: QDboardOnHold.config.type,
                    contentType: QDboardOnHold.config.contentType,
                    cache: QDboardOnHold.config.cache,
                    url: QDboardOnHold.config.baseURL + QDboardOnHold.config.method,
                    data: QDboardOnHold.config.data,
                    dataType: QDboardOnHold.config.dataType,
                    success: QDboardOnHold.config.successMethod,
                    error: QDboardOnHold.config.failureMethod,
                    async: QDboardOnHold.config.async
                });
            },

            getOnHoldNews: function (addedBy) {
                QDboardOnHold.config.method = "GetArticleByStateID";
                QDboardOnHold.config.data = JSON.stringify({
                    authParam: QDboardOnHold.config.authParam,
                    stateID: QDboardOnHold.config.onhoStateld,
                    pageNumber: 0,
                    pageSize: 5,
                    roleID: p.roleID,
                    siteID: p.SiteID,
                    username: addedBy
                });
                QDboardOnHold.config.successMethod = QDboardOnHold.getOnHoldNewsSuccess;
                QDboardOnHold.config.failureMethod = QDboardOnHold.getOnHoldNewsFailure;
                QDboardOnHold.ajaxCall(QDboardOnHold.config);
            },

            getOnHoldNewsSuccess: function (data) {
                onHoldList = data.d;
                var ohHtml = "";
                if (onHoldList != null && onHoldList.length > 0) {
                    $.each(onHoldList, function (key, value) {
                        ohHtml += "<div class='box-content'>";
                        ohHtml += "<div class='grid_listing'>";
                        ohHtml += "<div class='grid_summary'>";
                        ohHtml += "<div class='grid_summary_detail'>";
                        ohHtml += "<div class='grid_detail_title--large'>";
                        ohHtml += value.Title;
                        ohHtml += "</div>";
                        ohHtml += "<div class='grid_detail_newsproperties'>";
                        ohHtml += "<small class='grid_detail_newsproperties_reporter'>";
                        ohHtml += "<i class='fa fa-user'></i>";
                        ohHtml += ArticleSetting.ChangeAuthorNameFormat(value.Author);
                        ohHtml += "</small>";
                        if (value.FormatedDate != "") {
                            ohHtml += "<small class='grid_detail_newsproperties_reporter_date'>";
                            ohHtml += "<i class='fa fa-calendar'></i>";
                            ohHtml += ArticleSetting.ChangeDateFormat(value.FormatedDate);
                            ohHtml += "</small>";
                        }
                        ohHtml += "<small class='grid_detail_newsproperties_reporter_category'>";
                        ohHtml += "<strong> Category:</strong>";
                        ohHtml += value.CategoryName;
                        ohHtml += "</small>";
                        ohHtml += "</div>";
                        ohHtml += "</div>";
                        ohHtml += "</div>";
                        ohHtml += "</div>";
                        ohHtml += "</div>";
                    });
                    $(".holdpost").append(ohHtml);
                } else {
                    $(".holdpost").append("<p>There is no post in onhold.</p>");
                }
            },

            getOnHoldNewsFailure: function () {
                $(".holdpost").append("<p>Error while loading onhold post list.</p>");
            },

            checkRoles: function () {
                isAdmin = false;
                var adminRole = QDboardOnHold.config.adminRoles;
                var currentRole = QDboardOnHold.config.roles;
                for (var i = 0; i < adminRole.length; i++) {
                    if ($.inArray(adminRole[i], currentRole) === -1) {
                        isAdmin = false;
                    } else {
                        isAdmin = true;
                        break;
                    }
                }
                return isAdmin;
            }
        };
        QDboardOnHold.init();
    };
    $.fn.CallQDboardOnHold = function (p) {
        $.QDashboardOnHoldSingleton(p);
    };
})(jQuery);