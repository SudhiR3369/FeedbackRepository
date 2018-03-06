<%@ WebService Language="C#" Class="SocialLinkService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrame.SocialLinks;
using SageFrame.Services;
using System.Collections.Generic;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SocialLinkService : AuthenticateService
{

    [WebMethod]
    public List<SocialLinksInfo> GetSocialLinks(int userModuleID, int portalID, string cultureCode)
    {
        SocialLinkController objCon = new SocialLinkController();
        return objCon.GetSocialLinks(userModuleID, portalID, cultureCode);
    }
    [WebMethod]
    public int AddUpdateLink(SocialLinksInfo objInfo, string userName, string authToken)
    {
        if (IsPostAuthenticated(objInfo.PortalID, objInfo.UserModuleID, userName, authToken))
        {
            SocialLinkController objCon = new SocialLinkController();
            objCon.InsertUpdate(objInfo);
            return 1;
        }
        else
        {
            return -1;
        }

    }
    [WebMethod]
    public SocialLinksInfo GetSocialLinkByID(int LinkID)
    {

        SocialLinkController objCon = new SocialLinkController();
        return objCon.GetByID(LinkID);
    }
    [WebMethod]
    public int DeleteLinkByID(int linkID, int portalID, int userModuleID, string userName, string authToken)
    {
        if (IsPostAuthenticated(portalID, userModuleID, userName, authToken))
        {
            SocialLinkController objCon = new SocialLinkController();
            objCon.DelByID(linkID);
            return 1;
        }
        else
        {
                return -1;
        }
    }

}