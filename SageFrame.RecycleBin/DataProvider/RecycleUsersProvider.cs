using SageFrame.RecycleBin.Entities;
using SageFrame.Web.Utilities;
using System.Collections.Generic;
using System;

namespace SageFrame.RecycleBin.DataProvider
{
    internal class RecycleUsersProvider
    {

        internal List<RecycleUsesInfo> GetDeletedUsers()
        {

            try
            {
                string sp = "[dbo].[usp_GetDeletedUsers]";

                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<RecycleUsesInfo>(sp);
            }
            catch
            {
                return null;
            }
        }


        internal bool RestoreUser(string userName, int portalID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", userName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));

                string sp = "[dbo].[usp_UsersDeleteUndo]";

                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery(sp, ParaMeterCollection, "@sucess");

                return true;
            }
            catch
            {
                throw;
            }

        }

        internal bool DeleteUser(Guid userGUID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", userGUID));

                string sp = "[dbo].[usp_DeleteUserFromRecycleBinPermanetlyByUserID]";
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
