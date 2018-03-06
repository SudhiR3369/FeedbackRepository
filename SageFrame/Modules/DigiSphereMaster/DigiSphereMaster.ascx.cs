using SageFrame.Web;
using System;

public partial class Modules_DigiSphereMaster_DigiSphereMaster : BaseUserControl
{
    public string userModuleID = string.Empty;
    public string modulePath = string.Empty;
    public int portalID = 0;


    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            userModuleID = SageUserModuleID;
            portalID = GetPortalID;
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);

            IncludeCss("DigiSphereMaster", "/Modules/Admin/DigiSphereMaster/css/DigiSphereMaster.css");
            IncludeJs("DigiSphereMaster", "/Modules/Admin/DigiSphereMaster/js/DigiSphereMaster.js");
        }

    }

}