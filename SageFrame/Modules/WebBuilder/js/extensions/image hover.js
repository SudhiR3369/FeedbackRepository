var image_hover = {
    "image hover": {
        "componentname": "image hover",
        "category": "advance",
        "collection": true,
        "icon": "fa fa-link",
        "row": false,
        "hidden": false,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("imageHoverComp"), //,
        "onDrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            var getLib = GetLibrary("image hover");
            var getActiveClass = getLib.GetActiveClass;
            var setStartupCss = getLib.SetStartupCSS;

            // PRIMARY STATE
            var SetDefaultControlVisilibity = function (imageListBox) {
                setStartupCss(imageListBox);

                switch (getActiveClass(imageListBox)) {

                    case 'data-slidefrom-up': imageListBox.css({ "top": "0", "left": "0" }); break;
                    case 'data-slidefrom-down': imageListBox.css({ "bottom": "0", "left": "0", "top": "" }); break;
                    case 'data-slidefrom-left': imageListBox.css({ "left": "0", "top": "0" }); break;
                    case 'data-slidefrom-right': imageListBox.css({ "right": "0", "top": "0", "left": "" }); break;
                    case 'data-zoom-in': imageListBox.css({ "transform": "scale(1)", "left": "0" }); break;
                    case 'data-zoom-out': imageListBox.css({ "transform": "scale(0.5)", "left": "0" }); break;
                    default: imageListBox.css({ "top": "0", "left": "0" }); break;
                }

            }

            $appendLayer.find('.imageHoverBox').each(function () {

                var $this = $(this);
                SetDefaultControlVisilibity($this);

                $this.parents('imageHoverContainer')
                    .off('mouseenter').mouseenter(function () {

                        var imgHvrBox = $(this).find('.imageHoverBox');
                        imgHvrBox.css({ "opacity": "1", "visibility": "visible" });

                        var activeClass = getActiveClass(imgHvrBox);

                        switch (activeClass) {
                            case 'data-slidefrom-up': imgHvrBox.css({ "top": "0" }); break;
                            case 'data-slidefrom-down': imgHvrBox.css({ "bottom": "0", "top": "" }); break;
                            case 'data-slidefrom-left': imgHvrBox.css({ "left": "0" }); break;
                            case 'data-slidefrom-right': imgHvrBox.css({ "right": "0", "left": "" }); break;
                            case 'data-zoom-in': imgHvrBox.css({ "transform": "scale(1)", "left": "0" }); break;
                            case 'data-zoom-out': imgHvrBox.css({ "transform": "scale(0.5)", "left": "0" }); break;
                            default: break;
                        }

                    }).off('mouseleave').mouseleave(function () {

                        var imgHvrBox = $(this).parent().find('.imageHoverBox');
                        SetDefaultControlVisilibity(imgHvrBox);
                    });

            });


            $appendLayer.find('.dis-table').find('i').off().on("click", function () {

                //$appendLayer.find('.imagehoverIcon').find('div').eq(2).find('i').off().on("click", function () {

                var $this = $(this);
                var displayElement = $this.parents('.imageHoverContainer').find('.editor-image')[0].outerHTML;
                getLib.DisplayContent(displayElement);

            });

        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("imageHoverCompBasicSettings"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();

                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {

                            //debugger;
                            //var linkEffect = $parent.attr('data-linkeffect');

                            //if (linkEffect) $('#slcImageLinkDisplayEffect').val(linkEffect);
                            //else$('#slcImageLinkDisplayEffect').val(0);

                            var isIconHidden = $parent.find('.imagehoverIcon').hasClass('hide-element');
                            if (!isIconHidden)
                                $('#showImageLinkIcon').prop('checked', true);

                            var isImageLinkDetailVisible = $parent.find('.imagehoverDescription').hasClass('hide-element');
                            if (!isImageLinkDetailVisible)
                                $('#showImageLinkDetail').prop('checked', true);


                            var imgHoverBox = $parent.find('.imageHoverBox');
                            var selectedClass = '';
                            imgHoverBox.each(function (i, v) {

                                var $classes = $(this).attr('class').match(/data-(\w+)(-(\w+)){0,1}/g);

                                if ($classes !== null) {
                                    selectedClass = $classes[0];
                                }
                            });
                            if (selectedClass === '') $('#slcImageLinkDisplayEffect').val(0);
                            else $('#slcImageLinkDisplayEffect').val(selectedClass);


                            var imgHvrAction = imgHoverBox.attr('data-imghvraction');

                            if (imgHvrAction) $('#slcImageLinkClickAction').val(imgHvrAction);
                            else $('#slcImageLinkClickAction').val(0);



                        }

                        function TriggerEvents() {

                            $('#refresImageLnkWidth').on('click', function () {
                                $parent.css({ 'height': '' });

                                var $image = $parent.find('img').eq(0);
                                $image.css({ 'height': '' });
                                setTimeout(function () {
                                    var holderheights = $image.height();

                                    ChangeSliderValue($('#imgHoverHeightSlider'), holderheights);
                                }, 500);
                            });

                            var sfImageWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            var imageWidth = 100;
                            if (sfImageWidth !== null) {
                                imageWidth = sfImageWidth[0].split('_')[1];
                            }

                            function ImageWidthSlider(space) {
                                var imageWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);

                                var $img = $parent.find('img');

                                if (imageWidthClass !== null) {
                                    $parent.removeClass(imageWidthClass[0]).addClass('sfCol_' + space);
                                    $img.removeClass(imageWidthClass[0]).addClass('sfCol_' + space);
                                }
                                else {
                                    $parent.addClass('sfCol_' + space);
                                    $img.addClass('sfCol_' + space);
                                }

                            }

                            AdvanceSageSlider($('#imgHoverWidthSlider'), $('#imgHoverWidthHandle'), 1, 100, imageWidth, ImageWidthSlider, $parent, '%');


                            var caroHeight = $parent.height();

                            function ChangeImgLinkHeight(space) {
                                $parent.height(space);
                                $parent.find('img').height(space);
                            }

                            AdvanceSageSlider($('#imgHoverHeightSlider'), $('#imgHoverHeightHandle'), 0, 1000, caroHeight, ChangeImgLinkHeight, $parent, 'px');


                            // IMAGE HOVER EFFECT
                            $('#slcImageLinkDisplayEffect').off().on('change', function () {
                                var selectedEffect = $(this).find("option:selected").val();

                                $parent.attr({ 'data-linkeffect': selectedEffect });

                                $parent.find('.imageHoverContainer').attr({ 'data-linkeffect': selectedEffect });

                                $parent.find('.imageHoverBox').each(function (i, v) {
                                    var $me = $(this);
                                    var $classes = $me.attr('class').match(/data-(\w+)(-(\w+)){0,1}/g);

                                    if ($classes !== null) {
                                        $me.removeClass($classes[0]);
                                    }
                                    $me.addClass(selectedEffect);
                                });
                            });



                            $('#showImageLinkIcon').off().on('click', function () {
                                var isIconChecked = $(this).is(':checked');
                                if (!isIconChecked) {
                                    $parent.find('.imagehoverIcon').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.imagehoverIcon').each(function () {
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#showImageLinkDetail').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    $parent.find('.imagehoverDescription').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.imagehoverDescription').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#slcImageLinkClickAction').off().on('change', function () {
                                var $this = $(this);
                                var selectedAction = $this.find("option:selected").val();

                                var imgHoverWrapper = $this.parents('.imageHoverWrapper');
                                var gotoBox = imgHoverWrapper.find('.imghvrgotobox');
                                if (gotoBox.length !== 0) {
                                    gotoBox.remove();
                                }


                                $parent.find('.imageHoverBox').each(function (i, v) {
                                    $(this).attr({ 'data-imghvraction': selectedAction });
                                });

                                switch (selectedAction) {
                                    case 'imghvraction-goto':
                                        {
                                            //var gotoBox = $this.parents('.imageHoverWrapper').find('.imghvrgotobox').length;

                                            if (gotoBox.length === 0) {
                                                var html = '';
                                                html += '<div class="field-row clearfix imghvrgotobox">';
                                                html += '<div class="field-row clearfix">';
                                                html += '<label>Goto</label>';
                                                html += '<span class="value">';
                                                html += '<input type="text" class="imghvrgoto" value="#" />';
                                                html += '</span>';
                                                html += '</div>';
                                                html += '</div>';

                                                imgHoverWrapper.children().children().last().append(html);
                                            }
                                        }
                                        break;

                                    default: break;

                                }
                            });


                            $(".imghvrgoto").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value === "") value = "#";

                                //var dataClass = $(this).parent().find('.socialLinkIcon').data('class');
                                //var $comEle = $parent.find('.socialAchor[data-class="' + dataClass + '"]');
                                //$comEle.attr("href", value);
                            });


                        }


                    }
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
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    },
                },


                "Box Shadow":
                {
                    "options": {

                    }
                },

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },

        },
        "view": {
            "view": function () {
                var displayContent = this.library.DisplayContent;

                var GetActiveClass = function (imageListBox) {

                    var activeClass = '';

                    var regex = /data-(\w+)(-(\w+)){0,1}/g;
                    var $classes = imageListBox.attr('class').match(regex);
                    if ($classes !== null) {
                        activeClass = $classes[0];
                    }

                    return activeClass;
                }


                var SetDefaultControlVisilibity = function (imageListBox) {

                    imageListBox
                        .css({
                            "position": "absolute",
                            "height": "100%",
                            "width": "100%",
                            "transition": "all .4s ease",
                            "opacity": "0",
                            "visibility": "hidden",
                            //"overflow": "hidden"
                        })


                    switch (GetActiveClass(imageListBox)) {

                        //switch (GetActiveClass(imageListBox)) {

                        case 'data-slidefrom-up': imageListBox.css({ "top": "-100%", "left": "0" }); break;
                        case 'data-slidefrom-down': imageListBox.css({ "bottom": "-100%", "left": "0" }); break;
                        case 'data-slidefrom-left': imageListBox.css({ "left": "-100%", "top": "0" }); break;
                        case 'data-slidefrom-right': imageListBox.css({ "right": "-100%", "top": "0", "left": "" }); break;
                        case 'data-zoom-in': imageListBox.css({ "transform": "scale(0.5)", "left": "0" }); break;
                        case 'data-zoom-out': imageListBox.css({ "transform": "scale(1)", "left": "0" }); break;
                        default: break;
                    }

                }
                var imageHoverContainer = $('.imgHoverImage').parent();

                imageHoverContainer.css({ "overflow": "hidden" });


                var imageHoverBox = imageHoverContainer.find('.imageHoverBox');

                imageHoverBox.each(function () {

                    SetDefaultControlVisilibity($(this));
                });

                imageHoverContainer.off('mouseenter').mouseenter(function () {

                    var imgHvrBox = $(this).find('.imageHoverBox');
                    imgHvrBox.css({ "opacity": "1", "visibility": "visible" });

                    switch (GetActiveClass(imgHvrBox)) {
                        case 'data-slidefrom-up': imgHvrBox.css({ "top": "0" }); break;
                        case 'data-slidefrom-down': imgHvrBox.css({ "bottom": "0", "top": "" }); break;
                        case 'data-slidefrom-left': imgHvrBox.css({ "left": "0" }); break;
                        case 'data-slidefrom-right': imgHvrBox.css({ "right": "0", "left": "" }); break;
                        case 'data-zoom-in': imgHvrBox.css({ "transform": "scale(1)" }); break;
                        case 'data-zoom-out': imgHvrBox.css({ "transform": "scale(0.5)" }); break;
                        default: imgHvrBox.css({ "top": "0", "left": "0" }); break;

                    }

                }).off('mouseleave').mouseleave(function () {
                    var imgHvrBox = $(this).parent().find('.imageHoverBox');
                    SetDefaultControlVisilibity(imgHvrBox);
                });


                //imageHoverContainer.find('.imagehoverIcon').find('> div').eq(2).find('> i').off().on("click", function () {
                //imageHoverContainer.find('.imagehoverIcon').find('div').eq(2).find('i').off().on("click", function () {
                imageHoverContainer.find('.dis-table').find('i').off().on("click", function () {
                    var $this = $(this);
                    var displayElement = $this.parents('.imageHoverContainer').find('.editor-image')[0].outerHTML;

                    displayContent(displayElement);

                });


            },

            "library": {

                "GetActiveClass": function (imageListBox) {
                    var activeClass = '';

                    var regex = /data-(\w+)(-(\w+)){0,1}/g;
                    imageListBox.each(function (i, v) {
                        var $me = $(this);
                        var $classes = $me.attr('class').match(regex);
                        if ($classes !== null) {
                            activeClass = $classes[0];
                        }
                    });
                    return activeClass;
                },

                "SetStartupCSS": function (imageListBox) {
                    imageListBox
                        .css({
                            "position": "absolute",
                            "height": "100%",
                            "width": "100%",
                            "transition": "all .4s ease",
                        })
                    $('.imageHoverButton').css({ "cursor": "pointer" });


                },

                "SetSliderPrimaryState": function (activeClass, imgHvrBox) {
                    switch (activeClass) {

                        case 'data-slidefrom-up': imgHvrBox.css({ "top": "-100%", "left": "0" }); break;
                        case 'data-slidefrom-down': imgHvrBox.css({ "bottom": "-100%", "left": "0", "top": "" }); break;
                        case 'data-slidefrom-left': imgHvrBox.css({ "left": "-100%", "top": "0" }); break;
                        case 'data-slidefrom-right': imgHvrBox.css({ "right": "-100%", "top": "0", "left": "" }); break;
                        case 'data-zoom-in': imgHvrBox.css({ "transform": "scale(0.5)", "left": "0", "top": "" }); break;
                        case 'data-zoom-out': imgHvrBox.css({ "transform": "scale(1)", "left": "0", "top": "" }); break;
                        default: imgHvrBox.css({ "left": "0", "top": "" }); break;
                    }
                },

                "DisplayContent": function ($content) {
                    FullPagePopup({
                        data: '<div class="sfCol_100" >' + $content + '</div>',
                        heading: "Preview",
                        height: '90%',
                        width: '90%',
                        showheading: true,
                        onappend: function ($wrapper) {
                            $wrapper.find('img').css({ "height": "auto", "width": "100%" });
                        }
                    });


                }

            }
        },

        "remove": function ($cloneDOM) {

            var getLib = GetLibrary("image hover");
            var setStartupCss = getLib.SetStartupCSS;
            var setSliderPrimaryState = getLib.SetSliderPrimaryState;

            var imageHoverBoxes = $cloneDOM.find('.imageHoverBox');

            imageHoverBoxes.each(function (i, v) {
                var $me = $(this);


                var activeClass = '';
                var $classes = $me.attr('class').match(/data-(\w+)(-(\w+)){0,1}/g);
                if ($classes !== null) {
                    activeClass = $classes[0];
                }


                setStartupCss($me);
                $me.css({ "visibility": "hidden" });
                setSliderPrimaryState(activeClass, $me);

            });


        },

    }
}
