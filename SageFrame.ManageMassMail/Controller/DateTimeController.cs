using System;

namespace SageFrame.MassMail
{
    public class DateTimeController
    {
        public static DateTime GetLocalTime(DateTime utcTime)
        {
            return TimeZone.CurrentTimeZone.ToLocalTime(utcTime);
        }

        public static DateTime GetLocalTime(string utcTime)
        {
            return TimeZone.CurrentTimeZone.ToLocalTime(DateTime.Parse(utcTime));
        }

        public static DateTime GetUtcTime(DateTime localTime)
        {
            return TimeZone.CurrentTimeZone.ToUniversalTime(localTime);
        }

        public static DateTime GetUtcTime(string localTime)
        {
            return TimeZone.CurrentTimeZone.ToUniversalTime(DateTime.Parse(localTime));
        }
    }
}
