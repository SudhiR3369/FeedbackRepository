using SageFrame.RecycleBin.Entities;
using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;

namespace SageFrame.RecycleBin.DataProvider
{
    internal class RecycleRolesProvider
    {

        internal List<RecycleRolesInfo> GetDeletedRoles()
        {
            try
            {
                string sp = "[dbo].[usp_GetDeletedRoles]";

                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<RecycleRolesInfo>(sp);
            }
            catch
            {
                return null;
            }

        }


        internal void RestorePortalRole(Guid roleID)
        {

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@RoleID", roleID));

                string sp = "[dbo].[usp_PortalRoleDeleteUndo]";

                SQLHandler sagesql = new SQLHandler();
                int output = sagesql.ExecuteNonQuery(sp, ParaMeterCollection, "@success");
            }
            catch
            {
                throw;
            }
        }

        internal bool DeleteRole(Guid roleID, int portalID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@RoleID", roleID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));

                string sp = "[dbo].[usp_DeleteRoleFromRecycleBinPermanetlyByRoleID]";
                string outputParam = "@ReturnCode";

                SQLHandler sagesql = new SQLHandler();
                int output = sagesql.ExecuteNonQuery(sp, ParaMeterCollection, outputParam);
                if (output == 1) return true;
                else return false;
            }
            catch
            {
                throw;
            }

        }

    }
}
