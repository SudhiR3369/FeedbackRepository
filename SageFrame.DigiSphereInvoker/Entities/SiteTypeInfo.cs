using System;

namespace SageFrame.DigiSphereInvoker.Entities
{

    public class SiteTypeInfo
    {
        public int SiteTypeID { get; set; }

        public string TypeName { get; set; }

        public bool IsActive { get; set; }

        public DateTime AddedOn { get; set; }

        public string AddedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }


        public int SectorTypeID { get; set; }

        public string SiteSectorMapID { get; set; }
    }

}
