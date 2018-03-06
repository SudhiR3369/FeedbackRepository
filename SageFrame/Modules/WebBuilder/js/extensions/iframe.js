var iframe = {
    "iFrame": {
        "componentname": "iFrame",
        "category": "advance",
        "icon": "fa fa-window-maximize",
        "row": false,
        "hidden": false,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("iFrame/iFrame"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            //if (dropped) {
            var $parent = $appendLayer.find('.iFrameWrap')

            var iframe = $parent.find('iframe');
            var url = iframe.attr('src');
            //$parent.find('.iFrameWrap').css('height', '100%');
            //$parent.attr('style');
            //}
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("iFrame/iFrameBasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $iframeSrc = $parent.find('iframe');
                        var url = $iframeSrc.attr('src');
                        $("#txtiFrameLink").val(url);

                        InitEvent();
                        function InitEvent() {
                            Events();
                            LoadSettingsSize();
                        }
                        function LoadSettingsSize() {
                            var sfiFrameWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            var iFrameWidth = 100;
                            if (sfiFrameWidth !== null) {
                                iFrameWidth = sfiFrameWidth[0].split('_')[1];
                            }

                            function iFrameWidthSlider(space) {
                                var iFrameWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if (iFrameWidthClass !== null) {
                                    $parent.removeClass(iFrameWidthClass[0]).addClass('sfCol_' + space);
                                } else {
                                    $parent.addClass('sfCol_' + space);
                                }
                            }
                            AdvanceSageSlider($('#iFrameBasicWidth'), $('#iFrameBasicWidthHandle'), 1, 100, iFrameWidth, iFrameWidthSlider, $parent, '%');
                            var Height = parseInt($parent.find('.iFrameWrap').css('height').replace('px', ''))
                            function iFrameHeightSlider(space) {
                                $parent.find('.iFrameWrap').css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#iFrameBasicHeight'), $('#iFrameBasicHeightHandle'), 1, 1280, Height, iFrameHeightSlider, $parent, 'px');
                        }
                        function ImageWidthEvent() {
                            var sfImageWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            var imageWidth = 100;
                            if (sfImageWidth !== null) {
                                imageWidth = sfImageWidth[0].split('_')[1];
                            }

                            function ImageWidthSlider(space) {
                                var imageWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if (imageWidthClass !== null) {
                                    $parent.removeClass(imageWidthClass[0]).addClass('sfCol_' + space);
                                } else {
                                    $parent.addClass('sfCol_' + space);
                                }
                            }
                            AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), minFontSize, maxFontsize, imageWidth, ImageWidthSlider, $parent, '%');
                        }
                        function Events() {
                            $("#txtiFrameLink").on("change", function () {
                                var link = $("#txtiFrameLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the Link", 'Alert');
                                }
                                else {
                                    url = link;
                                    var iframe = '';
                                    iframe += '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '"';
                                    iframe += ' >';
                                    iframe += '</iframe>';

                                    $parent.find(".iFrameWrap").html(iframe);
                                    //$parent.find('.iFrameWrap').css('height', '400px');
                                    //$parent.find('.iFrameWrap').attr('style');
                                }
                            });
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }

}