#region "Copyright"
/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
#endregion

#region "References"
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
#endregion

namespace SageFrame.Pages
{
    public class SitemapInfo
    {
        /// <summary>
        /// Get or set page name.
        /// </summary>
        public string PageName { get; set; }
        /// <summary>
        /// Get or set TabPath.
        /// </summary>
        public string TabPath { get; set; }
        /// <summary>
        /// Get or set portal name.
        /// </summary>
        public string PortalName { get; set; }
        /// <summary>
        /// Get or set PortalID. 
        /// </summary>
        public int PortalID { get; set; }
        /// <summary>
        /// Get or set updated date.
        /// </summary>

        private string _UpdatedOn;
        public string UpdatedOn
        {
            get
            {
                if (string.IsNullOrEmpty(this._UpdatedOn)) return string.Empty;
                else return DateTimeHelper.GetLocalTime(_UpdatedOn).ToShortDateString();
            }
            set
            {
                if ((this._UpdatedOn != value))
                {
                    this._UpdatedOn = value;
                }
            }
        }
        /// <summary>
        /// Get or set added date.
        /// </summary>

        private string _AddedOn;
        public string AddedOn
        {
            get
            {
                if (string.IsNullOrEmpty(this._AddedOn)) return string.Empty;
                else return DateTimeHelper.GetLocalTime(_AddedOn).ToShortDateString();
            }
            set
            {
                if ((this._AddedOn != value))
                {
                    this._AddedOn = value;
                }
            }
        }
        /// <summary>
        /// Initializes a new instance of the SitemapInfo class.
        /// </summary>
        public SitemapInfo() { }

    }
}
