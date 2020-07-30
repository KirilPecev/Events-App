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
            this.Friends = new HashSet<Friend>();
            this.MainUserFriends = new HashSet<Friend>();
            this.Notifications = new HashSet<Notification>();
            this.Events = new List<Event>();
            this.Publications = new List<Publication>();
            this.Likes = new List<Like>();
            this.Shares = new List<Share>();
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

        public Gender Gender { get; set; }

        public string FavoriteSport { get; set; }

        public string ProfilePictureUrl { get; set; }

        public ICollection<Friend> Friends { get; set; }

        public ICollection<Friend> MainUserFriends { get; set; }

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<Event> Events { get; set; }

        public ICollection<Publication> Publications { get; set; }

        public ICollection<Like> Likes { get; set; }

        public ICollection<Share> Shares { get; set; }

        public override string ToString()
        {
            return $"{this.FirstName} {this.LastName}";
        }
    }
}
