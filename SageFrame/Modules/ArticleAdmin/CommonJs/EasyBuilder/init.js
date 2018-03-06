var CarouselInit = function ($this) {
    InitCarouselSlider($this);
};
function InitCarouselSlider($this) {
    if (!$this.hasClass('binded')) {
        $this.addClass('binded');
        var perSlider = 1;
        if (typeof ($this.parent().attr('data-perslider')) !== "undefined") {
            perSlider = parseInt($this.parent().attr('data-perslider'));
        }
        var $parWrap = $this.parent();
        var delay = $this.attr('data-delay');
        //width of the viewport (carousel parent container width)
        var viewportwidth = $this.find('.ImageSlider').width();
        //per item width
        var itemsWidth = viewportwidth / perSlider;
        var items = $this.find('.itemWrapper').length;
        $this.find('.itemWrapper').width(itemsWidth);
        var totalwidth = (viewportwidth * items) / perSlider;
        $this.find('.itemsWrapper').width(totalwidth);

        var slidewidth = 0;
        var currentFrame = 1;
        var totalFrame = Math.ceil(items / perSlider);
        function Animate() {
            var transType = "slide";
            if (typeof ($parWrap.attr('data-transition')) !== "undefined") {
                transType = $parWrap.attr('data-transition');
            }
            var animateCss = { "margin-left": slidewidth + "px" };
            var enableFade = false;
            switch (transType.toLowerCase()) {
                case "slide":
                    $this.find('.itemsWrapper > .itemWrapper').css({ "opacity": 1 });
                    break;
                case "fade":
                    delay = 0;
                    enableFade = true;
                    $this.find('.itemsWrapper > .itemWrapper').css({ "opacity": 0 });
                    break;
                default:
            }

            $this.find('.itemsWrapper').animate(
                animateCss, delay, function () {
                    DisableButtons();
                    if (enableFade) {
                        FadeSuccess();
                    }
                    ActivateDot();
                });
        }
        function FadeSuccess() {
            for (var i = 0; i < perSlider; i++) {
                $this.find('.itemsWrapper').find('.itemWrapper').eq(currentFrame - 1 + i).animate(
                  {
                      "opacity": '1'
                  }, 1000);
            }
        }
        function slideRight() {
            slidewidth -= viewportwidth;
            currentFrame++;
            Animate();
        }
        function slideLeft() {
            slidewidth += viewportwidth;
            currentFrame--;
            Animate();
        }
        $this.find('.prev-btn').off().on('click', function () {
            if (currentFrame !== 1)
                slideLeft();
        });
        $this.find('.next-btn').off().on('click', function () {
            if (currentFrame !== totalFrame)
                slideRight();
        });
        function DisableButtons() {
            $this.find('.prev-btn').removeClass('disable');
            $this.find('.next-btn').removeClass('disable');
            if (currentFrame == 1)
                $this.find('.prev-btn').addClass('disable');
            if (currentFrame === totalFrame)
                $this.find('.next-btn').addClass('disable');
        }
        CreateBalls();
        Animate();
        DisableButtons();
        ActivateDot();
        function CreateBalls() {
            var dots = '';
            var limit = Math.ceil(items / perSlider);
            for (var balls = 0; balls < limit; balls++) {
                dots += '<span class="dots"></span>';
            }
            $this.find('.pager-dot').html(dots);
            $this.find('.pager-dot span').on('click', function () {
                var index = $this.find('.dots').index($(this));
                currentFrame = index + 1;
                slidewidth = -(viewportwidth * index);
                ActivateDot();
                Animate();
            });
        }

        function ActivateDot() {
            $this.find('.pager-dot').find('.dots').removeClass('active-dot');
            $this.find('.pager-dot').find('.dots').eq(currentFrame - 1).addClass('active-dot');
        }
        LoadLoop();

        function LoadLoop() {
            var $par = $this.parent();
            var looperValue = $par.attr('data-loop');

            if (typeof looperValue !== "undefined" && looperValue == 'loop') {
                var autoSlideInterval = setInterval(function () {
                    if ($par.attr('data-loop') == 'loop')
                        AutoSlide();
                    else
                        clearInterval(autoSlideInterval);
                }, 5000);
                function AutoSlide() {
                    if (currentFrame === totalFrame) {
                        currentFrame = 1;
                        slidewidth = 0;
                        ActivateDot();
                        Animate();
                    } else {
                        slideRight();
                    }
                }
            }
        }
    }
}
//$(window).resize(function () {
//    $imageSlider.removeClass('binded');
//    ImageSlider();
//});
/***********DOM Creation Generic methods END************/
(function ($) {
    // Attrs
    $.fn.attrs = function (attrs) {
        var t = $(this);
        if (attrs) {
            // Set attributes
            t.each(function (i, e) {
                var j = $(e);
                for (var attr in attrs) {
                    j.attr(attr, attrs[attr]);
                }
            });
            return t;
        } else {
            // Get attributes
            var a = {},
                r = t.get(0);
            if (r) {
                r = r.attributes;
                for (var i in r) {
                    var p = r[i];
                    if (typeof p.nodeValue !== 'undefined') a[p.nodeName] = p.nodeValue;
                }
            }
            return a;
        }
    };
})(jQuery);




