using SageFrame.AutomatedSearch.Entities;
using SageFrame.AutomatedSearch.Utilities;
using SageFrame.Web.Utilities;
using System.Collections.Generic;
using System.Linq;

namespace SageFrame.AutomatedSearch.DataProvider
{
    internal class AutomatedSearchProvider
    {


        internal int DeleteSettingByID(int searchConfigurationID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SearchConfigurationID", searchConfigurationID));

                string sp = "[dbo].[usp_DeleteSearchSettingByConfigID]";

                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteNonQuery(sp, ParaMeterCollection, Helper.OutputParam);
            }
            catch
            {
                return -1;
            }
        }
        internal bool GetConfigurationSettings()
        {
            try
            {
                string sp = "[dbo].[usp_GetSearchQueryStringType]";
                SQLHandler SQLH = new SQLHandler();
                SearchSettingInfo settingInfo = SQLH.ExecuteAsObject<SearchSettingInfo>(sp);
                if (settingInfo == null)
                    return false;
                else
                    return settingInfo.SettingValue == "1" ? true : false;
            }
            catch
            {
                return false;
            }
        }


        internal int UpdateConfigurationSettings(bool queryStringType, int portalID)
        {

            string settingKey = Helper.QueryStringIdentifier;
            string settingValue = (queryStringType) ? "1" : "0";

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SettingKey", settingKey));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SettingValue", settingValue));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));

                string sp = "[dbo].[usp_UpdateSearchSettingQueryStringType]";

                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteNonQuery(sp, ParaMeterCollection, Helper.OutputParam);
            }
            catch
            {
                return -1;
            }

        }


        internal AutomatedSearchInfo GetSearchInformationsForTable(string tableName)
        {

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@TableName", tableName));

                string sp = "[dbo].[usp_GetSearchAutomationSettingsByTableName]";

                SQLHandler sagesql = new SQLHandler();
                System.Data.DataSet ds = sagesql.ExecuteAsDataSet(sp, ParaMeterCollection);

                if (ds != null && ds.Tables.Count > 0)
                {
                    SearchConfigurationInfo searchConfigurationInfo = DataSourceHelper.FillObject<SearchConfigurationInfo>(ds.Tables[0].CreateDataReader());

                    SearchSettingInfo searchSettingInfo = DataSourceHelper.FillObject<SearchSettingInfo>(ds.Tables[1].CreateDataReader());

                    List<SearchMappingInfo> lstMappingInfo = DataSourceHelper.FillCollection<SearchMappingInfo>(ds.Tables[2].CreateDataReader());

                    List<SearchQueryStringInfo> lstQueryStringInfo = DataSourceHelper.FillCollection<SearchQueryStringInfo>(ds.Tables[3].CreateDataReader());

                    AutomatedSearchInfo automatedSearchInfo = new AutomatedSearchInfo();
                    automatedSearchInfo.SearchConfiguration = searchConfigurationInfo;
                    automatedSearchInfo.SearchSettingInfo = searchSettingInfo;
                    automatedSearchInfo.SearchMappings = lstMappingInfo;
                    automatedSearchInfo.SearchQueryInfos = lstQueryStringInfo;

                    return automatedSearchInfo;
                }
                else
                    return null;
            }
            catch
            {
                return null;
            }

        }

        internal int SaveSearchConfiguration(SearchAutomationSettings searchAutomationSettings)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SearchConfigurationID", searchAutomationSettings.SearchConfigurationID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", searchAutomationSettings.PortalID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ModuleName", searchAutomationSettings.ModuleName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@TableName", searchAutomationSettings.TableName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SettingKey", searchAutomationSettings.SettingKey));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SettingValue", searchAutomationSettings.SettingValue));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ColumnNames", searchAutomationSettings.ColumnNames));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ColumnUAS", searchAutomationSettings.ColumnUAS));

                string sp = "[dbo].[usp_AddUpdateSearchAutomationSettings]";

                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteNonQuery(sp, ParaMeterCollection, Helper.OutputParam);
            }
            catch
            {
                return -1;
            }

        }

        internal List<LayoutMgrInfo> GetModules(int PortalID)
        {

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", PortalID));

                string sp = "[dbo].[usp_ModuleManagerGetPortalModules]";

                SQLHandler SQLH = new SQLHandler();
                return SQLH.ExecuteAsList<LayoutMgrInfo>(sp, ParaMeterCollection);
            }
            catch
            {
                return null;
            }

        }


        internal List<KeyValue> GetBasicTableName()
        {
            try
            {
                string sp = "[dbo].[usp_GetAllBasicTableName]";
                SQLHandler SQLH = new SQLHandler();
                return SQLH.ExecuteAsList<KeyValue>(sp);
            }
            catch
            {
                throw;
            }
        }


        internal List<List<AutomatedSearchDetailInfo>> GetSearchViewDetail()
        {
            try
            {
                string sp = "[dbo].[usp_GetAutomatedSearchDetail]";
                SQLHandler SQLH = new SQLHandler();
                List<AutomatedSearchDetailInfo> lstSearchDetail = SQLH.ExecuteAsList<AutomatedSearchDetailInfo>(sp);

                if (lstSearchDetail != null && lstSearchDetail.Count > 0)
                {
                    List<List<AutomatedSearchDetailInfo>> lstGroupInfo = lstSearchDetail
                        .GroupBy(x => x.SearchConfigurationID)
                        .Select(grp => grp.ToList())
                        .ToList();
                    return lstGroupInfo;
                }

                return null;

            }
            catch
            {
                throw;
            }
        }

        internal List<ColumnInfo> GetColumnListByTableName(string tableName)
        {
            try
            {
                string sp = "[dbo].[usp_GetDBColumnsByTableName]";

                List<KeyValuePair<string, object>> paramCollection = new List<KeyValuePair<string, object>>();
                paramCollection.Add(new KeyValuePair<string, object>("@TableName", tableName));
                SQLHandler SQLH = new SQLHandler();
                return SQLH.ExecuteAsList<ColumnInfo>(sp, paramCollection);
            }
            catch
            {
                throw;
            }

        }

    }
}
