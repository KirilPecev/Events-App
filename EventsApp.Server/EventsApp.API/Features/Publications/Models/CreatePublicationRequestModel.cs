namespace EventsApp.API.Features.Publications.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.ValidationConstants.Publication;

    public class CreatePublicationRequestModel
    {
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public string ImageUrl { get; set; }
    }
}
