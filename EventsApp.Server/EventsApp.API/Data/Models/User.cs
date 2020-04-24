namespace EventsApp.API.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.User;

    public class User : IdentityUser
    {
        public User()
        {
            this.Pictures = new HashSet<Picture>();
            this.Friends = new HashSet<Friend>();
            this.MainUserFriends = new HashSet<Friend>();
            this.Notifications = new HashSet<Notification>();
            this.Events = new List<Event>();
            this.Publications = new List<Publication>();
        }

        [Required]
        [MaxLength(FirstNameMaxLength)]
        [MinLength(FirstNameMinimumLength)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(LastNameMaxLength)]
        [MinLength(LastNameMinimumLength)]
        public string LastName { get; set; }

        public string FacebookUrl { get; set; }

        public DateTime Birthday { get; set; }

        public int Gender { get; set; }

        public string FavoriteSport { get; set; }

        public string ProfilePictureUrl { get; set; }

        public ICollection<Picture> Pictures { get; set; }

        public ICollection<Friend> Friends { get; set; }

        public ICollection<Friend> MainUserFriends { get; set; }

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<Event> Events { get; set; }

        public ICollection<Publication> Publications { get; set; }
    }
}
