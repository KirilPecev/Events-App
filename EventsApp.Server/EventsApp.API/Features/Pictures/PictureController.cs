namespace EventsApp.API.Features.Pictures
{
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using static Infrastructure.WebConstants;

    [Authorize]
    public class PictureController : ApiController
    {
        private readonly IPictureService pictureService;

        public PictureController(IPictureService pictureService)
        {
            this.pictureService = pictureService;
        }

        [HttpGet]
        [Route(nameof(GetByUser))]
        public async Task<IEnumerable<PictureListingServiceModel>> GetByUser()
        {
            string userId = this.User.GetId();

            return await this.pictureService.GetByUser(userId);
        }

        [HttpPost]
        [Route(nameof(Add))]
        public async Task<ActionResult> Add(AddPictureRequestModel model)
        {
            string userId = this.User.GetId();

            int id = await this.pictureService.Add(model.Picture, userId);

            return Created(nameof(Add), id);
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            string userId = this.User.GetId();

            bool deleted = await this.pictureService.Delete(id, userId);

            if (!deleted)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
