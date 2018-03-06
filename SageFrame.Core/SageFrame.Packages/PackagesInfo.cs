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


namespace SageFrame.Packages
{
    /// <summary>
    /// Entities class for Packages.
    /// </summary>
    public class PackagesInfo
    {
        /// <summary>
        /// Gets or sets package ID.
        /// </summary>
        public int PackageID { get; set; }

        /// <summary>
        /// Gets or sets portal ID.
        /// </summary>
        public int PortalID { get; set; }

        /// <summary>
        /// Gets or sets module ID.
        /// </summary>
        public int ModuleID { get; set; }

        /// <summary>
        /// Gets or sets name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets package friendly name.
        /// </summary>
        public string FriendlyName { get; set; }

        /// <summary>
        /// Gets or sets package description.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets package type.
        /// </summary>
        public string PackageType { get; set; }

        /// <summary>
        /// Gets or sets package version.
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// Gets or sets package license.
        /// </summary>
        public string License { get; set; }

        /// <summary>
        /// Gets or sets package manifest.
        /// </summary>
        public string Manifest { get; set; }

        /// <summary>
        /// Gets or sets package's owner.
        /// </summary>
        public string Owner { get; set; }

        /// <summary>
        /// Gets or sets package's organization.
        /// </summary>
        public string Organization { get; set; }

        /// <summary>
        /// Gets or sets package URL.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets package's email.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets release notes.
        /// </summary>
        public string ReleaseNotes { get; set; }

        /// <summary>
        /// Returns or retains  true if package is of system.
        /// </summary>
        public bool IsSystemPackage { get; set; }

        /// <summary>
        /// Returns or retains true if the package is active.
        /// </summary>
        public bool IsActive { get; set; }

        /// <summary>
        /// Returns or retains true if the package is active
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Returns or retains true if the package is modified.
        /// </summary>
        public bool IsModified { get; set; }

        /// <summary>
        /// Gets or sets  package added date.
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
        /// Gets or sets package updated date.
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
        /// Gets or sets package deleted date.
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
        /// <summary>
        /// Gets or sets package added user's name.
        /// </summary>
        public string AddedBy { get; set; }

        /// <summary>
        /// Gets or sets package updated user's name.
        /// </summary>
        public string UpdatedBy { get; set; }

        /// <summary>
        /// Gets or sets package deleted user's name.
        /// </summary>
        public string DeletedBy { get; set; }

        /// <summary>
        /// Gets or sets package in use.
        /// </summary>
        public int InUse { get; set; }

        /// <summary>
        /// Returns or retains true if the package is of admin.
        /// </summary>
        public bool IsAdmin { get; set; }

        /// <summary>
        /// Initializes an instance of PackagesInfo class.
        /// </summary>
        public PackagesInfo() { }
    }
}
