(function ($) {
    $.ImageFlowView = function (p) {
        p = $.extend
               ({
                   ContainerDivID: '',
                   Style: '',
                   Spacing: '-0.5',
                   Arrow: '',
                   AutoPlay: '',
                   Looping: '',
                   Clickable: '',
                   ScrollWheel: '',
               }, p);
        var ImageFlowView = {
            init: function () {
                var IsButton = false;
                var AutoPlaySpeed = false;
                var Loop = false;
                var Clickable = false;
                var IsScrollWheel = false;
                if (p.Arrow == 'True')
                    IsButton = true;
                if (p.AutoPlay == 'True')
                    AutoPlaySpeed = 3000;//millisecond
                if (p.Looping == 'True')
                    Loop = true;
                if (p.Clickable == 'True')
                    Clickable = true;
                if (p.ScrollWheel == 'True')
                    IsScrollWheel = true;
                var flipster= $('#'+p.ContainerDivID).flipster({
                    style: p.Style,
                    spacing: p.Spacing,
                    nav: false,
                    buttons: IsButton,
                    autoplay: AutoPlaySpeed,
                    loop: Loop,
                    click: Clickable,
                    scrollwheel: IsScrollWheel,
                });
            }
        }
        ImageFlowView.init();
    }
    $.fn.ImageFlowView = function (p) {
        $.ImageFlowView(p);
    };
})(jQuery);
$(function () {
  
})
