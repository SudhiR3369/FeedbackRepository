namespace SageFrame.TwitterAPI
{
    public class ApiPoint
    {
        public const string UpdateStatusJson = "https://api.twitter.com/1.1/statuses/update.json?status=";

        public const string POST_RequestToken = "https://api.twitter.com/oauth/request_token";

        public const string POST_AuthorizeToken = "https://api.twitter.com/oauth/authorize?oauth_token=";

        public const string Access_Token = "https://api.twitter.com/oauth/access_token";
        
        public const string Search_Feed = "https://api.twitter.com/1.1/search/tweets.json";

    }
}


////////////////
//    FORMATS
////////////////

// Search Query: https://api.twitter.com/1.1/search/tweets.json?q=%23PL&oauth_consumer_key=iRGltzuvoKlIoF4Beq5wPfV4Z&oauth_token=141279146-RMaSztaIDY34qeDYPNQZEb1U5WClN1D2MRjk2Pnm&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1473757282&oauth_nonce=ANpQet&oauth_version=1.0&oauth_signature=N34bo7MLkvHCGVWS4e44P8VvCrk%3D