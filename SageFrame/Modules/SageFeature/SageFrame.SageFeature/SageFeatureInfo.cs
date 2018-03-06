using System;
using SageFrame.Web.Utilities;
using System.Collections.Generic;


namespace SageFrame.SageFeature
{
    public class SageFeatureInfo
    {
        public int FeatID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string ImageName { get; set; }
        public string AddedBy { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string Culture { get; set; }
        public string Status
        {
            get
            {
                if (this.IsActive)
                    return "Active";
                else return "InActive";
            }
        }
    }
}