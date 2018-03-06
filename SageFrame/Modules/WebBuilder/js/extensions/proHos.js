var proHos = {
    "proHos": {
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
}

