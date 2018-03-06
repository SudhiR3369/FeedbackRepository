using SageFrame.JsonParser;
using SageFrame.SocialSearch.Entities;
using SageFrame.SocialSearch.Entities.TwitterSearch;
using SageFrame.SocialSearch.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace SageFrame.SocialSearch.TwitterAPI
{
    public class TwitterController
    {
        #region ---- PUBLIC FIELDS ----

        public string SignatureMethod { get; set; } = "HMAC-SHA1";
        public string ConsumerKey { get; private set; } = string.Empty;
        public string ConsumerSecret { get; private set; } = string.Empty;
        public string AccessToken { get; private set; } = string.Empty;
        public string AccessTokenSecret { get; private set; } = string.Empty;

        #endregion

        public TwitterController(string ConsumerKey, string ConsumerSecret, string AccessToken, string AccessTokenSecret)
        {
            this.ConsumerKey = ConsumerKey;
            this.ConsumerSecret = ConsumerSecret;
            this.AccessToken = AccessToken;
            this.AccessTokenSecret = AccessTokenSecret;
        }



        public List<object> SearchTwitter(QueryInfo queryInfo, bool filterAll)
        {

            string searchText = QueryComposer.ComposeQuery(queryInfo);

            Dictionary<string, string> parameters = new Dictionary<string, string>()
            {
                { "q", searchText },
                { "result_type",queryInfo.ResultType},
                { "lang",queryInfo.LanguageCode},
                { "count", queryInfo.SearchCount.ToString()  }
            };

            string jsonResult = SearchTweet(parameters);

            List<Status> lstSearches = Deserializer.DeserializeJSON<List<Status>>("statuses", jsonResult);


            if (filterAll)
                if (lstSearches != null && lstSearches.Count > 0)
                {
                    int takeCount = 0;

                    int totalFound = lstSearches.Count;

                    int half = queryInfo.SearchCount / 2;
                    if (totalFound > half) takeCount = half + 1;        // TAKE 1 MORE THAN HALF
                    else if (totalFound <= half) takeCount = half;      // TAKE ALL
                    else takeCount = 0;                                 // TAKE NONE

                    lstSearches = lstSearches.OrderBy(x => x.retweet_count)
                        .Take(takeCount).ToList();
                }

            return new List<object>(lstSearches.Cast<object>());

        }




        /// <summary>
        /// Reference: https://dev.twitter.com/rest/reference/get/search/tweets
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        private string SearchTweet(Dictionary<string, string> parameters)
        {
            string jsonResult = string.Empty;

            WebRequest request = CreateRequest("GET", ApiPoint.Twitter_Search_Feed, parameters);

            using (WebResponse response = request.GetResponse())
            {
                using (Stream stream = response.GetResponseStream())
                {
                    using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                    {
                        jsonResult = reader.ReadToEnd();
                    }
                }
            }
            return jsonResult;
        }


        WebRequest CreateRequest(string method, string url, Dictionary<string, string> parameters)
        {
            string encodedParams = PercentageEncoding.EncodeParameters(parameters);

            WebRequest request;
            if (method == "GET") request = WebRequest.Create(string.Format("{0}?{1}", url, encodedParams));
            else request = WebRequest.Create(url);

            request.Method = method;
            request.ContentType = "application/x-www-form-urlencoded";
            request.Headers.Add("Authorization", MakeOAuthHeader(method, url, parameters));

            if (method == "POST")
            {
                byte[] postBody = new ASCIIEncoding().GetBytes(encodedParams);
                using (Stream stream = request.GetRequestStream())
                {
                    stream.Write(postBody, 0, postBody.Length);
                }
            }

            return request;
        }


        string GenerateNONCE() { return Convert.ToBase64String(new ASCIIEncoding().GetBytes(DateTime.Now.Ticks.ToString())); }

        string MakeOAuthHeader(string method, string url, Dictionary<string, string> parameters)
        {
            TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            string oauth_consumer_key = ConsumerKey;
            string oauth_nonce = GenerateNONCE();
            string oauth_signature_method = SignatureMethod;
            string oauth_token = AccessToken;
            string oauth_timestamp = Convert.ToInt64(ts.TotalSeconds).ToString();
            string oauth_version = "1.0";

            SortedDictionary<string, string> sd = new SortedDictionary<string, string>();  // <--- APPEND BASE STRINGS
            if (parameters != null) foreach (string key in parameters.Keys) sd.Add(key, Uri.EscapeDataString(parameters[key]));

            sd.Add("oauth_version", oauth_version);
            sd.Add("oauth_consumer_key", oauth_consumer_key);
            sd.Add("oauth_nonce", oauth_nonce);
            sd.Add("oauth_signature_method", oauth_signature_method);
            sd.Add("oauth_timestamp", oauth_timestamp);
            sd.Add("oauth_token", oauth_token);

            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("{0}&{1}&", method, Uri.EscapeDataString(url));
            foreach (KeyValuePair<string, string> entry in sd)
                sb.Append(Uri.EscapeDataString(string.Format("{0}={1}&", entry.Key, entry.Value)));
            string baseString = sb.ToString().Substring(0, sb.Length - 3);

            string oauth_token_secret = AccessTokenSecret;
            string signingKey = string.Format("{0}&{1}", Uri.EscapeDataString(ConsumerSecret), Uri.EscapeDataString(oauth_token_secret)); // GENERATE SIGNING KEY

            string oauth_signature = GenerateSignature(signingKey, baseString);         // GENERATE SIGNATURE

            sb = new StringBuilder("OAuth ");
            sb.AppendFormat("oauth_consumer_key=\"{0}\",", Uri.EscapeDataString(oauth_consumer_key));
            sb.AppendFormat("oauth_nonce=\"{0}\",", Uri.EscapeDataString(oauth_nonce));
            sb.AppendFormat("oauth_signature=\"{0}\",", Uri.EscapeDataString(oauth_signature));
            sb.AppendFormat("oauth_signature_method=\"{0}\",", Uri.EscapeDataString(oauth_signature_method));
            sb.AppendFormat("oauth_timestamp=\"{0}\",", Uri.EscapeDataString(oauth_timestamp));
            sb.AppendFormat("oauth_token=\"{0}\",", Uri.EscapeDataString(oauth_token));
            sb.AppendFormat("oauth_version=\"{0}\"", Uri.EscapeDataString(oauth_version));

            return sb.ToString();
        }





        /// <summary>
        /// Generate OAuth Signature
        /// </summary>
        /// <param name="signingKey"></param>
        /// <param name="baseString"></param>
        /// <returns>OAuth Signature</returns>
        public string GenerateSignature(string signingKey, string baseString)
        {
            HMACSHA1 hasher = new HMACSHA1(new ASCIIEncoding().GetBytes(signingKey));
            return Convert.ToBase64String(hasher.ComputeHash(new ASCIIEncoding().GetBytes(baseString)));
        }



     
    }
}
