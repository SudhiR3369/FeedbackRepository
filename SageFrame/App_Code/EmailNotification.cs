
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for EmailNotification
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class EmailNotification : System.Web.Services.WebService
{

 [WebMethod]
 public static void NotificationEmail(string From,string sendTo,string Subject, string Body)
    {
        
        MailMessage msg = new MailMessage();
        msg.From = new MailAddress(From);
        msg.To.Add(new MailAddress(sendTo));
        msg.Body = Body;
        msg.Subject = Subject;

        SmtpClient client = new SmtpClient();

        client.Send(msg);

    }

}
