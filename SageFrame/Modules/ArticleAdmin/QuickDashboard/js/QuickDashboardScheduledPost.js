(function ($) {
    $.QDashboardSPSingleton = function (p) {

        p = $.extend({
            UserModuleID: '1',
            roleID: '',
            SiteID: 0
        }, p);

        var QDboardSP = {
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
                activeAgendaID: 0,
                scheduledPostStateID: 8,
                scheduledPostsPageNo: 1,
                scheduledPostStartDate: '',
                scheduledPostEndDate: '',
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken, CultureCode: SageFrameCurrentCulture },
                adminRoles: ["228f0ad3-76b3-4585-a008-091ae667ad57", "910f0c31-e1dd-42d2-988b-545fe8621544"],
                roles: p.roleID.split(","),
                addedBy: '',
                pageNumber: 0,
                pageSize: 5,
                offset: 0,
                rowTotal: 0
            },
            init: function () {

                QDboardSP.config.addedBy = QDboardSP.checkRoles() ? "" : SageFrameUserName;
                QDboardSP.getScheduledPosts();
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: QDboardSP.config.type,
                    contentType: QDboardSP.config.contentType,
                    cache: QDboardSP.config.cache,
                    url: QDboardSP.config.baseURL + QDboardSP.config.method,
                    data: QDboardSP.config.data,
                    dataType: QDboardSP.config.dataType,
                    success: QDboardSP.config.successMethod,
                    error: QDboardSP.config.failureMethod,
                    async: QDboardSP.config.async
                });
            },

            /**
             * Get articles based on stat id
            **/

            getArticleByStateID: function () {
                QDboardSP.config.method = "GetArticleByStateID";
                QDboardSP.config.data = JSON.stringify({
                    authParam: QDboardSP.config.authParam,
                    stateID: QDboardSP.config.scheduledPostStateID,
                    pageNumber: QDboardSP.config.offset,
                    pageSize: QDboardSP.config.pageSize,
                    roleID: p.roleID,
                    siteID: p.SiteID,
                    username: QDboardSP.config.addedBy
                });
                QDboardSP.ajaxCall(QDboardSP.config);
            },
            
            getScheduledPosts: function () {
                QDboardSP.config.pageNumber = 0;
                QDboardSP.config.offset = 0;
                QDboardSP.config.successMethod = QDboardSP.getScheduledPostsSuccess;
                QDboardSP.config.failureMethod = QDboardSP.getScheduledPostsFailure;
                QDboardSP.getArticleByStateID(0, QDboardSP.config.pageSize, 0, "", "");
            },

            getScheduledPostsSuccess: function (data) {
                var scheduledPostList = data.d;
                var spHtml = "";
                if (scheduledPostList != null && scheduledPostList.length > 0) {
                    $.each(scheduledPostList, function (key, value) {
                        spHtml += "<div class='box-content'>";
                        spHtml += "<div class='grid_listing'>";
                        spHtml += "<div class='grid_summary'>";
                        spHtml += "<div class='grid_summary_detail'>";
                        spHtml += "<div class='grid_detail_title--large'>";
                        spHtml += value.Title;
                        spHtml += "</div>";
                        spHtml += "<div class='grid_detail_newsproperties'>";
                        spHtml += "<small class='grid_detail_newsproperties_reporter'>";
                        spHtml += "<i class='fa fa-user'></i>";
                        spHtml += ArticleSetting.ChangeAuthorNameFormat(value.Author);
                        spHtml += "</small>";
                        spHtml += "<small class='grid_detail_newsproperties_reporter_date'>";
                        spHtml += "<i class='fa fa-calendar'></i>";
                        spHtml += ArticleSetting.ChangeDateFormat(value.FormatedDate);
                        spHtml += "</small>";
                        spHtml += "<small class='grid_detail_newsproperties_reporter_category'>";
                        spHtml += "<strong>Category:</strong>";
                        spHtml += value.CategoryName;
                        spHtml += "</small>";
                        spHtml += "</div>";
                        spHtml += "</div>";
                        spHtml += "</div>";
                        spHtml += "</div>";
                        spHtml += "</div>";
                    });
                    $("#spList").html(spHtml);
                } else {
                    $("#spList").html("<p>No post has been scheduled.</p>");
                }

            },

            getScheduledPostsFailure: function () {
                $("#spList").html("<p>Error while loading scheduled post list.</p>");
            },

            checkRoles: function () {
                isAdmin = false;
                var adminRole = QDboardSP.config.adminRoles;
                var currentRole = QDboardSP.config.roles;
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
        QDboardSP.init();
    };
    $.fn.CallQDboardSP = function (p) {
        $.QDashboardSPSingleton(p);
    };
})(jQuery);