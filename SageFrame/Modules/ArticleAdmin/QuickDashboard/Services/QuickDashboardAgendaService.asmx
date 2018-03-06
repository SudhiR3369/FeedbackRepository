<%@ WebService Language="C#" Class="QuickDashboardAgendaService" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Services;
using SageFrame.ArticleManagement;

/// <summary>
/// Summary description for QuickDashboardAgendaService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class QuickDashboardAgendaService : AuthenticateService
{

    public QuickDashboardAgendaService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int AddUpdateAgenda(CommonAuthParam authParam, string title, DateTime agendaFor, int agendaTitleID, string[] agendaContent, int siteID, int[] articleAgendaID)
    {
        if (IsPostAuthenticated(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                AgendaController controllerObj = new AgendaController();
                return controllerObj.AddUpdateAgenda(title, agendaFor, agendaTitleID, agendaContent, authParam.CultureCode, authParam.UserName, siteID, articleAgendaID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        else
        {
            return 0;
        }
    }

    [WebMethod]
    public AgendaInfo GetAgenda(CommonAuthParam authParam, int siteID, int agendaTitleID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                AgendaController controllerObj = new AgendaController();
                return controllerObj.GetAgenda(siteID, agendaTitleID);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public List<AgendaInfo> GetAgendaTitleByDate(CommonAuthParam authParam, int siteID, int pageNumber, int pageSize)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                AgendaController controllerObj = new AgendaController();
                return controllerObj.GetAgendaTitleByDate(siteID, pageNumber, pageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public List<AgendaInfo> GetActiveAgenda(CommonAuthParam authParam, int siteID)
    {
        if (IsPostAuthenticatedView(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                AgendaController controllerObj = new AgendaController();
                return controllerObj.GetActiveAgenda(siteID);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public void DeleteAgenda(CommonAuthParam authParam, int siteID, int agendaTitleID, int agendaContentID)
    {
        if (IsPostAuthenticated(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                AgendaController controllerObj = new AgendaController();
                controllerObj.DeleteAgenda(siteID, agendaTitleID, agendaContentID, authParam.UserName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    [WebMethod]
    public void UpdateAgendaStatus(CommonAuthParam authParam, int agendaTitleID, bool activeStatus)
    {
        if (IsPostAuthenticated(authParam.PortalID, authParam.UserModuleID, authParam.UserName, authParam.SecureToken))
        {
            try
            {
                AgendaController controllerObj = new AgendaController();
                controllerObj.UpdateAgendaStatus(agendaTitleID, activeStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
