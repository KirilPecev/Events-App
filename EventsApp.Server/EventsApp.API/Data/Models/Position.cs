namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.Position;

    public class Position : BaseModel<int>
    {
        [Required]
        [MaxLength(NameMaxLength)]
        [MinLength(NameMinLength)]
        public string Name { get; set; }

        public string ParticipantId { get; set; }
        public User Participant { get; set; }

        [Required]
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
