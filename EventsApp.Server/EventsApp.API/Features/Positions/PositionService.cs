namespace EventsApp.API.Features.Positions
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.InteropServices.ComTypes;
    using System.Threading.Tasks;
    using Models;

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
            int counter = 1;
            foreach (var position in positions)
            {
                newPositions.Add(new Position()
                {
                    EventId = eventId,
                    Name = string.IsNullOrEmpty(position) ? counter++.ToString() : position
                });
            }

            await this.data.Positions.AddRangeAsync(newPositions);

            var result = await this.data.SaveChangesAsync();

            return result;
        }

        public async Task<int> Delete(int eventId)
        {
            var positions = this.data.Positions.Where(p => p.EventId == eventId);

            this.data.Positions.RemoveRange(positions);

            var result = await this.data.SaveChangesAsync();

            return result;
        }

        public async Task<bool> Join(int eventId, int positionId, string userId)
        {
            if (positionId == 0)
            {
                positionId = this.data.Positions
                    .First(p => p.ParticipantId == null && p.EventId == eventId)
                    .Id;

            }

            Position position = await this.GetByIdAndEventId(eventId, positionId);

            bool isJoined = await this.CheckIfUserIsAlreadyJoined(eventId, userId);

            if (isJoined || position.ParticipantId != null)
            {
                return false;
            }

            position.ParticipantId = userId;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Unjoin(int eventId, int positionId, string userId)
        {
            if (positionId == 0)
            {
                positionId = this.data.Positions
                    .First(p => p.ParticipantId == userId && p.EventId == eventId)
                    .Id;

            }

            Position position = await this.GetByIdAndEventId(eventId, positionId);

            bool isJoined = await this.CheckIfUserIsAlreadyJoined(eventId, userId);

            if (!isJoined)
            {
                return false;
            }

            position.ParticipantId = null;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<PositionListingServiceModel>> GetAvailablePositions(int eventId, string userId)
        {
            bool isUserJoined =
                await this.data
                    .Positions
                    .AnyAsync(p => p.EventId == eventId && p.ParticipantId == userId);

            return await this.data
                   .Positions
                   .Where(p => p.EventId == eventId && p.Participant == null)
                   .Select(p => new PositionListingServiceModel()
                   {
                       Id = p.Id,
                       Name = p.Name,
                       CanJoin = !isUserJoined
                   })
                   .ToListAsync();
        }

        public async Task<IEnumerable<PositionListingServiceModel>> GetBusyPositions(int eventId, string userId)
            => await this.data
            .Positions
            .Where(p => p.EventId == eventId && p.Participant != null)
            .Select(p => new PositionListingServiceModel()
            {
                Id = p.Id,
                Name = p.Name,
                ParticipantId = p.ParticipantId,
                Participant = p.Participant.ToString(),
                CanQuit = p.ParticipantId == userId
            })
            .ToListAsync();

        public async Task<bool> IsUserJoined(int eventId, string userId)
        {
            bool result = await this.data.Positions.AnyAsync(p => p.EventId == eventId && p.ParticipantId == userId);

            return result;
        }

        private async Task<Position> GetByIdAndEventId(int eventId, int positionId)
            => await this.data
                .Positions
                .FirstOrDefaultAsync(p => p.EventId == eventId && p.Id == positionId);


        private async Task<bool> CheckIfUserIsAlreadyJoined(int eventId, string userId)
            => await this.data
                .Positions
                .AnyAsync(p => p.EventId == eventId && p.ParticipantId == userId);
    }
}