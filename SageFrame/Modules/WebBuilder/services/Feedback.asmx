﻿<%@ WebService Language="C#" Class="Feedback" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Web;
using SageFrame.Services;
using Sageframe.Feedback;
using SageFrame.SageFrameClass.MessageManagement;

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

    [WebMethod]
    public string MarkAsRead(int ID)
    {
        try
        {
            FeedbackController FC = new FeedbackController();
            FC.MarkAsRead(ID);
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

    [WebMethod]
    public void SendNotificationEmail(string From, string sendTo, string Subject, string Body,string CC, string BCC)
    {
        MailHelper.SendMailNoAttachment(From, sendTo, Subject, Body, string.Empty, string.Empty);
    }

}

