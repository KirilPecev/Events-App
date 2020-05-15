namespace EventsApp.API.Features.Events
{
    using Data;
    using Data.Models;
    using Infrastructure.Extensions;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Positions;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class EventService : IEventService
    {
        private readonly EvenityDbContext data;
        private readonly IPositionService positionService;

        public EventService(EvenityDbContext data, IPositionService positionService)
        {
            this.data = data;
            this.positionService = positionService;
        }

        public async Task<int> Create(string name, string sport, string location, string dateTime, string[] positions, string userId)
        {
            Event newEvent = new Event()
            {
                Name = name,
                Sport = sport ?? "other",
                Location = location,
                DateTime = DateTime.Parse(dateTime),
                CreatorId = userId,
            };

            this.data.Events.Add(newEvent);

            await this.data.SaveChangesAsync();

            int positionResult = await this.positionService.Create(newEvent.Id, positions);

            return newEvent.Id;
        }

        public async Task<bool> Update(int id, string location, string dateTime, string userId)
        {
            Event current = await this.GetByIdAndUserId(id, userId);

            if (current == null)
            {
                return false;
            }

            if (!string.IsNullOrEmpty(location))
            {
                current.Location = location;
            }

            if (!string.IsNullOrEmpty(dateTime))
            {
                current.DateTime = DateTime.Parse(dateTime);
            }

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(int id, string userId)
        {
            Event current = await this.GetByIdAndUserId(id, userId);

            if (current == null)
            {
                return false;
            }

            this.data.Events.Remove(current);

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<EventDetailsServiceModel> GetDetails(int id, string userId)
        {
            var availablePositions = await this.data
                .Events
                .Where(e => e.Id == id)
                .SelectMany(e => e.Positions)
                .Where(e => e.ParticipantId == null)
                .Select(e => new EventPositionServiceModel()
                {
                    Id = e.Id,
                    Name = e.Name
                })
                .ToListAsync();

            var busyPositions = await this.data
                .Events
                .Where(e => e.Id == id)
                .SelectMany(e => e.Positions)
                .Where(e => e.ParticipantId != null)
                .Select(e => new EventPositionServiceModel()
                {
                    Id = e.Id,
                    Name = e.Name,
                    CanQuit = e.ParticipantId == userId,
                    Participant = $"{e.Participant.FirstName} {e.Participant.LastName}"
                })
                .ToListAsync();

            return await this.data
                 .Events
                 .Where(e => e.Id == id)
                 .Select(e => new EventDetailsServiceModel()
                 {
                     Id = e.Id,
                     Name = e.Name,
                     Creator = $"{e.Creator.FirstName} {e.Creator.LastName}",
                     isAdmin = e.CreatorId == userId,
                     Location = e.Location,
                     Sport = e.Sport,
                     Date = e.DateTime.ToDateFormat(),
                     Time = e.DateTime.ToTimeFormat(),
                     AvailablePositions = e.Positions.Count(p => p.ParticipantId != null),
                     AvailablePositionsList = availablePositions,
                     BusyPositionsList = busyPositions
                 })
                 .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<EventListingServiceModel>> GetByUser(string userId)
            => await this.data
                .Events
                .Where(e => e.CreatorId == userId)
                .Select(e => new EventListingServiceModel()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Creator = $"{e.Creator.FirstName} {e.Creator.LastName}",
                    Location = e.Location,
                    Sport = e.Sport,
                    Date = e.DateTime.ToDateFormat(),
                    Time = e.DateTime.ToTimeFormat(),
                    AvailablePositions = e.Positions.Count(p => p.ParticipantId == null)
                })
                .OrderByDescending(x => x.Id)
                .ToListAsync();

        public async Task<IEnumerable<EventListingServiceModel>> GetAll()
            => await this.data
                .Events
                .Select(e => new EventListingServiceModel()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Creator = $"{e.Creator.FirstName} {e.Creator.LastName}",
                    Location = e.Location,
                    Sport = e.Sport,
                    Date = e.DateTime.ToDateFormat(),
                    Time = e.DateTime.ToTimeFormat(),
                    AvailablePositions = e.Positions.Count(p => p.ParticipantId == null)
                })
                .OrderByDescending(x=>x.Id)
                .ToListAsync();

        private async Task<Event> GetByIdAndUserId(int id, string userId)
            => await this.data
                .Events
                .FirstOrDefaultAsync(e => e.Id == id && e.CreatorId == userId);

        private async Task<Event> GetById(int id)
            => await this.data
                .Events
                .FirstOrDefaultAsync(e => e.Id == id);
    }
}
