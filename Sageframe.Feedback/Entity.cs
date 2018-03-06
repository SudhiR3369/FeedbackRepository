using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sageframe.Feedback
{
    public class FeedbackDetails
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string EmailID { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Domain { get; set; }
        public string SentBy { get; set; }
        public DateTime ReceivedOn { get; set; }
        public string Rating { get; set; }
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
        public string CultureCode { get; set; }
        public string sortName { get; set; }
        public string sortDate { get; set; }
    }
}
