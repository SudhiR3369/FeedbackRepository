using System;
namespace SageFrame.Dashboard
{
    public class GroupItemInfo
    {
        public int ItemID { get; set; }
        public int GroupID { get; set; }
        public bool IsInGroup { get; set; }
        public int ItemOrder { get; set; }
        public string GroupName { get; set; }
        public int GroupOrder { get; set; }
        public int PageID { get; set; }
        public string PageName { get; set; }
        public string URL { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public string DeletedBy { get; set; }
        public string AddedBy { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime DeletedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string Culture { get; set; }
        public string SageFrameSecuretoken { get; set; }

    }
}