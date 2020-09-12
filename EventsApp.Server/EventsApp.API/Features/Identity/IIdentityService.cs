namespace EventsApp.API.Features.Identity
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure;

    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userEmail, string secret);

        Task<IEnumerable<UserListingServiceModel>> GetAllUsers();

        Task<IEnumerable<UserListingServiceModel>> AcceptedFriends(string userId);

        Task<IEnumerable<UserListingServiceModel>> PendingFriends(string userId);

        Task<Result> AddFriend(string userId, string friendId);

        Task<Result> RemoveFriend(string userId, string friendId);

        Task<UserDetailsServiceModel> Details(string userId, string friendId);

        Task<Result> AcceptFriendship(string userId, string friendId);

        Task<Result> UpdateUserInformation(string firstName, string lastName, string birthday, string mobile, string facebookUrl, string favoriteSport, string userId);

        Task<Result> UpdateProfilePicture(string pictureUrl, string userId);

        Task<int> GetCreatedEventsAmountByUser(string userId);

        Task<Result> DeactivateAccount(string userId);

        Task<Result> DeleteAccount(string userId);

        Task<Result> ActivateAccount(string userId);

        Task<Result> ChangeEmail(string userId, string newEmail, string token);

        Task<Result> ChangePassword(string userId, string currentPassword, string newPassword);
    }
}
