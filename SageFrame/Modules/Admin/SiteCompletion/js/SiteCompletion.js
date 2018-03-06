(function ($) {
    $.SiteCompletion = function (p) {
        p = $.extend({
            UserModuleID: '',
        }, p)
        var initHtml = '';
        var SiteCompletion = {
            config: {
                isPostBack: false,
                async: true,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: SageFrameAppPath + "/Modules/admin/SiteCompletion/services/SiteCompleteWebService.asmx/",
                method: "",
                url: "",
                method: "",
                PortalID: p.PortalID,
                UserModuleID: p.UserModuleID,
                ajaxSuccess: ''
            },
            init: function () {
                initHtml = $('#siteCompletion').html();
                this.GetSiteComplete();
                
            },
            GetSiteComplete: function () {
                $('#siteCompletion').html(LoadingImage);
                this.config.method = "GetSiteCompleteness";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    CultureCode: SageFrameCurrentCulture,
                    PortalID: SageFramePortalID,
                    UserModuleID: p.UserModuleID,
                    UserName: SageFrameUserName,
                    SecureToken: SageFrameSecureToken
                });
                this.config.ajaxSuccess = this.SiteCompleteSucess;
                this.ajaxCall(this.config);
            },
            SiteCompleteSucess: function (data) {
                $('#siteCompletion').html(initHtml);
                data = data.d;
                var html = '';
                var completeWeightage = 0;
                var totWeightage = 0;
                var prevCategory = "";
                var prevPage = "";
                var catCount = 0;
                var pageCount = 0;
                var pageWiseWeightage = 0;
                var pageWiseTotWitage = 0;
                var calulate = new Array();
                $.each(data, function (index, item) {
                    totWeightage += item.Weightage;
                    if (prevCategory !== item.Category) {
                        if (index != 0) {
                            html += '</ul>';
                            calulate.push({ 'complete': pageWiseWeightage / pageCount, 'weightage': pageWiseTotWitage });
                            pageCount = 0;
                            prevPage = "";
                        }
                        html += '<ul class="category" ><span>' + item.Category + '</span>';
                        pageWiseWeightage = 0;
                        catCount++;
                    }
                    if (prevPage !== item.PageName) {
                        pageCount++;
                        var objChild = GetChild(data, item.Category, item.PageName);

                        pageWiseWeightage += objChild.weightage;
                        pageWiseTotWitage = objChild.totWeightage;
                        //console.log('page name: '+item.PageName)
                        //console.log('complete weitage:' + objChild.weightage)
                        //console.log('total weitage:' + objChild.totWeightage)

                        if (objChild.html.length > 0) {
                            html += '<li class="pagname">';
                            html += '<span>';
                            html += item.PageName;
                            html += '</span>';
                            html += objChild.html;
                            html += '</li>';
                        }
                    }

                    prevPage = item.PageName;
                    prevCategory = item.Category;
                });

                function GetChild(data, category, pageName) {
                    var html = '';
                    var weightage = 0;
                    var totWeightage = 0;
                    $.each(data, function (index, item) {
                        if (category === item.Category && pageName === item.PageName) {
                            if (item.IsComplete) {
                                weightage += item.Weightage;
                            }
                            else {
                             
                                html += '<li>';
                                item.HelpURL = item.HelpURL.length == 0 ? SageFrameHostURL + '/webbuilder/' + item.PageName :SageFrameHostURL+'/'+ item.HelpURL + '/' + item.PageName;
                                html += '<a target="_blank" href="' + item.HelpURL + '">';
                                html += item.Message;
                                html += '</a>';
                                html += '</li>';
                            }
                            totWeightage += item.Weightage;
                        }
                    });

                    if (html.length > 0) {

                        html = "<ul class='factorkey' data-completeness='" + weightage + "'>" + html + "</ul>";
                    }
                    return { html: html, weightage: weightage, totWeightage: totWeightage };
                }


                function CalculatePercentage() {
                    var length = calulate.length, completeness = 0, totalweight = 0;
                    for (var i = 0; i < calulate.length; i++) {
                        completeness += calulate[i].complete;
                        totalweight += calulate[i].weightage;
                    }

                    completeness = (completeness * 100) / totalweight;
                    return completeness;
                }

                html += '</ul>';
                calulate.push({ 'complete': pageWiseWeightage / pageCount, 'weightage': pageWiseTotWitage });
                $('#lstNotUpdatedData').html(html);
                SiteCompletion.RemoveCompleteCategory();
                SiteCompletion.SiteProgress(CalculatePercentage());

            },
            RemoveCompleteCategory: function () {
                $('#lstNotUpdatedData .category').each(function () {
                    var $this = $(this);
                    if ($this.find('li').length == 0)
                        $this.hide();
                })
            },
            SiteProgress: function (percent) { 
                if (percent ==100) {
                    var html = '<span>Congratulation!!!</span><span>Your website is fully updated.</span>'
                    $('#siteCompleteMsg').html(html);
                    var siteComplete = $('.site-completion').parent().parent();
                    $('.site-completion').parent().parent().parent().append(siteComplete);              
                } else {
                    var html = '<span>Your website is not completed.</span><span>Did you forget something?</span>'
                    $('#siteCompleteMsg').html(html);
                }
                var progressColor = "#f26522";
              

                var can = document.getElementById('SiteCompleteCanvas'),
                spnPercent = document.getElementById('SiteComPercent'),
                c = can.getContext('2d');
                if (percent < 50) progressColor = "#f26522";
                else if (percent >= 50 && percent < 90)
                    progressColor = "#dccf5d";
                else if (percent >= 90)
                    progressColor = "#50df67";

                var posX = can.width / 2,
                    posY = can.height / 2,
                    fps = 1000 / 200,
                    procent = 0,
                    onePercent = 360 / 100,
                    result = onePercent * percent;

                c.lineCap = 'round';
                arcMove();

                function arcMove() {
                    var deegres = 0;
                    var acrInterval = setInterval(function () {
                        deegres += 1;
                        c.clearRect(0, 0, can.width, can.height);
                        procent = deegres / onePercent;

                        spnPercent.innerHTML = procent.toFixed()+'%';

                        c.beginPath();
                        c.arc(posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
                        c.strokeStyle = '#e5e5e6';
                        c.lineWidth = '10';
                        c.stroke();

                        c.beginPath();
                        c.arc(posX, posY, 60, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
                        c.strokeStyle = '#e5e5e6';
                        c.lineWidth = '2';
                        c.stroke();

                        c.beginPath();
                        c.strokeStyle = progressColor;
                        c.lineWidth = '10';
                        c.arc(posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres));
                        c.stroke();
                        if (deegres >= result) clearInterval(acrInterval);
                    }, fps);
                }
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: SiteCompletion.config.type,
                    contentType: SiteCompletion.config.contentType,
                    cache: SiteCompletion.config.cache,
                    async: SiteCompletion.config.async,
                    url: SiteCompletion.config.url,
                    data: SiteCompletion.config.data,
                    dataType: SiteCompletion.config.dataType,
                    success: SiteCompletion.config.ajaxSuccess,
                    error: SiteCompletion.ajaxFailure,
                    complete: SiteCompletion.ajaxComplete,
                    global: false,
                });
            },
            ajaxComplete: function () {
                $('.completeLoader').hide();
            },

            ajaxFailure: function (msg) {

            },
        }
        SiteCompletion.init();
    }
    $.fn.SiteCompletion = function (p) {
        $.SiteCompletion(p);
    };
})(jQuery);
