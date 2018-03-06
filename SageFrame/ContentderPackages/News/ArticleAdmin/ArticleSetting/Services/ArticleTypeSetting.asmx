<%@ WebService Language="C#" Class="ArticleTypeSetting" %>
using SageFrame.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.ArticleManagement;

/// <summary>
/// Summary description for ArticleTypeSetting
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ArticleTypeSetting : AuthenticateService
{

    public ArticleTypeSetting()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<ArticleTypeInfo> GetAllArticleType(CommonAuthParam authParam, int pageNumber, int pageSize, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleTypeController controllerObj = new ArticleTypeController();
                return controllerObj.GetAllArticleType(pageNumber, pageSize, siteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public int AddUpdateArticleType(CommonAuthParam authParam, int articleTypeID, string articleType, bool isBlog, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleTypeController controllerObj = new ArticleTypeController();
                return controllerObj.AddUpdateArticleType(articleTypeID, articleType, authParam.UserName, isBlog, siteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        else
        {
            return -1;
        }
    }
    [WebMethod]
    public ArticleTypeInfo GetArticleTypeByID(CommonAuthParam authParam, int articleTypeID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleTypeController controllerObj = new ArticleTypeController();
                return controllerObj.GetArticleTypeByID(articleTypeID, siteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public void DeleteArticleTypeByID(CommonAuthParam authParam, int articleTypeID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleTypeController controllerObj = new ArticleTypeController();
                controllerObj.DeleteArticleTypeByID(articleTypeID, siteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}