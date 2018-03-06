using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.MassMail
{
   public class AuthenticationInfo
    {
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string Username { get; set; }
        public string SecureToken { get; set; }
    }
}
