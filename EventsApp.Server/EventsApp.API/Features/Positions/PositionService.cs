﻿namespace EventsApp.API.Features.Positions
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

        public async Task<bool> Join(int eventId, int positionId, string userId)
        {
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