﻿namespace EventsApp.API.Features.Identity
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userEmail, string secret);

        Task<IEnumerable<UserListingServiceModel>> GetAllUsers();

        Task<IEnumerable<UserListingServiceModel>> AcceptedFriends(string userId);

        Task<IEnumerable<UserListingServiceModel>> PendingFriends(string userId);
        
        Task<bool> AddFriend(string userId, string friendId);

        Task<bool> RemoveFriend(string userId, string friendId);

        Task<UserDetailsServiceModel> Details(string userId, string mainUserId);

        Task<bool> AcceptFriendship(string userId, string friendId);

        Task<bool> UpdateUserInformation(string mobile, string facebookUrl, string favoriteSport, string userId);

        Task<int> GetCreatedEventsAmountByUser(string userId);
    }
}
