using SageFrame.Web;
using System;

namespace SageFrame.WebBuilder
{
    public class WebBuilderInfo
    {
        public int WebBuilderID { get; set; }
        public string EditDOM { get; set; }
        public string ViewDOM { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string Culture { get; set; }
        public string SecureToken { get; set; }
        public string UserName { get; set; }
        public string PageName { get; set; }
        public string Header { get; set; }
        public string HeaderEdit { get; set; }
        public string Footer { get; set; }
        public string FooterEdit { get; set; }
        // put any settings with this property
        public string Settings { get; set; }
        //In future if needed for additional field
        public string Extra { get; set; }
        public string PackageXML { get; set; }
        public bool IsActive { get; set; }
        /// <summary>
        /// Returns or retains true if the message template is deleted
        /// </summary>
        public bool IsDeleted { get; set; }
        /// <summary>
        /// Gets or sets message template added date
        /// </summary>
        private DateTime _AddedOn;
        public DateTime AddedOn
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_AddedOn);
            }
            set
            {
                if ((this._AddedOn != value))
                    this._AddedOn = value;

            }
        }
        /// <summary>
        /// Gets or sets message template update date
        /// </summary>
        private DateTime _UpdatedOn;
        public DateTime UpdatedOn
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_UpdatedOn);
            }
            set
            {
                if ((this._UpdatedOn != value))
                    this._UpdatedOn = value;

            }
        }
        /// <summary>
        /// Gets or sets message template deleted date
        /// </summary>
        private DateTime _DeletedOn;
        public DateTime DeletedOn
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_DeletedOn);
            }
            set
            {
                if ((this._DeletedOn != value))
                    this._DeletedOn = value;

            }
        }
    }
}