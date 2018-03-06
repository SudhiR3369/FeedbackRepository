var custom_imghvr_toplayer = {
    "custom imghvr toplayer": {
        "componentname": "custom imghvr toplayer",
        "category": "layout",
        "icon": "icon icon-holder",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "hidden",
        'defaultdata': '<div class="editor-component clearfix editor-col sfCol_100 holder editor-com-innerSpacing-top-25 editor-com-innerSpacing-right-25 editor-com-innerSpacing-bottom-25 editor-com-innerSpacing-left-25">' + holderOption + '<div class="editor-col ui-state-default sfFixed sfCol_100"></div></div>',
        "settingDOMs": {
            "tabs": {
                "Background": { "options": ["image", "color"] },
                "Spacing":
                {
                    "options": {
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

                "Box Shadow":
                {
                    "options": {

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
