using SageFrame.ArticleManagement;
using SageFrame.Web;
using System;

public partial class Modules_ArticleAdmin_QuickDashboard_QuickDashBoardAgenda : BaseUserControl
{
    public int UserModuleID = 0;
    public string RoleID = string.Empty;
    public int SiteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        SiteID = GetSiteID;
        IncludeJs("QDBoardJs", "/Modules/ArticleAdmin/QuickDashboard/js/QuickDashboardAgenda.js", "/js/jquery.alerts.js");
        IncludeCss("QDBoardCss", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/ArticleAdmin/CommonCss/tablegrid.css", "/Modules/ArticleAdmin/QuickDashboard/css/module.css", "/css/jquery.alerts.css");

        if (GetCurrentRoleIDs.Split(',').Length > 0)
        {
            RoleID = GetCurrentRoleIDs.ToLower();
        }
        ArticleSettingController.RegisterClientArticleSettingGobalVariable(ArticleEngineType.News, this.Page, SiteID);
    }
}