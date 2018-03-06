"use strict";
var onlineComponentArr = {};
//DOM creation functions
//Init variables
// Font family, Theme color, layout, header enable
//Component 
//
//Module load function
var sageFrameFakeURL = 'fakeHostURL';
var defaultColor = 'rgb(221, 221, 221)';
var blackColor = "#000";
//var popupNote = "<p class='popupGuideMessage'>You can change the style later from the <b>component ---> style </b>.</p>";
var dragcomponetwidth = '2';
var dragComponetWidth = dragcomponetwidth + 'px';
var fontCollectionBasics = {
    "montserrat":
    {
        "Text": "Montserrat",
        "weight": [100, 200, 300, 400, 600, 700, 800]
    },
    "opensans":
    {
        "Text": "Open Sans",
        "weight": [300, 400, 600, 700, 800]
    },
    "rubik":
    {
        "Text": "Rubik",
        "weight": [300, 400, 500, 700, 900]
    },
    "quicksand":
    {
        "Text": "Quick Sand",
        "weight": [300, 400, 500, 700]
    },
    "robotoslab":
    {
        "Text": "Roboto Slab",
        "weight": [100, 200, 400, 700]
    }

};
var fontCollectionStyling = {
    "kaushan":
    {
        "Text": "Kaushan",
        "weight": [0]
    },
    "prata":
    {
        "Text": "Prata",
        "weight": [0]
    },
    "cookie":
    {
        "Text": "Cookie",
        "weight": [0]
    },
    "abrilfatface":
    {
        "Text": "Abril Fatface",
        "weight": [0]
    },
    "lobster":
    {
        "Text": "Lobster",
        "weight": [0]
    },
    "satisfy":
    {
        "Text": "Satisfy",
        "weight": [0]
    }
};
function GenericRemove($ele) {
    $ele.find('.carries-options').remove();
    $ele.find('.ui-droppable').each(function () {
        $(this).removeClass('ui-droppable');
    });
    $ele.find('.ui-sortable').each(function () {
        $(this).removeClass('ui-sortable');
    });
    //remove contenteditable
    $ele.find('.editor-para').removeAttr('contenteditable');
    $ele.find('.rowTitleHeading > h1').removeAttr('contenteditable');
    $ele.find('.rowTitleHeading > h1').removeAttr('contenteditable');
    $ele.find('.editor-component > h1').removeAttr('contenteditable');
    $ele.find('.editor-component span').removeAttr('contenteditable');
    $ele.find('.editor-component').removeClass('ui-sortable');
    $ele.find('.editor-component').removeClass('ui-droppable');
    $ele.find('.resizebar').remove();
    $ele.find('.noElement').remove();
    $ele.find('.pagelink.active-page').removeClass('active-page');
    //to be remove at last
    $ele.find('.editor-col').each(function () {
        var $this = $(this);
        $this.removeAttr('data-width');
        $('.editor-col').css({ 'width': '' });
    });
}
function DOMFontBasicCollection() {
    var basicFontDOM = '';
    var keys = Object.keys(fontCollectionBasics);
    var len = keys.length;
    for (var k = 0; k < len; k++) {
        basicFontDOM += '<option class="f-weight-400 ff-' + fontCollectionBasics[keys[k]].Text.toLowerCase().replace(' ', '') + '" value="' + keys[k] + '" >' + fontCollectionBasics[keys[k]].Text + '</option>';
    }
    return basicFontDOM;
}
function DOMFontAdvanceCollection() {
    var basicFontDOM = '';
    var keys = Object.keys(fontCollectionBasics);
    var len = keys.length;
    for (var k = 0; k < len; k++) {
        basicFontDOM += '<option class="f-weight-400 ff-' + fontCollectionBasics[keys[k]].Text.toLowerCase().replace(' ', '') + '" value="' + keys[k] + '" >' + fontCollectionBasics[keys[k]].Text + '</option>';
    }
    keys = Object.keys(fontCollectionStyling);
    len = keys.length;
    for (var l = 0; l < len; l++) {
        basicFontDOM += '<option class="f-weight-400 ff-' + fontCollectionStyling[keys[l]].Text.toLowerCase().replace(' ', '') + '" value="' + keys[l] + '" >' + fontCollectionStyling[keys[l]].Text + '</option>';
    }
    return basicFontDOM;
}
function DOMFontWeight(fontName) {
    var fontWeightDOM = '';
    var weights = '';
    if (typeof (fontCollectionBasics[fontName]) !== "undefined") {
        weights = fontCollectionBasics[fontName].weight;
    }
    else {
        weights = fontCollectionStyling[fontName].weight;
    }
    var len = weights.length;
    for (var k = 0; k < len; k++) {
        fontWeightDOM += '<option value="' + weights[k] + '" >' + weights[k] + '</option>';
    }
    return fontWeightDOM;
}
var tag =
    {
        'divTag': 'div',
        'ulTag': 'ul',
        'liTag': 'li',
        'iTag': 'i',
        'spanTag': 'span',
        'selecTag': 'select',
    };
