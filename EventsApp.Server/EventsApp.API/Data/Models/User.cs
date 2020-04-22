namespace EventsApp.API.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.User;

    public class User : IdentityUser
    {
        public User()
        {
            this.Friends = new HashSet<Friend>();
        }

        [Required]
        [MaxLength(FirstNameMaxLength)]
        [MinLength(FirstNameMinimumLength)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(LastNameMaxLength)]
        [MinLength(LastNameMinimumLength)]
        public string LastName { get; set; }

        public ICollection<Friend> Friends { get; set; }
    }
}
