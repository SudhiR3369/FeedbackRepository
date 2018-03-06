using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DashBoardControl.Info
{
    public class DashboardStatisticInfo
    {
        public string VisitedDate { get; set; }
        public long TotalSiteVisit { get; set; }
        public long SinglePageOnlyVisit { get; set; }
        public float BounceRate { get; set; }
    }
}
