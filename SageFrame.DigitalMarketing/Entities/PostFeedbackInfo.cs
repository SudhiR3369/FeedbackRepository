using System;

namespace SageFrame.DigitalMarketing.Entities
{
    public class PostFeedbackInfo
    {
        public int PostResponseID { get; set; }
        public int UserChoiceID { get; set; }
        public string MessageID { get; set; }
        public string Message { get; set; }


        public DateTime CreatedDateTime
        {
            get
            {
                DateTime dt = DateTime.Now;
                DateTime.TryParse(CreatedOn, out dt);
                return dt;
            }
            set
            {
                DateTime dt = DateTime.Now;
                DateTime.TryParse(CreatedOn, out dt);
                value = dt;
            }
        }
        public string CreatedOn { get; set; }
        public int Share_Count { get; set; }
        public int Favourite_Count { get; set; }

        public string Destination { get; set; }

        public DateTime AddedOn { get; set; }


        public string addedon
        {
            get
            {
                if (AddedOn != null)
                    return AddedOn.ToString("F");
                else
                    return DateTime.Now.ToString();
            }
        }

    }
}
