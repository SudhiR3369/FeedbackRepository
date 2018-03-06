var logo_slider = {
    "slider": {
        "componentname": "slider",
        "category": "advance",
        "icon": "fa fa-object-ungroup",
        "row": false,
        "hidden": false,
        "defaultdata": EasyLibrary.ReadDOM("slider/slider"),
        "onDrop": function ($appendLayer) {
        },
        "loadSetting": function ($item) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": "<span>Hello</span>",
                    "onload": function ($item) { }
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

    }
}