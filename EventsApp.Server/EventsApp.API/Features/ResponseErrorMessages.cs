namespace EventsApp.API.Features
{
    public class ResponseErrorMessages
    {
        public static class Identity
        {
            public const string UserNotFound = "Does not exist user with this ID!";

            public const string FriendshipNotFound = "Friendship is not found!";

            public const string TakenEmail = "The provided email is already taken!";

            public const string PasswordError = "Changing password was failed!";

        }

        public static class Notifications
        {
            public const string NotificationNotFound = "Does not exist notification with this ID!";
        }

        public static class Positions
        {
            public const string PositionIsBusy = "The position is already busy or you are already joined!";

            public const string PositionIsFree = "The position is already available ot you are already unjoined!";
        }
    }
}
