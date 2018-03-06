var siteheader = {
    "siteheader": {
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
}
