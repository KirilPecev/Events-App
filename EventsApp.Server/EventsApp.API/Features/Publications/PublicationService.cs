namespace EventsApp.API.Features.Publications
{
    using System;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;

    public class PublicationService : IPublicationService
    {
        private readonly EvenityDbContext data;

        public PublicationService(EvenityDbContext data)
        {
            this.data = data;
        }

        public async Task<int> Create(string imageUrl, string description, string userId, string sharedBy)
        {
            PublicationTypes type = string.IsNullOrEmpty(imageUrl) ? PublicationTypes.Post : PublicationTypes.Image;

            if (string.IsNullOrEmpty(imageUrl) && string.IsNullOrEmpty(description))
            {
                return -1;
            }

            Publication publication = new Publication()
            {
                Type = type,
                Description = description,
                ImageUrl = imageUrl,
                CreatorId = userId,
                CreatedOn = DateTime.UtcNow
            };

            if (!String.IsNullOrEmpty(sharedBy))
            {
                publication.SharedById = sharedBy;
            }

            this.data.Add(publication);

            await this.data.SaveChangesAsync();

            return publication.Id;
        }

        public async Task<bool> Update(int id, string description, string userId)
        {
            Publication publication = await this.GetByIdAndByUserId(id, userId);

            if (publication == null)
            {
                return false;
            }

            publication.Description = description;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeletePublication(int id, string userId)
        {
            Publication publication = await this.GetByIdAndByUserId(id, userId) ?? await this.GetShared(id, userId);

            if (publication == null)
            {
                return false;
            }

            publication.IsDeleted = true;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteSharedPublication(int id, string userId)
        {
            Publication publication = await this.GetShared(id, userId);

            if (publication == null)
            {
                return false;
            }

            publication.IsDeleted = true;

            await this.data.SaveChangesAsync();

            return true;
        }


        public async Task<IEnumerable<PublicationListingServiceModel>> GetByUser(string userId, string loggedInUser)
            => await this.data
                 .Publications
                 .Where(p => (p.CreatorId == userId && p.SharedById == null) || p.SharedById == userId)
                 .Select(p => new PublicationListingServiceModel()
                 {
                     Id = p.Id,
                     Type = p.Type.ToString().ToLower(),
                     Description = p.Description,
                     ImageUrl = p.ImageUrl,
                     Creator = p.Creator.ToString(),
                     UserImgUrl = p.SharedBy.ProfilePictureUrl ?? p.Creator.ProfilePictureUrl,
                     UserId = p.SharedBy.Id ?? p.Creator.Id,
                     Likes = p.Likes.Count,
                     IsLiked = p.Likes.Any(l => l.LikerId == loggedInUser),
                     Shares = p.Shares.Count,
                     CreatedOn = p.CreatedOn,
                     CanDelete = p.SharedBy != null ? p.SharedBy.Id == loggedInUser : p.CreatorId == loggedInUser,
                     SharedFrom = p.SharedBy != null ? p.SharedBy.ToString() : null
                 })
                 .OrderByDescending(x => x.CreatedOn)
                 .ToListAsync();

        public async Task<IEnumerable<PublicationListingServiceModel>> GetAll(string userId)
        {
            bool hasFriends = await this.data.Friends.AnyAsync(f => f.UserId == userId || f.FriendId == userId);
            if (!hasFriends)
            {
                return await this.GetByUser(userId, userId);
            }


            Expression<Func<Friend, bool>> expression = f => (f.UserId == userId || f.FriendId == userId) && f.Status == FriendStatus.Accepted;

            IQueryable<Publication> userFriendPublications = this.data
                .Friends
                .Where(expression)
                .SelectMany(f => f.UserFriend.Publications);

            IQueryable<Publication> userPublications = this.data
                .Friends
                .Where(expression)
                .SelectMany(f => f.User.Publications);

            return await userPublications
                .Union(userFriendPublications)
                .Select(p => new PublicationListingServiceModel()
                {
                    Id = p.Id,
                    Type = p.Type.ToString().ToLower(),
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Creator = p.Creator.ToString(),
                    UserImgUrl = p.SharedBy.ProfilePictureUrl ?? p.Creator.ProfilePictureUrl,
                    UserId = p.SharedBy.Id ?? p.Creator.Id,
                    Likes = p.Likes.Count,
                    IsLiked = p.Likes.Any(l => l.LikerId == userId),
                    Shares = p.Shares.Count,
                    CreatedOn = p.CreatedOn,
                    CanDelete = p.SharedBy != null ? p.SharedBy.Id == userId : p.CreatorId == userId,
                    SharedFrom = p.SharedBy != null ? p.SharedBy.ToString() : null
                })
                .OrderByDescending(x => x.CreatedOn)
                .ToListAsync();
        }

        public async Task<bool> Like(int id, string userId)
        {
            Publication publication = await this.GetById(id);

            if (publication == null)
            {
                return false;
            }

            publication.Likes.Add(new Like()
            {
                LikerId = userId
            });

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Unlike(int id, string userId)
        {
            Publication publication = await this.GetById(id);

            if (publication == null)
            {
                return false;
            }

            Like like = await this.data.Likes.FirstOrDefaultAsync(l => l.LikerId == userId && l.PublicationId == id);

            publication.Likes.Remove(like);

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Share(int id, string userId)
        {
            Publication publication = await this.GetById(id);

            if (publication == null)
            {
                return false;
            }

            Share share = new Share()
            {
                UserId = userId,
            };

            publication.Shares.Add(share);

            await this.data.SaveChangesAsync();

            await this.Create(publication.ImageUrl, publication.Description, publication.CreatorId, userId);

            return true;
        }

        private async Task<Publication> GetById(int id)
            => await this.data.Publications.FirstOrDefaultAsync(p => p.Id == id);

        private async Task<Publication> GetByIdAndByUserId(int id, string userId)
            => await this.data
                .Publications
                .Where(p => p.Id == id && p.CreatorId == userId)
                .FirstOrDefaultAsync();

        private async Task<Publication> GetShared(int id, string userId)
            => await this.data
                .Publications
                .Where(p => p.Id == id && p.SharedById == userId)
                .FirstOrDefaultAsync();
    }
}
