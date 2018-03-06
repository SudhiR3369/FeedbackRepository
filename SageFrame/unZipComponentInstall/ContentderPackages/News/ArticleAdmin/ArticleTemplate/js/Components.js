var extendedComps = {
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
,    "date": {
        "componentname": "date",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-calendar",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("articledateview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            $appendLayer.find('.editor-para').focus();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("articledatebasic"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.comp-article-date');
                        if ($parent.hasClass('display-inline-block'))
                            $('#slcDisplayDateSetting').val('display-inline-block');
                        else
                            $('#slcDisplayDateSetting').val('display-block');
                        $('#slcDisplayDateSetting').off().on('change', function () {
                            $parent.removeClass('display-inline-block');
                            $parent.removeClass('display-block');
                            $parent.removeClass('float-left');
                            var val = $(this).val();
                            $parent.addClass(val);
                            if (val == 'display-block')
                                $parent.addClass('float-left');
                        });
                        $('#chkDateIcon').off('change').on('change', function () {
                            if ($('#chkDateIcon').prop('checked')) {
                                $parent.find('.article-date-icon').removeClass('display-none');

                            }
                            else {

                                $parent.find('.article-date-icon').addClass('display-none');

                            }

                            initCheckboxValue();

                        });

                        if ($parent.find('.article-date-icon').hasClass('display-none'))
                            $('#chkDateIcon').prop('checked', false);
                        else
                            $('#chkDateIcon').prop('checked', true);
                    }
                },
                "Date Text": {
                    "DOM": EasyLibrary.ReadDOM("authortextsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.comp-article-date');
                      $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.find('.article-date p');
                        TextSetting($parent, $textChange);
                    }
                },
                "Icon": {
                    "DOM": EasyLibrary.ReadDOM("articledateIconsetting"),
                    "onload": function ($elem) {
                        var $IconDom = $elem.parents('.comp-article-date').find('.article-date-icon i');
                        var fontSize = $IconDom.css('font-size').replace('px', '');
                        function IconHandler(space) {
                            $IconDom.css('font-size', space + 'px');
                        }
                        AdvanceSageSlider($('#dateIconslider'), $('#dateIconsliderHandle'), 0, 100, fontSize, IconHandler, $IconDom, 'px');
                        var colorOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $IconDom.css('color', objColor.bgColor)
                            }
                        })
                        $('#dateIconColorPic').colorPicker(colorOption);
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["top", "bottom", "left", "right"]
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
            $ViewDom.find('.article-date p').text("##articledate##");
        }
    }
,    "Title": {
        "componentname": "Title",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-heading",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("articletitleview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            $appendLayer.find('.editor-para').focus();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("txtbasictab"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.comp-article-title');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.find('h1');
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
                "Hover Effect": {
                    "options": {
                        "color": ["all", "background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],

                        },
                        "zoom": "on"
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parents('.comp-article-title').find('.article-title');
                    },
                },
               
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();
                return $parent;
            },
        },
        "replace": function ($ViewDom) {
            $ViewDom.find('.article-title').text("##articletitle##");
            $ViewDom.find('.article-link').attr('href',"##articlelink##");       
        }
    }
,    "author": {
        "componentname": "author",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-user",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("authorview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
              $appendLayer.find('.editor-para').focus();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("authorbasicsetting"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.article-author-component');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        if ($parent.hasClass('display-inline-block'))
                            $('#slcDisplayAuthorSetting').val('display-inline-block');
                        else
                            $('#slcDisplayAuthorSetting').val('display-block');
                        $('#slcDisplayAuthorSetting').off().on('change', function () {
                            $parent.removeClass('display-inline-block');
                            $parent.removeClass('display-block');
                            $parent.removeClass('float-left');
                            var val = $(this).val();
                            $parent.addClass(val);
                            if (val == 'display-block')
                                $parent.addClass('float-left');
                        });
                        $('#chkAuthorIcon').off('change').on('change', function () {
                            if ($('#chkAuthorIcon').prop('checked')) {
                                $parent.find('.article-author-icon').removeClass('display-none');
                                $parent.find('.author-image').addClass('display-none');
                            }
                            else {
                                if ($('#chkAuthorImage').prop('checked') || $('#chkAuthorName').prop('checked')) {
                                    $parent.find('.article-author-icon').addClass('display-none');
                                }
                            }
                            initCheckboxValue();
                        });
                        $('#chkAuthorImage').off('change').on('change', function () {
                            if ($('#chkAuthorImage').prop('checked')) {
                                $parent.find('.author-image').removeClass('display-none');
                                $parent.find('.article-author-icon').addClass('display-none');
                            }
                            else {
                                if ($('#chkAuthorIcon').attr('checked') || $('#chkAuthorName').prop('checked')) {
                                    $parent.find('.author-image').addClass('display-none');
                                }
                            }
                            initCheckboxValue();
                        });
                        $('#chkAuthorName').off('change').on('change', function () {
                            if ($('#chkAuthorName').prop('checked')) {
                                $parent.find('.article-author-name').removeClass('display-none');
                            }
                            else {
                                if ($('#chkAuthorIcon').prop('checked') || $('#chkAuthorImage').prop('checked')) {
                                    $parent.find('.article-author-name').addClass('display-none');
                                }
                            }
                            initCheckboxValue();
                        });
                        function initCheckboxValue() {
                            if ($parent.find('.article-author-icon').hasClass('display-none'))
                                $('#chkAuthorIcon').prop('checked', false);
                            else
                                $('#chkAuthorIcon').prop('checked', true);
                            if ($parent.find('.author-image').hasClass('display-none'))
                                $('#chkAuthorImage').prop('checked', false);
                            else
                                $('#chkAuthorImage').prop('checked', true);
                            if ($parent.find('.article-author-name').hasClass('display-none'))
                                $('#chkAuthorName').prop('checked', false);
                            else
                                $('#chkAuthorName').prop('checked', true);



                        }
                        initCheckboxValue();
                    }
                },
                "Text": {
                    "DOM": EasyLibrary.ReadDOM("authortextsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.article-author-component');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        $parent = $parent.find('.article-author-name');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    }
                },
                "Image": {
                    "DOM": EasyLibrary.ReadDOM("authorImagesetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.article-author-component');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        $parent = $parent.find('.author-image');
                        var $image = $parent.find('img').eq(0);

                        LoadSettings();

                        function LoadSettings() {
                            ImageDisplay();
                            ImageWidthEvent();
                            ImageFitCover();
                        }

                        function ImageDisplay() {
                            var imageHeight = $parent.height();
                            var imageWidth = $parent.width();

                            if (imageHeight === imageWidth && $parent.hasClass('round-image')) {
                                $('.rectangleOption').hide();
                                $('.roundOption').show();
                                $('#imageDisplay').val('round');
                            } else {
                                $('.rectangleOption').show();
                                $('.roundOption').hide();
                                $('#imageDisplay').val('rectangle');
                            }
                            $('#imageDisplay').on('change', function () {
                                var $this = $(this);
                                var val = $this.val();
                                switch (val) {
                                    case 'round':
                                        $('.rectangleOption').hide();
                                        $('.roundOption').show();
                                        ChangeRoundImageWidth();
                                        $parent.addClass('round-image');
                                        break;
                                    case 'rectangle':
                                        $('.rectangleOption').show();
                                        $('.roundOption').hide();
                                        $image.css({ 'border-radius': '', 'width': $image.height(), 'height': $image.height() });
                                        $parent.css({
                                            'height': $image.height(),
                                            'width': $image.height(),
                                            'border-radius': ''
                                        });
                                        $('#imageRadiusSlider').slider('value', 0);
                                        $('#imageRadiusHandle').text(0);
                                        $('.changeFontSize').val($image.height());
                                        $parent.removeClass('round-image');
                                        break;
                                }
                            });

                            RoundImageWidth();
                        }




                        function RoundImageWidth() {
                            //'border-radius'
                            var roundImageWidth = 0;
                            var imgHeight = parseInt($parent.width());
                            var imgWidth = parseInt($parent.height());

                            roundImageWidth = imgWidth;
                            if (imgHeight < imgWidth) {
                                roundImageWidth = imgHeight;
                            }

                            function ImageBoxRadius(space) {
                                $image.css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });
                                $parent.css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });
                            }
                            AdvanceSageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 10, 200, roundImageWidth, ImageBoxRadius, $parent, 'px');
                        }

                        function ChangeRoundImageWidth() {
                            var roundImageWidth = 0;
                            var imgHeight = parseInt($parent.width());
                            var imgWidth = parseInt($parent.height());
                            roundImageWidth = imgWidth;
                            if (imgHeight < imgWidth) {
                                roundImageWidth = imgHeight;
                            }
                            $image.css({
                                'height': roundImageWidth + 'px',
                                'width': roundImageWidth + 'px',
                                'border-radius': '50%'
                            });
                            $parent.css({
                                'height': roundImageWidth + 'px',
                                'width': roundImageWidth + 'px',
                                'border-radius': '50%'
                            });
                            $('#imageRoundSlider').slider('value', roundImageWidth);
                            $('#imageRoundHandle').text(roundImageWidth);
                        }

                        function ImageWidthEvent() {

                            var imageWidth = $parent.width();
                            function ImageWidthSlider(space) {
                                var value = space + 'px';
                                $image.css({
                                    'height': value,
                                    'width': value,
                                });
                                $parent.css({
                                    'height': value,
                                    'width': value,

                                });
                            }
                            AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), 10, 200, imageWidth, ImageWidthSlider, $parent, '%');
                        }


                        function ImageFitCover() {
                            if ($parent.hasClass('fit-image')) {
                                $('#imageFittoCover').prop('checked', true);
                            } else {
                                $('#imageFittoCover').prop('checked', false);
                            }

                            $('#imageFittoCover').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('fit-image')
                                    //$image.css({
                                    //    'height':'',
                                    //    'width': '',

                                    //});
                                } else {
                                    var width = $parent.width() + 'px';
                                    //$image.css({
                                    //    'height': width,
                                    //    'width': width,
                                    //});
                                    $parent.removeClass('fit-image')
                                }
                            });
                        }
                    }
                },
                "Icon": {
                    "DOM": EasyLibrary.ReadDOM("authoriconsetting"),
                    "onload": function ($elem) {
                        var $IconDom = $elem.parents('.article-author-component').find('.article-author-icon i');
                        var fontSize = $IconDom.css('font-size').replace('px', '');
                        function AuthorIconHandler(space) {
                            $IconDom.css('font-size', space + 'px');
                        }
                        AdvanceSageSlider($('#authorIconslider'), $('#authorIconsliderHandle'), 0, 100, fontSize, AuthorIconHandler, $IconDom, 'px');
                        var colorOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $IconDom.css('color', objColor.bgColor)
                            }
                        })
                        $('#authorIconColorPic').colorPicker(colorOption);
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
            $ViewDom.find('.article-author-name p').text("##articleauthorname##");
            $ViewDom.find('.author-image >img').attr('src', "##authorimgsrc##");
            $ViewDom.find('.author-link').attr('href', "##authorprofilelink##");
            
        }
    }
