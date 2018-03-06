using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_Admin_SiteCompletion_SiteCompletion : BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("SiteCompletion", "/Modules/Admin/SiteCompletion/css/sitecomplete.css");
        IncludeJs("SiteCompletionJs", "/Modules/Admin/SiteCompletion/js/SiteCompletion.js");
    }
}