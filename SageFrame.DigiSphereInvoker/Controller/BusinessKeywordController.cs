using SageFrame.APIInvoker;
using SageFrame.DigiSphereInvoker.Entities;
using SageFrame.DigiSphereInvoker.Utilities;
using System.Collections.Generic;
using System.Linq;

namespace SageFrame.DigiSphereInvoker.Controller
{
    public class BusinessKeywordController
    {


        /// <summary>
        /// Invoke DigiSphere API to retrieve a list of sectors
        /// </summary>
        /// <returns></returns>
        public List<BusinessKeywordInfo> GetBusinessKeyWords(int sectorID, int siteCatID, int[] businessTypeIDs)
        {

            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "Get";

            List<BusinessKeywordInfo> lstTotalKeywords = new List<BusinessKeywordInfo>();

            for (int i = 0; i < businessTypeIDs.Length; i++)
            {
                string businessKeywordURL = string.Format(APIEndPoint.GetSpecificBusinessKeyWords, sectorID, siteCatID, businessTypeIDs[i]);
                string returnValue = fetchRest.GetData(businessKeywordURL, string.Empty);

                if (returnValue != string.Empty)
                {
                    List<BusinessKeywordInfo> lstBusinessKeywords = JsonParser.Deserializer.DeserializeJSON<List<BusinessKeywordInfo>>(returnValue);

                    if (lstBusinessKeywords != null && lstBusinessKeywords.Count > 0)
                        for (int j = 0; j < lstBusinessKeywords.Count; j++)
                        {
                            if (!lstTotalKeywords.Exists(x => x.Keyword.ToLower() == lstBusinessKeywords[j].Keyword.ToLower()))
                                lstTotalKeywords.Add(lstBusinessKeywords[j]);
                        }
                }
            }

            return lstTotalKeywords;
        }



        /// <summary>
        /// Invoke DigiSphere API to retrieve a list of all the available sectors
        /// </summary>
        /// <returns></returns>
        public List<BusinessKeywordInfo> GetAvailableKeywords()
        {
            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "Get";
            string returnValue = fetchRest.GetData(APIEndPoint.GetAvailalbeBusinessKeyWords, string.Empty);

            if (returnValue != string.Empty)
            {
                List<BusinessKeywordInfo> lstBusinessKeywords = JsonParser.Deserializer.DeserializeJSON<List<BusinessKeywordInfo>>(returnValue);
                return lstBusinessKeywords;
            }

            return null;
        }


        public KeywordDetailInfo FindByKeywords(string keywords)
        {
            FetchRest fetchRest = new FetchRest();
            fetchRest.Method = "Get";
            string keyWordURL = string.Format(APIEndPoint.GetByKeywords, keywords);

            string returnValue = fetchRest.GetData(keyWordURL, string.Empty);

            if (returnValue != string.Empty)
            {
                KeywordDetailInfo lstBusinessKeywords = JsonParser.Deserializer.DeserializeJSON<KeywordDetailInfo>(returnValue);
                return lstBusinessKeywords;
            }

            return null;
        }

    }
}
