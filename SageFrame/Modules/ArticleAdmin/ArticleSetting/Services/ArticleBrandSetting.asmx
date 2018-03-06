<%@ WebService Language="C#" Class="ArticleBrandSetting" %>
using SageFrame.ArticleManagement;
using SageFrame.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;

/// <summary>
/// Summary description for ArticleBrandSetting
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ArticleBrandSetting : AuthenticateService
{

    public ArticleBrandSetting()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int AddUpdateBrand(CommonAuthParam authParam, int brandID, string brandName, string brandIcon, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleBrandController controllerObj = new ArticleBrandController();
                return controllerObj.AddUpdateBrand(brandID, brandName, brandIcon, authParam.UserName, siteID);
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
    public List<BrandInfo> GetAllBrand(CommonAuthParam authParam, int pageNumber, int pageSize, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleBrandController controllerObj = new ArticleBrandController();
                return controllerObj.GetAllBrand(pageNumber, pageSize, siteID);
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
    public BrandInfo GetBrandByID(CommonAuthParam authParam, int brandID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleBrandController controllerObj = new ArticleBrandController();
                return controllerObj.GetBrandByID(brandID, siteID);
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
    public void DeleteBrandByID(CommonAuthParam authParam, int brandID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                ArticleBrandController controllerObj = new ArticleBrandController();
                controllerObj.DeleteBrandByID(brandID, siteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    [WebMethod]
    public void DeleteBrandIcon(CommonAuthParam authParam, string filePath, int brandID, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                if (brandID > 0)
                {
                    ArticleBrandController controllerObj = new ArticleBrandController();
                    controllerObj.DeleteBrandIcon(brandID, siteID);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
