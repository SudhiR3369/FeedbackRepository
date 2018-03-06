<%@ WebService Language="C#" Class="SiteCompleteWebService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrame.Services;
using System.Collections.Generic;
using DashBoardControl.Info;
using DashBoardControl;
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SiteCompleteWebService : AuthenticateService
{
    [WebMethod]
    public List<SiteCompleteInfo> GetSiteCompleteness(int UserModuleID, int PortalID, string CultureCode, string SecureToken, string UserName)
    {
        if (IsPostAuthenticated(PortalID, UserModuleID, UserName, SecureToken))
        {
            UserModuleID = 1317;
            DashBoardController objController = new DashBoardController();
            return objController.GetSiteCompleteness(UserModuleID, PortalID, CultureCode);
        }
        else return null;
    }
}