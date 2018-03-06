using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.Security.Entities
{
   public class FilterUserInfo
    {    
        public string UserName { get; set; }
        public Guid RoleID { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
    }

}
