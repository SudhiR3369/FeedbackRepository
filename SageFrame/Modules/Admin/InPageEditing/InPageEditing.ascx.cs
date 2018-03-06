#region "Copyright"
/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2012 by SageFrame
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#endregion

#region "References"
using System;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using SageFrame.Web;
using System.IO;
using System.Text;
using SageFrame.ModuleManager;
using SageFrame.Templating;
using System.Collections.Generic;
using SageFrame.Pages;
using SageFrame.Framework;
using SageFrame.Core;
using SageFrame.Common;
using System.Text.RegularExpressions;
using SageFrame.UserProfile;
#endregion

public partial class Modules_Pages_InPageEditing : BaseAdministrationUserControl
{
    private int portalID = 1;
    public int userModuleID = 0;
    private string pageSEOName = string.Empty;
    private string layoutName = string.Empty;
    public string userImage = string.Empty;
    public string userName = string.Empty;
    private string extenstion = string.Empty;
    public string divDrop = "display: none; left: 100px; top: 100px;";
    public string minimize = "display: none;";
    public string minimizeOn = "minimize sfRight icon-plus";
    public string divMinimized = "Minimized";
    public int isFirst = 0;
    public string activteWidth = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        userName = GetUsername;
        userModuleID = int.Parse(SageUserModuleID);
        extenstion = SageFrameSettingKeys.PageExtension;
        IncludeJs("frontpagination", false, "/js/jquery.pagination.js");
        IncludeJs("Forntenddialogjs", "/js/jquery.dialogextend.js");
        IncludeJs("frontEndJs", "/Modules/Admin/InPageEditing/js/FrontEnd.js");
        IncludeCss("FrontEndWidget", "/Modules/Admin/InPageEditing/css/module.css");
        portalID = GetPortalID;
        BindTopStickybar();
        if (!IsPostBack)
        {
            BindPages();
            BindLayout();
            BindVariables();
            BuildLayoutControl();
            BindModuleControls();
            BindModuleList();
            BindDuckableValue();
        }
        PresetInfo preset = GetPresetDetails;
        activteWidth = preset.ActiveWidth.ToLower();

