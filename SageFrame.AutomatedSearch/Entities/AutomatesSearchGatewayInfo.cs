namespace SageFrame.AutomatedSearch.Controller
{
    public class AutomatesSearchGatewayInfo
    {

        public int PortalID { get; set; }
        public int SearchConfigurationID { get; set; }
        public string ModuleName { get; set; }
        public string TableName { get; set; }
        public string[] ChoosenColumns { get; set; }
        public bool IsExtensionLess { get; set; }
        public string[] ColumnAliasHeaders { get; set; }
        public string[] ColumnAliasNames { get; set; }

    }
}
