using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.PageRating
{
    public class RatingAuthInfo
    {
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
        public string Username { get; set; }
        public string SecureToken { get; set; }
    }
}
