using AjaxControlToolkit;
using SageFrame;
using SageFrame.Common;
using SageFrame.Framework;
using SageFrame.ModuleControls;
using SageFrame.ModuleManager.Controller;
using SageFrame.Pages;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ComponentEdit : PageBase, SageFrameRoute
{
    int portalID = 0;
    int moduledefID = 0;
    int pageID = 0;
    int userModuleID = 0;
    public string pageSrc = string.Empty;
    string appPath;
    Uri url;
    protected void Page_Init(object sender, EventArgs e)
    {
        url = HttpContext.Current.Request.Url;
        CheckLogin();
        ltrJQueryLibrary.Text = GetJqueryLibraryPath();
    }

    private void CheckLogin()
    {
        if (IsUserLoggedIn())
        {

        }
        else
        {
            StringBuilder redirecPath = new StringBuilder();
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

    protected void Page_Load(object sender, EventArgs e)
    {
        //check pagePermission and load Control.
        CheckPermissionLoadControl("componentadmin");
        SetGlobalVariable();
    }
    protected void ComponentAdminControl(string ControlName, string UserModuleID)
    { 
        bool IsSortable = true;
        string ctrlSrc = GetAppPath() + "/Modules/WBComponentAdmin/" + ControlName;
        if (Directory.Exists(Server.MapPath(ctrlSrc)))
        {
            List<ModuleControlInfo> lstModCtls = new List<ModuleControlInfo>();
            string[] files = Directory.GetFiles(Server.MapPath(ctrlSrc)).Select(file => Path.GetFileName(file)).ToArray();
            ctrlSrc = ctrlSrc + "/";
            string[] ControlTitle;
            TabContainerManagePages.Visible = false;
            foreach (string fileName in files)
            {
                string NameOnly = Path.GetFileNameWithoutExtension(fileName);
                if (Path.GetExtension(fileName) == ".ascx")
                {
                    ControlTitle = NameOnly.Split('-');
                    int len = ControlTitle.Length;
                    if (len > 1)
                    {

                        NameOnly = String.Join("-", ControlTitle.Take(len - 1));//name can have dash.
                        try
                        {
                            lstModCtls.Add(new ModuleControlInfo { ControlTitle = NameOnly, ControlSrc = ctrlSrc + fileName, DisplayOrder = Int32.Parse(ControlTitle.Last()) });
                        }
                        catch
                        {  // having dash but not number in last
                            IsSortable = false;
                            lstModCtls.Add(new ModuleControlInfo { ControlTitle = NameOnly, ControlSrc = ctrlSrc + fileName });
                        }
                    }
                    else //with out dash
                    {
                        lstModCtls.Add(new ModuleControlInfo { ControlTitle = ControlTitle[0], ControlSrc = ctrlSrc + fileName });
                        IsSortable = false;
                    }
                }
            }
            if (IsSortable)
            {
                lstModCtls = lstModCtls.OrderBy(o => o.DisplayOrder).ToList();
            }
            foreach (ModuleControlInfo CtrlInfo in lstModCtls)
            {
                TabPanel tp = new TabPanel();
                tp.HeaderText = CtrlInfo.ControlTitle;
                SageUserControl ctl = this.Page.LoadControl(CtrlInfo.ControlSrc) as SageUserControl;
                ctl.EnableViewState = true;
                ctl.SageUserModuleID = UserModuleID;
                tp.Controls.Add(ctl);
                TabContainerManagePages.Tabs.Add(tp);
            }
            TabContainerManagePages.Visible = true;
        }
        else
        {
            TabContainerManagePages.Visible = false;
            StringBuilder redirecPath = new StringBuilder();
            redirecPath.Append(url.Scheme);
            redirecPath.Append("://");
            redirecPath.Append(url.Authority);
            redirecPath.Append(PortalAPI.PageNotAccessibleURL);
            HttpContext.Current.Response.Redirect(redirecPath.ToString());
        }
    }
    private void CheckPermissionLoadControl(string PageSEOName)
    {
        PageSEOName=GetPageSEOName(PageSEOName);
        StringBuilder redirecPath = new StringBuilder();
        Uri url = HttpContext.Current.Request.Url;
        if (PageSEOName != string.Empty)
        {
            DataSet dsPageSettings = new DataSet();
            SageFrameConfig sfConfig = new SageFrameConfig();
            dsPageSettings = sfConfig.GetPageSettingsByPageSEONameForAdmin("1", PageSEOName, GetUsername);
            if (bool.Parse(dsPageSettings.Tables[0].Rows[0][0].ToString()) == true)// Is Page Exists
            {
                if (bool.Parse(dsPageSettings.Tables[0].Rows[0][1].ToString()) == true)// Is Page Aceessable
                {
                    try
                    {
                        int userModuleID = Int32.Parse(ParamCollection[0]);
                        ComponentAdminControl(ParamCollection[1], userModuleID.ToString());
                    }
                    catch (Exception ex)
                    {
                        redirecPath.Append(url.Scheme);
                        redirecPath.Append("://");
                        redirecPath.Append(url.Authority);
                        redirecPath.Append(PortalAPI.PageNotAccessibleURL);
                        HttpContext.Current.Response.Redirect(redirecPath.ToString());
                    }

                }
                else
                {
                    redirecPath.Append(url.Scheme);
                    redirecPath.Append("://");
                    redirecPath.Append(url.Authority);
                    redirecPath.Append(PortalAPI.PageNotAccessibleURL);
                    HttpContext.Current.Response.Redirect(redirecPath.ToString());
                }
            }
            else
            {
                redirecPath.Append(url.Scheme);
                redirecPath.Append("://");
                redirecPath.Append(url.Authority);
                redirecPath.Append(PortalAPI.PageNotFoundURL);
                HttpContext.Current.Response.Redirect(redirecPath.ToString());
            }
        }
    }
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
    private void SetGlobalVariable()
    {
        appPath = GetAppPath();
        RegisterSageGlobalVariable();
    }
    #endregion
    /// <summary>
    /// Registers the Javascript variables to the browser
    /// </summary>
    public void RegisterSageGlobalVariable()
    {
        try
        {
            StringBuilder clientScript = new StringBuilder();
            clientScript.Append("var SageFrameAppPath='");
            clientScript.Append(GetAppPath());
            clientScript.Append("';");
            clientScript.Append(" var SageFrameUserName='");
            clientScript.Append(GetUsername);
            clientScript.Append("';");
            clientScript.Append(" var SageFrameCurrentCulture='");
            clientScript.Append(GetCurrentCulture());
            clientScript.Append("';");
            clientScript.Append(" var SageFramePortalID='");
            clientScript.Append(GetPortalID);
            clientScript.Append("';");
            clientScript.Append(" var SageFramePortalName='");
            clientScript.Append(GetPortalSEOName);
            clientScript.Append("';");
            clientScript.Append(" var SageFrameActiveTemplate='");
            clientScript.Append(GetActiveTemplate);
            clientScript.Append("';");
            clientScript.Append(" var SageFrameHostURL='");
            clientScript.Append(GetHostURL);
            clientScript.Append("';");
            clientScript.Append(" var SageFrameSecureToken='");
            clientScript.Append(SageFrameSecureToken);
            clientScript.Append("';");
            SageFrameConfig sfConfig = new SageFrameConfig();
            string ms = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MessageTemplate);
            clientScript.Append(" var MsgTemplate='");
            clientScript.Append(ms);
            clientScript.Append("';");
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SageFrameGlobalVar1", clientScript.ToString(), true);
        }
        catch { }
    }
}