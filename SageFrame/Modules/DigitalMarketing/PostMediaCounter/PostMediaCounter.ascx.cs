using SageFrame.Web;
using System;

public partial class Modules_DigitalMarketing_PostMediaCounter_PostMediaCounter : BaseUserControl
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

            IncludeCss("PostMediaCounter", "/Modules/DigitalMarketing/PostMediaCounter/css/PostMediaCounter.css");
            IncludeJs("PostMediaCounter", "/Modules/DigitalMarketing/PostMediaCounter/js/PostMediaCounter.js");
        }



    }
}