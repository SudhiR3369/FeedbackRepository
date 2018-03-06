using System;

namespace SageFrame.RecycleBin.Entities
{
    public class RecycleUsersInRoleInfo
    {
        public Guid UserId { get; set; }

        public Guid RoleId { get; set; }

        public string addedby { get; set; }

        public DateTime AddedOn { get; set; }
    }
}
