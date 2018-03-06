using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.Services
{
    public class CommonAuthParam
    {
        public int UserModuleID { get; set; }
        public string UserName { get; set; }
        public int PortalID { get; set; }
        public string SecureToken { get; set; }
        public string CultureCode { get; set; }
    }
}
