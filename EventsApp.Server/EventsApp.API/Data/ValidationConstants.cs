namespace EventsApp.API.Data
{
    public static class ValidationConstants
    {
        public static class User
        {
            public const int FirstNameMaxLength = 30;

            public const int FirstNameMinimumLength = 2;

            public const int LastNameMaxLength = 30;

            public const int LastNameMinimumLength = 2;
        }

        public static class Event
        {
            public const int NameMaxLength = 30;

            public const int NameMinLength = 2;

            public const int SportMaxLength = 30;

            public const int SportMinLength = 2;

            public const int LocationMinLength = 2;
        }
    }
}
