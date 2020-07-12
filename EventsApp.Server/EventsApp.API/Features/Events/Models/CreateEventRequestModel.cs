namespace EventsApp.API.Features.Events.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.ValidationConstants.Event;

    public class CreateEventRequestModel
    {

        [Required]
        [MaxLength(NameMaxLength)]
        [MinLength(NameMinLength)]
        public string Name { get; set; }

        [MaxLength(SportMaxLength)]
        [MinLength(SportMinLength)]
        public string Sport { get; set; }

        [Required]
        [MinLength(LocationMinLength)]
        public string Location { get; set; }

        [Required]
        public string DateTime { get; set; }

        public string[] Positions { get; set; }

        public bool IsSportEvent { get; set; }
    }
}
