using System;

namespace SageFrame.RecycleBin.Entities
{
    public class RecycleUsesInfo
    {
        public long Aspnet_UserID { get; set; }

        public int PortalUserID { get; set; }

        public int PortalID { get; set; }

        public string Username { get; set; }

        public Guid UserID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string LoweredUserName { get; set; }

        public string MobileAlias { get; set; }

        public bool IsAnonymous { get; set; }

        public DateTime LastActivityDate { get; set; }

        public Guid ApplicationId { get; set; }

        public string Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public string Location { get; set; }

        public string AboutYou { get; set; }

        public string ResPhone { get; set; }

        public string Mobile { get; set; }

        public string Others { get; set; }

        public string image { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsModified { get; set; }

        public DateTime AddedOn { get; set; }

        public DateTime UpdatedOn { get; set; }

        public DateTime DeletedOn { get; set; }

        public string AddedBy { get; set; }

        public string UpdatedBy { get; set; }

        public string DeletedBy { get; set; }

        public bool IsDeletedByRole { get; set; }
    }
}
