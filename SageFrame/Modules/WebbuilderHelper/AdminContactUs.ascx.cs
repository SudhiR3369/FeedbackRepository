using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;

public partial class Modules_WebbuilderHelper_AdminContactUs : BaseAdministrationUserControl
{
    public string modulePath = string.Empty;
    public string userModuleID = string.Empty;
    public string userName = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            userModuleID = SageUserModuleID;
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            userName = GetUsername;
            IncludeJs("AdminContactUsTable",false, "/js/SageGrid/jquery.tablesorter.js");
            IncludeJs("AdminContactUsGrids", false, "/js/SageGrid/jquery.grid.js");
            IncludeJs("AdminContactUsPaging", false, "/js/SageGrid/SagePaging.js");
            IncludeJs("AdminContactUsGlobal", false, "/js/SageGrid/jquery.global.js");
            IncludeJs("AdminContactUsDate", false, "/js/SageGrid/jquery.dateFormat.js");
            IncludeJs("AdminContactUsEasing", false, "/js/jquery.easing.1.3.js");
            IncludeJs("AdminContactUs", "/Modules/WebbuilderHelper/js/AdminContactUs.js");

            IncludeCss("AdminContactUsCss", 
                "/Modules/WebbuilderHelper/css/admincontact.css", 
                "Modules/WebbuilderHelper/css/sagegrid.css"
                , "Modules/WebbuilderHelper/css/tablesort.css");
        }
    }
}