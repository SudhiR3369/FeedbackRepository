<%@ WebService Language="C#" Class="AdminCardRoleSettingService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrame.Core;
using System.Collections.Generic;
using SageFrame.Services;
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AdminCardRoleSettingService : AuthenticateService
{

    [WebMethod]
    public List<CardModuleInfo> GetAllAdminCardModulePermission(string roleID, int portalID, int userModuleID, string userName, string secureToken)
    {
        List<CardModuleInfo> lst = new List<CardModuleInfo>();
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            CardModuleController objCon = new CardModuleController();
            lst = objCon.GetAllAdminCardModulePermission(roleID);
        }
        return lst;
    }
    [WebMethod]
    public void UpdateCardModulePermission(List<CardModuleRoleSettingInfo> lstObject, string secureToken, int portalID, int userModuleID, string userName)
    {
        if (IsPostAuthenticated(portalID, userModuleID, userName, secureToken))
        {
            CardModuleController objCon = new CardModuleController();
            foreach (CardModuleRoleSettingInfo objInfo in lstObject)
            {
                objCon.UpdateCardModulePermission(objInfo);
            }
        }
    }

}