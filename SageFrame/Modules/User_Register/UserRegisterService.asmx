<%@ WebService Language="C#"  Class="UserRegisterService" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Web;
using SageFrame.Services;
using User_Register;

/// <summary>
/// Summary description for UserRegisterService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UserRegisterService : AuthenticateService
{

    public UserRegisterService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void AddUser(UserDetails user,string UserName,string secureToken)
        try
        {
            if (IsPostAuthenticated(user.PortalId, user.UserModuleId, UserName, secureToken))
            {
                UserController UC = new UserController();
                UC.AddUser(user);
            }
        }
        catch(Exception ex)
        {
            throw ex;
        }

    }

    [WebMethod]
    public List<UserDetails> GetUser(int PortalId,int UserModuleId,string CultureCode)
    {
        try
        {
            UserController UC = new UserController();
            return UC.GetUser(PortalId, UserModuleId, CultureCode);
        }
        catch(Exception ex)
        {
            throw ex;
        }

    }
    [WebMethod]
    public UserDetails GetUserById(int Id, int PortalId,int UserModuleId,string CultureCode)
    {
        try
        {
            UserController UC = new UserController();
            return UC.GetUserById(Id, PortalId, UserModuleId, CultureCode);

        }
        catch
        {
            throw;
        }
    }
    [WebMethod]
    public void DeleteUser(int Id, int PortalId, int UserModuleId,string CultureCode,string UserName,string secureToken)
    {
        try
        {
            if (IsPostAuthenticated(PortalId, UserModuleId, UserName, secureToken))
            {
                UserController Uc = new UserController();
                Uc.DeleteUser(Id, PortalId, UserModuleId, CultureCode);
            }
        }
        catch
        {
            throw;
        }
    }

}

