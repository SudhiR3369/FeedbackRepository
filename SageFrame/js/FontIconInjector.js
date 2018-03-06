(function ($) {
    $.FontIconInjector = function (FontChooseUI, P) {
        /*
        Author: Rudra Chamlagain
        Date:2016/12/21
        Description: This Plugin is for SageFrame used to choose Font Icon.
        You can make any div as Icon choose browse button.
        Sample html code to use it
        //Include "js/FontInjector.js" file in your module
        <div id="myIcon"></div>
        <span id="currentChoosenIcon"></span>
        <script>
         $(function () {
         $('#myIcon').SageFontIconChooser({
            appendTo: "#currentChoosenIcon",// provide element selector where you want to inject icon,If there is Icon tag inside this element then that icon is active in icon browse as current choosen icon.
            callback: function (value) { // this function return object, which have iconClass,DOM,fontSize,fontColor
            },
            sizeControl: true,// if you want to customize icon size  then enable this control. default value true
            colorControl: true, // if you want to customize icon color then enable this control. default value true
            buttonText:'Choose Icon' // your button text. default text Choose Icon
           });        
          })
        </script>
              
        */

        var BtnOpenDialog;
        var PopUpDiv;
        var IconArr;
        var CurIconDom = '';
        var CurIconClassName = '';
        var script = document.createElement('script');
        var link = document.createElement('link');
        var IconHtml = '';
        P = $.extend({
            appendTo: '',
            callback: '',
            sizeControl: true,
            colorControl: true,
            buttonText: 'Choose Icon'
        }, P);
        var returnValue = {
            iconClass: "",
            DOM: "",
            fontSize: "",
            fontColor: "",
        };
        var FontIconInjector = {

            init: function () {

                if ($(FontChooseUI).length > 0 && $(FontChooseUI).attr('type') != 'input') {
                    //adding css dynamically to the page
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('type', 'text/css');
                    link.setAttribute('href', SageFrameHostURL + '/css/FontIconInjector.css');
                    document.getElementsByTagName('head')[0].appendChild(link);
                    BtnOpenDialog = document.createElement('span');
                    $(BtnOpenDialog).addClass('btnIconChoose');
                    $(BtnOpenDialog).text(P.buttonText)
                    PopUpDiv = document.createElement('div');
                    $(PopUpDiv).addClass('iconWrapper sfDivFlying hide');
                    var PopHtml = '';
                    PopHtml = '<div class="closeControl"><span class="closeFlyingDiv"><i class="fa fa-times" aria-hidden="true"></i></span></div>'
                    PopHtml += '<input  type="text" class="sfInputbox searchIcon" placeholder="Search Icon"/>';
                    PopHtml += '<div class="iconList" ></div>';
                    PopHtml += '<div class="previewWrap" style="display:none;">';
                    PopHtml += '<div class="control">';
                    if (P.sizeControl)
                        PopHtml += '<label>Size</label><span id="lblSize"></span><input type="range" min="10" max="250" class="slideIconSize" />'
                    if (P.colorControl)
                        PopHtml += '<label>Color</label><input type="text" class="iconColorChooser" value="#000000" />'
                    PopHtml += '</div>'
                    PopHtml += '<div class="iconPreview"></div>'
                    PopHtml += '</div><div class="sfButtonwrapper">'
                    PopHtml += '<button class="btnOkIcon sfBtn smlbtn-succ"><i class="fa fa-check" aria-hidden="true"></i>Ok</button></div>'

                    $(FontChooseUI).html('');
                    $(FontChooseUI).append(BtnOpenDialog);
                    $(FontChooseUI).append(PopUpDiv);
                    $(PopUpDiv).html(PopHtml);
                    $(PopUpDiv).hide();
                    FontIconInjector.UIEvents();
                   
                }
            },
            UIEvents: function () {
                $('.iconList').on('click', '.icon', function () {
                    $('.iconWrapper span').removeClass('iconActive');
                    $(this).addClass('iconActive');
                    CurIconClassName = $(this).find('i').prop('class');
                    FontIconInjector.IconPreview();
                });
                $(BtnOpenDialog).off().on('click', function () {
                   
                    FontIconInjector.OpenPopUp(this);
                })
                $(PopUpDiv).on('click', '.btnOkIcon', function (e) {
                    e.preventDefault();
                    if (typeof P.callback == 'function') {
                        returnValue.DOM = CurIconDom,
                        returnValue.iconClass = CurIconClassName,
                        P.callback(returnValue);
                    }
                    if ($(P.appendTo).length > 0) {
                        $(P.appendTo).html(IconHtml);
                    }
                    FontIconInjector.ClosePopUp();

                })
                $(PopUpDiv).on('click','.closeFlyingDiv' ,function () {
                    FontIconInjector.ClosePopUp();
                })

                $('.searchIcon').on('keyup', function () {
                    CurIconDom = '';
                    CurIconClassName = '';
                    FontIconInjector.SearchIcon(this);
                })
                $('.slideIconSize').on('change', function () {
                    FontIconInjector.IconPreview();
                })
                $('.slideIconSize').val(16);
                $('#lblSize').text(16);
                $('.iconColorChooser').on('change', function () {
                    FontIconInjector.IconPreview();
                })
            },
            IconPreview: function () {
                $('.previewWrap').show();
                var style = '';
                IconHtml = '';
                if (CurIconClassName != '') {
                    if (P.sizeControl && P.colorControl) {
                        returnValue.fontSize = $('.slideIconSize').val();
                        returnValue.fontColor = $('.iconColorChooser').val();
                        IconHtml = '<i aria-hidden="true" style="font-size:' + returnValue.fontSize + 'px;color:' + returnValue.fontColor + ';" class="' + CurIconClassName + '" data-size="' + returnValue.fontSize + '" data-color="' + returnValue.fontColor + '"></i>';
                    }
                    else if (P.sizeControl) {
                        returnValue.fontSize = $('.slideIconSize').val();
                        IconHtml = '<i aria-hidden="true" style="font-size:' + returnValue.fontSize + 'px;" class="' + CurIconClassName + '" data-size="' + returnValue.fontSize + '"></i>';
                    }
                    else if (P.colorControl) {
                        returnValue.fontColor = $('.iconColorChooser').val();
                        IconHtml = '<i aria-hidden="true" style="color:' + returnValue.fontColor + ';" class="' + CurIconClassName + '" data-Color="' + returnValue.fontColor + '"></i>';
                    }
                    else {
                        IconHtml = '<i aria-hidden="true"  class="' + CurIconClassName + '"></i>';
                    }
                    $(PopUpDiv).find('.iconPreview').html(IconHtml);
                    CurIconDom = $(PopUpDiv).find('.iconPreview').children('i');
                    $('#lblSize').text($('.slideIconSize').val())
                }


            },
            GetAllFontIcon: function () {
                $.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    cache: false,
                    async: false,
                    url: SageFrameAppPath + '/Sage_Services/SageFrameGlobalWebService.asmx/GetAllFontIcon',
                    data: '{}',
                    dataType: 'json',
                    success: FontIconInjector.FontsGetSucces,
                    error: FontIconInjector.ajaxFailure
                });
            },

            FontsGetSucces: function (data) {
                var Lstdata = data.d
                IconArr = new Array();
                IconArr = Lstdata;
                FontIconInjector.BindIconList(Lstdata);
            },
            BindIconList: function (Lstdata) {
                var html = '';
                if (Lstdata.length > 0) {
                    $.each(Lstdata, function (index, item) {
                        html += '<span class="icon"><i class="fa ' + item + '"aria-hidden="true"></i></span>';
                    });
                }
                else {
                    html += '<h3>Sorry!! icon not found.</h3>';
                }
                $(PopUpDiv).children('.iconList').html(html);
                // if already choosen Icon in appendTo 
                if ($(P.appendTo).length > 0) {
                    var Icon = $(P.appendTo).children('i').first();
                    if ($(Icon).length > 0) {
                        var ClassName = $(Icon).prop('class');
                        CurIconClassName = ClassName;
                        ClassName = ClassName.split(' ').pop();
                        $('.iconList .' + ClassName).parent().addClass('iconActive');
                        if (P.colorControl && P.sizeControl) {
                            $('.iconColorChooser').val($(Icon).attr('data-color'));
                            $('.slideIconSize').val($(Icon).attr('data-size'));
                        }
                        else if (P.colorControl) {
                            $('.iconColorChooser').val($(Icon).attr('data-color'));
                        }
                        else if (P.sizeControl) {
                            $('.slideIconSize').val($(Icon).attr('data-size'));
                        }

                        FontIconInjector.IconPreview();
                    }

                }
            },
            SearchIcon: function (thatInput) {
                var strSearch = $(thatInput).val();
                if (strSearch != '') {
                    var SearchIconArr = new Array();
                    for (var j = 0; j < IconArr.length; j++) {
                        if (IconArr[j].match(strSearch)) {
                            SearchIconArr.push(IconArr[j]);
                        }
                    }
                    FontIconInjector.BindIconList(SearchIconArr);
                }
                else {
                    FontIconInjector.BindIconList(IconArr);
                }
            },
         
            OpenPopUp: function (thatButton) {
                var top = $(thatButton).offset().top;
                if (top>350)
                    top = top -350;
                var left = $(thatButton).offset().left;
                if (left > 550)
                    left = left - ($(thatButton).width() + 2);
                else {
                    left = left + $(thatButton).width() + 2;
                }
               
                $(thatButton).next('.sfDivFlying').fadeIn("slow");
                $(thatButton).next('.sfDivFlying').offset({ top: top, left: left });
                $(PopUpDiv).find('.previewWrap').hide();
                if ((P.colorControl && !P.sizeControl) || !(P.colorControl || P.sizeControl))
                       $('.iconPreview').css('font-size', '50px');
                // adding script  dynamically
                if (P.colorControl || P.sizeControl)
                    $(PopUpDiv).find('.control').show();
                if (P.colorControl) {
                    script.src = SageFrameHostURL + '/Administrator/Templates/Default/js/colorpicker.js';
                    document.body.appendChild(script);
                    FontIconInjector.MakeColorPicker();
                }
              
                FontIconInjector.GetAllFontIcon();// Initiallly  

            },
            ClosePopUp:function(){
                $(BtnOpenDialog).next('.sfDivFlying').fadeOut("slow");
                CurIconDom = '';
                CurIconClassName = '';
                if (P.colorControl)
                    document.body.removeChild(script);
            },
            MakeColorPicker: function () {
                $('.iconColorChooser').ColorPicker({
                    color: '#000000',
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(300);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(300);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        $('.iconColorChooser').val('#' + hex);
                        $('.iconColorChooser').trigger('change');
                    }
                });
            },
            ajaxFailure: function () {
            },
        }
        FontIconInjector.init();
    }
    $.fn.SageFontIconChooser = function (P) {
        $.FontIconInjector(this, P)
    };
})(jQuery);