function GeneralAlignment($par) {
    var alignmentClasses = $par.attr('class').match(/text-align-[a-z]{4,6}/g);
    var alignClass = '';
    if (alignmentClasses !== null) {
        alignClass = alignmentClasses[0];
    }
    $('.alignmentWrapper').find('i[data-class="' + alignClass + '"]').addClass('selected');
}
function GeneralAlignmentEvent($par) {
    $('.alignmentWrapper i').off().on('click', function () {
        var $this = $(this);
        var alignmentClasses = $par.attr('class').match(/text-align-[a-z]{4,6}/g);
        var alignClass = '';
        if (alignmentClasses !== null) {
            alignClass = alignmentClasses[0];
            $par.removeClass(alignClass);
        }
        $par.addClass($this.attr('data-class'));
        $('.alignmentWrapper i').removeClass('selected');
        $this.addClass('selected');
    });
}
function SageSlider($slider, $sliderHandler, min, max, initialValue, callbackFunction, $parent) {
    $slider.slider({
        range: "max",
        min: min,
        max: max,
        value: initialValue,
        create: function () {
            $sliderHandler.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            var space = ui.value;
            $sliderHandler.text(space);
            if (typeof (callbackFunction) === 'function') {
                callbackFunction(space, $parent);
            }
            else if (typeof (callbackFunction) === 'string') {
                window[callbackFunction](space, $parent);
            }
        }
    });
}
function AdvanceSageSlider($slider, $sliderHandler, min, max, initialValue, callbackFunction, $parent, type) {
    var tempFunction = function () { };
    $slider.slider({
        range: "max",
        min: min,
        max: max,
        value: initialValue,
        create: function () {
            $sliderHandler.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            var space = ui.value;
            $sliderHandler.text(space);
            if (typeof (callbackFunction) === 'function') {
                //callbackFunction(space, $parent);
                tempFunction = callbackFunction;
            }
            else if (typeof (callbackFunction) === 'string') {
                // window[callbackFunction](space, $parent);
                tempFunction = window[callbackFunction];
            }
            tempFunction(space, $parent);
        }
    });
    if (typeof (callbackFunction) === 'function') {
        tempFunction = callbackFunction;
    }
    else if (typeof (callbackFunction) === 'string') {
        tempFunction = window[callbackFunction];
    }
    BuildManualSize($slider, min, max, initialValue, type, tempFunction, $parent);
}
function ChangeSliderValue($slider, newSize) {
    $slider.slider({
        value: newSize
    });
    $slider.slider('option', 'slide');//.call($slider);
    $slider.find('> div.ui-slider-handle').text(newSize);
    $slider.slider("enable");
}
function BuildManualSize($slider, min, max, initialValue, type, tempFunction, $parent) {
    var decreaseSize = document.createElement('i');
    decreaseSize.className = 'decreaseSliderSize fa fa-chevron-left'; // Class name
    decreaseSize.onclick = function () {
        var $this = $(this);
        var $slider = $this.parent().prev();
        var newSize = parseInt($slider.find('> div.ui-slider-handle').text());
        var limit = parseInt($this.attr('data-min'));
        if (newSize > limit) {
            newSize = newSize - 1;
            ChangeSliderValue($slider, newSize);
            tempFunction(newSize, $parent);
        }
    };
    decreaseSize.setAttribute('data-min', min);

    var increaseSize = document.createElement('i');
    increaseSize.className = 'increaseSliderSize fa fa-chevron-right'; // Class name
    increaseSize.onclick = function () {
        var $this = $(this);
        var $slider = $this.parent().prev();
        var newSize = parseInt($slider.find('> div.ui-slider-handle').text());
        var limit = parseInt($this.attr('data-max'));
        if (newSize < limit) {
            newSize = newSize + 1;
            ChangeSliderValue($slider, newSize);
            tempFunction(newSize, $parent);
        }
    };
    increaseSize.setAttribute('data-max', max);
    var $sliderHelper = $(DOMCreate('span', '', 'manualSize'));
    $sliderHelper.insertAfter($slider);
    $sliderHelper.append(decreaseSize);
    $sliderHelper.append(increaseSize);
    $sliderHelper.append(DOMCreate('span', type, 'slider-type'));
}
function PagelinkStop() {
    $('.pagelink').not('.onepage').off().on('click', function (e) {
        var tempName = $(this).find('.pageName').text();
        e.preventDefault();
        SageConfirmDialog(' All your unsaved data will be lost. Are you sure you want to edit "' + tempName + '" page?').done(function () {
            var href = SageFrameHostURL + '/WebBuilder' + webBuilderPageExtension + '/' + tempName.replace(/ /g, '-');
            window.location = href;
        });
    });
}
function ColorPickerOption($option) {
    var objColor = {};
    var colorPickerOption = {
        customBG: '#222',
        margin: '4px -2px 0',
        doRender: 'div div',
        buildCallback: function ($elm) {
            BuildColorPicker($elm, this);
        },
        renderCallback: function ($elm, toggled) {
            var objColor = RenderCallBackColor(this);
            //var objColor = RenderCallBackColor(this);
            //objColor.bgColor
            //objColor.textColor
            //apply the color logic here
            //var colorPickerID = $elm.attr('id');
        },
        positionCallback: function ($elm) {

        },
    };
    return $.extend(colorPickerOption, $option);
}
function GetThemeColor() {
    var primaryColor = $('#primaryColor').css('background-color');
    var secondaryColor = $('#secondaryColor').css('background-color');
    var optionalColor = $('#optionalColor').css('background-color');
    var html = DOMCreate('div', '', 'themeColorpicker', 'primaryChange', ['style="background-color: ' + primaryColor + ';"']);
    html += DOMCreate('div', '', 'themeColorpicker', 'secondaryChange', ['style="background-color: ' + secondaryColor + ';"']);
    html += DOMCreate('div', '', 'themeColorpicker', 'optionalChange', ['style="background-color: ' + optionalColor + ';"']);
    html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #FFF;"']);
    html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #000;"']);
    html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #CCC;"']);
    html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #121212;"']);
    html += DOMCreate('h6', 'Set Color Tranparency');
    html = DOMCreate('div', '<h6>Choose From Theme Colors</h6>' + html, 'themeColorpickerWrapper');
    return html;
}
function BuildColorPicker($element, $thisElem) {
    var colorInstance = $thisElem.color,
        colorPicker = $thisElem;
    $element.prepend('<div class="cp-panel">' +
        'R <input type="text" class="cp-r" /><br>' +
        'G <input type="text" class="cp-g" /><br>' +
        'B <input type="text" class="cp-b" /><hr>' +
        'H <input type="text" class="cp-h" /><br>' +
        'S <input type="text" class="cp-s" /><br>' +
        'B <input type="text" class="cp-v" /><hr>' +
        'Paste color code<br>' +
        '<input type="text" class="cp-HEX" />' +
        '</div>').on('change', 'input', function (e) {
            var value = this.value,
                className = this.className,
                type = className.split('-')[1],
                color = {};
            color[type] = value;
            colorInstance.setColor(type === 'HEX' ? value : color,
                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
            colorPicker.render();
            this.blur();
        });
    $element.append(GetThemeColor());
    $('.themeColorpicker').off().on('click', function () {
        $('.cp-HEX').val($(this).css('background-color'));
        $('.cp-HEX').trigger('change');
    });
}
function RenderCallBackColor($thisElem) {
    var colors = $thisElem.color.colors.RND,
        modes = {
            r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
            h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
            HEX: $thisElem.color.colors.HEX
        };
    $('input', '.cp-panel').each(function () {
        this.value = modes[this.className.substr(3)];
    });

    colors = $thisElem.color.colors;
    var colorsRGB = colors.RND.rgb;
    var alpha = colors.alpha;
    var textColor = '';
    if (colors.RGBLuminance > 0.22) {
        textColor = '#222';
    }
    else {
        textColor = '#ddd';
    }
    var bgColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
    var colorObj = {
        'bgColor': bgColor,
        'textColor': textColor
    };
    return colorObj;
}
function SageMedia($image) {
    $image.SageMedia({
        userModuleID: webBuilderUserModuleID,
        onSelect: function (src, response, type, filename, extension) {
            $image.attr('src', src);
        },
        mediaType: 'image'
    });
}
function InitTab() {
    $('.content').hide().filter(':first').show();
    $('#tabs li[data-tabs]').on('click', function () {
        $('#tabs li[data-tabs]').removeClass('active');
        $('.tabcontent').hide();
        var tab = $(this).data('tabs');
        $(this).addClass('active');
        $('#' + tab).fadeIn().show();
    });
    $(".tabs li").click(function () {
        var cur = $(".tabs li").index(this);
        var elm = $('.tabcontent:eq(' + cur + ')');
        elm.addClass("pulse");
        setTimeout(function () {
            elm.removeClass("pulse");
        }, 220);
    });
    $('#tabs li[data-tabs]').eq(0).addClass('active');
}
function OptionEvent($elem) {
    var $carrieroption = $('.carrier-open-option');
    if (typeof $elem !== "undefined") {
        $carrieroption = $elem.find('.carrier-open-option');
    }
    $carrieroption.off().on('click', function (event) {
        $('.carrier-open-option.active-options').removeClass('active-options');
        $(this).addClass('active-options');
        $('.carries-options').not('.hide-element').addClass('hide-element');
        $(this).next().removeClass('hide-element');
        event.preventDefault();
        event.stopPropagation();
    });
}
function SettingEvents($elem) {
    var $comsettings = $('.com-settings');
    var $comStyle = $('.com-style');
    var $imagesettings = $('.image-settings');
    var $duplicateHolder = $('.duplicateHolder');
    if (typeof $elem !== "undefined") {
        $comsettings = $elem.find('.com-settings');
        $comStyle = $elem.find('.com-style');
        $imagesettings = $elem.find('.image-settings');
        $duplicateHolder = $elem.find('.duplicateHolder');
    }
    $comsettings.off().on('click', function () {
        HidePopUpSetting();
        var $this = $(this);
        var $offset = $this.offset();
        var top = $offset.top;
        var left = $offset.left;
        var height = $this.height();
        var title = $this.attr('title');
        var $parentRow = $this.parents('.editor-row');
        var componentType = $this.attr('data-type');
        PopUpSetting(title, '50%', left, 0, 0, componentType, $parentRow, $this);
        $('.collapse').trigger('click');
    });
    ////$('.editor-component').off().on('click', function () {
    ////    $('.editor-component').removeClass('activeComponent');
    ////    $(this).addClass('activeComponent');
    ////});
    $comStyle.off().on('click', function () {
        var $this = $(this);
        var dataType = $this.attr('data-type');

        var $element = $this.parent().parent();
        if ($element.hasClass('editor-row-container')) {
            if ($element.parent().hasClass('editor-row-shaded-layer')) {
                $element = $element.parent().parent();
            }
            else if ($element.parent().hasClass('editor-row ')) {
                $element = $element.parent();
            }
        }
        else if ($element.hasClass('editor-row-shaded-layer')) {
            if ($element.parent().hasClass('editor-row ')) {
                $element = $element.parent();
            }
        }
        if (typeof (component[dataType].beforedrop) !== 'undefined') {
            component[dataType].beforedrop($element.parent(), $element, false);
        }
    });
    $('.image-settings').off().on('click', function () {
        var $image = $(this).parent().parent().find('img');
        $(this).SageMedia({
            userModuleID: webBuilderUserModuleID,
            onSelect: function (src, response, type, filename, extension) {
                $image.attr('src', src);
            },
            mediaType: 'image',
            success: function (resposne) {

            }
        });
    });
    $duplicateHolder.off().on('click', function () {
        var $this = $(this);
        var $copyParent = $this.parent().parent();
        if ($copyParent.hasClass('editor-row-shaded-layer')) {
            $copyParent = $copyParent.parent();
        }
        var copyAttrs = $copyParent.attrs();
        var $html = $(DOMCreate('div', $copyParent.html()));
        $html.insertAfter($copyParent);
        $html.attrs(copyAttrs);
        RowEvents();
        DraggableSortable();
        BindColumnEvents($html);
        CopyPasteEvents($html);
    });
    OptionEvent($elem);
    EditableSetBreak($elem);
}
function PopUpSetting(title, top, left, height, width, componentType, $parentRow, $this) {
    var $popUpModel = $('#popupModel');
    $popUpModel.find('.popup-title').text(title);
    var sidebarWidth = $('.editor-box').offset().left;
    var screenWidth = ($('.editor-box').width() - sidebarWidth) / 2;
    var scrPer = screenWidth * 0.1;
    if (left < screenWidth)
        $popUpModel.css({ top: '20%', left: 'auto', right: scrPer + 'px', 'position': 'fixed' }).fadeIn(400);
    else
        $popUpModel.css({ top: '20%', left: (sidebarWidth + scrPer) + 'px', 'position': 'fixed' }).fadeIn(400);
    if (typeof (component[componentType].settingDOMs) !== 'undefined') {
        BuildSettingDOM(component[componentType], $this);
    }
    else if (typeof (component[componentType].settingDOM) !== 'undefined') {
        $('.popup-model-body').html(component[componentType].settingDOM);
    }
    if (typeof (component[componentType].loadSetting) !== 'undefined') {
        component[componentType].loadSetting($this);
    }
    // remove the tab there is only one
    var tabs = $popUpModel.find('#tabs').find('.tabs li').length;
    if (tabs == 1) {
        width = $popUpModel.find('#tabs').find('.tabsWrapper').width();
        $popUpModel.find('#tabs').find('.tabs').remove();
        $('.popup-model').css({ 'width': width });
    }
    else {
        $('.popup-model').css({ 'width': '' });
    }
}
function SimplePopup($opt) {
    var popupOption = {
        Title: 'simplePopup',
        Top: '100',
        Left: '221',
        Height: '200',
        Data: '',
        Minimize: true,
        Width: '200',
        Position: 'absolute',
        ShowClose: true,
        ShowTitle: true,
        Draggable: false,
        CallbackBeforePopup: function () { },
        CallbackaftePopUp: function () { }
    };
    popupOption = $.extend(popupOption, $opt);
    var $popUpModel = $('#simplePopupModel');
    if (popupOption.ShowTitle) {
        $popUpModel.find('.simple-popup-title').text(popupOption.Title).show();
    }
    else {
        $popUpModel.find('.simple-popup-title').hide();
    }
    var popUpwidth = $popUpModel.width();
    var $editorBox = $('.editor-box');
    var $editorBoxOffset = $editorBox.offset();
    var editorTop = $editorBoxOffset.top;
    var editorLeft = $editorBoxOffset.left;
    var popUpModelLeft = 0;
    var leftThreshold = 0;
    var rightthreshHold = 10;
    var popUpModelTop = (top + rightthreshHold);
    if ((popupOption.Left - editorLeft) > popUpwidth) {
        popUpModelLeft = popupOption.Left - popUpwidth - leftThreshold;
    }
    else {
        popUpModelLeft = popupOption.Left - leftThreshold;
    }
    if (popupOption.Height > 0) {
        $popUpModel.css({ height: popupOption.Height });
    }
    if (popupOption.Width > 0) {
        $popUpModel.css({ width: popupOption.Width });
    }
    if (popupOption.ShowClose)
        $('.simple-close-model').show();
    else
        $('.simple-close-model').hide();
    //fa-window-maximize
    $popUpModel.css({ 'position': popupOption.Position });
    $('.simple-popup-model-body').html(popupOption.Data);
    popupOption.CallbackBeforePopup($('.simple-popup-model-body'));
    $popUpModel.css({
        top: popupOption.top,
        left: popUpModelLeft
    }).fadeIn(400);
    if (popupOption.Draggable) {
        $popUpModel.draggable({
            //containment: '.main-container',
            handle: '.simple-popup-header',
            start: function (e, ui) {
                $(ui.helper).css({
                    "position": "fixed"
                });
            },
            stop: function (event, ui) {
                AutoAlignDragger(ui.helper);
            }
        });
    }
    popupOption.CallbackaftePopUp();
    $('.simple-close-model').off().on('click', function () {
        FadeSimplePopUp();
    });
}
function HideSimplePopUp() {
    $('#simplePopupModel').hide().css({ 'position': 'absolute' });
}
function FadeSimplePopUp() {
    $('#simplePopupModel').fadeOut(400).css({ 'position': 'absolute' });
}
function Messages(title, message, type) {

}
//initializing marginSlider with unused values
// sliderID, sliderHandlerID, used, sliderFunction, initialValue
var marginSliderList = [];
//initializing marginSlider with unused values
// sliderID, sliderHandlerID, used, sliderFunction, initialvalue
var paddingSliderList = [];
var borderSliderList = [];
var borderHoverSliderList = [];
var boxRadiusSliderList = [];
var boxShadowSliderList = [];
var boxShadowEffectSliderList = [];
function BuildSettingDOM($compo, $this) {
    marginSliderList = [
        ['bulkMarginSlider', 'bulkMarginHandler', false, 'BulkMargin', 0],
        ['marginTopSlider', 'marginTopHandler', false, 'MarginTop', 0],
        ['marginRightSlider', 'marginRightHandler', false, 'MarginRight', 0],
        ['marginBottomSlider', 'marginBottomHandler', false, 'MarginBottom', 0],
        ['marginLeftSlider', 'marginLeftHandler', false, 'MarginLeft', 0]
    ];
    paddingSliderList = [
        ['bulkPaddingSlider', 'bulkPaddingHandler', false, 'BulkPadding', 0],
        ['paddingTopSlider', 'paddingTopHandler', false, 'PaddingTop', 0],
        ['paddingRightSlider', 'paddingRightHandler', false, 'PaddingRight', 0],
        ['paddingBottomSlider', 'paddingBottomHandler', false, 'PaddingBottom', 0],
        ['paddingLeftSlider', 'paddingLeftHandler', false, 'PaddingLeft', 0]
    ];
    //initializing border slider with unused values
    // sliderID, sliderHandlerID, used, sliderFunction, initialvalue, colorPickerID
    borderSliderList = [
        ['bulkBorderSlider', 'bulkBorderHandler', false, 'BorderBulk', 1, 'bulkBorderColor'],
        ['borderTopSlider', 'borderTopHandler', false, 'BorderTop', 1, 'topBorderColor'],
        ['borderRightSlider', 'borderRightHandler', false, 'BorderRight', 1, 'rightBorderColor'],
        ['borderBottomSlider', 'borderBottomHandler', false, 'BorderBottom', 1, 'bottomBorderColor'],
        ['borderLeftSlider', 'borderLeftHandler', false, 'BorderLeft', 1, 'leftBorderColor']
    ];

    borderHoverSliderList = [
        ['bulkBorderHoverSlider', 'bulkBorderHoverHandler', false, 'BorderHoverBulk', 1, 'bulkBorderHoverColor'],
        ['borderHoverTopSlider', 'borderHoverTopHandler', false, 'BorderHoverTop', 1, 'topBorderHoverColor'],
        ['borderHoverRightSlider', 'borderHoverRightHandler', false, 'BorderHoverRight', 1, 'rightBorderHoverColor'],
        ['borderHoverBottomSlider', 'borderHoverBottomHandler', false, 'BorderHoverBottom', 1, 'bottomBorderHoverColor'],
        ['borderHoverLeftSlider', 'borderHoverLeftHandler', false, 'BorderHoverLeft', 1, 'leftBorderHoverColor']
    ];

    boxRadiusSliderList = [
        ['bulkBoxRadiusSlider', 'bulkBoxRadiusHandler', false, 'BoxRadiusBulk', 0],
        ['boxRadiusTopLeftSlider', 'boxRadiusTopLeftHandler', false, 'BoxRadiusTopLeft', 0],
        ['boxRadiusTopRightSlider', 'boxRadiusTopRightHandler', false, 'BoxRadiusTopRight', 0],
        ['boxRadiusBottomLeftSlider', 'boxRadiusBottomLeftHandler', false, 'BoxRadiusBottomLeft', 0],
        ['boxRadiusBottomRightSlider', 'boxRadiusBottomRightHandler', false, 'BoxRadiusBottomRight', 0]
    ];

    boxShadowSliderList = [
        ['boxShadowHorizontalSlider', 'boxShadowHorizontalHandler', 'boxShadowHorizontal', 0],
        ['boxShadowVerticalSlider', 'boxShadowVerticalHandler', 'boxShadowVertical', 0],
        ['boxShadowBlurSlider', 'boxShadowBlurHandler', 'boxShadowBlur', 0]
    ];
    boxShadowEffectSliderList = [
        ['boxShadowEffectHorizontalSlider', 'boxShadowEffectHorizontalHandler', 'boxShadowEffectHorizontal', 0],
        ['boxShadowEffectVerticalSlider', 'boxShadowEffectVerticalHandler', 'boxShadowEffectVertical', 0],
        ['boxShadowEffectBlurSlider', 'boxShadowEffectBlurHandler', 'boxShadowEffectBlur', 0]
    ];
    var settingDOM = '';
    if (typeof ($compo.settingDOMs.tabs) !== undefined) {
        var $tabComponent = $compo.settingDOMs.tabs;
        var tabKeys = Object.keys($tabComponent);
        var tabLength = tabKeys.length;
        var tabs = '';
        var tabData = '';
        for (var j = 0; j < tabLength; j++) {
            var $tabCompo = tabKeys[j];
            var tab = 'tab' + (j + 1);
            var showTab = true;
            if (typeof ($tabComponent[$tabCompo].show) !== "undefined") {
                showTab = $tabComponent[$tabCompo].show;
            }
            if (showTab === true)
                tabs += DOMCreate('li', $tabCompo, '', '', ['data-tabs="' + tab + '"']);
            var appendData = '';
            switch ($tabCompo.toLowerCase()) {
                case 'background':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralBackgroundDOM($tabComponent[$tabCompo].options);
                    }
                    break;
                case 'spacing':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralSpacingDOM($tabComponent[$tabCompo].options);
                    }
                    break;
                case 'alignment':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralAlignMentDOM($tabComponent[$tabCompo].options);
                    }
                    break;
                case 'border':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralBorderDOM($tabComponent[$tabCompo].options);
                    }
                    break;
                case 'box radius':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralBoxRadiusDOM($tabComponent[$tabCompo].options);
                    }
                    break;
                case 'box shadow':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralBoxShadowDOM($tabComponent[$tabCompo].options);
                    }
                    break;
                case 'hover effect':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralHoverEffectDOM($tabComponent[$tabCompo].options);
                    }
                    break;
                case 'scroll effect':
                    if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        appendData = GeneralScrolleffect($tabComponent[$tabCompo].options);
                    }
                    break;
                default:
                    if (typeof ($compo.settingDOMs.tabs[$tabCompo].DOM) !== 'undefined') {
                        appendData = $compo.settingDOMs.tabs[$tabCompo].DOM;
                    }
                    break;
            }
            if (j === 0) {
                tabData += DOMCreate('div', appendData, 'tabcontent', tab);
            }
            else {
                tabData += DOMCreate('div', appendData, 'tabcontent', tab, ['style="display: none;"']);
            }
        }
        settingDOM = DOMCreate('ul', tabs, 'tabs');
        settingDOM += DOMCreate('div', tabData, 'tabsWrapper');
        settingDOM = DOMCreate('div', settingDOM, '', 'tabs');
        $('.popup-model-body').html(settingDOM);
        var $selectedLayer = $this.parent().parent();
        for (var k = 0; k < tabLength; k++) {
            var $tabCompo = tabKeys[k];
            switch ($tabCompo.toLowerCase()) {
                case 'background':
                    $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer);
                    GeneralBackgroundEvents($selectedLayer);
                    break;
                case 'alignment':
                    if (typeof ($tabComponent[$tabCompo].selectLayer) !== 'undefined') {
                        $selectedLayer = $tabComponent[$tabCompo].selectLayer($this);
                    }
                    GeneralAlignMentEvents($selectedLayer);
                    break;
                case 'spacing':
                    if (typeof ($tabComponent[$tabCompo].selectLayer) !== 'undefined') {
                        $selectedLayer = $tabComponent[$tabCompo].selectLayer($this);
                    }
                    GeneralSpacingEvents($selectedLayer);
                    break;
                case 'border':
                    if (typeof ($tabComponent[$tabCompo].selectLayer) !== 'undefined') {
                        $selectedLayer = $tabComponent[$tabCompo].selectLayer($this);
                    }
                    GeneralBorderEvents($selectedLayer);
                    break;
                case 'box radius':
                    if (typeof ($tabComponent[$tabCompo].selectLayer) !== 'undefined') {
                        $selectedLayer = $tabComponent[$tabCompo].selectLayer($this);
                    }
                    GeneralBoxRadiusEvents($selectedLayer);
                    break;
                case 'box shadow':
                    if (typeof ($tabComponent[$tabCompo].selectLayer) !== 'undefined') {
                        $selectedLayer = $tabComponent[$tabCompo].selectLayer($this);
                    }
                    GeneralBoxShadowEvents($selectedLayer);
                    break;
                case 'hover effect':
                    if (typeof ($tabComponent[$tabCompo].selectLayer) !== 'undefined') {
                        $selectedLayer = $tabComponent[$tabCompo].selectLayer($this);
                    }
                    GeneralIconHoverEffectEvent($selectedLayer);
                    break;
                case 'scroll effect':
                    if (typeof ($tabComponent[$tabCompo].selectLayer) !== 'undefined') {
                        $selectedLayer = $tabComponent[$tabCompo].selectLayer($this);
                    }
                    GeneralScrollEffectEvent($selectedLayer);
                    break;
                default:
                    if (typeof ($tabComponent[$tabCompo].onload) !== 'undefined') {
                        $tabComponent[$tabCompo].onload($this);
                    }
            }
        }
        InitTab();
        DeleteComponent();
    }
}
function DeleteComponent($elem) {

    var $deleteHelper = $('.deletehelper');
    if (typeof $elem !== "undefined") {
        $deleteHelper = $elem.find('.deletehelper');
    }
    $deleteHelper.off().on('click', function () {
        var $parent = $(this).parent().parent();
        if ($parent.not('.holder').hasClass('editor-col')) {
            SageConfirmDialog('Do you want to empty column ?').done(function () {
                var $option = $parent.find('> .carries-options');
                var $nodata = $parent.find('> .column-data-empty');
                var $tooglemenu = $parent.find('> .carrier-open-option');
                $parent.find(' > div').not($option).not($nodata).not($tooglemenu).remove();
            });
        }
        else {
            SageConfirmDialog('Are you sure you want to delete ?').done(function () {
                if ($parent.hasClass('editor-row-container')) {
                    if ($parent.parent().hasClass('editor-row-shaded-layer')) {
                        $parent.parent().parent().remove();
                    }
                    else {
                        $parent.parent().remove();
                    }
                }
                else if ($parent.hasClass('editor-row-shaded-layer')) {
                    $parent.parent().remove();
                }
                else {
                    $parent.remove();
                }
                CheckNoRow();
            });

            function CheckNoRow() {
                if ($('.editor-componentWrapper').find('.editor-row').length === 0) {
                    $('.editor-componentWrapper').append('<div class="noElement">Drag a row here</div>');
                }
            }
        }
    });
}
function GetSelectedLayer($this, $compo, $compoOption) {
    var $selectedLayer = '';
    if (typeof ($compoOption) !== 'undefined') {
        $selectedLayer = $compoOption($this);
    }
    else if (typeof ($compo.settingDOMs.selectLayer) !== 'undefined') {
        $selectedLayer = $compo.settingDOMs.selectLayer($this);
    }
    else {
        $selectedLayer = $this.parent().parent();
    }
    return $selectedLayer;
}
function HidePopUpSetting() {
    $('#popupModel').hide();
    $('#popupModel').css({ 'position': 'absolute' });
    $('.headerControls').removeClass('clicked');
}
function FadeOutPopUpSetting() {
    $('#popupModel').fadeOut(400);
    $('#popupModel').css({ 'position': 'absolute' });
    $('.headerControls').removeClass('clicked');
}
function GeneralBackgroundDOM(options) {
    var backGroundDOM = '';
    var optionLen = options.length;
    if (optionLen > 0) {
        if (optionLen == 1) {
            backGroundDOM += DOMCreate('h4', 'Background');
            var optionValue = options[0];
            switch (optionValue) {
                case 'color':
                    backGroundDOM += EasyLibrary.ReadDOM("divbackcolorchoose");
                    break;
                case 'image':
                    backGroundDOM += EasyLibrary.ReadDOM("divbackimagechoose");
                    break;
            }
            backGroundDOM = FieldRowDOMCreate(backGroundDOM);
        }
        else {
            backGroundDOM += EasyLibrary.ReadDOM("backgroundtab");
        }
    }
    return backGroundDOM;
}
function GeneralBackgroundEvents($parent) {
    var $shadedlayer = $parent.find(' > .editor-row-shaded-layer');
    if ($parent.hasClass('editor-row-shaded-layer')) {
        $shadedlayer = $parent;
        $parent = $parent.parent();
    }
    loadSettings();
    InitEvents();
    function loadSettings() {
        BGImage();
        function BGImage() {
            var parentBgImage = $parent.css('background-image');
            if (typeof (parentBgImage) === 'undefined' || parentBgImage === 'none') {
                parentBgImage = webbuildermodulepath + '/img/tiger.jpg';
            }
            parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
            $('#RowBGImage').attr('src', parentBgImage);
        }
    }
    function InitEvents() {
        $('#selBackround').off().on('change', function () {
            var select = $(this).val();
            var backgroundColor = '';
            var backgroundImage = '';
            switch (select) {
                case 'none':
                    $('#divBackColorChoose').hide();
                    $('#divBackImageChoose').hide();
                    backgroundColor = '';
                    backgroundImage = '';
                    removeImageBG();
                    removeColorBG();
                    break;
                case 'image':
                    $('#divBackColorChoose').hide();
                    $('#divBackImageChoose').show();
                    backgroundColor = '';
                    backgroundImage = 'image';
                    removeColorBG();
                    break;
                case 'color':
                    $('#divBackColorChoose').show();
                    $('#divBackImageChoose').hide();
                    backgroundColor = 'color';
                    backgroundImage = '';
                    removeImageBG();
                    break;
            }
            $parent.attr('data-backgroundColor', backgroundColor);
            $parent.attr('data-backgroundImage', backgroundImage);
        });
        $('#bgImageEffect').off().on('change', function () {
            var newEffectClass = $(this).val();
            var effectClass = 'background-effect-size-contain';
            var sfEffect = $parent.attr('class').match(/background-effect-[a-z]{1,10}-[a-z]{1,10}/g);
            if (sfEffect !== null) {
                effectClass = sfEffect[0];
            }
            $parent.removeClass(effectClass).addClass(newEffectClass);
        });
        //for shaded layer
        if ($shadedlayer.length > 0) {
            $('#shadedLayerActive').prop('checked', true);
            var conClass = $shadedlayer.attr('class').replace('editor-row-container', '').trim();
            $('#selContainerWidth').val(conClass);
            $('#divPickShaded').fadeIn(400);
            $('#chooseColorShadedCol').css({ 'background-color': $shadedlayer.css('background-color') });
        }
        else {
            $('#shadedLayerActive').prop('checked', false);
        }

        var backgroundColor = $parent.attr('data-backgroundColor');
        var backgroundImage = $parent.attr('data-backgroundImage');
        var selected = 'none';
        if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
            selected = 'color';
        }
        else if (typeof (backgroundImage) !== 'undefined' && backgroundImage.length > 0) {
            selected = 'image';
            BackImageSetting();
        }
        $('#selBackround').val(selected);
        $('#selBackround').trigger('change');

        $('#RowBGImage').on('click', function () {
            var $this = $(this);
            $this.SageMedia({
                userModuleID: webBuilderUserModuleID,
                onSelect: function (src, response, type, filename, extension) {
                    src = src.replace(/\\/g, '/');
                    $this.attr('src', src);
                    $parent.css({
                        'background-image': 'url("' + src + '")'
                    });
                },
                mediaType: 'image'
            });
        });
        $('#shadedLayerActive').off().on('click', function () {
            if ($(this).is(':checked')) {
                var shadedDiv = divStart('editor-row-shaded-layer') + divEnd;
                var appendElem = $parent.children();
                $parent.append(shadedDiv);
                $('#divPickShaded').fadeIn(400);
                $parent.find(' > .editor-row-shaded-layer').append(appendElem).css({ 'background-color': 'rgba(37, 113, 211, 0.38)' });
                var parentClasses = $parent.attr('class');
                var paddingClass = parentClasses.match(/editor-com-innerSpacing-[a-z]{0,10}(-neg){0,1}-[0-9]{1,3}/g);
                if (paddingClass !== null) {
                    $(paddingClass).each(function (i, v) {
                        $parent.find(' > .editor-row-shaded-layer').addClass(v);
                        $parent.removeClass(v);
                    });
                }
            }
            else {
                //removing and adding padding between shaded and row
                var parentClasses = $parent.find('.editor-row-shaded-layer').attr('class');
                var paddingClass = parentClasses.match(/editor-com-innerSpacing-[a-z]{0,10}(-neg){0,1}-[0-9]{1,3}/g);
                if (paddingClass !== null) {
                    $(paddingClass).each(function (i, v) {
                        $parent.find('.editor-row-shaded-layer').removeClass(v);
                        $parent.addClass(v);
                    });
                }
                RemoveShadedLayer();
            }
        });
        //customBG
        var bgColor = $parent.css('background-color');
        var txtColor = $parent.css('color');
        if (typeof (bgColor) === "undefined") {
            bgColor = "rgb(255, 255, 255, 1)";
        }
        if (typeof (txtColor) === "undefined") {
            txtColor = "rgb(0, 0, 0, 1)";
        }
        $('#chooseColorColBG').css({
            'background-color': bgColor,
            'color': txtColor
        });
        var extracolor = GetUsedBgColor();
        if (extracolor.length > 0) {
            $(extracolor).insertAfter('#chooseColorBG');
            $('.obtainColor').on('click', function () {
                var bgnewColor = $(this).css('background-color');
                $('#chooseColorBG').css({
                    'background-color': bgnewColor,
                });
                $parent.css({
                    'background-color': bgnewColor,
                });

            });
        }
        var $shadedObject = $parent.find('.editor-row-shaded-layer');
        if (typeof ($shadedObject) !== "undefined") {
            var shadedBGColor = $shadedObject.css('background-color');
            var txtshadedColor = $shadedObject.css('color');
            if (typeof (shadedBGColor) === "undefined") {
                shadedBGColor = "rgba(37, 113, 211, 0.38)";
            }
            if (typeof (txtshadedColor) === "undefined") {
                txtshadedColor = "rgb(0, 0, 0, 1)";
            }
            $('#chooseColorShaded').css({
                'background-color': shadedBGColor,
                'color': txtshadedColor
            });
        }

        var colorPickerOption = {
            customBG: '#222',
            margin: '4px -2px 0',
            doRender: 'div div',
            buildCallback: function ($elm) {
                BuildColorPicker($elm, this);
            },
            renderCallback: function ($elm, toggled) {
                var colors = this.color.colors.RND,
                    modes = {
                        r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                        h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                        HEX: this.color.colors.HEX
                    };
                $('input', '.cp-panel').each(function () {
                    this.value = modes[this.className.substr(3)];
                });
                colors = this.color.colors;
                var colorsRGB = colors.RND.rgb;
                var alpha = colors.alpha;
                var textColor = '';
                if (colors.RGBLuminance > 0.22) {
                    textColor = '#222';
                }
                else {
                    textColor = '#ddd';
                }
                var colorPickerID = $elm.attr('id');
                switch (colorPickerID) {
                    case 'chooseColorShadedCol':
                        $parent.find(' > .editor-row-shaded-layer').css({
                            'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                            'color': textColor
                        });
                        break;
                    case 'chooseColorColBG':
                        $parent.css({
                            'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                            'color': textColor
                        });
                        break;
                }
            }
        };
        $('.chooseBGColors').colorPicker(colorPickerOption);

        function GetUsedBgColor() {
            var extracolor = '';
            $('.editor-row').each(function () {
                extracolor += '<span class="obtainColor  color-picker-holder" style="background-color: ' + $(this).css('background-color') + ';"></span>';
            });
            extracolor = '<span><i>Used colors :</i> ' + extracolor + '</span>';
            return extracolor;
        }
        function removeImageBG() {
            RemoveShadedLayer();
            $parent.removeClass('editor-row-bg-image-parallax');
            $parent.css({
                'background-image': ''
            });
        }
        function RemoveShadedLayer() {
            var appendElem = $parent.find(' > .editor-row-shaded-layer').children();
            $parent.append(appendElem);
            $parent.find(' > .editor-row-shaded-layer').remove();
            $('#divPickShaded').fadeOut(100);
            $('#shadedLayerActive').prop('checked', false);
        }
        function removeColorBG() {
            $parent.css({ 'background-color': '', 'color': '' });
            $('#chooseColorColBG').css({ 'background-color': bgColor, 'color': txtColor });
        }
        function BackImageSetting() {
            var effectClass = 'background-effect-size-contain';
            var sfEffect = $parent.attr('class').match(/background-effect-[a-z]{1,10}-[a-z]{1,10}/g);
            if (sfEffect !== null) {
                effectClass = sfEffect[0];
            }
            $('#bgImageEffect').val(effectClass);
        }
    }
}
function GeneralAlignMentDOM(options) {
    var alignDOM = '';
    if (typeof (options) != 'undefined' && options.length > 0) {
        var optionLen = options.length;
        for (var i = 0; i < optionLen; i++) {
            alignDOM += DOMCreate('i', '', 'icon-align-' + options[i], '', ['data-class="text-align-' + options[i] + '"']);
        }
        alignDOM = DOMCreate('h4', 'Alignment') + DOMCreate('span', alignDOM, 'alignmentWrapper');
        alignDOM = FieldRowDOMCreate(alignDOM);
    }
    return alignDOM;
}
function GeneralAlignMentEvents($parent) {
    if (typeof $parent.attr('data-alignCollection') !== "undefined") {
        $parent = $('.' + $parent.attr('data-alignCollection'));
    }
    LoadSetting();
    function LoadSetting() {
        var parentClasses = $parent.attr('class');
        if (typeof (parentClasses) !== "undefined") {
            var alignmentClasses = parentClasses.match(/text-align-[a-z]{4,6}/g);
            var alignClass = '';
            if (alignmentClasses !== null) {
                alignClass = alignmentClasses[0];
            }
            $('.alignmentWrapper').find('i[data-class="' + alignClass + '"]').addClass('selected');
        }
    }
    InitEvent();
    function InitEvent() {
        $('.alignmentWrapper i').on('click', function () {
            var $this = $(this);
            $parent.removeClass('text-align-left').removeClass('text-align-center').removeClass('text-align-right');
            $parent.addClass($this.attr('data-class'));
            $('.alignmentWrapper i').removeClass('selected');
            $this.addClass('selected');
        });
    }
}
function GeneralSpacingDOM($options) {
    var outerDOM = '';
    var innerDOM = '';
    if (typeof ($options) !== 'undefined') {
        var spaceOption = Object.keys($options);
        var spaceOptionLength = spaceOption.length;
        for (var j = 0; j < spaceOptionLength; j++) {
            var $sp = spaceOption[j];
            switch ($sp) {
                case 'margin':
                    outerDOM += DOMCreate('h4', 'Outer Spacing', '', 'OuterSpacingWrap', ['data-min="' + $options['margin']['min'] + '"', 'data-max="' + $options['margin']['max'] + '"', 'data-times="' + $options['margin']['times'] + '"']);
                    if (typeof ($options['margin']['position'] !== 'undefined')) {
                        var positionList = $options['margin']['position'];
                        var positionListLen = positionList.length;
                        for (var i = 0; i < positionListLen; i++) {
                            switch (positionList[i].toLowerCase()) {
                                case 'all':
                                    outerDOM += CreateSliderDOM(marginSliderList[0][0], marginSliderList[0][1], 'Bulk');
                                    marginSliderList[0][2] = true;
                                    break;
                                case 'top':
                                    outerDOM += CreateSliderDOM(marginSliderList[1][0], marginSliderList[1][1], 'Top');
                                    marginSliderList[1][2] = true;
                                    break;
                                case 'right':
                                    outerDOM += CreateSliderDOM(marginSliderList[2][0], marginSliderList[2][1], 'Right');
                                    marginSliderList[2][2] = true;
                                    break;
                                case 'bottom':
                                    outerDOM += CreateSliderDOM(marginSliderList[3][0], marginSliderList[3][1], 'Bottom');
                                    marginSliderList[3][2] = true;
                                    break;
                                case 'left':
                                    outerDOM += CreateSliderDOM(marginSliderList[4][0], marginSliderList[4][1], 'Left');
                                    marginSliderList[4][2] = true;
                                    break;
                            }
                        }
                    }
                    outerDOM = FieldRowDOMCreate(outerDOM);
                    break;
                case 'padding':
                    innerDOM += DOMCreate('h4', 'Inner Spacing', '', 'InnerSpacingWrap', ['data-min="' + $options['padding']['min'] + '"', 'data-max="' + $options['padding']['max'] + '"', 'data-times="' + $options['padding']['times'] + '"']);
                    if (typeof ($options['padding']['position'] !== 'undefined')) {
                        var positionList = $options['padding']['position'];
                        var positionListLen = positionList.length;
                        for (var i = 0; i < positionListLen; i++) {
                            switch (positionList[i].toLowerCase()) {
                                case 'all':
                                    innerDOM += CreateSliderDOM(paddingSliderList[0][0], paddingSliderList[0][1], 'Bulk');
                                    paddingSliderList[0][2] = true;
                                    break;
                                case 'top':
                                    innerDOM += CreateSliderDOM(paddingSliderList[1][0], paddingSliderList[1][1], 'Top');
                                    paddingSliderList[1][2] = true;
                                    break;
                                case 'right':
                                    innerDOM += CreateSliderDOM(paddingSliderList[2][0], paddingSliderList[2][1], 'Right');
                                    paddingSliderList[2][2] = true;
                                    break;
                                case 'bottom':
                                    innerDOM += CreateSliderDOM(paddingSliderList[3][0], paddingSliderList[3][1], 'Bottom');
                                    paddingSliderList[3][2] = true;
                                    break;
                                case 'left':
                                    innerDOM += CreateSliderDOM(paddingSliderList[4][0], paddingSliderList[4][1], 'Left');
                                    paddingSliderList[4][2] = true;
                                    break;
                            }
                        }
                    }
                    innerDOM = FieldRowDOMCreate(innerDOM);
                    break;
            }
        }
    }
    return outerDOM + innerDOM;
}
function BulkMargin(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#OuterSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#OuterSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var parentClasses = $parent.attr('class');
        if (typeof (parentClasses) !== "undefined") {
            var marginClass = parentClasses.match(/editor-com-outerSpacing-[a-z]{0,10}(-neg){0,1}-[0-9]{1,3}/g);
            if (marginClass !== null) {
                $(marginClass).each(function (i, v) {
                    $parent.removeClass(v.trim());
                });
            }
        }
        for (var i = 1; i < 5; i++) {
            if (marginSliderList[i][2]) {
                $('#' + marginSliderList[i][0]).slider('value', space);
                $('#' + marginSliderList[i][1]).text(space);
            }
        }

        if (space >= 0) {
            space = space * times;
            if (marginSliderList[1][2])
                $parent.addClass('editor-com-outerSpacing-top-' + space);
            if (marginSliderList[2][2])
                $parent.addClass('editor-com-outerSpacing-right-' + space);
            if (marginSliderList[3][2])
                $parent.addClass('editor-com-outerSpacing-bottom-' + space);
            if (marginSliderList[4][2])
                $parent.addClass('editor-com-outerSpacing-left-' + space);
            if (!marginSliderList[1][2] && !marginSliderList[2][2] && !marginSliderList[3][2] && !marginSliderList[4][2]) {
                $parent.addClass('editor-com-outerSpacing-top-' + space);
                $parent.addClass('editor-com-outerSpacing-right-' + space);
                $parent.addClass('editor-com-outerSpacing-bottom-' + space);
                $parent.addClass('editor-com-outerSpacing-left-' + space);
            }
        }
        else {
            space = Math.abs(space);
            space = space * times;
            if (marginSliderList[1][2])
                $parent.addClass('editor-com-outerSpacing-top-neg-' + space);
            if (marginSliderList[2][2])
                $parent.addClass('editor-com-outerSpacing-right-neg-' + space);
            if (marginSliderList[3][2])
                $parent.addClass('editor-com-outerSpacing-bottom-neg-' + space);
            if (marginSliderList[4][2])
                $parent.addClass('editor-com-outerSpacing-left-neg-' + space);
            if (!marginSliderList[1][2] && !marginSliderList[2][2] && !marginSliderList[3][2] && !marginSliderList[4][2]) {
                $parent.addClass('editor-com-outerSpacing-top-neg-' + space);
                $parent.addClass('editor-com-outerSpacing-right-neg-' + space);
                $parent.addClass('editor-com-outerSpacing-bottom-neg-' + space);
                $parent.addClass('editor-com-outerSpacing-left-neg-' + space);
            }
        }
    }
}
function MarginTop(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#OuterSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#OuterSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var parentClasses = $parent.attr('class');
        var marginClass = parentClasses.match(/editor-com-outerSpacing-top(-neg){0,1}-[0-9]{1,3}/g);
        if (marginClass !== null) {
            $parent.removeClass(marginClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-outerSpacing-top-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-outerSpacing-top-neg-' + space * times);
        }
        ResetBulkMarginSliderValue();
    }
}
function MarginRight(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#OuterSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#OuterSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var parentClasses = $parent.attr('class');
        var marginClass = parentClasses.match(/editor-com-outerSpacing-right(-neg){0,1}-[0-9]{1,3}/g);
        if (marginClass !== null) {
            $parent.removeClass(marginClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-outerSpacing-right-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-outerSpacing-right-neg-' + space * times);
        }
        ResetBulkMarginSliderValue();
    }
}
function MarginBottom(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#OuterSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#OuterSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var parentClasses = $parent.attr('class');
        var marginClass = parentClasses.match(/editor-com-outerSpacing-bottom(-neg){0,1}-[0-9]{1,3}/g);
        if (marginClass !== null) {
            $parent.removeClass(marginClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-outerSpacing-bottom-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-outerSpacing-bottom-neg-' + space * times);
        }
        ResetBulkMarginSliderValue();
    }
}
function MarginLeft(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#OuterSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#OuterSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var parentClasses = $parent.attr('class');
        var marginClass = parentClasses.match(/editor-com-outerSpacing-left(-neg){0,1}-[0-9]{1,3}/g);
        if (marginClass !== null) {
            $parent.removeClass(marginClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-outerSpacing-left-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-outerSpacing-left-neg-' + space * times);
        }
        ResetBulkMarginSliderValue();
    }
}
function ResetBulkMarginSliderValue() {
    $('#' + marginSliderList[0][0]).slider('value', 0);
    $('#' + marginSliderList[0][1]).text(0);
}

