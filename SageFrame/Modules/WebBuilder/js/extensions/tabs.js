var tabs = {
    "tabs": {
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
}