        SageFrame.Version.SageFrameVersion app = new SageFrame.Version.SageFrameVersion();
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
    }
    protected void Page_PreRender(object sender, EventArgs e)
    {
        GetUserImageName();
    }
    private string GetUserImageName()
    {
        string UserName = GetUsername;
        UserProfileController objUserProfile = new UserProfileController();
        string ImageName = objUserProfile.GetUserImageName(UserName);
        string HostUrl = GetHostURL();
        if (!String.IsNullOrEmpty(ImageName))
            userImage = HostUrl + "/Modules/Admin/UserManagement/UserPic/" + ImageName;
        else
            userImage = HostUrl + "/Modules/Admin/UserManagement/UserPic/NoImage.png";
        return userImage;

    }
    private void BindDuckableValue()
    {
        try
        {
            DuckableController objController = new DuckableController();
            Duckable objDuck = objController.GetDuckableValue();
            if (objDuck.DragLeft < 0)
            {
                isFirst = 1;
            }
            divDrop = "display: none; left: " + objDuck.DragLeft + "px; top: " + objDuck.DragTop + "px;";
            divMinimized = objDuck.Minimize == true ? "Minimized" : "";
            minimize = objDuck.Minimize == true ? "display: none;" : "";
            minimizeOn = objDuck.Minimize == true ? "minimize sfRight fa-plus-square-o" : "minimize sfRight fa fa-minus-square-o";
        }
        catch (Exception e)
        {
            ProcessException(e);
        }
    }

    private void BindTopStickybar()
    {
        string adminURL = GetParentURL + "/Admin/Admin" + extenstion;
        SageFrameConfig sfConfig = new SageFrameConfig();
        hypLogo.NavigateUrl = adminURL;
        hypEdit.NavigateUrl = GetHostURL() + "/" + sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage) + SageFrameSettingKeys.PageExtension;
        hypLogo.ImageUrl = GetApplicationName + "/Administrator/Templates/Default/images/sageframe.png";

        string appPath = GetApplicationName;
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
        hlnkDashboard.NavigateUrl = adminURL;
        SageFrame.Application.Application app = new SageFrame.Application.Application();
        lblVersion.Text = string.Format("V {0}", app.FormatShortVersion(app.Version, true));
        lnkAccount.NavigateUrl = GetParentURL + "/sf/" + "sfUser-Profile" + extenstion;
    }

    private string GetPortalAdminPage()
    {
        string sageNavigateUrl = string.Empty;
        SageFrameConfig sfConfig = new SageFrameConfig();
        if (!IsParent)
        {
            sageNavigateUrl = string.Format("{0}/portal/{1}/Admin/Admin" + extenstion, GetParentURL, GetPortalSEOName);
        }
        else
        {
            sageNavigateUrl = GetParentURL + "/Admin/Admin" + extenstion;
        }
        return sageNavigateUrl;
    }
    private void BindVariables()
    {
        string referrerurl = string.Empty;
        if (Request.QueryString["pname"] != null)
        {
            pageSEOName = Request.QueryString["pname"].ToString();
            foreach (ListItem l in ddlPages.Items)
            {
                if (l.Value.Replace("-", " ").Trim() == pageSEOName.Replace("-", " "))
                {
                    ddlPages.SelectedValue = l.Value;
                    break;
                }
            }
        }
        PresetInfo preset = new PresetInfo();
        preset = PresetHelper.LoadActivePagePreset(TemplateName, pageSEOName);
        ddlLayout.SelectedValue = preset.ActiveLayout;
        layoutName = ddlLayout.SelectedValue;
    }

    private void BindPages()
    {
        List<PageEntity> lstMenu = new List<PageEntity>();
        PageController objPageController = new PageController();
        lstMenu = objPageController.GetMenuFront(1, false);
        ddlPages.DataSource = lstMenu;
        ddlPages.DataTextField = "PageName";
        ddlPages.DataBind();

        StringBuilder html = new StringBuilder();
        foreach (PageEntity page in lstMenu)
        {
            html.Append("<li id='");
            html.Append(page.PageID);
            html.Append("'>");
            html.Append(page.PageName);
            html.Append("</li>");
        }
        ltrPageLists.Text = "<ul id='pageList' style='display:none;'>" + html.ToString() + "</ul>";
        hdnPageList.Text = "<ul id='hdnPageList' style='display:none;'>" + html.ToString() + "</ul>";
    }

    private void BindLayout()
    {
        string filePath = Decide.IsTemplateDefault(TemplateName.Trim()) ? Utils.GetTemplatePath_Default(TemplateName) : Utils.GetTemplatePath(TemplateName);
        DirectoryInfo dir = new DirectoryInfo(filePath + "/layouts");
        StringBuilder html = new StringBuilder();
        List<string> layoutList = new List<string>();
        html.Append("<ul class='layoutList inactive' style='display:none;'>");
        foreach (FileInfo layout in dir.GetFiles())
        {
            string layoutName = layout.Name.Replace(".xml", "");
            layoutList.Add(layoutName);
            html.Append("<li>");
            html.Append(layoutName);
            html.Append("</li>");
        }
        html.Append("</ul>");
        ddlLayout.DataSource = layoutList;
        ddlLayout.DataBind();

        ltrlayoutList.Text = html.ToString();
    }

    private void BindModuleList()
    {
        List<LayoutMgrInfo> lminfoList = new List<LayoutMgrInfo>();
        lminfoList = LayoutMgrDataProvider.GetModules(1);
        StringBuilder html = new StringBuilder();
        html.Append("<ul class='hdnModulelist' style='display:none;'>");
        foreach (LayoutMgrInfo objLayout in lminfoList)
        {
            html.Append("<li id='");
            html.Append(objLayout.ModuleDefID);
            html.Append("'>");
            html.Append(objLayout.FriendlyName);
            html.Append("</li>");
        }
        html.Append("</ul>");
        ltrModuleList.Text = html.ToString();
    }

    public string LoadLayout()
    {
        string filePath = Decide.IsTemplateDefault(TemplateName.Trim()) ? Utils.GetTemplatePath_Default(TemplateName) : Utils.GetTemplatePath(TemplateName);
        DirectoryInfo dir = new DirectoryInfo(filePath + "/layouts");
        StringBuilder html = new StringBuilder();
        foreach (FileInfo layout in dir.GetFiles())
        {
            string layoutName = layout.Name.Replace(".xml", "");
            html.Append("<option");
            html.Append(" value='");
            html.Append(layoutName);
            html.Append("'>");
            html.Append(layoutName);
            html.Append("</option>");
        }
        return html.ToString();
    }


    private void BindModuleControls()
    {
        string preFix = string.Empty;
        string paneName = string.Empty;
        string ControlSrc = string.Empty;
        string phdContainer = string.Empty;
        //pageSEOName = pageSEOName.Replace("-and-", "&").Replace(" ", "-");
        //:TODO: Need to get controlType and pageID from the selected page from routing path
        //string controlType = "0";
        //string pageID = "2";
        StringBuilder redirecPath = new StringBuilder();
        if (pageSEOName != string.Empty)
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string SEOName = sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-");
            List<SageFrame.Common.UserModuleInfo> lstUserModules = new List<SageFrame.Common.UserModuleInfo>();
            string previewCode = "none";
            bool isPreview = false;
            lstUserModules = sfConfig.GetPageModules_Superuser("1", pageSEOName, GetUsername, GetCurrentCulture(), true, previewCode);
            Uri url = Request.Url;
            if (lstUserModules[0].IsPageAvailable)
            {
                if (lstUserModules[0].IsPageAccessible)
                {
                    if (lstUserModules.Count > 0)
                    {
                        int i = 0;
                        bool isHandheld = IsHandheld();
                        bool isUserLoggedIn = true;
                        PageBase objPageBase = new PageBase();
                        foreach (SageFrame.Common.UserModuleInfo usermodule in lstUserModules)
                        {
                            bool handheld_status = bool.Parse(usermodule.IsHandHeld.ToString());
                            if (isHandheld == handheld_status)
                            {
                               
                                paneName = usermodule.PaneName;
                                paneName = "pch_" + paneName;
                                if (string.IsNullOrEmpty(paneName))
                                    paneName = "ContentPane";
                                string UserModuleTitle = usermodule.UserModuleTitle != string.Empty ? usermodule.UserModuleTitle.ToString() : string.Empty;
                                ControlSrc = usermodule.ControlSrc;
                                string SupportsPartialRendering = usermodule.SupportsPartialRendering.ToString();
                                string SuffixClass = usermodule.SuffixClass.ToString();
                                string HeaderText = usermodule.ShowHeaderText ? usermodule.HeaderText : "";
                                bool ContainsEdit = usermodule.IsEdit;
                                int ControlCount = usermodule.ControlsCount;
                                UserControl uc = pchWhole.FindControl("lytA") as UserControl;
                                PlaceHolder phdPlaceHolder = uc.FindControl(paneName) as PlaceHolder;
                                SuffixClass = isUserLoggedIn && ContainsEdit ? string.Format("sfLogged sfModule {0}", SuffixClass) : string.Format("sfModule {0}", SuffixClass);
                                if (phdPlaceHolder != null)
                                {
                                    string TemplateControls = Server.MapPath(string.Format("~/Templates/{0}/modules/{1}", "Default", ControlSrc.Substring(ControlSrc.IndexOf('/'), ControlSrc.Length - ControlSrc.IndexOf('/'))));
                                    ControlSrc = File.Exists(TemplateControls) ? string.Format("/Templates/{0}/modules/{1}", "Default", ControlSrc.Substring(ControlSrc.IndexOf('/'), ControlSrc.Length - ControlSrc.IndexOf('/'))) : string.Format("/{0}", ControlSrc);
                                    objPageBase.LoadControl(phdPlaceHolder, ControlSrc, paneName, usermodule.UserModuleID.ToString(), SuffixClass, HeaderText, isUserLoggedIn, GetModuleControls(usermodule.UserModuleID,usermodule.ModuleDefID,usermodule.PageID, ContainsEdit, ControlCount), GetPaneNameContainer(UserModuleTitle), ContainsEdit, true);
                                }
                            }
                            i++;
                        }
                    }
                }
            }
        }
    }

    public void BuildLayoutControl()
    {
        string layoutcontrol = string.Empty;
        SageFrameConfig sfConfig = new SageFrameConfig();
        pageSEOName = pageSEOName.ToLower().Equals("default") ? sfConfig.GetSettingsByKey(SageFrameSettingKeys.PortalDefaultPage).Replace(" ", "-") :
        pageSEOName.Replace(" ", "-");
        pageSEOName = Regex.Replace(pageSEOName, "--+", "");
        layoutcontrol = "";
        PageBase objPageBase = new PageBase();
        string activeTemplate = objPageBase.GetActiveTemplate;
        layoutcontrol = PresetHelper.LoadActivePresetForPage(activeTemplate, pageSEOName);
        LoadControl(pchWhole, layoutcontrol, 3);
    }

    private void LoadControl(PlaceHolder ContainerControl, string controlSource, int id)
    {
        UserControl ctl = this.Page.LoadControl(controlSource) as UserControl;
        ctl.EnableViewState = true;
        ctl.ID = "lytA";
        
        ControlCollection lstControl = ctl.Controls;
        foreach(Control contrl in lstControl)
        {
            if(contrl is PlaceHolder)
            {
                //Control parent = (Control)contrl.Parent;
                HtmlGenericControl div = new HtmlGenericControl("div");
                string dropableClass = "sfInlinePageEdit " + contrl.ID;
                div.Attributes.Add("class", dropableClass);
                contrl.Controls.Add(div);
            }
        }
        ContainerControl.Controls.Add(ctl);
    }

    public HtmlGenericControl GetModuleControls(int UserModuleID,int ModuleDefID,int pageID,  bool ContainsEdit, int ControlCount)
    {
        HtmlGenericControl div = new HtmlGenericControl("div");
        div.Attributes.Add("class", "sfModuleControl");
        div.Attributes.Add("style", "display:none");
        string html = "<div class='userModuleID_" + UserModuleID + "'>";
        if (ContainsEdit && ControlCount > 1)
        {
            string QueryString= "uid="+ UserModuleID + "&pid=1&mdefID="+ModuleDefID+"&pageID="+pageID;
            html += "<a class='sfManageControl icon-edit fa fa-pencil-square-o' data-query='"+ QueryString + "' rel='/Sagin/HandleModuleControls.aspx?"+ QueryString + "'></a>";
               
        }
        html += "<a class='fa fa-cogs mdlSetting'></a>";
        html += "<a class='fa fa-trash-o mdlDelete'></a>";
        html += "</div>";
        html += "<div class='drag'><a class='fa fa-arrows moduledrag'></a></div>";
        div.InnerHtml = html;
        return div;
    }

    public HtmlGenericControl GetPaneNameContainer(string PaneName)
    {
        HtmlGenericControl span = new HtmlGenericControl("span");
        span.Attributes.Add("class", "sfPosition");
        span.Attributes.Add("style", "display:none;");
        span.InnerHtml = PaneName;
        return span;
    }

    protected void ddlPages_SelectedIndexChanged(object sender, EventArgs e)
    {

        pageSEOName = ddlPages.SelectedValue;
        pageSEOName = Regex.Replace(pageSEOName, "--+", "");
        //PresetInfo preset = new PresetInfo();
        //preset = PresetHelper.LoadActivePagePreset(TemplateName, pageSEOName);
        //ddlLayout.SelectedValue = preset.ActiveLayout;
        string redirectUrl = BuidRedirectURL(pageSEOName);
        Response.Redirect(redirectUrl);
        //BuildLayoutControl();
        //BindModuleControls();
    }
    private string BuidRedirectURL(string url)
    {
        url = GetHostURL() + "/SageEditor" + extenstion + "?pname=" + url;
        return url;
    }

    protected void ddlLayout_SelectedIndexChanged(object sender, EventArgs e)
    {

        PresetInfo preset = new PresetInfo();
        string pageName = ddlPages.SelectedValue;
        pageName = Regex.Replace(pageName, "--+", "");
        preset = PresetHelper.LoadActivePagePreset(TemplateName, GetPageSEOName(Request.Url.ToString()));
        List<KeyValue> lstLayouts = preset.lstLayouts;
        preset.ActiveLayout = ddlLayout.SelectedValue;
        bool isNewLayout = false;
        int oldPageCount = 0;
        bool isNewPage = false;
        bool deleteRepeat = false;
        bool duplicateLayout = false;
        List<string> pageList = new List<string>();
        foreach (KeyValue kvp in lstLayouts)
        {
            if (kvp.Key == preset.ActiveLayout)
            {
                duplicateLayout = true;
            }
            string[] pages = kvp.Value.Split(',');
            pageList.Add(string.Join(",", pages));
            if (pages.Count() == 1 && pages.Contains(pageName)) // for single pagename and if page = currentpageName
            {
                kvp.Key = preset.ActiveLayout;
            }
            else if (pages.Count() > 1 && pages.Contains(pageName))// for multiple pagename and if page = currentpageName
            {
                isNewLayout = true;                             //its because we have to insert another layout
                List<string> lstnewpage = new List<string>();
                foreach (string page in pages)
                {
                    if (page.ToLower() != pageName.ToLower())
                    {
                        lstnewpage.Add(page);
                    }
                }
                kvp.Value = string.Join(",", lstnewpage.ToArray());
                pageList.Add(kvp.Value);
            }
            else
            {
                oldPageCount++;
            }
            if (kvp.Value == "All" && kvp.Key == preset.ActiveLayout)
            {
                deleteRepeat = true;
            }
        }
        if (lstLayouts.Count == oldPageCount)
        {
            isNewPage = true;
        }
        List<KeyValue> lstNewLayouts = new List<KeyValue>();
        if (isNewPage)
        {
            bool isAppended = false;
            foreach (KeyValue kvp in lstLayouts)
            {
                if (kvp.Key == preset.ActiveLayout)
                {
                    if (kvp.Value.ToLower() != "all")
                    {
                        kvp.Value += "," + pageName;
                    }
                    isAppended = true;
                }
                lstNewLayouts.Add(new KeyValue(kvp.Key, kvp.Value));
            }
            if (!isAppended)
            {
                lstNewLayouts.Add(new KeyValue(preset.ActiveLayout, pageName));
            }
            lstLayouts = lstNewLayouts;
        }
        else if (isNewLayout)
        {
            bool isAppended = false;
            bool isAll = false;
            foreach (KeyValue kvp in lstLayouts)
            {
                if (kvp.Key == preset.ActiveLayout)
                {
                    if (kvp.Value.ToLower() != "all")
                    {
                        kvp.Value += "," + pageName;
                        isAll = true;
                    }
                    isAppended = true;
                }
                lstNewLayouts.Add(new KeyValue(kvp.Key, kvp.Value));
            }
            if (!isAppended && !isAll)
            {
                lstNewLayouts.Add(new KeyValue(preset.ActiveLayout, pageName));
            }
            lstLayouts = lstNewLayouts;
        }
        else if (deleteRepeat)
        {
            foreach (KeyValue kvp in lstLayouts)
            {
                if (kvp.Value.ToLower() != pageName.ToLower())
                {
                    lstNewLayouts.Add(new KeyValue(kvp.Key, kvp.Value));
                }
            }
            lstLayouts = lstNewLayouts;
        }
        else if (duplicateLayout)
        {
            string key = preset.ActiveLayout;
            List<string> pages = new List<string>();
            foreach (KeyValue kvp in lstLayouts)
            {
                if (kvp.Key.ToLower() != preset.ActiveLayout.ToLower())
                {
                    lstNewLayouts.Add(new KeyValue(kvp.Key, kvp.Value));
                }
                else
                {
                    pages.Add(kvp.Value);
                }
            }
            lstNewLayouts.Add(new KeyValue(key, string.Join(",", pages.ToArray())));
            lstLayouts = lstNewLayouts;
        }
        preset.lstLayouts = lstLayouts;
        string presetPath = Decide.IsTemplateDefault(TemplateName.Trim()) ? Utils.GetPresetPath_DefaultTemplate(TemplateName) : Utils.GetPresetPath(TemplateName);
        string pagepreset = presetPath + "/" + TemplateConstants.PagePresetFile;
        presetPath += "/" + "pagepreset.xml";
        AppErazer.ClearSysHash(ApplicationKeys.ActivePagePreset + "_" + GetPortalID);
        PresetHelper.WritePreset(presetPath, preset);
        HttpRuntime.Cache.Remove(CacheKeys.SageFrameJs);
        HttpRuntime.Cache.Remove(CacheKeys.SageFrameCss);
        SageFrame.Common.CacheHelper.Clear("PresetList");
        pageSEOName = ddlPages.SelectedValue.TrimStart('-');
        layoutName = ddlLayout.SelectedValue;
        //BuildLayoutControl();
        //BindModuleControls();
        string redirectUrl = BuidRedirectURL(pageSEOName);
        Response.Redirect(redirectUrl);
    }
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
        SageFrame.Utilities.Config.UpdateSageFrameVersionLoad(isChecked);
        if (isChecked == "true")
            showVersion();
        else
            hideVersion();
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
}
