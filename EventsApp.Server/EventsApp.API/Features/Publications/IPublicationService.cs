namespace EventsApp.API.Features.Publications
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure;

    public interface IPublicationService
    {
        public Task<int> Create(string imageUrl, string description, string userId, string sharedBy = null);

        public Task<Result> Update(int id, string description, string userId);

        public Task<Result> DeletePublication(int id, string userId);

        public Task<Result> DeleteSharedPublication(int id, string userId);

        public Task<IEnumerable<PublicationListingServiceModel>> GetByUser(string userId, string loggedInUser);

        public Task<IEnumerable<PublicationListingServiceModel>> GetAll(string userId);

        public Task<Result> Like(int id, string userId);

        public Task<Result> Unlike(int id, string userId);

        public Task<Result> Share(int id, string userId);
    }
}
