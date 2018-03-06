var button = {
    "button": {
        "componentname": "button",
        "category": "basic",
        "icon": "icon icon-buton",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("defaultbutton"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
            var buttonstyles = {
                "Simple button style": {
                    "0": {
                        "style": "border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(67, 63, 179); border-radius: 0px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-30",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(255, 255, 255); font-size: 12px;"
                            }, {
                                "style": "color: rgb(255, 255, 255);"
                            }, {
                                "style": "color: rgb(255, 255, 255);",
                            }, true, true);
                        }
                    },
                    "1": {
                        "style": "border-style: solid; border-width: 1px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 0px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0 editor-com-outerSpacing-left-10 editor-com-outerSpacing-right-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, true);
                        }
                    },
                    "2": {
                        "style": "border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(67, 63, 179); border-radius: 0px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-left-10 editor-com-outerSpacing-right-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(255, 255, 255); font-size: 12px;"
                            }, {
                                "style": "color: rgb(255, 255, 255);"
                            }, {
                                "style": "color: rgb(255, 255, 255);",
                            }, true, false);
                        }
                    },
                    "3": {
                        "style": "border-style: solid; border-width: 1px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 0px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0 editor-com-outerSpacing-left-10 editor-com-outerSpacing-right-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, false);
                        }
                    },
                    "4": {
                        "style": "border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(67, 63, 179); border-radius: 200px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(255, 255, 255); font-size: 12px;"
                            }, {
                                "style": "color: rgb(255, 255, 255);"
                            }, {
                                "style": "color: rgb(255, 255, 255);",
                            }, true, true);
                        }
                    },
                    "5": {
                        "style": "border-style: solid; border-width: 1px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 200px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, true);
                        }
                    },
                    "6": {
                        "style": "border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(67, 63, 179); border-radius: 200px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(255, 255, 255); font-size: 12px;"
                            }, {
                                "style": "color: rgb(255, 255, 255);"
                            }, {
                                "style": "color: rgb(255, 255, 255);",
                            }, true, false);
                        }
                    },
                    "7": {
                        "style": "border-style: solid; border-width: 1px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 200px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, false);
                        }
                    },
                    "8": {
                        "style": "border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(67, 63, 179); border-radius: 6px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(255, 255, 255); font-size: 12px;"
                            }, {
                                "style": "color: rgb(255, 255, 255);"
                            }, {
                                "style": "color: rgb(255, 255, 255);",
                            }, true, true);
                        }
                    },
                    "9": {
                        "style": "border-style: solid; border-width: 1px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 6px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-left-10 editor-com-outerSpacing-right-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, true);
                        }
                    },
                    "10": {
                        "style": "border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(67, 63, 179); border-radius: 6px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(255, 255, 255); font-size: 12px;"
                            }, {
                                "style": "color: rgb(255, 255, 255);"
                            }, {
                                "style": "color: rgb(255, 255, 255);",
                            }, true, false);
                        }
                    },
                    "11": {
                        "style": "border-style: solid; border-width: 1px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 6px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-left-10 editor-com-outerSpacing-right-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, false);
                        }
                    },
                    "12": {
                        "style": "border-style: double; border-width: 4px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 0px; width: 170px; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, true, true);
                        }
                    },
                    "13": {
                        "style": "border-style: double; border-width: 4px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 200px; width: 170px; display: inline-block; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, true, true);
                        }
                    },
                    "14": {
                        "style": "border-style: double; border-width: 4px; border-color: rgb(5, 22, 225); color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); border-radius: 6px; width: 170px; display: inline-block; box-shadow: rgb(0, 0, 0) 0px 0px 0px;",
                        "class": "editor-component button sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase editor-com-outerSpacing-right-10 editor-com-outerSpacing-left-10",
                        "databackgroundcolor": "color",
                        "databackgroundimage": "",
                        "href": "javascript:void(0);",
                        "change": function ($component) {
                            ChangeButtonStyle($component, {
                                "style": "color: rgb(5, 22, 225); font-size: 12px;"
                            }, {
                                "style": "color: rgb(5, 22, 225);"
                            }, {
                                "style": "color: rgb(5, 22, 225);",
                            }, true, true, true);
                        }
                    },
                },
            }
            //font style, font remove
            function ChangeButtonStyle($compo, $bs, $fs, $is, $fontrequired, $iconrequired, $iconFirst) {
                if (typeof ($iconFirst) === "undefined")
                    $iconFirst = false;
                var $button = $compo.find('.com-button');
                var $i = $compo.find('.com-button > i');
                var $span = $compo.find('.com-button > span');
                if ($fontrequired) {
                    if ($span.length === 0) {
                        var spn = '<span class="com-button-text" contenteditable="true">default text</span>';
                        if ($iconFirst)
                            $compo.find('a').append(spanEnd);
                        else
                            $compo.find('a').prepend(spanEnd);
                    } else {
                        if ($iconFirst)
                            $compo.find('a').append($span);
                        else
                            $compo.find('a').prepend($span);
                    }
                    SetStyleAttribute($span, $fs);
                } else {
                    $span.remove();
                }
                if ($iconrequired) {
                    if ($i.length === 0) {
                        var i = '<i class="fa fa-arrow-right onhovercolor"></i>';
                        if ($iconFirst)
                            $compo.find('a').prepend(i);
                        else
                            $compo.find('a').append(i);
                    } else {
                        if ($iconFirst)
                            $compo.find('a').prepend($i);
                        else
                            $compo.find('a').append($i);
                    }
                    SetStyleAttribute($i, $is);
                } else {
                    $i.remove();
                }
                if ($button.length > 0) {
                    SetStyleAttribute($button, $bs);
                }
            }

            var displayStyle = {
                "ulClass": " ",
                "liClass": "sfCol_25",
                "ulStyle": "",
                "liStyle": ""
            }
            InitComponentStyle($appendLayer, ' > .button', dropped, buttonstyles, this.defaultdata, displayStyle);
            return 'no data to show';
        },
        "afterdrop": function ($appendLayer) {
            if (!$appendLayer.hasClass('site-body')) {
                $appendLayer.addClass('ff-' + $('#basicFonts').val());
                $appendLayer.addClass('f-weight-400');
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("defaultbuttonbasic"),
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
                            EnableLink();
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
                        function EnableLink() {
                            var linkType = $anchor.attr('data-link');

                            var link = $anchor.attr('href');
                            //link !== "javascript:void(0);"
                            if (typeof linkType !== "undefined") {
                                $('#enableButtonLink').prop('checked', true);
                                $('#divEnableLink').show();
                                switch (linkType) {
                                    case 'external':
                                        $('#enableExternalLink').prop('checked', true);
                                        $('#linkTextURL').show();
                                        $('#linkTextURL').val(link);
                                        $anchor.removeClass('anchorpage');
                                        break;
                                    case 'internal':
                                        GetPageList();
                                        $anchor.addClass('anchorpage');
                                        $("#anchorPageList option").filter(function () {
                                            return this.text == link.replace(SageFrameHostURL + '/', '');
                                        }).attr('selected', true);
                                        $('#anchorPageList').show();
                                        $('#enableExternalLink').prop('checked', false);
                                        break;
                                    case 'onepage':
                                        GetPageList();
                                        $("#anchorPageList").val(link);
                                        $('#anchorPageList').show();
                                        $('#enableExternalLink').prop('checked', false);
                                        $anchor.removeClass('anchorpage');
                                        break;
                                }
                            }
                            else {
                                $('#enableButtonLink').prop('checked', false);
                            }


                            //if (typeof (link) !== "undefined") {
                            //    if (link === "javascript:void(0);" || link.length === 0) {
                            //        $('#enableButtonLink').prop('checked', false);
                            //    } else {
                            //        $('#enableButtonLink').prop('checked', true);
                            //        //$('#linkTextURL').val(link);
                            //        $('#divEnableLink').show();
                            //        //GetPageList();
                            //    }
                            //}

                            //var onepage = $anchor.attr('data-onepage');
                            //var linkContains = link.indexOf(SageFrameHostURL) === 1;
                            //if (typeof (onepage) === "undefined" || linkContains) {
                            //    $('#enableExternalLink').prop('checked', true);
                            //    $('#linkTextURL').show();
                            //    $('#linkTextURL').val(link);
                            //}
                            //else {
                            //    $('#anchorPageList').show();
                            //    GetPageList();
                            //    $('#enableExternalLink').prop('checked', false);
                            //}
                            $('#enableButtonLink').off().on('click', function () {
                                $anchor.removeClass('anchorpage');
                                if ($(this).is(':checked')) {
                                    $anchor.attr('data-link', linklist.external);
                                    $anchor.attr('href', '#');
                                    $('#linkTextURL').val('').focus();
                                    $('#divEnableLink').slideDown(400);

                                    $('#enableExternalLink').prop('checked', true);
                                    $('#linkTextURL').show();
                                    $('#anchorPageList').hide();
                                } else {
                                    $anchor.attr('href', 'javascript:void(0);');
                                    $('#divEnableLink').slideUp(400);
                                    $anchor.removeAttr('data-link', linklist.external);
                                }
                            });
                            $('#enableExternalLink').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $anchor.attr('data-link', linklist.external);
                                    $('#linkTextURL').show();
                                    $('#anchorPageList').hide();
                                    $('#linkTextURL').val('').focus();
                                    $anchor.attr('href', '#');
                                    $anchor.removeClass('anchorpage');
                                } else {
                                    ChnageMenulinkType();
                                    GetPageList();
                                    $('#linkTextURL').hide();
                                    $('#anchorPageList').show();
                                    $('#anchorPageList').trigger('change');
                                    $anchor.attr('data-onepage', $('#anchorPageList option:selected').val());
                                }
                            });


                            $('#linkTextURL').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                var link = '#';
                                if (val.length > 0) {
                                    link = val;
                                }
                                $anchor.attr('href', link);
                                component["button"].view.library.buttonlick();
                            });
                        }
                        function ChnageMenulinkType() {
                            if ($('#chkOnePageMenu').is(':checked')) {
                                $anchor.attr('data-link', linklist.onepage);
                                $anchor.removeClass('anchorpage');
                            }
                            else {
                                $anchor.attr('data-link', linklist.internal);
                                $anchor.addClass('anchorpage');
                            }
                        }
                        function GetPageList() {
                            var options = '';
                            if ($('#chkOnePageMenu').is(':checked'))
                                $('.menuHeader .onepagemenu  li').each(function (index, item) {
                                    var $item = $(this);
                                    options += '<option  value="' + $item.attr('data-opscroll') + '">' + $item.find(' > a > .pageName').text() + '</option>';
                                });
                            else {
                                options = EasyLibrary.GetPageOption();
                            }
                            $('#anchorPageList').html(options);
                            //$('#linkTextURL').val($('#anchorPageList selected:option').text());
                            $('#anchorPageList').off().on('change', function () {
                                var $this = $(this);
                                var url = $('#anchorPageList option:selected').text();
                                ChnageMenulinkType();
                                if ($('#chkOnePageMenu').is(':checked')) {
                                    $anchor.attr('href', $('#anchorPageList option:selected').val());
                                    $anchor.attr('data-onepage', $('#anchorPageList option:selected').val());
                                }
                                else
                                    $anchor.attr('href', SageFrameHostURL + '/' + url);
                            });
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
        }
    }
}
