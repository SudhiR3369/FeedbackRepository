using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SEOManagement
{
    public  class SEOMetaValues
    {
        public SEOMetaValues() { }

        public int SEOMetaTagValueID { get; set; }
        public int SEOMetaTagTypeID { get; set; }

        public string TypeName { get; set; }
        public string MetaTagContent { get; set; }

        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
    }
}
