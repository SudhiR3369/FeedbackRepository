using SageFrame.Web;
using System;

public partial class Modules_DigitalMarketing_MediaPerformaceCounter_MediaPerformaceCounter : BaseUserControl
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

            IncludeCss("MediaPerformaceCounter",
                "/Modules/DigitalMarketing/MediaPerformaceCounter/css/MediaPerformaceCounter.css");
            IncludeJs("MediaPerformaceCounter",
                "/Modules/DigitalMarketing/MediaPerformaceCounter/js/MediaPerformaceCounter.js",
                "/Modules/DigitalMarketing/MediaPerformaceCounter/js/jquery.ui.timepicker.js",
                "/Modules/DigitalMarketing/MediaPerformaceCounter/js/canvasjs.js"
                //"/Modules/DigitalMarketing/MediaPerformaceCounter/js/canvasjs.min.js"
                );

        }



    }
}