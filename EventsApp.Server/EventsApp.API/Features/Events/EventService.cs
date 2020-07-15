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

        public async Task<int> Create(string name, string sport, string location, string dateTime, string[] positions, bool isSportEvent, string userId)
        {
            Event newEvent = new Event()
            {
                Name = name,
                Sport = sport,
                Location = location,
                DateTime = DateTime.Parse(dateTime),
                CreatorId = userId,
                IsSportEvent = isSportEvent
            };

            await this.data.Events.AddAsync(newEvent);

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

            await this.positionService.Delete(id);

            this.data.Events.Remove(current);

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<EventDetailsServiceModel> GetDetails(int id, string userId)
        {
            int availablePositions = await this.data
                .Events
                .Where(e => e.Id == id)
                .SelectMany(e => e.Positions)
                .CountAsync(e => e.ParticipantId == null);

            bool isUserJoined = await this.positionService.IsUserJoined(id, userId);

            return await this.data
                 .Events
                 .Where(e => e.Id == id)
                 .Select(e => new EventDetailsServiceModel()
                 {
                     Id = e.Id,
                     Name = e.Name,
                     CreatorId = e.CreatorId,
                     Creator = $"{e.Creator.FirstName} {e.Creator.LastName}",
                     IsAdmin = e.CreatorId == userId,
                     Location = e.Location,
                     Sport = e.Sport,
                     DateTime = e.DateTime,
                     AvailablePositions = availablePositions,
                     IsSportEvent = e.IsSportEvent,
                     IsUserJoined = isUserJoined
                 })
                 .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<EventListingServiceModel>> GetByUser(string userId)
            => await this.data
                .Events
                .Where(e => e.CreatorId == userId)
                .OrderByDescending(x => x.Id)
                .Select(e => new EventListingServiceModel()
                {
                    Id = e.Id,
                    Name = e.Name
                })
                .ToListAsync();

        public async Task<IEnumerable<EventListingServiceModel>> GetEventsImJoined(string userId)
            => await this.data
                .Events
                .SelectMany(e=>e.Positions)
                .Where(p=>p.ParticipantId == userId)
                .OrderByDescending(x => x.Id)
                .Select(e => new EventListingServiceModel()
                {
                    Id = e.EventId,
                    Name = e.Event.Name,
                })
                .ToListAsync();


        public async Task<IEnumerable<EventListingServiceModel>> GetUpcomingEvents()
            => await this.data
                .Events
                .Where(e=>e.DateTime >= DateTime.Now && e.DateTime<= DateTime.Now.AddDays(7))
                .OrderByDescending(x => x.DateTime)
                .Select(e => new EventListingServiceModel()
                {
                    Id = e.Id,
                    Name = e.Name,
                    AvailablePositions = e.Positions.Count(p => p.ParticipantId == null)
                })
                .ToListAsync();

        public async Task<IEnumerable<EventListingServiceModel>> GetAll()
            => await this.data
                .Events
                .OrderByDescending(x => x.Id)
                .Select(e => new EventListingServiceModel()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Creator = $"{e.Creator.FirstName} {e.Creator.LastName}",
                    Location = e.Location,
                    Sport = e.Sport,
                    Date = e.DateTime.ToDateFormat(),
                    Time = e.DateTime.ToTimeFormat(),
                    AvailablePositions = e.Positions.Count(p => p.ParticipantId == null),
                    IsSportEvent = e.IsSportEvent
                })
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
