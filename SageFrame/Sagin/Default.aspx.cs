#region "Copyright"

/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/

#endregion

#region "References"

using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using SageFrame.Framework;
using System.Data;
using SageFrame.Web;
using System.Collections;
using SageFrame.Shared;
using System.IO;
using System.Text;
using SageFrame.Templating;
using System.Web.UI.HtmlControls;
using SageFrame.ModuleMessage;
using SageFrame.Security;
using SageFrame.Common;
using SageFrame.Core;
using SageFrame.Modules.Admin.PortalSettings;
using SageFrame.UserProfile;

#endregion

namespace SageFrame
{
    public partial class Sagin_Default : PageBase, SageFrameRoute
    {
        #region "Public Variables"

        public string ControlPath = string.Empty, SageFrameAppPath, SageFrameUserName;
        public string appPath = string.Empty;
        public string Extension;
        public string templateFavicon = string.Empty;
        public string userImage = string.Empty;
        public string userName = string.Empty;
        string userFirstColor = string.Empty;
        string userSecondColor = string.Empty;

        #endregion

        #region "Event Handlers"

        protected void Page_Init(object sender, EventArgs e)
        {
            SetPageInitPart();
        }
        protected override void OnInit(EventArgs e)
        {
            ViewStateUserKey = Session.SessionID;
            base.OnInit(e);
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            SetPageLoadPart();
            //CoreJs.IncludeLanguageCoreJs(this.Page);
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.Now.AddSeconds(-1));
            Response.Cache.SetNoStore();
            Response.AppendHeader("pragma", "no-cache");

            string value = SageFrame.Utilities.Config.GetVersionConfigSettingValue("SageFrameVersionLoad");
            if (!IsPostBack)
            {
                if (value.ToLower() == "true")
                {
                    showVersion();
                }
                else
                {
                    hideVersion();
                }
            }
            string LogoPath = Server.MapPath(appPath + "~/Administrator/Templates/Default/images/SageLogo.png");
            if (File.Exists(LogoPath))
            {
                hypLogo.NavigateUrl = GetPortalAdminPage();
                hypLogo.ImageUrl = appPath + "/Administrator/Templates/Default/images/SageLogo.png";
                if (GetUsername != SystemSetting.SYSTEM_USER)
                    lblHideLogo.Visible = false;
            }
            else
            {
                divLogo.Visible = false;
            }
        }

        private void showVersion()
        {
            SageFrame.Version.SageFrameVersion app = new SageFrame.Version.SageFrameVersion();
            lblVersion.Text = string.Format("V {0}", app.FormatShortVersion(app.Version, true));
            lblVersion.Visible = true;
            chkIsShown.Checked = true;
        }
        private void hideVersion()
        {
            lblVersion.Visible = false;
            chkIsShown.Checked = false;
        }
        protected void Page_PreRender(object sender, EventArgs e)
        {
            GetUserImageName();
        }

        #endregion

        #region "Public methods"

        public void LoadMessageControl()
        {


            PlaceHolder phdPlaceHolder = Page.FindControl("message") as PlaceHolder;
            if (phdPlaceHolder != null)
            {
                LoadControl(phdPlaceHolder, "~/Controls/Message.ascx");
            }
        }

        public override void ShowMessage(string MessageTitle, string Message, string CompleteMessage, bool isSageAsyncPostBack, SageMessageType MessageType)
        {
            string strCssClass = GetMessageCssClass(MessageType);
            int Cont = this.Page.Controls.Count;
            ControlCollection lstControls = Page.FindControl("form1").Controls;
            PlaceHolder phd = Page.FindControl("message") as PlaceHolder;
            if (phd != null)
            {
                foreach (Control c in phd.Controls)
                {
                    if (c.GetType().FullName.ToLower() == "ASP.Controls_message_ascx".ToLower())
                    {
                        SageUserControl tt = (SageUserControl)c;
                        tt.Modules_Message_ShowMessage(tt, MessageTitle, Message, CompleteMessage, isSageAsyncPostBack, MessageType, strCssClass);
                    }
                }
            }
        }

