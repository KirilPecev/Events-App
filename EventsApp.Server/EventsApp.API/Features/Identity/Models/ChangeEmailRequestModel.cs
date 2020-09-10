namespace EventsApp.API.Features.Identity.Models
{
    public class ChangeEmailRequestModel
    {
        public string Email { get; set; }

        public string Token { get; set; }
    }
}
