using System;
using SageFrame.Web;

public partial class Modules_CssInjector_CssInjectorView : BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            int userModuleID = int.Parse(SageUserModuleID);
            string file = "style_" + userModuleID;
            string fileName = "style_" + userModuleID + ".css";
            string path = "/Modules/CssInjector/css/" + fileName;
            IncludeCss(file, path);
        }

    }
}