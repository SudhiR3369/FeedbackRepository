﻿using System;

namespace SageFrame.AutomatedSearch.Entities
{
    public class SearchMappingInfo
    {

        public int SearchMapID { get; set; }

        public int SearchConfigurationID { get; set; }

        public string TableName { get; set; }

        public string ColumnName { get; set; }

        public bool IsActive { get; set; }

        public DateTime AddedOn { get; set; }

        public string AddedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime DeletedOn { get; set; }

        public string DeletedBy { get; set; }
    }
}