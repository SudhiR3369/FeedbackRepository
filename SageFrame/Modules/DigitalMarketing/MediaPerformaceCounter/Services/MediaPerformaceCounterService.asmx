<%@ WebService Language="C#" CodeBehind="MediaPerformaceCounterService.cs" Class="MediaPerformaceCounterService" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.DigitalMarketing.Entities;
using SageFrame.DigitalMarketing.Controller;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class MediaPerformaceCounterService : System.Web.Services.WebService
{

    public MediaPerformaceCounterService()
    {

    }


    [WebMethod]
    public List<SocialMediaType> GetAvailableSocialMediaTypes()
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.GetAvailableSocialMediaTypes();
    }

    [WebMethod]
    public List<SocialMediaAttribute> GetAvailableSocialMediaAttributes()
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.GetAvailableSocialMediaAttributes();
    }

    [WebMethod]
    public List<SocialMediaAttribute> GetAttributesForPerformanceCounterByTypeID(int mediaTypeID)
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.GetAvailableAttributesForPerformanceCounterByTypeID(mediaTypeID);
    }


    [WebMethod]
    public int AddUpdatePerformanceCounterItem(int performanceID, int userModuleID, int mTypeAttributeMapID)
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.AddUpdatePerformanceCounterItem(performanceID, userModuleID, mTypeAttributeMapID);
    }

    [WebMethod]
    public List<SocialMediaPerformanceCounterInfo> LoadMediaPerformaceCounter(int userModuleID)
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.GetPerformanceCountersByModuleID(userModuleID);
    }
    //AddUpdatePerformanceCounterItem

    [WebMethod]
    public int DeleteCounterObjectByID(int performanceCounterID)
    {
        UserChoiceResponseController provider = new UserChoiceResponseController();
        return provider.DeleteCounterObjectByID(performanceCounterID);
    }

    [WebMethod]
    public List<AttributeStatisticsForMediaType> GetMediaPostStatisticsForPerformanceCounter(int performanceCounterID)
    {
        UserChoiceResponseController provider = new UserChoiceResponseController();
        return provider.GetMediaPostStatisticsForPerformanceCounter(performanceCounterID);
    }

    [WebMethod]
    public List<PostMediaCounterInfo> LoadPostMediaCounter()
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.GetUserPostsCount();
    }



}

