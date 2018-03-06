using System.Collections.Generic;
using SageFrame.AutomatedSearch.Entities;
using SageFrame.AutomatedSearch.Utilities;
using SageFrame.AutomatedSearch.DataProvider;

namespace SageFrame.AutomatedSearch.Controller
{
    public class AutomatedSearchController
    {

        /// <summary>
        /// Get List of Modules 
        /// </summary>
        /// <param name="PortalID"></param>
        /// <returns></returns>
        public List<LayoutMgrInfo> GetModules(int PortalID)
        {
            AutomatedSearchProvider automatedSearchProvider = new AutomatedSearchProvider();
            return automatedSearchProvider.GetModules(PortalID);
        }


        /// <summary>
        /// Get the list of involved tables
        /// </summary>
        /// <returns></returns>
        public List<KeyValue> GetBasicTableName()
        {
            AutomatedSearchProvider automatedSearchProvider = new AutomatedSearchProvider();
            return automatedSearchProvider.GetBasicTableName();
        }

        public List<List<AutomatedSearchDetailInfo>> GetSearchViewDetail()
        {
            AutomatedSearchProvider automatedSearchProvider = new AutomatedSearchProvider();
            return automatedSearchProvider.GetSearchViewDetail();

        }
        public List<ColumnInfo> GetColumnListByTableName(string tableName)
        {
            AutomatedSearchProvider automatedSearchProvider = new AutomatedSearchProvider();
            return automatedSearchProvider.GetColumnListByTableName(tableName);
        }


        /// <summary>
        /// Save Automated Search Info [ SearchConfiguration , SearchSetting, SearchMapping, SearchQueryString ]
        /// </summary>
        /// <param name="automatedSearchInfo"></param>
        /// <returns></returns>
        public MessageCode SaveeSearchConfiguration(AutomatesSearchGatewayInfo gateWayInfo)
        {
            if (gateWayInfo != null)
            {
                if (gateWayInfo.ModuleName != null && gateWayInfo.ModuleName.Trim() != string.Empty)
                {
                    string moduleName = gateWayInfo.ModuleName.Trim();
                    string tableName = gateWayInfo.TableName.Trim();

                    if (tableName == null || tableName == string.Empty)
                        return new MessageCode()
                        { Code = Helper.ErrorCode, Message = "Table name was not provided" };

                    string columnNames = string.Empty;
                    if (gateWayInfo.ChoosenColumns != null && gateWayInfo.ChoosenColumns.Length > 0)
                        columnNames = string.Join(",", gateWayInfo.ChoosenColumns);
                    else
                        columnNames = "";


                    string columnUAS = string.Empty;

                    if (gateWayInfo.ColumnAliasHeaders != null &&
                        gateWayInfo.ColumnAliasNames != null &&
                        gateWayInfo.ColumnAliasHeaders.Length > 0 &&
                        gateWayInfo.ColumnAliasNames.Length > 0)
                        for (int i = 0; i < gateWayInfo.ColumnAliasHeaders.Length; i++)
                            columnUAS += $"<Y><X>{gateWayInfo.ColumnAliasHeaders[i]}</X><X>{gateWayInfo.ColumnAliasNames[i]}</X><X>{i}</X></Y>";


                    SearchAutomationSettings searchSettings = new SearchAutomationSettings()
                    {
                        SearchConfigurationID = gateWayInfo.SearchConfigurationID,
                        PortalID = gateWayInfo.PortalID,
                        ModuleName = moduleName,
                        TableName = tableName,
                        SettingKey = Helper.QueryStringIdentifier,
                        SettingValue = (gateWayInfo.IsExtensionLess) ? "1" : "0",
                        ColumnNames = columnNames,
                        ColumnUAS = columnUAS,
                    };

                    AutomatedSearchProvider provider = new AutomatedSearchProvider();
                    int returnValue = provider.SaveSearchConfiguration(searchSettings);

                    if (returnValue != Helper.SuccessCode)
                        return new MessageCode() { Code = Helper.ErrorCode, Message = "Error while updating search settings" };

                    return new MessageCode()
                    { Code = Helper.SuccessCode, Message = "Search Settings were updated" };

                }
                else
                    return new MessageCode()
                    { Code = Helper.ErrorCode, Message = "Module Name could not be found" };
            }
            else
                return new MessageCode()
                { Code = Helper.ErrorCode, Message = "Could not process the request" };

        }


        /// <summary>
        /// Get Search Information For a particular selected table
        /// </summary>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public AutomatedSearchInfo GetSearchInformationsForTable(string tableName)
        {
            AutomatedSearchProvider provider = new AutomatedSearchProvider();
            return provider.GetSearchInformationsForTable(tableName);
        }


        public MessageCode UpdateConfigurationSettings(bool queryStringType, int portalID)
        {

            AutomatedSearchProvider provider = new AutomatedSearchProvider();
            int returnValue = provider.UpdateConfigurationSettings(queryStringType, portalID);

            if (returnValue != Helper.SuccessCode)
                return new MessageCode() { Code = Helper.ErrorCode, Message = "Error while updating search configuration" };

            return new MessageCode()
            { Code = Helper.SuccessCode, Message = "Search Configuration was updated" };

        }

        public MessageCode DeleteSettingByID(int searchConfigurationID)
        {
            AutomatedSearchProvider provider = new AutomatedSearchProvider();
            int returnValue = provider.DeleteSettingByID(searchConfigurationID);
            if (returnValue != Helper.SuccessCode)
                return new MessageCode() { Code = Helper.ErrorCode, Message = "Unable to remove the current settings" };

            return new MessageCode()
            { Code = Helper.SuccessCode, Message = "Settings were removed successfully" };

        }

        public bool GetConfigurationSettings()
        {
            AutomatedSearchProvider provider = new AutomatedSearchProvider();
            return provider.GetConfigurationSettings();

        }

    }
}
