using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.Templating
{
    public class ThemeDetail
    {
        public string Authorname { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public string Category { get; set; } = string.Empty;
        public string Themename { get; set; } = string.Empty;
        public string Demourl { get; set; } = string.Empty;
        public string Authorurl { get; set; } = string.Empty;
        public string Tags { get; set; } = string.Empty;
        public string Licence { get; set; } = string.Empty;

    }
}