function BulkPadding(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#InnerSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#InnerSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
        var parentClasses = '';
        if ($shadedLayer.length > 0) {
            $parent = $shadedLayer;
            parentClasses = $shadedLayer.attr('class');
        }
        else {
            parentClasses = $parent.attr('class');
        }
        var paddingClass = parentClasses.match(/editor-com-innerSpacing-[a-z]{0,10}(-neg){0,1}-[0-9]{1,3}/g);
        if (paddingClass !== null) {
            $(paddingClass).each(function (i, v) {
                $parent.removeClass(v.trim());
            });
        }
        for (var i = 1; i < 5; i++) {
            if (paddingSliderList[i][2]) {
                $('#' + paddingSliderList[i][0]).slider('value', space);
                $('#' + paddingSliderList[i][1]).text(space);
            }
        }

        if (space >= 0) {
            space = space * times;
            if (paddingSliderList[1][2])
                $parent.addClass('editor-com-innerSpacing-top-' + space);
            if (paddingSliderList[2][2])
                $parent.addClass('editor-com-innerSpacing-right-' + space);
            if (paddingSliderList[3][2])
                $parent.addClass('editor-com-innerSpacing-bottom-' + space);
            if (paddingSliderList[4][2])
                $parent.addClass('editor-com-innerSpacing-left-' + space);


            if (!paddingSliderList[1][2] && !paddingSliderList[2][2] && !paddingSliderList[3][2] && !paddingSliderList[4][2]) {
                $parent.addClass('editor-com-innerSpacing-top-' + space);
                $parent.addClass('editor-com-innerSpacing-right-' + space);
                $parent.addClass('editor-com-innerSpacing-bottom-' + space);
                $parent.addClass('editor-com-innerSpacing-left-' + space);
            }
        }
        else {
            space = Math.abs(space);
            space = space * times;
            if (paddingSliderList[1][2])
                $parent.addClass('editor-com-innerSpacing-top-neg-' + space);
            if (paddingSliderList[2][2])
                $parent.addClass('editor-com-innerSpacing-right-neg-' + space);
            if (paddingSliderList[3][2])
                $parent.addClass('editor-com-innerSpacing-bottom-neg-' + space);
            if (paddingSliderList[4][2])
                $parent.addClass('editor-com-innerSpacing-left-neg-' + space);

            if (!paddingSliderList[1][2] && !paddingSliderList[2][2] && !paddingSliderList[3][2] && !paddingSliderList[4][2]) {
                $parent.addClass('editor-com-innerSpacing-top-neg-' + space);
                $parent.addClass('editor-com-innerSpacing-right-neg-' + space);
                $parent.addClass('editor-com-innerSpacing-bottom-neg-' + space);
                $parent.addClass('editor-com-innerSpacing-left-neg-' + space);
            }
        }
    }
}
function PaddingTop(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#InnerSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#InnerSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
        var parentClasses = '';
        if ($shadedLayer.length > 0) {
            $parent = $shadedLayer;
            parentClasses = $shadedLayer.attr('class');
        }
        else {
            parentClasses = $parent.attr('class');
        }
        var paddingClass = parentClasses.match(/editor-com-innerSpacing-top(-neg){0,1}-[0-9]{1,3}/g);
        if (paddingClass !== null) {
            $parent.removeClass(paddingClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-innerSpacing-top-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-innerSpacing-top-neg-' + space * times);
        }
        ResetBulkPaddingSliderValue();
    }
}
function PaddingRight(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#InnerSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#InnerSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
        var parentClasses = '';
        if ($shadedLayer.length > 0) {
            $parent = $shadedLayer;
            parentClasses = $shadedLayer.attr('class');
        }
        else {
            parentClasses = $parent.attr('class');
        }
        var paddingClass = parentClasses.match(/editor-com-innerSpacing-right(-neg){0,1}-[0-9]{1,3}/g);
        if (paddingClass !== null) {
            $parent.removeClass(paddingClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-innerSpacing-right-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-innerSpacing-right-neg-' + space * times);
        }
        ResetBulkPaddingSliderValue();
    }
}
function PaddingBottom(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#InnerSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#InnerSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
        var parentClasses = '';
        if ($shadedLayer.length > 0) {
            $parent = $shadedLayer;
            parentClasses = $shadedLayer.attr('class');
        }
        else {
            parentClasses = $parent.attr('class');
        }
        var paddingClass = parentClasses.match(/editor-com-innerSpacing-bottom(-neg){0,1}-[0-9]{1,3}/g);
        if (paddingClass !== null) {
            $parent.removeClass(paddingClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-innerSpacing-bottom-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-innerSpacing-bottom-neg-' + space * times);
        }
        ResetBulkPaddingSliderValue();
    }
}
function PaddingLeft(space, $parent) {
    if (space !== 'undefined' && typeof (space) !== 'undefined') {
        var times = 1;
        if (typeof ($('#InnerSpacingWrap').attr('data-times')) !== 'undefined')
            times = parseInt($('#InnerSpacingWrap').attr('data-times'));
        if (times == 0)
            times = 1;
        var $shadedLayer = $parent.find('.editor-row-shaded-layer');
        var parentClasses = '';
        if ($shadedLayer.length > 0) {
            $parent = $shadedLayer;
            parentClasses = $shadedLayer.attr('class');
        }
        else {
            parentClasses = $parent.attr('class');
        }
        var paddingClass = parentClasses.match(/editor-com-innerSpacing-left(-neg){0,1}-[0-9]{1,3}/g);
        if (paddingClass !== null) {
            $parent.removeClass(paddingClass[0].trim());
        }
        if (space >= 0) {
            $parent.addClass('editor-com-innerSpacing-left-' + space * times);
        }
        else {
            space = Math.abs(space);
            $parent.addClass('editor-com-innerSpacing-left-neg-' + space * times);
        }
        ResetBulkPaddingSliderValue();
    }
}
function ResetBulkPaddingSliderValue() {
    $('#' + paddingSliderList[0][0]).slider('value', 0);
    $('#' + paddingSliderList[0][1]).text(0);
}
function GeneralSpacingEvents($parent) {
    if ($parent.hasClass('editor-row-shaded-layer')) {
        $parent = $parent.parent();
    }
    if (typeof $parent.attr('data-spaceCollection') !== "undefined") {
        $parent = $('.' + $parent.attr('data-spaceCollection'));
    }
    InitMarginEvents();
    InitPaddingEvents();
    function InitMarginEvents() {
        LoadMarginSliderInitValue();
        var $outerSpaceWrap = $('#OuterSpacingWrap');
        if (typeof ($outerSpaceWrap.attr('data-max')) !== 'undefined' && typeof ($outerSpaceWrap.attr('data-min')) !== 'undefined') {
            var maxValue = parseInt($('#OuterSpacingWrap').attr('data-max'));
            var minValue = parseInt($('#OuterSpacingWrap').attr('data-min'));
            for (var i = 0; i < 5; i++) {
                if (marginSliderList[i][2]) {
                    AdvanceSageSlider($('#' + marginSliderList[i][0]), $('#' + marginSliderList[i][1]), minValue, maxValue, marginSliderList[i][4], marginSliderList[i][3], $parent, 'px');
                }
            }
        }
        function LoadMarginSliderInitValue() {
            var times = 1;
            if (typeof ($('#OuterSpacingWrap').attr('data-times')) !== 'undefined')
                times = parseInt($('#OuterSpacingWrap').attr('data-times'));
            if (times == 0)
                times = 1;

            var parentClasses = '';
            var $shadedLayer = $parent.find('.editor-row-shaded-layer');
            if ($shadedLayer.length > 0) {
                parentClasses = $shadedLayer.attr('class');
            }
            else {
                parentClasses = $parent.attr('class');
            }
            var marginClass = parentClasses.match(/editor-com-outerSpacing-top-[0-9]{1,3}/g);
            var margin = 0;
            if (marginClass !== null) {
                margin = parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-top-', ''));
            }
            else {
                marginClass = parentClasses.match(/editor-com-outerSpacing-top-neg-[0-9]{1,3}/g);
                if (marginClass !== null) {
                    margin = -parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-top-neg-', ''));
                }
            }
            margin = margin / times;
            marginSliderList[1][4] = margin;

            marginClass = parentClasses.match(/editor-com-outerSpacing-right-[0-9]{1,3}/g);
            margin = 0;
            if (marginClass !== null) {
                margin = parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-right-', ''));
            }
            else {
                marginClass = parentClasses.match(/editor-com-outerSpacing-right-neg-[0-9]{1,3}/g);
                if (marginClass !== null) {
                    margin = -parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-right-neg-', ''));
                }
            }
            margin = margin / times;
            marginSliderList[2][4] = margin;

            marginClass = parentClasses.match(/editor-com-outerSpacing-bottom-[0-9]{1,3}/g);
            margin = 0;
            if (marginClass !== null) {
                margin = parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-bottom-', ''));
            }
            else {
                marginClass = parentClasses.match(/editor-com-outerSpacing-bottom-neg-[0-9]{1,3}/g);
                if (marginClass !== null) {
                    margin = -parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-bottom-neg-', ''));
                }
            }
            margin = margin / times;
            marginSliderList[3][4] = margin;
            marginClass = parentClasses.match(/editor-com-outerSpacing-left-[0-9]{1,3}/g);
            margin = 0;
            if (marginClass !== null) {
                margin = parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-left-', ''));
            }
            else {
                marginClass = parentClasses.match(/editor-com-outerSpacing-left-neg-[0-9]{1,3}/g);
                if (marginClass !== null) {
                    margin = -parseInt(marginClass[0].trim().replace('editor-com-outerSpacing-left-neg-', ''));
                }
            }
            margin = margin / times;
            marginSliderList[4][4] = margin;

            if (marginSliderList[1][4] === marginSliderList[2][4] &&
                marginSliderList[3][4] === marginSliderList[4][4] &&
                marginSliderList[1][4] === marginSliderList[4][4]) {
                marginSliderList[0][4] = marginSliderList[1][4];
            }
        }
    }
    function InitPaddingEvents() {
        LoadPaddingSliderInitValue();
        var $outerSpaceWrap = $('#InnerSpacingWrap');
        if (typeof ($outerSpaceWrap.attr('data-max')) !== 'undefined' && typeof ($outerSpaceWrap.attr('data-min')) !== 'undefined') {
            var maxValue = parseInt($('#InnerSpacingWrap').attr('data-max'));
            var minValue = parseInt($('#InnerSpacingWrap').attr('data-min'));
            for (var i = 0; i < 5; i++) {
                if (paddingSliderList[i][2]) {
                    AdvanceSageSlider($('#' + paddingSliderList[i][0]), $('#' + paddingSliderList[i][1]), minValue, maxValue, paddingSliderList[i][4], paddingSliderList[i][3], $parent, 'px');
                }
            }
        }
        function LoadPaddingSliderInitValue() {
            var times = 1;
            if (typeof ($('#InnerSpacingWrap').attr('data-times')) !== 'undefined')
                times = parseInt($('#InnerSpacingWrap').attr('data-times'));
            if (times == 0)
                times = 1;
            var padding = 0;
            var parentClasses = $parent.attr('class');
            var paddingClass = '';
            if (typeof (parentClasses) !== "undefined") {
                paddingClass = parentClasses.match(/editor-com-innerSpacing-top-[0-9]{1,3}/g);
                if (paddingClass !== null) {
                    padding = parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-top-', ''));
                }
                else {
                    paddingClass = parentClasses.match(/editor-com-innerSpacing-top-neg-[0-9]{1,3}/g);
                    if (paddingClass !== null) {
                        padding = -parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-top-neg-', ''));
                    }
                }
            }
            padding = padding / times;
            paddingSliderList[1][4] = padding;
            if (typeof (parentClasses) !== "undefined") {
                paddingClass = parentClasses.match(/editor-com-innerSpacing-right-[0-9]{1,3}/g);
                padding = 0;
                if (paddingClass !== null) {
                    padding = parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-right-', ''));
                }
                else {
                    paddingClass = parentClasses.match(/editor-com-innerSpacing-right-neg-[0-9]{1,3}/g);
                    if (paddingClass !== null) {
                        padding = -parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-right-neg-', ''));
                    }
                }
            }
            padding = padding / times;
            paddingSliderList[2][4] = padding;
            if (typeof (parentClasses) !== "undefined") {
                paddingClass = parentClasses.match(/editor-com-innerSpacing-bottom-[0-9]{1,3}/g);
                padding = 0;
                if (paddingClass !== null) {
                    padding = parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-bottom-', ''));
                }
                else {
                    paddingClass = parentClasses.match(/editor-com-innerSpacing-bottom-neg-[0-9]{1,3}/g);
                    if (paddingClass !== null) {
                        padding = -parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-bottom-neg-', ''));
                    }
                }
            }
            if (typeof (parentClasses) !== "undefined") {
                padding = padding / times;
                paddingSliderList[3][4] = padding;
                paddingClass = parentClasses.match(/editor-com-innerSpacing-left-[0-9]{1,3}/g);
                padding = 0;
                if (paddingClass !== null) {
                    padding = parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-left-', ''));
                }
                else {
                    paddingClass = parentClasses.match(/editor-com-innerSpacing-left-neg-[0-9]{1,3}/g);
                    if (paddingClass !== null) {
                        padding = -parseInt(paddingClass[0].trim().replace('editor-com-innerSpacing-left-neg-', ''));
                    }
                }
            }
            padding = padding / times;
            paddingSliderList[4][4] = padding;

            if (paddingSliderList[1][4] === paddingSliderList[2][4] &&
                paddingSliderList[3][4] === paddingSliderList[4][4] &&
                paddingSliderList[1][4] === paddingSliderList[4][4]) {
                paddingSliderList[0][4] = paddingSliderList[1][4];
            }
        }
    }
}
function GeneralBorderDOM($options) {
    var borderDOM = '';
    if (typeof ($options !== 'undefined')) {
        borderDOM += DOMCreate('h4', 'Border', '', 'borderWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', 'data-times="' + $options['times'] + '"']);
        var selectDOM = DOMCreate('label', 'Border Style') + '<span class="value">' + SelectDOMCreate('borderStyle', 'BorderStyle', [['none', 'None'], ['solid', 'Solid'], ['dashed', 'Dashed'], ['dotted', 'Dotted'], ['double', 'Double']]) + '</span>';
        borderDOM += FieldRowDOMCreate(selectDOM);

        var borderSliderCollection = '';
        var positionList = $options['position'];
        var positionLength = positionList.length;
        for (var i = 0; i < positionLength; i++) {
            switch (positionList[i].toLowerCase()) {
                case 'all':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[0][0], borderSliderList[0][1], 'Bulk Border', borderSliderList[0][5], 'borderColorChoose');
                    borderSliderList[0][2] = true;
                    break;
                case 'top':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[1][0], borderSliderList[1][1], 'Top Border', borderSliderList[1][5], 'borderColorChoose');
                    borderSliderList[1][2] = true;
                    break;
                case 'right':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[2][0], borderSliderList[2][1], 'Right Border', borderSliderList[2][5], 'borderColorChoose');
                    borderSliderList[2][2] = true;
                    break;
                case 'bottom':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[3][0], borderSliderList[3][1], 'Bottom Border', borderSliderList[3][5], 'borderColorChoose');
                    borderSliderList[3][2] = true;
                    break;
                case 'left':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[4][0], borderSliderList[4][1], 'Left Border', borderSliderList[4][5], 'borderColorChoose');
                    borderSliderList[4][2] = true;
                    break;
            }
        }
        borderSliderCollection = DOMCreate('div', borderSliderCollection, 'borderSliderCollection', '', ['style="display:none;"']);
        borderDOM = FieldRowDOMCreate(borderDOM + borderSliderCollection);
    }
    return borderDOM;
}
function BorderBulk(space, $parent) {

    if (borderSliderList[1][2]) {
        $parent.css({ "border-top-width": space });
        $('#' + borderSliderList[1][0]).slider('value', space);
        $('#' + borderSliderList[1][1]).text(space);
    }
    if (borderSliderList[2][2]) {
        $parent.css({ "border-right-width": space });
        $('#' + borderSliderList[2][0]).slider('value', space);
        $('#' + borderSliderList[2][1]).text(space);
    }
    if (borderSliderList[3][2]) {
        $parent.css({ "border-bottom-width": space });
        $('#' + borderSliderList[3][0]).slider('value', space);
        $('#' + borderSliderList[3][1]).text(space);
    }
    if (borderSliderList[4][2]) {
        $parent.css({ "border-left-width": space });
        $('#' + borderSliderList[4][0]).slider('value', space);
        $('#' + borderSliderList[4][1]).text(space);
    }
    if (!borderSliderList[1][2] && !borderSliderList[2][2] && !borderSliderList[3][2] && !borderSliderList[4][2]) {
        $parent.css({ "border-width": space });
    }
}
function BorderTop(space, $parent) {
    $parent.css({ "border-top-width": space });
    BorderBulkNull();
}
function BorderRight(space, $parent) {
    $parent.css({ "border-right-width": space });
    BorderBulkNull();
}
function BorderBottom(space, $parent) {
    $parent.css({ "border-bottom-width": space });
    BorderBulkNull();
}
function BorderLeft(space, $parent) {
    $parent.css({ "border-left-width": space });
    BorderBulkNull();
}
function BorderBulkNull() {
    $('#' + borderSliderList[0][0]).slider('value', 0);
    $('#' + borderSliderList[0][1]).text(0);
}
function GeneralBorderEvents($parent) {
    $('#borderStyle').on('change', function () {
        var style = $(this).val();
        $parent.css('border-style', style);
        if (style === 'none') {
            $parent.css("border-width", '0px');
            $('.borderSliderCollection').hide();
            for (var i = 0; i < 5; i++) {
                $('#' + borderSliderList[i][0]).slider('value', 0);
                $('#' + borderSliderList[i][1]).text(0);
            }
        }
        else {
            $parent.css("border-width", '1px');
            for (var i = 0; i < 5; i++) {
                $('#' + borderSliderList[i][0]).slider('value', 1);
                $('#' + borderSliderList[i][1]).text(1);
            }
            $('.borderSliderCollection').show();
        }
    });
    if (typeof ($parent[0]) !== "undefined") {
        if (typeof ($parent[0].style) !== "undefined") {
            var borderStyle = $parent[0].style.borderStyle;
            if (borderStyle.length == 0)
                borderStyle = 'none';
            $('#borderStyle').val(borderStyle);
            if (borderStyle == 'none') {
                $('.borderSliderCollection').hide();
            } else {
                $('.borderSliderCollection').show();
            }
        }
    }
    LoadBorderInitialValue();
    var $borderWrapper = $('#borderWrapper');
    if (typeof ($borderWrapper.attr('data-max')) !== 'undefined' && typeof ($borderWrapper.attr('data-min')) !== 'undefined') {
        var maxValue = parseInt($borderWrapper.attr('data-max'));
        var minValue = parseInt($borderWrapper.attr('data-min'));
        for (var i = 0; i < 5; i++) {
            if (borderSliderList[i][2]) {
                AdvanceSageSlider($('#' + borderSliderList[i][0]), $('#' + borderSliderList[i][1]), minValue, maxValue, borderSliderList[i][4], borderSliderList[i][3], $parent, 'px');
            }
        }
    }
    function LoadBorderInitialValue() {
        var times = 1;
        if (typeof ($('#borderWrapper').attr('data-times')) !== 'undefined')
            times = parseInt($('#borderWrapper').attr('data-times'));
        if (times == 0)
            times = 1;

        var topWidth = 0, rightWidth = 0, bottomWidth = 0, leftWidth = 0;

        topWidth = $parent.css("border-top-width");
        if (typeof (topWidth) != 'undefined')
            topWidth = parseInt(topWidth.replace('px', ''));
        topWidth = topWidth / times;
        borderSliderList[1][4] = topWidth;


        rightWidth = $parent.css("border-right-width");
        if (typeof (rightWidth) != 'undefined')
            rightWidth = parseInt(rightWidth.replace('px', ''));
        rightWidth = rightWidth / times;
        borderSliderList[2][4] = rightWidth;

        bottomWidth = $parent.css("border-bottom-width");
        if (typeof (bottomWidth) != 'undefined')
            bottomWidth = parseInt(bottomWidth.replace('px', ''));
        bottomWidth = bottomWidth / times;
        borderSliderList[3][4] = bottomWidth;

        leftWidth = $parent.css("border-left-width");
        if (typeof (leftWidth) != 'undefined')
            leftWidth = parseInt(leftWidth.replace('px', ''));
        leftWidth = leftWidth / times;
        borderSliderList[4][4] = leftWidth;

        if (borderSliderList[1][4] === borderSliderList[2][4] &&
            borderSliderList[3][4] === borderSliderList[4][4] &&
            borderSliderList[1][4] === borderSliderList[4][4])
            borderSliderList[0][4] = borderSliderList[1][4];
    }
    LoadBorderColor();
    BorderColorEvents();
    function BorderColorEvents() {
        var colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                var objColor = RenderCallBackColor(this);
                var colorPickerID = $elm.attr('id');
                if (colorPickerID === borderSliderList[0][5]) {
                    $parent.css('border-top-color', objColor.bgColor);
                    $parent.css('border-right-color', objColor.bgColor);
                    $parent.css('border-bottom-color', objColor.bgColor);
                    $parent.css('border-left-color', objColor.bgColor);

                    LoadBorderColor();
                }
                else if (colorPickerID === borderSliderList[1][5]) {
                    $parent.css('border-top-color', objColor.bgColor);
                }
                else if (colorPickerID === borderSliderList[2][5]) {
                    $parent.css('border-right-color', objColor.bgColor);
                }
                else if (colorPickerID === borderSliderList[3][5]) {
                    $parent.css('border-bottom-color', objColor.bgColor);
                }
                else if (colorPickerID === borderSliderList[4][5]) {
                    $parent.css('border-left-color', objColor.bgColor);
                }
            }
        });
        $('.borderColorChoose').colorPicker(colorPickerOption);
    }
    function LoadBorderColor() {
        var borderTopColor = $parent.css('border-top-color');
        var borderRightColor = $parent.css('border-right-color');
        var borderBottomColor = $parent.css('border-bottom-color');
        var borderLeftColor = $parent.css('border-left-color');
        $('#' + borderSliderList[1][5]).css('background-color', borderTopColor);
        $('#' + borderSliderList[2][5]).css('background-color', borderRightColor);
        $('#' + borderSliderList[3][5]).css('background-color', borderBottomColor);
        $('#' + borderSliderList[4][5]).css('background-color', borderLeftColor);
        if (borderTopColor === borderRightColor && borderBottomColor === borderLeftColor && borderTopColor === borderLeftColor)
            $('#' + borderSliderList[0][5]).css('background-color', borderTopColor);
        else
            $('#' + borderSliderList[0][5]).css('background-color', '#000');

    }
}
function GeneralBoxRadiusDOM($options) {
    var boxRadiusDOM = '';
    if (typeof ($options !== 'undefined')) {
        boxRadiusDOM += DOMCreate('h4', 'Box Radius', '', 'boxRadiusWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', 'data-times="' + $options['times'] + '"']);
        var boxRadiusSliderCollection = '';
        var positionList = $options['position'];
        var positionLength = positionList.length;
        for (var i = 0; i < positionLength; i++) {
            switch (positionList[i].toLowerCase()) {
                case 'all':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[0][0], boxRadiusSliderList[0][1], 'Bulk', boxRadiusSliderList[0][5]);
                    boxRadiusSliderList[0][2] = true;
                    break;
                case 'top-left':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[1][0], boxRadiusSliderList[1][1], 'Top-Left', boxRadiusSliderList[1][5]);
                    boxRadiusSliderList[1][2] = true;
                    break;
                case 'top-right':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[2][0], boxRadiusSliderList[2][1], 'Top- Right', boxRadiusSliderList[2][5]);
                    boxRadiusSliderList[2][2] = true;
                    break;
                case 'bottom-left':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[3][0], boxRadiusSliderList[3][1], 'Bottom-Left', boxRadiusSliderList[3][5]);
                    boxRadiusSliderList[3][2] = true;
                    break;
                case 'bottom-right':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[4][0], boxRadiusSliderList[4][1], 'Bottom-Right', boxRadiusSliderList[4][5]);
                    boxRadiusSliderList[4][2] = true;
                    break;
            }
        }
        boxRadiusDOM = FieldRowDOMCreate(boxRadiusDOM + boxRadiusSliderCollection);
    }
    return boxRadiusDOM;
}
function BoxRadiusBulk(space, $parent) {

    if (boxRadiusSliderList[1][2]) {
        $parent.css({ "border-top-left-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-top-left-radius": space });
        $('#' + boxRadiusSliderList[1][0]).slider('value', space);
        $('#' + boxRadiusSliderList[1][1]).text(space);
    }
    if (boxRadiusSliderList[2][2]) {
        $parent.css({ "border-top-right-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-top-right-radius": space });
        $('#' + boxRadiusSliderList[2][0]).slider('value', space);
        $('#' + boxRadiusSliderList[2][1]).text(space);
    }
    if (boxRadiusSliderList[3][2]) {
        $parent.css({ "border-bottom-left-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-left-radius": space });
        $('#' + boxRadiusSliderList[3][0]).slider('value', space);
        $('#' + boxRadiusSliderList[3][1]).text(space);
    }
    if (boxRadiusSliderList[4][2]) {
        $parent.css({ "border-bottom-right-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-right-radius": space });
        $('#' + boxRadiusSliderList[4][0]).slider('value', space);
        $('#' + boxRadiusSliderList[4][1]).text(space);
    }
    if (!boxRadiusSliderList[1][2] && !boxRadiusSliderList[2][2] && !boxRadiusSliderList[3][2] && !boxRadiusSliderList[4][2]) {
        $parent.css({ "border-radius": space });
    }
}
function BoxRadiusTopLeft(space, $parent) {
    $parent.css({ "border-top-left-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-top-left-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusTopRight(space, $parent) {
    $parent.css({ "border-top-right-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-top-right-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusBottomLeft(space, $parent) {
    $parent.css({ "border-bottom-left-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-left-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusBottomRight(space, $parent) {
    $parent.css({ "border-bottom-right-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-right-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusBulkNull() {
    $('#' + boxRadiusSliderList[0][0]).slider('value', 0);
    $('#' + boxRadiusSliderList[0][1]).text(0);
}

function GeneralBoxRadiusEvents($parent) {
    function LoadBoxRadiusInitialValue() {
        var times = 1;
        if (typeof ($('#boxRadiusWrapper').attr('data-times')) !== 'undefined')
            times = parseInt($('#boxRadiusWrapper').attr('data-times'));
        if (times == 0)
            times = 1;


        var topleft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0;

        topleft = $parent.css("border-top-left-radius");
        if (typeof (topleft) != 'undefined')
            topleft = parseInt(topleft.replace('px', ''));
        topleft = topleft / times;
        boxRadiusSliderList[1][4] = topleft;

        topRight = $parent.css("border-top-right-radius");
        if (typeof (topRight) != 'undefined')
            topRight = parseInt(topRight.replace('px', ''));
        topRight = topRight / times;
        boxRadiusSliderList[2][4] = topRight;

        bottomLeft = $parent.css("border-bottom-left-radius");
        if (typeof (bottomLeft) != 'undefined')
            bottomLeft = parseInt(bottomLeft.replace('px', ''));
        bottomLeft = bottomLeft / times;
        boxRadiusSliderList[3][4] = bottomLeft;

        bottomRight = $parent.css("border-bottom-right-radius");
        if (typeof (bottomRight) != 'undefined')
            bottomRight = parseInt(bottomRight.replace('px', ''));
        bottomRight = bottomRight / times;
        boxRadiusSliderList[4][4] = bottomRight;

        if (boxRadiusSliderList[1][4] === boxRadiusSliderList[2][4] && boxRadiusSliderList[3][4] === boxRadiusSliderList[4][4] && boxRadiusSliderList[1][4] === boxRadiusSliderList[4][4])
            boxRadiusSliderList[0][4] = boxRadiusSliderList[1][4];
    }

    LoadBoxRadiusInitialValue();
    var $boxRadiusWrapper = $('#boxRadiusWrapper');
    if (typeof ($boxRadiusWrapper.attr('data-max')) !== 'undefined' && typeof ($boxRadiusWrapper.attr('data-min')) !== 'undefined') {
        var maxValue = parseInt($boxRadiusWrapper.attr('data-max'));
        var minValue = parseInt($boxRadiusWrapper.attr('data-min'));
        for (var i = 0; i < 5; i++) {
            if (boxRadiusSliderList[i][2]) {
                AdvanceSageSlider($('#' + boxRadiusSliderList[i][0]), $('#' + boxRadiusSliderList[i][1]), minValue, maxValue, boxRadiusSliderList[i][4], boxRadiusSliderList[i][3], $parent, 'px');
            }
        }
    }
}
function GeneralBoxShadowDOM($options) {
    var boxShadowDOM = '';
    boxShadowDOM += DOMCreate('h4', 'Box Shadow', '', 'BoxShadowWrap');
    boxShadowDOM += CreateCheckboxDOM('Activate Box Shadow', 'ShowBoxShadowOption', 'ShowBoxShadowOption');
    var sliderDOM = '';
    var boxOptions = Object.keys($options);
    var boxOptionslen = boxOptions.length;
    sliderDOM = CreateSliderDOM(boxShadowSliderList[0][0], boxShadowSliderList[0][1], 'Horizontal Length');
    sliderDOM += CreateSliderDOM(boxShadowSliderList[1][0], boxShadowSliderList[1][1], 'Vertical Length');
    sliderDOM += CreateSliderDOM(boxShadowSliderList[2][0], boxShadowSliderList[2][1], 'Blur Radius');
    sliderDOM += CreateColorPickerDOM('Shadow Color', 'shadowColor', 'shadowColor');
    sliderDOM += CreateCheckboxDOM('Inset', 'boxshadowInset', 'boxshadowInset');
    sliderDOM = DOMCreate('div', sliderDOM, 'boxShadowEffects', '', ['style="display:none;"']);
    var horiMaxLen = 100, horiMinLen = -100;
    var vertiMaxLen = 100, vertiMinLen = -100;
    var blurMaxLen = 100, blurMinLen = 0;
    sliderDOM += '<input type="hidden" id="boxShadowMinMax" data-hori-min="' + horiMinLen;
    sliderDOM += '" data-hori-max="' + horiMaxLen;
    sliderDOM += '" data-verti-min="' + vertiMinLen + '" data-verti-max="' + vertiMaxLen;
    sliderDOM += '" data-blur-min="' + blurMinLen + '" data-blur-max="' + blurMaxLen + '" />';
    boxShadowDOM += sliderDOM;
    boxShadowDOM = FieldRowDOMCreate(boxShadowDOM);
    return boxShadowDOM;
}
function GeneralBoxShadowEvents($parent) {

    var objBoxShadow = {
        'inset': 'false',
        'horizontal': '0',
        'vertical': '1',
        'blur': '5',
        'color': defaultColor,
    };
    var boxShadow = $parent.css('box-shadow');
    $('#shadowColor').css('background-color', '#000');
    if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
        var horiLen = objBoxShadow.horizontal;
        var verLen = objBoxShadow.vertical;
        var blurRadius = objBoxShadow.blur;
        var lenCol = boxShadow.match(/-?\d{1,3}px/g);
        horiLen = parseInt(lenCol[0].replace('px', ''));
        verLen = parseInt(lenCol[1].replace('px', ''));
        blurRadius = parseInt(lenCol[2].replace('px', ''));
        objBoxShadow.horizontal = horiLen;
        objBoxShadow.vertical = verLen;
        objBoxShadow.blur = blurRadius;
        $('.boxShadowEffects').show();
        $('#ShowBoxShadowOption').prop('checked', true);
        var dropColor = boxShadow.replace(horiLen + 'px', '').replace(verLen + 'px', '').replace(blurRadius + 'px', '');
        dropColor = dropColor.replace('inset', '').trim();
        if (dropColor.length > 0) {
            objBoxShadow.color = dropColor;
            $('#shadowColor').css('background-color', dropColor);
        }
        var hasInset = boxShadow.match(/inset/);
        if (hasInset !== null && hasInset.length > 0) {
            $('#boxshadowInset').prop('checked', true);
        }
        else {
            $('#boxshadowInset').prop('checked', false);
        }
    }
    else {
        $('.boxShadowEffects').hide();
        $('#ShowBoxShadowOption').prop('checked', false);
        $('#shadowColor').css('background-color', '#000');
    }
    function parentBoxShadow() {
        var shadowDOM = '';
        shadowDOM += objBoxShadow.color + ' ';
        shadowDOM += objBoxShadow.horizontal + 'px ';
        shadowDOM += objBoxShadow.vertical + 'px ';
        shadowDOM += objBoxShadow.blur + 'px ';
        if ($('#boxshadowInset').prop('checked')) {
            shadowDOM += 'inset ';
        }
        $parent.css({ 'box-shadow': shadowDOM });
    }
    $('#boxshadowInset').off().on('click', function () {
        parentBoxShadow();
    });
    $('#ShowBoxShadowOption').off().on('click', function () {
        if ($(this).is(':checked')) {
            $('.boxShadowEffects').slideDown(400);
            objBoxShadow.color = $('#shadowColor').css('background-color');
            parentBoxShadow();
        }
        else {
            $('.boxShadowEffects').slideUp(400);
            $parent.css({ 'box-shadow': '' });
        }
    });
    var horiMaxLen = parseInt($('#boxShadowMinMax').attr('data-hori-max'));
    var horiMinLen = parseInt($('#boxShadowMinMax').attr('data-hori-min'));
    var vertiMaxLen = parseInt($('#boxShadowMinMax').attr('data-verti-max'));
    var vertiMinLen = parseInt($('#boxShadowMinMax').attr('data-verti-min'));
    var blurMaxLen = parseInt($('#boxShadowMinMax').attr('data-blur-max'));
    var blurMinLen = parseInt($('#boxShadowMinMax').attr('data-blur-min'));
    function BoxShadowHoriLengthSlide(space, $parent) {
        objBoxShadow.horizontal = space;
        parentBoxShadow();
    }
    AdvanceSageSlider($('#' + boxShadowSliderList[0][0]), $('#' + boxShadowSliderList[0][1]), horiMinLen, horiMaxLen, horiLen, BoxShadowHoriLengthSlide, $parent, 'px');

    function BoxShadowVerticalLengthSlide(space) {
        objBoxShadow.vertical = space;
        parentBoxShadow();
    }
    AdvanceSageSlider($('#' + boxShadowSliderList[1][0]), $('#' + boxShadowSliderList[1][1]), vertiMinLen, vertiMaxLen, verLen, BoxShadowVerticalLengthSlide, $parent, 'px');

    function BoxShadowBlurSlide(space) {
        objBoxShadow.blur = space;
        parentBoxShadow();
    }
    AdvanceSageSlider($('#' + boxShadowSliderList[2][0]), $('#' + boxShadowSliderList[2][1]), blurMinLen, blurMaxLen, blurRadius, BoxShadowBlurSlide, $parent, 'px');

    var colorPickerOption = ColorPickerOption({
        renderCallback: function ($elm, toggled) {
            var objColor = RenderCallBackColor(this);
            objBoxShadow.color = objColor.bgColor;
            parentBoxShadow();
        }
    });
    $('#shadowColor').colorPicker(colorPickerOption);
}
function GeneralHoverEffectDOM($options) {
    var hoverDOM = '';
    hoverDOM += DOMCreate('h4', 'Hover Effect', '', 'hoverEffectWrap');
    hoverDOM += CreateCheckboxDOM('Activate Hover Effect', 'hoverEffectOption', 'hoverEffectOption');
    hoverDOM += '<div class="field-row clearfix" id="hoverEffectOptionWrap" style="display:none;">';
    var colorEffect = $options["color"];
    if (typeof (colorEffect) !== "undefined" && colorEffect.length > 0) {
        var colorLength = colorEffect.length;
        for (var i = 0; i < colorLength; i++) {
            switch (colorEffect[i].toLowerCase()) {
                case 'background':
                    hoverDOM += CreateColorPickerDOM('Background Color', 'hoverBGColor', 'hoverColor');
                    break;
                case 'text':
                    hoverDOM += CreateColorPickerDOM('Text Color', 'hoverTextColor', 'hoverColor');
            }
        }
    }
    var showShadow = $options["shadow"];
    if (typeof (showShadow) !== "undefined" && showShadow === "on") {
        hoverDOM += GeneralHoverEffectBoxShadowDOM($options);
    }
    var showHover = $options["border"];
    if (typeof (showHover) !== "undefined") {
        hoverDOM += GeneralBorderHoverDOM($options);
    }
    var showZoom = $options["zoom"];
    if (typeof (showZoom) !== "undefined" && showZoom === "on") {
        hoverDOM += CreateSliderDOM('HoverZoomSlider', 'HoverZoomSliderHandle', 'Zoom');
    }
    hoverDOM += '</div>';
    hoverDOM = FieldRowDOMCreate(hoverDOM);

    function GeneralHoverEffectBoxShadowDOM($options) {
        var boxShadowDOM = '';
        boxShadowDOM += CreateCheckboxDOM('Activate Box Shadow', 'ShowBoxShadowEffectOption', 'ShowBoxShadowShadowEffectOption');
        var sliderDOM = '';
        var boxOptions = Object.keys($options);
        var boxOptionslen = boxOptions.length;
        sliderDOM = CreateSliderDOM(boxShadowEffectSliderList[0][0], boxShadowEffectSliderList[0][1], 'Horizontal Length');
        sliderDOM += CreateSliderDOM(boxShadowEffectSliderList[1][0], boxShadowEffectSliderList[1][1], 'Vertical Length');
        sliderDOM += CreateSliderDOM(boxShadowEffectSliderList[2][0], boxShadowEffectSliderList[2][1], 'Blur Radius');
        sliderDOM += CreateColorPickerDOM('Shadow Color', 'shadowEffectColor', 'shadowEffectColor');
        sliderDOM += CreateCheckboxDOM('Inset', 'boxshadowEffectInset', 'boxshadowEffectInset');
        sliderDOM = DOMCreate('div', sliderDOM, 'boxShadowEffectWrappers', '', ['style="display:none;"']);
        var horiMaxLen = 100, horiMinLen = -100;
        var vertiMaxLen = 100, vertiMinLen = -100;
        var blurMaxLen = 100, blurMinLen = 0;

        sliderDOM += '<input type="hidden" id="boxShadowEffectMinMax" data-hori-min="' + horiMinLen;
        sliderDOM += '" data-hori-max="' + horiMaxLen;
        sliderDOM += '" data-verti-min="' + vertiMinLen + '" data-verti-max="' + vertiMaxLen;
        sliderDOM += '" data-blur-min="' + blurMinLen + '" data-blur-max="' + blurMaxLen + '" />';
        boxShadowDOM += sliderDOM;
        boxShadowDOM = FieldRowDOMCreate(boxShadowDOM);
        return boxShadowDOM;
    }

    function GeneralBorderHoverDOM($border) {
        var borderHoverDOM = "";
        if (typeof ($border) !== 'undefined') {
            var $options = $border['border'];
            if (typeof ($options) !== 'undefined') {
                borderHoverDOM += DOMCreate('h4', 'Border', '', 'borderHoverWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', "style=display:none;", 'data-times="' + $options['times'] + '"']);
                var selectDOM = DOMCreate('label', 'Border Hover Style') + SelectDOMCreate('borderHoverStyle', 'BorderHoverStyle', [['none', 'None'], ['solid', 'Solid'], ['dashed', 'Dashed'], ['dotted', 'Dotted'], ['double', 'Double']]);
                borderHoverDOM += FieldRowDOMCreate(selectDOM);
                var borderHoverSliderCollection = '';
                var positionList = $options['position'];
                if (typeof (positionList) !== "undefined") {
                    var positionLength = positionList.length;
                    for (var i = 0; i < positionLength; i++) {
                        switch (positionList[i].toLowerCase()) {
                            case 'all':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[0][0], borderHoverSliderList[0][1], 'Bulk Border', borderHoverSliderList[0][5], 'borderHoverColorChoose');
                                borderHoverSliderList[0][2] = true;
                                break;
                            case 'top':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[1][0], borderHoverSliderList[1][1], 'Top Border', borderHoverSliderList[1][5], 'borderHoverColorChoose');
                                borderHoverSliderList[1][2] = true;
                                break;
                            case 'right':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[2][0], borderHoverSliderList[2][1], 'Right Border', borderHoverSliderList[2][5], 'borderHoverColorChoose');
                                borderHoverSliderList[2][2] = true;
                                break;
                            case 'bottom':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[3][0], borderHoverSliderList[3][1], 'Bottom Border', borderHoverSliderList[3][5], 'borderHoverColorChoose');
                                borderHoverSliderList[3][2] = true;
                                break;
                            case 'left':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[4][0], borderHoverSliderList[4][1], 'Left Border', borderHoverSliderList[4][5], 'borderHoverColorChoose');
                                borderHoverSliderList[4][2] = true;
                                break;
                        }
                    }
                    borderHoverSliderCollection = DOMCreate('div', borderHoverSliderCollection, 'borderHoverSliderCollection', '', ['style="display:none;"']);
                    borderHoverDOM = FieldRowDOMCreate(borderHoverDOM + borderHoverSliderCollection);
                }
            }
        }
        return borderHoverDOM;
    }
    return hoverDOM;
}
function MouseOverEffect($parent) {
    function ApplyEffects($this) {
        var previousdata = {
            "bg": $this.css('background-color'),
            "font": "#000",
            "box": {
                "on": "off",
                "hl": "0px",
                "vl": "1px",
                "br": "5px",
                "c": "#000",
                "i": "false",
            },
            "border": {
                "on": "off",
                "top": "0",
                "right": "0",
                "bottom": "0",
                "left": "0",
                "tc": "#000",
                "rc": "#000",
                "bc": "#000",
                "lc": "#000"
            },
            "zoom": null
        };
        var hoverEffect = JSON.parse($this.attr('data-hovereffect'));
        if ($this.find('.onhoverbgcolor').length > 0) {
            previousdata.bg = $this.find('.onhoverbgcolor').eq(0).css('background-color');
            $this.find('.onhoverbgcolor').css({ 'background-color': hoverEffect.bg });
        }
        else {
            previousdata.bg = $this.css('background-color');
            $this.css({ 'background-color': hoverEffect.bg });
        }
        if ($this.find('.onhovercolor').length > 0) {
            previousdata.font = $this.find('.onhovercolor').eq(0).css('color');
            $this.find('.onhovercolor').css({ 'color': hoverEffect.font });
        }
        else {
            previousdata.font = $this.css('color');
            $this.css({ 'color': hoverEffect.font });
        }
        var zoomClass = $this.attr('class').match(/scale-[0-1]-[0-9]/g);
        if (zoomClass !== null) {
            $this.removeClass(zoomClass[0]);
            previousdata.zoom = zoomClass[0];
        }
        var zoom = hoverEffect.zoom;
        $this.addClass('scale-' + parseInt(zoom / 10) + '-' + (zoom % 10));
        var $shadow = hoverEffect.box;
        function ParentBoxShadow() {
            previousdata.box.on = "off";
            var boxShadow = $this.css('box-shadow');
            if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
                previousdata.box.on = "on";
                var lenCol = boxShadow.match(/-?\d{1,3}px/g);
                previousdata.box.hl = lenCol[0] + ' ';// parseInt(lenCol[0].replace('px', ''));
                previousdata.box.vl = lenCol[1] + ' ';//parseInt(lenCol[1].replace('px', ''));
                previousdata.box.br = lenCol[2] + ' ';// parseInt(lenCol[2].replace('px', ''));
                var inset = '';
                var hasInset = boxShadow.match(/inset/);
                if (hasInset !== null && hasInset.length > 0) {
                    inset = ' inset ';
                }
                previousdata.box.i = inset;
                var spreadDistace = '';
                if (lenCol.length == 4)
                    spreadDistace = lenCol[3];
                var dropColor = boxShadow.replace(previousdata.box.hl, '')
                      .replace(previousdata.box.vl, '')
                      .replace(previousdata.box.br, '')
                      .replace(spreadDistace, '')
                      .replace('inset', '').trim();
                if (dropColor.length > 0) {
                    previousdata.box.c = dropColor;
                }
            }
            if ($shadow.on === "on") {
                var shadowDOM = '';
                shadowDOM += $shadow.c;
                shadowDOM += $shadow.hl;
                shadowDOM += $shadow.vl;
                shadowDOM += $shadow.br;
                shadowDOM += $shadow.i;
                $this.css({ 'box-shadow': shadowDOM });
            }
        }
        var $border = hoverEffect.border;
        function BorderOnHover() {

            previousdata.border.on = $this.css("border-top-style");
            previousdata.border.top = $this.css("border-top-width");
            previousdata.border.right = $this.css("border-right-width");
            previousdata.border.bottom = $this.css("border-bottom-width");
            previousdata.border.left = $this.css("border-left-width");

            previousdata.border.tc = $this.css('border-top-color');
            previousdata.border.rc = $this.css('border-right-color');
            previousdata.border.bc = $this.css('border-bottom-color');
            previousdata.border.lc = $this.css('border-left-color');

            if ($border.on !== "none") {
                $this.css({
                    "border-style": $border.on,
                    "border-top-width": $border.top,
                    "border-right-width": $border.right,
                    "border-bottom-width": $border.bottom,
                    "border-left-width": $border.left,
                    'border-top-color': $border.tc,
                    'border-right-color': $border.rc,
                    'border-bottom-color': $border.bc,
                    'border-left-color': $border.lc
                });
            }
        }
        ParentBoxShadow();
        BorderOnHover();
        $this.attr('data-prevhovereffect', JSON2.stringify(previousdata));
    }

    function ResetPreviousEffect($this) {
        var hoverEffect = JSON.parse($this.attr('data-prevhovereffect'));
        $this.css({ 'background-color': hoverEffect.bg });
        if ($this.find('.onhoverbgcolor').length > 0) {
            $this.find('.onhoverbgcolor').css({ 'background-color': hoverEffect.bg });
        }
        else {
            $this.css({ 'background-color': hoverEffect.bg });
        }
        if ($this.find('.onhovercolor').length > 0) {
            $this.find('.onhovercolor').css({ 'color': hoverEffect.font });
        }
        else {
            $this.css({ 'color': hoverEffect.font });
        }

        $this.removeAttr('data-prevhovereffect');
        var zoomClass = $this.attr('class').match(/scale-[0-1]-[0-9]/g);
        if (zoomClass !== null) {
            $this.removeClass(zoomClass[0]);
        }
        if (typeof (hoverEffect.zoom) !== "undefined") {
            $this.addClass(hoverEffect.zoom);
        }
        var $shadow = hoverEffect.box;
        if ($shadow.on === "on") {
            var shadowDOM = '';
            shadowDOM += $shadow.c;
            shadowDOM += $shadow.hl;
            shadowDOM += $shadow.vl;
            shadowDOM += $shadow.br;
            shadowDOM += $shadow.i;
            $this.css({ 'box-shadow': shadowDOM });
        }
        else {
            $this.css({ 'box-shadow': '' });
        }
        var $border = hoverEffect.border;
        $this.css({
            "border-style": $border.on,
            "border-top-width": $border.top,
            "border-right-width": $border.right,
            "border-bottom-width": $border.bottom,
            "border-left-width": $border.left,
            'border-top-color': $border.tc,
            'border-right-color': $border.rc,
            'border-bottom-color': $border.bc,
            'border-left-color': $border.lc
        });
    }
    var $selected = $('.hovered');
    if (typeof ($parent) !== "undefined") {
        if ($parent.hasClass('hovered'))
            $selected = $parent;
        else if ($parent.find('.hovered').length > 0)
            $selected = $parent.find('.hovered').eq(0);
    }
    $selected.off('mouseout').on('mouseout', function () {
        ResetPreviousEffect($(this));
    });
    $selected.off('mouseover').on('mouseover', function () {
        ApplyEffects($(this));
    });
}
function RemoveMouseOverEffect($parent) {
    if (typeof ($parent) !== "undefined") {
        if ($parent.hasClass('hovered')) {
            $parent.off('mouseover').off('mouseout').removeClass('hovered');
        }
        else if ($parent.find('.hovered').length > 0) {
            var $selected = $parent.find('.hovered');
            $selected[0].off('mouseover').off('mouseout').removeClass('hovered');
            $selected.each(function (i, v) {
                v.off('mouseover').off('mouseout').removeClass('hovered');
            });
        }
    }
    else
        $('.hovered').off('mouseover').off('mouseout').removeClass('hovered');
}
function BorderHoverBulk(space, $parent) {
    if (borderHoverSliderList[1][2]) {
        hoverEffect.border.top = space;
        $('#' + borderHoverSliderList[1][0]).slider('value', space);
        $('#' + borderHoverSliderList[1][1]).text(space);
    }
    if (borderHoverSliderList[2][2]) {
        hoverEffect.border.right = space;
        $('#' + borderHoverSliderList[2][0]).slider('value', space);
        $('#' + borderHoverSliderList[2][1]).text(space);
    }
    if (borderHoverSliderList[3][2]) {
        hoverEffect.border.bottom = space;
        $('#' + borderHoverSliderList[3][0]).slider('value', space);
        $('#' + borderHoverSliderList[3][1]).text(space);
    }
    if (borderHoverSliderList[4][2]) {
        hoverEffect.border.left = space;
        $('#' + borderHoverSliderList[4][0]).slider('value', space);
        $('#' + borderHoverSliderList[4][1]).text(space);
    }
    UpdateEffect($parent);
}
function BorderHoverTop(space, $parent) {
    hoverEffect.border.top = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverRight(space, $parent) {
    hoverEffect.border.right = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverBottom(space, $parent) {
    hoverEffect.border.bottom = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverLeft(space, $parent) {
    hoverEffect.border.left = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverBulkNull($parent) {
    $('#' + borderHoverSliderList[0][0]).slider('value', 0);
    $('#' + borderHoverSliderList[0][1]).text(0);
    UpdateEffect($parent);
}
var hoverEffect = {
    "bg": "#ccc",
    "font": "#000",
    "box": {
        "on": "off",
        "hl": "0px",
        "vl": "1px",
        "br": "5px",
        "c": "#000",
        "i": "false",
    },
    "border": {
        "on": "none",
        "top": "0",
        "right": "0",
        "bottom": "0",
        "left": "0",
        "tc": "#000",
        "rc": "#000",
        "bc": "#000",
        "lc": "#000"
    },
    "zoom": "10",
    "delay": 0
};
function UpdateEffect($parent) {
    $parent.attr('data-hovereffect', JSON2.stringify(hoverEffect));
}
function GeneralIconHoverEffectEvent($parent) {
    InitEvents();
    function InitEvents() {
        GeneralBoxShadowEffectEvents($parent);
        GeneralBorderHoverEvents($parent);
        $('#hoverEffectOption').off().on('click', function () {
            if ($(this).is(':checked')) {
                $('#hoverEffectOptionWrap').show();
                $parent.addClass('hovered');
                hoverEffect = {
                    "bg": "#ccc",
                    "font": "#000",
                    "box": {
                        "on": "off",
                        "hl": "0px",
                        "vl": "1px",
                        "br": "5px",
                        "c": "#000",
                        "i": "false",
                    },
                    "border": {
                        "on": "none",
                        "top": "0",
                        "right": "0",
                        "bottom": "0",
                        "left": "0",
                        "tc": "#000",
                        "rc": "#000",
                        "bc": "#000",
                        "lc": "#000"
                    },
                    "zoom": "10",
                    "delay": 0
                };
                MouseOverEffect($parent);
                UpdateEffect($parent);
                InitializeEffecValue();
            }
            else {
                $('#hoverEffectOptionWrap').hide();
                RemoveMouseOverEffect($parent);
            }
        });
        var colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                var objColor = RenderCallBackColor(this);
                var colorPickerID = $elm.attr('id');
                switch (colorPickerID) {
                    case 'hoverBGColor':
                        hoverEffect.bg = objColor.bgColor;
                        break;
                    case 'hoverTextColor':
                        hoverEffect.font = objColor.bgColor;
                        break;
                }
                UpdateEffect($parent);
            }
        });
        $('.hoverColor').colorPicker(colorPickerOption);
        function OnZoom(space) {
            hoverEffect.zoom = space;
            UpdateEffect($parent);
        }
        AdvanceSageSlider($('#HoverZoomSlider'), $('#HoverZoomSliderHandle'), 1, 20, 10, OnZoom, $parent, '');
        if ($parent.hasClass('hovered')) {
            InitializeEffecValue();
            $('#hoverEffectOption').prop('checked', true);
            $('#hoverEffectOptionWrap').show();
        }
        else {
            $('#hoverEffectOption').prop('checked', false);
        }
    }

    function InitializeEffecValue() {
        var initHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
        $('#hoverBGColor').css('background-color', initHoverEffect.bg);
        $('#hoverTextColor').css('background-color', initHoverEffect.font);
        var effectZoom = initHoverEffect.zoom;
        ChangeSliderValue($('#HoverZoomSlider'), effectZoom);
        var shadowon = initHoverEffect.box.on;
        if (shadowon == "on") {
            $('.boxShadowEffectWrappers').show();
            $('#ShowBoxShadowEffectOption').prop('checked', true);
        }
        else {
            $('.boxShadowEffectWrappers').hide();
            $('#ShowBoxShadowEffectOption').prop('checked', false);
        }
    }

    function GeneralBoxShadowEffectEvents($parent) {

        $('#boxshadowEffectInset').off().on('click', function () {
            parentBoxShadow();
        });
        $('#ShowBoxShadowEffectOption').off().on('click', function () {
            if ($(this).is(':checked')) {
                $('.boxShadowEffectWrappers').slideDown(400);
                hoverEffect.box.on = "on";
                parentBoxShadow();
            }
            else {
                $('.boxShadowEffectWrappers').slideUp(400);
                hoverEffect.box.on = "off";
                parentBoxShadow();
            }
        });
        var objBoxShadow = {
            'inset': '',
            'horizontal': '5',
            'vertical': '5',
            'blur': '10',
            'color': '#000',
        };
        var boxShadow = $parent.attr('data-hovereffect');
        $('#shadowEffectColor').css('background-color', '#000');
        if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
            var initHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
            var $shadow = initHoverEffect.box;
            var horiLen = $shadow.hl;
            var verLen = $shadow.vl;
            var blurRadius = $shadow.br;
            horiLen = parseInt(horiLen.replace('px', ''));
            verLen = parseInt(verLen.replace('px', ''));
            blurRadius = parseInt(blurRadius.replace('px', ''));
            objBoxShadow.horizontal = horiLen;
            objBoxShadow.vertical = verLen;
            objBoxShadow.blur = blurRadius;
            $('.boxShadowEffectWrappers').show();
            $('#ShowBoxShadowEffectOption').prop('checked', true);
            $('#shadowEffectColor').css('background-color', $shadow.c);
            var inset = $shadow.i;
            if (inset == "true") {
                $('#boxshadowEffectInset').prop('checked', true);
            }
            else {
                $('#boxshadowEffectInset').prop('checked', false);
            }
        }
        else {
            $('.boxShadowEffectWrappers').hide();
            $('#ShowBoxShadowEffectOption').prop('checked', false);
            $('#shadowEffectColor').css('background-color', '#000');
        }
        function parentBoxShadow() {
            hoverEffect.box.c = objBoxShadow.color + ' ';
            hoverEffect.box.hl = objBoxShadow.horizontal + 'px ';
            hoverEffect.box.vl = objBoxShadow.vertical + 'px ';
            hoverEffect.box.br = objBoxShadow.blur + 'px ';
            if ($('#boxshadowEffectInset').prop('checked')) {
                hoverEffect.box.i = ' inset ';
            }
            else
                hoverEffect.box.i = '';
            UpdateEffect($parent);
        }
        var horiMaxLen = parseInt($('#boxShadowEffectMinMax').attr('data-hori-max'));
        var horiMinLen = parseInt($('#boxShadowEffectMinMax').attr('data-hori-min'));
        var vertiMaxLen = parseInt($('#boxShadowEffectMinMax').attr('data-verti-max'));
        var vertiMinLen = parseInt($('#boxShadowEffectMinMax').attr('data-verti-min'));
        var blurMaxLen = parseInt($('#boxShadowEffectMinMax').attr('data-blur-max'));
        var blurMinLen = parseInt($('#boxShadowEffectMinMax').attr('data-blur-min'));
        function BoxShadowHoriLengthSlide(space, $parent) {
            objBoxShadow.horizontal = space;
            parentBoxShadow();
        }
        AdvanceSageSlider($('#' + boxShadowEffectSliderList[0][0]), $('#' + boxShadowEffectSliderList[0][1]), horiMinLen, horiMaxLen, horiLen, BoxShadowHoriLengthSlide, $parent, 'px');

        function BoxShadowVerticalLengthSlide(space) {
            objBoxShadow.vertical = space;
            parentBoxShadow();
        }
        AdvanceSageSlider($('#' + boxShadowEffectSliderList[1][0]), $('#' + boxShadowEffectSliderList[1][1]), vertiMinLen, vertiMaxLen, verLen, BoxShadowVerticalLengthSlide, $parent, 'px');

        function BoxShadowBlurSlide(space) {
            objBoxShadow.blur = space;
            parentBoxShadow();
        }
        AdvanceSageSlider($('#' + boxShadowEffectSliderList[2][0]), $('#' + boxShadowEffectSliderList[2][1]), blurMinLen, blurMaxLen, blurRadius, BoxShadowBlurSlide, $parent, 'px');

        var colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                var objColor = RenderCallBackColor(this);
                objBoxShadow.color = objColor.bgColor;
                parentBoxShadow();
            }
        });
        $('#shadowEffectColor').colorPicker(colorPickerOption);
    }

    function GeneralBorderHoverEvents($parent) {
        $('#borderHoverStyle').on('change', function () {
            var style = $(this).val();
            var borderHoverEfffect = {
                "top": "0px",
                "right": "0px",
                "bottom": "0px",
                "left": "0px"
            };
            if (style === 'none') {
                $('.borderHoverSliderCollection').hide();
                for (var i = 0; i < 5; i++) {
                    $('#' + borderHoverSliderList[i][0]).slider('value', 0);
                    $('#' + borderHoverSliderList[i][1]).text(0);
                }
                hoverEffect.border.on = style;
                hoverEffect.border.top = "0px";
                hoverEffect.border.right = "0px";
                hoverEffect.border.bottom = "0px";
                hoverEffect.border.left = "0px";
                UpdateEffect($parent);
            }
            else {
                hoverEffect.border.on = style;
                hoverEffect.border.top = "1px";
                hoverEffect.border.right = "1px";
                hoverEffect.border.bottom = "1px";
                hoverEffect.border.left = "1px";
                for (var i = 0; i < 5; i++) {
                    $('#' + borderHoverSliderList[i][0]).slider('value', 1);
                    $('#' + borderHoverSliderList[i][1]).text(1);
                }
                UpdateEffect($parent);
                $('.borderHoverSliderCollection').show();
            }
        });

        var domHoverEffect = $parent.attr('data-hovereffect');
        if (typeof (domHoverEffect) !== "undefined" && domHoverEffect !== null && domHoverEffect !== 'none') {
            domHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
            var borderStyle = domHoverEffect.border.on;
            if (borderStyle.length == 0)
                borderStyle = 'none';
            $('#borderHoverStyle').val(borderStyle);
            if (borderStyle == 'none') {
                $('.borderHoverSliderCollection').hide();
            } else {
                $('.borderHoverSliderCollection').show();
            }
        }
        else {
            domHoverEffect = hoverEffect;
        }
        var $borderWrapper = $('#borderHoverWrapper');
        LoadBorderHoverInitialValue();
        if (typeof ($borderWrapper) !== "undefined" && typeof ($borderWrapper.attr('data-max')) !== 'undefined' && typeof ($borderWrapper.attr('data-min')) !== 'undefined') {
            var maxValue = parseInt($borderWrapper.attr('data-max'));
            var minValue = parseInt($borderWrapper.attr('data-min'));
            for (var i = 0; i < 5; i++) {
                if (borderHoverSliderList[i][2]) {
                    AdvanceSageSlider($('#' + borderHoverSliderList[i][0]), $('#' + borderHoverSliderList[i][1]), minValue, maxValue, borderHoverSliderList[i][4], borderHoverSliderList[i][3], $parent, 'px');
                }
            }
        }
        function LoadBorderHoverInitialValue() {
            var times = 1;
            if (typeof ($borderWrapper.attr('data-times')) !== 'undefined')
                times = parseInt($borderWrapper.attr('data-times'));
            if (times == 0)
                times = 1;

            var topWidth = 0, rightWidth = 0, bottomWidth = 0, leftWidth = 0;
            if (typeof (domHoverEffect) !== "undefined") {
                topWidth = domHoverEffect.border.top;
                if (typeof (topWidth) != 'undefined')
                    topWidth = parseInt(topWidth);
                topWidth = topWidth / times;
            }
            borderHoverSliderList[1][4] = topWidth;

            if (typeof (domHoverEffect) !== "undefined") {
                rightWidth = domHoverEffect.border.right;
                if (typeof (rightWidth) != 'undefined')
                    rightWidth = parseInt(rightWidth);
                rightWidth = rightWidth / times;
            }
            borderHoverSliderList[2][4] = rightWidth;

            if (typeof (domHoverEffect) !== "undefined") {
                bottomWidth = domHoverEffect.border.bottom;
                if (typeof (bottomWidth) != 'undefined')
                    bottomWidth = parseInt(bottomWidth);
                bottomWidth = bottomWidth / times;
            }
            borderHoverSliderList[3][4] = bottomWidth;

            if (typeof (domHoverEffect) !== "undefined") {
                leftWidth = domHoverEffect.border.left;
                if (typeof (leftWidth) != 'undefined')
                    leftWidth = parseInt(leftWidth);
                leftWidth = leftWidth / times;
            }
            borderHoverSliderList[4][4] = leftWidth;

            if (borderHoverSliderList[1][4] === borderHoverSliderList[2][4] &&
                borderHoverSliderList[3][4] === borderHoverSliderList[4][4] &&
                borderHoverSliderList[1][4] === borderHoverSliderList[4][4])
                borderHoverSliderList[0][4] = borderHoverSliderList[1][4];
        }
        LoadBorderHoverColor();
        BorderColorEvents();
        function BorderColorEvents() {
            var colorPickerOption = ColorPickerOption({
                renderCallback: function ($elm, toggled) {
                    var objColor = RenderCallBackColor(this);
                    var colorPickerID = $elm.attr('id');
                    if (colorPickerID === borderHoverSliderList[0][5]) {
                        hoverEffect.border.tc = objColor.bgColor;
                        hoverEffect.border.rc = objColor.bgColor;
                        hoverEffect.border.bc = objColor.bgColor;
                        hoverEffect.border.lc = objColor.bgColor;
                        $('#' + borderHoverSliderList[1][5]).css('background-color', objColor.bgColor);
                        $('#' + borderHoverSliderList[2][5]).css('background-color', objColor.bgColor);
                        $('#' + borderHoverSliderList[3][5]).css('background-color', objColor.bgColor);
                        $('#' + borderHoverSliderList[4][5]).css('background-color', objColor.bgColor);
                    }
                    else if (colorPickerID === borderHoverSliderList[1][5]) {
                        hoverEffect.border.tc = objColor.bgColor;
                    }
                    else if (colorPickerID === borderHoverSliderList[2][5]) {
                        hoverEffect.border.rc = objColor.bgColor;
                    }
                    else if (colorPickerID === borderHoverSliderList[3][5]) {
                        hoverEffect.border.bc = objColor.bgColor;
                    }
                    else if (colorPickerID === borderHoverSliderList[4][5]) {
                        hoverEffect.border.lc = objColor.bgColor;
                    }
                    UpdateEffect($parent);
                }
            });
            $('.borderHoverColorChoose').colorPicker(colorPickerOption);
        }

        function LoadBorderHoverColor() {

            var borderTopColor = blackColor, borderRightColor = blackColor, borderBottomColor = blackColor, borderLeftColor = blackColor;
            if (typeof (domHoverEffect) !== "undefined") {
                borderTopColor = domHoverEffect.border.tc;
                borderRightColor = domHoverEffect.border.rc;
                borderBottomColor = domHoverEffect.border.bc;
                borderLeftColor = domHoverEffect.border.lc;
            }
            $('#' + borderHoverSliderList[1][5]).css('background-color', borderTopColor);
            $('#' + borderHoverSliderList[2][5]).css('background-color', borderRightColor);
            $('#' + borderHoverSliderList[3][5]).css('background-color', borderBottomColor);
            $('#' + borderHoverSliderList[4][5]).css('background-color', borderLeftColor);
            if (borderTopColor === borderRightColor && borderBottomColor === borderLeftColor && borderTopColor === borderLeftColor)
                $('#' + borderHoverSliderList[0][5]).css('background-color', borderTopColor);
            else
                $('#' + borderHoverSliderList[0][5]).css('background-color', '#000');
        }
    }

}
function GeneralScrolleffect($option) {
    var scrollDOM = '';
    scrollDOM += DOMCreate('h4', 'Scroll Effect');
    var selectDOM = DOMCreate('label', 'Scroll Effect') + '<span class="value">' + SelectDOMCreate('scrolleffect', 'scrolleffect', [['none', 'None'], ['fade-up', 'fade-up'], ['fade-down', 'fade-down'], ['fade-left', 'fade-left'], ['fade-right', 'fade-right'], ['zoom-in', 'zoom-in'], ['zoom-out', 'zoom-out']]) + '</span>';// ['zoom-in', 'zoom-in'], ['flip-up', 'flip-up'], ['flip-down', 'flip-down'], ['flip-left', 'flip-left'], ['flip-right', 'flip-right']]
    selectDOM += DOMCreate('div', DOMCreate('label', 'Delay') + '<span class="value">' + SelectDOMCreate('delayscrolleffect', 'delayscrolleffect', [['0', '0'], ['50', '50'], ['100', '100'], ['200', '200'], ['300', '300'], ['400', '400'], ['800', '800'], ['1200', '1200'], ['1600', '1600'], ['1200', '1200'], ['2000', '2000'], ['2400', '2400'], ['2800', '2800'], ['3200', '3200'], ['3600', '3600'], ['4000', '4000']]), '', 'delayscrolleffectWrap') + "</span>";
    scrollDOM += FieldRowDOMCreate(selectDOM);
    scrollDOM = FieldRowDOMCreate(scrollDOM);
    return scrollDOM;
}
function GeneralScrollEffectEvent($selectedLayer) {
    InitEvents();
    function InitEvents() {
        var scrollClass = 'none';
        $('#delayscrolleffectWrap').hide();
        if ($selectedLayer.hasClass('scroll-begin')) {
            scrollClass = $selectedLayer.attr('data-scroll');
            $('#delayscrolleffectWrap').show();
        }
        $('#scrolleffect').val(scrollClass);

        var delayamount = '0';
        if ($selectedLayer.hasClass('scroll-begin') && typeof ($selectedLayer.attr('data-scrolldelay')) !== "undefined") {
            delayamount = $selectedLayer.attr('data-scrolldelay');
        }
        $('#delayscrolleffect').val(delayamount);

        $('#scrolleffect').on('change', function () {
            var value = $(this).val();
            $selectedLayer.attr('data-scroll', value);
            if (value === "none") {
                $selectedLayer.removeClass('scroll-begin');
                $selectedLayer.removeAttr('data-scroll');
                $('#delayscrolleffectWrap').hide();
            }
            else {
                $('#delayscrolleffectWrap').show();
                if (!$selectedLayer.hasClass('scroll-begin'))
                    $selectedLayer.addClass('scroll-begin');
            }

        });

        $('#delayscrolleffect').on('change', function () {
            var value = $(this).val();
            $selectedLayer.attr('data-scrolldelay', value);
        });
    }
}

