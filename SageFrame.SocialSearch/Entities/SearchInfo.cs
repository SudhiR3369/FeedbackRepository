namespace SageFrame.SocialSearch.Entities
{
    public class SearchInfo
    {
        public string LanguageCode { get; set; } = "en";
        public int SearchCount { get; set; } = 5;
        public string OrderBy { get; set; } = "best";
    }

    public class GoogleSearchInfo : SearchInfo
    {
        public string[] SearchParameters { get; set; }
    }

}
