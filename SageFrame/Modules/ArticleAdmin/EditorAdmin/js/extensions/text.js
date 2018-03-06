var text = {
    "text": {
        "componentname": "text",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-text",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": DOMCreate('div', textOption + '<p style="font-size: 14px; color: rgb(116, 119, 122);" class="editor-para article-text editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" contenteditable="true">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>', 'editor-component paragraph sfCol_100 text-align-center sfFixed'),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            //if (typeof ($appendLayer) !== "undefined") {
            //    var $textChange = $appendLayer.children().not('div').eq(0);
            //    $textChange.addClass('ff-' + $('#basicFonts').val());
            //    $textChange.addClass('f-weight-400');
            //}
            $appendLayer.find('.editor-para').focus();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("txtbasictab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["top", "bottom"]
                        },
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parent().parent();
                        var $text = $parent.children().not('div').eq(0);
                        return $text;
                    },

                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        //var $parent = $elem.parent().parent();
                        return $elem.parent().parent();
                    },
                },
               
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            },

        },
        "replace": function ($ViewDom) {
            $ViewDom.find('.article-text').attr('src', "##articletext##");
        }

    }
}
