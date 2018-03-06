using SageFrame.DigiSphereInvoker.Controller;
using SageFrame.Web;
using System;

public partial class Modules_Admin_Advision_Advision : BaseUserControl
{
    public string userModuleID = string.Empty;
    public string modulePath = string.Empty;
    public string siteCategory = string.Empty; 
    public string disphereAPI = string.Empty;
    public int portalID = 0;

    protected void Page_Load(object sender, EventArgs e)
    {

        ConfigurationController objConfiguration = new ConfigurationController();
        siteCategory = objConfiguration.AdvisionGetCategory();
        if (!IsPostBack)
        {
            userModuleID = SageUserModuleID;
            portalID = GetPortalID;
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);

            IncludeCss("Advision", "/Modules/Admin/Advision/css/Advision.css");
            IncludeJs("Advision", "/Modules/Admin/Advision/js/SocialMarketing.js");
        }

    }

}