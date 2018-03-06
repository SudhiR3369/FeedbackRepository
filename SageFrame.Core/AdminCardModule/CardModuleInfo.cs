using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.Core
{
  public  class CardModuleInfo
    {
        public int UserModuleID { get; set; }
        public string HeaderText { get; set; }
        public string UserModuleTitle { get; set; }
        public bool IsRoleAssign { get; set; }
        public string RoleName { get; set; }
    }
}
