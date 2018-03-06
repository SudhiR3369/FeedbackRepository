<%@ WebService Language="C#" CodeBehind="AdvisionDetail.cs" Class="AdvisionDetail" %>

using System.Web.Services;
using SageFrame.Services;
using System.Collections.Generic;
using SageFrame.DigiSphereInvoker.Entities;
using SageFrame.DigiSphereInvoker.Controller;
using SageFrame.ReturnCode.Entities;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

[System.Web.Script.Services.ScriptService]
public class AdvisionDetail : AuthenticateService
{

    public AdvisionDetail()
    { }


    [WebMethod]
    public List<AdvisionInfo> GetAdvisionSettings(string secureToken, int portalID, string userName, int userModuleID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            ConfigurationController controller = new ConfigurationController();
            return controller.GetAdvisionSettings();
        }
        else
            return null;
    }



    [WebMethod]
    public List<BusinessKeywordInfo> GetBusinessKeyWords(string secureToken, int portalID, string userName, int userModuleID, int sectorID, int siteCatID, int[] businessTypeIDs)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            BusinessKeywordController businessKeyWordController = new BusinessKeywordController();
            List<BusinessKeywordInfo> lstBusinessTypes = businessKeyWordController.GetBusinessKeyWords(sectorID, siteCatID, businessTypeIDs);
            return lstBusinessTypes;
        }
        else
            return null;
    }



    [WebMethod]
    public MessageCode SaveConfiguration(string secureToken, int portalID, string userName, int userModuleID, string sectorDetail, string siteCategoryDetail, string[] businessTypesDetail, string[] keywordDetail)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            ConfigurationController configController = new ConfigurationController();
            return configController.SaveConfiguration(sectorDetail, siteCategoryDetail, businessTypesDetail, keywordDetail);
        }
        else
            return null;
    }


}