        #endregion

        #region "Private Methods"

        private void SetPageInitPart()
        {
            ltrJQueryLibrary.Text = GetAdminJqueryLibraryPath();
            CheckUserLogin();
            string PageName = Path.GetFileNameWithoutExtension(PagePath);
            //adminImage.ImageUrl = GetUserImage;
            if (PageName != null)
            {
                SecurityPolicy objSecurity = new SecurityPolicy();

                userName = objSecurity.GetUser(GetPortalID);
                templateFavicon = SetFavIcon(GetActiveTemplate);
                Extension = SageFrameSettingKeys.PageExtension;
                ApplicationController objAppController = new ApplicationController();
                objSecurity.UpdateExpireTime(userName, GetPortalID);
                if (!objAppController.CheckRequestExtension(Request))
                {
                    SageInitPart();
                }
                SetGlobalVariable();
                bool IsAdmin = true;
                IncludeStartup(GetPortalID, pchHolder, IsAdmin);
            }
            else
            {
                Response.Redirect(PortalAPI.PageNotAccessibleURL);
            }
        }

        private string GetUserImageName()
        {
            string UserName = GetUsername;
            UserProfileController objUserProfile = new UserProfileController();
            string ImageName = objUserProfile.GetUserImageName(UserName);
            string HostUrl = GetHostURL;
            if (!String.IsNullOrEmpty(ImageName))
                userImage = HostUrl + "/Modules/Admin/UserManagement/UserPic/" + ImageName;
            else
                userImage = HostUrl + "/Modules/Admin/UserManagement/UserPic/NoImage.png";
            return userImage;
        }

        private void CheckUserLogin()
        {
            if (!IsUserLoggedIn())
            {
                StringBuilder redirecPath = new StringBuilder();
                Uri url = HttpContext.Current.Request.Url;
                if (!IsParent)
                {
                    redirecPath.Append(url.Scheme);
                    redirecPath.Append("://");
                    redirecPath.Append(url.Authority);
                    redirecPath.Append(PortalAPI.GetApplicationName);
                    redirecPath.Append("/portal/");
                    redirecPath.Append(GetPortalSEOName);
                    redirecPath.Append("/");
                    redirecPath.Append(PortalAPI.LoginPageWithExtension);
                }
                else
                {
                    redirecPath.Append(url.Scheme);
                    redirecPath.Append("://");
                    redirecPath.Append(url.Authority);
                    redirecPath.Append(PortalAPI.LoginURL);
                }
                string strCurrentURL = Request.Url.ToString();
                if (redirecPath.ToString().Contains("?"))
                {
                    redirecPath.Append("&ReturnUrl=");
                    redirecPath.Append(strCurrentURL);
                }
                else
                {
                    redirecPath.Append("?ReturnUrl=");
                    redirecPath.Append(strCurrentURL);
                }
                HttpContext.Current.Response.Redirect(redirecPath.ToString());
            }
        }

        private void SetGlobalVariable()
        {
            appPath = GetAppPath();
            SageFrameAppPath = appPath;
            RegisterSageGlobalVariable();

        }

