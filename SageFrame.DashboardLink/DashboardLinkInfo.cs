using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.DashboardLink
{
    public class DashboardLinkInfo
    {
        public int LinkID { get; set; }
        public string LinkTitle { get; set; }
        public int PageID { get; set; }
        public string PageName { get; set; }
        public bool IsParent { get; set; }
        public int ParentLinkID { get; set; }
        public string ParentPageMenu { get; set; }
        public string LinkUrl
        {
            get
            {
                if (!string.IsNullOrEmpty(this.PageName))
                    return "/dashboard/" + PageName.Replace(" ", "-");
                else return string.Empty;

            }
        }
        public bool IsActive { get; set; }
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
        public string CultureCode { get; set; }
    }
}
