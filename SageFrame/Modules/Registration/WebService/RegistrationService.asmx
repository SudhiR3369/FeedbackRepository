<%@ WebService Language="C#" Class="RegistrationService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Services;
using Registration;

/// <summary>
/// Summary description for RegistrationService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RegistrationService : AuthenticateService
{

    [WebMethod]
    public int AddUpdateUsers(RegistrationEntity reg, string secureToken)
    {

        try
        {
            if (IsPostAuthenticated(reg.PortalID, reg.UserModuleID, reg.Name, secureToken))
            {
                RegistrationController objController = new RegistrationController();
                objController.AddUpdateUsers(reg);
                return 1;
            }
            else
            {
                return 2;
            }
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }


    [WebMethod]
    public int DeleteUserByID(int UserID, int PortalID, int UserModuleID, string userName, string secureToken)
    {
        try
        {
            if (IsPostAuthenticated(PortalID, UserModuleID, userName, secureToken))
            {
                RegistrationController objController = new RegistrationController();
                objController.DeleteUserByID(UserID);
                return 1;
            }
            else
            {
                return 2;
            }
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }

    [WebMethod]
    public List<RegistrationEntity> GetAllUsers(int PortalID, int UserModuleID, string CultureCode)
    {
        try
        {
            RegistrationController regCon = new RegistrationController();
            return regCon.GetAllUsers(PortalID, UserModuleID, CultureCode);
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }

    [WebMethod]
    public RegistrationEntity GetUsersByID(int UserID)
    {
        try
        {
            RegistrationController regController = new RegistrationController();
            return regController.GetUsersByID(UserID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

}