(function ($) {
    $.LinearRating = function ($parent, options) {
        var settings = $.extend({
            startRange: 1,
            endRange: 10,
            startLabel: '',
            endLabel: '',
            callback: null,
            radioGroup: 'rd_',
            initDom: true,
            countRating: true,
            clearParent: false
        }, options);


        LinearRating = {

            Load: function () {

                // GENERATE A GLOBALLY UNIQUE ID BASED ON DATE TIME AND A RADIO GROUP PRETEXT
                function GenerateID() {
                    var newID = '';
                    newID = '' + new Date();
                    newID = newID.match(new RegExp('.{1,4}', 'g')).join("").split('').reverse().join('');
                    newID = settings.radioGroup + newID;
                    return newID;
                }

                function GenerateHTML() {
                    var endRange = settings.endRange;
                    var newGroup = GenerateID();
                    var html = '';

                    html += '<div class="" style="display:flex;justify-content: center;font-size:14px;align-items: center;">';
                    html += '<label class="linearScaleWrapper editor-com-outerSpacing-right-5"><div class="linearScaleStartLabel">' + settings.startLabel + '</div></label>';

                    for (var rStart = settings.startRange; rStart <= endRange; rStart++) {
                        html += '<label class="linearScaleWrapper editor-com-outerSpacing-left-5 editor-com-outerSpacing-right-5">';
                        html += '<div class="linearScaleIdentifier">' + rStart + '</div>';
                        html += '<div class="linearScaleValue editor-com-outerSpacing-top-5"><input type="radio" name="' + newGroup + '"></div>';
                        html += '</label>';
                    }
                    html += '<label class="linearScaleWrapper editor-com-outerSpacing-left-5"><div class="linearScaleEndLabel">' + settings.endLabel + '</div></label>';
                    html += '</div>';

                    return html;
                }
                if (settings.clearParent) $parent.empty();

                $parent.html(GenerateHTML());
            },

            InitializeEvents: function () {

                $parent.find('.linearScaleWrapper').off().on('click', function () {
                    var $this = $(this);
                    var ratingCount = $this.children('.linearScaleIdentifier').text();
                    if (settings.countRating) $parent.attr({ 'data-rating': ratingCount });

                    if (settings.callback) settings.callback($this);

                });

            }
        };
        if (settings.initDom) LinearRating.Load();
        LinearRating.InitializeEvents();
    };
    $.fn.LinearRating = function (options) {
        $.LinearRating(this, options);
    };
})(jQuery);


// -------- STAR RATING --------
(function ($) {
    $.StarRating = function ($parent, options) {
        var settings = $.extend({
            icon_primary: 'fa-star-o',
            icon_secondary: 'fa-star',
            callback: null,
            ratingCount: true,
            iconSize: '25px',
            activeClass: 'currentScale',
            count: 5,
            initDom: true
        }, options);

        StarRating = {
            Load: function () {
                function GenerateHTML() {
                    var html = '<div class="ratingStar text-align-center" style="display:inline-flex;" data-primary="' + settings.icon_primary + '" data-secondary="' + settings.icon_secondary + '" >';
                    html += '';
                    for (var i = 0; i < settings.count; i++) {
                        html += '<span class="starRatingCounter fa ' + settings.icon_primary + '"></span>';
                    }
                    html += '</div>';
                    return html;
                }
                $parent.html(GenerateHTML());
                //$parent.find('.ratingStar').css({ 'direction': 'rtl', });
                //$parent.find('.ratingStar > span').css({
                //    'display': 'inline-block',
                //    'position': 'relative',
                //    'width': '1.1em',
                //    'font-size': settings.iconSize
                //});
            },

            InitializeEvents: function () {

                //$parent.find('.starRatingCounter').mouseenter(function () {
                //    var $this = $(this);
                //    $this.prevAll().css("color", "black");
                //    $this.nextAll().css("color", "gold");
                //    $this.css("color", "gold");
                //}).mouseleave(function () {
                //    var $this = $(this);
                //    $this.siblings().css("color", "black");
                //    $this.css("color", "gold");
                //});


                $parent.find('.starRatingCounter').off().on('click', function () {
                    var $this = $(this);
                    var $parent = $this.parent();
                    var stars = $parent.children();
                    var starsCount = stars.length;

                    var parent_IconPrimary = $parent.attr('data-primary');
                    if (!parent_IconPrimary) parent_IconPrimary = settings.icon_primary;

                    var parent_IconSecondary = $parent.attr('data-secondary');
                    if (!parent_IconSecondary) parent_IconSecondary = settings.icon_secondary;

                    stars.removeClass(settings.activeClass);
                    $this.addClass(settings.activeClass);

                    $this.prevAll().removeClass(parent_IconSecondary).addClass(parent_IconPrimary);
                    $this.nextAll().removeClass(parent_IconPrimary).addClass(parent_IconSecondary);
                    $this.removeClass(parent_IconPrimary).addClass(parent_IconSecondary);

                    var newLength = $this.nextAll().length + 1;

                    if (settings.ratingCount) $parent.attr({ 'data-rating': newLength });

                    if (settings.callback) settings.callback(newLength);

                });

            }

        };
        if (settings.initDom) StarRating.Load();
        StarRating.InitializeEvents();
    };
    $.fn.StarRating = function (options) {
        $.StarRating(this, options);
    };

})(jQuery);







