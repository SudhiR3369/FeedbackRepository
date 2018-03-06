<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TopFiveCountry.ascx.cs"
    Inherits="Modules_SiteAnalytics_TopFiveCountry" %>

<script type="text/javascript">
    $(function () {
        var Flag = '<%=Flag %>';
        if (Flag == 1) {
            var BrowserWiseVisit = [];
            var data = '<%=topCountry %>';
            var dataArray = data.split(',');
            var length = dataArray.length;
            var s = [];
            var VisitTime = [];
            var CountryNames = [];
            for (var i = 0; i < dataArray.length; i = i + 2) {
                CountryNames.push(dataArray[i]);
            }
            for (var J = 1; J < dataArray.length; J = J + 2) {
                VisitTime.push(dataArray[J]);
            }
            $('#BrowserWiseVisit').html('');
            var CountryName = CountryNames;
            var arrTime = VisitTime;
            plot1 = $.jqplot('BrowserWiseVisit', [arrTime], {
                // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
                animate: !$.jqplot.use_excanvas,
                title: '',
                // seriesColors: ['#85802b', '#00749F', '#73C774', '#C7754C', '#17BDB8'],
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    rendererOptions: {
                        varyBarColor: true
                    },
                    pointLabels: { show: false }
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: CountryName
                    }
                },
                highlighter: { show: true }
            });

        }
    });
</script>




<div class=" clearfix">
    <div class="box-content ">
        <div id="divtopFiveCountry" runat="server">
            <div class='sfCountryHolder'>
                <div id="BrowserWiseVisit" style="margin-top: 20px; margin-left: 20px; width: 320px; height: 300px; float: left">
                </div>
                <div class="sftotalVisitor clearfix">
                    <asp:Literal runat="server" ID="ltrTotal"></asp:Literal>
                    <asp:HyperLink runat="server" ID="hyLnkSiteAnalytics" Text="View Full Statistics" CssClass="icon-view smlbtn-secondary sfBtn pull-right"></asp:HyperLink>
                </div>
            </div>
        </div>
        <div id="divMsg" runat="server" visible="false">

            <label id="lblMsg" runat="server"></label>
        </div>
    </div>
</div>
