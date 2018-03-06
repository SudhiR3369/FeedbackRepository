var youtube_video = {
    "youtube video": {
        "componentname": "youtube video",
        "category": "basic",
        "icon": "fa fa-youtube",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("youtubecom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {

            "tabs": {
                "News Video": {
                    "DOM": EasyLibrary.ReadDOM("youtubeNewsData"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();

                        var lstVideo = $('#divArticleAssets').find('.article-videos');
                        var videoHtml = '';
                        if (lstVideo.length > 0) {
                            videoHtml = lstVideo.parent().html();
                        } else {
                            videoHtml+='<p>No Video Available</p>'
                        }
                        $('#currentArVideoList').html(videoHtml);
                        $('#currentArVideoList').find('.article-videos').attr('title', 'Click to use this video');
                        $('#currentArVideoList').off().on('click', '.article-videos', function () {
                            var url = $(this).find('img').attr('data-url');
                            var autoPly = 0;
                            var contrl = 0;
                            if ($("#chkYouTubeAutoplay").prop('checked'))
                                autoPly = 1;
                            if ($("#chkYouTubeControls").prop('checked'))
                                contrl = 1;
                            url += '?controls=' + contrl + '&autoplay=' + autoPly
                            $("#chkYouTubeControls")
                            $parent.find('iframe').attr('src', url);
                           // $('#popupModel').find('.icon-icon-close').trigger('click');
                        })
                    }
                },
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("youtubebasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var youTubeurl = 'https://www.youtube.com/embed/';
                        var url = '';
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }

                        function LoadSettings() {
                            var $iframeSrc = $parent.find('iframe');
                            var url = $iframeSrc.attr('src');
                            var id = GetYouTubeID(url);
                            $("#txtYoutubeLink").val(youTubeurl + id);
                            var isAllowFull = $iframeSrc.attr("data-fullscreen");
                            if (parseInt(isAllowFull) == 1) {
                                $("#chkYouTubeAllowFullScreen").prop("checked", true);
                            } else {
                                $("#chkYouTubeAllowFullScreen").prop("checked", false);
                            }
                            var controls = getParameterByName("controls", url);
                            if (parseInt(controls) == 1) {
                                $("#chkYouTubeControls").prop("checked", true);
                            } else {
                                $("#chkYouTubeControls").prop("checked", false);
                            }

                            var autoPlay = getParameterByName("autoplay", url);
                            if (parseInt(autoPlay) == 1) {
                                $("#chkYouTubeAutoplay").prop("checked", true);
                            } else {
                                $("#chkYouTubeAutoplay").prop("checked", false);
                            }

                        }

                        function Events() {
                            $("#btnGenerateYouTube").on("click", function () {
                                var link = $("#txtYoutubeLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the YouTube Link", 'Alert');
                                } else {
                                    var id = GetYouTubeID(link);
                                    url = youTubeurl + id;
                                    var iframe = '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '?';
                                    iframe += 'controls=';
                                    if ($("#chkYouTubeControls").prop("checked")) {
                                        iframe += 1;
                                    } else {
                                        iframe += 0;
                                    }
                                    iframe += '&autoplay=';
                                    if ($("#chkYouTubeAutoplay").prop("checked")) {
                                        iframe += 1;
                                    } else {
                                        iframe += 0;
                                    }
                                    iframe += '"';
                                    if ($("#chkYouTubeAllowFullScreen").prop("checked")) {
                                        iframe += ' allowfullscreen data-fullscreen="1"';
                                    } else {
                                        iframe += ' data-fullscreen="0"';
                                    }
                                    iframe += ' >';
                                    iframe += '</iframe>';
                                    $parent.find(".youtubeVideoWrap").html(iframe);
                                }
                            });
                        }

                        function getParameterByName(name, url) {
                            name = name.replace(/[\[\]]/g, "\\$&");
                            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                                results = regex.exec(url);
                            if (!results) return null;
                            if (!results[2]) return '';
                            return decodeURIComponent(results[2].replace(/\+/g, " "));
                        }

                        function GetYouTubeID(url) {
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);

                            if (match && match[2].length == 11) {
                                return match[2];
                            } else {
                                return 'error';
                            }
                        }

                    }
                },
                "Adjust Height": {
                    "DOM": EasyLibrary.ReadDOM("youtubeheight"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.youtubeVideoWrap');
                        LoadSettings();

                        function LoadSettings() {
                            var rowHeight = $parent.css('height').replace('px', '');

                            function RowHeight(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#youtubeVideoHeightSlider'), $('#youtubeVideoHeightHandle'), 200, 1200, rowHeight, RowHeight, $parent, 'px');
                        }
                        $('#refresYouTubeWidth').on('click', function () {
                            $parent.css({ 'height': '' });
                        });
                    }
                }

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }
}
