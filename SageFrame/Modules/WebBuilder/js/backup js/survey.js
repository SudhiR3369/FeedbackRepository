var survey = {
    "survey": {
        "componentname": "survey",
        "category": "advance",
        "icon": "fa fa-question-circle",
        "row": false,
        "hidden": false,
        "defaultdata": EasyLibrary.ReadDOM("survey/survey"),
        "onDrop": function ($appendLayer) { },
        "onsort": function (ui) { },
        "loadSetting": function ($item) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            var surveyContainer = $appendLayer.find('.SurveySliderWrapper');

            if (dropped) {
                var sliderLib = this.view.library;
                sliderLib.ReAssignViewItems(surveyContainer);
                this.common.InitalizeEvents(surveyContainer, surveyContainer.attr('data-type'));
            }
            //surveyContainer.removeClass('binded');
            //var carousel = new CarouselInit(surveyContainer);

            SettingEvents();

        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("survey/surveybasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $container = $parent.find('.SurveySliderWrapper');

                        LoadSettings();
                        TriggerEvents();

                      
                        function LoadSettings() {

                            function ChangeCaroselHeight(space) {
                                $parent.children().eq(2).height(space);
                            }
                            AdvanceSageSlider($('#surveyCompHeightSlider'), $('#surveyCompHeightHandle'), 0, 1000, $parent.children().eq(2).height(), ChangeCaroselHeight, $parent, 'px');

                        }

                        function TriggerEvents() {

                            $('#btnAddNewQuestion').off().on('click', function () {
                                var itemsWrapper = $container.find('.itemsWrapper');
                                var itemHTML = component["question"].defaultdata;

                                //var itemHTML = component['survey'].common.EnableComponentSettings(component["question"].defaultdata);

                                itemsWrapper.append('<li class="itemWrapper" style="vertical-align: top;">' + itemHTML + '</li>');

                                // UPDATE COMPONENTS

                                $container.removeClass('binded');
                                InitCarouselSlider($container);
                                SettingEvents();
                            });

                        }


                    }
                },
                "Background": { "options": ["image", "color"] },
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
            },
        },

        "view": {
            "view": function () {

            },

            "library": {

                "ReAssignViewItems": function ($container) {

                    var liItem = $container.find('.itemWrapper'); // CHECK FOR EXISTING ITEMS

                    if (liItem.length <= 1) { // IF IS FIRST TIME
                        //var itemsWrapper = $container.find('.itemsWrapper');
                        //var question = EasyLibrary.ReadDOM("survey/question");

                        //itemsWrapper.append('<li class="itemWrapper">' + question + '</li>');
                        //SettingEvents();


                    } else {

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

            "EnableComponentSettings": function (editorComponentContainer) {
                var newHTML = $(editorComponentContainer).addClass('options-display-inside')[0].outerHTML;
                return newHTML;
            },
        },

    }
}