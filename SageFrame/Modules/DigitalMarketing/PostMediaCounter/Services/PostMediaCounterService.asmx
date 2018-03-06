<%@ WebService Language="C#" CodeBehind="PostMediaCounterService.cs" Class="PostMediaCounterService" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.DigitalMarketing.Entities;
using SageFrame.DigitalMarketing.Controller;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PostMediaCounterService : System.Web.Services.WebService
{

    public PostMediaCounterService()
    {

    }


    [WebMethod]
    public List<PostMediaCounterInfo> LoadPostMediaCounter()
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.GetUserPostsCount();
    }


}