$(window).resize(function () {
    FixMenuOnResize();
    screenSize = ScreenDimension().height;
});
$('.fullpagebanner').resize(function () {
    var $this = $(this);
    $this.find('.ImageSliderWrapper').removeClass('binded');
    InitCarouselSlider($this.find('.ImageSliderWrapper'));
    AdjustSize($this);
});
$(window).on("scroll", function (e) {
    var top = GetScrollTop();
    //FixMenuOnScroll();
    ScrollToTop(top);

    if ($('.edit-area.site-body').hasClass('site-header-sticky')) {
        StickyHeader();
    }
    ScrollTopVisible(top);
});
function ScrollTopVisible(top) {
    if ($('body').find('#ScroolToTop').length > 0) {

        if (ScreenDimension().height < top) {
            $('#ScroolToTop').show();
        }
        else {
            $('#ScroolToTop').hide();
        }
    }
}
var screenSize = ScreenDimension().height;
function ScrollToTop(top) {
    if (top > screenSize) {
        $('#chkScrollToTop').show(400);
    }
    else {
        $('#chkScrollToTop').hide(400);
    }
}
function FixMenuOnScroll() {
    //Build your website on your own  height
    if (typeof ($('.main-top-row').css('height')) !== "undefined") {
        var webbbuilderBar = parseInt($('.main-top-row').css('height').replace('px', ''));
        //scroll top 
        var $sticky = $('.edit-area').hasClass('site-header-sticky');
        var scrollTop = GetScrollTop() + webbbuilderBar;
        if ($sticky || $('.edit-area').hasClass('site-header-fixed')) {
            $('.editor-componentWrapper').addClass('clearfix');
            $('.editor-site-header').addClass('clearfix');
            $('.editor-site-header').css('width', '');
            var extraHeight = 0;
            //if there is any extra field above the menu
            if ($('.rowaboveheader').length > 0)
                extraHeight = parseInt($('.rowaboveheader').css('height').replace('px', ''));
            // menu wrpper height +  extrafield 
            var topPos = $('.editor-site-header').offset().top + extraHeight;
            var $stickHeader = $('.editor-site-header > .editor-row');
            $('.main-container').css('padding-top', '');
            if (scrollTop > topPos) {
                $stickHeader.addClass('stick');
                var containerWidth = $('.editor-componentWrapper').css('width');
                $stickHeader.css('width', containerWidth);
                if ($sticky) {
                    $('.main-container').css('padding-top', webbbuilderBar);
                }
            } else {
                $('.editor-site-header > .editor-row').removeClass('stick');
                $('.editor-componentWrapper').css('padding-top', '');
            }
        }
    }
}

function HeaderTopPadding() {
    if ($('.edit-area').hasClass('site-header-sticky') || $('.edit-area').hasClass('site-header-fixed')) {
        var webbbuilderBar = 0;
        if ($('.main-top-row').length > 0)
            webbbuilderBar = parseInt($('.main-top-row').css('height').replace('px', ''));
        $('.editor-site-header').css('top', webbbuilderBar);
    }
    else {
        $('.main-container').css('padding-top', '');
    }
}

