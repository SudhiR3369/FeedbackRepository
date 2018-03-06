//    divStart('text-options carries-options');
//imageOption += '<i class="opt-name">Image</i>';
//imageOption += '<i class="icon-icon-drag sortComponent" title="drag"></i>';
//imageOption += '<i class="icon-icon-settings row-setting com-settings" data-type="image" title="image setting"></i>';
//imageOption += '<i class="icon-icon-delete"></i>';
//imageOption += divEnd;


//var fontOption = divStart('font-options carries-options');
//fontOption += '<i class="opt-name">Font</i>';
//fontOption += '<i class="icon-icon-drag sortComponent" title="drag"></i>';
//fontOption += '<i class="icon-icon-settings row-setting com-settings" data-type="paragraph" title="font icon setting"></i>';
//fontOption += '<i class="icon-icon-delete"></i>';
//fontOption += divEnd;

//var holderOption = HolderOptionDOM();
//function HolderOptionDOM() {
//    var holderOption = divStart('text-options carries-options');
//    holderOption += '<i class="opt-name">Holder</i>';
//    holderOption += '<i class="icon-icon-drag sortComponent" title="drag"></i>';
//    holderOption += '<i class="icon-icon-settings row-setting com-settings" data-type="holder" title="text setting"></i>';
//    holderOption += '<i class="icon-icon-delete"></i>';
//    holderOption += divEnd;
//    return holderOption;
//}

//colOption = divStart('col-options  carries-options');
//colOption += '<i class="opt-name">Col</i>';
//colOption += '<i class="icon-icon-copy copyData" title="Copy data"></i>';
//colOption += '<i class="icon-icon-paste inactivePaste pasteData" title="Paste data"></i>';
//colOption += '<i class="icon-icon-settings row-setting com-settings" data-type="column" title="column setting"></i>';
//colOption += '<i class="icon-icon-empty emptyColumnData" title="Empty Column data"></i>';
//colOption += divEnd;


//var underlineOption = underline();
//function underline() {
//    var lineDom = divStart('underline-options ');
//    lineDom += '<i class="opt-name">UnderLine</i>';
//    lineDom += '<i class="icon-icon-drag sortComponent" title="drag"></i>';
//    lineDom += '<i class="icon-icon-settings row-setting com-settings" data-type="rowseparator" title="underline setting"></i>';
//    lineDom += '<i class="icon-icon-delete"></i>';
//    lineDom += divEnd;
//    return lineDom;
//}


$appendLayer.find('.editor-component.image').find('img').each(function () {
    var $this = $(this);
    if (!$this.hasClass('imgCreateCol'))
        SageMedia($(this));
});

$appendLayer.each(function () {
    var $this = $(this);
    if (!$this.hasClass('imgCreateCol'))
        SageMedia($(this));
});

$appendLayer.on('mouseover mousein', function () {
    $(imageOption).insertAfter($appendLayer);
    var pos = $appendLayer.position();
    var top = pos.top;
    var left = pos.left;
    var height = parseInt($appendLayer.css('height').replace('px', ''));
    $('.img-options').css({
        'position': 'absolute',
        'top': top + height / 2 + 'px',
        'left': '0px',
        'visibility': 'visible',
        'opacity': 1
    });
});
$appendLayer.on('mouseout', function () {
    $('.img-options').remove();
});



//body {
//    height: 100%;
//    //background-color: white !important;
//    position: relative !important;
//}

//"Simple Slider": {
//    "componentname": "Simple Slider",
//    "category": "pro",
//    "icon": "icon icon-img-slider",
//    "row": true,
//    "hidden": false,
//    "defaultdata": $("#simpleslider").html().trim(),
//    "afterdrop": function ($appendedParent, $appendLayer, dropped) {
//        if ($appendLayer.hasClass('site-body')) {
//            var $imageSlider = $('.ImageSliderWrapper');
//            $imageSlider.removeClass('binded');
//            $imageSlider.each(function (index, value) {
//                let carousel = new CarouselInit($(this));
//            });
//        }
//        else {
//            let carousel = new CarouselInit($appendLayer);
//        }
//        if (typeof (dropped) !== "undefined") {
//            if (dropped)
//                AdjustSize($appendLayer);
//        }
//    },
//    "loadSetting": function ($item) {
//    },
//    "settingDOMs": {
//        "tabs": {
//            "Basic":
//            {
//                "DOM": "<span>Hello</span>",
//                "onload": function ($item) {

