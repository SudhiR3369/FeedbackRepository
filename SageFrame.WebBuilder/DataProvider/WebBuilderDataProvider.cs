using SageFrame.Web.Utilities;
using System.Collections.Generic;
using System;
using System.Data;
using System.Text;

namespace SageFrame.WebBuilder
{
    public class WebBuilderDataProvider
    {
        public int AddUpdate(WebBuilderInfo objWebBuilder)
        {
            int webbuilderID = 0;
            try
            {

                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@WebBuilderID", objWebBuilder.WebBuilderID));
                param.Add(new KeyValuePair<string, object>("@EditDOM", objWebBuilder.EditDOM));
                param.Add(new KeyValuePair<string, object>("@ViewDOM", objWebBuilder.ViewDOM));
                param.Add(new KeyValuePair<string, object>("@PortalID", objWebBuilder.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objWebBuilder.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", objWebBuilder.Culture));
                param.Add(new KeyValuePair<string, object>("@UserName", objWebBuilder.UserName));
                param.Add(new KeyValuePair<string, object>("@Extra", objWebBuilder.Extra));
                param.Add(new KeyValuePair<string, object>("@Settings", objWebBuilder.Settings));
                param.Add(new KeyValuePair<string, object>("@PageName", objWebBuilder.PageName));
                param.Add(new KeyValuePair<string, object>("@Header", objWebBuilder.Header));
                param.Add(new KeyValuePair<string, object>("@HeaderEdit", objWebBuilder.HeaderEdit));
                param.Add(new KeyValuePair<string, object>("@Footer", objWebBuilder.Footer));
                param.Add(new KeyValuePair<string, object>("@FooterEdit", objWebBuilder.FooterEdit));
                param.Add(new KeyValuePair<string, object>("@PackageXML", objWebBuilder.PackageXML));
                SQLHandler sagesql = new SQLHandler();
                webbuilderID = sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_AddUpdate]", param, "@webbuildernewID");
            }
            catch
            {
                throw;
            }
            return webbuilderID;
        }
        public int UpdateSettings(WebBuilderInfo objWebBuilder)
        {
            int webbuilderID = 0;
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", objWebBuilder.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objWebBuilder.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", objWebBuilder.Culture));
                param.Add(new KeyValuePair<string, object>("@Settings", objWebBuilder.Settings));
                param.Add(new KeyValuePair<string, object>("@PageName", objWebBuilder.PageName));
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_UpdateSettings]", param);
            }
            catch
            {
                throw;
            }
            return webbuilderID;
        }
        public int AddUpdatePublished(int webBuilderID)
        {
            int webbuilderID = 0;
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@WebBuilderID", webBuilderID));
                SQLHandler sagesql = new SQLHandler();
                webbuilderID = sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_AddUpdatePublished]", param, "@webbuildernewID");
            }
            catch
            {
                throw;
            }
            return webbuilderID;
        }

        public WebBuilderInfo GetEditDOMByID(WebBuilderInfo objWebBuilder)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", objWebBuilder.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objWebBuilder.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", objWebBuilder.Culture));
                param.Add(new KeyValuePair<string, object>("@PageName", objWebBuilder.PageName));

                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsObject<WebBuilderInfo>("[dbo].[usp_WebBuilder_GetEditDOMByID]", param);
            }
            catch
            {
                throw;
            }
        }

        internal int SaveContactUsData(Contact objContactUs, string userName)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@Email", objContactUs.Email));
                param.Add(new KeyValuePair<string, object>("@FirstName", objContactUs.FirstName));
                param.Add(new KeyValuePair<string, object>("@LastName", objContactUs.LastName));
                param.Add(new KeyValuePair<string, object>("@Message", objContactUs.Message));
                param.Add(new KeyValuePair<string, object>("@Address", objContactUs.Address));
                param.Add(new KeyValuePair<string, object>("@Telephone", objContactUs.Telephone));
                param.Add(new KeyValuePair<string, object>("@Website", objContactUs.Website));
                param.Add(new KeyValuePair<string, object>("@Subject", objContactUs.Subject));
                param.Add(new KeyValuePair<string, object>("@UserName", userName));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_SaveContactUsData]", param, "@output");
            }
            catch
            {
                throw;
            }
        }


        internal List<Contact> GetContactUsData(int offset, int limit, string name, string email)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@offset", offset));
                param.Add(new KeyValuePair<string, object>("@limit", limit));
                param.Add(new KeyValuePair<string, object>("@Name", name));
                param.Add(new KeyValuePair<string, object>("@Email", email));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<Contact>("[dbo].[usp_WebBuilder_GetContactUsData]", param);
            }
            catch
            {
                throw;
            }
        }

        public WebBuilderInfo GetViewDOMByID(WebBuilderInfo objWebBuilder)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", objWebBuilder.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objWebBuilder.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", objWebBuilder.Culture));
                param.Add(new KeyValuePair<string, object>("@PageName", objWebBuilder.PageName));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsObject<WebBuilderInfo>("[dbo].[usp_WebBuilder_GetViewDOMByID]", param);
            }
            catch
            {
                throw;
            }
        }

        public WebBuilderInfo GetPublishedViewDOMByID(WebBuilderInfo objWebBuilder)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", objWebBuilder.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objWebBuilder.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", objWebBuilder.Culture));
                param.Add(new KeyValuePair<string, object>("@PageName", objWebBuilder.PageName));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsObject<WebBuilderInfo>("[dbo].[usp_WebBuilder_GetPublishedViewDOMByID]", param);
            }
            catch
            {
                throw;
            }
        }

        public List<WebBuilderPages> GetPageList(int portalID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<WebBuilderPages>("[dbo].[usp_WebBuilder_GetPages]", param);
            }
            catch
            {
                throw;
            }
        }

        public List<BuilderComponentJson> GetComponentValue(string userModuleID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<BuilderComponentJson>("[dbo].[usp_WebBuilder_ComponentGetList]", param);
            }
            catch
            {
                throw;
            }
        }

        internal List<EasyPackage> ExtractPackageData(List<EasyPackage> objPackage)
        {
            foreach (EasyPackage item in objPackage)
            {
                try
                {
                    List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                    int paramlength = item.ParamkeyAndValue.Count;
                    foreach (KeyValuePair<string, string> par in item.ParamkeyAndValue)
                    {
                        param.Add(new KeyValuePair<string, object>(par.Key, par.Value));
                    }
                    SQLHandler sagesql = new SQLHandler();
                    StringBuilder sb = new StringBuilder();
                    List<PackageResult> LstRst = sagesql.ExecuteAsList<PackageResult>(item.Storeprocedure, param);
                    foreach (PackageResult objinfo in LstRst)
                    {
                        sb.Append(objinfo.Result);
                        sb.Append("\n");
                    }
                    item.Result = sb.ToString();
                }
                catch
                {
                    throw;
                }
            }
            return objPackage;
        }
        internal DataSet GenerateInsertScript(string applicationName)
        {
            DataSet script = new DataSet();
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@applicationName", applicationName));
                SQLHandler sagesql = new SQLHandler();
                script = sagesql.ExecuteAsDataSet("[dbo].[usp_Webbuilder_GetSystemTable]", param);
            }
            catch
            {
                throw;
            }
            return script;
        }
        internal DataSet GenerateInsertScriptForPages(string pageNames)
        {
            DataSet script = new DataSet();
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PageNames", pageNames));
                SQLHandler sagesql = new SQLHandler();
                script = sagesql.ExecuteAsDataSet("[dbo].[usp_Webbuilder_GetSystemTableByPageName]", param);
            }
            catch
            {
                throw;
            }
            return script;
        }

        public int UpdateComponentValue(string componentName, string componentValue, int userModuleID, decimal version, long UniversalComponentID, string type)
        {
            int result = 0;
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@ComponentName", componentName));
                param.Add(new KeyValuePair<string, object>("@ComponentValue", componentValue));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                param.Add(new KeyValuePair<string, object>("@Version", version));
                param.Add(new KeyValuePair<string, object>("@UniversalComponentID", UniversalComponentID));
                param.Add(new KeyValuePair<string, object>("@Type", type));
                SQLHandler sagesql = new SQLHandler();
                result = sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_ComponentInsert]", param, "@output");
            }
            catch
            {
                throw;
            }
            return result;
        }

        public int CheckPage(int portalID, string pageseoName, int pageID)
        {
            int exists = 1;
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                param.Add(new KeyValuePair<string, object>("@PageSEOName", pageseoName));
                param.Add(new KeyValuePair<string, object>("@PageID", pageID));
                SQLHandler sagesql = new SQLHandler();
                exists = sagesql.ExecuteNonQuery("[dbo].[usp_webbuilder_checkPage]", param, "@Exists");
            }
            catch
            {
                throw;
            }
            return exists;
        }

        public void UpdatePageName(string pageName, int portalID, int userModuleID, int webbuilderID, string culture)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PageName", pageName));
                param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                param.Add(new KeyValuePair<string, object>("@WebbuilderID", webbuilderID));
                param.Add(new KeyValuePair<string, object>("@Culture", culture));
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_UpdatePageName]", param);
            }
            catch
            {
                throw;
            }
        }
        public void DeletePage(int portalID, int userModuleID, int pageID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                param.Add(new KeyValuePair<string, object>("@PageID", pageID));
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_Page_delete]", param);
            }
            catch
            {
                throw;
            }
        }

        public List<BuilderComponentJson> ComponentOfflineList()
        {
            try
            {
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<BuilderComponentJson>("[dbo].[usp_WebBuilder_ComponentOfflineGetList]");
            }
            catch
            {
                throw;
            }
        }

        public void CreateSite(WebbuilderSite objWebsite)
        {
            try
            {
                //update webbuilder archive old website  data
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_Site_ArchiveOld]");

                //insert all the pages here

                foreach (Webbuilderpages objPages in objWebsite.PageList)
                {
                    List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                    param.Add(new KeyValuePair<string, object>("@EditDOM", objPages.EditDOM));
                    param.Add(new KeyValuePair<string, object>("@ViewDOM", objPages.ViewDOM));
                    param.Add(new KeyValuePair<string, object>("@PortalID", objWebsite.PortalID));
                    param.Add(new KeyValuePair<string, object>("@UserModuleID", objWebsite.UserModuleID));
                    param.Add(new KeyValuePair<string, object>("@Culture", objWebsite.Culture));
                    param.Add(new KeyValuePair<string, object>("@UserName", objWebsite.UserName));
                    param.Add(new KeyValuePair<string, object>("@Extra", objPages.Extra));
                    param.Add(new KeyValuePair<string, object>("@Settings", objPages.Settings));
                    param.Add(new KeyValuePair<string, object>("@PageName", objPages.PageName));
                    sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_Site_InsertPage]", param);
                }

                //update header

                List<KeyValuePair<string, object>> paramHeader = new List<KeyValuePair<string, object>>();
                paramHeader.Add(new KeyValuePair<string, object>("@WebBuilderID", 0));
                paramHeader.Add(new KeyValuePair<string, object>("@Header", objWebsite.HeaderView));
                paramHeader.Add(new KeyValuePair<string, object>("@HeaderEdit", objWebsite.HeaderEdit));
                paramHeader.Add(new KeyValuePair<string, object>("@UserModuleID", objWebsite.UserModuleID));
                paramHeader.Add(new KeyValuePair<string, object>("@Culture", objWebsite.Culture));
                sagesql.ExecuteNonQuery("[dbo].[usp_WebbUilder_Site_InsertHeader]", paramHeader);


                //update Footer

                paramHeader = new List<KeyValuePair<string, object>>();
                paramHeader.Add(new KeyValuePair<string, object>("@WebBuilderID", 0));
                paramHeader.Add(new KeyValuePair<string, object>("@Footer", objWebsite.FooterView));
                paramHeader.Add(new KeyValuePair<string, object>("@FooterEdit", objWebsite.FooterEdit));
                paramHeader.Add(new KeyValuePair<string, object>("@UserModuleID", objWebsite.UserModuleID));
                paramHeader.Add(new KeyValuePair<string, object>("@Culture", objWebsite.Culture));
                sagesql.ExecuteNonQuery("[dbo].[usp_WebbUilder_Site_InsertFooter]", paramHeader);

                //default + delete unwanted pages

                //update APIInvoke
                sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_Site_DeleteAPI]");
                foreach (ControllerDetail objController in objWebsite.APIInvokeList)
                {
                    List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                    param.Add(new KeyValuePair<string, object>("@Namespaces", objController.Namespaces));
                    param.Add(new KeyValuePair<string, object>("@ClassNames", objController.ClassNames));
                    param.Add(new KeyValuePair<string, object>("@MethodNames", objController.MethodNames));
                    param.Add(new KeyValuePair<string, object>("@Parameters", objController.Parameters));
                    param.Add(new KeyValuePair<string, object>("@ComponentID", objController.ComponentID));
                    param.Add(new KeyValuePair<string, object>("@ComponentName", objController.ComponentName));
                    param.Add(new KeyValuePair<string, object>("@BindMethodName", objController.BindMethodName));
                    param.Add(new KeyValuePair<string, object>("@ErrorMethodName", objController.ErrorMethodName));
                    param.Add(new KeyValuePair<string, object>("@PageName", objController.PageName));
                    param.Add(new KeyValuePair<string, object>("@Type", objController.Type));
                    sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_Site_InsertAPI]", param);
                }
                //usp_WebBuilder_site_updateInstall
                paramHeader = new List<KeyValuePair<string, object>>();
                paramHeader.Add(new KeyValuePair<string, object>("@DefaultPage", objWebsite.DefaultPage));
                sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_site_updateInstall]", paramHeader);

                //Published Site               
                sagesql.ExecuteNonQuery("[dbo].[usp_WebBuilder_site_Published]");
            }
            catch
            {
                throw;
            }
        }

        public WebbuilderSite ExtractSite(int userModuelID, string culture, string hostURL)
        {
            WebbuilderSite objWebbuilder = new WebbuilderSite();
            try
            {
                SQLHandler sagesql = new SQLHandler();
                List<Webbuilderpages> objPageList = new List<Webbuilderpages>();
                List<KeyValuePair<string, object>> paramHeader = new List<KeyValuePair<string, object>>();
                paramHeader.Add(new KeyValuePair<string, object>("@UserModuleID", userModuelID));
                paramHeader.Add(new KeyValuePair<string, object>("@Culturecode", culture));
                paramHeader.Add(new KeyValuePair<string, object>("@HostURL", hostURL));
                objWebbuilder = sagesql.ExecuteAsObject<WebbuilderSite>("[dbo].[usp_WebBuilder_Site_GetPageGeneralDetail]", paramHeader);
                if (objWebbuilder != null)
                {
                    objPageList = sagesql.ExecuteAsList<Webbuilderpages>("[dbo].[usp_WebBuilder_Site_GetPages]", paramHeader);
                    objWebbuilder.PageList = objPageList;
                    List<ControllerDetail> objAPIList = sagesql.ExecuteAsList<ControllerDetail>("[dbo].[usp_WebBUilder_Extract_GetAPI]");
                    objWebbuilder.APIInvokeList = objAPIList;
                }
            }
            catch
            {
                throw;
            }
            return objWebbuilder;
        }

        internal List<ControllerDetail> GetAPIList(string pageName)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PageName", pageName));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<ControllerDetail>("[dbo].[Usp_Webbuilder_GetAPIList]", param);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        internal List<ControllerDetail> GetAPIListPublished(string pageName)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PageName", pageName));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<ControllerDetail>("[dbo].[Usp_Webbuilder_GetAPIListPublished]", param);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        internal KeyValue GetInstalledComponentList()
        {
            try
            {
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsObject<KeyValue>("[dbo].[usp_WebBuilder_Site_GetComponentWithVersion]");
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}