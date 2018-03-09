<%@ WebService Language="C#" Class="Feedback" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Web;
using SageFrame.Services;
using Sageframe.Feedback;

/// <summary>
/// Summary description for Feedback
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Feedback : AuthenticateService
{
    [WebMethod]
    public string InsertFeedback(FeedbackDetails submit)
    {
        try
        {
            FeedbackController FC = new FeedbackController();
            FC.Insert(submit);
            return "Hello";
        }
        catch
        {
            throw;
        }
    }
    //[WebMethod]
    //public List<FeedbackDetails>GetAllFeedbacks(FeedbackDetails obj)
    //{
    //    try
    //    {

    //        FeedbackController FC = new FeedbackController();
    //        return FC.GetAllFeedbacks(obj);
    //    }
    //    catch (Exception ex)
    //    {
    //        throw ex;
    //    }
    //}

    [WebMethod]
    public string MarkAsRead(FeedbackDetails submit)
    {
        try
        {
            FeedbackController FC = new FeedbackController();
            FC.MarkAsRead(submit);
            return "Hello";
        }
        catch
        {
            throw;
        }
    }

    [WebMethod]
    public List<FeedbackDetails>GetResult(FeedbackDetails data)
    {
        try
        {

            FeedbackController FC = new FeedbackController();
            return FC.GetAllFeedbacks(data);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}

