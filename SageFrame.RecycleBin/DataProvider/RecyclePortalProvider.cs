using SageFrame.RecycleBin.Entities;
using SageFrame.Web.Utilities;
using System.Collections.Generic;
using System;

namespace SageFrame.RecycleBin.DataProvider
{
    internal class RecyclePortalProvider
    {

        internal List<RecyclePortalInfo> GetDeletedPortals()
        {
            try
            {
                string sp = "[dbo].[usp_GetDeletedPortals]";
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<RecyclePortalInfo>(sp);
            }
            catch
            {
                throw;
            }
        }


        internal bool RestorePortal(int portalID, string userName)
        {

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", userName));

                string sp = "[dbo].[sp_PortalDeleteUndo]";

                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery(sp, ParaMeterCollection);
                return true;
            }
            catch
            {
                throw;
            }

        }

        internal bool RestoreMultiplePortals(List<KeyValuePair<int, string>> lstPortalIDAndUserNames)
        {
            return false;

        }

        internal bool DeletePortal(int portalID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PortalID", portalID));

                string sp = "[dbo].[usp_DeletePortalFromRecycleBinPermanetlyByPortalID]";
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
