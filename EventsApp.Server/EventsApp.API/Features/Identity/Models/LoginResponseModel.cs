namespace EventsApp.API.Features.Identity.Models
{
    public class LoginResponseModel
    {
        public string Token { get; set; }

        public string UserId { get; set; }

        public string FullName { get; set; }
    }
}