//                }
//            },
//            "Background":
//                {
//                    "options": ["image", "color"]
//                },
//            "Spacing":
//                {
//                    "options": {
//                        "margin": {
//                            "max": 40,
//                            "min": -40,
//                            "times": 5,
//                            "position": ["all", "top", "left", "bottom", "right"]
//                        },
//                        "padding": {
//                            "max": 40,
//                            "min": 0,
//                            "times": 5,
//                            "position": ["all", "top", "left", "bottom", "right"]
//                        }
//                    }
//                },
//            "Alignment":
//                {
//                    "options": ["left", "center", "right"]
//                },
//            "Border": {
//                "options": {
//                    "max": 20,
//                    "min": 0,
//                    "times": 1,
//                    "position": ["all", "top", "right", "bottom", "left"],
//                    }
//            },
//            "Box Radius":
//                {
//                    "options": {
//                        "max": 50,
//                        "min": 0,
//                        "times": 1,
//                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
//                    }
//                },
//            "Box Shadow":
//                {
//                    "options": {

//                    }
//                }
//        },
//        "selectLayer": function ($elem) {
//            $(".editor-row").removeClass("activeSetting");
//            var $parent = $elem.parents(".editor-row");
//            $parent.addClass("activeSetting");
//            return $parent;
//        },
//        }
//},

//"Simple Footer": {
//    "componentname": "Simple Footer",
//    "category": "pro",
//    "icon": "icon-icon-row",
//    "row": true,
//    "hidden": false,
//    "defaultdata": $('#simpleFooter').html().trim(),
//    "afterdrop": function ($appendedParent, $appendLayer) {
//        //$appendedParent.find('.editor-component.image').find('img').each(function () {
//        //    var $this = $(this);
//        //    if (!$this.hasClass('imgCreateCol'))
//        //        SageMedia($(this));
//        //});
//    },
//        "loadSetting": function ($item) {
//        }
//},

//function GeneralOptionDOM(optionClass, label, dataType, isdraggable, dragHandle, canDuplicate, duplicateClass, canPaste, pasteClass, showBurgerMenu) {
//    var optionDOM = '';
//    //text to know the option
//    if (typeof (showBurgerMenu) !== "undefined") {
//        optionDOM += DOMCreate('i', '', 'fa fa-bars showhideColumns', '', []);
//    }
//    //optionDOM += DOMCreate('i', label, 'opt-name', '', ['title="option name"']);
//    //copy option
//    if (typeof (canDuplicate) !== "undefined" && canDuplicate)
//        optionDOM += DOMCreate('i', '', 'icon-icon-copy ' + duplicateClass, '', ['title="duplicate"']);
//    //paste option
//    if (typeof (canPaste) !== "undefined" && canPaste)
//        optionDOM += DOMCreate('i', '', 'icon-icon-paste inactivePaste ' + pasteClass, '', ['title="paste"']);
//    //setting options
//    optionDOM += DOMCreate('i', '', 'icon-icon-settings row-setting com-settings', '', ['title="' + label + ' settings"', 'data-type="' + dataType + '"']);
//    //delete  options
//    optionDOM += DOMCreate('i', '', 'icon-icon-delete deletehelper', '', ['title="delete"']);
//    //Wrap options in carries-options
//    //drag option
//    var tooglereplace = '';
//    if (isdraggable)
//        tooglereplace += DOMCreate('i', '', 'icon-icon-drag ' + dragHandle, '', ['title="drag"']);
//    tooglereplace += label + DOMCreate('i', '', 'tooglesettings fa fa-bars ');
//    optionDOM = DOMCreate('div', tooglereplace, 'carrier-open-option', '') + DOMCreate('div', optionDOM, 'hide-element  carries-options ' + optionClass);
//    return optionDOM;
//}

