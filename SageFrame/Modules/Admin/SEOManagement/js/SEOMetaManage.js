
function computeConnectionSpeed(start) {
    end = (new Date()).getTime();
    //this is static size and need not to be dynamic unless there is image in  /Modules/Admin/SEOManagement/pagesizecalucatingimage/bond.jpg of 153 kb
    var fileSize = 153;
    var connectSpeed = (Math.floor(((fileSize * 8) / ((end - start) / 1000)) / 1024));
    $('#pagespeed').find('.result').text(connectSpeed + " kbps");
}
//(function ($) {
//    $.slide = function (p, $this) {
//        p = $.extend({
//            slider: '',
//            prev: '',
//            next: ''
//        }, p);
//        ImageSlider = {
//            config: {
//                isPostBack: false,
//                async: false,
//                cache: false,
//                type: 'POST',
//                contentType: "application/json; charset=utf-8",
//                data: '{}',
//                dataType: 'json',
//                crossDomain: true,
//                baseURL: p.modulePath + 'Services/webservice.asmx/',
//                method: "",
//                url: "",
//                ajaxCallMode: "",
//                userModuleID: p.userModuleID,
//                slider: p.slider
//            },
//            init: function () {
//                var clas = $this.attr('class');
//                var slideCount = this.config.slider.find('ul li').length;
//                var slideWidth = this.config.slider.find('ul li').width();
//                var slideHeight = this.config.slider.find('ul li').height();
//                var sliderUlWidth = slideCount * slideWidth;
//                this.config.slider.css({ width: slideWidth * 6, height: slideHeight });
//                this.config.slider.find('ul').css({ width: sliderUlWidth * 6, marginLeft: -slideWidth });
//                //$slider.find('ul li:last-child').prependTo('#slider ul');

//                $('span.control_prev').click(function () {
//                    ImageSlider.MoveLeft();
//                });

//                $('span.control_next').click(function () {
//                    ImageSlider.MoveRight();
//                });
//            },
//            MoveLeft: function () {
//                slideCount = this.config.slider.find('ul li').length;
//                slideWidth = this.config.slider.find('ul li').width();
//                slideHeight = this.config.slider.find('ul li').height();
//                var cla = $this.attr('class');
//                var left = parseInt(this.config.slider.find('ul').css('marginLeft').replace('px', ''));
//                this.config.slider.find('ul').animate({
//                    left: left + slideWidth
//                }, 400, function () {
//                    //$slider.find('ul li:last-child').prependTo('#slider ul');
//                    //$slider.find('ul').css('left', '');
//                    this.config.slider.find('ul').css('marginLeft', left + slideWidth);
//                });
//            },

