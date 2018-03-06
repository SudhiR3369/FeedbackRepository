<%@ WebService Language="C#" Class="ManageMassMail" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.MassMail;
using SageFrame.Utilities;


/// <summary>
/// Summary description for ManageNotification
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ManageMassMail : SageFrame.Services.AuthenticateService
{

    public ManageMassMail()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<MassMailFilterTypeInfo> GetFilterValue(int filterTypeID, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            MassMailController objController = new MassMailController();
            List<MassMailFilterTypeInfo> lstType = objController.GetFilterValueList(filterTypeID);
            return lstType;
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public List<MassMailFilterTypeInfo> GetAllUsers(string username, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            MassMailController objController = new MassMailController();
            List<MassMailFilterTypeInfo> lstType = objController.GetAllUsers(username);
            return lstType;
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public List<MassMailInfo> GetMassMailList(int offset, int limit, int filterTypeID, int status, string mailTitle, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            MassMailController objController = new MassMailController();
            List<MassMailInfo> lstType = objController.GetMassmailList(offset, limit, filterTypeID, mailTitle, status);
            return lstType;
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public int AddUpdateMassMail(MassMailAddInfo objMassMail, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            MassMailController objController = new MassMailController();
            return objController.AddUpdateMassMail(objMassMail, authInfo.Username);

        }
        else
        {
            return -1;
        }
    }

    [WebMethod]
    public int DeleteMassMail(long massmailID, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            MassMailController objController = new MassMailController();
            return objController.DeleteMassMail(massmailID, authInfo.Username);

        }
        else
        {
            return -1;
        }
    }

    [WebMethod]
    public MassMailEditInfo GetMassMailDetailForEdit(long massmailID, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            MassMailController objController = new MassMailController();
            return objController.GetMassMailDetailForEdit(massmailID);

        }
        else
        {
            return null;
        }
    }
    [WebMethod]
    public MassMailSendInfo GetMassMail(string ScheduleDate, string AuthToken)
    {
        string configCode = Config.GetSetting("configurecode").ToString();
        if (AuthToken==configCode)
        {
            MassMailController objController = new MassMailController();
            return objController.GetMailAndUserToSendMail(ScheduleDate);
        }
        else
        {
            return null;
        }
    }
    [WebMethod]
    public int UpdateStausOfFailMail(long MailID, string FailMailAddress, string AuthToken)
    {
        string configCode = Config.GetSetting("configurecode").ToString();
        if (AuthToken == configCode)
        {
            MassMailController objController = new MassMailController();
            return objController.UpdateStausOfFailMail(MailID, FailMailAddress);
        }
        else
        {
            return -1;
        }
    }

}

