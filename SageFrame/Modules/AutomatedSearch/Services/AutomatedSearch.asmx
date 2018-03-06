<%@ WebService Language="C#" CodeBehind="AutomatedSearch.cs" Class="AutomatedSearch" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.AutomatedSearch.Controller;
using SageFrame.AutomatedSearch.Entities;
using SageFrame.Services;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AutomatedSearch : AuthenticateService
{

    public AutomatedSearch()
    {

    }


    [WebMethod]
    public List<LayoutMgrInfo> GetModules(string secureToken, int portalID, string userName, int userModuleID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {

            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            List<LayoutMgrInfo> lstLayoutMgr = automatedSearchController.GetModules(portalID);
            return lstLayoutMgr;
        }
        else return null;
    }


    [WebMethod]
    public List<ColumnInfo> GetColumnListByTableName(string secureToken, int portalID, string userName, int userModuleID, string tableName)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            List<ColumnInfo> lstTables = automatedSearchController.GetColumnListByTableName(tableName);
            return lstTables;
        }
        else
            return null;
    }



    [WebMethod]
    public List<KeyValue> GetTableList(string secureToken, int portalID, string userName, int userModuleID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {

            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            List<KeyValue> lstTables = automatedSearchController.GetBasicTableName();
            return lstTables;
        }
        else
            return null;
    }

    [WebMethod]
    public MessageCode SaveSettings(string secureToken, int portalID, string userName, int userModuleID, AutomatesSearchGatewayInfo GateWaySettings)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {

            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            return automatedSearchController.SaveeSearchConfiguration(GateWaySettings);
        }
        else
            return null;
    }

    [WebMethod]
    public AutomatedSearchInfo GetSearchInformationsForTable(string secureToken, int portalID, string userName, int userModuleID, string tableName)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            return automatedSearchController.GetSearchInformationsForTable(tableName);
        }
        else return null;
    }


    [WebMethod]
    public bool GetConfigurationSettings(string secureToken, int portalID, string userName, int userModuleID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            return automatedSearchController.GetConfigurationSettings();

        }
        else return false;
    }



    [WebMethod]
    public MessageCode UpdateConfigurationSettings(string secureToken, int portalID, string userName, int userModuleID, bool isExtensionLess)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            return automatedSearchController.UpdateConfigurationSettings(isExtensionLess, portalID);
        }
        else return null;
    }

    [WebMethod]
    public List<List<AutomatedSearchDetailInfo>> GetSearchViewDetail(string secureToken, int portalID, string userName, int userModuleID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            return automatedSearchController.GetSearchViewDetail();
        }
        else return null;
    }

    [WebMethod]
    public MessageCode DeleteSettingByID(string secureToken, int portalID, string userName, int userModuleID, int searchConfigurationID)
    {
        if (IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            AutomatedSearchController automatedSearchController = new AutomatedSearchController();
            return automatedSearchController.DeleteSettingByID(searchConfigurationID);
        }
        else return null;
    }

}

