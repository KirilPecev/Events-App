﻿namespace EventsApp.API.Features.Identity
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

        public async Task<UserDetailsServiceModel> Details(string userId, string friendId)
        {
            return await this.userManager
                .Users
                .Where(u => u.Id == userId)
                .Include(x => x.Friends)
                .Select(u => new UserDetailsServiceModel()
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    FullName = $"{u.FirstName} {u.LastName}",
                    Email = u.Email,
                    Mobile = u.PhoneNumber,
                    Birthday = u.Birthday,
                    Gender = u.Gender.ToString(),
                    FacebookUrl = u.FacebookUrl,
                    FavoriteSport = u.FavoriteSport,
                    IsMyFriend = this.data.Friends.Any(f => (f.UserId == userId && f.FriendId == friendId || f.UserId == friendId && f.FriendId == userId) && f.Status == FriendStatus.Accepted),
                    IsSentFriendRequest = this.data.Friends.Any(f => (f.UserId == friendId || f.FriendId == friendId) && f.Status == FriendStatus.Pending),
                    ProfilePictureUrl = u.ProfilePictureUrl
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserListingServiceModel>> GetAllUsers()
            => await this.userManager
                .Users
                .Select(u => new UserListingServiceModel()
                {
                    Id = u.Id,
                    FullName = $"{u.FirstName} {u.LastName}",
                    ProfilePictureUrl = u.ProfilePictureUrl
                })
                .ToListAsync();

        public async Task<IEnumerable<UserListingServiceModel>> AcceptedFriends(string userId)
        {
            var a = await this.data
                .Friends
                .Where(u => u.UserId == userId && u.Status == FriendStatus.Accepted)
                .Select(u => new UserListingServiceModel()
                {
                    Id = u.FriendId,
                    FullName = $"{u.UserFriend.FirstName} {u.UserFriend.LastName}",
                    FriendsCount = this.data
                        .Friends
                        .Count(f => f.UserId == u.FriendId || f.FriendId == u.FriendId && f.Status == FriendStatus.Accepted),
                    ProfilePictureUrl = u.UserFriend.ProfilePictureUrl
                })
                .ToListAsync();

            var b = await this.data
                .Friends
                .Where(u => u.FriendId == userId && u.Status == FriendStatus.Accepted)
                .Select(u => new UserListingServiceModel()
                {
                    Id = u.UserId,
                    FullName = $"{u.User.FirstName} {u.User.LastName}",
                    FriendsCount = this.data
                        .Friends
                        .Count(f => f.FriendId == u.UserId || f.UserId == u.UserId && f.Status == FriendStatus.Accepted),
                    ProfilePictureUrl = u.User.ProfilePictureUrl
                })
                .ToListAsync();

            return a.Concat(b);
        }

        public async Task<IEnumerable<UserListingServiceModel>> PendingFriends(string userId)
            => await this.data
                .Friends
                .Where(u => u.FriendId == userId && u.Status == FriendStatus.Pending)
                .Select(u => new UserListingServiceModel()
                {
                    Id = u.UserId,
                    FullName = $"{u.User.FirstName} {u.User.LastName}",
                    ProfilePictureUrl = u.User.ProfilePictureUrl
                })
                .ToListAsync();

        public async Task<bool> AddFriend(string userId, string friendId)
        {
            bool hasRequest = await this.data.Friends.AnyAsync(f => f.UserId == friendId && f.FriendId == userId);

            if (hasRequest)
            {
                return await this.AcceptFriendship(userId, friendId);
            }

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

        public async Task<bool> UpdateUserInformation(string firstName, string lastName, string birthday, string mobile, string facebookUrl, string favoriteSport, string userId)
        {
            User user = await this.userManager
                .Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return false;
            }

            user.FirstName = firstName ?? user.FirstName;
            user.LastName = lastName ?? user.LastName;
            user.Birthday = birthday != null ? DateTime.Parse(birthday) : user.Birthday;
            user.PhoneNumber = mobile ?? user.PhoneNumber;
            user.FacebookUrl = facebookUrl ?? user.FacebookUrl;
            user.FavoriteSport = favoriteSport ?? user.FavoriteSport;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateProfilePicture(string pictureUrl, string userId)
        {
            User user = await this.userManager
                .Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null && !string.IsNullOrEmpty(pictureUrl))
            {
                return false;
            }

            user.ProfilePictureUrl = pictureUrl;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<int> GetCreatedEventsAmountByUser(string userId)
            => await this.data.Events.CountAsync(e => e.CreatorId == userId);

        private async Task<Friend> GetFriendship(string userId, string friendId)
            => await this.data
                .Friends
                .FirstOrDefaultAsync(u => (u.UserId == userId && u.FriendId == friendId) || (u.UserId == friendId && u.FriendId == userId));
    }
}