//function spanStart(divClass) {
//    return '<span class="' + divClass + '">';
//}

//BrowserOverride: function () {
//    //$(document).keydown(function (event) {
//    //    //f12
//    //    if (event.keyCode == 123) {
//    //        return false;
//    //    }
//    //    else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
//    //        return false;
//    //    }
//    //    //cltr+s
//    //    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) {
//    //        return true;
//    //        alert("Ctrl-S pressed");
//    //        event.preventDefault();
//    //        return false;
//    //    }
//    //});

//    //$(document).on("contextmenu", function (e) {
//    //    e.preventDefault();
//    //});
//    document.addEventListener("keydown", function (e) {
//        //if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
//        //    alert('cltr+s');
//        //    e.preventDefault();
//        //    // Process event...
//        //}
//        if (e.keyCode == 73 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
//            //alert('cltr+c');
//            e.preventDefault();
//            // Process event...
//        }
//        //f12
//        //if (event.keyCode == 112) {
//        //    $('.dropOverlay[data-pull="online help"]').trigger('click');
//        //    return false;
//        //}
//    });
//    //function disableCtrlKeyCombination(e) {
//    //    //list all CTRL + key combinations you want to disable
//    //    var forbiddenKeys = new Array("a", "s", "c");
//    //    var key;
//    //    var isCtrl;

//    //    if (window.event) {
//    //        key = window.event.keyCode;     //IE
//    //        if (window.event.ctrlKey)
//    //            isCtrl = true;
//    //        else
//    //            isCtrl = false;
//    //    }
//    //    else {
//    //        key = e.which;     //firefox
//    //        if (e.ctrlKey)
//    //            isCtrl = true;
//    //        else
//    //            isCtrl = false;
//    //    }

//    //    //if ctrl is pressed check if other key is in forbidenKeys array
//    //    if (isCtrl) {
//    //        for (var i = 0; i < forbiddenKeys.length; i++) {
//    //            //case-insensitive comparation
//    //            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
//    //                //                                    alert("Key combination CTRL + "
//    //                //                                                + String.fromCharCode(key)
//    //                //                                                + " has been disabled.");                                    
//    //                return false;
//    //            }
//    //        }
//    //    }
//    //    return true;
//    //}

//},



//$('.selectData').on('click', function () {
//    var $this = $(this);
//    SageConfirmDialog('Do you want to change Footer data ?').done(function () {
//        $('.editor-site-footer').html($this.html());
//        DraggableSortable();
//        DeleteComponent();
//        SettingEvents();
//        BindColumnEvents($('.editor-site-footer'));
//        CloseFullPagePopup();
//        WebManagement.FooterInit();
//    });
//});
//ResizeColumnEvent: function ($parent) {
//    var $cloneObject = null;
//    var $prevElem = null;
//    var $nextElem = null;
//    var $parentElem = null;
//    $parent.find('.resizebar').on('mouseenter', function (event) {
//        $cloneObject = null;
//        var $this = $(this);
//        $prevElem = $this.prev();
//        $nextElem = $this.next();
//        $parentElem = $this.parent();
//        if (!$this.hasClass('moveme')) {
//            $this.addClass('moveme');
//            $cloneObject = $this.clone();
//            var left = parseInt($prevElem.attr('data-width')) + parseInt($prevElem.position().left);
//            var parentElemWidth = $parentElem.width();
//            var sfpreColVal = $prevElem.attr('class').match(/sfCol_[0-9]{1,3}/g);
//            var sfnextColVal = $nextElem.attr('class').match(/sfCol_[0-9]{1,3}/g);

