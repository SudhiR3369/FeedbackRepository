using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using SageFrame.Web;
using System.Web.Hosting;
using System.Threading;
using System.Xml;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Collections;
using System.Net;
using Newtonsoft.Json;
using RegisterModule;
using System.Web;
using SageFrame.Utilities;
using System.ComponentModel;
using SageFrame.Dashboard;
using SageFrame.Common;

namespace SageFrame.WebBuilder
{
    public class ComponentUploadHandler
    {
        string savePath = string.Empty;
        bool checkFordependency = false;
        bool isLoopDepemdencyCheck = false;
        public int UpdateComponentBulk(BuilderComponent component, bool checkFordependencies)
        {
            int result = 0;
            string easyVersion = string.Empty;
            checkFordependency = checkFordependencies;
            isLoopDepemdencyCheck = true;
            result = UpdateComponentFiles(component);
            return result;
        }
        public BuilderComponent GetComponentByIDAndVersion(long universalComponentID, decimal version)
        {
            BuilderComponent component = new BuilderComponent();
            using (WebClient wc = new WebClient())
            {
                SageFrameConfig sageConfig = new SageFrameConfig();
                string onlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
                string apiUrl = onlineStoreURL + "/GetComponentByIDAndVersion";
                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.QueryString.Add("componentID", universalComponentID.ToString());
                wc.QueryString.Add("version", version.ToString());
                wc.Encoding = Encoding.UTF8;
                var resultData = wc.DownloadString(apiUrl);
                dynamic dyn = JsonConvert.DeserializeObject(resultData);
                if (dyn != null)
                {
                    string output = JsonConvert.SerializeObject(dyn.d);
                    component = JsonConvert.DeserializeObject<BuilderComponent>(output);
                }
            }
            return component;
        }
        BuilderComponent downLoadcomponent = new BuilderComponent();
        private int UpdateComponentFiles(BuilderComponent component)
        {
            int result = 0;
           
            string filePath = component.FilePath.Trim();
            downLoadcomponent = component;
            if (filePath != string.Empty && filePath != null)
            {                
                GetOnlineComponent(component);
                result = 1;
                //if (result > 0)
                //{
                //    //result = objController.UpdateComponentValue(component.ComponentName, component.ComponentValue, component.UserModuleID, component.Version, component.UniversalComponentID, component.Type);
                //    if (result > 0 && filePath != string.Empty && filePath != null)
                //    {
                //        result = 3;
                //    }
                //}
            }
            else if (filePath == string.Empty || filePath == null)
            {
                result = UpdateComponentValue(component.ComponentName, component.ComponentValue, component.UserModuleID, component.Version, component.UniversalComponentID, component.Type);
                if(isLoopDepemdencyCheck)
                ComponentDependencies();
            }
            return result;
        }

