using SageFrame.Common;
using SageFrame.Framework;
using SageFrame.ModuleManager.Controller;
using SageFrame.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;

public partial class CommonEdit : PageBase
{
    int portalID = 0;
    int moduledefID = 0;
    int pageID = 0;
    int userModuleID = 0;
    public string pageSrc = string.Empty;
    protected void Page_Init(object sender, EventArgs e)
    {
        CheckLogin();
    }

    private void CheckLogin()
    {
        if (IsUserLoggedIn())
        {

        }
        else
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

    protected void Page_Load(object sender, EventArgs e)
    {

        pageSrc = Page.Request.Url.Scheme + "://" + Request.Url.Authority;
        if (Request.QueryString["uid"] != null)
        {
            userModuleID = int.Parse(Request.QueryString["uid"].ToString());
        }
        if (Request.QueryString["pageID"] != null)
        {
            pageID = int.Parse(Request.QueryString["pageID"].ToString());
        }
        if (Request.QueryString["pid"] != null)
        {
            portalID = int.Parse(Request.QueryString["pid"].ToString());
        }
        if (Request.QueryString["mdefID"] != null)
        {
            moduledefID = int.Parse(Request.QueryString["mdefID"].ToString());
        }
        if (portalID == 0)
        {
            portalID = GetPortalID;
        }
        BindPages();
    }
    protected void BindPages()
    {
        List<PageEntity> lstMenu = new List<PageEntity>();

        PageController objPageController = new PageController();
        lstMenu = objPageController.GetMenuFront(1, false);
        foreach (PageEntity obj in lstMenu)
        {
            obj.ChildCount = lstMenu.Count(
                delegate (PageEntity objMenu)
                {
                    return (objMenu.ParentID == obj.PageID);
                }
                );
        }

        StringBuilder html = new StringBuilder();
        html.Append("<option value='0'>Please Select a Page</option>");
        foreach (PageEntity objPageentity in lstMenu)
        {
            string selected = objPageentity.PageID == pageID ? "selected='selected'" : "";
            html.Append("<option " + selected + " value='" + objPageentity.PageID + "'>");
            html.Append(objPageentity.PageName);
            html.Append("</option>");
        }
        ltrPageList.Text = html.ToString();
        BindPageModules(pageID);
    }
    protected void BindPageModules(int pageID)
    {
        List<SageFrame.ModuleManager.UserModuleInfo> objModuleInfo = new List<SageFrame.ModuleManager.UserModuleInfo>();
        objModuleInfo = ModuleController.GetPageModules(pageID, portalID, false);
        StringBuilder html = new StringBuilder();
        html.Append("<option value='0'>Please Select a Module</option>");
        string pageURL = pageSrc + "/CommonEdit.aspx";
        foreach (SageFrame.ModuleManager.UserModuleInfo userModule in objModuleInfo)
        {
            if (userModule.ControlsCount > 1)
            {
                string linkurl = pageURL + "?uid=" + userModule.UserModuleID + "&mdefID=" + userModule.ModuleDefID + "&pageID=" + pageID + "&pid=" + 1;
                string selected = userModule.ModuleDefID == moduledefID ? "selected='selected'" : "";
                html.Append("<option " + selected + "value='" + linkurl + "' >");
                html.Append(userModule.UserModuleTitle);
                html.Append("</option>");
            }
        }
        ltrModuleList.Text = Page.Request.Url.Scheme + "://" + Request.Url.Authority + "/CommonEdit.aspx";// html.ToString();
        ltrModuleList.Text = html.ToString();
        BindModuleDetail();
    }

    protected void BindModuleDetail()
    {
        if (userModuleID > 0 && moduledefID > 0)
        {
            iframeHolder.Visible = true;
            StringBuilder html = new StringBuilder();
            string src = pageSrc;
            src += "/Sagin/HandleModuleControls.aspx?";
            src += "uid=" + userModuleID + "&pid=" + 1 + "&mdefID=" + moduledefID;
            html.Append("<iframe id='divFrame' src='" + src + "'></iframe>");
            ltrIframe.Text = html.ToString();
        }
        else
        {
            ltrIframe.Text = "<span class='choosePageModule'>Please select a Page from Page dropdown list and a module from module dropdown list</span>";

        }
    }
}