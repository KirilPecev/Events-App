namespace EventsApp.API.Features.Publications
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
        [Route(ByUser)]
        public async Task<IEnumerable<PublicationListingServiceModel>> GetByUser(string userId)
             => await this.publicationService.GetByUser(userId, this.User.GetId());

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

            Result result = await this.publicationService.Update(model.Id, model.Description, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            string userId = this.User.GetId();

            Result result = await this.publicationService.DeletePublication(id, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Like))]
        public async Task<ActionResult> Like([FromBody] int id)
        {
            string userId = this.User.GetId();

            Result result = await this.publicationService.Like(id, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Unlike))]
        public async Task<ActionResult> Unlike([FromBody] int id)
        {
            string userId = this.User.GetId();

            Result result = await this.publicationService.Unlike(id, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Share))]
        public async Task<ActionResult> Share([FromBody] int id)
        {
            string userId = this.User.GetId();

            Result result = await this.publicationService.Share(id, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
