
namespace SageFrame.SocialFeedShare
{
    public class SocialFeedSettingInfo
    {
        public int SettingID { get; set; }
        public bool EnableFacebook { get; set; }
        public string FBAppID { get; set; }
        public string FBAppSecret { get; set; }
        public bool EnableTwitter { get; set; }
        public string TwitterConsumerKey { get; set; }
        public string TwitterConsumerSecret { get; set; }
        
        public bool EnableLinkedIn { get; set; }

        public string LinkedInAppID { get; set; }
        public string LinkedInAppSecret { get; set; }
        public string LinkedInCompanyID { get; set; }
    }
}