,    "category": {
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
,    "column": {
        "componentname": "column",
        "category": "layout",
        "group": "column",
        "subgroup": "onecolumn",
        //"componentBlockDOM": "",
        //"icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        //"defaultdata": $('#rowline').html(),//no need since we are not treating as component
        "afterdrop": function ($appendedParent, $appendLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Background": {
                    "options": ["color"]
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
,    "holder": {
        "componentname": "holder",
        "category": "layout",
        "icon": "icon icon-holder",
        "row": false,
        "hidden": false,
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
,    "image": {
        "componentname": "image",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-img-1",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": DOMCreate('div', '<img class="template-image" src="' + webbuildermodulepath + '/img/def5.jpg"  class="editor-image sfCol_100" /><span class="image-caption-wrap position-absolute editor-com-innerSpacing-top-25 editor-com-innerSpacing-right-25 editor-com-innerSpacing-left-25 editor-com-innerSpacing-bottom-25" style="display:block; width: 100%; bottom: 0px; left: 0px; background-color: rgba(16, 17, 17, 0.19);" data-pos="in-bottom"><span class="caption-text" style="color: rgb(242, 242, 242);" contenteditable="true">Image Caption Here</span></span>' + EasyLibrary.ReadDOM("imageoption"), 'editor-component image sfCol_100'),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped)
                $appendLayer.find('.change-image-settings').hide();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("imagebasictab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        //var $image = $parent.children().not('div').eq(0);
                        var $image = $parent.find('img').eq(0);
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        if ($parent.find('a').length == 0)
                            $parent.find('img').wrap('<a></a>');
                        LoadSettings();
                        $('.imgNewsLink').show();
                        if (typeof $parent.find('a').attr('href') != 'undefined')
                            $('#imgNewsLink').prop('checked', true);
                        else
                            $('#imgNewsLink').prop('checked', false);
                        function LoadSettings() {
                            ImageDisplay();
                            ImageWidthEvent();
                            ImageBorder();
                            ImageFitCover();
                            ImageNewsLink();
                        }
                        function ImageNewsLink() {
                            $('#imgNewsLink').off().on('click', function () {
                                if ($(this).prop('checked')) {
                                    $parent.find('a').attr('href', '##articlelink##');
                                } else {
                                    $parent.find('a').removeAttr('href');
                                }
                            });
                        }
                        function ImageDisplay() {
                            var imageHeight = $parent.height();
                            var imageWidth = $parent.width();
                            var imageRadius = parseInt($parent.css('border-top-left-radius').replace('%', ''));
                            if (imageHeight === imageWidth && imageRadius > 0) {
                                $('.rectangleOption').hide();
                                $('.roundOption').show();
                                $('#imageDisplay').val('round');
                            } else {
                                $('.rectangleOption').show();
                                $('.roundOption').hide();
                                $('#imageDisplay').val('rectangle');
                            }
                            $('#imageDisplay').on('change', function () {
                                var $this = $(this);
                                var val = $this.val();
                                switch (val) {
                                    case 'round':
                                        $('.rectangleOption').hide();
                                        $('.roundOption').show();
                                        ChangeRoundImageWidth();
                                        $parent.addClass('round-image');
                                        break;
                                    case 'rectangle':
                                        $('.rectangleOption').show();
                                        $('.roundOption').hide();
                                        $image.css({ 'border-radius': '', 'width': '', 'height': $image.height() });
                                        $parent.css({
                                            'height': $image.height(),
                                            'width': '',
                                            'border-radius': ''
                                        });
                                        $('#imageRadiusSlider').slider('value', 0);
                                        $('#imageRadiusHandle').text(0);
                                        $('.changeFontSize').val($image.height());
                                        $parent.removeClass('round-image');
                                        break;
                                }
                            });

                            ManualHeightEntryEvents();
                            ImageBoxRadius();
                            RoundImageWidth();
                        }

                        function ManualHeightEntryEvents() {
                            $('#refresImageWidth').on('click', function () {
                                $parent.css({ 'height': '' });
                                $image.css({ 'height': '' });
                                setTimeout(function () {
                                    var holderheights = $image.height();
                                    ChangeSliderValue($('#imageHeightSlider'), holderheights);
                                }, 500);
                            });
                            var imgHeight = $image.height();

                            function ImageHeight(space) {
                                $image.css({ 'height': space });
                                $parent.css({ 'height': space });
                            }
                            AdvanceSageSlider($('#imageHeightSlider'), $('#imageHeightHandle'), 1, 1200, imgHeight, ImageHeight, $parent, 'px');
                            var imageOriHeight = $image.height();
                            $('.changeFontSize').val(imageOriHeight);
                            $('.changeFontSize').off().on('keyup', function (event) {
                                var $this = $(this);
                                var imageSize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        imageSize = imageSize + 1;
                                        $(this).val(imageSize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        imageSize = imageSize - 1;
                                        $(this).val(imageSize);
                                        break;
                                }
                                if (imageSize < minImagesize) {
                                    imageSize = minImagesize;
                                    $this.val(minImagesize);
                                }
                                if (imageSize > maxImagesize) {
                                    imageSize = maxImagesize;
                                    $this.val(maxImagesize);
                                }
                                //$this.focus().select();
                                $image.css({ 'height': imageSize });
                                $parent.css({ 'height': imageSize });
                            });
                            $('.increaseFontSize').off().on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                            });
                            $('.decreaseFontSize').off().on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function ImageBoxRadius() {
                            //'border-radius'
                            var boxRadius = 0;
                            boxRadius = $parent.attr('border-radius');

                            function ImageBoxRadius(space) {
                                $parent.css({ 'border-radius': space + 'px' });
                                $image.css({ 'border-radius': space + 'px' });
                            }
                            AdvanceSageSlider($('#imageRadiusSlider'), $('#imageRadiusHandle'), 0, 100, boxRadius, ImageBoxRadius, $parent, 'px');
                        }

                        function RoundImageWidth() {
                            //'border-radius'
                            var roundImageWidth = 0;
                            var imgHeight = parseInt($parent.width());
                            var imgWidth = parseInt($parent.height());

                            roundImageWidth = imgWidth;
                            if (imgHeight < imgWidth) {
                                roundImageWidth = imgHeight;
                            }

                            function ImageBoxRadius(space) {
                                $image.css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });
                                $parent.css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });
                            }
                            AdvanceSageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 0, 1200, roundImageWidth, ImageBoxRadius, $parent, 'px');
                        }

                        function ChangeRoundImageWidth() {
                            var roundImageWidth = 0;
                            var imgHeight = parseInt($parent.width());
                            var imgWidth = parseInt($parent.height());
                            roundImageWidth = imgWidth;
                            if (imgHeight < imgWidth) {
                                roundImageWidth = imgHeight;
                            }
                            $image.css({
                                'height': roundImageWidth + 'px',
                                'width': roundImageWidth + 'px',
                                'border-radius': '50%'
                            });
                            $parent.css({
                                'height': roundImageWidth + 'px',
                                'width': roundImageWidth + 'px',
                                'border-radius': '50%'
                            });
                            $('#imageRoundSlider').slider('value', roundImageWidth);
                            $('#imageRoundHandle').text(roundImageWidth);
                        }

                        function ImageWidthEvent() {
                            var sfImageWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            var imageWidth = 100;
                            if (sfImageWidth !== null) {
                                imageWidth = sfImageWidth[0].split('_')[1];
                            }

                            function ImageWidthSlider(space) {
                                var imageWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if (imageWidthClass !== null) {
                                    $parent.removeClass(imageWidthClass[0]).addClass('sfCol_' + space);
                                } else {
                                    $parent.addClass('sfCol_' + space);
                                }
                            }
                            AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), minFontSize, maxFontsize, imageWidth, ImageWidthSlider, $parent, '%');
                        }

                        function ImageBorder() {
                            var imageBorderStyle = $parent[0].style.borderStyle; //.css('border-style');
                            $('#imgBorderStyle').val(imageBorderStyle);
                            if (imageBorderStyle.length === 0 || imageBorderStyle === 'none') {
                                $('.imgborder').hide();
                            } else {
                                $('.imgborder').show();
                            }

                            $('#imgBorderStyle').on('change', function () {
                                var style = $(this).val();
                                $parent.css('border-style', style);
                                if (style === 'none') {
                                    $('.imgborder').hide();
                                    $parent.css("border-width", '0px');
                                    $('#imgBorderSlider').slider('value', 0);
                                    $('#imgBorderHandle').text(0);
                                } else {
                                    $('.imgborder').show();
                                    var imgBordeVal = parseInt($('#imgBorderHandle').text());
                                    if (imgBordeVal == 0)
                                        imgBordeVal = 1;
                                    $parent.css("border-width", imgBordeVal + 'px');
                                    $('#imgBorderSlider').slider('value', imgBordeVal);
                                    $('#imgBorderHandle').text(imgBordeVal);
                                }
                            });

                            var imgBorderWidth = $parent[0].style.borderWidth; // $parent.css("border-width");
                            if (imgBorderWidth.length > 0) {
                                imgBorderWidth = parseInt(imgBorderWidth.replace('px', ''));
                            } else {
                                imgBorderWidth = 1;
                            }

                            function RowSepHeight(space) {
                                $parent.css("border-width", space + 'px');
                            }
                            AdvanceSageSlider($('#imgBorderSlider'), $('#imgBorderHandle'), 1, 10, imgBorderWidth, RowSepHeight, $parent, 'px');
                            ImgBorderColor();
                        }

                        function ImgBorderColor() {
                            $('#imgBorderColor').css('background-color', $parent[0].style.borderColor);
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.css({ 'border-color': objColor.bgColor });
                                }
                            });
                            $('#imgBorderColor').colorPicker(colorPickerOption);
                        }

                        function ImageFitCover() {
                            if ($parent.hasClass('fit-image')) {
                                $('#imageFittoCover').prop('checked', true);
                            } else {
                                $('#imageFittoCover').prop('checked', false);
                            }

                            $('#imageFittoCover').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('fit-image')
                                } else {
                                    $parent.removeClass('fit-image')
                                }
                            });
                        }
                    }
                },
                "Caption": {
                    "DOM": EasyLibrary.ReadDOM("imageCaptionsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parents('.editor-component.image').find('.image-caption-wrap');
                        var $textChange = $parent.find('.caption-text')
                        TextSetting($parent, $textChange);
                        $('#captionPosition').val($parent.attr('data-pos'));
                        $('#captionPosition').off('change').on('change', function () {
                            var val = $(this).val();
                            clearCaptionPosition();
                            $parent.attr('data-pos', val);
                            switch (val) {
                                case 'in-top':
                                    $parent.addClass('position-absolute');
                                    $parent.css('top', '0')
                                    $parent.css('left', 0);
                                    break;
                                case 'in-bottom':
                                    $parent.addClass('position-absolute');
                                    $parent.css('bottom', '0')
                                    $parent.css('left', 0);
                                    break;
                                case 'out-top':
                                    $parent.addClass('position-absolute');
                                    $parent.css('bottom', '100%')
                                    $parent.css('left', 0);
                                    break;
                                case 'out-bottom':
                                    break;

                            }
                        });

                        if ($parent.is(':hidden'))
                            $('#chkImageCaption').prop('checked', false);
                        else
                            $('#chkImageCaption').prop('checked', true);
                        $('#chkImageCaption').off('change').on('change', function () {
                            if ($(this).prop('checked'))
                                $parent.show();
                            else
                                $parent.hide();

                        });

                        $('.capBackgroundColor').css('background-color', $parent.css('background-color'));
                        var capColorOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.css('background-color', objColor.bgColor);
                            }
                        });

                        $('.capBackgroundColor').colorPicker(capColorOption);
                        var innerSpace = $parent.attr('class').match(/(editor-com-innerSpacing-top-[0-9]{1,3})/g);;
                        if (innerSpace !== null) {
                            innerSpace = innerSpace[0].replace('editor-com-innerSpacing-top-', '');
                            innerSpace = innerSpace / 5;
                        }
                        else
                            innerSpace = 5;

                        function CaptionWidthHandler(space) {
                            var $parentWidth = $parent.attr('class').match(/(editor-com-innerSpacing-){1,1}([a-z]+)(-[0-9]{1,3})/g);
                            if ($parentWidth !== null) {
                                $.each($parentWidth, function (i, v) {
                                    $parent.removeClass(v);
                                });
                            }
                            space = space * 5;
                            $parent.addClass('editor-com-innerSpacing-top-' + space);
                            $parent.addClass('editor-com-innerSpacing-right-' + space);
                            $parent.addClass('editor-com-innerSpacing-left-' + space);
                            $parent.addClass('editor-com-innerSpacing-bottom-' + space);
                        }
                        AdvanceSageSlider($('#captionInnnerSpacingSlider'), $('#captionInnnerSpacingHandle'), 0, 15, innerSpace, CaptionWidthHandler, $parent, '');

                        function clearCaptionPosition() {
                            $parent.removeClass('position-absolute');
                            $parent.css('top', '');
                            $parent.css('bottom', '');
                            $parent.css('left', '');
                        };

                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent();
                            }
                        },
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent().not('div').eq(0);
                            }
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent(); //.children().not('div').eq(0);
                        //return $elem.parent().parent().find('.image');//.not('div').eq(0);
                        //return $elem.parent().parent();//.children().not('div').eq(0);
                    },
                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent(); //.children().not('div').eq(0);
                    },
                },
                "Box Radius": {
                    "options": {
                        "max": 500,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        //return $elem.parent().parent();//.children().not('div').eq(0);
                        return $elem.parent().parent().children().not('div').eq(0);
                    },
                },
                "Box Shadow": {
                    "options": {

                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent().children().not('div').eq(0);
                    },
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                },
                "Hover Effect": {
                    "options": {
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {
                                //return $parent;
                            },
                        },
                        "zoom": "on"
                    },
                },

            },
            "selectLayer": function ($elem) {
                $(".editor-component").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-component");
                $parent.addClass("activeSetting");
                return $parent;
            },
        },
        "view": {
            "view": function () {
                this.library.one();
            },
            "library": {
                "one": function () {
                }
            }
        },
        "replace": function ($ViewDom) {
            $ViewDom.find('.template-image').each(function (i, v) {
                var $this = $(this);
                $this.attr('src', "##articleimgsrc##_" + i);
                $this.attr('alt', "##articleimgalt##_" + i);
            });
            $ViewDom.find('.caption-text').each(function (i, v) {
                $(this).text("##articleimgcaption##_" + i);
            });

        }
    }
