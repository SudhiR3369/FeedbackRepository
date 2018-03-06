<%@ WebService Language="C#" Class="ProductServices" %>
using System.Web.Services;
using System.Collections.Generic;
using SageFrame.WebBuilder;
using System.Web.Script.Services;
/// <summary>
/// Summary description for SageFrameGlobalWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ProductServices : System.Web.Services.WebService
{

    public ProductServices()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]

    public List<BuilderComponentJson> ComponentOfflineList()
    {
        WebBuilderController objController = new WebBuilderController();
        return objController.ComponentOfflineList();
    }
}