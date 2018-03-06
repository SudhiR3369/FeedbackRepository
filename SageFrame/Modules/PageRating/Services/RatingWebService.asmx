<%@ WebService Language="C#" CodeBehind="~/App_Code/RatingWebService.cs" Class="RatingWebService" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.PageRating;
using System.Web.Services;

/// <summary>
/// Summary description for RatingWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RatingWebService : SageFrame.Services.AuthenticateService
{

    public RatingWebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public double GetAverageRating(RatingAuthInfo authInfo,string pageName)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            PageRatingController controller = new PageRatingController();
            return controller.GetAverageRating(authInfo.UserModuleID, authInfo.PortalID,pageName);
        }
        else {
            return -100;
        }

    }

    [WebMethod]
    public List<PageRatingCount> GetRatingCountByPage(RatingAuthInfo authInfo,string pageName)
    {
        if (IsPostAuthenticated(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            PageRatingController controller = new PageRatingController();
            return controller.GetRatingCountByPage(authInfo.UserModuleID, authInfo.PortalID, pageName);
        }
        else {
            return null;
        }
    }

    [WebMethod]
    public int SavePageRating(string pageName,double ratingPoint, RatingAuthInfo authInfo)
    {
        if (IsPostAuthenticatedView(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            PageRatingController controller = new PageRatingController();
            return controller.SavePageRating(authInfo.UserModuleID,authInfo.PortalID, pageName, ratingPoint,authInfo.Username);
        }
        else {
            return -100;
        }
    }

    [WebMethod]
    public PageRatingSetting GetRatingSettings(RatingAuthInfo authInfo)
    {
        if (IsPostAuthenticated(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            PageRatingController controller = new PageRatingController();
            return controller.GetRatingSettings(authInfo.UserModuleID, authInfo.PortalID,authInfo.Username);
        }
        else {
            return null;
        }
    }

    [WebMethod]
    public int SaveRatingSettings(PageRatingSetting objSetting,RatingAuthInfo authInfo)
    {
        if (IsPostAuthenticated(authInfo.PortalID, authInfo.UserModuleID, authInfo.Username, authInfo.SecureToken))
        {
            PageRatingController controller = new PageRatingController();
            return controller.SaveRatingSettings(objSetting,authInfo.UserModuleID,authInfo.PortalID,authInfo.Username);
        }
        else {
                return -100;
        }

    }

}
