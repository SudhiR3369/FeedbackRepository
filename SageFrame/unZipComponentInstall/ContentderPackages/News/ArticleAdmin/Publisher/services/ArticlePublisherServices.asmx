<%@ WebService Language="C#" Class="ArticlePublisherServices" %>

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
public class ArticlePublisherServices : AuthenticateService
{
    [WebMethod]
    public List<ArticleInfo> GetAllArticleForAdmin(CommonAuthParam auth, FilterInfo filterObject, int offset, int limit, bool isBlog, string roleID,int siteID)
    {
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleEditorController articleCon = new ArticleEditorController();
            return articleCon.GetAllArticleForAdmin(filterObject, auth.UserName, roleID, ArticleAccess.Publisher, offset, limit, isBlog,siteID);
        }
        else return null;
    }
    [WebMethod]
    public ArticleInfo GetArticleViewByID(CommonAuthParam auth, int articleID)
    {
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleEditorController articleCon = new ArticleEditorController();
            ArticleInfo objinfo= articleCon.GetArticleViewByID(articleID);
            objinfo.DetailsViewDOM = HttpUtility.HtmlDecode(objinfo.DetailsViewDOM);
            return objinfo;
        }
        else return null;
    }
    [WebMethod]
    public int UpdateArticle(CommonAuthParam auth,int articleID, int stateID, string message, string roleID)
    {
        if (IsPostAuthenticated(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleEditorController articleCon = new ArticleEditorController();
            return articleCon.UpdateArticleState(articleID, stateID, message, auth.UserName, roleID);
        }
        else return -1;

    }

}