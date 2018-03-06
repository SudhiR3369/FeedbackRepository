var image_slider = {
    "image slider": {
        "componentname": "image slider",
        "category": "advance",
        "icon": "icon icon-img-slider",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "carousel",
        "defaultdata": EasyLibrary.ReadDOM("carouseldata"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped, duplicated) {

            if ($appendLayer.hasClass('site-body')) {
                var $imageSlider = $('.ImageSliderWrapper');
                $imageSlider.removeClass('binded');
                $imageSlider.each(function (index, value) {
                    var carousel = new CarouselInit($(this));
                });
            } else {
                $appendLayer.find('.ImageSliderWrapper').removeClass('binded');
                var carousel = new CarouselInit($appendLayer);
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": "<span>Hello</span>",
                    "onload": function ($item) {

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
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
}
