using SageFrame.Web;
using System;

public partial class Modules_ArticleAdmin_QuickDashboard_QuickDashboardStat : BaseUserControl
{
    public int UserModuleID = 0;
    public string RoleID = string.Empty;
    public int SiteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        SiteID = GetSiteID;
        IncludeJs("QDBoradStatJs", "/Modules/ArticleAdmin/QuickDashboard/js/QuickDashboardStat.js");
        IncludeCss("QDBoardCss", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/ArticleAdmin/CommonCss/tablegrid.css", "/Modules/ArticleAdmin/QuickDashboard/css/module.css");

        if (GetCurrentRoleIDs.Split(',').Length > 0)
        {
            RoleID = GetCurrentRoleIDs.ToLower();
        }
    }
}