//            if (sfpreColVal !== null) {
//                var sfColPer = parseInt(sfpreColVal[0].split('_')[1]);
//                var $prevElemLeft = $prevElem.position().left;
//                left = $prevElemLeft + ((sfColPer * parentElemWidth) / 100) - 2;
//            }
//            $parentElem.append($cloneObject);
//            $cloneObject.css({
//                'position': 'absolute',
//                'left': left + 'px'
//            });
//            $cloneObject.addClass('cloned');
//            var $self = null;
//            $cloneObject.on('mousedown', function (event) {
//                $self = $(this);
//                $self.addClass('mousedown');
//                event.stopImmediatePropagation();
//            }).on('mouseleave', function () {
//                if ($self !== null) {
//                    $self.remove();
//                    $this.removeClass('moveme');
//                    $self = null;
//                }
//            }).on('mouseup', function () {
//                if ($self !== null) {
//                    $self.remove();
//                    $this.removeClass('moveme');
//                    $self = null;
//                }
//            });
//            $(document).on('mousemove', function (evt) {
//                if ($self !== null) {
//                    //var prevWidth = parseInt($prevElem.attr('data-width'));
//                    //var nextWidth = parseInt($nextElem.attr('data-width'));
//                    //var prevPerCentsfCol = $prevElem.attr('class').match(/sfCol_[0-9]{1,3}/g);
//                    //var nextPerCentsfCol = $nextElem.attr('class').match(/sfCol_[0-9]{1,3}/g);
//                    //if (prevPerCentsfCol !== null && prevPerCentsfCol) {
//                    //    var totalColWidth = $parentElem.width();
//                    //    var totalwidth = prevWidth + nextWidth;
//                    //    var $parentLeft = $parentElem.offset().left;
//                    //    var $selfLeft = (evt.pageX - $parentLeft) + $(window).scrollLeft();
//                    //    $self.css({
//                    //        'left': $selfLeft + 'px',
//                    //    });
//                    //    var $selfPositionLeft = $self.position().left;
//                    //    var $thisPositionLeft = $this.position().left;
//                    //    var diffPosition = Math.abs($selfPositionLeft - $thisPositionLeft);
//                    //    //moving right
//                    //    var prevOldPerCentsfCol = parseInt(prevPerCentsfCol[0].split('_')[1]);
//                    //    var prevNewPerCentsfCol = 0;
//                    //    var nextOldPerCentsfCol = parseInt(nextPerCentsfCol[0].split('_')[1]);;
//                    //    var nextNewPerCentsfCol = 0;
//                    //    var totalPercentage = prevOldPerCentsfCol + nextOldPerCentsfCol;
//                    //    if ($selfPositionLeft > $thisPositionLeft) {
//                    //        if (nextWidth > 100) {
//                    //            prevNewPerCentsfCol = ((prevWidth + diffPosition) * 100) / totalColWidth;
//                    //            $prevElem.attr('data-width', (prevWidth + diffPosition));
//                    //            $nextElem.attr('data-width', (totalwidth - (prevWidth + diffPosition)));
//                    //            //$prevElem.css({ 'width': (prevWidth + diffPosition) + 'px' }).attr('data-width', (prevWidth + diffPosition));
//                    //            //$nextElem.css({ 'width': (totalwidth - (prevWidth + diffPosition)) + 'px' }).attr('data-width', (totalwidth - (prevWidth + diffPosition)));
//                    //        }
//                    //    }
//                    //    else {
//                    //        if (prevWidth > 100) {
//                    //            prevNewPerCentsfCol = ((prevWidth - diffPosition) * 100) / totalColWidth;
//                    //            $prevElem.attr('data-width', (prevWidth - diffPosition));
//                    //            $nextElem.attr('data-width', (totalwidth - (prevWidth - diffPosition)));
//                    //            //$prevElem.css({ 'width': (prevWidth - diffPosition) + 'px' }).attr('data-width', (prevWidth - diffPosition));
//                    //            //$nextElem.css({ 'width': (totalwidth - (prevWidth - diffPosition)) + 'px' }).attr('data-width', (totalwidth - (prevWidth - diffPosition)));
//                    //        }
//                    //    }
//                    //    prevNewPerCentsfCol = Math.floor(prevNewPerCentsfCol);
//                    //    nextNewPerCentsfCol = totalPercentage - prevNewPerCentsfCol;
//                    //    $prevElem.removeClass(prevPerCentsfCol[0]).addClass('sfCol_' + prevNewPerCentsfCol);
//                    //    $nextElem.removeClass(nextPerCentsfCol[0]).addClass('sfCol_' + nextNewPerCentsfCol);

