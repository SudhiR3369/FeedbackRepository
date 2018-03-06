var pie_chart = {
    "pie chart": {
        "componentname": "pie chart",
        "category": "advance",
        "icon": "fa fa-pie-chart",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "graph",
        "defaultdata": EasyLibrary.ReadDOM('piechart/piechartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
        },
        "onsort": function (ui) {
            this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('piechart/piechartbasicsettings'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var backgroundColor = $parent.find('.pieTitle').css('color');
                        var barAxesColor = $parent.find('.pieChartWrapper').attr('data-bordercolor');
                        var barFontColor = $parent.find('.pieChartWrapper').attr('data-piefontcolor');
                        var barTitle = $parent.find('.pieTitle').text();


                        $("#txtPieChartTitle").val(barTitle);


                        $('#choosepietitleColor').css('background-color', backgroundColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.pieTitle').css('color', objColor.bgColor);
                            }
                        });
                        $('#choosepietitleColor').colorPicker(colorPickerOption);


                        $("#txtPieChartTitle").off().on("blur", function () {
                            var value = $(this).val().trim();

                            var $elm = $parent.find('.pieTitle');
                            $elm.text(value);
                            //$(this).attr('value', value);
                        });

                        $('#choosePieBorderColor').css('background-color', barAxesColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.pieChartWrapper').attr('data-bordercolor', objColor.bgColor);
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#choosePieBorderColor').colorPicker(colorPickerOption);

                        $('#choosePieFontColor').css('background-color', barFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.pieChartWrapper').attr('data-piefontcolor', objColor.bgColor);
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#choosePieFontColor').colorPicker(colorPickerOption);

                        var fontWidth = $parent.find('.pieChartWrapper').attr('data-piefontsize').replace('px', '');

                        function ListIconSizeSlider(space) {
                            $parent.find('.pieChartWrapper').attr('data-piefontsize', space);
                            component['pie chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#fontsizeSlider'), $('#fontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');


                        var pieTitlefontWidth = $parent.find('.pieTitle').css('font-size').replace('px', '');

                        function PieTitleSizeSlider(space) {
                            $parent.find('.pieTitle').css('font-size', space);
                        }
                        AdvanceSageSlider($('#pietitlesizeSlider'), $('#pietitlesizeHandle'), 10, 40, pieTitlefontWidth, PieTitleSizeSlider, $parent, 'px');

                    }
                },
                "List-Data": {
                    "DOM": EasyLibrary.ReadDOM('piechart/pieChartDataWrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent();
                        var eleIndex = -1;

                        var $pieChartWrapper = $parent.find('.pieChartWrapper');
                        var pieData = $pieChartWrapper.attr('data-value');

                        var pieDataArray = JSON.parse(pieData);

                        LoadData();
                        InitPieEvents();
                        InitAddMorePieEvent();

                        function LoadData() {
                            var html = '';
                            $("#pieChartEditWrapper").html('');

                            $.each(pieDataArray, function (index, item) {
                                html += '<div class="field-row data-row clearfix">';
                                html += '<div class="multi-col-form-group">';
                                html += '<span class="value">';
                                html += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: ' + item.color + '"></span>';
                                html += '<input type="text" maxlength="15" class="indPieName" value="' + item.name + '"/>';
                                html += '<input type="text" class="sml-box indPieValue" value="' + item.value + '"/>';
                                html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deletePie"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#pieChartEditWrapper").html(html);

                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    pieDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.choosePieFontColor').colorPicker(colorPickerOption);

                        }


                        function InitPieEvents() {

                            $("#pieChartEditWrapper .indPieName").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                pieDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#pieChartEditWrapper .indPieValue").off().on('blur', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    pieDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', pieDataArray[dataIndex].value);
                                    $(this).val(pieDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', pieDataArray[dataIndex].value);
                                    $(this).val(pieDataArray[dataIndex].value);
                                } else {
                                    pieDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#pieChartEditWrapper .deletePie").off().on('click', function () {
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                pieDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            });

                        }

                        function InitAddMorePieEvent() {
                            $("#btnAddMorePieData").off().on("click", function () {
                                var html = '';
                                var $editParent = $(this).parent().find('#pieChartEditWrapper');

                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = pieDataArray[0];
                                    var itemCount = pieDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="multi-col-form-group">';
                                    $editHtml += '<span class="value">';
                                    $editHtml += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: ' + duplicateData.color + '"></span>';
                                    $editHtml += '<input maxlength="15" class="indPieName valid" value="' + duplicateData.name + '" aria-invalid="false" type="text">';
                                    $editHtml += '<input class="sml-box indPieValue" value="' + duplicateData.value + '" type="text">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deletePie"></i>';
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

                                    pieDataArray.push(newData);
                                } else {
                                    html += '<div class="field-row data-row clearfix">';
                                    html += '<div class="multi-col-form-group">';
                                    html += '<span class="value">';
                                    html += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: #A55CA5;"></span>';
                                    html += '<input maxlength="15" class="indPieName valid" value="data 1"  aria-invalid="false" type="text">';
                                    html += '<input class="sml-box indPieValue" value="10" type="text">';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deletePie" ></i>';
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
                                    pieDataArray.push(defaultData);
                                }

                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                component['pie chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        pieDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(pieDataArray);
                                        $pieChartWrapper.attr('data-value', jsonData);
                                        component['pie chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.choosePieFontColor').colorPicker(colorPickerOption);


                                InitPieEvents();
                            });
                        }

                    }
                }
            }
        },

        "view": {
            "view": function () {
                var myCanvasList = document.querySelectorAll(".pieCanvas");

                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;
                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = parentWidth * 0.6;
                        myCanvas.width = parentWidth * 0.6;

                        var pieFontColor = item.parentNode.getAttribute('data-piefontcolor');
                        var pieChartData = item.parentNode.getAttribute('data-value');
                        var pieChartFont = item.parentNode.getAttribute('data-piefontsize');
                        var pieData = JSON.parse(pieChartData);

                        var ctx = myCanvas.getContext("2d");

                        var myLegend = myCanvas.parentNode.children[2];
                        _this.library.PieChart({
                            canvas: myCanvas,
                            seriesName: "Pie Chart",
                            padding: 20,
                            pieFontColor: pieFontColor,
                            data: pieData,
                            legend: myLegend,
                            width: parentWidth,
                            pieChartFont: pieChartFont
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

                "DrawArc": function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.stroke();
                    ctx.restore();
                },

                "DrawPieSlice": function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.closePath();
                    ctx.fill();
                },

                "PieChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    //this.colors = options.colors;
                    var _this = this;
                    this.draw = function () {
                        var total_value = 0;
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            //console.log(categ);
                            total_value += parseFloat(categ.value);
                        });

                        var start_angle = 0;

                        var textWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            var val = parseFloat(categ.value);

                            var slice_angle = 2 * Math.PI * val / total_value;
                            _this.DrawPieSlice(
                                _this.ctx,
                                _this.canvas.width / 2,
                                _this.canvas.height / 2,
                                Math.min(_this.canvas.width / 2, _this.canvas.height / 2),
                                start_angle,
                                start_angle + slice_angle,
                                categ.color
                            );


                            var pieRadius = Math.min(_this.canvas.width / 2, _this.canvas.height / 2);
                            var labelX = _this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                            var labelY = _this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);


                            var labelText = Math.round(100 * val / total_value);
                            _this.ctx.fillStyle = _this.options.pieFontColor;

                            var fontSize = _this.options.pieChartFont;
                            //console.log("bold " + parseInt(fontSize) + "px Arial");
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(labelText + "%", labelX, labelY);


                            start_angle += slice_angle;


                        });

                        if (_this.options.legend) {
                            var legendHTML = "";
                            var fontSize = _this.options.width / 500 * 12;


                            var html = '<div class="position-absolute" style="top: 20px; right:20px;">';
                            if ((_this.options.width * 0.6) < 250) {
                                html = '<div  style="top: 20px; left:20px;">';
                            }
                            $.each(this.options.data, function (index, categ) {
                                html += "<div class='editor-com-outerSpacing-bottom-5' style='font-size: " + parseInt(fontSize) + "px'><span style='display:inline-block;width:20px;background-color:" + categ.color + ";'>&nbsp;</span> " + categ.name + "</div>";
                            });

                            html += '</div>';
                            _this.options.legend.innerHTML = html;
                        }

                    }

                    this.draw();
                }
            }
        }
    }
}
