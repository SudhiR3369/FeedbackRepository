using SageFrame.Web;
using System;

public partial class Modules_DigitalMarketing_PostFeedbacks_PostFeedbacks : BaseUserControl
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

            IncludeCss("PostFeedbacks", "/Modules/DigitalMarketing/PostFeedbacks/css/PostFeedbacks.css");
            IncludeJs("PostFeedbacks", "/Modules/DigitalMarketing/PostFeedbacks/js/PostFeedbacks.js");
        }



    }
}