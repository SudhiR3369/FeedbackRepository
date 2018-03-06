using SageFrame.RecycleBin.DataProvider;
using SageFrame.RecycleBin.Entities;
using System.Collections.Generic;
using System;

namespace SageFrame.RecycleBin.Controller
{
    public class RecycleUsersController
    {
        public List<RecycleUsesInfo> GetDeletedUsers()
        {
            RecycleUsersProvider provider = new RecycleUsersProvider();
            return provider.GetDeletedUsers();
        }


        public bool RestoreUser(string userName, int portalID)
        {
            RecycleUsersProvider provider = new RecycleUsersProvider();
            return provider.RestoreUser(userName, portalID);
        }


        public bool DeleteUser(Guid userGUID)
        {
            RecycleUsersProvider provider = new RecycleUsersProvider();
            return provider.DeleteUser(userGUID);
        }
    }

}
