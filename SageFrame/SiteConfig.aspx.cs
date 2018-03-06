using Newtonsoft.Json;
using RegisterModule;
using SageFrame.Dashboard;
using SageFrame.DigiSphereInvoker.Controller;
using SageFrame.Framework;
using SageFrame.SageFrameClass.MessageManagement;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Security.Helpers;
using SageFrame.Security.Providers;
using SageFrame.Templating;
using SageFrame.Utilities;
using SageFrame.Web;
using SageFrame.WebBuilder;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;

public partial class SiteConfig : PageBase
{
    string siteEmailAddress = string.Empty;
    string userEmailAddress = string.Empty;

    public string UnexpectedEOF = "Unexpected EOF";
    public string TemplateUrl = string.Empty;
    int CustomerID = 0;
    protected void Page_Init(object sender, EventArgs e)
    {
        RegisterSageGlobalVariable();
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        SageFrameConfig sageConfig = new SageFrameConfig();
        userEmailAddress = Config.GetSetting("useremailaddress").ToString();
        siteEmailAddress = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SuperUserEmail);
        TemplateUrl = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
        string isconfigured = Config.GetSetting("configurecode").ToString();
        string issiteconfigured = Config.GetSetting("issiteconfigured").ToString();
        if (issiteconfigured == "true")
        {
            Response.Redirect(GetHostURL);
        }
        else if (isconfigured != string.Empty && isconfigured != "true")
        {
            if (Request.QueryString["configurecode"] != null)
            {
                string userConfigCode = Request.QueryString["configurecode"].ToString();
                string configcode = Config.GetSetting("configurecode").ToString();
                if (configcode != string.Empty && configcode == userConfigCode)
                {
                    AccessArea();
                    string passwordConfig = Config.GetSetting("sitepasswordchanged").ToString();
                    string advisionConfig = Config.GetSetting("advisionconfigured").ToString();
                    string templateConfig = Config.GetSetting("templatechoosed").ToString();
                    if (passwordConfig != string.Empty && passwordConfig != "true")
                    {
                        PasswordSection();
                        CreateStepMenu(new int[] { 1, 0, 0 });
                    }
                    else if (advisionConfig != string.Empty && advisionConfig != "true")
                    {
                        AdvisionSection();
                        CreateStepMenu(new int[] { 0, 1, 0 });
                    }
                    else
                    {
                        InstallSite();
                        HideAllSection();
                        ltrMessages.Text = "<span class='messagearea'>Your template has been installed succesfully. We are preparing your site. Please have some patience for a few minutes. </span>";
                        UpdateAppSettingValue("templatechoosed", "true");
                        UpdateAppSettingValue("issiteconfigured", "true");
                        DomainController objDomainController = new DomainController();
                        objDomainController.TriggerSiteConfig(userConfigCode, Request.Url.Authority);
                        Config.Touch();
                    }
                }
                else
                {
                    AccessDeniedArea();
                }
            }
            else
            {
                AccessDeniedArea();
            }
        }
        else
        {
            HttpContext.Current.Response.Redirect(GetHostURL + "/Install/InstallWizard.aspx");
        }
    }

    private void InstallSite()
    {
        SageFrameConfig sageConfig = new SageFrameConfig();
        string onlineStoreURL = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.OnlineStore);
        string themeID = sageConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.ThemeID);
        if (themeID == "0")
            themeID = "1";

        ComponentUploadHandler objUpload = new ComponentUploadHandler();
        objUpload.GetOnlineTheme(int.Parse(themeID), 1, 1317, "anonymoususer", "en-US");


        //string apiUrl = onlineStoreURL + "/GetOnlineThemeFile";
        //WebbuilderSite webInfo = new WebbuilderSite();
        //using (WebClient wc = new WebClient())
        //{
        //    wc.Headers[HttpRequestHeader.ContentType] = "application/json";
        //    wc.QueryString.Add("themeID", themeID);
        //    wc.Encoding = Encoding.UTF8;
        //    var resultData = wc.DownloadString(apiUrl);
        //    dynamic dyn = JsonConvert.DeserializeObject(resultData);
        //    if (dyn != null)
        //    {
        //        webInfo = JsonConvert.DeserializeObject<WebbuilderSite>(dyn.d.Value);
        //    }
        //}
        //if (webInfo != null)
        //{
        //    WebBuilderController objController = new WebBuilderController();
        //    if (webInfo.Culture == null || webInfo.Culture == string.Empty)
        //        webInfo.Culture = "en-US";
        //    webInfo.UserName = "anonymoususer";
        //    webInfo.PortalID = 1;
        //    webInfo.UserModuleID = 1317;
        //    objController.CreateSite(webInfo);
        //    KeyValue objKeyValue = objController.GetInstalledComponentList();
        //    string componentID = objKeyValue.Value;
        //    string[] clientComponent = componentID.Split(',');
        //    string[] siteComponent = webInfo.Components.Split(',');
        //    List<string> unInstallCompo = new List<string>();
        //    foreach (string siteCompo in siteComponent)
        //    {
        //        bool exists = false;
        //        foreach (string clientCom in clientComponent)
        //        {
        //            if (clientCom == siteCompo)
        //            {
        //                exists = true;
        //            }
        //        }
        //        if (!exists)
        //            unInstallCompo.Add(siteCompo);
        //    }
        //    if (unInstallCompo.Count > 0)
        //    {
        //        using (WebClient wc = new WebClient())
        //        {
        //            List<BuilderComponent> objBuildCompo = new List<BuilderComponent>();
        //            string componentIDs = string.Join(",", unInstallCompo);
        //            var reqparm = new System.Collections.Specialized.NameValueCollection();
        //            string resultData = GetOnlineComponents(componentIDs, onlineStoreURL);
        //            if (resultData != string.Empty)
        //            {
        //                objBuildCompo = JsonConvert.DeserializeObject<List<BuilderComponent>>(resultData);
        //                foreach (BuilderComponent objBuildCompoitem in objBuildCompo)
        //                {
        //                    objBuildCompoitem.UserModuleID = webInfo.UserModuleID;
        //                    UpdateComponentForPage(objBuildCompoitem);
        //                }
        //            }
        //        }
        //    }
        //}
    }
    private string GetOnlineComponents(string componentIDs, string onlineStoreURL)
    {
        string componentList = string.Empty;
        string[] args = new string[1];
        args[0] = componentIDs;
        string service = "OnlineStore";
        string method = "GetOnlineComponentsByIDs";
        try
        {
            WebServiceInvoker invoker = new WebServiceInvoker(new Uri(onlineStoreURL));
            return componentList = invoker.InvokeMethod<string>(service, method, args);
        }
        catch (Exception ex)
        {
            return componentList = string.Empty;
        }
    }
    private int UpdateComponentForPage(BuilderComponent objComponent)
    {
        BuilderComponent component = new BuilderComponent();
        ComponentUploadHandler objComponentUploadHandler = new ComponentUploadHandler();
        component = objComponentUploadHandler.GetComponentByIDAndVersion(objComponent.UniversalComponentID, objComponent.Version);
        return objComponentUploadHandler.UpdateComponentBulk(component, false);
    }
    private void AccessArea()
    {
        accessArea.Visible = true;
        accessDeniedArea.Visible = false;
    }
    private void AccessDeniedArea()
    {
        accessArea.Visible = false;
        accessDeniedArea.Visible = true;
    }
    private void PasswordSection()
    {
        divAdvisionSection.Visible = false;
        divTemplateSection.Visible = false;
        divPasswordChange.Visible = true;
    }
    private void AdvisionSection()
    {
        divAdvisionSection.Visible = true;
        divTemplateSection.Visible = false;
        divPasswordChange.Visible = false;
    }
    private void TemplateSection()
    {
        divAdvisionSection.Visible = false;
        divTemplateSection.Visible = true;
        divPasswordChange.Visible = false;
    }
    private void HideAllSection()
    {
        divAdvisionSection.Visible = false;
        divTemplateSection.Visible = false;
        divPasswordChange.Visible = false;
    }


    public void CreateUser()
    {
        try
        {
            if (SystemSetting.SYSTEM_DEFAULT_USERS.Contains(txtUserName.Text.Trim(), StringComparer.OrdinalIgnoreCase))
            {
                ltrWarning.Text = "Conflict  of UserName with RoleName so  please enter another UserName.";
            }
            else
            {
                if (txtUserName.Text != string.Empty && txtNewPassword.Text != string.Empty)
                {

                    string Uname = txtUserName.Text.Trim();
                    if (txtNewPassword.Text.Length >= 4)
                    {
                        SageFrameConfig objConfig = new SageFrameConfig();
                        string Role = SystemSetting.SYSTEM_SUPER_ROLES[0];
                        UserInfo objUser = new UserInfo();
                        objUser.ApplicationName = Membership.ApplicationName;
                        objUser.FirstName = Uname;
                        objUser.UserName = Uname;
                        objUser.LastName = Uname;
                        string Password, PasswordSalt;
                        MembershipController m = new MembershipController();
                        PasswordHelper.EnforcePasswordSecurity(m.PasswordFormat, txtNewPassword.Text, out Password, out PasswordSalt);
                        objUser.Password = Password;
                        objUser.PasswordSalt = PasswordSalt;
                        objUser.Email = Uname;
                        objUser.SecurityQuestion = string.Empty;
                        objUser.SecurityAnswer = string.Empty;
                        objUser.IsApproved = true;
                        objUser.CurrentTimeUtc = DateTimeHelper.GetUtcTime(DateTime.Now);
                        objUser.CreatedDate = DateTimeHelper.GetUtcTime(DateTime.Now);
                        objUser.UniqueEmail = 0;
                        objUser.PasswordFormat = m.PasswordFormat;
                        objUser.PortalID = GetPortalID;
                        objUser.AddedOn = DateTimeHelper.GetUtcTime(DateTime.Now);
                        objUser.AddedBy = GetUsername;
                        objUser.UserID = Guid.NewGuid();
                        objUser.RoleNames = Role;
                        objUser.StoreID = GetStoreID;
                        objUser.CustomerID = CustomerID;

                        UserCreationStatus status = new UserCreationStatus();
                        try
                        {
                            MembershipDataProvider.CreatePortalUser(objUser, out status, UserCreationMode.CREATE);

                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                    }
                    else
                    {
                        ltrWarning.Text = "Password must be at least 4 characters long.";
                    }

                }
                else
                {
                    ltrWarning.Text = "Please enter all the required fields.";
                }

            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    protected void btnManagePasswordSave_Click(object sender, EventArgs e)
    {
        try
        {
            if (txtNewPassword.Text != "" && txtRetypeNewPassword.Text != "" && txtNewPassword.Text == txtRetypeNewPassword.Text)
            {
                if (txtNewPassword.Text.Length >= 4)
                {
                    //string userName = "superuser";
                    //Guid userID = new Guid("76F4944E-8928-4056-8E89-09EB994DDCEC");
                    //MembershipUser member = Membership.GetUser(userName);
                    //string Password, PasswordSalt;
                    //MembershipController m = new MembershipController();
                    //PasswordHelper.EnforcePasswordSecurity(m.PasswordFormat, txtNewPassword.Text, out Password, out PasswordSalt);
                    //UserInfo user = new UserInfo(userID, Password, PasswordSalt, m.PasswordFormat);
                    CreateUser();
                    //m.ChangePassword(user);
                    UpdateAppSettingValue("sitepasswordchanged", "true");
                    ltrMessages.Text = "<span class='messagearea'>Your User Name and  Password has been changed and forwarded into your mail</span>";
                    SendPasswordEmail(txtNewPassword.Text);
                }
                else
                {
                    // ShowMessage("", GetSageMessage("UserManagement", "PasswordLength"), "", SageMessageType.Alert);
                }
            }
            else
            {
                // ShowMessage("", GetSageMessage("UserManagement", "PleaseEnterTheRequiredField"), "", SageMessageType.Alert);
            }
        }
        catch (Exception ex)
        {
            //ProcessException(ex);
        }
    }
    private static void UpdateAppSettingValue(string key, string value)
    {
        try
        {
            Configuration config = WebConfigurationManager.OpenWebConfiguration("/");
            config.AppSettings.Settings[key].Value = value;
            config.Save(ConfigurationSaveMode.Modified);
        }
        catch (ConfigurationErrorsException)
        {
            //Error//Error
        }
    }
    private void CreateStepMenu(int[] active)
    {
        StringBuilder html = new StringBuilder();
        //string[] menu = { "Create a Password", "Configure site type", "Choose Template" };
        string[] menu = { "Create a Password", "Configure site type" };
        //int[] active = { 1, 0, 0 };
        html.Append("<ul>");
        int menuLength = menu.Length;
        for (int i = 0; i < menuLength; i++)
        {
            if (active[i] == 1)
                html.Append("<li class='active'>");
            else
                html.Append("<li>");
            html.Append("<span class='step_number'>");
            html.Append(i + 1);
            html.Append("</span>");
            html.Append("<span class='step_title'>");
            html.Append(menu[i]);
            html.Append("</span>");
            html.Append("</li>");
        }
        html.Append("</ul>");
        ltrStepMenu.Text = html.ToString();
    }

    public void GetTemplateList(int PortalID)
    {
        string templates = Utils.GetAbsolutePath(TemplateConstants.TemplateDirectory);
        DirectoryInfo dir = new DirectoryInfo(templates);
        List<TemplateInfo> lstTemplates = new List<TemplateInfo>();
        string activeTemplate = TemplateController.GetActiveTemplate(PortalID).TemplateName;
        if (activeTemplate.Length < 1) { activeTemplate = "Default"; }
        foreach (DirectoryInfo temp in dir.GetDirectories())
        {
            TemplateInfo tempObj = new TemplateInfo(temp.Name, temp.FullName, GetThumbPath(temp.FullName, temp.Name, TemplateConstants.TemplateDirectory), false, false);
            if (temp.Name.ToLower().Replace(' ', '_').Equals(activeTemplate.ToLower()))
            {
                tempObj.IsActive = true;
            }
            lstTemplates.Add(tempObj);
        }
        //bool IsDefaultActive = activeTemplate.ToLower().Equals("default") ? true : false;
        //lstTemplates.Insert(0, new TemplateInfo("Default", "/Core/Template/", GetThumbPath(HttpContext.Current.Server.MapPath("~/Core/Template/"), "Template", "Core/"), IsDefaultActive, true));
        List<TemplateInfo> lstFinalTemplates = new List<TemplateInfo>();
        List<TemplateInfo> lstAppliedTemplates = new List<TemplateInfo>();
        try
        {
            lstAppliedTemplates = TemplateController.GetPortalTemplates();
        }
        catch (Exception)
        {
            throw;
        }
        foreach (TemplateInfo template in lstTemplates)
        {
            bool status = false;
            foreach (TemplateInfo templt in lstAppliedTemplates)
            {
                if (template.TemplateName.ToLower() == templt.TemplateName.ToLower() && templt.PortalID != PortalID)
                {
                    status = true;
                    break;
                }
            }
            if (!status)
                template.IsApplied = false;
            else
                template.IsApplied = true;
        }
        StringBuilder html = new StringBuilder();
        foreach (TemplateInfo template in lstTemplates)
        {
            string tempMarkup = string.Empty;
            string isActiveClass = template.IsActive ? "class='sfTemplateholder sfCurve sfActivetemplate'" : "class='sfTemplateholder  sfCurve '";
            html.Append("<div ");
            html.Append(isActiveClass);
            html.Append(" data-templateName='");
            html.Append(template.TemplateName);
            html.Append("' >");
            //html.Append("<a href='#' rel='");
            //html.Append(template.TemplateName);
            //html.Append("' class='sfTemplatethumb'>");
            html.Append("<div class='ImageWrapper'>");
            html.Append("<img alt='Default' src='");
            html.Append(template.ThumbImage);
            html.Append("'>");
            html.Append("</div>");
            //html.Append("</a>");
            html.Append("<div class='sfTemplatedetail'>");
            html.Append("<ul><li class='title'><span>");
            html.Append(template.TemplateName);
            html.Append("</span> </li> <li class='author'><span>By:<a href='#'>Contentder</a></span> </li>");
            html.Append("</ul></div>");
            string activateId = "lnkActivate#" + template.TemplateSeoName;
            string previewId = "lnkPreview#" + template.TemplateSeoName;
            if (!template.IsDefault)
            {
                if (!template.IsActive)
                {
                    html.Append("<i class='icon-close sfDelete' href='#' rel=");
                    html.Append(template.TemplateSeoName);
                    html.Append("></i>");
                }
            }
            string isActivated = "<i class='fa fa-check-square-o' aria-hidden='true'></i>";
            if (template.IsActive)
            {
                isActivated = "Activated";
            }
            //html.Append("<div class='sfButtonwrapper'>");
            //html.Append("<ul class='sfTemplateSetting'><li class='sfViewDemo'><a href='#' ><i class="fa fa-eye"></i></a></li><li class="activate"><a href="#" id=' + activateId + '>' + isActivated + '</a></li>';
            //html.Append(" <li class="sfTemplateCustomize"><a href="#"><i class="fa fa-cog"></i></a><ul  class="sfTemplateEdit">';
            //html.Append("<li class="sfPages"><a href="' + SageFrameHostURL + '/Admin/Pages' + p.Extension + '" target="_blank" >Pages</a></li>';
            //html.Append("<li class="templatePreset" data="' + template.TemplateName + '">Preset</li><li class="templateLayout" data="' + template.TemplateName + '">Layout Manager</li><li class="lnkThemes" data="' + template.TemplateName + '">Theme Options</li></ul></li>';
            //var editFileLink = p.EditFilePath + '/Admin/Template-File-Editor' + p.Extension + '?tname=' + template.TemplateSeoName;
            //// if (!item.IsDefault) {
            //tempMarkup += '<li class="sfEditfiles"><a href=' + editFileLink + ' id="lnkEditFiles"><i class="fa fa-pencil-square-o"></i></a></li>';
            ////                        if (!item.IsActive)
            ////                            tempMarkup += ' <li class="sfDelete"><a href="#" id="lnkDelete" rel=' + template.TemplateSeoName + '>Delete</a></li>';
            ////}
            //html.Append("</ul></div><div class='clear'></div></div>");
            html.Append("<div class='templateoverlay'><span class='checked'></span></div>");
            html.Append("<div class='clear'></div></div>");
            //  if (SageFramePortalID == 1) {
            //     html += tempMarkup;
            //}
            //else {
            //if (!template.IsApplied)
            //{
            //    html += tempMarkup;
            //}

            //}
        }
        //lstTemplates;
        ltrTemplateList.Text = html.ToString();
    }

    public static string GetThumbPath(string TemplatePath, string TemplateName, string RootFolder)
    {
        string thumbpath = HttpContext.Current.Request.ApplicationPath == "/" ? TemplateConstants.NoImagePath + TemplateConstants.NoImageImag : HttpContext.Current.Request.ApplicationPath + TemplateConstants.NoImagePath + TemplateConstants.NoImageImag;
        if (Directory.Exists(TemplatePath + TemplateConstants.ThumbPath))
        {
            DirectoryInfo dir = new DirectoryInfo(TemplatePath + TemplateConstants.ThumbPath);
            foreach (FileInfo file in dir.GetFiles())
            {
                if (Utils.ValidateThumbImage(file))
                {
                    thumbpath = string.Format("{0}/{1}{2}{3}/{4}", HttpContext.Current.Request.ApplicationPath == "/" ? "" : HttpContext.Current.Request.ApplicationPath, RootFolder, TemplateName, TemplateConstants.ThumbPath, file.Name);
                    break;
                }
            }
        }
        return thumbpath;
    }
    protected void btnSaveTemplates_Click(object sender, EventArgs e)
    {
        string templateName = hdnTemplateName.Value;
        ApplyTemplate(templateName);
    }

    public void ApplyTemplate(string templateName)
    {
        TemplateController.ActivateTemplate(templateName, 1);
        TemplateController.UpdateConfigPages();
        ltrMessages.Text = "<span class='messagearea'>Your template has been changed succesfully. We are preparing your site. Please have some patience for a few minutes. </span>";
        UpdateAppSettingValue("templatechoosed", "true");
        UpdateAppSettingValue("issiteconfigured", "true");
        Config.Touch();
    }

    private string MessageWrapper(string messagebody)
    {
        StringBuilder html = new StringBuilder();
        html.Append("<html>");
        html.Append("<head>");
        html.Append("</head>");
        html.Append("<body>");
        html.Append("<table border='0' cellspacing='0' cellpadding='0' width='100%' style='border:1px solid rgba(0,0,0,0.045);font-family:Arial;max-width:700px'>");
        html.Append("<tr>");
        html.Append("<td style='padding:25px;'><img src='###hosturl###/images/configmessage/logo.png'></td>");
        html.Append("</tr>");
        html.Append("<tr>");
        html.Append("<td bgcolor='#7272d8' style='padding:40px 0 30px 0;'>");
        html.Append("<table border='0' cellpadding='0' cellspacing='0' width='100%'>");
        html.Append("<tr>");
        html.Append("<td>");
        html.Append("<img src='###hosturl###/images/configmessage/logoplace.png' style='display:block;margin:0 auto'>");
        html.Append("</td>");
        html.Append("</tr>");
        html.Append("<tr>");
        html.Append("<td>&nbsp;</td>");
        html.Append("</tr>");
        html.Append("<tr>");
        //html.Append("<!--<td style='color:#fff; text-align:center'>Dear chandrasingh143@yopmail.com,</td>-->");
        html.Append("</tr>");
        html.Append("</table>");
        html.Append("</td>");
        html.Append("</tr>");
        html.Append("<tr>");
        html.Append("<td bgcolor='#fff' style='padding:0px'>");
        html.Append("<table border='0' cellpadding='0' cellspacing='0' width='100%' style='background:#fff'>");
        html.Append(messagebody);
        html.Append("</table>");
        html.Append("</td>");
        html.Append("");
        html.Append("");
        html.Append("");
        html.Append("</tr>");
        html.Append("");
        html.Append("</table>");
        html.Append("");
        html.Append("</td>");
        html.Append("</tr>");
        html.Append("</table>");
        html.Append("</td>");
        html.Append("</tr>");
        html.Append("<tr>");
        html.Append("<td bgcolor='#f8f8f8' style='padding:20px 30px 20px 30px'>");
        html.Append("<table border='0' cellspacing='0' cellpadding='0' width='100%'>");
        html.Append("<tr>");
        html.Append("<td width='20%'><img src='###hosturl###/images/configmessage/logo.png' width='150px'></td>");
        html.Append("<td align='right' style='font-size:12px;'><p style='color:#2e2e2e;line-height:1.4;margin:5px 0 0 0 ;'>Best Regards</p><p style='font-weight:bold;margin:5px 0 0 0;color:#7272d8'>Contentder Team</p></td>");
        html.Append("");
        html.Append("</tr>");
        html.Append("</table>");
        html.Append("</td>");
        html.Append("</tr>");
        html.Append("</table>");
        html.Append("</body>");
        html.Append("</html>");
        return html.ToString();
    }


    private string PasswordMessageBody()
    {
        StringBuilder html = new StringBuilder();
        html.Append("<tr>");
        html.Append("<td bgcolor='#f8f8f8' style='padding:20px 30px 20px 30px;text-align:center;-webkit-box-shadow: 0 3px 9px rgba(0,0,0,0.1);-moz-box-shadow: 0 3px 9px rgba(0,0,0,0.1);box-shadow: 0 3px 9px rgba(0,0,0,0.1);'>");
        html.Append("<h1 style='font-size:28px;color:#ffcb00;display:inline-block;margin: 0 15px 0 0;'>");
        html.Append("Your password has been changed successfully.");
        html.Append("</h1>");
        html.Append("");
        html.Append("</td>");
        html.Append("</tr>");
        html.Append("<tr>");
        html.Append("<td style='padding:20px 30px 20px 30px;font-size:15px'>");
        html.Append("<p style='color:#2e2e2e;line-height:1.4'>");
        html.Append("You have just updated the password of your site.");
        html.Append("</p>");
        html.Append("</tr>");
        html.Append("<tr>");
        html.Append("<td style='padding:20px 30px 20px 30px'>");
        html.Append("<table border='0' cellpadding='0' cellspacing='0' width='100%'>");
        html.Append("<tr>");
        html.Append("<td valign='top' style='font-size:13px;padding:0px;-moz-box-shadow:0 0px 10px 0px rgba(0,0,0,0.2);-webkit-box-shadow:0 0px 10px 0px rgba(0,0,0,0.2);box-shadow:0 0px 10px 0px rgba(0,0,0,0.2)'>");
        html.Append("");
        html.Append("<h2 style='color:#fff;font-size:14px;background-color:#7272d8;padding:15px;margin:0'>###hosturl### Site Credential</h2>");
        html.Append("<table border='0' cellpadding='0' cellspacing='0' width='100%'>");
        html.Append("<tr>");
        html.Append("<td style='padding:15px'>");
        html.Append("<table border='0' cellpadding='0' cellspacing='0' width='100%'>");
        html.Append("<tr style='background:rgba(0,0,0,0.05)'>");
        html.Append("<td width='30%' style='padding:15px  ;font-size:14px'>UserName:</td>");
        html.Append("<td style='padding:15px ;font-size:14px'>" + txtUserName.Text.Trim() + "</td>");
        html.Append("</tr>");
        html.Append("<tr>");
        html.Append("<td width='30%' style='padding:15px ;font-size:14px'>Password:</td>");
        html.Append("<td style='padding:15px ;font-size:14px'>###password###</td>");
        html.Append("</tr>");
        html.Append("</table>");
        html.Append("</td>");
        html.Append("</tr>");
        return html.ToString();
    }

    private void SendPasswordEmail(string Password)
    {

        string siteURL = GetHostURL;
        string subject = "Site Credential for contender site";
        string body = MessageWrapper(PasswordMessageBody()).Replace("###hosturl###", siteURL).Replace("###password###", Password);
        try
        {
            MailHelper.SendMailNoAttachment(siteEmailAddress, txtUserName.Text.Trim(), subject, body, string.Empty, string.Empty);
            ltrMessages.Text = "<span class='messagearea'>You have successfully changed the password. Please check your email for detail </span>";
        }
        catch (Exception ex)
        {
            ltrMessages.Text = "<span class='messagearea'>" + ex.Message + "</span>";
        }
    }
    private void SendAdvisionEmail()
    {
        string subject = "";
        string body = "";
        MailHelper.SendMailNoAttachment(siteEmailAddress, userEmailAddress, subject, body, string.Empty, string.Empty);
    }
    private void SendTemplateEmail()
    {
        string subject = "";
        string body = "";
        MailHelper.SendMailNoAttachment(siteEmailAddress, userEmailAddress, subject, body, string.Empty, string.Empty);
    }

    #region "online template"
    protected void rptrTemplateList_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (rptrTemplateList.Items.Count < 1)
        {
            if (e.Item.ItemType == ListItemType.Footer)
            {
                Label lblFooter = (Label)e.Item.FindControl("lblEmptyData");
                lblFooter.Visible = true;
            }
            downloadTemplate.Visible = false;
        }
        else
        {
            downloadTemplate.Visible = true;
        }
    }
    string themeID = string.Empty;
    string onlineTemplate = string.Empty;
    protected void rptrTemplateList_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName == "DownLoad")
        {
            string[] commandArgs = e.CommandArgument.ToString().Split(',');
            string url = commandArgs[0];
            themeID = commandArgs[1];
            onlineTemplate = commandArgs[2];
            WebClient client = new WebClient();
            try
            {
                string fileName = Path.GetFileName(url);
                hdnFileName.Value = fileName;
                string path = HttpContext.Current.Server.MapPath("~/");
                string temPath = "TempTemplateFolder";
                string destPath = Path.Combine(path, temPath);
                if (!Directory.Exists(destPath))
                    Directory.CreateDirectory(destPath);
                client.DownloadFileCompleted += new System.ComponentModel.AsyncCompletedEventHandler(client_DownloadFileCompleted);
                client.DownloadProgressChanged += new DownloadProgressChangedEventHandler(client_DownloadProgressChanged);
                client.DownloadFileAsync(new Uri(url), Server.MapPath(string.Format("~/TempTemplateFolder/{0}", fileName)));
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
        InstallDownLoadTemplate(FileName);
    }

    private void NotifyServer()
    {
        string TemplateList = string.Empty;
        string[] args = new string[1];
        args[0] = themeID;
        string service = "OnlineStore";
        string method = "UpdateDownloadCount";

        string url = TemplateUrl;
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

    public void InstallDownLoadTemplate(string FileName)
    {

        try
        {

            string fileName = FileName;
            string path = HttpContext.Current.Server.MapPath("~/");
            string temPath = "TempTemplateFolder";
            string destPath = Path.Combine(path, temPath);
            string downloadPath = SageFrame.Common.RegisterModule.Common.TemporaryTemplateFolder;
            string downloadDestPath = Path.Combine(path, downloadPath);
            string templateName = ParseFileNameWithoutPath(fileName.Substring(0, fileName.Length - 4));
            string templateFolderPath = path + "Templates\\" + templateName;
            string deletePath = Server.MapPath(string.Format("~/TempTemplateFolder/{0}", fileName));
            if (!Directory.Exists(templateFolderPath))
            {
                if (!Directory.Exists(destPath))
                    Directory.CreateDirectory(destPath);
                string filePath = destPath + "\\" + FileName;
                string ExtractedPath = string.Empty;
                bool msg = ZipUtil.UnZipFiles1(filePath, destPath, ref ExtractedPath, SageFrame.Common.RegisterModule.Common.Password, SageFrame.Common.RegisterModule.Common.RemoveZipFile, deletePath);
                if (msg)
                {
                    DirectoryInfo temp = new DirectoryInfo(ExtractedPath);
                    Directory.Move(ExtractedPath, templateFolderPath);
                    Directory.Delete(destPath, true);
                    NotifyServer();
                    ApplyTemplate(onlineTemplate);
                    //ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("TemplateManagement", "TemplateInstallSuccessfully"), "", SageMessageType.Success);
                }
                else
                {
                    //ShowMessage(SageMessageTitle.Notification.ToString(), "Corrupted .zip File please redownload for install", "", SageMessageType.Alert);
                }
            }
            else
            {
                ApplyTemplate("default");
                //ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("TemplateManagement", "TemplateAlreadyInstall"), "", SageMessageType.Error);
            }



        }
        catch (Exception ex)
        {
            if (ex.Message.Equals(UnexpectedEOF, StringComparison.OrdinalIgnoreCase))
            {
                //ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("TemplateManagement", "ZipFileIsCorrupt"), "", SageMessageType.Alert);

            }
            else
            {
                ProcessException(ex);
            }
        }

    }

    public void BindFreeThemeList(string category, string themeName)
    {
        string freeThemeList = GetFreeThemeList(category, themeName);
        freeThemeList = freeThemeList.Replace("\\", "/");
        if (freeThemeList != string.Empty)
        {
            XElement element = LoadXMLElement(freeThemeList);
            rptrTemplateList.DataSource = from x in element.Descendants("theme")
                                          select new
                                          {
                                              FileName = x.Element("name").Value,
                                              ThemeID = x.Element("themeid").Value,
                                              URL = x.Element("zippath").Value,
                                              DemoLink = x.Element("demolink").Value,
                                              Thumb = x.Element("screenshot").Value
                                          };
            rptrTemplateList.DataBind();
            downloadTemplate.Visible = true;

        }
        else
        {
            downloadTemplate.Visible = false;
            rptrTemplateList.DataSource = string.Empty;
            rptrTemplateList.DataBind();
        }


    }

    private string GetFreeThemeList(string category, string themename)
    {
        return GetThemeList("free", category, "sageframe", themename);
    }
    public string GetThemeList(string TemplateType, string TemplateCategory, string productType, string themeName)
    {

        SageFrameConfig sfConf = new SageFrameConfig();
        string categoryName = sfConf.GetSettingValueByIndividualKey(SageFrameSettingKeys.CategoryName);
        string TemplateList = string.Empty;
        string[] args = new string[1];
        args[0] = categoryName;
        //args[1] = TemplateCategory;
        //args[2] = productType;
        //args[3] = themeName;
        string service = "OnlineStore";
        string method = "GetThemeListByProduct";
        string url = TemplateUrl;
        try
        {
            WebServiceInvoker invoker = new WebServiceInvoker(new Uri(url));
            return TemplateList = invoker.InvokeMethod<string>(service, method, args);
        }
        catch (Exception)
        {
            return TemplateList = string.Empty;
        }
    }
    private string ParseFileNameWithoutPath(string path)
    {
        if (path != null && path != string.Empty)
        {
            char seperator = '\\';
            string[] file = path.Split(seperator);
            return file[file.Length - 1];
        }
        return string.Empty;
    }

    public XElement LoadXMLElement(string xmlString)
    {
        XElement element = null;
        try
        {
            element = XElement.Parse(xmlString);

        }
        catch (Exception)
        {
            throw new Exception("Unable to parse string to xmlformat.");
        }
        return element;
    }

    #endregion
}