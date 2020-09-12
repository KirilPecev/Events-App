namespace EventsApp.API.Features.Notifications
{
    using Data;
    using Data.Models;
    using Infrastructure;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using static ResponseErrorMessages;

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
                    UserPic = this.data.Users.FirstOrDefault(u => u.Id == n.CreatorId).ProfilePictureUrl,
                    ImageUrl = n.ImageUrl,
                    Description = n.Description
                })
                .ToListAsync();

        public async Task<int> Create(string description, string imageUrl, string userId, string currentUserId)
        {
            Notification notification = new Notification()
            {
                Description = description,
                ImageUrl = imageUrl,
                UserId = userId,
                CreatorId = currentUserId
            };

            this.data.Add(notification);

            return await this.data.SaveChangesAsync();
        }

        public async Task<Result> Delete(int id, string userId)
        {
            Notification notification = await this.data
                .Notifications
                .FirstOrDefaultAsync(n => n.Id == id);


            if (notification == null)
            {
                return Notifications.NotificationNotFound;
            }

            notification.IsDeleted = true;

            await this.data.SaveChangesAsync();

            return true;
        }
    }
}