var CompenentCreateDOM = '<div class="column-data-empty">';
CompenentCreateDOM += '<h4>This is Column</h4>';
CompenentCreateDOM += '<p>You can Drag and drop Components here</p>';
CompenentCreateDOM += divEnd;
var minFontSize = 1;
var maxFontsize = 100;
var minImagesize = 1;
var maxImagesize = 1080;
function CalculateWidth($parent) {
    //$parent.find('.editor-col').each(function () {
    //    var $this = $(this);
    //    var width = $this.width();
    //    var sfColVal = $this.attr('class').match(/sfCol_[0-9]{1,3}/g);
    //    if (sfColVal !== null) {
    //        var sfColPer = sfColVal[0].split('_')[1];
    //        $this.attr('data-width', width);
    //        $this.css({ 'width': 'calc( ' + sfColPer + '% - ' + dragComponetWidth + ' )' });
    //    }
    //});
}
function InitComponentStyle($currentComponent, manipulateSelector, dropped, iconStyles, defaultdata, displayStyle) {
    var option = {
        "ulClass": "sfCol_100 ",
        "liClass": "",
        "ulStyle": "",
        "liStyle": ""
    };
    option = $.extend(option, displayStyle);
    var selectDOM = '';
    $.each(iconStyles, function (title, $section) {
        var totalStyle = Object.keys($section).length;
        var list = DOMCreate('li', title, 'title');
        for (var i = 0; i < totalStyle; i++) {
            list += DOMCreate('li', defaultdata, 'selectData ' + option.liClass, '', ['style="' + option.liStyle + '"', 'data-title="' + title + '"', 'data-style="' + i + '"']);
        }
        selectDOM += DOMCreate('ul', list, 'selectDataWrapper ' + option.ulClass, '', ['style="' + option.ulStyle + '"']);
    });
    if (typeof (dropped) !== "undefined") {
        if (dropped) {
            selectDOM = selectDOM;
        }
    }
    InitComponentStyleWithdata($currentComponent, manipulateSelector, iconStyles, selectDOM);
}
//dropped component, component to be manipulate, stylesm, PopoupDOM
function InitComponentStyleWithdata($currentComponent, manipulateSelector, iconStyles, selectDOM) {
    FullPagePopup({
        data: selectDOM,
        heading: "Icon styles",
        showheading: true,
        width: '60%'
    });
    var count = 0;
    $.each(iconStyles, function (title, $section) {
        var totalStyle = Object.keys($section).length;
        for (var i = 0; i < totalStyle; i++) {
            var icon = $section[i];
            SetStyleAttribute($('.selectDataWrapper').eq(count).find('.selectData').eq(i).find(manipulateSelector), icon);
        }
        count++;
    });
    $('.selectData').off().on('click', function () {
        var $this = $(this);
        var icon = iconStyles[$this.attr('data-title')][$this.attr('data-style')];
        SetStyleAttribute($currentComponent, icon);
        CloseFullPagePopup();
    });
}
function SetStyleAttribute($component, $attributes) {
    var attributesKeyList = Object.keys($attributes);
    var attributeLength = attributesKeyList.length;

    for (var i = 0; i < attributeLength; i++) {
        var key = attributesKeyList[i];
        var value = $attributes[key];
        if (typeof (value) === "string")
            $component.attr(key, $attributes[key]);
        else if (typeof (value) === "function") {
            value($component);
        }
    }
}
var extentComponent = {

};
(function ($) {
    $.WebBuilder = function (p) {
        p = $.extend({
            modulePath: '',
            DataObj: '',
            userModuleID: '',
            enableHeader: "false",
            onlinestoreURL: '',
            digisphereURL: '',
            portalDefaultPage: '',
            isDeveloperMode: false,
            version: '1.0'
        }, p);
        var WebManagement = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/webservice.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                enableHeader: p.enableHeader,
                tempPageName: p.tempPageName,
                pageExtension: p.pageExtension,
                OnlineOffset: 0,
                OnlineLimit: 10,
                OnlineSiteOffset: 0,
                OnlineSiteLimit: 10,
                OnlineHelpOffset: 0,
                OnlineHelpLimit: 10,
                DigisphereAPI: SageFrameHostURL + '/Modules/Admin/Advision/Services/SocialMarketing.asmx/',
                OnlinestoreURL: p.onlinestoreURL + '/',
                portalDefaultPage: p.portalDefaultPage,
                isDeveloperMode: p.isDeveloperMode,
                version: p.version
            },
            Init: function () {
                try {
                    if (WebManagement.config.isDeveloperMode.toLowerCase() == "true") {
                        component = $.extend(component, extendedComps);
                    }
                    // after drop of the component is initialized here
                    WebManagement.CreateSidebar();
                    //API invoked and BindData of component is executed
                    InvokeAPI();
                    WebManagement.LoadDetail();
                    WebManagement.RebindMenuID();
                    WebManagement.InitEvents();
                    WebManagement.TopStickEvents();
                    WebManagement.FooterInit();
                    MouseOverEffect();
                    WebManagement.ScrollDynamicBind();
                    WebManagement.OnlineEvents();
                    WebManagement.DragComponentSettings();
                    MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                    $('body').append($('#simplePopupModel'));
                    EditableSetBreak();
                    WebManagement.MenuType();
                    $(window).resize(function () {
                        WebManagement.ScreenSizeLimit();
                    });
                    WebManagement.ScreenSizeLimit();
                    WebManagement.RevertMenu($('body'));
                    $('body,html').animate({
                        scrollTop: '0px'
                    }, 1);
                    //WebManagement.UpdateComponentManually();
                }
                catch (error) {
                    console.log(error);
                }
            },
            UpdateComponentManually: function () {
                var count = 0;
                $.each(component, function (i, v) {
                    var name = v.componentname;
                    var componentValue = v;
                    if (name !== "question" || name !== "responsive table" || name !== "survey") {
                        count++;
                        WebManagement.UpdateComponentForDev(name, componentValue, count);
                    }
                });
            },
            RebindMenuID: function () {

                $('#innerPageList > li ').each(function () {
                    var $this = $(this);
                    $('.eb-menu > li').each(function () {
                        var $ebList = $(this);
                        if ($ebList.find('> a > span').text().toLowerCase() === $this.find('> a > span').text().toLowerCase()) {
                            $ebList.attr('data-pageid', $this.attr('data-pageid'));
                            $ebList.attr('data-webbuilderid', $this.attr('data-webbuilderid'));
                        }
                    });
                });
                //> a > span
                $('.eb-menu').each(function () {
                    var $tempPage = $(this);
                    $tempPage.find('li > a > span').each(function () {
                        var $temp = $(this);
                        $('#innerPageList li > a > span').each(function () {
                            var $this = $(this);
                            if ($this.text().toLowerCase() === $temp.text().toLowerCase()) {
                                $this.attr('data-pageid', $tempPage.attr('data-pageid'));
                                $this.attr('data-webbuilderid', $tempPage.attr('data-webbuilderid'));
                            }
                        });
                    });
                });
            },
            ScreenSizeLimit: function () {
                var width = ScreenDimension().width;
                if (width < 1024)
                    SaveMessageShow("coming soon for screen less than 1024 px");
                else
                    SaveMessageRemove();
            },
            MenuType: function () {
                if ($('.editor-com-nav').attr('data-active') === "onepagemenu") {
                    $('.editor-com-nav > .onepagemenu').show();
                    $('.editor-com-nav > .eb-menu').hide();
                }
                else {
                    $('.editor-com-nav > .onepagemenu').hide();
                    $('.editor-com-nav > .eb-menu').show();
                }
                WebManagement.OnePageMenuEvent();
            },
            OnePageMenuEvent: function () {
                $('#limanageonepage').on('click', function () {
                    var htmlDOM = '';
                    htmlDOM += '<span class="note">Section title will be in the place of menu and leaving it empty will not be included in the menu. Clicking on the title will take you to that section.</span>';
                    $('.editor-componentWrapper > .editor-row').each(function (i, v) {
                        var $this = $(this);
                        var name = typeof ($this.attr('data-menuname')) === "undefined" ? "" : $this.attr('data-menuname');
                        var dom = DOMCreate('span', '<label>Section title</label><input type="text" class="sectionname" value="' + name + '" />');
                        var DOM = $this.wrap('<p/>').parent().html();
                        $this.unwrap();
                        dom += DOMCreate('div', DOM, 'onepagedata');
                        htmlDOM += DOMCreate('li', dom);
                    });
                    htmlDOM = DOMCreate('ul', htmlDOM, 'onepagelist clearfix');
                    var saveBtn = '<span>Single Page Sections</span><span class="pop-header-btn" id="btnOnePage">Save</span>';
                    FullPagePopup({
                        data: htmlDOM,
                        heading: saveBtn,
                        showheading: true,
                        onappend: function ($wrapper) {
                            $('#btnOnePage').on('click', function () {
                                var html = "";
                                $('.editor-componentWrapper > .editor-row').each(function (i, v) {
                                    var $this = $(this);
                                    var $name = $('.sectionname').eq(i);
                                    var $val = $name.val().trim();
                                    if ($val.length > 0) {
                                        var opVal = 'opclass_' + i;
                                        html += '<li class="sfFirst oneMenu"  data-opscroll="' + opVal + '">';
                                        html += '<a href="javascript:void(0);" class="pagelink onepage">';
                                        html += '<span class="pageName">' + $val + '</span>';
                                        html += '</a>';
                                        html += '</li>';
                                        $this.attr({ 'data-opscroll': opVal, 'data-menuname': $val });
                                    }
                                });
                                $('.onepagemenu').html(html);
                                OnePageMenuScrollEvent();
                                CloseFullPagePopup();
                            });
                        }
                    });
                });
            },
            DragComponentSettings: function () {
                $('.main-left').draggable({
                    containment: '.main-container',
                    handle: '.dragComponentSettings',
                    start: function (e, ui) {
                        $(ui.helper).css({
                            "position": "fixed"
                        });
                    },
                    stop: function (event, ui) {
                        AutoAlignDragger(ui.helper);
                    }
                });
            },
            FooterInit: function () {
                $('.ManageFooter').on('click', function () {
                    var $parent = $(this).parent().parent();
                    var selectDOM = '';
                    var footers = ['FooterThree', 'FooterTwo'];
                    var footerLength = footers.length;
                    var selectDOM = DOMCreate('li', 'Footer styles', 'title');
                    for (var i = 0; i < footerLength; i++) {
                        var html = $('#' + footers[i]).html();
                        selectDOM += DOMCreate('li', html, 'selectData  sfCol_100');
                    }
                    selectDOM = DOMCreate('ul', selectDOM, 'selectDataWrapper clearfix footerStyles');
                    FullPagePopup({
                        data: selectDOM,
                        heading: "FooterStyle",
                        showheading: true
                    });

                    ReadMenu();
                    function ReadMenu() {
                        var $menu = $('.editor-site-header').find('.menuHeader .eb-menu > li');
                        $('.fullpagepopupWrapper').find('.automenucreate').html($('.editor-site-header').find('.menuHeader .eb-menu').html());
                    }
                });
            },
            OnlineEvents: function () {
                $("body").on("click", "#btnCompLoadMore", function () {
                    var searchText = $("#onlinecomponentSearch").val();
                    WebManagement.config.OnlineOffset = WebManagement.config.OnlineOffset + 1;
                    WebManagement.GetOnlineComponents(false, WebManagement.config.OnlineOffset, WebManagement.config.OnlineLimit, searchText);
                });
                $("#onlinecomponentSearch").on("keyup", function (e) {
                    if (e.keyCode == 13)
                        SearchOnlineComponent();
                });
                $("#onlinecomponentSearch").on("change", function (e) {
                    SearchOnlineComponent();
                });
                function SearchOnlineComponent() {
                    var searchText = $("#onlinecomponentSearch").val();
                    if (searchText != "") {
                        WebManagement.config.OnlineOffset = 0;
                        onlineComponentArr = {};
                        $("#OnlineComponentListWrapper").html('');
                        WebManagement.GetOnlineComponents(false, WebManagement.config.OnlineOffset, WebManagement.config.OnlineLimit, searchText);
                    }
                }
                //online site 
                $("body").on("click", "#btnSiteLoadMore", function () {
                    var searchText = $("#onlineSiteSearch").val();
                    WebManagement.config.OnlineSiteOffset = WebManagement.config.OnlineSiteOffset + 1;
                    WebManagement.GetOnlineSites(false, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, searchText);
                });
                $("#onlineSiteSearch").on("change", function () {
                    SearchOnlineSite();
                });
                $("#onlineSiteSearch").on("keyup", function (e) {
                    if (e.keyCode == 13)
                        SearchOnlineSite();
                });
                function SearchOnlineSite() {
                    var searchText = $("#onlineSiteSearch").val();
                    if (searchText != "") {
                        WebManagement.config.OnlineSiteOffset = 0;
                        $("#onlineSiteListWrapper").html('');
                        WebManagement.GetOnlineSites(false, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, searchText);
                    }
                }
                $('#slcSectors').on('change', function () {
                    var sectorID = $('#slcSectors option:selected').val();
                    if (sectorID > 0)
                        WebManagement.GetSiteCategories(sectorID);
                    else
                        WebManagement.ClearBusinessControls(1);
                });
                $('#slcSiteCategory').on('change', function () {
                    var sectorID = $('#slcSectors option:selected').val();
                    var siteCatID = $('#slcSiteCategory option:selected').val();
                    if (siteCatID > 0)
                        WebManagement.GetBusinessType(sectorID, siteCatID);
                    else
                        WebManagement.ClearBusinessControls(2);
                });
                $("#btnSiteSearch").on("click", function () {
                    $("#onlineSiteListWrapper").html('');
                    WebManagement.config.OnlineSiteOffset = 0;
                    WebManagement.GetOnlineSites(false, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, '');
                });
                $("#btnShowAdvance").on("click", function () {
                    $("#divSimpleSearch").hide();
                    $("#divAdvSearch").show();
                });
                $("#btnSiteCancel").on("click", function () {
                    $("#divAdvSearch").hide();
                    $("#divSimpleSearch").show();
                });
                $("#divSiteList").on("click", ".btnUsethis", function () {
                    var themeid = parseInt($(this).data("themeid"));
                    var id = $(this).data("id");
                    SageConfirmDialog('Your current site will all be changed by this Site. You cannot revert the lost data. Do you want to change?').done(function () {
                        WebManagement.GetOnlineThemeFile(themeid);
                    });
                });
                $("#divSiteList").on("click", ".btnDemo", function () {
                    var id = $(this).data("id");
                    var themeid = parseInt($(this).data("themeid"));
                    var demoURL = $(this).attr('data-previewurl');
                    var url = '';
                    if (themeid > 0) {
                        url = demoURL + '/' + id + "/" + themeid;
                        window.open(url, '_blank');
                    }
                });
                $('#onlineHelpSearch').on('change', function (e) {
                    WebManagement.config.OnlineHelpOffset = 0;
                    WebManagement.GetWebHelp(false, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                });
                $('#onlineHelpSearch').on('keyup', function (e) {
                    WebManagement.config.OnlineHelpOffset = 0;
                    if (e.keyCode == 13)
                        WebManagement.GetWebHelp(false, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                });
            },
            GetOnlineComponents: function (async, offset, limit, searchText) {
                $.ajax({
                    isPostBack: false,
                    async: async,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        offset: parseInt(offset * limit) + 1,
                        limit: limit,
                        searchText: searchText,
                        portalID: SageFramePortalID,
                        userModuleID: WebManagement.config.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken,
                        version: this.config.version
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/GetOnlineComponentsByVersion',
                    success: function (data) {
                        WebManagement.BindOnlineComponents(data);
                    },
                    error: function () {
                    },
                });
            },
            BindOnlineComponents: function (data) {
                var html = '';
                var loadMore = false;
                var response = data.d;
                var onlineCompo = {};
                if (response != null && response.length > 0) {
                    if (data.d.length > WebManagement.config.OnlineLimit) {
                        loadMore = true;
                        data.d.splice(-1, 1);
                    }

                    $.each(response, function (index, item) {
                        var componentData = JSONParse(item.ComponentValue);

                        var download = '<span class="downloadcompo">Download</span>';
                        var activeClass = '';
                        if (WebManagement.CheckOnlineComponetExistance(item.ComponentID)) {
                            download = '<span class="Installed">Installed</span>';
                            activeClass = 'installed';
                        }
                        else
                            onlineCompo[item.ComponentName] = componentData;
                        html += '<li class="compodownload ' + activeClass + '">';
                        html += '<div class="header">';
                        html += '<span class="componentName">';
                        html += item.ComponentName;
                        html += '</span>';
                        html += download;
                        html += '</div>';
                        html += '<div class="divComponentWrap">';
                        html += '<div class="divComponentData">';
                        var data = componentData.defaultdata;
                        html += data;
                        html += '</div>';
                        html += '</div>';
                        html += '</li>';
                    });
                    onlineComponentArr = $.extend(onlineComponentArr, response);
                }
                else {
                    html += '<span class="noData">No Component Found!</span>';
                }
                $("#OnlineComponentListWrapper").append(html);
                component = $.extend(component, onlineCompo);
                $.each(onlineCompo, function (i, v) {
                    if (typeof v.afterdrop !== "undefined")
                        v.afterdrop($('.site-body'), $('.site-body'), false, false);
                });
                $(".divCompSeeMore").remove();
                var htmlMore = '';
                if (loadMore) {
                    htmlMore += "<div class='divCompSeeMore'>";
                    htmlMore += "<a id='btnCompLoadMore' class='btn primary' href='javascript:void(0);'>Load More</a>";
                    htmlMore += "</div>";
                    $(".OnlineComponentListWrapper").append(htmlMore);
                }
                WebManagement.CompoBindEvent();
            },
            CheckOnlineComponetExistance: function (onlineID) {
                var exists = false;
                $.each(componentID, function (i, v) {
                    if (parseInt(v) === parseInt(onlineID))
                        exists = true;
                });
                return exists;
            },
            GetOnlineThemeFile: function (themeID) {
                $.ajax({
                    isPostBack: false,
                    async: false,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        themeID: themeID,
                        componentID: componentID.join(','),
                        portalID: SageFramePortalID,
                        userModuleID: WebManagement.config.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken,
                        culture: SageFrameCurrentCulture
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/GetOnlineThemeFile',
                    success: function (data) {
                        window.location = window.location.href;
                    },
                    error: function () {

                    },
                });
            },
            GetOnlineSites: function (async, siteOffset, siteLimit, searchText) {
                var sectorID = $('#slcSectors option:selected').val();
                var siteCatID = $('#slcSiteCategory option:selected').val();
                var businessTypeID = $('#slcBusinessType option:selected').val();
                $.ajax({
                    isPostBack: false,
                    async: async,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        offset: siteOffset * siteLimit + 1,
                        limit: siteLimit,
                        themeName: searchText,
                        sectorID: sectorID,
                        siteCategoryID: siteCatID,
                        businessTypeID: businessTypeID,
                        portalID: SageFramePortalID,
                        userModuleID: WebManagement.config.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/GetOnlineSitesByVersion',
                    success: function (data) {
                        WebManagement.BindOnlineSites(data);
                    },
                    error: function () {
                    },
                });
            },
            BindOnlineSites: function (data) {
                var html = '';
                var loadMore = false;
                if (data.d.length > 0) {
                    if (data.d.length > WebManagement.config.OnlineSiteLimit) {
                        loadMore = true;
                        data.d.splice(-1, 1);
                    }
                    $.each(data.d, function (index, item) {
                        html += "<div class='tempThumb'>";
                        html += "<h3>";
                        html += item.ThemeName;
                        html += "</h3>";
                        html += "<div class='tempImgWrap'>";
                        html += "<img src = '";
                        html += item.Screenshot;
                        html += "'/>";
                        html += "<div class='tempBtns'>";
                        html += "<a class='btn btn-dark btnDemo' data-id='";
                        html += item.ProductID;
                        html += "' data-themeid='";
                        html += item.ThemeID;
                        html += "' data-previewurl='";
                        html += item.DemoUrl;
                        html += "' href='javascript:void(0);'>Preview</a>";
                        html += "<a class='btn btn-default btnUsethis' data-id='";
                        html += item.ProductID;
                        html += "' data-themeid='";
                        html += item.ThemeID;
                        html += "' href='javascript:void(0);'>Use This</a>";
                        html += "</div>";
                        html += "</div>";
                        html += "</div>";
                    });
                }
                else {
                    html = "<span class='noData'>No Site Found!</span>";
                }
                $("#onlineSiteListWrapper").append(html);
                $(".divSiteSeeMore").remove();
                var htmlMore = '';
                if (loadMore) {
                    htmlMore += "<div class='divSiteSeeMore'>";
                    htmlMore += "<a id='btnSiteLoadMore' class='btn primary' href='javascript:void(0);'>Load More</a>";
                    htmlMore += "</div>";
                    $(".onlineSiteListWrapper").append(htmlMore);
                }

            },
            ClearBusinessControls: function (type) {
                if (type < 2) {
                    $('.site_category_select').addClass('disabled');
                    $('#slcSiteCategory').html('<option value="0">Select a Category</option>');
                }
                if (type < 3) {
                    $('.site_business_select').addClass('disabled');
                    $('#slcBusinessType').html('<option value="0">Select Business Type</option>');
                }
                if (type < 4) {
                    $('.business_keywords_select').addClass('disabled');
                    $('#slcBusinessKeywords').html('<option value="0">Select a keyword</option>');
                }
            },
            GetSectors: function (async) {
                $.ajax({
                    isPostBack: false,
                    async: async,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        portalID: parseInt(SageFramePortalID),
                        userModuleID: p.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: WebManagement.config.DigisphereAPI + "GetSectorType",
                    success: function (data) {
                        WebManagement.GetSectorsSuccessCall(data);
                    },
                    error: function () {
                    },
                });
            },
            GetSectorsSuccessCall: function (data) {
                if (data.d != null) {
                    var sectorList = data.d;
                    var html = '';
                    html += '<option value="0">Select a Sector</option>';
                    $.each(sectorList, function (index, item) {
                        html += '<option value="' + item.SectorTypeID + '">' + item.TypeName + '</option>';
                    });
                    $('#slcSectors').html(html);
                    $('#slcSectors').val(0);
                }
            },
            GetSiteCategories: function (sectorID) {
                $.ajax({
                    isPostBack: false,
                    async: false,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        sectorID: sectorID,
                        portalID: parseInt(SageFramePortalID),
                        userModuleID: p.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: WebManagement.config.DigisphereAPI + "GetSiteTypes",
                    success: function (data) {
                        WebManagement.GetSiteCategoriesSuccessCall(data);
                    },
                    error: function () {
                    },
                });
            },
            GetSiteCategoriesSuccessCall: function (data) {
                if (data.d != null) {
                    $('.site_category_select').removeClass('disabled');
                    var sectorList = data.d;
                    var html = '';
                    html += '<option value="0">Select a Category</option>';
                    $.each(sectorList, function (index, item) {
                        html += '<option value="' + item.SiteTypeID + '">' + item.TypeName + '</option>';
                    });
                    $('#slcSiteCategory').html(html);
                    $('#slcSiteCategory').val(0);
                }
            },
            GetBusinessType: function (sectorID, siteCatID) {
                $.ajax({
                    isPostBack: false,
                    async: false,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        sectorID: sectorID,
                        siteCatID: siteCatID,
                        portalID: parseInt(SageFramePortalID),
                        userModuleID: p.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: WebManagement.config.DigisphereAPI + "GetBusinessType",
                    success: function (data) {
                        WebManagement.GetBusinessTypeSuccessCall(data);
                    },
                    error: function () {
                    },
                });
            },
            GetBusinessTypeSuccessCall: function (data) {
                if (data.d != null) {
                    $('.site_business_select').removeClass('disabled');
                    var sectorList = data.d;
                    var html = '';
                    html += '<option value="0">Select a Business Type</option>';
                    $.each(sectorList, function (index, item) {
                        html += '<option value="' + item.BusinessTypeID + '">' + item.TypeName + '</option>';
                    });
                    $('#slcBusinessType').html(html);
                    $('#slcBusinessType').val(0);
                }
            },
            CompoBindEvent: function () {
                $('.downloadcompo').off().on('click', function () {
                    var $this = $(this);
                    var $parent = $this.parent().parent();
                    var index = $('#OnlineComponentListWrapper > .compodownload').index($parent);
                    var compo = onlineComponentArr[index];
                    var $compo = JSONParse(compo.ComponentValue);
                    if (typeof ($compo) !== "undefined") {
                        var classes = 'comBasic  heartBeat comItemBlock ui-state-highlight';
                        if ($compo.row)
                            classes = 'rowBasic heartBeat comItemBlock ui-state-highlight';
                        var dependencies = compo.dependencies;
                        var success = WebManagement.UpdateComponent(compo.ComponentName, $compo, compo.ComponentID, $compo.category, $compo.icon, classes, dependencies);
                        if (success) {
                            $parent.addClass('installed');
                            var installed = '<span class="Installed">Installed</span>';
                            $(installed).insertAfter($this);
                            $this.remove();
                            WebManagement.UpdateComponentDownloadCount(compo.ComponentID);
                        }
                    }
                });
            },
            //UpdateComponentDownloadCount
            //UpdateThemeDownloadCount
            UpdateComponentDownloadCount: function (compoID) {
                $.ajax({
                    isPostBack: false,
                    async: false,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        portalID: parseInt(SageFramePortalID),
                        userName: SageFrameUserName,
                        userModuleID: webBuilderUserModuleID,
                        secureToken: SageFrameSecureToken,
                        compoID: compoID
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/UpdateComponentDownloadCount',
                    success: function (data) {

                    },
                    error: function () {
                    },
                });
            },
            UpdateThemeDownloadCount: function (themeID) {
                $.ajax({
                    isPostBack: false,
                    async: async,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        portalID: parseInt(SageFramePortalID),
                        userName: SageFrameUserName,
                        userModuleID: webBuilderUserModuleID,
                        secureToken: SageFrameSecureToken,
                        themeID: themeID
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/UpdateThemeDownloadCount',
                    success: function (data) {

                    },
                    error: function () {
                    },
                });
            },
            ScrollDynamicBind: function () {
                var dynamicScroll = 'var scroolHeight = document.body.scrollTop;';
                $('.scroll-begin').each(function (i, v) {
                    var scrollClass = 'scroll_' + i;
                    var $this = $(this);
                    var top = $this.offset().top;
                    var height = $this.height();
                    $this.addClass(scrollClass);
                    dynamicScroll += "if (scroolHeight > " + top + " && scroolHeight < " + (top + height) + ")";
                    dynamicScroll += "{";
                    var delay = 0;
                    if (typeof ($this.attr('data-scrolldelay') !== "undefined")) {
                        delay = parseInt($this.attr('data-scrolldelay'));
                    }
                    dynamicScroll += "setTimeout(function () {";
                    dynamicScroll += "$('." + scrollClass + "').addClass('scroll-end');";
                    dynamicScroll += "}, " + delay + ");";
                    dynamicScroll += "}";
                });
                var ScrollWindow = new Function('param', dynamicScroll);
                window.onscroll = function () {
                    //ScrollWindow();
                };
            },
            GeneratePreviewLink: function (key, sourceURL) {
                var params_arr = sourceURL.split("/");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    var param = params_arr[i].split("=")[0];
                    if (param.toLowerCase() == key.toLowerCase()) {
                        params_arr.splice(i, 1);
                    }
                }
                var rtn = params_arr.join("/");
                return rtn;
            },
            CreateSidebar: function () {
                WebManagement.LayoutSet();
                var componentCollection = '';
                var componentList = Object.keys(component);
                var componentListLen = componentList.length;
                var layoutDOM = '';
                var basicDOM = '';
                var advanceDOM = '';
                var proDOM = '';
                var removeCompo = [];
                $('.editor-component').each(function () {
                    var $me = $(this);
                    var dataType = $me.attr('data-type');
                    if (EasyLibrary.IsUndefined(dataType)) {
                        dataType = $me.find('> .carries-options > .com-settings').attr('data-type');
                    }
                    if (EasyLibrary.IsDefined(dataType)) {
                        var index = removeCompo.indexOf(dataType);
                        if (index == -1) {
                            if (EasyLibrary.IsDefined(component[dataType].afterdrop)) {
                                try {
                                    component[dataType].afterdrop($('.site-body'), $('.site-body'));
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                removeCompo.push(dataType);
                            }
                        }
                    }
                });
                for (var i = 0; i < componentListLen; i++) {
                    var $compo = component[componentList[i]];
                    //calling after drop of used component
                    if (!$compo['hidden']) {
                        var comName = $compo['componentname'];
                        var iconClass = $compo['icon'];
                        var compo = DOMCreate('i', '', iconClass) + '<br />' + comName;
                        var classes = 'comBasic comItemBlock ui-state-highlight';
                        if ($compo['row'])
                            classes = 'rowBasic heartBeat comItemBlock ui-state-highlight';
                        compo = DOMCreate('span', compo, classes, '', ['draggable="true"', 'data-type="' + comName + '"']);
                        var compoTab = $compo['category'];
                        switch (compoTab) {
                            case 'layout':
                                layoutDOM += compo;
                                break;
                            case 'basic':
                                basicDOM += compo;
                                break;
                            case 'advance':
                                advanceDOM += compo;
                                break;
                            case 'pro':
                                proDOM += compo;
                                break;
                        }
                    }
                }
                var $componentList = $('#componentCollection > .components-list-array');
                if (layoutDOM.length > 0) {
                    $componentList.find('.Layout').show().find('.comItems').html(layoutDOM);
                }
                else {
                    $componentList.find('.Layout').remove();
                }
                if (basicDOM.length > 0) {
                    $componentList.find('.basic').show().find('.comItems').html(basicDOM).show();
                }
                else {
                    $componentList.find('.basic').remove();
                }
                if (advanceDOM.length > 0) {
                    $componentList.find('.advance').show().find('.comItems').html(advanceDOM).show();
                }
                else {
                    $componentList.find('.advance').remove();
                }
                if (proDOM.length > 0) {
                    $componentList.find('.pro').show().find('.comItems').html(proDOM).show();
                }
                else {
                    $componentList.find('.pro').remove();
                }
                $('.comItems').hide();
                $('.components-list-array h4').on('click', function () {
                    if (!$(this).parent().hasClass('activeAccordion')) {
                        $('.components-list').removeClass('activeAccordion');
                        $('.comItems').slideUp(400);
                        $(this).next().slideDown(400);
                        $(this).parent().addClass('activeAccordion');
                    }
                });
                $('.components-list-array h4').eq(0).trigger('click');

                $('.builder-options-array h2').on('click', function () {
                    if (!$(this).parent().hasClass('activeAccordion')) {
                        $('.builder-options').removeClass('activeAccordion');
                        $('.OptionItems').slideUp(400);
                        $(this).next().slideDown(400);
                        $(this).parent().addClass('activeAccordion');
                    }
                });
                $('#basicFonts').html(DOMFontBasicCollection());
                $('#basicFonts').on('change', function () {
                    var $body = $('.site-body');
                    var classList = $body.attr('class');
                    var fontClass = classList.match(/ff-(\w+)/g);
                    if (fontClass !== null) {
                        $body.removeClass(fontClass[0]);
                    }
                    var fontFamily = $(this).val();
                    $body.addClass('ff-' + fontFamily.toLowerCase());
                    $('#fontPreview').attr('class', 'ff-' + fontFamily.toLowerCase());
                    webBuilderSettings.defaultFontFamily = fontFamily;
                });
                var classesList = $('.site-body').attr('class');
                var fontClasses = classesList.match(/ff-(\w+)/g);
                if (fontClasses !== null) {
                    $('#basicFonts').val(fontClasses[0].replace('ff-', ''));
                    $('#fontPreview').attr('class', fontClasses[0].replace('ff-', ''));
                }

                $('.comBasic , .rowBasic').each(function () {
                    GenericRemove($(this));
                });
                WebManagement.SideBarEvents();

                //take side bar to right onload
                var right = $(window).width() - $('.components').offset().left;
                //var bottom = $(window).height() - $('.components').offset().top - $('.components').height();
                $('.main-left').css({
                    'right': right + 10,
                    'left': 'auto',
                    //  'bottom': bottom
                });
                $('#dashboardLink').attr('href', SageFrameHostURL + '/dashboard/dashboard');
            },
            SideBarEvents: function () {
                $('.collapse').on('click', function () {
                    $('.main-left').hide();
                    $('.headerControls').removeClass('clicked');
                });
                $('.sitesettings').on('click', function () {
                    $('.dragHeader').text('Site Settings');
                    WebManagement.ShowStickeyHeaderOption('showsidebar');
                    $(this).addClass('clicked');
                    $('#sidebarcontrol').find('input').eq(0).trigger('click');
                });
                $('.addComponent').on('click', function () {
                    $('.dragHeader').text('Component List');
                    WebManagement.ShowStickeyHeaderOption('showsidebar');
                    $(this).addClass('clicked');
                    $('#sidebarcontrol').find('input').eq(1).trigger('click');
                });
                $('#componentSearch').on('keyup', function () {
                    var searchVal = $(this).val().trim();
                    if (searchVal.length == 0) {
                        WebManagement.RecycleSearch();
                    }
                    else {
                        $('.components-list div').slideDown(400);
                        $('.comItemBlock').each(function () {
                            var $this = $(this);
                            var name = $this.text().toLowerCase();
                            var pos = name.indexOf(searchVal.toLowerCase());
                            if (pos < 0) {
                                $this.addClass('content-hide');
                            }
                            else {
                                $this.removeClass('content-hide');
                            }
                        });
                    }
                });
                $('#refreshComSearch').on('click', function () {
                    $('#componentSearch').val('');
                    WebManagement.RecycleSearch();
                });

                if ($('.editor-com-nav').attr('data-active') === "onepagemenu") {
                    $('#chkOnePageMenu').prop('checked', true);
                    $('#limanagepage').hide();
                    $('#limanageonepage').show();
                }
                else {
                    $('#chkOnePageMenu').prop('checked', false);
                    $('#limanagepage').show();
                    $('#limanageonepage').hide();

                }
                $('#chkOnePageMenu').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('.editor-com-nav').attr('data-active', 'onepagemenu');
                        $('.editor-com-nav > .onepagemenu').show();
                        $('.editor-com-nav > .eb-menu').hide();
                        $('#limanagepage').hide();
                        $('#limanageonepage').show();
                        $('#limanageonepage').trigger('click');
                    }
                    else {
                        $('.editor-com-nav').attr('data-active', 'mutiplepage');
                        $('.editor-com-nav > .onepagemenu').hide();
                        $('.editor-com-nav > .eb-menu').show();
                        $('#limanagepage').show();
                        $('#managePagePanel').trigger('click');
                        $('#limanageonepage').hide();
                    }
                });
                if ($('#ScroolToTop').length > 0) {
                    $('#chkScrollToTopBox').prop('checked', true);
                }
                else {
                    $('#chkScrollToTopBox').prop('checked', false);
                }
                $('#chkScrollToTopBox').on('click', function () {
                    if ($(this).is(':checked')) {
                        var scrollToTop = '';
                        webBuilderSettings.scrolltotop = true;
                        scrollToTop = DOMCreate("div", EasyLibrary.ReadDOM("scrolltotop"), "scrolltotop", "ScroolToTop", ['style="display:none;"']);
                        $('.site-body').append(scrollToTop);
                        $('#ScroolToTop').on('click', function () {
                            $('body,html').animate({
                                scrollTop: '0px'
                            }, 1000);
                        });
                    }
                    else {
                        $('#ScroolToTop').remove();
                    }
                });
            },
            RecycleSearch: function () {
                $('.components-list').not('.activeAccordion').find('div').slideUp(400);
                $('.comItemBlock').each(function () {
                    $(this).removeClass('content-hide');
                });
            },
            InitEvents: function () {
                InitTab();
                $('#SaveWeb').on('click', function () {
                    WebManagement.SaveWebData(false);
                });
                $('#btnPublishedWeb').on('click', function () {
                    SageConfirmDialog('Are you sure you want to published.Your live site will get affected.').done(function () {
                        WebManagement.SaveWebData(true);
                    });
                });
                $('#btnUnderConstruction').on('click', function () {
                    SageConfirmDialog('Are you sure you want to set site Under Construction ?').done(function () {
                        $.ajax({
                            isPostBack: false,
                            async: false,
                            cache: false,
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            data: JSON2.stringify({
                                PageName: 'Under Construction',
                                OldPageName: portalDefaultPage,
                                ActiveTemplateName: SageFrameActiveTemplate,
                                portalID: parseInt(SageFramePortalID),
                                userName: SageFrameUserName,
                                userModuleID: webBuilderUserModuleID,
                                secureToken: SageFrameSecureToken
                            }),
                            dataType: 'json',
                            crossDomain: true,
                            url: SageFrameHostURL + '/Modules/Pages/Services/PagesWebService.asmx/UpdSettingKeyValue',
                            success: function () {
                                portalDefaultPage = 'Under Construction';
                                //  ReadMenu();
                            },
                            error: function () { },
                        });
                    });
                });
                $('#btnEditUnderConstruction').on('click', function () {
                    var underConsPageName = 'Under Construction';
                    SageConfirmDialog(' All your unsaved data will be lost. Are you sure you want to edit "' + underConsPageName + '" page?').done(function () {
                        var href = SageFrameHostURL + '/WebBuilder' + webBuilderPageExtension + '/' + underConsPageName.replace(/ /g, '-');
                        window.location = href;
                    });
                });

                $('.close-model').on('click', function () {
                    FadeOutPopUpSetting();
                });
                $('#ui-draggable').removeClass('ui-draggable');
                $('#popupModel').draggable({
                    containment: '.editor-box',
                    handle: '.popup-header',
                    start: function (e, ui) {
                        $(ui.helper).css({
                            "position": "fixed"
                        });
                    },
                    stop: function (event, ui) {
                        AutoAlignDragger(ui.helper);
                    }
                });
                WebManagement.SetThemeColor();
                PagelinkStop();
                var previewPage = WebManagement.GeneratePreviewLink('webbuilder', window.location.href) + '/preview';
                $('#btnNexitWebbuilder').attr('href', previewPage);
                $('#previewURL').attr('href', previewPage);

                $('#managePagePanel').on('click', function () {
                    WebManagement.ShowStickeyHeaderOption('pagesettingshow');
                    $('.headerControls').removeClass('clicked');
                    $(this).addClass('clicked');
                    PopUpSetting('manage pages', 0, 500, 0, 0, 'managepages', $('.editor-site-header'), $(this));
                });

                $('#manageBody').on('click', function () {
                    var attrs = $('#element').attrs();
                    PopUpSetting('Body Settings', 50, 200, 0, 0, 'body', $('.editor-box'), $(this));
                });

                $('#UpdateComponent').on('click', function () {
                    SageConfirmDialog('Updating component may take a while. Are you sure you want to proceed ?').done(function () {
                        $.ajax({
                            isPostBack: false,
                            async: false,
                            crossOrigin: true,
                            cache: false,
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            data: JSON2.stringify({
                                portalID: parseInt(SageFramePortalID),
                                userName: SageFrameUserName,
                                userModuleID: webBuilderUserModuleID,
                                secureToken: SageFrameSecureToken,
                                componentIDs: componentID.join(','),
                                version: this.config.version
                            }),
                            dataType: 'json',
                            crossDomain: true,
                            url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/UpdateExistingComponent',
                            success: function (data) {
                                window.location = window.location.href;
                            },
                            error: function () {
                            },
                        });
                    });
                });
                //to be update at after everything is called

                DraggableSortable();
                SettingEvents();
                WebManagement.SetbackgroundColor();
                WebManagement.SetbackgroundWidth();
                FixMenuOnResize();
                $('#ExportWebsite').on('click', function () {
                    //WebManagement.ExtractSite();
                    $('.exportsiteeasily').trigger('click');
                });
                $('body').not('.carrier-open-option').not('.carries-options').on('click', function () {
                    $('.carries-options').not('.hide-element').addClass('hide-element');
                    $('.carrier-open-option.active-options').removeClass('active-options');
                });
            },
            SaveWebData: function (isPreview) {
                var $editHtml = $('.edit-area');
                var $cloneDOM = $('#WebBuilderWrapperClone');
                $cloneDOM.html($editHtml.html());
                $.each(component, function (componentname, v) {
                    if (EasyLibrary.IsDefined(component[componentname]["package"])
                        && EasyLibrary.IsDefined(component[componentname]["package"]["API"])) {
                        component[componentname]["package"]["API"] = [];
                    }
                    if (typeof v.remove !== "undefined") {
                        v.remove($cloneDOM);
                    }
                });
                $cloneDOM.find('.carries-options').remove();
                $cloneDOM.find('.carrier-open-option').remove();
                $cloneDOM.find('.ui-droppable').each(function () {
                    $(this).removeClass('ui-droppable');
                });
                $cloneDOM.find('.ui-sortable').each(function () {
                    $(this).removeClass('ui-sortable');
                });

                //remove contententeditable
                $cloneDOM.find('[contenteditable="true"]').removeAttr('contenteditable');
                $cloneDOM.find('.editor-component').removeClass('ui-sortable');
                $cloneDOM.find('.editor-component').removeClass('ui-droppable');
                $cloneDOM.find('.activeOption').removeClass('activeOption');
                $cloneDOM.find('.resizebar').remove();
                $cloneDOM.find('.noElement').remove();
                $cloneDOM.find('.pagelink.active-page').removeClass('active-page');

                //to be remove at last
                $('.editor-col').each(function () {
                    var $this = $(this);
                    $this.removeAttr('data-width');
                    $('.editor-col').css({ 'width': '' });
                });

                //apply header with fake URL
                var $header = $('.editor-site-header').find('.menuHeader .eb-menu');
                var $headerColor = $header.attr('data-textcolor');
                var $cloneHeader = $cloneDOM.find('> .editor-site-header');
                $cloneDOM.find('.eb-menu li').find('a').each(function () {
                    var $this = $(this);
                    var href = $this.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $this.attr('href', href).removeClass('active-page');
                    $this.css({ 'background-color': '', 'border-color': '' });
                    $this.find('span').css({ 'color': $headerColor });
                });
                $cloneDOM.find('.anchorpage').each(function () {
                    var $this = $(this);
                    var href = $this.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $this.attr('href', href);
                });
                var $activePage = $editHtml.find('.menuHeader .eb-menu li > a.active-page');
                var $activeBG = $activePage.css('background-color');

                var $color = $activePage.find('span').css('color');
                $activePage.removeClass('active-page').css('background-color', '');
                $activePage.find('span').css('color', $headerColor);
                var $border = $activePage.css('border');
                $activePage.css('border', '');

                $cloneHeader.find('> .editor-row').removeClass('stick');
                $editHtml.find('.editor-site-header > .editor-row').removeClass('stick');

                $cloneHeader.css('width', '');
                $cloneHeader.find(' > .editor-row').css('width', '');

                $editHtml.find('.editor-site-header').css('width', '');
                $editHtml.find('.editor-site-header > .editor-row').css('width', '');

                $editHtml.find('.copyData').removeClass('readyCopy');
                $editHtml.find('.pasteData').removeClass('activePaste');


                $cloneDOM.find('img').each(function () {
                    ChangeImgToFakeURL($(this));
                });

                $cloneDOM.find('div').each(function () {
                    var $this = $(this);
                    ChangeBGToFakeURL($this);
                });

                $editHtml.find('img').each(function () {
                    ChangeImgToFakeURL($(this));
                });

                $editHtml.find('div').each(function () {
                    var $this = $(this);
                    ChangeBGToFakeURL($this);
                });
                $editHtml.find('.eb-menu li').find('a').each(function () {
                    var $this = $(this);
                    var href = $this.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $this.attr('href', href);
                });
                $editHtml.find('.anchorpage').each(function () {
                    var $achor = $(this);
                    var href = $achor.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $achor.attr('href', href);
                });
                function ChangeImgToFakeURL($elem) {
                    var src = $elem.attr('src');
                    if (typeof src !== "undefined" && src.indexOf("http://") === -1 && src.indexOf("https://") === -1) {
                        var backslash = src.substring(0, 1) === "/" ? "" : "/";
                        //$elem.attr('src', sageFrameFakeURL + $elem.attr('src').replace(SageFrameHostURL, ''));
                        $elem.attr('src', SageFrameHostURL + backslash + src);
                    }
                }

                function ChangeBGToFakeURL($elem) {
                    var parentBgImage = $elem.css('background-image');
                    if (typeof (parentBgImage) !== 'undefined' && parentBgImage !== 'none') {
                        parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                        if (typeof parentBgImage !== "undefined") {
                            //for chrome it absolute path for relative path For eg.'/Media/mainbanner_2017_07_19_15_46_49.png it gives 'http://172.18.12.40:9181/Media/mainbanner_2017_07_19_15_46_49.png'
                            parentBgImage = parentBgImage.replace(SageFrameHostURL, '').trim();
                            if (parentBgImage.indexOf("http://") === -1 && parentBgImage.indexOf("https://") === -1) {
                                var backslash = parentBgImage.substring(0, 1) === "/" ? "" : "/";
                                var url = 'url(' + SageFrameHostURL + backslash + parentBgImage + ')';
                                $elem.css('background-image', '').css('background-image', url);
                            }
                        }
                    }
                }

                var editHtml = $('<div/>').text($editHtml.find('> .editor-componentWrapper').html()).html().replace(/\>\s+\</g, '><').trim();
                var viewHtml = $('<div/>').text($('#WebBuilderWrapperClone > .editor-componentWrapper').html()).html().replace(/\>\s+\</g, '><').trim();
                //header
                var header = $('<div/>').text($('#WebBuilderWrapperClone > .editor-site-header').html()).html().trim();
                var headerEdit = $('<div/>').text($editHtml.find('> .editor-site-header').html()).html().trim();
                webBuilderSettings.body = $('.editor-box').attrs();
                var footer = $('<div/>').text($('#WebBuilderWrapperClone > .editor-site-footer').html()).html().trim();
                var footerEdit = $('<div/>').text($editHtml.find('> .editor-site-footer').html()).html().trim();

                //revert highlight menu color
                $activePage.addClass('active-page').css('background-color', $activeBG);
                $activePage.find('span').css('color', $color);
                $activePage.css('border', $border);

                if ($('.editor-box > .editor-row-shaded-layer').length > 0) {
                    webBuilderSettings.shadedLayer = $('.editor-box > .editor-row-shaded-layer').attrs();
                }
                else {
                    webBuilderSettings.shadedLayer = null;
                }
                var pageName = 'webbuildertemppagename';
                if (WebManagement.config.enableHeader == "true") {
                    pageName = WebManagement.config.tempPageName;
                }

                //save the API detail if any present in the component
                //APICollection = [];
                var packageXML = '';
                var componentNames = Object.keys(component);
                var message = '';
                //$(component).each(function (index, $compo) {
                $.each(component, function (index, $compo) {
                    var $this = $(this);
                    var componentName = index;
                    if ($('.editor-component[data-type="' + componentName + '"] ').length > 0) {
                        var apiDuplicate = [];
                        if (EasyLibrary.IsDefined($compo.package)) {
                            if (EasyLibrary.IsDefined($compo.package.API)) {
                                if ($compo.package.API.length > 0) {
                                    $.each($compo.package.API, function (index, api) {
                                        var APICntrl = new APIController();
                                        APICntrl.ComponentName = componentName;
                                        APICntrl.NameSpace = api.NameSpace;
                                        APICntrl.ClassNames = api.ClassNames;
                                        APICntrl.MethodNames = api.MethodNames;
                                        APICntrl.Parameters = api.Parameters;
                                        APICntrl.ComponentID = api.ComponentID;
                                        APICntrl.Type = api.Type;
                                        if (apiDuplicate.indexOf(api.ComponentID) > -1)
                                            message += "<br />Component name: " + APICntrl.ComponentName + ", APIInvokeKey:" + api.ComponentID;
                                        else {
                                            apiDuplicate.push(api.ComponentID);
                                            packageXML += EasyLibrary.APICollector(APICntrl);
                                        }
                                    });
                                }
                            }
                        }
                    }
                });

                if (message.length > 0) {
                    message = "<p>Page Contains components with same API invoke keys as below:</p>" + message;
                    SageAlertDialog(message);
                }
                else {
                    if (packageXML.length > 0)
                        packageXML = "<package>" + packageXML + "</package>";
                    $('.scanned').removeClass('scanned');
                    var objWebBuilderInfo = {
                        WebBuilderID: 0,
                        EditDOM: editHtml,
                        ViewDOM: viewHtml,
                        PortalID: SageFramePortalID,
                        UserModuleID: WebManagement.config.userModuleID,
                        UserName: SageFrameUserName,
                        SecureToken: SageFrameSecureToken,
                        Culture: SageFrameCurrentCulture,
                        Extra: '',//this is extra field if neede use in future
                        Settings: JSON2.stringify(webBuilderSettings),//setting field if needed use  this in future
                        PageName: currentpageName,
                        Header: header,
                        HeaderEdit: headerEdit,
                        Footer: footer,
                        FooterEdit: footerEdit,
                        PackageXML: packageXML
                    };
                    if (isPreview) {
                        WebManagement.PublishedWeb(objWebBuilderInfo, $editHtml);
                    }
                    else {
                        WebManagement.SaveWeb(objWebBuilderInfo, $editHtml);
                    }
                }
            },
            SaveWeb: function (objWebBuilderInfo, $editHtml) {
                $('.save-site').addClass('loading-fill');
                $('#SaveWeb').text('Saving');
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objWebBuilderInfo: objWebBuilderInfo
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/AddUpdate',
                    success: function () {
                        $('#WebBuilderWrapperClone').html('');
                        $('#SaveWeb').text('Saved');
                        $('.save-site').addClass('saved');
                        window.setTimeout(function () {
                            $('#SaveWeb').text('Save');
                            $('.save-site').removeClass('saved').removeClass('loading-fill');
                        }, 1000);
                        WebManagement.RevertMenu($editHtml);
                    },
                    error: function () {

                    },
                });
            },
            PublishedWeb: function (objWebBuilderInfo, $editHtml) {
                $('.publish-site').addClass('loading-fill');
                $('#btnPublishedWeb').text('Publishing');
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objWebBuilderInfo: objWebBuilderInfo
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/AddUpdatePublished',
                    success: function () {
                        $('#WebBuilderWrapperClone').html('');
                        $('#btnPublishedWeb').text('Published');
                        $('.publish-site').addClass('saved');
                        window.setTimeout(function () {
                            $('#btnPublishedWeb').text('Publish');
                            $('.publish-site').removeClass('saved').removeClass('loading-fill');
                        }, 1000);
                        WebManagement.RevertMenu($editHtml);
                    },
                    error: function () {

                    },
                });
            },
            RevertMenu: function ($editHtml) {
                $editHtml.find('.eb-menu li').find('a').each(function () {
                    var $this = $(this);
                    var href = $this.attr('href');
                    href = href.replace('fakeMenuURL', SageFrameHostURL);
                    $this.attr("href", href);
                });
                $editHtml.find('.anchorpage').each(function () {
                    var $this = $(this);
                    var href = $this.attr('href');
                    href = href.replace('fakeMenuURL', SageFrameHostURL);
                    $this.attr("href", href);
                });
            },
            ReturnHref: function (path) {
                path = path.replace('http://', '');
                path = path.replace('https://', '');
                path = path.replace(":" + window.location.port, '');
                path = path.replace(window.location.hostname, 'fakeMenuURL');
                return path;
            },
            GetWebHelp: function (async, offset, limit, searchText) {
                $.ajax({
                    isPostBack: false,
                    async: async,
                    crossOrigin: true,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        offset: parseInt(offset * limit) + 1,
                        limit: limit,
                        searchText: searchText,
                        portalID: SageFramePortalID,
                        userModuleID: WebManagement.config.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/GetOnlineWebHelp',
                    success: function (data) {
                        WebManagement.BindWebHelp(data);
                    },
                    error: function () {
                    },
                });
            },
            BindWebHelp: function (data) {
                $('#youtubeList').html('');
                var html = '';
                var loadMore = false;
                var response = data.d;
                if (response != null && response.length > 0) {
                    if (response.length > WebManagement.config.OnlineHelpLimit) {
                        loadMore = true;
                        response.splice(-1, 1);
                    }
                    $.each(response, function (index, item) {
                        switch (item.Type) {
                            case 'video':
                                var helpID = item.HelpLink;
                                html += '<li class="imageLink" data-youtube="' + helpID + '">';
                                html += '<img src="http://img.youtube.com/vi/' + helpID + '/0.jpg" />';
                                html += '<span class="youtubetitle">' + item.Title + '</span>';
                                html += '</li>';
                                break;
                        }
                    });
                    $('#youtubeList').append(html);
                }
                else {
                    html += '<li class="noresult">No result found</li>';
                    $('#youtubeList').html(html);
                }

                $("#divHelpSeeMore").remove();
                WebManagement.config.OnlineHelpOffset = WebManagement.config.OnlineHelpOffset + WebManagement.config.OnlineHelpLimit;
                WebManagement.BindYoutubeEvent();
                var htmlMore = '';
                if (loadMore) {
                    htmlMore += "<div class='divSiteSeeMore'>";
                    htmlMore += "<a id='divHelpSeeMore' class='btn primary' href='javascript:void(0);'>Load More</a>";
                    htmlMore += "</div>";
                    $("#loadmoreHelp").append(htmlMore);
                    $('#divHelpSeeMore').on('click', function () {
                        WebManagement.GetWebHelp(true, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                    });
                }
            },
            BindYoutubeEvent: function () {
                $('.imageLink').off().on('click', function () {
                    var $popUpModel = $('#simplePopupModel');
                    var videoID = $(this).attr('data-youtube');
                    var youtube = '';
                    var YTheader = '<div class="popheader">';
                    YTheader += '<span id="backtohelp" class="backtohelp">Back to help</span>';
                    YTheader += '<div class="iconList"><i class="fa fa-window-maximize resizeyt big"  data-size="big" aria-hidden="true"></i>';
                    YTheader += '<i class="fa fa-window-maximize resizeyt medium"  data-size="medium" aria-hidden="true"></i>';
                    YTheader += '<i class="fa fa-window-maximize resizeyt small active"  data-size="small" aria-hidden="true"></i>';
                    YTheader += '<i class="icon-icon-close f-right youtube-close-model"></i></div>';
                    YTheader += '</div>';
                    var videosrc = "https://www.youtube.com/embed/" + videoID + "?autoplay=1&loop=1&playlist=" + videoID;
                    youtube += '<iframe id="youtubePlayer" width="400" height="300" src="' + videosrc + '" frameborder="0" allowfullscreen></iframe>';
                    var popupOption = {
                        Title: 'simplePopup',
                        Top: '100',
                        Left: '100',
                        Height: '300',
                        Data: youtube,
                        Width: '400',
                        Draggable: false,
                        Position: 'absolute',
                        ShowClose: false,
                        Minimize: true,
                        ShowTitle: false,
                        CallbackBeforePopup: function () { },
                        CallbackaftePopUp: function () { }
                    };
                    ClearPopUp();
                    SimplePopup(popupOption);
                    $popUpModel.css('top', $('.main-top-row').height() + 10 + "px");
                    $popUpModel.find('.simple-popup-header').append(YTheader);
                    $popUpModel.draggable({
                        containment: '.main-container',
                        handle: '.popheader',
                        start: function (e, ui) {
                            $(ui.helper).css({
                                "position": "fixed"
                            });
                        },
                        stop: function (event, ui) {
                            AutoAlignDragger(ui.helper);
                        }
                    });
                    $('.resizeyt').off().on('click', function () {
                        $('.resizeyt.active').removeClass('active');
                        $(this).addClass('active');
                        var size = $(this).attr('data-size');
                        var height = 200;
                        var width = 300;
                        switch (size) {
                            case 'big':
                                height = 500;
                                width = 600;
                                break;
                            case 'medium':
                                height = 400;
                                width = 500;
                                break;
                            case 'small':
                                height = 300;
                                width = 400;
                                break;
                        }

                        $('#youtubePlayer').attr({
                            height: height + 'px',
                            width: width + 'px'
                        });
                        $popUpModel.css({
                            'height': height + 'px',
                            'width': width + 'px'
                        });
                    });
                    $('.backtohelp').on('click', function () {
                        HideSimplePopUp();
                        ClearPopUp();
                        $('.dropOverlay[data-pull="online help"]').trigger('click');
                    });

                    $popUpModel.addClass('helpVideo');
                    $('.hideOverlay').trigger('click');
                    $('.youtube-close-model').on('click', function () {
                        ClearPopUp();
                        HideSimplePopUp();
                    });
                    function ClearPopUp() {
                        $('.popheader').remove();
                        $popUpModel.removeClass('helpVideo').removeClass('ui-draggable');
                        $('.simple-popup-model-body').html('');
                    }
                });
            },
            TopStickEvents: function () {
                $('.dropOverlay').on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('clicked')) {
                        $('.hideOverlay').trigger('click');
                    }
                    else {
                        var $tochoose = $(this).attr('data-pull');
                        $('.SettingsUpperBody').animate({
                            'top': '-100%',
                            'height': '100%'
                        }, 400);
                        var $upper = $('.SettingsUpperBody[data-pull="' + $tochoose + '"] ');
                        $upper.show().addClass('active');
                        $upper.animate({
                            'top': '0%'
                        }, 400);
                        WebManagement.ShowStickeyHeaderOption('showoverlay');
                        $('.headerControls').removeClass('clicked');
                        $this.addClass('clicked');

                        switch ($tochoose) {
                            case "online component":
                                if (!$this.hasClass('called'))
                                    WebManagement.GetOnlineComponents(false, WebManagement.config.OnlineOffset, WebManagement.config.OnlineLimit, '');
                                break;
                            case "online site":
                                if (!$this.hasClass('called')) {
                                    WebManagement.GetOnlineSites(true, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, '');
                                    WebManagement.GetSectors(true);
                                }
                                break;
                            case "online help":
                                if (!$this.hasClass('called')) {
                                    WebManagement.GetWebHelp(true, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                                }
                                break;
                        }
                        $this.addClass('called');
                    }
                });
                $('.hideOverlay').on('click', function () {
                    var $upper = $('.SettingsUpperBody.active');
                    $upper.animate({
                        'top': '-100%'
                    }, 400).removeClass('active');
                    $('.headerControls').removeClass('clicked');
                });
                WebManagement.AdjustTopSitckyPadding();
            },
            AdjustTopSitckyPadding: function () {
                if ($('.edit-area').hasClass('site-header-sticky') || $('.edit-area').hasClass('site-header-fixed')) {
                    var $stickHeader = $('.editor-site-header > .editor-row');
                    var newPadding = parseInt($stickHeader.css('height').replace('px', ''));
                    $('.editor-componentWrapper').css('padding-top', newPadding);
                }
            },
            BindeOnlineComponets: function ($upper) {
                var listCompo = '';
                for (var i = 0; i < 10; i++) {
                    DOMCreate();
                    listCompo += DOMCreate('li', '', 'componentList', 'ComponentListOnline');
                }
                $upper.append(DOMCreate('ul', listCompo, 'componentList', 'ComponentListOnline'));
            },
            LayoutSet: function () {
                $(".layoutChange").on('click', function () {
                    var layoutClass = $(this).attr('data-layout');
                    WebManagement.RemoveHeaderClass();
                    $('.site-body').addClass(layoutClass);
                    webBuilderSettings.defaultLayout = layoutClass;
                    FixMenuOnResize();
                });
                $('.OptionItems > span > i').on('click', function () {
                    $(this).next().next().find('.layoutChange').trigger('click');
                });
                $('.OptionItems >  span > .itemname').on('click', function () {
                    $(this).next().find('.layoutChange').trigger('click');
                });
            },
            RemoveHeaderClass: function () {
                $('.site-body').removeClass('fullWidth').removeClass('boxed').removeClass('leftLayout').removeClass('rightLayout');
            },
            SetbackgroundColor: function () {
                $('#chooseBGcolor').css('background-color', webBuilderSettings.temporaryBackgroundcolor);
                var colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        var objColor = RenderCallBackColor(this);
                        $('.edit-area').css('background-color', objColor.bgColor);
                        webBuilderSettings.temporaryBackgroundcolor = objColor.bgColor;
                    }
                });
                $('#chooseBGcolor').colorPicker(colorPickerOption);
            },
            SetbackgroundWidth: function () {
                var $par = $('.edit-area');
                var sfBGWidth = $par.attr('class').match(/sfCol_[0-9]{1,3}/g);
                var bgWidth = 100;
                if (sfBGWidth !== null) {
                    bgWidth = sfBGWidth[0].split('_')[1];
                }
                function ChangeBackgroundWidth(space) {
                    var imageWidthClass = $par.attr('class').match(/sfCol_[0-9]{1,3}/g);
                    if (imageWidthClass !== null) {
                        $par.removeClass(imageWidthClass[0]);
                    }
                    $par.addClass('sfCol_' + space);
                    webBuilderSettings.temporaryWidth = 'sfCol_' + space;
                }
                AdvanceSageSlider($('#pageWidthSlider'), $('#pageWidthHandle'), 0, 100, bgWidth, ChangeBackgroundWidth, $par, '%');
            },
            SetThemeColor: function () {
                var colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        var objColor = RenderCallBackColor(this);
                        var colorPickerID = $elm.attr('id');
                        switch (colorPickerID) {
                            case 'primaryColor':
                                webBuilderSettings.primaryColor = objColor.bgColor;
                                //changing the color in color pallet
                                $('#primaryChange').css('background-color', objColor.bgColor);
                                //change  primary color in menu
                                var style = '';
                                var navStyleClasses = $('.editor-com-nav').attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses != null) {
                                    style = navStyleClasses[0];
                                }
                                MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                                break;
                            case 'secondaryColor':
                                //changing the color in color pallet
                                webBuilderSettings.secondaryColor = objColor.bgColor;
                                $('#secondaryChange').css('background-color', objColor.bgColor);
                                var style = '';
                                var navStyleClasses = $('.editor-com-nav').attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses != null) {
                                    style = navStyleClasses[0];
                                }
                                MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                                break;
                            case 'optionalColor':
                                //changing the color in color pallet
                                webBuilderSettings.optionalColor = objColor.bgColor;
                                $('#optionalChange').css('background-color', objColor.bgColor);
                                break;
                        }
                    }
                });
                $('.chooseThemeColor').colorPicker(colorPickerOption);
            },
            RemoveExtra: function () {
                var $editArea = $('.edit-area');
                $editArea.find('.editor-component').removeClass('ui-sortable');
                $editArea.find('.editor-component').removeClass('ui-droppable');
                $editArea.find('.resizebar').remove();
                $editArea.find('.noElement').remove();
            },
            RemoveForModule: function () {
                $('.editor-site-header').remove();
                $('#managePagePanel').remove();
                $('.viewports').remove();
                $('#previewURL').remove();
                $('#btnNexitWebbuilder').remove();
                $('#manageBody').remove();
                $('.box-title').text('Build your module');
                $('.HeaderOption').remove();
                $('.theme-color').remove();
                $('#tab-3').prop('checked', true);
                $('.moduleHidden').hide();
                $('#pageHandleHolder').show();
                $('#componentCollection').show();
            },
            RemoveForPage: function () {
                $('.box-title').text('Build your website on your own ');
            },
            LoadDetail: function () {
                WebManagement.RemoveExtra();
                if (WebManagement.config.enableHeader === "true") {
                    var htmlLength = $('.edit-area > .editor-site-header').length;
                    if (htmlLength > 0) {
                        var $siteHeaderSection = $('.editor-site-header');
                        htmlLength = $('.edit-area > .editor-site-header > div').length;
                        if (htmlLength > 0) {
                            //comparing the pages from database and in the frontend.
                            //removing pages in the menu if any pages has been deleted from admin\pages.
                            $('.edit-area > .editor-site-header').find('.eb-menu li > a > span').each(function () {
                                var $tempPage = $(this);
                                var pageNotFound = true;
                                $('#innerPageList li > a > span').each(function () {
                                    if ($(this).text().toLowerCase() === $tempPage.text().toLowerCase()) {
                                        pageNotFound = false;
                                    }
                                });
                                if (pageNotFound) {
                                    $tempPage.parent().parent().remove();
                                }
                            });
                        }
                        else {
                            $('.editor-site-header').append(EasyLibrary.ReadDOM("siteheadertab"));
                            $(".layoutChange").eq(0).trigger('click');
                            SettingEvents();
                            $('#setlayoutOptions').show();
                            $('.editor-site-header .editor-com-nav .eb-menu').html(EasyLibrary.PageListDOM());
                        }
                    }
                    else {
                        $('.edit-area').prepend(EasyLibrary.ReadDOM("siteheadertab"));
                        $(".layoutChange").eq(0).trigger('click');
                        SettingEvents();
                        $('#setlayoutOptions').show();
                        $('.editor-site-header .editor-com-nav .eb-menu').html(EasyLibrary.PageListDOM());
                    }
                }
                else {
                    WebManagement.RemoveForModule();
                }
                if ($('.edit-area > .editor-site-footer > div').length === 0) {
                    $('.editor-site-footer').append(EasyLibrary.ReadDOM("onecolumnfooter"));
                }
                ActiveMenu();
                var data = '';
                if ($('.editor-componentWrapper').length > 0) {
                    var htmlLength = $('.editor-componentWrapper > div').length;
                    if (htmlLength > 0) {
                        //load data in content-area
                        $('.heartBeat').each(function () {
                            $(this).removeClass('heartBeat');
                        });
                        $('.editor-col').each(function () {
                            BindColumnEvents($(this));
                        });
                        RowEvents();
                        SettingEvents();
                        DeleteComponent();
                    }
                    else {
                        $('.editor-componentWrapper').append(noElement);
                    }
                }
                else {
                    $('.edit-area').append(DOMCreate('div', '', 'editor-componentWrapper clearfix'));
                    $('.editor-componentWrapper').append(noElement);
                }

                DraggableSortable();
            },
            UpdateComponentForDev: function (componentName, $componentValue, UniversalComponentID, category, iconClass, classess, dependencies) {
                var componentValue = JSONStringify($componentValue);
                var success = false;
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objBuilComponent: {
                            ComponentName: componentName,
                            UniversalComponentID: UniversalComponentID,
                            ComponentValue: componentValue,
                            portalID: parseInt(SageFramePortalID),
                            userName: SageFrameUserName,
                            userModuleID: webBuilderUserModuleID,
                            secureToken: SageFrameSecureToken
                        }
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/UpdateComponentForDev',
                    success: function (data) {

                    },
                    error: function () {
                    },
                });
                return success;
            },
            UpdateComponent: function (componentName, $componentValue, UniversalComponentID, category, iconClass, classess, dependencies) {
                var componentValue = JSONStringify($componentValue);
                var success = false;
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objBuilComponent: {
                            ComponentName: componentName,
                            UniversalComponentID: UniversalComponentID,
                            ComponentValue: componentValue,
                            portalID: parseInt(SageFramePortalID),
                            userName: SageFrameUserName,
                            userModuleID: webBuilderUserModuleID,
                            secureToken: SageFrameSecureToken
                        }
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/UpdateComponent',
                    success: function (data) {
                        if (data.d == -2) {
                            alert("EasyBuilder verson is less than required verison.Go to upgrader to update first.");
                        }
                        else if (data.d > 0) {
                            //var $componentList = $('#componentCollection > .components-list-array');
                            //var compo = DOMCreate('i', '', iconClass) + '<br />' + componentName;
                            //compo = DOMCreate('span', compo, classess, '', ['draggable="true"', 'data-type="' + componentName + '"']);
                            //switch (category) {
                            //    case 'layout':
                            //        layoutDOM += compo;
                            //        break;
                            //    case 'basic':
                            //        var $chooseDOM = $componentList.find('> .basic > .comItems');
                            //        $chooseDOM.append(compo);
                            //        $chooseDOM.prev().trigger('click');
                            //        break;
                            //    case 'advance':
                            //        var $chooseDOM = $componentList.find(' >.advance > .comItems');
                            //        $chooseDOM.append(compo);
                            //        $chooseDOM.prev().trigger('click');
                            //        break;
                            //    case 'pro':
                            //        var $chooseDOM = $componentList.find('> .pro > .comItems');
                            //        $chooseDOM.append(compo);
                            //        $chooseDOM.prev().trigger('click');
                            //        break;
                            //}
                            //component[componentName] = $componentValue;
                            //DraggableSortable();
                            //$('.hideOverlay').trigger('click');
                            //$('.addComponent').trigger('click');
                            //success = true;
                            window.location = window.location.href;
                        }
                        else {
                            alert("Error Occurred.");
                        }
                    },
                    error: function () {
                    },
                });
                return success;
            },
            UpdateComponentOnly: function (componentName, $componentValue, UniversalComponentID) {
                var componentValue = JSONStringify($componentValue);
                var success = false;
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objBuilComponent: {
                            ComponentName: componentName,
                            UniversalComponentID: UniversalComponentID,
                            ComponentValue: componentValue,
                            portalID: parseInt(SageFramePortalID),
                            userName: SageFrameUserName,
                            userModuleID: webBuilderUserModuleID,
                            secureToken: SageFrameSecureToken
                        }
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/UpdateComponent',
                    success: function (data) {

                    },
                    error: function () {
                    },
                });
                return success;
            },
            DownloadDependenciew: function (dependenciesName) {
                var componentValue = JSONStringify($componentValue);
                var success = false;
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objBuilComponent: {
                            ComponentName: componentName,
                            UniversalComponentID: UniversalComponentID,
                            ComponentValue: componentValue,
                            portalID: parseInt(SageFramePortalID),
                            userName: SageFrameUserName,
                            userModuleID: webBuilderUserModuleID,
                            secureToken: SageFrameSecureToken
                        }
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: WebManagement.config.onlinestoreURL + '/GetDependencies',
                    success: function (data) {
                        //WebManagement.UpdateComponentOnly();
                    },
                    error: function () {
                    },
                });
                return success;
            },
            DuplicateComponent: function (componentName) {
                var unique = true;
                $.each(component, function (i, v) {
                    var name = v.componentname;
                    if (name === componentName) {
                        unique = false;
                    }
                });
                return unique;
            },
            Installpage: function () {
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({ objWebsite: Website }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/CreateSite',
                    success: function (data) {

                    },
                    error: function () {
                    },
                });
            },
            ShowStickeyHeaderOption: function (cases) {
                switch (cases) {
                    case 'showsidebar':
                        $('.main-left').css('top', $('.main-top-row').height() + 10 + "px");
                        $('.headerControls').removeClass('clicked');
                        $('.main-left').show();
                        HidePopUpSetting();
                        $('.hideOverlay').trigger('click');
                        break;
                    case 'showoverlay':
                        $('.main-left').hide();
                        HidePopUpSetting();
                        break;
                    case 'pagesettingshow':
                        $('.hideOverlay').trigger('click');
                        break;
                    default:
                }
            },
            ExtractSite: function () {
                Website.PortalID = SageFramePortalID;
                Website.UserModuleID = WebManagement.config.userModuleID;
                Website.UserName = SageFrameUserName;
                Website.SecureToken = SageFrameSecureToken;
                Website.Culture = SageFrameCurrentCulture;
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({ objWebsite: Website }),
                    dataType: 'json',
                    crossDomain: true,
                    url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/ExtractSite',
                    success: function (data) {
                        if (data != null && data.d != null) {
                            var respose = data.d;
                            respose.__type = "WebbuilderSite";
                            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(respose));
                            var dlAnchorElem = document.getElementById('downloadAnchorElem');
                            dlAnchorElem.setAttribute("href", dataStr);
                            dlAnchorElem.setAttribute("download", "one.json");
                            dlAnchorElem.click();
                        }
                    },
                    error: function () {
                    },
                });
            }
        };
        WebManagement.Init();
    };
    $.fn.SageWebBuilder = function (p) {
        $.WebBuilder(p);
    };
})(jQuery);

