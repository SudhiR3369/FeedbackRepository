var underline = {
    "underline": {
        "componentname": "underline",
        "category": "basic",
        "icon": " icon icon-underline",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        'defaultdata': '<div class="editor-component underline sfCol_100 text-align-center ">' + underlineOption + '<div class="rowSeparator sfCol_100" style="border-top-width: 1px; border-top-color: #000; border-top-style: solid"></div></div>',
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