        public int UpdateComponentValue(string componentName, string componentValue, int userModuleID, decimal version, long UniversalComponentID, string type)
        {
            WebBuilderController objController = new WebBuilderController();
            return objController.UpdateComponentValue(componentName, componentValue, userModuleID, version, UniversalComponentID, type);
            //WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            //return objDataProvider.UpdateComponentValue(componentName, componentValue, userModuleID, version, UniversalComponentID, type);
        }
        public void ComponentDependencies()
        {
            if (checkFordependency)
            {
                string depencies = downLoadcomponent.Dependencies.Trim();
                List<long> dependenciesList = new List<long>();
                int userModuleID = downLoadcomponent.UserModuleID;
                if (depencies != string.Empty && depencies != null)
                {
                    dependenciesList = depencies.Split(',').Select(long.Parse).ToList();
                }
                if (dependenciesList.Count > 0)
                {
                    foreach (long id in dependenciesList)
                    {
                        BuilderComponent deComponent = new BuilderComponent();
                        deComponent = GetComponentByIDAndVersion(id, 0);
                        deComponent.UserModuleID = userModuleID;
                        isLoopDepemdencyCheck = false;
                        UpdateComponentFiles(deComponent);
                    }
                }
            }

        }
        string successComponentName = string.Empty;
        string componentDownloadPath = string.Empty;
        public void GetOnlineComponent(BuilderComponent component)
        {
            SageFrameConfig sageConfig = new SageFrameConfig();
            OnlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
            string apiUrl = OnlineStoreURL + "/GetOnlineComponentPackage";
            ComponentPackage tempThemeDetail = new ComponentPackage();
            using (WebClient wc = new WebClient())
            {
                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.QueryString.Add("componentID", component.UniversalComponentID.ToString());
                wc.Encoding = Encoding.UTF8;
                var resultData = wc.DownloadString(apiUrl);
                dynamic dyn = JsonConvert.DeserializeObject(resultData);
                if (dyn != null)
                {
                    tempThemeDetail = JsonConvert.DeserializeObject<ComponentPackage>(dyn.d.Value);
                }
                string themePackageFilePath = HttpContext.Current.Server.MapPath(@"\downloadmyComponent");
                if (!Directory.Exists(themePackageFilePath))
                    Directory.CreateDirectory(themePackageFilePath);
                successComponentName = tempThemeDetail.FileName;
                componentDownloadPath = themePackageFilePath + "\\component.zip";
                string sendHostURl = OnlineStoreURL.Replace("Sage_Services/OnlineStore.asmx", "");
                tempThemeDetail.HostUrl = sendHostURl + tempThemeDetail.FolderName + "/" + tempThemeDetail.FileName;
                DownloadComponentZip(tempThemeDetail.HostUrl, componentDownloadPath);
            }
        }
        public void DownloadComponentZip(string url, string savetempZIP)
        {
            using (System.Net.WebClient wc = new System.Net.WebClient())
            {
                wc.DownloadFileCompleted += DownloadComponentCompleted;
                wc.DownloadFileAsync(new Uri(url), savetempZIP);
            }
        }
        private void DownloadComponentCompleted(object sender, AsyncCompletedEventArgs e)
        {
            DownloadComponentSuccess();
        }
        private void DownloadComponentSuccess()
        {
            string[] args = new string[1];
            args[0] = successComponentName;
            string service = "OnlineStore";
            string method = "ComponentDownloadSuccess";
            try
            {
                WebServiceInvoker invoker = new WebServiceInvoker(new Uri(OnlineStoreURL));
                invoker.InvokeMethod<string>(service, method, args);
              //  string tempFolder = HostingEnvironment.ApplicationPhysicalPath + "unZipComponentInstall";
                string tempFolder = HttpContext.Current.Server.MapPath(@"~\unZipComponentInstall");
                UnZipFiles(componentDownloadPath, tempFolder);
                WebBuilderController objController = new WebBuilderController();
                objController.UpdateComponentValue(downLoadcomponent.ComponentName, downLoadcomponent.ComponentValue, downLoadcomponent.UserModuleID, downLoadcomponent.Version, downLoadcomponent.UniversalComponentID, downLoadcomponent.Type);
                if(isLoopDepemdencyCheck)
                ComponentDependencies();
            }
            catch (Exception ex)
            {
                //ProcessException(ex);
            }
        }
        //private int DownLoadComFile(string filePath)
        //{
        //    int result = 0;
        //    try
        //    {
        //        string fileName = string.Empty;
        //        fileName = System.IO.Path.GetFileName(filePath);
        //        string tempFolder = HostingEnvironment.ApplicationPhysicalPath + "ComponentInstall";
        //        savePath = tempFolder + "\\" + fileName;
        //        if (!Directory.Exists(tempFolder))
        //            Directory.CreateDirectory(tempFolder);
        //        WebClient client = new WebClient();
        //        client.DownloadFileCompleted += client_DownloadFileCompleted;
        //        client.DownloadFileAsync(new Uri(filePath), savePath);
        //        result = 1;

