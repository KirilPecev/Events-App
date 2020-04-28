namespace EventsApp.API.Features.Events
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IEventService
    {
        public Task<int> Create(string name, string sport, string location, string dateTime, string[] positions, string userId);

        public Task<bool> Update(int id, string location, string dateTime, string userId);

        public Task<bool> Delete(int id, string userId);

        public Task<EventDetailsServiceModel> GetDetails(int id, string userId);

        public Task<IEnumerable<EventListingServiceModel>> GetByUser(string userId);

        public Task<IEnumerable<EventListingServiceModel>> GetAll();
    }
}
