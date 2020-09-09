namespace EventsApp.API.Features.Identity.Models
{
    using System;

    public class UserDetailsServiceModel
    {
        public string Id { get; set; }

        public string FullName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string FacebookUrl { get; set; }

        public DateTime Birthday { get; set; }

        public string Gender { get; set; }

        public string FavoriteSport { get; set; }

        public bool IsMyFriend { get; set; }

        public bool IsSentFriendRequest { get; set; }

        public string ProfilePictureUrl { get; set; }
    }
}