function FixMenuOnResize() {
    $('.editor-site-header > .editor-row').css('width', '');
    $('.editor-site-header').css('width', '');
    if ($('.edit-area').hasClass('site-header-fixed')) {
        var containerWidth = $('.editor-componentWrapper').css('width');
        $('.editor-site-header').css('width', containerWidth);
        $('.editor-site-header > .editor-row').css('width', '');
    }
    if ($('.edit-area').hasClass('site-header-sticky')) {
        setTimeout(function () {
            var containerWidth = $('.editor-componentWrapper').css('width');
            $('.editor-site-header > .editor-row').css('width', containerWidth);
            $('.editor-site-header').css('width', '');
        }, 1);
    }
}
function ScreenDimension() {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return { "height": myHeight, "width": myWidth };
}
function AdjustSize($appendLayer) {
    var height = ScreenDimension().height;
    $appendLayer.css('height', height + 'px');
    $appendLayer.find('.ImageSlider').css('height', height + 'px');
}
function RemoveCarouselHeight($appendLayer) {
    $appendLayer.css('height', '400px');
    var img = $appendLayer.find('.ImageSlider').find('img').eq(0);
    $appendLayer.find('.ImageSlider').css('height', '400px');
    setTimeout(function () {
        $appendLayer.find('.ImageSlider').css('height', '');
    }, 100);
}
function GetScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
function MenuChangeInstant($nav, primarycolor, secondarycolor, style) {
    var color = $('.editor-site-header .editor-com-nav .eb-menu').attr('data-textcolor');
    $nav.find('> li > a > span').css('color', color);
    $nav.find('> li > a').css('background-color', '');
    var $a = $nav.find('> li > a.active-page');
    var $span = $a.find('> span');
    $a.css('background-color', '');
    var textColor = $span.css('color');
    $a.css({
        'border-color': '',
        'border-bottom': ''
    });
    ApplyMenuHover(style, primarycolor, secondarycolor, $a, $span);
}
function ApplyMenuHover(navClass, primaryColor, secondary, $a, $span) {
    switch (navClass) {
        case 'nav-style-none':
            $span.css('color', primaryColor);
            break;
        case 'nav-style-fill':
        case 'nav-style-rounded':
            $span.css('color', secondary);
            $a.css('background-color', primaryColor);
            break;
        case 'nav-style-line':
        case 'nav-style-roundedline':
            $span.css('color', secondary);
            $a.css({
                'border-color': primaryColor
            });
            break;
        case 'nav-style-underline':
            $span.css('color', secondary);
            $a.css({
                'border-bottom': 'solid 1px ' + primaryColor
            });
            break;
    }
}
//AdjustSize of full page slider
AdjustSizeFullpage();
function AdjustSizeFullpage() {
    $('.fullpagebanner').each(function () {
        AdjustSize($(this));
    });
}
function OnePageMenuScrollEvent() {
    $('.oneMenu').off().on('click', function () {
        $('.pagelink.onepage.active-page').removeClass('active-page');
        $(this).find('.pagelink.onepage').addClass('active-page');
        var data = $(this).attr('data-opscroll');
        var $scrollTo = $('.editor-componentWrapper > .editor-row[data-opscroll="' + data + '"]');
        var siteheader = $('.editor-site-header').height();
        if ($('.main-top-row').length > 0)
            siteheader += $('.main-top-row').height();
        if ($('.edit-area ').hasClass('leftLayout') || $('.edit-area ').hasClass('leftRight')) {
            siteheader = 0;
        }
        var top = $scrollTo.offset().top - siteheader;
        $('body,html').animate({
            scrollTop: top + 'px'
        }, 400);
        //change  primary color in menu
        var style = '';
        var navStyleClasses = $('.editor-com-nav').attr('class');
        if (navStyleClasses != undefined) {
            navStyleClasses = navStyleClasses.match(/nav-style-[a-z]{1,20}/g);
            if (navStyleClasses != null) {
                style = navStyleClasses[0];
            }
            var tempSettings = $('.site-body').attr('data-settings');
            if (typeof (tempSettings) !== 'undefined' && tempSettings.length > 0) {
                tempSettings = JSON.parse(tempSettings);
                MenuChangeInstant($('.editor-com-nav > .onepagemenu'), tempSettings.primaryColor, tempSettings.secondaryColor, style);
            }
            else {
                tempSettings = webBuilderSettings;
            }
            var $a = $('.editor-com-nav > .onepagemenu').find('> li > a');
            $a.css({
                'border-color': '',
                'border-bottom': ''
            });

        }
    });
}
$(function () {
    MenuColor();
    MenuURL();
    HeaderTopPadding();
    OnePageMenuScrollEvent();
    $('.onepagemenu > li > .pagelink.onepage.active-page').removeClass('active-page');
    $('.onepagemenu').find('.pagelink.onepage').eq(0).addClass('active-page');
    //change  primary color in menu
    var style = '';
    var tempSettings = $('.site-body').attr('data-settings');
    if (typeof tempSettings !== "undefined" && tempSettings.length > 0) {
        tempSettings = JSON.parse(tempSettings);
    }
    else {
        tempSettings = webBuilderSettings;
    }
    $('body').attr('data-count', tempSettings.idcount);
    var navStyleClasses = $('.editor-com-nav').attr('class');
    if (navStyleClasses != undefined) {
        navStyleClasses = navStyleClasses.match(/nav-style-[a-z]{1,20}/g);
        if (navStyleClasses != null) {
            style = navStyleClasses[0];
        }

        if (typeof (tempSettings) !== 'undefined' && tempSettings.length > 0) {
            MenuChangeInstant($('.editor-com-nav > .onepagemenu'), tempSettings.primaryColor, tempSettings.secondaryColor, style);
        }

    }
    ParallexEffect();
});
function ParallexEffect() {
    $('.background-effect-image-parallax').each(function () {
        var $bgobj = $(this); // assigning the object
        var $window = $(window);
        $(window).scroll(function () {
            var speed = 10;
            var yPos = -($window.scrollTop() / speed);
            // Put together our final background position
            var coords = '50% ' + yPos + 'px';
            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        });
    });

}


function StickyHeader() {
    var headerHeight = $('.editor-site-header').height();
    if (GetScrollTop() > (headerHeight)) {
        if (!$('.editor-site-header').hasClass('scrolled')) {
            $('.editor-site-header').addClass('scrolled');
            var $header = $('.editor-site-header').find('.menuHeader');
            var $headerColor = $header.attr('data-mcolor');
            var bgcolor = '', color = '';
            if (typeof ($headerColor) !== "undefined") {
                $('.editor-site-header').attr('data-prevColor', $('.pagelink').not('.active-page').find('.pageName').css('color'));
                $('.pagelink').not('.active-page').find('.pageName').css('color', $headerColor);
            }
            $headerColor = $header.attr('data-mbgcolor');
            if (typeof ($headerColor) !== "undefined") {
                $('.editor-site-header').attr('data-prevBgColor', $('.editor-site-header > .editor-row').css('background-color'));
                $('.editor-site-header > .editor-row').css('background-color', $headerColor);
            }
        }
    }
    else {
        if ($('.editor-site-header').hasClass('scrolled')) {
            $('.editor-site-header').removeClass('scrolled');
            var $header = $('.editor-site-header');
            var $headerColor = $header.attr('data-prevColor');
            var bgcolor = '', color = '';
            if (typeof ($headerColor) !== "undefined") {
                $('.pagelink').not('.active-page').find('.pageName').css('color', $headerColor);
            }
            $headerColor = $header.attr('data-prevBgColor');
            if (typeof ($headerColor) !== "undefined") {
                $('.editor-site-header > .editor-row').css('background-color', $headerColor);
            }
        }
    }
}

function MenuColor() {
    var clr = $('.editor-site-header .editor-com-nav .eb-menu').attr('data-textcolor');
    if (typeof clr !== "undefined") {
        $('.editor-site-header .editor-com-nav .eb-menu').find('.pagelink').not('.active-page').find('.pageName').css('color', clr);
    }
}

