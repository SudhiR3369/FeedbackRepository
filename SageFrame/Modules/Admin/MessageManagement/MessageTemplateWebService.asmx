<%@ WebService Language="C#" Class="MessageTemplateWebService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using SageFrameClass.MessageManagement;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class MessageTemplateWebService : System.Web.Services.WebService
{

    [WebMethod]
    public string ReplaceAllToken(string RawMessage, string sageFrameUser,int PortalID)
    {
        string ReplaceMessage = MessageToken.ReplaceAllMessageToken(RawMessage, sageFrameUser, 1);
        return ReplaceMessage;
    }
}