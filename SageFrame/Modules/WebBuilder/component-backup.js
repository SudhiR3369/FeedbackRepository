var component = {
    //use this demo component to build a new component
    /* Component  detail
    'componentname': name of the component to be display
    'category': name of the category(tab/accordion) the component is to be in 
    'defaultdata': component default data after component is  dropped
    'settingDOM': component settings
     'onDrop': function ($appendLayer) {
        // when the component is dropped this event is called
    },
    'loadSetting': function ($item) {
        //when the setting icon is hit this is executed
    }
    */
    "demoComponent": {
        "componentname": "demoComponent",
        "category": "line",
        "componentBlockDOM": "",
        "componentIcon": "",
        "row": false,
        "hidden": true,
        "defaultdata": $('#rowline').html(),
        "settingDOM": $('#imageOptions').html(),
        "onDrop": function ($appendLayer) {
        },
        "loadSetting": function ($item) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                    {
                        "DOM": "<span>Hello</span>",
                        "load": function ($parent) {

                        }
                    },
                "Background":
                    {
                        "options": ["image", "color"]
                    },
                "Spacing":
                    {
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
                        }

                    },
                "Alignment":
                    {
                        "options": ["left", "center", "right"]
                    },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius":
                    {
                        "options": {
                            "max": 50,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                        }
                    },
                "Box Shadow":
                    {
                        "options": {

                        }
                    }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    },
    'image': {
        'componentname': 'image',
        'category': '',
        'defaultdata': '<div class="editor-component image sfCol_100">' + imageOption + '<img src="/modules/webbuilder/img/robot.jpg"  class="editor-image sfCol_100"></div>',
        'settingDOM': $('#imageOptions').html(),
        'loadSetting': function ($item) {
            var $parent = $item.parent().parent();
            $parent = $parent.children().not('div').eq(0);
            $('.editor-component').find('.activeSetting').removeClass('activeSetting');
            $parent.addClass('activeSetting');

            //var $image = $parent.children().not('div').eq(0);
            LoadSettings();
            InitEvents();
            function InitEvents() {
                InitTab();
                ImageWidthEvent();
                AlignmentEvent();
                Spacing();
                ImageDisplay();
                ImageBorder();
            }
            function LoadSettings() {
                Alignment();
            }
            function ImageDisplay() {
                var imageHeight = $parent.height();
                var imageWidth = $parent.width();
                var imageRadius = $parent.css('border-radius');
                if (imageHeight === imageWidth && imageRadius === '50%') {
                    $('.rectangleOption').hide();
                    $('.roundOption').show();
                    $('#imageDisplay').val('round');
                }
                else {
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
                            break;
                        case 'rectangle':
                            $('.rectangleOption').show();
                            $('.roundOption').hide();
                            $parent.css({ 'border-radius': '', 'width': '', 'height': $parent.height() });
                            $parent.parent().css({
                                'height': $parent.height(),
                                'width': '',
                                'border-radius': ''
                            });
                            $('#imageRadiusSlider').slider('value', 0);
                            $('#imageRadiusHandle').text(0);
                            $('.changeFontSize').val($parent.height());
                            break;
                    }
                });

                ManualHeightEntryEvents();
                ImageBoxRadius();
                RoundImageWidth();
            }

            function ImageWidthEvent() {
                var sfImageWidth = $parent.parent().attr('class').match(/sfCol_[0-9]{1,3}/g);
                var imageWidth = 100;
                if (sfImageWidth !== null) {
                    imageWidth = sfImageWidth[0].split('_')[1];
                }
                var handleFontSize = $("#imagesizeHandle");
                $("#imagesizeSlider").slider({
                    range: "max",
                    min: minFontSize,
                    max: maxFontsize,
                    value: imageWidth,//mrgTop,
                    create: function () {
                        var size = $(this).slider("value");
                        handleFontSize.text(size);
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleFontSize.text(space);
                        var imageWidthClass = $parent.parent().attr('class').match(/sfCol_[0-9]{1,3}/g);
                        if (imageWidthClass !== null) {
                            $parent.parent().removeClass(imageWidthClass[0]).addClass('sfCol_' + space);
                        }
                        else {
                            $parent.parent().addClass('sfCol_' + space);
                        }
                    }
                });
            }

            function Alignment() {
                var alignmentClasses = $parent.parent().attr('class').match(/com-float-[a-z]{4,6}/g);
                var alignClass = '';
                if (alignmentClasses !== null) {
                    alignClass = alignmentClasses[0];
                }
                $('.alignmentWrapper').find('i[data-class="' + alignClass + '"]').addClass('selected');
            }
            function AlignmentEvent() {
                $('.alignmentWrapper i').on('click', function () {
                    var $this = $(this);
                    var alignmentClasses = $parent.parent().attr('class').match(/com-float-[a-z]{4,6}/g);
                    var alignClass = '';
                    if (alignmentClasses !== null) {
                        alignClass = alignmentClasses[0];
                        $parent.parent().removeClass(alignClass);
                    }
                    $parent.parent().addClass($this.attr('data-class'));
                    $('.alignmentWrapper i').removeClass('selected');
                    $this.addClass('selected');
                });
            }
            function Spacing() {

                var imagemarginMax = 15;//15 means 15* 10
                var imagemarginMin = -15;
                //topMarginSlider

                var $spacingLay = $parent.parent();
                var marginTopClasses = $spacingLay.attr('class').match(/editor-img-outer-top-space-[0-9]{1,3}/g);
                var padTop = 0;
                if (marginTopClasses !== null) {
                    padTop = parseInt(marginTopClasses[0].trim().replace('editor-img-outer-top-space-', ''));
                }
                else {
                    marginTopClasses = $spacingLay.attr('class').match(/editor-img-outer-top-space-neg[0-9]{1,3}/g);
                    padTop = 0;
                    if (marginTopClasses !== null) {
                        padTop = -parseInt(marginTopClasses[0].trim().replace('editor-img-outer-top-space-neg', ''));
                    }
                }

                var marginRightClasses = $spacingLay.attr('class').match(/editor-img-outer-right-space-[0-9]{1,3}/g);
                var padRight = 0;
                if (marginRightClasses !== null) {
                    padRight = parseInt(marginRightClasses[0].trim().replace('editor-img-outer-right-space-', ''));
                }
                else {
                    marginRightClasses = $spacingLay.attr('class').match(/editor-img-outer-right-space-neg[0-9]{1,3}/g);
                    padRight = 0;
                    if (marginRightClasses !== null) {
                        padRight = -parseInt(marginRightClasses[0].trim().replace('editor-img-outer-right-space-neg', ''));
                    }
                }
                var marginBottomClasses = $spacingLay.attr('class').match(/editor-img-outer-bottom-space-[0-9]{1,3}/g);
                var padBot = 0;
                if (marginBottomClasses !== null) {
                    padBot = parseInt(marginBottomClasses[0].trim().replace('editor-img-outer-bottom-space-', ''));
                }
                else {
                    marginBottomClasses = $spacingLay.attr('class').match(/editor-img-outer-bottom-space-neg[0-9]{1,3}/g);
                    padBot = 0;
                    if (marginBottomClasses !== null) {
                        padBot = -parseInt(marginBottomClasses[0].trim().replace('editor-img-outer-bottom-space-neg', ''));
                    }
                }

                var marginLeftClasses = $spacingLay.attr('class').match(/editor-img-outer-left-space-[0-9]{1,3}/g);
                var padLeft = 0;
                if (marginLeftClasses !== null) {
                    padLeft = parseInt(marginLeftClasses[0].trim().replace('editor-img-outer-left-space-', ''));
                }
                else {
                    marginLeftClasses = $spacingLay.attr('class').match(/editor-img-outer-left-space-neg[0-9]{1,3}/g);
                    padLeft = 0;
                    if (marginLeftClasses !== null) {
                        padLeft = -parseInt(marginLeftClasses[0].trim().replace('editor-img-outer-left-space-neg', ''));
                    }
                }

                function GetMarginClass(reg) {
                    return $parent.attr('class').match(reg);
                }

                function ImgMarginTop(space) {
                    var marginClass = $spacingLay.attr('class').match(/editor-img-outer-top-space-[0-9]{1,3}/g);
                    var removeClass = '';
                    var addClass = '';
                    if (marginClass !== null) {
                        removeClass = marginClass[0].trim();
                        $spacingLay.removeClass(removeClass);
                    }
                    else {
                        marginClass = $spacingLay.attr('class').match(/editor-img-outer-top-space-neg[0-9]{1,3}/g);
                        if (marginClass !== null) {
                            removeClass = marginClass[0].trim();
                            $spacingLay.removeClass(removeClass);
                        }
                    }
                    if (space >= 0) {
                        $spacingLay.addClass('editor-img-outer-top-space-' + space);
                    }
                    else {
                        space = Math.abs(space);
                        $spacingLay.addClass('editor-img-outer-top-space-neg' + space);
                    }
                }
                SageSlider($('#imagetopMarginSlider'), $('#imagetopMarginHandle'), imagemarginMin, imagemarginMax, padTop, ImgMarginTop);

                function ImgMarginRight(space) {
                    var marginClass = $spacingLay.attr('class').match(/editor-img-outer-right-space-[0-9]{1,3}/g);
                    var removeClass = '';
                    var addClass = '';
                    if (marginClass !== null) {
                        removeClass = marginClass[0].trim();
                        $spacingLay.removeClass(removeClass);
                    }
                    else {
                        marginClass = $spacingLay.attr('class').match(/editor-img-outer-right-space-neg[0-9]{1,3}/g);
                        if (marginClass !== null) {
                            removeClass = marginClass[0].trim();
                            $spacingLay.removeClass(removeClass);
                        }
                    }
                    if (space >= 0) {
                        $spacingLay.addClass('editor-img-outer-right-space-' + space);
                    }
                    else {
                        space = Math.abs(space);
                        $spacingLay.addClass('editor-img-outer-right-space-neg' + space);
                    }
                }
                SageSlider($('#imagerightMarginSlider'), $('#imagerightMarginHandle'), imagemarginMin, imagemarginMax, padRight, ImgMarginRight);


                function ImgMarginBot(space) {
                    var marginClass = $spacingLay.attr('class').match(/editor-img-outer-bottom-space-[0-9]{1,3}/g);
                    var removeClass = '';
                    var addClass = '';
                    if (marginClass !== null) {
                        removeClass = marginClass[0].trim();
                        $spacingLay.removeClass(removeClass);
                    }
                    else {
                        marginClass = $spacingLay.attr('class').match(/editor-img-outer-bottom-space-neg[0-9]{1,3}/g);
                        if (marginClass !== null) {
                            removeClass = marginClass[0].trim();
                            $spacingLay.removeClass(removeClass);
                        }
                    }
                    if (space >= 0) {
                        $spacingLay.addClass('editor-img-outer-bottom-space-' + space);
                    }
                    else {
                        space = Math.abs(space);
                        $spacingLay.addClass('editor-img-outer-bottom-space-neg' + space);
                    }
                }
                SageSlider($('#imagebottomMarginSlider'), $('#imagebottomMarginHandle'), imagemarginMin, imagemarginMax, padBot, ImgMarginBot);

                function ImgMarginLeft(space) {
                    var marginClass = $spacingLay.attr('class').match(/editor-img-outer-left-space-[0-9]{1,3}/g);
                    var removeClass = '';
                    var addClass = '';
                    if (marginClass !== null) {
                        removeClass = marginClass[0].trim();
                        $spacingLay.removeClass(removeClass);
                    }
                    else {
                        marginClass = $spacingLay.attr('class').match(/editor-img-outer-left-space-neg[0-9]{1,3}/g);
                        if (marginClass !== null) {
                            removeClass = marginClass[0].trim();
                            $spacingLay.removeClass(removeClass);
                        }
                    }
                    if (space >= 0) {
                        $spacingLay.addClass('editor-img-outer-left-space-' + space);
                    }
                    else {
                        space = Math.abs(space);
                        $spacingLay.addClass('editor-img-outer-left-space-neg' + space);
                    }
                }
                SageSlider($('#imageleftMarginSlider'), $('#imageleftMarginHandle'), imagemarginMin, imagemarginMax, padLeft, ImgMarginLeft);

                var bulkPadouter = 0;
                if (padLeft === padRight && padTop === padBot && padLeft === padTop) {
                    bulkPadouter = padLeft;
                }
                function BulkMargin(space) {
                    $("#imageleftMarginSlider").slider('value', space);
                    $("#imageleftMarginHandle").text(space);
                    ImgMarginLeft(space);
                    $("#imagebottomMarginSlider").slider('value', space);
                    $("#imagebottomMarginHandle").text(space);
                    ImgMarginBot(space);
                    $("#imagerightMarginSlider").slider('value', space);
                    $("#imagerightMarginHandle").text(space);
                    ImgMarginRight(space);
                    $("#imagetopMarginSlider").slider('value', space);
                    $("#imagetopMarginHandle").text(space);
                    ImgMarginTop(space);
                }
                SageSlider($('#bulkInnerMarginSlider'), $('#bulkInnerMarginHandle'), imagemarginMin, imagemarginMax, bulkPadouter, BulkMargin);


                InnerSpace();

            }
            function InnerSpace() {
                var paddingClasses = $parent.attr('class').match(/editor-img-inner-space-[0-9]{1,3}/g);
                var padd = 0;
                if (paddingClasses !== null) {
                    padd = parseInt(paddingClasses[0].trim().replace('editor-img-inner-space-', ''));
                }
                function InnerBulkSpace(space) {
                    var paddClasses = $parent.attr('class').match(/editor-img-inner-space-[0-9]{1,3}/g);
                    if (paddClasses !== null) {
                        $parent.removeClass(paddClasses[0]);
                    }
                    $parent.addClass('editor-img-inner-space-' + space);
                }
                SageSlider($('#imagePaddingSlider'), $('#imagePaddingHandle'), 0, 20, padd, InnerBulkSpace);
            }

            function ManualHeightEntryEvents() {
                var imageOriHeight = $parent.height();
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
                }
                SageSlider($('#imageRadiusSlider'), $('#imageRadiusHandle'), 0, 100, boxRadius, ImageBoxRadius);
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
                    $parent.css({
                        'height': space + 'px',
                        'width': space + 'px',
                        'border-radius': '50%'
                    });
                    $parent.parent().css({
                        'height': space + 'px',
                        'width': space + 'px',
                        'border-radius': '50%'
                    });
                }
                SageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 0, 1200, roundImageWidth, ImageBoxRadius);
            }

            function ChangeRoundImageWidth() {
                var roundImageWidth = 0;
                var imgHeight = parseInt($parent.width());
                var imgWidth = parseInt($parent.height());
                roundImageWidth = imgWidth;
                if (imgHeight < imgWidth) {
                    roundImageWidth = imgHeight;
                }
                $parent.css({
                    'height': roundImageWidth + 'px',
                    'width': roundImageWidth + 'px',
                    'border-radius': '50%'
                });
                $parent.parent().css({
                    'height': roundImageWidth + 'px',
                    'width': roundImageWidth + 'px',
                    'border-radius': '50%'
                });
                $('#imageRoundSlider').slider('value', roundImageWidth);
                $('#imageRoundHandle').text(roundImageWidth);
            }

            function ImageBorder() {
                var imageBorderStyle = $parent[0].style.borderStyle;//.css('border-style');
                $('#imgBorderStyle').val(imageBorderStyle);
                if (imageBorderStyle.length === 0 || imageBorderStyle === 'none') {
                    $('.imgborder').hide();
                }
                else {
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
                    }
                    else {
                        $('.imgborder').show();
                        var imgBordeVal = parseInt($('#imgBorderHandle').text());
                        if (imgBordeVal == 0)
                            imgBordeVal = 1;
                        $parent.css("border-width", imgBordeVal + 'px');
                        $('#imgBorderSlider').slider('value', imgBordeVal);
                        $('#imgBorderHandle').text(imgBordeVal);
                    }
                });

                var imgBorderWidth = $parent[0].style.borderWidth;// $parent.css("border-width");
                if (imgBorderWidth.length > 0) {
                    imgBorderWidth = parseInt(imgBorderWidth.replace('px', ''));
                } else {
                    imgBorderWidth = 1;
                }
                function RowSepHeight(space) {
                    $parent.css("border-width", space + 'px');
                }
                SageSlider($('#imgBorderSlider'), $('#imgBorderHandle'), 1, 10, imgBorderWidth, RowSepHeight);
                ImgBorderColor();
            }
            function ImgBorderColor() {
                $('#imgBorderColor').css('background-color', $parent[0].style.borderColor);
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        BuildColorPicker($elm, this);
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-color': topColor });
                    }
                };
                $('#imgBorderColor').colorPicker(colorPickerOption);
            }
        },
        'onDrop': function ($appendLayer) {
            var $dropImage = $appendLayer.find('.editor-component.image').find('img');
            SageMedia($dropImage);
            setTimeout(function () {
                // $dropImage.css({ 'height': $dropImage.height() });
                //time delay is used because image is transited woth0.4s transition from css
            }, 401);
        }
    },
    'paragraph': {
        'componentname': 'paragraph',
        'defaultdata': '<div class="editor-component paragraph sfCol_100 text-align-left">' + textOption + '<p class="editor-para" contenteditable="true">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>',
        'settingDOM': $('#textOptions').html(),
        'loadSetting': function ($item) {
            var $parent = $item.parent().parent();
            $('.editor-component').find('.activeSetting').removeClass('activeSetting');
            $('.editor-component.activeSetting').removeClass('activeSetting');
            $parent.addClass('activeSetting');

            var $textChange = $parent.children().not('div').eq(0);
            InitEvents();
            LoadSettings();
            function InitEvents() {
                $('.tabcontent').hide().filter(':first').show();
                $('#tabs li[data-tabs]').on('click', function () {
                    $('#tabs li[data-tabs]').removeClass('active');
                    $('.tabcontent').hide();
                    var tab = $(this).data('tabs');
                    $(this).addClass('active');
                    $('#' + tab).fadeIn().show();
                });
                $(".tabs li").click(function () {
                    var cur = $(".tabs li").index(this);
                    var elm = $('.tabcontent:eq(' + cur + ')');
                    elm.addClass("pulse");
                    setTimeout(function () {
                        elm.removeClass("pulse");
                    }, 220);
                });
                ManualEntryEvents();
                TextTranformCheck();
                AlignmentEvent();
                FontWidth();
            }
            function FontWidth() {
                var fontWidth = 100;
                var $parentWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                if ($parentWidthClass !== null) {
                    fontWidth = parseInt($parentWidthClass[0].replace('sfCol_', ''));
                    $('#activeParalax').prop('checked', true);
                    $('#fontWidthSlider').show();
                }
                else {
                    $('#activeParalax').prop('checked', false);
                    $('#fontWidthSlider').hide();
                }
                $('#fontWidthEnable').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#fontWidthSlider').slideDown(400);
                        $parent.addClass('sfCol_100');
                    }
                    else {
                        $('#fontWidthSlider').slideUp(400);
                        var $parentWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                        if ($parentWidth !== null) {
                            $parent.removeClass($parentWidth[0]);
                        }
                    }
                });
                function fonstWidthSlider(space) {
                    var $parentWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                    if ($parentWidth !== null) {
                        $parent.removeClass($parentWidth[0]).addClass('sfCol_' + space);
                    }
                    else {
                        $parent.addClass('sfCol_' + space);
                    }
                }
                SageSlider($('#fontWidthSlider'), $('#fontWidthHandle'), 0, 100, fontWidth, fonstWidthSlider);
            }
            function TextTranformCheck() {
                var trasformValue = '';
                if ($textChange.hasClass('editor-text-transform-uppercase')) {
                    trasformValue = 'editor-text-transform-uppercase';
                }
                else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                    trasformValue = 'editor-text-transform-lowercase';
                }
                $('#textTransform').val(trasformValue);
                $('#textTransform').on('change', function () {
                    var tranformCase = $(this).val();
                    switch (tranformCase) {
                        case 'editor-text-transform-uppercase':
                            $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                            break;
                        case 'editor-text-transform-lowercase':
                            $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                            break;
                        case '':
                            $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                            break;
                    }
                });
            }
            function ManualEntryEvents() {
                $('.changeFontSize').on('click', function () {
                    $(this).focus().select();
                });
                $('.changeFontSize').on('keyup', function (event) {
                    var $this = $(this);
                    var fontsize = parseInt($this.val());
                    switch (event.which) {
                        case 37: // left
                            break;
                        case 38: // up
                            fontsize = fontsize + 1;
                            $(this).val(fontsize);
                            break;
                        case 39: // right
                            break;

                        case 40: // down
                            fontsize = fontsize - 1;
                            $(this).val(fontsize);
                            break;
                    }
                    if (fontsize < minFontSize) {
                        fontsize = minFontSize;
                        $this.val(minFontSize);
                    }
                    if (fontsize > maxFontsize) {
                        fontsize = maxFontsize;
                        $this.val(maxFontsize);
                    }
                    if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                        var $slider = $this.parent().prev();
                        var slider = $slider.slider({
                            value: fontsize
                        });
                        $slider.find('> div.ui-slider-handle').text(fontsize);
                        $textChange.css('font-size', fontsize + 'px');
                    }
                    $this.focus().select();
                });

                $('.increaseFontSize').on('click', function () {
                    var $this = $(this);
                    var $changeFontSize = $this.parent().find('.changeFontSize');
                    $changeFontSize.focus().select();
                    var fontsize = parseInt($changeFontSize.val());
                    fontsize = fontsize + 1;
                    $changeFontSize.val(fontsize);
                    $changeFontSize.trigger('keyup');
                });
                $('.decreaseFontSize').on('click', function () {
                    var $this = $(this);
                    var $changeFontSize = $this.parent().find('.changeFontSize');
                    $changeFontSize.focus().select();
                    var fontsize = parseInt($changeFontSize.val());
                    fontsize = fontsize - 1;
                    $changeFontSize.val(fontsize);
                    $changeFontSize.trigger('keyup');
                });
            }
            function LoadSettings() {
                var fontsize = $textChange.css('font-size');
                if (typeof (fontsize) === 'undefined') {
                    fontsize = minFontSize;
                }
                fontsize = parseInt(fontsize.replace('px', ''));
                var handleFontSize = $("#fontsizeHandle");
                $("#fontsizeSlider").slider({
                    range: "max",
                    min: minFontSize,
                    max: maxFontsize,
                    value: fontsize,//mrgTop,
                    create: function () {
                        var size = $(this).slider("value");
                        handleFontSize.text(size);
                        handleFontSize.parent().next().find('.changeFontSize').val(size);
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleFontSize.text(space);
                        handleFontSize.parent().next().find('.changeFontSize').val(space);
                        $textChange.css('font-size', space + 'px');
                    }
                });

                var letteSpace = 0;
                var removeClass = '';
                if (typeof ($textChange.attr('class')) !== 'undefined') {
                    var letterSpacingNegClass = $textChange.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                    if (letterSpacingNegClass !== null) {
                        removeClass = letterSpacingNegClass[0].trim();
                        letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-neg-', ''));
                    }
                    else {
                        var letterSpacingPosClass = $textChange.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                        if (letterSpacingPosClass !== null) {
                            removeClass = letterSpacingPosClass[0].trim();
                            letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-', ''));
                        }
                    }
                }

                var letterSpacingHandle = $("#letterSpacingHandle");
                $("#letterSpacingSlider").slider({
                    range: "max",
                    min: -10,
                    max: 10,
                    value: letteSpace,//mrgTop,
                    create: function () {
                        var size = $(this).slider("value");
                        letterSpacingHandle.text(size);
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        letterSpacingHandle.text(space);
                        var addClass = '';

                        var removeClass = '';
                        if (typeof ($textChange.attr('class')) !== 'undefined') {
                            var negClass = $textChange.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                            if (negClass !== null) {
                                removeClass = negClass[0].trim();
                            }
                            else {
                                var posClass = $textChange.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                                if (posClass !== null) {
                                    removeClass = posClass[0].trim();
                                }
                            }
                        }
                        if (space >= 0) {
                            addClass = 'editor-text-letterSpacing-' + space;
                        }
                        else {
                            space = Math.abs(space);
                            addClass = 'editor-text-letterSpacing-neg-' + space;
                        }
                        $textChange.removeClass(removeClass).addClass(addClass);
                        //$parent.addClass(addClass);
                    }
                });

                loadColorPicker();
                Spacing();
                Alignment();
            }
            function loadColorPicker() {

                $('#chooseFontColor').css('background-color', $textChange.css('color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var colorPickerID = $elm.attr('id');
                        switch (colorPickerID) {
                            case 'chooseFontColor':
                                $('.editor-component.activeSetting').children().not('div').eq(0).css({
                                    'color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')'
                                    //'color': textColor
                                });
                                break;
                        }
                    }
                };

                $('#chooseFontColor').colorPicker(colorPickerOption);
            }
            function Spacing() {
                //topPaddingSlider

                var $spacingLay = $textChange;
                //var $shadedLay = $parent.find('.editor-row-shaded-layer');
                //if ($shadedLay.length > 0) {
                //    $spacingLay = $shadedLay;
                //}
                var padTop = 0;
                var padRight = 0;
                var padBot = 0;
                var padLeft = 0;

                if (typeof ($spacingLay.attr('class')) !== 'undefined') {
                    var matchClassList = $spacingLay.attr('class');
                    var paddingTopClasses = matchClassList.match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                    if (paddingTopClasses !== null) {
                        padTop = parseInt(paddingTopClasses[0].trim().replace('editor-col-inner-top-space-', '')) / 10;
                    }
                    var paddingRightClasses = matchClassList.match(/editor-col-inner-right-space-[0-9]{2,3}/g);

                    if (paddingRightClasses !== null) {
                        padRight = parseInt(paddingRightClasses[0].trim().replace('editor-col-inner-right-space-', '')) / 10;
                    }
                    var paddingBottomClasses = matchClassList.match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);

                    if (paddingBottomClasses !== null) {
                        padBot = parseInt(paddingBottomClasses[0].trim().replace('editor-col-inner-bottom-space-', '')) / 10;
                    }
                    var paddingLeftClasses = matchClassList.match(/editor-col-inner-left-space-[0-9]{2,3}/g);

                    if (paddingLeftClasses !== null) {
                        padLeft = parseInt(paddingLeftClasses[0].trim().replace('editor-col-inner-left-space-', '')) / 10;
                    }
                }
                var handleTopSlider = $("#txttopPaddingHandle");
                $("#txttopPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padTop,
                    create: function () {
                        handleTopSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $textChange;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleTopSlider.text(space);
                        if (typeof ($spacingLay.attr('class')) !== 'undefined') {
                            var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                            if (marginTopClass !== null) {
                                $spacingLayer.removeClass(marginTopClass[0].trim());
                            }
                        }
                        $spacingLayer.addClass('editor-col-inner-top-space-' + space + '0');
                    }
                });

                var handleRightSlider = $("#txtrightPaddingHandle");
                $("#txtrightPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padRight,
                    create: function () {
                        handleRightSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {

                        var $spacingLayer = $textChange;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleRightSlider.text(space);
                        if (typeof ($spacingLay.attr('class')) !== 'undefined') {
                            var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-right-space-[0-9]{2,3}/g);
                            if (marginTopClass !== null) {
                                $spacingLayer.removeClass(marginTopClass[0].trim());
                            }
                        }
                        $spacingLayer.addClass('editor-col-inner-right-space-' + space + '0');
                    }
                });
                var handleBottomSlider = $("#txtbottomPaddingHandle");
                $("#txtbottomPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padBot,
                    create: function () {
                        handleBottomSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $textChange;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleBottomSlider.text(space);
                        if (typeof ($spacingLay.attr('class')) !== 'undefined') {
                            var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);
                            if (marginTopClass !== null) {
                                $spacingLayer.removeClass(marginTopClass[0].trim());
                            }
                        }
                        $spacingLayer.addClass('editor-col-inner-bottom-space-' + space + '0');
                    }
                });
                var handleLeftSlider = $("#txtleftPaddingHandle");
                $("#txtleftPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padLeft,
                    create: function () {
                        handleLeftSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $textChange;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleLeftSlider.text(space);
                        if (typeof ($spacingLay.attr('class')) !== 'undefined') {
                            var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-left-space-[0-9]{2,3}/g);
                            if (marginTopClass !== null) {
                                $spacingLayer.removeClass(marginTopClass[0].trim());
                            }
                        }
                        $spacingLayer.addClass('editor-col-inner-left-space-' + space + '0');
                    }
                });
            }
            function Alignment() {
                var alignmentClasses = $parent.attr('class').match(/text-align-[a-z]{4,6}/g);
                var alignClass = '';
                if (alignmentClasses !== null) {
                    alignClass = alignmentClasses[0];
                }
                $('.alignmentWrapper').find('i[data-class="' + alignClass + '"]').addClass('selected');
            }
            function AlignmentEvent() {
                $('.alignmentWrapper i').on('click', function () {
                    var $this = $(this);
                    $parent.removeClass('text-align-left').removeClass('text-align-center').removeClass('text-align-right');
                    $parent.addClass($this.attr('data-class'));
                    $('.alignmentWrapper i').removeClass('selected');
                    $this.addClass('selected');
                });
            }
        }
    },
    'fonticon': {
        'componentname': 'fonticon',
        'settingDOM': $('#imageOptions').html(),
        'defaultdata': divStart('editor-component fonticon sfCol_100 text-align-left') + fontOption + '<i class="icon-icon-paragraph"></i>' + divEnd,
        'loadSetting': function ($item) {

            objComponent = component.fonticon;
            $('.editor-col').removeClass('activeSetting');
            var $parentItem = $item.parents('.editor-col');

            InitEvents();
            LoadSettings();
            function InitEvents() {

            }
            function LoadSettings() {

            }
        }
    },
    'heading': {
        'componentname': 'heading',
        'defaultdata': divStart('editor-component com-heading sfCol_100 text-align-left') + textOption + '<h1 contenteditable="true">This is heading </h1>' + divEnd,
        'loadSetting': function ($parent) {
            InitEvents();
            LoadSettings();
            function InitEvents() {

            }
            function LoadSettings() {

            }
        }
    },
    'holder': {
        'iconclass': '',
        'componentname': 'holder',
        'category': 'line',
        'componentBlockDOM': '',
        'defaultdata': '<div class="editor-component editor-col holder">' + holderOption + '<div class="editor-col ui-state-default sfFixed sfCol_100"></div></div>',
        'settingDOM': $('#imageOptions').html(),
        'onDrop': function ($appendLayer) {

        },
        'loadSetting': function ($item) {

        },
        'settingDOMs': {
            'tabs': {
                'Basic':
                    {
                        'DOM': '<span>Hello</span>',
                        'load': function ($parent) {

                        }
                    },
                'Background':
                    {
                        'options': ['image', 'color']
                    },
                'Spacing':
                    {
                        'options': {
                            'margin': {
                                'max': 40,
                                'min': -40,
                                'times': 5,
                                'position': ['all', 'top', 'left', 'bottom', 'right']
                            },
                            'padding': {
                                'max': 40,
                                'min': 0,
                                'times': 5,
                                'position': ['all', 'top', 'left', 'bottom', 'right']
                            }
                        }

                    },
                'Alignment':
                    {
                        'options': ['left', 'center', 'right']
                    },
                'Border': {
                    'options': {
                        'max': 20,
                        'min': 0,
                        'times': 1,
                        'position': ['all', 'top', 'right', 'bottom', 'left'],
                    }
                },
                'Box Radius':
                    {
                        'options': {
                            'max': 50,
                            'min': 0,
                            'times': 1,
                            'position': ['all', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
                        }
                    },
                'Box Shadow':
                    {
                        'options': {

                        }
                    }
            },
            'selectLayer': function ($elem) {
                $('.editor-component').removeClass('activeSetting');
                var $parent = $elem.parent().parent();
                $parent.addClass('activeSetting');
                return $parent;
            },
        }
    },
    'imagepara': {
        'componentname': 'imagepara',
        'defaultdata': '<div class="editor-component"><div class="sfCol_100"><div class="sfCol_60"><img src="/modules/webbuilder/img/child.jpg" style="width:100%" class="editor-image"></div><div class="sfCol_40"><p class="editor-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div></div></div>',
    },
    'imagegall': {
        'componentname': 'imagegall',
        'defaultdata': '<div class="editor-component"><div class="sfCol_100 editor-image"><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div><div class="sfCol_25"><img src="/modules/webbuilder/img/robot.jpg" style="width:100%"></div></div></div>',
    },
    'row': {
        'componentname': 'row',
        'settingDOM': rowSettingDOMs,
        'loadSetting': function ($item) {
            $('.editor-row').removeClass('activeSetting');
            var $parent = $item.parents('.editor-row');
            $parent.addClass('activeSetting');
            InitEvents();
            LoadSettings();
            function LoadSettings() {
                //check for background tab -> drop down
                var backgroundColor = $parent.attr('data-backgroundColor');
                var backgroundImage = $parent.attr('data-backgroundImage');
                var selected = 'none';
                if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
                    selected = 'color';
                }
                else if (typeof (backgroundImage) !== 'undefined' && backgroundImage.length > 0) {
                    selected = 'image';
                    BackImageSetting();
                }
                $('#selBackround').val(selected);
                $('#selBackround').trigger('change');

                //check for background tab -> shaded layer
                var $container = $parent.find('> div.editor-row-shaded-layer');
                if ($container.length > 0) {
                    $('#shadedLayerActive').prop('checked', true);
                    var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                    $('#selContainerWidth').val(conClass);
                    $('#divPickShaded').fadeIn(400);

                }
                else {
                    $('#shadedLayerActive').prop('checked', false);
                }
                //color:
                //check for  conatiner
                var $container = $parent.find('div.editor-row-container');
                if ($container.length > 0) {
                    $('#askContainer').prop('checked', true);
                    var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                    $('#selContainerWidth').val(conClass);
                    $('#additionalContainer').fadeIn(400);
                }
                else {
                    $('#askContainer').prop('checked', false);
                }

                var $container = $parent.find('div.rowTitle');
                if ($container.length > 0) {
                    $('#showTitle').prop('checked', true);
                }
                else {
                    $('#showTitle').prop('checked', false);
                }
                RowBorderStyle();
                BGImage()
            }
            function BGImage() {
                var parentBgImage = $parent.css('background-image');
                parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                if (typeof (parentBgImage) === 'undefined' || parentBgImage === 'none') {
                    parentBgImage = '/modules/webbuilder/img/tiger.jpg';
                }
                $('#RowBGImage').attr('src', parentBgImage);
            }
            function BackImageSetting() {
                var classList = $parent.attr('class');
                if (typeof (classList) !== "undefined" && classList.length > 0) {
                    var parralPattern = /editor-row-bg-image-parallax/g;
                    var hasParallex = parralPattern.test(classList);
                    if (hasParallex) {
                        $('#activeParalax').prop('checked', true);
                    }
                    else {
                        $('#activeParalax').prop('checked', false);
                    }
                }
            }

            function InitEvents() {
                $('#selBackround').off().on('change', function () {
                    var select = $(this).val();
                    var backgroundColor = '';
                    var backgroundImage = '';
                    switch (select) {
                        case 'none':
                            $('#divBackColorChoose').hide();
                            $('#divBackImageChoose').hide();
                            backgroundColor = '';
                            backgroundImage = '';
                            removeImageBG();
                            removeColorBG();
                            break;
                        case 'image':
                            $('#divBackColorChoose').hide();
                            $('#divBackImageChoose').show();
                            backgroundColor = '';
                            backgroundImage = 'image';
                            removeColorBG();
                            break;
                        case 'color':
                            $('#divBackColorChoose').show();
                            $('#divBackImageChoose').hide();
                            backgroundColor = 'color';
                            backgroundImage = '';
                            removeImageBG();
                            break;
                    }

                    $parent.attr('data-backgroundColor', backgroundColor);
                    $parent.attr('data-backgroundImage', backgroundImage);
                });
                $('#activeParalax').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        $parent.addClass('editor-row-bg-image-parallax');
                    }
                    else {
                        $parent.removeClass('editor-row-bg-image-parallax');
                    }
                });
                $('#RowBGImage').on('click', function () {
                    var $this = $(this);
                    $this.SageMedia({
                        userModuleID: webBuilderUserModuleID,
                        onSelect: function (src, response, type, filename, extension) {
                            src = src.replace(/\\/g, '/');
                            $this.attr('src', src);
                            $parent.css({
                                'background-image': 'url("' + src + '")'
                            });
                        },
                        mediaType: 'image'
                    });
                });
                //customBG

                var bgColor = $('.editor-row.activeSetting').css('background-color');
                var txtColor = $('.editor-row.activeSetting').css('color');
                if (typeof (bgColor) === "undefined") {
                    bgColor = "rgb(255, 255, 255, 1)";
                }
                if (typeof (txtColor) === "undefined") {
                    txtColor = "rgb(0, 0, 0, 1)";
                }
                $('#chooseColorBG').css({
                    'background-color': bgColor,
                    'color': txtColor
                });

                var extracolor = GetUsedBgColor();
                if (extracolor.length > 0) {
                    $(extracolor).insertAfter('#chooseColorBG');
                    $('.obtainColor').on('click', function () {
                        var bgnewColor = $(this).css('background-color');
                        $('#chooseColorBG').css({
                            'background-color': bgnewColor,
                        });
                        $parent.css({
                            'background-color': bgnewColor,
                        });

                    });
                }
                var $shadedObject = $parent.find('.editor-row-shaded-layer');
                if (typeof ($shadedObject) !== "undefined") {
                    var shadedBGColor = $shadedObject.css('background-color');
                    var txtshadedColor = $shadedObject.css('color');
                    if (typeof (shadedBGColor) === "undefined") {
                        shadedBGColor = "rgba(37, 113, 211, 0.38)";
                    }
                    if (typeof (txtshadedColor) === "undefined") {
                        txtshadedColor = "rgb(0, 0, 0, 1)";
                    }
                    $('#chooseColorShaded').css({
                        'background-color': shadedBGColor,
                        'color': txtshadedColor
                    });
                }

                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var colorPickerID = $elm.attr('id');
                        switch (colorPickerID) {
                            case 'chooseColorBG':
                                $('.editor-row.activeSetting').css({
                                    'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                                    'color': textColor
                                });
                                break;
                            case 'chooseColorShaded':

                                $('.editor-row.activeSetting').find('.editor-row-shaded-layer').css({
                                    'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                                    'color': textColor
                                });
                                break;
                        }
                    }
                };
                $('.chooseColor').colorPicker(colorPickerOption);

                $('#askContainer').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        var containerDiv = divStart('editor-row-container container-medium') + divEnd;
                        var appendElem = '';
                        if ($parent.find('.editor-row-shaded-layer').length === 0) {
                            appendElem = $parent.children();
                            $parent.append(containerDiv);
                        }
                        else {
                            appendElem = $parent.find('.editor-row-shaded-layer').children();
                            $parent.find('.editor-row-shaded-layer').append(containerDiv);
                        }
                        $parent.find('.editor-row-container').append(appendElem);
                        $('#selContainerWidth').val('container-medium');
                        $('#additionalContainer').fadeIn(400);

                    }
                    else {
                        var appendElem = $parent.find('.editor-row-container').children();
                        if ($parent.find('.editor-row-shaded-layer').length === 0) {
                            $parent.append(appendElem);
                        }
                        else {
                            $parent.find('.editor-row-shaded-layer').append(appendElem);
                        }
                        $parent.find('.editor-row-container').remove();
                        $('#additionalContainer').fadeOut(400);
                    }
                    CalculateWidth($parent.find('.colWrapper'));
                });
                $('#showTitle').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        var rowTitle = RowHeadingDOM();
                        $(rowTitle).insertAfter($parent.find('.row-options'));
                        SettingEvents();
                    }
                    else {
                        $parent.find('.rowTitle').remove();
                    }
                });
                $('#shadedLayerActive').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        var shadedDiv = divStart('editor-row-shaded-layer') + divEnd;
                        var appendElem = $parent.children();
                        $parent.append(shadedDiv);
                        $('#divPickShaded').fadeIn(400);
                        $parent.find('.editor-row-shaded-layer').append(appendElem).css({ 'background-color': 'rgba(37, 113, 211, 0.38)' });

                        //removing and adding padding between shaded and row

                        var paddingTopClasses = $parent.attr('class').match(/editor-row-inner-top-space-[0-9]{2,3}/g);
                        var padTopClass = '';
                        if (typeof (paddingTopClasses) !== "undefined" && paddingTopClasses !== null) {
                            padTopClass = paddingTopClasses[0].trim();
                            $parent.removeClass(padTopClass);
                            $parent.find('.editor-row-shaded-layer').addClass(padTopClass);
                        }
                        var paddingBotClasses = $parent.attr('class').match(/editor-row-inner-bottom-space-[0-9]{2,3}/g);
                        var padBotClass = '';
                        if (typeof (paddingBotClasses) !== "undefined" && paddingBotClasses !== null) {
                            padBotClass = paddingBotClasses[0].trim();
                            $parent.removeClass(padBotClass);
                            $parent.find('.editor-row-shaded-layer').addClass(padBotClass);
                        }
                    }
                    else {
                        //removing and adding padding between shaded and row

                        var paddingTopClasses = $parent.find('.editor-row-shaded-layer').attr('class').match(/editor-row-inner-top-space-[0-9]{2,3}/g);
                        var padTopClass = '';
                        if (typeof (paddingTopClasses) !== "undefined" && paddingTopClasses !== null) {
                            padTopClass = paddingTopClasses[0].trim();
                            $parent.addClass(padTopClass);
                            $parent.find('.editor-row-shaded-layer').removeClass(padTopClass);
                        }
                        var paddingBotClasses = $parent.find('.editor-row-shaded-layer').attr('class').match(/editor-row-inner-bottom-space-[0-9]{2,3}/g);
                        var padBotClass = '';
                        if (typeof (paddingBotClasses) !== "undefined" && paddingBotClasses !== null) {
                            padBotClass = paddingBotClasses[0].trim();
                            $parent.addClass(padBotClass);
                            $parent.find('.editor-row-shaded-layer').removeClass(padBotClass);
                        }
                        RemoveShadedLayer();
                    }
                });
                $('#selContainerWidth').off().on('change', function () {
                    var containWidth = $(this).val();
                    var $container = $parent.find('.editor-row-container');
                    $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                    $container.addClass(containWidth);
                    CalculateWidth($parent.find('.colWrapper'));
                });
                $('.imageBG').off().on('click', function () {
                    var src = $(this).attr('src');
                    $parent.css({
                        'background-image': 'url("' + src + '")'
                    });
                });





                var marginTopClasses = $parent.attr('class').match(/editor-row-top-space-[0-9]{2,3}/g);
                var mrgTop = 0;
                if (marginTopClasses !== null) {
                    mrgTop = parseInt(marginTopClasses[0].trim().replace('editor-row-top-space-', '')) / 10;
                }
                var marginBottomClasses = $parent.attr('class').match(/editor-row-bottom-space-[0-9]{2,3}/g);
                var mrgBot = 0;
                if (marginBottomClasses !== null) {
                    mrgBot = parseInt(marginBottomClasses[0].trim().replace('editor-row-bottom-space-', '')) / 10;
                }


                var handleTopSlider = $("#topMarginHandle");
                $("#topMarginSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: mrgTop,
                    create: function () {
                        handleTopSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleTopSlider.text(space);
                        var marginTopClass = $parent.attr('class').match(/editor-row-top-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $parent.removeClass(marginTopClass[0].trim());
                        }
                        $parent.addClass('editor-row-top-space-' + space + '0');
                    }
                });
                var handleBottomSlider = $("#bottomMarginHandle");
                $("#bottomMarginSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: mrgBot,
                    create: function () {
                        handleBottomSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleBottomSlider.text(space);
                        var marginbottomClass = $parent.attr('class').match(/editor-row-bottom-space-[0-9]{2,3}/g);
                        if (marginbottomClass !== null) {
                            $parent.removeClass(marginbottomClass[0].trim());
                        }
                        $parent.addClass('editor-row-bottom-space-' + space + '0');
                    }
                });

                var $spacingLay = $parent;
                var $shadedLay = $parent.find('.editor-row-shaded-layer');
                if ($shadedLay.length > 0) {
                    $spacingLay = $shadedLay;
                }
                var paddingTopClasses = $spacingLay.attr('class').match(/editor-row-inner-top-space-[0-9]{2,3}/g);
                var padTop = 0;
                if (paddingTopClasses !== null) {
                    padTop = parseInt(paddingTopClasses[0].trim().replace('editor-row-inner-top-space-', '')) / 10;
                }
                var paddingBottomClasses = $spacingLay.attr('class').match(/editor-row-inner-bottom-space-[0-9]{2,3}/g);
                var padBot = 0;
                if (paddingBottomClasses !== null) {
                    padBot = parseInt(paddingBottomClasses[0].trim().replace('editor-row-inner-bottom-space-', '')) / 10;
                }
                var handleTopPaddingSlider = $("#topPaddingHandle");
                $("#topPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padTop,
                    create: function () {
                        handleTopPaddingSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleTopPaddingSlider.text(space);

                        var $spacingLayer = $parent;
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        if ($shadedLayer.length > 0) {
                            $spacingLayer = $shadedLayer;
                        }
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-row-inner-top-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-row-inner-top-space-' + space + '0');
                    }
                });
                var handleBottompaddingSlider = $("#bottomPaddingHandle");
                $("#bottomPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padBot,
                    create: function () {
                        handleBottompaddingSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleBottompaddingSlider.text(space);
                        var $spacingLayer = $parent;
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        if ($shadedLayer.length > 0) {
                            $spacingLayer = $shadedLayer;
                        }
                        var marginbottomClass = $spacingLayer.attr('class').match(/editor-row-inner-bottom-space-[0-9]{2,3}/g);
                        if (marginbottomClass !== null) {
                            $spacingLayer.removeClass(marginbottomClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-row-inner-bottom-space-' + space + '0');
                    }
                });
                RowBorderStyleEvent();
                RowBorderEvent();
            }
            function RowBorderEvent() {
                var topWidth = $parent.css("border-top-width");
                topWidth = parseInt(topWidth.replace('px', ''));
                var handleTop = $("#rowTopBorderColorHandle");
                $("#rowTopBorderColorSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: topWidth,
                    create: function () {
                        handleTop.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleTop.text(space);
                        $parent.css({ "border-top-width": space });
                    }
                });


                var rightWidth = $parent.css("border-right-width");
                rightWidth = parseInt(rightWidth.replace('px', ''));
                var handleRight = $("#rowRightBorderColorHandle");
                $("#rowRightBorderColorSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: rightWidth,
                    create: function () {
                        handleRight.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleRight.text(space);
                        $parent.css({ "border-right-width": space });
                    }
                });

                var bottomWidth = $parent.css("border-bottom-width");
                bottomWidth = parseInt(bottomWidth.replace('px', ''));
                var handleBottom = $("#rowBottomBorderHandle");
                $("#rowBottomBorderSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: bottomWidth,
                    create: function () {
                        handleBottom.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleBottom.text(space);
                        $parent.css({ "border-bottom-width": space });
                    }
                });

                var leftWidth = $parent.css("border-bottom-width");
                leftWidth = parseInt(leftWidth.replace('px', ''));
                var handleLeft = $("#rowLeftBorderHandle");
                $("#rowLeftBorderSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: leftWidth,
                    create: function () {
                        handleLeft.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleLeft.text(space);
                        $parent.css({ "border-left-width": space });
                    }
                });

                RowTopBorderColor();
                RowRightBorderColor();
                RowBottomBorderColor();
                RowLeftBorderColor();
            }
            function RowTopBorderColor() {
                $('#rowTopBorderColor').css('background-color', $parent.css('border-top-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-top-color': topColor });
                        var colorPickerID = $elm.attr('id');
                        //switch (colorPickerID) {
                        //    case 'chooseFontColor':
                        //        $('.editor-component.activeSetting').children().not('div').eq(0).css({
                        //            'color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')'
                        //            //'color': textColor
                        //        });
                        //        break;
                        //}
                    }
                };
                $('#rowTopBorderColor').colorPicker(colorPickerOption);
            }
            function RowRightBorderColor() {
                $('#rowRightBorderColor').css('background-color', $parent.css('border-right-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-right-color': topColor });
                    }
                };
                $('#rowRightBorderColor').colorPicker(colorPickerOption);
            }
            function RowBottomBorderColor() {
                $('#rowBottomBorderColor').css('background-color', $parent.css('border-bottom-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-bottom-color': topColor });
                    }
                };
                $('#rowBottomBorderColor').colorPicker(colorPickerOption);
            }
            function RowLeftBorderColor() {
                $('#rowLeftBorderColor').css('background-color', $parent.css('border-left-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-left-color': topColor });
                    }
                };
                $('#rowLeftBorderColor').colorPicker(colorPickerOption);
            }
            function RowBorderStyle() {
                var borderStyle = $parent.css('border-style');
                if (typeof (borderStyle) !== null) {
                    $('#rowborderStyle').val(borderStyle);
                }
            }
            function RowBorderStyleEvent() {
                $('#rowborderStyle').on('change', function () {
                    $parent.css('border-style', $(this).val());
                });
            }

            function RowHeadingDOM() {
                var rowHeadingDOM = '';
                rowHeadingDOM += divStart('rowTitle sfCol_100');
                rowHeadingDOM += divStart('editor-component com-heading rowTitleHeading sfCol_100');
                rowHeadingDOM += divStart('text-options carries-options');
                rowHeadingDOM += '<i class="opt-name">Row heading</i>';
                rowHeadingDOM += '<i class="icon-icon-settings row-setting com-settings" data-type="paragraph" title="row heading setting"></i>';
                rowHeadingDOM += divEnd;
                rowHeadingDOM += '<h1 class="text-align-center" contenteditable="true">This is heading </h1>';
                rowHeadingDOM += divEnd;
                rowHeadingDOM += divStart('editor-component paragraph rowTitleSummary sfCol_100');
                rowHeadingDOM += divStart('text-options carries-options');
                rowHeadingDOM += '<i class="opt-name">Row heading summary</i>';
                rowHeadingDOM += '<i class="icon-icon-settings row-setting com-settings" data-type="paragraph" title="row subHeading setting"></i>';
                rowHeadingDOM += divEnd;
                rowHeadingDOM += '<p class="editor-para text-align-center" contenteditable="true">This is HeadingSetting.</p>';
                rowHeadingDOM += '</div>';
                rowHeadingDOM += divEnd;
                return rowHeadingDOM;
            }

            function GetUsedBgColor() {
                var extracolor = '';
                $('.editor-row').each(function () {
                    extracolor += '<span class="obtainColor  color-picker-holder" style="background-color: ' + $(this).css('background-color') + ';"></span>';
                });
                extracolor = '<span><i>Used colors :</i> ' + extracolor + '</span>';
                return extracolor;
            }
            function removeImageBG() {
                RemoveShadedLayer();
                $parent.removeClass('editor-row-bg-image-parallax');
                $('#activeParalax').prop('checked', false);
                $parent.css({
                    'background-image': ''
                });
            }
            function RemoveShadedLayer() {
                var appendElem = $parent.find('.editor-row-shaded-layer').children();
                $parent.append(appendElem);
                $parent.find('.editor-row-shaded-layer').remove();
                $('#divPickShaded').fadeOut(100);
                $('#shadedLayerActive').prop('checked', false);
            }
            function removeColorBG() {
                $parent.css({
                    'background-color': '',
                    'color': ''
                });
            }
            $('.tabcontent').hide().filter(':first').show();
            $('#tabs li[data-tabs]').on('click', function () {
                $('#tabs li[data-tabs]').removeClass('active');
                $('.tabcontent').hide();
                var tab = $(this).data('tabs');
                $(this).addClass('active');
                $('#' + tab).fadeIn().show();
            });
            $(".tabs li").click(function () {
                var cur = $(".tabs li").index(this);
                var elm = $('.tabcontent:eq(' + cur + ')');
                elm.addClass("pulse");
                setTimeout(function () {
                    elm.removeClass("pulse");
                }, 220);
            });

        },
        'defaultdata': rowInitStart + rowOption + columnCreateDOM + rowInitEnd
    }
    ,
    'buttton': {
        'componentname': 'button',
        'defaultdata': '<div class="editor-component paragraph">' + buttonOption + '<span contentEditable="true" class="icon-save sfBtn smlbtn-succ" id="SaveWeb">Save</span></div>',
        'settingDOM': $('#textOptions').html(),
        'loadSetting': function ($parent) {
            var $textChange = $parent.children().not('div').eq(0);
            InitEvents();
            LoadSettings();
            function InitEvents() {
                InitTabs();
                ManualEntryEvents();
                AlignmentEvent();
            }
            function InitTabs() {
                $('.tabcontent').hide().filter(':first').show();
                $('#tabs li[data-tabs]').on('click', function () {
                    $('#tabs li[data-tabs]').removeClass('active');
                    $('.tabcontent').hide();
                    var tab = $(this).data('tabs');
                    $(this).addClass('active');
                    $('#' + tab).fadeIn().show();
                });
                $(".tabs li").click(function () {
                    var cur = $(".tabs li").index(this);
                    var elm = $('.tabcontent:eq(' + cur + ')');
                    elm.addClass("pulse");
                    setTimeout(function () {
                        elm.removeClass("pulse");
                    }, 220);
                });
            }
            function ManualEntryEvents() {
                $('.changeFontSize').on('click', function () {
                    $(this).focus().select();
                });
                $('.changeFontSize').on('keyup', function (event) {
                    var $this = $(this);
                    var fontsize = parseInt($this.val());
                    switch (event.which) {
                        case 37: // left
                            break;
                        case 38: // up
                            fontsize = fontsize + 1;
                            $(this).val(fontsize);
                            break;
                        case 39: // right
                            break;

                        case 40: // down
                            fontsize = fontsize - 1;
                            $(this).val(fontsize);
                            break;
                    }
                    if (fontsize < minFontSize) {
                        fontsize = minFontSize;
                        $this.val(minFontSize);
                    }
                    if (fontsize > maxFontsize) {
                        fontsize = maxFontsize;
                        $this.val(maxFontsize);
                    }
                    if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                        var $slider = $this.parent().prev();
                        var slider = $slider.slider({
                            value: fontsize
                        });
                        $slider.find('> div.ui-slider-handle').text(fontsize);
                        $textChange.css('font-size', fontsize + 'px');
                    }
                    $this.focus().select();
                });

                $('.increaseFontSize').on('click', function () {
                    var $this = $(this);
                    var $changeFontSize = $this.parent().find('.changeFontSize');
                    $changeFontSize.focus().select();
                    var fontsize = parseInt($changeFontSize.val());
                    fontsize = fontsize + 1;
                    $changeFontSize.val(fontsize);
                    $changeFontSize.trigger('keyup');
                });
                $('.decreaseFontSize').on('click', function () {
                    var $this = $(this);
                    var $changeFontSize = $this.parent().find('.changeFontSize');
                    $changeFontSize.focus().select();
                    var fontsize = parseInt($changeFontSize.val());
                    fontsize = fontsize - 1;
                    $changeFontSize.val(fontsize);
                    $changeFontSize.trigger('keyup');
                });
            }
            function LoadSettings() {
                var fontsize = $textChange.css('font-size');
                if (typeof (fontsize) === 'undefined') {
                    fontsize = minFontSize;
                }
                fontsize = parseInt(fontsize.replace('px', ''));
                var handleFontSize = $("#fontsizeHandle");
                $("#fontsizeSlider").slider({
                    range: "max",
                    min: minFontSize,
                    max: maxFontsize,
                    value: fontsize,//mrgTop,
                    create: function () {
                        var size = $(this).slider("value");
                        handleFontSize.text(size);
                        handleFontSize.parent().next().find('.changeFontSize').val(size);
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleFontSize.text(space);
                        handleFontSize.parent().next().find('.changeFontSize').val(space);
                        $textChange.css('font-size', space + 'px');
                    }
                });

                var letteSpace = 0;
                var removeClass = '';
                var letterSpacingNegClass = $parent.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                if (letterSpacingNegClass !== null) {
                    removeClass = letterSpacingNegClass[0].trim();
                    letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-neg-', ''));
                }
                else {
                    var letterSpacingPosClass = $parent.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                    if (letterSpacingPosClass !== null) {
                        removeClass = letterSpacingPosClass[0].trim();
                        letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-', ''));
                    }
                }
                var letterSpacingHandle = $("#letterSpacingHandle");
                $("#letterSpacingSlider").slider({
                    range: "max",
                    min: -10,
                    max: 10,
                    value: letteSpace,//mrgTop,
                    create: function () {
                        var size = $(this).slider("value");
                        letterSpacingHandle.text(size);
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        letterSpacingHandle.text(space);
                        var addClass = '';

                        var removeClass = '';
                        var negClass = $parent.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                        if (negClass !== null) {
                            removeClass = negClass[0].trim();
                        }
                        else {
                            var posClass = $parent.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                            if (posClass !== null) {
                                removeClass = posClass[0].trim();
                            }
                        }
                        if (space >= 0) {
                            addClass = 'editor-text-letterSpacing-' + space;
                        }
                        else {
                            space = Math.abs(space);
                            addClass = 'editor-text-letterSpacing-neg-' + space;
                        }
                        $parent.removeClass(removeClass).addClass(addClass);
                        $parent.addClass(addClass);
                    }
                });

                loadColorPicker();
                Spacing();
                Alignment();
            }
            function loadColorPicker() {

                $('#chooseFontColor').css('background-color', $parent.css('color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var colorPickerID = $elm.attr('id');
                        switch (colorPickerID) {
                            case 'chooseFontColor':
                                $('.editor-component.activeSetting').children().not('div').eq(0).css({
                                    'color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')'
                                    //'color': textColor
                                });
                                break;
                        }
                    }
                };

                $('#chooseFontColor').colorPicker(colorPickerOption);
            }
            function Spacing() {
                //topPaddingSlider

                var $spacingLay = $parent;
                //var $shadedLay = $parent.find('.editor-row-shaded-layer');
                //if ($shadedLay.length > 0) {
                //    $spacingLay = $shadedLay;
                //}
                var paddingTopClasses = $spacingLay.attr('class').match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                var padTop = 0;
                if (paddingTopClasses !== null) {
                    padTop = parseInt(paddingTopClasses[0].trim().replace('editor-col-inner-top-space-', '')) / 10;
                }
                var paddingRightClasses = $spacingLay.attr('class').match(/editor-col-inner-right-space-[0-9]{2,3}/g);
                var padRight = 0;
                if (paddingRightClasses !== null) {
                    padRight = parseInt(paddingRightClasses[0].trim().replace('editor-col-inner-right-space-', '')) / 10;
                }
                var paddingBottomClasses = $spacingLay.attr('class').match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);
                var padBot = 0;
                if (paddingBottomClasses !== null) {
                    padBot = parseInt(paddingBottomClasses[0].trim().replace('editor-col-inner-bottom-space-', '')) / 10;
                }
                var paddingLeftClasses = $spacingLay.attr('class').match(/editor-col-inner-left-space-[0-9]{2,3}/g);
                var padLeft = 0;
                if (paddingLeftClasses !== null) {
                    padLeft = parseInt(paddingLeftClasses[0].trim().replace('editor-col-inner-left-space-', '')) / 10;
                }
                var handleTopSlider = $("#txttopPaddingHandle");
                $("#txttopPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padTop,
                    create: function () {
                        handleTopSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $parent;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleTopSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-top-space-' + space + '0');
                    }
                });

                var handleRightSlider = $("#txtrightPaddingHandle");
                $("#txtrightPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padRight,
                    create: function () {
                        handleRightSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {

                        var $spacingLayer = $parent;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleRightSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-right-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-right-space-' + space + '0');
                    }
                });
                var handleBottomSlider = $("#txtbottomPaddingHandle");
                $("#txtbottomPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padBot,
                    create: function () {
                        handleBottomSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $parent;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleBottomSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-bottom-space-' + space + '0');
                    }
                });
                var handleLeftSlider = $("#txtleftPaddingHandle");
                $("#txtleftPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padLeft,
                    create: function () {
                        handleLeftSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $parent;
                        //var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        //if ($shadedLayer.length > 0) {
                        //    $spacingLayer = $shadedLayer;
                        //}
                        var space = ui.value;
                        handleLeftSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-left-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-left-space-' + space + '0');
                    }
                });
            }
            function Alignment() {
                var alignmentClasses = $parent.attr('class').match(/text-align-[a-z]{4,6}/g);
                var alignClass = '';
                if (alignmentClasses !== null) {
                    alignClass = alignmentClasses[0];
                }
                $('.alignmentWrapper').find('i[data-class="' + alignClass + '"]').addClass('selected');
            }
            function AlignmentEvent() {
                $('.alignmentWrapper i').on('click', function () {
                    var $this = $(this);
                    $parent.removeClass('text-align-left').removeClass('text-align-center').removeClass('text-align-right');
                    $parent.addClass($this.attr('data-class'));
                    $('.alignmentWrapper i').removeClass('selected');
                    $this.addClass('selected');
                });
            }
        }
    },
    'column': {
        'componentname': 'column',
        'settingDOM': $('#columnOptions').html(),
        'loadSetting': function ($item) {

            $('.editor-col').removeClass('activeSetting');
            var $parent = $item.parents('.editor-col');
            function InitLoad() {
                $('.tabcontent').hide().filter(':first').show();
                $('#tabs li[data-tabs]').on('click', function () {
                    $('#tabs li[data-tabs]').removeClass('active');
                    $('.tabcontent').hide();
                    var tab = $(this).data('tabs');
                    $(this).addClass('active');
                    $('#' + tab).fadeIn().show();
                });
                $(".tabs li").click(function () {
                    var cur = $(".tabs li").index(this);
                    var elm = $('.tabcontent:eq(' + cur + ')');
                    elm.addClass("pulse");
                    setTimeout(function () {
                        elm.removeClass("pulse");
                    }, 220);
                });
            }
            InitLoad();
            InitEvents();
            LoadSettings();
            function LoadSettings() {
                var backgroundColor = $parent.attr('data-backgroundColor');
                var backgroundImage = $parent.attr('data-backgroundImage');
                var selected = 'none';
                if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
                    selected = 'color';
                }
                else if (typeof (backgroundImage) !== 'undefined' && backgroundImage.length > 0) {
                    selected = 'image';
                    BackImageSetting();
                }
                $('#selBackround').val(selected);
                $('#selBackround').trigger('change');

                //check for background tab -> shaded layer
                var $container = $parent.find('> div.editor-row-shaded-layer');
                if ($container.length > 0) {
                    $('#shadedLayerActive').prop('checked', true);
                    var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                    $('#selContainerWidth').val(conClass);
                    $('#divPickShaded').fadeIn(400);
                }
                else {
                    $('#shadedLayerActive').prop('checked', false);
                }
                //color:
                //check for  conatiner
                var $container = $parent.find('div.editor-row-container');
                if ($container.length > 0) {
                    $('#askContainer').prop('checked', true);
                    var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                    $('#selContainerWidth').val(conClass);
                    $('#additionalContainer').fadeIn(400);
                }
                else {
                    $('#askContainer').prop('checked', false);
                }

                var $container = $parent.find('div.rowTitle');
                if ($container.length > 0) {
                    $('#showTitle').prop('checked', true);
                }
                else {
                    $('#showTitle').prop('checked', false);
                }
                Alignment();
                var parentBgImage = $parent.css('background-image');
                parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                if (typeof (parentBgImage) === 'undefined' || parentBgImage === 'none') {
                    parentBgImage = '/modules/webbuilder/img/tiger.jpg';
                }
                $('#RowBGImage').attr('src', parentBgImage);
            }

            function InitEvents() {
                $('.editor-col').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                $('#selBackround').off().on('change', function () {
                    var select = $(this).val();
                    var backgroundColor = '';
                    var backgroundImage = '';
                    switch (select) {
                        case 'none':
                            $('#divBackColorChoose').hide();
                            $('#divBackImageChoose').hide();
                            backgroundColor = '';
                            backgroundImage = '';
                            removeImageBG();
                            removeColorBG();
                            break;
                        case 'image':
                            $('#divBackColorChoose').hide();
                            $('#divBackImageChoose').show();
                            backgroundColor = '';
                            backgroundImage = 'image';
                            removeColorBG();
                            break;
                        case 'color':
                            $('#divBackColorChoose').show();
                            $('#divBackImageChoose').hide();
                            backgroundColor = 'color';
                            backgroundImage = '';
                            removeImageBG();
                            break;
                    }

                    $parent.attr('data-backgroundColor', backgroundColor);
                    $parent.attr('data-backgroundImage', backgroundImage);
                });
                $('#activeParalax').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        $parent.addClass('editor-row-bg-image-parallax');
                    }
                    else {
                        $parent.removeClass('editor-row-bg-image-parallax');
                    }
                });
                $('#shadedLayerActive').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        var shadedDiv = divStart('editor-row-shaded-layer') + divEnd;
                        var appendElem = $parent.children();
                        $parent.append(shadedDiv);
                        $('#divPickShaded').fadeIn(400);
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        $shadedLayer.append(appendElem).css({ 'background-color': 'rgba(37, 113, 211, 0.38)' });

                        //adding and removing inner spacing in between column and shaded layer while adding

                        var paddingTopClasses = $parent.attr('class').match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                        var padTopClass = '';
                        if (typeof (paddingTopClasses) !== "undefined" && paddingTopClasses !== null) {
                            padTopClass = paddingTopClasses[0].trim();
                            $parent.removeClass(padTopClass);
                            $shadedLayer.addClass(padTopClass);
                        }
                        var paddingBotClasses = $parent.attr('class').match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);
                        var padBotClass = '';
                        if (typeof (paddingBotClasses) !== "undefined" && paddingBotClasses !== null) {
                            padBotClass = paddingBotClasses[0].trim();
                            $parent.removeClass(padBotClass);
                            $shadedLayer.addClass(padBotClass);
                        }
                        var paddingLeftClasses = $parent.attr('class').match(/editor-col-inner-left-space-[0-9]{2,3}/g);
                        var padLeftClass = '';
                        if (typeof (paddingLeftClasses) !== "undefined" && paddingLeftClasses !== null) {
                            padLeftClass = paddingLeftClasses[0].trim();
                            $parent.removeClass(padLeftClass);
                            $shadedLayer.addClass(padLeftClass);
                        }
                        var paddingRightClasses = $parent.attr('class').match(/editor-col-inner-right-space-[0-9]{2,3}/g);
                        var padRightClass = '';
                        if (typeof (paddingRightClasses) !== "undefined" && paddingRightClasses !== null) {
                            padRightClass = paddingRightClasses[0].trim();
                            $parent.removeClass(padRightClass);
                            $shadedLayer.addClass(padRightClass);
                        }
                    }
                    else {

                        //adding and removing inner spacing in between column and shaded layer while removing
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        var paddingTopClasses = $shadedLayer.attr('class').match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                        var padTopClass = '';
                        if (typeof (paddingTopClasses) !== "undefined" && paddingTopClasses !== null) {
                            padTopClass = paddingTopClasses[0].trim();
                            $parent.addClass(padTopClass);
                            $shadedLayer.removeClass(padTopClass);
                        }
                        var paddingBotClasses = $shadedLayer.attr('class').match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);
                        var padBotClass = '';
                        if (typeof (paddingBotClasses) !== "undefined" && paddingBotClasses !== null) {
                            padBotClass = paddingBotClasses[0].trim();
                            $parent.addClass(padBotClass);
                            $shadedLayer.removeClass(padBotClass);
                        }

                        var paddingLeftClasses = $shadedLayer.attr('class').match(/editor-col-inner-left-space-[0-9]{2,3}/g);
                        var padLeftClass = '';
                        if (typeof (paddingLeftClasses) !== "undefined" && paddingLeftClasses !== null) {
                            padLeftClass = paddingLeftClasses[0].trim();
                            $shadedLayer.removeClass(padLeftClass);
                            $parent.addClass(padLeftClass);
                        }
                        var paddingRightClasses = $shadedLayer.attr('class').match(/editor-col-inner-right-space-[0-9]{2,3}/g);
                        var padRightClass = '';
                        if (typeof (paddingRightClasses) !== "undefined" && paddingRightClasses !== null) {
                            padRightClass = paddingRightClasses[0].trim();
                            $shadedLayer.removeClass(padRightClass);
                            $parent.addClass(padRightClass);
                        }
                        RemoveShadedLayer();
                    }
                });
                $('#RowBGImage').on('click', function () {
                    var $this = $(this);
                    $this.SageMedia({
                        userModuleID: webBuilderUserModuleID,
                        onSelect: function (src, response, type, filename, extension) {
                            src = src.replace(/\\/g, '/');
                            $this.attr('src', src);
                            $parent.css({
                                'background-image': 'url("' + src + '")'
                            });
                        },
                        mediaType: 'image'
                    });
                });
                var bgColor = $('.editor-col.activeSetting').css('background-color');
                var txtColor = $('.editor-col.activeSetting').css('color');
                if (typeof (bgColor) === "undefined") {
                    bgColor = "rgb(255, 255, 255, 1)";
                }
                if (typeof (txtColor) === "undefined") {
                    txtColor = "rgb(0, 0, 0, 1)";
                }
                $('#chooseColorColBG').css({
                    'background-color': bgColor,
                    'color': txtColor
                });

                var extracolor = GetUsedBgColor();
                if (extracolor.length > 0) {
                    $(extracolor).insertAfter('#chooseColorColBG');
                    $('.obtainColor').on('click', function () {
                        var bgnewColor = $(this).css('background-color');
                        $('#chooseColorColBG').css({
                            'background-color': bgnewColor
                        });
                        $parent.css({
                            'background-color': bgnewColor
                        });

                    });
                }

                var $shadedObject = $parent.find('.editor-row-shaded-layer');
                if (typeof ($shadedObject) !== "undefined") {
                    var shadedBGColor = $shadedObject.css('background-color');
                    var txtshadedColor = $shadedObject.css('color');
                    if (typeof (shadedBGColor) === "undefined") {
                        shadedBGColor = "rgba(37, 113, 211, 0.38)";
                    }
                    if (typeof (txtshadedColor) === "undefined") {
                        txtshadedColor = "rgb(0, 0, 0, 1)";
                    }
                    $('#chooseColorShaded').css({
                        'background-color': shadedBGColor,
                        'color': txtshadedColor
                    });
                }

                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var colorPickerID = $elm.attr('id');
                        switch (colorPickerID) {
                            case 'chooseColorShadedCol':
                                $('.editor-col.activeSetting').find('.editor-row-shaded-layer').css({
                                    'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                                    'color': textColor
                                });
                            case 'chooseColorColBG':
                                $('.editor-col.activeSetting').css({
                                    'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                                    'color': textColor
                                });
                                break;
                        }
                    }
                };

                $('.chooseColor').colorPicker(colorPickerOption);
                Spacing();
                AlignmentEvent();
                RowBorderStyleEvent();
                RowBorderEvent();
                ColBorderRadius();
                ColMargin();
            }
            function Alignment() {
                var alignmentClasses = $parent.attr('class').match(/text-align-[a-z]{4,6}/g);
                var alignClass = '';
                if (alignmentClasses !== null) {
                    alignClass = alignmentClasses[0];
                }
                $('.alignmentWrapper').find('i[data-class="' + alignClass + '"]').addClass('selected');
            }
            function AlignmentEvent() {
                $('.alignmentWrapper i').on('click', function () {
                    var $this = $(this);
                    $parent.removeClass('text-align-left').removeClass('text-align-center').removeClass('text-align-right');
                    $parent.addClass($this.attr('data-class'));
                    $('.alignmentWrapper i').removeClass('selected');
                    $this.addClass('selected');
                });
            }

            function Spacing() {
                //topPaddingSlider

                var $spacingLay = $parent;
                var $shadedLay = $parent.find('.editor-row-shaded-layer');
                if ($shadedLay.length > 0) {
                    $spacingLay = $shadedLay;
                }
                var paddingTopClasses = $spacingLay.attr('class').match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                var padTop = 0;
                if (paddingTopClasses !== null) {
                    padTop = parseInt(paddingTopClasses[0].trim().replace('editor-col-inner-top-space-', '')) / 10;
                }
                var paddingRightClasses = $spacingLay.attr('class').match(/editor-col-inner-right-space-[0-9]{2,3}/g);
                var padRight = 0;
                if (paddingRightClasses !== null) {
                    padRight = parseInt(paddingRightClasses[0].trim().replace('editor-col-inner-right-space-', '')) / 10;
                }
                var paddingBottomClasses = $spacingLay.attr('class').match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);
                var padBot = 0;
                if (paddingBottomClasses !== null) {
                    padBot = parseInt(paddingBottomClasses[0].trim().replace('editor-col-inner-bottom-space-', '')) / 10;
                }

                var paddingLeftClasses = $spacingLay.attr('class').match(/editor-col-inner-left-space-[0-9]{2,3}/g);
                var padLeft = 0;
                if (paddingLeftClasses !== null) {
                    padLeft = parseInt(paddingLeftClasses[0].trim().replace('editor-col-inner-left-space-', '')) / 10;
                }
                var handleTopSlider = $("#topPaddingHandle");
                $("#topPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padTop,
                    create: function () {
                        handleTopSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $parent;
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        if ($shadedLayer.length > 0) {
                            $spacingLayer = $shadedLayer;
                        }
                        var space = ui.value;
                        handleTopSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-top-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-top-space-' + space + '0');
                    }
                });

                var handleRightSlider = $("#rightPaddingHandle");
                $("#rightPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padRight,
                    create: function () {
                        handleRightSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {

                        var $spacingLayer = $parent;
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        if ($shadedLayer.length > 0) {
                            $spacingLayer = $shadedLayer;
                        }
                        var space = ui.value;
                        handleRightSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-right-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-right-space-' + space + '0');
                    }
                });
                var handleBottomSlider = $("#bottomPaddingHandle");
                $("#bottomPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padBot,
                    create: function () {
                        handleBottomSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $parent;
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        if ($shadedLayer.length > 0) {
                            $spacingLayer = $shadedLayer;
                        }
                        var space = ui.value;
                        handleBottomSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-bottom-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-bottom-space-' + space + '0');
                    }
                });
                var handleLeftSlider = $("#leftPaddingHandle");
                $("#leftPaddingSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: padLeft,
                    create: function () {
                        handleLeftSlider.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var $spacingLayer = $parent;
                        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
                        if ($shadedLayer.length > 0) {
                            $spacingLayer = $shadedLayer;
                        }
                        var space = ui.value;
                        handleLeftSlider.text(space);
                        var marginTopClass = $spacingLayer.attr('class').match(/editor-col-inner-left-space-[0-9]{2,3}/g);
                        if (marginTopClass !== null) {
                            $spacingLayer.removeClass(marginTopClass[0].trim());
                        }
                        $spacingLayer.addClass('editor-col-inner-left-space-' + space + '0');
                    }
                });
            }
            function BackImageSetting() {
                var classList = $parent.attr('class');
                if (typeof (classList) !== "undefined" && classList.length > 0) {
                    var parralPattern = /editor-row-bg-image-parallax/g;
                    var hasParallex = parralPattern.test(classList);
                    if (hasParallex) {
                        $('#activeParalax').prop('checked', true);
                    }
                    else {
                        $('#activeParalax').prop('checked', false);
                    }
                }
            }
            function removeImageBG() {
                RemoveShadedLayer();
                $parent.removeClass('editor-row-bg-image-parallax');
                $('#activeParalax').prop('checked', false);
                $parent.css({
                    'background-image': ''
                });
            }

            function GetUsedBgColor() {
                var extracolor = '';
                $('.editor-row').each(function () {
                    extracolor += '<span class="obtainColor  color-picker-holder" style="background-color: ' + $(this).css('background-color') + ';"></span>';
                });
                $('.editor-col').each(function () {
                    extracolor += '<span class="obtainColor  color-picker-holder" style="background-color: ' + $(this).css('background-color') + ';"></span>';
                });
                extracolor = '<span><i>Used colors :</i> ' + extracolor + '</span>';
                return extracolor;
            }
            function RemoveShadedLayer() {
                var appendElem = $parent.find('.editor-row-shaded-layer').children();
                $parent.append(appendElem);
                $parent.find('.editor-row-shaded-layer').remove();
                $('#divPickShaded').fadeOut(100);
                $('#shadedLayerActive').prop('checked', false);
            }
            function removeColorBG() {
                $parent.css({
                    'background-color': '',
                    'color': ''
                });
            }

            function RowBorderEvent() {
                var topWidth = $parent.css("border-top-width");
                topWidth = parseInt(topWidth.replace('px', ''));
                var handleTop = $("#rowTopBorderColorHandle");
                $("#rowTopBorderColorSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: topWidth,
                    create: function () {
                        handleTop.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleTop.text(space);
                        $parent.css({ "border-top-width": space });
                    }
                });

                var rightWidth = $parent.css("border-right-width");
                rightWidth = parseInt(rightWidth.replace('px', ''));
                var handleRight = $("#rowRightBorderColorHandle");
                $("#rowRightBorderColorSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: rightWidth,
                    create: function () {
                        handleRight.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleRight.text(space);
                        $parent.css({ "border-right-width": space });
                    }
                });

                var bottomWidth = $parent.css("border-bottom-width");
                bottomWidth = parseInt(bottomWidth.replace('px', ''));
                var handleBottom = $("#rowBottomBorderHandle");
                $("#rowBottomBorderSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: bottomWidth,
                    create: function () {
                        handleBottom.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleBottom.text(space);
                        $parent.css({ "border-bottom-width": space });
                    }
                });

                var leftWidth = $parent.css("border-bottom-width");
                leftWidth = parseInt(leftWidth.replace('px', ''));
                var handleLeft = $("#rowLeftBorderHandle");
                $("#rowLeftBorderSlider").slider({
                    range: "max",
                    min: 0,
                    max: 10,
                    value: leftWidth,
                    create: function () {
                        handleLeft.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        handleLeft.text(space);
                        $parent.css({ "border-left-width": space });
                    }
                });

                RowTopBorderColor();
                RowRightBorderColor();
                RowBottomBorderColor();
                RowLeftBorderColor();
                BoxShadow();
            }
            function RowTopBorderColor() {
                $('#rowTopBorderColor').css('background-color', $parent.css('border-top-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-top-color': topColor });
                        var colorPickerID = $elm.attr('id');
                        //switch (colorPickerID) {
                        //    case 'chooseFontColor':
                        //        $('.editor-component.activeSetting').children().not('div').eq(0).css({
                        //            'color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')'
                        //            //'color': textColor
                        //        });
                        //        break;
                        //}
                    }
                };
                $('#rowTopBorderColor').colorPicker(colorPickerOption);
            }
            function RowRightBorderColor() {
                $('#rowRightBorderColor').css('background-color', $parent.css('border-right-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-right-color': topColor });
                    }
                };
                $('#rowRightBorderColor').colorPicker(colorPickerOption);
            }
            function RowBottomBorderColor() {
                $('#rowBottomBorderColor').css('background-color', $parent.css('border-bottom-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-bottom-color': topColor });
                    }
                };
                $('#rowBottomBorderColor').colorPicker(colorPickerOption);
            }
            function RowLeftBorderColor() {
                $('#rowLeftBorderColor').css('background-color', $parent.css('border-left-color'));
                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }
                        var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                        $parent.css({ 'border-left-color': topColor });
                    }
                };
                $('#rowLeftBorderColor').colorPicker(colorPickerOption);
            }
            function RowBorderStyle() {
                var borderStyle = $parent.css('border-style');
                if (typeof (borderStyle) !== null) {
                    $('#colborderStyle').val(borderStyle);
                }
            }
            function RowBorderStyleEvent() {
                $('#colborderStyle').on('change', function () {
                    $parent.css('border-style', $(this).val());
                });
            }


            function ColBorderRadius() {
                var borderTopLeftRadius = $parent.css("border-top-left-radius");
                borderTopLeftRadius = parseInt(borderTopLeftRadius.replace('px', ''));
                var $BTLRHandle = $("#borderTopLeftRadiusHandle");
                $("#borderTopLeftRadiusSlider").slider({
                    range: "max",
                    min: 0,
                    max: 100,
                    value: borderTopLeftRadius,
                    create: function () {
                        $BTLRHandle.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        $BTLRHandle.text(space);
                        $parent.css({ "border-top-left-radius": space });
                    }
                });

                var borderTopRightRadius = $parent.css("border-top-right-radius");
                borderTopRightRadius = parseInt(borderTopRightRadius.replace('px', ''));
                var $BTRRHandle = $("#borderTopRightRadiusHandle");
                $("#borderTopRightRadiusSlider").slider({
                    range: "max",
                    min: 0,
                    max: 100,
                    value: borderTopRightRadius,
                    create: function () {
                        $BTRRHandle.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        $BTRRHandle.text(space);
                        $parent.css({ "border-top-right-radius": space });
                    }
                });

                var borderBottomLeftRadius = $parent.css("border-bottom-left-radius");
                borderBottomLeftRadius = parseInt(borderBottomLeftRadius.replace('px', ''));
                var $BBLRHandle = $("#borderBottomLeftRadiusHandle");
                $("#borderBottomLeftRadiusSlider").slider({
                    range: "max",
                    min: 0,
                    max: 100,
                    value: borderBottomLeftRadius,
                    create: function () {
                        $BBLRHandle.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        $BBLRHandle.text(space);
                        $parent.css({ "border-bottom-left-radius": space });
                    }
                });

                var borderBottomRightRadius = $parent.css("border-bottom-right-radius");
                borderBottomRightRadius = parseInt(borderBottomRightRadius.replace('px', ''));
                var $BBRRHandle = $("#borderBottomRightRadiusHandle");
                $("#borderBottomRightRadiusSlider").slider({
                    range: "max",
                    min: 0,
                    max: 100,
                    value: borderBottomRightRadius,
                    create: function () {
                        $BBRRHandle.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        $BBRRHandle.text(space);
                        $parent.css({ "border-bottom-right-radius": space });
                    }
                });
            }

            function ColMargin() {
                var marginLeft = $parent.css("margin-right");
                marginLeft = marginLeft.replace('px', '');
                var $ColMarginLeft = $("#colMarginLeftHandle");
                $("#colMarginLeftSlider").slider({
                    range: "max",
                    min: 0,
                    max: 40,
                    value: marginLeft,
                    create: function () {
                        $ColMarginLeft.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        $ColMarginLeft.text(space);
                        var sfColVal = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                        if (sfColVal !== null) {
                            var sfColPer = parseInt(sfColVal[0].split('_')[1]);
                            var marRight = $parent.css("margin-right");
                            marRight = marRight.replace('px', '');
                            var reduceSpace = (space + parseInt(dragcomponetwidth) + parseInt(marRight));
                            $parent.css({ 'width': 'calc( ' + sfColPer + '% - ' + reduceSpace + 'px )' });
                            $parent.css({ 'margin-left': space + 'px' });
                        }
                    }
                });


                var marginRight = $parent.css("margin-right");
                marginRight = marginRight.replace('px', '');
                var $ColMarginRight = $("#colMarginRightHandle");
                $("#colMarginRightSlider").slider({
                    range: "max",
                    min: 0,
                    max: 40,
                    value: marginRight,
                    create: function () {
                        $ColMarginRight.text($(this).slider("value"));
                    },
                    slide: function (event, ui) {
                        var space = ui.value;
                        $ColMarginRight.text(space);
                        var sfColVal = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                        if (sfColVal !== null) {
                            var sfColPer = parseInt(sfColVal[0].split('_')[1]);
                            var marLeft = $parent.css("margin-left");
                            marLeft = marLeft.replace('px', '');
                            var reduceSpace = (space + parseInt(dragcomponetwidth) + parseInt(marLeft));
                            $parent.css({ 'width': 'calc( ' + sfColPer + '% - ' + reduceSpace + 'px )' });
                            $parent.css({ 'margin-right': space + 'px' });
                        }
                    }
                });
            }

            function BoxShadow() {
                $('#shadowInset').off().on('click', function () {
                    parentBoxShadow();
                });
                $('#showBoxShadow').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        $('.boxShadowEffects').slideDown(400);
                        parentBoxShadow();
                    }
                    else {
                        $('.boxShadowEffects').slideUp(400);
                        $parent.css({ 'box-shadow': '' });
                    }
                });
                var objBoxShadow = {
                    'inset': '',
                    'horizontal': '5',
                    'vertical': '5',
                    'blur': '10',
                    'color': '#000',
                }
                var boxShadow = $parent.css('box-shadow');
                var boxShadowArr = boxShadow.split(' ');
                var horiLen = objBoxShadow.horizontal;
                var verLen = objBoxShadow.vertical;
                var blurRadius = objBoxShadow.blur;
                $('#boxShadowColor').css('background-color', '#000');
                if (boxShadow !== null && boxShadow !== 'none') {
                    var lenCol = boxShadow.match(/-?\d{1,3}px/g)
                    horiLen = parseInt(lenCol[0].replace('px', ''));
                    verLen = parseInt(lenCol[1].replace('px', ''));
                    blurRadius = parseInt(lenCol[2].replace('px', ''));
                    objBoxShadow.horizontal = horiLen;
                    objBoxShadow.vertical = verLen;
                    objBoxShadow.blur = blurRadius;
                    $('.boxShadowEffects').show();
                    $('#showBoxShadow').prop('checked', true);
                    var dropColor = boxShadow.replace(horiLen + 'px', '').replace(verLen + 'px', '').replace(blurRadius + 'px', '')
                    dropColor = dropColor.replace('inset', '').trim();
                    if (dropColor.length > 0) {
                        $('#boxShadowColor').css('background-color', dropColor);
                    }
                }
                else {
                    $('.boxShadowEffects').hide();
                    $('#showBoxShadow').prop('checked', false);
                }



                var hasInset = boxShadow.match('/inset/');
                if (hasInset !== null && hasInset.length > 0) {
                    $('#shadowInset').prop('checked', true);
                }
                else {
                    $('#shadowInset').prop('checked', false);
                }


                function parentBoxShadow() {
                    var shadowDOM = '';
                    shadowDOM += objBoxShadow.color + ' ';
                    shadowDOM += objBoxShadow.horizontal + 'px ';
                    shadowDOM += objBoxShadow.vertical + 'px ';
                    shadowDOM += objBoxShadow.blur + 'px ';
                    if ($('#shadowInset').prop('checked')) {
                        shadowDOM += 'inset ';
                    }
                    $parent.css({ 'box-shadow': shadowDOM });
                }

                function BoxShadowHoriLengthSlide(space) {
                    objBoxShadow.horizontal = space;
                    parentBoxShadow();
                }
                SageSlider($('#shadowHoriLengthSlider'), $('#shadowHoriLengthHandle'), -100, 100, horiLen, BoxShadowHoriLengthSlide);

                function BoxShadowVerticalLengthSlide(space) {
                    objBoxShadow.vertical = space;
                    parentBoxShadow();
                }
                SageSlider($('#shadowVerLengthSlider'), $('#shadowVerLengthHandle'), -100, 100, verLen, BoxShadowVerticalLengthSlide);

                function BoxShadowBlurSlide(space) {
                    objBoxShadow.blur = space;
                    parentBoxShadow();
                }
                SageSlider($('#shadowBlurSlider'), $('#shadowBlurHandle'), 0, 100, blurRadius, BoxShadowBlurSlide);

                var colorPickerOption = {
                    customBG: dropColor,
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        var colorInstance = this.color,
                            colorPicker = this;
                        $elm.prepend('<div class="cp-panel">' +
                            'R <input type="text" class="cp-r" /><br>' +
                            'G <input type="text" class="cp-g" /><br>' +
                            'B <input type="text" class="cp-b" /><hr>' +
                            'H <input type="text" class="cp-h" /><br>' +
                            'S <input type="text" class="cp-s" /><br>' +
                            'B <input type="text" class="cp-v" /><hr>' +
                            '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    },
                    renderCallback: function ($elm, toggled) {
                        var colors = this.color.colors.RND,
                            modes = {
                                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                HEX: this.color.colors.HEX
                            };
                        $('input', '.cp-panel').each(function () {
                            this.value = modes[this.className.substr(3)];
                        });
                        var colors = this.color.colors
                        var colorsRGB = colors.RND.rgb;
                        var alpha = colors.alpha;
                        var textColor = '';
                        if (colors.RGBLuminance > 0.22) {
                            textColor = '#222';
                        }
                        else {
                            textColor = '#ddd';
                        }

                        var clr = ' rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ') ';
                        //var clr = ' rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ') ';
                        objBoxShadow.color = clr;
                        parentBoxShadow();
                    }
                };
                $('#boxShadowColor').colorPicker(colorPickerOption);
            }
        },
        // 'defaultdata': rowInitStart + rowOption + columnCreateDOM + rowInitEnd
    },
    'rowseparator':
     {
         'componentname': 'rowseparator',
         'category': '',
         'defaultdata': $('#rowSeparator').html(),
         'settingDOM': $('#rowSeparatorSetting').html(),
         'onDrop': function () {
         },
         'loadSetting': function ($item) {
             var $parent = $item.parent().parent();
             $('.editor-row').find('.activeSetting').removeClass('activeSetting');
             $parent.addClass('activeSetting');
             var $sep = $parent.find('.rowSeparator');

             LoadSettings();
             InitEvents();
             function InitEvents() {
                 InitTab();
                 HeightWidth();
                 Style();
                 SepColor();
                 Spacing();
                 GeneralAlignment($parent);
                 GeneralAlignmentEvent($parent);
             }
             function LoadSettings() {

             }
             function HeightWidth() {
                 var topWidth = $sep.css("border-top-width");
                 topWidth = parseInt(topWidth.replace('px', ''));
                 function RowSepHeight(space) {
                     $sep.css("border-top-width", space + 'px');
                 }
                 SageSlider($('#sepHeightSlider'), $('#sepHeightHandle'), 1, 10, topWidth, RowSepHeight);

                 var sepWidth = 100;
                 var sfColVal = $sep.attr('class').match(/sfCol_[0-9]{1,3}/g);
                 if (sfColVal !== null) {
                     sepWidth = parseInt(sfColVal[0].split('_')[1]);
                 }
                 function RowSepWidth(space) {
                     var sfColVal = $sep.attr('class').match(/sfCol_[0-9]{1,3}/g);
                     if (sfColVal !== null) {
                         sepWidth = $sep.removeClass(sfColVal[0]);
                     }
                     $sep.addClass('sfCol_' + space);
                 }
                 SageSlider($('#sepWidthSlider'), $('#sepWidthHandle'), 1, 100, sepWidth, RowSepWidth);
             }

             function Style() {
                 var style = $sep.css('border-top-style');
                 $('#rowSepLine').val(style);

                 $('#rowSepLine').on('change', function () {
                     var selStyle = $(this).val();
                     $sep.css('border-top-style', selStyle);
                 });
             }
             function SepColor() {
                 $('#rowSepColor').css('background-color', $sep.css('border-top-color'));
                 var colorPickerOption = {
                     customBG: '#222',
                     margin: '4px -2px 0',
                     doRender: 'div div',
                     buildCallback: function ($elm) {
                         BuildColorPicker($elm, this);
                     },
                     renderCallback: function ($elm, toggled) {
                         var colors = this.color.colors.RND,
                             modes = {
                                 r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                                 h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                                 HEX: this.color.colors.HEX
                             };
                         $('input', '.cp-panel').each(function () {
                             this.value = modes[this.className.substr(3)];
                         });
                         var colors = this.color.colors
                         var colorsRGB = colors.RND.rgb;
                         var alpha = colors.alpha;
                         var textColor = '';
                         if (colors.RGBLuminance > 0.22) {
                             textColor = '#222';
                         }
                         else {
                             textColor = '#ddd';
                         }
                         var topColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                         $sep.css({ 'border-top-color': topColor });
                     }
                 };
                 $('#rowSepColor').colorPicker(colorPickerOption);
             }

             function Spacing() {
                 var marginTopClasses = $parent.attr('class').match(/editor-row-top-space-[0-9]{2,3}/g);
                 var mrgTop = 0;
                 if (marginTopClasses !== null) {
                     mrgTop = parseInt(marginTopClasses[0].trim().replace('editor-row-top-space-', '')) / 10;
                 }
                 var marginBottomClasses = $parent.attr('class').match(/editor-row-bottom-space-[0-9]{2,3}/g);
                 var mrgBot = 0;
                 if (marginBottomClasses !== null) {
                     mrgBot = parseInt(marginBottomClasses[0].trim().replace('editor-row-bottom-space-', '')) / 10;
                 }

                 function RowSepTop(space) {
                     var mgTopClasses = $parent.attr('class').match(/editor-row-top-space-[0-9]{2,3}/g);
                     if (mgTopClasses !== null) {
                         $parent.removeClass(mgTopClasses[0]);
                     }
                     $parent.addClass('editor-row-top-space-' + space + '0');
                 }

                 SageSlider($('#rowSepTopSlider'), $('#rowSepTopHandle'), 0, 10, mrgTop, RowSepTop);

                 function RowSepBottom(space) {
                     var mgBottomClasses = $parent.attr('class').match(/editor-row-bottom-space-[0-9]{2,3}/g);
                     if (mgBottomClasses !== null) {
                         $parent.removeClass(mgBottomClasses[0]);
                     }
                     $parent.addClass('editor-row-bottom-space-' + space + '0');
                 }

                 SageSlider($('#rowSepBottomSlider'), $('#rowSepBottomHandle'), 0, 10, mrgBot, RowSepBottom);

             }
         }
     },
    'underline': {
        'componentname': 'underline',
        'category': '',
        'componentBlockDOM': '',
        'defaultdata': '<div class="editor-component underline sfCol_100 text-align-center ">' + underlineOption + '<div class="rowSeparator sfCol_100" style="border-top-width: 1px; border-top-color: #000; border-top-style: solid"></div></div>',
        'settingDOM': $('#imageOptions').html(),
        'onDrop': function ($appendLayer) {

        },
        'loadSetting': function ($item) {

        }
    },
    'imagebgimage': {
        'componentname': 'imagebgimage',
        'defaultdata': $('#imageholderOption').html(),
        'onDrop': function ($appendLayer) {
            var $dropImage = $appendLayer.find('.editor-component.image').find('img');
            SageMedia($dropImage);
        },
    },
    'fetureOne': {
        'componentname': 'fetureOne',
        'defaultdata': $('#fetureOption').html(),
        'onDrop': function ($appendLayer) {
            var $dropImage = $appendLayer.find('.editor-component.image').find('img');
            SageMedia($dropImage);
        },
    },
    'beautiful': {
        'componentname': 'beautiful',
        'defaultdata': $('#beautifulOption').html(),
        'onDrop': function ($appendLayer) {
            var $dropImage = $appendLayer.find('.editor-component.image').find('img');
            SageMedia($dropImage);
        },
    },
    'rowline': {
        'componentname': 'rowline',
        'category': 'line',
        'componentBlockDOM': '',
        'defaultdata': $('#rowline').html(),
        'settingDOM': $('#imageOptions').html(),
        'onDrop': function ($appendLayer) {

        },
        'loadSetting': function ($item) {

        },
        'settingDOMs': {
            'tabs': {
                'Basic':
                    {
                        'DOM': '<span>Hello</span>',
                        'load': function ($parent) {

                        }
                    },
                'Background':
                    {
                        'options': ['image', 'color']
                    },
                'Spacing':
                    {
                        'options': {
                            'margin': {
                                'max': 40,
                                'min': -40,
                                'times': 5,
                                'position': ['all', 'top', 'left', 'bottom', 'right'],
                                'spacingLayer': function ($parent) {
                                    $('.editor-row').removeClass('activeSetting');
                                    var $parent = $elem.parents('.editor-row');//.parent();
                                    $parent.addClass('activeSetting');
                                    return $parent;
                                }
                            },
                            'padding': {
                                'max': 40,
                                'min': 0,
                                'times': 5,
                                'position': ['all', 'top', 'left', 'bottom', 'right'],
                                'spacingLayer': function ($parent) {
                                    $('.editor-row').removeClass('activeSetting');
                                    var $parent = $elem.parents('.editor-row');//.parent();
                                    $parent.addClass('activeSetting');
                                    return $parent;
                                }
                            }
                        }

                    },
                'Alignment':
                    {
                        'options': ['left', 'center', 'right']
                    },
                'Border': {
                    'options': {
                        'max': 20,
                        'min': 0,
                        'times': 1,
                        'position': ['all', 'top', 'right', 'bottom', 'left'],
                    }
                },
                'Box Radius':
                    {
                        'options': {
                            'max': 50,
                            'min': 0,
                            'times': 1,
                            'position': ['all', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
                        }
                    },
                'Box Shadow':
                    {
                        'options': {

                        }
                    }
            },
            'selectLayer': function ($elem) {
                $('.editor-row').removeClass('activeSetting');
                var $parent = $elem.parents('.editor-row');
                $parent.addClass('activeSetting');
                return $parent;
            },
        }
    }
};


