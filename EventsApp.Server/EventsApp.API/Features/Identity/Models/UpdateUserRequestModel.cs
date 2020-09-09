namespace EventsApp.API.Features.Identity.Models
{
    using System.ComponentModel.DataAnnotations;

    public class UpdateUserRequestModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Birthday { get; set; }

        [Phone]
        public string Mobile { get; set; }

        [Url]
        public string FacebookUrl { get; set; }

        public string FavoriteSport { get; set; }
    }
}
