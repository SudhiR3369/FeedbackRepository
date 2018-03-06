using System;

namespace SageFrame.AutomatedSearch.Entities
{
    public class SearchSettingInfo
    {
        public int SageFrameSearchSettingID { get; set; }

        public string SettingKey { get; set; }

        public string SettingValue { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsModified { get; set; }

        public DateTime AddedOn { get; set; }

        public DateTime UpdatedOn { get; set; }

        public DateTime DeletedOn { get; set; }

        public int PortalID { get; set; }

        public string AddedBy { get; set; }

        public string UpdatedBy { get; set; }

        public string DeletedBy { get; set; }
    }
}
