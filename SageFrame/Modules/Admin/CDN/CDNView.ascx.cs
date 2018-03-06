using System;
using SageFrame.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
/// <summary>
/// CDNView inherists from BaseAdministrationUserControl class
/// </summary>
public partial class Modules_HTML_CDNView : BaseAdministrationUserControl
{    
   

    public int UserModuleID = 0;
     protected void Page_Load(object sender, EventArgs e)
    {
        IncludeJs("CDN", "/Modules/Admin/CDN/js/CDN.js", "/js/jquery.validate.js");
        IncludeCss("CDNcss", "/Modules/Admin/CDN/css/module.css");
        if (!string.IsNullOrEmpty(SageUserModuleID))
            UserModuleID = int.Parse(SageUserModuleID);
        else
        {
            Control ctl = this.Parent;
            HiddenField hdnParentUserModuleID = (HiddenField)ctl.FindControl("hdnUserModuleID");
            UserModuleID = int.Parse(hdnParentUserModuleID.Value);
        }
    }
}
