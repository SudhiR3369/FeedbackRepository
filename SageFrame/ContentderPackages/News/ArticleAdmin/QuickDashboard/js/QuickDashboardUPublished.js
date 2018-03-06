(function ($) {
    $.QDashboardUpSingleton = function (p) {

        p = $.extend({
            UserModuleID: '1',
            roleID: '',
            SiteID: 0
        }, p);

        var QDboardUP = {
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
                unpublishedStateID: '6,2',
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken, CultureCode: SageFrameCurrentCulture },
                adminRoles: ["228f0ad3-76b3-4585-a008-091ae667ad57", "910f0c31-e1dd-42d2-988b-545fe8621544"],
                roles: p.roleID.split(",")
            },
            init: function () {

                var addedBy = QDboardUP.checkRoles() ? "" : SageFrameUserName;

                QDboardUP.getUnpublishedNew(addedBy);
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: QDboardUP.config.type,
                    contentType: QDboardUP.config.contentType,
                    cache: QDboardUP.config.cache,
                    url: QDboardUP.config.baseURL + QDboardUP.config.method,
                    data: QDboardUP.config.data,
                    dataType: QDboardUP.config.dataType,
                    success: QDboardUP.config.successMethod,
                    error: QDboardUP.config.failureMethod,
                    async: QDboardUP.config.async
                });
            },

            getUnpublishedNew: function (addedBy) {
                QDboardUP.config.method = "GetArticleByStateID";
                QDboardUP.config.data = JSON.stringify({
                    authParam: QDboardUP.config.authParam,
                    stateID: QDboardUP.config.unpublishedStateID,
                    pageNumber: 0,
                    pageSize: 5,
                    roleID: p.roleID,
                    siteID: p.SiteID,
                    username: addedBy
                });
                QDboardUP.config.successMethod = QDboardUP.getUnpublishedNewSuccess;
                QDboardUP.config.failureMethod = QDboardUP.getUnpublishedNewFailure;
                QDboardUP.ajaxCall(QDboardUP.config);
            },

            getUnpublishedNewSuccess: function (data) {
                unpublishedNewsList = data.d;
                var upHtml = "";
                if (unpublishedNewsList != null && unpublishedNewsList.length > 0) {
                    $.each(unpublishedNewsList, function (key, value) {
                        upHtml += "<div class='box-content'>";
                        upHtml += "<div class='grid_listing'>";
                        upHtml += "<div class='grid_summary'>";
                        upHtml += "<div class='grid_summary_detail'>";
                        upHtml += "<div class='grid_detail_title--large'>";
                        upHtml += value.Title;
                        upHtml += "</div>";
                        upHtml += "<div class='grid_detail_newsproperties'>";
                        upHtml += "<small class='grid_detail_newsproperties_reporter'>";
                        upHtml += "<i class='fa fa-user'></i>";
                        upHtml += ArticleSetting.ChangeAuthorNameFormat(value.Author);
                        upHtml += "</small>";
                        if (value.FormatedDate != "") {
                            upHtml += "<small class='grid_detail_newsproperties_reporter_date'>";
                            upHtml += "<i class='fa fa-calendar'></i>";
                            upHtml += ArticleSetting.ChangeDateFormat(value.FormatedDate);
                            upHtml += "</small>";
                        }
                        upHtml += "<small class='grid_detail_newsproperties_reporter_category'>";
                        upHtml += "<strong>Category:</strong>";
                        upHtml += value.CategoryName;
                        upHtml += "</small>";
                        upHtml += "</div>";
                        upHtml += "</div>";
                        upHtml += "</div>";
                        upHtml += "</div>";
                        upHtml += "</div>";
                    });
                    $(".unpublishedpost").append(upHtml);
                } else {
                    $(".unpublishedpost").append("<p>There is no post in unpublished.</p>");
                }
            },

            getUnpublishedNewFailure: function () {
                $(".unpublishedpost").append("<p>Error while loading unpublished post list.</p>");
            },

            checkRoles: function () {
                isAdmin = false;
                var adminRole = QDboardUP.config.adminRoles;
                var currentRole = QDboardUP.config.roles;
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
        QDboardUP.init();
    };
    $.fn.CallQDboardUP = function (p) {
        $.QDashboardUpSingleton(p);
    };
})(jQuery);