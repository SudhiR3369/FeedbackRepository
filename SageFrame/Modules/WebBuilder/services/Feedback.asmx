<%@ WebService Language="C#" Class="Feedback" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Web;
using SageFrame.Services;
using Sageframe.Feedback;
using System.Net.Mail;
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
    public List<FeedbackDetails> GetResult(FeedbackDetails data)
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
    public void SendNotificationEmail(string From, string sendTo, string Subject, string Body, string CC, string BCC)
    {
        MailHelper.SendEMail(From, sendTo, Subject, Body, CC, string.Empty);
    }

    [WebMethod]
    public FeedbackDetails GetFeedbackByID(int ID)
    {
        try
        {
            FeedbackController FC = new FeedbackController();
            return FC.GetFeedbackByID(ID);
        }
        catch(Exception ex)
        {
                throw ex;
        }
    }

    [WebMethod]
    public void NotificationEmail(string Subject, string Body)
    {


        try
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string ServerPort = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPServer);
            string SMTPPassword = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPPassword);
            string SMTPUsername = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPUsername);
            string SMTPAuthentication = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPAuthentication);
            // string SMTPEnableSSL = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPEnableSSL);
            string[] SMTPServer = ServerPort.Split(':');


            MailMessage mail = new MailMessage();
            mail.To.Add("finalgoal123@gmail.com");
            // mail.CC.Add(CC);
            mail.From = new MailAddress(SMTPUsername);
            mail.Subject = Subject;
            // string Body = "Name:"+TextBoxName.Text+" Phone Number: "+TextPhone.Text;
            mail.Body = Body;
            mail.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = SMTPServer[0];//"smtp.gmail.com";
            smtp.EnableSsl = true;
            smtp.Credentials = new System.Net.NetworkCredential(SMTPUsername, SMTPPassword);
            smtp.Send(mail);
            // lblStatus.Text = "Message send successfully.";
            //textMessage.Text = "";
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

}

