var advs = {
    "News Advs": {
        "componentname": "News Advs",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-advertise",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("advertismentview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            $appendedParent.find('.change-advertisment').hide();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("advsbasictab"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.comp-article-advs');
                        $('#slcAdvsSize').html($('#ddlhdnAdvSizes').html());
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var advImg = $parent.find('.advs-img-wrap img')
                        $('#slcAdvsSize').off('change').on('change', function () {
                             advImg.attr('data-advsize', $(this).val())
                            var val = $('#slcAdvsSize option:selected').text().replace(/\s/g, '');
                            advImg.attr('src', '/Modules/ArticleAdmin/ArticleTemplate/img/advsample/' + val + '.jpg')
                        });
                        $('#slcAdvsSize').val(advImg.attr('data-advsize'));
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
                },

            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();
                return $parent;
            },
        },
        "replace": function ($ViewDom) {
            //   $ViewDom.find('.comp-article-advs').each(function (i, v) {
            //no replace token dom manupulation in run time
            //   $ViewDom.find('.author-image >img').attr('src',"");  
            // });
        }
    }
}