//                    var prevWidth = parseInt($prevElem.attr('data-width'));
//                    var nextWidth = parseInt($nextElem.attr('data-width'));
//                    var totalwidth = prevWidth + nextWidth;
//                    var $parentLeft = $parentElem.offset().left;
//                    var $selfLeft = (evt.pageX - $parentLeft) + $(window).scrollLeft();
//                    $self.css({
//                        'left': $selfLeft + 'px',
//                    });
//                    var $selfPositionLeft = $self.position().left;
//                    var $thisPositionLeft = $this.position().left;
//                    var diffPosition = Math.floor(Math.abs($selfPositionLeft - $thisPositionLeft));
//                    //moving right

//                    var nextElemNewWidth = 0;
//                    var prevElemNewWidth = 0;
//                    if ($selfPositionLeft > $thisPositionLeft) {
//                        if (nextWidth > 100) {
//                            prevElemNewWidth = prevWidth + diffPosition;
//                            nextElemNewWidth = totalwidth - prevElemNewWidth;
//                        }
//                    }
//                    else {
//                        if (prevWidth > 100) {
//                            prevElemNewWidth = prevWidth - diffPosition;
//                            nextElemNewWidth = totalwidth - prevElemNewWidth;
//                            //$prevElem.css({ 'width': (prevWidth - diffPosition) + 'px' }).attr('data-width', (prevWidth - diffPosition));
//                            //$nextElem.css({ 'width': (totalwidth - (prevWidth - diffPosition)) + 'px' }).attr('data-width', (totalwidth - (prevWidth - diffPosition)));
//                        }
//                    }
//                    //take the previous element to percentage
//                    var sfprevColPer = 0;
//                    var sfnextColPer = 0;
//                    var totalColPer = 0;
//                    sfpreColVal = $prevElem.attr('class').match(/sfCol_[0-9]{1,3}/g);
//                    sfnextColVal = $nextElem.attr('class').match(/sfCol_[0-9]{1,3}/g);

//                    if (sfpreColVal !== null && sfnextColVal !== null) {
//                        sfprevColPer = parseInt(sfpreColVal[0].split('_')[1]);
//                        sfnextColPer = parseInt(sfnextColVal[0].split('_')[1]);
//                        totalColPer = sfprevColPer + sfnextColPer;
//                        var prevElemNewPer = Math.floor((prevElemNewWidth * 100) / parentElemWidth);
//                        var nextElemNewPer = totalColPer - prevElemNewPer;
//                        $prevElem.removeClass(sfpreColVal[0]).addClass('sfCol_' + prevElemNewPer);
//                        $nextElem.removeClass(sfnextColVal[0]).addClass('sfCol_' + nextElemNewPer);
//                        $prevElem.css({ 'width': 'calc( ' + prevElemNewPer + '% - ' + dragComponetWidth + ' )' }).attr('data-width', (prevElemNewWidth));
//                        $nextElem.css({ 'width': 'calc( ' + nextElemNewPer + '% - ' + dragComponetWidth + ' )' }).attr('data-width', nextElemNewWidth);
//                    }
//                }

//            }).on('mouseup', function () {
//                if ($self !== null) {

//                    //NEED TO PARSE sfCOl_ HERE
//                    //var prevPerCentsfCol = $prevElem.attr('class').match(/sfCol_[0-9]{1,3}/g);
//                    //var nextPerCentsfCol = $nextElem.attr('class').match(/sfCol_[0-9]{1,3}/g);
//                    $self.remove();
//                    $this.removeClass('moveme');
//                    $self = null;
//                }
//            });
//            //.on('mouseleave', function () {
//            //    //var $this = $(this);
//            //    //$this.removeClass('moveme');
//            //    //$this.css({
//            //    //    'position': 'relative',
//            //    //    'left': '0px'
//            //    //});
//            //});
//        }
//    });
//},


