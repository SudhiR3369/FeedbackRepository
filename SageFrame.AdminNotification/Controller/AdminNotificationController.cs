using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.AdminNotification
{
    public class AdminNotificationController
    {
        public AdminNotificationController() { }

        public bool CheckUniquenessNotification(int portalID,string notificationName) {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.CheckUniquenessNotification(portalID, notificationName);
        } 

        public List<AdminNotificationInfo> GetAllActiveNotification(int portalID, string notifyUserName)
        {            
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.GetAllActiveNotification(portalID, notifyUserName);
        }

        public List<AdminNotificationInfo> GetNotificationList(int portalID, string notifyUserName)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.GetNotificationList(portalID, notifyUserName);
        }

        public AdminNotificationInfo GetNotificationDetail(int portalID,int notificationID)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.GetNotificationDetail(portalID,notificationID);
        }

        public int AddUpdateNotification(int portalID, string userName, AdminNotificationInfo objNotification)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.AddUpdateNotification(portalID, userName, objNotification);
        }

        public void DeleteNotification(int notificationID, int portalID,string userName)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            provider.DeleteNotification(portalID, notificationID, userName);
        }

        public int  SetNotificationStatus(int portalID,int status, string notificationName, string userName)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.SetNotificationStatus(portalID,status, notificationName, userName);
        }

        public int GetNotificationStatus(int portalID, string notificationName)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.GetNotificationStatus(portalID, notificationName);
        }

        public int GetNotificationIDFromName(int portalID, int notificationName)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            return provider.GetNotificationIDFromName(portalID, notificationName);
        }

        public void SetNotificationStatusViaID(int messageID,string UserName)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
             provider.SetNotificationStatusViaID(messageID,UserName);

        }
        public void MarkNotificationAsRead(int PortalID, string UserName)
        {
            AdminNotificationProvider provider = new AdminNotificationProvider();
            provider.MarkNotificationAsRead(PortalID, UserName);
        }
    }
}
