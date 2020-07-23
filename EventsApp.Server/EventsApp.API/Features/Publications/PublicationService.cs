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

        public async Task<int> Create(string imageUrl, string description, string userId)
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
                DateTime = DateTime.UtcNow
            };

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
            Publication publication = await this.GetByIdAndByUserId(id, userId);

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
            Share publication = await this.GetByIdAndByUserIdFromShares(id, userId);

            if (publication == null)
            {
                return false;
            }

            publication.IsDeleted = true;

            await this.data.SaveChangesAsync();

            return true;
        }


        public async Task<IEnumerable<PublicationListingServiceModel>> GetByUser(string userId)
        {
            //Get all user with userId publications
            List<PublicationListingServiceModel> publications = await this.data
                .Publications
                .Where(p => p.CreatorId == userId)
                .Select(p => new PublicationListingServiceModel()
                {
                    Id = p.Id,
                    Type = p.Type.ToString().ToLower(),
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Creator = p.Creator.ToString(),
                    UserImgUrl = p.Creator.ProfilePictureUrl,
                    Likes = p.Likes.Count,
                    IsLiked = p.Likes.Any(l => l.LikerId == userId),
                    Shares = p.Shares.Count,
                    DateTime = p.DateTime,
                    CanDelete = p.Creator.Id == userId
                })
                .ToListAsync();

            //Get all user with userId shared publications
            List<PublicationListingServiceModel> sharedPublications = await this.data
                .Shares
                .Where(s => s.UserId == userId)
                .Select(s => new PublicationListingServiceModel()
                {
                    Id = s.Id,
                    Type = s.Publication.Type.ToString().ToLower(),
                    Description = s.Publication.Description,
                    ImageUrl = s.Publication.ImageUrl,
                    Creator = s.User.ToString(),
                    UserImgUrl = s.Publication.Creator.ProfilePictureUrl,
                    Likes = s.Publication.Likes.Count,
                    IsLiked = s.Publication.Likes.Any(l => l.LikerId == userId),
                    Shares = s.Publication.Shares.Count,
                    DateTime = s.DateTime,
                    SharedFrom = s.Publication.Creator.ToString(),
                    CanDelete = s.UserId == userId
                })
               .ToListAsync();

            //Return all concatenated
            return publications.Concat(sharedPublications).OrderByDescending(x=>x.DateTime);
        }

        public async Task<IEnumerable<PublicationListingServiceModel>> GetAll(string userId)
        {
            Expression<Func<Friend, bool>> expression = f => (f.UserId == userId || f.FriendId == userId) && f.Status == FriendStatus.Accepted;

            IQueryable<Publication> userFriendPublications = this.data
                .Friends
                .Where(expression)
                .SelectMany(f => f.UserFriend.Publications);

            IQueryable<Publication> userPublications = this.data
                .Friends
                .Where(expression)
                .SelectMany(f => f.User.Publications);


            IQueryable<Share> userSharedPublications = this.data
                .Friends
                .Where(expression)
                .SelectMany(f => f.User.Shares);


            IQueryable<Share> userFriendSharedPublications = this.data
                .Friends
                .Where(expression)
                .SelectMany(f => f.UserFriend.Shares);


            var materializedPublications = await userPublications
                .Union(userFriendPublications)
                .Select(p => new PublicationListingServiceModel()
                {
                    Id = p.Id,
                    Type = p.Type.ToString().ToLower(),
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Creator = p.Creator.ToString(),
                    UserImgUrl = p.Creator.ProfilePictureUrl,
                    Likes = p.Likes.Count,
                    IsLiked = p.Likes.Any(l => l.LikerId == userId),
                    Shares = p.Shares.Count,
                    DateTime = p.DateTime,
                    CanDelete = p.Creator.Id == userId
                })
                .ToListAsync();

            var materializedSharedPublications = await userSharedPublications
                .Union(userFriendSharedPublications)
                .Select(s => new PublicationListingServiceModel()
                {
                    Id = s.Id,
                    Type = s.Publication.Type.ToString().ToLower(),
                    Description = s.Publication.Description,
                    ImageUrl = s.Publication.ImageUrl,
                    Creator = s.User.ToString(),
                    UserImgUrl = s.Publication.Creator.ProfilePictureUrl,
                    Likes = s.Publication.Likes.Count,
                    IsLiked = s.Publication.Likes.Any(l => l.LikerId == userId),
                    Shares = s.Publication.Shares.Count,
                    SharedFrom = s.Publication.Creator.ToString(),
                    DateTime = s.DateTime,
                    CanDelete = s.UserId == userId
                })
                .ToListAsync();

            //Return all concatenated
            return materializedPublications
                .Concat(materializedSharedPublications)
                .OrderByDescending(x => x.DateTime);
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
                DateTime = DateTime.UtcNow
            };

            publication.Shares.Add(share);

            await this.data.SaveChangesAsync();

            return true;
        }

        private async Task<Publication> GetById(int id)
            => await this.data.Publications.FirstOrDefaultAsync(p => p.Id == id);

        private async Task<Publication> GetByIdAndByUserId(int id, string userId)
            => await this.data
                .Publications
                .Where(p => p.Id == id && p.CreatorId == userId)
                .FirstOrDefaultAsync();

        private async Task<Share> GetByIdAndByUserIdFromShares(int id, string userId)
            => await this.data
                .Shares
                .Where(s => s.Id == id && s.UserId == userId)
                .FirstOrDefaultAsync();
    }
}
