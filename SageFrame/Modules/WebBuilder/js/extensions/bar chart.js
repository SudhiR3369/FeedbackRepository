var bar_chart = {
    "bar chart": {
        "componentname": "bar chart",
        "category": "advance",
        "icon": "fa fa-bar-chart",
        "row": false,
        "hidden": false,
        "collection": true,
        "type":"graph",
        "defaultdata": EasyLibrary.ReadDOM('barchart/barchartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
            console.log(new Date());
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('barchart/barchartbasicsettings'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.barTitle').css('color');
                        var barAxesColor = $parent.find('.barChartWrapper').attr('data-axescolor');
                        var barFontColor = $parent.find('.barChartWrapper').attr('data-barfontcolor');
                        var barTitle = $parent.find('.barTitle').text();
                        var chartScale = $parent.find('.barChartWrapper').attr('data-scale');


                        $('#ddlBarChartScaling').val(chartScale);
                        $("#txtBarChartTitle").val(barTitle);


                        $('#chooseBartitleColor').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barTitle').css('color', objColor.bgColor);
                            }
                        });
                        $('#chooseBartitleColor').colorPicker(colorPickerOption);


                        $("#txtBarChartTitle").off().on("blur", function () {
                            var value = $(this).val().trim();

                            var $elm = $parent.find('.barTitle');
                            $elm.text(value);
                            //$(this).attr('value', value);
                        });

                        $('#chooseBarAxesColor').css('background-color', barAxesColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barChartWrapper').attr('data-axescolor', objColor.bgColor);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseBarAxesColor').colorPicker(colorPickerOption);

                        $('#chooseBarFontColor').css('background-color', barFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barChartWrapper').attr('data-barfontcolor', objColor.bgColor);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseBarFontColor').colorPicker(colorPickerOption);

                        var fontWidth = $parent.find('.barChartWrapper').attr('data-barfontsize').replace('px', '');

                        function ListIconSizeSlider(space) {
                            $parent.find('.barChartWrapper').attr('data-barfontsize', space);
                            component['bar chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#barfontsizeSlider'), $('#barfontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');


                        var barTitlefontWidth = $parent.find('.barTitle').css('font-size').replace('px', '');

                        function BarTitleSizeSlider(space) {
                            $parent.find('.barTitle').css('font-size', space);
                        }
                        AdvanceSageSlider($('#bartitlesizeSlider'), $('#bartitlesizeHandle'), 10, 40, barTitlefontWidth, BarTitleSizeSlider, $parent, 'px');


                        $('#ddlBarChartScaling').on('change', function () {
                            var val = $(this).val();
                            $parent.find('.barChartWrapper').attr('data-scale', val);
                            component['bar chart'].afterdrop($parent.parent(), $parent);

                        });


                    }
                },
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM('barchart/barchartdatawrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleIndex = -1;

                        var $barChartWrapper = $parent.find('.barChartWrapper');
                        var barData = $barChartWrapper.attr('data-value');

                        var barDataArray = JSON.parse(barData);

                        LoadData();
                        InitBarEvents();
                        InitAddMoreBarEvent();

                        function LoadData() {
                            var html = '';
                            $("#barChartEditWrapper").html('');

                            //for changing all font



                            $.each(barDataArray, function (index, item) {
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: ' + item.color + '"></span>';
                                html += '<input type="text" maxlength="15" class="indBarName" value="' + item.name + '"/>';
                                html += '<input type="text" class="sml-box indBarValue" value="' + item.value + '"/>';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteBar"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#barChartEditWrapper").html(html);

                            //$('.chooseBarFontColor').css('background-color', backgroundColor);
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#barChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    barDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.chooseBarFontColor').colorPicker(colorPickerOption);

                        }


                        function InitBarEvents() {

                            $("#barChartEditWrapper .indBarName").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                barDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#barChartEditWrapper .indBarValue").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    barDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', barDataArray[dataIndex].value);
                                    $(this).val(barDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', barDataArray[dataIndex].value);
                                    $(this).val(barDataArray[dataIndex].value);
                                } else {
                                    barDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#barChartEditWrapper").off().on('click', '.deleteBar', function () {
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                barDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            });

                        }

                        function InitAddMoreBarEvent() {
                            $("#btnAddMoreBarData").off().on("click", function () {
                                var html = '';
                                var $editParent = $(this).parent().find('#barChartEditWrapper');



                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = barDataArray[0];
                                    var itemCount = barDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="multi-col-form-group">';
                                    $editHtml += '<span class="value">';
                                    $editHtml += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: ' + duplicateData.color + '"></span>';
                                    $editHtml += '<input maxlength="15" class="indBarName valid" value="' + duplicateData.name + '" aria-invalid="false" type="text">';
                                    $editHtml += '<input class="sml-box indBarValue" value="' + duplicateData.value + '" type="text">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteBar"></i>';
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

                                    barDataArray.push(newData);
                                } else {
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: #A55CA5;"></span>';
                                    html += '<input maxlength="15" class="indBarName valid" value="data 1"  aria-invalid="false" type="text">';
                                    html += '<input class="sml-box indBarValue" value="10" type="text">';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteBar" ></i>';
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
                                    barDataArray.push(defaultData);
                                }

                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                component['bar chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#barChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        barDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(barDataArray);
                                        $barChartWrapper.attr('data-value', jsonData);
                                        component['bar chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.chooseBarFontColor').colorPicker(colorPickerOption);


                                InitBarEvents();
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
                var myCanvasList = document.querySelectorAll(".barCanvas");
                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;

                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = 350 / parentWidth * parentWidth;
                        myCanvas.width = parentWidth * 0.75;

                        var barAxesColor = item.parentNode.getAttribute('data-axescolor');
                        var barFontColor = item.parentNode.getAttribute('data-barfontcolor');
                        var barFontSize = item.parentNode.getAttribute('data-barfontsize');
                        //console.log(barFontSize);
                        var barChartData = item.parentNode.getAttribute('data-value');
                        var barData = JSON.parse(barChartData);
                        var barScaleFactor = item.parentNode.getAttribute('data-scale');
                        //alert(JSON.stringify(barData));


                        var ctx = myCanvas.getContext("2d");

                        _this.library.BarChart({
                            canvas: myCanvas,
                            seriesName: "Bar Chart",
                            padding: 20,
                            gridScale: barScaleFactor,
                            barAxesColor: barAxesColor,
                            barFontColor: barFontColor,
                            data: barData,
                            barFontSize: barFontSize
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

                "DrawBar": function (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
                    ctx.save();
                    ctx.fillStyle = color;
                    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
                    ctx.restore();
                },

                "BarChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    //this.colors = options.colors;
                    var _this = this;
                    this.draw = function () {
                        //console.log(this.options);
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            //console.log(categ);
                            maxValue = Math.max(maxValue, categ.value);
                            maxWidth = Math.max(maxWidth, _this.ctx.measureText(categ.name).width);
                        });

                        //console.log(maxValue);

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
                                this.options.barAxesColor
                            );

                            //y-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                0,
                                0,
                                gridY,
                                this.options.barAxesColor
                            );

                            //writing grid markers
                            this.ctx.save();

                            gridValue += parseInt(this.options.gridScale);
                            //alert(gridValue + this.options.gridScale);
                        }

                        //drawing the bars
                        var barIndex = 0;
                        var numberOfBars = this.options.data.length;
                        var barSize = (canvasActualWidth) / numberOfBars;

                        var textWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            var val = categ.value;
                            var barHeight = Math.round(canvasActualHeight * val / maxValue);



                            _this.DrawBar(
                                _this.ctx,
                                _this.options.padding + barIndex * barSize,
                                _this.canvas.height - barHeight - _this.options.padding,
                                30,
                                barHeight,
                                categ.color
                            );
                            textWidth = _this.ctx.measureText(categ.name).width;
                            var valueWidth = _this.ctx.measureText(categ.value).width;
                            _this.ctx.fillStyle = _this.options.barFontColor;
                            var fontSize = _this.options.barFontSize;
                            //console.log(fontSize);
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(categ.name, (_this.options.padding + barIndex * barSize + 15) - textWidth / 2, _this.canvas.height);
                            _this.ctx.fillText(val, _this.options.padding + barIndex * barSize + 15 - valueWidth / 2, _this.canvas.height - barHeight - 30);

                            barIndex++;
                        });

                    }

                    this.draw();
                }
            }
        }
    }
}
