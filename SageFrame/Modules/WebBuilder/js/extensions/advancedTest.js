var advancedTest = {
    "advancedTest": {
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
}
