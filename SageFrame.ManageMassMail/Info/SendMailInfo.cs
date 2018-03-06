using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.ManageMassMail.Info
{
    public class SendMailInfo
    {
        public long MailID { get; set; }
        public string MailFrom { get; set; }
        public string MailTo { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string TokenKey { get {
                return "##Username##,##UserEmail##,##UserFirstName##,##UserLastName##";
            } }
        public string TokenValue { get; set; }
        
    }
}
