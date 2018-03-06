using SageFrame.Web;
using System;

public partial class Modules_ArticleAdmin_ArticleSetting_BrandSetting : BaseUserControl
{
    public int UserModuleID = 0;
    public int SiteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        SiteID = GetSiteID;
        IncludeJs("brandManagementScript", "Modules/Admin/MediaManagement/js/uploader.js", "/Modules/ArticleAdmin/ArticleSetting/js/BrandScript.js", "/js/jquery.alerts.js", "/js/jquery.pagination.js");
        IncludeCss("brandManagementStyle", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/ArticleAdmin/CommonCss/tablegrid.css", "/css/jquery.alerts.css");
    }
}