<%@ WebService Language="C#" CodeBehind="SiteHostStat.cs" Class="SiteHostStat" %>

using System.Web.Services;
using SageFrame.DigiSphereInvoker.Controller;
using SageFrame.DigiSphereInvoker.Entities;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

[System.Web.Script.Services.ScriptService]
public class SiteHostStat : WebService
{

    public SiteHostStat() { }

    [WebMethod]
    public SiteResourceConsumptionInfo GetSiteConsumptionDetail()
    {
        string domainName = System.Web.HttpContext.Current.Request.Url.Host;

        DomainController controller = new DomainController();
        return controller.GetSiteConsumptionDetail(domainName);
    }

}
