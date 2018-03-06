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

namespace SageFrame.ExtractTemplate
{
    /// <summary>
    /// Class that contains  properties for module definitions
    /// </summary>
    public class ExtractModuleDefInfo
    {
        /// <summary>
        /// Gets or sets module definition ID.
        /// </summary>
        public int ModuleDefID { get; set; }

        /// <summary>
        /// Gets or sets module's friendly name.
        /// </summary>
        public string FriendlyName { get; set; }

        /// <summary>
        /// Gets or sets module's module ID.
        /// </summary>
        public int ModuleID { get; set; }

        /// <summary>
        /// Gets or sets module default cache time.
        /// </summary>
        public int DefaultCacheTime { get; set; }

        /// <summary>
        /// Gets or sets portal ID.
        /// </summary>
        public int PortalID { get; set; }

        /// <summary>
        /// Gets or sets module added user's name.
        /// </summary>

        public string AddedBy { get; set; }

        /// <summary>
        /// Gets or sets module updated user's name.
        /// </summary>
        public string UpdatedBy { get; set; }

        /// <summary>
        /// Gets or sets module deleted user's name.
        /// </summary>
        public string DeletedBy { get; set; }

        /// <summary>
        /// Returns or retains true if the  module is active.
        /// </summary>
        public bool IsActive { get; set; }

        /// <summary>
        /// Returns or retains true if the  module is deleted.
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Returns or retains true if the  module is modified.
        /// </summary>
        public bool IsModified { get; set; }

        /// <summary>
        /// Gets or sets module added datetime.
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
        /// Gets or sets module module updated datetime.
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
        /// Gets or sets module deleted datetime.
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
        /// Gets or sets ExtractUserModule object for user module details.
        /// </summary>
        public ExtractUserModule UserModule { get; set; }
        //public Extra MyProperty { get; set; }

        /// <summary>
        /// Initializes an instance of ExtractModuleDefInfo class.
        /// </summary>
        public ExtractModuleDefInfo()
        {
        }
    }
}
