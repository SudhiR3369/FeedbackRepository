using SageFrame.Web;
using System;

public partial class Modules_Admin_AdvisionDetail_AdvisionDetail : BaseUserControl
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

            IncludeCss("AdvisionDetail", "/Modules/Admin/AdvisionDetail/css/AdvisionDetail.css");
            IncludeJs("AdvisionDetail", "/Modules/Admin/AdvisionDetail/js/AdvisionDetail.js");

        }

    }

}