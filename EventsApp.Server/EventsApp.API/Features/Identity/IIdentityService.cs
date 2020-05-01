namespace EventsApp.API.Features.Identity
{
    using Models;
    using System.Threading.Tasks;

    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userEmail, string secret);

        Task<UserListingServiceModel> GetAll();

        Task<UserListingServiceModel> MineFriends(string userId);

        Task<bool> AddFriend(string userId, string friendId);

        Task<bool> RemoveFriend(string userId, string friendId);

        Task<UserDetailsServiceModel> Details(string userId);
    }
}
