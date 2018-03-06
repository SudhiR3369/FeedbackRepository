(function ($) {

    $.fn.LoadFirst = function (templateFavIcon) {

        var code = document.getElementsByTagName("code");
        if (code.length > 0) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = SageFrameHostURL + "/Editors/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js";
            $("head").append(script);

            var link = document.createElement("link");
            link.href = SageFrameHostURL + "/Editors/ckeditor/plugins/codesnippet/lib/highlight/styles/dark.css";
            link.type = "text/css";
            link.rel = "stylesheet";
            $("head").append(link);
            hljs.initHighlightingOnLoad();
        }


        $('div.sfMessage').on("click", function () {
            $(this).slideUp();
        });
        // $('a.sfManageControl').on("click", function (e) {
        //var $this = $(this);
        //$('html, body').animate({ scrollTop: 0 }, 'slow');
        //var screen_res = screen.width;
        //var align = (screen_res - 800) / 2;
        //var url = $(this).attr("rel");
        //$('#divFrame').attr("src", url);
        //var dialogOptions = {
        //    "title": $this.parents('.sfModule').find('.sfPosition').text(),
        //    "width": 800,
        //    "height": 600,
        //    "modal": true,
        //    "position": [align, 150],
        //    "z-index": 500,
        //    "close": function () { location.reload(); }
        //};
        //if ($("#button-cancel").attr("checked")) {
        //    dialogOptions["buttons"] = {
        //        "Cancel": function () {
        //            $(this).dialog("close");
        //        }
        //    };
        //}
        ////dialog-extend options
        //var dialogExtendOptions = {
        //    "maximize": true,
        //    "minimize": false
        //};
        ////open dialog
        //$("#divFrame").dialog(dialogOptions).dialogExtend(dialogExtendOptions);
        //$('div.ui-dialog').css("z-index", "3000");
        //$('div.ui-dialog').resizable('destroy');
        //return false;
        //});

        //$('.sfManageControl').on('click', function () {
        //    var url = $(this).attr("rel");
        //    $('#divFrame').attr("src", url);
        //});
        var heightMakerHolder = '<div class="SettingHeightMaker"></div>';
        $(heightMakerHolder).insertAfter('.sfModule');

        //var SettingHolder = '<div class="SettingPlaceHolder"></div>';
        //$('body').append(SettingHolder);

        $('.sfModuleControl').off().on('click', '.sfManageControl', function () {
            $('.SettingHeightMaker.monitor').css({ 'height': '0px' });
            $('#SettingPlaceHolder').css({ 'height': '0px' });
            var $this = $(this).parent();
            var url = $this.find('.sfManageControl').attr("rel");
            var query = $this.find('.sfManageControl').attr('data-query');
            var actionDOM = '<div class="settingactioniconWrappers">';
            actionDOM += '<i class="icon-close" id="removeSettingHolder" width="100%"></i>';
            var href = SageFrameHostURL + '/CommonEdit.aspx?' + query;
            actionDOM += '<a href="' + href + '" target="_Blank"><i class="fa fa-pencil" id="removeSettingHolder" width="100%"></i>In Single Editor</a>';
            actionDOM += '</div>';
            var iframe = actionDOM + '<iframe id="divFrame" style="display: none" width="100%" height=""></iframe>';
            $('#SettingPlaceHolder').html(iframe);
            $('#divFrame').attr("src", url);
            $('.SettingHeightMaker').removeClass('monitor');
            $('.highlightSettingUp').remove();
            $this.parent().next().addClass('monitor');
            var upperGrid = '<div class="highlightSettingUp" style=""></div>'
            $('.SettingHeightMaker.monitor').append(upperGrid);

            var top = $('.SettingHeightMaker.monitor').offset().top;
            var elementHeight = $this.height();
            var topStickyBarHeight = $('.sfTopbar').height();
            var actionWrapHeight = $('.settingactioniconWrappers').height();
            var windowHeight = $(window).height() - actionWrapHeight - 6;
            var sfModuleHeight = $this.parent('.sfModule').height();
            var tolerance = 20;
            var scrollTop = top + elementHeight - topStickyBarHeight - tolerance;
            $('.highlightSettingUp').css({
                "height": topStickyBarHeight + 'px',
                'width': '100%'
            });
            $('html, body').animate({ scrollTop: (scrollTop) }, 100, function () {
                $('#divFrame').show();
                $('#SettingPlaceHolder').css({
                    'left': '0px',
                    'top': top + 'px',
                    'width': '100%',
                    'height': '10px',
                    'position': 'absolute'
                });
                $('.SettingHeightMaker.monitor').animate({
                    'height': windowHeight + 'px'
                }, 1000);

                $('#SettingPlaceHolder').animate({
                    'height': windowHeight + 'px'
                }, 1000, function () {
                    $('html, body').animate({ scrollTop: (scrollTop) }, 100);
                });
                $('#divFrame').attr('height', windowHeight + 'px');
            });
            $('#removeSettingHolder').on('click', function () {
                $('.highlightSettingUp').remove();
                $('.SettingHeightMaker.monitor').animate({
                    'height': '0px'
                }, 1000);
                $('#SettingPlaceHolder').animate({
                    'height': '0px'
                }, 1000, function () {
                    $('html, body').animate({
                        scrollTop: (scrollTop - elementHeight - sfModuleHeight - topStickyBarHeight)
                    }, 100, function () {
                        location.reload();
                    });
                });
                $('#SettingPlaceHolder').css({
                    'position': 'relative'
                });
                $('#SettingPlaceHolder').html('');
            });
        });
        $("#btnScrollTop").hide();
        // fade in #btnScrollTop           
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#btnScrollTop').fadeIn();
            } else {
                $('#btnScrollTop').fadeOut();
            }
            ShowTopstickBar();
        });
        var myVar = null;
        function ShowTopstickBar() {
            clearInterval(myVar);
            BindMouseEvents();
            $('.sftopstickbarToggle').fadeIn();
            myVar = setInterval(function () {
                // HideTopstickBar();
            }, 5000);
        }
        //top stickbar show hide Start
        function HideTopstickBar() {
            $('.sftopstickbarToggle').fadeOut();
            clearInterval(myVar);
        }
        function BindMouseEvents() {
            $('.sfTopbar').on('mouseenter hover mousemover', function () {
                clearInterval(myVar);
            });
            $('.sfTopbar').on('mouseleave', function () {
                //ShowTopstickBar();
            });
        }
        $('.quickhidetopStickbar').on('click', function () {
            $('.sfTopbar').off('mouseenter hover mousemove mouseleave');
            // HideTopstickBar();
        });
        ShowTopstickBar();
        //top stickbar show hide end

        // scroll body to 0px on click
        $('#btnScrollTop').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = templateFavIcon;
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    setTimeout(function () {
        if (SageFrameUserName != 'anonymoususer')
            $('body').addClass('loggedIn');
        else
            $('body').removeClass('loggedIn');
    }, 1000);
   
})(jQuery);


