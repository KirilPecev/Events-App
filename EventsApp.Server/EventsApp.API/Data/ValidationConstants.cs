namespace EventsApp.API.Data
{
    public static class ValidationConstants
    {
        public static class User
        {
            public const int FirstNameMaxLength = 50;

            public const int FirstNameMinimumLength = 2;

            public const int LastNameMaxLength = 50;

            public const int LastNameMinimumLength = 2;
        }

        public static class Event
        {
            public const int NameMaxLength = 50;

            public const int NameMinLength = 2;

            public const int SportMaxLength = 60;

            public const int SportMinLength = 2;

            public const int LocationMinLength = 2;
        }

        public static class Position
        {
            public const int NameMaxLength = 60;

            public const int NameMinLength = 2;
        }

        public static class Publication
        {
            public const int DescriptionMaxLength = 200;
        }
    }
}
