namespace EventsApp.API.Features.Publications.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.ValidationConstants.Publication;

    public class UpdatePublicationRequestModel
    {
        public int Id { get; set; }

        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }
    }
}
