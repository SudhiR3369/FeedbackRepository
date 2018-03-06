var rating_linear = {
    "rating linear": {
        "componentname": "rating linear",
        "category": "basic",
        "icon": "fa fa-star",
        "row": false,
        "hidden": false,
        "defaultdata": EasyLibrary.ReadDOM("rating/linearrating"),
        "onDrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            var initDom = true;
            if (!dropped)
                initDom = false;

            var rStart = $appendLayer.attr('data-rstart');
            var rEnd = $appendLayer.attr('data-rend');


            $appendLayer.find('.linearratingContainer').LinearRating({
                callback: this.view.library.RatingCallback,
                initDom: initDom,
                startRange: rStart,
                endRange: rEnd,
            });


        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("rating/linearratingbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var ratingIcon = $item.parent().next().children().children();

                        var linearRatingContainer = $parent.find('.linearratingContainer');

                        var linearScaleStart = $parent.attr('data-rstart');
                        var linearScaleEnd = $parent.attr('data-rend');

                        LoadSettings();
                        TriggerEvents();

                        function BindLinearScale() {
                            var ratingStart = parseInt(linearScaleStart);
                            var ratingEnd = parseInt(linearScaleEnd);

                            $parent.find('.linearratingContainer').LinearRating({
                                callback: component["rating linear"].view.library.RatingCallback,
                                initDom: true,
                                clearParent: true,
                                startRange: ratingStart,
                                endRange: ratingEnd,
                                startLabel: '',
                                endLabel: '',
                                countRating: true
                            });

                        }

                        function LoadSettings() {
                            if (linearScaleStart) $('#slcLinearRangeStart').val(linearScaleStart);
                            if (linearScaleEnd) $('#slcLinearRangeEnd').val(linearScaleEnd);

                        }
                        function TriggerEvents() {
                            $('#slcLinearRangeStart').off().on('change', function () {
                                linearScaleStart = $(this).find('option:selected').val().toLowerCase();
                                $parent.attr('data-rstart', linearScaleStart);
                                BindLinearScale();
                            });

                            $('#slcLinearRangeEnd').off().on('change', function () {
                                linearScaleEnd = $(this).find('option:selected').val().toLowerCase();
                                $parent.attr('data-rend', linearScaleEnd);
                                BindLinearScale();
                            });


                            $('#txtLinearStart').off().on('blur keyup', function () {
                                linearRatingContainer.find('.linearScaleStartLabel').html(this.value);
                            });

                            $('#txtLinearEnd').off().on('blur keyup', function () {
                                linearRatingContainer.find('.linearScaleEndLabel').html(this.value);
                            });

                            var ratingWrapperWidth = parseInt(parseInt($parent.css('width'))) / 5;
                            function RatingWrapperWidthChange(space) { $parent.css({ 'width': space * 5 }); }
                            AdvanceSageSlider($('#linearratingbackWidthSlider'), $('#linearratingbackWidthHandle'), 0, 200, ratingWrapperWidth, RatingWrapperWidthChange, $parent, 'px');


                            var ratingWrapperSize = parseInt(parseInt($parent.css('height'))) / 5;
                            function RatingWrapperSizeChange(space) { $parent.css({ 'height': space * 5 }); }
                            AdvanceSageSlider($('#linearratingbackHeightSlider'), $('#linearratingbackHeightHandle'), 0, 200, ratingWrapperSize, RatingWrapperSizeChange, $parent, 'px');


                            var fontsize = parseInt(ratingIcon.css('font-size').replace('px', '') / 5);
                            function FontSizeChange(space) { ratingIcon.css('font-size', space * 5); }
                            AdvanceSageSlider($('#linearratingHeightSlider'), $('#linearratingHeightHandle'), 0, 200, fontsize, FontSizeChange, $parent, 'px');

                            $('#linearratingIconColor').css('background-color', ratingIcon.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    ratingIcon.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#linearratingIconColor').colorPicker(colorPickerOption);
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
                //return $elem.parent().parent();

                var $parent = $elem.parent().parent();
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            },
        },

        "view": {
            "view": function () {

                $('.linearratingContainer').LinearRating({
                    callback: this.library.RatingCallback,
                    initDom: false
                });

            },

            "library": {

                "RatingCallback": function ($container) {
                    //alert($container.children('.linearScaleIdentifier').text());
                },

            }
        }

    }
}