,    "Article Source": {
        "componentname": "Article Source",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-copyright",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("articlesourceview"),
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
                    "DOM": EasyLibrary.ReadDOM("articlecategorybasic"),
                    "onload": function ($elem) {
                        var $parent = $elem.parents('.article-source-comp');
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
                        var $parent = $this.parent().parent();
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.find('p');
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
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            },

        },
        "replace": function ($ViewDom) {
            $ViewDom.find('.article-source').text("##articlesource##");
        }

    }
,    "read more": {
        "componentname": "read more",
        "category": "basic",
        "icon": "fa fa-external-link",
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("readmorebutton"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
          
           
           
        },
        "afterdrop": function ($appendLayer) {
            
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("readmorebasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $Icon = $parent.find('a > i');
                        var $text = $parent.find('a > span');
                        var $anchor = $parent.find('a');
                        InitEvents();
                        function InitEvents() {
                            FontSize();
                            WrapperSize();
                            WrapperHeight();
                            FontIconColor();
                            TextTranformCheck();
                          
                            EnableText();
                            EnableIcon();
                            FontIcon();
                        }
                        function FontSize() {
                            var fontsize = parseInt($anchor.css('font-size').replace('px', ''));

                            function FontSizeChange(space) {
                                $anchor.css('font-size', space);
                            }
                            AdvanceSageSlider($('#buttonSizeSlider'), $('#buttonSizeHandle'), 5, 100, fontsize, FontSizeChange, $parent, 'px');
                        }
                        function WrapperSize() {
                            var buttonWidth = $parent.css('width').replace('px', '');

                            function ButtonWidthChange(space) {
                                $parent.css('width', space + 'px');
                            }
                            AdvanceSageSlider($('#buttonWrapperSizeSlider'), $('#buttonWrapperSizeHandle'), 5, 500, buttonWidth, ButtonWidthChange, $parent, 'px');
                        }

                        function WrapperHeight() {
                            var buttonHeight = $parent.css('height').replace('px', '');

                            function ButtonHeightChange(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#buttonWrapperHeightSlider'), $('#buttonWrapperHeightHandle'), 5, 500, buttonHeight, ButtonHeightChange, $parent, 'px');
                        }

                        function FontIconColor() {
                            $('#buttonColor').css('background-color', $anchor.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $Icon.css({ 'color': objColor.bgColor });
                                    $text.css({ 'color': objColor.bgColor });
                                    $anchor.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#buttonColor').colorPicker(colorPickerOption);
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($parent.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($parent.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#buttonTextTransform').val(trasformValue);
                            $('#buttonTextTransform').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $parent.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $parent.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $parent.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }
                        var linklist = {
                            'internal': 'internal',
                            'external': 'external',
                            'onepage': 'onepage'
                        }
                      
                   
                     
                        function EnableText() {
                            if ($text.length > 0) {
                                var text = $text.text();
                                $('#enableButtonText').prop('checked', true);
                                $('#buttonText').val(text);
                                $('#divEnableText').show();
                            } else {
                                $('#enableButtonText').prop('checked', false);
                            }
                            $('#enableButtonText').on('click', function () {
                                if ($(this).is(':checked')) {
                                    $('#buttonText').val('').focus();
                                    $('#divEnableText').slideDown(400);
                                    if ($parent.find('span').length == 0) {
                                        if ($('#linkBeforeText').is(':checked')) {
                                            $parent.find('a').append('<span class="com-button-text c" contenteditable="true">default text</span>');
                                        } else {
                                            $parent.find('a').prepend('<span class="com-button-text onhovercolor" contenteditable="true">default text</span>');
                                        }
                                        $('#buttonText').val('default text');
                                        $text = $parent.find('span');
                                    }
                                } else {
                                    $('#divEnableText').slideUp(400);
                                    $parent.find('span').remove();
                                }
                            });
                            $('#buttonText').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                var text = 'default text';
                                if (val.length > 0) {
                                    text = val;
                                }
                                $text.text(text);
                            });
                        }

                        function EnableIcon() {
                            if ($Icon.length > 0) {
                                var iconClass = $Icon.attr('class').replace('fa ', '').replace('onhovercolor', '');
                                $('#enableButtonIcon').prop('checked', true);
                                $('#buttonIcon').show();
                            } else {
                                $('#enableButtonIcon').prop('checked', false);
                            }
                            $('#enableButtonIcon').on('click', function () {
                                if ($(this).is(':checked')) {
                                    $('#buttonIcon').slideDown(400);
                                    var iconClass = 'fa-arrow-right';
                                    if ($('#buttonfontIconCollection').find('li.selected').length > 0) {
                                        iconClass = $('#buttonfontIconCollection').find('li.selected').find('i').attr('data-class');
                                    } else {
                                        $('#buttonfontIconCollection').find('li').parent().addClass('selected');
                                        $('#buttonfontIconCollection').find('li i[data-class="fa-arrow-right"]').parent().addClass('selected');
                                    }
                                    if ($parent.find('a > i').length == 0) {
                                        if ($('#linkBeforeText').is(':checked')) {
                                            $parent.find('a').prepend('<i class="fa ' + iconClass + ' onhovercolor"></i>');
                                        } else {
                                            $parent.find('a').append('<i class="fa ' + iconClass + ' onhovercolor"></i>');
                                        }
                                        $Icon = $parent.find('a > i');
                                    }

                                } else {
                                    $('#buttonIcon').slideUp(400);
                                    $('#linkBeforeText').prop('checked', false);
                                    $parent.find('a > i').remove();
                                }
                            });
                            $('#linkBeforeText').on('click', function () {
                                var $i = $parent.find('a > i');
                                var $s = $parent.find('a > span');
                                if ($(this).is(':checked')) {
                                    if ($i.length > 0 && $s.length > 0) {
                                        $anchor.append($i);
                                        $anchor.append($s);
                                    }
                                } else {
                                    if ($i.length > 0 && $s.length > 0) {
                                        $anchor.append($s);
                                        $anchor.append($i);
                                    }
                                }
                            });
                        }

                        function FontIcon() {
                            $('#buttonfontIconCollection').html(EasyLibrary.FontCollectionList());
                            SearchFontIcon();
                        }

                        function SearchFontIcon() {
                            $('#buttonSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#buttonfontIconCollection').find('li').each(function () {
                                    var $this = $(this);
                                    var dataClass = $this.find('i').attr('data-class');
                                    var pos = dataClass.indexOf(searchVal);
                                    if (pos < 0) {
                                        $this.addClass('content-hide');
                                    } else {
                                        $this.removeClass('content-hide');
                                    }
                                });
                            });
                            if ($Icon.length > 0) {
                                var fontClasses = $Icon.attr('class').replace('fa ', '').replace('onhovercolor', '').trim();
                                $('#buttonfontIconCollection').find('li i[data-class="' + fontClasses + '"]').parent().addClass('selected');
                            }
                            $('#buttonfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                $Icon.attr('class', 'onhovercolor fa ' + chooseClass);
                                $('#buttonfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                            });
                        }
                    }
                },
                "Background": {
                    "options": ["color"]
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
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["all", "background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {
                                //return $parent;
                            },
                        }
                    },
                    "Scroll Effect": {
                        "options": [],
                        "selectLayer": function ($elem) {
                            return $elem.parent().parent();
                        }
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
                var $parent = $elem.parent().parent();
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            },
        },
        "view": {
            "view": function () {
                this.library.buttonlick();
            },
            "library": {
                "buttonlick": function () {
                    $('.editor-component.button').find('.com-button').off().on('click', function (e) {
                        var $this = $(this);
                        var onePage = $this.attr('data-link');
                        var href = $this.attr('data-onepage');
                        if (typeof onePage !== "undefined" && typeof href !== "undefined") {
                            if (onePage === "onepage") {
                                e.preventDefault();
                                $('.menuHeader .onepagemenu  li[data-opscroll="' + href + '"]').trigger('click');
                            }
                        }
                    });
                }
            }
        },
        "replace": function ($viewDom) {
            $viewDom.find('.comp-article-more-link').attr('href', ' ##articlelink##');
        }
    }
