namespace EventsApp.API.Features.Identity
{
    using Data;
    using Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    public class IdentityService : IIdentityService
    {
        private readonly EvenityDbContext data;
        private readonly UserManager<User> userManager;

        public IdentityService(EvenityDbContext data, UserManager<User> userManager)
        {
            this.data = data;
            this.userManager = userManager;
        }

        public string GenerateJwtToken(string userId, string userEmail, string secret)
        {

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(secret);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Email, userEmail),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }

        public async Task<UserDetailsServiceModel> Details(string userId)
        {
            int createdEvents = this.data.Events.Count(e => e.CreatorId == userId);

            return await this.userManager
                .Users
                .Where(u => u.Id == userId)
                .Select(u => new UserDetailsServiceModel()
                {
                    FullName = $"{u.FirstName} {u.LastName}",
                    ProfilePictureUrl = u.ProfilePictureUrl,
                    CreatedEvents = createdEvents
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserListingServiceModel>> GetByName(string name)
            => await this.userManager
                .Users
                .Where(u => u.FirstName.Contains(name) || u.LastName.Contains(name))
                .Select(u => new UserListingServiceModel()
                {
                    Id = u.Id,
                    FullName = $"{u.FirstName} {u.LastName}",
                    ProfilePictureUrl = u.ProfilePictureUrl
                })
                .ToListAsync();

        public async Task<IEnumerable<UserListingServiceModel>> AcceptedFriends(string userId)
            => await this.userManager
                 .Users
                 .Where(u => u.Id == userId)
                 .SelectMany(u => u.Friends) //TODO: Check results with u.MainUserFriends
                 .Where(u => u.Status == FriendStatus.Accepted)
                 .Select(u => new UserListingServiceModel()
                 {
                     Id = u.FriendId,
                     FullName = $"{u.UserFriend.FirstName} {u.UserFriend.LastName}",
                     ProfilePictureUrl = u.UserFriend.ProfilePictureUrl
                 })
                 .ToListAsync();

        public async Task<IEnumerable<UserListingServiceModel>> PendingFriends(string userId)
            => await this.userManager
                .Users
                .Where(u => u.Id == userId)
                .SelectMany(u => u.Friends) //TODO: Check results with u.MainUserFriends
                .Where(u => u.Status == FriendStatus.Pending)
                .Select(u => new UserListingServiceModel()
                {
                    Id = u.FriendId,
                    FullName = $"{u.UserFriend.FirstName} {u.UserFriend.LastName}",
                    ProfilePictureUrl = u.UserFriend.ProfilePictureUrl
                })
                .ToListAsync();

        public async Task<bool> AddFriend(string userId, string friendId)
        {
            Friend friendship = new Friend()
            {
                UserId = userId,
                FriendId = friendId,
                Status = FriendStatus.Pending
            };

            this.data.Add(friendship);

            int result = await this.data.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> RemoveFriend(string userId, string friendId)
        {
            Friend friendship = await this.GetFriendship(userId, friendId);

            if (friendship == null)
            {
                return false;
            }

            this.data.Friends.Remove(friendship);

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AcceptFriendship(string userId, string friendId)
        {
            Friend friendship = await this.GetFriendship(userId, friendId);

            if (friendship == null)
            {
                return false;
            }

            friendship.Status = FriendStatus.Accepted;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateUserInformation(string mobile, string facebookUrl, string favoriteSport, string userId)
        {
            User user = await this.userManager
                .Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return false;
            }

            user.PhoneNumber = mobile;
            user.FacebookUrl = facebookUrl;
            user.FavoriteSport = favoriteSport;

            await this.data.SaveChangesAsync();

            return true;
        }

        private async Task<Friend> GetFriendship(string userId, string friendId)
            => await this.data
                .Friends
                .FirstOrDefaultAsync(u => u.UserId == userId && u.FriendId == friendId);
    }
}
