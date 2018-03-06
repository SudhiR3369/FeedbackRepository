using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.ImageFlow
{
    public class ImageFlowInfo
    {
        public int BannerID { get; set; }
        public string ImageName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
        public string CultureCode { get; set; }
        public string AddedBy { get; set; }
        public bool IsActive { get; set; }
        public string Status
        {
            get
            {
                if (this.IsActive)
                    return "Active";
                else
                    return "In-Active";
            }
        }

    }
}