//<div class="content-3 content-box" id="componentCollection">
//                        <h2>Components</h2>
//                        <span class="module-search">
//                            <input type="text" placeholder="Search">
//                        </span>
//                        <div class="comBasicHolder components-list">
//                            <!--<div id="draggable" class="ui-widget-content">
//                                <p>Drag me around</p>
//                            </div>-->
//                            <span draggable="true" class="rowBasic heartBeat com-row ui-state-highlight" data-type="row" id="createRow"><i class="icon-icon-row"></i>
//                                <br>
//                                Row</span>
//                            <span draggable="true" class="rowBasic com-row ui-state-highlight" data-type="rowline"><i class="icon-icon-row"></i>
//                                <br>
//                                test set</span>
//                            <span draggable="true" class="rowBasic com-row ui-state-highlight" data-type="rowseparator"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                row sep
//                            </span>
//                            <%--   <span draggable="true" class="rowBasic heartBeat com-row ui-state-highlight" data-type="component" data-dropid="dropcomponent1"><i class="icon-icon-row"></i>
//                                <br>
//                                COMPO</span>
//                            <span draggable="true" class="rowBasic heartBeat com-row ui-state-highlight" data-type="component" data-dropid="dropcomponent2"><i class="icon-icon-row"></i>
//                                <br>
//                                COMPO</span>--%>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="image"><i class="icon-img"></i>
//                                <br>
//                                Image</span>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="paragraph"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                Paragraph</span>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="imagepara"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                ImagePara</span>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="imagegall"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                ImageGall</span>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="holder"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                Holder</span>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="heading"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                Heading</span>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="fonticon"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                Font-Icon</span>
//                            <span draggable="true" class="comBasic com-row ui-state-highlight" data-type="underline"><i class="icon-icon-paragraph"></i>
//                                <br>
//                                UnderLine</span>

