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
            PublicationTypes type = string.IsNullOrEmpty(imageUrl) ? PublicationTypes.Image : PublicationTypes.Post;

            Publication publication = new Publication()
            {
                Type = type,
                Description = description,
                ImageUrl = imageUrl,
                CreatorId = userId,
                //Likes = 0,
                Shares = 0
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
            => await this.data
                .Publications
                .Where(p => p.CreatorId == userId)
                .Select(p => new PublicationListingServiceModel()
                {
                    Type = p.Type.ToString().ToLower(),
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Creator = $"{p.Creator.FirstName} {p.Creator.LastName}",
                    UserImgUrl = p.Creator.ProfilePictureUrl,
                   // Likes = p.Likes,
                    Shares = p.Shares

                })
                .ToListAsync();

        public async Task<IEnumerable<PublicationListingServiceModel>> GetAll()
            => await this.data
                 .Publications
                    .Select(p => new PublicationListingServiceModel()
                    {
                        Type = p.Type.ToString().ToLower(),
                        Description = p.Description,
                        ImageUrl = p.ImageUrl,
                        Creator = $"{p.Creator.FirstName} {p.Creator.LastName}",
                        UserImgUrl = p.Creator.ProfilePictureUrl,
                       // Likes = p.Likes,
                        Shares = p.Shares
                    })
                .ToListAsync();

        private async Task<Publication> GetByIdAndByUserId(int id, string userId)
            => await this.data
                .Publications
                .Where(p => p.Id == id && p.CreatorId == userId)
                .FirstOrDefaultAsync();
    }
}
