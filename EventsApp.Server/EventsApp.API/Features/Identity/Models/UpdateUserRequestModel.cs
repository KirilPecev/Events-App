namespace EventsApp.API.Features.Identity.Models
{
    using System.ComponentModel.DataAnnotations;

    public class UpdateUserRequestModel
    {
        [Phone]
        public string Mobile { get; set; }

        [Url]
        public string FacebookUrl { get; set; }

        public string FavoriteSport { get; set; }
    }
}
