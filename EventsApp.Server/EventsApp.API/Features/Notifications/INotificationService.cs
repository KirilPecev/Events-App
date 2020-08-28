namespace EventsApp.API.Features.Notifications
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface INotificationService
    {
        Task<IEnumerable<NotificationListingServiceModel>> GetByUser(string userId);

        Task<int> Create(string description, string imageUrl, string userId, string currentUserId);

        Task<bool> Delete(int id, string userId);
    }
}
