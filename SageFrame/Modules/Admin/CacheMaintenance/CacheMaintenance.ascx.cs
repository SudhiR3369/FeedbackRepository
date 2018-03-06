using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame;
using System.Web.UI;
using System.Web.UI.WebControls;


public partial class Modules_Admin_CacheMaintenance_CacheMaintenance : BaseAdministrationUserControl
{
    public int ModuleID;
    protected void Page_Load(object sender, EventArgs e)
    {
    
        if (!string.IsNullOrEmpty(SageUserModuleID))
            ModuleID = int.Parse(SageUserModuleID);
        else
        {
            Control ctl = this.Parent;
            HiddenField hdnParentUserModuleID = (HiddenField)ctl.FindControl("hdnUserModuleID");
            ModuleID = int.Parse(hdnParentUserModuleID.Value);
        }
      
        IncludeJs("CacheMaintenance", "/Modules/Admin/CacheMaintenance/JS/CacheMaintenance.js");
    }
   
}
