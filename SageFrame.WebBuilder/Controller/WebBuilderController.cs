using SageFrame.APIInvoker;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using SageFrame.Dashboard;
using SageFrame.Utilities;
using System.Data;

namespace SageFrame.WebBuilder
{
    public class WebBuilderController
    {
        #region "DataProvider Call"
        public int AddUpdate(WebBuilderInfo obj)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.AddUpdate(obj);
        }
        public int UpdateSettings(WebBuilderInfo obj)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.UpdateSettings(obj);
        }
        public int AddUpdatePublished(int webBuilderID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.AddUpdatePublished(webBuilderID);
        }
        public WebBuilderInfo GetEditDOMByID(WebBuilderInfo obj)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GetEditDOMByID(obj);

        }
        public WebBuilderInfo GetViewDOMByID(WebBuilderInfo obj)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GetViewDOMByID(obj);
        }

        public WebBuilderInfo GetPublishedViewDOMByID(WebBuilderInfo obj)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GetPublishedViewDOMByID(obj);
        }

        public List<WebBuilderPages> GetPageList(int portalID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GetPageList(portalID);
        }

        public List<BuilderComponentJson> GetComponentValue(string userModuleID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GetComponentValue(userModuleID);
        }
        public int UpdateComponentValue(string componentName, string componentValue, int userModuleID, decimal version, long UniversalComponentID, string type)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.UpdateComponentValue(componentName, componentValue, userModuleID, version, UniversalComponentID, type);
        }

        public List<BuilderComponentJson> ComponentOfflineList()
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.ComponentOfflineList();
        }
        public int CheckPage(int portalID, string pageseoName, int pageID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.CheckPage(portalID, pageseoName, pageID);
        }
        public void UpdatePageName(string pageName, int portalID, int userModuleID, int webbuilderID, string culture)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            objDataProvider.UpdatePageName(pageName, portalID, userModuleID, webbuilderID, culture);
        }
        public void DeletePage(int portalID, int userModuleID, int pageID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            objDataProvider.DeletePage(portalID, userModuleID, pageID);
        }
        public void CreateSite(WebbuilderSite objWebsite)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            objDataProvider.CreateSite(objWebsite);
        }
        public WebbuilderSite ExtractSite(int userModuleID, string culture, string hostURL)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.ExtractSite(userModuleID, culture, hostURL);
        }
        public int SaveContactUsData(Contact objContactUs, string userName)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.SaveContactUsData(objContactUs, userName);

        }
        public List<Contact> GetContactUsData(int offset, int limit, string name, string email)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GetContactUsData(offset, limit, name, email);
        }

        public KeyValue GetInstalledComponentList()
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GetInstalledComponentList();
        }

        #endregion

        #region "API CALL for online"

        public object GetOnlineComponents(int offset, int limit, string searchText)
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string onlineStorePath = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
            string version = Config.GetSetting("SageFrameVersion");
            string[] args = new string[4];
            args[0] = offset.ToString();
            args[1] = limit.ToString();
            args[2] = searchText;
            args[3] = version;
            string service = "OnlineStore";
            string method = "GetOnlineComponentsByVersion";
            try
            {
                WebServiceInvoker invoker =
                 new WebServiceInvoker(
                  new Uri(onlineStorePath));
                var data = invoker.InvokeMethod<object>(service, method, args);
                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public object GetOnlineSitesByVersion(int offset, int limit, string searchText, int sectorID, int siteCategoryID, int businessTypeID)
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string onlineStorePath = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
            string version = Config.GetSetting("SageFrameVersion");
            string[] args = new string[7];
            args[0] = offset.ToString();
            args[1] = limit.ToString();
            args[2] = searchText;
            args[3] = sectorID.ToString();
            args[4] = siteCategoryID.ToString();
            args[5] = businessTypeID.ToString();
            args[6] = version;
            string service = "OnlineStore";
            string method = "GetOnlineSitesByVersion";
            try
            {
                WebServiceInvoker invoker =
                 new WebServiceInvoker(
                  new Uri(onlineStorePath));
                var data = invoker.InvokeMethod<object>(service, method, args);
                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public object GetOnlineHelp(int offset, int limit, string searchText)
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string onlineStorePath = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
            string[] args = new string[3];
            args[0] = offset.ToString();
            args[1] = limit.ToString();
            args[2] = searchText;
            string service = "OnlineStore";
            string method = "GetOnlineWebHelp";
            try
            {
                WebServiceInvoker invoker =
                 new WebServiceInvoker(
                  new Uri(onlineStorePath));
                var data = invoker.InvokeMethod<object>(service, method, args);
                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public object GetComponentByIDAndVersion(long componentID, decimal version)
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string onlineStorePath = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
            string[] args = new string[2];
            args[0] = componentID.ToString();
            args[1] = version.ToString();
            string service = "OnlineStore";
            string method = "GetComponentByIDAndVersion";
            try
            {
                WebServiceInvoker invoker =
                 new WebServiceInvoker(
                  new Uri(onlineStorePath));
                var data = invoker.InvokeMethod<BuilderComponent>(service, method, args);
                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        #endregion

        #region "Extract Data for the packages"

        public List<EasyPackage> ExtractPackageData(List<EasyPackage> objPackage)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.ExtractPackageData(objPackage);
        }
        #endregion


        public DataSet GenerateInsertScript(string applicationName)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GenerateInsertScript(applicationName);
        }
        public DataSet GenerateInsertScriptForPages(string pageNames)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return objDataProvider.GenerateInsertScriptForPages(pageNames);
        }
    }
}