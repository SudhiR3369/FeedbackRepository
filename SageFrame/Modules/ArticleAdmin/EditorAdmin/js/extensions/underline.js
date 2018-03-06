var underline = {
    "underline": {
        "componentname": "underline",
        "category": "basic",
        "icon": " icon icon-underline",
        "row": false,
        "hidden": false,
        "collection": true,
        'defaultdata':  EasyLibrary.ReadDOM("underlineview"),
        "afterdrop": function ($appendLayer) { },
        "settingDOMs": {
            "selectLayer": function ($elem) {
                $(".editor-component").removeClass("activeSetting");
                var $parent = $elem.parent().parent();
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
}
