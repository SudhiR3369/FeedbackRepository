var TestComponent = {
    "TestComponent": {
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
}
