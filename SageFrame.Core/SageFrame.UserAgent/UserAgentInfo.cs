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

namespace SageFrame.UserAgent
{
    public class UserAgentInfo
    {
        public int PortalID { get; set; }
        public string ChangedBy { get; set; }
        private DateTime _ChangedDate;
        public DateTime ChangedDate
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_ChangedDate);
            }
            set
            {
                if ((this._ChangedDate != value))
                    this._ChangedDate = value;

            }
        }
        public bool IsActive { get; set; }
        public UserAgentInfo() { }
    }
}
