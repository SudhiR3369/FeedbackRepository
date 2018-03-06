<%@ WebService Language="C#" Class="WebService" %>
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using SageFrame.WebBuilder;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using SageFrame.Pages;
using SageFrame.Web;
using SageFrame.SEOManagement;
using SageFrame.Common;
using SageFrame.Utilities;
/// <summary>
/// Summary description for ContactUsWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : SageFrame.Services.AuthenticateService
{
    public WebService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void AddUpdate(WebBuilderInfo objWebBuilderInfo)
    {
        if (IsPostAuthenticatedView(objWebBuilderInfo.PortalID, objWebBuilderInfo.UserModuleID, objWebBuilderInfo.UserName, objWebBuilderInfo.SecureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            objController.AddUpdate(objWebBuilderInfo);
        }
    }
    [WebMethod]
    public void UpdateSettings(WebBuilderInfo objWebBuilderInfo)
    {
        if (IsPostAuthenticatedView(objWebBuilderInfo.PortalID, objWebBuilderInfo.UserModuleID, objWebBuilderInfo.UserName, objWebBuilderInfo.SecureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            objController.UpdateSettings(objWebBuilderInfo);
        }
    }
    [WebMethod]
    public int AddUpdatePublished(WebBuilderInfo objWebBuilderInfo)
    {
        int result = 0;
        if (IsPostAuthenticatedView(objWebBuilderInfo.PortalID, objWebBuilderInfo.UserModuleID, objWebBuilderInfo.UserName, objWebBuilderInfo.SecureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            int webbulerId = objController.AddUpdate(objWebBuilderInfo);
            if (webbulerId > 0)
            {
                result = objController.AddUpdatePublished(webbulerId);
            }
        }
        return result;
    }
    [WebMethod]
    public void UpdateComponentForDev(BuilderComponent objBuilComponent)
    {
        if (IsPostAuthenticatedView(objBuilComponent.PortalID, objBuilComponent.UserModuleID, objBuilComponent.UserName, objBuilComponent.SecureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            objController.UpdateComponentValue(objBuilComponent.ComponentName, objBuilComponent.ComponentValue, objBuilComponent.UserModuleID, objBuilComponent.Version, objBuilComponent.UniversalComponentID, objBuilComponent.Type);
            ClearUpdateCache();
        }
    }
    [WebMethod]
    public int UpdateComponent(BuilderComponent objBuilComponent)
    {
        int result = 0;
        if (IsPostAuthenticatedView(objBuilComponent.PortalID, objBuilComponent.UserModuleID, objBuilComponent.UserName, objBuilComponent.SecureToken))
        {
            string easyVersion = string.Empty;
            WebBuilderController objController = new WebBuilderController();
            ComponentUploadHandler objComponentUploadHandler = new ComponentUploadHandler();
            BuilderComponent component = new BuilderComponent();
            component = objComponentUploadHandler.GetComponentByIDAndVersion(objBuilComponent.UniversalComponentID, objBuilComponent.Version);
            if (component != null)
            {
                component.UserModuleID = objBuilComponent.UserModuleID;
                component.PortalID = objBuilComponent.PortalID;
                easyVersion = Config.GetSetting("SageFrameVersion");
                string easycomVersion = component.EasyBuilderVersion.ToString();
                Version currentVersion = new Version(easyVersion);
                Version comEasyVersion = new Version(easycomVersion);
                var comResult = currentVersion.CompareTo(comEasyVersion);
                if (comResult >= 0)
                {
                    result = objComponentUploadHandler.UpdateComponentBulk(component, true);
                }
                else
                {
                    result = -2;
                }
                if (result > 0)
                {
                    ClearUpdateCache();
                }
            }
        }
        else
        {
            result = 100;
        }
        return result;
    }
    private int UpdateComponentForPage(BuilderComponent objComponent)
    {
        BuilderComponent component = new BuilderComponent();
        ComponentUploadHandler objComponentUploadHandler = new ComponentUploadHandler();
        component = objComponentUploadHandler.GetComponentByIDAndVersion(objComponent.UniversalComponentID, objComponent.Version);
        return objComponentUploadHandler.UpdateComponentBulk(component, false);
    }
    [WebMethod]
    public WebbuilderSite ExtractSite(WebbuilderSite objWebsite)
    {
        WebbuilderSite objExtractWebsite = new WebbuilderSite();
        if (IsPostAuthenticatedView(objWebsite.PortalID, objWebsite.UserModuleID, objWebsite.UserName, objWebsite.SecureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            objExtractWebsite = objController.ExtractSite(objWebsite.UserModuleID, objWebsite.Culture, objWebsite.HostURL);
            objExtractWebsite.Culture = objWebsite.Culture;
        }
        return objExtractWebsite;
    }

    [WebMethod]
    public void CreateSite(WebbuilderSite objWebsite)
    {
        if (IsPostAuthenticatedView(objWebsite.PortalID, objWebsite.UserModuleID, objWebsite.UserName, objWebsite.SecureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            objController.CreateSite(objWebsite);
        }
    }

    [WebMethod]
    public void GetSiteList(WebbuilderSite objWebsite)
    {
        if (IsPostAuthenticatedView(objWebsite.PortalID, objWebsite.UserModuleID, objWebsite.UserName, objWebsite.SecureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            objController.CreateSite(objWebsite);
        }
    }

    [WebMethod]
    public void SaveContactUsData(WebbuilderSite objBuilComponent, Contact objContactUs)
    {
        WebBuilderController objController = new WebBuilderController();
        objController.SaveContactUsData(objContactUs, objBuilComponent.UserName);
    }

    [WebMethod]
    public List<Contact> GetContactUsData(int offset, int limit, string name, string email)
    {
        WebBuilderController objController = new WebBuilderController();
        return objController.GetContactUsData(offset, limit, name, email);
    }

    [WebMethod]
    public void GetOnlineThemeFile(int themeID, string componentID, int portalID, int userModuleID, string userName, string secureToken, string culture)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            ComponentUploadHandler objUpload = new ComponentUploadHandler();
            objUpload.GetOnlineTheme(themeID, portalID, userModuleID, userName, culture);
        }
    }

    [WebMethod]
    public void UpdateExistingComponent(string componentIDs, int portalID, int userModuleID, string userName, string secureToken, string version)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            using (WebClient wc = new WebClient())
            {
                SageFrameConfig sageConfig = new SageFrameConfig();
                string onlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
                string apiUrl = onlineStoreURL + "/GetOnlineComponentsByIDs";
                List<BuilderComponent> objBuildCompo = new List<BuilderComponent>();
                apiUrl = onlineStoreURL + "/GetOnlineComponentsByIDs";
                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.QueryString.Add("componentIds", "'" + componentIDs + "'");
                wc.QueryString.Add("version", "'" + componentIDs + "'");
                var resultData = wc.DownloadString(apiUrl);
                dynamic dyn = JsonConvert.DeserializeObject(resultData);
                if (dyn != null)
                {
                    string output = JsonConvert.SerializeObject(dyn.d);
                    objBuildCompo = JsonConvert.DeserializeObject<List<BuilderComponent>>(output);
                    WebBuilderController objController = new WebBuilderController();
                    foreach (BuilderComponent objBuildCompoitem in objBuildCompo)
                    {
                        UpdateComponentForPage(objBuildCompoitem);
                    }
                    ClearUpdateCache();
                }
            }
        }
    }


    private void ClearUpdateCache()
    {
        try
        {
            string componentPath = Server.MapPath(@"~\Modules\WebBuilder\js\components.js");
            File.Delete(componentPath);
            string componentExtra = Server.MapPath(@"~\Modules\WebBuilder\js\packages.js");
            File.Delete(componentExtra);
            HttpRuntime.Cache.Remove(CacheKeys.SageFrameCss);
            HttpRuntime.Cache.Remove(CacheKeys.SageFrameJs);
            HttpRuntime.Cache.Remove(CacheKeys.SageSetting);
            string optimized_path = Server.MapPath(SageFrameConstants.OptimizedResourcePath);
            IOHelper.DeleteDirectoryFiles(optimized_path, ".js,.css");
            if (File.Exists(Server.MapPath(SageFrameConstants.OptimizedCssMap)))
            {
                XmlHelper.DeleteNodes(Server.MapPath(SageFrameConstants.OptimizedCssMap), "resourcemaps/resourcemap");
            }
            if (File.Exists(Server.MapPath(SageFrameConstants.OptimizedJsMap)))
            {
                XmlHelper.DeleteNodes(Server.MapPath(SageFrameConstants.OptimizedJsMap), "resourcemap/resourcemap");
            }
        }
        catch { }
    }

    [WebMethod]
    public void UpdateComponentDownloadCount(int portalID, int userModuleID, string userName, string secureToken, int compoID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            SageFrameConfig sageConfig = new SageFrameConfig();
            string onlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
            string apiUrl = onlineStoreURL + "/UpdateComponentDownloadCount";
            WebbuilderSite webInfo = new WebbuilderSite();
            using (WebClient wc = new WebClient())
            {
                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.QueryString.Add("universalComponentID", compoID.ToString());
                var resultData = wc.DownloadString(apiUrl);
            }
        }
    }

    private void UpdateThemeDownloadCount(int themeID)
    {
        SageFrameConfig sageConfig = new SageFrameConfig();
        string onlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
        string apiUrl = onlineStoreURL + "/UpdateThemeDownloadCount";
        WebbuilderSite webInfo = new WebbuilderSite();
        using (WebClient wc = new WebClient())
        {
            wc.Headers[HttpRequestHeader.ContentType] = "application/json";
            wc.QueryString.Add("themeID", themeID.ToString());
            var resultData = wc.DownloadString(apiUrl);
        }
    }

    [WebMethod]
    public string AddUpdatePages(PageEntity objPageInfo, string Culture, int portalID, string userName, int userModuleID, string secureToken, int webbuilderID, List<SEOMetaValues> objTagValue)
    {
        string pages = string.Empty;
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            int pageID = 0;
            if (CheckPage(portalID, objPageInfo.PageName, objPageInfo.PageID) == 0)
            {
                PageController objPage = new PageController();
                objPageInfo.IconFile = objPageInfo.IconFile == string.Empty || objPageInfo.IconFile == null ? string.Empty : objPageInfo.IconFile;
                pageID = objPage.AddUpdatePages(objPageInfo);
                SEOController seocontroller = new SEOController();
                seocontroller.SaveSEOMetaTag(pageID, objTagValue, portalID, userName);
                if (objPageInfo.PageID == pageID)
                    UpdatePageName(objPageInfo.PageName, portalID, userModuleID, webbuilderID, Culture);

                if (objPageInfo.Mode == "A")
                {
                    webbuilderID = AddWebBuilderPage(portalID, objPageInfo.PageName, userName, userModuleID, Culture);
                }
            }
            pages = pageID + "," + webbuilderID;
        }
        return pages;
    }
    private int AddWebBuilderPage(int portalID, string pageName, string userName, int userModuleID, string Culture)
    {
        WebBuilderController objController = new WebBuilderController();
        WebBuilderInfo objWebBuilderInfo = new WebBuilderInfo();
        objWebBuilderInfo.WebBuilderID = 0;
        objWebBuilderInfo.EditDOM = string.Empty;
        objWebBuilderInfo.ViewDOM = string.Empty;
        objWebBuilderInfo.PortalID = portalID;
        objWebBuilderInfo.UserModuleID = userModuleID;
        objWebBuilderInfo.Culture = Culture;
        objWebBuilderInfo.UserName = userName;
        objWebBuilderInfo.Extra = string.Empty;
        objWebBuilderInfo.Settings = string.Empty;
        objWebBuilderInfo.PageName = pageName;
        objWebBuilderInfo.Header = string.Empty;
        objWebBuilderInfo.HeaderEdit = string.Empty;
        objWebBuilderInfo.Footer = string.Empty;
        objWebBuilderInfo.FooterEdit = string.Empty;
        objWebBuilderInfo.PackageXML = string.Empty;
        return objController.AddUpdate(objWebBuilderInfo);
    }

    private int CheckPage(int portalID, string pageseoName, int pageID)
    {
        WebBuilderController objController = new WebBuilderController();
        return objController.CheckPage(portalID, pageseoName, pageID);
    }

    private void UpdatePageName(string pageName, int portalID, int userModuleID, int webbuilderID, string culture)
    {
        WebBuilderController objController = new WebBuilderController();
        objController.UpdatePageName(pageName, portalID, userModuleID, webbuilderID, culture);
    }

    [WebMethod]
    public void DeleteChildPages(int pageID, string deletedBY, int portalID, string userName, int userModuleID, string secureToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            WebBuilderController objController = new WebBuilderController();
            objController.DeletePage(portalID, userModuleID, pageID);
            PageController obj = new PageController();
            obj.DeleteChildPage(pageID, deletedBY, portalID);
        }
    }

    [WebMethod]
    public object GetOnlineComponentsByVersion(int offset, int limit, string searchText, int portalID, string userName, int userModuleID, string secureToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            try
            {
                WebBuilderController objController = new WebBuilderController();
                return objController.GetOnlineComponents(offset, limit, searchText);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        return null;
    }

    [WebMethod]
    public object GetOnlineSitesByVersion(int offset, int limit, string themeName, int portalID, int sectorID, int siteCategoryID, int businessTypeID, string userName, int userModuleID, string secureToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            try
            {
                WebBuilderController objController = new WebBuilderController();
                return objController.GetOnlineSitesByVersion(offset, limit, themeName, sectorID, siteCategoryID, businessTypeID);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        return null;
    }

    [WebMethod]
    public object GetOnlineWebHelp(int offset, int limit, string searchText, int portalID, string userName, int userModuleID, string secureToken)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            try
            {
                WebBuilderController objController = new WebBuilderController();
                return objController.GetOnlineHelp(offset, limit, searchText);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        return null;
    }
}