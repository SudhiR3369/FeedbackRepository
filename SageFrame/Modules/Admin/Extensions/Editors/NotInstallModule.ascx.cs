﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Dashboard;
using System.Xml.Linq;
using System.Net;
using System.IO;
using SageFrame.Modules;
using System.Collections;
using SageFrame.SageFrameClass.Services;
using System.Xml;
using SageFrame.Templating;
using SageFrame.ModuleManager;

public partial class Modules_Admin_Extensions_Editors_NotInstallModule : BaseAdministrationUserControl
{
    public string ModuleURl = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        SageFrameConfig sfConfig = new SageFrameConfig();
        ModuleURl = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
        if (!IsPostBack)
        {
            divModuleList.Visible = true;
            divInstallation.Visible = false;
            DeleteTemp();
            CheckInstallModule();
        }
        IncludeCss();
    }

    string moduleList = string.Empty;
    private void CheckInstallModule()
    {
        string pageNames = string.Empty;
        string usermodules = string.Empty;
        string templateName = TemplateName;
        string templatePath = Decide.IsTemplateDefault(templateName.Trim()) ? Utils.GetTemplatePath_Default(templateName) : Utils.GetTemplatePath(templateName);
        string authorDetailPath = string.Format("{0}/themedetails.xml", templatePath);
        if (File.Exists(authorDetailPath))
        {
            XmlDocument doc = SageFrame.Templating.xmlparser.XmlHelper.LoadXMLDocument(authorDetailPath);
            XmlNode node = doc.SelectSingleNode("themedetail/notinstallmoduleList");
            string pageModuleList = string.Empty;
            if (node != null)
            {
                int notinstallModule = 0;
                XmlNodeList nodeListList = doc.GetElementsByTagName("notinstallmodules");
                notinstallModule = nodeListList.Count;
                if (notinstallModule > 0)
                {
                    foreach (XmlNode xn in nodeListList)
                    {
                        moduleList += xn.SelectSingleNode("ModuleName").InnerText + ",";
                    }
                }
            }
        }
        if (moduleList.Length > 0)
        {
            BindOnlineModules(moduleList);
        }
    }

    public void IncludeCss()
    {
        IncludeCss("modulecss", "/Modules/Admin/Extensions/Editors/Css/module.css");
    }
    public string GetOnlineModules(string modules)
    {
        string SageVersion = string.Empty;
        SageFrame.Version.SageFrameVersion app = new SageFrame.Version.SageFrameVersion();
        SageVersion = string.Format("{0}", app.FormatShortVersion(app.Version, true));
        string ModuleList = string.Empty;
        string[] args = new string[1];
        args[0] = modules;
        string service = "OnlineStore";
        string method = "ThemeModules";
        string url = ModuleURl;
        try
        {
            WebServiceInvoker invoker =
              new WebServiceInvoker(new Uri(url));
            return ModuleList = invoker.InvokeMethod<string>(service, method, args);
        }
        catch (Exception ex)
        {
            return ModuleList = string.Empty;
        }
    }
    public void BindOnlineModules(string modules)
    {
        string moduleList = GetOnlineModules(modules);
        moduleList = moduleList.Replace("\\", "/");
        if (moduleList != string.Empty)
        {
            XElement element = LoadXMLElement(moduleList);
            rptrModule.DataSource = from x in element.Descendants("module")
                                    select new
                                    {
                                        ThemeID = x.Element("themeid").Value,
                                        FileName = x.Element("name").Value,
                                        URL = x.Element("zippath").Value,
                                        DemoLink = x.Element("demolink").Value,
                                        Thumb = x.Element("screenshot").Value
                                    };
            rptrModule.DataBind();

        }
        else
        {
            rptrModule.DataSource = string.Empty;
            rptrModule.DataBind();
        }


    }
    //end search

    public XElement LoadXMLElement(string xmlString)
    {
        XElement element = null;
        try
        {
            element = XElement.Parse(xmlString);

        }
        catch
        {
            throw new Exception("Unable to parse string to xmlformat.");
        }
        return element;
    }

    string themeID = string.Empty;
    protected void rptrModule_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName == "DownLoad")
        {

            string[] commandArgs = e.CommandArgument.ToString().Split(',');
            string url = commandArgs[0];
            themeID = commandArgs[1];
            WebClient client = new WebClient();
            try
            {
                string fileName = Path.GetFileName(url);
                hdnFileName.Value = fileName;
                string path = HttpContext.Current.Server.MapPath("~/");
                string temPath = SageFrame.Common.RegisterModule.Common.TemporaryFolder;
                string destPath = Path.Combine(path, temPath);
                if (!Directory.Exists(destPath))
                    Directory.CreateDirectory(destPath);

                client.DownloadFileCompleted += new System.ComponentModel.AsyncCompletedEventHandler(client_DownloadFileCompleted);
                client.DownloadProgressChanged += new DownloadProgressChangedEventHandler(client_DownloadProgressChanged);
                client.DownloadFileAsync(new Uri(url), Server.MapPath(string.Format("~/Install/Temp/{0}", fileName)));
            }
            catch (Exception)
            {
                client.Dispose();
                throw;
            }

        }
    }
    void client_DownloadFileCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
    {
        //progressBar.Visible = false;
        string FileName = hdnFileName.Value;
        divModuleList.Visible = false;
        divInstallation.Visible = true;
        if (!IsModuleExist(Path.GetFileNameWithoutExtension(FileName)))
            NotifyServer();
    }

    private void NotifyServer()
    {
        string TemplateList = string.Empty;
        string[] args = new string[1];
        args[0] = themeID;
        string service = "OnlineStore";
        string method = "UpdateDownloadCount";
        string url = ModuleURl;
        try
        {
            WebServiceInvoker invoker = new WebServiceInvoker(new Uri(url));
            invoker.InvokeMethod<string>(service, method, args);
        }
        catch (Exception)
        {

        }
    }

    void client_DownloadProgressChanged(object sender, DownloadProgressChangedEventArgs e)
    {
        //progressBar.Visible = true;
    }
    protected void rptrModule_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (rptrModule.Items.Count < 1)
        {
            if (e.Item.ItemType == ListItemType.Footer)
            {
                Label lblFooter = (Label)e.Item.FindControl("lblEmptyData");
                lblFooter.Visible = true;
            }
        }
    }
    //Installation process

    public bool IsModuleExist(string moduleName)
    {
        //moduleName = "Horoscope";
        ModuleController objProvider = new ModuleController();
        List<ModuleInfo> lstExistingModules = objProvider.GetAllExistingModule();
        bool exists = lstExistingModules.Exists(
            delegate (ModuleInfo obj)
            {
                bool returntype = false;
                if (obj.ModuleName.ToLower() == moduleName.ToLower())
                {
                    returntype = true;
                }
                return returntype;
            }
            );
        return exists;
    }
    //Installation wizard 
    Installers installhelp = new Installers();
    ModuleInfo module = new ModuleInfo();
    CompositeModule compositeModule = new CompositeModule();
    string Exceptions = string.Empty;
    protected void wizInstall_NextButtonClick(object sender, WizardNavigationEventArgs e)
    {
        int activeIndex = 0;
        if (!IsModuleExist(Path.GetFileNameWithoutExtension(hdnFileName.Value)))
        {
            try
            {
                switch (e.CurrentStepIndex)
                {
                    case 0://Upload Page   
                        string filename = hdnFileName.Value;
                        ArrayList arrColl = installhelp.Step0CheckLogic(filename);
                        int ReturnValue;
                        if (arrColl != null && arrColl.Count > 0)
                        {
                            if ((bool)arrColl[2])
                            {
                                compositeModule = (CompositeModule)arrColl[1];
                                compositeModule = installhelp.fillCompositeModuleInfo(compositeModule);
                                ViewState["CompositeModule"] = compositeModule;
                            }
                            else
                            {
                                module = (ModuleInfo)arrColl[1];
                                ViewState["ModuleInfo"] = module;
                            }

                            ReturnValue = (int)arrColl[0];
                            if (ReturnValue == 1)
                            {
                                BindPackage();
                                activeIndex = 2;
                                break;
                            }
                            else if (ReturnValue == 2)
                            {
                                activeIndex = 1;
                                BindPackage();
                                break;
                            }
                            else if (ReturnValue == 3)
                            {
                                lblLoadMessage.Text = GetSageMessage("Extensions", "ThisPackageIsNotValid");
                                lblLoadMessage.Visible = true;
                                e.Cancel = true;
                                activeIndex = 0;
                                break;
                            }
                            else if (ReturnValue == 4)
                            {
                                lblLoadMessage.Text = GetSageMessage("Extensions", "ThisPackageDoesNotAppearToBeValid");
                                lblLoadMessage.Visible = true;
                                e.Cancel = true;
                                activeIndex = 0;
                                break;
                            }
                            else
                            {
                                lblLoadMessage.Text = GetSageMessage("Extensions", "ThereIsErrorWhileInstallingThisModule");
                                lblLoadMessage.Visible = true;
                                e.Cancel = true;
                                activeIndex = 0;
                                break;
                            }
                        }
                        break;
                    case 1://Warning Page                        
                        if (chkRepairInstall.Checked)
                        {
                            if (ViewState["CompositeModule"] != null)
                            {
                                CompositeModule tmpcompositeModule = (CompositeModule)ViewState["CompositeModule"];
                                this.lblLicense.Text = tmpcompositeModule.License;
                                this.lblReleaseNotes.Text = tmpcompositeModule.ReleaseNotes;
                                foreach (Component component in tmpcompositeModule.Components)
                                {
                                    if (component.IsChecked)
                                    {
                                        bool isexist = installhelp.IsModuleExist(component.Name);
                                        if (isexist)
                                        {
                                            ModuleInfo objModule = installhelp.GetModuleByName(component.Name);
                                            if ((objModule != null))
                                            {
                                                string path = HttpContext.Current.Server.MapPath("~/");
                                                string targetPath = path + SageFrame.Common.RegisterModule.Common.ModuleFolder + '\\' + objModule.FolderName;

                                                objModule.InstalledFolderPath = targetPath;
                                                UninstallModule(objModule, true);
                                            }

                                        }
                                    }
                                }
                            }
                            else
                            {
                                module = (ModuleInfo)ViewState["ModuleInfo"];
                                UninstallModule(module, true);
                            }
                            activeIndex = 2;
                        }
                        else
                        {
                            UninstallModule(module, false);
                            activeIndex = 1;
                        }


                        if (ViewState["CompositeModule"] != null)
                        {
                            compositeModule = (CompositeModule)ViewState["CompositeModule"];

                            activeIndex = 3;
                        }
                        else
                            module = (ModuleInfo)ViewState["ModuleInfo"];
                        break;
                    case 2:
                        Panel pnl = (Panel)this.Step2.FindControl("pnlPackage");
                        GridView grd = (GridView)pnl.FindControl("gdvModule");
                        string existingModules = string.Empty;
                        bool IsErrorFlag = false;
                        foreach (GridViewRow row in grd.Rows)
                        {
                            CheckBox cbInstall = (CheckBox)row.FindControl("cbInstall");
                            if (cbInstall.Checked == true)
                            {
                                Label lbl = (Label)row.FindControl("lblname");
                                if (ViewState["CompositeModule"] != null)
                                {
                                    CompositeModule tmpcompositeModule = (CompositeModule)ViewState["CompositeModule"];
                                    this.lblLicense.Text = tmpcompositeModule.License;
                                    this.lblReleaseNotes.Text = tmpcompositeModule.ReleaseNotes;
                                    foreach (Component component in tmpcompositeModule.Components)
                                    {
                                        if (component.Name.Equals(lbl.Text))
                                        {
                                            component.IsChecked = true;
                                            bool isexist = installhelp.IsModuleExist(component.Name.ToLower());
                                            if (isexist)
                                            {
                                                IsErrorFlag = true;
                                                existingModules += component.Name + ", ";
                                            }
                                            break;
                                        }

                                    }
                                    ViewState["CompositeModule"] = tmpcompositeModule;
                                }
                            }
                            else
                            {
                                Label lbl = (Label)row.FindControl("lblname");
                                if (ViewState["CompositeModule"] != null)
                                {
                                    CompositeModule compositeModule = (CompositeModule)ViewState["CompositeModule"];
                                    foreach (Component component in compositeModule.Components)
                                    {
                                        if (component.Name.Equals(lbl.Text))
                                        {
                                            if (!installhelp.IsModuleExist(component.Name.ToLower()))
                                            {
                                                installhelp.AddAvailableModules(compositeModule.TempFolderPath, component);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (IsErrorFlag)
                        {
                            string existingModuleName = existingModules.Substring(0, existingModules.LastIndexOf(","));
                            ShowMessage("Modules " + existingModuleName + " already exists", "Modules " + existingModuleName + " already exists", "Modules " + existingModuleName + " already exists", SageMessageType.Error);
                            activeIndex = 1;
                            BindPackage();
                            IsErrorFlag = false;
                            break;
                        }
                        activeIndex = 3;
                        break;
                    case 3:
                        activeIndex = 4;
                        break;
                    case 4://Accept Terms
                        if (chkAcceptLicense.Checked)
                        {
                            if (ViewState["CompositeModule"] != null)
                            {
                                ModuleInfo moduleInfo = null;
                                compositeModule = (CompositeModule)ViewState["CompositeModule"];
                                bool confirmationFlag = true;
                                foreach (Component component in compositeModule.Components)
                                {
                                    if (component.IsChecked)
                                    {
                                        ArrayList list = installhelp.Step0CheckLogic(component.ZipFile, compositeModule.TempFolderPath);
                                        moduleInfo = (ModuleInfo)list[1];
                                        installhelp.fillModuleInfo(moduleInfo);
                                        moduleInfo = installhelp.InstallPackage(moduleInfo);
                                        AssignModuletoPage(module);
                                        if (moduleInfo.ModuleID < 0)
                                        {
                                            confirmationFlag = false;
                                            InstallConfirmation(moduleInfo, ref activeIndex);
                                        }
                                    }
                                }
                                if (confirmationFlag && moduleInfo != null)
                                {
                                    InstallConfirmation(moduleInfo, ref activeIndex);
                                }
                            }
                            else if ((ModuleInfo)ViewState["ModuleInfo"] != null)
                            {
                                module = (ModuleInfo)ViewState["ModuleInfo"];
                                module = installhelp.InstallPackage(module);
                                AssignModuletoPage(module);
                                InstallConfirmation(module, ref activeIndex);
                            }
                            activeIndex = 5;
                        }
                        else
                        {
                            lblAcceptMessage.Text = GetSageMessage("Extensions", "AcceptThePackageLicenseAgreementFirst");
                            e.Cancel = true;
                            activeIndex = 4;
                        }
                        break;
                }
                wizInstall.ActiveStepIndex = activeIndex;
            }

            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        else
        {
            lblLoadMessage.Text = GetSageMessage("Extensions", "ModuleAlreadyInstall");
            lblLoadMessage.Visible = true;
            e.Cancel = true;
            activeIndex = 0;

            string downloadpath = Server.MapPath(string.Format("~/Install/Temp/{0}", hdnFileName.Value));
            if (File.Exists(downloadpath))
                File.Delete(downloadpath);

        }
    }

    private void AssignModuletoPage(ModuleInfo moduleinfo_)
    {
        if (moduleinfo_.ModuleDefID > 0)
        {
            UserModuleInfo objModuleInfo = GetModuleInfo(moduleinfo_);
            objModuleInfo.UserModuleID = 0;
            objModuleInfo.ModuleDefID = moduleinfo_.ModuleDefID;
            SageFrame.ModuleManager.Controller.ModuleController.AddUserModule(objModuleInfo);
        }
    }

    private UserModuleInfo GetModuleInfo(ModuleInfo objModuleInfo)
    {
        UserModuleInfo objModuleInfo_ = new UserModuleInfo();
        string pageNames = string.Empty;
        string usermodules = string.Empty;
        string templateName = TemplateName;
        string templatePath = Decide.IsTemplateDefault(templateName.Trim()) ? Utils.GetTemplatePath_Default(templateName) : Utils.GetTemplatePath(templateName);
        string authorDetailPath = string.Format("{0}/themedetails.xml", templatePath);
        if (File.Exists(authorDetailPath))
        {
            XmlDocument doc = SageFrame.Templating.xmlparser.XmlHelper.LoadXMLDocument(authorDetailPath);
            XmlNode node = doc.SelectSingleNode("themedetail/notinstallmoduleList");
            string pageModuleList = string.Empty;
            if (node != null)
            {
                int notinstallModule = 0;
                XmlNodeList nodeListList = doc.GetElementsByTagName("notinstallmodules");
                notinstallModule = nodeListList.Count;
                if (notinstallModule > 0)
                {
                    foreach (XmlNode xn in nodeListList)
                    {
                        XmlNode newNode = xn.SelectSingleNode("ModuleName");
                        if (newNode != null)
                        {
                            if (newNode.InnerText == objModuleInfo.ModuleName)
                            {
                                newNode = xn.SelectSingleNode("UserModuleTitle");
                                if (newNode != null)
                                {
                                    objModuleInfo_.UserModuleTitle = newNode.InnerText;
                                }
                                else
                                {
                                    objModuleInfo_.UserModuleTitle = string.Empty;
                                }
                                newNode = xn.SelectSingleNode("AllPages");
                                if (newNode != null)
                                {
                                    bool allpages = false;
                                    bool.TryParse(newNode.InnerText, out allpages);
                                    objModuleInfo_.AllPages = allpages;
                                }
                                else
                                {
                                    objModuleInfo_.AllPages = false;
                                }
                                newNode = xn.SelectSingleNode("ShowInPages");
                                if (newNode != null)
                                {
                                   
                                    objModuleInfo_.ShowInPages = newNode.InnerText;
                                }
                                else
                                {
                                    objModuleInfo_.ShowInPages = string.Empty;
                                }
                                objModuleInfo_.InheritViewPermissions = true;
                                objModuleInfo_.IsActive = true;
                                objModuleInfo_.SEOName = objModuleInfo.ModuleName.Replace(" ", "_");
                                newNode = xn.SelectSingleNode("NewPageID");
                                if (newNode != null)
                                {
                                    objModuleInfo_.PageID = int.Parse(newNode.InnerText);
                                }
                                else
                                {
                                    objModuleInfo_.PageID = 0;
                                }
                                newNode = xn.SelectSingleNode("PaneName");
                                if (newNode != null)
                                {
                                    objModuleInfo_.PaneName = newNode.InnerText;
                                }
                                else
                                {
                                    objModuleInfo_.PaneName = string.Empty;
                                }
                                newNode = xn.SelectSingleNode("ModuleOrder");
                                if (newNode != null)
                                {
                                    objModuleInfo_.ModuleOrder = int.Parse(newNode.InnerText);
                                }
                                else
                                {
                                    objModuleInfo_.ModuleOrder = 0;
                                }
                                objModuleInfo_.CacheTime = "10";
                                objModuleInfo_.Alignment = "test";
                                objModuleInfo_.Color = "black";
                                objModuleInfo_.Visibility = true;
                                objModuleInfo_.PortalID = GetPortalID;
                                objModuleInfo_.IsHandheld = false;
                                newNode = xn.SelectSingleNode("SuffixClass");
                                if (newNode != null)
                                {
                                    objModuleInfo_.SuffixClass = newNode.InnerText;
                                }
                                else
                                {
                                    objModuleInfo_.SuffixClass = string.Empty;
                                }
                                newNode = xn.SelectSingleNode("HeaderText");
                                if (newNode != null)
                                {
                                    objModuleInfo_.HeaderText = newNode.InnerText;
                                }
                                else
                                {
                                    objModuleInfo_.HeaderText = string.Empty;
                                }
                                newNode = xn.SelectSingleNode("ShowHeaderText");
                                if (newNode != null)
                                {
                                    bool showHeaderText = false;
                                    bool.TryParse(newNode.InnerText, out showHeaderText);
                                    objModuleInfo_.ShowHeaderText = showHeaderText;
                                }
                                else
                                {
                                    objModuleInfo_.ShowHeaderText = false;
                                }
                                objModuleInfo_.AddedBy = GetUsername;
                                objModuleInfo_.LSTUserModulePermission = null;
                                objModuleInfo_.IsInAdmin = false;
                                xn.ParentNode.RemoveChild(xn);
                                doc.Save(authorDetailPath);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return objModuleInfo_;
    }
    public void InstallConfirmation(ModuleInfo module, ref int activeIndex)
    {
        if (module.ModuleID <= 0)
        {
            lblLoadMessage.Text = GetSageMessage("Extensions", "ThereIsErrorWhileInstalling");
            ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("Extensions", "ErrorWhileInstalling"), "", SageMessageType.Error);
            lblLoadMessage.Visible = true;
            chkAcceptLicense.Checked = false;
            ViewState["ModuleInfo"] = null;
            activeIndex = 0;
        }
        else
        {
            lblInstallMessage.Text = GetSageMessage("Extensions", "ModuleInstalledSuccessfully");
            ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("Extensions", "TheModuleIsInstalledSuccessfully"), "", SageMessageType.Success);
            wizInstall.DisplayCancelButton = false;
            activeIndex = 5;
        }
    }
    #region Uninstall Existing Module

    private void UninstallModule(ModuleInfo moduleInfo, bool deleteModuleFolder)
    {
        Installers installerClass = new Installers();
        string path = HttpContext.Current.Server.MapPath("~/");

        //checked if directory exist for current module foldername
        string moduleFolderPath = moduleInfo.InstalledFolderPath;
        if (!string.IsNullOrEmpty(moduleFolderPath))
        {
            if (Directory.Exists(moduleFolderPath))
            {
                //check for valid .sfe file exist or not
                string fileName = installerClass.checkFormanifestFile(moduleFolderPath, moduleInfo);
                if (fileName != "")
                {
                    XmlDocument doc = new XmlDocument();
                    doc.Load(moduleFolderPath + '\\' + fileName);
                    XmlElement root = doc.DocumentElement;
                    if (installerClass.checkValidManifestFile(root, moduleInfo))
                    {
                        XmlNodeList xnList = doc.SelectNodes("sageframe/folders/folder");
                        foreach (XmlNode xn in xnList)
                        {
                            moduleInfo.ModuleName = xn["modulename"].InnerXml.ToString();
                            moduleInfo.FolderName = xn["foldername"].InnerXml.ToString();

                            if (!String.IsNullOrEmpty(moduleInfo.ModuleName) && !String.IsNullOrEmpty(moduleInfo.FolderName) && installerClass.IsModuleExist(moduleInfo.ModuleName.ToLower(), moduleInfo))
                            {

                            }
                            else
                            {
                                ShowMessage(SageMessageTitle.Exception.ToString(), GetSageMessage("Extensions", "ThisModuleSeemsToBeCorrupted"), "", SageMessageType.Error);
                            }
                        }
                        try
                        {
                            if (moduleInfo.ModuleID > 0)
                            {
                                //Run script  
                                ReadUninstallScriptAndDLLFiles(doc, moduleFolderPath, installerClass);
                                //Rollback moduleid
                                installerClass.ModulesRollBack(moduleInfo.ModuleID, GetPortalID);
                                if (deleteModuleFolder == true)
                                {
                                    //Delete Module's Folder
                                    installerClass.DeleteTempDirectory(moduleInfo.InstalledFolderPath);
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            Exceptions = ex.Message;
                        }

                        if (Exceptions != string.Empty)
                        {
                            ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("Extensions", "ModuleExtensionIsUninstallError"), "", SageMessageType.Alert);
                        }
                        else
                        {
                            string ExtensionMessage = GetSageMessage("Extensions", "ModuleExtensionIsUninstalledSuccessfully");
                            //UninstallProcessCancelRequestBase(Request.RawUrl, true, ExtensionMessage);
                        }
                    }
                    else
                    {
                        ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("Extensions", "ThisPackageIsNotValid"), "", SageMessageType.Alert);
                    }
                }
                else
                {
                    ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("Extensions", "ThisPackageDoesNotAppearToBeValid"), "", SageMessageType.Alert);
                }
            }
            else
            {
                ShowMessage(SageMessageTitle.Exception.ToString(), GetSageMessage("Extensions", "ModuleFolderDoesnotExist"), "", SageMessageType.Error);
            }
        }
    }

    private void ReadUninstallScriptAndDLLFiles(XmlDocument doc, string moduleFolderPath, Installers installerClass)
    {
        XmlElement root = doc.DocumentElement;
        if (!String.IsNullOrEmpty(root.ToString()))
        {
            ArrayList dllFiles = new ArrayList();
            string _unistallScriptFile = string.Empty;
            XmlNodeList xnFileList = doc.SelectNodes("sageframe/folders/folder/files/file");
            if (xnFileList.Count != 0)
            {
                foreach (XmlNode xn in xnFileList)
                {
                    string _fileName = xn["name"].InnerXml;
                    try
                    {
                        #region CheckAlldllFiles
                        if (!String.IsNullOrEmpty(_fileName) && _fileName.Contains(".dll"))
                        {
                            dllFiles.Add(_fileName);
                        }
                        #endregion
                        #region ReadUninstall SQL FileName
                        if (!String.IsNullOrEmpty(_fileName) && _fileName.Contains("Uninstall.SqlDataProvider"))
                        {
                            _unistallScriptFile = _fileName;
                        }
                        #endregion
                    }
                    catch (Exception ex)
                    {
                        Exceptions = ex.Message;
                    }
                }
                if (_unistallScriptFile != "")
                {
                    RunUninstallScript(_unistallScriptFile, moduleFolderPath, installerClass);
                }
                DeleteAllDllsFromBin(dllFiles, moduleFolderPath);
            }
        }
    }

    private void RunUninstallScript(string _unistallScriptFile, string moduleFolderPath, Installers installerClass)
    {
        Exceptions = installerClass.ReadSQLFile(moduleFolderPath, _unistallScriptFile);
    }

    private void DeleteAllDllsFromBin(ArrayList dllFiles, string moduleFolderPath)
    {
        try
        {
            string path = HttpContext.Current.Server.MapPath("~/");

            foreach (string dll in dllFiles)
            {
                string targetdllPath = path + SageFrame.Common.RegisterModule.Common.DLLTargetPath + '\\' + dll;
                FileInfo imgInfo = new FileInfo(targetdllPath);
                if (imgInfo != null)
                {
                    imgInfo.Delete();
                }
            }
        }
        catch (Exception ex)
        {
            Exceptions = ex.Message;
        }
    }

    #endregion

    private void BindPackage()
    {
        if (ViewState["CompositeModule"] != null)
        {
            CompositeModule package = (CompositeModule)ViewState["CompositeModule"];
            ViewState["CompositeModule"] = package;
            if (package.Components != null && package.Components.Count > 0)
            {
                gdvModule.DataSource = package.Components;
                gdvModule.DataBind();
            }
        }
        else if (ViewState["ModuleInfo"] != null)
        {
            ModuleInfo moduleInfo = installhelp.fillModuleInfo(module);
            ViewState["ModuleInfo"] = moduleInfo;
            List<ModuleInfo> list = new List<ModuleInfo>();
            list.Add(moduleInfo);
            gdvModule.Columns[4].Visible = false;
            gdvModule.DataSource = list;
            gdvModule.DataBind();

            this.lblReleaseNotesD.Text = moduleInfo.ReleaseNotes;
            this.lblLicenseD.Text = moduleInfo.License;
        }
    }
    protected void wizInstall_CancelButtonClick(object sender, EventArgs e)
    {
        try
        {
            wizInstall.ActiveStepIndex = 0;
            module = (ModuleInfo)ViewState["ModuleInfo"];
            if (module != null)
            {
                installhelp.DeleteTempDirectory(module.TempFolderPath);
                ViewState["ModuleInfo"] = null;
            }
            else
            {

                CompositeModule package = (CompositeModule)ViewState["CompositeModule"];
                if (package != null)
                {
                    installhelp.DeleteTempDirectory(package.TempFolderPath);


                    ViewState["CompositeModule"] = null;
                }
            }

            if (Directory.Exists(Server.MapPath("~/Install/Temp/")))
            {
                installhelp.DeleteTempDirectory(Server.MapPath("~/Install/Temp/"));
            }
            //Redirect to Definitions page
            ReturnBack();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    public void DeleteTemp()
    {
        if (Directory.Exists(Server.MapPath("~/Install/Temp/")))
        {
            installhelp.DeleteTempDirectory(Server.MapPath("~/Install/Temp/"));
        }
    }
    protected void wizInstall_FinishButtonClick(object sender, WizardNavigationEventArgs e)
    {
        try
        {
            module = (ModuleInfo)ViewState["ModuleInfo"];
            if (module != null)
            {
                installhelp.DeleteTempDirectory(module.TempFolderPath);
                ViewState["ModuleInfo"] = null;
            }
            else
            {
                CompositeModule package = (CompositeModule)ViewState["CompositeModule"];
                if (package != null)
                {
                    installhelp.DeleteTempDirectory(package.TempFolderPath);


                    ViewState["CompositeModule"] = null;
                }
            }
            //ReturnBack();

            if (Directory.Exists(Server.MapPath("~/Install/Temp/")))
            {
                installhelp.DeleteTempDirectory(Server.MapPath("~/Install/Temp/"));
            }
            ProcessCancelRequest(Request.RawUrl);
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void ReturnBack()
    {
        divModuleList.Visible = true;
        divInstallation.Visible = false;
    }
    protected void wizInstall_ActiveStepChanged(object sender, EventArgs e)
    {
        switch (wizInstall.ActiveStepIndex)
        {
            case 1:
                lblWarningMessage.Text = GetSageMessage("Extensions", "WarningMessageWillDeleteAllFiles");
                chkRepairInstall.Checked = true;
                break;
            case 2:
                if (chkRepairInstall.Checked)
                {
                    Button prevButton = GetWizardButton("StepNavigationTemplateContainerID", "CancelButton");
                    prevButton.Visible = false;
                }
                break;
        }
    }
    private Button GetWizardButton(string containerID, string buttonID)
    {
        Control navContainer = wizInstall.FindControl(containerID);
        Button button = null;
        if ((navContainer != null))
        {
            button = navContainer.FindControl(buttonID) as Button;
        }
        return button;
    }

    protected void CancelButton_Click(object sender, EventArgs e)
    {
        lblLoadMessage.Text = string.Empty;
        ProcessCancelRequest(Request.RawUrl);
    }
}