function MenuURL() {
    $('.menuHeader .eb-menu li').each(function () {
        var $this = $(this);
        var href = $this.find(' > a').attr('href');
        href = href.replace('fakeMenuURL', SageFrameHostURL);
        $this.find(' > a').attr('href', href);
    });
    $('.anchorpage').each(function () {
        var $this = $(this);
        var href = $this.attr('href');
        href = href.replace('fakeMenuURL', SageFrameHostURL);
        $this.attr('href', href);
    });
}
(function ($) {
    $.fn.replaceClass = function (pFromClass, pToClass) {
        return this.removeClass(pFromClass).addClass(pToClass);
    };
}(jQuery));

function ActiveMenu() {
    $('.editor-site-header').find('.pagelink').removeClass('active-page');
    $('.editor-site-header').find('.pageName').each(function () {
        if ($(this).text().toLowerCase() === currentpageName.toLowerCase()) {
            $(this).parent().addClass('active-page');
        }
    });
}

function MenuHover(primaryColor, secondary) {
    var textColor = 'white';
    $('.editor-com-nav > ul > li > a ').off('mouseover').on('mouseover', function () {
        var $a = $(this);
        if (!$a.hasClass('active-page')) {
            var navClass = 'nav-style-none';
            var navStyleClasses = $('.editor-com-nav').attr('class');
            if (navStyleClasses != undefined) {
                navStyleClasses = navStyleClasses.match(/nav-style-[a-z]{1,20}/g);
                if (navStyleClasses != null) {
                    navClass = navStyleClasses[0];
                }
                var $span = $a.find('> span');
                textColor = $span.css('color');
                ApplyMenuHover(navClass, primaryColor, secondary, $a, $span);
            }
        }
    }).off('mouseout').on('mouseout', function () {
        var $a = $(this);
        if (!$a.hasClass('active-page')) {
            var $span = $a.find('> span');
            $a.css('background-color', '');
            $span.css('color', textColor);
            $a.css({
                'border-color': '',
                'border-bottom': ''
            });
        }
    });

    var navmClass = 'nav-style-none';
    var navStyleClasses = $('.editor-com-nav').attr('class');
    if (navStyleClasses != undefined) {
        navStyleClasses = navStyleClasses.match(/nav-style-[a-z]{1,20}/g);
        if (navStyleClasses != null) {
            navmClass = navStyleClasses[0];
        }
    }
    //setting the default style for active menu
    ApplyMenuHover(navmClass, $('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'), $('.eb-menu > li > a.active-page '), $('.eb-menu > li > a.active-page  >span'));
}

function JSONStringify(componentValue) {
    return JSON.stringify(componentValue, function (key, value) {
        return (typeof value === 'function') ? value.toString() : value;
    });
}

function JSONParse(str) {
    return JSON.parse(str, function (key, value) {
        if (typeof value != 'string') return value;
        return (value.substring(0, 8) == 'function') ? eval('(' + value + ')') : value;
    });
}

function StringToFunction(value) {
    //return (value.substring(0, 8) == 'function') ? eval('function()' + value) : value;
    if (value.substring(0, 8) == 'function') {
        value = value.slice(15, value.length - 1);
        //value = value.slice(0, -1);
    }
    var myFunction = new Function("", value);
    return myFunction();
}

function FullPagePopup(fullpageOption) {
    $('.fullpagepopupWrapper').remove();
    var option = {
        heading: "popup header title",
        data: "no data",
        showheading: true,
        width: "80%",
        height: "80%",
        onappend: function ($wrapper) {
        }
    };
    option = $.extend(option, fullpageOption);
    var fullpageHeader = '';
    if (option.showheading) {
        fullpageHeader = DOMCreate('div', DOMCreate('span', option.heading, 'fullpage-popup-title') + DOMCreate('span', '<i class="fa fa-times"></i>', ' f-right fullpage-close-model'), 'fullpage-popup-header', 'fullpagePopup');
    }
    var body = DOMCreate('div', option.data, 'fullpage-popup-model-body');
    var fullpagPopup = DOMCreate('div', fullpageHeader + body, 'fullpagepopup', '', ['style="width:' + option.width + ';height:' + option.height + '"']);
    fullpagPopup = DOMCreate('div', fullpagPopup, 'v-align');
    fullpagPopup = DOMCreate('div', fullpagPopup, 'fullpagepopupWrapper');
    $('body').append(fullpagPopup);
    if (typeof (option.onappend) !== "undefined") {
        option.onappend($('.fullpagepopupWrapper'));
    }
    $('.fullpage-close-model').on('click', function () {
        $('.fullpagepopupWrapper').remove();
    });
}
function CloseFullPagePopup() {
    $('.fullpage-close-model').trigger('click');
}




