<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SiteAnalytics.ascx.cs" Inherits="SiteUserAnalytics" %>
<div class="site-performance">
    <div class="box-heading">
        <h2 class="box-title">Site Performance</h2>
        <div class="control-wrap">
            <label>From</label>
            <div class="custom-inputbox small-box datepicker-input-box">
                <input type="text" class="filter_field" id="txtDateFrom">
            </div>
            <label>To</label>
             <div class="custom-inputbox small-box datepicker-input-box">
                <input type="text" class="filter_field" id="txtDateTo">
            </div>


        </div>
    </div>

    <div id="siteVisitStat" style="height: 300px; width: 100%;">
    </div>
    <div class="chart-legend">
        <div class="item">
            <span class="color tot-sites" ></span>
            <span>Total Site Visit</span>
        </div>
         <div class="item">
            <span class="color single-page" ></span>
            <span>Single Page Visit Only</span>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $(this).SiteAnalyticBuilder({
            UserModuleID: '<%=SageUserModuleID%>'
        });
    });
</script>
