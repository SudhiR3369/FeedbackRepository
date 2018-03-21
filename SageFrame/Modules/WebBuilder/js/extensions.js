var extendedComps = {
    "accordion": {
        "componentname": "accordion",
        "category": "advance",
        "icon": "icon-accordian",
        "row": false,
        "hidden": false,
        "type":"element",
        "defaultdata": EasyLibrary.ReadDOM('accordion/accordionview'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            if ($(document).find('#hdnAccordianSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnAccordianSettingAttr"></div>');
            var AccorSpeed = 500;
            $('.accordianTitle').off('click').on('click', function () {
                var $this = $(this);
                var $thisParent = $this.parents('.accordianWrap').eq(0);
                var AccorItems = $thisParent.find('>.acordianItem');
                AccorItems.find('>.accordianTitle.active').css('background-color', $thisParent.attr('data-titlebgcolor'));
                AccorItems.find('>.accordianTitle.active h2').css('color', $thisParent.attr('data-titlecolor'));
                AccorItems.find('>.accordianTitle.active .accordian-icon .dis-table i').css('color', $thisParent.attr('data-iconcolor'));
                AccorItems.find('>.accordianTitle.active').next('.acordianContent').slideUp(AccorSpeed);
                AccorItems.find('>.accordianTitle .accordian-icon.static .dis-table i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                AccorItems.find('>.accordianTitle').removeClass('active');
                var activeAcor = $this.next('.acordianContent')
                if (activeAcor.is(":hidden")) {
                    $this.addClass('active');
                    $this.find('.accordian-icon.static .dis-table i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                    $this.css('background-color', $thisParent.attr('data-activecolor'));
                    $this.find('h2').css('color', $thisParent.attr('data-activetitle'))
                    $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'))
                    activeAcor.slideDown(AccorSpeed);
                } else {
                    $this.removeClass('active');
                    activeAcor.slideUp(AccorSpeed);
                }
            });
            $('.accordianTitle').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                var $this = $(this);
                var $thisParent = $this.parents('.accordianWrap').eq(0);
                if (evt.type == 'mouseover') {
                    $this.find('h2').css('color', $thisParent.attr('data-activetitle'))
                    $this.find('.accordian-icon i').css('color', $thisParent.attr('data-activeicon'))
                    $this.css('background-color', $thisParent.attr('data-hovercolor'));
                } else if (evt.type == "mouseout") {
                    if ($this.hasClass('active')) {
                        $this.find('h2').css('color', $thisParent.attr('data-activetitle'))
                        $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'))
                        $this.css('background-color', $thisParent.attr('data-activecolor'));

                    } else {
                        $this.find('h2').css('color', $thisParent.attr('data-titlecolor'))
                        $this.find('.accordian-icon  i').css('color', $thisParent.attr('data-iconcolor'))
                        $this.css('background-color', $thisParent.attr('data-titlebgcolor'));
                    }
                }
            });

        },
        "onsort": function (ui) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('accordion/accordionbasicsetting'),
                    "onload": function ($item) {
                        var attr = $('#hdnAccordianSettingAttr').data('attribute');
                        if (attr != '') {
                            $('#popupModel').attrs(attr);
                            $('#hdnAccordianSettingAttr').data('attribute', '');
                        }
                        var AccordianBasic = {
                            IconClassReg: /fa-\w+(\-*\w*)*/g,
                            SettingButton: $item,
                            Position: 0,
                            Container: $item.parents('.accordian').eq(0),
                            init: function () {
                                $ItemList = AccordianBasic.Container.find('.accordianWrap').eq(0).find('>.acordianItem');
                                var html = '';
                                var AcorLen = $ItemList.length;
                                $ItemList.each(function () {
                                    var $this = $(this);
                                    var Title = $this.find('.accordian-head h2').text();
                                    var $Icon = $this.find('.accordian-icon').not('.accordian-icon.static').find('.dis-table i').attr('class').match(AccordianBasic.IconClassReg);
                                    html += '<div class="item field-row clearfix">';
                                    html += '<div class="multi-col-form-group ">';
                                    html += '<span class="value">';
                                    html += '<i class="iconChooser in-form-icon fa ' + $Icon + '" title="Click to change icon"></i>'
                                    html += '<input type="text" class="title accordianInput" placeholder="Title" value="' + Title + '" >';
                                    if (AcorLen > 1)
                                        html += '<i title="Delete" class="deleteAccordian fa fa-trash in-form-icon delete-icon"></i>';
                                    html += '</span></div></div>';
                                });
                                $('.accordianEditList').html(html);
                                AccordianBasic.UIEvents();
                            },
                            UIEvents: function () {
                                var firstItem = AccordianBasic.Container.find('.accordian-icon').first();
                                if (firstItem.css('display') != 'none')
                                    $('#chkIsActiveAccordianIcon').prop('checked', true);
                                $('#chkIsActiveAccordianIcon').off().on('click', function () {
                                    var IconWrap = AccordianBasic.Container.find('.accordian-icon').not('.accordian-icon.static')
                                    if ($(this).is(':checked')) {
                                        IconWrap.show();
                                    } else {
                                        IconWrap.hide();
                                    }
                                });
                                $('.addMoreAccordian').off().on('click', function () {
                                    var LastItem = AccordianBasic.Container.find('.acordianItem').last();
                                    var NewDom = document.createElement("div");
                                    $(NewDom).attrs(LastItem.attrs());
                                    $(NewDom).html(LastItem.html());
                                    $(NewDom).find('.acordianContent').css('display', 'none');
                                    AccordianBasic.Container.find('.accordianWrap').eq(0).append(NewDom);
                                    $('#hdnAccordianSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SettingEvents();
                                    component["accordion"].afterdrop();
                                    AccordianBasic.SettingButton.trigger('click');
                                });

                                $('.deleteAccordian').off().on('click', function () {
                                    $this = $(this);
                                    SageConfirmDialog('Are you sure?').done(function () {
                                        var pos = $('.accordianEditList .item').index($this.parents('.item'))
                                        AccordianBasic.Container.find('.accordianWrap').eq(0).find('>.acordianItem').eq(pos).remove();
                                        AccordianBasic.init();
                                    });
                                });
                                $('.accordianInput').off().on('keyup', function () {
                                    $this = $(this);
                                    $Val = $this.val();
                                    $pos = $('.accordianEditList .item').index($this.parents('.item'))
                                    var ActiveItem = AccordianBasic.Container.find('.accordianWrap').eq(0).find('>.acordianItem').eq($pos);
                                    ActiveItem.find('.accordian-head h2').text($Val);
                                });
                                $('#AccorfontIconCollection').html($('ul#fontIconCollection').html());

                                $('.accordianEditList .iconChooser').off('click').on('click', function () {
                                    $this = $(this);
                                    $this.parent().parent().parent().after($('.tabcontent .accorIconList'));
                                    AccordianBasic.Position = $('.accordianEditList .item').index($this.parents('.item'));
                                    $('.accorIconList').removeClass('hide-element');
                                    $('#AccorfontIconCollection').find('li').removeClass('selected');
                                    var CurrentClass = $this.attr('class').match(AccordianBasic.IconClassReg)[0];
                                    $('#AccorfontIconCollection').find('li i[data-class="' + CurrentClass + '"]').parent().addClass('selected');

                                });
                                $('.accorIconList .closeIconChooser').off().on('click', function () {
                                    $('.accorIconList').addClass('hide-element');
                                });
                                $('#AccorSearchIcon').on('keyup', function () {
                                    var searchVal = $(this).val();
                                    $('#AccorfontIconCollection').find('li').each(function () {
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
                                $('#AccorfontIconCollection').find('li').on('click', function () {

                                    var chooseClass = $(this).find('i').attr('data-class');
                                    $('#AccorfontIconCollection').find('li').removeClass('selected');
                                    $('#AccorfontIconCollection').find('li i[data-class="' + chooseClass + '"]').parent().addClass('selected');
                                    $FormIcon = $('.accordianEditList .item').eq(AccordianBasic.Position).find('i')
                                    var PrevClass = $FormIcon.attr('class').match(AccordianBasic.IconClassReg)[0];
                                    $FormIcon.removeClass(PrevClass);
                                    $FormIcon.addClass(chooseClass);
                                    $ViewIcon = AccordianBasic.Container.find('.accordianWrap').eq(0).find('>.acordianItem').eq(AccordianBasic.Position).find('.accordian-icon').not('.accordian-icon.static').find('i');
                                    $ViewIcon.removeClass(PrevClass);
                                    $ViewIcon.addClass(chooseClass);
                                    $(".accorIconList .closeIconChooser").trigger("click");
                                });
                            },
                        }
                        AccordianBasic.init();
                    }
                },

                "Colors": {
                    "DOM": EasyLibrary.ReadDOM('accordion/accordioncolorsetting'),
                    "onload": function ($item) {
                        var AccordianColor = {
                            Container: $item.parents('.accordian').eq(0).find('.accordianWrap').eq(0),
                            init: function () {
                                $('.accordianColorPicker.accrTitle').css('background-color', AccordianColor.Container.attr('data-titlecolor'));
                                $('.accordianColorPicker.accrIcon').css('background-color', AccordianColor.Container.attr('data-iconcolor'));
                                $('.accordianColorPicker.accrTitleBg').css('background-color', AccordianColor.Container.attr('data-titlebgcolor'));

                                $('.accordianColorPicker.accrActiveColor').css('background-color', AccordianColor.Container.attr('data-activecolor'))
                                $('.accordianColorPicker.accrHoverColor').css('background-color', AccordianColor.Container.attr('data-hovercolor'));
                                $('.accordianColorPicker.accrActiveIcon').css('background-color', AccordianColor.Container.attr('data-activeicon'));
                                $('.accordianColorPicker.accrActiveTitleText').css('background-color', AccordianColor.Container.attr('data-activetitle'));

                                AccordianColor.UIEvents();
                            },
                            UIEvents: function () {
                                var AccorItems = AccordianColor.Container.find('>.acordianItem');

                                var coloraccordinOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        if ($elm.hasClass('accrTitle')) {
                                            AccordianColor.Container.attr('data-titlecolor', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle h2').css('color', objColor.bgColor);
                                        } else if ($elm.hasClass('accrIcon')) {
                                            AccordianColor.Container.attr('data-iconcolor', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle .accordian-icon .dis-table i').css('color', objColor.bgColor);
                                        } else if ($elm.hasClass('accrTitleBg')) {
                                            AccordianColor.Container.attr('data-titlebgcolor', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle').not('.accordianTitle.active').css('background-color', objColor.bgColor);
                                        } else if ($elm.hasClass('accrActiveColor')) {
                                            AccordianColor.Container.attr('data-activecolor', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle.active').css('background-color', objColor.bgColor);
                                        } else if ($elm.hasClass('accrActiveTitleText')) {
                                            AccordianColor.Container.attr('data-activetitle', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle.active h2').css('color', objColor.bgColor);
                                        } else if ($elm.hasClass('accrActiveIcon')) {
                                            AccordianColor.Container.attr('data-activeicon', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle.active .dis-table i').css('color', objColor.bgColor);
                                        } else if ($elm.hasClass('accrHoverColor')) {
                                            AccordianColor.Container.attr('data-hovercolor', objColor.bgColor);
                                        }
                                    }
                                });
                                $('.accordianColorPicker').colorPicker(coloraccordinOption);
                            },
                        }
                        AccordianColor.init();
                    }
                },
                "Sizes": {
                    "DOM": EasyLibrary.ReadDOM('accordion/accordionsizessetting'),
                    "onload": function ($item) {
                        var AccordianTitleSize = {
                            Container: $item.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem'),
                            init: function () {
                                AccordianTitleSize.UIEvents();
                            },
                            UIEvents: function () {
                                var AccordianTitle = AccordianTitleSize.Container.find('>.accordianTitle h2');
                                var CurrentSize = AccordianTitle.first().css('font-size').replace('px', '');

                                function TitleFontSize(space) {
                                    AccordianTitle.css('font-size', space + 'px')
                                }
                                AdvanceSageSlider($('#accorTitleSlider'), $('#accorTitleSliderHandle'), 10, 40, CurrentSize, TitleFontSize, '', 'px');

                                var CurrentIconSize = AccordianTitleSize.Container.find('>.accordianTitle .accordian-icon .dis-table i').first().css('font-size').replace('px', '');

                                function IconFontSize(space) {
                                    AccordianTitleSize.Container.find('>.accordianTitle .accordian-icon .dis-table i').css('font-size', space + 'px')
                                }
                                AdvanceSageSlider($('#accorTitleIconSlider'), $('#accorTitleIconSliderHandle'), 10, 40, CurrentIconSize, IconFontSize, '', 'px');

                                var IconHolder = AccordianTitleSize.Container.find('>.accordianTitle .accordian-icon');

                                function IconHolderWidth(space) {
                                    IconHolder.css('width', space + 'px');
                                    IconHolder.css('height', space + 'px');
                                }
                                var CurrentWidth = IconHolder.first().css('width').replace('px', '');
                                AdvanceSageSlider($('#accorIconHolderSlider'), $('#accorIconHolderSliderHandle'), 0, 100, CurrentWidth, IconHolderWidth, '', 'px');




                                function LineHeightOption(space) {
                                    space = space * 10

                                    var lineHeight = AccordianTitle.first().attr('class').match(/line\-height\-\d+/g);
                                    if (lineHeight != null) {
                                        var len = lineHeight.length;
                                        for (var i = 0; i < len; i++)
                                            AccordianTitle.removeClass(lineHeight[i])
                                        AccordianTitle.addClass('line-height-' + space);
                                    } else {
                                        AccordianTitle.addClass('line-height-' + space);
                                    }
                                }

                                var lineHeight = AccordianTitle.first().attr('class').match(/line\-height\-\d+/g);
                                if (lineHeight != null) {
                                    lineHeight = parseInt(lineHeight[0].replace('line-height-', ''));
                                    lineHeight = lineHeight / 10;
                                } else
                                    lineHeight = 1
                                AdvanceSageSlider($('#accorLineHeightSlider'), $('#accorLineHeightSliderHandle'), 1, 25, lineHeight, LineHeightOption, '', '%');
                            }
                        }
                        AccordianTitleSize.init();
                    }
                },
                "Fonts": {
                    "DOM": EasyLibrary.ReadDOM('accordion/accordionfontssetting'),
                    "onload": function ($this) {
                        var AccordianFont = {
                            Container: $this.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem'),
                            init: function () {

                                $('#Accorfontfamily').html(DOMFontAdvanceCollection());

                                AccordianFont.UIEvents();
                            },
                            UIEvents: function () {
                                var $textChange = AccordianFont.Container.find('>.accordianTitle .accordian-head h2');
                                var classList = $textChange.attr('class');
                                if (typeof (classList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $('#Accorfontfamily').val(fontClass[0].replace('ff-', ''));
                                        AccordianFont.FontWeight($('#Accorfontfamily').val());
                                    }
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $('#AccorfontWeight').val(familyClass[0].replace('f-weight-', ''));
                                    }
                                }
                                $('#Accorfontfamily').on('change', function () {
                                    var classList = $textChange.attr('class');
                                    if (typeof (classList) !== "undefined") {
                                        var fontClass = classList.match(/ff-(\w+)/g);
                                        if (fontClass !== null) {
                                            $textChange.removeClass(fontClass[0]);
                                        }

                                    }
                                    $textChange.addClass('ff-' + $(this).val());
                                    AccordianFont.FontWeight($(this).val());
                                    $('#AccorfontWeight').trigger('change');
                                });
                                $('#AccorfontWeight').on('change', function () {
                                    var classList = $textChange.attr('class');
                                    if (typeof (classList) !== "undefined") {
                                        var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                        if (familyClass !== null) {
                                            $textChange.removeClass(familyClass[0]);
                                        }
                                    }
                                    $textChange.addClass('f-weight-' + $(this).val());
                                });
                                var letterSpace = 0;
                                var removeClass = '';
                                if (typeof ($textChange.attr('class')) !== 'undefined') {
                                    var letterSpacingNegClass = $textChange.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                                    if (letterSpacingNegClass !== null) {
                                        removeClass = letterSpacingNegClass[0].trim();
                                        letterSpace = parseInt(removeClass.replace('editor-text-letterSpacing-neg-', ''));
                                    } else {
                                        var letterSpacingPosClass = $textChange.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                                        if (letterSpacingPosClass !== null) {
                                            removeClass = letterSpacingPosClass[0].trim();
                                            letterSpace = parseInt(removeClass.replace('editor-text-letterSpacing-', ''));
                                        }
                                    }
                                }
                                var trasformValue = '';
                                if ($textChange.hasClass('editor-text-transform-uppercase')) {
                                    trasformValue = 'editor-text-transform-uppercase';
                                } else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                                    trasformValue = 'editor-text-transform-lowercase';
                                }
                                $('#AccorTextTransform').val(trasformValue);
                                $('#AccorTextTransform').on('change', function () {
                                    var tranformCase = $(this).val();
                                    switch (tranformCase) {
                                        case 'editor-text-transform-uppercase':
                                            $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                            break;
                                        case 'editor-text-transform-lowercase':
                                            $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                            break;
                                        case '':
                                            $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                            break;
                                    }
                                });

                                function letterSpacingOption(space) {
                                    var addClass = '';
                                    var removeClass = '';
                                    if (typeof ($textChange.attr('class')) !== 'undefined') {
                                        var negClass = $textChange.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                                        if (negClass !== null) {
                                            removeClass = negClass[0].trim();
                                        } else {
                                            var posClass = $textChange.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                                            if (posClass !== null) {
                                                removeClass = posClass[0].trim();
                                            }
                                        }
                                    }
                                    if (space >= 0) {
                                        addClass = 'editor-text-letterSpacing-' + space;
                                    } else {
                                        space = Math.abs(space);
                                        addClass = 'editor-text-letterSpacing-neg-' + space;
                                    }
                                    $textChange.removeClass(removeClass).addClass(addClass);
                                }

                                AdvanceSageSlider($('#AccorletterSpacingSlider'), $('#AccorletterSpacingHandle'), -10, 10, letterSpace, letterSpacingOption, '', '%');




                            },
                            FontWeight: function (fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#AccorfontWeight').html(fontDOM);
                                }
                            }
                        }
                        AccordianFont.init();

                    }

                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem >.accordianTitle');
                        return $parent;
                    },
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 10,
                            "min": -10,
                            "times": 5,
                            "position": ["top", "bottom"]
                        },
                        "padding": {
                            "max": 20,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },

                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem >.accordianTitle');
                        return $parent;
                    },

                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem >.accordianTitle');
                        return $parent;
                    },
                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem >.accordianTitle');
                        return $parent;
                    },
                },
                "Box Shadow": {
                    "options": {},
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem >.accordianTitle');
                        return $parent;
                    },
                }


            },

        },
        "selectLayer": function ($elem) {
            var $parent = $elem.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem');
            return $parent;
        },
        "remove": function ($cloneViewDom) { },
        "view": {
            "view": function () {
                this.library.initAcordian();
            },
            "library": {
                "initAcordian": function () {
                    var AccorSpeed = 500;
                    $('.accordianTitle').off('click').on('click', function () {
                        var $this = $(this);

                        var $thisParent = $this.parents('.accordianWrap').eq(0);
                        var AccorItems = $thisParent.find('>.acordianItem');
                        AccorItems.find('>.accordianTitle.active').css('background-color', $thisParent.attr('data-titlebgcolor'));
                        AccorItems.find('>.accordianTitle.active h2').css('color', $thisParent.attr('data-titlecolor'));
                        AccorItems.find('>.accordianTitle.active .accordian-icon .dis-table i').css('color', $thisParent.attr('data-iconcolor'));
                        AccorItems.find('>.accordianTitle.active').next('.acordianContent').slideUp(AccorSpeed);
                        AccorItems.find('>.accordianTitle .accordian-icon.static .dis-table i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                        AccorItems.find('>.accordianTitle').removeClass('active');
                        var activeAcor = $this.next('.acordianContent')
                        if (activeAcor.is(":hidden")) {
                            $this.addClass('active');
                            $this.find('.accordian-icon.static .dis-table i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                            $this.css('background-color', $thisParent.attr('data-activecolor'));
                            $this.find('h2').css('color', $thisParent.attr('data-activetitle'))
                            $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'))
                            activeAcor.slideDown(AccorSpeed);
                        } else {
                            $this.removeClass('active');
                            activeAcor.slideUp(AccorSpeed);
                        }
                    });
                    $('.accordianTitle').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                        var $this = $(this);
                        var $thisParent = $this.parents('.accordianWrap').eq(0);
                        if (evt.type == 'mouseover') {
                            $this.find('h2').css('color', $thisParent.attr('data-activetitle'))
                            $this.find('.accordian-icon i').css('color', $thisParent.attr('data-activeicon'))
                            $this.css('background-color', $thisParent.attr('data-hovercolor'));
                        } else if (evt.type == "mouseout") {
                            if ($this.hasClass('active')) {
                                $this.find('h2').css('color', $thisParent.attr('data-activetitle'))
                                $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'))
                                $this.css('background-color', $thisParent.attr('data-activecolor'));

                            } else {
                                $this.find('h2').css('color', $thisParent.attr('data-titlecolor'))
                                $this.find('.accordian-icon  i').css('color', $thisParent.attr('data-iconcolor'))
                                $this.css('background-color', $thisParent.attr('data-titlebgcolor'));
                            }
                        }
                    });
                }
            }
        },
    }
,    "advancedTest": {
        "componentname": "advancedTest",
        "category": "advance",
        "icon": "fa fa-optin-monster",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("advancedTest/advancedTest"),
        "beforeDrop": function ($this) { },
        "loadSetting": function ($item) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            $appendedParent.find('.cardImage').children('img').css({ "width": "100%", "height": "100%" })
            SettingEvents();
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("advancedTest/advancedTestbasicsettings"),
                    "onload": function ($item) {
                        var cardContainer = $item.parent().parent();

                        var currentLayout = cardContainer.attr('data-layout');

                        LoadSettings();
                        InitEvents();

                        function LoadSettings() {

                            var isHeadingHidden = cardContainer.find('.cardHead').hasClass('hide-element');
                            if (!isHeadingHidden)
                                $('#showCardHeading').prop('checked', true);

                            var isDetailVisible = cardContainer.find('.cardDescription').hasClass('hide-element');
                            if (!isDetailVisible)
                                $('#showCardDesc').prop('checked', true);


                            if (currentLayout) $('#slcCardImageDetail').val(currentLayout);
                            else $('#slcCardImageDetail').val(0);

                        }

                        function InitEvents() {

                            $('#slcCardImageDetail').off().on('change', function () {
                                var $this = $(this);
                                var selectedLayout = $this.find("option:selected").val();

                                var cardImage = cardContainer.find('.cardImage');
                                var cardDetail = cardContainer.find('.cardDetail');


                                cardContainer.attr({ 'data-layout': selectedLayout });

                                var sfImageWidthClass = cardImage.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                var imgTextAlight = cardImage.attr('class').match(/(text-align-)\w{1,5}/g);

                                if (imgTextAlight)
                                    cardImage.removeClass(imgTextAlight[0]);

                                var sfcardDetailWidthClass = cardDetail.attr('class').match(/sfCol_[0-9]{1,3}/g);

                                switch (selectedLayout) {

                                    case 'card-imgtb':
                                    case 'card-imgbt':
                                        cardImage.removeClass(sfImageWidthClass[0]).addClass('sfCol_100');
                                        cardDetail.removeClass(sfcardDetailWidthClass[0]).addClass('sfCol_100');
                                        break;

                                    case 'card-imglr':
                                    case 'card-imgrl':
                                        cardImage.removeClass(sfImageWidthClass[0]).addClass('sfCol_50');
                                        cardDetail.removeClass(sfcardDetailWidthClass[0]).addClass('sfCol_50');
                                        break;

                                }

                                ReInitializeDOMPosition(selectedLayout);


                            });



                            $('#showCardHeading').off().on('click', function () {
                                var isChecked = $(this).is(':checked');

                                if (!isChecked) {
                                    cardContainer.find('.cardHead').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    cardContainer.find('.cardHead').each(function () {
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#showCardDesc').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    cardContainer.find('.cardDescription').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    cardContainer.find('.cardDescription').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                        }

                        function ReInitializeDOMPosition(cardLayout) {

                            var cardContainer = $item.parent().parent();
                            var imgContainer = cardContainer.find('.cardImage');
                            var detailContainer = cardContainer.find('.cardDetail');

                            switch (cardLayout) {

                                case 'card-imgtb':
                                    imgContainer.addClass('text-align-left');
                                    imgContainer.insertBefore(detailContainer);
                                    AddRemoveDisplayFlex(cardContainer, false);
                                    break;

                                case 'card-imgbt':
                                    imgContainer.addClass('text-align-right');
                                    detailContainer.insertBefore(imgContainer);
                                    AddRemoveDisplayFlex(cardContainer, false);

                                    break;

                                case 'card-imglr':
                                    imgContainer.addClass('text-align-left');
                                    imgContainer.insertBefore(detailContainer);
                                    AddRemoveDisplayFlex(cardContainer, true);
                                    break;

                                case 'card-imgrl':
                                    imgContainer.addClass('text-align-right');
                                    detailContainer.insertBefore(imgContainer);
                                    AddRemoveDisplayFlex(cardContainer, true);
                                    break;
                            }
                        }

                        function AddRemoveDisplayFlex(cardContainer, addFlex) {

                            //var cardContainer = $item.parent().parent();
                            var flexBase = cardContainer.find('.flexBase');
                            var displayFlex = flexBase.attr('class').match(/display-flex/g);


                            if (addFlex) {
                                flexBase.addClass('display-flex')
                            } else {
                                flexBase.removeClass('display-flex')
                            }

                        }

                    }
                },
                "Background":
                {
                    "options": ["color"]
                },
                "Alignment":
                {
                    "options": ["left", "center", "right"]
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
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all"],
                    }
                },
                "Box Radius":
                {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": ["all", "color", "zoom", "Inherit"]
                },
       

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "remove": function ($cloneDOM) {


        },
        "view":
        {
            "view": function () {

            },
            "oncomplete": function () {
                $('.editor-component.cardContainer').find('.cardImage').not('carded').each(function () {
                    $(this).addClass('carded');
                    $(this).children('img').css({ "width": "100%", "height": "100%" });
                    $(this).css({ "width": "", "height": "" });
                });
            },
            "library": {

            }
        }
    }
,    "bar chart": {
        "componentname": "bar chart",
        "category": "advance",
        "icon": "fa fa-bar-chart",
        "row": false,
        "hidden": false,
        "collection": true,
        "type":"graph",
        "defaultdata": EasyLibrary.ReadDOM('barchart/barchartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
            console.log(new Date());
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('barchart/barchartbasicsettings'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.barTitle').css('color');
                        var barAxesColor = $parent.find('.barChartWrapper').attr('data-axescolor');
                        var barFontColor = $parent.find('.barChartWrapper').attr('data-barfontcolor');
                        var barTitle = $parent.find('.barTitle').text();
                        var chartScale = $parent.find('.barChartWrapper').attr('data-scale');


                        $('#ddlBarChartScaling').val(chartScale);
                        $("#txtBarChartTitle").val(barTitle);


                        $('#chooseBartitleColor').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barTitle').css('color', objColor.bgColor);
                            }
                        });
                        $('#chooseBartitleColor').colorPicker(colorPickerOption);


                        $("#txtBarChartTitle").off().on("blur", function () {
                            var value = $(this).val().trim();

                            var $elm = $parent.find('.barTitle');
                            $elm.text(value);
                            //$(this).attr('value', value);
                        });

                        $('#chooseBarAxesColor').css('background-color', barAxesColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barChartWrapper').attr('data-axescolor', objColor.bgColor);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseBarAxesColor').colorPicker(colorPickerOption);

                        $('#chooseBarFontColor').css('background-color', barFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barChartWrapper').attr('data-barfontcolor', objColor.bgColor);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseBarFontColor').colorPicker(colorPickerOption);

                        var fontWidth = $parent.find('.barChartWrapper').attr('data-barfontsize').replace('px', '');

                        function ListIconSizeSlider(space) {
                            $parent.find('.barChartWrapper').attr('data-barfontsize', space);
                            component['bar chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#barfontsizeSlider'), $('#barfontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');


                        var barTitlefontWidth = $parent.find('.barTitle').css('font-size').replace('px', '');

                        function BarTitleSizeSlider(space) {
                            $parent.find('.barTitle').css('font-size', space);
                        }
                        AdvanceSageSlider($('#bartitlesizeSlider'), $('#bartitlesizeHandle'), 10, 40, barTitlefontWidth, BarTitleSizeSlider, $parent, 'px');


                        $('#ddlBarChartScaling').on('change', function () {
                            var val = $(this).val();
                            $parent.find('.barChartWrapper').attr('data-scale', val);
                            component['bar chart'].afterdrop($parent.parent(), $parent);

                        });


                    }
                },
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM('barchart/barchartdatawrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleIndex = -1;

                        var $barChartWrapper = $parent.find('.barChartWrapper');
                        var barData = $barChartWrapper.attr('data-value');

                        var barDataArray = JSON.parse(barData);

                        LoadData();
                        InitBarEvents();
                        InitAddMoreBarEvent();

                        function LoadData() {
                            var html = '';
                            $("#barChartEditWrapper").html('');

                            //for changing all font



                            $.each(barDataArray, function (index, item) {
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: ' + item.color + '"></span>';
                                html += '<input type="text" maxlength="15" class="indBarName" value="' + item.name + '"/>';
                                html += '<input type="text" class="sml-box indBarValue" value="' + item.value + '"/>';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteBar"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#barChartEditWrapper").html(html);

                            //$('.chooseBarFontColor').css('background-color', backgroundColor);
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#barChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    barDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.chooseBarFontColor').colorPicker(colorPickerOption);

                        }


                        function InitBarEvents() {

                            $("#barChartEditWrapper .indBarName").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                barDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#barChartEditWrapper .indBarValue").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    barDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', barDataArray[dataIndex].value);
                                    $(this).val(barDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', barDataArray[dataIndex].value);
                                    $(this).val(barDataArray[dataIndex].value);
                                } else {
                                    barDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#barChartEditWrapper").off().on('click', '.deleteBar', function () {
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                barDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            });

                        }

                        function InitAddMoreBarEvent() {
                            $("#btnAddMoreBarData").off().on("click", function () {
                                var html = '';
                                var $editParent = $(this).parent().find('#barChartEditWrapper');



                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = barDataArray[0];
                                    var itemCount = barDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="multi-col-form-group">';
                                    $editHtml += '<span class="value">';
                                    $editHtml += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: ' + duplicateData.color + '"></span>';
                                    $editHtml += '<input maxlength="15" class="indBarName valid" value="' + duplicateData.name + '" aria-invalid="false" type="text">';
                                    $editHtml += '<input class="sml-box indBarValue" value="' + duplicateData.value + '" type="text">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteBar"></i>';
                                    $editHtml += '</span>';
                                    $editHtml += '</div>';
                                    $editHtml += '</div>';
                                    $editParent.append($editHtml);


                                    var newData = {
                                        "id": itemCount + 1,
                                        "name": duplicateData.name,
                                        "value": duplicateData.value,
                                        "color": duplicateData.color
                                    };

                                    barDataArray.push(newData);
                                } else {
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: #A55CA5;"></span>';
                                    html += '<input maxlength="15" class="indBarName valid" value="data 1"  aria-invalid="false" type="text">';
                                    html += '<input class="sml-box indBarValue" value="10" type="text">';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteBar" ></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.append(html);

                                    var defaultData = {
                                        "id": 1,
                                        "name": "data 1",
                                        "value": 10,
                                        "color": "#A55CA5"
                                    };
                                    barDataArray.push(defaultData);
                                }

                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                component['bar chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#barChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        barDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(barDataArray);
                                        $barChartWrapper.attr('data-value', jsonData);
                                        component['bar chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.chooseBarFontColor').colorPicker(colorPickerOption);


                                InitBarEvents();
                            });
                        }

                    }
                }
            }
        },
        "onsort": function (ui) {
            this.view.view();
        },
        "view": {
            "view": function () {
                var myCanvasList = document.querySelectorAll(".barCanvas");
                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;

                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = 350 / parentWidth * parentWidth;
                        myCanvas.width = parentWidth * 0.75;

                        var barAxesColor = item.parentNode.getAttribute('data-axescolor');
                        var barFontColor = item.parentNode.getAttribute('data-barfontcolor');
                        var barFontSize = item.parentNode.getAttribute('data-barfontsize');
                        //console.log(barFontSize);
                        var barChartData = item.parentNode.getAttribute('data-value');
                        var barData = JSON.parse(barChartData);
                        var barScaleFactor = item.parentNode.getAttribute('data-scale');
                        //alert(JSON.stringify(barData));


                        var ctx = myCanvas.getContext("2d");

                        _this.library.BarChart({
                            canvas: myCanvas,
                            seriesName: "Bar Chart",
                            padding: 20,
                            gridScale: barScaleFactor,
                            barAxesColor: barAxesColor,
                            barFontColor: barFontColor,
                            data: barData,
                            barFontSize: barFontSize
                        });
                    });
                }
            },
            "library": {
                "DrawLine": function (ctx, startX, startY, endX, endY, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                    ctx.restore();
                },

                "DrawBar": function (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
                    ctx.save();
                    ctx.fillStyle = color;
                    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
                    ctx.restore();
                },

                "BarChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    //this.colors = options.colors;
                    var _this = this;
                    this.draw = function () {
                        //console.log(this.options);
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            //console.log(categ);
                            maxValue = Math.max(maxValue, categ.value);
                            maxWidth = Math.max(maxWidth, _this.ctx.measureText(categ.name).width);
                        });

                        //console.log(maxValue);

                        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
                        var canvasActualWidth = this.canvas.width - this.options.padding * 2;

                        //drawing the grid lines
                        var gridValue = 0;
                        var entered = 0;
                        while (gridValue <= maxValue) {
                            entered++;
                            var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;

                            //x-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                gridY,
                                this.canvas.width,
                                gridY,
                                this.options.barAxesColor
                            );

                            //y-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                0,
                                0,
                                gridY,
                                this.options.barAxesColor
                            );

                            //writing grid markers
                            this.ctx.save();

                            gridValue += parseInt(this.options.gridScale);
                            //alert(gridValue + this.options.gridScale);
                        }

                        //drawing the bars
                        var barIndex = 0;
                        var numberOfBars = this.options.data.length;
                        var barSize = (canvasActualWidth) / numberOfBars;

                        var textWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            var val = categ.value;
                            var barHeight = Math.round(canvasActualHeight * val / maxValue);



                            _this.DrawBar(
                                _this.ctx,
                                _this.options.padding + barIndex * barSize,
                                _this.canvas.height - barHeight - _this.options.padding,
                                30,
                                barHeight,
                                categ.color
                            );
                            textWidth = _this.ctx.measureText(categ.name).width;
                            var valueWidth = _this.ctx.measureText(categ.value).width;
                            _this.ctx.fillStyle = _this.options.barFontColor;
                            var fontSize = _this.options.barFontSize;
                            //console.log(fontSize);
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(categ.name, (_this.options.padding + barIndex * barSize + 15) - textWidth / 2, _this.canvas.height);
                            _this.ctx.fillText(val, _this.options.padding + barIndex * barSize + 15 - valueWidth / 2, _this.canvas.height - barHeight - 30);

                            barIndex++;
                        });

                    }

                    this.draw();
                }
            }
        }
    }
,    "body": {
        "componentname": "body",
        "category": "layout",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "defaultdata": '',
        "type": "hidden",
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Background": {
                    "options": ["image", "color"]
                },
                "Spacing": {
                    "options": {
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                $(".editor-box").removeClass("activeSetting");
                var $parent = $(".editor-box");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
,    "button": {
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
,    "card": {
        "componentname": "card",
        "category": "advance",
        "icon": "fa fa-newspaper-o",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("card/card"),
        "onDrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            $appendedParent.find('.cardImage').children('img').css({ "width": "100%", "height": "100%" });
            SettingEvents();
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("card/cardbasicsettings"),
                    "onload": function ($item) {
                        var cardContainer = $item.parent().parent();

                        var currentLayout = cardContainer.attr('data-layout');

                        LoadSettings();
                        InitEvents();

                        function LoadSettings() {

                            var isHeadingHidden = cardContainer.find('.cardHead').hasClass('hide-element');
                            if (!isHeadingHidden)
                                $('#showCardHeading').prop('checked', true);

                            var isDetailVisible = cardContainer.find('.cardDescription').hasClass('hide-element');
                            if (!isDetailVisible)
                                $('#showCardDesc').prop('checked', true);


                            if (currentLayout) $('#slcCardImageDetail').val(currentLayout);
                            else $('#slcCardImageDetail').val(0);

                        }

                        function InitEvents() {

                            $('#slcCardImageDetail').off().on('change', function () {
                                var $this = $(this);
                                var selectedLayout = $this.find("option:selected").val();

                                var cardImage = cardContainer.find('.cardImage');
                                var cardDetail = cardContainer.find('.cardDetail');


                                cardContainer.attr({ 'data-layout': selectedLayout });

                                var sfImageWidthClass = cardImage.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                var imgTextAlight = cardImage.attr('class').match(/(text-align-)\w{1,5}/g);

                                if (imgTextAlight)
                                    cardImage.removeClass(imgTextAlight[0]);

                                var sfcardDetailWidthClass = cardDetail.attr('class').match(/sfCol_[0-9]{1,3}/g);

                                switch (selectedLayout) {

                                    case 'card-imgtb':
                                    case 'card-imgbt':
                                        cardImage.removeClass(sfImageWidthClass[0]).addClass('sfCol_100');
                                        cardDetail.removeClass(sfcardDetailWidthClass[0]).addClass('sfCol_100');
                                        break;

                                    case 'card-imglr':
                                    case 'card-imgrl':
                                        cardImage.removeClass(sfImageWidthClass[0]).addClass('sfCol_50');
                                        cardDetail.removeClass(sfcardDetailWidthClass[0]).addClass('sfCol_50');
                                        break;

                                }

                                ReInitializeDOMPosition(selectedLayout);


                            });



                            $('#showCardHeading').off().on('click', function () {
                                var isChecked = $(this).is(':checked');

                                if (!isChecked) {
                                    cardContainer.find('.cardHead').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    cardContainer.find('.cardHead').each(function () {
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#showCardDesc').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    cardContainer.find('.cardDescription').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    cardContainer.find('.cardDescription').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                        }

                        function ReInitializeDOMPosition(cardLayout) {

                            var cardContainer = $item.parent().parent();
                            var imgContainer = cardContainer.find('.cardImage');
                            var detailContainer = cardContainer.find('.cardDetail');

                            switch (cardLayout) {

                                case 'card-imgtb':
                                    imgContainer.addClass('text-align-left');
                                    imgContainer.insertBefore(detailContainer);
                                    AddRemoveDisplayFlex(cardContainer, false);
                                    break;

                                case 'card-imgbt':
                                    imgContainer.addClass('text-align-right');
                                    detailContainer.insertBefore(imgContainer);
                                    AddRemoveDisplayFlex(cardContainer, false);

                                    break;

                                case 'card-imglr':
                                    imgContainer.addClass('text-align-left');
                                    imgContainer.insertBefore(detailContainer);
                                    AddRemoveDisplayFlex(cardContainer, true);
                                    break;

                                case 'card-imgrl':
                                    imgContainer.addClass('text-align-right');
                                    detailContainer.insertBefore(imgContainer);
                                    AddRemoveDisplayFlex(cardContainer, true);
                                    break;
                            }
                        }

                        function AddRemoveDisplayFlex(cardContainer, addFlex) {

                            //var cardContainer = $item.parent().parent();
                            var flexBase = cardContainer.find('.flexBase');
                            var displayFlex = flexBase.attr('class').match(/display-flex/g);


                            if (addFlex) {
                                flexBase.addClass('display-flex')
                            } else {
                                flexBase.removeClass('display-flex')
                            }

                        }

                    }
                },
                "Background":
                {
                    "options": ["color"]
                },
                "Alignment":
                {
                    "options": ["left", "center", "right"]
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
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all"],
                    }
                },
                "Box Radius":
                {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": ["all", "color", "zoom", "Inherit"]
                },
                //"Hover Effect": {
                //    "options": {
                //        "color": ["background", "text"],
                //        "shadow": "on",
                //        "border": {
                //            "max": 20,
                //            "min": 0,
                //            "times": 1,
                //            "position": ["all", "top", "right", "bottom", "left"],
                //            "selectLayer": function ($elem) {
                //                //return $parent;
                //            },
                //        },
                //        "zoom": "on"
                //    },
                //},

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "remove": function ($cloneDOM) {


            //$cloneDOM.find('.cardImage').children('img').css({ "width": "", "height": "" });
            //var cardDetail = $cloneDOM.find('.cardDetail');
            //alert(cardDetail.height());
            //$cloneDOM.find('.cardDetail').css("height", "auto");
        },
        "view":
        {
            "view": function () {

            },
            "oncomplete": function () {
                $('.editor-component.cardContainer').find('.cardImage').not('carded').each(function () {
                    $(this).addClass('carded');
                    $(this).children('img').css({ "width": "100%", "height": "100%" });
                    $(this).css({ "width": "", "height": "" });
                });
            },
            "library": {

            }
        }
    }
,    "carousel": {
        "componentname": "carousel",
        "category": "advance",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "carousel",
        "defaultdata": EasyLibrary.ReadDOM("carouseldata"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($appendLayer.hasClass('site-body')) {
                var $imageSlider = $('.ImageSliderWrapper');
                $imageSlider.removeClass('binded');
                $imageSlider.each(function (index, value) {
                    var carousel = new CarouselInit($(this));
                });
            } else {
                $appendLayer.removeClass('binded');
                var carousel = new CarouselInit($appendLayer);
            }
        },
        "onsort": function (ui) {
            var $imageSlider = ui.find('.ImageSliderWrapper');
            $imageSlider.removeClass('binded');
            var carousel = new CarouselInit($imageSlider);
        },
        "loadSetting": function ($item) { },
        "common": {
            "InitHeading": function ($item, $parent) {
                $('#showHeadingCarousel').off().on('click', function () {
                    $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        var heading = DOMCreate('div', textOption + '<h1 contenteditable="true" data-spaceCollection="carHeadChild" class="carHeadChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">This is heading </h1>', 'editor-component com-heading carouselheading sfCol_100 text-align-center carHeadPar', '', ['data-childCollection="carHeadChild"', 'data-parCollection="carHeadPar"', 'data-alignCollection="carHeadPar"']);
                        var textwrapper = $imageWrapper.find('.textWrapper').length;
                        var $appendLayer = '';
                        $imageWrapper.each(function () {
                            if ($(this).find('.textWrapper').length == 0) {
                                $(this).append('<div class="textWrapper"></div>');
                            }
                        });
                        $imageWrapper.find('.textWrapper').prepend(heading);
                        SettingEvents();
                    } else {
                        $imageWrapper.find('.textWrapper').find('.carouselheading').remove();
                        if (!$imageWrapper.find('.textWrapper').is(':parent')) {
                            $imageWrapper.find('.textWrapper').remove();
                        }
                    }
                    component.carousel.settingDOMs.tabs.Data.onload($item);
                });
                $('#showParagraphCarousel').off().on('click', function () {
                    $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        var paragraph = DOMCreate('div', textOption + '<p contenteditable="true" data-spaceCollection="carParaChild" class="carParaChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>', 'editor-component com-heading carouselParagraph sfCol_100 text-align-center carParaPar', '', ['data-childCollection="carParaChild"', 'data-parCollection="carParaPar"', 'data-alignCollection="carParaPar"']);
                        //var paragraph = '<p contenteditable="true">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>';
                        var textwrapper = $imageWrapper.find('.textWrapper').length;
                        var $appendLayer = '';
                        $imageWrapper.each(function () {
                            if ($(this).find('.textWrapper').length == 0) {
                                $(this).append('<div class="textWrapper"></div>');
                            }
                        });
                        $imageWrapper.find('.textWrapper').append(paragraph);
                        SettingEvents();
                    } else {
                        $imageWrapper.find('.textWrapper').find('.carouselParagraph').remove();
                        if (!$imageWrapper.find('.textWrapper').is(':parent')) {
                            $imageWrapper.find('.textWrapper').remove();
                        }
                    }
                    component.carousel.settingDOMs.tabs.Data.onload($item);
                });

                $('#showrReadMoreCarousel').off().on('click', function () {
                    $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        var btnCarousel = EasyLibrary.ReadDOM("carouselbtn");
                        var textwrapper = $imageWrapper.find('.textWrapper').length;
                        var $appendLayer = '';
                        $imageWrapper.each(function () {
                            if ($(this).find('.textWrapper').length == 0) {
                                $(this).append('<div class="textWrapper"></div>');
                            }
                        });
                        $imageWrapper.find('.textWrapper').append(btnCarousel);
                        SettingEvents($parent);
                        component.carousel.settingDOMs.tabs.Data.onload($item);
                    } else {
                        $imageWrapper.find('.textWrapper').find('.editor-component.button').remove();
                        if (!$imageWrapper.find('.textWrapper').is(':parent')) {
                            $imageWrapper.find('.textWrapper').remove();
                        }
                    }
                });
            },
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("carouselbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        if ($parent.hasClass('.editor-row-shaded-layer'))
                            $parent = $parent.parent();
                        var $imageWrapper = $parent.find('.itemWrapper');
                        LoadSettings();
                        InitEvents();

                        function LoadSettings() {
                            var $firstSlider = $imageWrapper.eq(0);
                            var contains = $firstSlider.find('img');
                            if (contains.length > 0) {
                                $('#showImageCarousel').prop('checked', true);
                            } else {
                                $('#showImageCarousel').prop('checked', false);
                            }
                            if ($parent.hasClass('fullpagebanner')) {
                                $('#heightAdjustCarousel').prop('checked', true);
                                $('#heightadjust').hide();
                            } else {
                                $('#heightAdjustCarousel').prop('checked', false);
                                $('#heightadjust').show();
                            }
                            contains = $firstSlider.find('h1');
                            if (contains.length > 0) {
                                $('#showHeadingCarousel').prop('checked', true);
                            } else {
                                $('#showHeadingCarousel').prop('checked', false);
                            }
                            contains = $firstSlider.find('.editor-component.button');
                            if (contains.length > 0) {
                                $('#showrReadMoreCarousel').prop('checked', true);
                            } else {
                                $('#showrReadMoreCarousel').prop('checked', false);
                            }
                            contains = $firstSlider.find('p');
                            if (contains.length > 0) {
                                $('#showParagraphCarousel').prop('checked', true);
                            } else {
                                $('#showParagraphCarousel').prop('checked', false);
                            }
                            if ($parent.find('.arrows-wrapper').hasClass('hide-element')) {
                                $('#showArrowCarousel').prop('checked', false);
                            } else {
                                $('#showArrowCarousel').prop('checked', true);
                            }
                            if ($parent.find('.pager-dot').hasClass('hide-element')) {
                                $('#showDotsCarousel').prop('checked', false);
                            } else {
                                $('#showDotsCarousel').prop('checked', true);
                            }
                            var tranType = $parent.attr('data-transition');
                            if (typeof (tranType) !== "undefined")
                                $('#carouselAnimation').val(tranType);
                            var loop = $parent.attr('data-loop');
                            if (typeof loop !== "undefined" && loop.length > 0) {
                                $('#AutoSlideCarousel').prop('checked', true);
                            } else {
                                $('#AutoSlideCarousel').prop('checked', false);
                            }
                        }

                        function InitEvents() {
                            $('#addCarosel').on('click', function () { });
                            $('#showImageCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {

                                    if ($parent.find('.hideimage').length > 0) {
                                        $parent.find('.hideimage').each(function () {
                                            var src = $(this).attr('data-imgsrc');
                                            $(this).prepend('<img src="' + src + '">');
                                        });
                                    } else {
                                        var image = '<img  src="' + webbuildermodulepath + '/img/def1.jpg">';
                                        $imageWrapper.prepend(image);
                                    }
                                } else {
                                    $parent.find('img').each(function () {
                                        var $im = $(this);
                                        $im.parent().attr('data-imgsrc', $im.attr('src')).addClass('hideimage');
                                        $im.remove();
                                    });
                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });
                            $('#heightAdjustCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('fullpagebanner');
                                    AdjustSizeFullpage($parent);
                                    $('#heightadjust').hide();
                                } else {
                                    RemoveCarouselHeight($parent);
                                    ChangeSliderValue($('#carouselHeightSlider'), 400);
                                    $parent.removeClass('fullpagebanner');
                                    $('#heightadjust').show();
                                }
                            });
                            component["carousel"].common.InitHeading($item, $parent);
                            $('#showArrowCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.find('.arrows-wrapper').removeClass('hide-element');
                                } else {
                                    $parent.find('.arrows-wrapper').addClass('hide-element');
                                }
                            });
                            $('#showDotsCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.find('.pager-dot').removeClass('hide-element');
                                } else {
                                    $parent.find('.pager-dot').addClass('hide-element');
                                }
                            });
                            $('#carouselAnimation').off().on('change', function () {
                                var type = $(this).val();
                                $parent.attr('data-transition', type);
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            $('#AutoSlideCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.attr('data-loop', "loop");
                                } else {
                                    $parent.attr('data-loop', "");
                                }
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            var itemsPerSlider = 0;
                            if (typeof ($parent.attr('data-perslider')) !== "undefined") {
                                itemsPerSlider = parseInt($parent.attr('data-perslider'));
                            }
                            $('#itemsperslider').val(itemsPerSlider);
                            $('#itemsperslider').on('change', function () {
                                var $this = $(this);
                                var perSlider = $this.val();
                                $parent.attr('data-perslider', perSlider);
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            var caroHeight = $parent.height();

                            function ChangeCaroselHeight(space) {
                                $parent.height(space);
                            }
                            AdvanceSageSlider($('#carouselHeightSlider'), $('#carouselHeightHandle'), 0, 1000, caroHeight, ChangeCaroselHeight, $parent, 'px');
                        }
                    }
                },
                "Data": {
                    "DOM": EasyLibrary.ReadDOM("carouseltabdom"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var deleteIcon = divStart("Remove") + '<i class="icon-icon-delete deleteCarouselItem" title="delete"></i>' + divEnd;
                        initImages();
                        initEvents();

                        function initImages() {
                            var $imageSliderWrapper = $parent.find('.itemsWrapper');
                            var $carousels = $imageSliderWrapper.find('.itemWrapper');
                            var items = $carousels.length;
                            var carouselDOM = '<ul>';
                            for (var i = 0; i < items; i++) {
                                var $elem = $carousels.eq(i);
                                carouselDOM += '<li>';
                                carouselDOM += divStart("carouselItem");
                                carouselDOM += '<img src="' + $elem.find('img').attr('src') + ' " />';
                                carouselDOM += divStart("textWrapper");
                                if ($("#showHeadingCarousel").is(':checked'))
                                    carouselDOM += '<h1 contenteditable="true">' + $elem.find('h1').text() + ' </h1>';
                                if ($("#showParagraphCarousel").is(':checked'))
                                    carouselDOM += '<p contenteditable="true">' + $elem.find('p').text() + ' </p>';
                                carouselDOM += divEnd;
                                carouselDOM += divEnd;
                                carouselDOM += deleteIcon;
                                carouselDOM += '</li>';
                            }
                            $('#imagecollection').html(carouselDOM);
                            //remove unwanted
                            $('#imagecollection').find('')
                            DeleteRow();
                            $('#imagecollection').find('img').each(function () {
                                var $this = $(this);
                                $this.on('click', function () {
                                    $this.SageMedia({
                                        userModuleID: webBuilderUserModuleID,
                                        onSelect: function (src, response, type, filename, extension) {
                                            $this.attr('src', src);
                                            var index = $('#imagecollection').find('img').index($this);
                                            $parent.find('.itemWrapper').find('img').eq(index).attr('src', src);
                                        },
                                        mediaType: 'image'
                                    });
                                });
                            });
                            $('#imagecollection').find('li').each(function () {
                                initTextEdit($(this));
                            });
                        }

                        function initEvents() {
                            $('#btnAddnewCarousel').on('click', function () {

                                if ($("#showImageCarousel").is(':checked')) {
                                    $(this).SageMedia({
                                        userModuleID: webBuilderUserModuleID,
                                        onSelect: function (src, response, type, filename, extension) {
                                            AppendImage(src);
                                        },
                                        mediaType: 'image'
                                    });
                                } else {
                                    AppendImage('');
                                }
                                var $imageSliderWrapper = $parent.find('.itemsWrapper');
                                var $carousels = $('#imagecollection').find('ul li');
                                var slider = '';

                                function AppendImage(src) {
                                    var newHtml = '';
                                    var img = '';
                                    if (src.length > 0) {
                                        img += '<img src="' + src + '">';
                                    }
                                    var text = '';
                                    var data = '';
                                    if ($("#showHeadingCarousel").is(':checked')) {
                                        data += '<h1 contenteditable="true">This is heading</h1>';
                                        text += DOMCreate('div', textOption + '<h1 contenteditable="true" data-spaceCollection="carHeadChild" class="carHeadChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">This is heading </h1>', 'editor-component com-heading carouselheading sfCol_100 text-align-center carHeadPar', '', ['data-childCollection="carHeadChild"', 'data-parCollection="carHeadPar"', 'data-alignCollection="carHeadPar"']);;
                                    }
                                    if ($("#showParagraphCarousel").is(':checked')) {
                                        data += '<p contenteditable="true">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>';
                                        text += DOMCreate('div', textOption + '<p contenteditable="true" data-spaceCollection="carParaChild" class="carParaChild editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" style="font-size: 24px;">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>', 'editor-component com-heading carouselParagraph sfCol_100 text-align-center carParaPar', '', ['data-childCollection="carParaChild"', 'data-parCollection="carParaPar"', 'data-alignCollection="carParaPar"']);
                                    }
                                    if ($("#showParagraphCarousel").is(':checked')) {
                                        text += EasyLibrary.ReadDOM("carouselbtn");
                                    }
                                    slider = img;
                                    if (text.length > 0) {
                                        slider += DOMCreate('div', text, 'textWrapper');
                                    }
                                    newHtml = img + DOMCreate('div', data, 'textWrapper');
                                    newHtml = divStart("carouselItem") + newHtml + divEnd + deleteIcon;
                                    $('#imagecollection').find('ul').append('<li>' + newHtml + '</li>');
                                    $imageSliderWrapper.append('<li class="itemWrapper">' + slider + '</li>');
                                    $parent.find('.ImageSliderWrapper').removeClass('binded');
                                    InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                                    var $lastchild = $('#imagecollection').find('img').last();
                                    $lastchild.on('click', function () {
                                        $lastchild.SageMedia({
                                            userModuleID: webBuilderUserModuleID,
                                            onSelect: function (src, response, type, filename, extension) {
                                                $lastchild.attr('src', src);
                                                var index = $('#imagecollection').find('img').index($lastchild);
                                                $parent.find('.itemWrapper').find('img').eq(index).attr('src', src);
                                            },
                                            mediaType: 'image'
                                        });
                                    });
                                    initTextEdit($lastchild.parent().parent());
                                    component["carousel"].common.InitHeading($item, $parent);
                                    DeleteRow();
                                    SettingEvents();
                                }
                            });
                        }
                        function initTextEdit($this) {
                            //console.log(1)
                            $this.find("h1").off().on('blur keyup', function () {
                                //console.log('keyup')
                                var index = $('#imagecollection').find('h1').index($this.find("h1"));
                                $parent.find('.itemWrapper').find('h1').eq(index).text($(this).text());
                            });

                            $this.find("p").off().on('blur keyup', function () {
                                var index = $('#imagecollection').find('p').index($this.find("p"));
                                $parent.find('.itemWrapper').find('p').eq(index).text($(this).text());
                            });
                        }

                        function DeleteRow() {
                            $('.deleteCarouselItem').off().on('click', function () {
                                var $this = $(this);
                                SageConfirmDialog('Do you want to delete.').done(function () {
                                    var $slider = $this.parent().parent();
                                    var index = $('#imagecollection').find('ul li').index($slider);
                                    $slider.remove();
                                    $parent.find('.itemWrapper').eq(index).remove();
                                    $parent.find('.ImageSliderWrapper').removeClass('binded');
                                    InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                                });
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
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },

                "Box Shadow": {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }
,    "column": {
        "componentname": "column",
        "category": "layout",
        "group": "column",
        "subgroup": "onecolumn",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "hidden",
        "afterdrop": function ($appendedParent, $appendLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
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
,    "contact us": {
        "componentname": "contact us",
        "category": "advance",
        "icon": "icon icon-contactform",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "form",
        "defaultdata": EasyLibrary.ReadDOM("contactus"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($('.site-body').find('.editor-component.contactus').length > 1) {
                $appendLayer.remove();
                SageAlertDialog('You cannot add two contact us component in same page');
            }
            if (dropped)
                this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("contactusbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }

                        function LoadSettings() {
                            var contactuslink = SageFrameHostURL + '/contact-us-manage'
                            $('#contactuslink').attr('href', contactuslink);
                            var layout = $parent.attr('data-layout');
                            $("#slcCULayout").val(layout);

                        }

                        function Events() {

                            $(".asterisk").on("click", function () {
                                var isChecked = false;
                                if ($(this).hasClass('required')) {
                                    $(this).removeClass('required');
                                    isChecked = false;
                                } else {
                                    $(this).addClass('required');
                                    isChecked = true;
                                }
                                var className = $(this).parent().find('input').attr('data-class');
                                if (isChecked) {
                                    $("." + className).find('.contacttextBox').addClass('required');
                                    $("." + className).find('.reqstar').html('*');
                                } else {
                                    $("." + className).find('.contacttextBox').removeClass('required');
                                    $("." + className).find('.reqstar').html('');
                                }
                            });
                            $("#slcCULayout").on("change", function () {
                                var layout = $(this).val();
                                $parent.find(".cuLayout").removeClass("sfCol_100").removeClass("sfCol_50").removeClass("text-align-left").removeClass("text-align-center").removeClass("text-align-right");
                                if (layout == "1-Col-Left") {
                                    $parent.find(".cuLayout").addClass("sfCol_100").addClass("text-align-left");
                                } else if (layout == "1-Col-Right") {
                                    $parent.find(".cuLayout").addClass("sfCol_100").addClass("text-align-right");
                                } else if (layout == "1-Col-Center") {
                                    $parent.find(".cuLayout").addClass("sfCol_100").addClass("text-align-center");
                                } else if (layout == "2-Col-Left") {
                                    $parent.find(".cuLayout").addClass("sfCol_50").addClass("text-align-left");
                                } else if (layout == "2-Col-Right") {
                                    $parent.find(".cuLayout").addClass("sfCol_50").addClass("text-align-right");
                                } else if (layout == "2-Col-Center") {
                                    $parent.find(".cuLayout").addClass("sfCol_50").addClass("text-align-center");
                                }
                                $parent.attr('data-layout', layout);
                            });
                        }
                    }
                },
                "Heading": {
                    "DOM": EasyLibrary.ReadDOM("contactusheadingtab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.cuHeading');
                        var $textChange = $parent;
                        InitEvents();
                        LoadSettings();

                        function InitEvents() {
                            ManualEntryEvents();
                            TextTranformCheck();
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($textChange.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#textTransformcu').val(trasformValue);
                            $('#textTransformcu').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function ManualEntryEvents() {

                            $(".cuChangeText").on("keyup", function () {
                                var value = $(this).val().trim();
                                //if (value == "") {
                                //    SageAlertDialog("Required Field", 'Please enter some text');
                                //} else {
                                var className = $(this).attr('data-class');
                                //alert(className);
                                //console.log($parent);
                                //$parent.find("." + className).text(value);
                                $parent.text(value);
                                //}
                            });
                            $(".cuCheckbox").on("change", function () {
                                var className = $(this).attr('data-class');
                                var isChecked = $(this).prop("checked");
                                if (isChecked) {
                                    $('.contactHeadingSetting').show(400);
                                    $("." + className).show(400);
                                    $parent.show();
                                } else {
                                    $("." + className).hide(400);
                                    $('.contactHeadingSetting').hide(400);
                                    $parent.hide();
                                }
                            });

                            $('.changeFontSize').on('click', function () {
                                $(this).focus().select();
                            });
                            $('.changeFontSize').on('keyup', function (event) {
                                var $this = $(this);
                                var fontsize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        fontsize = fontsize + 1;
                                        $(this).val(fontsize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        fontsize = fontsize - 1;
                                        $(this).val(fontsize);
                                        break;
                                }
                                if (fontsize < minFontSize) {
                                    fontsize = minFontSize;
                                    $this.val(minFontSize);
                                }
                                if (fontsize > maxFontsize) {
                                    fontsize = maxFontsize;
                                    $this.val(maxFontsize);
                                }
                                if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                                    var $slider = $this.parent().prev();
                                    var slider = $slider.slider({
                                        value: fontsize
                                    });
                                    $slider.find('> div.ui-slider-handle').text(fontsize);
                                    $textChange.css('font-size', fontsize + 'px');
                                }
                                $this.focus().select();
                            });

                            $('.increaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                            $('.decreaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function LoadSettings() {



                            $(".cuChangeText").each(function (index, item) {
                                var className = $(this).attr('data-class');
                                var text = '';
                                text = $("." + className).html();
                                var isVisible = $("." + className).is(":visible");
                                if (isVisible) {
                                    $(this).parent().find(".cuCheckbox").prop("checked", true);
                                    $('.contactHeadingSetting').show(400);
                                } else {
                                    $('.contactHeadingSetting').hide();
                                }
                                var $ele = $("." + className).parent().find('.contacttextBox');
                                if ($ele.hasClass('required')) {
                                    $(this).parent().find(".asterisk").addClass("required");
                                } else {
                                    $(this).parent().find(".asterisk").removeClass("required");
                                }
                                $(this).val('');
                                $(this).val(text);
                            });

                            //alert($item.find(".cuCheckbox").is(":checked"));

                            var fontsize = $textChange.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize;
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));
                            $('.changeFontSize').val(fontsize);

                            function FontSize(space) {
                                var handleFontSize = $("#fontsizeHandle");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#fontsizeSlidercu'), $('#fontsizeHandlecu'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
                            var removeClass = '';
                            loadColorPicker();
                            LoadFontFamily();
                        }

                        function loadColorPicker() {
                            $('#chooseFontColorcu').css('background-color', $textChange.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#chooseFontColorcu').colorPicker(colorPickerOption);

                        }

                        function LoadFontFamily() {
                            $('#fontfamilycu').html(DOMFontAdvanceCollection());

                            var defaultFontFamily = 'montserrat';
                            var classesList = $textChange.attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilycu').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightcu').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightcu').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $textChange.removeClass(familyClass[0]);
                                    }
                                }
                                $textChange.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilycu').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $textChange.removeClass(fontClass[0]);
                                    }
                                }
                                $textChange.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightcu').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightcu').html(fontDOM);
                                }
                            }
                        }
                    }
                },
                "Label": {
                    "DOM": EasyLibrary.ReadDOM("contactuslabeltab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.cuLabel');
                        var $textChange = $parent;
                        InitEvents();
                        LoadSettings();

                        function InitEvents() {
                            ManualEntryEvents();
                            TextTranformCheck();
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($textChange.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#textTransformcuLabel').val(trasformValue);
                            $('#textTransformcuLabel').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function ManualEntryEvents() {
                            $('.changeFontSize').on('click', function () {
                                $(this).focus().select();
                            });
                            $('.changeFontSize').on('keyup', function (event) {
                                var $this = $(this);
                                var fontsize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        fontsize = fontsize + 1;
                                        $(this).val(fontsize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        fontsize = fontsize - 1;
                                        $(this).val(fontsize);
                                        break;
                                }
                                if (fontsize < minFontSize) {
                                    fontsize = minFontSize;
                                    $this.val(minFontSize);
                                }
                                if (fontsize > maxFontsize) {
                                    fontsize = maxFontsize;
                                    $this.val(maxFontsize);
                                }
                                if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                                    var $slider = $this.parent().prev();
                                    var slider = $slider.slider({
                                        value: fontsize
                                    });
                                    $slider.find('> div.ui-slider-handle').text(fontsize);
                                    $textChange.css('font-size', fontsize + 'px');
                                }
                                $this.focus().select();
                            });

                            $('.increaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                            $('.decreaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function LoadSettings() {
                            var fontsize = $textChange.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize;
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));
                            $('.changeFontSize').val(fontsize);

                            function FontSize(space) {
                                var handleFontSize = $("#fontsizeHandleLabel");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#fontsizeSlidercuLabel'), $('#fontsizeHandlecuLabel'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
                            var removeClass = '';
                            loadColorPicker();
                            LoadFontFamily();
                        }

                        function loadColorPicker() {
                            $('#chooseFontColorcuLabel').css('background-color', $textChange.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#chooseFontColorcuLabel').colorPicker(colorPickerOption);

                        }

                        function LoadFontFamily() {
                            $('#fontfamilycuLabel').html(DOMFontAdvanceCollection());

                            var defaultFontFamily = 'montserrat';
                            var classesList = $textChange.attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilycuLabel').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightcuLabel').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightcuLabel').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $textChange.removeClass(familyClass[0]);
                                    }
                                }
                                $textChange.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilycuLabel').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $textChange.removeClass(fontClass[0]);
                                    }
                                }
                                $textChange.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightcuLabel').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightcuLabel').html(fontDOM);
                                }
                            }
                        }
                    }
                },
                "Text Box": {
                    "DOM": EasyLibrary.ReadDOM("contactustexttab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.contacttextBox');
                        var $textChange = $parent;
                        InitEvents();
                        LoadSettings();

                        function InitEvents() {
                            ManualEntryEvents();
                            TextTranformCheck();
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($textChange.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#textTransformcuTextBox').val(trasformValue);
                            $('#textTransformcuTextBox').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function ManualEntryEvents() {
                            $('.changeFontSize').on('click', function () {
                                $(this).focus().select();
                            });
                            $('.changeFontSize').on('keyup', function (event) {
                                var $this = $(this);
                                var fontsize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        fontsize = fontsize + 1;
                                        $(this).val(fontsize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        fontsize = fontsize - 1;
                                        $(this).val(fontsize);
                                        break;
                                }
                                if (fontsize < minFontSize) {
                                    fontsize = minFontSize;
                                    $this.val(minFontSize);
                                }
                                if (fontsize > maxFontsize) {
                                    fontsize = maxFontsize;
                                    $this.val(maxFontsize);
                                }
                                if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                                    var $slider = $this.parent().prev();
                                    var slider = $slider.slider({
                                        value: fontsize
                                    });
                                    $slider.find('> div.ui-slider-handle').text(fontsize);
                                    $textChange.css('font-size', fontsize + 'px');
                                }
                                $this.focus().select();
                            });
                            $('.increaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                            $('.decreaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function LoadSettings() {
                            var fontsize = $textChange.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize + 'px';
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));
                            $('.changeFontSize').val(fontsize);

                            function FontSize(space) {
                                var handleFontSize = $("#fontsizeHandleTextBox");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#fontsizeSlidercuTextBox'), $('#fontsizeHandlecuTextBox'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');

                            function BorderSize(space) {
                                var handleFontSize = $("#bordersizeHandlecuTextBox");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('border-width', space + 'px');
                            }
                            var bordersize = $textChange.css('border-top-width');
                            if (typeof (bordersize) === 'undefined') {
                                bordersize = 1 + 'px';
                            }
                            bordersize = parseInt(bordersize.replace('px', ''));

                            AdvanceSageSlider($('#bordersizeSlidercuTextBox'), $('#bordersizeHandlecuTextBox'), 1, 4, bordersize, BorderSize, $textChange, 'px');
                            var removeClass = '';
                            loadColorPicker();
                            LoadFontFamily();
                            loadBorderColorPicker();
                        }

                        function loadBorderColorPicker() {
                            $('#chooseBorderColorcuTextBox').css('background-color', $textChange.css('border-top-color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'border-color': objColor.bgColor });
                                }
                            });
                            $('#chooseBorderColorcuTextBox').colorPicker(colorPickerOption);

                        }

                        function loadColorPicker() {
                            $('#chooseFontColorcuTextBox').css('background-color', $textChange.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#chooseFontColorcuTextBox').colorPicker(colorPickerOption);

                        }

                        function LoadFontFamily() {
                            $('#fontfamilycuTextBox').html(DOMFontAdvanceCollection());

                            var defaultFontFamily = 'montserrat';
                            var classesList = $textChange.attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilycuTextBox').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightcuTextBox').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightcuTextBox').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $textChange.removeClass(familyClass[0]);
                                    }
                                }
                                $textChange.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilycuTextBox').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $textChange.removeClass(fontClass[0]);
                                    }
                                }
                                $textChange.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightcuTextBox').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightcuTextBox').html(fontDOM);
                                }
                            }
                        }
                    }
                },
                "Background": {
                    "options": ["color"],
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
                }
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "onsave": function () {

        },
        "remove": function ($view) {
            $view.find('.contacttextBox').val('');
        },
        "view": {
            "view": function () {
                $(function () {
                    function DrawCaptcha() {
                        var a = Math.ceil(Math.random() * 10) + '';
                        var b = Math.ceil(Math.random() * 10) + '';
                        var firstCode = a;
                        var secondCode = b;
                        $("#spnFirstCaptcha").html(firstCode);
                        $("#spnSecondCaptcha").html(secondCode);
                    }

                    // Validate the Entered input aganist the generated security code function
                    function ValidCaptcha() {
                        var firstCode = parseInt(removeSpaces($('#spnFirstCaptcha').html()));
                        var secondCode = parseInt(removeSpaces($('#spnSecondCaptcha').html()));
                        var str2 = removeSpaces($('#txtCapchaInput').val());
                        if ((firstCode + secondCode) == str2) return true;
                        return false;

                    }

                    // Remove the spaces from the entered and generated code
                    function removeSpaces(string) {
                        return string.split(' ').join('');
                    }
                    var $validatorcu = $("#form1").validate({
                        rules: {
                            firstName: {
                                maxlength: 50
                            },
                            lastName: {
                                maxlength: 50
                            },
                            message: {
                                maxlength: 200
                            },
                            email: {
                                email: true,
                                maxlength: 50
                            },
                            address: {
                                maxlength: 50
                            },
                            telephone: {
                                maxlength: 50
                            },
                            subject: {
                                maxlength: 50
                            },
                            message: {
                                maxlength: 1000
                            },
                            website: {
                                maxlength: 50
                            }
                        },
                        messages: {
                            firstName: {
                                required: "* Required Field"
                            },
                            lastName: {
                                required: "* Required Field"
                            },
                            message: {
                                required: "* Required Field"
                            },
                            email: {
                                required: "* Required Field",
                                email: "Please enter valid email"
                            },
                        },
                        ignore: ':hidden, :disabled'
                    });
                    $(".btncuSave").off().on("click", function () {
                        if ($('.site-body').find('.editor-component.contactus > .carrier-open-option').length == 0) {
                            if ($validatorcu.form()) {
                                if (ValidCaptcha()) {
                                    var $parent = $(this).parents(".cuWrapper");
                                    var firstName = $parent.find(".firstName").val();
                                    var lastName = $parent.find(".lastName").val();
                                    var email = $parent.find(".email").val();
                                    var message = $parent.find(".message").val();
                                    var telephone = $parent.find(".telephone").val();
                                    var subject = $parent.find(".subject").val();
                                    var address = $parent.find(".address").val();
                                    var website = $parent.find(".website").val();
                                    var objBuilComponent = {
                                        portalID: parseInt(SageFramePortalID),
                                        userName: SageFrameUserName,
                                        secureToken: SageFrameSecureToken
                                    }
                                    var objContactUs = {
                                        FirstName: firstName,
                                        LastName: lastName,
                                        Email: email,
                                        Message: message,
                                        Telephone: telephone,
                                        Subject: subject,
                                        Address: address,
                                        Website: website
                                    }
                                    $.ajax({
                                        isPostBack: false,
                                        async: false,
                                        cache: false,
                                        type: 'POST',
                                        contentType: "application/json; charset=utf-8",
                                        data: JSON2.stringify({
                                            objBuilComponent: objBuilComponent,
                                            objContactUs: objContactUs
                                        }),
                                        dataType: 'json',
                                        crossDomain: true,
                                        url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/SaveContactUsData',
                                        success: function (data) {
                                            $('.conMessage').text("Information Save Successfully").removeClass("eb-block-error").addClass("eb-block-success");
                                            ClearForm();
                                        },
                                        error: function () {
                                            $('.conMessage').text("Error Occured").removeClass("eb-block-success").addClass("eb-block-error");
                                        },
                                    });
                                } else {
                                    SageAlertDialog("Wrong Capcha", 'Alert');
                                    DrawCaptcha();
                                    $("#txtCapchaInput").val();
                                }
                            }
                        }
                    });
                    $(".btncuReset").off().on("click", function () {
                        ClearForm();
                    });

                    function ClearForm() {
                        var $parent = $(".contactFromWrap");
                        $parent.find(".firstName").val('');
                        $parent.find(".lastName").val('');
                        $parent.find(".email").val('');
                        $parent.find(".message").val('');
                        $parent.find(".telephone").val('');
                        $parent.find(".subject").val('');
                        $parent.find(".address").val('');
                        $parent.find(".website").val('');
                        $validatorcu.resetForm();
                        $("#txtCapchaInput").val('');
                        DrawCaptcha();
                    }
                    DrawCaptcha();
                });
            },
            "library": {

            }
        }
    }
,    "custom imghvr toplayer": {
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
,    "font icon": {
        "componentname": "font icon",
        "category": "basic",
        "icon": "fa fa-star",
        "row": false,
        "collection": true,
        "type": "element",
        "hidden": false,
        "defaultdata": DOMCreate('div', fontIconOption + DOMCreate('div', DOMCreate('i', '', 'fa fa-star onhovercolor', '', ['style="font-size:30px;"']), 'dis-table'), 'editor-component fonticon ', '', ['style="height: 60px; width: 60px; color: rgb(34, 34, 34); background-color: rgb(223, 223, 223);"', 'data-backgroundcolor="color"', 'data-backgroundimage=""']),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
            var iconStyles = {
                "Simple icon style": {
                    "0": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 61px;",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "1": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgb(219, 219, 219); border-radius: 61px; display: block;",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "2": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgb(219, 219, 219); border-radius: 0px; display: block;",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "3": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 61px; display: block; border-style: solid; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "4": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 0px; display: block; border-style: solid; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "5": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 61px; display: block; border-style: dashed; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    },
                    "6": {
                        "style": "height: 90px; width: 90px; color: rgb(34, 34, 34); background-color: rgba(219, 219, 219, 0); border-radius: 0px; display: block; border-style: dashed; border-width: 2px; border-color: rgb(0, 0, 0);",
                        "class": "editor-component fonticon editor-com-outerSpacing-top-10 editor-com-outerSpacing-right-10 editor-com-outerSpacing-bottom-10 editor-com-outerSpacing-left-10",
                        "data-backgroundcolor": "color",
                        "data-backgroundimage": ""
                    }
                }
            }
            var displayStyle = {
                "ulClass": "sfCol_100 ",
                "liClass": "sfCol_20 ",
                "ulStyle": "",
                "liStyle": "height:100px; width:100px;"
            }
            InitComponentStyle($appendLayer, ' > .fonticon', dropped, iconStyles, this.defaultdata, displayStyle);
            return 'no data to show';
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("fonticonbasictab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $fontIcon = $item.parent().next().children();
                        InitEvents();

                        function InitEvents() {
                            $('.fontIconCollection').html(EasyLibrary.FontCollectionList());
                            FontWrapperSize();
                            FontSize();
                            FontIconColor();
                            SearchFontIcon();
                        }
                        //var fontIconThreshold = 5;
                        function FontWrapperSize() {
                            var fontWrapperSize = parseInt(parseInt($parent.css('height'))) / 5;

                            function FontWrapperSizeChange(space) {
                                $parent.css({
                                    'height': space * 5,
                                    'width': space * 5
                                });
                            }
                            AdvanceSageSlider($('#fontIconbackHeightSlider'), $('#fontIconbackHeightHandle'), 0, 200, fontWrapperSize, FontWrapperSizeChange, $parent, 'px');
                        }

                        function FontSize() {
                            var fontsize = parseInt($fontIcon.css('font-size').replace('px', '') / 5);

                            function FontSizeChange(space) {
                                $fontIcon.css('font-size', space * 5);
                            }
                            AdvanceSageSlider($('#fontIconHeightSlider'), $('#fontIconHeightHandle'), 0, 200, fontsize, FontSizeChange, $parent, 'px');
                        }

                        function FontIconColor() {
                            $('#fontIconColor').css('background-color', $fontIcon.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $fontIcon.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#fontIconColor').colorPicker(colorPickerOption);
                        }

                        function SearchFontIcon() {
                            $('#searchIcons').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('.fontIconCollection').find('li').each(function () {
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
                            var fontClasses = $fontIcon.attr('class').replace('fa ', '').replace('onhovercolor', '').trim();
                            $('.fontIconCollection').find('li i[data-class="' + fontClasses + '"]').parent().addClass('selected');
                            $('.fontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                $fontIcon.attr('class', 'onhovercolor fa ' + chooseClass);
                                $('.fontIconCollection').find('li').removeClass('selected');
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
                        "position": ["all"],
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
                    "options": ["all", "color", "zoom", "Inherit"]
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
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
        }
    }
,
    "gallery": {
        "componentname": "gallery",
        "category": "pro",
        "collection": false,
        "icon": "fa fa-th",
        "row": true,
        "hidden": false,
        "type": "gallery",
        "defaultdata": EasyLibrary.ReadDOM("gallery"),
        "onDrop": function ($appendLayer) { },
        "onSort": function (ui) {
            this.common.InitalizeSort(ui, ui.find('.galleryContainer').attr('data-type'));
        },
        "loadSetting": function ($item) { },
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            if (dropped) {

                var galleryContainer = $appendLayer.find('.galleryContainer');
                var dataType = galleryContainer.attr('data-type');
                var defaultCount = galleryContainer.attr('data-defaultcount');

                var defaultData = component[dataType].defaultdata;
                var updatedDefaultData = this.common.FindReplaceDeleteHelper(defaultData);

                var itemsCount = 3;

                for (var times = 0; times < itemsCount; times++) {
                    $appendLayer.find('.galleryContainer')
                        .append('<div class="editor-com-outerSpacing-left-0 editor-com-outerSpacing-right-0 editor-com-outerSpacing-bottom-0 editor-com-outerSpacing-top-0 sfFixed editor-com-innerSpacing-top-0 editor-com-innerSpacing-right-0 editor-com-innerSpacing-bottom-0 editor-com-innerSpacing-left-0"> ' + updatedDefaultData + '</div>');
                }
                galleryContainer.find('> div > div.editor-component').addClass('onhover-border-none');

                // SET DEFAULT VALUES HERE

                var galleryLib = this.view.library;

                galleryLib.UpdateWidthAttribute(galleryContainer, itemsCount);

                var space = galleryContainer.attr('data-galhorspacing');

                if (!space) space = 0;

                galleryLib.ChangeRightSpacing(space, $appendLayer);

                this.common.InitalizeEvents(galleryContainer, dataType);

            }

            this.common.SetCustomEvents();

            SettingEvents();
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("gallerybasic"),
                    "onload": function ($item) {
                        var $editRow = $item.parents('.editor-row');
                        var $parent = $item.parent().parent();

                        var galContainer = $parent.find('.galleryContainer');
                        var dataType = galContainer.attr('data-type');

                        var galHeading = $parent.find('.galleryHeading');
                        var galItem = $('#slcGalleryItem');
                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {

                            var getComponentOptions = function () {
                                var option = '';
                                var componentList = Object.keys(component);
                                var componentListLen = componentList.length;
                                for (var i = 0; i < componentListLen; i++) {
                                    var $compo = component[componentList[i]];
                                    //console.log($compo['componentname'] + " " + !$compo['hidden'] + " " + $compo['collection'] + " " + $compo['category']);
                                    if (!$compo['hidden'] && $compo['collection'] && $compo['category'] !== "layout")
                                        option += DOMCreate('option', $compo['componentname']);
                                }
                                return option;
                            }
                            SetPreview(dataType);
                            galItem.html(getComponentOptions());
                            galItem.val(dataType);

                            var perRow = galContainer.attr('data-galleryperrow');

                            if (!perRow) perRow = "3";

                            $('#slcGalleryItemsPerRow').val(perRow);

                            var isIconHidden = galHeading.hasClass('hide-element');

                            if (!isIconHidden) $('#showGalleryHeading').prop('checked', true);


                            var $container = $editRow.find('div.editor-row-container');
                            if ($container.length > 0) {
                                $('#askContainer').prop('checked', true);
                                var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                                $('#selContainerWidth').val(conClass);
                                $('#additionalContainer').fadeIn(400);
                            } else {
                                $('#askContainer').prop('checked', false);
                            }
                        }

                        //var outerDom = CreateSliderDOM(marginSliderList[2][0], marginSliderList[2][1], 'Right');
                        //marginSliderList[2][2] = true;

                        function TriggerEvents() {

                            var gutterSpaceControl = $('#galleryHvrGutterSpace');

                            var sliderMin = gutterSpaceControl.data('slidemin');
                            var sliderMax = gutterSpaceControl.data('slidemax');

                            var galleryItems = galContainer.children();

                            var horGutterSpace = galContainer.attr('data-galhorspacing');
                            var verGutterSpace = galContainer.attr('data-galverspacing');


                            var currentMarginRight = 0;
                            if (!horGutterSpace) currentMarginRight = 0;
                            else currentMarginRight = horGutterSpace;

                            var currentMarginBottom = 0;
                            if (!verGutterSpace) currentMarginBottom = 0;
                            else currentMarginBottom = verGutterSpace;

                            var galleryLib = component["gallery"]["view"]["library"];

                            var changeRightSpace = galleryLib.ChangeRightSpacing;
                            var changeBottomSpace = galleryLib.ChangeBottomSpacing;

                            AdvanceSageSlider($('#galleryHorGutterSpaceSlider'), $('#galleryHorGutterSpaceHandle'), sliderMin, sliderMax, currentMarginRight, changeRightSpace, $parent, 'px');
                            AdvanceSageSlider($('#galleryVerGutterSpaceSlider'), $('#galleryVerGutterSpaceHandle'), sliderMin, sliderMax, currentMarginBottom, changeBottomSpace, $parent, 'px');

                            var currentTotal = galleryItems.length;

                            function ReAssignTotalItems(count, $par, $dontInit) {

                                var perRow = $('#slcGalleryItemsPerRow').find("option:selected").text();

                                galContainer.attr('data-galleryperrow', perRow);

                                var itemsPerRow = parseInt(perRow);
                                var currentColsCount = galContainer.children().length;

                                //var totalRequired = count;
                                var totalItems = parseInt(count);

                                var addComponent = true;
                                var itemDiff = Math.abs(currentColsCount - totalItems);

                                if (totalItems < currentColsCount) addComponent = false;


                                if (!addComponent) {
                                    $dontInit = true;
                                    SageConfirmDialog(' Taking this step will result in some data loss. Do you wish to continue ?').done(function () {

                                        for (var itemCount = 0; itemCount < itemDiff; itemCount++) {
                                            var currentContainer = $parent.find('.galleryContainer').children();
                                            currentContainer.eq(0).remove();

                                        }
                                    }).fail(function () {
                                        $('#numCounterTotal').html(totalItems + 1);

                                    });

                                }
                                else {
                                    var containerComponents = $parent.find('.galleryContainer').children();

                                    for (var itemCount2 = 0; itemCount2 < itemDiff; itemCount2++) {
                                        var itemCopy = containerComponents.eq(0).clone(true);
                                        containerComponents.parent().append(itemCopy);
                                    }
                                }

                                galleryLib.UpdateWidthAttribute(galContainer, itemsPerRow);

                                var horizonalGutterSpace = $('#galleryHorGutterSpaceHandle').text();
                                var verticalGutterSpace = $('#galleryVerGutterSpaceHandle').text();

                                changeRightSpace(horizonalGutterSpace, $parent);
                                changeBottomSpace(verticalGutterSpace, $parent);


                                var updatedGalContainer = $parent.find('.galleryContainer');
                                var currentDataType = updatedGalContainer.attr('data-type');
                                if (!$dontInit) {
                                    component["gallery"]["common"].InitalizeEvents(updatedGalContainer, currentDataType);
                                }

                            }

                            EasyLibrary.NumberCounter($('.manualNumCounter'), 1, 50, 1, currentTotal, $parent, ReAssignTotalItems);

                            $('#showGalleryHeading').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    galHeading.addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    galHeading.each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                            $('#slcGalleryItemsPerRow').off().on('change', function () {
                                var totalRequired = $('.totalNumCount').text();
                                ReAssignTotalItems(totalRequired, $parent, true);
                            });

                            galItem.off().on('change', function () {
                                var currentComp = $(this).val();
                                SetPreview(currentComp);
                            });


                            $('#btnApplyGalleryComp').off().on('click', function () {

                                var updatedGalContainer = $parent.find('.galleryContainer');
                                var currentDataType = updatedGalContainer.attr('data-type');
                                var newComp = $('#slcGalleryItem option:selected').val();
                                if (currentDataType !== newComp)
                                    SageConfirmDialog(' Are you sure you want to change the gallery item type? All your previous data will be lost. Do you wish to continue? ').done(function () {

                                        var defaultData = component[newComp].defaultdata;

                                        var galleryCommon = component["gallery"]["common"];

                                        var updatedDefaultData = galleryCommon.FindReplaceDeleteHelper(defaultData);
                                        //updatedDefaultData = galleryCommon.RemoveBorder(updatedDefaultData);

                                        updatedGalContainer.children().children().replaceWith(updatedDefaultData);
                                        updatedGalContainer.find('.editor-component').addClass('onhover-border-none');

                                        galContainer.attr('data-type', newComp);

                                        galleryCommon.InitalizeEvents(updatedGalContainer, newComp);
                                        SettingEvents();
                                        galleryCommon.SetCustomEvents();
                                        TriggerView($parent);
                                        dataType = newComp;
                                    }).fail(function () { });

                            });

                            $('#btnCancelCurrentComp').off().on('click', function () {
                                SetPreview(dataType);
                                galItem.val(dataType);
                            });



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
                                var $container = $editRow.find('.editor-row-container');
                                $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                                $container.addClass(containWidth);
                            });
                        }

                        //function FindReplaceDeleteHelper(content) {
                        //    var newHTML = $(content)
                        //        .find('div').eq(1)
                        //        .find('.deletehelper').eq(0)
                        //        .removeClass('deletehelper')
                        //        .addClass('deleteGalleryItem sfError')
                        //        .parents('.editor-component').eq(0)[0].outerHTML;

                        //    return newHTML;
                        //}

                        function SetPreview(componentName) {

                            var previewPanel = $('#previewPanel');
                            var defaultData = component[componentName].defaultdata;
                            previewPanel.html(defaultData);
                            previewPanel.find('.editor-component').eq(0).addClass('overflow-hidden');
                            component["gallery"]["common"].InitalizeEvents(previewPanel, componentName);

                            previewPanel.find('[contenteditable="true"]').removeAttr('contenteditable');
                        }

                    }
                },

                "Background":
                 {
                     "options": ["color", 'image']
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
                    },
                    "selectLayer": function ($elem) {

                        return $elem.parent().parent();
                    },
                },

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "view": {
            "view": function () { },

            "library": {


                "UpdateWidthAttribute": function ($galleryContainer, newColCount) {

                    var widthPercentage = "";
                    switch (newColCount) {
                        case 2: widthPercentage = "50%"; break;
                        case 3: widthPercentage = "33.33%"; break;
                        case 4: widthPercentage = "25%"; break;
                        case 5: widthPercentage = "20%"; break;
                        case 1: widthPercentage = "100%"; break;
                    }

                    $galleryContainer.attr('data-colwidth', widthPercentage);

                },


                "ChangeRightSpacing": function (space, $par) {

                    if (space !== 'undefined' && typeof (space) !== 'undefined') {
                        var times = 5;

                        var galContainer = $par.find('.galleryContainer');

                        var childComp = galContainer.children();

                        var marginRightClass = childComp.attr('class').match(/editor-com-outerSpacing-right-[0-9]{1,3}/g);
                        var marginLeftClass = childComp.attr('class').match(/editor-com-outerSpacing-left-[0-9]{1,3}/g);


                        if (marginRightClass !== null) {

                            childComp.each(function () {
                                var $me = $(this);
                                $me.removeClass(marginRightClass[0].trim());
                                $me.removeClass(marginLeftClass[0].trim());
                            });

                            var compOuterSpace = space * times;


                            var className = '';
                            var leftSpaceClassName = '';
                            if (space >= 0) {
                                className = 'editor-com-outerSpacing-right-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-left-' + compOuterSpace;
                            }
                            else {
                                space = Math.abs(space);
                                className = 'editor-com-outerSpacing-right-neg-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-left-neg-' + compOuterSpace;

                            }

                            childComp.addClass(className);
                            childComp.addClass(leftSpaceClassName);
                            childComp.addClass('display-inline-block');
                            var widthPercentage = galContainer.attr('data-colwidth');
                            galContainer.attr('data-galhorspacing', space);
                            var newWidthAttr = "calc(" + widthPercentage + " - " + (compOuterSpace * 2) + "px)";
                            childComp.each(function (i, v) {
                                var $me = $(this);
                                $me.css(
                                    {
                                        "width": newWidthAttr,
                                        "float": "left"
                                    });
                            });
                        }


                    }

                },


                "ChangeBottomSpacing": function (space, $par) {


                    if (space !== 'undefined' && typeof (space) !== 'undefined') {

                        var times = 5;

                        var galContainer = $par.find('.galleryContainer');

                        var childComp = galContainer.children();

                        var marginBottomClass = childComp.attr('class').match(/editor-com-outerSpacing-bottom-[0-9]{1,3}/g);
                        var marginTopClass = childComp.attr('class').match(/editor-com-outerSpacing-top-[0-9]{1,3}/g);


                        if (marginBottomClass !== null) {

                            childComp.each(function () {
                                var $me = $(this);
                                $me.removeClass(marginBottomClass[0].trim());
                                $me.removeClass(marginTopClass[0].trim());
                            });

                            var compOuterSpace = space * times;


                            var className = '';
                            var leftSpaceClassName = '';
                            if (space >= 0) {
                                className = 'editor-com-outerSpacing-bottom-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-top-' + compOuterSpace;

                            }
                            else {
                                space = Math.abs(space);
                                className = 'editor-com-outerSpacing-bottom-neg-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-top-neg-' + compOuterSpace;
                            }

                            childComp.addClass(className);
                            childComp.addClass(leftSpaceClassName);

                            galContainer.attr('data-galverspacing', space);

                        }


                    }

                },



            }
        },
        "common": {

            "FindReplaceDeleteHelper": function (editorComponentContainer) {
                var newHTML = $(editorComponentContainer)
                    .find('div').eq(1)
                    .find('.deletehelper').eq(0)
                    .removeClass('deletehelper')
                    .addClass('deleteGalleryItem sfError')
                    .parents('.editor-component').eq(0)[0].outerHTML;

                return newHTML;
            },


            "RemoveBorder": function (editorComponentContainer) {
                var newHTML = $(editorComponentContainer)
                    .find('> div > div.editor-component')
                    .addClass('onhover-border-none');

                return newHTML;
            },

            "SetCustomEvents": function () {

                $('.deleteGalleryItem').off().on('click', function () {
                    var itemToDelete = $(this).parent().parent().parent();
                    var siblingsCount = itemToDelete.siblings().length;

                    if (siblingsCount !== 0) {

                        SageConfirmDialog(' Do you want to delete this item ?').done(function () {
                            $('#numCounterTotal').text(siblingsCount);
                            itemToDelete.remove();
                        });
                    }

                });

            },

            "InitalizeEvents": function ($sender, componentName) {
                var compo = component[componentName];

                if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined") {
                    compo.afterdrop($sender.parent(), $sender, true, false);
                }

            },

            "InitalizeSort": function (ui, componentName) {
                var compo = component[componentName];

                if (typeof compo !== "undefined" && typeof compo.onSort !== "undefined") {
                    compo.onSort(ui, componentName);
                }
            }

        },

        "remove": function ($cloneDOM) { },
    }
,    "google map": {
        "componentname": "google map",
        "category": "advance",
        "icon": "icon icon-gmap",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("googlemapcom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("googlemapbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var googleMapUrl = 'https://www.google.com/maps/embed/v1/';
                        var url = '';
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }

                        function LoadSettings() {
                            var $iframeSrc = $parent.find('iframe');
                            $("#txtMapApiKey").val($iframeSrc.attr("data-key"));
                            var mapType = $iframeSrc.attr("data-type");
                            ChangeType(mapType);
                            $("#slcMapType").val(mapType);
                            $("#txtMapStreet").val($iframeSrc.attr("data-street"));
                            $("#txtMapCity").val($iframeSrc.attr("data-city"));
                            $("#txtMapState").val($iframeSrc.attr("data-state"));
                            $("#txtMapCountry").val($iframeSrc.attr("data-country"));
                            $("#txtMapLongitude").val($iframeSrc.attr("data-longitude"));
                            $("#txtMapLatitude").val($iframeSrc.attr("data-latitude"));
                            $("#slcMapType").trigger("change");
                        }

                        function showViewForm() {
                            $("#divPlace").hide();
                            $("#divLocation").show();
                        }

                        function showPlaceForm() {
                            $("#divLocation").hide();
                            $("#divPlace").show();
                        }

                        function ChangeType(value) {
                            if (value == "place") {
                                showPlaceForm();
                            } else {
                                showViewForm();
                            }
                        }

                        function Events() {
                            $("#slcMapType").on("change", function () {
                                var value = $(this).val();
                                ChangeType(value);
                            });
                            $("#btnGenerateMap").on("click", function () {
                                var apiKey = $("#txtMapApiKey").val();
                                var mapType = $("#slcMapType").val();
                                var type = "";
                                var queryString = '';
                                var mapStreet = '';
                                var mapCity = '';
                                var mapState = '';
                                var mapCountry = '';
                                var longitude = '';
                                var latitude = '';
                                var zoom = 16;
                                var $iframeSrc = $parent.find('iframe');
                                $iframeSrc.attr("data-key", apiKey);
                                $iframeSrc.attr("data-type", mapType);
                                if (mapType == "place") {
                                    type = "place";
                                    mapStreet = $("#txtMapStreet").val().trim();
                                    mapCity = $("#txtMapCity").val().trim();
                                    mapState = $("#txtMapState").val().trim();
                                    mapCountry = $("#txtMapCountry").val().trim();

                                    $iframeSrc.attr("data-street", mapStreet);
                                    $iframeSrc.attr("data-city", mapCity);
                                    $iframeSrc.attr("data-state", mapState);
                                    $iframeSrc.attr("data-country", mapCountry);
                                    $iframeSrc.attr("data-longitude", "");
                                    $iframeSrc.attr("data-latitude", "");
                                    queryString = "q=";
                                    var locationArr = [];
                                    if (mapStreet != "") {
                                        mapStreet = mapStreet.replace(' ', '+');
                                        locationArr.push(mapStreet);
                                    }
                                    if (mapCity != "") {
                                        mapCity = mapCity.replace(' ', '+');
                                        locationArr.push(mapCity);
                                    }
                                    if (mapState != "") {
                                        mapState = mapState.replace(' ', '+');
                                        locationArr.push(mapState);
                                    }
                                    if (mapCountry != "") {
                                        mapCountry = mapCountry.replace(' ', '+');
                                        locationArr.push(mapCountry);
                                    }
                                    queryString = queryString + locationArr.join(',');

                                } else {
                                    type = "view";
                                    longitude = $("#txtMapLongitude").val().trim();
                                    latitude = $("#txtMapLatitude").val().trim();
                                    $iframeSrc.attr("data-street", '');
                                    $iframeSrc.attr("data-city", '');
                                    $iframeSrc.attr("data-state", '');
                                    $iframeSrc.attr("data-country", '');
                                    $iframeSrc.attr("data-longitude", longitude);
                                    $iframeSrc.attr("data-latitude", latitude);
                                    queryString = "center=" + latitude + "," + longitude;
                                    zoom = 10;
                                }
                                url = googleMapUrl + type + "?zoom=" + zoom + "&key=" + apiKey + "&" + queryString;
                                $iframeSrc.attr("src", url);
                            });
                        }
                    }
                },
                "Adjust Height": {
                    "DOM": EasyLibrary.ReadDOM("googlemapheight"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.googleMap');
                        LoadSettings();

                        function LoadSettings() {
                            var rowHeight = $parent.css('height').replace('px', '');

                            function RowHeight(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#goolgeHeightSlider'), $('#goolgeHeightHandle'), 200, 1200, rowHeight, RowHeight, $parent, 'px');
                        }
                        $('#refresGMapHgt').on('click', function () {
                            $parent.css({ 'height': '' });
                            ChangeSliderValue($('#goolgeHeightSlider'), 200);
                        });
                    }
                }

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }
,    "heading": {
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
,    "holder": {
        "componentname": "holder",
        "category": "layout",
        "icon": "icon icon-holder",
        "row": false,
        "hidden": false,
        "type": "element",
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
,    "icon text": {
        "componentname": "icon text",
        "category": "basic",
        "icon": "icon-text-icon-list",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("icontext"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("orderlistbasic"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent().parent();
                        var dataClass = $parent.find('.ListData').attr('data-class');
                        var showIcon = $parent.find('.ListData').attr('data-showicon');

                        $('#OrderedListColumnType').val(dataClass);
                        $('#showListIcon').prop('checked', showIcon);

                        InitEvent();

                        function InitEvent() {
                            $('#OrderedListColumnType').on('change', function () {
                                var $this = $(this);
                                var colClass = $this.val();

                                var dataClass = $parent.find('.ListData').attr('data-class');
                                $parent.find('.ListData').removeClass(dataClass);
                                $parent.find('.ListData').addClass(colClass);
                                $parent.find('.ListData').attr('data-class', colClass);

                            });

                            $('#showListIcon').on('change', function () {
                                var checked = ($(this).prop('checked'));
                                if (checked === true) {
                                    $parent.find('.labelIcon').show();
                                }
                                else {
                                    $parent.find('.labelIcon').hide();
                                }

                                $('#showListIcon').prop('checked', checked);
                                $parent.find('.ListData').attr('data-showicon', checked);
                            });
                        }
                    }
                },
                //yo thapeko 
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent(); //.children().not('div').eq(0);
                    },
                },


              
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM("icontextdatawrap"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleClasses = '';
                        var eleIndex = -1;
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            FormEvent();
                        }

                        function LoadSettings() {
                            var html = '';
                            $(".iconTextDataWrapper").html('');

                            //for changing all font
                            html += '<div class="field-row clearfix">';
                            html += '<div class="multi-col-form-group">';
                            html += '<span class="value field-row">';
                            html += '<i class="in-form-icon fa fa-check " id="resetlabelicon"  data-class="fa-check"></i>';
                            html += '<label >Bulk icon change</label>';
                            html += '</span>';
                            html += '</div>';
                            html += '</div>';

                            html += '<div class="iconTextContentWrapper field-row clearfix">';
                            $parent.find(".iconTextWrap").each(function (index, item) {
                                var $labelText = $(this).find('.labelText').text();
                                var className = $(this).find('i').attr('data-class');
                                var iconClass = $(this).find('i').attr('class');
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<i class="in-form-icon ' + iconClass + ' labelIconEdit" data-class="' + className + '"></i>';
                                html += '<input type="text" class="listLabelText required" value="' + $labelText + '" />';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLabel"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            html += '</div>';
                            $(".iconTextDataWrapper").html(html);
                        }

                        function FormEvent() {
                            LabelSettings();
                            FontIcon();
                            SearchFontIcon();
                            $('#resetlabelicon').on('click', function () {
                                $('.data-row').find('.hideLabelIcon').trigger('click');
                                var fontHtml = '';
                                fontHtml += '<div class="LinkLabelResetIconList" style="display: none;">';
                                fontHtml += EasyLibrary.ReadDOM("linklabelionresetlist");
                                fontHtml += '</div>';
                                if ($(this).parent().find('.LinkLabelResetIconList').length == 0)
                                    $(this).parent().append(fontHtml);

                                FontResetIcon();
                                ResetFontIcon();

                                $(this).parent().find(".LinkLabelResetIconList").show();
                                $('#fontResetIconCollection').find('li').removeClass('selected');
                                $('#fontResetIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');


                            });

                            $("#btnAddMoreLabel").off().on("click", function () {
                                $(".hideLabelIcon").trigger("click");
                                var html = '';
                                var $editHtml = '';
                                var $editParent = $(this).parent().find('.iconTextDataWrapper');

                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var attrClass = $editParent.find('.data-row').eq(0).attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += $editParent.find('.data-row').eq(0).html();
                                    $editHtml += '</div>';
                                    $editParent.find('.iconTextContentWrapper').append($editHtml);

                                    var $viewHtml = '';
                                    $viewHtml += '<li class="iconTextWrap editor-com-outerSpacing-bottom-10">';
                                    $viewHtml += $parent.find('.iconTextWrap').eq(0).html();
                                    $viewHtml += '</li>';
                                    $parent.find('.ListData').append($viewHtml);
                                } else {
                                    var iconClass = 'fa fa-check';
                                    var dataClass = 'fa-check';
                                    var defaultText = 'your text here';
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<i class="in-form-icon ' + iconClass + ' labelIconEdit" data-class="' + dataClass + '"></i>';
                                    html += '<input type="text" class="listLabelText required" value="' + defaultText + '" />';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLabel"></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.find('.iconTextContentWrapper').append(html);

                                    var comHtml = '';
                                    comHtml += '<li class="iconTextWrap editor-com-outerSpacing-bottom-10">';
                                    comHtml += ' <i class="fa onhovercolor labelIcon ' + iconClass + '" style="font-size: 24px; color: rgb(95, 96, 106);" data-class="' + dataClass + '"></i>';
                                    comHtml += ' <label class="labelText" contenteditable="true">' + defaultText + '</label>';
                                    comHtml += '</li>';
                                    $parent.find('.ListData').append(comHtml);
                                }
                                LabelSettings();
                                SettingEvents();
                            });
                        }

                        function FontIcon() {
                            $('#labelfontIconCollection').html(EasyLibrary.FontCollectionList());
                        }

                        function LabelSettings() {
                            $(".deleteLabel").off().on("click", function () {
                                var dataClass = $(this).parent().find('.iconTextWrap').attr('data-class');
                                var index = $('.iconTextContentWrapper').find('.field-row').index($(this).parent().parent().parent());
                                $parent.find('.iconTextWrap').eq(index).remove();
                                $(this).parent().parent().parent().remove();
                            });

                            $(".listLabelText").off().on("blur", function () {
                                var value = $(this).val().trim();
                                var $iconParent = $(this).parent().parent().parent().parent();
                                var index = $iconParent.find('.listLabelText').index($(this));
                                var $comEle = $parent.find('.labelText').eq(index);
                                $comEle.text(value);
                            });

                            $(".labelIconEdit").off().on("click", function () {
                                $('.field-row').find('.hideLabelIcon').trigger('click');

                                var $iconParent = $(this).parent().parent().parent().parent();
                                eleIndex = $iconParent.find('.labelIcon').index($(this));
                                eleClasses = $(this).attr('data-class');

                                if ($(this).parent().find(".LinkLabelIconList").length == 0) {

                                    var fontHtml = '';

                                    fontHtml += '<div class="LinkLabelIconList" style="display: none;">';
                                    fontHtml += EasyLibrary.ReadDOM("linklabelionlist");
                                    fontHtml += '</div>';
                                    $(this).parent().append(fontHtml);

                                }
                                $(this).parent().find(".LinkLabelIconList").show();
                                $('#labelfontIconCollection').find('li').removeClass('selected');
                                $('#labelfontIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');
                                FontIcon();
                                SearchFontIcon();
                            });


                        }

                        function FontResetIcon() {
                            $('#fontResetIconCollection').html(EasyLibrary.FontCollectionList());
                            ResetFontIcon();
                        }

                        function ResetFontIcon() {
                            $('#iconLabelResetSearch').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#fontResetIconCollection').find('li').each(function () {
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
                            $('#fontResetIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');

                                var $bulkIcon = $('.iconTextDataWrapper').find('#resetlabelicon');
                                var dataClass = $bulkIcon.attr('data-class');
                                $bulkIcon.attr('data-class', chooseClass);
                                $bulkIcon.removeClass(dataClass);
                                $bulkIcon.addClass(chooseClass);

                                //var viewIcon = $parent.find('.labelIcon');
                                $parent.find('.ListData').find(".labelIcon").each(function (index, item) {
                                    var dataClass = $(this).attr('data-class');
                                    $(this).attr('data-class', chooseClass);
                                    $(this).removeClass(dataClass);
                                    $(this).addClass(chooseClass);
                                });

                                $('.iconTextDataWrapper .field-row').find('.labelIconEdit').each(function (index, item) {
                                    var dataClass = $(this).attr('data-class');
                                    $(this).attr('data-class', chooseClass);
                                    $(this).removeClass(dataClass);
                                    $(this).addClass(chooseClass);
                                });



                                $('#fontResetIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideLabelIcon").trigger("click");
                            });

                            $(".hideLabelIcon").on("click", function () {
                                $(this).parent().hide();
                            });
                        }

                        function SearchFontIcon() {
                            $('#iconLabelSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#labelfontIconCollection').find('li').each(function () {
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
                            $('#labelfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                var $achorIcon = $parent.find('.labelIcon').eq(eleIndex);
                                var dataClass = $achorIcon.attr('data-class');;
                                var $editIcon = $('.iconTextDataWrapper .data-row').eq(eleIndex).find('.labelIcon');
                                //$editIcon.attr('data-class', chooseClass);
                                $editIcon.removeClass(dataClass);
                                $editIcon.addClass(chooseClass);
                                $achorIcon.attr('data-class', chooseClass);
                                $achorIcon.removeClass(dataClass);
                                $achorIcon.addClass(chooseClass);
                                $('#labelfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideLabelIcon").trigger("click");
                            });

                            $(".hideLabelIcon").on("click", function () {
                                $(this).parent().hide();
                            });
                        }
                    }
                },

                "List-Icon": {
                    "DOM": EasyLibrary.ReadDOM("listfonttab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.labelIcon').eq(0).css('color');
                        var fontWidth = $parent.find('.labelIcon').eq(0).css('font-size').replace('px', '');
                        $('#chooseFontColorForListIcon').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.labelIcon').css('color', objColor.bgColor);
                            }
                        });
                        $('#chooseFontColorForListIcon').colorPicker(colorPickerOption);

                        function ListIconSizeSlider(space) {
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#listfontsizeSlider'), $('#listfontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');
                    }
                },

                "List-Label": {
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
                    },

                },

                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": 0,
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
                        return $elem.parent().parent().parent().find('li');
                    }
                }

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent().parent();
            },
        }
    }
,    "iFrame": {
        "componentname": "iFrame",
        "category": "advance",
        "icon": "fa fa-window-maximize",
        "row": false,
        "hidden": false,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("iFrame/iFrame"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            //if (dropped) {
            var $parent = $appendLayer.find('.iFrameWrap')

            var iframe = $parent.find('iframe');
            var url = iframe.attr('src');
            //$parent.find('.iFrameWrap').css('height', '100%');
            //$parent.attr('style');
            //}
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("iFrame/iFrameBasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $iframeSrc = $parent.find('iframe');
                        var url = $iframeSrc.attr('src');
                        $("#txtiFrameLink").val(url);

                        InitEvent();
                        function InitEvent() {
                            Events();
                            LoadSettingsSize();
                        }
                        function LoadSettingsSize() {
                            var sfiFrameWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            var iFrameWidth = 100;
                            if (sfiFrameWidth !== null) {
                                iFrameWidth = sfiFrameWidth[0].split('_')[1];
                            }

                            function iFrameWidthSlider(space) {
                                var iFrameWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if (iFrameWidthClass !== null) {
                                    $parent.removeClass(iFrameWidthClass[0]).addClass('sfCol_' + space);
                                } else {
                                    $parent.addClass('sfCol_' + space);
                                }
                            }
                            AdvanceSageSlider($('#iFrameBasicWidth'), $('#iFrameBasicWidthHandle'), 1, 100, iFrameWidth, iFrameWidthSlider, $parent, '%');
                            var Height = parseInt($parent.find('.iFrameWrap').css('height').replace('px', ''))
                            function iFrameHeightSlider(space) {
                                $parent.find('.iFrameWrap').css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#iFrameBasicHeight'), $('#iFrameBasicHeightHandle'), 1, 1280, Height, iFrameHeightSlider, $parent, 'px');
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
                        function Events() {
                            $("#txtiFrameLink").on("change", function () {
                                var link = $("#txtiFrameLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the Link", 'Alert');
                                }
                                else {
                                    url = link;
                                    var iframe = '';
                                    iframe += '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '"';
                                    iframe += ' >';
                                    iframe += '</iframe>';

                                    $parent.find(".iFrameWrap").html(iframe);
                                    //$parent.find('.iFrameWrap').css('height', '400px');
                                    //$parent.find('.iFrameWrap').attr('style');
                                }
                            });
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }

,    "image album": {
        "componentname": "image album",
        "category": "pro",
        "icon": "fas fa-images",
        "row": true,
        "hidden": false,
        "collection": false,
        "type": "image album",
        "defaultdata": EasyLibrary.ReadDOM('image album/imageAlbumView'),
        "beforedrop": function ($appendedparent, $appendLayer, dropped) {
            var dom = DOMCreate('div', EasyLibrary.ReadDOM('image album/albumList'), 'sfCol_100');
            FullPagePopup({
                data: dom,
                heading: "Album List",
                showheading: true,
                width: "75%"
            });
            $('#btnAddNewAlbum').on('click', function () {
                $('.fullpage-popup-model-body').append(DOMCreate('div','<h1>Heading</h1>','sfCol_30'));
                //alert('Read garyo ta soltaa!!');

            });
        }
        }
    
,    "image hover": {
        "componentname": "image hover",
        "category": "advance",
        "collection": true,
        "icon": "fa fa-link",
        "row": false,
        "hidden": false,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("imageHoverComp"), //,
        "onDrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            var getLib = GetLibrary("image hover");
            var getActiveClass = getLib.GetActiveClass;
            var setStartupCss = getLib.SetStartupCSS;

            // PRIMARY STATE
            var SetDefaultControlVisilibity = function (imageListBox) {
                setStartupCss(imageListBox);

                switch (getActiveClass(imageListBox)) {

                    case 'data-slidefrom-up': imageListBox.css({ "top": "0", "left": "0" }); break;
                    case 'data-slidefrom-down': imageListBox.css({ "bottom": "0", "left": "0", "top": "" }); break;
                    case 'data-slidefrom-left': imageListBox.css({ "left": "0", "top": "0" }); break;
                    case 'data-slidefrom-right': imageListBox.css({ "right": "0", "top": "0", "left": "" }); break;
                    case 'data-zoom-in': imageListBox.css({ "transform": "scale(1)", "left": "0" }); break;
                    case 'data-zoom-out': imageListBox.css({ "transform": "scale(0.5)", "left": "0" }); break;
                    default: imageListBox.css({ "top": "0", "left": "0" }); break;
                }

            }

            $appendLayer.find('.imageHoverBox').each(function () {

                var $this = $(this);
                SetDefaultControlVisilibity($this);

                $this.parents('imageHoverContainer')
                    .off('mouseenter').mouseenter(function () {

                        var imgHvrBox = $(this).find('.imageHoverBox');
                        imgHvrBox.css({ "opacity": "1", "visibility": "visible" });

                        var activeClass = getActiveClass(imgHvrBox);

                        switch (activeClass) {
                            case 'data-slidefrom-up': imgHvrBox.css({ "top": "0" }); break;
                            case 'data-slidefrom-down': imgHvrBox.css({ "bottom": "0", "top": "" }); break;
                            case 'data-slidefrom-left': imgHvrBox.css({ "left": "0" }); break;
                            case 'data-slidefrom-right': imgHvrBox.css({ "right": "0", "left": "" }); break;
                            case 'data-zoom-in': imgHvrBox.css({ "transform": "scale(1)", "left": "0" }); break;
                            case 'data-zoom-out': imgHvrBox.css({ "transform": "scale(0.5)", "left": "0" }); break;
                            default: break;
                        }

                    }).off('mouseleave').mouseleave(function () {

                        var imgHvrBox = $(this).parent().find('.imageHoverBox');
                        SetDefaultControlVisilibity(imgHvrBox);
                    });

            });


            $appendLayer.find('.dis-table').find('i').off().on("click", function () {

                //$appendLayer.find('.imagehoverIcon').find('div').eq(2).find('i').off().on("click", function () {

                var $this = $(this);
                var displayElement = $this.parents('.imageHoverContainer').find('.editor-image')[0].outerHTML;
                getLib.DisplayContent(displayElement);

            });

        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("imageHoverCompBasicSettings"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();

                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {

                            //debugger;
                            //var linkEffect = $parent.attr('data-linkeffect');

                            //if (linkEffect) $('#slcImageLinkDisplayEffect').val(linkEffect);
                            //else$('#slcImageLinkDisplayEffect').val(0);

                            var isIconHidden = $parent.find('.imagehoverIcon').hasClass('hide-element');
                            if (!isIconHidden)
                                $('#showImageLinkIcon').prop('checked', true);

                            var isImageLinkDetailVisible = $parent.find('.imagehoverDescription').hasClass('hide-element');
                            if (!isImageLinkDetailVisible)
                                $('#showImageLinkDetail').prop('checked', true);


                            var imgHoverBox = $parent.find('.imageHoverBox');
                            var selectedClass = '';
                            imgHoverBox.each(function (i, v) {

                                var $classes = $(this).attr('class').match(/data-(\w+)(-(\w+)){0,1}/g);

                                if ($classes !== null) {
                                    selectedClass = $classes[0];
                                }
                            });
                            if (selectedClass === '') $('#slcImageLinkDisplayEffect').val(0);
                            else $('#slcImageLinkDisplayEffect').val(selectedClass);


                            var imgHvrAction = imgHoverBox.attr('data-imghvraction');

                            if (imgHvrAction) $('#slcImageLinkClickAction').val(imgHvrAction);
                            else $('#slcImageLinkClickAction').val(0);



                        }

                        function TriggerEvents() {

                            $('#refresImageLnkWidth').on('click', function () {
                                $parent.css({ 'height': '' });

                                var $image = $parent.find('img').eq(0);
                                $image.css({ 'height': '' });
                                setTimeout(function () {
                                    var holderheights = $image.height();

                                    ChangeSliderValue($('#imgHoverHeightSlider'), holderheights);
                                }, 500);
                            });

                            var sfImageWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            var imageWidth = 100;
                            if (sfImageWidth !== null) {
                                imageWidth = sfImageWidth[0].split('_')[1];
                            }

                            function ImageWidthSlider(space) {
                                var imageWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);

                                var $img = $parent.find('img');

                                if (imageWidthClass !== null) {
                                    $parent.removeClass(imageWidthClass[0]).addClass('sfCol_' + space);
                                    $img.removeClass(imageWidthClass[0]).addClass('sfCol_' + space);
                                }
                                else {
                                    $parent.addClass('sfCol_' + space);
                                    $img.addClass('sfCol_' + space);
                                }

                            }

                            AdvanceSageSlider($('#imgHoverWidthSlider'), $('#imgHoverWidthHandle'), 1, 100, imageWidth, ImageWidthSlider, $parent, '%');


                            var caroHeight = $parent.height();

                            function ChangeImgLinkHeight(space) {
                                $parent.height(space);
                                $parent.find('img').height(space);
                            }

                            AdvanceSageSlider($('#imgHoverHeightSlider'), $('#imgHoverHeightHandle'), 0, 1000, caroHeight, ChangeImgLinkHeight, $parent, 'px');


                            // IMAGE HOVER EFFECT
                            $('#slcImageLinkDisplayEffect').off().on('change', function () {
                                var selectedEffect = $(this).find("option:selected").val();

                                $parent.attr({ 'data-linkeffect': selectedEffect });

                                $parent.find('.imageHoverContainer').attr({ 'data-linkeffect': selectedEffect });

                                $parent.find('.imageHoverBox').each(function (i, v) {
                                    var $me = $(this);
                                    var $classes = $me.attr('class').match(/data-(\w+)(-(\w+)){0,1}/g);

                                    if ($classes !== null) {
                                        $me.removeClass($classes[0]);
                                    }
                                    $me.addClass(selectedEffect);
                                });
                            });



                            $('#showImageLinkIcon').off().on('click', function () {
                                var isIconChecked = $(this).is(':checked');
                                if (!isIconChecked) {
                                    $parent.find('.imagehoverIcon').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.imagehoverIcon').each(function () {
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#showImageLinkDetail').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    $parent.find('.imagehoverDescription').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.imagehoverDescription').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#slcImageLinkClickAction').off().on('change', function () {
                                var $this = $(this);
                                var selectedAction = $this.find("option:selected").val();

                                var imgHoverWrapper = $this.parents('.imageHoverWrapper');
                                var gotoBox = imgHoverWrapper.find('.imghvrgotobox');
                                if (gotoBox.length !== 0) {
                                    gotoBox.remove();
                                }


                                $parent.find('.imageHoverBox').each(function (i, v) {
                                    $(this).attr({ 'data-imghvraction': selectedAction });
                                });

                                switch (selectedAction) {
                                    case 'imghvraction-goto':
                                        {
                                            //var gotoBox = $this.parents('.imageHoverWrapper').find('.imghvrgotobox').length;

                                            if (gotoBox.length === 0) {
                                                var html = '';
                                                html += '<div class="field-row clearfix imghvrgotobox">';
                                                html += '<div class="field-row clearfix">';
                                                html += '<label>Goto</label>';
                                                html += '<span class="value">';
                                                html += '<input type="text" class="imghvrgoto" value="#" />';
                                                html += '</span>';
                                                html += '</div>';
                                                html += '</div>';

                                                imgHoverWrapper.children().children().last().append(html);
                                            }
                                        }
                                        break;

                                    default: break;

                                }
                            });


                            $(".imghvrgoto").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value === "") value = "#";

                                //var dataClass = $(this).parent().find('.socialLinkIcon').data('class');
                                //var $comEle = $parent.find('.socialAchor[data-class="' + dataClass + '"]');
                                //$comEle.attr("href", value);
                            });


                        }


                    }
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
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    },
                },


                "Box Shadow":
                {
                    "options": {

                    }
                },

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },

        },
        "view": {
            "view": function () {
                var displayContent = this.library.DisplayContent;

                var GetActiveClass = function (imageListBox) {

                    var activeClass = '';

                    var regex = /data-(\w+)(-(\w+)){0,1}/g;
                    var $classes = imageListBox.attr('class').match(regex);
                    if ($classes !== null) {
                        activeClass = $classes[0];
                    }

                    return activeClass;
                }


                var SetDefaultControlVisilibity = function (imageListBox) {

                    imageListBox
                        .css({
                            "position": "absolute",
                            "height": "100%",
                            "width": "100%",
                            "transition": "all .4s ease",
                            "opacity": "0",
                            "visibility": "hidden",
                            //"overflow": "hidden"
                        })


                    switch (GetActiveClass(imageListBox)) {

                        //switch (GetActiveClass(imageListBox)) {

                        case 'data-slidefrom-up': imageListBox.css({ "top": "-100%", "left": "0" }); break;
                        case 'data-slidefrom-down': imageListBox.css({ "bottom": "-100%", "left": "0" }); break;
                        case 'data-slidefrom-left': imageListBox.css({ "left": "-100%", "top": "0" }); break;
                        case 'data-slidefrom-right': imageListBox.css({ "right": "-100%", "top": "0", "left": "" }); break;
                        case 'data-zoom-in': imageListBox.css({ "transform": "scale(0.5)", "left": "0" }); break;
                        case 'data-zoom-out': imageListBox.css({ "transform": "scale(1)", "left": "0" }); break;
                        default: break;
                    }

                }
                var imageHoverContainer = $('.imgHoverImage').parent();

                imageHoverContainer.css({ "overflow": "hidden" });


                var imageHoverBox = imageHoverContainer.find('.imageHoverBox');

                imageHoverBox.each(function () {

                    SetDefaultControlVisilibity($(this));
                });

                imageHoverContainer.off('mouseenter').mouseenter(function () {

                    var imgHvrBox = $(this).find('.imageHoverBox');
                    imgHvrBox.css({ "opacity": "1", "visibility": "visible" });

                    switch (GetActiveClass(imgHvrBox)) {
                        case 'data-slidefrom-up': imgHvrBox.css({ "top": "0" }); break;
                        case 'data-slidefrom-down': imgHvrBox.css({ "bottom": "0", "top": "" }); break;
                        case 'data-slidefrom-left': imgHvrBox.css({ "left": "0" }); break;
                        case 'data-slidefrom-right': imgHvrBox.css({ "right": "0", "left": "" }); break;
                        case 'data-zoom-in': imgHvrBox.css({ "transform": "scale(1)" }); break;
                        case 'data-zoom-out': imgHvrBox.css({ "transform": "scale(0.5)" }); break;
                        default: imgHvrBox.css({ "top": "0", "left": "0" }); break;

                    }

                }).off('mouseleave').mouseleave(function () {
                    var imgHvrBox = $(this).parent().find('.imageHoverBox');
                    SetDefaultControlVisilibity(imgHvrBox);
                });


                //imageHoverContainer.find('.imagehoverIcon').find('> div').eq(2).find('> i').off().on("click", function () {
                //imageHoverContainer.find('.imagehoverIcon').find('div').eq(2).find('i').off().on("click", function () {
                imageHoverContainer.find('.dis-table').find('i').off().on("click", function () {
                    var $this = $(this);
                    var displayElement = $this.parents('.imageHoverContainer').find('.editor-image')[0].outerHTML;

                    displayContent(displayElement);

                });


            },

            "library": {

                "GetActiveClass": function (imageListBox) {
                    var activeClass = '';

                    var regex = /data-(\w+)(-(\w+)){0,1}/g;
                    imageListBox.each(function (i, v) {
                        var $me = $(this);
                        var $classes = $me.attr('class').match(regex);
                        if ($classes !== null) {
                            activeClass = $classes[0];
                        }
                    });
                    return activeClass;
                },

                "SetStartupCSS": function (imageListBox) {
                    imageListBox
                        .css({
                            "position": "absolute",
                            "height": "100%",
                            "width": "100%",
                            "transition": "all .4s ease",
                        })
                    $('.imageHoverButton').css({ "cursor": "pointer" });


                },

                "SetSliderPrimaryState": function (activeClass, imgHvrBox) {
                    switch (activeClass) {

                        case 'data-slidefrom-up': imgHvrBox.css({ "top": "-100%", "left": "0" }); break;
                        case 'data-slidefrom-down': imgHvrBox.css({ "bottom": "-100%", "left": "0", "top": "" }); break;
                        case 'data-slidefrom-left': imgHvrBox.css({ "left": "-100%", "top": "0" }); break;
                        case 'data-slidefrom-right': imgHvrBox.css({ "right": "-100%", "top": "0", "left": "" }); break;
                        case 'data-zoom-in': imgHvrBox.css({ "transform": "scale(0.5)", "left": "0", "top": "" }); break;
                        case 'data-zoom-out': imgHvrBox.css({ "transform": "scale(1)", "left": "0", "top": "" }); break;
                        default: imgHvrBox.css({ "left": "0", "top": "" }); break;
                    }
                },

                "DisplayContent": function ($content) {
                    FullPagePopup({
                        data: '<div class="sfCol_100" >' + $content + '</div>',
                        heading: "Preview",
                        height: '90%',
                        width: '90%',
                        showheading: true,
                        onappend: function ($wrapper) {
                            $wrapper.find('img').css({ "height": "auto", "width": "100%" });
                        }
                    });


                }

            }
        },

        "remove": function ($cloneDOM) {

            var getLib = GetLibrary("image hover");
            var setStartupCss = getLib.SetStartupCSS;
            var setSliderPrimaryState = getLib.SetSliderPrimaryState;

            var imageHoverBoxes = $cloneDOM.find('.imageHoverBox');

            imageHoverBoxes.each(function (i, v) {
                var $me = $(this);


                var activeClass = '';
                var $classes = $me.attr('class').match(/data-(\w+)(-(\w+)){0,1}/g);
                if ($classes !== null) {
                    activeClass = $classes[0];
                }


                setStartupCss($me);
                $me.css({ "visibility": "hidden" });
                setSliderPrimaryState(activeClass, $me);

            });


        },

    }
,    "image slider": {
        "componentname": "image slider",
        "category": "advance",
        "icon": "icon icon-img-slider",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "carousel",
        "defaultdata": EasyLibrary.ReadDOM("carouseldata"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped, duplicated) {

            if ($appendLayer.hasClass('site-body')) {
                var $imageSlider = $('.ImageSliderWrapper');
                $imageSlider.removeClass('binded');
                $imageSlider.each(function (index, value) {
                    var carousel = new CarouselInit($(this));
                });
            } else {
                $appendLayer.find('.ImageSliderWrapper').removeClass('binded');
                var carousel = new CarouselInit($appendLayer);
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": "<span>Hello</span>",
                    "onload": function ($item) {

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
,    "image": {
        "componentname": "image",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-img-1",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        "defaultdata": DOMCreate('div', '<img src="' + webbuildermodulepath + '/img/def5.jpg"  class="editor-image sfCol_100" />' + EasyLibrary.ReadDOM("imageoption"), 'editor-component image sfCol_100'),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped)
                $appendLayer.find('.image-settings').trigger('click');
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
                        LoadSettings();
                         
                        function LoadSettings() {
                            ImageDisplay();
                            ImageWidthEvent();
                            ImageBorder();
                            ImageFitCover();
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
                        return $elem.parent().parent().parent(); //.children().not('div').eq(0);
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
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                }
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
        }
    }
,    "line chart": {
        "componentname": "line chart",
        "category": "advance",
        "icon": "fa fa-line-chart",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "graph",
        "defaultdata": EasyLibrary.ReadDOM('linechart/linechartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('linechart/linechartbasicsettings'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.lineTitle').css('color');
                        var lineAxesColor = $parent.find('.lineChartWrapper').attr('data-lineaxescolor');
                        var lineColor = $parent.find('.lineChartWrapper').attr('data-linecolor');
                        var lineFontColor = $parent.find('.lineChartWrapper').attr('data-linefontcolor');
                        var lineTitle = $parent.find('.lineTitle').text();
                        var chartScale = $parent.find('.lineChartWrapper').attr('data-scale');


                        $('#ddlLineChartScaling').val(chartScale);
                        $("#txtLineChartTitle").val(lineTitle);


                        $('#chooseLinetitleColor').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineTitle').css('color', objColor.bgColor);
                            }
                        });
                        $('#chooseLinetitleColor').colorPicker(colorPickerOption);


                        $("#txtLineChartTitle").off().on("blur", function () {
                            var value = $(this).val().trim();
                            var $elm = $parent.find('.lineTitle');
                            $elm.text(value);
                        });

                        $('#chooseAxesLineColor').css('background-color', lineAxesColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-lineaxescolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseAxesLineColor').colorPicker(colorPickerOption);

                        $('#chooseLineColor').css('background-color', lineColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-linecolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseLineColor').colorPicker(colorPickerOption);

                        $('#chooseLineFontColor').css('background-color', lineFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-linefontcolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseLineFontColor').colorPicker(colorPickerOption);



                        var fontWidth = $parent.find('.lineChartWrapper').attr('data-linefontsize').replace('px', '');

                        function ListIconSizeSlider(space) {
                            $parent.find('.lineChartWrapper').attr('data-linefontsize', space);
                            component['line chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#linefontsizeSlider'), $('#linefontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');


                        var lineTitlefontWidth = $parent.find('.lineTitle').css('font-size').replace('px', '');

                        function LineTitleSizeSlider(space) {
                            $parent.find('.lineTitle').css('font-size', space);
                        }
                        AdvanceSageSlider($('#linetitlesizeSlider'), $('#linetitlesizeHandle'), 10, 40, lineTitlefontWidth, LineTitleSizeSlider, $parent, 'px');


                        $('#ddlLineChartScaling').on('change', function () {
                            var val = $(this).val();
                            $parent.find('.lineChartWrapper').attr('data-scale', val);
                            component['line chart'].afterdrop($parent.parent(), $parent);

                        });


                    }
                },
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM('linechart/linechartdatawrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleIndex = -1;

                        var $lineChartWrapper = $parent.find('.lineChartWrapper');
                        var lineData = $lineChartWrapper.attr('data-value');

                        var lineDataArray = JSON.parse(lineData);

                        LoadData();
                        InitLineEvents();
                        InitAddMoreLineEvent();

                        function LoadData() {
                            var html = '';
                            $("#lineChartEditWrapper").html('');

                            //for changing all font



                            $.each(lineDataArray, function (index, item) {
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<input type="text" maxlength="15" class="indLineName" value="' + item.name + '"/>';
                                html += '<input type="text" class="sml-box indLineValue" value="' + item.value + '"/>';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#lineChartEditWrapper").html(html);

                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    lineDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.chooseLineFontColor').colorPicker(colorPickerOption);

                        }


                        function InitLineEvents() {

                            $("#lineChartEditWrapper .indLineName").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                lineDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#lineChartEditWrapper .indLineValue").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    lineDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', lineDataArray[dataIndex].value);
                                    $(this).val(lineDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', lineDataArray[dataIndex].value);
                                    $(this).val(lineDataArray[dataIndex].value);
                                } else {
                                    lineDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#lineChartEditWrapper").off().on('click', '.deleteLine', function () {
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                lineDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            });

                        }

                        function InitAddMoreLineEvent() {
                            $("#btnAddMoreLineData").off().on("click", function () {
                                var html = '';
                                var $editParent = $(this).parent().find('#lineChartEditWrapper');



                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = lineDataArray[0];
                                    var itemCount = lineDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="multi-col-form-group">';
                                    $editHtml += '<span class="value">';
                                    $editHtml += '<input maxlength="15" class="indLineName valid" value="' + duplicateData.name + '" aria-invalid="false" type="text">';
                                    $editHtml += '<input class="sml-box indLineValue" value="' + duplicateData.value + '" type="text">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine"></i>';
                                    $editHtml += '</span>';
                                    $editHtml += '</div>';
                                    $editHtml += '</div>';
                                    $editParent.append($editHtml);


                                    var newData = {
                                        "id": itemCount + 1,
                                        "name": duplicateData.name,
                                        "value": duplicateData.value,
                                        "color": duplicateData.color
                                    };

                                    lineDataArray.push(newData);
                                } else {
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<input maxlength="15" class="indLineName valid" value="data 1"  aria-invalid="false" type="text">';
                                    html += '<input class="sml-box indLineValue" value="10" type="text">';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine" ></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.append(html);

                                    var defaultData = {
                                        "id": 1,
                                        "name": "data 1",
                                        "value": 10,
                                        "color": "#A55CA5"
                                    };
                                    lineDataArray.push(defaultData);
                                }

                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                component['line chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        lineDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(lineDataArray);
                                        $lineChartWrapper.attr('data-value', jsonData);
                                        component['line chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.chooseLineFontColor').colorPicker(colorPickerOption);


                                InitLineEvents();
                            });
                        }
                    }
                }
            }
        },
        "onsort": function (ui) {
            this.view.view();
        },
        "view": {
            "view": function () {
                var myCanvasList = document.querySelectorAll(".lineCanvas");
                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;

                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = 350 / parentWidth * parentWidth;
                        myCanvas.width = parentWidth * 0.75;

                        var lineColor = item.parentNode.getAttribute('data-linecolor');
                        var lineaxesColor = item.parentNode.getAttribute('data-lineaxescolor');
                        var lineFontColor = item.parentNode.getAttribute('data-linefontcolor');
                        var lineFontSize = item.parentNode.getAttribute('data-linefontsize');
                        //console.log(barFontSize);
                        var lineChartData = item.parentNode.getAttribute('data-value');
                        var lineData = JSON.parse(lineChartData);
                        var lineScaleFactor = item.parentNode.getAttribute('data-scale');
                        //alert(JSON.stringify(barData));


                        var ctx = myCanvas.getContext("2d");

                        _this.library.LineChart({
                            canvas: myCanvas,
                            seriesName: "Line Chart",
                            padding: 20,
                            gridScale: lineScaleFactor,
                            lineColor: lineColor,
                            lineaxesColor: lineaxesColor,
                            lineFontColor: lineFontColor,
                            data: lineData,
                            lineFontSize: lineFontSize
                        });
                    });
                }
            },
            "library": {
                "DrawLine": function (ctx, startX, startY, endX, endY, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                    ctx.restore();
                },

                "LineChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    var _this = this;
                    this.draw = function () {
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            maxValue = Math.max(maxValue, categ.value);
                            maxWidth = Math.max(maxWidth, _this.ctx.measureText(categ.name).width);
                        });
                        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
                        var canvasActualWidth = this.canvas.width - this.options.padding * 2;

                        //drawing the grid lines
                        var gridValue = 0;
                        var entered = 0;
                        while (gridValue <= maxValue) {
                            entered++;
                            var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;

                            //x-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                gridY,
                                this.canvas.width,
                                gridY,
                                this.options.lineaxesColor
                            );

                            //y-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                0,
                                0,
                                gridY,
                                this.options.lineaxesColor
                            );

                            //writing grid markers
                            this.ctx.save();

                            gridValue += parseInt(this.options.gridScale);
                        }

                        //drawing the lines
                        var lineIndex = 0;
                        var numberOfLines = this.options.data.length;
                        var lineSize = (canvasActualWidth) / numberOfLines;

                        var textWidth = 0;


                        _this.ctx.beginPath();
                        _this.ctx.strokeStyle = _this.options.lineColor;


                        $.each(this.options.data, function (index, categ) {
                            var val = categ.value;
                            var lineHeight = Math.round(canvasActualHeight * val / maxValue);

                            var xaxis = _this.options.padding + lineIndex * lineSize;
                            var yaxis = _this.canvas.height - lineHeight - _this.options.padding;

                            _this.ctx.lineTo(xaxis, yaxis);
                            _this.ctx.stroke();

                            textWidth = _this.ctx.measureText(categ.name).width;
                            var valueWidth = _this.ctx.measureText(categ.value).width;
                            _this.ctx.fillStyle = _this.options.lineFontColor;
                            var fontSize = _this.options.lineFontSize;
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(categ.name, (xaxis + 15) - textWidth / 2, _this.canvas.height);
                            _this.ctx.fillText(val, xaxis - 5, _this.canvas.height - lineHeight - 30);

                            lineIndex++;
                        });



                    }

                    this.draw();
                }
            }
        }
    }
,    "logo slider": {
        "componentname": "logo slider",
        "category": "advance",
        "icon": "icon icon-img-slider",
        "row": false,
        "hidden": false,
        "type": "carousel",
        "defaultdata": EasyLibrary.ReadDOM("logoslider/logoslider"),
        "onDrop": function ($appendLayer) { },

        "onsort": function (ui) {

            var sliderContainer = ui.find('.LogoSliderWrapper');
            sliderContainer.removeClass('binded');
            var carousel = new CarouselInit(sliderContainer);
        },

        "loadSetting": function ($item) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            var sliderContainer = $appendLayer.find('.LogoSliderWrapper');
            if (dropped) {


                var sliderLib = this.view.library;
                sliderLib.ReAssignViewItems(sliderContainer);
                this.common.InitalizeEvents(sliderContainer, sliderContainer.attr('data-type'));
                sliderContainer.removeClass('binded');
                var carousel = new CarouselInit(sliderContainer);
                this.view.library.SetCustomEvents();
                SettingEvents();
            }
            else {
                sliderContainer.removeClass('binded');
                sliderContainer.each(function () {
                    var $this = $(this);
                    var carousel = new CarouselInit($this);
                });
            }

        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("logoslider/logosliderbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var sliderContainer = $parent.find('.LogoSliderWrapper');
                        var sliderHeading = $parent.find('.sliderHeading');
                        var navigationArrows = $parent.find('.arrows-wrapper');

                        var pagerDot = $parent.find('.pager-dot');

                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {

                            var perView = sliderContainer.attr('data-itemsperview');
                            if (!perView) perView = "3";

                            if ($parent.hasClass('fullpagebanner')) {
                                $('#heightAdjustCarousel').prop('checked', true);
                            } else {
                                $('#heightAdjustCarousel').prop('checked', false);
                            }

                            $('#slcSliderItemsPerView').val(perView);
                            $('#slcSliderAnimation').val(sliderContainer.parent().attr('data-transition'));

                            var loop = sliderContainer.parent().attr('data-loop');
                            if (typeof loop !== "undefined" && loop.length > 0)
                                $('#sliderAutoSlide').prop('checked', true);


                            SetToggleValueBasedOnHideElement(sliderHeading, '#showSliderHeading');
                            SetToggleValueBasedOnHideElement(navigationArrows, '#showNavigationalArrows');
                            SetToggleValueBasedOnHideElement(pagerDot, '#showSliderDots');

                            function ChangeCaroselHeight(space) {
                                $parent.children().eq(2).height(space);
                            }

                            function ChangeItemsHeight(space) {

                                var childItems = sliderContainer.find('.itemWrapper').children();

                                childItems.each(function (index) {
                                    $(this).find('img').height(space);
                                });
                            }


                            var firstItemHeight = sliderContainer.find('.itemWrapper').children().first().height();

                            AdvanceSageSlider($('#logoSliderHeightSlider'), $('#logoSliderHeightHandle'), 0, 1000, $parent.children().eq(2).height(), ChangeCaroselHeight, $parent, 'px');
                            AdvanceSageSlider($('#logoSliderItemHeightSlider'), $('#logoSliderItemHeightHandle'), 0, 1000, firstItemHeight, ChangeItemsHeight, $parent, 'px');

                        }

                        function TriggerEvents() {
                            var gutterSpaceControl = $('#sliderHvrGutterSpace');

                            var horGutterSpace = sliderContainer.attr('data-horzspacing');

                            var currentMarginRight = 0;
                            if (!horGutterSpace) currentMarginRight = 0; else currentMarginRight = horGutterSpace;

                            var sliderLib = component["logo slider"]["view"]["library"];
                            var changeRightSpace = sliderLib.ChangeRightSpacing;

                            function ReDefineGutter(space, $par) {
                                changeRightSpace(space, $par, '.LogoSliderWrapper', '.itemWrapper');
                            }

                            AdvanceSageSlider($('#sliderHorGutterSpaceSlider'), $('#sliderHorGutterSpaceHandle'), gutterSpaceControl.data('slidemin'), gutterSpaceControl.data('slidemax'), currentMarginRight, ReDefineGutter, $parent, 'px');

                            function ReAssignLiItems(count, $par) {
                                sliderLib.ReAssignViewItems(sliderContainer, count);
                            }

                            var currentTotal = sliderContainer.find('.itemWrapper').children().length;

                            EasyLibrary.NumberCounter($('.manualNumCounter'), 1, 50, 1, currentTotal, $parent, ReAssignLiItems);


                            $('#sliderAutoSlide').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    sliderContainer.parent().attr('data-loop', "loop");
                                } else {
                                    sliderContainer.parent().attr('data-loop', "");
                                }
                                sliderContainer.removeClass('binded');
                                InitCarouselSlider(sliderContainer);
                            });


                            $('#heightAdjustCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('fullpagebanner');
                                    AdjustSizeFullpage($parent);
                                } else {
                                    RemoveCarouselHeight($parent);
                                    $parent.removeClass('fullpagebanner');
                                }
                            });

                            $('#slcSliderItemsPerView').off().on('change', function () {
                                var totalRequired = $('.totalNumCount').text();
                                sliderLib.ReAssignViewItems(sliderContainer, totalRequired);

                                SettingEvents();

                            });

                            $('#slcSliderAnimation').off().on('change', function () {

                                var transition = $(this).find('option:selected').text().toLowerCase();

                                sliderContainer.parent().attr('data-transition', transition);

                                sliderContainer.removeClass('binded');
                                InitCarouselSlider(sliderContainer);
                            });

                            SetEventToShowHideElement($item, $('#showSliderHeading'), sliderHeading);
                            SetEventToShowHideElement($item, $('#showNavigationalArrows'), navigationArrows);
                            SetEventToShowHideElement($item, $('#showSliderDots'), pagerDot);

                        }
                    }
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
                return $elem.parent().parent();

                //$(".editor-row").removeClass("activeSetting");
                //var $parent = $elem.parents(".editor-row");
                //$parent.addClass("activeSetting");
                //return $parent;
            },
        },

        "view": {
            "view": function () {

                var windowWidth = $(window).width();
                var $container = $('.LogoSliderWrapper');

                $container.removeClass('binded');

                $container.each(function () {
                    var $this = $(this);
                    var carousel = new CarouselInit($this);
                });

                if (windowWidth < 480) {
                    this.library.ReDrawSliderItems($container, 1, true);
                }
                else if (windowWidth > 480 && windowWidth < 768) {
                    this.library.ReDrawSliderItems($container, 2, true);
                }

            },

            "library": {

                "ReAssignViewItems": function ($container, $newtotalItems) {
                    var currentCount = 0;
                    var dataType = $container.attr('data-type');

                    var $totalItems = parseInt($container.attr('data-totalcount'));
                    var $perView = parseInt($container.attr('data-itemsperview'));

                    var liItem = $container.find('.itemWrapper'); // CHECK FOR EXISTING ITEMS

                    if (liItem.length <= 0) {
                        // IF FIRST TIME
                        var itemsWrapper = $container.find('.itemsWrapper');

                        var updatedDefaultData = this.FindReplaceDeleteHelper(component[dataType].defaultdata);
                        updatedDefaultData = this.DisableDragging(updatedDefaultData);
                        updatedDefaultData = this.EnableComponentSettings(updatedDefaultData);
                        var compHTML = '<div class="editor-com-outerSpacing-left-0 editor-com-outerSpacing-right-0 editor-com-outerSpacing-bottom-0 editor-com-outerSpacing-top-0 sfFixed editor-com-innerSpacing-top-0 editor-com-innerSpacing-right-0 editor-com-innerSpacing-bottom-0 editor-com-innerSpacing-left-0"> ' + updatedDefaultData + '</div>';

                        this.UpdateWidthAttribute($container, $perView);

                        var itemsAdded = 0;
                        while (itemsAdded !== $totalItems) {
                            var itemHTML = '';
                            for (var i = 0; i < $perView; i++) {
                                itemHTML += compHTML;
                                itemsAdded++;
                            }
                            itemsWrapper.append('<li class="itemWrapper">' + itemHTML + '</li>');
                        }

                        var space = $container.attr('data-horzspacing');
                        if (!space) space = 0;
                        this.ChangeRightSpacing(space, $container.parent(), '.LogoSliderWrapper', '.itemWrapper');
                        this.SetCustomEvents();

                    } else {

                        var newPerView = $('#slcSliderItemsPerView').find("option:selected").text();
                        var itemsPerView = parseInt(newPerView);

                        //var liChildren = liItem.children();

                        if (itemsPerView !== $perView) { // [ ITEMS PER VIEW CHANGE ]
                            this.ReDrawSliderItems($container, itemsPerView, false);
                        }
                        else {
                            var liChildren = liItem.children();
                            var currentItemsCount = liChildren.length;

                            var totalItems = parseInt($newtotalItems);

                            var addComponent = true;
                            var itemDiff = Math.abs(currentItemsCount - totalItems);
                            if (totalItems < currentItemsCount) addComponent = false;

                            if (!addComponent) { // REMOVE COMPONENT

                                SageConfirmDialog(' Taking this step will result in some data loss. Do you wish to continue ?').done(function () {

                                    var lastli = liItem.last(); // liItem.eq(liItem.length - 1);
                                    lastli.children().last().remove()

                                    if (lastli.children().length <= 0) {
                                        liItem.last().remove();
                                        $container.removeClass('binded');
                                        InitCarouselSlider($container);
                                    }

                                }).fail(function () {
                                    $('#numCounterTotal').html($container.find('.itemWrapper').children().length);
                                });

                            }
                            else {  // ADD COMPONENT
                                var itemCopy = liChildren.eq(0).clone(true);
                                var lastliItem = liItem.last();
                                if (lastliItem.children().length < $perView) { // LESS THAN REQUIRED
                                    lastliItem.append(itemCopy);
                                    component["logo slider"]["common"].InitalizeEvents($container, $container.attr('data-type'));
                                } else {
                                    // [ ADD NEW LI ITEM ( REQUIRES RE-INIT ) ]
                                    $container.find('.itemsWrapper').append('<li class="itemWrapper"></li>');
                                    $container.find('.itemWrapper').last().append(itemCopy);
                                    $container.removeClass('binded');
                                    InitCarouselSlider($container);
                                    component["logo slider"]["common"].InitalizeEvents($container, $container.attr('data-type'));
                                }

                            }


                        }

                        $container.attr('data-itemsperview', newPerView);

                        this.UpdateWidthAttribute($container, itemsPerView);

                        var horizonalGutterSpace = $('#sliderHorGutterSpaceHandle').text();
                        this.ChangeRightSpacing(horizonalGutterSpace, $container.parent(), '.LogoSliderWrapper', '.itemWrapper');

                    }
                },

                "ReDrawSliderItems": function ($container, itemsPerView, isView) {

                    var liItem = $container.find('.itemWrapper'); // CHECK FOR EXISTING ITEMS

                    var liChildren = liItem.children();

                    var liChildrenhtmlArray = [];
                    liChildren.each(function () {
                        liChildrenhtmlArray.push($(this)[0].outerHTML);
                    });

                    var itemsWrapper = $container.find('.itemsWrapper');
                    itemsWrapper.empty();

                    var childCount = liChildrenhtmlArray.length;

                    var itemsAdded = 0;

                    while (itemsAdded < childCount) {
                        var itemHTML = '';
                        for (var i = 0; i < itemsPerView; i++) {

                            if (liChildrenhtmlArray.length === itemsAdded) break;
                            itemHTML += liChildrenhtmlArray[itemsAdded];
                            itemsAdded++;
                        }
                        itemsWrapper.append('<li class="itemWrapper">' + itemHTML + '</li>');
                    }

                    $container.removeClass('binded');
                    InitCarouselSlider($container);

                    if (typeof isView !== "undefined" && !isView) {
                        SettingEvents();
                        GetLibrary("logo slider").SetCustomEvents();
                    }
                },

                "FindReplaceDeleteHelper": function (editorComponentContainer) {

                    var newHTML = $(editorComponentContainer)
                        .find('div').eq(1)
                        .find('.deletehelper').eq(0)
                        .removeClass('deletehelper')
                        .addClass('deleteSliderItem sfError')
                        .parents('.editor-component').eq(0)[0].outerHTML;

                    return newHTML;
                },

                "DisableDragging": function (editorComponentContainer) {

                    var newHTML = $(editorComponentContainer)
                      .find('div').eq(0)
                      .find('.icon-icon-drag').eq(0)
                      .removeClass('icon-icon-drag')
                      .removeClass('sortComponent')

                      .parents('.editor-component').eq(0)[0].outerHTML;

                    return newHTML;
                },

                "SetCustomEvents": function () {

                    var redrawItem = this.ReDrawSliderItems;
                    $('.deleteSliderItem').off().on('click', function () {

                        var itemToDelete = $(this).parent().parent().parent();
                        var $container = itemToDelete.parents('.LogoSliderWrapper');

                        var perView = $container.attr('data-itemsperview');
                        if (!perView) perView = "3";

                        var itemsPerView = parseInt(perView);

                        var liItem = $container.find('.itemWrapper'); // CHECK FOR EXISTING ITEMS
                        var liChildren = liItem.children();
                        var siblingsCount = liChildren.length;


                        if (siblingsCount !== 0) {

                            SageConfirmDialog(' Do you want to delete this item ?').done(function () {
                                $('#numCounterTotal').text(siblingsCount);
                                itemToDelete.remove();

                                redrawItem($container, itemsPerView, false);
                                // RE INIT ITEMS
                            });
                        }

                    });

                },

                "EnableComponentSettings": function (editorComponentContainer) {
                    var newHTML = $(editorComponentContainer).addClass('options-display-inside')[0].outerHTML;
                    return newHTML;
                },

                "UpdateWidthAttribute": function ($sliderContainer, newColCount) {
                    var widthPercentage = "";
                    switch (newColCount) {
                        case 2: widthPercentage = "50%"; break;
                        case 3: widthPercentage = "33%"; break;
                        case 4: widthPercentage = "25%"; break;
                        case 5: widthPercentage = "20%"; break;
                        case 1: widthPercentage = "100%"; break;
                    }
                    $sliderContainer.attr('data-colwidth', widthPercentage);
                },

                "ChangeRightSpacing": function (space, $mainWrapperParent, $mainWrapperID, $effectedItemsParentID) {

                    if (space !== 'undefined' && typeof (space) !== 'undefined') {
                        var times = 5;
                        var itemsContainer = $mainWrapperParent.find($effectedItemsParentID);
                        var childComp = itemsContainer.children();

                        var marginRightClass = childComp.attr('class').match(/editor-com-outerSpacing-right-[0-9]{1,3}/g);
                        var marginLeftClass = childComp.attr('class').match(/editor-com-outerSpacing-left-[0-9]{1,3}/g);

                        if (marginRightClass !== null) {

                            var mainWrapper = $mainWrapperParent.find($mainWrapperID);

                            childComp.each(function () {
                                var $me = $(this);
                                $me.removeClass(marginRightClass[0].trim());
                                $me.removeClass(marginLeftClass[0].trim());
                            });

                            var compOuterSpace = space * times;


                            var className = '';
                            var leftSpaceClassName = '';
                            if (space >= 0) {
                                className = 'editor-com-outerSpacing-right-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-left-' + compOuterSpace;
                            }
                            else {
                                space = Math.abs(space);
                                className = 'editor-com-outerSpacing-right-neg-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-left-neg-' + compOuterSpace;

                            }

                            childComp.addClass(className);
                            childComp.addClass(leftSpaceClassName);
                            childComp.addClass('display-inline-block');
                            var widthPercentage = mainWrapper.attr('data-colwidth');

                            mainWrapper.attr('data-horzspacing', space);
                            var newWidthAttr = "calc(" + widthPercentage + " - " + (compOuterSpace * 2) + "px)";
                            childComp.each(function (i, v) {
                                var $me = $(this);
                                $me.css(
                                    {
                                        "width": newWidthAttr,
                                        "float": "left"
                                    });
                            });
                        }


                    }

                },

            }

        },

        "common": {

            "InitalizeEvents": function ($sender, componentName) {

                var compo = component[componentName];
                if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined") {
                    compo.afterdrop($sender.parent(), $sender, true, false);
                }
            },

        },

    }
,    "managepages": {
        "componentname": "managepages",
        "category": "page",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "hidden",
        "defaultdata": '',
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Pages": {
                    "DOM": EasyLibrary.ReadDOM("sitemenupages"),
                    "onload": function ($item) {
                        var $parent = $('.editor-site-header');
                        InitEvents();

                        function InitEvents() {
                            ClearPageError();
                            $('#pageAddPanel').on('click', function () {
                                ClearPageError();
                                $('#pageCreateArea').attr('data-pageid', 0);
                                $('#pageCreateArea').attr('data-webbuilderid', 0);
                                $('#pageCreateArea').show();
                                $('#pageListArea').hide();
                                $('#hdnPageID').val('');
                                $('#txtPageName').val('');
                                $('#txtPageTitle').val('');
                                $('#txtPageDescription').val('');
                            });
                            $('#btnCancelPageAdd').on('click', function () {
                                $('#pageCreateArea').attr('data-pageid', 0);
                                $('#pageCreateArea').hide();
                                $('#pageListArea').show();
                                ClearPageError();
                            });
                            $('#btnSavePage').on('click', function () {
                                var $pageName = $('#txtPageName');
                                var $title = $('#txtPageTitle');
                                var $description = $('#txtPageDescription');
                                var pageName = $pageName.val().trim();
                                var pageID = parseInt($('#pageCreateArea').attr('data-pageid'));
                                var webbuilderID = parseInt($('#pageCreateArea').attr('data-webbuilderid'));
                                var description = $description.val().trim();
                                var title = $title.val().trim();
                                if (pageName.length == 0) {
                                    SetPageError("PageName can't be empty");
                                } else {
                                    if (!ValidatePageName(pageName)) {
                                        SetPageError("PageName not accepted");
                                    } else if (CheckDuplicate(pageName, pageID)) {
                                        SetPageError("PageName duplicated");
                                    } else {
                                        description = description.length == 0 ? pageName : description;
                                        title = title.length == 0 ? pageName : title;
                                        var pageIDs = AddUpdatePage(pageID, pageName, '', title, description, webbuilderID);
                                        var newPageID = pageIDs.pageID;
                                        var oldPageName = currentpageName;
                                        if (newPageID == 0) {
                                            SetPageError("PageName Already Exists.");
                                            return false;
                                        } else if (newPageID > 0) {
                                            currentpageName = pageName;
                                            if (pageID == newPageID) { //updated
                                                var $li = $('li[data-pageid="' + newPageID + '"]');
                                                $li.find(' >a > .pageName').text(pageName);
                                                $li.find('> a').attr('href', SageFrameHostURL + '/' + pageName.replace(/ /g, '-'));
                                                var $div = $('div[data-pageid="' + newPageID + '"]');
                                                $div.find('> .title').text(pageName);
                                                $div.find('> .activedefalutPage ').attr('data-pagename', pageName);
                                            } else { //added
                                                var addedMenu = '<div data-type="page" data-webbuilderid="' + pageIDs.webbuilderID + '" data-pageid="' + newPageID + '" class="panel panel-info form-elements element">';
                                                //addedMenu += '<span class="panel-heading"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
                                                addedMenu += '<span class="title">' + pageName + '</span>';
                                                //addedMenu += '<span class="showinmenu">';
                                                //var index = $('#headerMenuList > div').length + 1;
                                                //addedMenu += '<input id="page_' + index + '" class="showpageinmenu" type="checkbox" checked="checked">';
                                                //addedMenu += '<label for="page_' + index + '"><i class="icon-icon-tick"></i></label>';
                                                //addedMenu += '</span>';
                                                //addedMenu += '<span class="previewhere fa fa-eye"></span>';
                                                //addedMenu += '<span class="gotoeditor fa fa-outdent"></span>';
                                                addedMenu += '<span class="fa fa-check-circle-o activedefalutPage " title="set as starup page"data-pageName="' + pageName + '"></span>';
                                                addedMenu += '<span class="deleteWebPage fa icon-delete"></span>';
                                                addedMenu += '<span class="editWebPage fa fa-pencil-square-o"></span>';
                                                //addedMenu += '<div class="sortable panel-body ui-sortable">&nbsp;</div></div>';
                                                $('#headerMenuList').append(addedMenu);
                                                $('.eb-menu').each(function () {
                                                    var $this = $(this);
                                                    var isHeading = false;
                                                    if ($this.parents('#menuHEaderDOM').length == 1)
                                                        isHeading = true;
                                                    var color = 'rgb(0,0,0)';
                                                    var fontSize = '';
                                                    var $menuAnchor = '';
                                                    var $span = '';
                                                    if ($this.find('li').not('.hide-element').find('a').not('.active-page').length == 0) {
                                                        color = 'rgb(0,0,0)';
                                                        fontSize = '12';
                                                    } else {
                                                        var $item = $this.find('li a').not('.active-page').eq(0);
                                                        color = $item.find('span').css('color');
                                                        fontSize = $item.find('span').css('font-size');
                                                        //if (isHeading) {
                                                        $menuAnchor = $item.parent();
                                                        $span = $item.find('span');
                                                        //}
                                                    }
                                                    var hide = 'hide-element';
                                                    var li = '<li data-pageid="' + newPageID + '" >';
                                                    li += '<a href="' + SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + '" class="pagelink">';
                                                    li += '<span class="pageName editor-text-letterSpacing-0" style="font-size: ' + fontSize + '; color: ' + color + ';">';
                                                    li += pageName;
                                                    li += '</span>';
                                                    li += '</a>';
                                                    li += '</li>';
                                                    var $li = $(li);
                                                    $this.append($li);
                                                    if ($menuAnchor.length > 0) {
                                                        $li.attrs($menuAnchor.attrs());
                                                        $li.find('span').attrs($span.attrs());
                                                        $li.attr('data-pageid', newPageID);
                                                        $li.attr('data-webbuilderID', pageIDs.webbuilderID);
                                                        if (isHeading) {
                                                            $li.removeClass('hide-element');
                                                        } else {
                                                            if (!$li.hasClass('hide-element'))
                                                                $li.addClass('hide-element');
                                                        }
                                                    }
                                                });
                                                //RebindMenu();
                                                //SortableMenu();
                                                SortEvents();
                                                PagelinkStop();
                                            }
                                            $('#pageCreateArea').hide();
                                            $('#pageListArea').show();
                                            currentpageName = oldPageName;
                                            $('#SaveWeb').trigger('click');
                                            var Oriname = $('#txtPageName').attr('data-pname');
                                            if (typeof Oriname !== "undefined" && Oriname === oldPageName) {
                                                window.location = SageFrameHostURL + '/WebBuilder/' + pageName.replace(" ", '-');
                                            }
                                        }

                                    }
                                }
                            });
                        }

                        function ValidatePageName(pageName) {
                            var validPageaName = (/^[A-Za-z\s]+$/).test(pageName);
                            if (validPageaName)
                                return true;
                            else
                                return false;
                        }
                        ReadMenu();

                        function ReadMenu() {
                            var $menu = $('#innerPageList  li');
                            $('#headerMenuList').html(BindMenuItem($menu));
                            //SortableMenu();
                            SortEvents();
                        }

                        function BindMenuItem($menu) {
                            var html = '';
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var webbuilderID = $item.attr('data-webbuilderid');
                                var pageName = $item.find(' > a > .pageName').text();
                                html += '<div data-type="page" data-webbuilderid="' + webbuilderID + '" data-pageid="' + pageID + '" class="panel panel-info form-elements element">';
                                //html += '<span class="panel-heading"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
                                html += '<span class="title">';
                                html += pageName;
                                html += '</span>';
                                //html += '<span class="showinmenu">';
                                // var checked = "checked='checked'";
                                //if ($item.hasClass('hide-element'))
                                //    checked = "";
                                //html += '<input id="page_' + pageID + '" class="showpageinmenu" type="checkbox" ' + checked + '>';
                                //html += '<label for="page_' + pageID + '"><i class="icon-icon-tick"></i></label>';
                                //html += '</span>';
                                var currentPage = false;
                                var activeCurrent = '';
                                if (pageName === portalDefaultPage) {
                                    currentPage = true;
                                    activeCurrent = "active";
                                }
                                html += '<span class="fa fa-check-circle-o activedefalutPage ' + activeCurrent + '" title="set as starup page" data-pageName="' + pageName + '"></span>';
                                //html += '<span class="previewhere fa fa-eye" title="preview page"></span>';
                                //html += '<span class="gotoeditor fa fa-outdent" title="go to editor"></span>';
                                if (!currentPage) {
                                    html += '<span class="deleteWebPage fa icon-delete" title="delete page"></span>';
                                    html += '<span class="editWebPage fa fa-pencil-square-o" title="edit page"></span>';
                                }
                                if ($item.find('> ul > li').length > 0) {
                                    html += '<div class="sortable panel-body ">';
                                    //html += pageName;
                                    html += BindMenuItem($item.find('> ul > li'), item.MenuItemID);
                                    html += "</div>";
                                } else {
                                    //html += '<div class="sortable panel-body">&nbsp;</div>';
                                }
                                html += "</div>";
                            });
                            return html;
                        }

                        function CheckDuplicate(newPage, pageID) {
                            var duplicate = false;
                            $parent.find('.eb-menu li').not('li[data-pageid="' + pageID + '"]').each(function (i, v) {
                                if ($(this).text().trim().toLowerCase() === newPage.toLowerCase()) {
                                    duplicate = true;
                                    return true;
                                }
                            });
                            return duplicate;
                        }

                        function ClearPageError() {
                            $('#pageError').text('');
                        }

                        function SetPageError(error) {
                            $('#pageError').text(error);
                        }

                        function RebindMenu() {
                            var $menu = $('#headerMenuList > div.panel-info');
                            var menuSpan = $('.eb-menu li a span').eq(0).attrs();
                            $('.eb-menu').html(ReBindMenuItem($menu));
                            if ($('#headerMenuList > div.panel-info').length == 1) {
                                $('#headerMenuList > div.panel-info > .deleteWebPage').remove(0);
                            }
                            $('.eb-menu span').each(function () {
                                $(this).attrs(menuSpan);
                            });
                            PagelinkStop();
                        }

                        function SortEvents() {
                            $('.deleteWebPage').off().on('click', function () {
                                var $this = $(this);
                                var tempName = $this.parent().find('.title').text();
                                SageConfirmDialog('Do you want to delete "' + tempName + '" page? All the data on the page will also be deleted.').done(function () {
                                    var pageID = $this.parent().attr('data-pageid');
                                    var pageName = $this.parent().find('.title').text();
                                    DeletePage(pageID, $this.parent(), pageName);
                                });
                            });
                            $('.editWebPage ').off().on('click', function () {
                                var pageID = $(this).parent().attr('data-pageid');
                                var webbuilderID = $(this).parent().attr('data-webbuilderid');
                                $.ajax({
                                    isPostBack: false,
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    contentType: "application/json; charset=utf-8",
                                    data: JSON2.stringify({
                                        pageID: pageID,
                                        portalID: parseInt(SageFramePortalID),
                                        userName: SageFrameUserName,
                                        userModuleID: webBuilderUserModuleID,
                                        secureToken: SageFrameSecureToken
                                    }),
                                    dataType: 'json',
                                    crossDomain: true,
                                    url: SageFrameHostURL + '/Modules/Pages/Services/PagesWebService.asmx/GetPageDetails',
                                    success: function (data) {
                                        var pageDetail = data.d;
                                        $('#txtPageName').val(pageDetail.PageName);
                                        $('#txtPageName').attr('data-pname', pageDetail.PageName);
                                        $('#txtPageTitle').val(pageDetail.Title);
                                        $('#txtPageDescription').val(pageDetail.Description);
                                        var pID = pageDetail.PageID;
                                        $('#pageCreateArea').attr('data-pageid', pID);
                                        $('#pageCreateArea').attr('data-webbuilderid', webbuilderID);
                                        $('#pageCreateArea').show();
                                        $('#pageListArea').hide();
                                    },
                                    error: function () {
                                        //SageFrame.messaging.show("Page adding issue", "alert");
                                    },
                                });
                            });

                            $('.activedefalutPage').not('.active').on('click', function () {
                                var pageName = $(this).attr('data-pagename');
                                SageConfirmDialog('Do you want to set ' + pageName + ' as default startupPage page ?').done(function () {
                                    SetDefaultPage(pageName, portalDefaultPage);
                                });
                            });

                        }

                        function ReBindMenuItem($menu) {
                            var html = '';
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find('> .title').text();
                                var addliclass = 'hide-element';
                                if ($item.find('> .showinmenu').find('.showpageinmenu').is(':checked')) {
                                    addliclass = '';
                                }
                                html += '<li data-pageid="' + pageID + '" class="' + addliclass + '" >';
                                html += '<a href="' + SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + webBuilderPageExtension + '" class="pagelink"><span class="pageName">' + pageName + '</span></a>';
                                if ($item.find(' > div.panel-body > div.panel-info').length > 0) {
                                    html += '<ul>';
                                    html += ReBindMenuItem($item.find(' > div.panel-body > div.panel-info'));
                                    html += "</ul>";
                                }
                                html += "</li>";
                            });
                            return html;
                        }
                        // AddUpdatePage(2096, 'new', '', '', '');
                        function AddUpdatePage(pageID, pageName, caption, title, description, webbuilderID) {
                            var newPageID = 0;
                            var Mode = pageID > 0 ? "E" : "A";
                            var UpdateLabel = '';
                            var checks = $('div.divPermission tr:gt(0), #dvUser tr').find('input.sfCheckbox:checked');
                            lstPagePermission = [];
                            var beforeID = 0;
                            var afterID = 0;
                            if ($('#rdbBefore').prop('checked') == true) {
                                beforeID = $('#cboPositionTab').val();
                            } else if ($('#rdbAfter').prop('checked') == true) {
                                afterID = $('#cboPositionTab').val();
                            }
                            var MenuSelected = 0;
                            var _IsVisible = $('#rdbAdmin').prop('checked') ? $('#chkShowInDashboard').prop("checked") : true;
                            var lstPagePermission = [];
                            lstPagePermission[0] = {
                                "PermissionID": 1,
                                "RoleID": 'cd3ca2e2-7120-44ad-a520-394e76aac552',
                                "Username": "",
                                "AllowAccess": true
                            };
                            lstPagePermission[1] = {
                                "PermissionID": 2,
                                "RoleID": 'cd3ca2e2-7120-44ad-a520-394e76aac552',
                                "Username": "",
                                "AllowAccess": true
                            };
                            lstPagePermission[2] = {
                                "PermissionID": 1,
                                "RoleID": 'a87e850f-14c8-4c89-86f4-4598ff27da72',
                                "Username": "",
                                "AllowAccess": true
                            };
                            var PageDetails = {
                                PageEntity: {
                                    Mode: Mode,
                                    Caption: caption,
                                    PageID: pageID,
                                    PageName: pageName,
                                    IsVisible: true,
                                    IconFile: '',
                                    Title: title,
                                    Description: description,
                                    KeyWords: "",
                                    Url: "",
                                    StartDate: '',
                                    EndDate: '',
                                    RefreshInterval: 0,
                                    PageHeadText: "SageFrame",
                                    IsSecure: false,
                                    PortalID: parseInt(SageFramePortalID),
                                    IsActive: true,
                                    AddedBy: SageFrameUserName,
                                    BeforeID: beforeID,
                                    AfterID: afterID,
                                    IsAdmin: false,
                                    LstPagePermission: lstPagePermission,
                                    MenuList: MenuSelected,
                                    UpdateLabel: ''
                                }
                            };
                            var objTagValue = GetSeoValue('easybuilder', title, description);
                            SaveMessageShow(pageName + ' page adding');
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    "objPageInfo": PageDetails.PageEntity,
                                    Culture: 'en-US',
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken,
                                    webbuilderID: webbuilderID,
                                    objTagValue: objTagValue
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/AddUpdatePages',
                                success: function (data) {
                                    var response = data.d;
                                    if (response !== null)
                                        response = response.split(',');
                                    newPageID = { 'pageID': response[0], 'webbuilderID': response[1] };

                                    SaveMessageRemove();
                                },
                                error: function () {

                                },
                            });
                            return newPageID;
                        }

                        function GetSeoValue(type, title, desciption) {
                            var objTagValue = [];

                            //var tagValue = ['Type', 'title', 'image', 'description'];
                            //var tagID = [1, 2, 3, 4];
                            var tagValue = [type, title, desciption];
                            var tagID = [1, 2, 4];
                            $.each(tagValue, function (index, value) {
                                var objTag = {
                                    SEOMetaTagTypeID: parseInt(tagID[index]),
                                    MetaTagContent: tagValue[index]
                                };
                                objTagValue.push(objTag);
                            });
                            return objTagValue;
                        }

                        function DeletePage(pageID, $item, pageName) {
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    pageID: pageID,
                                    deletedBY: SageFrameUserName,
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/DeleteChildPages',
                                success: function () {
                                    $item.remove();
                                    $('.eb-menu').each(function () {
                                        var $this = $(this);
                                        $this.find('li').each(function () {
                                            var $me = $(this);
                                            var newPagename = $me.find('> a > span').text();
                                            if (newPagename === pageName) {
                                                if ($me.find(' > ul').length > 0) {
                                                    $this.append($me.find('> ul >li'));
                                                }
                                                $me.remove();
                                            }
                                        });
                                    });
                                    $('#SaveWeb').trigger('click');
                                    if (pageName === currentpageName) {
                                        window.location = window.location.href;
                                    }
                                },
                                error: function () { },
                            });
                        }

                        function SetDefaultPage(newPageName, oldPageName) {
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    PageName: newPageName,
                                    OldPageName: oldPageName,
                                    ActiveTemplateName: SageFrameActiveTemplate,
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Modules/Pages/Services/PagesWebService.asmx/UpdSettingKeyValue',
                                success: function () {
                                    portalDefaultPage = newPageName;
                                    ReadMenu();
                                    $('#chkUnderConstruction').removeClass('active');
                                    $('#underConstructionNote').hide();
                                    webBuilderSettings.isunderconstruction = false;
                                    UpdateSettings();
                                },
                                error: function () { },
                            });
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
,    "menu": {
        "componentname": "menu",
        "category": "basic",
        "icon": "fa fa-bars",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "element",
        "defaultdata": '<div class="menuWrapper"></div>',
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            var html = EasyLibrary.ReadDOM("menusettings");
            if (dropped) {
                $appendLayer.html(html);
                $appendLayer.find('.webMenu').find('.menulist').html(EasyLibrary.PageListDOM());
                SettingEvents();
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sitemenubasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $text = $parent.find('.pageName');
                        var $nav = $parent.find('nav');
                        InitEvents();

                        function InitEvents() {
                            if ($parent.hasClass('menuHeader')) {
                                $('#MenuStyleWrapper').show();
                            } else {
                                $('#MenuStyleWrapper').hide();
                            }
                            $('#menuTextColor').css('background-color', $parent.find('.pagelink').not('.active-page').find('.pageName').eq(0).css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.pagelink').not('.active-page').find('.pageName').css('color', objColor.bgColor);
                                    $parent.find('.eb-menu').attr('data-textcolor', objColor.bgColor);
                                }
                            });
                            $('#menuTextColor').colorPicker(colorPickerOption);
                            fontSize();
                            letterSpacing();
                            TextTranformCheck();
                            MenuStyle();
                            LoadFontFamily();
                        }

                        function fontSize() {
                            var fontsize = $text.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize;
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));

                            function FontSize(space) {
                                $text.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#menuFontSLider'), $('#menuFontHandle'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
                        }

                        function letterSpacing() {

                            var letteSpace = 0;
                            var removeClass = '';
                            if (typeof ($text.attr('class')) !== 'undefined') {
                                var letterSpacingNegClass = $text.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                                if (letterSpacingNegClass !== null) {
                                    removeClass = letterSpacingNegClass[0].trim();
                                    letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-neg-', ''));
                                } else {
                                    var letterSpacingPosClass = $text.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                                    if (letterSpacingPosClass !== null) {
                                        removeClass = letterSpacingPosClass[0].trim();
                                        letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-', ''));
                                    }
                                }
                            }

                            function LetteSpaceChange(space) {
                                var addClass = '';
                                var removeClass = '';
                                if (typeof ($text.attr('class')) !== 'undefined') {
                                    var negClass = $text.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                                    if (negClass !== null) {
                                        removeClass = negClass[0].trim();
                                    } else {
                                        var posClass = $text.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                                        if (posClass !== null) {
                                            removeClass = posClass[0].trim();
                                        }
                                    }
                                }
                                if (space >= 0) {
                                    addClass = 'editor-text-letterSpacing-' + space;
                                } else {
                                    space = Math.abs(space);
                                    addClass = 'editor-text-letterSpacing-neg-' + space;
                                }
                                $text.removeClass(removeClass).addClass(addClass);
                            }
                            AdvanceSageSlider($('#menuletterSpacingSlider'), $('#menuletterSpacingHandle'), -10, 10, letteSpace, LetteSpaceChange, $parent, 'px');
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($text.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($text.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#menutextTransform').val(trasformValue);
                            $('#menutextTransform').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $text.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $text.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $text.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function MenuStyle() {
                            var navClass = 'nav-style-none';
                            var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                            if (navStyleClasses != null) {
                                navClass = navStyleClasses[0];
                            }
                            $('#menuStyle').val(navClass);
                            $('#menuStyle').on('change', function () {
                                var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses != null) {
                                    $nav.removeClass(navStyleClasses[0]);
                                }
                                var style = $(this).val().trim();
                                $nav.addClass(style);
                                MenuChangeInstant($nav.find('.eb-menu'), webBuilderSettings.primaryColor, webBuilderSettings.secondaryColor, style);
                            });
                        }

                        function LoadFontFamily() {
                            $('#fontfamilymenu').html(DOMFontAdvanceCollection());
                            var defaultFontFamily = 'montserrat';
                            var classesList = $text.eq(0).attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilymenu').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightmenu').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightmenu').on('change', function () {
                                var classList = $text.eq(0).attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $text.removeClass(familyClass[0]);
                                    }
                                }
                                $text.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilymenu').on('change', function () {
                                var classList = $text.eq(0).attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $text.removeClass(fontClass[0]);
                                    }
                                }
                                $text.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightmenu').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightmenu').html(fontDOM);
                                }
                            }
                        }
                    }
                },
                "Background": {
                    "options": ["image", "color"]
                },
                "Spacing": {
                    "options": {
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
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            },
        }
    }
,    "menupages": {
        "componentname": "menupages",
        "category": "page",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "defaultdata": '',
        "type": "hidden",
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Pages": {
                    "DOM": EasyLibrary.ReadDOM("sitemenu"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $ebmenu = $parent.find('.eb-menu');
                        ReadMenu();
                        if ($parent.hasClass('menuHeader')) {
                            $('#pagemenutype').hide();
                        } else {
                            $('#pagemenutype').show();
                        }

                        function ReadMenu() {
                            var $menu = $ebmenu.find('> li');
                            $('#headerMenuList').html(BindMenuItem($menu));
                            SortableMenu();
                            SortEvents();
                            var menuType = $ebmenu.attr('data-menu');
                            $('#selMenutype').val(menuType);
                            $('#selMenutype').on('change', function () {
                                $ebmenu.removeClass('horizontal').removeClass('side').removeClass('footer');
                                $ebmenu.attr('data-menu', $(this).val()).addClass($(this).val());
                            });
                        }

                        function BindMenuItem($menu) {
                            var html = '';
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find(' > a > .pageName').text();
                                html += '<div data-type="page" data-pageid="' + pageID + '" class="panel panel-info form-elements element">';
                                html += '<span class="panel-heading"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
                                html += '<span class="title">';
                                html += pageName;
                                html += '</span>';
                                html += '<span class="showinmenu">';
                                var checked = "checked='checked'";
                                if ($item.hasClass('hide-element'))
                                    checked = "";
                                html += '<input id="page_' + pageID + '" class="showpageinmenu" type="checkbox" ' + checked + '>';
                                html += '<label for="page_' + pageID + '"><i class="icon-icon-tick"></i></label>';
                                html += '</span>';
                                //var currentPage = false;
                                //var activeCurrent = '';
                                //if (pageName === portalDefaultPage) {
                                //    currentPage = true;
                                //    activeCurrent = "active";
                                //}
                                // html += '<span class="fa fa-check-circle-o activedefalutPage ' + activeCurrent + '" title="set as starup page" data-pageName="' + pageName + '"></span>';
                                html += '<span class="previewhere fa fa-eye" title="preview page"></span>';
                                html += '<span class="gotoeditor fa fa-outdent" title="go to editor"></span>';
                                // if (!currentPage)
                                // html += '<span class="deleteWebPage fa icon-delete" title="delete page"></span>';
                                //html += '<span class="editWebPage fa fa-pencil-square-o" title="edit page"></span>';
                                if ($item.find('> ul > li').length > 0) {
                                    html += '<div class="sortable panel-body ">';
                                    //html += pageName;
                                    html += BindMenuItem($item.find('> ul > li'), item.MenuItemID);
                                    html += "</div>";
                                } else {
                                    html += '<div class="sortable panel-body">&nbsp;</div>';
                                }
                                html += "</div>";
                            });
                            return html;
                        }

                        function SortableMenu() {
                            var $panelList = $('.sortable');
                            $panelList.sortable({
                                start: function (event, ui) { },
                                handle: '.panel-heading',
                                connectWith: '.sortable',
                                placeholder: 'ui-state-hover',
                                receive: function (event, ui) { },
                                beforeStop: function (ev, ui) { },
                                stop: function (event, ui) {
                                    RebindMenu();
                                    //ReArrange($panelList, $(ui.item[0]));
                                }
                            });
                        }
                        function ReArrange($panelList, $item) {
                            var $index = $item.index($panelList);
                            console.log($index);
                            var $pageid = $item.attr("data-pageid");
                            $ebmenu.find('div[data-pageid="' + pageid + '"]');
                            var $destinationMenu = $ebmenu.find();
                        }
                        function MoveMenuItems() {

                        }
                        function RebindMenu() {
                            var $menu = $('#headerMenuList > div.panel-info');
                            var menuSpan = $ebmenu.find('> li a span').eq(0).attrs();
                            $ebmenu.html(ReBindMenuItem($menu));
                            if ($('#headerMenuList > div.panel-info').length == 1) {
                                $('#headerMenuList > div.panel-info > .deleteWebPage').remove(0);
                            }
                            $ebmenu.find('span').each(function () {
                                $(this).attrs(menuSpan);
                            });
                            PagelinkStop();
                            ActiveMenu();
                            MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                        }
                        function SortEvents() {
                            $('.showpageinmenu').off().on('click', function () {
                                if ($('#headerMenuList > .panel > .showinmenu >  .showpageinmenu:checked').length > 0) {
                                    var $this = $(this);
                                    var index = $(".showpageinmenu").index($this);
                                    if ($this.is(':checked')) {
                                        $ebmenu.find('li').eq(index).removeClass('hide-element');
                                    } else {
                                        $ebmenu.find('li').eq(index).addClass('hide-element');
                                    }
                                } else {
                                    SageAlertDialog('At least a page must be visible in menu');
                                    $(this).prop('checked', true);
                                }
                            });
                            $('.previewhere').on('click', function () {
                                var name = $(this).parent().find('.title').text();
                                window.open(SageFrameHostURL + '/' + name.replace(" ", '-'), '_blank');
                            });
                            $('.gotoeditor').on('click', function () {
                                var name = $(this).parent().find('.title').text();
                                window.location = SageFrameHostURL + '/WebBuilder/' + name.replace(" ", '-');
                            });
                        }

                        function ReBindMenuItem($menu) {
                            debugger;
                            var html = '';
                            var color = 'rgb(0,0,0)';
                            var fontSize = '';
                            if ($menu.find('li a').not('.active-page').length == 0) {
                                color = 'rgb(0,0,0)';
                                fontSize = '12';
                            } else {
                                var $item = $menu.find('li a').not('active-page').eq(0);
                                color = $item.find('span').css('color');
                                fontSize = $item.find('span').css('font-size');
                            }
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find('> .title').text();
                                var addliclass = 'hide-element';
                                if ($item.find('> .showinmenu').find('.showpageinmenu').is(':checked')) {
                                    addliclass = '';
                                }
                                html += '<li data-pageid="' + pageID + '" class="' + addliclass + '" >';
                                html += '<a href="' + SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + webBuilderPageExtension + '" class="pagelink"><span class="pageName editor-text-letterSpacing-0" style="font-size: ' + fontSize + 'px; color: ' + color + ';">' + pageName + '</span></a>';
                                if ($item.find(' > div.panel-body > div.panel-info').length > 0) {
                                    html += '<ul>';
                                    html += ReBindMenuItem($item.find(' > div.panel-body > div.panel-info'));
                                    html += "</ul>";
                                }
                                html += "</li>";
                            });
                            return html;
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
,    "milestone": {
        "componentname": "milestone",
        "category": "advance",
        "icon": "icon-milestone",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "countdown",
        "defaultdata": EasyLibrary.ReadDOM('milestone/milestoneview'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($(document).find('#hdnMilestoneSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnMilestoneSettingAttr"></div>');
            if (!dropped)
                $('.mileStone-wrap').attr('data-animate', 0)
            $(window).scroll(function () {
                animateMileStone();
            });
            var winHeight = $(window).height() - 80;

            function IsInVisibleSection($Component) {
                var winScroll = $(window).scrollTop();
                var diff = $Component.offset().top - winScroll;
                if (0 <= diff && diff < winHeight)
                    return true;
                else
                    return false;
            }

            function animateMileStone() {
                $('.editor-row .mileStone-wrap').each(function () {
                    if (IsInVisibleSection($(this)) && $(this).attr('data-animate') == 0) {
                        $(this).attr('data-animate', 1);
                        $(this).find('.milestone-counter h1').each(function () {
                            $(this).prop('Counters', 0).animate({
                                Counters: $(this).text()
                            }, {
                                duration: 4000,
                                easing: 'swing',
                                step: function (now) {
                                    $(this).text(Math.ceil(now));
                                }
                            });
                        });
                    }
                });
            }
            animateMileStone();
        },
        "onsort": function (ui) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('milestone/milestonebasicsetting'),
                    "onload": function ($item) {
                        var attr = $('#hdnMilestoneSettingAttr').data('attribute');
                        if (attr != '') {
                            $('#popupModel').attrs(attr);
                            $('#hdnMilestoneSettingAttr').data('attribute', '');
                        }

                        var MileStoneBasic = {
                            IconClassReg: /fa-\w+(\-*\w*)*/g,
                            SettingButton: $item,
                            Position: 0,
                            Container: $item.parents('.milestone'),
                            init: function () {
                                $MileStoneItem = MileStoneBasic.Container.find('.milestone-item');
                                var html = '';
                                var mLength = $MileStoneItem.length;
                                $MileStoneItem.each(function () {
                                    $This = $(this);
                                    $Mcount = $This.find('.milestone-counter h1').text();
                                    $MTitle = $This.find('.milestone-title p').text();
                                    $MIcon = $This.find('.milestone-icon .mile-icon i').attr('class').match(MileStoneBasic.IconClassReg);
                                    html += '<div class="item field-row clearfix">';
                                    html += '<div class="multi-col-form-group ">';
                                    html += '<span class="value">';
                                    html += '<i class="iconChooser in-form-icon fa ' + $MIcon + '"></i>'

                                    html += '<input type="text" class="title mileStoneInput" placeholder="Title" value="' + $MTitle + '" >';
                                    html += '<input class="xsml-box counter mileStoneInput"  type="text" value="' + $Mcount + '">';
                                    if (mLength > 1)
                                        html += '<i title="Delete" class="deleteMilestone fa fa-trash in-form-icon delete-icon"></i>';
                                    html += '</span></div></div>';

                                });
                                $('.mileStoneForm').html(html);
                                MileStoneBasic.UIEvents();
                            },
                            UIEvents: function () {
                                var firstItem = MileStoneBasic.Container.find('.milestone-icon').first();
                                if (firstItem.css('display') != 'none')
                                    $('#chkIsActiveMileIcon').prop('checked', true);
                                $('#chkIsActiveMileIcon').off().on('click', function () {
                                    var IconWrap = MileStoneBasic.Container.find('.milestone-icon')
                                    if ($(this).is(':checked')) {
                                        IconWrap.show();
                                    } else {
                                        IconWrap.hide();
                                    }
                                });

                                $('.addMoreMilestone').off().on('click', function () {
                                    $MItem = MileStoneBasic.Container.find('.milestone-item').last();
                                    var NewDom = document.createElement("div");
                                    $(NewDom).attrs($MItem.attrs());
                                    $(NewDom).html($MItem.html());
                                    $MContainer = MileStoneBasic.Container.find('.mileStone-wrap');
                                    $MContainer.append(NewDom);

                                    $('#hdnMilestoneSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SettingEvents();

                                    MileStoneBasic.SettingButton.trigger('click');
                                });

                                $('.deleteMilestone').off().on('click', function () {
                                    $this = $(this);
                                    SageConfirmDialog('Are you sure?').done(function () {
                                        $pos = $('.mileStoneForm .item').index($this.parents('.item'))
                                        MileStoneBasic.Container.find('.milestone-item').eq($pos).remove();
                                        MileStoneBasic.init();
                                    });
                                });
                                $('.mileStoneInput').off().on('keyup', function () {
                                    $this = $(this);
                                    $Val = $this.val();
                                    $pos = $('.mileStoneForm .item').index($this.parents('.item'))
                                    var mileStoneItem = MileStoneBasic.Container.find('.milestone-item').eq($pos);
                                    if ($this.hasClass('title')) {
                                        mileStoneItem.find('.milestone-title p').text($Val);
                                    } else {
                                        if ($Val == '')
                                            $Val = 0
                                        if ($Val >= 0)
                                            mileStoneItem.find('.milestone-counter h1').text($Val);
                                    }
                                });

                                $('#MilestonefontIconCollection').html($('ul#fontIconCollection').html());

                                $('.iconChooser').off('click').on('click', function () {
                                    $this = $(this);
                                    $this.parent().parent().next($('.milestoneIconList'));
                                    MileStoneBasic.Position = $('.mileStoneForm .item').index($this.parents('.item'));
                                    $('.milestoneIconList').removeClass('hide-element');
                                    $('#MilestonefontIconCollection').find('li').removeClass('selected');
                                    var CurrentClass = $this.attr('class').match(MileStoneBasic.IconClassReg)[0];
                                    $('#MilestonefontIconCollection').find('li i[data-class="' + CurrentClass + '"]').parent().addClass('selected');

                                });
                                $('.closeIconChooser').off().on('click', function () {

                                    $('.milestoneIconList').addClass('hide-element');
                                });
                                $('#MilestoneSearchIcon').on('keyup', function () {
                                    var searchVal = $(this).val();
                                    $('#MilestonefontIconCollection').find('li').each(function () {
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
                                $('#MilestonefontIconCollection').find('li').on('click', function () {

                                    var chooseClass = $(this).find('i').attr('data-class');
                                    $('#MilestonefontIconCollection').find('li').removeClass('selected');
                                    $('#MilestonefontIconCollection').find('li i[data-class="' + chooseClass + '"]').parent().addClass('selected');
                                    $FormIcon = $('.mileStoneForm .item').eq(MileStoneBasic.Position).find('i')
                                    var PrevClass = $FormIcon.attr('class').match(MileStoneBasic.IconClassReg)[0];
                                    //console.log(PrevClass);
                                    $FormIcon.removeClass(PrevClass);
                                    $FormIcon.addClass(chooseClass);
                                    $ViewIcon = MileStoneBasic.Container.find('.milestone-item').eq(MileStoneBasic.Position).find('.mile-icon i')
                                    $ViewIcon.removeClass(PrevClass);
                                    $ViewIcon.addClass(chooseClass);
                                    $(".closeIconChooser").trigger("click");
                                });
                            },

                        }

                        function OneTimeEvent() {

                            var container = MileStoneBasic.Container.find('.milestone-item');

                            function sliderSlide(space) {
                                var $parentWidth = container.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if ($parentWidth !== null) {
                                    container.removeClass($parentWidth[0]).addClass('sfCol_' + space);
                                } else {
                                    container.addClass('sfCol_' + space);
                                }
                            }
                            var itemWidth = container.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            if (itemWidth !== null) {
                                itemWidth = parseInt(itemWidth[0].replace('sfCol_', ''));
                            }
                            AdvanceSageSlider($('#mileStoneItemSlider'), $('#mileStoneItemHandle'), 10, 100, itemWidth, sliderSlide, container, '%');



                        }

                        MileStoneBasic.init();
                        OneTimeEvent();
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
                        },

                    },

                },
                "Alignment": {
                    "options": ["left", "center", "right"],

                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.milestone').find('.mileStone-wrap');
                        return $parent;
                    },
                },
                "Box Shadow": {
                    "options": {},
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.milestone').find('.mileStone-wrap');
                        return $parent;
                    },


                },

            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parents('.milestone').find('.mileStone-wrap');
                return $parent;
            },
        },
        "remove": function () {

        },
        "view": {
            "view": function () {
                this.library.initAnimatCounter();
            },
            "library": {
                "initAnimatCounter": function () {
                    $('.mileStone-wrap').attr('data-animate', 0)
                    $(window).scroll(function () {
                        animateMileStone();
                    });
                    var winHeight = $(window).height() - 80;

                    function IsInVisibleSection($Component) {
                        var winScroll = $(window).scrollTop();
                        var diff = $Component.offset().top - winScroll;
                        if (0 <= diff && diff < winHeight)
                            return true;
                        else
                            return false;
                    }

                    function animateMileStone() {
                        $('.editor-row .mileStone-wrap').each(function () {
                            if (IsInVisibleSection($(this)) && $(this).attr('data-animate') == 0) {
                                $(this).attr('data-animate', 1);
                                $(this).find('.milestone-counter h1').each(function () {
                                    $(this).prop('Counters', 0).animate({
                                        Counters: $(this).text()
                                    }, {
                                        duration: 4000,
                                        easing: 'swing',
                                        step: function (now) {
                                            $(this).text(Math.ceil(now));
                                        }
                                    });
                                });
                            }
                        });
                    }
                    animateMileStone();
                }
            }
        }
    }
,    "pie chart": {
        "componentname": "pie chart",
        "category": "advance",
        "icon": "fa fa-pie-chart",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "graph",
        "defaultdata": EasyLibrary.ReadDOM('piechart/piechartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
        },
        "onsort": function (ui) {
            this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('piechart/piechartbasicsettings'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.pieTitle').css('color');
                        var barAxesColor = $parent.find('.pieChartWrapper').attr('data-bordercolor');
                        var barFontColor = $parent.find('.pieChartWrapper').attr('data-piefontcolor');
                        var barTitle = $parent.find('.pieTitle').text();


                        $("#txtPieChartTitle").val(barTitle);


                        $('#choosepietitleColor').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.pieTitle').css('color', objColor.bgColor);
                            }
                        });
                        $('#choosepietitleColor').colorPicker(colorPickerOption);


                        $("#txtPieChartTitle").off().on("blur", function () {
                            var value = $(this).val().trim();

                            var $elm = $parent.find('.pieTitle');
                            $elm.text(value);
                            //$(this).attr('value', value);
                        });

                        $('#choosePieBorderColor').css('background-color', barAxesColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.pieChartWrapper').attr('data-bordercolor', objColor.bgColor);
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#choosePieBorderColor').colorPicker(colorPickerOption);

                        $('#choosePieFontColor').css('background-color', barFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.pieChartWrapper').attr('data-piefontcolor', objColor.bgColor);
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#choosePieFontColor').colorPicker(colorPickerOption);

                        var fontWidth = $parent.find('.pieChartWrapper').attr('data-piefontsize').replace('px', '');

                        function ListIconSizeSlider(space) {
                            $parent.find('.pieChartWrapper').attr('data-piefontsize', space);
                            component['pie chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#fontsizeSlider'), $('#fontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');


                        var pieTitlefontWidth = $parent.find('.pieTitle').css('font-size').replace('px', '');

                        function PieTitleSizeSlider(space) {
                            $parent.find('.pieTitle').css('font-size', space);
                        }
                        AdvanceSageSlider($('#pietitlesizeSlider'), $('#pietitlesizeHandle'), 10, 40, pieTitlefontWidth, PieTitleSizeSlider, $parent, 'px');

                    }
                },
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM('piechart/pieChartDataWrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleIndex = -1;

                        var $pieChartWrapper = $parent.find('.pieChartWrapper');
                        var pieData = $pieChartWrapper.attr('data-value');

                        var pieDataArray = JSON.parse(pieData);

                        LoadData();
                        InitPieEvents();
                        InitAddMorePieEvent();

                        function LoadData() {
                            var html = '';
                            $("#pieChartEditWrapper").html('');

                            $.each(pieDataArray, function (index, item) {
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: ' + item.color + '"></span>';
                                html += '<input type="text" maxlength="15" class="indPieName" value="' + item.name + '"/>';
                                html += '<input type="text" class="sml-box indPieValue" value="' + item.value + '"/>';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deletePie"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#pieChartEditWrapper").html(html);

                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    pieDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.choosePieFontColor').colorPicker(colorPickerOption);

                        }


                        function InitPieEvents() {

                            $("#pieChartEditWrapper .indPieName").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                pieDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#pieChartEditWrapper .indPieValue").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    pieDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', pieDataArray[dataIndex].value);
                                    $(this).val(pieDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', pieDataArray[dataIndex].value);
                                    $(this).val(pieDataArray[dataIndex].value);
                                } else {
                                    pieDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#pieChartEditWrapper .deletePie").off().on('click', function () {
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                pieDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            });

                        }

                        function InitAddMorePieEvent() {
                            $("#btnAddMorePieData").off().on("click", function () {
                                var html = '';
                                var $editParent = $(this).parent().find('#pieChartEditWrapper');

                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = pieDataArray[0];
                                    var itemCount = pieDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="multi-col-form-group">';
                                    $editHtml += '<span class="value">';
                                    $editHtml += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: ' + duplicateData.color + '"></span>';
                                    $editHtml += '<input maxlength="15" class="indPieName valid" value="' + duplicateData.name + '" aria-invalid="false" type="text">';
                                    $editHtml += '<input class="sml-box indPieValue" value="' + duplicateData.value + '" type="text">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deletePie"></i>';
                                    $editHtml += '</span>';
                                    $editHtml += '</div>';
                                    $editHtml += '</div>';
                                    $editParent.append($editHtml);


                                    var newData = {
                                        "id": itemCount + 1,
                                        "name": duplicateData.name,
                                        "value": duplicateData.value,
                                        "color": duplicateData.color
                                    };

                                    pieDataArray.push(newData);
                                } else {
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: #A55CA5;"></span>';
                                    html += '<input maxlength="15" class="indPieName valid" value="data 1"  aria-invalid="false" type="text">';
                                    html += '<input class="sml-box indPieValue" value="10" type="text">';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deletePie" ></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.append(html);

                                    var defaultData = {
                                        "id": 1,
                                        "name": "data 1",
                                        "value": 10,
                                        "color": "#A55CA5"
                                    };
                                    pieDataArray.push(defaultData);
                                }

                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                component['pie chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        pieDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(pieDataArray);
                                        $pieChartWrapper.attr('data-value', jsonData);
                                        component['pie chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.choosePieFontColor').colorPicker(colorPickerOption);


                                InitPieEvents();
                            });
                        }

                    }
                }
            }
        },

        "view": {
            "view": function () {
                var myCanvasList = document.querySelectorAll(".pieCanvas");

                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;
                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = parentWidth * 0.6;
                        myCanvas.width = parentWidth * 0.6;

                        var pieFontColor = item.parentNode.getAttribute('data-piefontcolor');
                        var pieChartData = item.parentNode.getAttribute('data-value');
                        var pieChartFont = item.parentNode.getAttribute('data-piefontsize');
                        var pieData = JSON.parse(pieChartData);

                        var ctx = myCanvas.getContext("2d");

                        var myLegend = myCanvas.parentNode.children[2];
                        _this.library.PieChart({
                            canvas: myCanvas,
                            seriesName: "Pie Chart",
                            padding: 20,
                            pieFontColor: pieFontColor,
                            data: pieData,
                            legend: myLegend,
                            width: parentWidth,
                            pieChartFont: pieChartFont
                        });
                    });
                }
            },
            "library": {
                "DrawLine": function (ctx, startX, startY, endX, endY, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                    ctx.restore();
                },

                "DrawArc": function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.stroke();
                    ctx.restore();
                },

                "DrawPieSlice": function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.closePath();
                    ctx.fill();
                },

                "PieChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    //this.colors = options.colors;
                    var _this = this;
                    this.draw = function () {
                        var total_value = 0;
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            //console.log(categ);
                            total_value += parseFloat(categ.value);
                        });

                        var start_angle = 0;

                        var textWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            var val = parseFloat(categ.value);

                            var slice_angle = 2 * Math.PI * val / total_value;
                            _this.DrawPieSlice(
                                _this.ctx,
                                _this.canvas.width / 2,
                                _this.canvas.height / 2,
                                Math.min(_this.canvas.width / 2, _this.canvas.height / 2),
                                start_angle,
                                start_angle + slice_angle,
                                categ.color
                            );


                            var pieRadius = Math.min(_this.canvas.width / 2, _this.canvas.height / 2);
                            var labelX = _this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                            var labelY = _this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);


                            var labelText = Math.round(100 * val / total_value);
                            _this.ctx.fillStyle = _this.options.pieFontColor;

                            var fontSize = _this.options.pieChartFont;
                            //console.log("bold " + parseInt(fontSize) + "px Arial");
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(labelText + "%", labelX, labelY);


                            start_angle += slice_angle;


                        });

                        if (_this.options.legend) {
                            var legendHTML = "";
                            var fontSize = _this.options.width / 500 * 12;


                            var html = '<div class="position-absolute" style="top: 20px; right:20px;">';
                            if ((_this.options.width * 0.6) < 250) {
                                html = '<div  style="top: 20px; left:20px;">';
                            }
                            $.each(this.options.data, function (index, categ) {
                                html += "<div class='editor-com-outerSpacing-bottom-5' style='font-size: " + parseInt(fontSize) + "px'><span style='display:inline-block;width:20px;background-color:" + categ.color + ";'>&nbsp;</span> " + categ.name + "</div>";
                            });

                            html += '</div>';
                            _this.options.legend.innerHTML = html;
                        }

                    }

                    this.draw();
                }
            }
        }
    }
,    "portfolio": {
        "componentname": "portfolio",
        "category": "advance",
        "icon": "fas fa-user",
        "row": false,
        "hidden": false,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("portfolio/portfolioView"),
        "beforedrop": function ($appendedParent, $appendedLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendedLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("portfolio/portfolioBasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();


                        LoadSettings();
                        Init();

                        function LoadSettings() {
                            var isHeadingHidden = $parent.find('.cardHead').hasClass('hide-element');
                            if (!isHeadingHidden)
                                $('#showCardHeading').prop('checked', true);

                            var isDetailVisible = $parent.find('.cardName').hasClass('hide-element');
                            if (!isDetailVisible)
                                $('#showCardName').prop('checked', true);

                            var isImageVisible = $parent.find('.cardImage').hasClass('hide-element');
                            if (!isImageVisible)
                                $('#showCardImage').prop('checked', true);

                            var isDetailVisible = $parent.find('.showContact').hasClass('hide-element');
                            if (!isDetailVisible)
                                $('#showContact').prop('checked', true);

                            var isDetailVisible = $parent.find('.showDesignation').hasClass('hide-element');
                            if (!isDetailVisible)
                                $('#showDesignation').prop('checked', true);



                        }

                        function Init() {

                            //Holder Settings
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
                            //Holder Settings End here


                            //Show & Hide Components                            
                            $('#showCardHeading').off().on('click', function () {
                                var isChecked = $(this).is(':checked');

                                if (!isChecked) {
                                    $parent.find('.cardHead').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.cardHead').each(function () {
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#showCardName').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    $parent.find('.cardName').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.cardName').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                            $('#showDesignation').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    $parent.find('.showDesignation').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.showDesignation').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                            $('#showCardImage').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    $parent.find('.cardImage').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.cardImage').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                            $('#showContact').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    $parent.find('.showContact').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.showContact').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                        }
                    }
                },


                "Heading": {
                    "DOM": EasyLibrary.ReadDOM("portfolio/proTestHeading"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var properties = {
                            FontSizeSlider: '#headingFontSizeSlider',
                            FontSizeHandle: '#headingFontSizeHandle',
                            WidthSlider: '#headingFontWidthSlider',
                            WidthHandle: '#headingFontWidthHandle',
                            LetterSpacingSlider: '#headingLetterSpacingSlider',
                            LetterSpacingHandle: '#headingLetterSpacingHandle',
                            TextTransform: '#headingTextTransform',
                            FontFamily: '#headingFontFamily',
                            FontWeight: '#headingFontWeight',
                            FontColor: '#headingFontColor'
                        }

                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('h1');

                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }

                        FontSetting($parent, $textChange, properties);
                    }
                },

                "Name": {
                    "DOM": EasyLibrary.ReadDOM("portfolio/proTestDescSetting"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();

                        var properties = {
                            FontSizeSlider: '#descFontSizeSlider',
                            FontSizeHandle: '#descFontSizeHandle',
                            WidthSlider: '#descFontWidthSlider',
                            WidthHandle: '#descFontWidthHandle',
                            LetterSpacingSlider: '#descLetterSpacingSlider',
                            LetterSpacingHandle: '#descLetterSpacingHandle',
                            TextTransform: '#descTextTransform',
                            FontFamily: '#descFontFamily',
                            FontWeight: '#descFontWeight',
                            FontColor: '#descFontColor'
                        }

                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('p').eq(0);

                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        FontSetting($parent, $textChange, properties);
                    }
                },

                "Designation": {
                    "DOM": EasyLibrary.ReadDOM("portfolio/designationTxt"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('p').eq(1);
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    }
                },
                "profile image": {
                    "DOM": EasyLibrary.ReadDOM("portfolio/profileimage"),
                    "onload": function ($image) {
                        $parent = $image.parent().parent();
                        $img = $parent.find('img').eq(0);
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        //var defaultProfileImage = $img.attr('src');
                        //$('#profileImage').attr('src', defaultProfileImage);


                        /*for changing profile image*/
                        $('#profileImage').on('click', function () {
                            var $this = $(this);

                            $this.SageMedia({
                                userModuleID: webBuilderUserModuleID,
                                onSelect: function (src, response, type, filename, extension) {
                                    src = src.replace(/\\/g, '');
                                    $this.attr('src', src);
                                    $img.attr('src', src);
                                },
                                mediaType: 'image'
                            });

                        });

                        ChangeRoundImageWidth();                      


                        /* Image Width Slider*/

                        function ChangeRoundImageWidth() {
                            var roundImageWidth = 0;
                            var imgHeight = parseInt($img.width());
                            var imgWidth = parseInt($img.height());

                            roundImageWidth = imgHeight;

                            function ImageBoxRadius(space) {
                                $img.css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });
                                $img.parent().css({
                                    'height': space + 'px',
                                    'width': space + 'px',
                                    'border-radius': '50%'
                                });



                            }
                            AdvanceSageSlider($('#imageRoundSliderprofile'), $('#imageRoundHandleprofile'), 50, 200, roundImageWidth, ImageBoxRadius, $parent, 'px');
                        }
                    }
                },

                "Portfolio Background": {
                    "DOM": EasyLibrary.ReadDOM("portfolio/portfolioBackground"),
                    "onload": function ($item) {
                        $parent = $item.parent().parent();


                        var $shadedlayer = $parent.find(' > .editor-row-shaded-layer');
                        var currentImage = '';
                        var currentImageSource = '';
                        if ($parent.hasClass('editor-row-shaded-layer')) {
                            $shadedlayer = $parent;
                            $parent = $parent.parent();
                        }



                        //for setting selected image as default 
                        // if ($parent.css('background-image')) {
                        //     currentImage = $parent.css('background-image').split('/').pop().replace(/\"|\'|\)/g, '');
                        //      currentImageSource = "/Media/" + currentImage;
                        // }
                        //else
                        // {
                        //     currentImage = 'ellie.jpg';
                        //     currentImageSource = "/Media/" + currentImage;
                        //     $parent.css({'background-image':'url("' + currentImageSource + '")'})
                             
                        // }
                         $('#RowBGImage').attr('src', currentImageSource);
                      
                        /*For Shaded Layer*/
                        if ($shadedlayer.length > 0) {
                            $('#shadedLayerActive').prop('checked', true);
                            var conClass = $shadedlayer.attr('class').replace('editor-row-container', '').trim();
                            $('#selContainerWidth').val(conClass);
                            $('#divPickShaded').fadeIn(400);
                            $('#chooseColorShadedCol').css({ 'background-color': $shadedlayer.css('background-color') });
                        }
                        else {
                            $('#shadedLayerActive').prop('checked', false);
                        }

                        $('#shadedLayerActive').off().on('click', function () {
                            if ($(this).is(':checked')) {
                                var shadedDiv = divStart('editor-row-shaded-layer') + divEnd;
                                var appendElem = $parent.children();
                                $parent.append(shadedDiv);
                                $('#divPickShaded').fadeIn(400);
                                $parent.find(' > .editor-row-shaded-layer').append(appendElem).css({ 'background-color': 'rgba(37, 113, 211, 0.38)' });
                                var parentClasses = $parent.attr('class');
                                var paddingClass = parentClasses.match(/editor-com-innerSpacing-[a-z]{0,10}(-neg){0,1}-[0-9]{1,3}/g);
                                if (paddingClass !== null) {
                                    $(paddingClass).each(function (i, v) {
                                        $parent.find(' > .editor-row-shaded-layer').addClass(v);
                                        $parent.removeClass(v);
                                    });
                                }
                                ChooseShadeColor();

                            }
                            else {
                                /* removing and adding padding between shaded and row */
                                var parentClasses = $parent.find('.editor-row-shaded-layer').attr('class');
                                var paddingClass = parentClasses.match(/editor-com-innerSpacing-[a-z]{0,10}(-neg){0,1}-[0-9]{1,3}/g);
                                if (paddingClass !== null) {
                                    $(paddingClass).each(function (i, v) {
                                        $parent.find('.editor-row-shaded-layer').removeClass(v);
                                        $parent.addClass(v);
                                    });
                                }
                                RemoveShadedLayer();
                            }
                        });

                        function ChooseShadeColor() {
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find(' > .editor-row-shaded-layer').css({
                                        'background-color': objColor.bgColor,

                                    });
                                }
                            });
                            $('#chooseColorShadedCol').colorPicker(colorPickerOption);

                        }

                        /*Removes Shaded Layer */
                        function RemoveShadedLayer() {
                            var appendElem = $parent.find(' > .editor-row-shaded-layer').children();
                            $parent.append(appendElem);
                            $parent.find(' > .editor-row-shaded-layer').remove();
                            $('#divPickShaded').fadeOut(100);
                            $('#shadedLayerActive').prop('checked', false);
                        }



                        /* Todo's on Background Selection */
                        $('#selBackround').off().on('change', function () {
                            $this = $(this);
                            var selector = $this.val();
                            var backgroundColor = '';
                            var backgroundImage = '';
                            switch (selector) {
                                case 'color': {
                                    ChooseColor();
                                    $('#divBackColorChoose').show();
                                    $('#divBackImageChoose').hide();
                                    backgroundColor = 'color';
                                    backgroundImage = '';
                                    //$parent.css({
                                    //    'background-color': //'rgb(99, 122, 144)',
                                    //    'background-image': ''
                                        
                                    //})
                                    
                                    break;
                                }
                                case 'image': {

                                    $('#divBackColorChoose').hide();
                                    $('#divBackImageChoose').show();
                                    backgroundImage = 'image';
                                    backgroundColor = '';
                                    currentImage = $parent.css('background-image').split('/').pop().replace(/\"|\'|\)/g, '');
                                   
                                    currentImageSource = "/Media/" + currentImage;
                                    $parent.css({
                                        'background-image': 'url("' + currentImageSource + '")',
                                        'backgorund-color': ''
                                    })
                                    ChooseImage();

                                    break;
                                }
                                default: {
                                    $('#divBackColorChoose').hide();
                                    $('#divBackImageChoose').hide();
                                    backgroundColor = '';
                                    backgroundImage = '';
                                    removeColorBG();
                                    removeImageBG();
                                 
                                    break;

                                }
                            }
                            $parent.attr('data-backgroundcolor', backgroundColor);
                            $parent.attr('data-backgroundimage', backgroundImage);

                        });

                        function removeImageBG() {
                            $parent.removeClass('editor-row-bg-image-parallax');
                            $parent.css({
                                'background-image': ''
                            });
                        }

                        function removeColorBG() {
                            $parent.css({ 'background-color': '', 'color': '' });
                            
                        }

                        function ChooseImage() {
                            $('#RowBGImage').on('click', function () {
                                var $this = $(this);

                                $this.SageMedia({
                                    userModuleID: webBuilderUserModuleID,
                                    onSelect: function (src, response, type, filename, extension) {
                                        src = src.replace(/\\/g, '/');
                                        $this.attr('src', src);

                                        $parent.css({
                                            'background-image': 'url("' + src + '")'
                                        });
                                    },
                                    mediaType: 'image'
                                });

                            });

                        }

                        function ChooseColor() {
                            $('#chooseColorColBG').css('background-color', $parent.css('background-color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.css({
                                        'background-color': objColor.bgColor,
                                        'background-image': ''
                                    });
                                }
                            });
                            $('#chooseColorColBG').colorPicker(colorPickerOption);

                            // $('#selBackround').val('color');
                        }

                        /* To Set Selected Option in the Combo box*/

                        var backgroundColor = $parent.attr('data-backgroundColor');
                        var backgroundImage = $parent.attr('data-backgroundImage');
                        var selected = 'none';
                        if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
                            selected = 'color';
                        }
                        else if (typeof (backgroundImage) !== 'undefined' && backgroundImage.length > 0) {
                            selected = 'image';

                        }
                        $('#selBackround').val(selected);
                        $('#selBackround').trigger('change');


                        /* for image effect(parallax,cover etc) */
                        $('bgImageEffect').off().on('change', function () {
                            var newEffect = $(this).val();
                            var effectClass = 'background-effect-size-contain';
                            var sfEffect = $parent.attr('class').match(/background-effect-[a-z]{1,10}-[a-z]{1,10}/g);
                            if (sfEffect !== null) {
                                effectClass = sfEffect[0];
                            }
                            $parent.removeClass(effectClass).addClass(newEffect);
                        });
                    }
                },




                //"Background": {
                //    "options": ["image", "color"]
                //},

                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },

            }
        }
    }
,    "proHos": {
        "componentname": "proHos",
        "category": "pro",
        "collection": false,
        "icon": "fa fa-th",
        "row": true,
        "hidden": false,
        "type": "gallery",
        "defaultdata": EasyLibrary.ReadDOM("proTestComponent/proTestComponent"),
        "onDrop": function ($appendLayer) { },
        "onSort": function (ui) {
            this.common.InitalizeSort(ui, ui.find('.galleryContainer').attr('data-type'));
        },
        "loadSetting": function ($item) { },
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            if (dropped) {

                var galleryContainer = $appendLayer.find('.galleryContainer');
                var dataType = galleryContainer.attr('data-type');
                var defaultCount = galleryContainer.attr('data-defaultcount');

                var defaultData = component[dataType].defaultdata;
                var updatedDefaultData = this.common.FindReplaceDeleteHelper(defaultData);

                var itemsCount = 3;

                for (var times = 0; times < itemsCount; times++) {
                    $appendLayer.find('.galleryContainer')
                        .append('<div class="editor-com-outerSpacing-left-0 editor-com-outerSpacing-right-0 editor-com-outerSpacing-bottom-0 editor-com-outerSpacing-top-0 sfFixed editor-com-innerSpacing-top-0 editor-com-innerSpacing-right-0 editor-com-innerSpacing-bottom-0 editor-com-innerSpacing-left-0"> ' + updatedDefaultData + '</div>');
                }
                galleryContainer.find('> div > div.editor-component').addClass('onhover-border-none');



                var galleryLib = this.view.library;

                galleryLib.UpdateWidthAttribute(galleryContainer, itemsCount);

                var space = galleryContainer.attr('data-galhorspacing');

                if (!space) space = 0;

                galleryLib.ChangeRightSpacing(space, $appendLayer);

                this.common.InitalizeEvents(galleryContainer, dataType);

            }

            this.common.SetCustomEvents();

            SettingEvents();
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("proTestComponent/proTestComponentBasic"),
                    "onload": function ($item) {
                        var $editRow = $item.parents('.editor-row');
                        var $parent = $item.parent().parent();

                        var galContainer = $parent.find('.galleryContainer');
                        var dataType = galContainer.attr('data-type');

                        var galHeading = $parent.find('.galleryHeading');
                        var galItem = $('#slcGalleryItem');
                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {

                            //var getComponentOptions = function () {
                            //    var option = '';
                            //    var componentList = Object.keys(component);
                            //    var componentListLen = componentList.length;
                            //    for (var i = 0; i < componentListLen; i++) {
                            //        var $compo = component[componentList[i]];
                            //        //console.log($compo['componentname'] + " " + !$compo['hidden'] + " " + $compo['collection'] + " " + $compo['category']);
                            //        if (!$compo['hidden'] && $compo['collection'] && $compo['category'] !== "layout")
                            //            option += DOMCreate('option', $compo['componentname']);
                            //    }
                            //    return option;
                            //}
                            //SetPreview(dataType);
                            //galItem.html(getComponentOptions());
                            //galItem.val(dataType);

                            var perRow = galContainer.attr('data-galleryperrow');

                            if (!perRow) perRow = "3";

                            $('#slcGalleryItemsPerRow').val(perRow);

                            var isIconHidden = galHeading.hasClass('hide-element');

                            if (!isIconHidden) $('#showGalleryHeading').prop('checked', true);


                            var $container = $editRow.find('div.editor-row-container');
                            if ($container.length > 0) {
                                $('#askContainer').prop('checked', true);
                                var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                                $('#selContainerWidth').val(conClass);
                                $('#additionalContainer').fadeIn(400);
                            } else {
                                $('#askContainer').prop('checked', false);
                            }
                        }

                        //var outerDom = CreateSliderDOM(marginSliderList[2][0], marginSliderList[2][1], 'Right');
                        //marginSliderList[2][2] = true;

                        function TriggerEvents() {

                            var gutterSpaceControl = $('#galleryHvrGutterSpace');

                            var sliderMin = gutterSpaceControl.data('slidemin');
                            var sliderMax = gutterSpaceControl.data('slidemax');

                            var galleryItems = galContainer.children();

                            var horGutterSpace = galContainer.attr('data-galhorspacing');
                            var verGutterSpace = galContainer.attr('data-galverspacing');


                            var currentMarginRight = 0;
                            if (!horGutterSpace) currentMarginRight = 0;
                            else currentMarginRight = horGutterSpace;

                            var currentMarginBottom = 0;
                            if (!verGutterSpace) currentMarginBottom = 0;
                            else currentMarginBottom = verGutterSpace;

                            var galleryLib = component["gallery"]["view"]["library"];

                            var changeRightSpace = galleryLib.ChangeRightSpacing;
                            var changeBottomSpace = galleryLib.ChangeBottomSpacing;

                            AdvanceSageSlider($('#galleryHorGutterSpaceSlider'), $('#galleryHorGutterSpaceHandle'), sliderMin, sliderMax, currentMarginRight, changeRightSpace, $parent, 'px');
                            AdvanceSageSlider($('#galleryVerGutterSpaceSlider'), $('#galleryVerGutterSpaceHandle'), sliderMin, sliderMax, currentMarginBottom, changeBottomSpace, $parent, 'px');

                            var currentTotal = galleryItems.length;

                            function ReAssignTotalItems(count, $par, $dontInit) {

                                var perRow = $('#slcGalleryItemsPerRow').find("option:selected").text();

                                galContainer.attr('data-galleryperrow', perRow);

                                var itemsPerRow = parseInt(perRow);
                                var currentColsCount = galContainer.children().length;

                                //var totalRequired = count;
                                var totalItems = parseInt(count);

                                var addComponent = true;
                                var itemDiff = Math.abs(currentColsCount - totalItems);

                                if (totalItems < currentColsCount) addComponent = false;


                                if (!addComponent) {
                                    $dontInit = true;
                                    SageConfirmDialog(' Taking this step will result in some data loss. Do you wish to continue ?').done(function () {

                                        for (var itemCount = 0; itemCount < itemDiff; itemCount++) {
                                            var currentContainer = $parent.find('.galleryContainer').children();
                                            currentContainer.eq(0).remove();

                                        }
                                    }).fail(function () {
                                        $('#numCounterTotal').html(totalItems + 1);

                                    });

                                }
                                else {
                                    var containerComponents = $parent.find('.galleryContainer').children();

                                    for (var itemCount2 = 0; itemCount2 < itemDiff; itemCount2++) {
                                        var itemCopy = containerComponents.eq(0).clone(true);
                                        containerComponents.parent().append(itemCopy);
                                    }
                                }

                                galleryLib.UpdateWidthAttribute(galContainer, itemsPerRow);

                                var horizonalGutterSpace = $('#galleryHorGutterSpaceHandle').text();
                                var verticalGutterSpace = $('#galleryVerGutterSpaceHandle').text();

                                changeRightSpace(horizonalGutterSpace, $parent);
                                changeBottomSpace(verticalGutterSpace, $parent);


                                var updatedGalContainer = $parent.find('.galleryContainer');
                                var currentDataType = updatedGalContainer.attr('data-type');
                                if (!$dontInit) {
                                    component["gallery"]["common"].InitalizeEvents(updatedGalContainer, currentDataType);
                                }

                            }

                            EasyLibrary.NumberCounter($('.manualNumCounter'), 1, 50, 1, currentTotal, $parent, ReAssignTotalItems);

                            $('#showGalleryHeading').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    galHeading.addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    galHeading.each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                            $('#slcGalleryItemsPerRow').off().on('change', function () {
                                var totalRequired = $('.totalNumCount').text();
                                ReAssignTotalItems(totalRequired, $parent, true);
                            });

                            galItem.off().on('change', function () {
                                var currentComp = $(this).val();
                                SetPreview(currentComp);
                            });


                            //$('#btnApplyGalleryComp').off().on('click', function () {

                            //    var updatedGalContainer = $parent.find('.galleryContainer');
                            //    var currentDataType = updatedGalContainer.attr('data-type');
                            //    var newComp = $('#slcGalleryItem option:selected').val();
                            //    if (currentDataType !== newComp)
                            //        SageConfirmDialog(' Are you sure you want to change the gallery item type? All your previous data will be lost. Do you wish to continue? ').done(function () {

                            //            var defaultData = component[newComp].defaultdata;

                            //            var galleryCommon = component["gallery"]["common"];

                            //            var updatedDefaultData = galleryCommon.FindReplaceDeleteHelper(defaultData);
                            //            //updatedDefaultData = galleryCommon.RemoveBorder(updatedDefaultData);

                            //            updatedGalContainer.children().children().replaceWith(updatedDefaultData);
                            //            updatedGalContainer.find('.editor-component').addClass('onhover-border-none');

                            //            galContainer.attr('data-type', newComp);

                            //            galleryCommon.InitalizeEvents(updatedGalContainer, newComp);
                            //            SettingEvents();
                            //            galleryCommon.SetCustomEvents();
                            //            TriggerView($parent);
                            //            dataType = newComp;
                            //        }).fail(function () { });

                            //});

                            //$('#btnCancelCurrentComp').off().on('click', function () {
                            //    SetPreview(dataType);
                            //    galItem.val(dataType);
                            //});



                            //$('#askContainer').off().on('click', function () {
                            //    if ($(this).is(':checked')) {
                            //        var containerDiv = divStart('editor-row-container container-medium') + divEnd;
                            //        var appendElem = '';
                            //        if ($parent.find('> .editor-row-shaded-layer').length === 0) {
                            //            appendElem = $parent.children();
                            //            $parent.append(containerDiv);
                            //        } else {
                            //            appendElem = $parent.find('> .editor-row-shaded-layer').children();
                            //            $parent.find('> .editor-row-shaded-layer').append(containerDiv);
                            //        }
                            //        $parent.find('.editor-row-container').append(appendElem);
                            //        $('#selContainerWidth').val('container-medium');
                            //        $('#additionalContainer').fadeIn(400);

                            //    } else {
                            //        var appendElem = $parent.find('.editor-row-container').children();
                            //        if ($parent.find('> .editor-row-shaded-layer').length === 0) {
                            //            $parent.append(appendElem);
                            //        } else {
                            //            $parent.find('> .editor-row-shaded-layer').append(appendElem);
                            //        }
                            //        $parent.find('.editor-row-container').remove();
                            //        $('#additionalContainer').fadeOut(400);
                            //    }
                            //    //CalculateWidth($parent.find('.colWrapper'));
                            //    TriggerView($parent);
                            //});


                            //$('#selContainerWidth').off().on('change', function () {
                            //    var containWidth = $(this).val();
                            //    var $container = $editRow.find('.editor-row-container');
                            //    $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                            //    $container.addClass(containWidth);
                            //});
                        }

                        //function FindReplaceDeleteHelper(content) {
                        //    var newHTML = $(content)
                        //        .find('div').eq(1)
                        //        .find('.deletehelper').eq(0)
                        //        .removeClass('deletehelper')
                        //        .addClass('deleteGalleryItem sfError')
                        //        .parents('.editor-component').eq(0)[0].outerHTML;

                        //    return newHTML;
                        //}

                        //function SetPreview(componentName) {

                        //    var previewPanel = $('#previewPanel');
                        //    var defaultData = component[componentName].defaultdata;
                        //    previewPanel.html(defaultData);
                        //    previewPanel.find('.editor-component').eq(0).addClass('overflow-hidden');
                        //    component["gallery"]["common"].InitalizeEvents(previewPanel, componentName);

                        //    previewPanel.find('[contenteditable="true"]').removeAttr('contenteditable');
                        //}

                    }
                },
                "Background":
                    {
                        "options": ["color", 'image']
                    },

                "Heading": {
                    "DOM": EasyLibrary.ReadDOM("proTestComponent/proTestHeading"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var properties = {
                             FontSizeSlider : '#headingFontSizeSlider',
                             FontSizeHandle : '#headingFontSizeHandle',
                             WidthSlider : '#headingFontWidthSlider',
                             WidthHandle : '#headingFontWidthHandle',
                             LetterSpacingSlider :'#headingLetterSpacingSlider',
                             LetterSpacingHandle : '#headingLetterSpacingHandle',
                             TextTransform : '#headingTextTransform',
                             FontFamily : '#headingFontFamily',
                             FontWeight : '#headingFontWeight',
                             FontColor : '#headingFontColor'
                        }

                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('h1');

                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }

                        FontSetting($parent, $textChange, properties);
                    }
                },


                "Description": {
                    "DOM": EasyLibrary.ReadDOM("proTestComponent/proTestDescSetting"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();

                        var properties = {
                         FontSizeSlider : '#descFontSizeSlider',
                         FontSizeHandle : '#descFontSizeHandle',
                         WidthSlider : '#descFontWidthSlider',
                         WidthHandle : '#descFontWidthHandle',
                         LetterSpacingSlider : '#descLetterSpacingSlider',
                         LetterSpacingHandle : '#descLetterSpacingHandle',
                         TextTransform : '#descTextTransform',
                         FontFamily : '#descFontFamily',
                         FontWeight : '#descFontWeight',
                         FontColor : '#descFontColor'
                    }

                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('p');

                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }

                        FontSetting($parent, $textChange, properties);
                    }
                },

                //using button text setting
                
                // #region Using Button Font Settings                
                //"Description":{
                //    "DOM":EasyLibrary.ReadDOM("proTestComponent/descriptionSetting"),
                //    "onload" : function($item){
                //        var $parent = $item.parent().parent();
                //        var $anchor = $parent.find('p');

                //        InitEvents();
                //        function InitEvents() {
                //            FontSize();
                //            FontColor();
                //            TextTranformCheck();
                //            LoadFontFamily();
                //        }

                //        //To change Font Size
                //        function FontSize() {
                //            var fontSize = parseInt($anchor.css('font-size').replace('px', ''));
                //            function FontSizeChange(space)
                //            {
                //                $anchor.css('font-size', space);
                //            }
                //            AdvanceSageSlider($('#descriptionSlider'), $('#descriptionHandle'), 5, 100, fontSize, FontSizeChange, $parent, 'px');
                //        }

                //        //To change Font Color
                //        function FontColor() {
                //            $('#descriptionColor').css('font-color', $anchor.css('color'));
                //            var colorPickerOption = ColorPickerOption({
                //                renderCallback: function ($elm, toggled) {
                //                    var objColor = RenderCallBackColor(this);
                //                    $anchor.css({ 'color': objColor.bgColor });
                //                }
                //            });
                //            $('#descriptionColor').colorPicker(colorPickerOption);
                //        }


                //        //To load fonts 
                //        function LoadFontFamily() {
                //            $('#descfontfamily').html(DOMFontAdvanceCollection());

                //            var defaultFontFamily = 'montserrat';
                //            var classesList = $anchor.attr('class');
                //            if (typeof (classesList) !== "undefined") {
                //                var fontClasses = classesList.match(/ff-(\w+)/g);
                //                if (fontClasses !== null) {
                //                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                //                }
                //            }
                //            $('#descfontfamily').val(defaultFontFamily);
                //            fontWeight(defaultFontFamily);
                //            if (typeof (classesList) !== "undefined") {
                //                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                //                if (weightClasses !== null) {
                //                    $('#descfontWeight').val(weightClasses[0].replace('f-weight-', ''));
                //                }
                //            }
                //            $('#descfontWeight').off().on('change', function () {
                //                var classList = $anchor.attr('class');
                //                if (typeof (classesList) !== "undefined") {
                //                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                //                    if (familyClass !== null) {
                //                        $anchor.removeClass(familyClass[0]);
                //                    }
                //                }
                //                $anchor.addClass('f-weight-' + $(this).val());
                //            });

                //            $('#descfontfamily').off().on('change', function () {
                //                var classList = $anchor.attr('class');
                //                if (typeof (classesList) !== "undefined") {
                //                    var fontClass = classList.match(/ff-(\w+)/g);
                //                    if (fontClass !== null) {
                //                        $anchor.removeClass(fontClass[0]);
                //                    }
                //                }
                //                $anchor.addClass('ff-' + $(this).val());
                //                fontWeight($(this).val());
                //                $('#descfontWeight').trigger('change');
                //            });
                //            function fontWeight(fontName) {
                //                var fontDOM = DOMFontWeight(fontName);
                //                if (fontDOM.length > 0) {
                //                    $('#descfontWeight').html(fontDOM);
                //                }
                //            }
                //        }


                //        //For Case Transformation
                //        function TextTranformCheck() {
                //            var trasformValue = '';
                //            if ($parent.hasClass('editor-text-transform-uppercase')) {
                //                trasformValue = 'editor-text-transform-uppercase';
                //            } else if ($parent.hasClass('editor-text-transform-lowercase')) {
                //                trasformValue = 'editor-text-transform-lowercase';
                //            }
                //            $('#descriptionTextTransform').val(trasformValue);
                //            $('#descriptionTextTransform').on('change', function () {
                //                var tranformCase = $(this).val();
                //                switch (tranformCase) {
                //                    case 'editor-text-transform-uppercase':
                //                        $anchor.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                //                        break;
                //                    case 'editor-text-transform-lowercase':
                //                        $anchor.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                //                        break;
                //                    case '':
                //                        $anchor.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                //                        break;
                //                }
                //            });
                //        }
                //    }
                //},
                // #endregion

                //"Image":{
                //    "DOM": EasyLibrary.ReadDOM("proTestComponent/proTestImageSetting"),
                //    "onload": function ($this) {
                //        var $parent = $this.parent().parent();
                //        var $image = $parent.find('img').eq(0);
                //        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                //        $parent.addClass('activeSetting');
                //        LoadSettings();

                //        function LoadSettings() {
                //            ImageDisplay();
                //            ImageWidthEvent();
                //            ImageBorder();
                //            ImageFitCover();
                //        }

                //        function ImageDisplay() {
                //            var imageHeight = $parent.height();
                //            var imageWidth = $parent.width();
                //            var imageRadius = parseInt($parent.css('border-top-left-radius').replace('%', ''));
                //            if (imageHeight === imageWidth && imageRadius > 0) {
                //                $('.rectangleOption').hide();
                //                $('.roundOption').show();
                //                $('#imageDisplay').val('round');
                //            } else {
                //                $('.rectangleOption').show();
                //                $('.roundOption').hide();
                //                $('#imageDisplay').val('rectangle');
                //            }
                //            $('#imageDisplay').on('change', function () {
                //                var $this = $(this);
                //                var val = $this.val();
                //                switch (val) {
                //                    case 'round':
                //                        $('.rectangleOption').hide();
                //                        $('.roundOption').show();
                //                        ChangeRoundImageWidth();
                //                        $parent.addClass('round-image');
                //                        break;
                //                    case 'rectangle':
                //                        $('.rectangleOption').show();
                //                        $('.roundOption').hide();
                //                        $image.css({ 'border-radius': '', 'width': '', 'height': $image.height() });
                //                        $parent.css({
                //                            'height': $image.height(),
                //                            'width': '',
                //                            'border-radius': ''
                //                        });
                //                        $('#imageRadiusSlider').slider('value', 0);
                //                        $('#imageRadiusHandle').text(0);
                //                        $('.changeFontSize').val($image.height());
                //                        $parent.removeClass('round-image');
                //                        break;
                //                }
                //            });

                //            ManualHeightEntryEvents();
                //            ImageBoxRadius();
                //            RoundImageWidth();
                //        }
                //    }
                //}
                

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
                    },
                    "selectLayer": function ($elem) {

                        return $elem.parent().parent();
                    },
                },

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "view": {
            "view": function () { },

            "library": {


                "UpdateWidthAttribute": function ($galleryContainer, newColCount) {

                    var widthPercentage = "";
                    switch (newColCount) {
                        case 2: widthPercentage = "50%"; break;
                        case 3: widthPercentage = "33.33%"; break;
                        case 4: widthPercentage = "25%"; break;
                        case 5: widthPercentage = "20%"; break;
                        case 1: widthPercentage = "100%"; break;
                    }

                    $galleryContainer.attr('data-colwidth', widthPercentage);

                },


                "ChangeRightSpacing": function (space, $par) {

                    if (space !== 'undefined' && typeof (space) !== 'undefined') {
                        var times = 5;

                        var galContainer = $par.find('.galleryContainer');

                        var childComp = galContainer.children();

                        var marginRightClass = childComp.attr('class').match(/editor-com-outerSpacing-right-[0-9]{1,3}/g);
                        var marginLeftClass = childComp.attr('class').match(/editor-com-outerSpacing-left-[0-9]{1,3}/g);


                        if (marginRightClass !== null) {

                            childComp.each(function () {
                                var $me = $(this);
                                $me.removeClass(marginRightClass[0].trim());
                                $me.removeClass(marginLeftClass[0].trim());
                            });

                            var compOuterSpace = space * times;


                            var className = '';
                            var leftSpaceClassName = '';
                            if (space >= 0) {
                                className = 'editor-com-outerSpacing-right-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-left-' + compOuterSpace;
                            }
                            else {
                                space = Math.abs(space);
                                className = 'editor-com-outerSpacing-right-neg-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-left-neg-' + compOuterSpace;

                            }

                            childComp.addClass(className);
                            childComp.addClass(leftSpaceClassName);
                            childComp.addClass('display-inline-block');
                            var widthPercentage = galContainer.attr('data-colwidth');
                            galContainer.attr('data-galhorspacing', space);
                            var newWidthAttr = "calc(" + widthPercentage + " - " + (compOuterSpace * 2) + "px)";
                            childComp.each(function (i, v) {
                                var $me = $(this);
                                $me.css(
                                    {
                                        "width": newWidthAttr,
                                        "float": "left"
                                    });
                            });
                        }
                    }
                },


                "ChangeBottomSpacing": function (space, $par) {


                    if (space !== 'undefined' && typeof (space) !== 'undefined') {

                        var times = 5;

                        var galContainer = $par.find('.galleryContainer');

                        var childComp = galContainer.children();

                        var marginBottomClass = childComp.attr('class').match(/editor-com-outerSpacing-bottom-[0-9]{1,3}/g);
                        var marginTopClass = childComp.attr('class').match(/editor-com-outerSpacing-top-[0-9]{1,3}/g);


                        if (marginBottomClass !== null) {

                            childComp.each(function () {
                                var $me = $(this);
                                $me.removeClass(marginBottomClass[0].trim());
                                $me.removeClass(marginTopClass[0].trim());
                            });

                            var compOuterSpace = space * times;


                            var className = '';
                            var leftSpaceClassName = '';
                            if (space >= 0) {
                                className = 'editor-com-outerSpacing-bottom-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-top-' + compOuterSpace;

                            }
                            else {
                                space = Math.abs(space);
                                className = 'editor-com-outerSpacing-bottom-neg-' + compOuterSpace;
                                leftSpaceClassName = 'editor-com-outerSpacing-top-neg-' + compOuterSpace;
                            }

                            childComp.addClass(className);
                            childComp.addClass(leftSpaceClassName);

                            galContainer.attr('data-galverspacing', space);

                        }
                    }
                },
            }
        },
        "common": {

            "FindReplaceDeleteHelper": function (editorComponentContainer) {
                var newHTML = $(editorComponentContainer)
                    .find('div').eq(1)
                    .find('.deletehelper').eq(0)
                    .removeClass('deletehelper')
                    .addClass('deleteGalleryItem sfError')
                    .parents('.editor-component').eq(0)[0].outerHTML;

                return newHTML;
            },


            "RemoveBorder": function (editorComponentContainer) {
                var newHTML = $(editorComponentContainer)
                    .find('> div > div.editor-component')
                    .addClass('onhover-border-none');

                return newHTML;
            },

            "SetCustomEvents": function () {

                $('.deleteGalleryItem').off().on('click', function () {
                    var itemToDelete = $(this).parent().parent().parent();
                    var siblingsCount = itemToDelete.siblings().length;

                    if (siblingsCount !== 0) {

                        SageConfirmDialog(' Do you want to delete this item ?').done(function () {
                            $('#numCounterTotal').text(siblingsCount);
                            itemToDelete.remove();
                        });
                    }

                });

            },

            "InitalizeEvents": function ($sender, componentName) {
                var compo = component[componentName];

                if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined") {
                    compo.afterdrop($sender.parent(), $sender, true, false);
                }

            },

            "InitalizeSort": function (ui, componentName) {
                var compo = component[componentName];

                if (typeof compo !== "undefined" && typeof compo.onSort !== "undefined") {
                    compo.onSort(ui, componentName);
                }
            }

        },

        "remove": function ($cloneDOM) { },
    }

,    "proportfolio": {
        "componentname": "proportfolio",
        "category": "pro",
        "collection": false,
        "row": true,
        "hidden": false,
        "type": "portfolio",
        "defaultdata": EasyLibrary.ReadDOM("proportfolio/proportfolio"),
        "onDrop":function($appendLayer){},
        "onSort": function (ui) {
            this.common.InitializeSort(ui,ui.find('.galleryContainer').attr('data-type'));
        },
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },

        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            if (dropped) {

                var galleryContainer = $appendLayer.find('.galleryContainer');
                var dataType = galleryContainer.attr('data-type');
                var defaultCount = galleryContainer.attr('data-defaultcount');

                var defaultData = component[dataType].defaultdata;
                var updatedDefaultData = this.common.FindReplaceDeleteHelper(defaultData);

                var itemsCount = 3;

                for (var times = 0; times < itemsCount; times++) {
                    $appendLayer.find('.galleryContainer')
                        .append('<div class="editor-com-outerSpacing-left-0 editor-com-outerSpacing-right-0 editor-com-outerSpacing-bottom-0 editor-com-outerSpacing-top-0 sfFixed editor-com-innerSpacing-top-0 editor-com-innerSpacing-right-0 editor-com-innerSpacing-bottom-0 editor-com-innerSpacing-left-0"> ' + updatedDefaultData + '</div>');
                }
                galleryContainer.find('> div > div.editor-component').addClass('onhover-border-none');



                var galleryLib = this.view.library;

                galleryLib.UpdateWidthAttribute(galleryContainer, itemsCount);

                var space = galleryContainer.attr('data-galhorspacing');

                if (!space) space = 0;

                galleryLib.ChangeRightSpacing(space, $appendLayer);

                this.common.InitalizeEvents(galleryContainer, dataType);

            }

            this.common.SetCustomEvents();

            SettingEvents();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("proTestComponent/proTestComponentBasic"),
                    "onload": function ($item) {
                        var $editRow = $item.parents('.editor-row');
                        var $parent = $item.parent().parent();

                        var galContainer = $parent.find('.galleryContainer');
                        var dataType = galContainer.attr('data-type');

                        var galHeading = $parent.find('.galleryHeading');
                        var galItem = $('#slcGalleryItem');
                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {

                            var perRow = galContainer.attr('data-galleryperrow');

                            if (!perRow) perRow = "3";

                            $('#slcGalleryItemsPerRow').val(perRow);

                            var isIconHidden = galHeading.hasClass('hide-element');

                            if (!isIconHidden) $('#showGalleryHeading').prop('checked', true);                       
                        }

                        function TriggerEvents() {
                            var gutterSpaceControl = $('#galleryHvrGutterSpace');

                            var sliderMin = gutterSpaceControl.data('slidemin');
                            var sliderMax = gutterSpaceControl.data('slidemax');

                            var galleryItems = galContainer.children();

                            var horGutterSpace = galContainer.attr('data-galhorspacing');
                            var verGutterSpace = galContainer.attr('data-galverspacing');


                            var currentMarginRight = 0;
                            if (!horGutterSpace) currentMarginRight = 0;
                            else currentMarginRight = horGutterSpace;

                            var currentMarginBottom = 0;
                            if (!verGutterSpace) currentMarginBottom = 0;
                            else currentMarginBottom = verGutterSpace;

                            var galleryLib = component["gallery"]["view"]["library"];

                            var changeRightSpace = galleryLib.ChangeRightSpacing;
                            var changeBottomSpace = galleryLib.ChangeBottomSpacing;

                            AdvanceSageSlider($('#galleryHorGutterSpaceSlider'), $('#galleryHorGutterSpaceHandle'), sliderMin, sliderMax, currentMarginRight, changeRightSpace, $parent, 'px');
                            AdvanceSageSlider($('#galleryVerGutterSpaceSlider'), $('#galleryVerGutterSpaceHandle'), sliderMin, sliderMax, currentMarginBottom, changeBottomSpace, $parent, 'px');

                            var currentTotal = galleryItems.length;

                            function ReAssignTotalItems(count, $par, $dontInit) {

                                var perRow = $('#slcGalleryItemsPerRow').find("option:selected").text();

                                galContainer.attr('data-galleryperrow', perRow);

                                var itemsPerRow = parseInt(perRow);
                                var currentColsCount = galContainer.children().length;

                                //var totalRequired = count;
                                var totalItems = parseInt(count);

                                var addComponent = true;
                                var itemDiff = Math.abs(currentColsCount - totalItems);

                                if (totalItems < currentColsCount) addComponent = false;


                                if (!addComponent) {
                                    $dontInit = true;
                                    SageConfirmDialog(' Taking this step will result in some data loss. Do you wish to continue ?').done(function () {

                                        for (var itemCount = 0; itemCount < itemDiff; itemCount++) {
                                            var currentContainer = $parent.find('.galleryContainer').children();
                                            currentContainer.eq(0).remove();

                                        }
                                    }).fail(function () {
                                        $('#numCounterTotal').html(totalItems + 1);

                                    });

                                }
                                else {
                                    var containerComponents = $parent.find('.galleryContainer').children();

                                    for (var itemCount2 = 0; itemCount2 < itemDiff; itemCount2++) {
                                        var itemCopy = containerComponents.eq(0).clone(true);
                                        containerComponents.parent().append(itemCopy);
                                    }
                                }

                                galleryLib.UpdateWidthAttribute(galContainer, itemsPerRow);

                                var horizonalGutterSpace = $('#galleryHorGutterSpaceHandle').text();
                                var verticalGutterSpace = $('#galleryVerGutterSpaceHandle').text();

                                changeRightSpace(horizonalGutterSpace, $parent);
                                changeBottomSpace(verticalGutterSpace, $parent);


                                var updatedGalContainer = $parent.find('.galleryContainer');
                                var currentDataType = updatedGalContainer.attr('data-type');
                                if (!$dontInit) {
                                    component["gallery"]["common"].InitalizeEvents(updatedGalContainer, currentDataType);
                                }

                            }

                            EasyLibrary.NumberCounter($('.manualNumCounter'), 1, 50, 1, currentTotal, $parent, ReAssignTotalItems);

                            $('#showGalleryHeading').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    galHeading.addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    galHeading.each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                            $('#slcGalleryItemsPerRow').off().on('change', function () {
                                var totalRequired = $('.totalNumCount').text();
                                ReAssignTotalItems(totalRequired, $parent, true);
                            });

                            galItem.off().on('change', function () {
                                var currentComp = $(this).val();
                                SetPreview(currentComp);
                            });
                        }

                    }

                },
            
        
                "Background":
                       {
                           "options": ["color", 'image']
                       },

                "Heading": {
                    "DOM": EasyLibrary.ReadDOM("proportfolio/proTestHeading"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var properties = {
                            FontSizeSlider: '#headingFontSizeSlider',
                            FontSizeHandle: '#headingFontSizeHandle',
                            WidthSlider: '#headingFontWidthSlider',
                            WidthHandle: '#headingFontWidthHandle',
                            LetterSpacingSlider: '#headingLetterSpacingSlider',
                            LetterSpacingHandle: '#headingLetterSpacingHandle',
                            TextTransform: '#headingTextTransform',
                            FontFamily: '#headingFontFamily',
                            FontWeight: '#headingFontWeight',
                            FontColor: '#headingFontColor'
                        }

                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('h1');

                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }

                        FontSetting($parent, $textChange, properties);
                    }
                },

                "Name": {
                    "DOM": EasyLibrary.ReadDOM("proportfolio/proTestDescSetting"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();

                        var properties = {
                            FontSizeSlider: '#descFontSizeSlider',
                            FontSizeHandle: '#descFontSizeHandle',
                            WidthSlider: '#descFontWidthSlider',
                            WidthHandle: '#descFontWidthHandle',
                            LetterSpacingSlider: '#descLetterSpacingSlider',
                            LetterSpacingHandle: '#descLetterSpacingHandle',
                            TextTransform: '#descTextTransform',
                            FontFamily: '#descFontFamily',
                            FontWeight: '#descFontWeight',
                            FontColor: '#descFontColor'
                        }

                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('p').eq(0);

                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }

                        FontSetting($parent, $textChange, properties);
                    }
                },

                "Designation": {
                    "DOM": EasyLibrary.ReadDOM("portfolio/designationTxt"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options').find('p').eq(1);
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },

            "view": {
                "view": function () { },

                "library": {


                    "UpdateWidthAttribute": function ($galleryContainer, newColCount) {

                        var widthPercentage = "";
                        switch (newColCount) {
                            case 2: widthPercentage = "50%"; break;
                            case 3: widthPercentage = "33.33%"; break;
                            case 4: widthPercentage = "25%"; break;
                            case 5: widthPercentage = "20%"; break;
                            case 1: widthPercentage = "100%"; break;
                        }

                        $galleryContainer.attr('data-colwidth', widthPercentage);

                    },


                    "ChangeRightSpacing": function (space, $par) {

                        if (space !== 'undefined' && typeof (space) !== 'undefined') {
                            var times = 5;

                            var galContainer = $par.find('.galleryContainer');

                            var childComp = galContainer.children();

                            var marginRightClass = childComp.attr('class').match(/editor-com-outerSpacing-right-[0-9]{1,3}/g);
                            var marginLeftClass = childComp.attr('class').match(/editor-com-outerSpacing-left-[0-9]{1,3}/g);


                            if (marginRightClass !== null) {

                                childComp.each(function () {
                                    var $me = $(this);
                                    $me.removeClass(marginRightClass[0].trim());
                                    $me.removeClass(marginLeftClass[0].trim());
                                });

                                var compOuterSpace = space * times;


                                var className = '';
                                var leftSpaceClassName = '';
                                if (space >= 0) {
                                    className = 'editor-com-outerSpacing-right-' + compOuterSpace;
                                    leftSpaceClassName = 'editor-com-outerSpacing-left-' + compOuterSpace;
                                }
                                else {
                                    space = Math.abs(space);
                                    className = 'editor-com-outerSpacing-right-neg-' + compOuterSpace;
                                    leftSpaceClassName = 'editor-com-outerSpacing-left-neg-' + compOuterSpace;

                                }

                                childComp.addClass(className);
                                childComp.addClass(leftSpaceClassName);
                                childComp.addClass('display-inline-block');
                                var widthPercentage = galContainer.attr('data-colwidth');
                                galContainer.attr('data-galhorspacing', space);
                                var newWidthAttr = "calc(" + widthPercentage + " - " + (compOuterSpace * 2) + "px)";
                                childComp.each(function (i, v) {
                                    var $me = $(this);
                                    $me.css(
                                        {
                                            "width": newWidthAttr,
                                            "float": "left"
                                        });
                                });
                            }
                        }
                    },


                    "ChangeBottomSpacing": function (space, $par) {


                        if (space !== 'undefined' && typeof (space) !== 'undefined') {

                            var times = 5;

                            var galContainer = $par.find('.galleryContainer');

                            var childComp = galContainer.children();

                            var marginBottomClass = childComp.attr('class').match(/editor-com-outerSpacing-bottom-[0-9]{1,3}/g);
                            var marginTopClass = childComp.attr('class').match(/editor-com-outerSpacing-top-[0-9]{1,3}/g);


                            if (marginBottomClass !== null) {

                                childComp.each(function () {
                                    var $me = $(this);
                                    $me.removeClass(marginBottomClass[0].trim());
                                    $me.removeClass(marginTopClass[0].trim());
                                });

                                var compOuterSpace = space * times;


                                var className = '';
                                var leftSpaceClassName = '';
                                if (space >= 0) {
                                    className = 'editor-com-outerSpacing-bottom-' + compOuterSpace;
                                    leftSpaceClassName = 'editor-com-outerSpacing-top-' + compOuterSpace;

                                }
                                else {
                                    space = Math.abs(space);
                                    className = 'editor-com-outerSpacing-bottom-neg-' + compOuterSpace;
                                    leftSpaceClassName = 'editor-com-outerSpacing-top-neg-' + compOuterSpace;
                                }

                                childComp.addClass(className);
                                childComp.addClass(leftSpaceClassName);

                                galContainer.attr('data-galverspacing', space);

                            }
                        }
                    },
                }
            },
        "common": {

            "FindReplaceDeleteHelper": function (editorComponentContainer) {
                var newHTML = $(editorComponentContainer)
                    .find('div').eq(1)
                    .find('.deletehelper').eq(0)
                    .removeClass('deletehelper')
                    .addClass('deleteGalleryItem sfError')
                    .parents('.editor-component').eq(0)[0].outerHTML;

                return newHTML;
            },


            "RemoveBorder": function (editorComponentContainer) {
                var newHTML = $(editorComponentContainer)
                    .find('> div > div.editor-component')
                    .addClass('onhover-border-none');

                return newHTML;
            },

            "SetCustomEvents": function () {

                $('.deleteGalleryItem').off().on('click', function () {
                    var itemToDelete = $(this).parent().parent().parent();
                    var siblingsCount = itemToDelete.siblings().length;

                    if (siblingsCount !== 0) {

                        SageConfirmDialog(' Do you want to delete this item ?').done(function () {
                            $('#numCounterTotal').text(siblingsCount);
                            itemToDelete.remove();
                        });
                    }

                });

            },

            "InitalizeEvents": function ($sender, componentName) {
                var compo = component[componentName];

                if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined") {
                    compo.afterdrop($sender.parent(), $sender, true, false);
                }

            },

            "InitializeSort": function (ui, componentName) {
                var compo = component[componentName];

                if (typeof compo !== "undefined" && typeof compo.onSort !== "undefined") {
                    compo.onSort(ui, componentName);
                }
            }

        },
        "remove": function ($cloneDOM) { },

    }
,    "row separator": {
        "componentname": "row separator",
        "category": "pro",
        "icon": "icon icon-seperator",
        "row": true,
        "hidden": false,
        "collection": false,
        "type": "element",
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
        "type": "hidden",
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
,    "siteheader": {
        "componentname": "siteheader",
        "category": "line",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "defaultdata": '',
        "type": "hidden",
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sitemenudetail"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        if ($parent.hasClass('editor-row-container')) {
                            $parent = $parent.parent();
                        }
                        InitEvents();

                        function InitEvents() {
                            ContainerWide();
                            HeaderStyle();
                            ArrangeItem();
                            ExtraSpace();
                            StickyColor();
                        }

                        function ContainerWide() {
                            var $container = $parent.find('div.editor-row-container');
                            if ($container.length > 0) {
                                $('#menuContainer').prop('checked', true);
                                $('#additionalMenuContainer').show(400);
                                var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                                $('#menuContainerWidth').val(conClass);
                            } else {
                                $('#menuContainer').prop('checked', false);
                            }
                            $('#menuContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var containerDiv = divStart('editor-row-container container-medium') + divEnd;
                                    var $appendElem = '';
                                    $appendElem = $parent.children();
                                    $parent.append(containerDiv);
                                    $parent.find('.editor-row-container').append($appendElem);
                                    $('#menuContainerWidth').val('container-medium');
                                    $('#additionalMenuContainer').fadeIn(400);
                                } else {
                                    var appendElem = $parent.find('.editor-row-container').children();
                                    $parent.append(appendElem);
                                    $parent.find('.editor-row-container').remove();
                                    $('#additionalMenuContainer').fadeOut(400);
                                }
                            });

                            $('#menuContainerWidth').off().on('change', function () {
                                var containWidth = $(this).val();
                                var $container = $parent.find('.editor-row-container');
                                $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                                $container.addClass(containWidth);
                            });
                        }

                        function HeaderStyle() {
                            var parentClasses = $('.site-body').attr('class').match(/site-header-[a-z]{1,20}/g);
                            var headerEffect = 'site-header-normal';
                            if (parentClasses !== null) {
                                headerEffect = parentClasses[0];
                            }

                            $('#menuHeaderStyle').val(headerEffect);
                            if (headerEffect === "site-header-sticky")
                                $('.StickyOptions').show();
                            else
                                $('.StickyOptions').hide();
                            $('#menuHeaderStyle').on('change', function () {
                                var parentClasses_ = $('.site-body').attr('class').match(/site-header-[a-z]{1,20}/g);
                                if (parentClasses_ !== null) {
                                    $('.site-body').removeClass(parentClasses_[0]);
                                }
                                var menuStyle = $(this).val();
                                $('.site-body').addClass($(this).val());
                                webBuilderSettings.SiteHeaderEffect = menuStyle;

                                switch (menuStyle) {
                                    case 'site-header-fixed':
                                        var containerWidth = $('.editor-componentWrapper').css('width');
                                        $('.editor-site-header').css('width', containerWidth);
                                        $('.StickyOptions').hide();
                                        $('.editor-site-header > .editor-row').removeClass('stick');
                                        break;
                                    case 'site-header-sticky':
                                        $('.editor-site-header').css('width', '');
                                        $('.StickyOptions').show();
                                        break;
                                    default:
                                        $('.editor-site-header > .editor-row').removeClass('stick');
                                        $('.editor-componentWrapper').css('padding-top', '');
                                        $('.StickyOptions').hide();
                                        $('.editor-site-header').css('width', '');
                                        break;

                                }
                                HeaderTopPadding();
                            });
                        }

                        function StickyColor() {
                            var $header = $('.editor-site-header').find('.menuHeader');
                            var $headerColor = $header.attr('data-mbgcolor');
                            if (typeof ($headerColor) !== "undefined") {
                                $('#chooseBGColorMenumove').css('background-color', $headerColor);
                            }
                            $headerColor = $header.attr('data-mcolor');
                            if (typeof ($headerColor) !== "undefined") {
                                $('#chooseColorMenumove').css('background-color', $headerColor);
                            }
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var colorPickerID = $elm.attr('id');
                                    switch (colorPickerID) {
                                        case 'chooseBGColorMenumove':
                                            $header.attr('data-mbgcolor', objColor.bgColor);
                                            break;
                                        case 'chooseColorMenumove':
                                            $header.attr('data-mcolor', objColor.bgColor);
                                            break;
                                    }
                                }
                            });
                            $('.chooseHeadMenuColor').colorPicker(colorPickerOption);
                        }

                        function ArrangeItem() {
                            var $menuPosition = $parent.find('div.editor-col').eq(0).find('.editor-component.menuHeader');
                            var menu = DOMCreate('span', 'Menu', 'menuSwiper', 'menuSwiper');
                            var logo = DOMCreate('span', 'Logo', 'logoSwiper', 'logoSwiper');

                            var lefticon = DOMCreate('i', '', 'fa fa-arrow-left');
                            var righticon = DOMCreate('i', '', 'fa fa-arrow-right');
                            var swiper = DOMCreate('span', lefticon + 'Swipe' + righticon, 'logoMenuSwiper', 'logoMenuSwiper')
                            var $swiper = '';
                            if ($menuPosition.length == 0) {
                                $swiper = logo + swiper + menu;
                            } else {
                                $swiper = menu + swiper + logo;
                            }
                            $('#menuSwiperWrapper').html($swiper);
                            HeaderSwiperEvents();
                        }

                        function HeaderSwiperEvents() {
                            $('#logoMenuSwiper').off().on('click', function () {
                                var $menuPosition = $parent.find('div.editor-col').eq(0).find('.editor-component.menuHeader');
                                var $menu = $parent.find('div.editor-col').find('.editor-component.menuHeader');
                                if ($menuPosition.length == 0) {
                                    $parent.find('.colWrapper').prepend($menu.parent());
                                } else {
                                    $parent.find('.colWrapper').append($menu.parent());
                                }
                                ArrangeItem();
                            });
                        }

                        function ExtraSpace() {
                            if ($('.editor-site-header').find('.rowaboveheader').length == 1) {
                                $('#menuUpperContainer').prop('checked', true);
                            } else {
                                $('#menuUpperContainer').prop('checked', false);
                            }
                            $('#menuUpperContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var $rowAbove = $(EasyLibrary.ReadDOM("onecolumnrow"));
                                    $rowAbove.insertBefore($parent);
                                    SettingEvents();
                                    DeleteComponent();
                                    DraggableSortable();
                                    RowEvents();
                                    DeleteComponent();
                                    SettingEvents();
                                    $rowAbove.addClass('rowaboveheader')
                                        .find('.carrier-open-option').addClass('no-drag');
                                    $rowAbove.find('.icon-icon-drag.dragRow').remove();
                                    $rowAbove.find('.copyRow').remove();
                                    $rowAbove.find('.carries-options.row-options > .deletehelper').remove();
                                    BindColumnEvents($rowAbove);
                                } else {
                                    $('.rowaboveheader').remove();
                                }
                            });
                        }
                    }
                },
                "Background": {
                    "options": ["image", "color"],
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
,    "siteheadermenu": {
        "componentname": "siteheadermenu",
        "category": "basic",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "hidden",
        "defaultdata": "",
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sitemenubasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $text = $parent.find('.pageName');
                        var $nav = $parent.find('nav');
                        InitEvents();

                        function InitEvents() {
                            $('#menuTextColor').css('background-color', $parent.find('.pagelink').not('.active-page').find('.pageName').eq(0).css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.pagelink').not('.active-page').find('.pageName').css('color', objColor.bgColor);
                                    $parent.find('.eb-menu').attr('data-textcolor', objColor.bgColor);
                                }
                            });
                            $('#menuTextColor').colorPicker(colorPickerOption);
                            fontSize();
                            letterSpacing();
                            TextTranformCheck();
                            MenuStyle();
                            LoadFontFamily()
                        }

                        function fontSize() {
                            var fontsize = $text.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize;
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));

                            function FontSize(space) {
                                $text.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#menuFontSLider'), $('#menuFontHandle'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
                        }

                        function letterSpacing() {

                            var letteSpace = 0;
                            var removeClass = '';
                            if (typeof ($text.attr('class')) !== 'undefined') {
                                var letterSpacingNegClass = $text.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                                if (letterSpacingNegClass !== null) {
                                    removeClass = letterSpacingNegClass[0].trim();
                                    letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-neg-', ''));
                                } else {
                                    var letterSpacingPosClass = $text.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                                    if (letterSpacingPosClass !== null) {
                                        removeClass = letterSpacingPosClass[0].trim();
                                        letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-', ''));
                                    }
                                }
                            }

                            function LetteSpaceChange(space) {
                                var addClass = '';
                                var removeClass = '';
                                if (typeof ($text.attr('class')) !== 'undefined') {
                                    var negClass = $text.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                                    if (negClass !== null) {
                                        removeClass = negClass[0].trim();
                                    } else {
                                        var posClass = $text.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                                        if (posClass !== null) {
                                            removeClass = posClass[0].trim();
                                        }
                                    }
                                }
                                if (space >= 0) {
                                    addClass = 'editor-text-letterSpacing-' + space;
                                } else {
                                    space = Math.abs(space);
                                    addClass = 'editor-text-letterSpacing-neg-' + space;
                                }
                                $text.removeClass(removeClass).addClass(addClass);
                            }
                            AdvanceSageSlider($('#menuletterSpacingSlider'), $('#menuletterSpacingHandle'), -10, 10, letteSpace, LetteSpaceChange, $parent, 'px');
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($text.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($text.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#menutextTransform').val(trasformValue);
                            $('#menutextTransform').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $text.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $text.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $text.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function MenuStyle() {
                            var navClass = 'nav-style-none';
                            var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                            if (navStyleClasses != null) {
                                navClass = navStyleClasses[0];
                            }
                            $('#menuStyle').val(navClass);
                            $('#menuStyle').on('change', function () {
                                var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses != null) {
                                    $nav.removeClass(navStyleClasses[0]);
                                }
                                var style = $(this).val().trim();
                                $nav.addClass(style);
                                MenuChangeInstant($nav.find('.eb-menu'), webBuilderSettings.primaryColor, webBuilderSettings.secondaryColor, style);
                            });
                        }

                        function LoadFontFamily() {
                            $('#fontfamilymenu').html(DOMFontAdvanceCollection());
                            var defaultFontFamily = 'montserrat';
                            var classesList = $text.eq(0).attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilymenu').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightmenu').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightmenu').on('change', function () {
                                var classList = $text.eq(0).attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $text.removeClass(familyClass[0]);
                                    }
                                }
                                $text.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilymenu').on('change', function () {
                                var classList = $text.eq(0).attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $text.removeClass(fontClass[0]);
                                    }
                                }
                                $text.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightmenu').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightmenu').html(fontDOM);
                                }
                            }
                        }
                    }
                },

                "Background": {
                    "options": ["image", "color"]
                },
                "Spacing": {
                    "options": {
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
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            },
        }
    }
,    "skill bar": {
        "componentname": "skill bar",
        "category": "advance",
        "icon": "icon-skill-bar",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": false,
        "defaultdata": EasyLibrary.ReadDOM('skillbar/skillbarviewdom'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            //if (dropped) {
            if ($(document).find('#hdnSkillSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnSkillSettingAttr"></div>');

            $barElement = $appendLayer.find('.bar-element');
            $barElement.each(function () {
                $this = $(this);
                $skill = $this.data('skill');
                $this.next().text($skill + " %");
                $this.animate({
                    'width': $skill + '%'
                }, 3000, function () {

                });
            });
            //}
        },
        "onsort": function (ui) {

        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarbasicsetting'),
                    "onload": function ($item) {
                        var SkillBar = {
                            settingButton: $item,
                            SkillContainer: $item.parent().parent(),
                            init: function () {
                                var attr = $('#hdnSkillSettingAttr').data('attribute');
                                if (attr != '') {
                                    $('#popupModel').attrs(attr);
                                    $('#hdnSkillSettingAttr').data('attribute', '');
                                }
                                var SkillItem = SkillBar.SkillContainer.find('.skill-ltem');
                                var html = '';
                                var count = SkillItem.length;
                                SkillItem.each(function () {
                                    $this = $(this);
                                    $field = $this.children('.bar-label').find('p').text();
                                    $skill = $this.find('.bar-element').attr('data-skill');
                                    $barColor = $this.find('.bar-element').css('background-color');
                                    html += '<div class="field-row clearfix item"><div class="multi-col-form-group"><span class="value">';
                                    html += '<span class="color-picker-holder skillColors" style="background-color:' + $barColor + '"></span>';
                                    html += '<input type="text"  value="' + $field + '"  class="skillInput skLabel" aria-invalid="false">';
                                    html += '<input type="text"  data-class="skData" value="' + $skill + '" class="skillInput skData xsml-box" aria-invalid="false">'
                                    if (count > 1)
                                        html += '<i class="in-form-icon fa fa-trash delete-icon deleteBar" aria-hidden="true"></i>';
                                    html += '</span></div></div>';
                                });
                                $('.skillsList').html(html);
                                SkillBar.SkillDynamicEvents();
                            },
                            SkillDynamicEvents: function () {

                                $('.addSkill').off().on('click', function () {
                                    $BarItem = SkillBar.SkillContainer.find('.skill-ltem').last();
                                    var NewDom = document.createElement("div");
                                    $(NewDom).attrs($BarItem.attrs());
                                    $(NewDom).html($BarItem.html());
                                    $BarContainer = SkillBar.SkillContainer.find('.skillBar-wrap');
                                    $BarContainer.append(NewDom);
                                    $(NewDom).find('.bar-element').width('0');
                                    SkillBar.animateBar($(NewDom).find('.bar-element'));
                                    $('#hdnSkillSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SkillBar.settingButton.trigger('click');
                                });
                                $('.deleteBar').off().on('click', function () {
                                    $this = $(this);
                                    SageConfirmDialog('Are you sure?').done(function () {
                                        $pos = $('.skillsList .item').index($this.parents('.item'))
                                        SkillBar.SkillContainer.find('.skill-ltem').eq($pos).remove();
                                        SkillBar.init();

                                    });
                                });
                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        $pos = $('.skillsList .item').index($elm.parents('.item'));
                                        var SkItem = SkillBar.SkillContainer.find('.skill-ltem').eq($pos);
                                        $barItem = SkItem.find('.bar-element');
                                        $barItem.css('background-color', objColor.bgColor);
                                    }
                                });
                                $('.skillColors').colorPicker(colorPickerOption);
                                $('.skillInput').off().on('keyup', function () {
                                    $this = $(this);
                                    $Val = $this.val();

                                    $pos = $('.skillsList .item').index($this.parents('.item'))
                                    var SkItem = SkillBar.SkillContainer.find('.skill-ltem').eq($pos);
                                    if ($this.hasClass('skLabel')) {
                                        SkItem.find('p').text($Val);
                                    }
                                    if ($this.hasClass('skData')) {
                                        if ($Val == '')
                                            $Val = 0;
                                        if ($Val >= 0 && $Val <= 100) {
                                            $('#SkillErrorMessage').hide();
                                            $barItem = SkItem.find('.bar-element');
                                            $barItem.attr('data-skill', $Val);
                                            $barItem.width(0);
                                            SkillBar.animateBar($barItem);
                                        } else {
                                            $('#SkillErrorMessage').show();
                                            $('#SkillErrorMessage').text('Enter Number 0-100 Only');
                                        }
                                    }

                                });
                            },
                            animateBar: function ($barItem) {
                                $skill = $barItem.attr('data-skill');
                                $barItem.next().text($skill + " %");
                                $barItem.animate({
                                    'width': $skill + '%'
                                });
                            },
                            oneTimeEvent: function () {
                                var $barEle = SkillBar.SkillContainer.find('.bar-progress');

                                function BarLabelSpace(space) {
                                    $barEle.height(space + 'px');
                                }
                                var Barheight = $barEle.first().height();
                                AdvanceSageSlider($('#barHeightSlider'), $('#barHeightHandle'), 0, 50, Barheight, BarLabelSpace, $barEle, 'px');
                            }
                        }

                        SkillBar.oneTimeEvent();
                        SkillBar.init();
                    }
                },
                "Bar Label": {
                    "DOM": EasyLibrary.ReadDOM('txtBasicTab'),
                    "onload": function ($this) {
                        var $BarLabel = $this.parent().parent().find('.bar-label');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $BarLabel.addClass('activeSetting');
                        var $textChange = $BarLabel.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $BarLabel.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $BarLabel.attr('data-childCollection'));
                            $BarLabel = $('.' + $BarLabel.attr('data-parCollection'));
                        }
                        TextSetting($BarLabel, $textChange);


                    }
                },
                "Bar Percent": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarpercentsetting'),
                    "onload": function ($this) {
                        var $barpercent = $this.parent().parent().find('.bar-progress span');

                        function BarPercentFont(space) {
                            $barpercent.css('font-size', space + 'px');
                        }
                        var PerFontSize = $barpercent.first().css('font-size').replace('px', '');


                        AdvanceSageSlider($('#barPercentSlider'), $('#barPercentHandle'), 0, 50, PerFontSize, BarPercentFont, $barpercent, 'px');

                        $('.barPercentColor').css('background-color', $barpercent.first().css('color'));
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $barpercent.css('color', objColor.bgColor);
                            }
                        });
                        $('.barPercentColor').colorPicker(colorPickerOption);


                    }
                },
                "Background ": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarbackgroundsetting'),
                    "onload": function ($item) {
                        $parent = $item.parent().parent();

                        function loadColorPicker($parent) {
                            $('#barlabelColorPic').css('background-color', $parent.find('.bar-label').css('background-color'));
                            var colorPickerOption1 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.bar-label').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#barlabelColorPic').colorPicker(colorPickerOption1);
                            $('#barItemColorPic').css('background-color', $parent.find('.bar-progress').css('background-color'));
                            var colorPickerOption2 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.bar-progress').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#barItemColorPic').colorPicker(colorPickerOption2);
                        }
                        loadColorPicker($parent);
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
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.skill-ltem');
                        return $parent;
                    },

                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.skillBar-wrap');
                        return $parent;
                    },
                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.bar-progress');
                        return $parent;
                    },
                },
                "Box Shadow": {
                    "options": {},
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.bar-progress');
                        return $parent;
                    },
                },

            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parents().parent().find('.skillBar-wrap');
                return $parent;
            },
        },
        "remove": function ($view) {
            $view.find('.bar-label p').attr('contenteditable', false);
            $view.find('.bar-element').width('0')
        },
        "view": {
            "view": function () {
                this.library.initAnimation();
            },
            "library": {
                "initAnimation": function () {
                    $('.skillBar-wrap').attr('data-animate', 0);
                    $(window).scroll(function () {
                        animateSkillBar();
                    });
                    var winHeight = $(window).height() - 80;

                    function IsInVisibleSection($SkillComponent) {
                        var winScroll = $(window).scrollTop();
                        $SkillComPos = $SkillComponent.offset().top - winScroll;
                        if (0 <= $SkillComPos && $SkillComPos < winHeight)
                            return true;
                        else
                            return false;
                    }

                    function animateSkillBar() {
                        $('.skillBar-wrap').each(function () {
                            $SkillWrap = $(this);
                            if ($SkillWrap.attr('data-animate') == 0 && IsInVisibleSection($SkillWrap)) {
                                $SkillWrap.attr('data-animate', 1);
                                $barElement = $SkillWrap.find('.bar-element');
                                $barElement.each(function () {
                                    $this = $(this);
                                    $skill = $this.data('skill');
                                    $this.next().text($skill + " %");
                                    $this.animate({
                                        'width': $skill + '%'
                                    }, 3000);
                                })
                            }
                        });

                    }
                    animateSkillBar();
                }
            }
        }
    }
,    "social link": {
        "componentname": "social link",
        "category": "advance",
        "icon": "icon icon-socialshare",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("sociallinkcom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendLayer) {

        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sociallinkbasic"),
                    "onload": function ($item) {
                        var $ele = '';
                        var $parent = $item.parent().parent();
                        var eleClasses = '';
                        var eleIndex = -1;
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                            FontIcon();
                            SearchFontIcon();
                        }

                        function LoadSettings() {
                            var html = '';
                            $(".sociallinkWrapper").html('');
                            $parent.find(".socialAchor").each(function (index, item) {
                                var className = $(this).attr('data-class');
                                var href = $(this).attr('href');
                                var iconClass = $(this).find('i').attr('class');
                                html += '<div class="field-row clearfix">';
                                html += '<span class="value">';
                                html += '<div class="socialLinkIcon" data-class="' + className + '">';
                                html += '<i class="' + iconClass + '"></i>';
                                html += '</div>';
                                html += '<input type="text" class="sociallinkHrefText" value="' + href + '" />';
                                html += '<i title="delete" class="icon-icon-delete deleteSocialLink"></i>';
                                html += '</span>';
                                html += '</div>';
                            });
                            $(".sociallinkWrapper").html(html);
                            FormEvent();
                        }

                        function FormEvent() {
                            $(".deleteSocialLink").off().on("click", function () {
                                var dataClass = $(this).parent().find('.socialLinkIcon').attr('data-class');
                                var index = $('.sociallinkWrapper .field-row').index($(this).parent().parent());
                                $parent.find(".socialLink").children().eq(index).remove();
                                $(this).parent().parent().remove();
                            });
                            $(".socialLinkIcon").off().on("click", function () {
                                eleIndex = $('.sociallinkWrapper .field-row').index($(this).parent().parent());
                                eleClasses = $(this).attr('data-class');
                                $(this).parent().append($('.tabcontent').find(".socialLinkIconList"));
                                $(".socialLinkIconList").show();
                                $('#socialfontIconCollection').find('li').removeClass('selected');
                                $('#socialfontIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');
                            });
                            $(".sociallinkHrefText").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value == "") {
                                    value = "#";
                                }
                                var dataClass = $(this).parent().find('.socialLinkIcon').attr('data-class');
                                var $comEle = $parent.find('.socialAchor[data-class="' + dataClass + '"]');
                                $comEle.attr("href", value);
                            });
                        }

                        function Events() {
                            $("#btnAddMore").on("click", function () {
                                $(".hideSocialIcon").trigger("click");
                                var html = '';
                                var iconClass = 'fa fa-navicon';
                                var dataClass = 'fa-navicon';
                                html += '<div class="field-row clearfix">';
                                html += '<span class="value">';
                                html += '<div class="socialLinkIcon"  data-class="' + dataClass + '">';
                                html += '<i class="' + iconClass + '" style="color: rgb(255, 255, 255);"></i>';
                                html += '</div>';
                                html += '<input type="text" class="sociallinkHrefText" value="#" />';
                                html += '<i title="delete" class="icon-icon-delete deleteSocialLink"></i>';
                                html += '</span>';
                                html += '</div>';
                                $(this).parent().find(".sociallinkWrapper").append(html);

                                var comHtml = '';
                                comHtml += '<div class="editor-component button sfCol_49 editor-text-transform-uppercase editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-5 editor-com-innerSpacing-bottom-5 editor-com-innerSpacing-left-5 editor-com-outerSpacing-right-10" style="border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(73, 73, 73); border-radius: 54px; height: 35px; width: 35px;" data-backgroundimage="" data-backgroundcolor="color" href="javascript:void(0);">';
                                comHtml += '<div class="carrier-open-option">';
                                comHtml += ' <i title="drag" class="icon-icon-drag sortComponent"></i>';
                                comHtml += 'button<i class="fa fa-bars"></i>';
                                comHtml += '</div>';
                                comHtml += '<div class=" carries-options button-options hide-element">';
                                comHtml += '<i title="button settings" class="row-setting com-settings" data-type="button">Setting</i>';
                                comHtml += '<i title="delete" class="deletehelper">Delete</i>';
                                comHtml += '</div>';
                                comHtml += '<a class="com-button socialAchor" data-class="' + dataClass + '" style="color: rgb(255, 255, 255); font-size: 12px;" href="#">';
                                comHtml += '<i class="' + iconClass + '" style="color: rgb(255, 255, 255);"></i>';
                                comHtml += '</a>';
                                comHtml += '</div>';
                                $parent.find(".socialLink").append(comHtml);
                                FormEvent();
                                SettingEvents();
                            });
                            $(".hideSocialIcon").on("click", function () {
                                $(this).parent().hide();
                            });
                        }

                        function FontIcon() {
                            $('#socialfontIconCollection').html(EasyLibrary.FontCollectionList());
                            SearchFontIcon();
                        }

                        function SearchFontIcon() {
                            $('#socialSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#socialfontIconCollection').find('li').each(function () {
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
                            $('#socialfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                var $achorIcon = $parent.find('.socialAchor').eq(eleIndex);
                                var $editIcon = $('.sociallinkWrapper .field-row').eq(eleIndex).find('.socialLinkIcon');
                                $editIcon.attr('data-class', chooseClass);
                                $editIcon.find("i").eq(0).attr('class', 'fa ' + chooseClass);
                                $achorIcon.attr('data-class', chooseClass);
                                $achorIcon.find("i").attr('class', 'fa ' + chooseClass);
                                $('#socialfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideSocialIcon").trigger("click");
                            });
                        }
                    }
                },
                "Background": {
                    "options": ["color"],
                },
                "Spacing": {
                    "options": {
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
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }
,    "SoundCloudPlayer": {
        "componentname": "SoundCloudPlayer",
        "category": "advance",
        "icon": "fa fa-play-circle-o",
        "row": false,
        "type": "sound",
        "defaultdata": EasyLibrary.ReadDOM('soundcloudplayer/soundCloudView'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "onsort": function (ui) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('soundcloudplayer/SoundCloudBasic'),
                    "onload": function ($item) {
                        const regex = /src="[\s\S]*"/g;
                        var SoundCloud = {

                            container: $item.parents('.component-sound-cloud'),
                            init: function () {
                                var temp = ' <iframe class="cloud-iframe" width="100%" height="150" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/53187186&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true"></iframe>'
                                $('#txtScloudLink').val(temp);
                                $('.sCloudColorPicker').css('background-color', SoundCloud.container.attr('data-background'))
                                $('.sCloudColorPicker').attr('data-bgcolor', SoundCloud.container.attr('data-background'))
                                var currentIframe = SoundCloud.container.find('.cloud-iframe');


                                var CurrentSize = 150;
                                function callBackHeight(space) {
                                    currentIframe.css('height', space + 'px')
                                }
                                AdvanceSageSlider($('#iframeHeightSlider'), $('#playerHeightHandle'), 100, 500, CurrentSize, callBackHeight, '', 'px');
                                $('#spnUpdateVideo').off().on('click', function () {
                                    var autoplay = $('#chkScAutoplay').prop('checked');
                                    var IFsrc = $('#txtScloudLink').val();
                                    IFsrc = IFsrc.match(regex)
                                    if (typeof (IFsrc) != 'undefined' && IFsrc != null) {
                                        IFsrc = IFsrc[0];
                                        IFsrc = IFsrc.match(/"[\s\S]*"/g)[0];
                                        IFsrc = IFsrc.replace(/\"/g, '');
                                        IFsrc = IFsrc.replace(/auto_play=[\s\S]*&/g, 'auto_play=' + autoplay + '&');
                                        currentIframe.attr('src', IFsrc);

                                    }
                                });

                            }
                        }
                        SoundCloud.init();
                    },
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "min": "-40",
                            "max": "40",
                            "times": "5",
                            "position": ["all", "top", "left", "right", "bottom"],
                        },
                        "padding": {
                            "min": "0",
                            "max": "40",
                            "times": "5",
                            "position": ["all", "top", "left", "right", "bottom"],
                        },
                    },
                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                },
                "Help": {
                    "DOM": EasyLibrary.ReadDOM('soundcloudplayer/SoundCloudHelp'),
                    "onload": function ($item) {

                    },
                },
            },
        },
        "selectLayer": function ($elem) {
            var $parent = $elem.parents('.component-sound-cloud');
            return $parent;
        },
        "view": {
            "view": function () {
                this.library.myfunction();

            },
            "library": {
                "myfunction": function () {
                    var value = "abed";
                },

            },
        },
        "remove": function ($viewDom) {
        }
    }
,    "tabs": {
        "componentname": "tabs",
        "category": "advance",
        "icon": "icon-tab-content",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM('tab/tabview'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, TabsViewDom, dropped) {
            if ($(document).find('#hdnTabSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnTabSettingAttr"></div>');
            $(".tabsDiv .tabs li").click(function () {
                var tabContainer = $(this).parents('.tabsDiv');
                tabContainer.find(".tabs li").removeClass("selected");
                $(this).toggleClass("selected");
                var pos = tabContainer.find(".tabs li.selected").index();
                var obj = tabContainer.find(".container:eq( " + pos + " )");
                tabContainer.find(".container").hide();
                $(obj).show();
                var tabColor = $(this).parents('.customTab').attr('data-activecolor');
                var tabActiveTxtColor = $(this).parents('.customTab').attr('data-txtactivehovercolor')
                tabContainer.find(".tabs li").css("background-color", $(this).parents('.customTab').attr('data-backgroundcolor'));
                tabContainer.parents('.customTab').find('.tab-nav > .tabs > li.selected').css("background-color", tabColor);

                tabContainer.find(".tabs li").not('.selected').find('span').css("color", $(this).parents('.customTab').attr('data-txtcolor'));
                tabContainer.find(".tabs li.selected").find('span').css("color", tabActiveTxtColor);
            });

            $(".tab-nav .tabs").each(function () {
                $(this).find("li:first").click();
            });
            $(".tab-nav > .tabs > li").unbind("mouseover mouseout");
            $('.tab-nav > .tabs > li').on('mouseover mouseout', function (evt) {

                if (!$(this).hasClass('selected')) {
                    var masterContainer = $(this).parents('.customTab');
                    var hoverColor = masterContainer.attr('data-hovercolor');
                    var basicColor = masterContainer.attr('data-backgroundcolor');
                    var txtHoverColor = masterContainer.attr('data-txthovercolor');
                    var txtBasicColor = masterContainer.attr('data-txtcolor');

                    evt.type === 'mouseover' ? $(this).css("background-color", hoverColor) : $(this).css("background-color", basicColor);
                    evt.type === 'mouseover' ? $(this).find('span').css("color", txtHoverColor) : $(this).find('span').css("color", txtBasicColor);

                }
            });
        },
        "onsort": function (ui) {

        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM('tab/tabbasicsetting'),
                    "onload": function ($item) {
                        var CustomTab = {
                            parent: $item.parent().parent(),

                            init: function () {
                                var attr = $('#hdnTabSettingAttr').data('attribute');
                                if (attr != '') {
                                    $('#popupModel').attrs(attr);
                                    $('#hdnTabSettingAttr').data('attribute', '');
                                }
                                var tabs = CustomTab.parent.find('.tabs li');
                                var tabLength = CustomTab.parent.find('.tabs li').length;
                                var html = '';
                                $(tabs).each(function (index, element) {
                                    var TabName = $(this).find('span').text();
                                    html += '<div class="item field-row clearfix">';
                                    html += '<div class="multi-col-form-group ">';
                                    html += '<span class="value">';
                                    html += '<label>' + TabName + '</label>';
                                    if (tabLength != 1)
                                        html += '<i title="Delete" class="deleteTab fa fa-trash in-form-icon delete-icon"></i>';
                                    html += '</span></div></div>';
                                });
                                $('.tabListEdit').html(html);

                                if ($item.parent().parent().find('.tabsDiv').hasClass('hr-tab-mode')) {
                                    $("input[name=tabMode][value=1]").prop("checked", true);
                                }
                                else {

                                    $("input[name=tabMode][value=2]").prop("checked", true);
                                }



                                CustomTab.UIevent();


                            },
                            UIevent: function () {
                                $('.deleteTab').off().on("click", function (index, item) {
                                    var $this = $(this).parents('.item');
                                    var pos = $('.tabListEdit .item').index($(this).parents('.item'));
                                    CustomTab.parent.find('.tabsDiv .container').eq(pos).remove();
                                    CustomTab.parent.find('.tabsDiv .tabs li').eq(pos).remove();
                                    CustomTab.init();

                                });
                                $('.sfAddTab').off().on("click", function (index, item) {

                                    var lastTab = CustomTab.parent.find('.tabsDiv .tabs li').last();
                                    var tab = document.createElement("li");
                                    $(tab).attrs(lastTab.attrs());
                                    $(tab).html(lastTab.html());
                                    var tabContainer = CustomTab.parent.find('.tabsDiv .tabs');
                                    tabContainer.append(tab);
                                    var lastContainer = CustomTab.parent.find('.tabsDiv .container').last();
                                    var container = document.createElement("div");
                                    $(container).attrs(lastContainer.attrs());
                                    $(container).html(lastContainer.html());
                                    lastContainer.parent().append(container);
                                    component["tabs"].afterdrop();
                                    $('#hdnTabSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SettingEvents();
                                    $item.trigger('click');

                                });

                            }

                        }
                        CustomTab.init();
                    }
                },
                "Alignment":
                {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        return $elem.parents('.customTab').find('.tabsDiv > .tab-nav > ul > li');
                    },
                },
                "Spacing":
                {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": 0,
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
                        return $elem.parents('.customTab').find('.tabsDiv > .tab-nav > ul > li');
                    },
                },
                "Sizes":
                {
                    "DOM": EasyLibrary.ReadDOM('tab/tabsizesetting'),
                    "onload": function ($item) {
                        var TabTitleSize = {
                            Container: $item.parents('.customTab'),
                            init: function () {
                                TabTitleSize.UIEvents();
                            },
                            UIEvents: function () {
                                var TabTitle = TabTitleSize.Container.find('.tab-nav > ul > li >span');
                                var CurrentSize = TabTitle.first().css('font-size').replace('px', '');
                                function TitleFontSize(space) {
                                    TabTitle.css('font-size', space + 'px')
                                    TabTitle.css('line-height', space + 'px')
                                }
                                AdvanceSageSlider($('#tabTitleSlider'), $('#tabTitleSliderHandle'), 10, 40, CurrentSize, TitleFontSize, '', 'px');


                                var $tabItem = TabTitleSize.Container.find('.tab-nav > ul > li')
                                function HolderWidth(space) {

                                    $tabItem.css('min-width', space + 'px')
                                    $tabItem.css('max-width', space + 'px')
                                }
                                var itemWidth = $tabItem.first().css('min-width').replace('px', '');
                                if (typeof (itemWidth) == 'undefined') {
                                    itemWidth = 0;
                                }

                                AdvanceSageSlider($('#tabHolderSlider'), $('#tabHolderSliderHandle'), 50, 300, itemWidth, HolderWidth, '', 'px');

                                function LineHeightOption(space) {
                                    space = space * 10;
                                    var lineHeight = TabTitle.attr('class').match(/line\-height\-\d+/g);
                                    if (lineHeight != null) {
                                        TabTitle.removeClass(lineHeight[0]).addClass('line-height-' + space);
                                    }
                                    else {
                                        TabTitle.addClass('line-height-' + space);
                                    }
                                }

                                var lineHeight = TabTitle.attr('class').match(/line\-height\-\d+/g);
                                if (lineHeight != null)
                                    currentLineHeight = parseInt(lineHeight[0].replace('line-height-', ''));
                                AdvanceSageSlider($('#tabLineHeightSlider'), $('#tabLineHeightSliderHandle'), 1, 25, currentLineHeight, LineHeightOption, '', '%');
                            }
                        }
                        TabTitleSize.init();
                    }
                },

                "Color":
                {
                    "DOM": EasyLibrary.ReadDOM('tab/tabcolorsetting'),
                    "onload": function ($elem) {



                        var tabContainer = $elem.parents('.customTab');
                        $('.tabActiveClr').css('background-color', tabContainer.attr('data-activecolor'));
                        var colorPickerActive = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-activecolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li.selected').css("background-color", objColor.bgColor);

                            }
                        });
                        $('.tabActiveClr').colorPicker(colorPickerActive);

                        var colorPickerHover = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-hovercolor', objColor.bgColor);
                            }
                        });
                        $('.tabHoverClr').css('background-color', tabContainer.attr('data-hovercolor'));
                        $('.tabHoverClr').colorPicker(colorPickerHover);

                        var colorPickerBg = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-backgroundcolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li').css("background-color", objColor.bgColor);
                            }
                        });
                        $('.tabBgClr').css('background-color', tabContainer.attr('data-backgroundcolor'));
                        $('.tabBgClr').colorPicker(colorPickerBg);

                        var colorPickerTxtBasicColor = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-txtcolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li').not('.selected').find('span').css("color", objColor.bgColor);
                            }
                        });
                        $('.tabtxtBasicClr').css('background-color', tabContainer.attr('data-txtcolor'));
                        $('.tabtxtBasicClr').colorPicker(colorPickerTxtBasicColor);



                        var colorPickerTxtHover = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-txthovercolor', objColor.bgColor);
                            }
                        });
                        $('.tabtxtHoverClr').css('background-color', tabContainer.attr('data-txthovercolor'));
                        $('.tabtxtHoverClr').colorPicker(colorPickerTxtHover);


                        var colorPickerActiveTxtHover = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-txtactivehovercolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li.selected >span').css("color", objColor.bgColor);
                            }
                        });
                        $('.tabActivetxtHoverClr').css('background-color', tabContainer.attr('data-txthovercolor'));
                        $('.tabActivetxtHoverClr').colorPicker(colorPickerActiveTxtHover);


                    }

                },

                "Display Mode":
                {
                    "DOM": EasyLibrary.ReadDOM('tab/tabdisplaymode'),
                    "onload": function ($elem) {


                        $('input[type=radio][name=tabMode]').on('change', function () {
                            var tabContainer = $elem.parents('.customTab');
                            if (this.value === '1') {
                                tabContainer.find('.tabsDiv').removeClass('vr-tab-mode').addClass('hr-tab-mode');
                                tabContainer.find('.tabsDiv > .tab-nav > ul').removeClass('li-float-none').addClass('li-float-left');
                            }
                            else {

                                tabContainer.find('.tabsDiv').removeClass('hr-tab-mode').addClass('vr-tab-mode');
                                tabContainer.find('.tabsDiv > .tab-nav > ul').removeClass('li-float-left').addClass('li-float-none');
                            }

                        });

                    }

                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parents('.customTab').find('.tabsDiv > .tab-nav > ul > li');
                    },
                },
            },

        },
        "remove": function () {

        },
        "view": {
            "view": function () {
                this.library.initTab();
            },
            "library":
            {
                "initTab": function () {
                    $(".tabsDiv .tabs li").click(function () {
                        var tabContainer = $(this).parents('.tabsDiv');
                        tabContainer.find(".tabs li").removeClass("selected");
                        $(this).toggleClass("selected");
                        var pos = tabContainer.find(".tabs li.selected").index();
                        var obj = tabContainer.find(".container:eq( " + pos + " )");
                        tabContainer.find(".container").hide();
                        $(obj).show();
                        var tabColor = $(this).parents('.customTab').attr('data-activecolor');
                        var tabActiveTxtColor = $(this).parents('.customTab').attr('data-txtactivehovercolor')
                        tabContainer.find(".tabs li").css("background-color", $(this).parents('.customTab').attr('data-backgroundcolor'));
                        tabContainer.parents('.customTab').find('.tab-nav > .tabs > li.selected').css("background-color", tabColor);

                        tabContainer.find(".tabs li").not('.selected').find('span').css("color", $(this).parents('.customTab').attr('data-txtcolor'));
                        tabContainer.find(".tabs li.selected").find('span').css("color", tabActiveTxtColor);
                    });

                    $(".tab-nav .tabs").each(function () {
                        $(this).find("li:first").click();
                    });
                    $(".tab-nav > .tabs > li").unbind("mouseover mouseout");
                    $('.tab-nav > .tabs > li').on('mouseover mouseout', function (evt) {

                        if (!$(this).hasClass('selected')) {
                            var masterContainer = $(this).parents('.customTab');
                            var hoverColor = masterContainer.attr('data-hovercolor');
                            var basicColor = masterContainer.attr('data-backgroundcolor');
                            var txtHoverColor = masterContainer.attr('data-txthovercolor');
                            var txtBasicColor = masterContainer.attr('data-txtcolor');
                            evt.type === 'mouseover' ? $(this).css("background-color", hoverColor) : $(this).css("background-color", basicColor);
                            evt.type === 'mouseover' ? $(this).find('span').css("color", txtHoverColor) : $(this).find('span').css("color", txtBasicColor);

                        }
                    });
                },

            }

        }
    }
,    "TestComponent": {
        "componentname": "TestComponent",
        "category": "advance",
        "icon": "icon icon-holder",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        'defaultdata': EasyLibrary.ReadDOM("TestComponent/TestComponent"),
        "beforedrop": function ($appendedParent, $holder, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("TestComponent/TestComponentBasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var currentLayout = $parent.attr('data-layout');

                        LoadSettings();
                        Init();

                        function LoadSettings() {
                            var isHeadingHidden = $parent.find('.cardHead').hasClass('hide-element');
                            if (!isHeadingHidden)
                                $('#showCardHeading').prop('checked', true);

                            var isDetailVisible = $parent.find('.cardDescription').hasClass('hide-element');
                            if (!isDetailVisible)
                                $('#showCardDesc').prop('checked', true);


                            if (currentLayout) $('#slcCardImageDetail').val(currentLayout);
                            else $('#slcCardImageDetail').val(0);

                        }

                        function Init() {

                            //Holder Settings
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
                            //Holder Settings End here

                            $('#slcCardImageDetail').off().on('change', function () {
                                var $this = $(this);
                                var selectedLayout = $this.find("option:selected").val();

                                var cardImage = $parent.find('.cardImage');
                                var cardDetail = $parent.find('.cardDetail');

                                $parent.attr({ 'data-layout': selectedLayout });


                                var sfImageWidthClass = cardImage.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                var imgTextAlight = cardImage.attr('class').match(/(text-align-)\w{1,5}/g);

                                if (imgTextAlight)
                                    cardImage.removeClass(imgTextAlight[0]);

                                var sfcardDetailWidthClass = cardDetail.attr('class').match(/sfCol_[0-9]{1,3}/g);

                                switch (selectedLayout) {

                                    case 'card-imgtb':
                                    case 'card-imgbt':
                                        cardImage.removeClass(sfImageWidthClass[0]).addClass('sfCol_100');
                                        cardDetail.removeClass(sfcardDetailWidthClass[0]).addClass('sfCol_100');
                                        break;

                                    case 'card-imglr':
                                    case 'card-imgrl':
                                        cardImage.removeClass(sfImageWidthClass[0]).addClass('sfCol_50');
                                        cardDetail.removeClass(sfcardDetailWidthClass[0]).addClass('sfCol_50');
                                        break;
                                }
                                ReInitializeDOMPosition(selectedLayout);
                            });
                            $('#showCardHeading').off().on('click', function () {
                                var isChecked = $(this).is(':checked');

                                if (!isChecked) {
                                    $parent.find('.cardHead').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.cardHead').each(function () {
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });


                            $('#showCardDesc').off().on('click', function () {
                                var isChecked = $(this).is(':checked');
                                if (!isChecked) {
                                    $parent.find('.cardDescription').addClass('hide-element');
                                    SettingEvents();
                                }
                                else {
                                    $parent.find('.cardDescription').each(function () {
                                        var $im = $(this);
                                        $(this).removeClass('hide-element');
                                    });

                                }
                                component.carousel.settingDOMs.tabs.Data.onload($item);
                            });

                        }

                        function ReInitializeDOMPosition(cardLayout) {

                            var cardContainer = $item.parent().parent();
                            var imgContainer = cardContainer.find('.cardImage');
                            var detailContainer = cardContainer.find('.cardDetail');

                            switch (cardLayout) {

                                case 'card-imgtb':
                                    imgContainer.addClass('text-align-left');
                                    imgContainer.insertBefore(detailContainer);                                    
                                    break;

                                case 'card-imgbt':
                                    imgContainer.addClass('text-align-right');
                                    detailContainer.insertBefore(imgContainer);                                    

                                    break;

                                case 'card-imglr':
                                    imgContainer.addClass('text-align-left');
                                    imgContainer.insertBefore(detailContainer);                                    
                                    break;

                                case 'card-imgrl':
                                    imgContainer.addClass('text-align-right');
                                    detailContainer.insertBefore(imgContainer);                                    
                                    break;
                            }
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
,    "text link": {
        "componentname": "text link",
        "category": "basic",
        "icon": "icon-text-link",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("anchordom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("txtbasictab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.find('.anchorWrapper').find('a'); //.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    },
                },

                "Linked To": {
                    "DOM": EasyLibrary.ReadDOM("anchorsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();

                        BindPages();
                        InitEvent();
                        LoadDefault();

                        function BindPages() {
                            var pageList = EasyLibrary.GetPageArray();
                            var html = '';
                            $.each(pageList, function (index, item) {
                                html += '<option value="';
                                html += "/" + item.name;
                                html += '">';
                                html += item.name;
                                html += '</option>';
                            });
                            $('#ddllinkPages').html(html);
                        }


                        function LoadDefault() {
                            var $anchor = $parent.find('.anchorWrapper').find('a');
                            var dataLinkType = $anchor.attr('data-linktype');
                            if (dataLinkType == 1) {
                                //$('#rbPages').trigger('click');
                                $('#rbPages').prop('checked', 'checked');
                            } else {
                                //$('#rbPages').trigger('click');
                                $('#rbExternal').prop('checked', 'checked');
                            }

                            HandleData(dataLinkType);
                        }

                        function InitEvent() {
                            $('#rbLinkType input:radio').click(function () {
                                var linkType = ($(this).val());
                                HandleData(linkType);
                            });

                            $("#txtAnchorTitle").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value == '')
                                    value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque metus, pellentesque sit amet turpis id, tempor dignissim nunc. Duis id consequat ligula, at semper mauris.';
                                var $anchor = $parent.find('.anchorWrapper').find('a');
                                $anchor.text(value);
                            });

                            $("#txtExternalLink").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value == '')
                                    value = '#';
                                var $anchor = $parent.find('.anchorWrapper').find('a');
                                $anchor.attr('href', value);
                            });

                            $('#ddllinkPages').on('change', function () {
                                var value = $(this).val().trim();
                                //alert(value);
                                if (value == '')
                                    value = '#';
                                var $anchor = $parent.find('.anchorWrapper').find('a');
                                $anchor.attr('href', value);
                            });
                        }

                        function HandleData(linkType) {
                            var $anchor = $parent.find('.anchorWrapper').find('a');
                            var dataLink = $anchor.attr('href').trim();
                            var dataLinkType = $anchor.attr('data-linktype');
                            var dataLinkTitle = $anchor.text();
                            $anchor.attr('data-linktype', linkType);
                            $("#txtAnchorTitle").text(dataLinkTitle);
                            //alert(dataLinkType != linkType);

                            //if (dataLinkType != linkType) dataLink = "#";

                            if (linkType == 1) {
                                $('#linkPages').show();
                                $('#linkExternal').hide();

                                if (dataLink == '#')
                                    dataLink = $("#ddllinkPages option").first().val();

                                $('#ddllinkPages').val(dataLink);
                                $anchor.attr('href', dataLink);
                                $anchor.attr('target', '_self');
                                $anchor.addClass('anchorpage');
                            } else {
                                $anchor.removeClass('anchorpage');
                                $('#linkExternal').show();
                                $('#linkPages').hide();
                                $anchor.attr('target', '_blank');
                                if (dataLink == '') {
                                    dataLink = '';
                                }

                                $('#txtExternalLink').val(dataLink);

                                //if (externalLinkType == "_blank")
                                //    $('#rbNewPage').attr('checked', 'checked');
                                //else
                                //    $('#rbSelf').attr('checked', 'checked');

                            }
                        }

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
                    }

                },

                "Alignment": {
                    "options": ["left", "center", "right"]
                },

                "Hover Effect": {
                    "options": {
                        "color": ["text"]
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent().find('.anchorWrapper').find('a');
                    }
                },

                "Scroll Effect": {
                    "options": []
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();

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
        "type": "element",
        "defaultdata": DOMCreate('div', textOption + '<p style="font-size: 14px; color: rgb(116, 119, 122);" class="editor-para editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0" contenteditable="true">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>', 'editor-component paragraph sfCol_100 text-align-center sfFixed'),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (typeof ($appendLayer) !== "undefined") {
                var $textChange = $appendLayer.children().not('div').eq(0);
                $textChange.addClass('ff-' + $('#basicFonts').val());
                $textChange.addClass('f-weight-400');
            }
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
        }
    }
,    "Text editor": {
        "componentname": "Text editor",
        "category": "advance",
        "icon": "fa fa-file-text",
        "row": false,
        "hidden": false,
        "type": "element",
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
                        var TextEditor= MainFuntion($thisMain);
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
                    range = saveSelection();
                    restoreSelection(range);
                    fontWeight($this.val());                    
                    document.execCommand('fontName', false, $this.val());
                    selection = document.getSelection();
                    if (selection.anchorNode.parentElement.tagName == 'FONT') {
                        if ($this.parent().next().children().val() == "0") {
                            var fontElements = document.getElementsByTagName("font");
                            document.execCommand('fontSize', false, 2);

                            for (var i = 0, len = fontElements.length; i < len; ++i) {
                                if (fontElements[i].size == "2") {
                                    fontElements[i].removeAttribute("size");
                                    fontElements[i].style.fontSize = $this.prev().find('.fontValueC').text();
                                    $(fontElements[i]).children().each(function () {
                                        if (typeof $(this).attr('class') != 'undefined') {
                                            var fontWeightValue = '';
                                            fontWeightValue = 'f-weight-' + $this.parent().next().find('.cFontWeight').val();
                                            if (typeof $(this).attr('class') != 'undefined') {
                                                matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                                $(this).removeClass(matches.toString());                                                
                                                if (typeof $(this).children().attr('class') == 'undefined') {
                                                    $(this).contents().unwrap();                                                    
                                                }
                                                CheckChildren(this);                                                                                                
                                            }
                                            if (typeof $(this).children().children().attr('class') != 'undefined') {
                                                matches = $(this).children().children().attr('class').match(/\bf-weight-\S+/g);
                                                $(this).children().children().removeClass(matches.toString());
                                                $(this).children().children().parent().html($(this).children().children().html());
                                            }
                                            if (typeof $(this).children().attr('class') != 'undefined') {
                                                matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                                                $(this).children().removeClass(matches.toString());
                                                $(this).html($(this).contents().text());
                                            }
                                        }                                        
                                    });
                                }
                            }
                        }
                        else {
                            if (typeof selection.anchorNode.parentElement.className != 'undefined') {                                
                                var matches = selection.anchorNode.parentElement.className.match(/\bf-weight-\S+/g);
                                if (matches != null) {
                                    $(selection.anchorNode.parentElement).removeClass(matches.toString());
                                }
                            }
                        }
                    }
                    else if (selection.anchorNode.parentElement.tagName == 'B') {
                        selection.anchorNode.parentElement.className = '';
                        $(selection.anchorNode.parentElement).parent().html($(selection.anchorNode.parentElement).html());
                    }                    
                    else if (selection.anchorNode.parentElement.tagName == 'P') {
                        selection.anchorNode.parentElement.className = 'f-weight-' + $this.parent().next().children().val();
                    }
                    else if (selection.anchorNode.parentElement.tagName == 'SPAN') {
                        $(selection.anchorNode.parentElement).children().each(function () {
                            var matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                            if (matches != null) {
                                $(this).removeClass(matches.toString());
                                
                                if (typeof $(this).children().attr('class') == 'undefined') {
                                    $(this).contents().unwrap();
                                                                    }
                            }
                            CheckChildren(this,matches);
                        });
                    }
                    else if (selection.anchorNode.parentElement.nextElementSibling != null) {
                        if (selection.anchorNode.parentElement.nextElementSibling.tagName == 'FONT') {
                            var matches = selection.anchorNode.parentElement.nextElementSibling.className.match(/\bf-weight-\S+/g);
                            if (matches != null) {
                                $(selection.anchorNode.parentElement.nextElementSibling).removeClass(matches.toString());
                            }                            
                            selection.anchorNode.parentElement.nextElementSibling.className = selection.anchorNode.parentElement.nextElementSibling.className + ' f-weight-' + $this.parent().next().children().val();
                        }
                    }
                    flagfontFam = true;
                    flagfontFamVal = $this.val();
                    $this.val(flagfontFamVal);
                    CommandALL();
                });
                function removematchClass(child, matches) {
                    child.parentNode.removeClass(matches);
                }
                function CheckChildren(node,matches) {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        var child = node.childNodes[i];
                        CheckChildren(child,matches);
                        removematchClass(child,matches);
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
                    addfont();
                    restoreSelection(range);
                    hideDropChild();
                    var sCmd = $this.attr('id');
                    if (range.endOffset == range.startOffset) {                        
                        document.execCommand("fontSize", false, "2");
                        
                        var doc = document.querySelector(".documenteditor");                        
                        var fontElements = doc.getElementsByTagName("font");
                        var DefaultFontweight = $this.val();
                        for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                            if (fontElements[fontElement].size == '2') {                                
                                if (fontElements[fontElement].style.fontWeight != '') {
                                    DefaultFontweight = fontElements[fontElement].style.fontWeight;
                                }
                                $(fontElements[fontElement]).children().each(function () {                                    
                                    if (typeof $(this).attr('class') != 'undefined' || typeof $(this).children().attr('class') != 'undefined') {
                                        var matches = '';                                        
                                        if (typeof $(this).children().attr('class') != 'undefined') {
                                            matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                                            $(this).children().removeClass($(this).children().attr('class'));
                                        }
                                        else if (typeof $(this).attr('class') != 'undefined') {
                                            matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                            $(this).removeClass($(this).attr('class'));
                                        }
                                    }
                                });
                                fontElements[fontElement].className = 'f-weight-' + DefaultFontweight;
                            }
                        }

                    }
                    else {
                        var $parentWeight = $this.parent().parent();
                        var fontexitval = '';

                        selection = document.getSelection();                        
                        var startOffset=range.startOffset;
                        var endOffset=range.endOffset;
                        document.execCommand('bold', false, null);
                        range = saveSelection();                                                         
                        var fontElements = $documenttext.find("b");
                        
                        var DefaultFontweight = $this.val();                        
                        for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                            if (fontElements[fontElement].style.fontWeight != '') {
                                DefaultFontweight = fontElements[fontElement].style.fontWeight;
                            }
                            $(fontElements[fontElement]).children().each(function () {
                                if (typeof $(this).attr('class') != 'undefined' || typeof $(this).children().children().attr('class') != 'undefined' || typeof $(this).children().attr('class') != 'undefined') {
                                    var matches = '';
                                    if (typeof $(this).children().children().attr('class') != 'undefined') {
                                        matches = $(this).children().children().attr('class').match(/\bf-weight-\S+/g);
                                        $(this).children().children().removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                    else if (typeof $(this).attr('class') != 'undefined') {
                                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                    else if (typeof $(this).children().attr('class') != 'undefined') {
                                        matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                                        $(this).children().removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                }
                                $(this).parent().find('font').each(function () {
                                    if(typeof $(this).attr('class')!='undefined')
                                    {
                                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                });
                            });
                            if (range.startOffset != 1 && range.endOffset != 1) {
                                selection.anchorNode.parentElement.className = 'f-weight-' + DefaultFontweight;
                            }
                            if (selection.anchorNode.parentElement.parentElement.tagName == 'SPAN') {                                
                                    var NewElement = $("<b />");
                                    $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                                        $(NewElement).attr(attrib.name, attrib.value);
                                    });                                   
                            }                            
                        }
                        if (selection.anchorNode.parentElement.parentElement.tagName == "SPAN")
                        {
                            if (typeof selection.anchorNode.parentElement.parentElement.tagName != 'undefined') {
                                $(selection.anchorNode.parentElement.parentElement).removeAttr('style');
                                $(selection.anchorNode.parentElement.parentElement).children().each(function () {
                                    if (typeof $(this).attr('class') != 'undefined' )
                                    {
                                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                });                                
                                var NewElement = $("<b />");
                                $.each(selection.anchorNode.parentElement.parentElement.attributes, function (i, attrib) {
                                    $(NewElement).attr(attrib.name, attrib.value);
                                });                                
                            }
                            else {
                                $(selection.anchorNode.parentElement).removeAttr('style');
                                $(selection.anchorNode.parentElement).attr('class', 'f-weight-' + DefaultFontweight);                                
                                var NewElement = $("<b />");
                                $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                                    $(NewElement).attr(attrib.name, attrib.value);
                                });                                
                            }
                        }                        
                        if (selection.anchorNode.parentElement.parentElement.tagName == "P") {
                            var $selectionParent = $(selection.anchorNode.parentElement.parentElement);
                            $selectionParent.children().each(function (index, value) {
                                if ($(this).is('font')) {
                                    var thisHTML = (this).outerHTML;
                                    var $$this = $(this);
                                    if (typeof $selectionParent.children().eq(index).attr('style') != 'undefined')
                                        arr[index] = $selectionParent.children().eq(index).css('font-size');
                                }
                            });                            
                        }
                        if (selection.anchorNode.parentElement.tagName == "SPAN")
                        {
                            $(selection.anchorNode.parentElement).removeAttr('style');
                            $(selection.anchorNode.parentElement).attr('class', 'f-weight-' + DefaultFontweight);                            
                            var NewElement = $("<b />");
                            $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                                $(NewElement).attr(attrib.name, attrib.value);
                            });                            
                        }
                        
                        var fontsizelist = $(selection.anchorNode.parentElement).css('font-size');

                        if (selection.anchorNode.parentElement.parentElement.tagName == 'FONT') {
                            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;                            
                            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                        }
                        else if (selection.anchorNode.parentElement.parentElement.tagName == 'LI') {
                            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                        }
                        else if (selection.anchorNode.parentElement.parentElement.tagName == 'B') {
                            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                        }                        
                        else {
                            selection.anchorNode.parentElement.style.fontSize = fontsizelist;
                            var $selectionParent = $(selection.anchorNode.parentElement.parentElement);
                            $selectionParent.children().each(function (index, value) {
                                if ($(this).is('font')) {
                                    var $$this = $(this);
                                    if (typeof arr[index] != 'undefined') {
                                        $selectionParent.children().eq(index).css('font-size', arr[index]);
                                    }
                                }
                            });
                        }
                    }
                });                
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
                    restoreSelection(range);
                    var font = '';
                    if (FontCalc == 'btnPlusFontSize') {
                        font = $this.prev().text().split('px')[0];
                        if (font < 150) {
                            font++;
                        }
                    }
                    else {
                        font = $this.next().text().split('px')[0];
                        if (font > 10) {
                            font--;
                        }
                    }
                    document.execCommand("fontSize", false, "2");
                    var fontElements = document.getElementsByTagName("font");
                    for (var i = 0, len = fontElements.length; i < len; ++i) {
                        if (fontElements[i].size == "2") {
                            fontElements[i].removeAttribute("size");
                            fontElements[i].style.fontSize = font + "px";

                            selection = document.getSelection();
                            if (selection.anchorNode.parentElement.parentElement.tagName == 'LI') {
                                var fontsizelist = $this.parent().parent().parent().parent().find('.fontValueC').text();
                                selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                            }
                        }
                    }
                    if ($documenttext.text() == '') {
                        $documenttext.find('.pClass').css('font-size', font + 'px');
                    }
                    if (FontCalc == 'btnPlusFontSize') {
                        $this.prev().text(font + "px");
                    }
                    else {
                        $this.next().text(font + "px");
                    }
                    FontUse = font + 'px';
                }
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
                            hideDropChild();
                            var objColor = '';
                            objColor = RenderCallBackColor(this);                            
                            if ($elm.hasClass('doceditcolor')) {
                                restoreSelection(range);
                                objColor.bgColor = rgb2hex(objColor.bgColor);

                                document.execCommand("forecolor", false, objColor.bgColor);
                                if (range.collapsed == true) {
                                    if (flagb == true) {
                                        if (isActiveFlag == true) {
                                            document.execCommand("bold", false, null);
                                        }
                                    }
                                    if (flagi == true) {
                                        if (isActiveFlag == true) {
                                            document.execCommand('italic', false, null);
                                        }
                                    }
                                    if (flagb == true) {
                                        if (isActiveFlag == true) {
                                            document.execCommand('underline', false, null);
                                        }
                                    }                                    
                                }                                
                                fcolor = objColor.bgColor;
                                range = saveSelection();
                            }
                            else if ($elm.hasClass('doceditcolorBG')) {
                                restoreSelection(range);
                                objColor.bgColor = rgb2hex(objColor.bgColor);

                                document.execCommand("backColor", false, objColor.bgColor);                               
                                range = saveSelection();
                            }
                            flagColor = true;
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
        }
    }


,    "underline": {
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
,    "VideoBanner": {
        "componentname": "VideoBanner",
        "category": "pro",
        "icon": "fa fa-play-circle-o",
        "row": true,
        "hidden": false,
        "type": "video",
        "defaultdata": EasyLibrary.ReadDOM("VideoText/youtubecom"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            var _this = this;
            _this.view.library.playbutton();
            if (dropped) {
                var $parent = $appendLayer.find('.youtubeVideoWrap');
                var $youtubeVideoTextMain = $parent.find('.youtubeVideoTextMain');

                var iframe = $parent.find('iframe');
                var url = iframe.attr('src');
                var urlAuto;
                if (url.includes("autoplay")) {
                    var position = url.indexOf("autoplay");
                    var substring = url.substr(position, url.length);
                    urlAuto = url.replace(substring, "autoplay=1");

                    $parent.find("iframe").attr('src', urlAuto + "&loop=1&showinfo=0&modestbranding=1&rel=0&mute=1&iv_load_policy=3&playlist=64N14KQaUZw");
                }
                else {
                    url = url + "&autoplay=1";
                }
                var $totalHeight = ($parent.height() - $parent.find('.youtubeVideoTextMain').height()) / 2;
                var textColor = $parent.find('.youtubeVideoTextMain').find('p').css('color', 'rgb(255, 255, 255)');
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("VideoText/youtubebasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var youTubeurl = 'https://www.youtube.com/embed/';
                        var url = '';
                        InitEvent();
                        function InitEvent() {
                            LoadSettings();
                            Events();
                            LoadSettingsOpacitySize();
                            OpacityColor();
                        }
                        function LoadSettings() {
                            var $iframeSrc = $parent.find('iframe');
                            var url = $iframeSrc.attr('src');
                            var id = GetYouTubeID(url);
                            $("#txtYoutubeLink").val(youTubeurl + id);
                            var isAllowFull = $iframeSrc.attr("data-fullscreen");
                            var controls = getParameterByName("controls", url);

                            if ($parent.hasClass('fullpagebanneryoutube')) {
                                $('#heightAdjustYoutubeVideo').prop('checked', true);
                            }
                            else {
                                $('#heightAdjustYoutubeVideo').prop('checked', false);
                            }
                            if ($parent.hasClass('enableplaybuttonvideobanner')) {
                                $('#EnablePlayButton').prop('checked', true);
                            }
                            else {
                                $('#EnablePlayButton').prop('checked', false);
                            }
                        }
                        function Events() {
                            $("#txtYoutubeLink").on("change", function () {
                                var link = $("#txtYoutubeLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the YouTube Link", 'Alert');
                                }
                                else {
                                    var id = GetYouTubeID(link);
                                    url = youTubeurl + id;
                                    var iframe = '';
                                    iframe += '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '?';
                                    iframe += 'controls=';
                                    if ($("#chkYouTubeControls").prop("checked")) {
                                        iframe += 1;
                                    }
                                    else {
                                        iframe += 0;
                                    }
                                    iframe += '&autoplay=1';
                                    iframe += '&loop=1';
                                    iframe += '&controls=0';
                                    iframe += '&showinfo=0';
                                    iframe += '&autohide=0';
                                    iframe += '&modestbranding=1';
                                    iframe += '&rel=0';
                                    iframe += '&mute=1'
                                    iframe += '&iv_load_policy=3';
                                    iframe += '&playlist=64N14KQaUZw';
                                    iframe += '"';
                                    if ($("#chkYouTubeAllowFullScreen").prop("checked")) {
                                        iframe += ' allowfullscreen data-fullscreen="1"';
                                    }
                                    else {
                                        iframe += ' data-fullscreen="1"';
                                    }
                                    iframe += ' >';
                                    iframe += '</iframe>';
                                    $parent.find(".youtubeVideoWrap").find('iframe').remove();
                                    $parent.find(".youtubeVideoWrap").find('.youtubeVideoTextMain').prepend(iframe);
                                    $parent.find('.youtubeVideoWrap').css('height', '100%');

                                    if ($parent.hasClass('enableplaybuttonvideobanner')) {
                                        $parent.find('.fonticon').parent().css('display', 'block');
                                    }
                                    else {
                                        $parent.find('.fonticon').parent().css('display', 'none');
                                    }

                                    component['VideoBanner'].view.library.playbutton();
                                }
                            });
                            $('#EnablePlayButton').off().on('click', function () {

                                if ($(this).is(':checked')) {
                                    $parent.addClass('enableplaybuttonvideobanner');
                                    $parent.find('.onhovercolor').show();
                                    $parent.find('.fonticon').parent().css('display', 'block');
                                }
                                else {
                                    $parent.removeClass('enableplaybuttonvideobanner');
                                    $parent.find('.fonticon').parent().css('display', 'none');
                                }
                            });
                        }
                        function getParameterByName(name, url) {
                            name = name.replace(/[\[\]]/g, "\\$&");
                            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                                results = regex.exec(url);
                            if (!results) return null;
                            if (!results[2]) return '';
                            return decodeURIComponent(results[2].replace(/\+/g, " "));
                        }
                        function GetYouTubeID(url) {
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);

                            if (match && match[2].length == 11) {
                                return match[2];
                            } else {
                                return 'error';
                            }
                        }

                        function LoadSettingsOpacitySize() {
                            var opacity = parseInt($parent.find('iframe').css('opacity') * 10);
                            function videobannerOpacitySlider(space) {
                                $parent.find('iframe').css('opacity', space / 10);
                            }
                            AdvanceSageSlider($('#opacitySize'), $('#opacitySizeHandle'), 1, 10, opacity, videobannerOpacitySlider, $parent, '');
                        }
                        function OpacityColor() {
                            $('.VideoBannerOpacityColorPicker.resOpacBg').css('background-color', $parent.find('.youtubeVideoWrap').attr('data-backgroundcolor'));

                            var objColor = '';
                            var colorOpacVidOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    objColor = RenderCallBackColor(this);
                                    if ($elm.hasClass('resOpacBg')) {
                                        $parent.css('background-color', objColor.bgColor);
                                    }
                                }
                            });
                            $('.VideoBannerOpacityColorPicker').colorPicker(colorOpacVidOption);
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                },
                "Height": {
                    "DOM": EasyLibrary.ReadDOM("VideoText/youtubeheight"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.youtubeVideoWrap');
                        var $MainParent = $parent.parent().parent();
                        init();
                        LoadSettings();
                        function init() {
                            if ($parent.hasClass('enablevideoheight')) {
                                $('#EnableVideoHeight').prop('checked', true);
                                $('#VideoHeight').show();
                            }
                            else {
                                $('#EnableVideoHeight').prop('checked', false);
                                $('#VideoHeight').hide();
                            }
                        }
                        function LoadSettings() {
                            var rowHeight = parseInt($MainParent.css('height').replace('px', ''));
                            function RowHeight(space) {
                                $MainParent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#youtubeVideoHeightSlider'), $('#youtubeVideoHeightHandle'), 20, 1100, rowHeight, RowHeight, $MainParent, 'px');
                        }
                        $('#refresYouTubeWidth').on('click', function () {
                            $MainParent.css({ 'height': '' });
                        });
                        var tempvalue = '';
                        $('#EnableVideoHeight').off().on('click', function () {
                            if ($(this).is(':checked')) {
                                $('#VideoHeight').show();
                                $parent.addClass('enablevideoheight');
                                videoheights = parseInt($MainParent.css('height').replace('px', ''));
                                ChangeSliderValue($('#youtubeVideoHeightSlider'), videoheights);
                            } else {
                                $('#VideoHeight').hide();
                                $parent.removeClass('enablevideoheight');
                                $MainParent.css('height', '');
                                tempvalue = $MainParent.css('height');
                            }
                        });
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "view": {
            "view": function () {
                this.library.playbutton();
            },
            "library":
                {
                    "playbutton": function () {
                        var _this = this;
                        $('.fonticon').off().on('click', function () {
                            var $this = $(this);
                            var displayElement = $this.parents('.VideoBanner').find('.youtubeVideoWrap').find('iframe')[0].outerHTML;
                            _this.displaycontent(displayElement);
                        });
                    },
                    "displaycontent": function ($content) {
                        FullPagePopup({
                            data: '<div class="sfCol_100" style="height:100%" >' + $content + '</div>',
                            heading: "Preview",
                            height: '60%',
                            width: '40%',
                            showheading: true,
                            onappend: function ($wrapper) {
                                $wrapper.find('iframe').css({ "height": "100%", "width": "100%", "opacity": "1" });
                            }
                        });
                    }
                }
        }
    }
,    "youtube video": {
        "componentname": "youtube video",
        "category": "advance",
        "icon": "fa fa-youtube",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "video",
        "defaultdata": EasyLibrary.ReadDOM("youtubecom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("youtubebasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var youTubeurl = 'https://www.youtube.com/embed/';
                        var url = '';
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }

                        function LoadSettings() {
                            var $iframeSrc = $parent.find('iframe');
                            var url = $iframeSrc.attr('src');
                            var id = GetYouTubeID(url);
                            $("#txtYoutubeLink").val(youTubeurl + id);
                            var isAllowFull = $iframeSrc.attr("data-fullscreen");
                            if (parseInt(isAllowFull) == 1) {
                                $("#chkYouTubeAllowFullScreen").prop("checked", true);
                            } else {
                                $("#chkYouTubeAllowFullScreen").prop("checked", false);
                            }
                            var controls = getParameterByName("controls", url);
                            if (parseInt(controls) == 1) {
                                $("#chkYouTubeControls").prop("checked", true);
                            } else {
                                $("#chkYouTubeControls").prop("checked", false);
                            }

                            var autoPlay = getParameterByName("autoplay", url);
                            if (parseInt(autoPlay) == 1) {
                                $("#chkYouTubeAutoplay").prop("checked", true);
                            } else {
                                $("#chkYouTubeAutoplay").prop("checked", false);
                            }

                        }

                        function Events() {
                            $("#btnGenerateYouTube").on("click", function () {
                                var link = $("#txtYoutubeLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the YouTube Link", 'Alert');
                                } else {
                                    var id = GetYouTubeID(link);
                                    url = youTubeurl + id;
                                    var iframe = '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '?';
                                    iframe += 'controls=';
                                    if ($("#chkYouTubeControls").prop("checked")) {
                                        iframe += 1;
                                    } else {
                                        iframe += 0;
                                    }
                                    iframe += '&autoplay=';
                                    if ($("#chkYouTubeAutoplay").prop("checked")) {
                                        iframe += 1;
                                    } else {
                                        iframe += 0;
                                    }
                                    iframe += '"';
                                    if ($("#chkYouTubeAllowFullScreen").prop("checked")) {
                                        iframe += ' allowfullscreen data-fullscreen="1"';
                                    } else {
                                        iframe += ' data-fullscreen="0"';
                                    }
                                    iframe += ' >';
                                    iframe += '</iframe>';
                                    $parent.find(".youtubeVideoWrap").html(iframe);
                                }
                            });
                        }

                        function getParameterByName(name, url) {
                            name = name.replace(/[\[\]]/g, "\\$&");
                            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                                results = regex.exec(url);
                            if (!results) return null;
                            if (!results[2]) return '';
                            return decodeURIComponent(results[2].replace(/\+/g, " "));
                        }

                        function GetYouTubeID(url) {
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);

                            if (match && match[2].length == 11) {
                                return match[2];
                            } else {
                                return 'error';
                            }
                        }

                    }
                },
                "Adjust Height": {
                    "DOM": EasyLibrary.ReadDOM("youtubeheight"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.youtubeVideoWrap');
                        LoadSettings();
                        function LoadSettings() {
                            var rowHeight = $parent.css('height').replace('px', '');
                            function RowHeight(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#youtubeVideoHeightSlider'), $('#youtubeVideoHeightHandle'), 200, 1200, rowHeight, RowHeight, $parent, 'px');
                        }
                        $('#refresYouTubeWidth').on('click', function () {
                            $parent.css({ 'height': '' });
                        });
                    }
                }

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }
,}
