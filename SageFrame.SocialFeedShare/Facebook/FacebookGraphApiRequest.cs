using System.Collections.Specialized;

namespace SageFrame.SocialFeedShare.Facebook
{
    public class FacebookGraphApiRequest
    {
        public string Method { get; set; }
        public string Path { get; set; }
        public NameValueCollection Params { get; set; }
    }
}
