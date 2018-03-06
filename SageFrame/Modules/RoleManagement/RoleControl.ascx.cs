using SageFrame.Web;
using System;

public partial class Modules_ArticleAdmin_User_AddRole : BaseUserControl
{
    public int UserModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        IncludeJs("roleManagementScript", "/Modules/RoleManagement/js/RoleManagement.js", "/js/jquery.alerts.js", "js/jquery.pagination.js");
        IncludeCss("roleManagementStyle", "/Modules/RoleManagement/css/module.css", "/css/jquery.alerts.css");
    }
}