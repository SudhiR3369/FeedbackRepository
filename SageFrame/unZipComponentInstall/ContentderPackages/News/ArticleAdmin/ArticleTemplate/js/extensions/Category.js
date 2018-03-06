var category = {
    "category": {
        "componentname": "category",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-cubes",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("articlecategoryview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {   
            $appendLayer.find('.editor-para').focus();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("articlecategorybasic"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.comp-article-category');
                        if ($parent.hasClass('display-inline-block'))
                            $('#slcDisplayCatSetting').val('display-inline-block');
                        else
                            $('#slcDisplayCatSetting').val('display-block');
                        $('#slcDisplayCatSetting').off().on('change', function () {
                            $parent.removeClass('display-inline-block');
                            $parent.removeClass('display-block');
                            $parent.removeClass('float-left');
                            var val = $(this).val();
                            $parent.addClass(val);
                            if (val == 'display-block')
                                $parent.addClass('float-left');
                        });
                       
                    }
                },
                "Text": {
                    "DOM": EasyLibrary.ReadDOM("authortextsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.comp-article-category');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.find('.article-category');
                        TextSetting($parent, $textChange);
                    }
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
            $ViewDom.find('.article-category').text("##articlecategory##");
        }
    }
}
