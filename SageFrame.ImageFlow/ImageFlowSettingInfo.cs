using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.ImageFlow
{
   public class ImageFlowSettingInfo
    {
        public string Style { get; set; }

        public string Spacing { get; set; }
        public bool Arrow { get; set; }
        public bool AutoPlay { get; set; }
        public bool Looping { get; set; }
        public bool Clickable { get; set; }
        public bool ScrollWheel { get; set; }
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
    }
}
