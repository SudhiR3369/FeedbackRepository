<%@ WebService Language="C#" Class="AdminCardServce" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrame.Services;
using SageFrame.Core;
using System.Collections.Generic;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AdminCardServce : AuthenticateService
{
    [WebMethod]
    public List<CardModuleInfo> GetAllDeltedCardModule(string userName)
    {
        CardModuleController ObjCon = new CardModuleController();
        return ObjCon.GetAllDeltedCardModule(userName);
    }
    [WebMethod]
    public int DeleteAdminCardModule(int userModuleID, string SageFrameUser, string authToken, int portalID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, SageFrameUser, authToken))
        {
            CardModuleController ObjCon = new CardModuleController();
            ObjCon.DeleteAdminCardModule(userModuleID);
            return 1;
        }
        else
        {
            return -1;
        }

    }
    [WebMethod]
    public int RestoreDeletedModule(int userModuleID, int portalID, string SageFrameUser, string authToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, SageFrameUser, authToken))
        {
            CardModuleController ObjCon = new CardModuleController();
            ObjCon.RestoreDeletedAdminCardModule(userModuleID);
            return 1;
        }
        else
        {
            return -1;
        }
    }
    [WebMethod]
    public int UpdateMinMaxDisplay(int userModuleID, int portalID, string SageFrameUser, string authToken, string SuffixClass)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, SageFrameUser, authToken))
        {
            CardModuleController ObjCon = new CardModuleController();
            ObjCon.UpdateMinMaxDisplay(userModuleID, SuffixClass);
            return 1;
        }
        else
        {
            return -1;
        }

    }
    [WebMethod]
    public int UpdateDisplayOrder(string userModuleIDs, int userModuleID, int portalID, string SageFrameUser, string authToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, SageFrameUser, authToken))
        {
            CardModuleController ObjCon = new CardModuleController();
            ObjCon.UpdateDisplayOrder(userModuleIDs);
            return 1;
        }
        else
        {
            return -1;
        }

    }

}