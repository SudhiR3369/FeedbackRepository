<%@ WebService Language="C#" Class="UserMgmtService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Services;
using SageFrame.UserProfile;
using SageFrame.Services;
using SageFrame.Web;
using SageFrame.Security.Entities;
using SageFrame.Security.Helpers;
using SageFrame.Security;
using SageFrame.Security.Enums;
using SageFrame.Security.Providers;

/// <summary>
/// Summary description for UserMgmtService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UserMgmtService : AuthenticateService
{
    public UserMgmtService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string CreatePortalUser(UserInfo userObj, CommonAuthParam commonAuth)
    {
        MembershipController objMembCont = new MembershipController();
        string Password, PasswordSalt;
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                userObj.Password = AESEncrytDecry.DecryptStringAES(userObj.Password);
                string message = String.Empty;
                UserCreationStatus status = new UserCreationStatus();
                PasswordHelper.EnforcePasswordSecurity(objMembCont.PasswordFormat, userObj.Password, out Password, out PasswordSalt);
                userObj.Password = Password;
                userObj.PasswordSalt = PasswordSalt;
                objMembCont.CreateUser(userObj, out status, UserCreationMode.CREATE);

                if (status == UserCreationStatus.DUPLICATE_USER)
                {
                    return message = "NameAlreadyExists";
                }
                else if (status == UserCreationStatus.DUPLICATE_EMAIL)
                {
                    return message = "EmailAddressAlreadyIsInUse";
                }
                else if (status == UserCreationStatus.SUCCESS)
                {
                    return message = "UserCreatedSuccessfully";
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
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public bool UpdateUser(UserInfo obj, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                string message = String.Empty;
                UserUpdateStatus status = new UserUpdateStatus();
                //MembershipController objMembCont = new MembershipController();               
                MembershipDataProvider.UpdateUser(obj, out status);

                if (status == UserUpdateStatus.DUPLICATE_EMAIL_NOT_ALLOWED)
                {
                    //return message = "EmailAddressAlreadyIsInUse";
                    return true;
                }

                else
                {
                    //return null;
                    return false;
                }

            }
            else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public bool UpdateRoles(string ApplicationName, Guid UserID, string UnSelectedRoles, string SelectedRoles, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                RoleController role = new RoleController();
                return role.ChangeUserInRoles(ApplicationName, UserID, UnSelectedRoles, SelectedRoles, commonAuth.PortalID);
            }
            else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public void UpdateUserStatus(UserInfo user, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                MembershipController objMembCont = new MembershipController();
                objMembCont.UpdateUserStatus(user);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public void ChangePassword(Guid userID, string pass, CommonAuthParam commonAuth)
    {
        try
        {
            string Password, PasswordSalt;
            pass = AESEncrytDecry.DecryptStringAES(pass);
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                MembershipController objMembCont = new MembershipController();
                PasswordHelper.EnforcePasswordSecurity(objMembCont.PasswordFormat, pass, out Password, out PasswordSalt);
                UserInfo user = new UserInfo(new Guid(userID.ToByteArray()), Password, PasswordSalt, objMembCont.PasswordFormat);
                objMembCont.ChangePassword(user);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public void DeleteUser(UserInfo user, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                MembershipController objMembCont = new MembershipController();
                objMembCont.DeleteUser(user);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    //New Pagination
    [WebMethod]
    public List<UserInfo> GetDataByUserId(Guid userID, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                MembershipController controllerObj = new MembershipController();
                return controllerObj.GetDataByUserId(userID);
            }
            else
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    //New Pagination
    [WebMethod]
    public List<UserInfo> GetDataByDateRange(int PageNumber, int PageSize, FilterUserInfo userObj, CommonAuthParam commonAuth)
    {

        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                MembershipController controllerObj = new MembershipController();
                return controllerObj.GetDataByDateRange(PageNumber, PageSize, userObj);
            }
            else
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public List<RoleInfo> LoadAllRolesForUser(CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                MembershipController controllerObj = new MembershipController();
                return controllerObj.LoadAllRolesForUser();
            }
            else
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

}
