<%@ WebService Language="C#" CodeBehind="~/App_Code/AdminNotificationWebService.cs" Class="AdminNotificationWebService" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Services;
using SageFrame.AdminNotification;
using SageFrame.Security;

/// <summary>
/// Summary description for AdminNotificationWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AdminNotificationWebService : AuthenticateService
{

    public AdminNotificationWebService()
    {
    }

    [WebMethod]
    public bool CheckUniquenessNotification(int portalID, string notificationName, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.CheckUniquenessNotification(portalID, notificationName);
        }
        else
        {
            return false;
        }
    }
    [WebMethod]
    public List<AdminNotificationInfo> GetAllActiveNotification(int portalID, string notifyUserName, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.GetAllActiveNotification(portalID, notifyUserName);
        }
        else
        {
            return null;
        }
    }
    [WebMethod]
    public List<AdminNotificationInfo> GetNotificationList(int portalID, string notifyUserName, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.GetNotificationList(portalID, notifyUserName);
        }
        else
        {
            return null;
        }
    }
    [WebMethod]
    public AdminNotificationInfo GetNotificationDetail(int portalID, int notificationID, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.GetNotificationDetail(portalID, notificationID);
        }
        else
        {
            return null;
        }
    }
    [WebMethod]
    public int AddUpdateNotification(int portalID, string userName, AdminNotificationInfo objNotification, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.AddUpdateNotification(portalID, userName, objNotification);
        }
        else
        {
            return -100;
        }

    }

    [WebMethod]
    public void DeleteNotification(int notificationID, int portalID, string userName, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            controller.DeleteNotification(portalID, notificationID, userName);
        }
    }
    [WebMethod]
    public int SetNotificationStatus(int portalID, int status, string notificationName, string userName, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.SetNotificationStatus(portalID, status, notificationName, userName);
        }
        else
        {
            return -100;
        }
    }
    [WebMethod]
    public int GetNotificationStatus(int portalID, string notificationName, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.GetNotificationStatus(portalID, notificationName);
        }
        else
        {
            return -100;
        }
    }
    [WebMethod]
    public int GetNotificationIDFromName(int portalID, int notificationName, AuthenticationInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            AdminNotificationController controller = new AdminNotificationController();
            return controller.GetNotificationIDFromName(portalID, notificationName);
        }
        else
        {
            return -100;
        }

    }

    [WebMethod]
    public string NotificationMarkAsRead(int PortalID, string UserName, string secureToken)
    {

        RoleController _role = new RoleController();
        bool isDashboardAccessible = _role.IsDashboardAccesible(UserName, PortalID);
        string msg = string.Empty;
        if (isDashboardAccessible)
        {
            AdminNotificationController controller = new AdminNotificationController();
                controller.MarkNotificationAsRead(PortalID,UserName);

        }
        return msg;
    }
}
