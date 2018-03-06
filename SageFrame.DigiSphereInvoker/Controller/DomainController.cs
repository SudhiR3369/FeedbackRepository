using Newtonsoft.Json;
using SageFrame.APIInvoker;
using SageFrame.DigiSphereInvoker.Entities;
using SageFrame.DigiSphereInvoker.Utilities;
using SageFrame.Security.Crypto;
using SageFrame.Utilities;
using System;
using System.Net.Http;

namespace SageFrame.DigiSphereInvoker.Controller
{
    public class DomainController
    {
        public SiteResourceConsumptionInfo GetSiteConsumptionDetail(string domainName)
        {
            string configurecode = Config.GetSetting("configurecode").ToString();

            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "Get";

            domainName = domainName.Replace('.', '_');
            
            string siteConsumptionURL = string.Format(APIEndPoint.GetSiteConsumption, domainName);
            string returnValue = fetchRest.GetData(siteConsumptionURL, string.Empty);

            if (returnValue != string.Empty)
            {
                SiteResourceConsumptionInfo siteConsumptionInfo = JsonParser.Deserializer.DeserializeJSON<SiteResourceConsumptionInfo>(returnValue);
                return siteConsumptionInfo;
            }
            return null;
        }
        public void TriggerSiteConfig(string domainName, string configcode)
        {
            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "POST";
            string data = JsonConvert.SerializeObject(new ConfigSuccess() { DomainName = domainName, Configcode = configcode });
            string returnValue = fetchRest.GetData(APIEndPoint.TriggerConfig, string.Empty);
        }
    }
}
