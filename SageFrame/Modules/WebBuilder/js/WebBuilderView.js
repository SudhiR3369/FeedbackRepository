(function ($) {
    $.WebBuilderViews = function (p) {
        p = $.extend({
            modulePath: '',
            pageName: 'default'
        }, p);
        var WebBuilderManage = {
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
                pageName: p.pageName
            },
            init: function () {
                var removeCompo = [];
                $('.editor-component').each(function () {
                    var $me = $(this);
                    var dataType = $me.attr('data-type');
                    if (typeof dataType !== "undefined") {
                        var index = removeCompo.indexOf(dataType);
                        if (index == -1) {
                            var v = component[dataType];
                            if (typeof v.view !== "undefined" && typeof v.view.view !== "undefined") {
                                v.view.view();
                                removeCompo.push(dataType);
                            }
                        }
                    }
                });
                //will be deprciated in future. is use for old templates and to check if they have view in custom way
                var existingCompoo = Object.keys(component);
                existingCompoo = existingCompoo.filter(function (val) {
                    return removeCompo.indexOf(val) == -1;
                });
                var length = existingCompoo.length;
                for (var i = 0; i < length; i++) {
                    v = component[existingCompoo[i]];
                    if (typeof v.view !== "undefined" && typeof v.view.view !== "undefined")
                        v.view.view();
                }
                InvokeAPI();
                var $body = $('.site-body');
                var tempSettings = $body.attr('data-settings');
                if (typeof (tempSettings) !== 'undefined' && tempSettings.length > 0) {
                    tempSettings = JSON.parse(tempSettings);
                    $body.addClass(tempSettings.defaultLayout);
                    $body.addClass('ff-' + tempSettings.defaultFontFamily.toLowerCase());
                    $body.addClass('f-weight-400');
                    $body.addClass(tempSettings.SiteHeaderEffect);
                    $('body').css({ 'background-color': tempSettings.bodybackgroundColor });
                    $('body').attrs(tempSettings.body);
                    $('.editor-com-nav > .eb-menu').each(function () {
                        menuInitColor($(this));
                    });
                    function menuInitColor(_this) {
                        _this.find('li a span').each(function () {
                            var $this = $(this);
                            if ($this.text().toLowerCase() === WebBuilderManage.config.pageName.toLowerCase()) {
                                $this.parent().addClass('active-page');
                                var style = '';
                                var navStyleClasses = _this.parent().attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses != null) {
                                    style = navStyleClasses[0];
                                }
                                MenuChangeInstant($this.parents('ul'), tempSettings.primaryColor, tempSettings.secondaryColor, style);
                            }
                        });
                    }

                    if (tempSettings.scrolltotop) {
                        var scroll = '<div class="scrolltotop" style="display:none;" id="ScroolToTop"><div class="ScrollToTop editor-component"><div class="scrollDOM"><i class="fa fa-arrow-up" aria-hidden="true"></i></div></div></div>';
                        $('body').append(scroll);
                        $('#ScroolToTop').on('click', function () {
                            $('body,html').animate({
                                scrollTop: '0px'
                            }, 1000);
                        });
                    }
                    if (typeof (tempSettings.shadedLayer) !== "undefined" && tempSettings.shadedLayer !== null) {
                        var shadedDiv = '<div class="editor-row-shaded-layer"></div>';
                        var appendElem = $('body').children();
                        $('body').append(shadedDiv);
                        $('body').find(' > .editor-row-shaded-layer').append(appendElem).attrs(tempSettings.shadedLayer);
                    }
                }
                MenuHover(tempSettings.primaryColor, tempSettings.secondaryColor);
                //Responsive menu
                $('.res-menu-trigger').off().on('click', function () {
                    var $this = $(this);
                    if ($this.siblings('nav').hasClass('show-menu')) {
                        $this.siblings('nav').removeClass('show-menu');
                        $this.removeClass('close-menu');
                        $('.responsivefade').remove();
                    }
                    else {
                        $this.siblings('nav').addClass('show-menu');
                        $this.addClass('close-menu');
                        $('body').toggleClass('offset-menu');
                        $('body').append('<div class="responsivefade"></div>');
                        $('.responsivefade').off().on('click', function () {
                            $('.res-menu-trigger').trigger('click');
                        });
                    }
                });

                $('.responsivefade').off().on('click', function () {
                    $(this).siblings('nav').toggleClass('show-menu');
                    $(this).toggleClass('close-menu');
                    $('body').toggleClass('offset-menu');
                    $('body').append('<div class="responsivefade"></div>');
                });

                WebBuilderManage.MouseOverEffect();
                WebBuilderManage.ScrollDynamicBind();

                //init carousel 
                var $imageSlider = $('.ImageSliderWrapper');
                $imageSlider.removeClass('binded');
                $imageSlider.each(function (index, value) {
                    var carousel = new CarouselInit($(this));
                });
                if ($('.edit-area').hasClass('site-header-fixed')) {
                    var containerWidth = $('.editor-componentWrapper').css('width');
                    $('.editor-site-header').css('width', containerWidth);
                }
                if ($('.edit-area').hasClass('site-header-sticky')) {
                    var containerWidth = $('.editor-componentWrapper').css('width');
                    $('.editor-site-header > .editor-row').css('width', containerWidth);
                }
                Responsive();
                $(window).resize(function () {
                    Responsive();
                });
                function Responsive() {
                    var res = new ResponsiveJS();
                    res.InitEvents();
                }
                $.each(storedComponent, function (i, v) {
                    v = v.ComponentValue;
                    var value = JSONParse(v);
                    if (typeof value !== "undefined" && typeof value.view !== "undefined" && typeof value.view.oncomplete !== "undefined")
                        value.view.oncomplete();
                });
            },
            MouseOverEffect: function () {
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
                    //if ($border.on !== "none") {
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
                    //}
                }
                $('.hovered').off('mouseover').on('mouseover', function () {
                    ApplyEffects($(this));
                });
                $('.hovered').off('mouseout').on('mouseout', function () {
                    ResetPreviousEffect($(this));
                });
            },
            ScrollDynamicBind: function () {
                var dynamicScroll = 'var scroolHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;';
                $('.scroll-begin').each(function (i, v) {
                    var scrollClass = 'scroll_' + i;
                    var $this = $(this);
                    var top = $this.offset().top;
                    $this.addClass(scrollClass);
                    var screenheight = screen.height;
                    dynamicScroll += "if (scroolHeight > " + (top - (screenheight / 2)) + ")";// + " && scroolHeight < " + (top + height) + ")";
                    dynamicScroll += "{";
                    var delay = 0;
                    if (typeof ($this.attr('data-scrolldelay') !== "undefined")) {
                        delay = parseInt($this.attr('data-scrolldelay'));
                    }
                    var newDelay = delay + 450;
                    if (top < screen.height) {
                        setTimeout(function () {
                            $this.addClass('scroll-end');
                            setTimeout(function () {
                                $this.removeClass('scroll-begin');
                            }, newDelay);
                        }, delay);
                    }
                    dynamicScroll += "setTimeout(function () {";
                    dynamicScroll += "$('." + scrollClass + "').addClass('scroll-end');";
                    dynamicScroll += "setTimeout(function () {";
                    dynamicScroll += "$('." + scrollClass + "').removeClass('scroll-begin');";
                    dynamicScroll += "},'" + newDelay + "');";
                    dynamicScroll += "}, " + delay + ");";
                    dynamicScroll += "}";
                });
                var ScrollWindow = new Function('name', dynamicScroll);
                window.onscroll = function () {
                    ScrollWindow();
                };
            },
            ajaxSuccess: function (data) {
                switch (WebBuilderManage.config.ajaxCallMode) {
                }
            },
            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: WebBuilderManage.config.type,
                    contentType: WebBuilderManage.config.contentType,
                    async: WebBuilderManage.config.async,
                    cache: WebBuilderManage.config.cache,
                    url: WebBuilderManage.config.url,
                    data: WebBuilderManage.config.data,
                    dataType: WebBuilderManage.config.dataType,
                    success: WebBuilderManage.ajaxSuccess,
                    error: WebBuilderManage.ajaxFailure
                });
            }
        };
        WebBuilderManage.init();
    };
    $.fn.WebBuilderView = function (p) {
        $.WebBuilderViews(p);
    };
})(jQuery);
var ResponsiveJS = (function () {
    function ResponsiveJS() {
        this.oldRatio = 0;
        this.newRatio = 0;
        //for screen change old ratio and new ratio are calculated
        this.CalculateOldRatio();
        this.CalculateRatio();
    }
    ResponsiveJS.prototype.CalculateScreenWidth = function () {
        return $(window).width();
    };
    ResponsiveJS.prototype.CalculateRatio = function () {
        var ratio = 1;
        var screenwidth = this.CalculateScreenWidth();
        if (screenwidth >= 1024) {
            ratio = 1;
        }
        if (screenwidth >= 768 && screenwidth < 1024) {
            ratio = 0.9;
        }
        else if (screenwidth >= 480 && screenwidth < 768) {
            ratio = 0.8;
        }
        else if (screenwidth >= 360 && screenwidth < 480) {
            ratio = 0.7;
        }
        else if (screenwidth < 360) {
            ratio = 0.6;
        }
        this.newRatio = ratio;
        $('body').attr('data-view', ratio);
    };
    ResponsiveJS.prototype.CalculateOldRatio = function () {
        var oldRatio = 1;
        if (typeof $('body').attr('data-view') !== "undefined")
            oldRatio = $('body').attr('data-view');
        this.oldRatio = oldRatio;
    };
    ResponsiveJS.prototype.CalculateCeil = function (tag, curSize) {
        var minValue = 0;
        switch (tag) {
            case 'h1':
                minValue = 16;
                break;
            case 'h2':
                minValue = 14;
                break;
            case 'h3':
                minValue = 12;
                break;
            case 'h4':
                minValue = 12;
                break;
            case 'h5':
                minValue = 12;
                break;
            case 'h6':
                minValue = 12;
                break;
            case 'p':
                minValue = 12;
                break;
            case 'spacing':
                minValue = 5;
                break;
        }
        if (curSize < minValue)
            curSize = minValue;
        return curSize;
    };
    ResponsiveJS.prototype.SpacingCheckMin = function (space) {
        var _this = this;
        var percentage = space.match(/%/);
        if (percentage == null) {
            space = space.match(/^-?[0-9]\d+/);
            if (space >= 25) {
                return Math.ceil((space / _this.oldRatio) * _this.newRatio) + 'px';
            }
        }
    };
    ResponsiveJS.prototype.Defined = function (value) {
        return typeof value !== "undefined";
    };
    ResponsiveJS.prototype.NotDefined = function (value) {
        return typeof value === "undefined";
    };
    ResponsiveJS.prototype.ReadAllDOM = function () {
        var _this = this;
        var nodes = document.getElementsByTagName("*");
        var nodeLength = nodes.length;
        for (var i = 0; i < nodeLength; i++) {
            var tagName = nodes[i].tagName.toLowerCase();
            switch (tagName) {
                case "img":
                    //_this.HTMLSpacing(nodes[i]);
                    // _this.HTMLImageHeight(nodes[i]);
                    break;
                case "div":
                case "span":
                    //_this.HTMLSpacing(nodes[i]);
                    break;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                case "p":
                    //_this.HTMLSpacing(nodes[i]);
                    _this.HTMLFontSize(nodes[i], tagName);
                    break;
            }
        }
    };
    ResponsiveJS.prototype.HTMLHeight = function (elem) {
        var _this = this;
        var style = window.getComputedStyle(elem);
        if (style != null || typeof style !== "undefined") {
            var height = style.height.match(/\d+/);
            if (_this.Defined(height)) {
                elem.style.height = Math.ceil((height / _this.oldRatio) * _this.newRatio) + 'px';
            }
        }
    };
    ResponsiveJS.prototype.HTMLImageHeight = function (elem) {
        var _this = this;
        var style = elem.style;// window.getComputedStyle(elem);
        if (style != null || typeof style !== "undefined") {
            var height = style.height.match(/\d+/);
            if (height !== null && _this.Defined(height)) {
                var newHeight = Math.ceil((height / _this.oldRatio) * _this.newRatio) + 'px';
                elem.style.height = newHeight;
                if (elem.parentElement.className.match(/image/)) {
                    elem.parentElement.style.height = newHeight;
                }
            }
            var width = style.width.match(/\d+/);
            if (width !== null && _this.Defined(width)) {
                var newWidth = Math.ceil((height / _this.oldRatio) * _this.newRatio) + 'px';
                elem.style.width = newWidth;
                if (elem.parentElement.className.match(/i-*mage/)) {
                    elem.parentElement.style.width = newWidth;
                }
            }
        }
    };
    ResponsiveJS.prototype.HTMLSpacing = function (elem) {
        var _this = this;
        var style = window.getComputedStyle(elem);
        if (style != null || typeof style !== "undefined") {
            var spacing = style.getPropertyValue("padding-top");
            if (_this.Defined(spacing)) {
                elem.style.paddingTop = _this.SpacingCheckMin(spacing);
            }
            spacing = style.getPropertyValue("padding-right");
            if (_this.Defined(spacing)) {
                elem.style.paddingRight = _this.SpacingCheckMin(spacing);
            }
            spacing = style.getPropertyValue("padding-bottom");
            if (_this.Defined(spacing)) {
                elem.style.paddingBottom = _this.SpacingCheckMin(spacing);
            }
            spacing = style.getPropertyValue("padding-left");
            if (_this.Defined(spacing)) {
                elem.style.paddingLeft = _this.SpacingCheckMin(spacing);
            }
            spacing = style.getPropertyValue("margin-top");
            if (_this.Defined(spacing)) {
                elem.style.marginTop = _this.SpacingCheckMin(spacing);
            }
            spacing = style.getPropertyValue("margin-right");
            if (_this.Defined(spacing)) {
                elem.style.marginRight = _this.SpacingCheckMin(spacing);
            }
            spacing = style.getPropertyValue("margin-bottom");
            if (_this.Defined(spacing)) {
                elem.style.marginBottom = _this.SpacingCheckMin(spacing);
            }
            spacing = style.getPropertyValue("margin-left");
            if (_this.Defined(spacing)) {
                elem.style.marginLeft = _this.SpacingCheckMin(spacing);
            }
        }
    };
    ResponsiveJS.prototype.HTMLFontSize = function (elem, tagName) {
        var _this = this;
        var style = window.getComputedStyle(elem);
        if (style != null || typeof style !== "undefined") {
            var fontSize = style.getPropertyValue("font-size").match(/\d+/);
            if (_this.Defined(fontSize)) {
                elem.style.fontSize = _this.CalculateCeil(tagName, Math.ceil((fontSize / _this.oldRatio) * _this.newRatio)) + 'px';
            }
        }
    };
    ResponsiveJS.prototype.InitEvents = function () {
        if (this.oldRatio !== this.newRatio)
            this.ReadAllDOM();
    };
    return ResponsiveJS;
}());