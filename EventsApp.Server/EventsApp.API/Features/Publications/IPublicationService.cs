namespace EventsApp.API.Features.Publications
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPublicationService
    {
        public Task<int> Create(string imageUrl, string description, string userId);

        public Task<bool> Update(int id, string description, string userId);

        public Task<bool> Delete(int id, string userId);

        public Task<IEnumerable<PublicationListingServiceModel>> GetByUser(string userId);

        public Task<IEnumerable<PublicationListingServiceModel>> GetAll();
    }
}
