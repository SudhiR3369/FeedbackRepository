using System.Collections.Generic;
using System.Threading.Tasks;
using SageFrame.SocialSearch.Utilities;
using SageFrame.SocialSearch.TwitterAPI;
using SageFrame.SocialSearch.GoogleAPI;

namespace SageFrame.SocialSearch
{
    public class SearchFormulator
    {

        object lockable = new object();
        string[] fetchPoints = null;

        public SearchFormulator(string[] fetchPoints)
        {
            this.fetchPoints = fetchPoints;
        }



        /// <summary>
        /// Search for posts from the pre defined social networks
        /// </summary>
        /// <param name="fetchPoints">List of social network names</param>
        public List<Package> SearchSocialFeeds()
        {
            List<Package> lstPackage = new List<Package>();

            if (fetchPoints != null && fetchPoints.Length > 0)
            {
                bool filterAll = false;
                if (fetchPoints.Length > 1)
                    filterAll = true;
                Parallel.ForEach(fetchPoints, point =>
                {
                    switch (point.ToLower())
                    {
                        case "twitter":

                            // FETCH SETTINGS
                            string consumerKey = "Iy8lNm4Ey9OmDXAoalt4EksNT";
                            string consumerSecret = "2b840eCjpc5CDeqxPpTTjmYUSenJyWlVtKR7vcP5jlb667WjVx";
                            string accessToken = "772764625700057088-YXP2cA913WQXXcuq7OyyT4skSNRNKZE";
                            string accessTokenSecret = "uimffz1YNaXWrIcs8VyogxtomVgUyxO7s6gYxG3SiQto7";

                            TwitterController twitterController = new TwitterController(consumerKey, consumerSecret, accessToken, accessTokenSecret);
                            List<object> lst = twitterController.SearchTwitter(new Entities.QueryInfo()
                            {
                                Containing = new string[] { "obama", "hillary", "donald" },
                                NotContaining = new string[] { "election", "whitehouse" },
                                HashTags = new string[] { "#oabama", "#hillary" },
                                Emoticons = null,//new string[] { ":)", ":(", "?" };
                                IncludeRetweets = true,
                                SearchCount = 15,
                                ResultType = "popular",
                                LanguageCode = "en",
                                WrittenIn = "en"
                            }, filterAll);
                            lock (lockable)
                            {
                                lstPackage.Add(new Package()
                                {
                                    key = point.ToLower(),
                                    SearchResult = lst
                                });
                            }
                            break;

                        case "google":
                            string apiKey = "AIzaSyAzmIwh3Tq79Yy70eL0RbJBmOS9-MP5uL8";
                            GoogleController googleController = new GoogleController(apiKey);

                            List<object> lstGoogleResponse = googleController.SearchGoogle(new Entities.GoogleSearchInfo()
                            {
                                LanguageCode = "en",
                                OrderBy = "best",
                                SearchCount = 10,
                                SearchParameters = new string[] { "obama", "clinton" }
                            }, filterAll);
                            lock (lockable)
                            {
                                lstPackage.Add(new Package()
                                {
                                    key = point.ToLower(),
                                    SearchResult = lstGoogleResponse
                                });
                            }
                            break;

                        default:
                            break;
                    }
                });

            }

            return lstPackage;
        }




    }
}
