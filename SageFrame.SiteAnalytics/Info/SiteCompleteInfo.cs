using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DashBoardControl
{
    public class SiteCompleteInfo
    {
        public string PageName { get; set; }
        public string Category { get; set; }
        public string FactorKey { get; set; }
        public int Complete { get; set; }
        public bool IsComplete
        {
            get
            {
                if (this.Complete == 0)
                    return true;
                else return false;
            }
        }
        public int Weightage { get; set; }
        public string Message { get; set; }
        public string HelpURL { get; set; }
    }
}
