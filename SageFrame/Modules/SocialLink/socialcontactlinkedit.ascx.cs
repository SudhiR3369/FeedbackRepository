using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_SocialLink_SocialContactLinkEdit :BaseUserControl
{
    public int userModuleID;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = Int32.Parse(SageUserModuleID);
        IncludeCss("SocialLinkCss","/Modules/SocialLink/css/Module.css", "/css/jquery.alerts.css");
        IncludeJs("SocialLinkJs","/js/jquery.validate.js" ,"/js/jquery.alerts.js","/Modules/SocialLink/js/SocialLinkEdit.js");
    }
}