<%@ WebService Language="C#" Class="ReporterManagementWebservices" %>
using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using System.Data;
using SageFrame.Web;
using SageFrame.Web.Utilities;
using System.IO;
using SageFrame.Services;
using SageFrame.ArticleManagement;
using SageFrame.MediaManagement;
using Newtonsoft.Json;
using SageFrame.WorkflowManagement;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ReporterManagementWebservices : AuthenticateService
{
    [WebMethod]
    public int AddReporterNews(CommonAuthParam CAP, ArticleInfo objInfo,string categoryIDs,string authorIDs,List<MediaInfo> objInfoMedia,string ExternalLinks,string RoleID,int SiteID)
    {
        try
        {
            if (IsPostAuthenticated(CAP.PortalID, CAP.UserModuleID, CAP.UserName, CAP.SecureToken))
            {
                ArticleController objController = new ArticleController();
                objController.AddReporterNews(objInfo, categoryIDs, authorIDs, objInfoMedia, ExternalLinks,  RoleID,SiteID);
                return 1;
            }
            else
            {
                return 2;
            }
        }
        catch (Exception ex)
        {
                throw ex;
        }
    }
    [WebMethod]
    public List<ArticleActivityLog> GetAllActivityVersionLog(CommonAuthParam objAuth, int ArticleID)
    {
        try
        {
            ArticleController objController = new ArticleController();
            return objController.GetAllActivityVersionLog(ArticleID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public int DeleteReporterNewsByID(CommonAuthParam CAP, string ArticleIDs)
    {
        try
        {
            if (IsPostAuthenticated(CAP.PortalID, CAP.UserModuleID, CAP.UserName, CAP.SecureToken))
            {
                ArticleController objController = new ArticleController();
                objController.DeleteReporterNewsByID(ArticleIDs);
                return 1;
            }
            else
            {
                return 2;
            }
        }
        catch (Exception ex)
        {
            throw ex;

        }
    }
    [WebMethod]
    public int DeleteReporterNewsByIDs(CommonAuthParam CAP, string[] ArticleIDs)
    {
        try
        {
            if (IsPostAuthenticated(CAP.PortalID, CAP.UserModuleID, CAP.UserName, CAP.SecureToken))
            {
                ArticleController objController = new ArticleController();
                objController.DeleteReporterNewsByIDs(ArticleIDs);
                return 1;
            }
            else
            {
                return 2;
            }
        }
        catch (Exception ex)
        {
            throw ex;

        }
    }
    [WebMethod]
    public string GetAllDataByID(CommonAuthParam objAuth, int ArticleID)
    {
        if (IsPostAuthenticatedView(objAuth.PortalID, objAuth.UserModuleID, objAuth.UserName, objAuth.SecureToken))
        {
            ArticleController objController = new ArticleController();
            DataSet ds = objController.GetAllDataByID(ArticleID);
            
            string str = JsonConvert.SerializeObject(ds);
            str = HttpUtility.HtmlDecode(str);
            return str;
        }
        else { return null; }
    }
    [WebMethod]
    public List<CategoryInfo> GetCategoryAll(int SiteID)
    {
        try
        {
            ArticleController objController = new ArticleController();
            return objController.GetCategoryAll(SiteID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }    
    [WebMethod]
    public List<ArticleInfo> GetArticleEntryType()
    {
        try
        {
            ArticleController objController = new ArticleController();
            return objController.GetArticleEntryType();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public List<aspnetUsers> GetAuthorByRole(string RoleID)//GetEditorByRole
    {
        try
        {
            ArticleController objController = new ArticleController();
            return objController.GetAuthorByRole(RoleID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public List<aspnetUsers> GetEditorByRole()
    {
        try
        {
            ArticleController objController = new ArticleController();
            return objController.GetEditorByRole();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [WebMethod]
    public List<aspnetUsers> GetUserIdByUsername(string Username)
    {
        try
        {
            ArticleController objController = new ArticleController();
            return objController.GetUserIdByUsername(Username);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }    
    [WebMethod]
    public List<ArticleInfo> GetAllDataIntoGrid(int OffSet, int Limit, FilterInfo ObjInfo,string AddedBy,string RoleID,int SiteID)
    {
        try
        {
            //CommonController ComCon = new CommonController();
            //List<RoleInfo> lstRole = ComCon.GetRolesByUsername(AddedBy);
            //Guid roleID = lstRole[0].RoleId;
            //string roleIDs = "69A340A4-5B55-475E-8447-4C552F867F00";

            ArticleController objController = new ArticleController();
            List<ArticleInfo> lst = objController.GetAllDataIntoGrid(OffSet, Limit, ObjInfo, AddedBy,RoleID,SiteID);
            return lst;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
