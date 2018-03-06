using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;


namespace SageFrame.MassMail
{
    public class MassMailInfo
    {
        public int RowTotal { get; set; }
        public int RowNum { get; set; }
        public long MassMailID { get; set; }
        public string MessageTitle { get; set; }
        public string FilterTypeName
        {
            get
            {
                switch (FilterTypeID)
                {
                    case 1: return "By Role";
                    case 2: return "By Suscriber";
                    case 4: return "All Users";
                    case 5: return "Custom";
                    default: return string.Empty;
                }
            }
            set { }
        }
        public string FilterValue { get; set; }
        public string Subject { get; set; }
        public string StatusName { get; set; }
        public int StatusID { get; set; }
        public string Status
        {
            get
            {
                switch (this.StatusID)
                {
                    case 1: return "Schedule";
                    case 2: return "Processed";
                    case 3: return "Dispatched";
                    default: return string.Empty;
                }              
            }
            
        }
        private string _ScheduledOn;
     
        public string ScheduledOn
        {
            get
            {
                return DateTimeController.GetLocalTime(_ScheduledOn).ToString();
            }
            set { _ScheduledOn = value; }
        }
      
        public string AddedBy { get; set; }
        private string _AddedOn;
      
        public string AddedOn
        {
            get
            {
                return DateTimeController.GetLocalTime(_AddedOn).ToShortDateString();
            }
            set { _AddedOn = value; }
        }
     
        public int FilterTypeID { get; set; }
        public int ScheduleType { get; set; }
    }


    public class MassMailAddInfo
    {
        public long MassMailID { get; set; }
        public string MessageTitle { get; set; }
        public int FilterTypeID { get; set; }
        public string FilterValue { get; set; }
        public string AdditionalUser { get; set; }
        public string Subject { get; set; }
        public string MessageBody { get; set; }
        public int ScheduleType { get; set; }
        private string _ScheduledOn;
        public string ScheduledOn
        {
            get
            {
                if (!string.IsNullOrEmpty(_ScheduledOn))
                    return DateTimeController.GetUtcTime(_ScheduledOn).ToString("yyyy-MM-dd HH:mm:ss");
                else return string.Empty;
            }
            set { _ScheduledOn = value; }
        }
    }

    public class MassMailEditInfo
    {
        public long MassMailID { get; set; }
        public string MessageTitle { get; set; }
        public int FilterTypeID { get; set; }
        public string FilterValue { get; set; }
        public string Subject { get; set; }
        public string MessageBody { get; set; }
        public int ScheduleType { get; set; }
        private string _ScheduledOn;
        public string ScheduledOn
        {
            get
            {
                if (ScheduleType == 1) return string.Empty;
                else
                {
                    if (!string.IsNullOrEmpty(_ScheduledOn))
                        return DateTimeController.GetLocalTime(_ScheduledOn).ToString("yyyy-MM-dd HH:mm:ss");
                    else return string.Empty;
                }
            }
            set { _ScheduledOn = value; }
        }

        public List<MassMailFilterTypeInfo> AdditionalUsers { get; set; }
    }
}
