<%@ WebService Language="C#" Class="QuickDashboardService" %>
using System;
using System.Collections.Generic;
using System.Web.Services;
using SageFrame.Services;
using SageFrame.ArticleManagement;
/// <summary>
/// Summary description for QuickDashboardService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class QuickDashboardService : AuthenticateService
{

    public QuickDashboardService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    [WebMethod]
    public QuickDashboardInfo GetArticleStatistics(CommonAuthParam authParam, string roleID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                QuickDashboardController controllerObj = new QuickDashboardController();
                return controllerObj.GetArticleStatistics(roleID, authParam.UserName, siteID);
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
    public List<QuickDashboardArticleInfo> GetArticleByStateID(CommonAuthParam authParam, string stateID, int pageNumber, int pageSize, string roleID, int siteID, string username)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                QuickDashboardController controllerObj = new QuickDashboardController();
                return controllerObj.GetArticleByStateID(stateID, pageNumber, pageSize, roleID, siteID, username);
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
    public List<QuickDashboardArticleInfo> GetMostCommentedArticle(CommonAuthParam authParam, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                QuickDashboardController controllerObj = new QuickDashboardController();
                return controllerObj.GetMostCommentedArticle(siteID);
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
    public List<QuickDashboardArticleInfo> GetTrendingArticle(CommonAuthParam authParam, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                QuickDashboardController controllerObj = new QuickDashboardController();
                return controllerObj.GetTrendingArticle(siteID);
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
}