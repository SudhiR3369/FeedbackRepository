<%@ WebService Language="C#" Class="RoleService" %>

using SageFrame.RolesManagement;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Security.Helpers;
using SageFrame.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Services;

/// <summary>
/// Summary description for RoleService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RoleService : AuthenticateService
{

    public RoleService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public List<RolesManagementInfo> GetPortalRoleList(CommonAuthParam authParam, int PageNumber, int PageSize)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                RolesManagementController roleMgmtObj = new RolesManagementController();
                return roleMgmtObj.GetAllRoleList(authParam.PortalID, authParam.UserName, PageNumber, PageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public string AddUpdateRole(SageFrame.Security.Entities.RoleInfo role, string roleID, CommonAuthParam authParam)
    {
        role.ApplicationName = Membership.ApplicationName;
        role.AddedOn = DateTime.Now;

        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            string message = String.Empty;
            RoleController roleObj = new RoleController();
            RoleCreationStatus status = new RoleCreationStatus();
            roleObj.CreateRole(role, roleID, out status);
            if (status == RoleCreationStatus.DUPLICATE_ROLE)
            {
                return message = "This role already exist.";
            }
            else if (status == RoleCreationStatus.SUCCESS)
            {
                return message = "Role saved successfully.";
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public void DeleteRole(string roleId, CommonAuthParam authParam)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                Guid RoleID = new Guid(roleId);
                RoleController roleObj = new RoleController();
                roleObj.DeleteRole(RoleID, authParam.PortalID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    [WebMethod]
    public void UpdateUserRole(string roleId, bool RoleStatus,  CommonAuthParam authParam)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                Guid RoleID = new Guid(roleId);
                RolesManagementProvider controllerObj = new RolesManagementProvider();
                controllerObj.UpdateUserRole(RoleID, RoleStatus);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
