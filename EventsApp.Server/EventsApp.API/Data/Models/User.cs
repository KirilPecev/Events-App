namespace EventsApp.API.Data.Models
{
    using Common;
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;

    public class User : IdentityUser
    {
        [Required]
        [MaxLength(DataConstants.User.FirstNameMaxLength)]
        [MinLength(DataConstants.User.FirstNameMinimumLength)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(DataConstants.User.LastNameMaxLength)]
        [MinLength(DataConstants.User.LastNameMinimumLength)]
        public string LastName { get; set; }
    }
}