        //    }
        //    catch (Exception ex)
        //    {
        //        result = -1;
        //    }
        //    return result;
        //}
        void client_DownloadFileCompleted(object sender, AsyncCompletedEventArgs e)
        {
            if (savePath.Trim() != string.Empty)
            {
                string tempFolder = HostingEnvironment.ApplicationPhysicalPath + "unZipComponentInstall";
                UnZipFiles(savePath, tempFolder);
            }
        }
        private void UnZipFiles(string filePath, string outputFolder)
        {
            if (!Directory.Exists(outputFolder))
                Directory.CreateDirectory(outputFolder);
            string extractedPath = string.Empty;
            ZipUtil.UnZipFiles(filePath, outputFolder, ref extractedPath, SageFrame.Common.RegisterModule.Common.Password, true);
            ProceedFiles(outputFolder);
            Directory.Delete(extractedPath, true);
        }
        public void ReplaceTextAndRunSQLScript(string fileName, string word, string replacement, string conn)
        {
            using (StreamReader reader = new StreamReader(fileName, System.Text.Encoding.ASCII))
            {

                string input = reader.ReadToEnd();
                string output = input.Replace(word, replacement);
                SqlConnection sqlcon = new SqlConnection(conn);
                sqlcon.Open();
                SqlCommand sqlcmd = new SqlCommand();
                sqlcmd.Connection = sqlcon;
                sqlcmd.CommandType = CommandType.Text;
                string script = output;
                try
                {
                    ExecuteLongSql(sqlcon, script);

                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    reader.Close();
                    sqlcon.Close();
                }
            }
        }
        public static void RunGivenSQLScript(string scriptFile, string conn)
        {
            SqlConnection sqlcon = new SqlConnection(conn);
            sqlcon.Open();
            SqlCommand sqlcmd = new SqlCommand();
            sqlcmd.Connection = sqlcon;
            sqlcmd.CommandType = CommandType.Text;
            StreamReader reader = null;
            reader = new StreamReader(scriptFile, System.Text.Encoding.ASCII);
            string script = reader.ReadToEnd();
            try
            {
                ExecuteLongSql(sqlcon, script);

            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                reader.Close();
                sqlcon.Close();
            }

        }
        private static void ExecuteLongSql(SqlConnection connection, string Script)
        {
            string sql = "";
            sql = Script;
            Regex regex = new Regex("^GO\n", RegexOptions.IgnoreCase | RegexOptions.Multiline);
            string[] lines = regex.Split(sql);
            SqlTransaction transaction = connection.BeginTransaction();
            using (SqlCommand cmd = connection.CreateCommand())
            {
                cmd.Connection = connection;
                cmd.Transaction = transaction;
                foreach (string line in lines)
                {

                    if (line.Length > 0)
                    {
                        cmd.CommandText = line;
                        cmd.CommandType = CommandType.Text;
                        try
                        {
                            cmd.ExecuteNonQuery();
                        }
                        catch
                        {
                            transaction.Rollback();
                            throw;
                        }
                    }
                }
            }
            transaction.Commit();
        }

        #region "extract template, run sql"
        public void GetOnlineTheme(int themeID, int portalID, int userModuleID, string userName, string culture)
        {
            themeID_ = themeID;
            portalID_ = portalID;
            userModuleID_ = userModuleID;
            userName_ = userName;
            culture_ = culture;
            SageFrameConfig sageConfig = new SageFrameConfig();
            OnlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
            decimal easyVersion = 0;
            decimal.TryParse(Config.GetSetting("SageFrameVersion"), out easyVersion);
            string apiUrl = OnlineStoreURL + "/GetOnlineThemePackage";
            ComponentPackage tempThemeDetail = new ComponentPackage();
            using (WebClient wc = new WebClient())
            {
                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.QueryString.Add("themeID", themeID.ToString());
                wc.Encoding = Encoding.UTF8;
                var resultData = wc.DownloadString(apiUrl);
                dynamic dyn = JsonConvert.DeserializeObject(resultData);
                if (dyn != null)
                {
                    tempThemeDetail = JsonConvert.DeserializeObject<ComponentPackage>(dyn.d.Value);
                }
                string themePackageFilePath = HttpContext.Current.Server.MapPath(@"\downloadmyfiles");
                templateZipPath = themePackageFilePath;
                if (!Directory.Exists(themePackageFilePath))
                    Directory.CreateDirectory(themePackageFilePath);
                successFileName = tempThemeDetail.FileName;
                string sendHostURl = OnlineStoreURL.Replace("Sage_Services/OnlineStore.asmx", "");
                tempThemeDetail.HostUrl = sendHostURl + tempThemeDetail.FolderName + "/" + tempThemeDetail.FileName;
                DownloadThemeZip(tempThemeDetail.HostUrl, themePackageFilePath + "\\theme.zip");
            }
        }

