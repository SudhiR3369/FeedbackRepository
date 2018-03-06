using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.AdminNotification
{
    public class AdminNotificationInfo
    {
        public int NotificationID { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public string MessageDetails { get; set; }
        public string NotifyUserName { get; set; }
        public int Status { get; set; }        
        public string PageUrl { get; set; }
        public bool IsActive { get; set; }
        public string PackageLink {get;set;}
        public bool IsAdmin { get; set; }
    }
}
