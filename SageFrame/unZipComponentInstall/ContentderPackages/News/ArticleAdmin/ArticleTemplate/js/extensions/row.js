var row = {
    "row": {
        "componentname": "row",
        "category": "layout",
        "icon": " icon icon-comp-row",
        "row": true,
        "hidden": false,
        "collection": false,
        "beforedrop": function ($appendedParent, $row, dropped) {
            var ColumnDOM = "";
            var col100 = DOMCreate('div', '100', 'sfCol_100 column');
            var col80 = DOMCreate('div', '80', 'sfCol_80 column');
            var col75 = DOMCreate('div', '75', 'sfCol_75 column');
            var col70 = DOMCreate('div', '70', 'sfCol_70 column');
            var col60 = DOMCreate('div', '60', 'sfCol_60 column');
            var col50 = DOMCreate('div', '50', 'sfCol_50 column');
            var col40 = DOMCreate('div', '40', 'sfCol_40 column');
            var col30 = DOMCreate('div', '30', 'sfCol_30 column');
            var col33 = DOMCreate('div', '33', 'sfCol_33 sfFixed column');
            var col25 = DOMCreate('div', '25', 'sfCol_25 column');
            var col20 = DOMCreate('div', '20', 'sfCol_20 column');
            ColumnDOM = '<ul class="selectDataWrapper selectcolumns sfCol_100">';
            ColumnDOM += DOMCreate('li', col100, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col80 + col20, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col75 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col70 + col30, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col60 + col40, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col50 + col50, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col40 + col60, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col30 + col70, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col75, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col80, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col60 + col20, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col50 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col30 + col40 + col30, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col33 + col33 + col33, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col25 + col25 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col20 + col20 + col20 + col20, 'sfCol_20 selectData');
            ColumnDOM += '</ul>';

            if (typeof (dropped) !== "undefined") {
                if (dropped) {
                    var columnNote = "<p class='popupGuideMessage'>You can manage columns later from  <b>Row >> Manage Columns </b>.</p>";
                    ColumnDOM = columnNote + ColumnDOM;
                }
            }
            FullPagePopup({
                data: ColumnDOM,
                heading: "Manage columns",
                showheading: true,
                width: "60%",
            });

            ColEvents();

            function ColEvents() {
                $('.selectData').on('click', function () {
                    var $this = $(this);
                    var $editcontainer = findSelectedLayer($row);
                    var rowColLength = $editcontainer.find('> .colWrapper > .editor-col').length;
                    var choosedCol = $this.find('> .column').length;
                    var width = [];
                    $this.find('> .column').each(function () {
                        width.push($(this).text());
                    });
                    var addedCol = choosedCol - rowColLength;
                    if (addedCol > 0) {
                        var col = '';
                        for (var i = 0; i < addedCol; i++) {
                            var colspacing = 'editor-com-innerSpacing-top-35 editor-com-innerSpacing-right-35 editor-com-innerSpacing-bottom-35 editor-com-innerSpacing-left-35';
                            col += divStart('editor-col ui-state-default text-align-center sfFixed ' + colspacing) + colOption + CompenentCreateDOM + divEnd;
                        }
                        $editcontainer.find('.colWrapper').append(col);
                        //if ($editcontainer.length > 0) {
                        //    $editcontainer.find('.colWrapper').append(col);
                        //} else {
                        //    var $shadedLayer = $row.find('.editor-row-shaded-layer');
                        //    if ($shadedLayer.length > 0) {
                        //        $shadedLayer.find('.colWrapper').append(col);
                        //    } else {
                        //        $row.find('.colWrapper').append(col);
                        //    }
                        //}
                        DraggableSortable();
                        SettingEvents();
                        BindColumnEvents($row);
                        ManageWidth();
                        TriggerView($row);
                    } else if (addedCol < 0) {
                        if (typeof (dropped) !== "undefined" && dropped) {
                            if (dropped) {
                                //no need to because it the drop event and  by defaut there is one column
                                // if basic changes then
                            }
                        } else {
                            SageConfirmDialog('You are going to choose  less column. all your data will be switch to the first column ?').done(function () {
                                RemoveColumn();
                                ManageWidth();
                            });
                        }

                    } else if (addedCol == 0) {
                        ManageWidth();
                    }

                    function ManageWidth() {
                        $row.find('> .colWrapper > .editor-col').each(function (i, v) {
                            var $me = $(this);
                            var $classes = $me.attr('class').match(/sfCol_[0-9]{1,3}/g);
                            if ($classes != null) {
                                $me.removeClass($classes[0]);
                            }
                            $me.addClass('sfCol_' + width[i]);
                        });
                        CloseFullPagePopup();
                    }
                    function RemoveColumn() {
                        var $editcontainer = $row.find('.editor-row-container');
                        var $removeContainer = '';
                        if ($editcontainer.length > 0) {
                            $removeContainer = $editcontainer.find('.colWrapper > .editor-col');
                        } else {
                            var $shadedLayer = $row.find('.editor-row-shaded-layer');
                            if ($shadedLayer.length > 0) {
                                $removeContainer = $shadedLayer.find('.colWrapper > .editor-col');
                            } else {
                                $removeContainer = $row.find('.colWrapper > .editor-col');
                            }
                        }
                        for (var i = rowColLength - 1; i >= choosedCol; i--) {
                            $removeContainer.eq(i).find('.editor-component').each(function () {
                                $removeContainer.eq(0).append($(this));
                                $removeContainer.eq(0).find(".column-data-empty").remove();
                            });
                            $removeContainer.eq(i).remove();
                        }

                        TriggerView($row);
                    }
                });
            }
        },
        'defaultdata': EasyLibrary.ReadDOM("onecolumnrow"),
        "afterdrop": function ($appendLayer) {

        },
        "loadSetting": function ($item) {

        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": rowBasicDOM,
                    "onload": function ($this) {
                        $('.editor-row').removeClass('activeSetting');
                        var $parent = $this.parents('.editor-row');
                        $parent.addClass('activeSetting');
                        LoadSettings();
                        InitEvents();

                        function InitEvents() {
                            $('#showTitle').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var $rowTitle = $(RowHeadingDOM());
                                    $rowTitle.insertAfter(ShadedParent());
                                    $rowTitle.find('h1').addClass('ff-' + $('#basicFonts').val());
                                    $rowTitle.find('h1').addClass('f-weight-400');
                                    $rowTitle.find('p').addClass('ff-' + $('#basicFonts').val());
                                    $rowTitle.find('p').addClass('f-weight-400');
                                    SettingEvents();
                                } else {
                                    $parent.find('.rowTitle').remove();
                                }
                            });
                            $('#adJustHeight').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('adjustheight');
                                    $('#adjustHeaderHolder').show();
                                    var rowHeight = $parent.css('height').replace('px', '');
                                    ChangeSliderValue($('#rowHeightSlider'), rowHeight);
                                } else {
                                    $parent.removeClass('adjustheight');
                                    $parent.css({ 'height': '' });
                                    $('#adjustHeaderHolder').hide();
                                }
                            });
                            var rowHeight = $parent.css('height').replace('px', '');

                            function RowHeight(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#rowHeightSlider'), $('#rowHeightHandle'), 50, 1200, rowHeight, RowHeight, $parent, 'px');
                            $('#askContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var containerDiv = divStart('editor-row-container container-medium') + divEnd;
                                    var appendElem = '';
                                    if ($parent.find('> .editor-row-shaded-layer').length === 0) {
                                        appendElem = $parent.children();
                                        $parent.append(containerDiv);
                                    } else {
                                        appendElem = $parent.find('> .editor-row-shaded-layer').children();
                                        $parent.find('> .editor-row-shaded-layer').append(containerDiv);
                                    }
                                    $parent.find('.editor-row-container').append(appendElem);
                                    $('#selContainerWidth').val('container-medium');
                                    $('#additionalContainer').fadeIn(400);

                                } else {
                                    var appendElem = $parent.find('.editor-row-container').children();
                                    if ($parent.find('> .editor-row-shaded-layer').length === 0) {
                                        $parent.append(appendElem);
                                    } else {
                                        $parent.find('> .editor-row-shaded-layer').append(appendElem);
                                    }
                                    $parent.find('.editor-row-container').remove();
                                    $('#additionalContainer').fadeOut(400);
                                }
                                //CalculateWidth($parent.find('.colWrapper'));
                                TriggerView($parent);
                            });

                            $('#selContainerWidth').off().on('change', function () {
                                var containWidth = $(this).val();
                                var $container = $parent.find('.editor-row-container');
                                $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                                $container.addClass(containWidth);
                                //CalculateWidth($parent.find('.colWrapper'));


                            });
                        }

                        function ShadedParent() {
                            if ($parent.find('> .row-options').length == 0) {
                                if ($parent.find('> div > .row-options').length == 0) {
                                    if ($parent.find('> div > div > .row-options').length == 0) { } else
                                        return $parent.find('> div > div > .row-options');
                                } else
                                    return $parent.find('> div > .row-options');
                            } else
                                return $parent.find('> .row-options');
                        }

                        function LoadSettings() {
                            var $container = $parent.find('div.rowTitle');
                            if ($container.length > 0) {
                                $('#showTitle').prop('checked', true);
                            } else {
                                $('#showTitle').prop('checked', false);
                            }
                            if ($parent.hasClass('adjustheight')) {
                                $('#adJustHeight').prop('checked', true);
                                $('#adjustHeaderHolder').show();
                            } else {
                                $('#adJustHeight').prop('checked', false);
                            }
                            $container = $parent.find('div.editor-row-container');
                            if ($container.length > 0) {
                                $('#askContainer').prop('checked', true);
                                var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                                $('#selContainerWidth').val(conClass);
                                $('#additionalContainer').fadeIn(400);
                            } else {
                                $('#askContainer').prop('checked', false);
                            }
                        }

                        function RowHeadingDOM() {
                            var rowHeadingDOM = '';
                            rowHeadingDOM += divStart('rowTitle sfCol_100');
                            rowHeadingDOM += divStart('editor-component com-heading rowTitleHeading sfCol_100 text-align-center');
                            rowHeadingDOM += DOMCreate('div', ' Row heading<i class="fa fa-bars"></i>', 'carrier-open-option no-drag');
                            rowHeadingDOM += divStart('text-options carries-options');
                            rowHeadingDOM += '<i class="com-settings" data-type="text" title="Heading setting">Settings</i>';
                            rowHeadingDOM += divEnd;
                            rowHeadingDOM += '<h1 style="font-size: 40px;" class="editor-com-outerSpacing-top-0 editor-com-innerSpacing-top-50 editor-com-outerSpacing-bottom-20" contenteditable="true">This is heading </h1>';
                            rowHeadingDOM += divEnd;
                            rowHeadingDOM += divStart('editor-component paragraph rowTitleSummary sfCol_100 text-align-center');
                            rowHeadingDOM += DOMCreate('div', ' Row heading summary<i class="fa fa-bars"></i>', 'carrier-open-option no-drag');
                            rowHeadingDOM += divStart('text-options carries-options');
                            rowHeadingDOM += '<i class= "com-settings" data-type="text" title="Summary setting">Settings</i>';
                            rowHeadingDOM += divEnd;
                            rowHeadingDOM += '<p style="font-size: 14px;" class="editor-para  editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0 editor-com-innerSpacing-bottom-50" contenteditable="true">This is Heading Summary.</p>';
                            rowHeadingDOM += '</div>';
                            rowHeadingDOM += divEnd;
                            return rowHeadingDOM;
                        }
                    }
                },
                "Background": {
                    "options": ["image", "color"]
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
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["top", "bottom"],
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
}
