using System.Collections.Generic;

namespace SageFrame.AutomatedSearch.Entities
{
    public class AutomatedSearchInfo
    {

        public SearchConfigurationInfo SearchConfiguration { get; set; }

        public List<SearchMappingInfo> SearchMappings { get; set; }

        public SearchSettingInfo SearchSettingInfo { get; set; }

        public List<SearchQueryStringInfo> SearchQueryInfos { get; set; }
    }
}
