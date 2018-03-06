<%@ WebService Language="C#" CodeBehind="TwitterSearchService.cs" Class="TwitterSearchService" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.SocialSearch;
using SageFrame.JsonParser;
using SageFrame.SocialSearch.GoogleAPI;
using SageFrame.SocialSearch.TwitterAPI;
using SageFrame.SocialSearch.Utilities;
using SageFrame.SocialSearch.Entities;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class TwitterSearchService : System.Web.Services.WebService
{

    public TwitterSearchService()
    {

    }

    [WebMethod]
    public List<Package> AutoSearchPosts(string parameters)
    {

        string[] fetchPoints = new string[] { "twitter" };   // { "google", "twitter" };   // WHERE TO FETCH FROM

  

        SearchFormulator searchFormulator = new SearchFormulator(fetchPoints);

        List<Package> lstpackage = searchFormulator.SearchSocialFeeds();

        if (lstpackage != null && lstpackage.Count > 0)
            return lstpackage;
        else
            return new List<Package>();
    }

}

