var author = {
    "date": {
        "componentname": "date",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-calendar",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("articledateview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            $appendLayer.find('.editor-para').focus();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("articledatebasic"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.comp-article-date');
                        if ($parent.hasClass('display-inline-block'))
                            $('#slcDisplayDateSetting').val('display-inline-block');
                        else
                            $('#slcDisplayDateSetting').val('display-block');
                        $('#slcDisplayDateSetting').off().on('change', function () {
                            $parent.removeClass('display-inline-block');
                            $parent.removeClass('display-block');
                            $parent.removeClass('float-left');
                            var val = $(this).val();
                            $parent.addClass(val);
                            if (val == 'display-block')
                                $parent.addClass('float-left');
                        });
                        $('#chkDateIcon').off('change').on('change', function () {
                            if ($('#chkDateIcon').prop('checked')) {
                                $parent.find('.article-date-icon').removeClass('display-none');

                            }
                            else {

                                $parent.find('.article-date-icon').addClass('display-none');

                            }

                            initCheckboxValue();

                        });

                        if ($parent.find('.article-date-icon').hasClass('display-none'))
                            $('#chkDateIcon').prop('checked', false);
                        else
                            $('#chkDateIcon').prop('checked', true);
                    }
                },
                "Date Text": {
                    "DOM": EasyLibrary.ReadDOM("authortextsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.comp-article-date');
                      $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.find('.article-date p');
                        TextSetting($parent, $textChange);
                    }
                },
                "Icon": {
                    "DOM": EasyLibrary.ReadDOM("articledateIconsetting"),
                    "onload": function ($elem) {
                        var $IconDom = $elem.parents('.comp-article-date').find('.article-date-icon i');
                        var fontSize = $IconDom.css('font-size').replace('px', '');
                        function IconHandler(space) {
                            $IconDom.css('font-size', space + 'px');
                        }
                        AdvanceSageSlider($('#dateIconslider'), $('#dateIconsliderHandle'), 0, 100, fontSize, IconHandler, $IconDom, 'px');
                        var colorOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $IconDom.css('color', objColor.bgColor)
                            }
                        })
                        $('#dateIconColorPic').colorPicker(colorOption);
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["top", "bottom", "left", "right"]
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
            $ViewDom.find('.article-date p').text("##articledate##");
        }
    }
}
