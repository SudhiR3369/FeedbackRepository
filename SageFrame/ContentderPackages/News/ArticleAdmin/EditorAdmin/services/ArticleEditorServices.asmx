<%@ WebService Language="C#" Class="ArticleEditorServices" %>

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
public class ArticleEditorServices : AuthenticateService
{
    [WebMethod]
    public List<ArticleInfo> GetAllArticleForAdmin(CommonAuthParam auth, FilterInfo filterObject, int articleFor, int offset, int limit, bool isBlog, string roleID, int siteID)
    {
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleAccess access = ArticleAccess.Editor;
            switch (articleFor)
            {
                case 0:
                    access = ArticleAccess.Publisher;
                    break;
                case 1:
                    access = ArticleAccess.Editor;
                    break;
                case 2:
                    access = ArticleAccess.NewsAdmin;
                    break;
            }
            ArticleEditorController articleCon = new ArticleEditorController();
            return articleCon.GetAllArticleForAdmin(filterObject, auth.UserName, roleID, access, offset, limit, isBlog, siteID);
        }
        else return null;
    }

    [WebMethod]
    public string GetArticleNewsByIDForAdmin(CommonAuthParam auth, int articleID)
    {
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleEditorController articleCon = new ArticleEditorController();
            DataSet ds = articleCon.GetArticleNewsByIDForAdmin(articleID);
            string str = JsonConvert.SerializeObject(ds);
            return str;
        }
        else return null;
    }
    [WebMethod]
    public List<ArticleTemplateInfo> GetAllTemplate(CommonAuthParam auth, ArticleTemplateInfo filterInfo, int offset, int limit, int siteID)
    {
        List<ArticleTemplateInfo> lstTemplate = new List<ArticleTemplateInfo>();
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleTemplateController objCon = new ArticleTemplateController();
            List<ArticleTemplateInfo> templst = objCon.GetAllTemplate(filterInfo, offset, limit, true, siteID);
            foreach (ArticleTemplateInfo info in templst)
            {
                info.TemplateViewDom = HttpUtility.HtmlDecode(info.TemplateViewDom);
                info.DataReplaceFrameDom = HttpUtility.HtmlDecode(info.DataReplaceFrameDom);
                info.TemplateEditDOM = HttpUtility.HtmlDecode(info.TemplateEditDOM);
                lstTemplate.Add(info);
            }

        }
        return lstTemplate;
    }
    [WebMethod]
    public int AddUpdateArticle(ArticleInfo articleInfo, string roleID, CommonAuthParam auth)
    {
        if (IsPostAuthenticated(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            articleInfo.AddedBy = auth.UserName;
            articleInfo.CultureCode = auth.CultureCode;
            ArticleEditorController articleCon = new ArticleEditorController();
            return articleCon.AddUpdateArticle(articleInfo, roleID);
        }
        else return -1;
    }
    [WebMethod]
    public List<AdvsViewInfo> GetAllAdvertisment(CommonAuthParam auth, int brandID, int siteID, int sizeID, string categoryID, int offset, int limit)
    {
        ArticleEditorController articleCon = new ArticleEditorController();
        return articleCon.GetAllNotExpiredAdvs(offset, limit, brandID, sizeID, categoryID, siteID);
    }

    [WebMethod]
    public string AdvsGetAllFilterValue(CommonAuthParam auth, int siteID)
    {
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleEditorController articleCon = new ArticleEditorController();
            DataSet ds = articleCon.AdvsGetAllFilterValue(siteID);
            string str = JsonConvert.SerializeObject(ds);
            return str;
        }
        else return null;
    }
    [WebMethod]
    public int DeleteArticleByID(CommonAuthParam auth, int articleID,string roleID)
    {
        if (IsPostAuthenticated(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleEditorController articleCon = new ArticleEditorController();
            return articleCon.DeleteArticleByID(articleID,roleID);
        }
        else
        {
                return -1;
        }
    }
}