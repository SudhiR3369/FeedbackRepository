using SageFrame.ArticleManagement;
using SageFrame.Web;
using System;

public partial class Modules_ArticleAdmin_QuickDashboard_QuickDashboardTrending : BaseUserControl
{
    public int UserModuleID = 0;
    public int SiteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        SiteID = GetSiteID;
        IncludeCss("trendingStyle", "/Modules/ArticleAdmin/QuickDashboard/css/module.css", "/Modules/ArticleAdmin/QuickDashboard/jcarousel/style.css", "/Modules/ArticleAdmin/QuickDashboard/jcarousel/jcarousel.basic.css");
        IncludeJs("trendingScript", "/Modules/ArticleAdmin/CommonJs/js/commonnews.js", "/Modules/ArticleAdmin/QuickDashboard/jcarousel/jquery.jcarousel.min.js", "/Modules/ArticleAdmin/QuickDashboard/jcarousel/jcarousel.basic.js", "/Modules/ArticleAdmin/QuickDashboard/js/QuickDashboardTrending.js");
        ArticleSettingController.RegisterClientArticleSettingGobalVariable(ArticleEngineType.News, this.Page, SiteID);
    }
}