(function ($) {
    $.QDashboardStatSingleton = function (p) {
        var p = $.extend({
            UserModuleID: '1',
            roleID: '',
            SiteID: 0
        }, p);
        var QDboardStat = {
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
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken, CultureCode: SageFrameCurrentCulture },
                roles: p.roleID
            },
            init: function () {
                QDboardStat.getArticleStatistics();
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: QDboardStat.config.type,
                    contentType: QDboardStat.config.contentType,
                    cache: QDboardStat.config.cache,
                    url: QDboardStat.config.baseURL + QDboardStat.config.method,
                    data: QDboardStat.config.data,
                    dataType: QDboardStat.config.dataType,
                    success: QDboardStat.config.successMethod,
                    error: QDboardStat.config.failureMethod,
                    async: QDboardStat.config.async
                });
            },

            getArticleStatistics: function () {
                QDboardStat.config.method = "GetArticleStatistics";
                QDboardStat.config.data = JSON.stringify({
                    authParam: QDboardStat.config.authParam,
                    roleID: QDboardStat.config.roles,
                    siteID: p.SiteID
                });
                QDboardStat.config.successMethod = QDboardStat.getArticleStatisticsSuccess;
                QDboardStat.config.failureMethod = QDboardStat.getArticleStatisticsFailure;
                QDboardStat.ajaxCall(QDboardStat.config);
            },

            getArticleStatisticsSuccess: function (data) {
                data = data.d;
                if (data != null) {

                    var totalHold = data.TotalHold;
                    var totalHoldPercentage = totalHold == 0 ? 0 : (totalHold / data.GrandTotal) * 100;
                    var totalPublished = data.TotalPublish;
                    var totalPublishedPercentage = totalPublished == 0 ? 0 :  (totalPublished / data.GrandTotal) * 100;

                    var totalRejected = data.TotalRejected;
                    var TotalRejectedPercentage = totalRejected == 0 ? 0 : (totalRejected / data.GrandTotal) * 100;

                    $("#publishedValues").html("<div class='counter_value'>" + totalPublished + "</div><div class='counter_title'>Published</div><div class='news-stats' data-percent='" + totalPublishedPercentage.toFixed(1) + "%'><div class='stat-bar'></div></div><div class='counter_amount'>" + totalPublishedPercentage.toFixed(1) + "%</div>");
                    $("#UnpublishedValues").html("<div class='counter_value'>" + totalRejected + "</div><div class='counter_title'>Unpublished</div><div class='news-stats' data-percent='" + TotalRejectedPercentage.toFixed(1) + "%'><div class='stat-bar'></div></div><div class='counter_amount'>" + TotalRejectedPercentage.toFixed(1) + "%</div>");
                    $("#onHoldValues").html("<div class='counter_value'>" + totalHold + "</div><div class='counter_title'>On Hold</div><div class='news-stats' data-percent='" + totalHoldPercentage.toFixed(1) + "%'><div class='stat-bar'></div></div><div class='counter_amount'>" + totalHoldPercentage.toFixed(1) + "%</div>");

                    QDboardStat.animateStat();
                }
            },

            getArticleStatisticsFailure: function () {

            },

            animateStat: function () {
                $('.news-stats').each(function () {
                    $(this).find('.stat-bar').animate({
                        width: $(this).attr("data-percent")
                    }, 6000);
                });
            }
        };
        QDboardStat.init();
    };
    $.fn.CallQDboardStat = function (p) {
        $.QDashboardStatSingleton(p);
    };
})(jQuery);