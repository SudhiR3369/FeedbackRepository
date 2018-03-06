using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.MediaManagement
{
    public class ImageInfo
    {
        public string ImageName { get; set; }
        public string Image64Bit { get; set; }
        public string ImagePath { get; set; }
        public string ImageFullPath { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string UserName { get; set; }
        public string secureToken { get; set; }
    }
}
