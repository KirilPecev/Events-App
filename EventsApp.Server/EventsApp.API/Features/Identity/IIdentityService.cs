namespace EventsApp.API.Features.Identity
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userEmail, string secret);
    }
}
