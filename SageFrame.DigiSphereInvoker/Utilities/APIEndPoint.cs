using SageFrame.Web;
using System.Configuration;

namespace SageFrame.DigiSphereInvoker.Utilities
{
    public class APIEndPoint
    {

        private static string GetAPIEndPoint()
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string _AppURL = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.DigiSphereApi);
            return _AppURL;
        }
        public static string AppURL = GetAPIEndPoint();

        public static string GetAllSectors = AppURL + "/sector";

        public static string GetSiteCategoriesBySectorID = AppURL + "/sitecategory/{0}";

        public static string GetBusinessTypeBySectorAndSite = AppURL + "/businesstype/{0}/{1}";

        public static string GetSpecificBusinessKeyWords = AppURL + "/keyword/{0}/{1}/{2}";

        public static string GetSiteConsumption = AppURL + "/consumption/{0}/";

        public static string GetAvailalbeBusinessKeyWords = AppURL + "/keywords";

        public static string GetByKeywords = AppURL + "/keywords/ids/{0}";
        public static string AutomatedTaskRequest = AppURL + "/request";
        public static string TriggerConfig = AppURL + "/triggerconfig";

    }
}
