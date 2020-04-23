namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.Publication;

    public class Publication : BaseModel<int>
    {
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public int Likes { get; set; }

        public int Shares { get; set; }

        [Required]
        public string CreatorId { get; set; }
        public User Creator { get; set; }
    }
}
