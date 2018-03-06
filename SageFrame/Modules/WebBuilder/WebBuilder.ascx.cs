using SageFrame.Web;
using System;
using SageFrame.WebBuilder;
using System.Web;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;
using SageFrame.Framework;
using System.Linq;
using SageFrame.WebBuilder.Helper;
//using SageFrame.WebBuilder.Helper;

public partial class Modules_WebBuilder_WebBuilder : BaseAdministrationUserControl
{
    public string settings = string.Empty;
    public bool enableHeader = true;//enable header for webbbuilder and disable for module
    public string tempPageName = "webbuildertemppagename";
    public string componentList = string.Empty;
    public int userModuleID = 0;
    public bool isPreview = false;
    private string underConstruction = "Under Construction";
    private bool isUnderConstruction = false;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            //string applicationName = "News";
            //string pageNames = "dashboard";
            //WebBuilderController objController = new WebBuilderController();
            //BuildDynamicScript objScriptBuilder = new BuildDynamicScript();
            //txtValue.Text = objScriptBuilder.BindExtraScript(objScriptBuilder.BuildInsertSQL(objController.GenerateInsertScript(applicationName)), applicationName);
            //txtValue.Text = objScriptBuilder.BuildInsertSQL(objController.GenerateInsertScriptForPages(pageNames));
            GetComponent();
            LoadExtraJs();
            userModuleID = int.Parse(SageUserModuleID);
            IncludeCss("webBuilderCss",
                "/Modules/WebBuilder/css/preview.css");
            IncludeJs("webbuildercomponentJs", "/Modules/WebBuilder/js/packages.js");
            IncludeJs("webbuildercomponentJs", "/Modules/WebBuilder/js/components.js");
            IncludeJs("webbuilderInitJs", "/Modules/WebBuilder/js/init.js");
            IncludeJs("webbbuilderJsView", "/Modules/WebBuilder/js/WebBuilderView.js"
                , "/js/jquery.validate.js");
            if (enableHeader)
                tempPageName = GetPageSEOName();
            ControllerInoker objCntrlInvoker = new ControllerInoker();
            Dictionary<string, ControllerDetail> objAPIResult = new Dictionary<string, ControllerDetail>();
            if (isPreview)
            {
                objAPIResult = objCntrlInvoker.ViewLoadAPI(tempPageName, GetUrlParameters);
            }
            else
            {
                objAPIResult = objCntrlInvoker.ViewLoadAPIPublished(tempPageName, GetUrlParameters);
            }
            string apiResultString = JsonConvert.SerializeObject(objAPIResult);
            this.Page.ClientScript.RegisterStartupScript(this.GetType(), "StartupViewScript", "var apiResultString=" + apiResultString.ToString() + ";", true);
            ShowData();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void LoadExtraJs()
    {
        LoadPackageJs();
    }
    private void LoadPackageJs()
    {
        try
        {
            string extensionPath = Server.MapPath(@"~\Modules\WebBuilder\js\packages.js");
            if (!File.Exists(extensionPath))
            {
                string fullpath = Server.MapPath(@"~\ContentderPackages\");
                string[] packagesDir = Directory.GetDirectories(fullpath);
                List<string> files = new List<string>();
                foreach (string pacDir in packagesDir)
                {
                    files.AddRange(Directory.GetFiles(pacDir + "\\js\\", "*.js"));
                }
                using (StreamWriter writeToFile = new StreamWriter(extensionPath))
                {
                    string line = string.Empty;
                    if (files.Count > 0)
                    {
                        foreach (var file in files)
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
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void GetComponent()
    {
        string componentPath = Server.MapPath(@"~\Modules\WebBuilder\js\components.js");
        if (!File.Exists(componentPath))
        {
            int userModuleID = 1317;
            WebBuilderController objWebbuilderController = new WebBuilderController();
            List<BuilderComponentJson> objComponentList = objWebbuilderController.GetComponentValue(userModuleID.ToString());
            componentList = JsonConvert.SerializeObject(objComponentList);
            //this.Page.ClientScript.RegisterStartupScript(this.GetType(), "StartupViewScript", "var storedComponent=" + componentList.ToString(), true);
            SaveComponentToJS("var storedComponent=" + componentList.ToString() + ";", componentPath);
        }
    }
    private void SaveComponentToJS(string components, string componentPath)
    {
        try
        {
            using (StreamWriter writeToFile = new StreamWriter(componentPath))
            {
                writeToFile.Write(components);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void ShowData()
    {
        WebBuilderController objWebController = new WebBuilderController();
        WebBuilderInfo objWebInfo = new WebBuilderInfo();
        objWebInfo.Culture = GetCurrentCultureName;
        objWebInfo.PortalID = GetPortalID;
        objWebInfo.UserModuleID = int.Parse(SageUserModuleID);
        objWebInfo.PageName = tempPageName;
        if (isPreview && GetUsername != ApplicationKeys.anonymousUser)
        {
            objWebInfo = objWebController.GetViewDOMByID(objWebInfo);
        }
        else
        {

            objWebInfo = objWebController.GetPublishedViewDOMByID(objWebInfo);
        }
        if (objWebInfo != null)
        {
            string data = string.Empty;
            settings = HttpUtility.HtmlEncode(objWebInfo.Settings);
            if (tempPageName.ToLower() != underConstruction.ToLower())
            {
                if (enableHeader)
                {
                    data += "<div class='editor-site-header'>";
                    if (objWebInfo.Header != null)
                    {
                        data += HttpUtility.HtmlDecode(objWebInfo.Header.Replace("fakeHostURL", GetHostURL()));
                    }
                    else
                    {

                    }
                    data += "</div>";
                }
            }
            data += "<div class='editor-componentWrapper'>";
            if (objWebInfo.ViewDOM != null)
                data += HttpUtility.HtmlDecode(objWebInfo.ViewDOM.Replace("fakeHostURL", GetHostURL()));
            data += "</div>";
            if (tempPageName.ToLower() != underConstruction.ToLower())
            {
                data += "<div class='editor-site-footer'>";
                if (objWebInfo.Footer != null)
                    data += HttpUtility.HtmlDecode(objWebInfo.Footer.Replace("fakeHostURL", GetHostURL()));
                data += "</div>";
            }
            ltrWebBuilderData.Text = data;

        }
    }
    public string GetPageSEOName()
    {
        string pagePath = HttpContext.Current.Request.Url.ToString();
        pagePath = pagePath.Replace(GetHostURL(), "");
        string SEOName = string.Empty;
        SageFrameConfig sfConfig = new SageFrameConfig();
        if (string.IsNullOrEmpty(pagePath))
        {

            SEOName = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.PortalDefaultPage);
        }
        else
        {
            string[] pagePaths = pagePath.Split('/');
            if (pagePaths.Length > 2)
            {
                string preview = pagePaths.Last();
                if (preview.ToLower() == "preview")
                {
                    isPreview = true;
                }
                if (string.IsNullOrEmpty(SEOName))
                {
                    SEOName = pagePaths[1];
                }
                SEOName = SEOName.Replace(SageFrameSettingKeys.PageExtension, "");
            }
            else
            {
                isPreview = false;
                SEOName = pagePaths[pagePaths.Length - 1];
                if (string.IsNullOrEmpty(SEOName))
                {
                    SEOName = pagePaths[pagePaths.Length - 2];
                }
                SEOName = SEOName.Replace(SageFrameSettingKeys.PageExtension, "");
            }

        }
        string portalDefaultPage = sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage);
        if (SEOName.ToLower() == "default" || string.IsNullOrEmpty(SEOName))
        {
            SEOName = portalDefaultPage;
        }
        if (portalDefaultPage.Replace("-", " ").ToLower() == underConstruction.ToLower())
        {
            isUnderConstruction = true;
        }
        if (isUnderConstruction && !isPreview)
        {
            SEOName = underConstruction;
        }
        if (!isPreview && SEOName.Replace("-", " ").ToLower() == underConstruction.ToLower() && !isUnderConstruction)
        {
            SEOName = portalDefaultPage;
        }
        return SEOName.Replace("-", " ").ToLower();
    }

}