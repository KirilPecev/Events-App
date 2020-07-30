namespace EventsApp.API.Features.Publications
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPublicationService
    {
        public Task<int> Create(string imageUrl, string description, string userId, string sharedBy = null);

        public Task<bool> Update(int id, string description, string userId);

        public Task<bool> DeletePublication(int id, string userId);

        public Task<bool> DeleteSharedPublication(int id, string userId);

        public Task<IEnumerable<PublicationListingServiceModel>> GetByUser(string userId, string loggedInUser);

        public Task<IEnumerable<PublicationListingServiceModel>> GetAll(string userId);

        public Task<bool> Like(int id, string userId);

        public Task<bool> Unlike(int id, string userId);

        public Task<bool> Share(int id, string userId);
    }
}
