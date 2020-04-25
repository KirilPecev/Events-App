namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Like : BaseModel<int>
    {
        [Required]
        public int PublicationId { get; set; }
        public Publication Publication { get; set; }

        [Required]
        public string LikerId { get; set; }
        public User Liker { get; set; }
    }
}
