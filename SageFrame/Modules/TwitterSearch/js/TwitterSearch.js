var TwitterSearch;


(function ($) {
    var searchValue = '';
    var sortCode = "0";
    var jsonResponse = [];
    $.TwitterSearch = function (p) {
        p = $.extend({
            modulePath: '', DataObj: ''
        }, p);

        TwitterSearch = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/TwitterSearchService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID
            },

            init: function () {
                searchValue = '';
                TwitterSearch.ClearForm();
                TwitterSearch.AutoSearchPosts();
            },

            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },

            ajaxCall: function (config) {
                $.ajax({
                    type: TwitterSearch.config.type,
                    contentType: TwitterSearch.config.contentType,
                    async: TwitterSearch.config.async,
                    cache: TwitterSearch.config.cache,
                    url: TwitterSearch.config.url,
                    data: TwitterSearch.config.data,
                    dataType: TwitterSearch.config.dataType,
                    success: TwitterSearch.config.ajaxCallMode,
                    error: TwitterSearch.ajaxFailure
                });
            },
            ClearForm: function () {
                jsonResponse = [];
                $('#searchContainer').empty();
            },

            AutoSearchPosts: function () {
                TwitterSearch.config.url = TwitterSearch.config.baseURL + "AutoSearchPosts";
                TwitterSearch.config.data = JSON2.stringify({ parameters: '' });
                TwitterSearch.config.ajaxCallMode = TwitterSearch.ProcessResult;
                TwitterSearch.config.async = true;
                TwitterSearch.ajaxCall(TwitterSearch.config);
            },

            ProcessResult: function (data) {
                if (data.d != null || data.d != '') {

                    var html = '';
                    var searchItems = data.d;
                    for (var i = 0; i < searchItems.length; i++) {
                        switch (searchItems[i].key) {

                            case "google":
                                html += TwitterSearch.GenerateGooglePostTemplate(searchItems[i].SearchResult);
                                break;

                            case "twitter":
                                html += TwitterSearch.GenerateTwitterPostTemplate(searchItems[i].SearchResult);
                                break;

                            default:
                                break;
                        }
                    }

                    $('#searchContainer').html(html);

                } else {
                    TwitterSearch.ClearForm();
                }

            },


            // TWITTER TEMPLATE
            GenerateTwitterPostTemplate: function (response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    html += '<div>';
                    html += '<img class="tw_userImage" src="' + response[i].user.profile_image_url + '" alt="' + response[i].user.screen_name + '">';
                    html += '<br/>';
                    html += 'Source : Twitter';
                    html += '<br/>';
                    html += 'User : ' + response[i].user.name;
                    html += '<br/>';
                    html += 'Tweet : ' + response[i].text;
                    html += '<br/>';

                    html += 'Date : ' + response[i].created_at;
                    html += '<br/>';

                    html += 'Screen Name : ' + response[i].user.screen_name;
                    html += '<br/>';
                    html += 'Retweets : ' + response[i].retweet_count;
                    html += '<br/>';
                    html += 'Favourites : ' + response[i].favorite_count;
                    html += '</div>';
                }
                return html;
            },
            // GOOGLE TEMPLATE
            GenerateGooglePostTemplate: function (response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    html += '<div>';
                    html += '<img class="tw_userImage" src="' + response[i].actor.image.url + '" alt="' + response[i].actor.displayName + '">';
                    html += '<br/>';
                    html += 'Source : Google+';
                    html += '<br/>';
                    html += 'User : ' + response[i].actor.displayName;
                    html += '<br/>';
                    html += 'Title :' + response[i].title;
                    html += '<br/>';
                    if (response[i].object.attachments) {
                        html += 'Post : ' + response[i].object.attachments[0].content;
                        html += '<br/>';
                        html += '<img class="tw_userPostImage" src="' + response[i].object.attachments[0].image.url + '" alt="' + response[i].object.attachments[0].displayName + '">';
                        html += '<br/>';

                    }

                    html += 'Date : ' + response[i].published;
                    html += '<br/>';
                    html += 'Replies : ' + response[i].object.replies.totalItems;

                    html += '<br/>';
                    html += 'Reshares : ' + response[i].object.resharers.totalItems;
                    html += '</div>';
                }
                return html;
            }
        };
        TwitterSearch.init();

    }
    $.fn.TwitterSearch = function (p) {
        $.TwitterSearch(p);
    };

})(jQuery);


