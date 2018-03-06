using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Common;
using SageFrame.Services;
using SageFrame.Web;

public partial class Modules_User_Register_UserRegisterEdit : BaseAdministrationUserControl
{
    public string UserName, secureToken, CultureCode;
  
    public int UserModuleId;
    protected void Page_Load(object sender, EventArgs e)
    {

        UserName = GetUsername;
        secureToken = SageFrameSecureToken;
        UserModuleId = int.Parse(SageUserModuleID);
        CultureCode = GetCurrentCultureName;


        IncludeCss("User_Register","/css/jQuery.alerts.css");
        IncludeJs("User_Register", "/Modules/User_Register/js/JavaScript.js",
            "/js/jQuery.alerts.js",
            "/js/jquery.validate.js"
            );
       
       
    }
}