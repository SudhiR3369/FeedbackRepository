using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.DigitalMarketing.Entities
{
    public class AttributeStatisticsForMediaType
    {
        public int PostResponseID { get; set; }
        public int AttributeID { get; set; }
        public string AttributeName { get; set; }
        public int MediaTypeID { get; set; }
        public string Destination { get; set; }
        public int UserChoiceID { get; set; }
        public string MessageID { get; set; }
        public string ResultID { get; set; }
        public DateTime AddedOn { get; set; }

        public string addedon
        {
            get
            {
                if (AddedOn != null)
                    return AddedOn.ToString();
                else
                    return DateTime.Now.ToString();
            }
        }
        public string Message { get; set; }
        public int StatsCount { get; set; }

        public string HashTags { get; set; }
    }
}
