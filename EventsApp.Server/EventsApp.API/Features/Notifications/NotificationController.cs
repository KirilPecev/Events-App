namespace EventsApp.API.Features.Notifications
{
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using static Infrastructure.WebConstants;

    [Authorize]
    public class NotificationController : ApiController
    {
        private readonly INotificationService notificationService;

        public NotificationController(INotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpGet]
        [Route(nameof(GetByUser))]
        public async Task<IEnumerable<NotificationListingServiceModel>> GetByUser()
        {
            string userId = this.User.GetId();

            return await this.notificationService.GetByUser(userId);
        }

        [HttpPost]
        [Route(nameof(Add))]
        public async Task<ActionResult> Add(CreateNotificationRequestModel model)
        {
            string userId = this.User.GetId();

            int id = await this.notificationService.Create(model.Description, model.ImageUrl, userId);

            return Created(nameof(Add), id);
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            string userId = this.User.GetId();

            bool deleted = await this.notificationService.Delete(id, userId);

            if (!deleted)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
