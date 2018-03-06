using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SiteUserAnalytics : BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("SiteAnalyticsCss", "/Modules/Admin/AdvanceSiteAnalytics/css/jquery.jqplot.min.css","");
        IncludeCss("SiteAnalytics", "/Modules/SiteAnalytics/syntaxhighlighter/styles/shCoreDefault.min.css");
        IncludeCss("SiteAnalytics", "/Modules/SiteAnalytics/syntaxhighlighter/styles/shThemejqPlot.min.css");
        IncludeJs("SiteAnalytics", "/Modules/Admin/AdvanceSiteAnalytics/js/pjs/jquery.jqplot.min.js",
            "/Modules/Admin/AdvanceSiteAnalytics/js/pjs/jqplot.dateAxisRenderer.min.js",
         "/Modules/Admin/AdvanceSiteAnalytics/js/pjs/jqplot.highlighter.min.js",
            "/Modules/Admin/AdvanceSiteAnalytics/js/pjs/jqplot.categoryAxisRenderer.js",
           //"/Modules/SiteAnalytics/pjs/jqplot.pointLabels.min.js",
        
           "/Modules/Admin/AdvanceSiteAnalytics/js/pjs/jqplot.cursor.min.js",
             
        "/Modules/Admin/AdvanceSiteAnalytics/js/AdvanceAnalytics.js");
    }
}