function BodyLoad()
{
    $('.loadingpage').hide();
}
// if you need material Form in view section then uncomment below code 
/* $(function () {
	
	if(typeof(IsMaterialFrom)==='undefined'){
			$('.sfFormwrapper .formValue select').each(function () {
			var isMultiple = $(this).attr('multiple');
			if (isMultiple == null || isMultiple == undefined || isMultiple != 'multiple')
				$(this).parent().parent().children('.formKey').addClass('selectKey');
		});
		$('.sfFormwrapper .formValue input[type="text"],input[type="password"]').each(function () {
			$(this).parent().parent().children('.formKey').addClass('textType');
			if ($(this).val() != "") {
				$(this).parent().parent().addClass('fieldComplete');
			}
		});
		$('.sfFormwrapper').off().on('click', '.formKey .sfFormlabel', function () {
			$(this).parent().next().children('input[type="text"],input[type="password"]').focus();
		});

		$('.sfFormwrapper .formValue input[type="text"] ,input[type="password"]').focusin(function () {
			$(this).parent().parent().addClass('fieldActive');

		});
		$('.sfFormwrapper .formValue input[type="text"],input[type="password"]').focusout(function () {
			var ThatInput = this;
			setTimeout(function () {
				if ($(ThatInput).val() != "")
					$(ThatInput).parent().parent().addClass('fieldComplete');
				else {
					$(ThatInput).parent().parent().removeClass('fieldComplete');
					$(ThatInput).parent().parent().removeClass('fieldActive');
				}
			}, 200);
		});
	}
}) */
/*new Dashboard*/
$(function () {

    $('.toggle-menu-bar').off().on('click', function () {
        $('.menu-default').toggleClass('menu-expand');
        $(this).toggleClass('collapse-menu');
        $('body').append('<div class="close-layer"></div>');
    })
    $('.dashboard-top-bar').find('.loginInfo a').text('');
});