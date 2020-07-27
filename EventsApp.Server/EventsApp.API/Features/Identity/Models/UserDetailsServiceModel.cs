namespace EventsApp.API.Features.Identity.Models
{
    public class UserDetailsServiceModel
    {
        public string Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string FacebookUrl { get; set; }

        public string Birthday { get; set; }

        public string Gender { get; set; }

        public string FavoriteSport { get; set; }

        public bool IsMyFriend { get; set; }

        public string ProfilePictureUrl { get; set; }
    }
}
