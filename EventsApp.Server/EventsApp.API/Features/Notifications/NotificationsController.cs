namespace EventsApp.API.Features.Notifications
{
    using Infrastructure;
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using static Infrastructure.WebConstants;

    [Authorize]
    public class NotificationsController : ApiController
    {
        private readonly INotificationService notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpGet]
        public async Task<IEnumerable<NotificationListingServiceModel>> GetByUser()
        {
            string userId = this.User.GetId();

            return await this.notificationService.GetByUser(userId);
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateNotificationRequestModel model)
        {
            string currentUserId = this.User.GetId();

            int id = await this.notificationService.Create(model.Description, model.ImageUrl, model.UserId, currentUserId);

            return Created(nameof(Create), id);
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            string userId = this.User.GetId();

            Result result = await this.notificationService.Delete(id, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
