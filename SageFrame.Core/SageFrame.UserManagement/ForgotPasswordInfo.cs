﻿#region "Copyright"

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

namespace SageFrame.UserManagement
{
    /// <summary>
    /// Entities class for user registration and activation.
    /// </summary>
    public class ForgotPasswordInfo
    {
        /// <summary>
        /// Gets or sets message template ID.
        /// </summary>
        public int MessageTemplateID { get; set; }

        /// <summary>
        /// Gets or sets message template type ID.
        /// </summary>
        public int MessageTemplateTypeID { get; set; }

        /// <summary>
        /// Gets or sets mail's subject.
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets mail's body.
        /// </summary>
        public string Body { get; set; }

        /// <summary>
        /// Gets or sets mail sending email
        /// </summary>
        public string MailFrom { get; set; }

        /// <summary>
        /// Returns or retains true if the mail is active.
        /// </summary>
        public bool IsActive { get; set; }

        /// <summary>
        /// Returns or retains true if the mail is deleted.
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Returns or retains true if the mail is modified.
        /// </summary>
        public bool IsModified { get; set; }

        /// <summary>
        /// Gets or sets password created date.
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
        /// Gets or sets password updated date.
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
        /// Gets or sets password deleted date.
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
        /// Gets or sets portal ID.
        /// </summary>
        public int PortalID { get; set; }

        /// <summary>
        /// Gets or sets password added user's name.
        /// </summary>
        public string AddedBy { get; set; }

        /// <summary>
        /// Gets or sets password updated user's name.
        /// </summary>
        public string UpdatedBy { get; set; }

        /// <summary>
        /// Gets or sets password deleted user's name.
        /// </summary>
        public string DeletedBy { get; set; }

        /// <summary>
        /// Gets or sets user activation code.
        /// </summary>
        public Guid _UserActivationCode_ { get; set; }

        /// <summary>
        /// Gets or sets user's name.
        /// </summary>
        public string _Username_ { get; set; }

        /// <summary>
        /// Gets or sets user's first name.
        /// </summary>
        public string _UserFirstName_ { get; set; }

        /// <summary>
        /// Gets or sets user's first name.
        /// </summary>
        public string _UserLastName_ { get; set; }

        /// <summary>
        /// Gets or sets user's email.
        /// </summary>
        public string _UserEmail_ { get; set; }

        /// <summary>
        /// Gets or sets email activation code.
        /// </summary>
        public Guid Code { get; set; }

        /// <summary>
        /// Gets or sets activation start datetime.
        /// </summary>
        private DateTime _ActiveFrom;
        public DateTime ActiveFrom
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_ActiveFrom);
            }
            set
            {
                if ((this._ActiveFrom != value))
                    this._ActiveFrom = value;
            }
        }

        /// <summary>
        /// Gets or sets activation ended date.
        /// </summary>
        private DateTime _ActiveTo;
        public DateTime ActiveTo
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_ActiveTo);
            }
            set
            {
                if ((this._ActiveTo != value))
                    this._ActiveTo = value;

            }
        }

        /// <summary>
        /// Gets or sets code for what purpose.
        /// </summary>
        public string CodeForPurpose { get; set; }

        /// <summary>
        /// Gets or sets code for username.
        /// </summary>
        public string CodeForUsername { get; set; }

        /// <summary>
        /// Returns or retains true if the code is already used.
        /// </summary>
        public bool IsAlreadyUsed { get; set; }

        /// <summary>
        /// Initializes an instance of ForgotPasswordInfo class.
        /// </summary>
        public ForgotPasswordInfo() { }
    }
}