var rowBasicDOM = RowSettingDOM();
function RowSettingDOM() {
    var rowSettingDOM = '';
    rowSettingDOM += '<div class="field-row clearfix">';
    rowSettingDOM += '<h4>Row Basic</h4>';
    rowSettingDOM += '<div class="field-row clearfix">';
    rowSettingDOM += '<label>Show Row Title</label>';
    rowSettingDOM += '<span class="value">';
    rowSettingDOM += '<input id="showTitle" name="rowTitle" type="checkbox">';
    rowSettingDOM += '<label for="showTitle"><i class="icon-icon-tick"></i></label>';
    rowSettingDOM += '</span>';
    rowSettingDOM += '</div>';
    rowSettingDOM += '<div class="field-row clearfix">';
    rowSettingDOM += '<label>Adjust Height</label>';
    rowSettingDOM += '<span class="value">';
    rowSettingDOM += '<input id="adJustHeight" name="adJust Height" type="checkbox">';
    rowSettingDOM += '<label for="adJustHeight"><i class="icon-icon-tick"></i></label>';
    rowSettingDOM += '</span>';
    rowSettingDOM += '</div>';
    rowSettingDOM += '<div class="field-row clearfix" id="adjustHeaderHolder" style="display:none;">';
    rowSettingDOM += '<label>Set Height</label>';
    rowSettingDOM += '<span class="value">';
    rowSettingDOM += '<div id="rowHeightSlider"><div id="rowHeightHandle" class="ui-slider-handle">0</div></div>';
    rowSettingDOM += '</span>';
    rowSettingDOM += '</div>';
    rowSettingDOM += '<div class="field-row clearfix">';
    rowSettingDOM += '<label>Center Wrapper</label>';
    rowSettingDOM += '<span class="value">';
    rowSettingDOM += '<input id="askContainer" name="Container" type="checkbox">';
    rowSettingDOM += '<label for="askContainer"><i class="icon-icon-tick"></i></label>';
    rowSettingDOM += '</span>';
    rowSettingDOM += '<div class="hidden-div clearfix" id="additionalContainer" style="display:none;">';
    rowSettingDOM += '<label>Container Width</label>';
    rowSettingDOM += '<span class="value">';
    rowSettingDOM += '<select id="selContainerWidth">';
    rowSettingDOM += '<option value="container-small">Small</option>';
    rowSettingDOM += '<option value="container-medium">Medium</option>';
    rowSettingDOM += '<option value="container-large">Large</option>';
    rowSettingDOM += '<option value="container-extralarge">ExtraLarge</option>';
    rowSettingDOM += '</select>';
    rowSettingDOM += '</span>';
    rowSettingDOM += '</div>';
    rowSettingDOM += '</div>';
    rowSettingDOM += '</div>';
    return rowSettingDOM;
}
function GeneralOptionDOM(optionClass, label, dataType, isdraggable, dragHandle, canDuplicate, duplicateClass, canPaste, pasteClass, showBurgerMenu, showstyle, styleLabel) {
    var optionDOM = '';
    //text to know the option
    if (typeof (showBurgerMenu) !== "undefined" && showBurgerMenu) {
        optionDOM += DOMCreate('i', '', 'fa fa-bars showhideColumns', '', []);
    }
    //optionDOM += DOMCreate('i', label, 'opt-name', '', ['title="option name"']);
    //paste option
    if (typeof (canPaste) !== "undefined" && canPaste)
        optionDOM += DOMCreate('i', 'Paste', 'inactivePaste ' + pasteClass, '', ['title="paste"']);
    //setting options
    optionDOM += DOMCreate('i', 'Settings', 'com-settings', '', ['title="' + label + ' settings"', 'data-type="' + dataType + '"']);
    //copy option
    if (typeof (canDuplicate) !== "undefined" && canDuplicate)
        optionDOM += DOMCreate('i', 'Duplicate', duplicateClass, '', ['title="duplicate"']);
    //setting options
    if (typeof (showstyle) !== "undefined" && showstyle) {
        var stylelbl = 'Style';
        if (typeof (styleLabel) !== "undefined") {
            stylelbl = styleLabel;
        }
        optionDOM += DOMCreate('i', stylelbl, 'com-style', '', ['title="' + stylelbl + ' settings"', 'data-type="' + dataType + '"']);
    }
    //delete  options
    optionDOM += DOMCreate('i', 'Delete', 'deletehelper', '', ['title="delete"']);
    //Wrap options in carries-options
    //drag option
    var tooglereplace = '';
    if (isdraggable)
        tooglereplace += DOMCreate('i', '', 'icon-icon-drag ' + dragHandle, '', ['title="drag"']);
    tooglereplace += label + DOMCreate('i', '', 'tooglesettings fa fa-bars');
    optionDOM = DOMCreate('div', tooglereplace, 'carrier-open-option', '') + DOMCreate('div', optionDOM, 'hide-element  carries-options ' + optionClass);
    return optionDOM;
}

