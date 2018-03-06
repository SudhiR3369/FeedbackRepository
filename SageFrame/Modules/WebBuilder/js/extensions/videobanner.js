var VideoBanner = {
    "VideoBanner": {
        "componentname": "VideoBanner",
        "category": "pro",
        "icon": "fa fa-play-circle-o",
        "row": true,
        "hidden": false,
        "type": "video",
        "defaultdata": EasyLibrary.ReadDOM("VideoText/youtubecom"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            var _this = this;
            _this.view.library.playbutton();
            if (dropped) {
                var $parent = $appendLayer.find('.youtubeVideoWrap');
                var $youtubeVideoTextMain = $parent.find('.youtubeVideoTextMain');

                var iframe = $parent.find('iframe');
                var url = iframe.attr('src');
                var urlAuto;
                if (url.includes("autoplay")) {
                    var position = url.indexOf("autoplay");
                    var substring = url.substr(position, url.length);
                    urlAuto = url.replace(substring, "autoplay=1");

                    $parent.find("iframe").attr('src', urlAuto + "&loop=1&showinfo=0&modestbranding=1&rel=0&mute=1&iv_load_policy=3&playlist=64N14KQaUZw");
                }
                else {
                    url = url + "&autoplay=1";
                }
                var $totalHeight = ($parent.height() - $parent.find('.youtubeVideoTextMain').height()) / 2;
                var textColor = $parent.find('.youtubeVideoTextMain').find('p').css('color', 'rgb(255, 255, 255)');
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("VideoText/youtubebasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var youTubeurl = 'https://www.youtube.com/embed/';
                        var url = '';
                        InitEvent();
                        function InitEvent() {
                            LoadSettings();
                            Events();
                            LoadSettingsOpacitySize();
                            OpacityColor();
                        }
                        function LoadSettings() {
                            var $iframeSrc = $parent.find('iframe');
                            var url = $iframeSrc.attr('src');
                            var id = GetYouTubeID(url);
                            $("#txtYoutubeLink").val(youTubeurl + id);
                            var isAllowFull = $iframeSrc.attr("data-fullscreen");
                            var controls = getParameterByName("controls", url);

                            if ($parent.hasClass('fullpagebanneryoutube')) {
                                $('#heightAdjustYoutubeVideo').prop('checked', true);
                            }
                            else {
                                $('#heightAdjustYoutubeVideo').prop('checked', false);
                            }
                            if ($parent.hasClass('enableplaybuttonvideobanner')) {
                                $('#EnablePlayButton').prop('checked', true);
                            }
                            else {
                                $('#EnablePlayButton').prop('checked', false);
                            }
                        }
                        function Events() {
                            $("#txtYoutubeLink").on("change", function () {
                                var link = $("#txtYoutubeLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the YouTube Link", 'Alert');
                                }
                                else {
                                    var id = GetYouTubeID(link);
                                    url = youTubeurl + id;
                                    var iframe = '';
                                    iframe += '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '?';
                                    iframe += 'controls=';
                                    if ($("#chkYouTubeControls").prop("checked")) {
                                        iframe += 1;
                                    }
                                    else {
                                        iframe += 0;
                                    }
                                    iframe += '&autoplay=1';
                                    iframe += '&loop=1';
                                    iframe += '&controls=0';
                                    iframe += '&showinfo=0';
                                    iframe += '&autohide=0';
                                    iframe += '&modestbranding=1';
                                    iframe += '&rel=0';
                                    iframe += '&mute=1'
                                    iframe += '&iv_load_policy=3';
                                    iframe += '&playlist=64N14KQaUZw';
                                    iframe += '"';
                                    if ($("#chkYouTubeAllowFullScreen").prop("checked")) {
                                        iframe += ' allowfullscreen data-fullscreen="1"';
                                    }
                                    else {
                                        iframe += ' data-fullscreen="1"';
                                    }
                                    iframe += ' >';
                                    iframe += '</iframe>';
                                    $parent.find(".youtubeVideoWrap").find('iframe').remove();
                                    $parent.find(".youtubeVideoWrap").find('.youtubeVideoTextMain').prepend(iframe);
                                    $parent.find('.youtubeVideoWrap').css('height', '100%');

                                    if ($parent.hasClass('enableplaybuttonvideobanner')) {
                                        $parent.find('.fonticon').parent().css('display', 'block');
                                    }
                                    else {
                                        $parent.find('.fonticon').parent().css('display', 'none');
                                    }

                                    component['VideoBanner'].view.library.playbutton();
                                }
                            });
                            $('#EnablePlayButton').off().on('click', function () {

                                if ($(this).is(':checked')) {
                                    $parent.addClass('enableplaybuttonvideobanner');
                                    $parent.find('.onhovercolor').show();
                                    $parent.find('.fonticon').parent().css('display', 'block');
                                }
                                else {
                                    $parent.removeClass('enableplaybuttonvideobanner');
                                    $parent.find('.fonticon').parent().css('display', 'none');
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

                        function LoadSettingsOpacitySize() {
                            var opacity = parseInt($parent.find('iframe').css('opacity') * 10);
                            function videobannerOpacitySlider(space) {
                                $parent.find('iframe').css('opacity', space / 10);
                            }
                            AdvanceSageSlider($('#opacitySize'), $('#opacitySizeHandle'), 1, 10, opacity, videobannerOpacitySlider, $parent, '');
                        }
                        function OpacityColor() {
                            $('.VideoBannerOpacityColorPicker.resOpacBg').css('background-color', $parent.find('.youtubeVideoWrap').attr('data-backgroundcolor'));

                            var objColor = '';
                            var colorOpacVidOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    objColor = RenderCallBackColor(this);
                                    if ($elm.hasClass('resOpacBg')) {
                                        $parent.css('background-color', objColor.bgColor);
                                    }
                                }
                            });
                            $('.VideoBannerOpacityColorPicker').colorPicker(colorOpacVidOption);
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                },
                "Height": {
                    "DOM": EasyLibrary.ReadDOM("VideoText/youtubeheight"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.youtubeVideoWrap');
                        var $MainParent = $parent.parent().parent();
                        init();
                        LoadSettings();
                        function init() {
                            if ($parent.hasClass('enablevideoheight')) {
                                $('#EnableVideoHeight').prop('checked', true);
                                $('#VideoHeight').show();
                            }
                            else {
                                $('#EnableVideoHeight').prop('checked', false);
                                $('#VideoHeight').hide();
                            }
                        }
                        function LoadSettings() {
                            var rowHeight = parseInt($MainParent.css('height').replace('px', ''));
                            function RowHeight(space) {
                                $MainParent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#youtubeVideoHeightSlider'), $('#youtubeVideoHeightHandle'), 20, 1100, rowHeight, RowHeight, $MainParent, 'px');
                        }
                        $('#refresYouTubeWidth').on('click', function () {
                            $MainParent.css({ 'height': '' });
                        });
                        var tempvalue = '';
                        $('#EnableVideoHeight').off().on('click', function () {
                            if ($(this).is(':checked')) {
                                $('#VideoHeight').show();
                                $parent.addClass('enablevideoheight');
                                videoheights = parseInt($MainParent.css('height').replace('px', ''));
                                ChangeSliderValue($('#youtubeVideoHeightSlider'), videoheights);
                            } else {
                                $('#VideoHeight').hide();
                                $parent.removeClass('enablevideoheight');
                                $MainParent.css('height', '');
                                tempvalue = $MainParent.css('height');
                            }
                        });
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "view": {
            "view": function () {
                this.library.playbutton();
            },
            "library":
                {
                    "playbutton": function () {
                        var _this = this;
                        $('.fonticon').off().on('click', function () {
                            var $this = $(this);
                            var displayElement = $this.parents('.VideoBanner').find('.youtubeVideoWrap').find('iframe')[0].outerHTML;
                            _this.displaycontent(displayElement);
                        });
                    },
                    "displaycontent": function ($content) {
                        FullPagePopup({
                            data: '<div class="sfCol_100" style="height:100%" >' + $content + '</div>',
                            heading: "Preview",
                            height: '60%',
                            width: '40%',
                            showheading: true,
                            onappend: function ($wrapper) {
                                $wrapper.find('iframe').css({ "height": "100%", "width": "100%", "opacity": "1" });
                            }
                        });
                    }
                }
        }
    }
}