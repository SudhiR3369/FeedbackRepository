namespace SageFrame.AutomatedSearch.Entities
{
    public class AutomatedSearchDetailInfo
    {
        public int SearchConfigurationID { get; set; }
        public string SearchName { get; set; }
        public string ModuleName { get; set; }

        public int ID { get; set; }

        public int SearchMapID { get; set; }
        public int SearchQueryStringID { get; set; }
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public string ColumnUrl { get; set; }

        public int SortOrder { get; set; }

        public string ColumnAlias { get; set; }


    }
}
