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
    public class PublicationsController : ApiController
    {
        private readonly IPublicationService publicationService;

        public PublicationsController(IPublicationService publicationService)
        {
            this.publicationService = publicationService;
        }

        [HttpGet]
        public async Task<IEnumerable<PublicationListingServiceModel>> GetAll()
        {
            string userId = this.User.GetId();

            return await this.publicationService.GetAll(userId);
        }

        [HttpGet]
        [Route(nameof(ByUser))]
        public async Task<IEnumerable<PublicationListingServiceModel>> ByUser(string userId)
             => await this.publicationService.GetByUser(userId);

        [HttpPost]
        public async Task<ActionResult> Create(CreatePublicationRequestModel model)
        {
            string userId = this.User.GetId();

            int id = await this.publicationService.Create(
                model.ImageUrl,
                model.Description,
                userId);

            if (id == -1)
            {
                return BadRequest();
            }

            return Created(nameof(this.Create), id);
        }

        [HttpPut]
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

            bool deleted = await this.publicationService.DeletePublication(id, userId);

            if (!deleted)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        [Route("Shared/{Id}")]
        public async Task<ActionResult> DeleteShared(int id)
        {
            string userId = this.User.GetId();

            bool deleted = await this.publicationService.DeleteSharedPublication(id, userId);

            if (!deleted)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Like))]
        public async Task<ActionResult> Like([FromBody] int id)
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
        public async Task<ActionResult> Unlike([FromBody] int id)
        {
            string userId = this.User.GetId();

            bool updated = await this.publicationService.Unlike(id, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Share))]
        public async Task<ActionResult> Share([FromBody] int id)
        {
            string userId = this.User.GetId();

            bool updated = await this.publicationService.Share(id, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
