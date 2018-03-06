using SageFrame.RecycleBin.DataProvider;
using SageFrame.RecycleBin.Entities;
using System.Collections.Generic;

namespace SageFrame.RecycleBin.Controller
{
    public class RecyclePortalController
    {
        public List<RecyclePortalInfo> GetDeletedPortals()
        {
            RecyclePortalProvider provider = new RecyclePortalProvider();
            return provider.GetDeletedPortals();
        }


        public bool RestorePortal(int portalID, string userName)
        {
            RecyclePortalProvider provider = new RecyclePortalProvider();
            return provider.RestorePortal(portalID, userName);
        }

        public bool RestoreMultiplePortals(List<KeyValuePair<int, string>> lstPortalIDAndUserNames)
        {
            RecyclePortalProvider provider = new RecyclePortalProvider();
            return provider.RestoreMultiplePortals(lstPortalIDAndUserNames);
        }


        public bool DeletePortal(int portalID)
        {
            RecyclePortalProvider provider = new RecyclePortalProvider();
            return provider.DeletePortal(portalID);
        }



    }


}