//            MoveRight: function () {
//                slideWidth = this.config.slider.find('ul li').width();
//                var left = parseInt(this.config.slider.find('ul').css('marginLeft').replace('px', ''));
//                this.config.slider.find('ul').animate({
//                    left: left - slideWidth
//                }, 400, function () {
//                    //$slider.find('ul li:first-child').appendTo('#slider ul');
//                    //$slider.find('ul').css('left', '');
//                    this.config.slider.find('ul').css('marginLeft', left - slideWidth);
//                });
//            }
//        }
//        ImageSlider.init();
//    }
//    $.fn.Slider = function (p) {
//        $.slide(p, $(this));
//    };
//})(jQuery);
(function ($) {
    var totalRequest = window.performance.getEntriesByType("resource").length;
    $.SEOMetaManagementView = function (p) {
        p = $.extend({
            modulePath: '/Modules/Admin/SEOManagement/',
            userModuleID: '',
            pageExtension: ''
        }, p);
        var pageName = '';
        var httpresponsetext = '';

        //var $validator;
        var analyzingReport = {
            "init": "Parsing site",
            "SiteParsingSuccess": "Site is parsed successfully",
            "RemoveScript": "Removing unnecessary scripts",
            "CountWordsStarted": "Counting the repetated words in the site started",
            "CountWordsEnd": "Counting the repetated words in the site finished"
        };
        var suggestionHeader = '<thead><tr>';
        suggestionHeader += '<th class="srtName">';
        suggestionHeader += '<span>Suggestion</span>';
        suggestionHeader += '<span>Select from the list below</span>';
        suggestionHeader += '</th>';
        suggestionHeader += '<th style="display:none;"  class="srtWordCount">';
        suggestionHeader += '<i class="fa fa-long-arrow-down"></i><nfontspan>Words count</span>';
        suggestionHeader += '</th>';
        suggestionHeader += '<th style="display:none;" class="strRepetition">';
        suggestionHeader += '<i class="fa fa-long-arrow-down"></i><span>Repetitions</span>';
        suggestionHeader += '</th>';
        suggestionHeader += '<th style="display:none;" class="strLength">';
        suggestionHeader += '<i class="fa fa-long-arrow-down"></i><span>total length</span>';
        suggestionHeader += '</th>';
        suggestionHeader += '</tr></thead>';
        var selectPageID = 0;
        var SEOMeta = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/SEOManagementWebService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                pageExtension: p.pageExtension
            },
            init: function () {
               
                SEOMeta.Events();
                SEOMeta.SelectPageFromURL();
            },
            Events: function () {
                $('#GenerateMetaSuggestions').on('click', function () {
                    $('.PageAnalyzeWrapper').hide();
                    $('.dynamicForm').show();

                });
                $('#closesuggestions').on('click', function () {
                    $('.PageAnalyzeWrapper').show();
                    $('.dynamicForm').hide();
                    $('.normal-form-left-aligned').show();
                    $('.sfDivFlying').hide();
                });
                $('#metatagdivFlying').on('click', function () {
                    $('.sfDivFlying').show();
                });
                $('#closeDivFlying').on('click', function () {
                    $('.sfDivFlying').hide();
                });
                $('#displaySuggestion').on('click', function () {
                    var searchText = $('#txtSeoWord').val();
                    $('.PageAnalyzeWrapper').hide();
                    $('.normal-form-left-aligned').hide();
                    $('.dynamicForm').show();
                    $('#txtSeoText').val(searchText);
                    $('#suggest').trigger('click');
                    $('#txtSeoWord').val('');
                    FormFieldComplete();
                });
                $('#suggest').on('click', function () {
                    var txtSeoText = $('#txtSeoText').val().trim();
                    SEOMeta.BindSuggestion(txtSeoText);
                });
                $("#slcPages").on("change", function () {
                    var pageID = parseInt($(this).val());
                    pageName = $.trim($("#slcPages option:selected").text());
                    if (pageID > 0) {
                        SEOMeta.GetSEOMetaValuesByPageId(pageID);
                    }
                    else {
                        SEOMeta.ClearAll();
                    }
                });
                $('#spnCreateSuggestions').on('click', function () {
                    $('#iframeholder').html('');
                    var page = $("#slcPages option:selected");
                    var pageID = parseInt(page.val());
                    pageName = $.trim(page.text());
                    if (pageID > 0) {
                        var host = window.location.origin;
                        var pageSrc = SageFrameHostURL + "/" + pageName;
                        SEOMeta.LoadSiteInIframe(pageSrc);
                    }
                });
                $("#btnSaveSEOMetaTag").on("click", function () {
                    // if ($validator.form()) {
                    SEOMeta.SaveSEOMetaTag();
                    // }
                });

                $('.metaValue input').on('click', function () {
                    $('.txtTextBox[data-tag="text"]').val($(this).val());
                });

                $('.txtTextBox[data-tag="h1"]').on('change focus keyup', function () {
                    SEOMeta.CalulateTitleCount();
                });
                $('.txtTextBox[data-tag="p"]').on('change focus keyup', function () {
                    SEOMeta.CalulateDescCount();
                });
                SEOMeta.CheckTitleCount();
                SEOMeta.CheckDescCount();

                //$(".textareaValidate").each(function () {
                //    $(this).rules('add', {
                //        required: true,
                //        maxlength: 150
                //    });
                //});



            },
            SelectPageFromURL: function () {
                var param = window.location.pathname.split('/').pop().toLowerCase();
                if (param != 'meta-tag-management') {
                    $("#slcPages option").each(function (index, item) {
                        if ($(this).text().toLowerCase() == param) {
                            $("#slcPages").val($(this).val());
                            return false;
                        }
                    });
                    $("#slcPages").trigger('change');
                }
            },

            ShowSEOFromDatabase: function () {
                $('.ulprevStoredData').hide();
                $('.ulStoredData').show();
            },
            HideSEOFromDatabase: function () {
                $('.ulStoredData').hide();
                $('.ulprevStoredData').show();
            },
            GetSEOMetaValuesByPageId: function (pageID) {
                this.config.method = "GetSEOMetaValuesByPageId";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    pageID: pageID,
                    authInfo: authInfo
                });
                this.config.async = false;
                this.config.ajaxCallMode = SEOMeta.BindSEOMetaValue;
                this.ajaxCall(this.config);
            },
            BindSEOMetaValue: function (data) {
                // $validator.resetForm();                
                if (data != null && data.d.length > 0) {
                    $(".txtTextBox").each(function (i, v) {
                        var $this = $(this);
                        var tagID = parseInt($this.data('id'));
                        var result = $.grep(data.d, function (e) { return e.SEOMetaTagTypeID == tagID; });


                        if ($this.attr('data-tag') == 'img') {
                            if (result && result.length > 0) {
                                if (result[0].MetaTagContent != null && result[0].MetaTagContent.length > 0) {
                                    $this.attr('src', result[0].MetaTagContent);
                                }
                                else {
                                    $this.attr('src', SageFrameHostURL + "");
                                }
                                var image = '<img height="100px" widht="100px" src ="' + result[0].MetaTagContent + '" />';
                                $('.ulStoredData').find('li[data-tagid="' + tagID + '"]').find('span.tagData').html(image);
                            }
                        }
                        else {
                            if (result.length > 0) {
                                $('.ulStoredData').find('li[data-tagid="' + tagID + '"]').find('span.tagData').text(result[0].MetaTagContent);
                                $(this).val(result[0].MetaTagContent);
                                SEOMeta.ShowSEOFromDatabase();
                            }
                            else {
                                $(this).val("");
                            }
                        }
                    });
                    $('#pageNameddl').text($("#slcPages option:selected").text() + " ");
                    SEOMeta.CalulateTitleCount();
                    SEOMeta.CalulateDescCount();
                }
                else {
                    SEOMeta.HideSEOFromDatabase();
                    $(".txtTextBox").each(function () {
                        $(this).val("");
                    });
                }
                $('#spnCreateSuggestions').trigger('click');
                //$('.PageAnalyzeWrapper').hide();

                var storeType = $('.txtTextBox[data-tag="text"]').val();
                if (storeType.trim().length > 0) {
                    $('.metaValue input').each(function (index, value) {
                        var $this = $(this);
                        if (storeType.toLowerCase() == $this.val().toLowerCase()) {
                            $this.trigger('click');
                            return false;
                        }
                    });
                }
            },
            ShowAnalyzing: function () {
                $('#anlalyzePage').show();
            },
            HideAnalyzing: function () {
                $('#anlalyzePage').hide();
            },
            CheckTitleCount: function () {
                var titleText = $('.txtTextBox[data-tag="h1"]');
                var par = titleText.parent();
                var val = titleText.val().length;
                var text = '<div><span class="countTitle">Title word count: </span><span class="textCount">' + val + '</span>';
                text += '<p>Keeping your titles under 55 characters, you can expect at least 95% of your titles to display properly.</p></div>';
                par.append(text);
            },
            CalulateTitleCount: function () {
                var titleText = $('.txtTextBox[data-tag="h1"]');
                var par = titleText.parent();
                var val = titleText.val().length;
                par.find('.textCount').text(val);
            },
            CheckDescCount: function () {
                var descText = $('.txtTextBox[data-tag="p"]');
                var par = descText.parent();
                var val = descText.val().length;
                var text = '<div><span class="countTitle">Title word count: </span><span class="textCount">' + val + '</span>';
                text += '<p>The description should optimally be between 150-160 characters.</p></div>';
                par.append(text);
            },
            CalulateDescCount: function () {
                var descText = $('.txtTextBox[data-tag="p"]');
                var par = descText.parent();
                var val = descText.val().length;
                par.find('.textCount').text(val);
            },
            AnalyzingMessage: function (newEvent) {
                var $ongoing = $('#anlalyzePage #ongoingResult #ongoingEvent');
                var $finished = $('#anlalyzePage #finishedResult');
                var finishedEvent = $ongoing.text();
                if (finishedEvent.length > 0) {
                    $finished.append(finishedEvent);
                }
                $ongoing.text(newEvent);
            },
            SaveSEOMetaTag: function () {
                var objTagValue = [];
                var pageID = parseInt($("#slcPages option:selected").val());
                selectPageID = pageID;
                $(".txtTextBox").each(function () {
                    var $this = $(this);
                    var tagID = parseInt($this.data('id'));
                    var tagName = $this.data('tag');
                    var tagValue = '';
                    if (tagName == 'img') {
                        tagValue = $.trim($(this).attr('src'));
                    }
                    else {
                        tagValue = $.trim($(this).val());
                    }
                    var objTag = {
                        SEOMetaTagTypeID: tagID,
                        MetaTagContent: tagValue
                    };
                    if (tagValue != "") {
                        objTag.SEOMetaTagTypeID = tagID;
                        objTag.MetaTagContent = tagValue;
                    }
                    objTagValue.push(objTag);
                });
                this.config.method = "SaveSEOMetaTag";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    pageID: pageID,
                    objTagValue: objTagValue,
                    authInfo: authInfo
                });
                this.config.ajaxCallMode = SEOMeta.SaveSEOMetaTagSuccess;
                this.ajaxCall(this.config);
            },
            SaveSEOMetaTagSuccess: function (data) {
                if (data.d == 1) {
                    SageFrame.messaging.show("Saved Successfully", "Success");
                    $('.normal-form-left-aligned').show();
                    SEOMeta.ClearAll();
                } else if (data.d == 2) {
                    SageFrame.messaging.show("Updated Successfully", "Success");
                    SEOMeta.ClearAll();
                }
                else if (data.d == -100) {
                    SageFrame.messaging.show("You are not uthorized to save.", "Alert");
                }
                else {
                    SageFrame.messaging.show("Error Occured.", "Alert");
                }
                if (selectPageID > 0) {
                    $('#slcPages').val(selectPageID);
                    $('#slcPages').trigger('change');
                }
            },
            HttpGet: function (theUrl) {
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                }
                else {// code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        SEOMeta.AnalyzingMessage(analyzingReport.SiteParsingSuccess);
                        SEOMeta.CreateDiv(xmlhttp.responseText);
                    }
                }
                xmlhttp.open("GET", theUrl, false);
                xmlhttp.send();
            },
            CreateDiv: function (responsetext) {
                // the hidden holder where the respose site html is to be stored
                var $iframeHolder = $('.iframeHolder');
                SEOMeta.AnalyzingMessage(analyzingReport.RemoveScript);
                //removing the script tag , style tag , link tag and meta tag from the hidden html
                responsetext = responsetext.toLowerCase().replace(/<%--(.|\n|\t|\r)*?<script[^>]*>(.|\n|\t|\r)*?<\/script[^>]*>(.|\n|\t|\r)*?--%>/g, '');
                responsetext = responsetext.toLowerCase().replace(/<!--(.|\n|\t|\r)*?<script[^>]*>(.|\n|\t|\r)*?<\/script[^>]*>(.|\n|\t|\r)*?-->/g, '');
                responsetext = responsetext.toLowerCase().replace(/<script[^>]*>(.|\n|\t|\r)*?<\/script[^>]*>/g, '');
                responsetext = responsetext.replace(/<style[^>]*>(.|\n)*?<\/style[^>]*>/g, '');
                responsetext = responsetext.replace(/<link(.|\n)*?\/>/g, '');
                responsetext = responsetext.replace(/<meta(.|\n)*?\/>/g, '');
                responsetext = responsetext.replace(/<meta(.|\n)*?\/>/g, '');
                //then the markup is appended to the hidden field
                $iframeHolder.html(responsetext);

                SEOMeta.SetTitle($iframeHolder);
                // SEOMeta.CountH1($iframeHolder);
                SEOMeta.CountAnchor($iframeHolder);
                SEOMeta.CountHeading($iframeHolder);
                SEOMeta.CountImage($iframeHolder);

                httpresponsetext = responsetext;
                $iframeHolder.find('#divadmincontrolpanel').remove();
                $iframeHolder.find('noscript').remove();
                $iframeHolder.find('input').remove();
                $iframeHolder.find('title').remove();

                //Extracting title , heading tags anchor tags , imaes  from the hidden holder

                //analyzing the repetative words

                $('.PageAnalyzeWrapper').show();
                $('.dynamicForm').hide();
                $('.Steps').hide();
            },

            GetTextList: function (txtSeoText) {
                var $iframeHolder = $('.iframeHolder');
                //getting lines of text from the DOM
                var textList = $iframeHolder.text().replace(/\n\s*\n/g, '\n').split('\n');
                //making array  to the obtained lines of code.
                var textTosearch = txtSeoText.split(' ');
                var newTextList = [];
                // collecting all the matched value and highlighting all the match one
                $.each(textList, function (index, value) {
                    var val = value.trim();
                    if (value.length > 0) {
                        var exists = false;
                        var refined = value;
                        $.each(textTosearch, function (i, v) {
                            if (refined.toLowerCase().indexOf(v.toLowerCase()) > -1) {
                                refined = refined.replace(v, '<span class="hightlight">' + v + '</span>');
                                exists = true;
                            }
                        });
                        if (exists) {
                            newTextList.push(refined);
                        }
                    }
                });

                var newListLength = newTextList.length;
                //sorting for the maximum number of  search key matched
                for (i = 0; i < newListLength; i++) {
                    for (j = 0; j < newListLength - 1; j++) {
                        var val1 = newTextList[j];
                        var val2 = newTextList[j + 1];
                        var val1Count = (val1.match(new RegExp('class="hightlight"', "g")) || []).length;
                        var val2Count = (val2.match(new RegExp('class="hightlight"', "g")) || []).length;
                        if (val1Count < val2Count) {
                            newTextList[j] = val2;
                            newTextList[j + 1] = val1;
                        }
                    }
                }

                var html = '';
                if (newListLength > 0) {
                    if (newListLength > 10) {
                        newListLength = 10;
                    }
                    for (i = 0; i < newListLength; i++) {
                        html += '<tr>';
                        html += '<td class="gettitle">';
                        html += newTextList[i];
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                else {
                    html += '<tr><td>No such match found for <span class="hightlight">' + txtSeoText + '</span></td></tr>';
                }
                return html;
            },

            BindSuggestion: function (txtSeoText) {
                var result = '';
                if (txtSeoText.length == 0) {
                    result = SEOMeta.AnalyzeRepetedSentence(httpresponsetext);
                }
                else {
                    result = SEOMeta.GetTextList(txtSeoText);
                }
                $(".txtTextBox").each(function () {
                    var html = '';
                    var noaltimage = '';
                    var brokenImages = '';
                    var images = '';
                    var tag = $.trim($(this).data('tag'));
                    if (tag != 'text') {
                        var $iframeHolder = $('.iframeHolder');
                        var $tagList = $iframeHolder.find(tag);
                        var length = $tagList.length;
                        if (length > 0) {
                            html += '<div class="divTagValue">';
                            html += '<table>';
                            html += suggestionHeader;

                            if (tag == 'img') {
                                for (i = 0; i < length; i++) {
                                    var $img = $tagList.eq(i);
                                    var src = $img.attr("src");
                                    if (src.length != 0) {
                                        var altTag = $img.attr('alt');
                                        src = src.replace(/\.\.\//g, '').replace(/\.\//g, '');
                                        var first = src[0];
                                        if (first != "/" && src.indexOf("http") === -1) {
                                            src = '/' + src;
                                        }
                                        if (typeof (altTag) == "undefined" || altTag.trim().length == 0) {
                                            noaltimage += '<div class=" selectImage item"><img height="100px" width="100px" src="' + src + '" /></div>';
                                        }
                                        else {
                                            //images += '<li><input type="checkbox" class="unselected"><img height="100px" width="100px" alt="' + altTag + '" src="' + src + '" /></li>';
                                            images += '<li><img class="selectImage item" height="100px" width="100px" alt="' + altTag + '" src="' + src + '" /></li>';
                                        }
                                    }
                                    else {
                                        brokenImages += '<li>&lt;img id="' + $img.attr("id") + '" class="' + $img.attr("class") + '" src="' + src + '" /&gt;</li>';
                                    }
                                }
                            }
                            else {
                                html += result;
                            }
                            html += '</table></div>';
                        }
                        //if (brokenImages > 0) {
                        //    html += '<div class="brokenimages">There are ' + brokenImages + ' image tag/s without source</div>';
                        //}
                    }
                    images = noaltimage;
                    if (images.length > 0) {
                        html += '<div class="noaltimagewrapper">';
                        html += '<h3>Good Images to use</h3>';
                        // html += '<div class="goodImages owl-carousel owl-theme">' + images + '</div>';
                        html += '<div class="noaltimages owl-carousel owl-theme">' + noaltimage + '</div>';
                        html += '</div>';
                    }
                    if (images.length == 0 && tag == 'img') {
                        html += '<div class="noaltimagewrapper goodimage">';
                        html += '<h3>There are no good image to use.Please add some image. Check if there is any broken link images or images with alt tag</h3>';
                        html += '</div>';
                    }

                    //if (noaltimage.length > 0) {
                    //    html += '<div class="noaltimagewrapper">';
                    //    html += '<h3>Images that have no alt tags</h3>';
                    //    html += '<div class=" noaltimages owl-carousel owl-theme">' + noaltimage + '</div>';
                    //    html += '</div>';
                    //}
                    //if (brokenImages.length > 0) {
                    //    html += '<div class="noaltimagewrapper fullimagetag">';
                    //    html += '<h3>Images that have broken source</h3>';
                    //    html += '<div class="brokenlinkimages">' + brokenImages + '</div>';
                    //    html += '</div>';
                    //}
                    $(this).parent().parent().find('.htmlParseValue').html(html);
                });
                $(".noaltimages").owlCarousel(
                    {
                        items: 4,
                        navigation: true,
                        pagination: false,
                        scrollPerPage: false,
                        navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>']
                    });
                //$(".goodImages").owlCarousel(
                //   {
                //       items: 4,
                //       navigation: true,
                //       pagination: false,
                //       scrollPerPage: false,
                //       navigationText: ["<<", ">>"]

                //   });
                // $('.goodImages').Slider({ slider: $('.goodImages') });
                // $('.noaltimages').Slider({ slider: $('.noaltimages') });
                //$('.brokenlinkimages').Slider({ slider: $('.brokenlinkimages') });

                $('.gettitle').off().on('click', function () {
                    var $this = $(this);
                    var seoContent = $this.text().trim();
                    var $txtBox = $this.parents('.metaColection').find('.txtTextBox');
                    $txtBox.val($txtBox.val() + " " + seoContent);
                    $txtBox.focus();
                });
                ////var h1bind = $('.txtTextBox[data-tag="h1"]').parent().parent().find('.htmlParseValue').find('.divTagValue table');

                ////if (h1bind.length == 0) {
                ////    var newDOM = '<div class="divTagValue">';
                ////    newDOM += '<table>';
                ////    newDOM += suggestionHeader;
                ////    newDOM += repetativeWords;
                ////    newDOM += '</table>';
                ////    newDOM += '</div>';
                ////    $('.txtTextBox[data-tag="h1"]').parent().parent().find('.htmlParseValue').append(newDOM);
                ////}
                ////else {
                ////    h1bind.append(repetativeWords);
                ////}
                ////var pbind = $('.txtTextBox[data-tag="p"]').parent().parent().find('.htmlParseValue').find('.divTagValue table');
                ////if (pbind.length == 0) {
                ////    var newDOM = '<div class="divTagValue">';
                ////    newDOM += '<table>';
                ////    newDOM += suggestionHeader;
                ////    newDOM += repetativeWords;
                ////    newDOM += '</table>';
                ////    newDOM += '</div>';
                ////    $('.txtTextBox[data-tag="p"]').parent().parent().find('.htmlParseValue').append(newDOM);
                ////}
                ////else {
                ////    pbind.append(repetativeWords);
                ////}
                //$('.txtTextBox[data-tag="img"]').parent().parent().find('.htmlParseValue').find('.divTagValue').find('table').remove();
                //SEOMeta.BindSort();
                //// $('.txtTextBox[data-tag="p"]').parent().parent().find('.htmlParseValue').find('ul').append(repetativeWords);
                $(".selectImage").on('click', function () {
                    var $this = $(this).find('img');
                    value = $this.attr('src');
                    $this.parents('.metaColection').find('.txtTextBox').attr('src', value);
                });
                //SEOMeta.ShowSuggestions();
            },
            BindSort: function () {
                $('.srtWordCount i, .strLength i, .strRepetition i').off().on('click', function () {
                    var $this = $(this);
                    var $table = $this.parents('table');
                    var tdindex = $table.find("th").index($this.parent());
                    if ($this.hasClass('fa-long-arrow-down')) {
                        $table.find('tbody tr').each(function (index, value) {
                            $table.find('tbody tr').each(function (i, v) {
                                var $mine = $(this);
                                var count = parseInt($mine.find('td').eq(tdindex).text());
                                var newCount = parseInt($mine.next().find('td').eq(tdindex).text());
                                if (count > newCount) {
                                    $mine.next().insertBefore($mine);
                                }
                            });
                        });
                        $this.removeClass('fa-long-arrow-down').addClass('fa-long-arrow-up');
                    }
                    else {
                        var $table = $this.parents('table');
                        $table.find('tbody tr').each(function (index, value) {
                            $table.find('tbody tr').each(function (i, v) {
                                var $mine = $(this);
                                var count = parseInt($mine.find('td').eq(tdindex).text());
                                var newCount = parseInt($mine.next().find('td').eq(tdindex).text());
                                if (count < newCount) {
                                    $mine.next().insertBefore($mine);
                                }
                            });
                        });
                        $this.removeClass('fa-long-arrow-up').addClass('fa-long-arrow-down');
                    }
                });
            },
            LoadSiteInIframe: function (url) {
                var iframeHolder = document.getElementById('iframeholder');
                var iframe = document.createElement('iframe');
                var startTime = Date.now();
                var endtime = 0;
                iframe.onload = function () {
                    endtime = Date.now();
                    var totalloadtime = endtime - startTime;
                    SEOMeta.AppendResult('#loadTimeDetail', totalloadtime + " ms");
                    SEOMeta.LoadStaticImage();
                    SEOMeta.CalculateRequest();
                    $('#overviewLink').attr('href', url).text(url);
                    SEOMeta.HttpGet(url);
                }; // before setting 'src'
                iframe.src = url;
                iframeHolder.appendChild(iframe);
            },
            AppendResult: function ($id, result) {
                $($id).find('.result').text(result);
            },
            AnalyzeRepetedWords: function (string, $appendTo) {
                SEOMeta.AnalyzingMessage(analyzingReport.CountWordsStarted);
                var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                cleanString = cleanString.replace(/(<([^>]+)>)/ig, "");//remove HTML tags
                var words = cleanString.split(' '), frequencies = {}, word, frequency, i;
                var length = words.length;
                for (i = 0; i < length; i++) {
                    word = words[i].trim();
                    if (word.length > 0 && SEOMeta.IgnoreWords(word)) {
                        frequencies[word] = frequencies[word] || 0;
                        frequencies[word]++;
                    }
                }
                words = Object.keys(frequencies);
                var retunWords = words.sort(function (a, b) {
                    return frequencies[b] - frequencies[a];
                }).slice(0, 30).toString();
                $appendTo.html(retunWords);
                SEOMeta.AnalyzingMessage(analyzingReport.CountWordsStarted);
            },
            AnalyzeRepetedSentence: function (string, $appendTo) {
                //analyzing started
                SEOMeta.AnalyzingMessage(analyzingReport.CountWordsStarted);
                //cleaning  special characters
                var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?+]/g, "");
                //cleaning HTML tag
                cleanString = cleanString.replace(/(<([^>]+)>)/ig, " "); //remove HTML tags
                var longestWord = 0;
                var repeatWordArray = [];
                var repeatedWords = [];
                var delimeter = ' ';
                var sentences = cleanString.split(delimeter);
                var length = sentences.length;

                function Repeat(string, count) {
                    var frequencies = {}, word, frequency, i;
                    repeatedWords = [];
                    longestWord++;
                    for (i = 0; i < length - 1; i++) {
                        var word = sentences[i].trim();
                        if (word.length > 0) {
                            //creating the  consecutive word  to test for repetition
                            var repSearch = makesentence(sentences, longestWord, delimeter, i);
                            var previousSearch = '';
                            var previoussearchedData = {};

                            if (repSearch.length > 0) {
                                //searching the number of repetition of the newly form  word;
                                var count = (cleanString.match(new RegExp(repSearch, "g")) || []).length;
                                if (count > 1) {
                                    var searchedData = { "data": repSearch, "count": count, "longWord": longestWord };

                                    if (longestWord > 1) {
                                        previousSearch = makesentence(sentences, (longestWord - 1), delimeter, i);
                                        previoussearchedData = { "data": previousSearch, "count": count, "longWord": longestWord };
                                        deletePreviousSearch(longestWord, previoussearchedData);
                                    }

                                    //checking for the word if already exists in the array.
                                    if (NotFound(repeatedWords, searchedData)) {
                                        repeatedWords.push(searchedData);
                                    }
                                }
                            }
                        }
                    }
                    if (repeatedWords.length > 0) {
                        repeatWordArray.push(repeatedWords);
                        Repeat(string, longestWord);
                    }
                }
                Repeat(string, 0);
                function NotFound(array, object) {
                    var length = array.length;
                    var found = true;
                    for (m = 0; m < length; m++) {
                        if (array[m].data == object.data) {
                            found = false;
                            break;
                        }
                    }
                    return found;
                }
                function makesentence(sentenceArray, longestSent, delimeter, position) {
                    var longWord = '';
                    for (i = position; i < (longestSent + position) ; i++) {
                        longWord += sentenceArray[i] + delimeter;
                    }
                    longWord = longWord.trim();
                    if (longestSent != longWord.split(delimeter).length) {
                        longWord = '';
                    }
                    return longWord;
                }
                function deletePreviousSearch(popCount, individual) {
                    if (popCount > 1) {
                        var array = repeatWordArray[popCount - 2];
                        var index = -1;
                        $(array).each(function (i, v) {
                            if (individual.data == v.data) {
                                index = i;
                                // break;
                            }
                        });
                        //var index = array.indexOf(individual);
                        if (index > -1) {
                            //array.splice(index, 1);
                            repeatWordArray[popCount - 2].splice(index, 1);
                        }
                    }
                    return true;
                }
                function notAlreadyInHTML(newDOM) {
                    var pos = endingArray.indexOf(newDOM);
                    if (pos > -1) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }

                var endingArray = [];
                var repeatWordArrayLength = repeatWordArray.length;
                var repeatWordHTML = '';

                //append all the repeated word
                //for (k = 0; k < repeatWordArrayLength; k++) {
                //    var repeatWords = repeatWordArray[repeatWordArrayLength - k - 1];
                //    var repeatWordsLength = repeatWords.length;
                //    //repeatWordHTML += '<li>';
                //    //repeatWordHTML += '<ul>';
                //    for (l = 0; l < repeatWordsLength; l++) {
                //        var repWord = repeatWords[l];
                //        if (typeof (repWord) !== 'undefined' && notAlreadyInHTML(repWord)) {
                //            endingArray.push(repWord);
                //            var repetition = repWord.count;
                //            var data = repWord.data;
                //            var datalength = repWord.longWord;
                //            if (repetition == 1) {
                //                var test = '';
                //                if (SEOMeta.IgnoreWords(data)) {
                //                    repeatWordHTML += '<tr><td><span class="gettitle"  data-length="' + datalength + '" data-repetition="' + repetition + '">' + data + '</span></td>';
                //                    repeatWordHTML += '<td>' + datalength + '</td>';
                //                    repeatWordHTML += '<td>' + repetition + '</td></tr>';
                //                }
                //            }
                //            else {
                //                repeatWordHTML += '<tr><td><span class="gettitle" data-length="' + datalength + '" data-repetition="' + repetition + '">' + data + '</span></td>';
                //                repeatWordHTML += '<td>' + datalength + '</td>';
                //                repeatWordHTML += '<td>' + repetition + '</td>';
                //                repeatWordHTML += '<td>' + data.length + '</td></tr>';
                //            }
                //        }
                //    }
                //}

                //append some part of the repition 

                var totalChoose = 0;
                for (k = 0; k < repeatWordArrayLength; k++) {
                    if (totalChoose <= 5) {
                        var repeatWords = repeatWordArray[repeatWordArrayLength - k - 1];
                        var repeatWordsLength = repeatWords.length;
                        for (l = 0; l < repeatWordsLength; l++) {
                            if (totalChoose <= 5) {
                                var repWord = repeatWords[l];
                                if (typeof (repWord) !== 'undefined' && notAlreadyInHTML(repWord)) {
                                    endingArray.push(repWord);
                                    var repetition = repWord.count;
                                    var data = repWord.data;
                                    var datalength = repWord.longWord;
                                    if (repetition > 1) {
                                        repeatWordHTML += '<tr><td><span class="gettitle" data-length="' + datalength + '" data-repetition="' + repetition + '">' + data + '</span></td>';
                                        // repeatWordHTML += '<td>' + datalength + '</td>';
                                        // repeatWordHTML += '<td>' + repetition + '</td>';
                                        //repeatWordHTML += '<td>' + data.length + '</td></tr>';
                                        repeatWordHTML += '</tr>';
                                        totalChoose++;
                                    }
                                }
                            }
                        }
                    }
                }
                SEOMeta.AnalyzingMessage(analyzingReport.CountWordsStarted);
                return repeatWordHTML;
            },
            IgnoreWords: function (word) {

                var IgnoreWords = [
                    "for", "from", "in", "into", "of", "on",
                    "than", "to", "via", "with", "within", "and", "or", "but",
                    "so", "as", "as if", "as long as", "because", "if", "that", "though", "till",
                    "unless", "until", "what", "when", "whenever", "wherever", "whether",
                    "while", "also", "anyway", "besides", "in fact", "instead",
                    "now", "of course", "similarly", "still", "then", "therefore", "thus", "a", "an", "the"
                    , "by"];
                if (IgnoreWords.indexOf(word.toLowerCase()) > -1) {
                    return false;
                }
                else {
                    return true;
                }
            },
            RegexSpecialCharacter: function () {
                var regexChar = ['\\', '^', '$', '*', '+', '?', '.', ''];
            },
            SetTitle: function ($iframeHolder) {
                var title = $iframeHolder.find('title').eq(0).text();
                //var title = responsetext.toLowerCase().match(/<title[^>]*>(.|\n|\t|\r)*?<\/title[^>]*>/, '');
                var titleLength = title.length;
                $('#titleCount').text(titleLength);
                $('#titleText').text("\" " + title + " \" ");
                if (titleLength > 60 && titleLength < 70) {
                    SEOMeta.AppendRightResult($('#titleIssue'));
                }
                else {
                    SEOMeta.AppendWrongResult($('#titleIssue'));
                }
            },
            CountH1: function ($iframeHolder) {
                var h1Tag = $iframeHolder.find('h1');
                var h1TagCount = h1Tag.length;
                var h1HTML = '';
                if (h1TagCount > 0) {
                    h1HTML = '<div class="headingSuggestion"><h3>There are ' + h1TagCount + ' H1 tag in this page.</h3>';
                    h1HTML += 'For best practice try not to use more than 30 heading tags in the webpage and no heading tags longer than 120 characters</div>';
                    h1HTML += '<div classs="headingSuggestionWrapper headingcollection">';
                    h1HTML += '<table class="headwrapper">';
                    h1HTML += '<tr><th>Headings</th><th>Length</th></tr>';
                    $(h1Tag).each(function (index, value) {
                        var $this = $(this);
                        var $text = $this.text();
                        var $textLength = $text.length;
                        h1HTML += '<tr><td><span class="text">' + $this.text() + '</span></td>';
                        var errorClass = 'goodlength';
                        if ($textLength > 60) {
                            errorClass = 'exceedlength';
                        }
                        else if ($textLength < 1) {
                            errorClass = "insufficientlength";
                        }
                        h1HTML += '<td><span class="headinglength  ' + errorClass + '">' + $this.text().length + '</span></td></tr>';
                    });
                    h1HTML += '</table>';
                    h1HTML += '</div>';
                }
                else {
                    h1HTML += '<div class="headwrapper">';
                    h1HTML = 'There is no heading found in this page';
                    h1HTML += '</div>';
                }
                $('#divHeaderWrapper').html(h1HTML);
            },
            CountAnchor($iframeHolder) {
                var anchorTag = $iframeHolder.find('a').not('.sfmanagecontrol');
                var anchorlength = anchorTag.length;
                var brokenachors = [];
                $(anchorTag).each(function (index, value) {
                    var anchorTag = $(this);
                    var href = anchorTag.attr('href');
                    if (typeof (href) == "undefined" || href.length == 0 || href == "#") {
                        var classes = anchorTag.attr('class');
                        var id = anchorTag.attr('id');
                        var text = anchorTag.text();
                        if (typeof (classes) == "undefined")
                            classes = '';
                        if (typeof (id) == "undefined")
                            id = '';
                        if (typeof (href) == "undefined")
                            href = '';
                        brokenachors.push('<li>&lt;a class="' + classes + '" id="' + id + '" href="' + href + '" &gt;' + text + '&lt;/a&gt;</li>');
                    }
                });
                var val = '<p>We analyzed <span class="hightlightSEO">' + anchorlength + ' links</span> on this web page';
                var brkAnc = '';
                var brokenachorsCount = brokenachors.length;
                if (brokenachorsCount > 0) {
                    var isAre = brokenachorsCount == 1 ? "is" : "are";
                    var brokenLinks = val + ', and <span class="sfError">' + brokenachorsCount + '</span> of them ' + isAre + ' <span class="sfError">broken</span></p>';
                    if (brokenachorsCount > 2) {
                        brkAnc = brokenLinks + '<ul class="brokenAnchors">' + brokenachors[0] + brokenachors[1] + '</ul>';
                        brkAnc += '<span class="sfBtn icon-generate smlbtn-primary showmorebroken">Show more</span>';
                        var close = '<span class="icon-close closeBrokens"></span>';
                        $('#brokenLinkIssue').find('.moreValue').html(close + '<div class="popupbroken">' + brokenLinks + '<ul class="brokenAnchors">' + brokenachors.join('') + '</ul></div>');
                    }
                    else {
                        brkAnc = brokenLinks + '<ul class="brokenAnchors">' + brokenachors.join('') + '</ul>';
                    }
                    SEOMeta.AppendWrongResult($('#brokenLinkIssue'));
                }
                else {
                    brkAnc = val + ', and <span class="hightlightSEO">none</span> of them are <span class="hightlightSEO">broken</span></p>';
                    SEOMeta.AppendRightResult($('#brokenLinkIssue'));
                }
                $('#brokenLinkIssue').find('.Value').html(brkAnc);
                SEOMeta.BrokentagsEvents();
                SEOMeta.AppendResult('#anchorCountDetail', anchorlength);
            },
            BrokentagsEvents() {
                $('.closeBrokens').off().on('click', function () {
                    var $ele = $(this).parent().hide();
                    //$ele.animate({ left: $(window).width() }, 2000, function () {
                    //    //$ele.hide();
                    //});
                });
                $('.showmorebroken').off().on('click', function () {
                    var parent = $(this).parent();
                    var $ele = parent.next().next();
                    $ele.css({
                        height: parent.height,// Math.max($(document).height(), $(window).height()),// $(window).height(),                        
                        width: '100%',
                        position: "absolute",
                        'background-color': "#f2f2f2",
                        //top: $('#divAdminControlPanel').height(),
                        left: $(window).width(),
                        display: 'block'
                    }).animate({ left: "0px" }, 2000);
                });
            },
            CountHeading: function ($iframeHolder) {
                var htags = [];
                var totalHeadings = 0;
                for (var j = 1; j <= 6; j++) {
                    var hTag = 'h' + j;
                    var htagLength = $iframeHolder.find(hTag).length;
                    totalHeadings += htagLength;
                    htags.push(htagLength + " " + hTag);
                }
                $('#HeadingIssues').find('.Value').text("There are " + htags.join(', ') + " tags in this web page.");
                SEOMeta.AppendResult('#headingDetail', totalHeadings);
                SEOMeta.AppendRightResult($('#HeadingIssues'));
            },
            CountImage: function ($iframeHolder) {
                var images = $iframeHolder.find('img');
                var imageCount = images.length;
                var brokenImg = [];
                var brokenSrc = '';
                var brokenAltCount = '0';
                var brokenSrcCount = '0';
                images.each(function (index, value) {
                    var $this = $(this);
                    var imgSrc = $this.attr('src');
                    var imgAlt = $this.attr('alt');
                    var classes = $this.attr('class');
                    classes = (typeof (classes) == "undefined") ? "" : classes;
                    var id = $this.attr('id');
                    id = (typeof (classes) == "undefined") ? "" : id;
                    imgAlt = (typeof (imgAlt) == "undefined") ? "" : imgAlt;
                    imgSrc = (typeof (imgSrc) == "undefined") ? "" : imgSrc;
                    if (imgSrc.length == 0 || imgAlt.length == 0) {
                        brokenImg.push('<li>&lt;img class="' + classes + '" id="' + id + '" src="' + imgSrc + '" alt="' + imgAlt + '" /a&gt; </li>');
                    }
                });

                var text = '<p>There are <span class="count sfError">' + imageCount + ' </span> images in this page.</p>';
                var brokenImglength = brokenImg.length;
                if (brokenImglength > 0) {
                    text += '<p>, and there are <span class="count sfError">' + brokenImglength + '</span> images with broken image source or alt tag.</p>';
                    if (brokenImglength > 2) {
                        var close = '<span class="icon-close closeBrokens"></span>';
                        $('#ImageIssue').find('.moreValue').html(close + '<div class="popupbroken">' + text + '<ul class="brokenAnchors">' + brokenImg.join('') + '</ul></div>');
                        text += '<ul class="brokenSrc">' + brokenImg[0] + brokenImg[1] + '</ul>';
                        text += '<span class="sfBtn icon-generate smlbtn-succ showmorebroken">Show more</span>';

                    }
                    else {
                        text += '<ul class="brokenSrc">' + brokenImg.join('') + '</ul>';
                    }
                    SEOMeta.AppendWrongResult($('#ImageIssue'));
                }
                else {
                    text += '<p>, and there are <span class="count sfError">' + brokenSrcCount + '</span> images with broken image source.</p>';
                    SEOMeta.AppendRightResult($('#ImageIssue'));
                }
                $('#ImageIssue').find('.Value').html(text);
                SEOMeta.AppendResult('#imageDetails', imageCount);
                SEOMeta.BrokentagsEvents();
            },
            AppendRightResult: function ($id) {
                $($id).find('.Result').html('<i class="icon-circle-check"></i>');
            },
            AppendWrongResult: function ($id) {
                $($id).find('.Result').html('<i class="icon-remove-sign"></i>');
            },
            LoadStaticImage: function () {
                if ($('#bandwidthspeedCount').length > 0) {
                    $('#bandwidthspeedCount').remove();
                }
                var start = (new Date()).getTime();
                var loc = SageFrameHostURL + "/Modules/Admin/SEOManagement/pagesizecalucatingimage/bond.jpg" + '?t=' + escape(start);
                var image = '<img id="bandwidthspeedCount" src="' + loc + '" ' + 'style="display:none;"' + ' onload="computeConnectionSpeed(' + start + ');">';
                $('body').append(image);
            },
            CalculateRequest: function () {
                var newRequest = window.performance.getEntriesByType("resource").length;
                var request = newRequest - totalRequest;
                SEOMeta.AppendResult('#RequestsDetail', request);
                totalRequest = newRequest;
            },
            ClearAll: function () {
                $("#slcPages").val("0");
                $(".txtTextBox").each(function () {
                    $(this).val("");
                });
                $('.txtTextBox')
                $('.txtTextBox[data-tag="img"]').attr('src', SageFrameHostURL + '/Modules/Admin/SEOManagement/images/no-image.jpg');
                $(".htmlParseValue").html("");
                $('.Steps').show();
                $('.PageAnalyzeWrapper').hide();
                $('.dynamicForm').hide();
                // $validator.resetForm();
            },
            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: SEOMeta.config.type,
                    contentType: SEOMeta.config.contentType,
                    async: SEOMeta.config.async,
                    cache: SEOMeta.config.cache,
                    url: SEOMeta.config.url,
                    data: SEOMeta.config.data,
                    dataType: SEOMeta.config.dataType,
                    success: SEOMeta.config.ajaxCallMode,
                    error: SEOMeta.ajaxFailure

                });
            }
        };
        var authInfo = {
            UserModuleID: p.userModuleID,
            PortalID: SageFramePortalID,
            Username: SageFrameUserName,
            SecureToken: SageFrameSecureToken
        };
        //$validator = $("#form1").validate({
        //    rules: {
        //        slcPages: {
        //            selectcheck: true
        //        }
        //    },
        //    messages: {
        //        slcPages: {
        //            selectcheck: "This field is required"
        //        }
        //    },
        //    ignore: ':disabled'
        //});
        jQuery.validator.addMethod('selectcheck', function (value) {
            return (value != '0');
        }, "*");
        SEOMeta.init();
    }
    $.fn.SEOMetaManage = function (p) {
        $.SEOMetaManagementView(p);
    };
})(jQuery);