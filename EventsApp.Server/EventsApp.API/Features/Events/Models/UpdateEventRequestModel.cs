namespace EventsApp.API.Features.Events.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.ValidationConstants.Event;

    public class UpdateEventRequestModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(LocationMinLength)]
        public string Location { get; set; }

        [Required]
        public string DateTime { get; set; }
    }
}
