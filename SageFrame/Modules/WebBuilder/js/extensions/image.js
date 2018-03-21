var image = {
    "image": {
        "componentname": "image",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-img-1",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        "defaultdata": DOMCreate('div', '<img src="' + webbuildermodulepath + '/img/def5.jpg"  class="editor-image sfCol_100" />' + EasyLibrary.ReadDOM("imageoption"), 'editor-component image sfCol_100'),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped)
                $appendLayer.find('.image-settings').trigger('click');
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("imagebasictab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        //var $image = $parent.children().not('div').eq(0);
                        var $image = $parent.find('img').eq(0);
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        LoadSettings();
                         
                        function LoadSettings() {
                            ImageDisplay();
                            ImageWidthEvent();
                            ImageBorder();
                            ImageFitCover();
                        }


                        function ImageDisplay() {
                            var imageHeight = $parent.height();
                            var imageWidth = $parent.width();
                            var imageRadius = parseInt($parent.css('border-top-left-radius').replace('%', ''));
                            if (imageHeight === imageWidth && imageRadius > 0) {
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
                                        $image.css({ 'border-radius': '', 'width': '', 'height': $image.height() });
                                        $parent.css({
                                            'height': $image.height(),
                                            'width': '',
                                            'border-radius': ''
                                        });
                                        $('#imageRadiusSlider').slider('value', 0);
                                        $('#imageRadiusHandle').text(0);
                                        $('.changeFontSize').val($image.height());
                                        $parent.removeClass('round-image');
                                        break;
                                }
                            });

                            ManualHeightEntryEvents();
                            ImageBoxRadius();
                            RoundImageWidth();
                        }

                        function ManualHeightEntryEvents() {
                            $('#refresImageWidth').on('click', function () {
                                $parent.css({ 'height': '' });
                                $image.css({ 'height': '' });
                                setTimeout(function () {
                                    var holderheights = $image.height();
                                    ChangeSliderValue($('#imageHeightSlider'), holderheights);
                                }, 500);
                            });
                            var imgHeight = $image.height();

                            function ImageHeight(space) {
                                $image.css({ 'height': space });
                                $parent.css({ 'height': space });
                            }
                            AdvanceSageSlider($('#imageHeightSlider'), $('#imageHeightHandle'), 1, 1200, imgHeight, ImageHeight, $parent, 'px');
                            var imageOriHeight = $image.height();
                            $('.changeFontSize').val(imageOriHeight);
                            $('.changeFontSize').off().on('keyup', function (event) {
                                var $this = $(this);
                                var imageSize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        imageSize = imageSize + 1;
                                        $(this).val(imageSize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        imageSize = imageSize - 1;
                                        $(this).val(imageSize);
                                        break;
                                }
                                if (imageSize < minImagesize) {
                                    imageSize = minImagesize;
                                    $this.val(minImagesize);
                                }
                                if (imageSize > maxImagesize) {
                                    imageSize = maxImagesize;
                                    $this.val(maxImagesize);
                                }
                                //$this.focus().select();
                                $image.css({ 'height': imageSize });
                                $parent.css({ 'height': imageSize });
                            });
                            $('.increaseFontSize').off().on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                            });
                            $('.decreaseFontSize').off().on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function ImageBoxRadius() {
                            //'border-radius'
                            var boxRadius = 0;
                            boxRadius = $parent.attr('border-radius');

                            function ImageBoxRadius(space) {
                                $parent.css({ 'border-radius': space + 'px' });
                                $image.css({ 'border-radius': space + 'px' });
                            }
                            AdvanceSageSlider($('#imageRadiusSlider'), $('#imageRadiusHandle'), 0, 100, boxRadius, ImageBoxRadius, $parent, 'px');
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
                            AdvanceSageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 0, 1200, roundImageWidth, ImageBoxRadius, $parent, 'px');
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

                        function ImageBorder() {
                            var imageBorderStyle = $parent[0].style.borderStyle; //.css('border-style');
                            $('#imgBorderStyle').val(imageBorderStyle);
                            if (imageBorderStyle.length === 0 || imageBorderStyle === 'none') {
                                $('.imgborder').hide();
                            } else {
                                $('.imgborder').show();
                            }

                            $('#imgBorderStyle').on('change', function () {
                                var style = $(this).val();
                                $parent.css('border-style', style);
                                if (style === 'none') {
                                    $('.imgborder').hide();
                                    $parent.css("border-width", '0px');
                                    $('#imgBorderSlider').slider('value', 0);
                                    $('#imgBorderHandle').text(0);
                                } else {
                                    $('.imgborder').show();
                                    var imgBordeVal = parseInt($('#imgBorderHandle').text());
                                    if (imgBordeVal == 0)
                                        imgBordeVal = 1;
                                    $parent.css("border-width", imgBordeVal + 'px');
                                    $('#imgBorderSlider').slider('value', imgBordeVal);
                                    $('#imgBorderHandle').text(imgBordeVal);
                                }
                            });

                            var imgBorderWidth = $parent[0].style.borderWidth; // $parent.css("border-width");
                            if (imgBorderWidth.length > 0) {
                                imgBorderWidth = parseInt(imgBorderWidth.replace('px', ''));
                            } else {
                                imgBorderWidth = 1;
                            }

                            function RowSepHeight(space) {
                                $parent.css("border-width", space + 'px');
                            }
                            AdvanceSageSlider($('#imgBorderSlider'), $('#imgBorderHandle'), 1, 10, imgBorderWidth, RowSepHeight, $parent, 'px');
                            ImgBorderColor();
                        }

                        function ImgBorderColor() {
                            $('#imgBorderColor').css('background-color', $parent[0].style.borderColor);
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.css({ 'border-color': objColor.bgColor });
                                }
                            });
                            $('#imgBorderColor').colorPicker(colorPickerOption);
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
                                } else {
                                    $parent.removeClass('fit-image')
                                }
                            });
                        }
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent();
                            }
                        },
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent().not('div').eq(0);
                            }
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent(); //.children().not('div').eq(0);
                        //return $elem.parent().parent().find('.image');//.not('div').eq(0);
                        //return $elem.parent().parent();//.children().not('div').eq(0);
                    },
                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent().parent(); //.children().not('div').eq(0);
                    },
                },
                "Box Radius": {
                    "options": {
                        "max": 500,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        //return $elem.parent().parent();//.children().not('div').eq(0);
                        return $elem.parent().parent().children().not('div').eq(0);
                    },
                },
                "Box Shadow": {
                    "options": {

                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent().children().not('div').eq(0);
                    },
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                },
                "Hover Effect": {
                    "options": {
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {
                                //return $parent;
                            },
                        },
                        "zoom": "on"
                    },
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-component").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-component");
                $parent.addClass("activeSetting");
                return $parent;
            },
        },
        "view": {
            "view": function () {
                this.library.one();
            },
            "library": {
                "one": function () {

                }
            }
        }
    }
}
