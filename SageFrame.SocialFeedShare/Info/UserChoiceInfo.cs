using System;

namespace SageFrame.SocialFeedShare
{
    public class UserChoiceInfo
    {
        public int UserChoiceID { get; set; }

        public int ResultID { get; set; }

        public long MessageID { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        public string Destination { get; set; }

        public string TrackingID { get; set; }

        public DateTime AddedOn { get; set; }
    }
}
