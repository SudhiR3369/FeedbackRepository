<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SiteAnalyticView.ascx.cs"
    Inherits="Modules_SiteAnalytic_SiteAnalyticView" %>
<script language="javascript" type="text/javascript">
    //<![CDATA[    
    $(function () {

        var Flag = '<%=Flag %>';
        if (Flag == 1) {
            $(this).SiteAnalyticBuilder({
                CultureCode: 'en-US',
                baseURL: '',
                PortalID: '<%=PortalID %>',
                UserModuleID: '<%=ModuleID %>',
                DefaultPage:'<%=DefaultPage%>'
            });
        }
    });
    //]]>	
</script>

<h1 class="box-title"> Site Analytics</h1>
<div id="divAnalytic" runat="server">

<div id="divChoose" class="">
  <ul class="tab-nav clearfix">
    <li id="Chart" class="sfDefault ">
      <label class="sfFormlabel"> Chart</label>
    </li>
    <li id="Data" class="">
      <label class="sfFormlabel"> Data</label>
    </li>
  </ul>
</div>
<div id="divRange" class="sfTableOption">

<!-- top filter section-->
<div class="easy-grid-top-filter flex-start" style="margin-top:25px;">
    <div class="control-wrap">
        <label>Start Date</label>
        <div class="custom-inputbox datepicker-input-box">
        <input type="text" id="txtStartDate" class="sfInputbox" />
        </div>
    </div>

    <div class="control-wrap">
            <label>End Date</label>
            <div class="custom-inputbox datepicker-input-box">
            <input type="text" id="txtEndDate" class="sfInputbox" />
            </div>
        </div>

</div>






</div>
<div class="sfFormwrapper">
  <div id="divChart" class="chart-lists">

    <div class="chart-wrap">
    <div class="datewise">
         <!-- <h2>Date wise visit</h2> -->
          <div id="DailyVisit" class="code" style="height: 300px; width:100%;"></div>
        </div>
    </div>


    <div class="chart-wrap">
    <div class="monthwise">
     <!--   <h2>Month Wise Visit</h2> -->
        <div id="MonthlyVisitMeterGaugeChart" style=" width:100%; height:300px;"> </div></div>
    </div>

    <div class="chart-wrap">
    <div class="browserwise">
     <!--   <h2>Browser Wise Visit</h2> -->
        <div id="BrowserWiseVisit" style="width: 100%; height: 300px;"> </div></div>
    </div>



    <div class="chart-wrap">
    <div class="countrywise">
          <div id="CountryWiseVisit"> </div>
          <div style="clear:both;"> <span>You Clicked: </span><span id="info1">Nothing yet</span></div>
        </div>
    </div>



    <div class="chart-wrap">
    <div class="pagewise">
          <div id="PageVisit"> </div>
          <div style="clear:both;"> <span>You Clicked: </span><span id="info2">Nothing yet</span></div>
        </div>
    </div>

  </div>
  <div id="divData" class="data-views" style="display: none">

    <div class="sfGridwrapper" id="divVisitedCountryList">
      <h2 class="box-title"> Country Wise Visit</h2>
      <table id="tblVisitedCountryList" width="100%" cellpadding="0" cellspacing="0">
      </table>
      <div id="PagingVisitedCountryList" class="sfPagination"> </div>
    </div>

    <div id="divVisitedPageList" class="sfGridwrapper">

    <div class="box-heading">
            <h2 class="box-title">Page wise visit</h2>
            <%--<div class="control-wrap">
                <label>Please Select</label>
                <div class="custom-select" style="width: 128px;">
                   <select id="slPage" class="sfListmenu">
                   </select>
                </div>



            </div>--%>
        </div>

      <table id="tblVisitedPageList" width="100%" cellpadding="0" cellspacing="0">
      </table>
      <div id="PagingVisitedPageList" class="sfPagination"> </div>
    </div>

    <div id="divBrowserList" class="sfGridwrapper">
      <h2 class="box-title"> Browser Wise Visit</h2>
      <table id="tblBrowserList" width="100%" cellpadding="0" cellspacing="0">
      </table>
      <div id="PagingBrowserList" class="sfPagination"> </div>
    </div>

    <div id="divRefSite" class="sfGridwrapper">
      <h2 class="box-title"> Ref Sites</h2>
      <table id="tblRefSite" width="100%" cellpadding="0" cellspacing="0">
      </table>
      <div id="PagingRefList" class="sfPagination"> </div>
    </div>

    <div id="divExport" style="clear: both;">
      <asp:Button ID="btnExportToExcel" runat="server" CssClass="btn smlbtn-primary" Text="Export to Excel"
                OnClick="btnExportToExcel_Click" />
      <asp:Button ID="btnExportToPDF" runat="server" CssClass="btn smlbtn-light-grey" Text="Export to PDF"
                OnClick="btnExportToPDF_Click" />
      <%--            <asp:PostBackTrigger ControlID="btnExportToExcel" />
            <asp:PostBackTrigger ControlID="btnExportToPDF" />--%>
    </div>
  </div>
  <div class="clear"> </div>
</div>
</div>

<div id="divMessage" runat="server" visible="false">
    <label id="lblMessage" runat="server"></label>
</div>