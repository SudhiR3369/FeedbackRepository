namespace SageFrame.MediaManagement
{
    public class MediaCategory
    {
        public string BaseCategory { get; set; }
        public string ParentCategory { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string UserName { get; set; }
        public string Filter { get; set; }
        public string secureToken { get; set; }
        public int MediaSettingID { get; set; }
        public string UploadType { get; set; }
    }
}
