using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_ArticleAdmin_ArticleSetting_ArticleTypeSetting : BaseUserControl
{
    public int UserModuleID = 0;
    public int SiteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        SiteID = GetSiteID;
        IncludeCss("articleTypeStyle", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/ArticleAdmin/CommonCss/tablegrid.css", "/css/jquery.alerts.css");
        IncludeJs("articleTypeScript", "/Modules/ArticleAdmin/ArticleSetting/js/ArticleTypeScript.js", "/js/jquery.alerts.js");
    }
}