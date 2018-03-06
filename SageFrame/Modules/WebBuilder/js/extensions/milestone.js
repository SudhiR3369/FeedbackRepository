var milestone = {
    "milestone": {
        "componentname": "milestone",
        "category": "advance",
        "icon": "icon-milestone",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "countdown",
        "defaultdata": EasyLibrary.ReadDOM('milestone/milestoneview'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($(document).find('#hdnMilestoneSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnMilestoneSettingAttr"></div>');
            if (!dropped)
                $('.mileStone-wrap').attr('data-animate', 0)
            $(window).scroll(function () {
                animateMileStone();
            });
            var winHeight = $(window).height() - 80;

            function IsInVisibleSection($Component) {
                var winScroll = $(window).scrollTop();
                var diff = $Component.offset().top - winScroll;
                if (0 <= diff && diff < winHeight)
                    return true;
                else
                    return false;
            }

            function animateMileStone() {
                $('.editor-row .mileStone-wrap').each(function () {
                    if (IsInVisibleSection($(this)) && $(this).attr('data-animate') == 0) {
                        $(this).attr('data-animate', 1);
                        $(this).find('.milestone-counter h1').each(function () {
                            $(this).prop('Counters', 0).animate({
                                Counters: $(this).text()
                            }, {
                                duration: 4000,
                                easing: 'swing',
                                step: function (now) {
                                    $(this).text(Math.ceil(now));
                                }
                            });
                        });
                    }
                });
            }
            animateMileStone();
        },
        "onsort": function (ui) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('milestone/milestonebasicsetting'),
                    "onload": function ($item) {
                        var attr = $('#hdnMilestoneSettingAttr').data('attribute');
                        if (attr != '') {
                            $('#popupModel').attrs(attr);
                            $('#hdnMilestoneSettingAttr').data('attribute', '');
                        }

                        var MileStoneBasic = {
                            IconClassReg: /fa-\w+(\-*\w*)*/g,
                            SettingButton: $item,
                            Position: 0,
                            Container: $item.parents('.milestone'),
                            init: function () {
                                $MileStoneItem = MileStoneBasic.Container.find('.milestone-item');
                                var html = '';
                                var mLength = $MileStoneItem.length;
                                $MileStoneItem.each(function () {
                                    $This = $(this);
                                    $Mcount = $This.find('.milestone-counter h1').text();
                                    $MTitle = $This.find('.milestone-title p').text();
                                    $MIcon = $This.find('.milestone-icon .mile-icon i').attr('class').match(MileStoneBasic.IconClassReg);
                                    html += '<div class="item field-row clearfix">';
                                    html += '<div class="multi-col-form-group ">';
                                    html += '<span class="value">';
                                    html += '<i class="iconChooser in-form-icon fa ' + $MIcon + '"></i>'

                                    html += '<input type="text" class="title mileStoneInput" placeholder="Title" value="' + $MTitle + '" >';
                                    html += '<input class="xsml-box counter mileStoneInput"  type="text" value="' + $Mcount + '">';
                                    if (mLength > 1)
                                        html += '<i title="Delete" class="deleteMilestone fa fa-trash in-form-icon delete-icon"></i>';
                                    html += '</span></div></div>';

                                });
                                $('.mileStoneForm').html(html);
                                MileStoneBasic.UIEvents();
                            },
                            UIEvents: function () {
                                var firstItem = MileStoneBasic.Container.find('.milestone-icon').first();
                                if (firstItem.css('display') != 'none')
                                    $('#chkIsActiveMileIcon').prop('checked', true);
                                $('#chkIsActiveMileIcon').off().on('click', function () {
                                    var IconWrap = MileStoneBasic.Container.find('.milestone-icon')
                                    if ($(this).is(':checked')) {
                                        IconWrap.show();
                                    } else {
                                        IconWrap.hide();
                                    }
                                });

                                $('.addMoreMilestone').off().on('click', function () {
                                    $MItem = MileStoneBasic.Container.find('.milestone-item').last();
                                    var NewDom = document.createElement("div");
                                    $(NewDom).attrs($MItem.attrs());
                                    $(NewDom).html($MItem.html());
                                    $MContainer = MileStoneBasic.Container.find('.mileStone-wrap');
                                    $MContainer.append(NewDom);

                                    $('#hdnMilestoneSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SettingEvents();

                                    MileStoneBasic.SettingButton.trigger('click');
                                });

                                $('.deleteMilestone').off().on('click', function () {
                                    $this = $(this);
                                    SageConfirmDialog('Are you sure?').done(function () {
                                        $pos = $('.mileStoneForm .item').index($this.parents('.item'))
                                        MileStoneBasic.Container.find('.milestone-item').eq($pos).remove();
                                        MileStoneBasic.init();
                                    });
                                });
                                $('.mileStoneInput').off().on('keyup', function () {
                                    $this = $(this);
                                    $Val = $this.val();
                                    $pos = $('.mileStoneForm .item').index($this.parents('.item'))
                                    var mileStoneItem = MileStoneBasic.Container.find('.milestone-item').eq($pos);
                                    if ($this.hasClass('title')) {
                                        mileStoneItem.find('.milestone-title p').text($Val);
                                    } else {
                                        if ($Val == '')
                                            $Val = 0
                                        if ($Val >= 0)
                                            mileStoneItem.find('.milestone-counter h1').text($Val);
                                    }
                                });

                                $('#MilestonefontIconCollection').html($('ul#fontIconCollection').html());

                                $('.iconChooser').off('click').on('click', function () {
                                    $this = $(this);
                                    $this.parent().parent().next($('.milestoneIconList'));
                                    MileStoneBasic.Position = $('.mileStoneForm .item').index($this.parents('.item'));
                                    $('.milestoneIconList').removeClass('hide-element');
                                    $('#MilestonefontIconCollection').find('li').removeClass('selected');
                                    var CurrentClass = $this.attr('class').match(MileStoneBasic.IconClassReg)[0];
                                    $('#MilestonefontIconCollection').find('li i[data-class="' + CurrentClass + '"]').parent().addClass('selected');

                                });
                                $('.closeIconChooser').off().on('click', function () {

                                    $('.milestoneIconList').addClass('hide-element');
                                });
                                $('#MilestoneSearchIcon').on('keyup', function () {
                                    var searchVal = $(this).val();
                                    $('#MilestonefontIconCollection').find('li').each(function () {
                                        var $this = $(this);
                                        var dataClass = $this.find('i').attr('data-class');
                                        var pos = dataClass.indexOf(searchVal);
                                        if (pos < 0) {
                                            $this.addClass('content-hide');
                                        } else {
                                            $this.removeClass('content-hide');
                                        }
                                    });
                                });
                                $('#MilestonefontIconCollection').find('li').on('click', function () {

                                    var chooseClass = $(this).find('i').attr('data-class');
                                    $('#MilestonefontIconCollection').find('li').removeClass('selected');
                                    $('#MilestonefontIconCollection').find('li i[data-class="' + chooseClass + '"]').parent().addClass('selected');
                                    $FormIcon = $('.mileStoneForm .item').eq(MileStoneBasic.Position).find('i')
                                    var PrevClass = $FormIcon.attr('class').match(MileStoneBasic.IconClassReg)[0];
                                    //console.log(PrevClass);
                                    $FormIcon.removeClass(PrevClass);
                                    $FormIcon.addClass(chooseClass);
                                    $ViewIcon = MileStoneBasic.Container.find('.milestone-item').eq(MileStoneBasic.Position).find('.mile-icon i')
                                    $ViewIcon.removeClass(PrevClass);
                                    $ViewIcon.addClass(chooseClass);
                                    $(".closeIconChooser").trigger("click");
                                });
                            },

                        }

                        function OneTimeEvent() {

                            var container = MileStoneBasic.Container.find('.milestone-item');

                            function sliderSlide(space) {
                                var $parentWidth = container.attr('class').match(/sfCol_[0-9]{1,3}/g);
                                if ($parentWidth !== null) {
                                    container.removeClass($parentWidth[0]).addClass('sfCol_' + space);
                                } else {
                                    container.addClass('sfCol_' + space);
                                }
                            }
                            var itemWidth = container.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            if (itemWidth !== null) {
                                itemWidth = parseInt(itemWidth[0].replace('sfCol_', ''));
                            }
                            AdvanceSageSlider($('#mileStoneItemSlider'), $('#mileStoneItemHandle'), 10, 100, itemWidth, sliderSlide, container, '%');



                        }

                        MileStoneBasic.init();
                        OneTimeEvent();
                    }
                },

                "Background": {
                    "options": ["color"]
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
                        },

                    },

                },
                "Alignment": {
                    "options": ["left", "center", "right"],

                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.milestone').find('.mileStone-wrap');
                        return $parent;
                    },
                },
                "Box Shadow": {
                    "options": {},
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.milestone').find('.mileStone-wrap');
                        return $parent;
                    },


                },

            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parents('.milestone').find('.mileStone-wrap');
                return $parent;
            },
        },
        "remove": function () {

        },
        "view": {
            "view": function () {
                this.library.initAnimatCounter();
            },
            "library": {
                "initAnimatCounter": function () {
                    $('.mileStone-wrap').attr('data-animate', 0)
                    $(window).scroll(function () {
                        animateMileStone();
                    });
                    var winHeight = $(window).height() - 80;

                    function IsInVisibleSection($Component) {
                        var winScroll = $(window).scrollTop();
                        var diff = $Component.offset().top - winScroll;
                        if (0 <= diff && diff < winHeight)
                            return true;
                        else
                            return false;
                    }

                    function animateMileStone() {
                        $('.editor-row .mileStone-wrap').each(function () {
                            if (IsInVisibleSection($(this)) && $(this).attr('data-animate') == 0) {
                                $(this).attr('data-animate', 1);
                                $(this).find('.milestone-counter h1').each(function () {
                                    $(this).prop('Counters', 0).animate({
                                        Counters: $(this).text()
                                    }, {
                                        duration: 4000,
                                        easing: 'swing',
                                        step: function (now) {
                                            $(this).text(Math.ceil(now));
                                        }
                                    });
                                });
                            }
                        });
                    }
                    animateMileStone();
                }
            }
        }
    }
}