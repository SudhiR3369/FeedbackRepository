var icon_text = {
    "icon text": {
        "componentname": "icon text",
        "category": "basic",
        "icon": "icon-text-icon-list",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("icontext"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("orderlistbasic"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent().parent();
                        var dataClass = $parent.find('.ListData').attr('data-class');
                        var showIcon = $parent.find('.ListData').attr('data-showicon');

                        $('#OrderedListColumnType').val(dataClass);
                        $('#showListIcon').prop('checked', showIcon);

                        InitEvent();

                        function InitEvent() {
                            $('#OrderedListColumnType').on('change', function () {
                                var $this = $(this);
                                var colClass = $this.val();

                                var dataClass = $parent.find('.ListData').attr('data-class');
                                $parent.find('.ListData').removeClass(dataClass);
                                $parent.find('.ListData').addClass(colClass);
                                $parent.find('.ListData').attr('data-class', colClass);

                            });

                            $('#showListIcon').on('change', function () {
                                var checked = ($(this).prop('checked'));
                                if (checked === true) {
                                    $parent.find('.labelIcon').show();
                                }
                                else {
                                    $parent.find('.labelIcon').hide();
                                }

                                $('#showListIcon').prop('checked', checked);
                                $parent.find('.ListData').attr('data-showicon', checked);
                            });
                        }
                    }
                },
                //yo thapeko 
                "Alignment": {
                    "options": ["left", "center", "right"],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent(); //.children().not('div').eq(0);
                    },
                },


              
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM("icontextdatawrap"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleClasses = '';
                        var eleIndex = -1;
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            FormEvent();
                        }

                        function LoadSettings() {
                            var html = '';
                            $(".iconTextDataWrapper").html('');

                            //for changing all font
                            html += '<div class="field-row clearfix">';
                            html += '<div class="multi-col-form-group">';
                            html += '<span class="value field-row">';
                            html += '<i class="in-form-icon fa fa-check " id="resetlabelicon"  data-class="fa-check"></i>';
                            html += '<label >Bulk icon change</label>';
                            html += '</span>';
                            html += '</div>';
                            html += '</div>';

                            html += '<div class="iconTextContentWrapper field-row clearfix">';
                            $parent.find(".iconTextWrap").each(function (index, item) {
                                var $labelText = $(this).find('.labelText').text();
                                var className = $(this).find('i').attr('data-class');
                                var iconClass = $(this).find('i').attr('class');
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<i class="in-form-icon ' + iconClass + ' labelIconEdit" data-class="' + className + '"></i>';
                                html += '<input type="text" class="listLabelText required" value="' + $labelText + '" />';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLabel"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            html += '</div>';
                            $(".iconTextDataWrapper").html(html);
                        }

                        function FormEvent() {
                            LabelSettings();
                            FontIcon();
                            SearchFontIcon();
                            $('#resetlabelicon').on('click', function () {
                                $('.data-row').find('.hideLabelIcon').trigger('click');
                                var fontHtml = '';
                                fontHtml += '<div class="LinkLabelResetIconList" style="display: none;">';
                                fontHtml += EasyLibrary.ReadDOM("linklabelionresetlist");
                                fontHtml += '</div>';
                                if ($(this).parent().find('.LinkLabelResetIconList').length == 0)
                                    $(this).parent().append(fontHtml);

                                FontResetIcon();
                                ResetFontIcon();

                                $(this).parent().find(".LinkLabelResetIconList").show();
                                $('#fontResetIconCollection').find('li').removeClass('selected');
                                $('#fontResetIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');


                            });

                            $("#btnAddMoreLabel").off().on("click", function () {
                                $(".hideLabelIcon").trigger("click");
                                var html = '';
                                var $editHtml = '';
                                var $editParent = $(this).parent().find('.iconTextDataWrapper');

                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var attrClass = $editParent.find('.data-row').eq(0).attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += $editParent.find('.data-row').eq(0).html();
                                    $editHtml += '</div>';
                                    $editParent.find('.iconTextContentWrapper').append($editHtml);

                                    var $viewHtml = '';
                                    $viewHtml += '<li class="iconTextWrap editor-com-outerSpacing-bottom-10">';
                                    $viewHtml += $parent.find('.iconTextWrap').eq(0).html();
                                    $viewHtml += '</li>';
                                    $parent.find('.ListData').append($viewHtml);
                                } else {
                                    var iconClass = 'fa fa-check';
                                    var dataClass = 'fa-check';
                                    var defaultText = 'your text here';
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<i class="in-form-icon ' + iconClass + ' labelIconEdit" data-class="' + dataClass + '"></i>';
                                    html += '<input type="text" class="listLabelText required" value="' + defaultText + '" />';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLabel"></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.find('.iconTextContentWrapper').append(html);

                                    var comHtml = '';
                                    comHtml += '<li class="iconTextWrap editor-com-outerSpacing-bottom-10">';
                                    comHtml += ' <i class="fa onhovercolor labelIcon ' + iconClass + '" style="font-size: 24px; color: rgb(95, 96, 106);" data-class="' + dataClass + '"></i>';
                                    comHtml += ' <label class="labelText" contenteditable="true">' + defaultText + '</label>';
                                    comHtml += '</li>';
                                    $parent.find('.ListData').append(comHtml);
                                }
                                LabelSettings();
                                SettingEvents();
                            });
                        }

                        function FontIcon() {
                            $('#labelfontIconCollection').html(EasyLibrary.FontCollectionList());
                        }

                        function LabelSettings() {
                            $(".deleteLabel").off().on("click", function () {
                                var dataClass = $(this).parent().find('.iconTextWrap').attr('data-class');
                                var index = $('.iconTextContentWrapper').find('.field-row').index($(this).parent().parent().parent());
                                $parent.find('.iconTextWrap').eq(index).remove();
                                $(this).parent().parent().parent().remove();
                            });

                            $(".listLabelText").off().on("blur", function () {
                                var value = $(this).val().trim();
                                var $iconParent = $(this).parent().parent().parent().parent();
                                var index = $iconParent.find('.listLabelText').index($(this));
                                var $comEle = $parent.find('.labelText').eq(index);
                                $comEle.text(value);
                            });

                            $(".labelIconEdit").off().on("click", function () {
                                $('.field-row').find('.hideLabelIcon').trigger('click');

                                var $iconParent = $(this).parent().parent().parent().parent();
                                eleIndex = $iconParent.find('.labelIcon').index($(this));
                                eleClasses = $(this).attr('data-class');

                                if ($(this).parent().find(".LinkLabelIconList").length == 0) {

                                    var fontHtml = '';

                                    fontHtml += '<div class="LinkLabelIconList" style="display: none;">';
                                    fontHtml += EasyLibrary.ReadDOM("linklabelionlist");
                                    fontHtml += '</div>';
                                    $(this).parent().append(fontHtml);

                                }
                                $(this).parent().find(".LinkLabelIconList").show();
                                $('#labelfontIconCollection').find('li').removeClass('selected');
                                $('#labelfontIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');
                                FontIcon();
                                SearchFontIcon();
                            });


                        }

                        function FontResetIcon() {
                            $('#fontResetIconCollection').html(EasyLibrary.FontCollectionList());
                            ResetFontIcon();
                        }

                        function ResetFontIcon() {
                            $('#iconLabelResetSearch').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#fontResetIconCollection').find('li').each(function () {
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
                            $('#fontResetIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');

                                var $bulkIcon = $('.iconTextDataWrapper').find('#resetlabelicon');
                                var dataClass = $bulkIcon.attr('data-class');
                                $bulkIcon.attr('data-class', chooseClass);
                                $bulkIcon.removeClass(dataClass);
                                $bulkIcon.addClass(chooseClass);

                                //var viewIcon = $parent.find('.labelIcon');
                                $parent.find('.ListData').find(".labelIcon").each(function (index, item) {
                                    var dataClass = $(this).attr('data-class');
                                    $(this).attr('data-class', chooseClass);
                                    $(this).removeClass(dataClass);
                                    $(this).addClass(chooseClass);
                                });

                                $('.iconTextDataWrapper .field-row').find('.labelIconEdit').each(function (index, item) {
                                    var dataClass = $(this).attr('data-class');
                                    $(this).attr('data-class', chooseClass);
                                    $(this).removeClass(dataClass);
                                    $(this).addClass(chooseClass);
                                });



                                $('#fontResetIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideLabelIcon").trigger("click");
                            });

                            $(".hideLabelIcon").on("click", function () {
                                $(this).parent().hide();
                            });
                        }

                        function SearchFontIcon() {
                            $('#iconLabelSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#labelfontIconCollection').find('li').each(function () {
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
                            $('#labelfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                var $achorIcon = $parent.find('.labelIcon').eq(eleIndex);
                                var dataClass = $achorIcon.attr('data-class');;
                                var $editIcon = $('.iconTextDataWrapper .data-row').eq(eleIndex).find('.labelIcon');
                                //$editIcon.attr('data-class', chooseClass);
                                $editIcon.removeClass(dataClass);
                                $editIcon.addClass(chooseClass);
                                $achorIcon.attr('data-class', chooseClass);
                                $achorIcon.removeClass(dataClass);
                                $achorIcon.addClass(chooseClass);
                                $('#labelfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideLabelIcon").trigger("click");
                            });

                            $(".hideLabelIcon").on("click", function () {
                                $(this).parent().hide();
                            });
                        }
                    }
                },

                "List-Icon": {
                    "DOM": EasyLibrary.ReadDOM("listfonttab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.labelIcon').eq(0).css('color');
                        var fontWidth = $parent.find('.labelIcon').eq(0).css('font-size').replace('px', '');
                        $('#chooseFontColorForListIcon').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.labelIcon').css('color', objColor.bgColor);
                            }
                        });
                        $('#chooseFontColorForListIcon').colorPicker(colorPickerOption);

                        function ListIconSizeSlider(space) {
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#listfontsizeSlider'), $('#listfontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');
                    }
                },

                "List-Label": {
                    "DOM": EasyLibrary.ReadDOM("txtbasictab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    },

                },

                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": 0,
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
                        return $elem.parent().parent().parent().find('li');
                    }
                }

            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent().parent();
            },
        }
    }
}
