var proportfolio = {
    "proportfolio": {
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
}