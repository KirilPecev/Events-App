namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.Notification;

    public class Notification : BaseModel<int>
    {
        [Required]
        [MaxLength(DescriptionMaxLength)]
        [MinLength(DescriptionMinLength)]
        public string Description { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public string CreatorId { get; set; }

        public User Creator { get; set; }

        public bool IsDeleted { get; set; }
    }
}
