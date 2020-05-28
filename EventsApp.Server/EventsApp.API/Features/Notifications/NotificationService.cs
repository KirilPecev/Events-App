namespace EventsApp.API.Features.Notifications
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class NotificationService : INotificationService
    {
        private readonly EvenityDbContext data;

        public NotificationService(EvenityDbContext data)
        {
            this.data = data;
        }

        public async Task<IEnumerable<NotificationListingServiceModel>> GetByUser(string userId)
            => await this.data
                .Notifications
                .Where(n => n.UserId == userId)
                .Select(n => new NotificationListingServiceModel
                {
                    Id = n.Id,
                    User = $"{n.User.FirstName} {n.User.LastName}",
                    ImageUrl = n.ImageUrl,
                    Description = n.Description
                })
                .ToListAsync();

        public async Task<int> Create(string description, string imageUrl, string userId)
        {
            Notification notification = new Notification()
            {
                Description = description,
                ImageUrl = imageUrl,
                UserId = userId
            };

            this.data.Add(notification);

            return await this.data.SaveChangesAsync();
        }

        public async Task<bool> Delete(int id, string userId)
        {
            Notification notification = await this.data
                .Notifications
                .FirstOrDefaultAsync(n => n.Id == id);


            if (notification == null)
            {
                return false;
            }

            this.data.Remove(notification);

            await this.data.SaveChangesAsync();

            return true;
        }
    }
}
