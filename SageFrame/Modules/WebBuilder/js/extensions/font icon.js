var font_icon = {
    "font icon": {
        "componentname": "font icon",
        "category": "basic",
        "icon": "fa fa-star",
        "row": false,
        "collection": true,
        "type": "element",
        "hidden": false,
        "defaultdata": DOMCreate('div', fontIconOption + DOMCreate('div', DOMCreate('i', '', 'fa fa-star onhovercolor', '', ['style="font-size:30px;"']), 'dis-table'), 'editor-component fonticon ', '', ['style="height: 60px; width: 60px; color: rgb(34, 34, 34); background-color: rgb(223, 223, 223);"', 'data-backgroundcolor="color"', 'data-backgroundimage=""']),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
            var iconStyles = {
                "Simple icon style": {
                    "0": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 61px;",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "1": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgb(219, 219, 219); border-radius: 61px; display: block;",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "2": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgb(219, 219, 219); border-radius: 0px; display: block;",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "3": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 61px; display: block; border-style: solid; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "4": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 0px; display: block; border-style: solid; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "5": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 61px; display: block; border-style: dashed; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "6": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 0px; display: block; border-style: dashed; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    }
                }
            }
            var displayStyle = {
                "ulClass": "sfCol_100 ",
                "liClass": "sfCol_20 ",
                "ulStyle": "",
                "liStyle": "height:100px; width:100px;"
            }
            InitComponentStyle($appendLayer, ' > .fonticon', dropped, iconStyles, this.defaultdata, displayStyle);
            return 'no data to show';
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
