using SageFrame.JsonParser;
using SageFrame.SocialSearch.Entities;
using SageFrame.SocialSearch.Entities.GoogleSearch;
using SageFrame.SocialSearch.Utilities;
using System.Collections.Generic;
using System.Linq;

namespace SageFrame.SocialSearch.GoogleAPI
{
    public class GoogleController
    {
        string apiKey = string.Empty;
        public GoogleController(string apiKey)
        {
            this.apiKey = apiKey;
        }


        public List<object> SearchGoogle(GoogleSearchInfo searchInfo, bool filterAll)
        {

            string searchText = GenerateQueryString(searchInfo.SearchParameters);

            Dictionary<string, string> dict = new Dictionary<string, string>() {
                { "query",searchText},
                { "language", searchInfo.LanguageCode },
                { "maxResults", searchInfo.SearchCount.ToString() },
                { "orderBy", searchInfo.OrderBy },
                {"key",apiKey }
            };

            string googleResponse = SearchPost(dict);
            List<Item> lstSearches = Deserializer.DeserializeJSON<List<Item>>("items", googleResponse);

            if (filterAll)
                if (lstSearches != null && lstSearches.Count > 0)
                {
                    int takeCount = 0;

                    int totalFound = lstSearches.Count;

                    int half = searchInfo.SearchCount / 2;
                    if (totalFound > half) takeCount = half + 1;        // TAKE 1 MORE THAN HALF
                    else if (totalFound <= half) takeCount = half;      // TAKE ALL
                    else takeCount = 0;                                 // TAKE NONE

                    lstSearches = lstSearches.Take(takeCount).ToList();
                }


            return new List<object>(lstSearches.Cast<object>());
        }

        private string GenerateQueryString(string[] searchParams)
        {
            string searchText = string.Empty;

            if (searchParams != null && searchParams.Length > 0)
            {
                foreach (string searchParam in searchParams)
                    searchText += searchParam + ",";

                searchText = searchText.Remove(searchText.Length - 1, 1);
            }
            return searchText;
        }

        private string SearchPost(Dictionary<string, string> parameters)
        {

            string encodedParams = PercentageEncoding.EncodeParameters(parameters);
            string fullURL = string.Format("{0}?{1}", ApiPoint.Google_Search_Activites, encodedParams);

            APIInvoker.FetchRest fetchRest = new APIInvoker.FetchRest();
            fetchRest.Method = "GET";

            string jsonResult = fetchRest.GetData(fullURL, string.Empty);
            return jsonResult;
        }

    }
}
