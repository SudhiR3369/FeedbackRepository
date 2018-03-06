using SageFrame.RecycleBin.DataProvider;
using SageFrame.RecycleBin.Entities;
using System;
using System.Collections.Generic;

namespace SageFrame.RecycleBin.Controller
{
    public class RecycleRolesController
    {
        public List<RecycleRolesInfo> GetDeletedRoles()
        {
            RecycleRolesProvider provider = new RecycleRolesProvider();
            return provider.GetDeletedRoles();
        }

        public void RestorePortalRole(Guid roleID)
        {
            RecycleRolesProvider provider = new RecycleRolesProvider();
            provider.RestorePortalRole(roleID);
        }

        public void DeleteRole(Guid roleID,int portalID)
        {
            RecycleRolesProvider provider = new RecycleRolesProvider();
            provider.DeleteRole(roleID,portalID);
        }



    }


}
