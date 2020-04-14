namespace EventsApp.API.Models.Identity
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterUserRequestModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
