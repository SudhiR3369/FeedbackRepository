using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SageFrame.Core
{
    public class Duckable
    {
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
        public bool Shown { get; set; }
        public bool Minimize { get; set; }
        public int DragTop { get; set; }
        public int DragLeft { get; set; }
        public string UserName { get; set; }
        public string SecureToken { get; set; }
    }
}
