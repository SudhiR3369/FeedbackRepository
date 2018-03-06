var responsivetable = {
    "responsive table": {
        "componentname": "responsive table",
        "category": "advance",
        "icon": "fa fa-table",
        "row": false,
        "hidden": false,
        "defaultdata": EasyLibrary.ReadDOM("ResponsiveTable/ResponsiveTable"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            var _this = this;
            _this.view.library.hover();
            if (dropped) {
                var $parent = $appendLayer.find('.responsivetablewrap')
                var $table = $parent.find('#tblResponsive');
                var $responsiveRow = $table.find('.responsiveRow');

                $('.responsiveRow').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                    var $this = $(this);
                    //var $thisParent = $this.parent().parent().parent().find('.responsivetablewrap');
                    var $thisParent = $this.parent().parent().parent();//responsivetablewrap

                    if (evt.type == "mouseover") {
                        $this.css('background-color', $thisParent.attr('data-hovercolor'));
                    }
                    else if (evt.type == "mouseout") {
                        $this.css('background-color', $thisParent.attr('data-backgroundrow'));
                    }

                });
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("ResponsiveTable/ResponsiveTableBasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();

                        var rows = '';
                        var cols = '';


                        $('.cell').hover(function () {
                            var $this = $(this);
                            var rowthis = '';
                            var colthis = '';
                            $('.cell').css({ background: '#fff' });

                            for (var j = 0; j <= parseInt($this.parent('.row').index()) ; j++) {
                                for (var i = 0; i <= parseInt($this.index()) ; i++) {
                                    $this.parent().parent().find('.row').eq(j).find('.cell').eq(i).css({ background: 'green' });
                                }
                            }
                            $('#noOfRow').text(parseInt($this.parent('.row').index()) + 1);
                            $('#noOfColumns').text(parseInt($this.index()) + 1);
                            rowthis = parseInt($this.parent('.row').index()) + 1;
                            colthis = parseInt($this.index()) + 1;

                            //TableCreate();
                        });
                        $('#tblGraph').on('click', function () {
                            //$('#tblGraph').unbind('hover');                            
                            $('#tblGraph').css({ 'pointer-events': 'none' });
                            rows = $('#noOfRow').text();
                            cols = $('#noOfColumns').text();
                            function closediaglog() {
                                $('#tblGraph').css({ 'pointer-events': 'visible' });
                            }
                            SageConfirmDialog('Do you want to continue with selected table?', 'confirmation', closediaglog).done(function () {
                                $('#tblGraph').css({ 'pointer-events': 'visible' });
                                TableCreate();
                            }).fail(function () {
                                $('#tblGraph').css({ 'pointer-events': 'visible' });
                            });

                        });
                        $('#txtRowCount').on('change', function () {
                            var thisRow = $(this);
                            //if(thisRow.val()=='')
                            //{
                            //    SageAlertDialog('Please enter row value.', 'Alert');
                            //    thisRow.val('');
                            //}
                            if (thisRow.val() < 0) {
                                SageAlertDialog('Please enter valid row.', 'Alert');
                                thisRow.val('');
                                return;
                            }
                        });
                        $('#txtColumnCount').on('change', function () {
                            var thisCol = $(this);
                            //if (thisCol.val() == '') {
                            //    SageAlertDialog('Please enter column value.', 'Alert');
                            //    thisCol.val('');
                            //}
                            if (thisCol.val() < 0) {
                                SageAlertDialog('Please enter valid column.', 'Alert');
                                thisCol.val('');
                                return;
                            }
                        });
                        $("input").keypress(function (e) {
                            var $this = $(this);
                            //if the letter is not digit then display error and don't type anything
                            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                                //display error message

                                SageAlertDialog('Numbers Only', 'Alert');
                                // $("#errmsg").html("Numbers Only").show().fadeOut("slow");
                                return false;
                            }
                        });
                        //$("#txtColumnCount").keypress(function (e) {
                        //    //if the letter is not digit then display error and don't type anything
                        //    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                        //        //display error message

                        //        SageAlertDialog('Numbers Only', 'Alert');
                        //        // $("#errmsg").html("Numbers Only").show().fadeOut("slow");
                        //        return false;
                        //    }
                        //});
                        $('#btnTableBuild').off().on('click', function () {
                            var $rowval = $('#txtRowCount').val();
                            var $colval = $('#txtColumnCount').val();
                            if ($rowval == '' && $colval == '') {
                                SageAlertDialog('Please enter row and column value.', 'Alert');
                                return;
                            }
                            if ($rowval == '') {
                                SageAlertDialog('Please enter row', 'Alert');
                                return;
                            }
                            if ($colval == '') {
                                SageAlertDialog('Please enter column', 'Alert');
                                return;
                            }

                            if ($rowval > 20 || $colval > 20) {
                                SageAlertDialog('The max number of rows and columns you can create is 20 ', 'Alert');
                                return;
                            }
                            else {
                                TableCreate();
                                SageAlertDialog($rowval + ' X ' + $colval + ' Table has been created.', 'Alert');;
                            }

                            $("#txtRowCount").val('');
                            $("#txtColumnCount").val('');
                            $('#divResponsiveTable').show();
                            $('#divRespTblGraph').hide();
                        });
                        function TableCreate() {
                            var $table = $parent.find("#tblResponsive");
                            if ($("#txtRowCount").val() != '') {
                                rows = new Number($("#txtRowCount").val());
                            }
                            if ($("#txtColumnCount").val() != '') {
                                cols = new Number($("#txtColumnCount").val());
                            }
                            var LoadHeaderName = "Header";

                            $table.empty();
                            var i;
                            for (i = 1; i <= rows; i++) {
                                var row = '';
                                if (i === 1) {
                                    var div = '';

                                    row = $('<tr></tr>').appendTo($table);
                                    for (var j = 1; j <= cols; j++) {
                                        //$('<th></th>').text(LoadHeaderName + j).attr({ class: ["responsivetableheader"] }).appendTo(row);

                                        div += '<th style="background-color: rgba(204, 204, 204, 0.773); color: rgba(0, 0, 0, 0.58); padding:0px;"  class="responsivetableheader">';
                                        div += '<div class="editor-component clearfix editor-col sfCol_100 holder editor-com-innerSpacing-top-0 editor-com-innerSpacing-right-0 editor-com-innerSpacing-bottom-0 editor-com-innerSpacing-left-0 ui-sortable ui-droppable activeComponent" style="padding:10px;">';
                                        div += '<div class="carrier-open-option no-drag">Holder<i class="tooglesettings fa fa-bars"></i></div>';
                                        div += '<div class="hide-element  carries-options holder-options"><i class="com-settings" title="Holder settings" data-type="holder">Settings</i><i class="deletehelper" title="delete">Delete</i></div>';
                                        div += '<div class="editor-col ui-state-default sfFixed sfCol_100 ui-sortable ui-droppable">';
                                        div += '<div class="editor-component paragraph sfCol_100 text-align-center">';
                                        div += '<div class="carrier-open-option">';
                                        div += '<i class="icon-icon-drag sortComponent" title="drag"></i>';
                                        div += 'Text<i class="tooglesettings fa fa-bars"></i>';
                                        div += '</div>';
                                        div += '<div class="hide-element  carries-options text-options">';
                                        div += '<i class="com-settings" title="Text settings" data-type="text">Settings</i>';
                                        div += '<i class="deletehelper" title="delete">Delete</i>';
                                        div += '</div>';
                                        div += '<p style="font-size: 14px;" class="editor-para editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0 ff-montserrat f-weight-400 " contenteditable="true">' + LoadHeaderName + j + '</p>';
                                        div += '</div></div></div></div></div></th>';
                                    }

                                    row.append(div);
                                    SettingEvents();
                                }
                                else {
                                    var div = '';
                                    row = $('<tr></tr>').attr({ class: ["responsiveRow"].join(' '), style: ["background-color: rgba(204, 204, 204, 0.26); color: rgba(0, 0, 0, 0.537)"].join(' ') }).appendTo($table);
                                    for (var j = 1; j <= cols; j++) {
                                        div += '<td class="responsivecolumn" style="padding:0px;">';
                                        div += '<div class="editor-component clearfix editor-col sfCol_100 holder editor-com-innerSpacing-top-0 editor-com-innerSpacing-right-0 editor-com-innerSpacing-bottom-0 editor-com-innerSpacing-left-0 ui-sortable ui-droppable activeComponent" style="padding:10px;">';
                                        div += '<div class="carrier-open-option no-drag">Holder<i class="tooglesettings fa fa-bars"></i></div>';
                                        div += '<div class="hide-element  carries-options holder-options"><i class="com-settings" title="Holder settings" data-type="holder">Settings</i><i class="deletehelper" title="delete">Delete</i></div>';
                                        div += '<div class="editor-col ui-state-default sfFixed sfCol_100 ui-sortable ui-droppable">';
                                        div += '<div class="editor-component paragraph sfCol_100 text-align-center">';
                                        div += '<div class="carrier-open-option">';
                                        div += '<i class="icon-icon-drag sortComponent" title="drag"></i>';
                                        div += 'Text<i class="tooglesettings fa fa-bars"></i>';
                                        div += '</div>';
                                        div += '<div class="hide-element  carries-options text-options">';
                                        div += '<i class="com-settings" title="Text settings" data-type="text">Settings</i>';
                                        div += '<i class="deletehelper" title="delete">Delete</i>';
                                        div += '</div>';
                                        div += '<p style="font-size: 14px;" class="editor-para editor-com-outerSpacing-top-0 editor-com-outerSpacing-bottom-0 ff-montserrat f-weight-400 editor-text-transform-lowercase" contenteditable="true">Column' + j + '</p>';
                                        div += '</div></div></div></div></div></td>';
                                    }
                                    row.append(div);
                                    SettingEvents();
                                }
                            }
                            var $table = $parent.find("#tblResponsive");
                            thead();

                            function thead() {
                                // This gets the first <tr> within the table, and remembers it here.
                                var $headRow = $('tr', $table).first();
                                $headRow.remove();

                                if (!$table.has('tbody')) {
                                    var $otherRows = $('tr', $table);
                                    $otherRows.remove();

                                    var $tbody = $('<tbody>');
                                    $table.append($tbody);
                                    $tbody.append($otherRows);
                                }

                                var $thead = $('<thead>');
                                var $lastupdate = $table.prepend($thead);
                                $thead.append($headRow);
                            }
                            SettingEvents();

                            $('.responsiveRow').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                                var $this = $(this);
                                var $thisParent = $this.parents().find('.responsivetablewrap');
                                if (evt.type == "mouseover") {
                                    $this.css('background-color', $thisParent.attr('data-hovercolor'));
                                }
                                else if (evt.type == "mouseout") {
                                    $this.css('background-color', $thisParent.attr('data-backgroundrow'));
                                }
                            });
                            SettingEvents();
                        }

                        $('#btnTblDesignMore').on('click', function () {
                            $('#divResponsiveTable').show();
                            $('#divRespTblGraph').hide();

                        });

                        //$('.responsiveRow').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                        //    var $this = $(this);
                        //    var $thisParent = $this.parents().find('.responsivetablewrap');
                        //    if (evt.type == "mouseover") {
                        //        $this.css('background-color', $thisParent.attr('data-hovercolor'));
                        //    }
                        //    else if (evt.type == "mouseout") {
                        //        $this.css('background-color', $thisParent.attr('data-backgroundrow'));
                        //    }
                        //});
                        //SettingEvents();
                    }
                },
                "Colors":
                    {
                        "DOM": EasyLibrary.ReadDOM('ResponsiveTable/ResponsiveTableColorSetting'),
                        "onload": function ($item) {
                            var $parent = $item.parent().parent().find('.responsivetablewrap');
                            initEvent();
                            function initEvent() {
                                $('.ResposiveTableColorPicker.resTblBg').css('background-color', $parent.attr('data-backgroundrow'));
                                $('.ResposiveTableColorPicker.resTblHBg').css('background-color', $parent.attr('data-backgroundheader'));
                                $('.ResposiveTableColorPicker.resTblHoverColor').css('background-color', $parent.attr('data-hovercolor'));

                                $('.ResposiveTableColorPicker.resTblTextColor').css('background-color', $parent.attr('data-backgroundrowText'));
                                $('.ResposiveTableColorPicker.resTblHeaderText').css('background-color', $parent.attr('data-backgroundheaderText'));

                                UIEvents();
                            }
                            function UIEvents() {
                                var objColor = '';
                                var colorRespTblOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        objColor = RenderCallBackColor(this);
                                        if ($elm.hasClass('resTblBg')) {
                                            $parent.attr('data-backgroundrow', objColor.bgColor);
                                            $parent.find('.responsiveRow').css('background-color', objColor.bgColor);
                                        }
                                        else if ($elm.hasClass('resTblTextColor')) {
                                            $parent.attr('data-backgroundrowText', objColor.bgColor);
                                            $parent.find('.responsiveRow').css('color', objColor.bgColor);
                                        }
                                        else if ($elm.hasClass('resTblHBg')) {
                                            $parent.attr('data-backgroundheader', objColor.bgColor);
                                            $parent.find('.responsivetableheader').css('background-color', objColor.bgColor);
                                        }
                                        else if ($elm.hasClass('resTblHeaderText')) {
                                            $parent.attr('data-backgroundheaderText', objColor.bgColor);
                                            $parent.find('.responsivetableheader').css('color', objColor.bgColor);
                                        }
                                        else if ($elm.hasClass('resTblHoverColor')) {
                                            $parent.attr('data-hovercolor', objColor.bgColor);
                                        }
                                        //else if ($elm.hasClass('resTblLineColor')) {
                                        //    $parent.find('.responsivetableheader').css('border-bottom', '1px solid ' + objColor.bgColor);
                                        //    $parent.find('.responsivetableheader').css('border-top', '1px solid ' + objColor.bgColor);
                                        //    $parent.find('.responsivecolumn').css('border-bottom', '1px solid ' + objColor.bgColor);

                                        //    $("tr td:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                        //    $("tr th:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                        //    $parent.find('.responsivetableheader').css('border-right', '1px solid ' + objColor.bgColor);
                                        //    $parent.find('.responsivecolumn').css('border-right', '1px solid ' + objColor.bgColor);
                                        //}
                                        //else if ($elm.hasClass('resTblColLineColor')) {
                                        //    $parent.find('.responsivetableheader').css('border-right', '1px solid ' + objColor.bgColor);
                                        //    $parent.find('.responsivetableheader').css('border-left', '1px solid ' + objColor.bgColor);
                                        //    $parent.find('.responsivecolumn').css('border-left', '1px solid ' + objColor.bgColor);
                                        //    $parent.find('.responsivecolumn').css('border-right', '1px solid ' + objColor.bgColor);
                                        //}
                                    }
                                });
                                $('.ResposiveTableColorPicker').colorPicker(colorRespTblOption);

                                ////Check row visibility
                                //$('#heightResTblRowVisible').off().on('click', function () {
                                //    if ($(this).is(':checked')) {
                                //        if (typeof (objColor.bgColor) == "undefined") {

                                //            $parent.find('.responsivetableheader').css('border-bottom', '1px solid ' + $parent.attr('data-linecolor'));
                                //            $parent.find('.responsivetableheader').css('border-top', '1px solid ' + $parent.attr('data-linecolor'));
                                //            $parent.find('.responsivecolumn').css('border-bottom', '1px solid ' + $parent.attr('data-linecolor')  );
                                //            //$parent.find('.responsivetableheader').css('border-bottom', '1px solid black');
                                //            //$parent.find('.responsivetableheader').css('border-top', '1px solid black');
                                //            //$parent.find('.responsivecolumn').css('border-bottom', '1px solid black');
                                //        }
                                //        else {
                                //            $parent.find('.responsivetableheader').css('border-bottom', '1px solid ' + objColor.bgColor);
                                //            $parent.find('.responsivetableheader').css('border-top', '1px solid ' + objColor.bgColor);
                                //            $parent.find('.responsivecolumn').css('border-bottom', '1px solid ' + objColor.bgColor);
                                //        }

                                //        if ($('#heightResTblColumnVisible').is(':checked')) {
                                //            $('.resTblLineColor').show();
                                //        }
                                //        else {
                                //            $('.resTblLineColor').hide();
                                //        }
                                //    }
                                //    else {
                                //        $parent.find('.responsivetableheader').css('border-bottom', '');
                                //        $parent.find('.responsivetableheader').css('border-top', '');
                                //        $parent.find('.responsivecolumn').css('border-bottom', '');

                                //        if ($('#heightResTblColumnVisible').is(':checked')==true) {
                                //            $('.resTblLineColor').hide();
                                //        }
                                //        //else {
                                //        //    $('.resTblLineColor').hide();
                                //        //}
                                //    }

                                //});

                                ////Check Column visibility
                                //$('#heightResTblColumnVisible').off().on('click', function () {
                                //    if ($(this).is(':checked')) {
                                //        if (typeof (objColor.bgColor) == "undefined") {
                                //            $parent.find('.responsivetableheader').css('border-right', '1px solid ' + $parent.attr('data-linecolor'));
                                //            $("tr td:first-child").css('border-left', '1px solid ' + $parent.attr('data-linecolor'));
                                //            $("tr th:first-child").css('border-left', '1px solid ' + $parent.attr('data-linecolor'));
                                //            //$parent.find('.responsivecolumn').css('border-right', '1px solid ' + $parent.attr('data-linecolor'));
                                //            $(this).parents().find('.responsivetablewrap').find('#tblResponsive').find('.responsivecolumn').css('border-right', '1px solid ' + $parent.attr('data-linecolor'));

                                //        }
                                //        else {
                                //            $parent.find('.responsivetableheader').css('border-right', '1px solid ' + objColor.bgColor);
                                //            $parent.find('.responsivetableheader').css('border-top', '1px solid ' + objColor.bgColor);
                                //            $("tr td:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                //            $("tr th:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                //            $("tr th:first-child").css('border-top', '1px solid ' + objColor.bgColor);
                                //            $parent.find('.responsivecolumn').css('border-right', '1px solid ' + objColor.bgColor);
                                //        }
                                //        if ($('#heightResTblRowVisible').is(':checked')) {
                                //            $('.resTblLineColor').show();
                                //        }
                                //        else {
                                //            $('.resTblLineColor').hide();
                                //        }
                                //    }
                                //    else {
                                //        $parent.find('.responsivetableheader').css('border-right', '');
                                //        $parent.find('.responsivetableheader').css('border-top', '');
                                //        $("tr td:first-child").css('border-left', '');
                                //        $("tr th:first-child").css('border-left', '');
                                //        $("tr th:first-child").css('border-top', '');
                                //        $parent.find('.responsivecolumn').css('border-right', '');

                                //        if ($('#heightResTblRowVisible').is(':checked')==true) {
                                //            $('.resTblLineColor').hide();
                                //        }
                                //        //else {
                                //        //    $('.resTblLineColor').hide();
                                //        //}
                                //    }
                                //});
                            }
                        }
                    },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent();
                            }
                        },
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent().not('div').eq(0);
                            }
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent(); //.children().not('div').eq(0);
                        //return $elem.parent().parent().find('.image');//.not('div').eq(0);
                        //return $elem.parent().parent();//.children().not('div').eq(0);
                    },
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Row-Col": {
                    "DOM": EasyLibrary.ReadDOM("ResponsiveTable/ResponsiveTableLineSetting"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $rowLine = $('#heightResTblRowVisible').is(':checked');
                        var $colLine = $('#heightResTblColumnVisible').is(':checked')
                        initEvent();
                        function initEvent() {
                            $('.ResposiveTableColorPickerLine.resTblLineColor').css('background-color', $parent.find('.responsivetablewrap').attr('data-linecolor'));
                            UIEvents();

                        }
                        if ($rowLine || $colLine) {
                            $('.resTblLineColor').show();
                            //UIEvents();                           
                        }
                        else {
                            $('.resTblLineColor').hide();
                        }

                        LoadSettingsMinWidthSize();
                        var objColor = '';
                        function UIEvents() {
                            //var objColor = '';
                            var colorRespTblOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    objColor = RenderCallBackColor(this);
                                    if ($elm.hasClass('resTblLineColor')) {
                                        $parent.find('.responsivetableheader').css('border-bottom', '1px solid ' + objColor.bgColor);
                                        $parent.find('.responsivetableheader').css('border-top', '1px solid ' + objColor.bgColor);
                                        $parent.find('.responsivecolumn').css('border-bottom', '1px solid ' + objColor.bgColor);

                                        $("tr td:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                        $("tr th:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                        $parent.find('.responsivetableheader').css('border-right', '1px solid ' + objColor.bgColor);
                                        $parent.find('.responsivecolumn').css('border-right', '1px solid ' + objColor.bgColor);
                                    }
                                    else if ($elm.hasClass('resTblColLineColor')) {
                                        $parent.find('.responsivetableheader').css('border-right', '1px solid ' + objColor.bgColor);
                                        $parent.find('.responsivetableheader').css('border-left', '1px solid ' + objColor.bgColor);
                                        $parent.find('.responsivecolumn').css('border-left', '1px solid ' + objColor.bgColor);
                                        $parent.find('.responsivecolumn').css('border-right', '1px solid ' + objColor.bgColor);
                                    }
                                }
                            });
                            $('.ResposiveTableColorPickerLine').colorPicker(colorRespTblOption);


                        }
                        function LoadSettingsMinWidthSize() {
                            var minwidth = parseInt($parent.find('.responsivecolumn').css('min-width'));
                            //var fontWrapperSize = parseInt(parseInt($parent.css('height'))) / 5;
                            function RespTableMinWidthSlider(space) {
                                $parent.find('.responsivecolumn').css('min-width', space);
                            }
                            AdvanceSageSlider($('#ResTblMinWidth'), $('#ResTblMinWidthHandle'), 0, 500, minwidth, RespTableMinWidthSlider, $parent, '');
                        }

                        //Check row visibility
                        $('#heightResTblRowVisible').off().on('click', function () {
                            if ($(this).is(':checked')) {
                                if (typeof (objColor.bgColor) == "undefined") {

                                    $parent.find('.responsivetableheader').css('border-bottom', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));
                                    $parent.find('.responsivetableheader').css('border-top', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));
                                    $parent.find('.responsivecolumn').css('border-bottom', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));
                                    //$parent.find('.responsivetableheader').css('border-bottom', '1px solid black');
                                    //$parent.find('.responsivetableheader').css('border-top', '1px solid black');
                                    //$parent.find('.responsivecolumn').css('border-bottom', '1px solid black');
                                }
                                else {
                                    $parent.find('.responsivetableheader').css('border-bottom', '1px solid ' + objColor.bgColor);
                                    $parent.find('.responsivetableheader').css('border-top', '1px solid ' + objColor.bgColor);
                                    $parent.find('.responsivecolumn').css('border-bottom', '1px solid ' + objColor.bgColor);
                                }
                                $('.resTblLineColor').show();
                                //if ($('#heightResTblColumnVisible').is(':checked')) {
                                //    $('.resTblLineColor').show();
                                //}
                                //else {
                                //    $('.resTblLineColor').hide();
                                //}
                            }
                            else {
                                $parent.find('.responsivetableheader').css('border-bottom', '');
                                $parent.find('.responsivetableheader').css('border-top', '');
                                $parent.find('.responsivecolumn').css('border-bottom', '');
                                $('.resTblLineColor').hide();
                                //if ($('#heightResTblColumnVisible').is(':checked') == true) {
                                //    $('.resTblLineColor').hide();
                                //}

                                //else {
                                //    $('.resTblLineColor').hide();
                                //}
                            }

                        });

                        //Check Column visibility
                        $('#heightResTblColumnVisible').off().on('click', function () {
                            if ($(this).is(':checked')) {
                                if (typeof (objColor.bgColor) == "undefined") {
                                    $parent.find('.responsivetableheader').css('border-right', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));
                                    $parent.find($("tr td:first-child")).css('border-left', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));
                                    $parent.find($("tr th:first-child")).css('border-left', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));
                                    $parent.find('.responsivecolumn').css('border-right', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));
                                    //$(this).parents().find('.responsivetablewrap').find('#tblResponsive').find('.responsivecolumn').css('border-right', '1px solid ' + $parent.find('.responsivetablewrap').attr('data-linecolor'));

                                }
                                else {
                                    $parent.find('.responsivetableheader').css('border-right', '1px solid ' + objColor.bgColor);
                                    $parent.find('.responsivetableheader').css('border-top', '1px solid ' + objColor.bgColor);
                                    $("tr td:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                    $("tr th:first-child").css('border-left', '1px solid ' + objColor.bgColor);
                                    $("tr th:first-child").css('border-top', '1px solid ' + objColor.bgColor);
                                    $parent.find('.responsivecolumn').css('border-right', '1px solid ' + objColor.bgColor);
                                }
                                $('.resTblLineColor').show();
                                //if ($('#heightResTblRowVisible').is(':checked')) {
                                //    $('.resTblLineColor').show();
                                //}
                                //else {
                                //    $('.resTblLineColor').hide();
                                //}
                            }
                            else {
                                $parent.find('.responsivetableheader').css('border-right', '');
                                $parent.find('.responsivetableheader').css('border-top', '');
                                $("tr td:first-child").css('border-left', '');
                                $("tr th:first-child").css('border-left', '');
                                $("tr th:first-child").css('border-top', '');
                                $parent.find('.responsivecolumn').css('border-right', '');
                                $('.resTblLineColor').hide();
                                //if ($('#heightResTblRowVisible').is(':checked') == true) {
                                //    $('.resTblLineColor').hide();
                                //}

                                //else {
                                //    $('.resTblLineColor').hide();
                                //}
                            }
                        });
                    }
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        },
        "removeData": function () {
        },
        "view": {
            "view": function () {
                this.library.hover();
            },
            "library":
                {
                    "hover": function () {
                        $('.responsiveRow').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                            var $this = $(this);
                            $this.addClass('activeTable');
                            var $thisParent = $this.parent().parent().parent();//responsivetablewrap
                            if (evt.type == "mouseover") {
                                $this.css('background-color', $thisParent.attr('data-hovercolor'));
                            }
                            else if (evt.type == "mouseout") {
                                $this.css('background-color', $thisParent.attr('data-backgroundrow'));
                            }

                        });

                    }
                }
        }
    }

}