<%@ WebService Language="C#" Class="ArticleSetting" %>
using SageFrame.ArticleManagement;
using SageFrame.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Pages;

/// <summary>
/// Summary description for ArticleSetting
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ArticleSetting : AuthenticateService
{

    public ArticleSetting()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public void AddUpdateSetting(CommonAuthParam authParam, string settingValue, int siteID, bool isBlog)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleSettingController controllerObj = new ArticleSettingController();
                controllerObj.AddUpdateSetting(settingValue, siteID, isBlog);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    [WebMethod]
    public List<PageEntity> GetActivePortalPages(CommonAuthParam authParam,int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                PageController controllerObj = new PageController();
                return controllerObj.GetMenuFront(authParam.PortalID, false,siteID);
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
    public List<ArticleSettingInfo> GetArticleSettings(CommonAuthParam authParam, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleSettingController controllerObj = new ArticleSettingController();
                return controllerObj.GetArticleSettings(siteID);
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
    public List<ArticleSettingInfo> GetArticleSettings1(int siteID)
    {
        try
        {
            ArticleSettingController controllerObj = new ArticleSettingController();
            return controllerObj.GetArticleSettings(siteID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
