<%@ WebService Language="C#" Class="ModuleManagerWebService" %>
using System;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using SageFrame.ModuleManager;
using SageFrame.Templating.xmlparser;
using SageFrame.Templating;
using System.IO;
using SageFrame.Security.Entities;
using SageFrame.Security;
using SageFrame.ModuleManager.DataProvider;
using SageFrame.ModuleManager.Controller;
using System.Collections.Generic;
using SageFrame.Core;
/// <summary>
/// Summary description for ModuleManagerWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ModuleManagerWebService : SageFrame.Services.AuthenticateService
{

    public ModuleManagerWebService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string AddUserModule(UserModuleInfo UserModule, int portalID, string userName, int userModuleID, string secureToken)
    {
        string moduleAdd = string.Empty;
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            moduleAdd = (ModuleController.AddUserModule(UserModule));
        }
        return moduleAdd;
    }

    [WebMethod]
    public void UpdateUserModule(UserModuleInfo UserModule, int portalID, string userName, int userModuleID, string secureToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            ModuleController.UpdateUserModule(UserModule);
        }
    }


    [WebMethod]
    public void DeleteUserModule(string DeletedBy, int portalID, string userName, int userModuleID, string secureToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            ModuleController.DeleteUserModule(userModuleID, portalID, DeletedBy);
        }
    }

    [WebMethod]
    public void UpdatePageModules(List<PageModuleInfo> lstPageModules, int portalID, string userName, int userModuleID, string secureToken)
    {
        try
        {
            if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
            {
                ModuleController.UpdatePageModule(lstPageModules);
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public UserModuleInfo GetUserModuleDetails(int portalID, string userName, int userModuleID, string secureToken)
    {
        try
        {
            UserModuleInfo objModuleInfo = new UserModuleInfo();
            if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
            {
                objModuleInfo = (ModuleController.GetUserModuleDetails(userModuleID, portalID));
            }
            return objModuleInfo;
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public List<LayoutMgrInfo> GetAllSearchGenralModules(string SearchText, bool IsAdmin, int portalID, string userName, int userModuleID, string secureToken)
    {
        List<LayoutMgrInfo> objGeneralModules = new List<LayoutMgrInfo>();
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            objGeneralModules = LayoutMgrDataProvider.SearchModules(SearchText, portalID, IsAdmin);
        }
        return objGeneralModules;
    }


    [WebMethod]
    public void UpdateDuckable(Duckable objDuck)
    {
        //if (IsPostAuthenticatedView(objDuck.PortalID, objDuck.UserModuleID, objDuck.UserName, objDuck.SecureToken))
        //{
        DuckableController objController = new DuckableController();
        objController.UpdateDuckableValue(objDuck);
        // }
    }
}