function GeneralColOptionDOM(optionClass, label, dataType, isdraggable, dragHandle, canDuplicate, duplicateClass, canPaste, pasteClass) {
    var optionDOM = '';
    //text to know the option
    if (typeof (showBurgerMenu) !== "undefined") {
        optionDOM += DOMCreate('i', '', 'fa fa-bars showhideColumns', '', []);
    }
    //optionDOM += DOMCreate('i', label, 'opt-name', '', ['title="option name"']);
    //copy option
    if (typeof (canDuplicate) !== "undefined" && canDuplicate)
        optionDOM += DOMCreate('i', 'Copy Components', duplicateClass, '', ['title="duplicate"']);
    //paste option
    if (typeof (canPaste) !== "undefined" && canPaste)
        optionDOM += DOMCreate('i', 'Paste Components', 'inactivePaste ' + pasteClass, '', ['title="paste"']);
    //setting options
    optionDOM += DOMCreate('i', 'Settings', 'com-settings', '', ['title="' + label + ' settings"', 'data-type="' + dataType + '"']);
    //delete  options
    optionDOM += DOMCreate('i', 'Empty Column', 'deletehelper', '', ['title="delete"']);
    //Wrap options in carries-options
    //drag option
    var tooglereplace = '';
    if (isdraggable)
        tooglereplace += DOMCreate('i', '', 'icon-icon-drag ' + dragHandle, '', ['title="drag"']);
    tooglereplace += label + DOMCreate('i', '', 'fa fa-bars');
    optionDOM = DOMCreate('div', tooglereplace, 'carrier-open-option', '') + DOMCreate('div', optionDOM, 'hide-element  carries-options ' + optionClass);
    return optionDOM;
}
var rowOption = GeneralOptionDOM('row-options', 'Row', 'row', true, 'dragRow', true, 'copyRow', false, '', false, true, 'Manage Columns');
var textOption = GeneralOptionDOM('text-options', 'Text', 'text', true, 'sortComponent');
var colortextOption = GeneralOptionDOM('colortext-options', 'Text', 'color text', true, 'sortComponent');
var imageOption = GeneralOptionDOM('img-options', 'Image', 'image', true, 'sortComponent');
var fontOption = GeneralOptionDOM('font-options', 'Icon', 'paragraph', true, 'sortComponent');
var holderOption = GeneralOptionDOM('holder-options', 'Holder', 'holder', true, 'sortComponent', true, 'duplicateHolder', false, '', false, '');
var colOption = GeneralColOptionDOM('col-options', 'Col', 'column', false, '', true, 'copyData', true, 'pasteData', 'showBurgerMenu');
var rowSeparatorOption = GeneralOptionDOM('seperator-options', 'Separator', 'row separator', true, 'dragRow');
var underlineOption = GeneralOptionDOM('underline-options', 'UnderLine', 'row separator', true, 'sortComponent');
var fontIconOption = GeneralOptionDOM('font-icon-options', 'icon', 'font icon', true, 'sortComponent', false, '', false, '', false, true, 'Manage Style');
var linkbuttonIcon = GeneralOptionDOM('button-options', 'link', 'button', true, 'sortComponent', false, '', false, '', false, true, 'Manage Style');

function DOMCreateStart(tag, className, id, extra) {
    var returnDOM = '';
    if (tag !== undefined) {
        returnDOM += '<' + tag;
        if (className !== undefined && className.length > 0)
            returnDOM += ' class="' + className + '"';
        if (id !== undefined && id.length > 0)
            returnDOM += ' id="' + id + '" ';

        if (extra !== undefined && extra.length > 0) {
            var extraLength = extra.length;
            var dType = '';
            for (var extraItem = 0; extraItem < extraLength; extraItem++) {
                dType += ' ' + extra[extraItem];
            }
            returnDOM += dType;
        }
        returnDOM += '>';
    }
    return returnDOM;
}
function DOMCreateEnd(tag) {
    return '</' + tag + '>';
}
function DOMCreate(tag, appendData, className, id, extra) {
    return DOMCreateStart(tag, className, id, extra) + appendData + DOMCreateEnd(tag);
}
function DivCreate(className, id, datatype, style) {
    return DOMCreateStart('div', className, id, datatype, style);
}
var divEnd = DOMCreateEnd('div');
var spanEnd = '</span>';
function divStart(divClass) {
    return '<div class="' + divClass + '">';
}
var rowInitStart = '<div class="editor-row sfCol_100">';
var rowInitEnd = '</div>';
var divHolderStart = '<div class="editor-component">';
var rawImage = divHolderStart + '<img src="' + webbuildermodulepath + '/img/def5.jpg" style="width:100%" class="editor-image"/>' + divEnd;
var rawParaGraph = divHolderStart + '<p class="editor-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' + divEnd;
var rawHeading = divHolderStart + '<h1 class="editor-heading">Lorem Ipsum<h1>' + divEnd;
var absoluteBar = '<div class="resizebar"></resizebar>';
var noElement = '<div class="noElement">Drag a row here</div>';
var noColumnElem = '<div class="noColumn">Create column<i class="fa fa-plus" aria-hidden="true"></i></div>';

var columnCreateDOM = '<div class="column-empty">';
columnCreateDOM += '<h4>This is ROW</h4>';
columnCreateDOM += '<p>You can choose given column setup inside ROW or you can create by your own</p>';
columnCreateDOM += '<span class="col-select">';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="1" src="' + webbuildermodulepath + '/img/col1.png"><span>1 column</span></span>';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="2" src="' + webbuildermodulepath + '/img/col2.png"><span>2 columns</span></span>';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="3" src="' + webbuildermodulepath + '/img/col3.png"><span>3 columns</span></span>';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="4" src="' + webbuildermodulepath + '/img/col4.png"><span>4 columns</span></span>';
//columnCreateDOM += '</span>';
columnCreateDOM += spanEnd;
columnCreateDOM += '<div class="clearfix set-custom-col">';
columnCreateDOM += '<label>Set Custom Column</label>';
columnCreateDOM += '<span class="value">';
columnCreateDOM += '<input type="text" class="txtColumNo"> Column(s)';
columnCreateDOM += '<span class="sfCreateRow sfBtn smlbtn-succ icon-icon-tick">Create</span>';
columnCreateDOM += spanEnd;
columnCreateDOM += divEnd;
columnCreateDOM += divEnd;

function SelectDOMCreate(selID, selClass, optionArray) {
    var selDOM = '<select';
    if (typeof (selID) !== 'undefined' && selID.length > 0) {
        selDOM += ' id="' + selID + '"';
    }
    if (selID !== 'undefined') {
        selDOM += ' class="' + selClass + '"';
    }
    selDOM += '>';
    if (typeof (optionArray) !== 'undefined') {
        var optionArrayLen = optionArray.length;
        for (var i = 0; i < optionArrayLen; i++) {
            selDOM += '<option value="' + optionArray[i][0] + '">' + optionArray[i][1] + '</option>';
        }
    }
    selDOM += '</select>';
    return selDOM;
}

