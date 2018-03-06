(function ($) {
    $.SiteHostStat = function (p) {
        p = $.extend({ modulePath: '', UserModuleID: '', }, p)

        var SiteHostStat = {

            config: {
                isPostBack: false,
                async: true,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/SiteHostStat.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                AjaxLoadingHide();
                $.ajax({
                    type: SiteHostStat.config.type,
                    contentType: SiteHostStat.config.contentType,
                    async: SiteHostStat.config.async,
                    cache: SiteHostStat.config.cache,
                    url: SiteHostStat.config.url,
                    data: SiteHostStat.config.data,
                    dataType: SiteHostStat.config.dataType,
                    success: SiteHostStat.config.ajaxCallMode,
                    error: SiteHostStat.ajaxFailure,
                    global: false,
                    complete: function () {
                        //FormFieldComplete();
                    }
                });
            },
            init: function () {
                this.GetResourceConsumption();
            },

            GetResourceConsumption: function () {
                $('.siteCounter').html(LoadingImage);
                SiteHostStat.config.url = SiteHostStat.config.baseURL + "GetSiteConsumptionDetail";
                SiteHostStat.config.data = {};
                SiteHostStat.config.ajaxCallMode = SiteHostStat.ResourceConsumptionCallBack;
                SiteHostStat.config.async = false;
                SiteHostStat.ajaxCall(SiteHostStat.config);
            },

            ResourceConsumptionCallBack: function (data) {

                var bandwidth = 0;
                var bandwidthUOM = 'kbps';

                var storage = 0;
                var storageUOM = 'MB';

                var cpu = 0;
                var cpuUOM = 'RPM';

                if (data.d) {
                    var resourceInfo = data.d;
                    bandwidth = resourceInfo.BandWidth;
                    bandwidthUOM = resourceInfo.BandWidthUOM;

                    storage = resourceInfo.Storage;
                    storageUOM = resourceInfo.StorageUOM;

                    cpu = resourceInfo.CPU;
                    cpuUOM = resourceInfo.CPUUOM;
                }

                var html = '';
                html += SiteHostStat.CreateCounter('bandwidth', bandwidth, 'kbps', 'Bandwidth', 'icon-bandwidth');
                html += SiteHostStat.CreateCounter('storage', storage, 'MB', 'Storage', 'icon-storage');
                html += SiteHostStat.CreateCounter('cpu', cpu, 'RPM', 'CPU Time', 'icon-cputime');

                $('.site-host-stat .siteCounter').html(html);

                SiteHostStat.animateCounter();
            },
            CreateCounter: function (counterType, amount, identifier, title, className) {
                var html = '';

                if (!amount) amount = 0;

                html += '<div class="item">';
                html += '<div class="icon-wrap">';
                html += '<span class="' + className + '"></span>';
                html += '</div>';
                html += '<div class="info">';
                html += '<span>' + title + '</span>';
                html += '<span class="counter-wrap">';
                html += '<span class="counter">' + amount + '</span><span>' + identifier + '</span>';
                html += '</span>';
                html += '</div>';
                html += '</div>';
                return html;

            },
            animateCounter: function () {

                $('.site-host-stat .counter').each(function () {
                    $(this).prop('Counters', 0).animate({
                        Counters: $(this).text().replace('%', '')

                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            }


        }
        SiteHostStat.init();
    }
    $.fn.SiteHostStat = function (p) {
        $.SiteHostStat(p);
    };
})(jQuery);
