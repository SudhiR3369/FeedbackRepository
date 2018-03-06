var heading = {
    "heading": {
        "componentname": "heading",
        "category": "basic",
        "icon": "icon icon-heading",
        "row": false,
        "type": "element",
        "hidden": false,
        "collection": true,
        "defaultdata": divStart('editor-component com-heading sfCol_100 sfFixed text-align-center') + textOption + '<h1 contenteditable="true" class="editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;color: rgb(116, 119, 122);">This is heading </h1>' + divEnd,
        "afterdrop": function ($appendedParent, $appendLayer) {
            if (typeof ($appendLayer) !== "undefined") {
                var $textChange = $appendLayer.children().not('div').eq(0);
                $textChange.addClass('ff-' + $('#basicFonts').val());
                $textChange.addClass('f-weight-400');
            }
            $appendLayer.find('h1').focus();
        },
    }
}
