<%@ WebService Language="C#" Class="ArticleCommonServices" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrame.Services;
using System.Data;
using SageFrame.ArticleManagement;
using Newtonsoft.Json;
using System.Collections.Generic;
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ArticleCommonServices : AuthenticateService
{
    [WebMethod]
    public string GetFilterValue(CommonAuthParam auth, int filterFor, bool isBlog, string roleID,int siteID)
    {
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            CommonController objCon = new CommonController();
            DataSet ds = objCon.GetFilterValue(roleID, filterFor, isBlog,siteID);
            string str = JsonConvert.SerializeObject(ds);
            return str;
        }
        else
        {
            return null;
        }
    }
    [WebMethod]
    public List<ArticleActivityLog> GetAllActivityLog(CommonAuthParam objAuth, int ArticleID)
    {
        try
        {
            if (IsPostAuthenticatedView(objAuth.PortalID, objAuth.UserModuleID, objAuth.UserName, objAuth.SecureToken))
            {
                ArticleController objController = new ArticleController();
                return objController.GetAllActivityLog(ArticleID);
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
    public List<ArticleActivityLog> GetAllActivityVersionLog(CommonAuthParam objAuth, int ArticleID)
    {
        try
        {
            if (IsPostAuthenticatedView(objAuth.PortalID, objAuth.UserModuleID, objAuth.UserName, objAuth.SecureToken))
            {
                ArticleController objController = new ArticleController();
                return objController.GetAllActivityVersionLog(ArticleID);
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
    public string GetAllDataByIDForVersion(CommonAuthParam objAuth, int ArticleID)
    {
        try
        {
            if (IsPostAuthenticated(objAuth.PortalID, objAuth.UserModuleID, objAuth.UserName, objAuth.SecureToken))
            {
                ArticleController objController = new ArticleController();
                DataSet ds = objController.GetAllDataByIDForVersion(ArticleID);

                string str = JsonConvert.SerializeObject(ds);
                str = HttpUtility.HtmlDecode(str);
                return str;
            }
            else { return null; }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

}