function DraggableSortable() {
    $(".editor-col").sortable({
        revert: 0,
        delay: 150,
        items: 'div.editor-component',
        cancel: '.col-options',
        handle: ".sortComponent",
        helper: function () {
            return $('<div class="comhelperBox" style="height:40px;width:100px;"></div>');
        },
        //containment: '.editor-componentWrapper',
        connectWith: '.editor-col',
        cursorAt: { left: 5, top: 5 },
        placeholder: 'ui-state-com-sortable-hover ui-hover-state',
        stop: function (event, ui) {
            var dataType = $(ui.item[0]).find('> .carries-options').find('.com-settings').attr('data-type');
            if (dataType !== "undefined") {
                if (typeof component[dataType].onsort !== "undefined") {
                    component[dataType].onsort($(ui.item[0]));
                }
            }
        },
        receive: function (event, ui) {
            $(this).find(".column-data-empty").remove();
        }
    }).droppable({
        accept: ".comBasic",
        //function (draggeds) {
        //    if (draggeds.attr('drg_time')) {
        //        return draggeds.attr('drg_time') == this.drg_time
        //    }
        //    return draggeds.hasClass('comBasic')
        //},
        greedy: true,
        tolerance: 'pointer',
        hoverClass: "ui-state-com-droppable-hover ui-hover-state",
        drop: function (event, ui) {
            var $this = $(this);
            var item = $(ui.draggable);
            var dataType = item.attr('data-type');
            var appendDOM = '';

            if (typeof (component[dataType].defaultdata) !== 'undefined') {
                appendDOM = component[dataType].defaultdata;
            }
            var $appendLayer = $(appendDOM);
            var $appendedParent = $this;
            var $shadedLayer = $this.find(' > .editor-row-shaded-layer');
            if (typeof ($shadedLayer) === 'undefined' || $shadedLayer.length == 0) {
            }
            else {
                $appendedParent = $shadedLayer;
            }
            //beforedrop callbackfunction
            if (typeof (component[dataType].beforedrop) !== 'undefined') {
                component[dataType].beforedrop($appendedParent, $appendLayer, true);
            }
            if ($this.find(".column-data-empty").length > 0) //add first element when cart is empty
            {
                $this.find(".column-data-empty").remove();
                $appendedParent.append($appendLayer);
            } else {
                var i = 0; //used as flag to find out if element added or not
                $appendedParent.children('.editor-component').each(function () {
                    if ($(this).offset().top >= ui.offset.top) //compare
                    {
                        $appendLayer.insertBefore($(this));
                        i = 1;
                        return false; //break loop
                    }
                });

                if (i !== 1) //if element dropped at the end of cart
                {
                    $appendedParent.append($appendLayer);
                }
            }
            DraggableSortable();
            SettingEvents($appendLayer);
            //afterDrop callbackfunction
            if (typeof (component[dataType].afterdrop) !== 'undefined') {
                component[dataType].afterdrop($appendedParent, $appendLayer, true);
            }

            //afterDrop callbackfunction
            if (typeof (component[dataType].dropstop) !== 'undefined') {
                component[dataType].dropstop($appendedParent, $appendLayer, true);
            }
            EasyLibrary.GenerateAndAppendID($appendLayer, 'row');
            EasyLibrary.GenerateAndAppendDataType($appendLayer, dataType);
            DeleteComponent($appendLayer);
            //$(".editor-col").droppable("enable");
        },
        over: function (event, ui) {
            //$(".editor-col").not($(this)).droppable("disable");
            //$(".editor-col").droppable("disable");
            //$(this).droppable("enabled");
            //ui.draggable.attr('drg_time', this.drg_time = evt.timeStamp);
            //$(this).is(':visible')
        },
        out: function (event, ui) {
            //$(".editor-col").droppable("enable");
            //ui.draggable.removeAttr('drg_time');
        }
    });
    var i = 0;
    $(".editor-componentWrapper").sortable({
        revert: true,
        items: '.editor-row',
        handle: '.dragRow',
        cursorAt: { left: 5, top: 5 },
        helper: function (event, ui) {
            return $('<div class="rowhelperBox" style="height:40px;width:100%;"></div>');
        },
        placeholder: 'ui-state-Sortablerow-hover ui-hover-state',
        containment: '.edit-area',
        stop: function (event, ui) {

        }
    }).droppable({
        accept: ".rowBasic",
        greedy: true,
        hoverClass: "ui-state-row-hover ui-hover-state",
        drop: function (event, ui) {
            var $this = $(this);
            var item = $(ui.draggable);
            var dataType = item.attr('data-type');
            var rowDOM = '';
            if (typeof (dataType) !== 'undefined') {
                if (typeof (component[dataType].defaultdata !== 'undefined')) {
                    rowDOM = component[dataType].defaultdata.trim();
                }
            }
            var $selectedRow = $(rowDOM);
            //beforedrop callbackfunction
            if (typeof (component[dataType].beforedrop) !== 'undefined') {
                component[dataType].beforedrop($('.editor-componentWrapper'), $selectedRow, true);
            }
            if ($(this).find(".noElement").length > 0) //add first element when cart is empty
            {
                $(this).find(".noElement").remove();
                $('.rowBasic').removeClass('heartBeat');
                $('.editor-componentWrapper').append($selectedRow);
            } else {
                var i = 0; //used as flag to find out if element added or not
                $(this).children('.editor-row').each(function () {
                    if ($(this).offset().top >= ui.offset.top) //compare
                    {
                        $selectedRow.insertBefore($(this));
                        i = 1;

                        return false; //break loop
                    }
                });
                if (i !== 1) //if element dropped at the end of cart
                {
                    $('.editor-componentWrapper').append($selectedRow);
                }
            }
            DraggableSortable();
            RowEvents();
            DeleteComponent($selectedRow);
            SettingEvents($selectedRow);
            BindColumnEvents($selectedRow);
            EasyLibrary.GenerateAndAppendID($selectedRow, 'row');
            EasyLibrary.GenerateAndAppendDataType($selectedRow, dataType);
            //afterDrop callbackfunction
            if (typeof (component[dataType].afterdrop) !== 'undefined') {
                component[dataType].afterdrop($('.editor-componentWrapper'), $selectedRow, true);
            }

            //afterDrop callbackfunction
            if (typeof (component[dataType].dropstop) !== 'undefined') {
                component[dataType].dropstop($('.editor-componentWrapper'), $selectedRow, true);
            }

            //creating dynamic Id

            ScrollToTop();
            function ScrollToTop() {
                var top = $selectedRow.offset().top - 100;
                $('body, html').animate({
                    scrollTop: top + 'px'
                }, 1000, function () {
                    $selectedRow.addClass('focuscompo');
                    setTimeout(function () {
                        $selectedRow.removeClass('focuscompo');
                    }, 1000);
                });
            }
        }
    });
    $(".comBasic").draggable({
        //connectToSortable: ".editor-col",
        helper: "clone",
        revert: true,
        cursor: 'pointer',
        connectWith: '.editor-col',
        containment: '.main-container',
        start: function (event, ui) {
            HideSimplePopUp();
        }
    });
    $(".rowBasic").draggable({
        helper: "clone",
        revert: true,
        cursor: 'pointer',
        connectWith: '.editor-componentWrapper',
        containment: '.main-container',
        start: function (event, ui) {
            HideSimplePopUp();
        }
    });
}
function BindColumnEvents($parentCol) {
    $parentCol.find('.copyData').off().on('click', function () {
        var $this = $(this);
        $('.copyData').removeClass('readyCopy');
        $this.addClass('readyCopy');
        if ($this.parent().parent().find('.column-data-empty').length == 0) {
            $('.pasteData').removeClass('inactivePaste').addClass('activePaste');
        }
    });
    $parentCol.find('.pasteData').off().on('click', function () {
        var $this = $(this);
        var $canCopy = $('.copyData.readyCopy');
        var $copyParent = $('.copyData.readyCopy').parent().parent();
        if ($canCopy.length > 0 && $copyParent.find('.column-data-empty').length == 0) {
            var html = $copyParent.html();
            var $pasteParent = $this.parent().parent();
            var $isColEmpty = $pasteParent.find('.column-data-empty');
            $pasteParent.append(html);
            $pasteParent.find(' > .col-options').eq(1).remove();
            $pasteParent.find(' > .carrier-open-option').eq(1).remove();
            $isColEmpty.remove();
            //if ($isColEmpty.length == 0) {
            //}
            //else {
            //    var classList = $pasteParent.attr('class');
            //    var sfColClass = classList.match(/sfCol_[0-9]{1,3}/g);
            //    if (sfColClass !== null) {
            //        classList = sfColClass[0];
            //    }
            //    $pasteParent.attrs($copyParent.attrs());
            //    var newclassList = $pasteParent.attr('class');
            //    sfColClass = newclassList.match(/sfCol_[0-9]{1,3}/g);
            //    if (sfColClass !== null) {
            //        newclassList = newclassList[0];
            //    }
            //    $pasteParent.addClass(classList).removeClass(newclassList);
            //}
            CopyPasteEvents($pasteParent);
        }
    });
    $parentCol.find('.emptyColumnData').off().on('click', function () {
        var $this = $(this);
        SageConfirmDialog('Do you want to empty column data ?').done(function () {
            var $myCol = $this.parent().parent();
            $myCol.find('div').not('.col-options').not('.column-data-empty').remove();
        });
    });
    $parentCol.find('.showhideColumns').off().on('click', function () {

        var $parent = $(this).parent();
        if ($parent.hasClass('activeOption')) {
            $parent.removeClass('activeOption');
        }
        else {
            $('.carries-options.col-options').removeClass('activeOption');
            $parent.addClass('activeOption');
        }

    });
}
function RowEvents() {
    $('.copyRow').off().on('click', function () {
        var $this = $(this);
        var $copyParent = $this.parents('.editor-row');
        var copyAttrs = $copyParent.attrs();
        var $html = $(DOMCreate('div', $copyParent.html(), 'editor-row sfCol_100'));
        $html.insertAfter($copyParent);
        $html.attrs(copyAttrs);
        RowEvents();
        DraggableSortable();
        SettingEvents();
        BindColumnEvents($html);
        DeleteComponent($html);
        ApplyHover($html);
        TriggerView($html);
    });
}
function ApplyHover($par) {
    $par.find('.hovered').each(function () {
        MouseOverEffect($(this));
    });
}
function CopyPasteEvents($pasteParent) {
    SettingEvents($pasteParent);
    DeleteComponent($pasteParent);
    ApplyHover($pasteParent);
    $pasteParent.find('.editor-component').each(function (index, value) {
        var $this = $(this);
        var key = $this.find(' > .carries-options > .com-settings').attr('data-type');
        var compo = component[key];
        if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined")
            compo.afterdrop($this.parent(), $this, false, true);
    });
}
function AutoAlignDragger($helper) {
    var offsets = $helper.position();
    var top = offsets.top;
    var screenHeight = ScreenDimension().height;
    if ((screenHeight - 100) < top) {
        $helper.css('top', (screenHeight - 100) + "px");
    }
    else if ($('.main-top-row').height() > top) {
        $helper.css('top', $('.main-top-row').height() + 10 + "px");
    }
}
function EditableSetBreak() {
    $('[contenteditable]').not('.nobreak').off().on('keydown', function (e) {
        // trap the return key being pressed
        if (e.keyCode === 13) {
            // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
            document.execCommand('insertHTML', false, '<br /><br />');
            // prevent the default behaviour of return key pressed
            return false;
        }
    });
}
function TextSetting($parent, $textChange) {
    InitEvents();
    LoadSettings();
    function InitEvents() {
        TextTranformCheck();
        FontWidth();
    }
    function FontWidth() {
        var fontWidth = 100;
        var $parentWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
        if ($parentWidthClass !== null) {
            fontWidth = parseInt($parentWidthClass[0].replace('sfCol_', ''));
            $('#fontWidthSlider').show();
        }
        else {
            $('#fontWidthSlider').hide();
        }
        function fonstWidthSlider(space) {
            var $parentWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
            if ($parentWidth !== null) {
                $parent.removeClass($parentWidth[0]).addClass('sfCol_' + space);
            }
            else {
                $parent.addClass('sfCol_' + space);
            }
        }
        AdvanceSageSlider($('#fontWidthSlider'), $('#fontWidthHandle'), 1, 100, fontWidth, fonstWidthSlider, $parent, '%');
    }
    function TextTranformCheck() {
        var trasformValue = '';
        if ($textChange.hasClass('editor-text-transform-uppercase')) {
            trasformValue = 'editor-text-transform-uppercase';
        }
        else if ($textChange.hasClass('editor-text-transform-lowercase')) {
            trasformValue = 'editor-text-transform-lowercase';
        }
        $('#textTransform').val(trasformValue);
        $('#textTransform').on('change', function () {
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
    function LoadSettings() {
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
        AdvanceSageSlider($('#fontsizeSlider'), $('#fontsizeHandle'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
        var letteSpace = 0;
        var removeClass = '';
        if (typeof ($textChange.attr('class')) !== 'undefined') {
            var letterSpacingNegClass = $textChange.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
            if (letterSpacingNegClass !== null) {
                removeClass = letterSpacingNegClass[0].trim();
                letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-neg-', ''));
            }
            else {
                var letterSpacingPosClass = $textChange.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                if (letterSpacingPosClass !== null) {
                    removeClass = letterSpacingPosClass[0].trim();
                    letteSpace = parseInt(removeClass.replace('editor-text-letterSpacing-', ''));
                }
            }
        }

        function LetteSpaceChange(space) {
            var addClass = '';
            var removeClass = '';
            if (typeof ($textChange.attr('class')) !== 'undefined') {
                var negClass = $textChange.attr('class').match(/editor-text-letterSpacing-neg-[0-9]{1,2}/g);
                if (negClass !== null) {
                    removeClass = negClass[0].trim();
                }
                else {
                    var posClass = $textChange.attr('class').match(/editor-text-letterSpacing-[0-9]{1,2}/g);
                    if (posClass !== null) {
                        removeClass = posClass[0].trim();
                    }
                }
            }
            if (space >= 0) {
                addClass = 'editor-text-letterSpacing-' + space;
            }
            else {
                space = Math.abs(space);
                addClass = 'editor-text-letterSpacing-neg-' + space;
            }
            $textChange.removeClass(removeClass).addClass(addClass);
        }
        AdvanceSageSlider($('#letterSpacingSlider'), $('#letterSpacingHandle'), -10, 10, letteSpace, LetteSpaceChange, $parent, 'px');
        loadColorPicker();
        LoadFontFamily();
    }
    function loadColorPicker() {
        $('#chooseFontColor').css('background-color', $textChange.css('color'));
        var colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                var objColor = RenderCallBackColor(this);
                $textChange.css({ 'color': objColor.bgColor });
            }
        });
        $('#chooseFontColor').colorPicker(colorPickerOption);

    }
    function LoadFontFamily() {
        $('#fontfamily').html(DOMFontAdvanceCollection());

        var defaultFontFamily = 'montserrat';
        var classesList = $textChange.attr('class');
        if (typeof (classesList) !== "undefined") {
            var fontClasses = classesList.match(/ff-(\w+)/g);
            if (fontClasses !== null) {
                defaultFontFamily = fontClasses[0].replace('ff-', '');
            }
        }
        $('#fontfamily').val(defaultFontFamily);
        fontWeight(defaultFontFamily);
        if (typeof (classesList) !== "undefined") {
            var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
            if (weightClasses !== null) {
                $('#fontWeight').val(weightClasses[0].replace('f-weight-', ''));
            }
        }
        $('#fontWeight').on('change', function () {
            var classList = $textChange.attr('class');
            if (typeof (classesList) !== "undefined") {
                var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                if (familyClass !== null) {
                    $textChange.removeClass(familyClass[0]);
                }
            }
            $textChange.addClass('f-weight-' + $(this).val());
        });

        $('#fontfamily').on('change', function () {
            var classList = $textChange.attr('class');
            if (typeof (classesList) !== "undefined") {
                var fontClass = classList.match(/ff-(\w+)/g);
                if (fontClass !== null) {
                    $textChange.removeClass(fontClass[0]);
                }
            }
            $textChange.addClass('ff-' + $(this).val());
            fontWeight($(this).val());
            $('#fontWeight').trigger('change');
        });
        function fontWeight(fontName) {
            var fontDOM = DOMFontWeight(fontName);
            if (fontDOM.length > 0) {
                $('#fontWeight').html(fontDOM);
            }
        }
    }
}
function SaveMessageShow(message, iconClass) {
    if (typeof iconClass === "undefined")
        iconClass = 'fa fa-spinner fa-spin fa-3x fa-fw';
    var html = '<div class="fullpage-layer-pop savingLayer dis-table" style="display:none;" >';
    html += '<div class="inner-content dis-table-cell" id="message">';
    html += '<span><i class="' + iconClass + '"></i></span>';
    html += '<span>' + message + '</span>';
    html += '</div>';
    html += '</div>';
    $('body').append(html);
    $('.fullpage-layer-pop.savingLayer.dis-table').fadeIn(1);
}
function SaveMessageRemove() {
    var html = '<span><i class="fa fa-check" aria-hidden="true"></i></span>';
    $('.fullpage-layer-pop.savingLayer.dis-table').find('#message').html(html);
    $('.fullpage-layer-pop.savingLayer.dis-table').fadeOut(400);
    $('.fullpage-layer-pop.savingLayer.dis-table').remove();
}
//Fixed header case showing options =============================
function SetToggleValueBasedOnHideElement($element, $toggleBoxID) {

    // Description :  [ SET THE VALUE OF TOGGLE BOX BASED ON THE THE HTML CLASS PRESENT IN THE $element ] 
    // Implementation : Load DOM Settings

    if (!$element.hasClass('hide-element')) $($toggleBoxID).prop('checked', true);
}
function SetEventToShowHideElement($item, $toggleButton, $effectedElement) {
    // Description : [ SHOW / HIDE $effectedElement BASED ON THE VALUE OF $toggleButton  ]
    // Implementation : Init Events
    $toggleButton.off().on('click', function () {
        var isChecked = $(this).is(':checked');
        if (!isChecked) {
            $effectedElement.addClass('hide-element');
            SettingEvents();
        }
        else {
            $effectedElement.each(function () {
                var $im = $(this);
                $(this).removeClass('hide-element');
            });
        }
        component.carousel.settingDOMs.tabs.Data.onload($item);
    });
}
//$(function () {
//    setTimeout(function () {
//        window.location = window.location.href;
//    }, 3000);
//});