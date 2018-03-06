using SageFrame.APIInvoker;
using SageFrame.DigiSphereInvoker.Entities;
using SageFrame.DigiSphereInvoker.Utilities;
using System.Collections.Generic;

namespace SageFrame.DigiSphereInvoker.Controller
{
    public class BusinessTypeController
    {

        public List<BusinessTypeInfo> GetBusinessType(int sectorID, int siteCatID)
        {

            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "Get";

            string businessTypeURL = string.Format(APIEndPoint.GetBusinessTypeBySectorAndSite, sectorID, siteCatID);
            string returnValue = fetchRest.GetData(businessTypeURL, string.Empty);

            if (returnValue != string.Empty)
            {
                List<BusinessTypeInfo> lstBusinessTypes = JsonParser.Deserializer.DeserializeJSON<List<BusinessTypeInfo>>(returnValue);
                return lstBusinessTypes;
            }
            return null;

        }


    }
}
