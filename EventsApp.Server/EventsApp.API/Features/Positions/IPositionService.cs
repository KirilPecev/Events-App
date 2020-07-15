namespace EventsApp.API.Features.Positions
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPositionService
    {
        Task<int> Create(int eventId, string[] positions);

        Task<int> Delete(int eventId);

        Task<bool> Join(int eventId, int positionId, string userId);

        Task<bool> Unjoin(int eventId, int positionId, string userId);

        Task<IEnumerable<PositionListingServiceModel>> GetAvailablePositions(int eventId, string userId);

        Task<IEnumerable<PositionListingServiceModel>> GetBusyPositions(int eventId, string userId);

        Task<bool> IsUserJoined(int eventId, string userId);
    }
}
