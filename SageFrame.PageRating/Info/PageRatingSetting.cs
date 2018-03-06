using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.PageRating
{
    public class PageRatingSetting
    {
        public int RatingSettingID { get; set; }
        public string RatingTitle { get; set; }
        public int RatingPoint { get; set; }
        public bool IsRatingEditEnable { get; set; }

    }
}
