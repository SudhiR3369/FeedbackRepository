using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.WebBuilder
{
    public class WebbuilderSite
    {
        public string Name { get; set; }
        public List<Webbuilderpages> PageList { get; set; }
        public List<ControllerDetail> APIInvokeList { get; set; }
        public string HeaderView { get; set; }
        public string HeaderEdit { get; set; }
        public string FooterEdit { get; set; }
        public string FooterView { get; set; }
        public string Components { get; set; }
        public string ComponentName { get; set; }
        public string UserName { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string Culture { get; set; }
        public string SecureToken { get; set; }
        public string HostURL { get; set; }
        public string DefaultPage { get; set; }
    }

    public class Webbuilderpages
    {
        public string PageName { get; set; } = string.Empty;
        public string Deafultdata { get; set; } = string.Empty;
        public string EditDOM { get; set; } = string.Empty;
        public string ViewDOM { get; set; } = string.Empty;
        public string Settings { get; set; } = "{}";
        public string Culture { get; set; } = "en-us";
        public string Extra { get; set; }
    }
}
