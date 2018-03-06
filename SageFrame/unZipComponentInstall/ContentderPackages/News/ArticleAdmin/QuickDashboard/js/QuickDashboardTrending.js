(function ($) {
    $.CreateTrend = function (p) {

        p = $.extend({
            UserModuleID: '1',
            SiteID: 0
        }, p);

        var Trend = {
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
                ajaxCallMode: 0,
                successMethod: "",
                failureMethod: "",
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken, CultureCode: SageFrameCurrentCulture }
            },
            init: function () {
                Trend.getTrendingPost();
            },

            ajaxCall: function () {
                $.ajax({
                    type: Trend.config.type,
                    contentType: Trend.config.contentType,
                    cache: Trend.config.cache,
                    url: Trend.config.baseURL + Trend.config.method,
                    data: Trend.config.data,
                    dataType: Trend.config.dataType,
                    success: Trend.config.successMethod,
                    error: Trend.config.failureMethod,
                    async: Trend.config.async
                });
            },

            getTrendingPost: function () {
                Trend.config.method = "GetTrendingArticle";
                Trend.config.data = JSON.stringify({
                    authParam: Trend.config.authParam,
                    siteID: p.SiteID
                });
                Trend.config.successMethod = Trend.getTrendingPostSuccess;
                Trend.config.failureMethod = Trend.getTrendingPostFailure;
                Trend.ajaxCall(Trend.config);
            },

            getTrendingPostSuccess: function (data) {
                trendingList = data.d;
                var trendHtml = "<ul>";
                if (trendingList != null && trendingList.length > 0) {
                    $.each(trendingList, function (key, value) {
                        trendHtml += '<li>';
                        trendHtml += '<div class="box-content">';
                        trendHtml += '<div class="grid_summary_detail">';
                        trendHtml += '<div class="grid_summary_image">';
                        trendHtml += '<div class="grid_summary_socialactivity">';
                        trendHtml += '</div>';
                        trendHtml += '<img src="' + value.FileName + '" />';
                        trendHtml += '</div>';
                        trendHtml += '<div class=" grid_detail_title--large ">';
                        trendHtml += '<a href="' + ArticleSetting.GetDetailsURL(value.ArticleID, value.Title) + '">' + value.Title + '</a>';
                        trendHtml += '</div>';
                        trendHtml += '<div class="grid_detail_title ">';
                        trendHtml += value.Summary;
                        trendHtml += '</div>';
                        trendHtml += '<div class="grid_detail_newsproperties">';
                        trendHtml += '<small class="grid_detail_newsproperties_reporter">';
                        trendHtml += '<i class="fa fa-user"></i>';
                        trendHtml += ArticleSetting.ChangeAuthorNameFormat(value.Author);
                        trendHtml += '</small>';
                        trendHtml += '<small class="grid_detail_newsproperties_reporter_date">';
                        trendHtml += '<i class="fa fa-calendar"></i>';
                        trendHtml += ArticleSetting.ChangeDateFormat(value.FormatedDate);
                        trendHtml += '</small>';
                        trendHtml += '<small class="grid_detail_newsproperties_reporter_category">';
                        trendHtml += '<strong>Category:</strong>';
                        trendHtml += value.CategoryName;
                        trendHtml += '</small>';
                        trendHtml += '</div>';
                        trendHtml += '</div>';
                        trendHtml += '</div>';
                        trendHtml += '</li>';
                    });
                    trendHtml += '</ul>';
                    $(".trendingList").append(trendHtml);
                } else {
                    $(".trendingList").append("<p>Currently there is no post in trending.</p>");
                }
            },

            getTrendingPostFailure: function () {
                $(".trendingList").html("<p>Error while loading trending post.</p>");
            }
        };
        Trend.init();
    };
    $.fn.CallTrend = function (p) {
        $.CreateTrend(p);
    };
})(jQuery);