using Newtonsoft.Json;
using RegisterModule;
using SageFrame.Common;
using SageFrame.FontIconInjector;
using SageFrame.Framework;
using SageFrame.Utilities;
using SageFrame.Web;
using SageFrame.WebBuilder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web;
using System.Xml;

public partial class Modules_WebBuilder_WebbuilderEdit : BaseAdministrationUserControl
{
    #region  "Public variable declarations"
    public bool isDevelopmentMode = true;
    public int userModuleID = 0;
    public string enableHeader = "true";//enable header for webbbuilder and disable for module
    public string tempPageName = "webbuildertemppagename";
    public string pageExtension = string.Empty;
    public string settings = string.Empty;
    public string apiDataCollection = string.Empty;
    public string OnlineStoreURL = string.Empty;
    public string DigiSphereApi = string.Empty;
    public string PortalDefaultPage = string.Empty;
    public string version = string.Empty;
    #endregion
    #region "Private variable declaration"
    private string underConstruction = "Under Construction";
    private bool isUnderConstruction = false;
    SageFrameConfig sageConfig = new SageFrameConfig();
    #endregion
    protected void Page_Load(object sender, EventArgs e)
    {
        #region "Set default variables"
        userModuleID = int.Parse(SageUserModuleID);
        pageExtension = SageFrameSettingKeys.PageExtension;
        OnlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
        DigiSphereApi = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.DigiSphereApi);
        PortalDefaultPage = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.PortalDefaultPage);
        version = Config.GetSetting("SageFrameVersion");
        ltrEditorLogo.ImageUrl = LoadLogoImage("editor");
        underConstruction = "Under Construction";
        isDevelopmentMode = Config.GetSetting("DevelopmentMode") == "true" ? true : false;
        #endregion
        if (enableHeader == "true")
            GetPagename();
        GetComponent();
        LoadExtraJs();
        #region "Load Scripts"
        IncludeJs("webBuilderJs",
            "/Modules/WebBuilder/js/components.js",
            "/Modules/WebBuilder/js/init.js",
            "/Modules/WebBuilder/js/Easylibrary.js",
            "/Modules/WebBuilder/js/colors.js",
            "/Modules/WebBuilder/js/tinyColorPicker.js",
           "/js/SageMediaManagement.js",
           "/js/jquery.validate.js",
            "/Modules/WebBuilder/js/WebBuilder.js",
            "/Modules/WebBuilder/js/Feedback.js",
             "/Modules/WebBuilder/js/packages.js"
            //, "/Modules/WebBuilder/js/CustomWebBuilder.js"
            //, "/Modules/WebBuilder/js/textSetting.js"
            );
        if (isDevelopmentMode)
            IncludeJs("webbuilderdevelopmentjs", "/Modules/WebBuilder/js/extensions.js");
        IncludeCss("webBuilderCss",
            "/Modules/WebBuilder/fonts/styles.css",
            "/Modules/WebBuilder/css/custom.css");
        #endregion
        ShowData();
        ReadFontFamily();
        DetermineUnderConstruction();
    }
    private void DetermineUnderConstruction()
    {
        string portalDefaultPage = sageConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage);
        if (portalDefaultPage.Replace("-", " ").ToLower() == underConstruction.ToLower())
        {
            isUnderConstruction = true;
        }
    }
    private void GetComponent()
    {
        string componentPath = Server.MapPath(@"~\Modules\WebBuilder\js\components.js");
        if (isDevelopmentMode)
        {
            SaveComponentToJS(componentPath);
        }
        else if (!File.Exists(componentPath))
        {
            SaveComponentToJS(componentPath);
        }
    }
    private void SaveComponentToJS(string componentPath)
    {
        try
        {
            string componentList = string.Empty;
            WebBuilderController objWebbuilderController = new WebBuilderController();
            List<BuilderComponentJson> objComponentList = objWebbuilderController.GetComponentValue(userModuleID.ToString());
            componentList = JsonConvert.SerializeObject(objComponentList);
            string components = "var storedComponent=" + componentList.ToString() + ";";
            File.WriteAllText(componentPath, String.Empty);
            using (StreamWriter writeToFile = new StreamWriter(File.Open(componentPath, FileMode.OpenOrCreate)))
            {
                writeToFile.WriteLine(components);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void GetPagename()
    {
        string[] parameters = GetUrlParameters;
        if (parameters != null && parameters.Length > 0)
        {
            tempPageName = parameters[0].Replace("-", " ");
            userModuleID = 1317;
        }
        if (parameters == null || (parameters != null && parameters.Length == 0))
        {
            Response.Redirect(GetHostURL() + "/Webbuilder/" + PortalDefaultPage);
        }
    }
    private void ShowData()
    {
        WebBuilderController objWebController = new WebBuilderController();
        WebBuilderInfo objWebInfo = new WebBuilderInfo();
        objWebInfo.Culture = GetCurrentCultureName;
        objWebInfo.PortalID = GetPortalID;
        objWebInfo.UserModuleID = userModuleID;
        objWebInfo.PageName = tempPageName;
        objWebInfo = objWebController.GetEditDOMByID(objWebInfo);
        if (objWebInfo != null)
        {
            string data = string.Empty;
            settings = HttpUtility.HtmlEncode(objWebInfo.Settings);
            if (enableHeader == "true")
            {
                data = "<div class='editor-site-header clearfix'>";
                if (objWebInfo.HeaderEdit != null)
                    data += HttpUtility.HtmlDecode(objWebInfo.HeaderEdit.Replace("fakeHostURL", GetHostURL()));
                data += "</div>";
            }
            data += "<div class='editor-componentWrapper clearfix'>";
            if (objWebInfo.EditDOM != null)
                data += HttpUtility.HtmlDecode(objWebInfo.EditDOM.Replace("fakeHostURL", GetHostURL()));
            data += "</div>";
            if (tempPageName.ToLower() != underConstruction.ToLower())
            {
                data += "<div class='editor-site-footer'>";
                if (objWebInfo.FooterEdit != null)
                    data += HttpUtility.HtmlDecode(objWebInfo.FooterEdit.Replace("fakeHostURL", GetHostURL()));
                data += "</div>";
            }
            ltrWebBuilderData.Text = data;
        }

        //list all the pages here
        List<WebBuilderPages> objPageList = objWebController.GetPageList(GetPortalID);
        StringBuilder html = new StringBuilder();
        bool pageNotExists = true;
        foreach (WebBuilderPages objPages in objPageList)
        {
            string pageName = objPages.PageName.Replace(" ", "-").Replace("&", "-and-");
            if (tempPageName.Replace(" ", "-").ToLower() == pageName.ToLower())
                pageNotExists = false;
            if (AllowedPage(pageName))
            {
                html.Append("<li data-pageid='");
                html.Append(objPages.PageID);
                html.Append("' data-webbuilderid='");
                html.Append(objPages.WebbuilderID);
                html.Append("'>");
                html.Append("<a href=");
                html.Append(GetHostURL());
                html.Append("/");
                html.Append(pageName);
                html.Append(" class='pagelink'><span class='pageName editor-text-letterSpacing-0' style='font-size: 14px; color: rgb(217, 217, 217);'>");
                html.Append(objPages.PageName);
                html.Append("</span></a>");
                html.Append("</li>");
            }
        }
        if (pageNotExists)
            Response.Redirect(GetHostURL() + "/Webbuilder/" + PortalDefaultPage);
        ltrPageList.Text = html.ToString();
    }
    private bool AllowedPage(string checkPage)
    {
        bool pageAllowed = true;
        string[] notAllowedPages = { "Under Construction", "ourwebbuildernonvisiblepage", "login", "forgot password", "contact us manage" };
        foreach (string page in notAllowedPages)
        {
            if (page.Replace(" ", "-").Replace("&", "-and-").ToLower() == checkPage.ToLower())
                pageAllowed = false;
        }
        return pageAllowed;
    }
    private void ReadFontFamily()
    {
        FontInjectorController objFontIconController = new FontInjectorController();
        ltrFontFamily.Text = objFontIconController.GetFontDOM();
    }
    protected void lnkloginStatus_Click(object sender, EventArgs e)
    {
        SageFrameConfig SageConfig = new SageFrameConfig();
        SageFrameSettingKeys.PageExtension = SageConfig.GetSettingsByKey(SageFrameSettingKeys.SettingPageExtension);
        bool EnableSessionTracker = bool.Parse(SageConfig.GetSettingsByKey(SageFrameSettingKeys.EnableSessionTracker));
        if (EnableSessionTracker)
        {
            SageFrame.Web.SessionLog sLog = new SageFrame.Web.SessionLog();
            sLog.SessionLogEnd(GetPortalID);
        }
        SecurityPolicy objSecurity = new SecurityPolicy();
        HttpCookie authenticateCookie = new HttpCookie(objSecurity.FormsCookieName(GetPortalID));
        authenticateCookie.Expires = DateTime.Now.AddYears(-1);
        string randomCookieValue = GenerateRandomCookieValue();
        HttpContext.Current.Session[SessionKeys.RandomCookieValue] = randomCookieValue;
        Response.Cookies.Add(authenticateCookie);
        SetUserRoles(string.Empty);
        HttpContext.Current.Session[SessionKeys.ModuleCss] = new List<CssScriptInfo>();
        HttpContext.Current.Session[SessionKeys.ModuleJs] = new List<CssScriptInfo>();
        Response.Redirect(GetHostURL() + "/" + tempPageName.Replace(" ", "-"));
    }
    private string GenerateRandomCookieValue()
    {
        Random random = new Random();
        string s = "";
        string[] CapchaValue = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
        for (int i = 0; i < 10; i++)
            s = String.Concat(s, CapchaValue[random.Next(36)]);
        return s;
    }
    public void LoadExtraJs()
    {
        try
        {
            InitializeAPI();
            CombineExtraJsFiles();
            CombineFiles();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void InitializeAPI()
    {
        ControllerInoker objCntrlInvoker = new ControllerInoker();
        Dictionary<string, ControllerDetail> objAPIResult = objCntrlInvoker.EditLoadAPI(tempPageName, GetUrlParameters);
        string apiResultString = JsonConvert.SerializeObject(objAPIResult);
        this.Page.ClientScript.RegisterStartupScript(this.GetType(), "StartupViewScript", "var apiResultString=" + apiResultString.ToString() + ";", true);
    }
    /// <summary>
    /// Combines multiple js files and create a single extension.js file
    /// </summary>
    public void CombineExtraJsFiles()
    {
        try
        {
            string extensionPath = Server.MapPath(@"~\Modules\WebBuilder\js\packages.js");
            if (isDevelopmentMode)
            {
                CreatePackage(extensionPath);
            }
            else if (!File.Exists(extensionPath))
            {
                CreatePackage(extensionPath);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void CreatePackage(string extensionPath)
    {
        string fullpath = Server.MapPath(@"~\ContentderPackages\");
        string[] packagesDir = Directory.GetDirectories(fullpath);
        List<string> files = new List<string>();
        foreach (string pacDir in packagesDir)
        {
            files.AddRange(Directory.GetFiles(pacDir + "\\js\\", "*.js"));
        }
        File.WriteAllText(extensionPath, String.Empty);
        using (StreamWriter writeToFile = new StreamWriter(File.Open(extensionPath, FileMode.OpenOrCreate)))
        {
            string line = string.Empty;
            if (files.Count > 0)
            {
                foreach (string file in files)
                {
                    using (StreamReader readFrom = new StreamReader(file))
                    {
                        while (!readFrom.EndOfStream)
                        {
                            line += readFrom.ReadLine();
                        }
                    }
                }
            }
            else
            {
                line = "";
            }
            writeToFile.WriteLine(line);
        }
    }
    /// <summary>
    /// Combines multiple js files and create a single extension.js file
    /// </summary>
    public void CombineFiles()
    {
        if (isDevelopmentMode)
        {

            try
            {
                string extensionPath = Server.MapPath(@"~\Modules\WebBuilder\js\extensions.js");
                string fullpath = Server.MapPath(@"~\Modules\WebBuilder\js\extensions");
                string[] files = Directory.GetFiles(fullpath, "*.js");
                if (files.Length > 0)
                {
                    File.WriteAllText(extensionPath, String.Empty);
                    using (StreamWriter writeToFile = new StreamWriter(File.Open(extensionPath, FileMode.OpenOrCreate)))
                    {
                        writeToFile.WriteLine("var extendedComps = {");
                        foreach (var file in files)
                        {
                            using (StreamReader readFrom = new StreamReader(file))
                            {
                                while (!readFrom.EndOfStream)
                                {
                                    string line = readFrom.ReadLine();
                                    if (!line.StartsWith("var") && !line.StartsWith("}"))
                                    {
                                        writeToFile.WriteLine(line);
                                    }

                                }
                                writeToFile.Write(',');
                            }

                        }
                        writeToFile.WriteLine("}");
                    }

                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
    }
    public void SetUserRoles(string strRoles)
    {
        Session[SessionKeys.SageUserRoles] = strRoles;
        HttpCookie cookie = HttpContext.Current.Request.Cookies[CookiesKeys.SageUserRolesCookie];
        if (cookie == null)
        {
            cookie = new HttpCookie(CookiesKeys.SageUserRolesCookie);
        }
        cookie[CookiesKeys.SageUserRolesProtected] = strRoles;
        HttpContext.Current.Response.Cookies.Add(cookie);
    }
    protected void btnExtractSite_Click(object sender, EventArgs e)
    {
        //check all the packages in this site
        //Read the extractor sp
        //execute the sp and save to the respective file
        //make zip of the packages 
        //extract site json file
        //create temporary folder and then make zip of all the file

        ///declaring paths
        string destZip = "temptemplatezip";
        string tempPackageFilePath = Server.MapPath(@"~\temptemplatefiles");
        string tempZipFolderPath = Server.MapPath(@"~\" + destZip);
        string fullpath = Server.MapPath(@"~\ContentderPackages");

        //create temporary folder for file collection
        if (Directory.Exists(tempPackageFilePath))
            Directory.Delete(tempPackageFilePath, true);
        Directory.CreateDirectory(tempPackageFilePath);

        WebBuilderController objController = new WebBuilderController();
        if (Directory.Exists(fullpath))
        {
            string[] directories = Directory.GetDirectories(fullpath);
            int directoryLength = directories.Length;
            List<EasyPackage> objPackage = new List<EasyPackage>();
            if (directoryLength > 0)
            {
                for (int i = 0; i < directoryLength; i++)
                {
                    EasyPackage objPack = new EasyPackage();
                    DirectoryInfo dir = new DirectoryInfo(directories[i]);
                    Dictionary<string, string> paramKeysValues = new Dictionary<string, string>();
                    objPack.Name = dir.Name;
                    string xmlPath = directories[i] + "\\package.xml";
                    if (File.Exists(xmlPath))
                    {
                        XmlDocument doc = SageFrame.Templating.xmlparser.XmlHelper.LoadXMLDocument(xmlPath);
                        XmlNode node = doc.SelectSingleNode("package/datasql/sql");
                        if (node != null)
                        {
                            objPack.Sql = node.InnerText;
                        }
                        node = doc.SelectSingleNode("package/datasql/storeprocedure");
                        if (node != null)
                        {
                            objPack.Storeprocedure = node.InnerText;
                        }
                        node = doc.SelectSingleNode("package/datasql/params");
                        if (node != null)
                        {
                            XmlNodeList xnList = doc.SelectNodes("package/datasql/params/param");
                            foreach (XmlNode xn in xnList)
                            {
                                string key = xn["key"].InnerText;
                                string value = xn["value"].InnerText;
                                if (key.Trim() != string.Empty)
                                {
                                    paramKeysValues.Add(key.Trim(), value.Trim());
                                }
                            }
                        }
                        objPack.ParamkeyAndValue = paramKeysValues;
                        objPackage.Add(objPack);
                    }
                }
                objPackage = objController.ExtractPackageData(objPackage);

                //writing the data in respective sql file
                foreach (EasyPackage item in objPackage)
                {
                    string spSavePath = Server.MapPath(@"~\ContentderPackages\" + item.Name + "\\sql\\" + item.Sql + ".sql");
                    if (!File.Exists(spSavePath))
                        File.Create(spSavePath);
                    using (StreamWriter writetext = new StreamWriter(spSavePath))
                    {
                        writetext.WriteLine(item.Result);
                    }
                }

                //copy packages to temp folder
                DirectoryInfo tempDir = new DirectoryInfo(tempPackageFilePath + "\\ContentderPackages");
                DirectoryInfo packageDir = new DirectoryInfo(fullpath);
                IOHelper.CopyDirectory(packageDir, tempDir);
            }
        }
        //read json from database for site
        WebbuilderSite objWebsite = new WebbuilderSite();
        objWebsite = objController.ExtractSite(userModuleID, GetCurrentCulture(), GetHostURL());
        objWebsite.Culture = GetCurrentCulture();
        string jsonFile = JsonConvert.SerializeObject(objWebsite);

        //write extracted site json to file and save inside temporary folder
        string saveJson = tempPackageFilePath + "\\theme.json";
        using (StreamWriter writetext = new StreamWriter(saveJson))
        {
            writetext.WriteLine(jsonFile);
        }
        //Create zip folder
        if (!Directory.Exists(tempZipFolderPath))
            Directory.CreateDirectory(tempZipFolderPath);

        //zip files inside the zip folder
        tempPackageFilePath += "\\";
        tempZipFolderPath += "\\Contentder.zip";
        destZip += "/Contentder.zip";
        ZipUtil.ZipFiles(tempPackageFilePath, tempZipFolderPath, string.Empty);
        if (destZip != string.Empty)
        {
            //download zip
            //Response.Redirect(GetHostURL() + "/" + destZip);
            ////delete the temporary package and zip folder
            //IOHelper.DeleteDirectory(tempPackageFilePath);
            //IOHelper.DeleteDirectory(tempZipFolderPath);
            Response.Clear();
            Response.AddHeader("Content-Disposition", "attachment; filename=Contentder.zip");
            Response.ContentType = "application/x-zip-compressed";
            Response.WriteFile(tempZipFolderPath);
            IOHelper.DeleteDirectory(tempPackageFilePath);
            IOHelper.DeleteDirectory(tempZipFolderPath);
            Response.Flush();
            Response.End();
        }
    }
}