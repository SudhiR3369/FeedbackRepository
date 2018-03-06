﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SEOManagement
{
    public class SEOMetaType
    {
        public int TagTypeID { get; set; }
        public string TagName { get; set; }
        public string TypeName { get; set; }
        public string CrawlerName { get; set; }
        public string HtmlTag { get; set; }
        public bool IsShownFront { get; set; }
        public bool IsSystem { get; set; }
    }
}
