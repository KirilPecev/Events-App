namespace EventsApp.API.Features.Publications.Models
{
    using System;

    public class PublicationListingServiceModel
    {
        public int Id { get; set; }

        public string Type { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public int Likes { get; set; }

        public int Shares { get; set; }

        public string UserImgUrl { get; set; }

        public string Creator { get; set; }

        public bool IsLiked { get; set; }

        public string SharedFrom { get; set; }

        public DateTime DateTime { get; set; }

        public bool CanDelete { get; set; }
    }
}
