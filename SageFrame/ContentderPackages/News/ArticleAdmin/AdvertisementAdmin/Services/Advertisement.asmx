<%@ WebService Language="C#" Class="Advertisement" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Services;
using SageFrame.MediaManagement;
using SageFrame.ArticleManagement;
using SageFrame.Advertisement;
using System.IO;
using System.Drawing;
/// <summary>   
/// Summary description for Advertisement
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Advertisement : AuthenticateService
{
    AdvertisementController advController;
    ArticleController objController;
    public Advertisement()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
        advController = new AdvertisementController();
        objController = new ArticleController();
    }

    [WebMethod]
    public int AddUpdateAdvertisement(AdvertisementInfo advObj, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                return advController.AddUpdateAdvertisement(advObj);
            }
            else
            {
                return 0;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public string SaveDefaultImage(string originalImageName, string base64image, string filePath, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                if (string.IsNullOrEmpty(base64image))
                {
                    return null;
                }
                else
                {
                    var t = base64image.Substring(22);  // remove data:image/png;base64,

                    byte[] bytes = Convert.FromBase64String(t);
                    Image image;
                    using (MemoryStream ms = new MemoryStream(bytes))
                    {
                        image = Image.FromStream(ms);
                    }
                    if (!Directory.Exists(Server.MapPath(filePath)))
                    {
                        Directory.CreateDirectory(Server.MapPath(filePath));
                    }
                    //var randomFileName = Guid.NewGuid().ToString().Substring(0, 4) + ".png";
                    var randomFileName = originalImageName;
                    var fullPath = Path.Combine(Server.MapPath(filePath), randomFileName);
                    image.Save(fullPath, System.Drawing.Imaging.ImageFormat.Png);
                    return randomFileName;
                }

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
    public void DeleteAdvertisement(int SiteID, int AdvsID, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                advController.DeleteAdvertisement(SiteID, AdvsID, commonAuth.UserName);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public List<AdvertisementInfo> GetAllSizes(int SiteID, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                return advController.GetAllSizes(SiteID);
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
    public List<AdvertisementInfo> SearchAllAds(int SiteID, int PageNumber, int PageSize, FilterInfoAd objInfo, CommonAuthParam commonAuth)
    {   
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                return advController.SearchAllAds(SiteID, PageNumber, PageSize, objInfo);
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
    public List<CategoryInfo> GetCategoryAll(int SiteID, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                return objController.GetCategoryAll(SiteID);
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
    public List<AdvertisementInfo> GetDataByAdId(int SiteID, CommonAuthParam commonAuth, int adID)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                return advController.GetDataByAdId(SiteID, adID);
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
    public List<BrandInfo> GetAllBrands(int SiteID, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                return advController.GetAllBrands(SiteID);
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

}

