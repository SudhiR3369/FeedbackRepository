var accordion = {
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
}