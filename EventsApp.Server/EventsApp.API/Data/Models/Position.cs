namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Position : BaseModel<int>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string ParticipantId { get; set; }
        public User Participant { get; set; }
    }
}
