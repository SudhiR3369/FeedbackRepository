<%@ WebService Language="C#" CodeBehind="SocialMarketing.cs" Class="SocialMarketing" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.DigiSphereInvoker.Controller;
using SageFrame.DigiSphereInvoker.Entities;
using SageFrame.ReturnCode.Entities;
using SageFrame.Services;
using System.Configuration;
using System.Web.Configuration;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

[System.Web.Script.Services.ScriptService]
public class SocialMarketing : AuthenticateService
{

    public SocialMarketing()
    { }


    [WebMethod]
    public List<SectorTypeInfo> GetSectorType(string secureToken, int portalID, string userName, int userModuleID)
    {

        //if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        //{
        BusinessSectorController businessController = new BusinessSectorController();
        return businessController.GetSectorTypes();
        //}
        //    else
        //        return null;
    }


    [WebMethod]
    public List<SiteTypeInfo> GetSiteTypes(string secureToken, int portalID, string userName, int userModuleID, int sectorID)
    {
        //if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        //{
        SiteCategoryController siteController = new SiteCategoryController();
        List<SiteTypeInfo> lstSiteType = siteController.GetSiteCategoriesBySectorID(sectorID);
        return lstSiteType;
        //}
        //    else
        //        return null;
    }



    [WebMethod]
    public List<BusinessTypeInfo> GetBusinessType(string secureToken, int portalID, string userName, int userModuleID, int sectorID, int siteCatID)
    {
        //if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        //{
        BusinessTypeController businessTypeController = new BusinessTypeController();
        List<BusinessTypeInfo> lstBusinessTypes = businessTypeController.GetBusinessType(sectorID, siteCatID);
        return lstBusinessTypes;
        //}
        //    else
        //        return null;
    }



    [WebMethod]
    public List<BusinessKeywordInfo> GetBusinessKeyWords(string secureToken, int portalID, string userName, int userModuleID, int sectorID, int siteCatID, int[] businessTypeIDs)
    {
        //if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        //{
        BusinessKeywordController businessKeyWordController = new BusinessKeywordController();
        List<BusinessKeywordInfo> lstBusinessTypes = businessKeyWordController.GetBusinessKeyWords(sectorID, siteCatID, businessTypeIDs);
        return lstBusinessTypes;
        //}
        //    else
        //        return null;
    }

    [WebMethod]
    public List<BusinessKeywordInfo> GetFrontBusinessKeyWords(string secureToken, int portalID, string userName, int userModuleID, int sectorID, int siteCatID, int businessTypeIDs)
    {
        //if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        //{
        BusinessKeywordController businessKeyWordController = new BusinessKeywordController();
        List<BusinessKeywordInfo> lstBusinessTypes = businessKeyWordController.GetBusinessKeyWords(sectorID, siteCatID, new int[] { businessTypeIDs });
        return lstBusinessTypes;
        //}
        //    else
        //        return null;
    }

    [WebMethod]
    public List<BusinessKeywordInfo> GetAvailableKeywords(string secureToken, int portalID, string userName, int userModuleID)
    {
        //if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        //{
        BusinessKeywordController businessKeyWordController = new BusinessKeywordController();
        List<BusinessKeywordInfo> lstAvailalbleKeywords = businessKeyWordController.GetAvailableKeywords();
        return lstAvailalbleKeywords;
        //}
        //    else
        //        return null;
    }

    [WebMethod]
    public KeywordDetailInfo FindByKeywords(string secureToken, int portalID, string userName, int userModuleID, string keywordIDs)
    {
        //if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        //{
        BusinessKeywordController businessKeyWordController = new BusinessKeywordController();
        return businessKeyWordController.FindByKeywords(keywordIDs);
        //}
        //    else
        //        return null;
    }

    [WebMethod]
    public MessageCode SaveConfiguration(string secureToken, int portalID, string userName, int userModuleID, string sectorDetail, string siteCategoryDetail, string[] businessTypesDetail, string[] keywordDetail)
    {
        MessageCode msgCode = new MessageCode();
        try
        {
            ConfigurationController configController = new ConfigurationController();
            msgCode = configController.SaveConfiguration(sectorDetail, siteCategoryDetail, businessTypesDetail, keywordDetail);
            UpdateAppSettingValue("advisionconfigured", "true");
        }
        catch
        {

        }
        return msgCode;
    }
    private static void UpdateAppSettingValue(string key, string value)
    {
        try
        {
            Configuration config = WebConfigurationManager.OpenWebConfiguration("/");
            config.AppSettings.Settings[key].Value = value;
            config.Save(ConfigurationSaveMode.Modified);
        }
        catch (ConfigurationErrorsException)
        {
            //Error//Error
        }
    }
}