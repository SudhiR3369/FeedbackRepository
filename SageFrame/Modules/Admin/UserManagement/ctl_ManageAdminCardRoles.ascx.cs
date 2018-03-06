using SageFrame.RolesManagement;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_Admin_UserManagement_ctl_ManageAdminCardRoles : BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeJs("CardModulePermission", "/Modules/Admin/AccessManagement/js/CardModuleRoles.js");
    }
   
}