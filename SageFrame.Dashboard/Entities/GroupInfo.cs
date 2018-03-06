using System;


namespace SageFrame.Dashboard
{
    public class GroupInfo
    {
        public int GroupID { get; set; }
        public string GroupName { get; set; }
        public int GroupOrder { get; set; }
        public string Status { get; set; }
        public string AddedBy { get; set; }
        public DateTime AddedOn { get; set; }
        public string DeletedBy { get; set; }
        public DateTime DeletedOn { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string GroupType { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string Culture { get; set; }
        public string SageFrameSecuretoken { get; set; }

    }
}