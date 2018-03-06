var demo = {
    "demo": {
        "componentname": "demo",
        "category": "basic",
        "icon": "fa fa-star",
        "row": false,
        "collection": true,
        "hidden": false,
        "defaultdata": "",
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("fonticonbasictab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $fontIcon = $item.parent().next().children();
                        InitEvents();

                        function InitEvents() {
                            $('.fontIconCollection').html(EasyLibrary.FontCollectionList());
                            FontWrapperSize();
                            FontSize();
                            FontIconColor();
                            SearchFontIcon();
                        }
                        //var fontIconThreshold = 5;
                        function FontWrapperSize() {
                            var fontWrapperSize = parseInt(parseInt($parent.css('height'))) / 5;

                            function FontWrapperSizeChange(space) {
                                $parent.css({
                                    'height': space * 5,
                                    'width': space * 5
                                });
                            }
                            AdvanceSageSlider($('#fontIconbackHeightSlider'), $('#fontIconbackHeightHandle'), 0, 200, fontWrapperSize, FontWrapperSizeChange, $parent, 'px');
                        }

                        function FontSize() {
                            var fontsize = parseInt($fontIcon.css('font-size').replace('px', '') / 5);

                            function FontSizeChange(space) {
                                $fontIcon.css('font-size', space * 5);
                            }
                            AdvanceSageSlider($('#fontIconHeightSlider'), $('#fontIconHeightHandle'), 0, 200, fontsize, FontSizeChange, $parent, 'px');
                        }

                        function FontIconColor() {
                            $('#fontIconColor').css('background-color', $fontIcon.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $fontIcon.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#fontIconColor').colorPicker(colorPickerOption);
                        }

                        function SearchFontIcon() {
                            $('#searchIcons').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('.fontIconCollection').find('li').each(function () {
                                    var $this = $(this);
                                    var dataClass = $this.find('i').attr('data-class');
                                    var pos = dataClass.indexOf(searchVal);
                                    if (pos < 0) {
                                        $this.addClass('content-hide');
                                    } else {
                                        $this.removeClass('content-hide');
                                    }
                                });
                            });
                            var fontClasses = $fontIcon.attr('class').replace('fa ', '').replace('onhovercolor', '').trim();
                            $('.fontIconCollection').find('li i[data-class="' + fontClasses + '"]').parent().addClass('selected');
                            $('.fontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                $fontIcon.attr('class', 'onhovercolor fa ' + chooseClass);
                                $('.fontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                            });
                        }
                    }
                },
                "Background": {
                    "options": ["color"]
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
                        "position": ["all"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": ["all", "color", "zoom", "Inherit"]
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
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
                var $parent = $elem.parent().parent();
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            },
        }
    }
}