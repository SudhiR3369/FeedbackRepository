var text_link = {
    "text link": {
        "componentname": "text link",
        "category": "basic",
        "icon": "icon-text-link",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("anchordom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("txtbasictab"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                        $('.editor-component.activeSetting').removeClass('activeSetting');
                        $parent.addClass('activeSetting');
                        var $textChange = $parent.find('.anchorWrapper').find('a'); //.children().not('.carrier-open-option').not('.carries-options');
                        if (typeof $parent.attr('data-childCollection') !== "undefined") {
                            $textChange = $('.' + $parent.attr('data-childCollection'));
                            $parent = $('.' + $parent.attr('data-parCollection'));
                        }
                        TextSetting($parent, $textChange);
                    },
                },

                "Linked To": {
                    "DOM": EasyLibrary.ReadDOM("anchorsetting"),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();

                        BindPages();
                        InitEvent();
                        LoadDefault();

                        function BindPages() {
                            var pageList = EasyLibrary.GetPageArray();
                            var html = '';
                            $.each(pageList, function (index, item) {
                                html += '<option value="';
                                html += "/" + item.name;
                                html += '">';
                                html += item.name;
                                html += '</option>';
                            });
                            $('#ddllinkPages').html(html);
                        }


                        function LoadDefault() {
                            var $anchor = $parent.find('.anchorWrapper').find('a');
                            var dataLinkType = $anchor.attr('data-linktype');
                            if (dataLinkType == 1) {
                                //$('#rbPages').trigger('click');
                                $('#rbPages').prop('checked', 'checked');
                            } else {
                                //$('#rbPages').trigger('click');
                                $('#rbExternal').prop('checked', 'checked');
                            }

                            HandleData(dataLinkType);
                        }

                        function InitEvent() {
                            $('#rbLinkType input:radio').click(function () {
                                var linkType = ($(this).val());
                                HandleData(linkType);
                            });

                            $("#txtAnchorTitle").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value == '')
                                    value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque metus, pellentesque sit amet turpis id, tempor dignissim nunc. Duis id consequat ligula, at semper mauris.';
                                var $anchor = $parent.find('.anchorWrapper').find('a');
                                $anchor.text(value);
                            });

                            $("#txtExternalLink").off().on("blur", function () {
                                var value = $(this).val().trim();
                                if (value == '')
                                    value = '#';
                                var $anchor = $parent.find('.anchorWrapper').find('a');
                                $anchor.attr('href', value);
                            });

                            $('#ddllinkPages').on('change', function () {
                                var value = $(this).val().trim();
                                //alert(value);
                                if (value == '')
                                    value = '#';
                                var $anchor = $parent.find('.anchorWrapper').find('a');
                                $anchor.attr('href', value);
                            });
                        }

                        function HandleData(linkType) {
                            var $anchor = $parent.find('.anchorWrapper').find('a');
                            var dataLink = $anchor.attr('href').trim();
                            var dataLinkType = $anchor.attr('data-linktype');
                            var dataLinkTitle = $anchor.text();
                            $anchor.attr('data-linktype', linkType);
                            $("#txtAnchorTitle").text(dataLinkTitle);
                            //alert(dataLinkType != linkType);

                            //if (dataLinkType != linkType) dataLink = "#";

                            if (linkType == 1) {
                                $('#linkPages').show();
                                $('#linkExternal').hide();

                                if (dataLink == '#')
                                    dataLink = $("#ddllinkPages option").first().val();

                                $('#ddllinkPages').val(dataLink);
                                $anchor.attr('href', dataLink);
                                $anchor.attr('target', '_self');
                                $anchor.addClass('anchorpage');
                            } else {
                                $anchor.removeClass('anchorpage');
                                $('#linkExternal').show();
                                $('#linkPages').hide();
                                $anchor.attr('target', '_blank');
                                if (dataLink == '') {
                                    dataLink = '';
                                }

                                $('#txtExternalLink').val(dataLink);

                                //if (externalLinkType == "_blank")
                                //    $('#rbNewPage').attr('checked', 'checked');
                                //else
                                //    $('#rbSelf').attr('checked', 'checked');

                            }
                        }

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

                "Hover Effect": {
                    "options": {
                        "color": ["text"]
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent().find('.anchorWrapper').find('a');
                    }
                },

                "Scroll Effect": {
                    "options": []
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();

                return $parent;
            },
        }
    }
}
