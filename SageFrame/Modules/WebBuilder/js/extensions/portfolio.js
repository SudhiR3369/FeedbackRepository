var portfolio = {
    "portfolio": {
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
}