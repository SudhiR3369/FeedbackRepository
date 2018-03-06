using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SageBanner
{
    public class SageBannerInfo
    {
        public int BannerID { get; set; }
        public string BannerImageName { get; set; }
        public string BannerSloganTitle { get; set; }
        public string BannerSlogan { get; set; }
        public string LinkUrl { get; set; }
        public string LinkButtonName { get; set; }
        public int PortalID { get; set;}
        public int UserModuleID { get; set;}
        public bool IsActive { get; set; }
        public string Culture { get; set; }
        public string AddedBy { get; set; }
        public DateTime AddonOn { get; set; }
    }
}
