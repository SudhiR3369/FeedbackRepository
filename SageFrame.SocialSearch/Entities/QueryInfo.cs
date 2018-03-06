namespace SageFrame.SocialSearch.Entities
{
    public class QueryInfo
    {
        public string[] Containing { get; set; }

        public string[] NotContaining { get; set; }

        public string[] HashTags { get; set; }

        public string[] Emoticons { get; set; }

        public bool IncludeRetweets { get; set; }

        public string WrittenIn { get; set; } = "en";

        public int SearchCount { get; set; } = 10;

        public string ResultType { get; set; } = "recent";


        public string LanguageCode { get; set; } = "en";
    }
}
