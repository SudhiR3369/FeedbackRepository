(function ($) {
    $.AdvanceSiteAnalytics = function (p) {
        p = $.extend
                ({
                    UserModuleID: ''
                }, p);
        var IsBounce = true;
        var AdvanceSiteAnalytic = {
            config: {
                isPostBack: false,
                async: true,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: SageFrameAppPath + "/Modules/admin/AdvanceSiteAnalytics/services/AdvanceAnalyticWebService.asmx/",
                method: "",
                url: "",
                method: "",
                PortalID: p.PortalID,
                UserModuleID: p.UserModuleID,
                ajaxSuccess: ''
            },
            init: function (config) {
                $('#txtDateFrom').datepicker({
                    dateFormat: 'yy/mm/dd'
                });
                $('#txtDateTo').datepicker({
                    dateFormat: 'yy/mm/dd'
                });
                $('#txtBounceDateFrom').datepicker({
                    dateFormat: 'yy/mm/dd'
                });
                $('#txtBounceDateTo').datepicker({
                    dateFormat: 'yy/mm/dd'
                });
                var dt = new Date();
                var today = $.datepicker.formatDate('yy/mm/dd', new Date());
                $('#txtDateFrom').val(dt.getFullYear() + '/01/01')
                $('#txtDateTo').val(today);
                $('#txtBounceDateFrom').val(dt.getFullYear() + '/01/01');
                $('#txtBounceDateTo').val(today);
                this.GetMonthlyStatistics();
                $('#txtDateFrom').on('change', function () {
                    AdvanceSiteAnalytic.GetMonthlyStatistics();
                });
                $('#txtDateTo').on('change', function () {
                    AdvanceSiteAnalytic.GetMonthlyStatistics();
                });
                $('#txtBounceDateFrom').on('change', function () {
                    AdvanceSiteAnalytic.GetMonthlyBounceStatistics();
                });
                $('#txtBounceDateTo').on('change', function () {
                    AdvanceSiteAnalytic.GetMonthlyBounceStatistics();
                });

            },
            GetMonthlyStatistics: function () {
                $('#siteVisitStat').html(LoadingImage);

                this.config.method = "GetMonthlySiteStat";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    YearFrom: $('#txtDateFrom').val(),
                    YearTo: $('#txtDateTo').val(),
                    PortalID: SageFramePortalID,
                    UserModuleID: p.UserModuleID,
                    UserName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                this.config.ajaxSuccess = this.MonthlyWiseVisit;
                this.ajaxCall(this.config);

            },

            MonthlyWiseVisit: function (data) {
                data = data.d;
                var totSiteArr = new Array(); //[['2017-01-30', 45], ['2017-02-30', 45], ['2017-03-30', 15], ['2017-04-30', 78], ['2017-05-30', 45], ['2017-06-30', 15], ['2017-07-30', 78], ['2017-08-30', 77], ['2017-09-30', 66], ['2017-10-30', 44], ['2017-11-30', 20], ['2017-12-30', 123]]
                var totSinglePgArr = new Array(); //[['2017-01-30', 12], ['2017-02-30', 17], ['2017-03-30', 45], ['2017-04-30', 36], ['2017-05-30', 88], ['2017-06-30', 92], ['2017-07-30', 74], ['2017-08-30', 65], ['2017-09-30', 45], ['2017-10-30', 77], ['2017-11-30', 32], ['2017-12-30', 45]]
                var bounceArr = new Array();
                if (data.length > 0) {
                    $.each(data, function (index, item) {
                        var arr = [item.VisitedDate + '-30', item.TotalSiteVisit]
                        var arr2 = [item.VisitedDate + '-30', item.SinglePageOnlyVisit]
                        var arr3 = [item.VisitedDate + '-30', item.BounceRate]
                        bounceArr.push(arr3);
                        totSiteArr.push(arr);
                        totSinglePgArr.push(arr2);
                    });

                    $('#siteVisitStat').html('');
                    var colorSiteVisit = "#08b8db"

                    var colorsinglePg = "#d518f7";
                    $('.color.tot-sites').css('background', colorSiteVisit);
                    //  $('.color.bounce').css('background', colorBounce);
                    $('.color.single-page').css('background', colorsinglePg);
                    var plot1 = $.jqplot('siteVisitStat', [totSiteArr, totSinglePgArr], {
                        title: '',
                        seriesDefaults: {
                            showMarker: true,
                            pointLabels: { show: true },
                            rendererOptions: {
                                smooth: true,
                            }
                        },
                        axes: {

                            xaxis: {
                                type: 'date',
                                renderer: $.jqplot.DateAxisRenderer,
                                tickOptions: {
                                    formatString: '%Y&nbsp%b&nbsp;%#d',
                                },

                                // label: 'Date',
                            },
                            yaxis: {
                                //tickInterval: 5,
                                tickOptions: {
                                    formatString: ''
                                }
                            },


                        },
                        cursor: {
                            show: true,
                            tooltipLocation: 'sw'
                        },
                        highlighter: {
                            show: false
                        },
                        legend: {
                            show: false,
                            location: 's',
                            placement: 'outside',

                        },
                        series: [{

                            lineWidth: 4,
                            markerOptions: { style: 'square' }

                        }],
                        series: [
                                { label: 'Site Hits', color: colorSiteVisit },
                                { label: 'Single Page Visit', color: colorsinglePg },
                                //{ label: 'Bounce Rate', color:colorBounce }
                        ],
                    });
                    if (IsBounce) {
                        AdvanceSiteAnalytic.PlotSiteBounce(bounceArr);
                        IsBounce = false;
                    }
                }
                else {
                    $('#siteVisitStat').html('Data not found');
                    if (IsBounce)
                        $('#siteBounceStat').html('Data not found');
                }
            },
            GetMonthlyBounceStatistics: function () {
                $('#siteBounceStat').html(LoadingImage);
                this.config.method = "GetMonthlySiteStat";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    YearFrom: $('#txtBounceDateFrom').val(),
                    YearTo: $('#txtBounceDateTo').val(),
                    PortalID: SageFramePortalID,
                    UserModuleID: p.UserModuleID,
                    UserName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                this.config.ajaxSuccess = this.BindBounceStat;
                this.ajaxCall(this.config);
            },
            BindBounceStat: function (data) {
                data = data.d;
                var bounceArr = new Array();
                if (data.length > 0) {
                    $.each(data, function (index, item) {
                        var arr3 = [item.VisitedDate + '-30', item.BounceRate]
                        bounceArr.push(arr3);
                    });
                    AdvanceSiteAnalytic.PlotSiteBounce(bounceArr);
                } else {
                    $('#siteBounceStat').html('Data not found');
                }
            },
            PlotSiteBounce: function (bounceArr) {
                $('#siteBounceStat').html('');
                var plot2 = $.jqplot('siteBounceStat', [bounceArr], {
                    title: '',
                    seriesDefaults: {
                        showMarker: true,
                        pointLabels: { show: true },
                        rendererOptions: {
                            smooth: true,
                        }
                    },
                    axes: {

                        xaxis: {
                            type: 'date',
                            renderer: $.jqplot.DateAxisRenderer,
                            tickOptions: {
                                formatString: '0%y-%#m-%#d',
                            },

                            // label: 'Date',
                        },
                        yaxis: {
                            //tickInterval: 5,
                            tickOptions: {
                                formatString: ''
                            },


                        },
                    },
                    cursor: {
                        show: true,
                        tooltipLocation: 'sw'
                    },
                    highlighter: {
                        show: false
                    },

                    legend: {
                        show: false,
                        location: 's',
                        placement: 'outside',

                    },
                    series: [
                    {
                        label: 'Bounce Rate',
                        color: '#db8308'
                    }
                    ],
                });
            },


            ajaxCall: function (config) {
            
                AjaxLoadingHide();
                $.ajax({
                    type: AdvanceSiteAnalytic.config.type,
                    contentType: AdvanceSiteAnalytic.config.contentType,
                    cache: AdvanceSiteAnalytic.config.cache,
                    async: AdvanceSiteAnalytic.config.async,
                    url: AdvanceSiteAnalytic.config.url,
                    data: AdvanceSiteAnalytic.config.data,
                    dataType: AdvanceSiteAnalytic.config.dataType,
                    success: AdvanceSiteAnalytic.config.ajaxSuccess,
                    error: AdvanceSiteAnalytic.ajaxFailure,
                    complete: AdvanceSiteAnalytic.ajaxComplete,
                    global: false,
                });
            },
           

            ajaxFailure: function (msg) {

            },

        };
        AdvanceSiteAnalytic.init();
    };
    $.fn.SiteAnalyticBuilder = function (p) {
        $.AdvanceSiteAnalytics(p);
    };
})(jQuery);
