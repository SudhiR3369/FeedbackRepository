<%@ WebService Language="C#" Class="ArticleCategorySetting" %>

using SageFrame.ArticleManagement;
using SageFrame.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;

/// <summary>
/// Summary description for ArticleCategorySetting
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ArticleCategorySetting : AuthenticateService
{

    public ArticleCategorySetting()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int AddUpdateCategory(CommonAuthParam authParam, int categoryID, string categoryName, string icon, bool isBlog, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleCategoryController controllerObj = new ArticleCategoryController();
                return controllerObj.AddUpdateCategory(categoryID, categoryName, icon, authParam.UserName, isBlog, siteID);
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
    public List<CategoryInfo> GetCategoryList(CommonAuthParam authParam, int pageNumber, int pageSize, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleCategoryController controllerObj = new ArticleCategoryController();
                return controllerObj.GetCategoryList(pageNumber, pageSize, siteID);
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
    public CategoryInfo GetCategoryByID(CommonAuthParam authParam, int categoryID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleCategoryController controllerObj = new ArticleCategoryController();
                return controllerObj.GetCategoryByID(categoryID, siteID);
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
    public void DeleteCategory(CommonAuthParam authParam, int categoryID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleCategoryController controllerObj = new ArticleCategoryController();
                controllerObj.DeleteCategory(categoryID, siteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    [WebMethod]
    public void DeleteIcon(CommonAuthParam authParam, string filePath, int catID, int siteID)
    {
        filePath = Server.MapPath(filePath);
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                if (catID != 0)
                {
                    ArticleCategoryController controllerObj = new ArticleCategoryController();
                    controllerObj.DeleteCategoryIcon(catID, siteID);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}