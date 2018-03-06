using System;
using SageFrame.Web;

public partial class Modules_Admin_MediaManagement_MediaManagement : BaseAdministrationUserControl
{
    public int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = int.Parse(SageUserModuleID);
        IncludeJs("mediamanagement", "/Modules/Admin/MediaManagement/js/mediamanagement.js", "/js/jquery.validate.js"
            , "/Modules/Admin/MediaManagement/js/uploader.js",
            "/Modules/Admin/MediaManagement/js/cropper.js",
            "/Modules/Admin/MediaManagement/js/main.js"
            , "/js/popup.js");
        IncludeCss("mediamanagement", "/Modules/Admin/MediaManagement/css/module.css");
    }
}