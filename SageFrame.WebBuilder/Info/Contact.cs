using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security.AntiXss;

namespace SageFrame.WebBuilder
{
    [DataContract]
    public class Contact
    {        
        public  Contact(){}

        private int _RowNum;
        private int _ContactUsID;
        private string _FirstName;
        private string _LastName;
        private string _Message;
        private string _Email;
        private string _Telephone;
        private string _Address;
        private string _Website;
        private string _Subject;

        [DataMember(Order =1)]
        public int RowNum {
            get
            { return this._RowNum; }
            set
            {
                if ((this._RowNum != value))
                { this._RowNum = value; }
            }
        }
        [DataMember(Order = 2)]
        public int ContactUsID {
            get
            { return this._ContactUsID; }
            set
            {
                if ((this._ContactUsID != value))
                { this._ContactUsID = value; }
            }
        }
        [DataMember(Order = 3)]
        public string FirstName {
            get
            { return AntiXssEncoder.HtmlEncode(this._FirstName, false); }
            set
            {
                if ((this._FirstName != value))
                { this._FirstName = value; }
            }
        }
        [DataMember(Order = 4)]
        public string LastName {
            get
            { return AntiXssEncoder.HtmlEncode(this._LastName, false); }
            set
            {
                if ((this._LastName != value))
                { this._LastName = value; }
            }
        }
        [DataMember(Order = 5)]
        public string Message {
            get
            { return AntiXssEncoder.HtmlEncode(this._Message, false); }
            set
            {
                if ((this._Message != value))
                { this._Message = value; }
            }
        }
        [DataMember(Order = 6)]
        public string Email {
            get
            { return AntiXssEncoder.HtmlEncode(this._Email, false); }
            set
            {
                if ((this._Email != value))
                { this._Email = value; }
            }
        }
        [DataMember(Order = 7)]
        public string Telephone
        {
            get
            { return AntiXssEncoder.HtmlEncode(this._Telephone, false); }
            set
            {
                if ((this._Telephone != value))
                { this._Telephone = value; }
            }
        }
        [DataMember(Order = 8)]
        public string Subject
        {
            get
            { return AntiXssEncoder.HtmlEncode(this._Subject, false); }
            set
            {
                if ((this._Subject != value))
                { this._Subject = value; }
            }
        }
        [DataMember(Order = 9)]
        public string Address
        {
            get
            { return AntiXssEncoder.HtmlEncode(this._Address, false); }
            set
            {
                if ((this._Address != value))
                { this._Address = value; }
            }
        }
        [DataMember(Order = 10)]
        public string Website
        {
            get
            { return AntiXssEncoder.HtmlEncode(this._Website, false); }
            set
            {
                if ((this._Website != value))
                { this._Website = value; }
            }
        }
    }
}
