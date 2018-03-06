using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;

public partial class AdminModuleTabPane : BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        hdnUserModuleID.Value = SageUserModuleID;
        IncludeCss("ModulesTab", "/Modules/Admin/CDNCacheNotificationTab/css/Module.css");
        BindModuleTab();
    }

    private void BindModuleTab()
    {
        List<string> lstTab = new List<string>();
        lstTab.Add("User Management");
        lstTab.Add("Roles Management");
        rptModuleTab.DataSource = lstTab;
        rptModuleTab.DataBind();
    }

    protected void rptModuleTab_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        switch (e.CommandName)
        {
            case "User Management":
                {
                    hdnActiveMenuIndex.Value = "0";
                    HideAllTabContent();
                    divUserManagement.Visible = true;
                    break;
                }
            case "Roles Management":
                {
                    hdnActiveMenuIndex.Value = "1";
                    HideAllTabContent();
                    divRolesManagement.Visible = true;
                    break;
                }
        }
    }
    private void HideAllTabContent()
    {
        divRolesManagement.Visible = false;
        divUserManagement.Visible = false;
    }
}