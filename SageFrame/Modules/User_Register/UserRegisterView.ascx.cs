using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Services;
using SageFrame.Common;
using System.Text;
using SageFrame.Web;
using User_Register;

public partial class Modules_User_Register_UserRegisterView : BaseUserControl
{
    public int UserModuleId,PortalId;
    public string CultureCode;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleId = int.Parse(SageUserModuleID);
        CultureCode = GetCurrentCultureName;
        PortalId = GetPortalID;
        //GetUser();
        IncludeJs("User_Register", "/Modules/User_Register/js/JavaScript.js",
             "/js/jQuery.alerts.js",
             "/js/jquery.validate.js"
             );
    }
    public void GetUser()
    {
        UserController control = new UserController();
       List<UserDetails> user = control.GetUser(UserModuleId, PortalId, CultureCode);
        if (user.Count > 0)
        {
            StringBuilder sb = new StringBuilder();
            //sb.Append<"<div"
        }
    }
}