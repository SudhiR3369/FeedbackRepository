var skill_bar = {
    "skill bar": {
        "componentname": "skill bar",
        "category": "advance",
        "icon": "icon-skill-bar",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": false,
        "defaultdata": EasyLibrary.ReadDOM('skillbar/skillbarviewdom'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            //if (dropped) {
            if ($(document).find('#hdnSkillSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnSkillSettingAttr"></div>');

            $barElement = $appendLayer.find('.bar-element');
            $barElement.each(function () {
                $this = $(this);
                $skill = $this.data('skill');
                $this.next().text($skill + " %");
                $this.animate({
                    'width': $skill + '%'
                }, 3000, function () {

                });
            });
            //}
        },
        "onsort": function (ui) {

        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarbasicsetting'),
                    "onload": function ($item) {
                        var SkillBar = {
                            settingButton: $item,
                            SkillContainer: $item.parent().parent(),
                            init: function () {
                                var attr = $('#hdnSkillSettingAttr').data('attribute');
                                if (attr != '') {
                                    $('#popupModel').attrs(attr);
                                    $('#hdnSkillSettingAttr').data('attribute', '');
                                }
                                var SkillItem = SkillBar.SkillContainer.find('.skill-ltem');
                                var html = '';
                                var count = SkillItem.length;
                                SkillItem.each(function () {
                                    $this = $(this);
                                    $field = $this.children('.bar-label').find('p').text();
                                    $skill = $this.find('.bar-element').attr('data-skill');
                                    $barColor = $this.find('.bar-element').css('background-color');
                                    html += '<div class="field-row clearfix item"><div class="multi-col-form-group"><span class="value">';
                                    html += '<span class="color-picker-holder skillColors" style="background-color:' + $barColor + '"></span>';
                                    html += '<input type="text"  value="' + $field + '"  class="skillInput skLabel" aria-invalid="false">';
                                    html += '<input type="text"  data-class="skData" value="' + $skill + '" class="skillInput skData xsml-box" aria-invalid="false">'
                                    if (count > 1)
                                        html += '<i class="in-form-icon fa fa-trash delete-icon deleteBar" aria-hidden="true"></i>';
                                    html += '</span></div></div>';
                                });
                                $('.skillsList').html(html);
                                SkillBar.SkillDynamicEvents();
                            },
                            SkillDynamicEvents: function () {

                                $('.addSkill').off().on('click', function () {
                                    $BarItem = SkillBar.SkillContainer.find('.skill-ltem').last();
                                    var NewDom = document.createElement("div");
                                    $(NewDom).attrs($BarItem.attrs());
                                    $(NewDom).html($BarItem.html());
                                    $BarContainer = SkillBar.SkillContainer.find('.skillBar-wrap');
                                    $BarContainer.append(NewDom);
                                    $(NewDom).find('.bar-element').width('0');
                                    SkillBar.animateBar($(NewDom).find('.bar-element'));
                                    $('#hdnSkillSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SkillBar.settingButton.trigger('click');
                                });
                                $('.deleteBar').off().on('click', function () {
                                    $this = $(this);
                                    SageConfirmDialog('Are you sure?').done(function () {
                                        $pos = $('.skillsList .item').index($this.parents('.item'))
                                        SkillBar.SkillContainer.find('.skill-ltem').eq($pos).remove();
                                        SkillBar.init();

                                    });
                                });
                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        $pos = $('.skillsList .item').index($elm.parents('.item'));
                                        var SkItem = SkillBar.SkillContainer.find('.skill-ltem').eq($pos);
                                        $barItem = SkItem.find('.bar-element');
                                        $barItem.css('background-color', objColor.bgColor);
                                    }
                                });
                                $('.skillColors').colorPicker(colorPickerOption);
                                $('.skillInput').off().on('keyup', function () {
                                    $this = $(this);
                                    $Val = $this.val();

                                    $pos = $('.skillsList .item').index($this.parents('.item'))
                                    var SkItem = SkillBar.SkillContainer.find('.skill-ltem').eq($pos);
                                    if ($this.hasClass('skLabel')) {
                                        SkItem.find('p').text($Val);
                                    }
                                    if ($this.hasClass('skData')) {
                                        if ($Val == '')
                                            $Val = 0;
                                        if ($Val >= 0 && $Val <= 100) {
                                            $('#SkillErrorMessage').hide();
                                            $barItem = SkItem.find('.bar-element');
                                            $barItem.attr('data-skill', $Val);
                                            $barItem.width(0);
                                            SkillBar.animateBar($barItem);
                                        } else {
                                            $('#SkillErrorMessage').show();
                                            $('#SkillErrorMessage').text('Enter Number 0-100 Only');
                                        }
                                    }

                                });
                            },
                            animateBar: function ($barItem) {
                                $skill = $barItem.attr('data-skill');
                                $barItem.next().text($skill + " %");
                                $barItem.animate({
                                    'width': $skill + '%'
                                });
                            },
                            oneTimeEvent: function () {
                                var $barEle = SkillBar.SkillContainer.find('.bar-progress');

                                function BarLabelSpace(space) {
                                    $barEle.height(space + 'px');
                                }
                                var Barheight = $barEle.first().height();
                                AdvanceSageSlider($('#barHeightSlider'), $('#barHeightHandle'), 0, 50, Barheight, BarLabelSpace, $barEle, 'px');
                            }
                        }

                        SkillBar.oneTimeEvent();
                        SkillBar.init();
                    }
                },
                "Bar Label": {
                    "DOM": EasyLibrary.ReadDOM('txtBasicTab'),
                    "onload": function ($this) {
                        var $BarLabel = $this.parent().parent().find('.bar-label');
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $BarLabel.addClass('activeSetting');
                        var $textChange = $BarLabel.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $BarLabel.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $BarLabel.attr('data-childCollection'));
                            $BarLabel = $('.' + $BarLabel.attr('data-parCollection'));
                        }
                        TextSetting($BarLabel, $textChange);


                    }
                },
                "Bar Percent": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarpercentsetting'),
                    "onload": function ($this) {
                        var $barpercent = $this.parent().parent().find('.bar-progress span');

                        function BarPercentFont(space) {
                            $barpercent.css('font-size', space + 'px');
                        }
                        var PerFontSize = $barpercent.first().css('font-size').replace('px', '');


                        AdvanceSageSlider($('#barPercentSlider'), $('#barPercentHandle'), 0, 50, PerFontSize, BarPercentFont, $barpercent, 'px');

                        $('.barPercentColor').css('background-color', $barpercent.first().css('color'));
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $barpercent.css('color', objColor.bgColor);
                            }
                        });
                        $('.barPercentColor').colorPicker(colorPickerOption);


                    }
                },
                "Background ": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarbackgroundsetting'),
                    "onload": function ($item) {
                        $parent = $item.parent().parent();

                        function loadColorPicker($parent) {
                            $('#barlabelColorPic').css('background-color', $parent.find('.bar-label').css('background-color'));
                            var colorPickerOption1 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.bar-label').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#barlabelColorPic').colorPicker(colorPickerOption1);
                            $('#barItemColorPic').css('background-color', $parent.find('.bar-progress').css('background-color'));
                            var colorPickerOption2 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.bar-progress').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#barItemColorPic').colorPicker(colorPickerOption2);
                        }
                        loadColorPicker($parent);
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["top", "bottom"]
                        },
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.skill-ltem');
                        return $parent;
                    },

                },
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.skillBar-wrap');
                        return $parent;
                    },
                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.bar-progress');
                        return $parent;
                    },
                },
                "Box Shadow": {
                    "options": {},
                    "selectLayer": function ($elem) {
                        var $parent = $elem.parents('.skillbar').find('.bar-progress');
                        return $parent;
                    },
                },

            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parents().parent().find('.skillBar-wrap');
                return $parent;
            },
        },
        "remove": function ($view) {
            $view.find('.bar-label p').attr('contenteditable', false);
            $view.find('.bar-element').width('0')
        },
        "view": {
            "view": function () {
                this.library.initAnimation();
            },
            "library": {
                "initAnimation": function () {
                    $('.skillBar-wrap').attr('data-animate', 0);
                    $(window).scroll(function () {
                        animateSkillBar();
                    });
                    var winHeight = $(window).height() - 80;

                    function IsInVisibleSection($SkillComponent) {
                        var winScroll = $(window).scrollTop();
                        $SkillComPos = $SkillComponent.offset().top - winScroll;
                        if (0 <= $SkillComPos && $SkillComPos < winHeight)
                            return true;
                        else
                            return false;
                    }

                    function animateSkillBar() {
                        $('.skillBar-wrap').each(function () {
                            $SkillWrap = $(this);
                            if ($SkillWrap.attr('data-animate') == 0 && IsInVisibleSection($SkillWrap)) {
                                $SkillWrap.attr('data-animate', 1);
                                $barElement = $SkillWrap.find('.bar-element');
                                $barElement.each(function () {
                                    $this = $(this);
                                    $skill = $this.data('skill');
                                    $this.next().text($skill + " %");
                                    $this.animate({
                                        'width': $skill + '%'
                                    }, 3000);
                                })
                            }
                        });

                    }
                    animateSkillBar();
                }
            }
        }
    }
}
