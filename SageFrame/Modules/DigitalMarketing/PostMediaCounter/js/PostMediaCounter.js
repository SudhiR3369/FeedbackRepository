
var PostMediaCounter;
(function ($) {
    $.PostMediaCounter = function (p) {
        p = $.extend({
            modulePath: '', DataObj: '', portalID: 0, userModuleID: ''
        }, p);
        PostMediaCounter = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/PostMediaCounterService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID
            },
            init: function () {
                PostMediaCounter.RefreshCounter();
            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: PostMediaCounter.config.type,
                    contentType: PostMediaCounter.config.contentType,
                    async: PostMediaCounter.config.async,
                    cache: PostMediaCounter.config.cache,
                    url: PostMediaCounter.config.url,
                    data: PostMediaCounter.config.data,
                    dataType: PostMediaCounter.config.dataType,
                    success: PostMediaCounter.config.ajaxCallMode,
                    error: PostMediaCounter.ajaxFailure
                });
            },

            RefreshCounter: function () {
                PostMediaCounter.config.url = PostMediaCounter.config.baseURL + "LoadPostMediaCounter";
                PostMediaCounter.config.data = {};
                PostMediaCounter.config.ajaxCallMode = PostMediaCounter.LoadPostMediaCounterCallBack;
                PostMediaCounter.config.async = false;
                PostMediaCounter.ajaxCall(PostMediaCounter.config);
            },

            IsOdd: function (count) {
                return count % 2;
            },

            LoadPostMediaCounterCallBack: function (data) {

                if (data.d !== null && data.d !== '' && data.d.length > 0) {

                    var posts = data.d;
                    var html = '';

                    for (var item = 0; item < posts.length; item++) {
                        var destination = posts[item].Destination.toLowerCase();

                        html += '<div class="postMediaCounterItem">';

                        html += '<div>';
                        html += '<i class="fa fa-' + destination + ' fa-3x socialIdentifier" aria-hidden="true"></i>';
                        html += '<div><h4>' + posts[item].Posts + '</h4></div>';

                        var attributeName = '';
                        switch (destination) {
                            case 'twitter': attributeName = 'Tweets'; break;

                            default: attributeName = 'Posts'; break;

                        }
                       

                        html += '</div>';

                        html += '</div>';

                    }

                    $('#dvPostMediCounterContent').html(html);

                } else {
                    alert('No data');
                }
            }
        };
        PostMediaCounter.init();
    };
    $.fn.PostMediaCounter = function (p) {
        $.PostMediaCounter(p);
    };
})(jQuery);
