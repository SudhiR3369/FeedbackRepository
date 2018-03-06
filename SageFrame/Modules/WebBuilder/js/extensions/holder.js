var holder = {
    "holder": {
        "componentname": "holder",
        "category": "layout",
        "icon": "icon icon-holder",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        'defaultdata': '<div class="editor-component clearfix sfFixed sfCol_100 holder ">' + holderOption + '<div class="editor-col ui-state-default sfFixed sfCol_100"></div></div>',
        "beforedrop": function ($appendedParent, $holder, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("holderbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        Init();

                        function Init() {
                            var holderWidth = 100;
                            var sfColVal = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            if (sfColVal !== null) {
                                holderWidth = parseInt(sfColVal[0].split('_')[1]);
                            }

                            function HolderMaangeWidth(space) {
                                var sfColVal_ = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if (sfColVal_ !== null) {
                                    $parent.removeClass(sfColVal_[0]);
                                }
                                $parent.addClass('sfCol_' + space);
                            }
                            AdvanceSageSlider($('#holderWidthSlider'), $('#holderWidthHandle'), 1, 100, holderWidth, HolderMaangeWidth, $parent, '%');

                            var holderheight = $parent.css('height').replace('px', '');

                            function HolderMaangeHeight(space) {
                                $parent.css('height', space);
                            }
                            AdvanceSageSlider($('#holderHeightSlider'), $('#holderHeightHandle'), 10, 1024, holderheight, HolderMaangeHeight, $parent, 'px');
                            $('#refreshHolderHeight').on('click', function () {
                                $parent.css('height', '');
                                var holderheights = $parent.css('height').replace('px', '');
                                ChangeSliderValue($('#holderHeightSlider'), holderheights);
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
                "Alignment": {
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
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-col").removeClass("activeSetting");
                var $parent = $elem.parent().parent();
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
}
