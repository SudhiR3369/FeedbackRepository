var social_link = {
    "social link": {
        "componentname": "social link",
        "category": "advance",
        "icon": "icon icon-socialshare",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("sociallinkcom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendLayer) {

        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sociallinkbasic"),
                    "onload": function ($item) {
                        var $ele = '';
                        var $parent = $item.parent().parent();
                        var eleClasses = '';
                        var eleIndex = -1;
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                            FontIcon();
                            SearchFontIcon();
                        }

                        function LoadSettings() {
                            var html = '';
                            $(".sociallinkWrapper").html('');
                            $parent.find(".socialAchor").each(function (index, item) {
                                var className = $(this).attr('data-class');
                                var href = $(this).attr('href');
                                var iconClass = $(this).find('i').attr('class');
                                html += '<div class="field-row clearfix">';
                                html += '<span class="value">';
                                html += '<div class="socialLinkIcon" data-class="' + className + '">';
                                html += '<i class="' + iconClass + '"></i>';
                                html += '</div>';
                                html += '<input type="text" class="sociallinkHrefText" value="' + href + '" />';
                                html += '<i title="delete" class="icon-icon-delete deleteSocialLink"></i>';
                                html += '</span>';
                                html += '</div>';
                            });
                            $(".sociallinkWrapper").html(html);
                            FormEvent();
                        }

                        function FormEvent() {
                            $(".deleteSocialLink").off().on("click", function () {
                                var dataClass = $(this).parent().find('.socialLinkIcon').attr('data-class');
                                var index = $('.sociallinkWrapper .field-row').index($(this).parent().parent());
                                $parent.find(".socialLink").children().eq(index).remove();
                                $(this).parent().parent().remove();
                            });
                            $(".socialLinkIcon").off().on("click", function () {
                                eleIndex = $('.sociallinkWrapper .field-row').index($(this).parent().parent());
                                eleClasses = $(this).attr('data-class');
                                $(this).parent().append($('.tabcontent').find(".socialLinkIconList"));
                                $(".socialLinkIconList").show();
                                $('#socialfontIconCollection').find('li').removeClass('selected');
                                $('#socialfontIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');
                            });
                            $(".sociallinkHrefText").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value == "") {
                                    value = "#";
                                }
                                var dataClass = $(this).parent().find('.socialLinkIcon').attr('data-class');
                                var $comEle = $parent.find('.socialAchor[data-class="' + dataClass + '"]');
                                $comEle.attr("href", value);
                            });
                        }

                        function Events() {
                            $("#btnAddMore").on("click", function () {
                                $(".hideSocialIcon").trigger("click");
                                var html = '';
                                var iconClass = 'fa fa-navicon';
                                var dataClass = 'fa-navicon';
                                html += '<div class="field-row clearfix">';
                                html += '<span class="value">';
                                html += '<div class="socialLinkIcon"  data-class="' + dataClass + '">';
                                html += '<i class="' + iconClass + '" style="color: rgb(255, 255, 255);"></i>';
                                html += '</div>';
                                html += '<input type="text" class="sociallinkHrefText" value="#" />';
                                html += '<i title="delete" class="icon-icon-delete deleteSocialLink"></i>';
                                html += '</span>';
                                html += '</div>';
                                $(this).parent().find(".sociallinkWrapper").append(html);

                                var comHtml = '';
                                comHtml += '<div class="editor-component button sfCol_49 editor-text-transform-uppercase editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-5 editor-com-innerSpacing-bottom-5 editor-com-innerSpacing-left-5 editor-com-outerSpacing-right-10" style="border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(73, 73, 73); border-radius: 54px; height: 35px; width: 35px;" data-backgroundimage="" data-backgroundcolor="color" href="javascript:void(0);">';
                                comHtml += '<div class="carrier-open-option">';
                                comHtml += ' <i title="drag" class="icon-icon-drag sortComponent"></i>';
                                comHtml += 'button<i class="fa fa-bars"></i>';
                                comHtml += '</div>';
                                comHtml += '<div class=" carries-options button-options hide-element">';
                                comHtml += '<i title="button settings" class="row-setting com-settings" data-type="button">Setting</i>';
                                comHtml += '<i title="delete" class="deletehelper">Delete</i>';
                                comHtml += '</div>';
                                comHtml += '<a class="com-button socialAchor" data-class="' + dataClass + '" style="color: rgb(255, 255, 255); font-size: 12px;" href="#">';
                                comHtml += '<i class="' + iconClass + '" style="color: rgb(255, 255, 255);"></i>';
                                comHtml += '</a>';
                                comHtml += '</div>';
                                $parent.find(".socialLink").append(comHtml);
                                FormEvent();
                                SettingEvents();
                            });
                            $(".hideSocialIcon").on("click", function () {
                                $(this).parent().hide();
                            });
                        }

                        function FontIcon() {
                            $('#socialfontIconCollection').html(EasyLibrary.FontCollectionList());
                            SearchFontIcon();
                        }

                        function SearchFontIcon() {
                            $('#socialSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#socialfontIconCollection').find('li').each(function () {
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
                            $('#socialfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                var $achorIcon = $parent.find('.socialAchor').eq(eleIndex);
                                var $editIcon = $('.sociallinkWrapper .field-row').eq(eleIndex).find('.socialLinkIcon');
                                $editIcon.attr('data-class', chooseClass);
                                $editIcon.find("i").eq(0).attr('class', 'fa ' + chooseClass);
                                $achorIcon.attr('data-class', chooseClass);
                                $achorIcon.find("i").attr('class', 'fa ' + chooseClass);
                                $('#socialfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideSocialIcon").trigger("click");
                            });
                        }
                    }
                },
                "Background": {
                    "options": ["color"],
                },
                "Spacing": {
                    "options": {
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
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        }
    }
}
