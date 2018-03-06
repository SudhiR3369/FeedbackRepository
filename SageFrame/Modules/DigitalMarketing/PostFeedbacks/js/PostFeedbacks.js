/// <reference path="../../../../js/jquery-1.9.1.js" />


var PostFeedBacks;
(function ($) {
    $.PostFeedBacks = function (p) {
        p = $.extend({
            modulePath: '', DataObj: '', portalID: 0, userModuleID: ''
        }, p);
        PostFeedBacks = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/PostFeedBacksService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID
            },
            init: function () {
                PostFeedBacks.InitEvents();
                PostFeedBacks.RefreshTrendingPosts();
            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: PostFeedBacks.config.type,
                    contentType: PostFeedBacks.config.contentType,
                    async: PostFeedBacks.config.async,
                    cache: PostFeedBacks.config.cache,
                    url: PostFeedBacks.config.url,
                    data: PostFeedBacks.config.data,
                    dataType: PostFeedBacks.config.dataType,
                    success: PostFeedBacks.config.ajaxCallMode,
                    error: PostFeedBacks.ajaxFailure
                });
            },

            InitEvents: function () {
                SageFrame.tooltip.GetToolTip("imgTrendingPostInfo", ".trendingPostHeader", "The top trending posts gaining more user activities (likes, shares, comments)");

                $('.refreshFeedBacks').on('click', function () {
                    PostFeedBacks.RefreshTrendingPosts();
                });
            },
            RefreshTrendingPosts: function () {
                $('#dvGeneral').html('');
                PostFeedBacks.config.url = PostFeedBacks.config.baseURL + "LoadPostFeedbacks";
                PostFeedBacks.config.data = {};
                PostFeedBacks.config.ajaxCallMode = PostFeedBacks.LoadPostFeedbacksCallBack;
                PostFeedBacks.config.async = false;
                PostFeedBacks.ajaxCall(PostFeedBacks.config);
            },

            IsOdd: function (count) {
                return count % 2;
            },

            LoadPostFeedbacksCallBack: function (data) {

                if (data.d != null && data.d != '' && data.d.length > 0) {
                    var posts = data.d;

                    var html = '';
                    html += '<table>';
                    html += '<tbody>';
                    html += '<tr>';
                    html += '<td>Posts</td>';
                    html += '<td>Shares</td>';
                    html += '<td>Likes</td>';
                    html += '<td>Posted On</td>';
                    html += '<td></td>';
                    //html += '<td></td>';

                    html += '</tr>';

                    for (var item = 0; item < posts.length; item++) {
                        var className = '';

                        if (item % 2) className = 'sfEven';
                        else className = 'sfOdd';

                        //posts[item].MessageID
                        //posts[item].PostResponseID
                        //posts[item].UserChoiceID
                        //posts[item].CreatedOn

                        var partMessage = posts[item].Message;
                        if (partMessage.length > 70) partMessage = partMessage.substring(0, 70) + ' ...';

                        html += '<tr class="' + className + '">';
                        html += '<td>';
                        html += '<label class="sfFormlabel">' + partMessage + '</label>';
                        html += '</td>';
                        html += '<td><span>' + posts[item].Share_Count + '</span></td>';
                        html += '<td><span>' + posts[item].Favourite_Count + '</span></td>';
                        html += '<td>' + posts[item].addedon + '</td>';
                        //html += '<td>1/4/2017</td>';

                        var desitination = posts[item].Destination.toLowerCase();

                        switch (desitination) {
                            case "twitter":
                                html += '<td><a class="fa fa-twitter" href="https://twitter.com/shopivoclient/status/' + posts[item].MessageID + '" target="_blank"></a></td>';
                                break;

                            case "facebook":
                                var postID = posts[item].MessageID.split("_")[1];
                                html += '<td><a class="fa fa-facebook" href="https://www.facebook.com/permalink.php?story_fbid=' + postID + '&id=100014676157376&match=I2ZpbGlwaW5vcw%3D%3D" target="_blank"></a></td>';
                                break;

                            case "linkedin":
                                html += '<td><a class="fa fa-linkedin" href="#" target="_blank"></a></td>';
                                break;

                            default:
                                html += '<td><a class="fa fa-star-o" href="#" target="_blank"></a></td>';
                                break;
                        }
                        //html += '<td><a class="icon-preview" href="#" target="_blank"></a></td>';
                        html += '</tr>';

                    }
                    html += '</tbody>';
                    html += '</table>';


                    $('#dvGeneral').html(html);

                } else {
                    alert('No data');
                }
            },
        };
        PostFeedBacks.init();
    }
    $.fn.PostFeedBacks = function (p) {
        $.PostFeedBacks(p);
    };
})(jQuery);
