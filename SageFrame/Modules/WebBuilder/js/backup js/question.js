var question = {
    "question": {
        "componentname": "question",
        "category": "advance",
        "icon": "fa fa-question-circle",
        "row": false,
        "hidden": true,
        "defaultdata": EasyLibrary.ReadDOM("question/question"),
        "onDrop": function ($appendLayer) { },
        "onsort": function (ui) { },
        "loadSetting": function ($item) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            component["question"].view.library.InitializeRatingScaleEvents();

        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("question/questionbasic"),
                    "onload": function ($item) {

                        var $parent = $item.parent().parent();
                        var currentQuestionType = $parent.attr('data-qsntype');
                        var optPerRow = $parent.attr('data-optperrow');
                        var currentAnswerType = $parent.attr('data-anstype');
                        var currentRatingScale = $parent.attr('data-ratingscale');
                        var dataAlignment = $parent.attr('data-align');
                        var questionContainer = $parent.find('.questionContainer');
                        var questionContainerChildren = questionContainer.children();
                        var currentTotal = questionContainerChildren.length;

                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {
                            $('#slcQuestionType').val(currentQuestionType);
                            if (currentAnswerType) $('#slcAnswerType').val(currentAnswerType);
                            if (optPerRow) $('#slcOptPerRow').val(optPerRow);
                            if (dataAlignment) $('#slcOptAlignment').val(dataAlignment);
                            if (currentRatingScale) $('#slcRatingScaleType').val(currentRatingScale);


                            switch (currentQuestionType) {
                                case "qsn-open":
                                    ToggleQuestionSettings_MultipleChoice(false);
                                    ToggleQuestionSettings_Rating(false);
                                    break;

                                case "qsn-multi":
                                    var multiChoice = $('#qsnMultiChoice');
                                    var answerType = $parent.attr('data-anstype');
                                    $('#qsnMultiChoice').val(answerType);
                                    ToggleQuestionSettings_MultipleChoice(true);
                                    break;

                                case "qsn-rating":
                                    ToggleQuestionSettings_Rating(true);
                                    break;

                            }
                        }

                        function ToggleQuestionSettings_MultipleChoice(show) {
                            if (show) {
                                $('#qsnMultiChoice').removeClass('hide-element');
                                $('#qsnOptions').removeClass('hide-element');
                                $('#qsnOptPerRow').removeClass('hide-element');
                                $('#qsnOptAlignment').removeClass('hide-element');

                            } else {
                                $('#qsnMultiChoice').addClass('hide-element');
                                $('#qsnOptions').addClass('hide-element');
                                $('#qsnOptPerRow').addClass('hide-element');
                                $('#qsnOptAlignment').addClass('hide-element');

                            }
                        }
                        function ToggleQuestionSettings_Rating(show) {
                            if (show) {
                                $('#qsnRatingScaleType').removeClass('hide-element');
                            } else {
                                $('#qsnRatingScaleType').addClass('hide-element');
                            }
                        }


                        function TriggerEvents() {

                            $('#slcQuestionType').off().on('change', function () {

                                // **** PROMPT USER 
                                var questionType = $(this).find('option:selected').val().toLowerCase();
                                $parent.attr('data-qsntype', questionType);

                                var newHTML = '';
                                switch (questionType) {
                                    case "qsn-open":
                                        ToggleQuestionSettings_MultipleChoice(false);
                                        ToggleQuestionSettings_Rating(false);
                                        questionContainer.empty();
                                        newHTML = ' <textarea class="answerBox" placeholder="Give your answer"></textarea>';
                                        questionContainer.html(newHTML);
                                        break;

                                    case "qsn-multi":
                                        {
                                            var qsnId = component["question"].common.GenerateID('qsn');

                                            $('#slcAnswerType').val(currentAnswerType);
                                            ToggleQuestionSettings_MultipleChoice(true);

                                            questionContainer.empty();

                                            var multiAnsType = GetInputTypeByAnswerType(currentAnswerType);

                                            newHTML += '<div class="sfCol_25  questionOption editor-com-innerSpacing-top-35 editor-com-innerSpacing-right-35 editor-com-innerSpacing-bottom-35 editor-com-innerSpacing-left-35 ">';
                                            newHTML += '<input id="' + qsnId + '" name="subscribe" value="1" type="' + multiAnsType + '">';
                                            newHTML += '<label for="' + qsnId + '" style="font-size:14px;" contenteditable="true">Option</label>';
                                            newHTML += '</div>';
                                            questionContainer.html(newHTML);
                                            $('#numCounterTotal').text(questionContainer.children().length);
                                        }
                                        break;

                                    case "qsn-rating":
                                        ToggleQuestionSettings_MultipleChoice(false);
                                        ToggleQuestionSettings_Rating(true);
                                        questionContainer.empty();

                                        questionContainer.html(EasyLibrary.ReadDOM("rating/rating"));
                                        component["question"].view.library.InitializeRatingScaleEvents();
                                        component["question"]["common"].InitalizeEvents(questionContainer, 'rating');
                                        SettingEvents();
                                        break;
                                }

                            });


                            $('#slcAnswerType').off().on('change', function () {

                                var newAnswerType = $(this).find('option:selected').val().toLowerCase();

                                if (newAnswerType !== currentAnswerType) {

                                    // **** PROMPT USER 

                                    var inputs = questionContainer.find('.questionOption').children('input');
                                    var inputType = GetInputTypeByAnswerType(newAnswerType);

                                    inputs.each(function () {
                                        $("<input type='" + inputType + "' />").attr({
                                            id: this.id,
                                            name: this.name,
                                            value: this.value
                                        }).insertAfter(this);
                                    }).remove();
                                    $parent.attr('data-anstype', newAnswerType);
                                    currentAnswerType = newAnswerType;
                                }


                            });

                            $('#slcOptPerRow').off().on('change', function () {

                                var perRowCount = $(this).find('option:selected').val().toLowerCase();
                                var itemsPerRow = parseInt(perRowCount);

                                component["question"].view.library.UpdateWidthAttribute(questionContainer, itemsPerRow);
                                $parent.attr('data-optperrow', perRowCount);

                            });

                            $('#slcOptAlignment').off().on('change', function () {
                                var alignment = $(this).find('option:selected').val().toLowerCase();
                                component["question"].view.library.ReDefineAlignment(questionContainer, alignment);
                                $parent.attr('data-align', alignment);

                                //var dataAlignment = $parent.attr('data-align');
                            });

                            //component["question"].view.library.InitializeRatingScaleEvents();

                            function GetInputTypeByAnswerType(answerType) {

                                var inputType = '';
                                switch (answerType) {
                                    case 'single': inputType = 'radio'; break;
                                    default: inputType = 'checkbox'; break;
                                }
                                return inputType;
                            }

                            function ReAssignTotalOptions(count, $par) {

                                debugger;
                                var questionOptions = questionContainer.children();
                                var questionOptionCount = questionOptions.length;

                                var newCount = parseInt(count);
                                var addComponent = true;
                                var itemDiff = Math.abs(questionOptionCount - newCount);

                                if (newCount < questionOptionCount) addComponent = false;

                                if (!addComponent) {
                                    for (var itemCount = 0; itemCount < itemDiff; itemCount++) {
                                        var existingChildren = $parent.find('.questionContainer').children();
                                        existingChildren.last().remove();
                                    }

                                } else {
                                    var containerComponents = $parent.find('.questionContainer').children();

                                    for (var itemCount2 = 0; itemCount2 < itemDiff; itemCount2++) {
                                        var itemCopy = containerComponents.eq(0).clone(true);

                                        var newItemID = component["question"].common.GenerateID('qsn');
                                        itemCopy.children('input').attr({
                                            id: newItemID,
                                            value: containerComponents.length + 1
                                        });

                                        itemCopy.children('label').attr({
                                            for: newItemID
                                        });
                                        //debugger;
                                        containerComponents.parent().append(itemCopy);
                                    }
                                }

                            }

                            EasyLibrary.NumberCounter($('.totalOptionsCounter'), 1, 50, 1, currentTotal, $parent, ReAssignTotalOptions);



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
            "view": function () { },

            "library": {


                "InitializeRatingScaleEvents": function () {

                    $('.rsCount').off().on('click', function () {
                        var $this = $(this);
                        var $parent = $this.parent();
                        var stars = $parent.children();
                        var starsCount = stars.length;

                        stars.removeClass('currentScale');
                        $this.addClass('currentScale');

                        $this.prevAll().removeClass('fa-star').addClass('fa-star-o');
                        $this.nextAll().removeClass('fa-star-o').addClass('fa-star');
                        $this.removeClass('fa-star-o').addClass('fa-star');

                        $parent.attr({ 'data-rating': $this.nextAll().length + 1 });

                    });

                },

                "UpdateWidthAttribute": function ($container, newColCount) {

                    var containerChildren = $container.children();

                    var widthPercentage = "";
                    switch (newColCount) {
                        case 2: widthPercentage = "50"; break;
                        case 3: widthPercentage = "33"; break;
                        case 4: widthPercentage = "25"; break;
                        case 5: widthPercentage = "20"; break;
                        case 1: widthPercentage = "100"; break;
                    }

                    var sfcolWidth = containerChildren.attr('class').match(/sfCol_[0-9]{1,3}/g);

                    var colWidth = 100;
                    if (sfcolWidth !== null) {
                        colWidth = sfcolWidth[0].split('_')[1];
                    }
                    containerChildren.removeClass(sfcolWidth[0]).addClass('sfCol_' + widthPercentage);


                },

                "ReDefineAlignment": function ($container, $alignment) {

                    var components = $container.children();
                    var alignmentClasses = components.attr('class').match(/text-align-[a-z]{4,6}/g);
                    if (alignmentClasses !== null) {
                        components.removeClass(alignmentClasses[0]);
                    }
                    var newAlignment = '';

                    switch ($alignment) {
                        case 'left': newAlignment = 'text-align-left'; break;
                        case 'right': newAlignment = 'text-align-right'; break;

                        case 'center':
                        default:
                            newAlignment = 'text-align-center'; break;
                    }
                    components.addClass(newAlignment);


                }
            }

        },

        "common": {

            "GenerateID": function (idType) {

                var newID = '';
                switch (idType) {
                    case 'qsn':
                        newID = '' + +new Date;
                        newID = newID.match(new RegExp('.{1,4}', 'g')).join("").split('').reverse().join('');
                        newID = idType + newID;
                        break;

                    default: break;
                }

                return newID;
            },

            "InitalizeEvents": function ($sender, componentName) {

                var compo = component[componentName];

                if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined") {
                    compo.afterdrop($sender.parent(), $sender, true, false);
                }

            },


            "ReDrawComponent": function () {

            },
            "AppendOptions": function ($appendTo, options) {

            },




            //"LoadDefaultQuestion": function ($container) {

            //    var html = '<div class="sfCol_25  questionOption editor-com-innerSpacing-top-35 editor-com-innerSpacing-right-35 editor-com-innerSpacing-bottom-35 editor-com-innerSpacing-left-35 ">';


            //}
        },

    }
}