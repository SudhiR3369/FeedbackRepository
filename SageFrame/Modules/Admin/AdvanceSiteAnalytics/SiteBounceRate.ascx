<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SiteBounceRate.ascx.cs" Inherits="Modules_Admin_AdvanceSiteAnalytics_SiteBounceRate" %>
<div class="site-performance">
    <div class="box-heading">
        <h2 class="box-title">Site Bounce</h2>
        <div class="control-wrap">
            <label>From</label>
            <div class="custom-inputbox small-box datepicker-input-box">
                <input type="text" class="filter_field" id="txtBounceDateFrom">
            </div>
            <label>To</label>
            <div class="custom-inputbox small-box datepicker-input-box">
                <input type="text" class="filter_field" id="txtBounceDateTo">
            </div>
        </div>
    </div>
    <div id="siteBounceStat" style="height: 200px; width: 100%;">
    </div>

</div>
