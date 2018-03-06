(function ($) {
    $.CreateMostComment = function (p) {

        p = $.extend({
            UserModuleID: '1',
            SiteID: 0
        }, p);

        var MostComment = {
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
                MostComment.getMostCommentedPost();
            },

            ajaxCall: function () {
                $.ajax({
                    type: MostComment.config.type,
                    contentType: MostComment.config.contentType,
                    cache: MostComment.config.cache,
                    url: MostComment.config.baseURL + MostComment.config.method,
                    data: MostComment.config.data,
                    dataType: MostComment.config.dataType,
                    success: MostComment.config.successMethod,
                    error: MostComment.config.failureMethod,
                    async: MostComment.config.async
                });
            },

            getMostCommentedPost: function () {
                MostComment.config.method = "GetMostCommentedArticle";
                MostComment.config.data = JSON.stringify({
                    authParam: MostComment.config.authParam,
                    siteID: p.SiteID
                });
                MostComment.config.successMethod = MostComment.getMostCommentedPostSuccess;
                MostComment.config.failureMethod = MostComment.getMostCommentedPostFailure;
                MostComment.ajaxCall(MostComment.config);
            },

            getMostCommentedPostSuccess: function (data) {
                mostCommentedPostList = data.d;
                var articleHtml = "";
                if (mostCommentedPostList != null && mostCommentedPostList.length > 0) {
                    $.each(mostCommentedPostList, function (key, value) {
                        articleHtml += "<div class='box-content box-content--commented'>";
                        articleHtml += "<div class='commented_image'>";
                        articleHtml += "<div class='grid_summary_socialactivity'>";
                        articleHtml += "</div>";
                        articleHtml += "<img src='" + value.FileName +"' />";
                        articleHtml += "</div>";
                        articleHtml += "<div class='grid_summary_detail'>";
                        articleHtml += "<div class='grid_detail_title--large'>";
                        articleHtml += '<a href="'  + ArticleSetting.GetDetailsURL(value.ArticleID, value.Title) + '">' + value.Title + '</a>';
                        articleHtml += "</div>";
                        articleHtml += "<div class='grid_detail_newsproperties'>";
                        articleHtml += "<small class='grid_detail_newsproperties_reporter'>";
                        articleHtml += "<i class='fa fa-user'></i>";
                        articleHtml += ArticleSetting.ChangeAuthorNameFormat(value.Author);
                        articleHtml += "</small>";
                        articleHtml += "<small class='grid_detail_newsproperties_reporter_date'>";
                        articleHtml += "<i class='fa fa-calendar'></i>";
                        articleHtml += ArticleSetting.ChangeDateFormat(value.FormatedDate);
                        articleHtml += "</small>";
                        articleHtml += "<small class='grid_detail_newsproperties_reporter_category'>";
                        articleHtml += "<strong>Category:</strong>";
                        articleHtml += value.CategoryName;
                        articleHtml += "</small>";
                        articleHtml += "</div>";
                        articleHtml += "</div>";
                        articleHtml += "</div>";
                    });
                    $(".commentedpost").append(articleHtml);
                } else {
                    $(".commentedpost").append("<p>Currently there is no post with comment.</p>");
                }
            },

            getMostCommentedPostFailure: function () {
                $(".commentedpost").append("<p>Error while loading most commented post.</p>");
            }
        };
        MostComment.init();
    };
    $.fn.CallMostComment = function (p) {
        $.CreateMostComment(p);
    };
})(jQuery);