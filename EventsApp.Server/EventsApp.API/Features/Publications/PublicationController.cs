namespace EventsApp.API.Features.Publications
{
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using static Infrastructure.WebConstants;

    [Authorize]
    public class PublicationController : ApiController
    {
        private readonly IPublicationService publicationService;

        public PublicationController(IPublicationService publicationService)
        {
            this.publicationService = publicationService;
        }

        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<IEnumerable<PublicationListingServiceModel>> GetAll()
        {
            string userId = this.User.GetId();

            return await this.publicationService.GetAll(userId);
        }

        [HttpGet]
        [Route(nameof(Mine))]
        public async Task<IEnumerable<PublicationListingServiceModel>> Mine()
        {
            string userId = this.User.GetId();

            return await this.publicationService.GetByUser(userId);
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult> Create(CreatePublicationRequestModel model)
        {
            string userId = this.User.GetId();

            int id = await this.publicationService.Create(
                model.ImageUrl,
                model.Description,
                userId);

            return Created(nameof(this.Create), id);
        }

        [HttpPut]
        [Route(nameof(Update))]
        public async Task<ActionResult> Update(UpdatePublicationRequestModel model)
        {
            string userId = this.User.GetId();

            bool updated = await this.publicationService.Update(
                model.Id,
                model.Description,
                userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            string userId = this.User.GetId();

            bool deleted = await this.publicationService.Delete(id, userId);

            if (!deleted)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Like))]
        public async Task<ActionResult> Like(int id)
        {
            string userId = this.User.GetId();

            bool updated = await this.publicationService.Like(id, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Unlike))]
        public async Task<ActionResult> Unlike(int id)
        {
            string userId = this.User.GetId();

            bool updated = await this.publicationService.Unlike(id, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
