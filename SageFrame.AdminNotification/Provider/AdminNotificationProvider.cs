using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.AdminNotification
{
    public class AdminNotificationProvider
    {
        public AdminNotificationProvider() { }

        internal List<AdminNotificationInfo> GetAllActiveNotification(int portalID, string notifyUserName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotifyUserName", notifyUserName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsList<AdminNotificationInfo>("[dbo].[usp_AdminNotification_GetAllActiveList]", param);
            }
            catch
            {
                throw;
            }
        }

        internal bool CheckUniquenessNotification(int portalID, string notificationName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotificationName", notificationName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQueryAsBool("[dbo].[usp_AdminNotification_CheckUniqueness]", param, "@output");
            }
            catch
            {
                throw;
            }
        }

        internal List<AdminNotificationInfo> GetNotificationList(int portalID, string notifyUserName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotifyUserName", notifyUserName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsList<AdminNotificationInfo>("[dbo].[usp_AdminNotification_GetList]", param);
            }
            catch
            {
                throw;
            }
        }

        internal int AddUpdateNotification(int portalID, string userName, AdminNotificationInfo objNotification)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotificationID", objNotification.NotificationID));
            param.Add(new KeyValuePair<string, object>("@NotifyUserName", objNotification.NotifyUserName));
            param.Add(new KeyValuePair<string, object>("@Name", objNotification.Name));
            param.Add(new KeyValuePair<string, object>("@Message", objNotification.Message));
            param.Add(new KeyValuePair<string, object>("@Status", objNotification.Status));
            param.Add(new KeyValuePair<string, object>("@PageUrl", objNotification.PageUrl));
            param.Add(new KeyValuePair<string, object>("@IsActive", objNotification.IsActive));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQuery("[dbo].[usp_AdminNotification_AddUpdate]", param, "@output");
            }
            catch
            {
                throw;
            }
        }

        public void MarkNotificationAsRead(int portalID, string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                sagesql.ExecuteNonQuery("[dbo].[usp_AdminNotification_MarkAsRead]", param);
            }
            catch (Exception)
            {

                throw;
            }
           


        }

        internal int GetNotificationIDFromName(int portalID, int notificationName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotificationID", notificationName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQuery("[dbo].[usp_AdminNotification_GetID]", param, "@output");
            }
            catch
            {
                throw;
            }
        }

        internal int GetNotificationStatus(int portalID, string notificationName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotificationID", notificationName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQuery("[dbo].[usp_AdminNotification_GetStatus]", param, "@output");
            }
            catch
            {
                throw;
            }
        }

        internal int SetNotificationStatus(int portalID, int status, string notificationName, string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotificationName", notificationName));
            param.Add(new KeyValuePair<string, object>("@Status", status));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQuery("[dbo].[usp_AdminNotification_SetStatus]", param, "@output");
            }
            catch
            {
                throw;
            }
        }
        internal void SetNotificationStatusViaID(int messageID, string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@MessageID", messageID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                sagesql.ExecuteNonQuery("[dbo].[usp_AdminNotification_SetStatusViaID]", param);
            }
            catch
            {
                throw;
            }
        }

        internal void DeleteNotification(int portalID, int notificationID, string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotificationID", notificationID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                sagesql.ExecuteNonQuery("[dbo].[usp_AdminNotification_Delete]", param);
            }
            catch
            {
                throw;
            }
        }

        internal AdminNotificationInfo GetNotificationDetail(int portalID, int notificationID)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@NotificationID", notificationID));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsObject<AdminNotificationInfo>("[dbo].[usp_AdminNotification_GetDetail]", param);
            }
            catch
            {
                throw;
            }
        }

    }
}
