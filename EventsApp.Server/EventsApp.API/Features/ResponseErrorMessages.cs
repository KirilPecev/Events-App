﻿namespace EventsApp.API.Features
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
    }
}
