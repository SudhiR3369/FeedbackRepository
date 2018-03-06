using SageFrame.DigiSphereInvoker.Entities;
using System.Collections.Generic;
using SageFrame.DigiSphereInvoker.Utilities;
using SageFrame.APIInvoker;

namespace SageFrame.DigiSphereInvoker.Controller
{
    public class BusinessSectorController
    {

        /// <summary>
        /// Invoke DigiSphere API to retrieve a list of sectors
        /// </summary>
        /// <returns></returns>
        public List<SectorTypeInfo> GetSectorTypes()
        {
            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "Get";
            string returnValue = fetchRest.GetData(APIEndPoint.GetAllSectors, string.Empty);

            if (returnValue != string.Empty)
            {
                List<SectorTypeInfo> lstSectors = JsonParser.Deserializer.DeserializeJSON<List<SectorTypeInfo>>(returnValue);
                return lstSectors;
            }
            return null;

        }
    }
}
