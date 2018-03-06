var author = {
    "author": {
        "componentname": "author",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-user",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("authorview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
              $appendLayer.find('.editor-para').focus();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("authorbasicsetting"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.article-author-component');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        if ($parent.hasClass('display-inline-block'))
                            $('#slcDisplayAuthorSetting').val('display-inline-block');
                        else
                            $('#slcDisplayAuthorSetting').val('display-block');
                        $('#slcDisplayAuthorSetting').off().on('change', function () {
                            $parent.removeClass('display-inline-block');
                            $parent.removeClass('display-block');
                            $parent.removeClass('float-left');
                            var val = $(this).val();
                            $parent.addClass(val);
                            if (val == 'display-block')
                                $parent.addClass('float-left');
                        });
                        $('#chkAuthorIcon').off('change').on('change', function () {
                            if ($('#chkAuthorIcon').prop('checked')) {
                                $parent.find('.article-author-icon').removeClass('display-none');
                                $parent.find('.author-image').addClass('display-none');
                            }
                            else {
                                if ($('#chkAuthorImage').prop('checked') || $('#chkAuthorName').prop('checked')) {
                                    $parent.find('.article-author-icon').addClass('display-none');
                                }
                            }
                            initCheckboxValue();
                        });
                        $('#chkAuthorImage').off('change').on('change', function () {
                            if ($('#chkAuthorImage').prop('checked')) {
                                $parent.find('.author-image').removeClass('display-none');
                                $parent.find('.article-author-icon').addClass('display-none');
                            }
                            else {
                                if ($('#chkAuthorIcon').attr('checked') || $('#chkAuthorName').prop('checked')) {
                                    $parent.find('.author-image').addClass('display-none');
                                }
                            }
                            initCheckboxValue();
                        });
                        $('#chkAuthorName').off('change').on('change', function () {
                            if ($('#chkAuthorName').prop('checked')) {
                                $parent.find('.article-author-name').removeClass('display-none');
                            }
                            else {
                                if ($('#chkAuthorIcon').prop('checked') || $('#chkAuthorImage').prop('checked')) {
                                    $parent.find('.article-author-name').addClass('display-none');
                                }
                            }
                            initCheckboxValue();
                        });
                        function initCheckboxValue() {
                            if ($parent.find('.article-author-icon').hasClass('display-none'))
                                $('#chkAuthorIcon').prop('checked', false);
                            else
                                $('#chkAuthorIcon').prop('checked', true);
                            if ($parent.find('.author-image').hasClass('display-none'))
                                $('#chkAuthorImage').prop('checked', false);
                            else
                                $('#chkAuthorImage').prop('checked', true);
                            if ($parent.find('.article-author-name').hasClass('display-none'))
                                $('#chkAuthorName').prop('checked', false);
                            else
                                $('#chkAuthorName').prop('checked', true);



                        }
                        initCheckboxValue();
                    }
                },
                "Text": {
                    "DOM": EasyLibrary.ReadDOM("authortextsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.article-author-component');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        $parent = $parent.find('.article-author-name');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    }
                },
                "Image": {
                    "DOM": EasyLibrary.ReadDOM("authorImagesetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.article-author-component');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        $parent = $parent.find('.author-image');
                        var $image = $parent.find('img').eq(0);

                        LoadSettings();

                        function LoadSettings() {
                            ImageDisplay();
                            ImageWidthEvent();
                            ImageFitCover();
                        }

                        function ImageDisplay() {
                            var imageHeight = $parent.height();
                            var imageWidth = $parent.width();

                            if (imageHeight === imageWidth && $parent.hasClass('round-image')) {
                                $('.rectangleOption').hide();
                                $('.roundOption').show();
                                $('#imageDisplay').val('round');
                            } else {
                                $('.rectangleOption').show();
                                $('.roundOption').hide();
                                $('#imageDisplay').val('rectangle');
                            }
                            $('#imageDisplay').on('change', function () {
                                var $this = $(this);
                                var val = $this.val();
                                switch (val) {
                                    case 'round':
                                        $('.rectangleOption').hide();
                                        $('.roundOption').show();
                                        ChangeRoundImageWidth();
                                        $parent.addClass('round-image');
                                        break;
                                    case 'rectangle':
                                        $('.rectangleOption').show();
                                        $('.roundOption').hide();
                                        $image.css({ 'border-radius': '', 'width': $image.height(), 'height': $image.height() });
                                        $parent.css({
                                            'height': $image.height(),
                                            'width': $image.height(),
                                            'border-radius': ''
                                        });
                                        $('#imageRadiusSlider').slider('value', 0);
                                        $('#imageRadiusHandle').text(0);
                                        $('.changeFontSize').val($image.height());
                                        $parent.removeClass('round-image');
                                        break;
                                }
                            });

                            RoundImageWidth();
                        }




                        function RoundImageWidth() {
                            //'border-radius'
                            var roundImageWidth = 0;
                            var imgHeight = parseInt($parent.width());
                            var imgWidth = parseInt($parent.height());

                            roundImageWidth = imgWidth;
                            if (imgHeight < imgWidth) {
                                roundImageWidth = imgHeight;
                            }

                            function ImageBoxRadius(space) {
                                $image.css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });
                                $parent.css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });
                            }
                            AdvanceSageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 10, 200, roundImageWidth, ImageBoxRadius, $parent, 'px');
                        }

                        function ChangeRoundImageWidth() {
                            var roundImageWidth = 0;
                            var imgHeight = parseInt($parent.width());
                            var imgWidth = parseInt($parent.height());
                            roundImageWidth = imgWidth;
                            if (imgHeight < imgWidth) {
                                roundImageWidth = imgHeight;
                            }
                            $image.css({
                                'height': roundImageWidth + 'px',
                                'width': roundImageWidth + 'px',
                                'border-radius': '50%'
                            });
                            $parent.css({
                                'height': roundImageWidth + 'px',
                                'width': roundImageWidth + 'px',
                                'border-radius': '50%'
                            });
                            $('#imageRoundSlider').slider('value', roundImageWidth);
                            $('#imageRoundHandle').text(roundImageWidth);
                        }

                        function ImageWidthEvent() {

                            var imageWidth = $parent.width();
                            function ImageWidthSlider(space) {
                                var value = space + 'px';
                                $image.css({
                                    'height': value,
                                    'width': value,
                                });
                                $parent.css({
                                    'height': value,
                                    'width': value,

                                });
                            }
                            AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), 10, 200, imageWidth, ImageWidthSlider, $parent, '%');
                        }


                        function ImageFitCover() {
                            if ($parent.hasClass('fit-image')) {
                                $('#imageFittoCover').prop('checked', true);
                            } else {
                                $('#imageFittoCover').prop('checked', false);
                            }

                            $('#imageFittoCover').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('fit-image')
                                    //$image.css({
                                    //    'height':'',
                                    //    'width': '',

                                    //});
                                } else {
                                    var width = $parent.width() + 'px';
                                    //$image.css({
                                    //    'height': width,
                                    //    'width': width,
                                    //});
                                    $parent.removeClass('fit-image')
                                }
                            });
                        }
                    }
                },
                "Icon": {
                    "DOM": EasyLibrary.ReadDOM("authoriconsetting"),
                    "onload": function ($elem) {
                        var $IconDom = $elem.parents('.article-author-component').find('.article-author-icon i');
                        var fontSize = $IconDom.css('font-size').replace('px', '');
                        function AuthorIconHandler(space) {
                            $IconDom.css('font-size', space + 'px');
                        }
                        AdvanceSageSlider($('#authorIconslider'), $('#authorIconsliderHandle'), 0, 100, fontSize, AuthorIconHandler, $IconDom, 'px');
                        var colorOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $IconDom.css('color', objColor.bgColor)
                            }
                        })
                        $('#authorIconColorPic').colorPicker(colorOption);
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();

                    },

                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {

                        return $elem.parent().parent();
                    },
                },
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                },
                
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();
                return $parent;
            },
        },
        "replace": function ($ViewDom) {
            $ViewDom.find('.article-author-name p').text("##articleauthorname##");
            $ViewDom.find('.author-image >img').attr('src', "##authorimgsrc##");
            $ViewDom.find('.author-link').attr('href', "##authorprofilelink##");
            
        }
    }
}