,    "row separator": {
        "componentname": "row separator",
        "category": "pro",
        "icon": "icon icon-seperator",
        "row": true,
        "hidden": true,
        "collection": false,
        "defaultdata": DOMCreate('div', rowSeparatorOption + DOMCreate('div', '', 'rowSeparator sfCol_100 ', '', ['style="border-top-width: 1px; border-top-color: #000; border-top-style: solid"']), 'editor-row rowseparatorwrap sfCol_100 text-align-center editor-com-outerSpacing-top-15 editor-com-outerSpacing-bottom-15', '', ['style="display: block;"']),
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("rowseparatortab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $sep = $parent.find('.rowSeparator');

                        InitEvents();

                        function InitEvents() {
                            HeightWidth();
                            Style();
                            SepColor();
                        }

                        function HeightWidth() {
                            var topWidth = $sep.css("border-top-width");
                            topWidth = parseInt(topWidth.replace('px', ''));

                            function RowSepHeight(space) {
                                $sep.css("border-top-width", space + 'px');
                            }
                            AdvanceSageSlider($('#sepHeightSlider'), $('#sepHeightHandle'), 1, 10, topWidth, RowSepHeight, $parent, 'px');

                            var sepWidth = 100;
                            var sfColVal = $sep.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            if (sfColVal !== null) {
                                sepWidth = parseInt(sfColVal[0].split('_')[1]);
                            }

                            function RowSepWidth(space) {
                                var sfColVal = $sep.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if (sfColVal !== null) {
                                    sepWidth = $sep.removeClass(sfColVal[0]);
                                }
                                $sep.addClass('sfCol_' + space);
                            }
                            AdvanceSageSlider($('#sepWidthSlider'), $('#sepWidthHandle'), 1, 100, sepWidth, RowSepWidth, $parent, '%');
                        }

                        function Style() {
                            var style = $sep.css('border-top-style');
                            $('#rowSepLine').val(style);

                            $('#rowSepLine').on('change', function () {
                                var selStyle = $(this).val();
                                $sep.css('border-top-style', selStyle);
                            });
                        }

                        function SepColor() {
                            $('#rowSepColor').css('background-color', $sep.css('border-top-color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $sep.css({ 'border-top-color': objColor.bgColor });
                                }
                            });
                            $('#rowSepColor').colorPicker(colorPickerOption);
                        }
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "bottom"]
                        }
                    }

                },
                "Alignment": {
                    "options": ["left", "center", "right"]
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parent().parent();
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
,    "row": {
        "componentname": "row",
        "category": "layout",
        "icon": " icon icon-comp-row",
        "row": true,
        "hidden": false,
        "collection": false,
        "beforedrop": function ($appendedParent, $row, dropped) {
            var ColumnDOM = "";
            var col100 = DOMCreate('div', '100', 'sfCol_100 column');
            var col80 = DOMCreate('div', '80', 'sfCol_80 column');
            var col75 = DOMCreate('div', '75', 'sfCol_75 column');
            var col70 = DOMCreate('div', '70', 'sfCol_70 column');
            var col60 = DOMCreate('div', '60', 'sfCol_60 column');
            var col50 = DOMCreate('div', '50', 'sfCol_50 column');
            var col40 = DOMCreate('div', '40', 'sfCol_40 column');
            var col30 = DOMCreate('div', '30', 'sfCol_30 column');
            var col33 = DOMCreate('div', '33', 'sfCol_33 sfFixed column');
            var col25 = DOMCreate('div', '25', 'sfCol_25 column');
            var col20 = DOMCreate('div', '20', 'sfCol_20 column');
            ColumnDOM = '<ul class="selectDataWrapper selectcolumns sfCol_100">';
            ColumnDOM += DOMCreate('li', col100, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col80 + col20, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col75 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col70 + col30, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col60 + col40, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col50 + col50, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col40 + col60, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col30 + col70, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col75, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col80, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col60 + col20, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col50 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col30 + col40 + col30, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col33 + col33 + col33, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col25 + col25 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col20 + col20 + col20 + col20, 'sfCol_20 selectData');
            ColumnDOM += '</ul>';

            if (typeof (dropped) !== "undefined") {
                if (dropped) {
                    var columnNote = "<p class='popupGuideMessage'>You can manage columns later from  <b>Row >> Manage Columns </b>.</p>";
                    ColumnDOM = columnNote + ColumnDOM;
                }
            }
            FullPagePopup({
                data: ColumnDOM,
                heading: "Manage columns",
                showheading: true,
                width: "60%",
            });

            ColEvents();

            function ColEvents() {
                $('.selectData').on('click', function () {
                    var $this = $(this);
                    var $editcontainer = findSelectedLayer($row);
                    var rowColLength = $editcontainer.find('> .colWrapper > .editor-col').length;
                    var choosedCol = $this.find('> .column').length;
                    var width = [];
                    $this.find('> .column').each(function () {
                        width.push($(this).text());
                    });
                    var addedCol = choosedCol - rowColLength;
                    if (addedCol > 0) {
                        var col = '';
                        for (var i = 0; i < addedCol; i++) {
                            var colspacing = 'editor-com-innerSpacing-top-35 editor-com-innerSpacing-right-35 editor-com-innerSpacing-bottom-35 editor-com-innerSpacing-left-35';
                            col += divStart('editor-col ui-state-default text-align-center sfFixed ' + colspacing) + colOption + CompenentCreateDOM + divEnd;
                        }
                        $editcontainer.find('.colWrapper').append(col);
                        //if ($editcontainer.length > 0) {
                        //    $editcontainer.find('.colWrapper').append(col);
                        //} else {
                        //    var $shadedLayer = $row.find('.editor-row-shaded-layer');
                        //    if ($shadedLayer.length > 0) {
                        //        $shadedLayer.find('.colWrapper').append(col);
                        //    } else {
                        //        $row.find('.colWrapper').append(col);
                        //    }
                        //}
                        DraggableSortable();
                        SettingEvents();
                        BindColumnEvents($row);
                        ManageWidth();
                        TriggerView($row);
                    } else if (addedCol < 0) {
                        if (typeof (dropped) !== "undefined" && dropped) {
                            if (dropped) {
                                //no need to because it the drop event and  by defaut there is one column
                                // if basic changes then
                            }
                        } else {
                            SageConfirmDialog('You are going to choose  less column. all your data will be switch to the first column ?').done(function () {
                                RemoveColumn();
                                ManageWidth();
                            });
                        }

                    } else if (addedCol == 0) {
                        ManageWidth();
                    }

                    function ManageWidth() {
                        $row.find('> .colWrapper > .editor-col').each(function (i, v) {
                            var $me = $(this);
                            var $classes = $me.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            if ($classes != null) {
                                $me.removeClass($classes[0]);
                            }
                            $me.addClass('sfCol_' + width[i]);
                        });
                        CloseFullPagePopup();
                    }
                    function RemoveColumn() {
                        var $editcontainer = $row.find('.editor-row-container');
                        var $removeContainer = '';
                        if ($editcontainer.length > 0) {
                            $removeContainer = $editcontainer.find('.colWrapper > .editor-col');
                        } else {
                            var $shadedLayer = $row.find('.editor-row-shaded-layer');
                            if ($shadedLayer.length > 0) {
                                $removeContainer = $shadedLayer.find('.colWrapper > .editor-col');
                            } else {
                                $removeContainer = $row.find('.colWrapper > .editor-col');
                            }
                        }
                        for (var i = rowColLength - 1; i >= choosedCol; i--) {
                            $removeContainer.eq(i).find('.editor-component').each(function () {
                                $removeContainer.eq(0).append($(this));
                                $removeContainer.eq(0).find(".column-data-empty").remove();
                            });
                            $removeContainer.eq(i).remove();
                        }

                        TriggerView($row);
                    }
                });
            }
        },
        'defaultdata': EasyLibrary.ReadDOM("onecolumnrow"),
        "afterdrop": function ($appendLayer) {

        },
        "loadSetting": function ($item) {

        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": rowBasicDOM,
                    "onload": function ($this) {
                        $('.editor-row').removeClass('activeSetting');
                        var $parent = $this.parents('.editor-row');
                        $parent.addClass('activeSetting');
                        LoadSettings();
                        InitEvents();

                        function InitEvents() {
                            $('#showTitle').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var $rowTitle = $(RowHeadingDOM());
                                    $rowTitle.insertAfter(ShadedParent());
                                    $rowTitle.find('h1').addClass('ff-' + $('#basicFonts').val());
                                    $rowTitle.find('h1').addClass('f-weight-400');
                                    $rowTitle.find('p').addClass('ff-' + $('#basicFonts').val());
                                    $rowTitle.find('p').addClass('f-weight-400');
                                    SettingEvents();
                                } else {
                                    $parent.find('.rowTitle').remove();
                                }
                            });
                            $('#adJustHeight').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('adjustheight');
                                    $('#adjustHeaderHolder').show();
                                    var rowHeight = $parent.css('height').replace('px', '');
                                    ChangeSliderValue($('#rowHeightSlider'), rowHeight);
                                } else {
                                    $parent.removeClass('adjustheight');
                                    $parent.css({ 'height': '' });
                                    $('#adjustHeaderHolder').hide();
                                }
                            });
                            var rowHeight = $parent.css('height').replace('px', '');

                            function RowHeight(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#rowHeightSlider'), $('#rowHeightHandle'), 50, 1200, rowHeight, RowHeight, $parent, 'px');
                            $('#askContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var containerDiv = divStart('editor-row-container container-medium') + divEnd;
                                    var appendElem = '';
                                    if ($parent.find('> .editor-row-shaded-layer').length === 0) {
                                        appendElem = $parent.children();
                                        $parent.append(containerDiv);
                                    } else {
                                        appendElem = $parent.find('> .editor-row-shaded-layer').children();
                                        $parent.find('> .editor-row-shaded-layer').append(containerDiv);
                                    }
                                    $parent.find('.editor-row-container').append(appendElem);
                                    $('#selContainerWidth').val('container-medium');
                                    $('#additionalContainer').fadeIn(400);

                                } else {
                                    var appendElem = $parent.find('.editor-row-container').children();
                                    if ($parent.find('> .editor-row-shaded-layer').length === 0) {
                                        $parent.append(appendElem);
                                    } else {
                                        $parent.find('> .editor-row-shaded-layer').append(appendElem);
                                    }
                                    $parent.find('.editor-row-container').remove();
                                    $('#additionalContainer').fadeOut(400);
                                }
                                //CalculateWidth($parent.find('.colWrapper'));
                                TriggerView($parent);
                            });

                            $('#selContainerWidth').off().on('change', function () {
                                var containWidth = $(this).val();
                                var $container = $parent.find('.editor-row-container');
                                $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                                $container.addClass(containWidth);
                                //CalculateWidth($parent.find('.colWrapper'));


                            });
                        }

                        function ShadedParent() {
                            if ($parent.find('> .row-options').length == 0) {
                                if ($parent.find('> div > .row-options').length == 0) {
                                    if ($parent.find('> div > div > .row-options').length == 0) { } else
                                        return $parent.find('> div > div > .row-options');
                                } else
                                    return $parent.find('> div > .row-options');
                            } else
                                return $parent.find('> .row-options');
                        }

                        function LoadSettings() {
                            var $container = $parent.find('div.rowTitle');
                            if ($container.length > 0) {
                                $('#showTitle').prop('checked', true);
                            } else {
                                $('#showTitle').prop('checked', false);
                            }
                            if ($parent.hasClass('adjustheight')) {
                                $('#adJustHeight').prop('checked', true);
                                $('#adjustHeaderHolder').show();
                            } else {
                                $('#adJustHeight').prop('checked', false);
                            }
                            $container = $parent.find('div.editor-row-container');
                            if ($container.length > 0) {
                                $('#askContainer').prop('checked', true);
                                var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                                $('#selContainerWidth').val(conClass);
                                $('#additionalContainer').fadeIn(400);
                            } else {
                                $('#askContainer').prop('checked', false);
                            }
                        }

                        function RowHeadingDOM() {
                            var rowHeadingDOM = '';
                            rowHeadingDOM += divStart('rowTitle sfCol_100');
                            rowHeadingDOM += divStart('editor-component com-heading rowTitleHeading sfCol_100 text-align-center');
                            rowHeadingDOM += DOMCreate('div', ' Row heading<i class="fa fa-bars"></i>', 'carrier-open-option no-drag');
                            rowHeadingDOM += divStart('text-options carries-options');
                            rowHeadingDOM += '<i class="com-settings" data-type="text" title="Heading setting">Settings</i>';
                            rowHeadingDOM += divEnd;
                            rowHeadingDOM += '<h1 style="font-size: 40px;" class="editor-com-outerSpacing-top-0 editor-com-innerSpacing-top-50 editor-com-outerSpacing-bottom-20" contenteditable="true">This is heading </h1>';
                            rowHeadingDOM += divEnd;
                            rowHeadingDOM += divStart('editor-component paragraph rowTitleSummary sfCol_100 text-align-center');
                            rowHeadingDOM += DOMCreate('div', ' Row heading summary<i class="fa fa-bars"></i>', 'carrier-open-option no-drag');
                            rowHeadingDOM += divStart('text-options carries-options');
                            rowHeadingDOM += '<i class= "com-settings" data-type="text" title="Summary setting">Settings</i>';
                            rowHeadingDOM += divEnd;
                            rowHeadingDOM += '<p style="font-size: 14px;" class="editor-para  editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0 editor-com-innerSpacing-bottom-50" contenteditable="true">This is Heading Summary.</p>';
                            rowHeadingDOM += '</div>';
                            rowHeadingDOM += divEnd;
                            return rowHeadingDOM;
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
                            "position": ["top", "bottom"]
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
                        "position": ["top", "bottom"],
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
,    "text": {
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
            $ViewDom.find('.article-text').text("##articletext##");
        }

    }