        private string successFileName = string.Empty;
        private string templateZipPath = string.Empty;
        private string savetempZIPPath = string.Empty;
        private string OnlineStoreURL = string.Empty;
        private int themeID_ = 0;
        private int portalID_ = 0;
        private int userModuleID_ = 0;
        private string userName_ = string.Empty;
        private string culture_ = string.Empty;

        public void DownloadThemeZip(string url, string savetempZIP)
        {
            using (System.Net.WebClient wc = new System.Net.WebClient())
            {
                wc.DownloadFileCompleted += DownloadThemeCompleted;
                wc.DownloadFileAsync(new Uri(url), savetempZIP);
                savetempZIPPath = savetempZIP;
            }
        }
        private void DownloadThemeCompleted(object sender, AsyncCompletedEventArgs e)
        {
            DownloadThemeSuccess();
        }
        private void DownloadThemeSuccess()
        {
            string[] args = new string[1];
            args[0] = successFileName;
            string service = "OnlineStore";
            string method = "ThemeDownloadSuccess";
            try
            {
                WebServiceInvoker invoker = new WebServiceInvoker(new Uri(OnlineStoreURL));
                invoker.InvokeMethod<string>(service, method, args);
                UnzipPackage();
            }
            catch (Exception ex)
            {
                //ProcessException(ex);
            }
        }
        private void UnzipPackage()
        {
            //tpe = tempPackageExtract
            string tempPackageExtractPath = HttpContext.Current.Server.MapPath(@"~\tpe");
            if (!Directory.Exists(tempPackageExtractPath))
                Directory.CreateDirectory(tempPackageExtractPath);
            string extractedPath = string.Empty;
            ZipUtil.UnZipFiles(savetempZIPPath, tempPackageExtractPath, ref extractedPath, SageFrame.Common.RegisterModule.Common.Password, true);
            ProceedFiles(tempPackageExtractPath);
            ProcessSite(tempPackageExtractPath);
        }

