<%@ WebService Language="C#" Class="ComponentTemplate" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrame.Services;
using SageFrame.ArticleManagement;
using System.Collections.Generic;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ComponentTemplate : AuthenticateService
{
    [WebMethod]
    public int AddUpdateTemplate(CommonAuthParam auth, ArticleTemplateInfo templateInfo)
    {
        if (IsPostAuthenticated(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleTemplateController objCon = new ArticleTemplateController();
            templateInfo.AddedBy = auth.UserName;
            return objCon.AddUpdateTemplate(templateInfo);
        }
        else
        {
            return -1;
        }
    }
    [WebMethod]
    public List<ArticleTemplateInfo> GetAllTemplate(CommonAuthParam auth, ArticleTemplateInfo filterInfo, int offset, int limit,int siteID)
    {
        List<ArticleTemplateInfo> lstTemplate = new List<ArticleTemplateInfo>();
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleTemplateController objCon = new ArticleTemplateController();
            List<ArticleTemplateInfo> templst = objCon.GetAllTemplate(filterInfo, offset, limit,siteID);
            foreach (ArticleTemplateInfo info in templst)
            {
                info.TemplateViewDom = HttpUtility.HtmlDecode(info.TemplateViewDom);
                lstTemplate.Add(info);
            }

        }
        return lstTemplate;
    }
    [WebMethod]
    public ArticleTemplateInfo GetTemplateByID(CommonAuthParam auth, int templateID)
    {
        if (IsPostAuthenticatedView(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleTemplateController objCon = new ArticleTemplateController();
            ArticleTemplateInfo info=objCon.GetTemplateByID(templateID);
            info.TemplateEditDOM = HttpUtility.HtmlDecode(info.TemplateEditDOM);
            return info;
        }
        else { return null; }
    }
    [WebMethod]
    public int DeleteTemplateByID(CommonAuthParam auth, int templateID)
    {
        if (IsPostAuthenticated(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleTemplateController objCon = new ArticleTemplateController();
            return  objCon.DeleteTemplateByID(templateID);
        }
        else { return -1; }
    }
    [WebMethod]
    public int SetDefaultTemplateID(CommonAuthParam auth, int templateID,int siteID)
    {
        if (IsPostAuthenticated(auth.PortalID, auth.UserModuleID, auth.UserName, auth.SecureToken))
        {
            ArticleTemplateController objCon = new ArticleTemplateController();
            objCon.SetDefaultTemplateID(templateID,siteID);
            return 1;
        }
        else { return -1; }
    }
}