,    "Text editor": {
        "componentname": "Text editor",
        "category": "basic",
        "icon": "fa fa-file-text",
        "row": false,
        "hidden": false,
        "defaultdata": EasyLibrary.ReadDOM("document editor/documenteditor"),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            var _this = this;
            _this.common.mouseleave();
            var thisMain;
            var $parent = $appendLayer.find('.documenteditorWrap');
            if (dropped) {
                var TextEditor = MainFuntion($parent);
            }
            else {
                if ($appendLayer.hasClass('site-body')) {
                    $parent.each(function (index, value) {
                        var $thisMain = $(this);
                        thisMain = this;
                        var TextEditor = MainFuntion($thisMain);
                    });
                }
                else {
                    var $parent = $appendLayer.find('.documenteditorWrap');
                    $parent.each(function (index, value) {
                        var TextEditor = new MainFuntion($appendLayer);
                    });
                }
            }

            function MainFuntion($thisMain) {
                var $divCompForm = $thisMain.find('.divCompForm');
                var $documenttext = $thisMain.find('.documenttext');

                var flagb = isActiveFlag = false;
                var flagu = flagi = flagColor = flagfontFam = flagJustify = false;
                var fcolor = flagfontFamVal = flagJustifyValue = '';
                var FontUse = '14px';
                var arr = [];

                $(document).on('click', function (e) {
                    var $this = $(this);
                    if (!$(e.target).parents().hasClass('documenteditorWrap')) {
                        $('.text-deitor-toolsbar').hide();
                        $('.toobar-drop-element').css('display', 'none');
                    }
                });
                $(document).on('click', '.documenttext', function () {
                    $('.text-deitor-toolsbar').hide();
                    $('.toobar-drop-element').hide();
                    var $this = $(this);
                    $this.parent().find('.text-deitor-toolsbar').show();
                    range = saveSelection();
                });
                $(document).on('keyup', '.documenttext', function (event) {
                    range = saveSelection();

                    $('.text-deitor-toolsbar').hide();
                    $('.toobar-drop-element').hide();
                    var $this = $(this);
                    $this.parent().find('.text-deitor-toolsbar').show();
                    range = saveSelection();

                    var $this = $(this);
                    if (event.keyCode == 8 || event.keyCode == 46) {
                        $this.find('blockquote span').css('background-color', '');
                        $this.find('span').css('background-color', '');
                    }
                    if (range.startOffset == range.endOffset) {
                        var fontElements = document.getElementsByTagName("font");

                        for (var i = 0, len = fontElements.length; i < len; ++i) {
                            if (fontElements[i].size == "2") {
                                fontElements[i].removeAttribute("size");
                                fontElements[i].style.fontSize = $this.prev().find('.fontValueC').text();
                                fontElements[i].className = 'f-weight-' + $this.prev().find('.cFontWeight').val();
                                fontElements[i].style.fontFamily = $this.prev().find('.cFontFamily').val();
                            }
                        }
                    }
                });
                $thisMain.find('.text-deitor-toolsbar').on('click', function () {
                    $('.text-deitor-toolsbar').hide();
                    var $this = $(this);
                    $this.show();
                });
                $thisMain.find('.createlinkC').off().on('change', function () {

                    var $this = $(this);
                    restoreSelection(range);
                    var url = '';

                    url = $this.parent().find('.createlinkC').val();
                    if (url.includes('http://')) {
                        url = url.replace(/http:\/\/http:\/\//, "http://");
                    }
                    else if (url.includes('https://')) {
                        url = url.replace(/https:\/\/https:\/\//, "https://");
                    }
                    else {
                        url = "https://" + $this.parent().find('.createlinkC').val();
                    }
                    if (url == "http://" || url == "https://") {
                        SageAlertDialog('Please enter the link.');
                    }
                    else {
                        var selection = document.getSelection();
                        document.execCommand('createlink', false, url);
                        var $targetvalue = $this.parent().find('.targetTypeC  option:selected').attr('title');
                        selection.anchorNode.parentElement.target = $targetvalue;
                        $('.createlinkC').val('');
                        $('.dropElement').hide();
                        $this.parent().prev().removeClass('active');
                    }
                });
                function hideDropChild() {
                    $('.has-drop-child').find('button').removeClass('active');
                    $('.toobar-drop-element').css('display', 'none');
                }

                $thisMain.find('.boldC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        isActiveFlag = true;
                        flagb = false;
                    }
                    else {
                        $this.addClass('active');
                        isActiveFlag = false;
                        flagb = true;
                    }
                    document.execCommand('bold', false, null);
                    range = saveSelection();
                });
                $thisMain.find('.underlineC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        isActiveFlag = true;
                        flagu = false;
                    }
                    else {
                        $this.addClass('active');
                        isActiveFlag = false;
                        flagu = true;
                    }
                    document.execCommand('underline', false, null);
                    range = saveSelection();
                });
                $thisMain.find('.italicC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        isActiveFlag = true;
                        flagi = false;
                    }
                    else {
                        $this.addClass('active');
                        isActiveFlag = false;
                        flagi = true;
                    }
                    document.execCommand('italic', false, null);
                    selection = document.getSelection();
                    selection.anchorNode.parentElement.style.display = 'inline';
                    range = saveSelection();
                    if (flagu == true) {
                        selection.anchorNode.parentElement.style.textDecoration = 'underline';
                    }
                });
                $thisMain.find('.tCase').off().on('click', function () {
                    var $this = $(this);
                    addfont();
                });
                function addfont() {
                    restoreSelection(range);
                    if (range.startOffset == range.endOffset) {
                        $('.fontValueC').text();
                    }
                    else {
                        $('.fontValueC').text(GetFont().split('px')[0] + "px");
                    }
                }
                $thisMain.find('.minusC').off().on('click', function () {
                    var $this = $(this);
                    var sCmd = $this.attr('title');
                    restoreSelection(range);
                    getfontSize(sCmd, $this);

                });
                function getfontSize(sCmd, $this) {
                    if (sCmd == 'fontsize') {
                        var FontCalc = '';
                        var FontCalc = $this.attr('id');
                        changeFont(FontCalc, $this);
                    }
                }
                $thisMain.find('.plusC').off().on('click', function () {
                    var $this = $(this);
                    var sCmd = $this.attr('title');
                    restoreSelection(range);
                    getfontSize(sCmd, $this);
                });
                $thisMain.find('.tindentC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('indent', false, null);
                });
                $thisMain.find('.toutdentC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('outdent', false, null);
                });
                $thisMain.find('.listC').off().on('click', function () {
                    restoreSelection(range);
                    var $this = $(this);
                });
                $thisMain.find('.formatblockC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    selection = document.getSelection();
                    var selectquote = selection.anchorNode.parentElement;
                    var $selectquote = $(selectquote).find('blockquote').children().length;

                    if ($this.hasClass('active')) {
                        if ($selectquote == 0) {
                            if ($documenttext.find('blockquote')) {
                                document.execCommand('formatBlock', false, 'p');
                                if (!$(selection.anchorNode.parentElement).hasClass('pClass')) {
                                    $(selection.anchorNode.parentElement).addClass('pClass');
                                }
                            }
                        }
                        else {
                            document.execCommand('formatBlock', false, 'p');
                        }
                        $this.removeClass('active');
                    }
                    else {
                        document.execCommand('formatBlock', false, 'blockquote');
                        $this.addClass('active');
                    }
                });
                $thisMain.find('.btnlinkC').off().on('click', function () {
                    restoreSelection(range);
                });
                $thisMain.find('.leftalignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyLeft', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyLeft';
                    CommandALL();
                });
                $thisMain.find('.centeralignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyCenter', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyCenter';
                    CommandALL();
                });
                $thisMain.find('.rightalignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyRight', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyRight';
                    CommandALL();
                });
                $thisMain.find('.fullalignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyFull', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyFull';
                    CommandALL();
                });
                $thisMain.find('.ullistC').off().on('click', function () {
                    var $this = $(this);
                    restoreSelection(range);
                    document.execCommand('insertunorderedlist');
                    $this.parent().prev().removeClass('active');

                    selection = document.getSelection();
                    var fontsizelist = $this.parent().parent().parent().parent().find('.fontValueC').text();
                    var fontweightlist = $this.parent().parent().parent().parent().find('.cFontWeight').val();
                    selection.anchorNode.parentElement.style.fontSize = fontsizelist;
                    selection.anchorNode.parentElement.style.fontWeight = fontweightlist;

                    CommandALL();
                });
                $thisMain.find('.ollistC').off().on('click', function () {
                    var $this = $(this);
                    restoreSelection(range);
                    document.execCommand('insertorderedlist');
                    $this.parent().prev().removeClass('active');

                    selection = document.getSelection();
                    var fontsizelist = $this.parent().parent().parent().parent().find('.fontValueC').text();
                    var fontweightlist = $this.parent().parent().parent().parent().find('.cFontWeight').val();
                    selection.anchorNode.parentElement.style.fontSize = fontsizelist;
                    selection.anchorNode.parentElement.style.fontWeight = fontweightlist;
                    CommandALL();
                });
                $thisMain.find('.alloptionC').off().on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('rotate')) {
                        $this.removeClass('rotate');
                    }
                    else {
                        $this.addClass('rotate');
                    }
                    if ($this.parent().parent().parent().parent().find('.text-deitor-toolsbar').hasClass('all')) {
                        $this.parent().parent().parent().parent().find('.text-deitor-toolsbar').removeClass('all');
                    }
                    else {
                        $this.parent().parent().parent().parent().find('.text-deitor-toolsbar').addClass('all');
                    }
                });
                $thisMain.find('.cFontFamily').html(DOMFontAdvanceCollection());
                $thisMain.find('.cFontFamily').off().on('change', function () {
                    var $this = $(this);
                    $thisMain.find('.article-detail-text').css('font-family', $this.val());
                });
                //$thisMain.find('.cFontFamily').off().on('change', function () {
                //    var $this = $(this);
                //    range = saveSelection();
                //    restoreSelection(range);
                //    fontWeight($this.val());
                //    document.execCommand('fontName', false, $this.val());
                //    selection = document.getSelection();
                //    if (selection.anchorNode.parentElement.tagName == 'FONT') {
                //        if ($this.parent().next().children().val() == "0") {
                //            var fontElements = document.getElementsByTagName("font");
                //            document.execCommand('fontSize', false, 2);

                //            for (var i = 0, len = fontElements.length; i < len; ++i) {
                //                if (fontElements[i].size == "2") {
                //                    fontElements[i].removeAttribute("size");
                //                    fontElements[i].style.fontSize = $this.prev().find('.fontValueC').text();
                //                    $(fontElements[i]).children().each(function () {
                //                        if (typeof $(this).attr('class') != 'undefined') {
                //                            var fontWeightValue = '';
                //                            fontWeightValue = 'f-weight-' + $this.parent().next().find('.cFontWeight').val();
                //                            if (typeof $(this).attr('class') != 'undefined') {
                //                                matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                //                                $(this).removeClass(matches.toString());
                //                                if (typeof $(this).children().attr('class') == 'undefined') {
                //                                    $(this).contents().unwrap();
                //                                }
                //                                CheckChildren(this);
                //                            }
                //                            if (typeof $(this).children().children().attr('class') != 'undefined') {
                //                                matches = $(this).children().children().attr('class').match(/\bf-weight-\S+/g);
                //                                $(this).children().children().removeClass(matches.toString());
                //                                $(this).children().children().parent().html($(this).children().children().html());
                //                            }
                //                            if (typeof $(this).children().attr('class') != 'undefined') {
                //                                matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                //                                $(this).children().removeClass(matches.toString());
                //                                $(this).html($(this).contents().text());
                //                            }
                //                        }
                //                    });
                //                }
                //            }
                //        }
                //        else {
                //            if (typeof selection.anchorNode.parentElement.className != 'undefined') {
                //                var matches = selection.anchorNode.parentElement.className.match(/\bf-weight-\S+/g);
                //                if (matches != null) {
                //                    $(selection.anchorNode.parentElement).removeClass(matches.toString());
                //                }
                //            }
                //        }
                //    }
                //    else if (selection.anchorNode.parentElement.tagName == 'B') {
                //        selection.anchorNode.parentElement.className = '';
                //        $(selection.anchorNode.parentElement).parent().html($(selection.anchorNode.parentElement).html());
                //    }
                //    else if (selection.anchorNode.parentElement.tagName == 'P') {
                //        selection.anchorNode.parentElement.className = 'f-weight-' + $this.parent().next().children().val();
                //    }
                //    else if (selection.anchorNode.parentElement.tagName == 'SPAN') {
                //        $(selection.anchorNode.parentElement).children().each(function () {
                //            var matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                //            if (matches != null) {
                //                $(this).removeClass(matches.toString());

                //                if (typeof $(this).children().attr('class') == 'undefined') {
                //                    $(this).contents().unwrap();
                //                }
                //            }
                //            CheckChildren(this, matches);
                //        });
                //    }
                //    else if (selection.anchorNode.parentElement.nextElementSibling != null) {
                //        if (selection.anchorNode.parentElement.nextElementSibling.tagName == 'FONT') {
                //            var matches = selection.anchorNode.parentElement.nextElementSibling.className.match(/\bf-weight-\S+/g);
                //            if (matches != null) {
                //                $(selection.anchorNode.parentElement.nextElementSibling).removeClass(matches.toString());
                //            }
                //            selection.anchorNode.parentElement.nextElementSibling.className = selection.anchorNode.parentElement.nextElementSibling.className + ' f-weight-' + $this.parent().next().children().val();
                //        }
                //    }
                //    flagfontFam = true;
                //    flagfontFamVal = $this.val();
                //    $this.val(flagfontFamVal);
                //    CommandALL();
                //});
                function removematchClass(child, matches) {
                    child.parentNode.removeClass(matches);
                }
                function CheckChildren(node, matches) {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        var child = node.childNodes[i];
                        CheckChildren(child, matches);
                        removematchClass(child, matches);
                    }
                }
                $thisMain.find('.cFontFamily').on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if (range.collapsed == false) {
                        $this.val(GetFontFamily($this));
                    }
                    fontWeight($this.val());
                });
             $thisMain.find('.cFontWeight').off().on('change', function () {
                 var $this = $(this);
                 $this.parents('.documenteditorWrap').find('.article-detail-text').css('font-weight',$this.val())

             });
                //$thisMain.find('.cFontWeight').off().on('change', function () {
                //    var $this = $(this);
                //    addfont();
                //    restoreSelection(range);
                //    hideDropChild();
                //    var sCmd = $this.attr('id');
                //    if (range.endOffset == range.startOffset) {
                //        document.execCommand("fontSize", false, "2");

                //        var doc = document.querySelector(".documenteditor");
                //        var fontElements = doc.getElementsByTagName("font");
                //        var DefaultFontweight = $this.val();
                //        for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                //            if (fontElements[fontElement].size == '2') {
                //                if (fontElements[fontElement].style.fontWeight != '') {
                //                    DefaultFontweight = fontElements[fontElement].style.fontWeight;
                //                }
                //                $(fontElements[fontElement]).children().each(function () {
                //                    if (typeof $(this).attr('class') != 'undefined' || typeof $(this).children().attr('class') != 'undefined') {
                //                        var matches = '';
                //                        if (typeof $(this).children().attr('class') != 'undefined') {
                //                            matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                //                            $(this).children().removeClass($(this).children().attr('class'));
                //                        }
                //                        else if (typeof $(this).attr('class') != 'undefined') {
                //                            matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                //                            $(this).removeClass($(this).attr('class'));
                //                        }
                //                    }
                //                });
                //                fontElements[fontElement].className = 'f-weight-' + DefaultFontweight;
                //            }
                //        }

                //    }
                //    else {
                //        var $parentWeight = $this.parent().parent();
                //        var fontexitval = '';

                //        selection = document.getSelection();
                //        var startOffset = range.startOffset;
                //        var endOffset = range.endOffset;
                //        document.execCommand('bold', false, null);
                //        range = saveSelection();
                //        var fontElements = $documenttext.find("b");

                //        var DefaultFontweight = $this.val();
                //        for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                //            if (fontElements[fontElement].style.fontWeight != '') {
                //                DefaultFontweight = fontElements[fontElement].style.fontWeight;
                //            }
                //            $(fontElements[fontElement]).children().each(function () {
                //                if (typeof $(this).attr('class') != 'undefined' || typeof $(this).children().children().attr('class') != 'undefined' || typeof $(this).children().attr('class') != 'undefined') {
                //                    var matches = '';
                //                    if (typeof $(this).children().children().attr('class') != 'undefined') {
                //                        matches = $(this).children().children().attr('class').match(/\bf-weight-\S+/g);
                //                        $(this).children().children().removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                //                    }
                //                    else if (typeof $(this).attr('class') != 'undefined') {
                //                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                //                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                //                    }
                //                    else if (typeof $(this).children().attr('class') != 'undefined') {
                //                        matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                //                        $(this).children().removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                //                    }
                //                }
                //                $(this).parent().find('font').each(function () {
                //                    if (typeof $(this).attr('class') != 'undefined') {
                //                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                //                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                //                    }
                //                });
                //            });
                //            if (range.startOffset != 1 && range.endOffset != 1) {
                //                selection.anchorNode.parentElement.className = 'f-weight-' + DefaultFontweight;
                //            }
                //            if (selection.anchorNode.parentElement.parentElement.tagName == 'SPAN') {
                //                var NewElement = $("<b />");
                //                $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                //                    $(NewElement).attr(attrib.name, attrib.value);
                //                });
                //            }
                //        }
                //        if (selection.anchorNode.parentElement.parentElement.tagName == "SPAN") {
                //            if (typeof selection.anchorNode.parentElement.parentElement.tagName != 'undefined') {
                //                $(selection.anchorNode.parentElement.parentElement).removeAttr('style');
                //                $(selection.anchorNode.parentElement.parentElement).children().each(function () {
                //                    if (typeof $(this).attr('class') != 'undefined') {
                //                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                //                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                //                    }
                //                });
                //                var NewElement = $("<b />");
                //                $.each(selection.anchorNode.parentElement.parentElement.attributes, function (i, attrib) {
                //                    $(NewElement).attr(attrib.name, attrib.value);
                //                });
                //            }
                //            else {
                //                $(selection.anchorNode.parentElement).removeAttr('style');
                //                $(selection.anchorNode.parentElement).attr('class', 'f-weight-' + DefaultFontweight);
                //                var NewElement = $("<b />");
                //                $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                //                    $(NewElement).attr(attrib.name, attrib.value);
                //                });
                //            }
                //        }
                //        if (selection.anchorNode.parentElement.parentElement.tagName == "P") {
                //            var $selectionParent = $(selection.anchorNode.parentElement.parentElement);
                //            $selectionParent.children().each(function (index, value) {
                //                if ($(this).is('font')) {
                //                    var thisHTML = (this).outerHTML;
                //                    var $$this = $(this);
                //                    if (typeof $selectionParent.children().eq(index).attr('style') != 'undefined')
                //                        arr[index] = $selectionParent.children().eq(index).css('font-size');
                //                }
                //            });
                //        }
                //        if (selection.anchorNode.parentElement.tagName == "SPAN") {
                //            $(selection.anchorNode.parentElement).removeAttr('style');
                //            $(selection.anchorNode.parentElement).attr('class', 'f-weight-' + DefaultFontweight);
                //            var NewElement = $("<b />");
                //            $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                //                $(NewElement).attr(attrib.name, attrib.value);
                //            });
                //        }

                //        var fontsizelist = $(selection.anchorNode.parentElement).css('font-size');

                //        if (selection.anchorNode.parentElement.parentElement.tagName == 'FONT') {
                //            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                //            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                //        }
                //        else if (selection.anchorNode.parentElement.parentElement.tagName == 'LI') {
                //            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                //            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                //        }
                //        else if (selection.anchorNode.parentElement.parentElement.tagName == 'B') {
                //            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                //            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                //        }
                //        else {
                //            selection.anchorNode.parentElement.style.fontSize = fontsizelist;
                //            var $selectionParent = $(selection.anchorNode.parentElement.parentElement);
                //            $selectionParent.children().each(function (index, value) {
                //                if ($(this).is('font')) {
                //                    var $$this = $(this);
                //                    if (typeof arr[index] != 'undefined') {
                //                        $selectionParent.children().eq(index).css('font-size', arr[index]);
                //                    }
                //                }
                //            });
                //        }
                //    }
                //});
                $thisMain.find('.cFontCase').off().on('change', function () {
                    var $this = $(this);
                    var trasformValue = '';
                    document.execCommand('fontsize', null, 2);
                    var fontElements = document.getElementsByTagName("font");
                    var FontCaseVal = $this.val();

                    for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                        if (fontElements[fontElement].size == "2") {
                            fontElements[fontElement].removeAttribute("size");
                            if (FontCaseVal == 'uppercase') {
                                fontElements[fontElement].className = 'editor-text-transform-uppercase';
                            }
                            else if (FontCaseVal == "lowercase") {
                                fontElements[fontElement].className = 'editor-text-transform-lowercase';
                            }
                            else if (FontCaseVal == "capitalize") {
                                fontElements[fontElement].className = 'editor-text-transform-capitalize';
                            }
                            else {
                                fontElements[fontElement].className = '';
                            }
                            fontElements[fontElement].style.fontSize = $this.parent().parent().parent().parent().find('.fontValueC').text();
                            fontElements[fontElement].className = fontElements[fontElement].className + ' f-weight-' + $this.parent().parent().parent().parent().find('.cFontWeight').val();
                        }
                    }
                });
                $thisMain.find('.has-drop-child').find('button').on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $this.parent().find('.toobar-drop-element').css('display', 'none');
                    }
                    else {
                        $('.has-drop-child').find('button').removeClass('active');
                        $('.toobar-drop-element').css('display', 'none');
                        $this.addClass('active');
                        $this.parent().find('.toobar-drop-element').css('display', 'block');
                        LoadSettingsLineHeightSize($this);
                        LoadSettingsLetterSpacingSize($this);
                    }
                });
                $thisMain.find('.has-drop-child').find('span').on('click', function () {
                    var $this = $(this);
                    range = saveSelection();
                    $this.parent().css('display', 'block');
                });

                function LoadSettingsLineHeightSize($this) {
                    var pClasslen = $this.parent().parent().parent().parent().find('.pClass').length;
                    var blockquotelen = $this.parent().parent().parent().parent().find('blockquote').length;
                    var LineHeight = '';
                    if (pClasslen >= 1) {
                        LineHeight = parseInt($this.parent().parent().parent().parent().find('.pClass').css('line-height'));
                    }
                    if (blockquotelen >= 1) {
                        LineHeight = parseInt($this.parent().parent().parent().parent().find('blockquote').css('line-height'));
                    }
                    function EditorLineHeightSlider(space) {
                        if (pClasslen >= 1) {
                            $this.parent().parent().parent().parent().find('.pClass').css('line-height', space + 'px');
                        }
                        if (blockquotelen >= 1) {
                            $this.parent().parent().parent().parent().find('blockquote').css('line-height', space + 'px');
                        }
                    }
                    AdvanceSageSlider($this.parent().parent().parent().find('.LineHeightSizeC'), $this.parent().parent().parent().find('.LineHeightSizeHandleC'), 10, 100, LineHeight, EditorLineHeightSlider, $parent, '');
                }

                function LoadSettingsLetterSpacingSize($this) {
                    var pClasslen = $this.parent().parent().parent().parent().find('.pClass').length;
                    var blockquotelen = $this.parent().parent().parent().parent().find('blockquote').length;
                    var LetterSpacing = '';
                    if (pClasslen >= 1) {
                        LetterSpacing = parseInt($this.parent().parent().parent().parent().find('.pClass').css('letter-spacing'));
                    }
                    if (blockquotelen >= 1) {
                        LetterSpacing = parseInt($this.parent().parent().parent().parent().find('blockquote').css('letter-spacing'));
                    }
                    function EditorLetterSpacingSlider(space) {
                        if (pClasslen >= 1) {
                            $this.parent().parent().parent().parent().find('.pClass').css('letter-spacing', space + 'px');
                        }
                        if (blockquotelen >= 1) {
                            $this.parent().parent().parent().parent().find('blockquote').css('letter-spacing', space + 'px');
                        }
                    }
                    AdvanceSageSlider($this.parent().parent().parent().find('.LetterSpaceSizec'), $this.parent().parent().parent().find('.LetterSpaceSizeSizeHandleC'), -10, 10, LetterSpacing, EditorLetterSpacingSlider, $parent, '');
                }

                LoadFontFamily();
                function LoadFontFamily() {
                    var defaultFontFamily = 'montserrat';
                    fontWeight(defaultFontFamily);
                    $thisMain.find('.cFontWeight').val('400');
                }
                function fontWeight(fontName, $this) {
                    var fontDOM = DOMFontWeight(fontName);
                    if (fontDOM.length > 0) {
                        $thisMain.find('.cFontWeight').html(fontDOM);
                        if (fontName == 'montserrat') {
                            $thisMain.find('.cFontWeight').val('400');
                        }
                    }
                }
                function GetFontWeight($this) {
                    var getParentName = '';
                    getParentName = document.getSelection().anchorNode.parentElement.tagName;
                }
                function changeFont(FontCalc, $this) {
                    console.log(FontCalc);
                    console.log($this);
                    var font;
                        if (FontCalc == 'btnPlusFontSize') {
                            font = $this.prev().text().split('px')[0];
                            if (font < 150) {
                                font++;
                            }
                            $this.prev().text(font + 'px');
                        }
                        else {
                            font = $this.next().text().split('px')[0];
                            if (font > 10) {
                                font--;
                            }
                            $this.next().text(font + 'px');
                        }
                        $this.parents('.documenteditor').find('.article-detail-text').css('font-size', font + 'px');
                       
                }
                //function changeFont(FontCalc, $this) {
                //    restoreSelection(range);
                //    var font = '';
                //    if (FontCalc == 'btnPlusFontSize') {
                //        font = $this.prev().text().split('px')[0];
                //        if (font < 150) {
                //            font++;
                //        }
                //    }
                //    else {
                //        font = $this.next().text().split('px')[0];
                //        if (font > 10) {
                //            font--;
                //        }
                //    }
                //    document.execCommand("fontSize", false, "2");
                //    var fontElements = document.getElementsByTagName("font");
                //    for (var i = 0, len = fontElements.length; i < len; ++i) {
                //        if (fontElements[i].size == "2") {
                //            fontElements[i].removeAttribute("size");
                //            fontElements[i].style.fontSize = font + "px";

                //            selection = document.getSelection();
                //            if (selection.anchorNode.parentElement.parentElement.tagName == 'LI') {
                //                var fontsizelist = $this.parent().parent().parent().parent().find('.fontValueC').text();
                //                selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                //            }
                //        }
                //    }
                //    if ($documenttext.text() == '') {
                //        $documenttext.find('.pClass').css('font-size', font + 'px');
                //    }
                //    if (FontCalc == 'btnPlusFontSize') {
                //        $this.prev().text(font + "px");
                //    }
                //    else {
                //        $this.next().text(font + "px");
                //    }
                //    FontUse = font + 'px';
                //}
                function GetFont() {
                    var font = '14px';
                    var getParentName = '';
                    if ($documenttext.text() == '') {
                        getParentName = window.getSelection().anchorNode.tagName;
                        if (getParentName == 'P') {
                            getParentName = window.getSelection().anchorNode;
                            font = $(getParentName).css('font-size');
                        }
                    }
                    else {
                        getParentName = window.getSelection().anchorNode.parentElement.tagName;
                        if (getParentName == 'FONT' || getParentName == 'LI' || getParentName == 'A' || getParentName == 'P' || getParentName == 'U' || getParentName == 'I' || getParentName == 'B' || getParentName == 'SPAN') {
                            getParentName = window.getSelection().anchorNode.parentNode;
                            font = $(getParentName).css('font-size');
                        }
                    }
                    return font;
                }
                function GetFontFamily($this) {
                    var getParentName = '';
                    var getChildName = '';
                    var fontfamily = 'montserrat';

                    getParentName = document.getSelection().anchorNode.parentElement.tagName;
                    if (getParentName == 'FONT') {
                        fontfamily = $(document.getSelection().anchorNode.parentElement).attr('face');
                        if (typeof fontfamily == 'undefined') {
                            fontfamily = 'montserrat';
                        }
                    }
                    else if (getParentName == 'P') {
                        fontfamily = $this.val();
                    }
                    else if (document.getSelection().anchorNode.parentElement.nextElementSibling.tagName == 'FONT') {
                        fontfamily = $(document.getSelection().anchorNode.parentElement.parentElement).attr('face');
                    }
                    return fontfamily;
                }

                FontColor();

                function FontColor() {
                    var colordocEditOption = ColorPickerOption({
                        renderCallback: function ($elm, toggled) {
                            var objColor = RenderCallBackColor(this);
                            $elm.parents('.documenteditorWrap').find('.article-detail-text').css('color', objColor.bgColor)
                            //    hideDropChild();
                            //    var objColor = '';
                            //    objColor = RenderCallBackColor(this);
                            //    if ($elm.hasClass('doceditcolor')) {
                            //        restoreSelection(range);
                            //        objColor.bgColor = rgb2hex(objColor.bgColor);

                            //        document.execCommand("forecolor", false, objColor.bgColor);
                            //        if (range.collapsed == true) {
                            //            if (flagb == true) {
                            //                if (isActiveFlag == true) {
                            //                    document.execCommand("bold", false, null);
                            //                }
                            //            }
                            //            if (flagi == true) {
                            //                if (isActiveFlag == true) {
                            //                    document.execCommand('italic', false, null);
                            //                }
                            //            }
                            //            if (flagb == true) {
                            //                if (isActiveFlag == true) {
                            //                    document.execCommand('underline', false, null);
                            //                }
                            //            }
                            //        }
                            //        fcolor = objColor.bgColor;
                            //        range = saveSelection();
                            //    }
                            //    else if ($elm.hasClass('doceditcolorBG')) {
                            //        restoreSelection(range);
                            //        objColor.bgColor = rgb2hex(objColor.bgColor);

                            //        document.execCommand("backColor", false, objColor.bgColor);
                            //        range = saveSelection();
                            //    }
                            //    flagColor = true;
                        }
                    });
                    $('.DocEditorColorPicker').colorPicker(colordocEditOption);
                }
                function CommandALL() {
                    if (flagb == true) {
                        if (isActiveFlag == true) {
                            document.execCommand("bold", false, null);
                        }
                    }
                    if (flagu == true) {
                        if (isActiveFlag == true) {
                            document.execCommand("underline", false, null);
                        }
                    }
                    if (flagi == true) {
                        if (isActiveFlag == true) {
                            document.execCommand("italic", false, null);
                        }
                    }
                    flagb = flagu = flagi = flagfontFam = '';
                }
                function rgb2hex(rgb) {
                    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
                    return (rgb && rgb.length === 4) ? "#" +
                     ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                     ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                     ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
                }

                function makeInitialTextReadOnly(input) {
                    var readOnlyLength = input.value.length;
                    input.addEventListener('keydown', function (event) {
                        var which = event.which;
                        if (((which == 8) && (input.selectionStart <= readOnlyLength))
                                || ((which == 46) && (input.selectionStart < readOnlyLength))) {
                            event.preventDefault();
                        }
                    });
                    input.addEventListener('keypress', function (event) {
                        var which = event.which;
                        if ((event.which != 0) && (input.selectionStart < readOnlyLength)) {
                            event.preventDefault();
                        }
                    });
                    input.addEventListener('cut', function (event) {
                        if (input.selectionStart < readOnlyLength) {
                            event.preventDefault();
                        }
                    });
                    input.addEventListener('paste', function (event) {
                        if (input.selectionStart < readOnlyLength) {
                            event.preventDefault();
                        }
                    });
                }
                if (typeof $('.createlinkC').val() != 'undefined') {
                    makeInitialTextReadOnly(document.getElementById('txtCreateLink'));
                }

                function saveSelection() {
                    if (window.getSelection) {
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            return sel.getRangeAt(0);
                        }
                    } else if (document.selection && document.selection.createRange) {
                        return document.selection.createRange();
                    }
                    return null;
                }

                function restoreSelection(range) {
                    if (range) {
                        if (window.getSelection) {
                            sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        } else if (document.selection && range.select) {
                            range.select();
                        }
                    }
                }
                $thisMain.find('.text-deitor-toolsbar').draggable(
                     { handle: ' .dragbutton' }
                 );
              

            }
            $('#btnItalic,#btnbold,#btnUnderLine,#Lists,#btnformatblock,#btnLink,#textCases').hide();
            $('.alloptionC').trigger('click');
           
        },
        "settingDOMs": {
            "tabs": {
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
                return $elem.parent().parent();
            },
        },
        "common": {
            "mouseleave": function () {
                $(document).on('mouseleave', '.documenttext', function () {
                    range = saveSelection();
                });

                function saveSelection() {
                    if (window.getSelection) {
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            return sel.getRangeAt(0);
                        }
                    } else if (document.selection && document.selection.createRange) {
                        return document.selection.createRange();
                    }
                    return null;
                }
            }
        },
        "remove": function (clonedom) {
            clonedom.find('.text-deitor-toolsbar').remove();
        },
        "replace": function ($ViewDom) {
            $ViewDom.find('.article-detail-text').each(function (i, v) {
                var $this = $(this);
                var $count = $this.text().length;
                $this.attr('data-length', "##detailstext##_" + i + "#" + $count);
                $this.text("##detailstext##_" + i);
            });
        }
    }


,    "underline": {
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
,}
