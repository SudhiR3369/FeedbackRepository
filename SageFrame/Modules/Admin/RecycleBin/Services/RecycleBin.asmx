<%@ WebService Language="C#" Class="RecycleBin" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.AutomatedSearch.Controller;
using SageFrame.AutomatedSearch.Entities;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RecycleBin : System.Web.Services.WebService
{

    public RecycleBin()
    {

    }


    [WebMethod]
    public List<LayoutMgrInfo> GetModules(int portalID)
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        List<LayoutMgrInfo> lstLayoutMgr = automatedSearchController.GetModules(portalID);
        return lstLayoutMgr;
    }


    [WebMethod]
    public List<ColumnInfo> GetColumnListByTableName(string tableName)
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        List<ColumnInfo> lstTables = automatedSearchController.GetColumnListByTableName(tableName);
        return lstTables;
    }



    [WebMethod]
    public List<KeyValue> GetTableList()
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        List<KeyValue> lstTables = automatedSearchController.GetBasicTableName();
        return lstTables;
    }

    [WebMethod]
    public MessageCode SaveSettings(AutomatesSearchGatewayInfo GateWaySettings)
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        return automatedSearchController.SaveeSearchConfiguration(GateWaySettings);
    }

    [WebMethod]
    public AutomatedSearchInfo GetSearchInformationsForTable(string tableName)
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        return automatedSearchController.GetSearchInformationsForTable(tableName);
    }


    [WebMethod]
    public bool GetConfigurationSettings()
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        return automatedSearchController.GetConfigurationSettings();
    }



    [WebMethod]
    public MessageCode UpdateConfigurationSettings(bool isExtensionLess, int portalID)
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        return automatedSearchController.UpdateConfigurationSettings(isExtensionLess, portalID);
    }

    [WebMethod]
    public List<List<AutomatedSearchDetailInfo>> GetSearchViewDetail()
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        return automatedSearchController.GetSearchViewDetail();
    }

    [WebMethod]
    public MessageCode DeleteSettingByID(int searchConfigurationID)
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        return automatedSearchController.DeleteSettingByID(searchConfigurationID);
    }

}