function FieldRowDOMCreate(data) {
    return '<div class="field-row clearfix">' + data + '</div>';
}

function CreateSliderDOM(sliderID, sliderHandlerID, label) {
    var sliderDOM = '';
    if (typeof (sliderHandlerID) !== 'undefined' && typeof (sliderID) !== 'undefined' && sliderID.length > 0 && sliderHandlerID.length > 0) {
        sliderDOM = DOMCreate('div', '0', 'ui-slider-handle', sliderHandlerID);
        sliderDOM = DOMCreate('div', sliderDOM, '', sliderID);
        sliderDOM = DOMCreate('span', sliderDOM, 'value');
        sliderDOM = DOMCreate('label', label) + sliderDOM;
        sliderDOM = FieldRowDOMCreate(sliderDOM);
    }
    return sliderDOM;
}
function CreateSliderWithColorDOM(sliderID, sliderHandlerID, label, colorID, colorClass) {
    var sliderDOM = '';
    if (typeof (sliderHandlerID) !== 'undefined' && typeof (sliderID) !== 'undefined' && sliderID.length > 0 && sliderHandlerID.length > 0) {
        sliderDOM = DOMCreate('div', '0', 'ui-slider-handle', sliderHandlerID);
        sliderDOM = DOMCreate('div', sliderDOM, '', sliderID) + DOMCreate('span', '', 'color-picker-holder ' + colorClass, colorID);
        sliderDOM = DOMCreate('span', sliderDOM, 'value');
        sliderDOM = DOMCreate('label', label) + sliderDOM;
        sliderDOM = FieldRowDOMCreate(sliderDOM);
    }
    return sliderDOM;
}

function CreateColorPickerDOM(label, colorID, colorClass) {
    var clrDOM = '';
    if (typeof (colorID) !== 'undefined' && typeof (colorClass)) {
        clrDOM = DOMCreate('span', '', 'color-picker-holder ' + colorClass, colorID);
        clrDOM = DOMCreate('label', label) + DOMCreate('span', clrDOM, 'value');
        clrDOM = FieldRowDOMCreate(clrDOM);
    }
    return clrDOM;
}
function CreateCheckboxDOM(label, chkID, chkCLass) {
    var chkDOM = '';
    if (typeof (chkID) !== 'undefined' && typeof (chkCLass)) {
        chkDOM = ' <input id="' + chkID + '" class="' + chkCLass + '" type="checkbox" />';
        chkDOM += '<label for="' + chkID + '">' + DOMCreate('i', '', 'icon-icon-tick') + '</label>';
        chkDOM = DOMCreate('label', label) + DOMCreate('span', chkDOM, 'value');
        chkDOM = FieldRowDOMCreate(chkDOM);
    }
    return chkDOM;
}

function ObjectToString(object) {
    var str = '';
    for (var p in object) {
        if (object.hasOwnProperty(p)) {
            if (typeof object[p] === "number")
                str += '"' + p + '":' + object[p] + ', \n';
            else if (typeof object[p] === "boolean")
                str += '"' + p + '":' + object[p] + ', \n';
            else if (typeof object[p] === "string")
                str += '"' + p + '":' + JSON.stringify(object[p]) + ', \n';
            else if (typeof object[p] === "function")
                str += '"' + p + '" :' + object[p] + ', \n';
            else if (Array.isArray(object[p])) {
                str += '"' + p + '":' + JSON.stringify(object[p]) + ', \n';
            }
            else if (typeof object[p] === "object") {
                str += '"' + p + '" :{ \n \t' + ObjectToString(object[p]) + '}, \n';
            }
        }
    }
    return str;
}

function TriggerView($html) {
    $html.find('.editor-component').each(function () {
        var $this = $(this);
        var key = $this.find(' > .carries-options > .com-settings').attr('data-type');
        var compo = component[key];
        if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined")
            compo.afterdrop($this.parent(), $this, false, true);
    });
}
var CommonLibrary = {
    AjaxCall: function (config) {
        var auth = {
            UserModuleID: webBuilderUserModuleID,
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture,
        }
        config = $.extend
             ({
                 async: false,
                 cache: false,
                 type: 'POST',
                 contentType: "application/json; charset=utf-8",
                 data: {},
                 method: '',
                 dataType: 'json',
                 url: '',
                 ajaxSuccess: '',
                 ajaxFailure: function () {
                     alert("Server Error.", "Error");
                 }
             }, config);
        config.data = $.extend({ auth: auth }, config.data);
        config.data = JSON2.stringify(config.data)
        $.ajax({
            type: config.type,
            contentType: config.contentType,
            cache: config.cache,
            async: config.async,
            url: config.url + '/' + config.method,
            data: config.data,
            dataType: config.dataType,
            success: config.ajaxSuccess,
            error: config.ajaxFailure,
        });
    },
}
function findSelectedLayer($elem) {
    var $editcontainer = $elem.find('> .editor-row-shaded-layer');
    if ($editcontainer.length > 0) {
        var $shadedLayer = $editcontainer.find('> .editor-row-container');
        if ($shadedLayer.length > 0) {
            return $shadedLayer;
        }
        else {
            return $editcontainer;
        }
    }
    else if ($elem.find('> .editor-row-container').length > 0) {
        return $elem.find('> .editor-row-shaded-layer');
    }
    else {
        return $elem;
    }
}
