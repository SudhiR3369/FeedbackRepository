using SageFrame.DigiSphereInvoker.Entities;
using System.Collections.Generic;
using SageFrame.DigiSphereInvoker.Utilities;
using SageFrame.APIInvoker;

namespace SageFrame.DigiSphereInvoker.Controller
{
    public class SiteCategoryController
    {


        /// <summary>
        /// Invoke DigiSphere API to retrieve a list of Site Categories by Sector ID
        /// </summary>
        /// <param name="sectorID"></param>
        /// <returns></returns>
        public List<SiteTypeInfo> GetSiteCategoriesBySectorID(int sectorID)
        {
            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "Get";

            string siteCategoryURL = string.Format(APIEndPoint.GetSiteCategoriesBySectorID, sectorID);
            string returnValue = fetchRest.GetData(siteCategoryURL, string.Empty);

            if (returnValue != string.Empty)
            {
                List<SiteTypeInfo> lstSectors = JsonParser.Deserializer.DeserializeJSON<List<SiteTypeInfo>>(returnValue);
                return lstSectors;
            }
            return null;
        }



    }
}