        private void ProcessSite(string extractedPath)
        {

            //read json file
            string filePath = extractedPath + "\\theme.json";
            string json = string.Empty;
            WebbuilderSite webInfo = new WebbuilderSite();
            using (StreamReader readFrom = new StreamReader(filePath, System.Text.Encoding.ASCII))
            {
                json = readFrom.ReadToEnd();
            }
            if (json != string.Empty)
            {
                webInfo = JsonConvert.DeserializeObject<WebbuilderSite>(json);
            }
            if (webInfo != null)
            {
                UpdateThemeDownloadCount(themeID_);
                WebBuilderController objController = new WebBuilderController();
                webInfo.UserName = userName_;
                webInfo.UserModuleID = userModuleID_;
                webInfo.PortalID = portalID_;
                webInfo.Culture = culture_;
                objController.CreateSite(webInfo);
                KeyValue objKeyValue = objController.GetInstalledComponentList();
                string[] clientComponent = objKeyValue.Value.Split(',');
                string[] siteComponent = webInfo.Components.Split(',');
                List<string> unInstallCompo = new List<string>();
                foreach (string siteCompo in siteComponent)
                {
                    bool exists = false;
                    foreach (string clientCom in clientComponent)
                    {
                        if (clientCom == siteCompo)
                        {
                            exists = true;
                        }
                    }
                    if (!exists)
                        unInstallCompo.Add(siteCompo);
                }
                if (unInstallCompo.Count > 0)
                {
                    using (WebClient wc = new WebClient())
                    {
                        SageFrameConfig sageConfig = new SageFrameConfig();
                        string onlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
                        List<BuilderComponent> objBuildCompo = new List<BuilderComponent>();
                        string componentIDs = string.Join(",", unInstallCompo);
                        var reqparm = new System.Collections.Specialized.NameValueCollection();
                        string resultData = GetOnlineComponents(componentIDs);
                        if (resultData != string.Empty)
                        {
                            objBuildCompo = JsonConvert.DeserializeObject<List<BuilderComponent>>(resultData);
                            foreach (BuilderComponent objBuildCompoitem in objBuildCompo)
                            {
                                objBuildCompoitem.UserModuleID = userModuleID_;
                                UpdateComponentForPage(objBuildCompoitem);
                                ClearUpdateCache();
                            }
                        }
                    }
                }
            }
            Directory.Delete(extractedPath, true);
        }
        private int UpdateComponentForPage(BuilderComponent objComponent)
        {
            BuilderComponent component = new BuilderComponent();
            ComponentUploadHandler objComponentUploadHandler = new ComponentUploadHandler();
            component = objComponentUploadHandler.GetComponentByIDAndVersion(objComponent.UniversalComponentID, objComponent.Version);
            return objComponentUploadHandler.UpdateComponentBulk(component, false);
        }
        private string GetOnlineComponents(string componentIDs)
        {
            string componentList = string.Empty;
            string[] args = new string[1];
            args[0] = componentIDs;
            string service = "OnlineStore";
            string method = "GetOnlineComponentsByIDs";
            try
            {
                WebServiceInvoker invoker = new WebServiceInvoker(new Uri(OnlineStoreURL));
                return componentList = invoker.InvokeMethod<string>(service, method, args);
            }
            catch (Exception ex)
            {
                return componentList = string.Empty;
            }
        }
        private void ClearUpdateCache()
        {
            try
            {
                string componentPath = HttpContext.Current.Server.MapPath(@"~\Modules\WebBuilder\js\components.js");
                File.Delete(componentPath);
                string componentExtra = HttpContext.Current.Server.MapPath(@"~\Modules\WebBuilder\js\packages.js");
                File.Delete(componentExtra);
                HttpRuntime.Cache.Remove(CacheKeys.SageFrameCss);
                HttpRuntime.Cache.Remove(CacheKeys.SageFrameJs);
                HttpRuntime.Cache.Remove(CacheKeys.SageSetting);
                string optimized_path = HttpContext.Current.Server.MapPath(SageFrameConstants.OptimizedResourcePath);
                IOHelper.DeleteDirectoryFiles(optimized_path, ".js,.css");
                if (File.Exists(HttpContext.Current.Server.MapPath(SageFrameConstants.OptimizedCssMap)))
                {
                    XmlHelper.DeleteNodes(HttpContext.Current.Server.MapPath(SageFrameConstants.OptimizedCssMap), "resourcemaps/resourcemap");
                }
                if (File.Exists(HttpContext.Current.Server.MapPath(SageFrameConstants.OptimizedJsMap)))
                {
                    XmlHelper.DeleteNodes(HttpContext.Current.Server.MapPath(SageFrameConstants.OptimizedJsMap), "resourcemap/resourcemap");
                }
            }
            catch { }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="extractedPath"></param>
        private void ProceedFiles(string extractedPath)
        {
            string tempPackageFilePath = extractedPath + "\\ContentderPackages";
            if (Directory.Exists(tempPackageFilePath))
            {
                InstallPackage(tempPackageFilePath);
            }
        }
        public void InstallPackage(string tempPackageFilePath)
        {
            string[] directories = Directory.GetDirectories(tempPackageFilePath);
            int directoryLength = directories.Length;
            for (int i = 0; i < directoryLength; i++)
            {
                PackageInstall(directories[i], tempPackageFilePath);
            }
        }

        private void PackageInstall(string packageDirPath, string tempPackageFilePath)
        {
            EasyPackage objPack = new EasyPackage();
            DirectoryInfo dir = new DirectoryInfo(packageDirPath);
            objPack.Name = dir.Name;
            string xmlPath = packageDirPath + "\\package.xml";
            if (File.Exists(xmlPath))
            {
                XmlDocument doc = SageFrame.Templating.xmlparser.XmlHelper.LoadXMLDocument(xmlPath);
                XmlNode node = doc.SelectSingleNode("package/files");
                if (node != null && node.Attributes["destpath"] != null && node.Attributes["srcpath"] != null)
                {
                    string destFolderPath = node.Attributes["destpath"].Value;
                    string srcFolderPath = node.Attributes["srcpath"].Value;
                    destFolderPath = HttpContext.Current.Server.MapPath(@"~\" + destFolderPath);
                    if (Directory.Exists(destFolderPath))
                        Directory.Delete(destFolderPath, true);
                    while (Directory.Exists(destFolderPath)) Thread.Sleep(1);
                    IOHelper.CopyDirectory(new DirectoryInfo(packageDirPath + "\\" + srcFolderPath), new DirectoryInfo(destFolderPath));
                    //string srcFilPath = tempPackageFilePath + "\\" + objPack.Name;
                    //if (!Directory.Exists(filePath))
                    //    Directory.CreateDirectory(filePath);
                    //XmlNodeList nodeList = doc.SelectNodes("package/files/file");
                    //foreach (XmlNode item in nodeList)
                    //{
                    //    string resFilePath = item.Attributes["path"].Value;
                    //    File.Copy(srcFilPath + "\\" + resFilePath, filePath + "\\" + resFilePath, true);
                    //}
                }

                //get all the dll from zip folder and 
                if (Directory.Exists(packageDirPath + "\\dll"))
                {
                    string[] dlls = Directory.GetFiles(packageDirPath + "\\dll\\", "*.dll");
                    foreach (string dll in dlls)
                    {
                        FileInfo dllInfo = new FileInfo(dll);
                        string destFile = dllInfo.Name;
                        string destDll = HttpContext.Current.Server.MapPath(@"\\bin\\" + destFile);
                        string srcDll = tempPackageFilePath + "\\" + objPack.Name + "\\dll\\" + destFile;
                        File.Copy(srcDll, destDll, true);
                    }
                }
                //Read data sql and replace siteID with current siteID

                XmlNode sqlnode = doc.SelectSingleNode("package/datasql/sql");
                string sqlDateFileName = string.Empty;
                if (sqlnode != null)
                {
                    sqlDateFileName = sqlnode.InnerText.Trim();
                }

                string sqlFilePath = tempPackageFilePath + "\\" + objPack.Name + "\\sql";
                string[] sqlFiles = Directory.GetFiles(sqlFilePath);
                int sqlLength = sqlFiles.Length;
                for (int j = 0; j < sqlLength; j++)
                {
                    string fileName = Path.GetFileNameWithoutExtension(sqlFiles[j]);
                    if (fileName.Trim() == sqlDateFileName)
                    {
                        string replacedata = "%SiteID%";
                        string replacesiteID = "0";
                        ReplaceTextAndRunSQLScript(sqlFiles[j], replacedata, replacesiteID, SystemSetting.SageFrameConnectionString);
                    }
                    //else
                    //{
                    //    RunGivenSQLScript(sqlFiles[j], SystemSetting.SageFrameConnectionString);
                    //}
                }
                //copy files to contentderpackage
                string contenderPackageath = HttpContext.Current.Server.MapPath(@"~\ContentderPackages\");
                if (!Directory.Exists(contenderPackageath))
                {
                    Directory.CreateDirectory(contenderPackageath);
                }
                string fullpath = contenderPackageath + objPack.Name;
                if (Directory.Exists(fullpath))
                    Directory.Delete(fullpath, true);

                //The while loop below and thread sleep is because the delete operation in WINDOWS is delaying 
                //Directory.Delete calls the Windows API function RemoveDirectory. The observed behavior is documented:
                //The RemoveDirectory function marks a directory for deletion on close. Therefore, the directory is not removed until the last handle to the directory is closed.
                while (Directory.Exists(fullpath)) Thread.Sleep(1);
                Directory.Move(packageDirPath, fullpath);
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
        #endregion
    }
}
