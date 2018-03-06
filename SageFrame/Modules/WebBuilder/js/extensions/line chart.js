var line_chart = {
    "line chart": {
        "componentname": "line chart",
        "category": "advance",
        "icon": "fa fa-line-chart",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "graph",
        "defaultdata": EasyLibrary.ReadDOM('linechart/linechartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('linechart/linechartbasicsettings'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.lineTitle').css('color');
                        var lineAxesColor = $parent.find('.lineChartWrapper').attr('data-lineaxescolor');
                        var lineColor = $parent.find('.lineChartWrapper').attr('data-linecolor');
                        var lineFontColor = $parent.find('.lineChartWrapper').attr('data-linefontcolor');
                        var lineTitle = $parent.find('.lineTitle').text();
                        var chartScale = $parent.find('.lineChartWrapper').attr('data-scale');


                        $('#ddlLineChartScaling').val(chartScale);
                        $("#txtLineChartTitle").val(lineTitle);


                        $('#chooseLinetitleColor').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineTitle').css('color', objColor.bgColor);
                            }
                        });
                        $('#chooseLinetitleColor').colorPicker(colorPickerOption);


                        $("#txtLineChartTitle").off().on("blur", function () {
                            var value = $(this).val().trim();
                            var $elm = $parent.find('.lineTitle');
                            $elm.text(value);
                        });

                        $('#chooseAxesLineColor').css('background-color', lineAxesColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-lineaxescolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseAxesLineColor').colorPicker(colorPickerOption);

                        $('#chooseLineColor').css('background-color', lineColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-linecolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseLineColor').colorPicker(colorPickerOption);

                        $('#chooseLineFontColor').css('background-color', lineFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-linefontcolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseLineFontColor').colorPicker(colorPickerOption);



                        var fontWidth = $parent.find('.lineChartWrapper').attr('data-linefontsize').replace('px', '');

                        function ListIconSizeSlider(space) {
                            $parent.find('.lineChartWrapper').attr('data-linefontsize', space);
                            component['line chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#linefontsizeSlider'), $('#linefontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');


                        var lineTitlefontWidth = $parent.find('.lineTitle').css('font-size').replace('px', '');

                        function LineTitleSizeSlider(space) {
                            $parent.find('.lineTitle').css('font-size', space);
                        }
                        AdvanceSageSlider($('#linetitlesizeSlider'), $('#linetitlesizeHandle'), 10, 40, lineTitlefontWidth, LineTitleSizeSlider, $parent, 'px');


                        $('#ddlLineChartScaling').on('change', function () {
                            var val = $(this).val();
                            $parent.find('.lineChartWrapper').attr('data-scale', val);
                            component['line chart'].afterdrop($parent.parent(), $parent);

                        });


                    }
                },
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM('linechart/linechartdatawrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleIndex = -1;

                        var $lineChartWrapper = $parent.find('.lineChartWrapper');
                        var lineData = $lineChartWrapper.attr('data-value');

                        var lineDataArray = JSON.parse(lineData);

                        LoadData();
                        InitLineEvents();
                        InitAddMoreLineEvent();

                        function LoadData() {
                            var html = '';
                            $("#lineChartEditWrapper").html('');

                            //for changing all font



                            $.each(lineDataArray, function (index, item) {
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<input type="text" maxlength="15" class="indLineName" value="' + item.name + '"/>';
                                html += '<input type="text" class="sml-box indLineValue" value="' + item.value + '"/>';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#lineChartEditWrapper").html(html);

                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    lineDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.chooseLineFontColor').colorPicker(colorPickerOption);

                        }


                        function InitLineEvents() {

                            $("#lineChartEditWrapper .indLineName").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                lineDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#lineChartEditWrapper .indLineValue").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    lineDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', lineDataArray[dataIndex].value);
                                    $(this).val(lineDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', lineDataArray[dataIndex].value);
                                    $(this).val(lineDataArray[dataIndex].value);
                                } else {
                                    lineDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#lineChartEditWrapper").off().on('click', '.deleteLine', function () {
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                lineDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            });

                        }

                        function InitAddMoreLineEvent() {
                            $("#btnAddMoreLineData").off().on("click", function () {
                                var html = '';
                                var $editParent = $(this).parent().find('#lineChartEditWrapper');



                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = lineDataArray[0];
                                    var itemCount = lineDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="multi-col-form-group">';
                                    $editHtml += '<span class="value">';
                                    $editHtml += '<input maxlength="15" class="indLineName valid" value="' + duplicateData.name + '" aria-invalid="false" type="text">';
                                    $editHtml += '<input class="sml-box indLineValue" value="' + duplicateData.value + '" type="text">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine"></i>';
                                    $editHtml += '</span>';
                                    $editHtml += '</div>';
                                    $editHtml += '</div>';
                                    $editParent.append($editHtml);


                                    var newData = {
                                        "id": itemCount + 1,
                                        "name": duplicateData.name,
                                        "value": duplicateData.value,
                                        "color": duplicateData.color
                                    };

                                    lineDataArray.push(newData);
                                } else {
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<input maxlength="15" class="indLineName valid" value="data 1"  aria-invalid="false" type="text">';
                                    html += '<input class="sml-box indLineValue" value="10" type="text">';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine" ></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.append(html);

                                    var defaultData = {
                                        "id": 1,
                                        "name": "data 1",
                                        "value": 10,
                                        "color": "#A55CA5"
                                    };
                                    lineDataArray.push(defaultData);
                                }

                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                component['line chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        lineDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(lineDataArray);
                                        $lineChartWrapper.attr('data-value', jsonData);
                                        component['line chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.chooseLineFontColor').colorPicker(colorPickerOption);


                                InitLineEvents();
                            });
                        }
                    }
                }
            }
        },
        "onsort": function (ui) {
            this.view.view();
        },
        "view": {
            "view": function () {
                var myCanvasList = document.querySelectorAll(".lineCanvas");
                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;

                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = 350 / parentWidth * parentWidth;
                        myCanvas.width = parentWidth * 0.75;

                        var lineColor = item.parentNode.getAttribute('data-linecolor');
                        var lineaxesColor = item.parentNode.getAttribute('data-lineaxescolor');
                        var lineFontColor = item.parentNode.getAttribute('data-linefontcolor');
                        var lineFontSize = item.parentNode.getAttribute('data-linefontsize');
                        //console.log(barFontSize);
                        var lineChartData = item.parentNode.getAttribute('data-value');
                        var lineData = JSON.parse(lineChartData);
                        var lineScaleFactor = item.parentNode.getAttribute('data-scale');
                        //alert(JSON.stringify(barData));


                        var ctx = myCanvas.getContext("2d");

                        _this.library.LineChart({
                            canvas: myCanvas,
                            seriesName: "Line Chart",
                            padding: 20,
                            gridScale: lineScaleFactor,
                            lineColor: lineColor,
                            lineaxesColor: lineaxesColor,
                            lineFontColor: lineFontColor,
                            data: lineData,
                            lineFontSize: lineFontSize
                        });
                    });
                }
            },
            "library": {
                "DrawLine": function (ctx, startX, startY, endX, endY, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                    ctx.restore();
                },

                "LineChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    var _this = this;
                    this.draw = function () {
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            maxValue = Math.max(maxValue, categ.value);
                            maxWidth = Math.max(maxWidth, _this.ctx.measureText(categ.name).width);
                        });
                        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
                        var canvasActualWidth = this.canvas.width - this.options.padding * 2;

                        //drawing the grid lines
                        var gridValue = 0;
                        var entered = 0;
                        while (gridValue <= maxValue) {
                            entered++;
                            var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;

                            //x-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                gridY,
                                this.canvas.width,
                                gridY,
                                this.options.lineaxesColor
                            );

                            //y-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                0,
                                0,
                                gridY,
                                this.options.lineaxesColor
                            );

                            //writing grid markers
                            this.ctx.save();

                            gridValue += parseInt(this.options.gridScale);
                        }

                        //drawing the lines
                        var lineIndex = 0;
                        var numberOfLines = this.options.data.length;
                        var lineSize = (canvasActualWidth) / numberOfLines;

                        var textWidth = 0;


                        _this.ctx.beginPath();
                        _this.ctx.strokeStyle = _this.options.lineColor;


                        $.each(this.options.data, function (index, categ) {
                            var val = categ.value;
                            var lineHeight = Math.round(canvasActualHeight * val / maxValue);

                            var xaxis = _this.options.padding + lineIndex * lineSize;
                            var yaxis = _this.canvas.height - lineHeight - _this.options.padding;

                            _this.ctx.lineTo(xaxis, yaxis);
                            _this.ctx.stroke();

                            textWidth = _this.ctx.measureText(categ.name).width;
                            var valueWidth = _this.ctx.measureText(categ.value).width;
                            _this.ctx.fillStyle = _this.options.lineFontColor;
                            var fontSize = _this.options.lineFontSize;
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(categ.name, (xaxis + 15) - textWidth / 2, _this.canvas.height);
                            _this.ctx.fillText(val, xaxis - 5, _this.canvas.height - lineHeight - 30);

                            lineIndex++;
                        });



                    }

                    this.draw();
                }
            }
        }
    }
}
