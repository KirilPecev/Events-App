namespace EventsApp.API.Features.Positions
{
    using System.Threading.Tasks;

    public interface IPositionService
    {
        Task<int> Create(int eventId, string[] positions);

        Task<bool> Join(int eventId, int positionId, string userId);

        Task<bool> Unjoin(int eventId, int positionId, string userId);
    }
}
