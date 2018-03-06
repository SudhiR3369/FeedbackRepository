var logo_slider = {
    "logo slider": {
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
}