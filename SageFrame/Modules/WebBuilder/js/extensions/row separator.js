var row_separator = {
    "row separator": {
        "componentname": "row separator",
        "category": "pro",
        "icon": "icon icon-seperator",
        "row": true,
        "hidden": false,
        "collection": false,
        "type": "element",
        "defaultdata": DOMCreate('div', rowSeparatorOption + DOMCreate('div', '', 'rowSeparator sfCol_100 ', '', ['style="border-top-width: 1px; border-top-color: #000; border-top-style: solid"']), 'editor-row rowseparatorwrap sfCol_100 text-align-center editor-com-outerSpacing-top-15 editor-com-outerSpacing-bottom-15', '', ['style="display: block;"']),
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("rowseparatortab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $sep = $parent.find('.rowSeparator');

                        InitEvents();

                        function InitEvents() {
                            HeightWidth();
                            Style();
                            SepColor();
                        }

                        function HeightWidth() {
                            var topWidth = $sep.css("border-top-width");
                            topWidth = parseInt(topWidth.replace('px', ''));

                            function RowSepHeight(space) {
                                $sep.css("border-top-width", space + 'px');
                            }
                            AdvanceSageSlider($('#sepHeightSlider'), $('#sepHeightHandle'), 1, 10, topWidth, RowSepHeight, $parent, 'px');

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
                            AdvanceSageSlider($('#sepWidthSlider'), $('#sepWidthHandle'), 1, 100, sepWidth, RowSepWidth, $parent, '%');
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
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $sep.css({ 'border-top-color': objColor.bgColor });
                                }
                            });
                            $('#rowSepColor').colorPicker(colorPickerOption);
                        }
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "bottom"]
                        }
                    }

                },
                "Alignment": {
                    "options": ["left", "center", "right"]
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parent().parent();
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
}
