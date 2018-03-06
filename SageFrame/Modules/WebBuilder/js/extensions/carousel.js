var carousel = {
    "carousel": {
        "componentname": "carousel",
        "category": "advance",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "carousel",
        "defaultdata": EasyLibrary.ReadDOM("carouseldata"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($appendLayer.hasClass('site-body')) {
                var $imageSlider = $('.ImageSliderWrapper');
                $imageSlider.removeClass('binded');
                $imageSlider.each(function (index, value) {
                    var carousel = new CarouselInit($(this));
                });
            } else {
                $appendLayer.removeClass('binded');
                var carousel = new CarouselInit($appendLayer);
            }
        },
        "onsort": function (ui) {
            var $imageSlider = ui.find('.ImageSliderWrapper');
            $imageSlider.removeClass('binded');
            var carousel = new CarouselInit($imageSlider);
        },
        "loadSetting": function ($item) { },
        "common": {
            "InitHeading": function ($item, $parent) {
                $('#showHeadingCarousel').off().on('click', function () {
                    $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        var heading = DOMCreate('div', textOption + '<h1 contenteditable="true" data-spaceCollection="carHeadChild" class="carHeadChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">This is heading </h1>', 'editor-component com-heading carouselheading sfCol_100 text-align-center carHeadPar', '', ['data-childCollection="carHeadChild"', 'data-parCollection="carHeadPar"', 'data-alignCollection="carHeadPar"']);
                        var textwrapper = $imageWrapper.find('.textWrapper').length;
                        var $appendLayer = '';
                        $imageWrapper.each(function () {
                            if ($(this).find('.textWrapper').length == 0) {
                                $(this).append('<div class="textWrapper"></div>');
                            }
                        });
                        $imageWrapper.find('.textWrapper').prepend(heading);
                        SettingEvents();
                    } else {
                        $imageWrapper.find('.textWrapper').find('.carouselheading').remove();
                        if (!$imageWrapper.find('.textWrapper').is(':parent')) {
                            $imageWrapper.find('.textWrapper').remove();
                        }
                    }
                    component.carousel.settingDOMs.tabs.Data.onload($item);
                });
                $('#showParagraphCarousel').off().on('click', function () {
                    $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        var paragraph = DOMCreate('div', textOption + '<p contenteditable="true" data-spaceCollection="carParaChild" class="carParaChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>', 'editor-component com-heading carouselParagraph sfCol_100 text-align-center carParaPar', '', ['data-childCollection="carParaChild"', 'data-parCollection="carParaPar"', 'data-alignCollection="carParaPar"']);
                        //var paragraph = '<p contenteditable="true">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>';
                        var textwrapper = $imageWrapper.find('.textWrapper').length;
                        var $appendLayer = '';
                        $imageWrapper.each(function () {
                            if ($(this).find('.textWrapper').length == 0) {
                                $(this).append('<div class="textWrapper"></div>');
                            }
                        });
                        $imageWrapper.find('.textWrapper').append(paragraph);
                        SettingEvents();
                    } else {
                        $imageWrapper.find('.textWrapper').find('.carouselParagraph').remove();
                        if (!$imageWrapper.find('.textWrapper').is(':parent')) {
                            $imageWrapper.find('.textWrapper').remove();
                        }
                    }
                    component.carousel.settingDOMs.tabs.Data.onload($item);
                });

                $('#showrReadMoreCarousel').off().on('click', function () {
                    $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        var btnCarousel = EasyLibrary.ReadDOM("carouselbtn");
                        var textwrapper = $imageWrapper.find('.textWrapper').length;
                        var $appendLayer = '';
                        $imageWrapper.each(function () {
                            if ($(this).find('.textWrapper').length == 0) {
                                $(this).append('<div class="textWrapper"></div>');
                            }
                        });
                        $imageWrapper.find('.textWrapper').append(btnCarousel);
                        SettingEvents($parent);
                        component.carousel.settingDOMs.tabs.Data.onload($item);
                    } else {
                        $imageWrapper.find('.textWrapper').find('.editor-component.button').remove();
                        if (!$imageWrapper.find('.textWrapper').is(':parent')) {
                            $imageWrapper.find('.textWrapper').remove();
                        }
                    }
                });
            },
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("carouselbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        if ($parent.hasClass('.editor-row-shaded-layer'))
                            $parent = $parent.parent();
                        var $imageWrapper = $parent.find('.itemWrapper');
                        LoadSettings();
                        InitEvents();

                        function LoadSettings() {
                            var $firstSlider = $imageWrapper.eq(0);
                            var contains = $firstSlider.find('img');
                            if (contains.length > 0) {
                                $('#showImageCarousel').prop('checked', true);
                            } else {
                                $('#showImageCarousel').prop('checked', false);
                            }
                            if ($parent.hasClass('fullpagebanner')) {
                                $('#heightAdjustCarousel').prop('checked', true);
                                $('#heightadjust').hide();
                            } else {
                                $('#heightAdjustCarousel').prop('checked', false);
                                $('#heightadjust').show();
                            }
                            contains = $firstSlider.find('h1');
                            if (contains.length > 0) {
                                $('#showHeadingCarousel').prop('checked', true);
                            } else {
                                $('#showHeadingCarousel').prop('checked', false);
                            }
                            contains = $firstSlider.find('.editor-component.button');
                            if (contains.length > 0) {
                                $('#showrReadMoreCarousel').prop('checked', true);
                            } else {
                                $('#showrReadMoreCarousel').prop('checked', false);
                            }
                            contains = $firstSlider.find('p');
                            if (contains.length > 0) {
                                $('#showParagraphCarousel').prop('checked', true);
                            } else {
                                $('#showParagraphCarousel').prop('checked', false);
                            }
                            if ($parent.find('.arrows-wrapper').hasClass('hide-element')) {
                                $('#showArrowCarousel').prop('checked', false);
                            } else {
                                $('#showArrowCarousel').prop('checked', true);
                            }
                            if ($parent.find('.pager-dot').hasClass('hide-element')) {
                                $('#showDotsCarousel').prop('checked', false);
                            } else {
                                $('#showDotsCarousel').prop('checked', true);
                            }
                            var tranType = $parent.attr('data-transition');
                            if (typeof (tranType) !== "undefined")
                                $('#carouselAnimation').val(tranType);
                            var loop = $parent.attr('data-loop');
                            if (typeof loop !== "undefined" && loop.length > 0) {
                                $('#AutoSlideCarousel').prop('checked', true);
                            } else {
                                $('#AutoSlideCarousel').prop('checked', false);
                            }
                        }

                        function InitEvents() {
                            $('#addCarosel').on('click', function () { });
                            $('#showImageCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {

                                    if ($parent.find('.hideimage').length > 0) {
                                        $parent.find('.hideimage').each(function () {
                                            var src = $(this).attr('data-imgsrc');
                                            $(this).prepend('<img src="' + src + '">');
                                        });
                                    } else {
                                        var image = '<img  src="' + webbuildermodulepath + '/img/def1.jpg">';
                                        $imageWrapper.prepend(image);
                                    }
                                } else {
                                    $parent.find('img').each(function () {
                                        var $im = $(this);
                                        $im.parent().attr('data-imgsrc', $im.attr('src')).addClass('hideimage');
                                        $im.remove();
                                    });
                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });
                            $('#heightAdjustCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('fullpagebanner');
                                    AdjustSizeFullpage($parent);
                                    $('#heightadjust').hide();
                                } else {
                                    RemoveCarouselHeight($parent);
                                    ChangeSliderValue($('#carouselHeightSlider'), 400);
                                    $parent.removeClass('fullpagebanner');
                                    $('#heightadjust').show();
                                }
                            });
                            component["carousel"].common.InitHeading($item, $parent);
                            $('#showArrowCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.find('.arrows-wrapper').removeClass('hide-element');
                                } else {
                                    $parent.find('.arrows-wrapper').addClass('hide-element');
                                }
                            });
                            $('#showDotsCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.find('.pager-dot').removeClass('hide-element');
                                } else {
                                    $parent.find('.pager-dot').addClass('hide-element');
                                }
                            });
                            $('#carouselAnimation').off().on('change', function () {
                                var type = $(this).val();
                                $parent.attr('data-transition', type);
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            $('#AutoSlideCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.attr('data-loop', "loop");
                                } else {
                                    $parent.attr('data-loop', "");
                                }
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            var itemsPerSlider = 0;
                            if (typeof ($parent.attr('data-perslider')) !== "undefined") {
                                itemsPerSlider = parseInt($parent.attr('data-perslider'));
                            }
                            $('#itemsperslider').val(itemsPerSlider);
                            $('#itemsperslider').on('change', function () {
                                var $this = $(this);
                                var perSlider = $this.val();
                                $parent.attr('data-perslider', perSlider);
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            var caroHeight = $parent.height();

                            function ChangeCaroselHeight(space) {
                                $parent.height(space);
                            }
                            AdvanceSageSlider($('#carouselHeightSlider'), $('#carouselHeightHandle'), 0, 1000, caroHeight, ChangeCaroselHeight, $parent, 'px');
                        }
                    }
                },
                "Data": {
                    "DOM": EasyLibrary.ReadDOM("carouseltabdom"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var deleteIcon = divStart("Remove") + '<i class="icon-icon-delete deleteCarouselItem" title="delete"></i>' + divEnd;
                        initImages();
                        initEvents();

                        function initImages() {
                            var $imageSliderWrapper = $parent.find('.itemsWrapper');
                            var $carousels = $imageSliderWrapper.find('.itemWrapper');
                            var items = $carousels.length;
                            var carouselDOM = '<ul>';
                            for (var i = 0; i < items; i++) {
                                var $elem = $carousels.eq(i);
                                carouselDOM += '<li>';
                                carouselDOM += divStart("carouselItem");
                                carouselDOM += '<img src="' + $elem.find('img').attr('src') + ' " />';
                                carouselDOM += divStart("textWrapper");
                                if ($("#showHeadingCarousel").is(':checked'))
                                    carouselDOM += '<h1 contenteditable="true">' + $elem.find('h1').text() + ' </h1>';
                                if ($("#showParagraphCarousel").is(':checked'))
                                    carouselDOM += '<p contenteditable="true">' + $elem.find('p').text() + ' </p>';
                                carouselDOM += divEnd;
                                carouselDOM += divEnd;
                                carouselDOM += deleteIcon;
                                carouselDOM += '</li>';
                            }
                            $('#imagecollection').html(carouselDOM);
                            //remove unwanted
                            $('#imagecollection').find('')
                            DeleteRow();
                            $('#imagecollection').find('img').each(function () {
                                var $this = $(this);
                                $this.on('click', function () {
                                    $this.SageMedia({
                                        userModuleID: webBuilderUserModuleID,
                                        onSelect: function (src, response, type, filename, extension) {
                                            $this.attr('src', src);
                                            var index = $('#imagecollection').find('img').index($this);
                                            $parent.find('.itemWrapper').find('img').eq(index).attr('src', src);
                                        },
                                        mediaType: 'image'
                                    });
                                });
                            });
                            $('#imagecollection').find('li').each(function () {
                                initTextEdit($(this));
                            });
                        }

                        function initEvents() {
                            $('#btnAddnewCarousel').on('click', function () {

                                if ($("#showImageCarousel").is(':checked')) {
                                    $(this).SageMedia({
                                        userModuleID: webBuilderUserModuleID,
                                        onSelect: function (src, response, type, filename, extension) {
                                            AppendImage(src);
                                        },
                                        mediaType: 'image'
                                    });
                                } else {
                                    AppendImage('');
                                }
                                var $imageSliderWrapper = $parent.find('.itemsWrapper');
                                var $carousels = $('#imagecollection').find('ul li');
                                var slider = '';

                                function AppendImage(src) {
                                    var newHtml = '';
                                    var img = '';
                                    if (src.length > 0) {
                                        img += '<img src="' + src + '">';
                                    }
                                    var text = '';
                                    var data = '';
                                    if ($("#showHeadingCarousel").is(':checked')) {
                                        data += '<h1 contenteditable="true">This is heading</h1>';
                                        text += DOMCreate('div', textOption + '<h1 contenteditable="true" data-spaceCollection="carHeadChild" class="carHeadChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">This is heading </h1>', 'editor-component com-heading carouselheading sfCol_100 text-align-center carHeadPar', '', ['data-childCollection="carHeadChild"', 'data-parCollection="carHeadPar"', 'data-alignCollection="carHeadPar"']);;
                                    }
                                    if ($("#showParagraphCarousel").is(':checked')) {
                                        data += '<p contenteditable="true">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>';
                                        text += DOMCreate('div', textOption + '<p contenteditable="true" data-spaceCollection="carParaChild" class="carParaChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>', 'editor-component com-heading carouselParagraph sfCol_100 text-align-center carParaPar', '', ['data-childCollection="carParaChild"', 'data-parCollection="carParaPar"', 'data-alignCollection="carParaPar"']);
                                    }
                                    if ($("#showParagraphCarousel").is(':checked')) {
                                        text += EasyLibrary.ReadDOM("carouselbtn");
                                    }
                                    slider = img;
                                    if (text.length > 0) {
                                        slider += DOMCreate('div', text, 'textWrapper');
                                    }
                                    newHtml = img + DOMCreate('div', data, 'textWrapper');
                                    newHtml = divStart("carouselItem") + newHtml + divEnd + deleteIcon;
                                    $('#imagecollection').find('ul').append('<li>' + newHtml + '</li>');
                                    $imageSliderWrapper.append('<li class="itemWrapper">' + slider + '</li>');
                                    $parent.find('.ImageSliderWrapper').removeClass('binded');
                                    InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                                    var $lastchild = $('#imagecollection').find('img').last();
                                    $lastchild.on('click', function () {
                                        $lastchild.SageMedia({
                                            userModuleID: webBuilderUserModuleID,
                                            onSelect: function (src, response, type, filename, extension) {
                                                $lastchild.attr('src', src);
                                                var index = $('#imagecollection').find('img').index($lastchild);
                                                $parent.find('.itemWrapper').find('img').eq(index).attr('src', src);
                                            },
                                            mediaType: 'image'
                                        });
                                    });
                                    initTextEdit($lastchild.parent().parent());
                                    component["carousel"].common.InitHeading($item, $parent);
                                    DeleteRow();
                                    SettingEvents();
                                }
                            });
                        }
                        function initTextEdit($this) {
                            //console.log(1)
                            $this.find("h1").off().on('blur keyup', function () {
                                //console.log('keyup')
                                var index = $('#imagecollection').find('h1').index($this.find("h1"));
                                $parent.find('.itemWrapper').find('h1').eq(index).text($(this).text());
                            });

                            $this.find("p").off().on('blur keyup', function () {
                                var index = $('#imagecollection').find('p').index($this.find("p"));
                                $parent.find('.itemWrapper').find('p').eq(index).text($(this).text());
                            });
                        }

                        function DeleteRow() {
                            $('.deleteCarouselItem').off().on('click', function () {
                                var $this = $(this);
                                SageConfirmDialog('Do you want to delete.').done(function () {
                                    var $slider = $this.parent().parent();
                                    var index = $('#imagecollection').find('ul li').index($slider);
                                    $slider.remove();
                                    $parent.find('.itemWrapper').eq(index).remove();
                                    $parent.find('.ImageSliderWrapper').removeClass('binded');
                                    InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                                });
                            });
                        }
                    }

                },
                "Background": {
                    "options": ["image", "color"]
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
                    }
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },

                "Box Shadow": {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }
}
