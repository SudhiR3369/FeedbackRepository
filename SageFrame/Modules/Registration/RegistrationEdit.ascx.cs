using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_Registration_RegistrationEdit : BaseAdministrationUserControl
{
    public int userModuleID, portalID;
    public string CultureCode, userName, resolvedUrl, path;

    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = Int32.Parse(SageUserModuleID);
        //portalID = GetPortalID;
        //CultureCode = GetCurrentCultureName;
        IncludeCss("Registration",  "/Modules/Registration/css/RegistrationEdit.css",
            "/css/jquery.alerts.css");
        IncludeJs("Registration", 
            "/js/jquery.validate.js", "/js/jquery.alerts.js", "/Modules/Registration/js/RegistrationEdit.js");
        //userName = GetUsername;
        //path = ResolveUrl("RegistrationService.asmx");
    }
}
