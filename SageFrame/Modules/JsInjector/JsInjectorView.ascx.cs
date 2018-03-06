using System;
using SageFrame.Web;

public partial class Modules_JsInjector_JsInjectorView :BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            int userModuleID = int.Parse(SageUserModuleID);
            string file = "script_" + userModuleID;
            string fileName = "script_" + userModuleID + ".js";
            string path = "/Modules/JsInjector/js/" + fileName;
            IncludeJs(file, path);
        }

    }
}