namespace EventsApp.API.Features.Pictures.Models
{
    using System.ComponentModel.DataAnnotations;

    public class AddPictureRequestModel
    {
        [Required]
        public byte[] Picture { get; set; }
    }
}
