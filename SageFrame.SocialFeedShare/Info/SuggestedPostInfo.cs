using System;

namespace SageFrame.SocialFeedShare
{
    public class SuggestedPostInfo
    {

        public int MediaPostID { get; set; }

        public int ResultID { get; set; }

        public string ResultSource { get; set; }

        public string ResultType { get; set; }

        public int SearchResponseID { get; set; }

        public long MessageID { get; set; }

        public string Message { get; set; }

        public string CreatedOn { get; set; }

        public string Lang { get; set; }

        public int Share_Count { get; set; }

        public int Favourite_Count { get; set; }

        public string GeoLocation { get; set; }

        public string UsrName { get; set; }

        public long UsrID { get; set; }

        public int UsrFollowersCount { get; set; }

        public string UsrLocation { get; set; }

        public string UsrScreenName { get; set; }

        public DateTime AddedOn { get; set; }

        public string HashTags { get; set; }
    }
}
