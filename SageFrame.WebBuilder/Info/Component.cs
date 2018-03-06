using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.WebBuilder
{
    [Serializable]
    [DataContract]
    public class BuilderComponent
    {
        [DataMember]
        public int ComponentID { get; set; }
        [DataMember]
        public string ComponentValue { get; set; }
        [DataMember]
        public string ComponentName { get; set; }
        [DataMember]
        public string ComponentCategory { get; set; }
        [DataMember]
        public string ComponentType { get; set; }
        [DataMember]
        public decimal Version { get; set; }
        [DataMember]
        public string Dependencies { get; set; }
        [DataMember]
        public bool AlreadyExists { get; set; }
        [DataMember]
        public int UserModuleID { get; set; }
        [DataMember]
        public long UniversalComponentID { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public int PortalID { get; set; }
        [DataMember]
        public string Culture { get; set; }
        [DataMember]
        public string SecureToken { get; set; }
        [DataMember]
        public int DownloadCount { get; set; }
        [DataMember]
        public int SiteID { get; set; }
        [DataMember]
        public string EasyBuilderVersion { get; set; }
        [DataMember]
        public string FilePath { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public string Screenshot { get; set; }
    }
}
