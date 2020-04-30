namespace EventsApp.API.Infrastructure.Extensions
{
    using System;

    public static class DateTimeExtensions
    {
        private const string DateFormat = "MM/dd/yyyy";

        private const string TimeFormat = "HH:mm";

        public static string ToDateFormat(this DateTime value)
        {
            return value.ToString(DateFormat);
        }

        public static string ToTimeFormat(this DateTime value)
        {
            return value.ToString(TimeFormat);
        }
    }
}
