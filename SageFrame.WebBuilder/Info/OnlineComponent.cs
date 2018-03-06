
namespace SageFrame.WebBuilder
{
    public class OnlineComponent
    {
        public int ComponentID { get; set; }
        public string ComponentValue { get; set; }
        public string ComponentName { get; set; }
        public string ComponentCategory { get; set; }
        public string ComponentType { get; set; }
        public decimal Version { get; set; }
        public string Dependencies { get; set; }
        public bool AlreadyExists { get; set; }
        public int UserModuleID { get; set; }
        public long UniversalComponentID { get; set; }
        public string UserName { get; set; }
        public int PortalID { get; set; }
        public string Culture { get; set; }
        public string SecureToken { get; set; }
        public int DownloadCount { get; set; }
    }
}
