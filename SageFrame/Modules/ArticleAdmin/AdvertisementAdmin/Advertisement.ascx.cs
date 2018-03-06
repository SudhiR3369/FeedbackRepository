using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_ArticleAdmin_AdvertisementAdmin_Advertisement : BaseUserControl
{  
    public int UserModuleID = 0;
    public string resolvedUrl;
    public int SiteID = 0; 
    protected void Page_Load(object sender, EventArgs e)
    {                  
        SiteID = GetSiteID;
        UserModuleID = Int32.Parse(SageUserModuleID);  
        resolvedUrl = ResolveUrl("~/");
        IncludeCss("advertisementCss", "/css/jquery.alerts.css", "/Modules/ArticleAdmin/AdvertisementAdmin/css/cropit.css", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "Administrator/Templates/Default/css/EBdashboardMainStyle.css", "/Modules/Admin/MediaManagement/css/module.css", "/Modules/ArticleAdmin/AdvertisementAdmin/css/module.css");
        IncludeJs("advertisementScript", "/js/jquery.pagination.js", "/Modules/ArticleAdmin/AdvertisementAdmin/js/uploader.js", "/js/jquery.validate.js", "/Modules/ArticleAdmin/AdvertisementAdmin/js/Advertisement.js", "/js/jquery.alerts.js", "/Modules/ArticleAdmin/CommonJs/js/commonnews.js", "/Modules/ArticleAdmin/AdvertisementAdmin/js/jquery.cropit.js");
    }   
}  