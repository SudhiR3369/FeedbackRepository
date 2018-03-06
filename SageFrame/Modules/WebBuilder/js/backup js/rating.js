var rating = {
    "rating": {
        "componentname": "rating",
        "category": "basic",
        "icon": "fa fa-star",
        "row": false,
        "hidden": false,
        "defaultdata": EasyLibrary.ReadDOM("rating/rating"),
        "onDrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            var initDom = true;
            if (!dropped)
                initDom = false;

            $appendLayer.find('.ratingContainer').StarRating({
                callback: this.view.library.RatingCallback,
                initDom: initDom
            });


        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("rating/ratingbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var ratingIcon = $item.parent().next().children().children();

                        TriggerEvents();

                        function TriggerEvents() {

                            var ratingWrapperWidth = parseInt(parseInt($parent.css('width'))) / 5;
                            function RatingWrapperWidthChange(space) { $parent.css({ 'width': space * 5 }); }
                            AdvanceSageSlider($('#ratingbackWidthSlider'), $('#ratingbackWidthHandle'), 0, 200, ratingWrapperWidth, RatingWrapperWidthChange, $parent, 'px');


                            var ratingWrapperSize = parseInt(parseInt($parent.css('height'))) / 5;
                            function RatingWrapperSizeChange(space) { $parent.css({ 'height': space * 5 }); }
                            AdvanceSageSlider($('#ratingbackHeightSlider'), $('#ratingbackHeightHandle'), 0, 200, ratingWrapperSize, RatingWrapperSizeChange, $parent, 'px');


                            var fontsize = parseInt(ratingIcon.css('font-size').replace('px', '') / 5);
                            function FontSizeChange(space) { ratingIcon.css('font-size', space * 5); }
                            AdvanceSageSlider($('#ratingHeightSlider'), $('#ratingHeightHandle'), 0, 200, fontsize, FontSizeChange, $parent, 'px');

                            $('#ratingIconColor').css('background-color', ratingIcon.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    ratingIcon.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#ratingIconColor').colorPicker(colorPickerOption);

                            var searchFields = '';
                            searchFields += '<li><i class="fa fa-star-o" data-primary="fa-star-o" data-secondary="fa-star"></i></li>';
                            searchFields += '<li><i class="fa fa-circle-o" data-primary="fa-circle-o" data-secondary="fa-circle" ></i></li>';
                            searchFields += '<li><i class="fa fa-square-o" data-primary="fa-square-o" data-secondary="fa-square"></i></li>';
                            searchFields += '<li><i class="fa fa-thumbs-o-up" data-primary="fa-thumbs-o-up" data-secondary="fa-thumbs-up"></i></li>';
                            searchFields += '<li><i class="fa fa-thumbs-o-down" data-primary="fa-thumbs-o-down" data-secondary="fa-thumbs-down"></i></li>';
                            searchFields += '<li><i class="fa fa-heart-o" data-primary="fa-heart-o" data-secondary="fa-heart"></i></li>';

                            $('.fontIconCollection').html(searchFields);


                            SearchFontIcon();
                            function SearchFontIcon() {

                                $('#searchIcons').on('keyup', function () {
                                    var searchVal = $(this).val();
                                    $('.fontIconCollection').find('li').each(function () {
                                        var $this = $(this);
                                        var dataPrimary = $this.find('i').attr('data-primary');

                                        var pos = dataPrimary.indexOf(searchVal);
                                        if (pos < 0) $this.addClass('content-hide');
                                        else $this.removeClass('content-hide');
                                    });
                                });
                            
                                var fontClasses = ratingIcon.attr('class').replace('fa ', '').trim();
                                alert(fontClasses);
                                $('.fontIconCollection').find('li i[data-class="' + fontClasses + '"]').parent().addClass('selected');

                                $('.fontIconCollection').find('li').on('click', function () {

                                    var primaryIcon = $(this).find('i').attr('data-primary');
                                    var secondaryIcon = $(this).find('i').attr('data-secondary');

                                    var updatedRatingStar = $parent.find('.ratingStar');

                                    var oldPrimary = updatedRatingStar.attr('data-primary');
                                    var oldSecondary = updatedRatingStar.attr('data-secondary');

                                    updatedRatingStar.children().removeClass(oldPrimary).removeClass(oldSecondary).addClass(primaryIcon);
                                    updatedRatingStar.attr({ 'data-primary': primaryIcon });
                                    updatedRatingStar.attr({ 'data-secondary': secondaryIcon });

                                    $('.fontIconCollection').find('li').removeClass('selected');
                                    $(this).addClass('selected');
                                });
                            }
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

                $('.ratingContainer').StarRating({
                    callback: this.library.RatingCallback,
                    initDom: false
                });

            },

            "library": {

                "RatingCallback": function (count) {
                },

            }
        }

    }
}