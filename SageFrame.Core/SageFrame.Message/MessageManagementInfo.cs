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


namespace SageFrame.Message
{
    /// <summary>
    /// Entity class for message management
    /// </summary>
    public class MessageManagementInfo
    {
        /// <summary>
        /// Gets or sets message template type ID.
        /// </summary>
        public int MessageTemplateTypeID { get; set; }

        /// <summary>
        /// Gets or sets message template ID.
        /// </summary>
        public int MessageTemplateID { get; set; }

        /// <summary>
        /// Gets or sets message template name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets culture name.
        /// </summary>
        public string CultureName { get; set; }

        /// <summary>
        /// Gets or sets emai'subject.
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets email's mail from
        /// </summary>
        public string MailFrom { get; set; }

        /// <summary>
        /// Gets or sets email's body from
        /// </summary>
        public string Body { get; set; }

        /// <summary>
        /// Gets or sets message template token ID
        /// </summary>
        public int MessageTemplateTypeTokenID { get; set; }

        /// <summary>
        /// Gets or sets message token ID
        /// </summary>
        public int MessageTokenID { get; set; }

        /// <summary>
        /// Gets or sets message token key
        /// </summary>
        public string MessageTokenKey { get; set; }

        /// <summary>
        /// Gets or sets message token name
        /// </summary>
        public string MessageTokenName { get; set; }

        /// <summary>
        /// Returns or retains true if the message template is active
        /// </summary>
        public bool IsActive { get; set; }

        /// <summary>
        /// Returns or retains true if the message template is deleted
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Returns or retains true if the message template is modified
        /// </summary>
        public bool IsModified { get; set; }

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

        /// <summary>
        /// Gets or sets portal ID
        /// </summary>
        public int PortalID { get; set; }

        /// <summary>
        /// Gets or sets message template added user's name
        /// </summary>
        public string AddedBy { get; set; }

        /// <summary>
        /// Gets or sets message template updated user's name
        /// </summary>
        public string UpdatedBy { get; set; }

        /// <summary>
        /// Gets or sets message template deleted user's name
        /// </summary>
        public string DeletedBy { get; set; }

        /// <summary>
        /// Gets or sets first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or sets last name
        /// </summary>
        
        public string LastName { get; set; }

        /// <summary>
        /// Gets or sets  unique ID
        /// </summary>
        public Guid  UserID { get; set; }

        /// <summary>
        /// Gets or sets email
        /// </summary>
        public string Email { get; set; }
        public string ResPhone { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public DateTime BirthDate { get; set; }
        /// <summary>
        /// Initializes an instance of MessageManagementInfo class.  
        /// </summary>
        public MessageManagementInfo() { }
    }
}
