<%@ WebService Language="C#" Class="AdvanceAnalyticWebService" %>

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
public class AdvanceAnalyticWebService : AuthenticateService
{


    [WebMethod]
    public List<DashboardStatisticInfo> GetMonthlySiteStat(string YearFrom, string YearTo, int PortalID, int UserModuleID, string UserName, string secureToken)
    {
        if (IsPostAuthenticated(PortalID, UserModuleID, UserName, secureToken))
        {
            DashBoardController objController = new DashBoardController();
            return objController.GetMonthlySiteStatistics(YearFrom, YearTo);
        }
        else return null;
    }
    [WebMethod]
    public List<SiteCompleteInfo> GetSiteCompleteness(int UserModuleID, int PortalID, string CultureCode, string SecureToken, string UserName)
    {
        if (IsPostAuthenticated(PortalID, UserModuleID, UserName, SecureToken))
        {
            DashBoardController objController = new DashBoardController();
            return objController.GetSiteCompleteness(UserModuleID, PortalID, CultureCode);
        }
        else return null;
    }
}