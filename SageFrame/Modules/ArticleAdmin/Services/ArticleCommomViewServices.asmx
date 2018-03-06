<%@ WebService Language="C#" Class="ArticleCommomViewServices" %>
using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrame.Services;
using System.Data;
using SageFrame.ArticleManagement;
using Newtonsoft.Json;
using System.Collections.Generic;
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ArticleCommomViewServices : AuthenticateService
{
    [WebMethod]
    //public List<ArticleInfo> GetAllDataView(string OffSet, string Limit, FilterInfo ObjInfo,string SiteID)
    public List<ArticleInfo> GetAllDataView(string OffSet, string Limit, string CategoryIDs,string Keywords,string Location,string ArticleTypeIDs,string SiteID)
    {
        try
        {
            CommonControllerView objController = new CommonControllerView();
            List<ArticleInfo> lst = objController.GetAllDataView(OffSet, Limit, CategoryIDs,Keywords,Location,ArticleTypeIDs,SiteID);
            return lst;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public List<ArticleTemplateInfo> GetAllTemplateView(string LayoutType,string SiteID)
    {
        try
        {
            CommonControllerView objController = new CommonControllerView();
            List<ArticleTemplateInfo> lst = objController.GetAllTemplateView(LayoutType,SiteID);
            int len = lst.Count;
            for (int i = 0; i < len; i++)
            {
                lst[i].TemplateViewDom=HttpUtility.HtmlDecode(lst[i].TemplateViewDom);
                lst[i].DataReplaceFrameDom=HttpUtility.HtmlDecode(lst[i].DataReplaceFrameDom);
            }
            return lst;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public List<CategoryInfo> GetCategoryAllView(string SiteID)
    {
        try
        {
            CommonControllerView objController = new CommonControllerView();
            return objController.GetCategoryAllView(SiteID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }   
}