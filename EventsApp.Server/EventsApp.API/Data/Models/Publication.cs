namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Publication : BaseModel<int>
    {
        [Required]
        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public int Likes { get; set; }

        public int Shares { get; set; }

        [Required]
        public string CreatorId { get; set; }
        public User Creator { get; set; }
    }
}