//                        </div>
//                        <br>
//                        <br>
//                        <div class="advanceComponent comBasicHolder components-list">
//                            <span draggable="true" class="rowBasic com-row ui-state-highlight" data-type="imagebgimage"><i class="icon-icon-row"></i>
//                                <br>
//                                IMG IMG</span>
//                            <span draggable="true" class="rowBasic com-row ui-state-highlight" data-type="fetureOne"><i class="icon-icon-row"></i>
//                                <br>
//                                Services</span>
//                            <span draggable="true" class="rowBasic com-row ui-state-highlight" data-type="beautiful"><i class="icon-icon-row"></i>
//                                <br>
//                                Beauty</span>
//                        </div>
//                    </div>


var abc = {
    "demoComponent": {
        "componentname": "demoComponent",
        "category": "line",
        "componentBlockDOM": "",
        "componentIcon": "",
        "row": false,
        "hidden": true,
        "defaultdata": $('#rowline').html(),
        "settingDOM": $('#imageOptions').html(),
        "onDrop": function ($appendLayer) {
        },
        "loadSetting": function ($item) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": "<span>Hello</span>",
                    "load": function ($parent) {

                    }
                },
                "Background":
                    {
                        "options": ["image", "color"]
                    },
                "Spacing":
                    {
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
                        }

                    },
                "Alignment":
                    {
                        "options": ["left", "center", "right"]
                    },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius":
                    {
                        "options": {
                            "max": 50,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                        }
                    },
                "Box Shadow":
                    {
                        "options": {

                        }
                    }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        },
        "remove": function ($cloneDOM) {

        },
        "package": {
            "name": "packagename",
            "API": [
                {
                    "ComponentID": 1,
                    "ComponentName": "",
                    "NameSpace": "SageFrame.WebBuilder",
                    "ClassNames": "WebBuilderController",
                    "MethodNames": "GetComponentByIDAndVersions",
                    "PageName": "home",
                    "Parameters": "1,1.1"
                },
            ]
        }
    }
}
var APIController = {
    "ComponentID": 1,
    "ComponentName": "",
    "NameSpace": "SageFrame.WebBuilder",
    "ClassNames": "WebBuilderController",
    "MethodNames": "GetComponentByIDAndVersions",
    "PageName": "home",
    "Parameters": "1,1.1"
}
var APICollection = [];
function APICollector(type, objAPIController) {
    var $packages = $('[data-type="' + type + '"]');
    if (!$packages.eq(0).hasClass('scanned')) {
        $packages.each(function () {
            var $this = $(this);
            var ComponenetID = EasyLibrary.GetComponenetID($this);
            objAPIController.ComponentID = ComponenetID;
            objAPIController.PageName = currentpageName;
            $this.addClass('scanned');
            APICollection.push(objAPIController);
        });
        if (APICollection.length > 0)
            component[dataType].package.API = APICollection;
    }
}

function Caller() {
    APIController.ComponentName = "News";
    APIController.NameSpace = "SageFrame.WebBuilder";
    APIController.ClassNames = "WebBuilderController";
    APIController.MethodNames = "GetComponentByIDAndVersions";
    APIController.Parameters = "1,1.1";
    APICollector('news', APIController);
}
