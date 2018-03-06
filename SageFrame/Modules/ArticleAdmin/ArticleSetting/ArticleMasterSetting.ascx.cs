using SageFrame.Web;
using System;
using SageFrame.ArticleManagement;
using System.Web;
using System.Collections.Generic;

public partial class Modules_ArticleAdmin_ArticleSetting_ArticleMasterSetting : BaseUserControl
{
    public int UserModuleID = 0;
    public int SiteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        SiteID = GetSiteID;
        IncludeJs("roleManagementScript", "/Modules/ArticleAdmin/CommonJs/js/commonnews.js", "/Modules/ArticleAdmin/ArticleSetting/js/ArticleMasterSetting.js");
        IncludeCss("roleManagementStyle", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/ArticleAdmin/CommonCss/tablegrid.css", "/css/jquery.alerts.css");
        ArticleSettingController.RegisterClientArticleSettingGobalVariable(ArticleEngineType.News, this.Page, SiteID);
    }
}