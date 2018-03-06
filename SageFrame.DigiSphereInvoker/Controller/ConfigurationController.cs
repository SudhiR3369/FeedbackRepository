using SageFrame.DigiSphereInvoker.DataProvider;
using SageFrame.DigiSphereInvoker.Entities;
using SageFrame.ReturnCode.Entities;
using System.Collections.Generic;

namespace SageFrame.DigiSphereInvoker.Controller
{
    public class ConfigurationController
    {

        public List<AdvisionInfo> GetAdvisionSettings()
        {
            ConfigurationProvider configProvider = new ConfigurationProvider();
            return configProvider.GetAdvisionSettings();
        }

        public string AdvisionGetCategory()
        {
            ConfigurationProvider configProvider = new ConfigurationProvider();
            return configProvider.AdvisionGetCategory();
        }


        public MessageCode SaveConfiguration(string sectorDetail, string siteCategoryDetail, string[] businessTypesDetail, string[] keywordDetail)
        {
            ConfigurationProvider configProvider = new ConfigurationProvider();
            return configProvider.SaveConfiguration(sectorDetail, siteCategoryDetail, businessTypesDetail, keywordDetail);
        }
    }
}
