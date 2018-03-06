var contact_us = {
    "contact us": {
        "componentname": "contact us",
        "category": "advance",
        "icon": "icon icon-contactform",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "form",
        "defaultdata": EasyLibrary.ReadDOM("contactus"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($('.site-body').find('.editor-component.contactus').length > 1) {
                $appendLayer.remove();
                SageAlertDialog('You cannot add two contact us component in same page');
            }
            if (dropped)
                this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("contactusbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }

                        function LoadSettings() {
                            var contactuslink = SageFrameHostURL + '/contact-us-manage'
                            $('#contactuslink').attr('href', contactuslink);
                            var layout = $parent.attr('data-layout');
                            $("#slcCULayout").val(layout);

                        }

                        function Events() {

                            $(".asterisk").on("click", function () {
                                var isChecked = false;
                                if ($(this).hasClass('required')) {
                                    $(this).removeClass('required');
                                    isChecked = false;
                                } else {
                                    $(this).addClass('required');
                                    isChecked = true;
                                }
                                var className = $(this).parent().find('input').attr('data-class');
                                if (isChecked) {
                                    $("." + className).find('.contacttextBox').addClass('required');
                                    $("." + className).find('.reqstar').html('*');
                                } else {
                                    $("." + className).find('.contacttextBox').removeClass('required');
                                    $("." + className).find('.reqstar').html('');
                                }
                            });
                            $("#slcCULayout").on("change", function () {
                                var layout = $(this).val();
                                $parent.find(".cuLayout").removeClass("sfCol_100").removeClass("sfCol_50").removeClass("text-align-left").removeClass("text-align-center").removeClass("text-align-right");
                                if (layout == "1-Col-Left") {
                                    $parent.find(".cuLayout").addClass("sfCol_100").addClass("text-align-left");
                                } else if (layout == "1-Col-Right") {
                                    $parent.find(".cuLayout").addClass("sfCol_100").addClass("text-align-right");
                                } else if (layout == "1-Col-Center") {
                                    $parent.find(".cuLayout").addClass("sfCol_100").addClass("text-align-center");
                                } else if (layout == "2-Col-Left") {
                                    $parent.find(".cuLayout").addClass("sfCol_50").addClass("text-align-left");
                                } else if (layout == "2-Col-Right") {
                                    $parent.find(".cuLayout").addClass("sfCol_50").addClass("text-align-right");
                                } else if (layout == "2-Col-Center") {
                                    $parent.find(".cuLayout").addClass("sfCol_50").addClass("text-align-center");
                                }
                                $parent.attr('data-layout', layout);
                            });
                        }
                    }
                },
                "Heading": {
                    "DOM": EasyLibrary.ReadDOM("contactusheadingtab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.cuHeading');
                        var $textChange = $parent;
                        InitEvents();
                        LoadSettings();

                        function InitEvents() {
                            ManualEntryEvents();
                            TextTranformCheck();
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($textChange.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#textTransformcu').val(trasformValue);
                            $('#textTransformcu').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function ManualEntryEvents() {

                            $(".cuChangeText").on("keyup", function () {
                                var value = $(this).val().trim();
                                //if (value == "") {
                                //    SageAlertDialog("Required Field", 'Please enter some text');
                                //} else {
                                var className = $(this).attr('data-class');
                                //alert(className);
                                //console.log($parent);
                                //$parent.find("." + className).text(value);
                                $parent.text(value);
                                //}
                            });
                            $(".cuCheckbox").on("change", function () {
                                var className = $(this).attr('data-class');
                                var isChecked = $(this).prop("checked");
                                if (isChecked) {
                                    $('.contactHeadingSetting').show(400);
                                    $("." + className).show(400);
                                    $parent.show();
                                } else {
                                    $("." + className).hide(400);
                                    $('.contactHeadingSetting').hide(400);
                                    $parent.hide();
                                }
                            });

                            $('.changeFontSize').on('click', function () {
                                $(this).focus().select();
                            });
                            $('.changeFontSize').on('keyup', function (event) {
                                var $this = $(this);
                                var fontsize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        fontsize = fontsize + 1;
                                        $(this).val(fontsize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        fontsize = fontsize - 1;
                                        $(this).val(fontsize);
                                        break;
                                }
                                if (fontsize < minFontSize) {
                                    fontsize = minFontSize;
                                    $this.val(minFontSize);
                                }
                                if (fontsize > maxFontsize) {
                                    fontsize = maxFontsize;
                                    $this.val(maxFontsize);
                                }
                                if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                                    var $slider = $this.parent().prev();
                                    var slider = $slider.slider({
                                        value: fontsize
                                    });
                                    $slider.find('> div.ui-slider-handle').text(fontsize);
                                    $textChange.css('font-size', fontsize + 'px');
                                }
                                $this.focus().select();
                            });

                            $('.increaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                            $('.decreaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function LoadSettings() {



                            $(".cuChangeText").each(function (index, item) {
                                var className = $(this).attr('data-class');
                                var text = '';
                                text = $("." + className).html();
                                var isVisible = $("." + className).is(":visible");
                                if (isVisible) {
                                    $(this).parent().find(".cuCheckbox").prop("checked", true);
                                    $('.contactHeadingSetting').show(400);
                                } else {
                                    $('.contactHeadingSetting').hide();
                                }
                                var $ele = $("." + className).parent().find('.contacttextBox');
                                if ($ele.hasClass('required')) {
                                    $(this).parent().find(".asterisk").addClass("required");
                                } else {
                                    $(this).parent().find(".asterisk").removeClass("required");
                                }
                                $(this).val('');
                                $(this).val(text);
                            });

                            //alert($item.find(".cuCheckbox").is(":checked"));

                            var fontsize = $textChange.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize;
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));
                            $('.changeFontSize').val(fontsize);

                            function FontSize(space) {
                                var handleFontSize = $("#fontsizeHandle");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#fontsizeSlidercu'), $('#fontsizeHandlecu'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
                            var removeClass = '';
                            loadColorPicker();
                            LoadFontFamily();
                        }

                        function loadColorPicker() {
                            $('#chooseFontColorcu').css('background-color', $textChange.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#chooseFontColorcu').colorPicker(colorPickerOption);

                        }

                        function LoadFontFamily() {
                            $('#fontfamilycu').html(DOMFontAdvanceCollection());

                            var defaultFontFamily = 'montserrat';
                            var classesList = $textChange.attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilycu').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightcu').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightcu').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $textChange.removeClass(familyClass[0]);
                                    }
                                }
                                $textChange.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilycu').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $textChange.removeClass(fontClass[0]);
                                    }
                                }
                                $textChange.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightcu').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightcu').html(fontDOM);
                                }
                            }
                        }
                    }
                },
                "Label": {
                    "DOM": EasyLibrary.ReadDOM("contactuslabeltab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.cuLabel');
                        var $textChange = $parent;
                        InitEvents();
                        LoadSettings();

                        function InitEvents() {
                            ManualEntryEvents();
                            TextTranformCheck();
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($textChange.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#textTransformcuLabel').val(trasformValue);
                            $('#textTransformcuLabel').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function ManualEntryEvents() {
                            $('.changeFontSize').on('click', function () {
                                $(this).focus().select();
                            });
                            $('.changeFontSize').on('keyup', function (event) {
                                var $this = $(this);
                                var fontsize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        fontsize = fontsize + 1;
                                        $(this).val(fontsize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        fontsize = fontsize - 1;
                                        $(this).val(fontsize);
                                        break;
                                }
                                if (fontsize < minFontSize) {
                                    fontsize = minFontSize;
                                    $this.val(minFontSize);
                                }
                                if (fontsize > maxFontsize) {
                                    fontsize = maxFontsize;
                                    $this.val(maxFontsize);
                                }
                                if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                                    var $slider = $this.parent().prev();
                                    var slider = $slider.slider({
                                        value: fontsize
                                    });
                                    $slider.find('> div.ui-slider-handle').text(fontsize);
                                    $textChange.css('font-size', fontsize + 'px');
                                }
                                $this.focus().select();
                            });

                            $('.increaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                            $('.decreaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function LoadSettings() {
                            var fontsize = $textChange.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize;
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));
                            $('.changeFontSize').val(fontsize);

                            function FontSize(space) {
                                var handleFontSize = $("#fontsizeHandleLabel");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#fontsizeSlidercuLabel'), $('#fontsizeHandlecuLabel'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
                            var removeClass = '';
                            loadColorPicker();
                            LoadFontFamily();
                        }

                        function loadColorPicker() {
                            $('#chooseFontColorcuLabel').css('background-color', $textChange.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#chooseFontColorcuLabel').colorPicker(colorPickerOption);

                        }

                        function LoadFontFamily() {
                            $('#fontfamilycuLabel').html(DOMFontAdvanceCollection());

                            var defaultFontFamily = 'montserrat';
                            var classesList = $textChange.attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilycuLabel').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightcuLabel').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightcuLabel').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $textChange.removeClass(familyClass[0]);
                                    }
                                }
                                $textChange.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilycuLabel').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $textChange.removeClass(fontClass[0]);
                                    }
                                }
                                $textChange.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightcuLabel').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightcuLabel').html(fontDOM);
                                }
                            }
                        }
                    }
                },
                "Text Box": {
                    "DOM": EasyLibrary.ReadDOM("contactustexttab"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().find('.contacttextBox');
                        var $textChange = $parent;
                        InitEvents();
                        LoadSettings();

                        function InitEvents() {
                            ManualEntryEvents();
                            TextTranformCheck();
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($textChange.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($textChange.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#textTransformcuTextBox').val(trasformValue);
                            $('#textTransformcuTextBox').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $textChange.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $textChange.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $textChange.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function ManualEntryEvents() {
                            $('.changeFontSize').on('click', function () {
                                $(this).focus().select();
                            });
                            $('.changeFontSize').on('keyup', function (event) {
                                var $this = $(this);
                                var fontsize = parseInt($this.val());
                                switch (event.which) {
                                    case 37: // left
                                        break;
                                    case 38: // up
                                        fontsize = fontsize + 1;
                                        $(this).val(fontsize);
                                        break;
                                    case 39: // right
                                        break;

                                    case 40: // down
                                        fontsize = fontsize - 1;
                                        $(this).val(fontsize);
                                        break;
                                }
                                if (fontsize < minFontSize) {
                                    fontsize = minFontSize;
                                    $this.val(minFontSize);
                                }
                                if (fontsize > maxFontsize) {
                                    fontsize = maxFontsize;
                                    $this.val(maxFontsize);
                                }
                                if (fontsize >= minFontSize && fontsize <= maxFontsize) {
                                    var $slider = $this.parent().prev();
                                    var slider = $slider.slider({
                                        value: fontsize
                                    });
                                    $slider.find('> div.ui-slider-handle').text(fontsize);
                                    $textChange.css('font-size', fontsize + 'px');
                                }
                                $this.focus().select();
                            });
                            $('.increaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize + 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                            $('.decreaseFontSize').on('click', function () {
                                var $this = $(this);
                                var $changeFontSize = $this.parent().find('.changeFontSize');
                                $changeFontSize.focus().select();
                                var fontsize = parseInt($changeFontSize.val());
                                fontsize = fontsize - 1;
                                $changeFontSize.val(fontsize);
                                $changeFontSize.trigger('keyup');
                            });
                        }

                        function LoadSettings() {
                            var fontsize = $textChange.css('font-size');
                            if (typeof (fontsize) === 'undefined') {
                                fontsize = minFontSize + 'px';
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));
                            $('.changeFontSize').val(fontsize);

                            function FontSize(space) {
                                var handleFontSize = $("#fontsizeHandleTextBox");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#fontsizeSlidercuTextBox'), $('#fontsizeHandlecuTextBox'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');

                            function BorderSize(space) {
                                var handleFontSize = $("#bordersizeHandlecuTextBox");
                                handleFontSize.parent().next().find('.changeFontSize').val(space);
                                $textChange.css('border-width', space + 'px');
                            }
                            var bordersize = $textChange.css('border-top-width');
                            if (typeof (bordersize) === 'undefined') {
                                bordersize = 1 + 'px';
                            }
                            bordersize = parseInt(bordersize.replace('px', ''));

                            AdvanceSageSlider($('#bordersizeSlidercuTextBox'), $('#bordersizeHandlecuTextBox'), 1, 4, bordersize, BorderSize, $textChange, 'px');
                            var removeClass = '';
                            loadColorPicker();
                            LoadFontFamily();
                            loadBorderColorPicker();
                        }

                        function loadBorderColorPicker() {
                            $('#chooseBorderColorcuTextBox').css('background-color', $textChange.css('border-top-color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'border-color': objColor.bgColor });
                                }
                            });
                            $('#chooseBorderColorcuTextBox').colorPicker(colorPickerOption);

                        }

                        function loadColorPicker() {
                            $('#chooseFontColorcuTextBox').css('background-color', $textChange.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $textChange.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#chooseFontColorcuTextBox').colorPicker(colorPickerOption);

                        }

                        function LoadFontFamily() {
                            $('#fontfamilycuTextBox').html(DOMFontAdvanceCollection());

                            var defaultFontFamily = 'montserrat';
                            var classesList = $textChange.attr('class');
                            if (typeof (classesList) !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilycuTextBox').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof (classesList) !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightcuTextBox').val(weightClasses[0].replace('f-weight-', ''))
                                }
                            }
                            $('#fontWeightcuTextBox').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $textChange.removeClass(familyClass[0]);
                                    }
                                }
                                $textChange.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilycuTextBox').on('change', function () {
                                var classList = $textChange.attr('class');
                                if (typeof (classesList) !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $textChange.removeClass(fontClass[0]);
                                    }
                                }
                                $textChange.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightcuTextBox').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightcuTextBox').html(fontDOM);
                                }
                            }
                        }
                    }
                },
                "Background": {
                    "options": ["color"],
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
                        }
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "onsave": function () {

        },
        "remove": function ($view) {
            $view.find('.contacttextBox').val('');
        },
        "view": {
            "view": function () {
                $(function () {
                    function DrawCaptcha() {
                        var a = Math.ceil(Math.random() * 10) + '';
                        var b = Math.ceil(Math.random() * 10) + '';
                        var firstCode = a;
                        var secondCode = b;
                        $("#spnFirstCaptcha").html(firstCode);
                        $("#spnSecondCaptcha").html(secondCode);
                    }

                    // Validate the Entered input aganist the generated security code function
                    function ValidCaptcha() {
                        var firstCode = parseInt(removeSpaces($('#spnFirstCaptcha').html()));
                        var secondCode = parseInt(removeSpaces($('#spnSecondCaptcha').html()));
                        var str2 = removeSpaces($('#txtCapchaInput').val());
                        if ((firstCode + secondCode) == str2) return true;
                        return false;

                    }

                    // Remove the spaces from the entered and generated code
                    function removeSpaces(string) {
                        return string.split(' ').join('');
                    }
                    var $validatorcu = $("#form1").validate({
                        rules: {
                            firstName: {
                                maxlength: 50
                            },
                            lastName: {
                                maxlength: 50
                            },
                            message: {
                                maxlength: 200
                            },
                            email: {
                                email: true,
                                maxlength: 50
                            },
                            address: {
                                maxlength: 50
                            },
                            telephone: {
                                maxlength: 50
                            },
                            subject: {
                                maxlength: 50
                            },
                            message: {
                                maxlength: 1000
                            },
                            website: {
                                maxlength: 50
                            }
                        },
                        messages: {
                            firstName: {
                                required: "* Required Field"
                            },
                            lastName: {
                                required: "* Required Field"
                            },
                            message: {
                                required: "* Required Field"
                            },
                            email: {
                                required: "* Required Field",
                                email: "Please enter valid email"
                            },
                        },
                        ignore: ':hidden, :disabled'
                    });
                    $(".btncuSave").off().on("click", function () {
                        if ($('.site-body').find('.editor-component.contactus > .carrier-open-option').length == 0) {
                            if ($validatorcu.form()) {
                                if (ValidCaptcha()) {
                                    var $parent = $(this).parents(".cuWrapper");
                                    var firstName = $parent.find(".firstName").val();
                                    var lastName = $parent.find(".lastName").val();
                                    var email = $parent.find(".email").val();
                                    var message = $parent.find(".message").val();
                                    var telephone = $parent.find(".telephone").val();
                                    var subject = $parent.find(".subject").val();
                                    var address = $parent.find(".address").val();
                                    var website = $parent.find(".website").val();
                                    var objBuilComponent = {
                                        portalID: parseInt(SageFramePortalID),
                                        userName: SageFrameUserName,
                                        secureToken: SageFrameSecureToken
                                    }
                                    var objContactUs = {
                                        FirstName: firstName,
                                        LastName: lastName,
                                        Email: email,
                                        Message: message,
                                        Telephone: telephone,
                                        Subject: subject,
                                        Address: address,
                                        Website: website
                                    }
                                    $.ajax({
                                        isPostBack: false,
                                        async: false,
                                        cache: false,
                                        type: 'POST',
                                        contentType: "application/json; charset=utf-8",
                                        data: JSON2.stringify({
                                            objBuilComponent: objBuilComponent,
                                            objContactUs: objContactUs
                                        }),
                                        dataType: 'json',
                                        crossDomain: true,
                                        url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/SaveContactUsData',
                                        success: function (data) {
                                            $('.conMessage').text("Information Save Successfully").removeClass("eb-block-error").addClass("eb-block-success");
                                            ClearForm();
                                        },
                                        error: function () {
                                            $('.conMessage').text("Error Occured").removeClass("eb-block-success").addClass("eb-block-error");
                                        },
                                    });
                                } else {
                                    SageAlertDialog("Wrong Capcha", 'Alert');
                                    DrawCaptcha();
                                    $("#txtCapchaInput").val();
                                }
                            }
                        }
                    });
                    $(".btncuReset").off().on("click", function () {
                        ClearForm();
                    });

                    function ClearForm() {
                        var $parent = $(".contactFromWrap");
                        $parent.find(".firstName").val('');
                        $parent.find(".lastName").val('');
                        $parent.find(".email").val('');
                        $parent.find(".message").val('');
                        $parent.find(".telephone").val('');
                        $parent.find(".subject").val('');
                        $parent.find(".address").val('');
                        $parent.find(".website").val('');
                        $validatorcu.resetForm();
                        $("#txtCapchaInput").val('');
                        DrawCaptcha();
                    }
                    DrawCaptcha();
                });
            },
            "library": {

            }
        }
    }
}
