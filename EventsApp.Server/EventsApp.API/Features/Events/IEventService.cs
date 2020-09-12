namespace EventsApp.API.Features.Events
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure;

    public interface IEventService
    {
        public Task<int> Create(string name, string sport, string location, string dateTime, string[] positions, bool isSportEvent, string userId);

        public Task<Result> Update(int id, string location, string dateTime, string userId);

        public Task<Result> Delete(int id, string userId);

        public Task<EventDetailsServiceModel> GetDetails(int id, string userId);

        public Task<IEnumerable<EventListingServiceModel>> GetByUser(string userId);

        public Task<IEnumerable<EventListingServiceModel>> GetEventsImJoined(string userId);

        public Task<IEnumerable<EventListingServiceModel>> GetUpcomingEvents();

        public Task<IEnumerable<EventListingServiceModel>> GetAll();
    }
}
