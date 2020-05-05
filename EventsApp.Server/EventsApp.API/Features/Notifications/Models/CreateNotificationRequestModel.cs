namespace EventsApp.API.Features.Notifications.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.ValidationConstants.Notification;

    public class CreateNotificationRequestModel
    {
        [Required]
        [MaxLength(DescriptionMaxLength)]
        [MinLength(DescriptionMinLength)]
        public string Description { get; set; }

        public string ImageUrl { get; set; }
    }
}
