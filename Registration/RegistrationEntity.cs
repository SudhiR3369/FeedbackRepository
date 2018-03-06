using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Registration
{
   public class RegistrationEntity
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string EmailID { get; set; }
        public string Password { get; set; }
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
        public string CultureCode { get; set; }
       
    }
}
