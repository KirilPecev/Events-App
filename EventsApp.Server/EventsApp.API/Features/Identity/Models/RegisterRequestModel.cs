namespace EventsApp.API.Features.Identity.Models
{
    using System.ComponentModel.DataAnnotations;
    using static Data.ValidationConstants.User;

    public class RegisterUserRequestModel
    {
        [Required]
        [MaxLength(FirstNameMaxLength)]
        [MinLength(FirstNameMinimumLength)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(LastNameMaxLength)]
        [MinLength(LastNameMinimumLength)]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
