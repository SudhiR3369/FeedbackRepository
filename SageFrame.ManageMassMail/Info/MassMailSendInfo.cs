using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.MassMail
{
   public class MassMailSendInfo
    {
        public int MassMailID { get; set; }
        public string MessageTitle { get; set; }
        public string Subject { get; set; }
        public string MessageBody { get; set; }
        public List<UserInfo> MailToUsers { get; set; }
        public string MailFrom { get; set; }
        public string TokenKeys { get { return "##Username##,##UserFirstName##,##UserLastName##,##UserEmail##"; } }
    }
    public class UserInfo
    {
        public string EmailAddress { get; set; }
        public string TokenValues { get; set; }
    }
}
