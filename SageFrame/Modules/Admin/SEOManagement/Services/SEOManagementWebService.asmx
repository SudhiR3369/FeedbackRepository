<%@ WebService Language="C#" CodeBehind="~/App_Code/SEOManagementWebService.cs" Class="SEOManagementWebService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.SEOManagement;
/// <summary>
/// Summary description for SEOManagementWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SEOManagementWebService : SageFrame.Services.AuthenticateService
{

    public SEOManagementWebService()
    {
    }
    [WebMethod]
    public List<SEOMetaValues> GetSEOMetaValuesByPageId(int pageID, SEOAuthenInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            SEOController controller = new SEOController();
            return controller.GetSEOMetaValuesByPageId(pageID, authInfo.UserModuleID, authInfo.PortalID);
        }
        else
        {
            return null;
        }
    }
    [WebMethod]
    public int SaveSEOMetaTag(int pageID, List<SEOMetaValues> objTagValue, SEOAuthenInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            SEOController controller = new SEOController();
            return controller.SaveSEOMetaTag(pageID, objTagValue, authInfo.PortalID, authInfo.Username);
        }
        else
        {
            return -100;
        }
    }

}
