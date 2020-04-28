namespace EventsApp.API.Features.Positions
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class PositionService : IPositionService
    {
        private readonly EvenityDbContext data;

        public PositionService(EvenityDbContext data)
        {
            this.data = data;
        }

        public async Task<int> Create(int eventId, string[] positions)
        {
            List<Position> newPositions = new List<Position>();
            foreach (var position in positions)
            {
                newPositions.Add(new Position()
                {
                    EventId = eventId,
                    Name = position
                });
            }

            this.data.Positions.AddRange(newPositions);

            var result = await this.data.SaveChangesAsync();

            return result;
        }

        public async Task<bool> Join(int eventId, int positionId, string userId)
        {
            Position position = await this.GetByIdAndEventId(eventId, positionId);

            position.ParticipantId = userId;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Unjoin(int eventId, int positionId, string userId)
        {
            Position position = await this.GetByIdAndEventId(eventId, positionId);

            position.ParticipantId = null;

            await this.data.SaveChangesAsync();

            return true;
        }

        private async Task<Position> GetByIdAndEventId(int eventId, int positionId)
            => await this.data
                .Positions
                .FirstOrDefaultAsync(p => p.EventId == eventId && p.Id == positionId);

    }
}
