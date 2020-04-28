namespace EventsApp.API.Features.Events
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class EventService : IEventService
    {
        private readonly EvenityDbContext data;

        public EventService(EvenityDbContext data)
        {
            this.data = data;
        }

        public async Task<int> Create(string name, string sport, string location, string dateTime, string[] positions, string userId)
        {
            Event newEvent = new Event()
            {
                Name = name,
                Sport = sport,
                Location = location,
                DateTime = DateTime.Parse(dateTime),
                CreatorId = userId,
            };

            this.data.Events.Add(newEvent);

            await this.data.SaveChangesAsync();

            //TODO: Add positions -- IPositionsService

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

        public Task<EventDetailsServiceModel> GetDetails(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EventListingServiceModel>> GetByUser(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EventListingServiceModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Like(int id, string userId)
        {
            Event current = await this.GetById(id);

            if (current == null)
            {
                return false;
            }

            current.Likes.Add(new Like()
            {
                LikerId = userId
            });

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Unlike(int id, string userId)
        {
            Event current = await this.GetById(id);

            if (current == null)
            {
                return false;
            }

            Like like = await this.data.Likes.FirstOrDefaultAsync(l => l.LikerId == userId);

            current.Likes.Remove(like);

            await this.data.SaveChangesAsync();

            return true;
        }

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
