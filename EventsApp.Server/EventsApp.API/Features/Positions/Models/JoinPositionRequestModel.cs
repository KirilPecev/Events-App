namespace EventsApp.API.Features.Positions.Models
{
    using System.ComponentModel.DataAnnotations;

    public class JoinPositionRequestModel
    {
        [Required]
        public int EventId { get; set; }

        [Required]
        public int PositionId { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}
