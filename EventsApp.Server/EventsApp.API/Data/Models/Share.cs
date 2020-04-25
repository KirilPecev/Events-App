namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Share : BaseModel<int>
    {
        [Required]
        public int PublicationId { get; set; }
        public Publication Publication { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
