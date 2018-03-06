using System;

namespace SageFrame.RecycleBin.Entities
{
    public class RecycleRolesInfo
    {
        public Guid ApplicationId { get; set; }

        public Guid RoleId { get; set; }

        public string RoleName { get; set; }

        public string LoweredRoleName { get; set; }

        public string Description { get; set; }

        public int PortalID { get; set; }
        public int ID { get; set; }

    }


}
