namespace EventsApp.API.Features.Publications
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using System.Linq;
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

        public async Task<bool> Delete(int id, string userId)
        {
            Publication publication = await this.GetByIdAndByUserId(id, userId);

            if (publication == null)
            {
                return false;
            }

            this.data.Remove(publication);

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
                    Creator = $"{p.Creator.FirstName} {p.Creator.LastName}",
                    UserImgUrl = p.Creator.ProfilePictureUrl,
                    Likes = p.Likes.Count,
                    IsLiked = p.Likes.Any(l => l.LikerId == userId),
                    Shares = p.Shares.Count

                })
                .ToListAsync();

            //Get all user with userId shared publications
            List<PublicationListingServiceModel> sharedPublications = await this.data
                .Shares
                .Where(s => s.UserId == userId)
                .Select(s => new PublicationListingServiceModel()
                {
                    Id = s.PublicationId,
                    Type = s.Publication.Type.ToString().ToLower(),
                    Description = s.Publication.Description,
                    ImageUrl = s.Publication.ImageUrl,
                    Creator = $"{s.Publication.Creator.FirstName} {s.Publication.Creator.LastName}",
                    UserImgUrl = s.Publication.Creator.ProfilePictureUrl,
                    Likes = s.Publication.Likes.Count,
                    IsLiked = s.Publication.Likes.Any(l => l.LikerId == userId),
                    Shares = s.Publication.Shares.Count
                })
                .ToListAsync();

            //Return all concatenated
            return publications.Concat(sharedPublications).OrderByDescending(r => r.Id);
        }

        public async Task<IEnumerable<PublicationListingServiceModel>> GetAll(string userId)
        {
            //Get all friends publications
            var friendPublications = await this.data
                .Friends
                .Where(f => f.UserId == userId && f.Status == FriendStatus.Accepted)
                .SelectMany(f => f.UserFriend.Publications)
                .Select(p => new PublicationListingServiceModel()
                {
                    Id = p.Id,
                    Type = p.Type.ToString().ToLower(),
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Creator = $"{p.Creator.FirstName} {p.Creator.LastName}",
                    UserImgUrl = p.Creator.ProfilePictureUrl,
                    Likes = p.Likes.Count,
                    IsLiked = p.Likes.Any(l => l.LikerId == userId),
                    Shares = p.Shares.Count
                })
                .ToListAsync();

            //Get all shared publications from friends
            var friendSharedPublications = await this.data
                .Friends
                .Where(f => f.UserId == userId && f.Status == FriendStatus.Accepted)
                .SelectMany(f => f.UserFriend.Shares)
                .Select(s => new PublicationListingServiceModel()
                {
                    Id = s.PublicationId,
                    Type = s.Publication.Type.ToString().ToLower(),
                    Description = s.Publication.Description,
                    ImageUrl = s.Publication.ImageUrl,
                    Creator = $"{s.Publication.Creator.FirstName} {s.Publication.Creator.LastName}",
                    UserImgUrl = s.Publication.Creator.ProfilePictureUrl,
                    Likes = s.Publication.Likes.Count,
                    IsLiked = s.Publication.Likes.Any(l => l.LikerId == userId),
                    Shares = s.Publication.Shares.Count
                })
                .ToListAsync();

            //Get all mine publications with all my shared publications
            var mine = await this.GetByUser(userId);

            //Return all concatenated
            return friendPublications.Concat(friendSharedPublications).Concat(mine).OrderByDescending(r => r.Id);
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
                UserId = userId
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
    }
}
