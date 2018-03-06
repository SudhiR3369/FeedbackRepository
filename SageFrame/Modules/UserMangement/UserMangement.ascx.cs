using SageFrame.Common;
using SageFrame.Security;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_ArticleAdmin_UserMangement_UserMangement : BaseUserControl
{
    public int UserModuleID = 0;  
    public int PortalID = 0;
    public string ApplicationName;
    public DateTime CurrentTimeUtc;                         
    public DateTime CreatedDate;
    public DateTime AddedOn;
    public Guid UserID;
    public int StoreID;
    public int CustomerID;
    public int PasswordFormat;
    protected void Page_Load(object sender, EventArgs e)                                       
    { 
        MembershipController m = new MembershipController();
        UserModuleID = Int32.Parse(SageUserModuleID);
        PortalID = GetPortalID;
        ApplicationName = Membership.ApplicationName;
        CurrentTimeUtc = DateTimeHelper.GetUtcTime(DateTime.Now); ;
        CreatedDate = DateTimeHelper.GetUtcTime(DateTime.Now);
        AddedOn = DateTimeHelper.GetUtcTime(DateTime.Now); 
        UserID = Guid.NewGuid();
        StoreID = GetStoreID;
        CustomerID = GetCustomerID;
        PasswordFormat = m.PasswordFormat;
        IncludeCss("articleCss", "/Modules/UserMangement/css/StyleSheet.css", "/css/jquery.alerts.css");
        IncludeJs("articleScript", "/js/jquery.pagination.js", "/Modules/Admin/LoginControl/js/AESEncrytDecryt.js", "/Modules/UserMangement/js/UserManagementJs.js", "/js/jquery.alerts.js", "/js/jquery.pstrength-min.1.2.js");
    }
    
}