        private void SageInitPart()
        {
            ApplicationController objAppController = new ApplicationController();
            if (objAppController.IsInstalled())
            {
                if (!objAppController.CheckRequestExtension(Request))
                {
                    SetPortalCofig();
                    InitializePage();
                    //hypUpgrade.NavigateUrl = "~/Admin/sfUpgrader" + Extension;
                    LoadMessageControl();
                    BindModuleControls();
                    SageFrameConfig sfConfig = new SageFrameConfig();
                    string defaultAdminTheme = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.DefaultAdminTheme);
                    string adminSidebarPosition = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.AdminSidebarPosition);
                    SetColorCombo(sfConfig);
                    rdTemplate.SelectedValue = defaultAdminTheme;
                    if (adminSidebarPosition == "left")
                    {
                        rdLeft.Checked = true;
                        sfOuterwrapper.Attributes.Add("class", "menuleft");
                    }
                    else if (adminSidebarPosition == "top")
                    {
                        rdTop.Checked = true;
                        sfOuterwrapper.Attributes.Add("class", "menutop");
                    }
                    else
                    {
                        rdRight.Checked = true;
                        sfOuterwrapper.Attributes.Add("class", "menuright");
                    }
                }
            }
            else
            {
                HttpContext.Current.Response.Redirect(ResolveUrl("~/Install/InstallWizard.aspx"));
            }
        }
        //private string GetUpgraderUrl()
        //{
        //    string upgradeLink = string.Empty;
        //    if (GetPortalID > 1)
        //    {
        //        upgradeLink = "~/portal/" + GetPortalSEOName + "/Admin/sfUpgrader" + Extension;
        //    }
        //    else
        //    {
        //        upgradeLink = "~/Admin/sfUpgrader" + Extension;
        //    }
        //    return upgradeLink;
        //}

        private void SetColorCombo(SageFrameConfig sfConfig)
        {
            string defaultColorCombo = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.ColorCombos);
            string[] colors = defaultColorCombo.Split(',');
            if (colors.Length == 4)
            {
                StringBuilder html = new StringBuilder();
                rdColorcombos.SelectedIndex = -1;
                if (colors[2] == "system")
                {
                    rdColorcombos.SelectedValue = colors[3];
                    html.Append("<input id='chkUserSelectedColor' type='radio' name='comboColor' />");
                }
                else
                {
                    html.Append("<input id='chkUserSelectedColor' type='radio' name='comboColor' checked='checked' />");
                }

                userFirstColor = colors[0];
                userSecondColor = colors[1];
                hdnColorPallet.Value = defaultColorCombo;
                html.Append("<label for='set_0'>");
                html.Append("<span class='color-box' id='UserFirstColor' style='background-color:" + userFirstColor + "' data-value='" + userFirstColor + "'></span>");
                html.Append("<span class='color-box' id='UserSecondColor' style='background-color:" + userSecondColor + "' data-value='" + userSecondColor + "'></span>");
                html.Append("</label>");
                ltrPresetDOM.Text = html.ToString();


            }
        }
        private void SetPortalCofig()
        {
            Hashtable hstPortals = GetPortals();
            SageUserControl suc = new SageUserControl();
            suc.PagePath = PagePath;
            int portalID = 1;
            #region "Get Portal SEO Name and PortalID"
            if (string.IsNullOrEmpty(Request.QueryString["ptSEO"]))
            {
                if (string.IsNullOrEmpty(PortalSEOName))
                {
                    PortalSEOName = GetDefaultPortalName(hstPortals, 1);
                }
                else if (!hstPortals.ContainsKey(PortalSEOName.ToLower().Trim()))
                {
                    PortalSEOName = GetDefaultPortalName(hstPortals, 1);
                }
                else
                {
                    portalID = int.Parse(hstPortals[PortalSEOName.ToLower().Trim()].ToString());
                }
            }
            else
            {
                PortalSEOName = Request.QueryString["ptSEO"].ToString().ToLower().Trim();
                portalID = Int32.Parse(Request.QueryString["ptlid"].ToString());
            }
            #endregion
            suc.SetPortalSEOName(PortalSEOName.ToLower().Trim());
            Session[SessionKeys.SageFrame_PortalSEOName] = PortalSEOName.ToLower().Trim();
            Session[SessionKeys.SageFrame_PortalID] = portalID;
            Session[SessionKeys.SageFrame_AdminTheme] = ThemeHelper.GetAdminTheme(GetPortalID, GetUsername);
            Globals.sysHst[ApplicationKeys.ActiveTemplate + "_" + portalID] = TemplateController.GetActiveTemplate(GetPortalID).TemplateSeoName;
            Globals.sysHst[ApplicationKeys.ActivePagePreset + "_" + portalID] = PresetHelper.LoadActivePagePreset(GetActiveTemplate, GetPageSEOName(Request.Url.ToString()));
            suc.SetPortalID(portalID);
            SetPortalID(portalID);
            #region "Set user credentials for modules"
            //SecurityPolicy objSecurity = new SecurityPolicy();
            //if (objSecurity.GetUser(GetPortalID) != string.Empty)
            //{
            //    SettingProvider objSP = new SettingProvider();
            //    SageFrameConfig sfConfig = new SageFrameConfig();
            //    string strRoles = string.Empty;
            //    List<SageUserRole> sageUserRolles = objSP.RoleListGetByUsername(objSecurity.GetUser(GetPortalID), GetPortalID);
            //    if (sageUserRolles != null)
            //    {
            //        foreach (SageUserRole userRole in sageUserRolles)
            //        {
            //            strRoles += userRole.RoleId + ",";
            //        }
            //    }
            //    if (strRoles.Length > 1)
            //    {
            //        strRoles = strRoles.Substring(0, strRoles.Length - 1);
            //    }
            //    if (strRoles.Length > 0)
            //    {
            //        SetUserRoles(strRoles);
            //    }
            //}
            #endregion
        }

        private void SetPageLoadPart()
        {
            ApplicationController objAppController = new ApplicationController();
            if (!objAppController.CheckRequestExtension(Request))
            {
                SagePageLoadPart();
            }
        }

        private void SagePageLoadPart()
        {
            if (!IsPostBack)
            {
                string sageNavigateUrl = string.Empty;
                SageFrameConfig sfConfig = new SageFrameConfig();

                if (!IsParent)
                {
                    sageNavigateUrl = GetParentURL + "/portal/" + GetPortalSEOName + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-");
                }
                else
                {
                    sageNavigateUrl = GetParentURL + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-");
                }
                hypHome.NavigateUrl = sageNavigateUrl;//GetHostURL + "/Admin/Admin" + Extension;
                // hypHome.Text = sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage);
                //hypHome.ImageUrl = GetAdminImageUrl("home.png", true);
                hypPreview.NavigateUrl = sageNavigateUrl;
                lnkAccount.NavigateUrl = GetProfileLink(sfConfig);
                Image imgProgress = (Image)UpdateProgress1.FindControl("imgPrgress");
                if (imgProgress != null)
                {
                    imgProgress.ImageUrl = GetAdminImageUrl("ajax-loader.gif", true);
                }
                // bool IsAdmin = false;
                SecurityPolicy objSecurity = new SecurityPolicy();
                FormsAuthenticationTicket ticket = objSecurity.GetUserTicket(GetPortalID);
                if (ticket != null)
                {
                    int LoggedInPortalID = int.Parse(ticket.UserData.ToString());
                    if (ticket.Name != ApplicationKeys.anonymousUser)
                    {
                        string[] sysRoles = SystemSetting.SYSTEM_SUPER_ROLES;
                        //this.hypUpgrade.Visible = IsParent ? (Roles.IsUserInRole(ticket.Name, sysRoles[1]) ? true : false) : false;

                        if (GetPortalID == LoggedInPortalID || Roles.IsUserInRole(ticket.Name, sysRoles[0]))
                        {
                            RoleController _role = new RoleController();
                            string userinroles = _role.GetRoleNames(GetUsername, LoggedInPortalID);
                            if (userinroles != "" || userinroles != null)
                            {
                                bool isDashboardAccessible = _role.IsDashboardAccesible(GetUsername, GetPortalID);
                                foreach (string role in sysRoles)
                                {
                                    if (userinroles.ToLower() == role)
                                    {
                                        isDashboardAccessible = true;
                                    }
                                }
                                if (!isDashboardAccessible)
                                {
                                    divAdminControlPanel.Visible = false;
                                }
                            }
                            else
                            {
                                divAdminControlPanel.Visible = false;
                            }
                        }
                        else
                        {
                            divAdminControlPanel.Visible = false;
                        }
                    }
                    else
                    {
                        divAdminControlPanel.Visible = false;
                    }

                }
                if (IsHandheld())
                {
                    divAdminControlPanel.Visible = false;
                }
            }
            //SessionTrackerController sTracController = new SessionTrackerController();
            //sTracController.SetSessionTrackerValues(GetPortalID.ToString(), GetUsername);
        }

        private void BindModuleControls()
        {
            string preFix = string.Empty;
            string paneName = string.Empty;
            string ControlSrc = string.Empty;
            string phdContainer = string.Empty;
            string PageSEOName = string.Empty;
            string sufixClass = string.Empty;
            SageUserControl suc = new SageUserControl();
            string PageName = PagePath;
            if (PagePath == null)
            {
                PageName = PagePath;
            }
            else
            {
                PageName = PagePath;
            }
            suc.PagePath = PageName;
            if (PagePath != null)
            {
                PageSEOName = GetPageSEOName(PagePath);
            }
            else
            {
                SageFrameConfig sfConfig = new SageFrameConfig();
                PageSEOName = GetPageSEOName(sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage));
            }
            //:TODO: Need to get controlType and pageID from the selected page from routing path
            //string controlType = "0";
            //string pageID = "2";
            StringBuilder redirecPath = new StringBuilder();
            Uri url = HttpContext.Current.Request.Url;
            if (PageSEOName != string.Empty)
            {
                DataSet dsPageSettings = new DataSet();
                SageFrameConfig sfConfig = new SageFrameConfig();
                dsPageSettings = sfConfig.GetPageSettingsByPageSEONameForAdmin("1", PageSEOName, GetUsername);
                if (PageSEOName.ToLower() == "admin")
                    divRightPanNav.Visible = true;
                else
                    divRightPanNav.Visible = false;
                if (bool.Parse(dsPageSettings.Tables[0].Rows[0][0].ToString()) == true)// Is Page Exists
                {
                    if (bool.Parse(dsPageSettings.Tables[0].Rows[0][1].ToString()) == true)// Is Page Aceessable
                    {
                        // Get ModuleControls data table
                        DataTable dtPages = dsPageSettings.Tables[1];
                        if (dtPages != null && dtPages.Rows.Count > 0)
                        {
                            OverridePageInfo(dtPages);
                        }
                        // Get ModuleDefinitions data table
                        DataTable dtPageModule = dsPageSettings.Tables[2];
                        List<string> moduleDefIDList = new List<string>();
                        string HeaderText = string.Empty;

                        if (dtPageModule != null && dtPageModule.Rows.Count > 0)
                        {
                            for (int i = 0; i < dtPageModule.Rows.Count; i++)
                            {
                                paneName = dtPageModule.Rows[i]["PaneName"].ToString();
                                sufixClass = dtPageModule.Rows[i]["SuffixClass"].ToString();
                                HeaderText = dtPageModule.Rows[i]["HeaderText"].ToString();
                                if (!(dtPageModule.Rows[i]["ShowHeaderText"].ToString() == "True"))
                                    HeaderText = string.Empty;
                                if (string.IsNullOrEmpty(paneName))
                                    paneName = "ContentPane";
                                string UserModuleID = dtPageModule.Rows[i]["UserModuleID"].ToString();
                                ControlSrc = "/" + dtPageModule.Rows[i]["ControlSrc"].ToString();
                                string SupportsPartialRendering = dtPageModule.Rows[i]["SupportsPartialRendering"].ToString();
                                PlaceHolder phdPlaceHolder = (PlaceHolder)this.FindControl(paneName);
                                if (paneName.ToLower().Equals("navigation")) { divNavigation.Attributes.Add("style", "display:block"); }
                                //if (paneName.ToLower().Equals("middlemaincurrent")) { divRight.Attributes.Add("style", "display:block"); }
                                //if (paneName.ToLower().Equals("lefta")) { divLeft.Attributes.Add("style", "display:block"); }
                                if (paneName.ToLower().Equals("cpanel")) { divBottompanel.Attributes.Add("style", "display:block"); }
                                if (phdPlaceHolder != null)
                                {
                                    LoadControl(phdPlaceHolder, ControlSrc, paneName, UserModuleID, sufixClass, HeaderText, false, new HtmlGenericControl("div"), new HtmlGenericControl("span"), false, ParamCollection);
                                    moduleDefIDList.Add(dtPageModule.Rows[i]["ModuleDefID"].ToString());
                                }
                            }
                        }
                        SetModuleDefList(moduleDefIDList);
                    }
                    else
                    {
                        if (!IsParent)
                        {
                            redirecPath.Append(url.Scheme);
                            redirecPath.Append("://");
                            redirecPath.Append(url.Authority);
                            redirecPath.Append(PortalAPI.GetApplicationName);
                            redirecPath.Append("/portal/");
                            redirecPath.Append(GetPortalSEOName);
                            redirecPath.Append("/");
                            redirecPath.Append(PortalAPI.LoginPageWithExtension);
                        }
                        else
                        {
                            redirecPath.Append(url.Scheme);
                            redirecPath.Append("://");
                            redirecPath.Append(url.Authority);
                            redirecPath.Append(PortalAPI.LoginURL);
                        }
                        string strCurrentURL = Request.Url.ToString();
                        if (redirecPath.ToString().Contains("?"))
                        {
                            redirecPath.Append("&ReturnUrl=");
                            redirecPath.Append(strCurrentURL);
                        }
                        else
                        {
                            redirecPath.Append("?ReturnUrl=");
                            redirecPath.Append(strCurrentURL);
                        }
                        HttpContext.Current.Response.Redirect(redirecPath.ToString());
                    }
                }
                else
                {

                    if (!IsParent)
                    {
                        redirecPath.Append(url.Scheme);
                        redirecPath.Append("://");
                        redirecPath.Append(url.Authority);
                        redirecPath.Append(PortalAPI.GetApplicationName);
                        redirecPath.Append("/portal/");
                        redirecPath.Append(GetPortalSEOName);
                        redirecPath.Append("/");
                        redirecPath.Append(PortalAPI.PageNotFoundPageWithExtension);
                    }
                    else
                    {
                        redirecPath.Append(url.Scheme);
                        redirecPath.Append("://");
                        redirecPath.Append(url.Authority);
                        redirecPath.Append(PortalAPI.PageNotFoundURL);
                    }

                    Response.Redirect(ResolveUrl(redirecPath.ToString()));
                }
            }
        }

        private void LoadControl(PlaceHolder ContainerControl, string controlSource)
        {
            UserControl ctl = this.Page.LoadControl(controlSource) as UserControl;
            ctl.EnableViewState = true;
            ContainerControl.Controls.Add(ctl);
        }

        private string GetProfileLink(SageFrameConfig sfConfig)
        {
            string profileURL = "";
            if (!IsParent)
            {
                profileURL = GetParentURL + "/portal/" + GetPortalSEOName + "/" + "sfUser-Profile" + Extension;
            }
            else
            {
                profileURL = GetParentURL + "/Admin/" + "sfUser-Profile" + Extension;
            }
            return profileURL;
        }

        private bool LoadModuleInfo(PlaceHolder Container, int UserModuleID, int position)
        {
            bool status = false;
            ModuleMessageInfo objMessage = ModuleMessageController.GetModuleMessageByUserModuleID(UserModuleID, GetCurrentCulture());
            if (objMessage != null)
            {
                if (objMessage.IsActive)
                {
                    if (objMessage.MessagePosition == position)
                    {
                        string modeStyle = "sfPersist";
                        switch (objMessage.MessageMode)
                        {
                            case 0:
                                modeStyle = "sfPersist";
                                break;
                            case 1:
                                modeStyle = "sfSlideup";
                                break;
                            case 2:
                                modeStyle = "sfFadeout";
                                break;
                        }
                        string messageTypeStyle = "sfInfo";
                        switch (objMessage.MessageType)
                        {
                            case 0:
                                messageTypeStyle = "sfInfo";
                                break;
                            case 1:
                                messageTypeStyle = "sfWarning";
                                break;
                        }
                        string totalStyle = string.Format("{0} {1}", modeStyle, messageTypeStyle);
                        HtmlGenericControl moduleDiv = new HtmlGenericControl("div");
                        moduleDiv.Attributes.Add("class", "sfModuleinfo");
                        StringBuilder sb = new StringBuilder();
                        string CloseForEver = string.Format("close_{0}", UserModuleID);
                        sb.Append("<div class='" + totalStyle + "'><div class='sfLinks'><a class='sfClose' href='#'>Close</a>   <a class='sfNclose' id='" + CloseForEver + "' href='#'>Close and Never Show Again</a></div>");
                        sb.Append(objMessage.Message);
                        sb.Append("</div>");
                        moduleDiv.InnerHtml = sb.ToString();
                        Container.Controls.Add(moduleDiv);
                        status = true;
                    }
                }
            }
            return status;
        }

        protected void rdTemplate_SelectedIndexChanged(object sender, EventArgs e)
        {
            string themeCss = rdTemplate.SelectedValue;
            SettingProvider sageSP = new SettingProvider();
            sageSP.SaveSageSetting(SettingType.SiteAdmin.ToString(), SageFrameSettingKeys.DefaultAdminTheme, themeCss, GetUsername, GetPortalID.ToString());
        }

        protected void rdColorcombos_SelectedIndexChanged(object sender, EventArgs e)
        {
            string comboColor = rdColorcombos.SelectedValue;
            string firstOne = "#5b53ef";
            string firstTwo = "#f0c54c";
            string secondOne = "#00acc1";
            string secondTwo = "#d6df22";
            string thirdOne = "#92cd18";
            string thirdTwo = "#ffa725";
            string type = "system";
            switch (comboColor)
            {
                case "one":
                    ChangeColor(firstOne, firstTwo, type, "one");
                    break;
                case "two":
                    ChangeColor(secondOne, secondTwo, type, "two");
                    break;
                case "three":
                    ChangeColor(thirdOne, thirdTwo, type, "three");
                    break;

            }
        }
        private void ChangeColor(string firstColor, string SecondColor, string type, string selectedValue)
        {
            if (userFirstColor.Length > 0 && userSecondColor.Length > 0)
            {
                string adminCssPath = Server.MapPath("~/Administrator/Templates/Default/css/admin.css");
                string commonCssPath = Server.MapPath("~/Administrator/Templates/Default/css/common.css");
                string text = File.ReadAllText(adminCssPath);
                text = text.Replace(userFirstColor, firstColor);
                text = text.Replace(userSecondColor, SecondColor);
                File.WriteAllText(adminCssPath, text);

                text = File.ReadAllText(commonCssPath);
                text = text.Replace(userFirstColor, firstColor);
                text = text.Replace(userSecondColor, SecondColor);
                File.WriteAllText(commonCssPath, text);

                SettingProvider sageSP = new SettingProvider();
                string savedata = firstColor + "," + SecondColor + "," + type + "," + selectedValue;
                sageSP.SaveSageSetting(SettingType.SiteAdmin.ToString(), SageFrameSettingKeys.ColorCombos, savedata, GetUsername, GetPortalID.ToString());


                //clear the css bunding from the cache
                HttpRuntime.Cache.Remove(CacheKeys.SageFrameCss);
                string optimized_path = Server.MapPath(SageFrameConstants.OptimizedResourcePath);
                IOHelper.DeleteDirectoryFiles(optimized_path, ".css");
                if (File.Exists(Server.MapPath(SageFrameConstants.OptimizedCssMap)))
                {
                    XmlHelper.DeleteNodes(Server.MapPath(SageFrameConstants.OptimizedCssMap), "resourcemaps/resourcemap");
                }
                //redirect is done here because the property of changing the dashboard color has the hybrid
                //combination of jquery and asp.net and hence some properties can't be set after postback                 
                Response.Redirect(Page.Request.Url.ToString());
            }
        }

        protected void rdLeft_CheckedChanged(object sender, EventArgs e)
        {
            sfOuterwrapper.Attributes.Remove("style");
            //sfOuterwrapper.Attributes.Add("style", "float:left");
            sfOuterwrapper.Attributes.Add("class", "menuleft");
            SettingProvider sageSP = new SettingProvider();
            sageSP.SaveSageSetting(SettingType.SiteAdmin.ToString(), SageFrameSettingKeys.AdminSidebarPosition, "left", GetUsername, GetPortalID.ToString());
        }

        protected void rdRight_CheckedChanged(object sender, EventArgs e)
        {
            sfOuterwrapper.Attributes.Remove("style");
            //sfOuterwrapper.Attributes.Add("style", "float:right");
            sfOuterwrapper.Attributes.Add("class", "menuright");
            SettingProvider sageSP = new SettingProvider();
            sageSP.SaveSageSetting(SettingType.SiteAdmin.ToString(), SageFrameSettingKeys.AdminSidebarPosition, "right", GetUsername, GetPortalID.ToString());
        }
        protected void rdTop_CheckedChanged(object sender, EventArgs e)
        {
            sfOuterwrapper.Attributes.Remove("style");
            //sfOuterwrapper.Attributes.Add("style", "float:right");
            sfOuterwrapper.Attributes.Add("class", "menutop");
            SettingProvider sageSP = new SettingProvider();
            sageSP.SaveSageSetting(SettingType.SiteAdmin.ToString(), SageFrameSettingKeys.AdminSidebarPosition, "top", GetUsername, GetPortalID.ToString());
        }

        #endregion

        #region SageFrameRoute Members

        public string PagePath
        {
            get;
            set;
        }

        public string PortalSEOName
        {
            get;
            set;
        }
        public string UserModuleID
        {
            get;
            set;
        }
        public string ControlType
        {
            get;
            set;
        }
        public string ControlMode { get; set; }
        public string Key { get; set; }
        public string Param { get; set; }
        public string[] ParamCollection { get; set; }
        #endregion


        //protected void lblHideLogo_Click(object sender, EventArgs e)
        //{
        //    string LogoPath = Server.MapPath(appPath + "~/Administrator/Templates/Default/images/SageLogo.png");
        //    if (File.Exists(LogoPath))
        //        File.Delete(LogoPath);
        //    divLogo.Visible = false;
        //}
        protected void fileUpload_Click(object sender, EventArgs e)
        {
            if (this.fileUpload.HasFile)
            {
                string tempFilePath = Server.MapPath("~/Temp/SageLogo.png");
                string saveFinalPath = Server.MapPath("~/Administrator/Templates/Default/images/SageLogo.png");
                this.fileUpload.SaveAs(tempFilePath);
                PictureManager.CreateThmnail(tempFilePath, 40, 40, saveFinalPath);
            }
            string isChecked = string.Empty;
            isChecked = hdnIsShown.Value;
            Utilities.Config.UpdateSageFrameVersionLoad(isChecked);
            if (isChecked == "true")
                showVersion();
            else
                hideVersion();
        }
        public string GetPortalAdminPage()
        {
            string sageNavigateUrl = string.Empty;
            SageFrameConfig sfConfig = new SageFrameConfig();
            if (!IsParent)
            {
                sageNavigateUrl = string.Format("{0}/portal/{1}/Admin/Admin" + Extension, GetParentURL, GetPortalSEOName);
            }
            else
            {
                sageNavigateUrl = GetParentURL + "/Admin/Admin" + Extension;
            }
            return sageNavigateUrl;
        }

        protected void btnUserColor_Click(object sender, EventArgs e)
        {
            string defaultColorCombo = hdnColorPallet.Value;
            string[] colors = defaultColorCombo.Split(',');
            if (colors.Length == 4)
            {
                //userFirstColor = colors[0];
                //userSecondColor = colors[1];
                ChangeColor(colors[0], colors[1], "user", "");
            }
        }
    }
}
