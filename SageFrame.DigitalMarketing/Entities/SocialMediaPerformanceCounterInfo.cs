namespace SageFrame.DigitalMarketing.Entities
{
    public class SocialMediaPerformanceCounterInfo
    {
        public int PerformanceCounterID { get; set; }

        public int MediaTypeID { get; set; }
        public string MediaTypeName { get; set; }

        public int MediaAttributeID { get; set; }
        public string MediaAttributeName { get; set; }

        public int TypeAttributeMapID { get; set; }

        public long StatsCount { get; set; }

    }
}
