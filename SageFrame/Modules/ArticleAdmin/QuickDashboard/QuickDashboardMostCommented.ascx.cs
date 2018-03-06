using SageFrame.ArticleManagement;
using SageFrame.Web;
using System;

public partial class Modules_ArticleAdmin_QuickDashboard_QuickDashboardMostCommented : BaseUserControl
{
    public int UserModuleID = 0;
    public int SiteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        SiteID = GetSiteID;
        IncludeCss("mostCommentedStyle", "/Modules/ArticleAdmin/QuickDashboard/css/module.css");
        IncludeJs("mostcommentedScript", "/Modules/ArticleAdmin/CommonJs/js/commonnews.js", "/Modules/ArticleAdmin/QuickDashboard/js/QuickDashboardMostCommented.js");
        ArticleSettingController.RegisterClientArticleSettingGobalVariable(ArticleEngineType.News, this.Page, SiteID);
    }
}