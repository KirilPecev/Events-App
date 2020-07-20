namespace EventsApp.API.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Share : BaseModel<int>
    {
        [Required]
        public int PublicationId { get; set; }
        public Publication Publication { get; set; }

        public DateTime DateTime { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
