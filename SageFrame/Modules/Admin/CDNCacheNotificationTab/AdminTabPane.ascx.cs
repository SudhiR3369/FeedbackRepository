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
        lstTab.Add("Cache Maintenance");
    
        lstTab.Add("CDN");
        rptModuleTab.DataSource = lstTab;
        rptModuleTab.DataBind();
    }

    protected void rptModuleTab_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        switch (e.CommandName)
        {
            case "Cache Maintenance":
                {
                    hdnActiveMenuIndex.Value = "0";
                    HideAllTabContent();
                    divCacheMaintenance.Visible = true;
                    break;
                }
         
               case "CDN":
                {
                    hdnActiveMenuIndex.Value = "1";
                    HideAllTabContent();
                    divCDN.Visible = true;
                    break;
                }

        }
    }
    private void HideAllTabContent()
    {
        divCDN.Visible = false;
        divCacheMaintenance.Visible = false;
        divNotification.Visible = false;
    }
}